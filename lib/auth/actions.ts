"use server"

import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { env, hasEmailConfig } from "@/lib/env"
import {
  LOCKOUT_SECONDS,
  MAX_LOGIN_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS,
  RESET_TTL_SECONDS,
  VERIFICATION_TTL_SECONDS,
} from "./constants"
import {
  clearPendingVerificationCookie,
  clearSessionCookie,
  getPendingVerificationToken,
  setPendingVerificationCookie,
} from "./cookies"
import { sendPasswordResetEmail, sendVerificationEmail } from "./email"
import { normalizeEmail } from "./identity"
import { logAuthError } from "./log"
import { hashPassword, verifyPassword } from "./password"
import {
  AUTH_RATE_LIMIT_SCOPE,
  AUTH_RATE_LIMITS,
  clearAuthRateLimit,
  consumeAuthRateLimit,
} from "./rate-limit"
import { currentRequestMeta } from "./request"
import { createSession, destroyCurrentSession } from "./session"
import { generateToken, hashToken } from "./tokens"
import {
  emailSchema,
  fieldErrorsOf,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  type ResetPasswordInput,
  type SignInInput,
  type SignUpInput,
} from "@/lib/validations/auth"
import type {
  RequestPasswordResetResult,
  ResetPasswordResult,
  ResendResult,
  SignInResult,
  SignUpResult,
} from "@/types"

const DUMMY_PASSWORD_HASH =
  "$2b$12$qrLDIh2A8OVGwB5Y2cB0sONAwXhrHjJljZvE1iq12goqWPMEN8YQu"

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  )
}

function verificationUrl(token: string): string {
  return `${env.siteUrl}/api/auth/verify?token=${encodeURIComponent(token)}`
}

function passwordResetUrl(token: string): string {
  return `${env.siteUrl}/reset-password?token=${encodeURIComponent(token)}`
}

async function issueToken(
  userId: string,
  type: "EMAIL_VERIFICATION" | "PASSWORD_RESET",
  ttlSeconds: number,
): Promise<string> {
  const token = generateToken()
  await prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { userId, type } }),
    prisma.verificationToken.create({
      data: {
        userId,
        type,
        tokenHash: hashToken(token),
        expiresAt: new Date(Date.now() + ttlSeconds * 1000),
      },
    }),
  ])
  return token
}

async function sendVerificationSafely(input: {
  userId: string
  email: string
  name: string
}): Promise<void> {
  if (!env.siteUrl) {
    logAuthError("verification email", new Error("Site URL is not configured"))
    return
  }

  const token = await issueToken(
    input.userId,
    "EMAIL_VERIFICATION",
    VERIFICATION_TTL_SECONDS,
  )
  await setPendingVerificationCookie(token)

  try {
    await sendVerificationEmail({
      to: input.email,
      name: input.name,
      url: verificationUrl(token),
    })
  } catch (error) {
    // The account still exists and the pending cookie lets the user resend.
    logAuthError("verification email", error)
  }
}

export async function signUpAction(input: SignUpInput): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: fieldErrorsOf(parsed.error),
    }
  }

  if (process.env.NODE_ENV === "production" && !hasEmailConfig()) {
    logAuthError("sign-up", new Error("Email delivery is not configured"))
    return { ok: false, reason: "error" }
  }

  const email = normalizeEmail(parsed.data.email)
  const meta = await currentRequestMeta()

  const ipLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.signUpIp,
    key: meta.ipAddress,
    policy: AUTH_RATE_LIMITS.signUpIp,
  })
  if (!ipLimit.allowed) return { ok: false, reason: "rate_limit" }

  const emailLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.signUpEmail,
    key: email,
    policy: AUTH_RATE_LIMITS.signUpEmail,
  })
  if (!emailLimit.allowed) return { ok: false, reason: "rate_limit" }

  try {
    // Hash before the existence check so an existing account does not finish
    // noticeably faster than a new one. The response is also generic for both
    // cases, so sign-up cannot be used to discover registered addresses.
    const passwordHash = await hashPassword(parsed.data.password)
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
      if (!existing.emailVerified) {
        await sendVerificationSafely({
          userId: existing.id,
          email: existing.email,
          name: existing.name,
        })
      }
      return { ok: true, verificationSent: true }
    }

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name.trim(),
        email,
        passwordHash,
      },
    })

    await sendVerificationSafely({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    return { ok: true, verificationSent: true }
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      // A concurrent request created the address after our lookup. Do not turn
      // that race into an account-existence oracle.
      return { ok: true, verificationSent: true }
    }
    logAuthError("sign-up", error)
    return { ok: false, reason: "error" }
  }
}

