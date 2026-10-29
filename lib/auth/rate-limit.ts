import "server-only"

import { createHash, randomUUID } from "node:crypto"
import { prisma } from "@/lib/prisma"
import { logAuthError } from "./log"

export interface AuthRateLimitPolicy {
  /** Number of requests allowed inside one window before the key is locked. */
  limit: number
  windowMs: number
  lockMs: number
}

export interface AuthRateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

/**
 * Stable scope names. Keeping these centralized prevents a typo from silently
 * creating a second, weaker bucket for the same operation.
 */
export const AUTH_RATE_LIMIT_SCOPE = {
  signInIp: "sign-in:ip",
  signInEmail: "sign-in:email",
  signUpIp: "sign-up:ip",
  signUpEmail: "sign-up:email",
  passwordResetIp: "password-reset:ip",
  passwordResetEmail: "password-reset:email",
  resendVerificationIp: "resend-verification:ip",
  resetPasswordIp: "reset-password:ip",
  resetPasswordToken: "reset-password:token",
  oauthIp: "oauth:ip",
  verifyEmailIp: "verify-email:ip",
} as const

/**
 * Limits are intentionally generous for shared/NAT networks while still
 * stopping automated credential stuffing, signup email abuse, and token
 * probing. Account-level lockout remains the first line of defence for a
 * single account; these buckets cover distributed and cross-account attempts.
 */
export const AUTH_RATE_LIMITS = {
  signInIp: { limit: 30, windowMs: 15 * 60_000, lockMs: 15 * 60_000 },
  signInEmail: { limit: 10, windowMs: 15 * 60_000, lockMs: 15 * 60_000 },
  signUpIp: { limit: 5, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  signUpEmail: { limit: 3, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  passwordResetIp: { limit: 5, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  passwordResetEmail: { limit: 3, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  resendVerificationIp: { limit: 10, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  resetPasswordIp: { limit: 10, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  resetPasswordToken: { limit: 10, windowMs: 60 * 60_000, lockMs: 60 * 60_000 },
  oauthIp: { limit: 30, windowMs: 15 * 60_000, lockMs: 15 * 60_000 },
  verifyEmailIp: { limit: 30, windowMs: 15 * 60_000, lockMs: 15 * 60_000 },
} as const satisfies Record<string, AuthRateLimitPolicy>

const CLEANUP_INTERVAL_MS = 7 * 24 * 60 * 60_000
const CLEANUP_PROBABILITY = 0.02

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex")
}

function secondsUntil(date: Date, now: Date): number {
  return Math.max(1, Math.ceil((date.getTime() - now.getTime()) / 1000))
}

function cleanupExpiredThrottles(): void {
  if (Math.random() >= CLEANUP_PROBABILITY) return

  const cutoff = new Date(Date.now() - CLEANUP_INTERVAL_MS)
  void prisma.authThrottle
    .deleteMany({
      where: {
        lastAttemptAt: { lt: cutoff },
        OR: [{ lockedUntil: null }, { lockedUntil: { lt: new Date() } }],
      },
    })
    .catch((error: unknown) => logAuthError("auth throttle cleanup", error))
}

/**
 * Consume one unit from a throttle key. A single upsert computes the window
 * reset, increment, and lock in the database, so concurrent requests cannot
 * overwrite each other's attempt count. Storage errors fail open and are
 * logged: a throttle-table problem must not take authentication down with it.
 */
export async function consumeAuthRateLimit(input: {
  scope: string
  key: string | null
  policy: AuthRateLimitPolicy
}): Promise<AuthRateLimitResult> {
  const { scope, key, policy } = input
  if (!key) {
    return { allowed: true, remaining: policy.limit, retryAfterSeconds: 0 }
  }

  const now = new Date()
  const keyHash = hashKey(key)
  const windowCutoff = new Date(now.getTime() - policy.windowMs)
  const lockUntil = new Date(now.getTime() + policy.lockMs)

  try {
    const rows = await prisma.$queryRaw<
      Array<{ attempts: number; lockedUntil: Date | null }>
    >`
      INSERT INTO "AuthThrottle" (
        "id", "scope", "keyHash", "attempts", "windowStart", "lockedUntil", "lastAttemptAt"
      )
      VALUES (
        ${randomUUID()}, ${scope}, ${keyHash}, 1, ${now}, NULL, ${now}
      )
      ON CONFLICT ("scope", "keyHash") DO UPDATE SET
        "attempts" = CASE
          WHEN "AuthThrottle"."lockedUntil" IS NOT NULL
            AND "AuthThrottle"."lockedUntil" > ${now}
            THEN "AuthThrottle"."attempts"
          WHEN ("AuthThrottle"."lockedUntil" IS NOT NULL
            AND "AuthThrottle"."lockedUntil" <= ${now})
            OR "AuthThrottle"."windowStart" <= ${windowCutoff}
            THEN 1
          ELSE "AuthThrottle"."attempts" + 1
        END,
        "windowStart" = CASE
          WHEN "AuthThrottle"."lockedUntil" IS NOT NULL
            AND "AuthThrottle"."lockedUntil" > ${now}
            THEN "AuthThrottle"."windowStart"
          WHEN ("AuthThrottle"."lockedUntil" IS NOT NULL
            AND "AuthThrottle"."lockedUntil" <= ${now})
            OR "AuthThrottle"."windowStart" <= ${windowCutoff}
            THEN ${now}
          ELSE "AuthThrottle"."windowStart"
        END,
        "lockedUntil" = CASE
          WHEN "AuthThrottle"."lockedUntil" IS NOT NULL
            AND "AuthThrottle"."lockedUntil" > ${now}
            THEN "AuthThrottle"."lockedUntil"
          WHEN (
            CASE
              WHEN ("AuthThrottle"."lockedUntil" IS NOT NULL
                AND "AuthThrottle"."lockedUntil" <= ${now})
                OR "AuthThrottle"."windowStart" <= ${windowCutoff}
                THEN 1
              ELSE "AuthThrottle"."attempts" + 1
            END
          ) > ${policy.limit}
            THEN ${lockUntil}
          ELSE NULL
        END,
        "lastAttemptAt" = ${now}
      RETURNING "attempts", "lockedUntil"
    `

    const row = rows[0]
    if (!row) throw new Error("Auth throttle upsert returned no row")

    const attempts = Number(row.attempts)
    const lockedUntil = row.lockedUntil ? new Date(row.lockedUntil) : null
    const isLocked = Boolean(lockedUntil && lockedUntil > now)

    cleanupExpiredThrottles()

    return {
      allowed: attempts <= policy.limit && !isLocked,
      remaining: Math.max(0, policy.limit - attempts),
      retryAfterSeconds:
        lockedUntil && lockedUntil > now
          ? secondsUntil(lockedUntil, now)
          : 0,
    }
  } catch (error) {
    logAuthError(`auth rate limit (${scope})`, error)
    return { allowed: true, remaining: policy.limit, retryAfterSeconds: 0 }
  }
}

export async function clearAuthRateLimit(
  scope: string,
  key: string | null,
): Promise<void> {
  if (!key) return

  try {
    await prisma.authThrottle.deleteMany({
      where: { scope, keyHash: hashKey(key) },
    })
  } catch (error) {
    logAuthError(`auth rate limit clear (${scope})`, error)
  }
}