export async function signInAction(input: SignInInput): Promise<SignInResult> {
  const parsed = signInSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: fieldErrorsOf(parsed.error),
    }
  }

  const email = normalizeEmail(parsed.data.email)
  const meta = await currentRequestMeta()

  const ipLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.signInIp,
    key: meta.ipAddress,
    policy: AUTH_RATE_LIMITS.signInIp,
  })
  if (!ipLimit.allowed) return { ok: false, reason: "rate_limit" }

  const emailLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.signInEmail,
    key: email,
    policy: AUTH_RATE_LIMITS.signInEmail,
  })
  if (!emailLimit.allowed) return { ok: false, reason: "rate_limit" }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (user?.lockedUntil && user.lockedUntil > new Date()) {
      return { ok: false, reason: "invalid" }
    }

    const passwordMatches = await verifyPassword(
      parsed.data.password,
      user?.passwordHash ?? DUMMY_PASSWORD_HASH,
    )

    if (!user || !user.passwordHash || !passwordMatches) {
      if (user) {
        const attempts = user.failedLoginAttempts + 1
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: attempts,
            lockedUntil:
              attempts >= MAX_LOGIN_ATTEMPTS
                ? new Date(Date.now() + LOCKOUT_SECONDS * 1000)
                : null,
          },
        })
      }
      return { ok: false, reason: "invalid" }
    }

    if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: 0, lockedUntil: null },
      })
      await sendVerificationSafely({
        userId: user.id,
        email: user.email,
        name: user.name,
      })
      return { ok: false, reason: "unverified" }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    })
    await prisma.verificationToken.deleteMany({
      where: { userId: user.id, type: "EMAIL_VERIFICATION" },
    })
    await clearAuthRateLimit(AUTH_RATE_LIMIT_SCOPE.signInEmail, email)
    await createSession(user.id, meta)
    await clearPendingVerificationCookie()
    return { ok: true }
  } catch (error) {
    logAuthError("sign-in", error)
    return { ok: false, reason: "error" }
  }
}

export async function signOutAction(): Promise<void> {
  try {
    await destroyCurrentSession()
  } catch (error) {
    logAuthError("sign-out", error)
  }
}

export async function resendVerificationAction(): Promise<ResendResult> {
  const pendingToken = await getPendingVerificationToken()
  if (!pendingToken) return { ok: false, reason: "expired" }

  const meta = await currentRequestMeta()
  const ipLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.resendVerificationIp,
    key: meta.ipAddress,
    policy: AUTH_RATE_LIMITS.resendVerificationIp,
  })
  if (!ipLimit.allowed) return { ok: false, reason: "rate_limit" }

  try {
    const record = await prisma.verificationToken.findUnique({
      where: { tokenHash: hashToken(pendingToken) },
      include: { user: true },
    })

    if (
      !record ||
      record.type !== "EMAIL_VERIFICATION" ||
      record.expiresAt <= new Date() ||
      record.user.emailVerified
    ) {
      await clearPendingVerificationCookie()
      return { ok: false, reason: "expired" }
    }

    const elapsedSeconds =
      (Date.now() - record.createdAt.getTime()) / 1000
    if (elapsedSeconds < RESEND_COOLDOWN_SECONDS) {
      return { ok: false, reason: "rate_limit" }
    }

    await sendVerificationSafely({
      userId: record.userId,
      email: record.user.email,
      name: record.user.name,
    })
    return { ok: true }
  } catch (error) {
    logAuthError("resend verification", error)
    return { ok: false, reason: "error" }
  }
}

export async function requestPasswordResetAction(
  email: string,
): Promise<RequestPasswordResetResult> {
  const parsed = emailSchema.safeParse(email)
  if (!parsed.success) return { ok: true }

  const normalizedEmail = normalizeEmail(parsed.data)
  const meta = await currentRequestMeta()

  const ipLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.passwordResetIp,
    key: meta.ipAddress,
    policy: AUTH_RATE_LIMITS.passwordResetIp,
  })
  if (!ipLimit.allowed) return { ok: true }

  const emailLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.passwordResetEmail,
    key: normalizedEmail,
    policy: AUTH_RATE_LIMITS.passwordResetEmail,
  })
  if (!emailLimit.allowed) return { ok: true }

  try {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })
    if (!user) return { ok: true }

    if (!env.siteUrl) {
      logAuthError("password reset request", new Error("Site URL is not configured"))
      return { ok: true }
    }

    const latest = await prisma.verificationToken.findFirst({
      where: { userId: user.id, type: "PASSWORD_RESET" },
      orderBy: { createdAt: "desc" },
    })
    if (
      latest &&
      Date.now() - latest.createdAt.getTime() < RESEND_COOLDOWN_SECONDS * 1000
    ) {
      return { ok: true }
    }

    const token = await issueToken(
      user.id,
      "PASSWORD_RESET",
      RESET_TTL_SECONDS,
    )

    try {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        url: passwordResetUrl(token),
      })
    } catch (error) {
      logAuthError("password reset email", error)
    }
  } catch (error) {
    logAuthError("password reset request", error)
  }

  return { ok: true }
}

export async function resetPasswordAction(
  input: ResetPasswordInput,
): Promise<ResetPasswordResult> {
  const parsed = resetPasswordSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: fieldErrorsOf(parsed.error),
    }
  }

  const meta = await currentRequestMeta()
  const ipLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.resetPasswordIp,
    key: meta.ipAddress,
    policy: AUTH_RATE_LIMITS.resetPasswordIp,
  })
  if (!ipLimit.allowed) return { ok: false, reason: "rate_limit" }

  const tokenLimit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.resetPasswordToken,
    key: parsed.data.token,
    policy: AUTH_RATE_LIMITS.resetPasswordToken,
  })
  if (!tokenLimit.allowed) return { ok: false, reason: "rate_limit" }

  try {
    const record = await prisma.verificationToken.findUnique({
      where: { tokenHash: hashToken(parsed.data.token) },
      include: { user: true },
    })

    if (
      !record ||
      record.type !== "PASSWORD_RESET" ||
      record.expiresAt <= new Date()
    ) {
      if (record) {
        await prisma.verificationToken
          .delete({ where: { id: record.id } })
          .catch(() => undefined)
      }
      return { ok: false, reason: "invalid" }
    }

    const passwordHash = await hashPassword(parsed.data.password)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: {
          passwordHash,
          emailVerified: record.user.emailVerified ?? new Date(),
          failedLoginAttempts: 0,
          lockedUntil: null,
        },
      }),
      prisma.verificationToken.deleteMany({
        where: { userId: record.userId },
      }),
      prisma.session.deleteMany({ where: { userId: record.userId } }),
    ])
    await clearAuthRateLimit(
      AUTH_RATE_LIMIT_SCOPE.resetPasswordToken,
      parsed.data.token,
    )
    await clearSessionCookie()

    return { ok: true }
  } catch (error) {
    logAuthError("password reset", error)
    return { ok: false, reason: "error" }
  }
}
