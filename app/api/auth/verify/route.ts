import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { env } from "@/lib/env"
import {
  clearPendingVerificationCookie,
  getPendingVerificationToken,
} from "@/lib/auth/cookies"
import { RESET_TTL_SECONDS } from "@/lib/auth/constants"
import { logAuthError } from "@/lib/auth/log"
import {
  AUTH_RATE_LIMIT_SCOPE,
  AUTH_RATE_LIMITS,
  consumeAuthRateLimit,
} from "@/lib/auth/rate-limit"
import { requestMeta } from "@/lib/auth/request"
import { generateToken, hashToken } from "@/lib/auth/tokens"

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")
  const appUrl = env.siteUrl || request.url
  const invalidUrl = new URL("/sign-in?verify=invalid", appUrl)
  const successUrl = new URL("/sign-in?verified=1", appUrl)

  if (!token) {
    return NextResponse.redirect(invalidUrl)
  }

  const limit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.verifyEmailIp,
    key: requestMeta(request.headers).ipAddress,
    policy: AUTH_RATE_LIMITS.verifyEmailIp,
  })
  if (!limit.allowed) {
    return NextResponse.redirect(new URL("/sign-in?verify=rate_limit", appUrl))
  }

  try {
    const record = await prisma.verificationToken.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: true },
    })

    if (
      !record ||
      record.type !== "EMAIL_VERIFICATION" ||
      record.expiresAt <= new Date()
    ) {
      if (record) {
        await prisma.verificationToken
          .delete({ where: { id: record.id } })
          .catch(() => undefined)
      }
      return NextResponse.redirect(invalidUrl)
    }

    if (record.user.emailVerified) {
      await prisma.verificationToken.deleteMany({
        where: { userId: record.userId, type: "EMAIL_VERIFICATION" },
      })
      await clearPendingVerificationCookie()
      return NextResponse.redirect(successUrl)
    }

    // A verification link is safe to open in the browser that created the
    // account. If it is opened elsewhere (another device, or an email security
    // scanner), do not keep a password that may have been chosen by whoever
    // pre-registered the address. Clear it and hand the mailbox owner a reset
    // token instead.
    const pendingToken = await getPendingVerificationToken()
    const sameBrowser = Boolean(
      pendingToken && hashToken(pendingToken) === record.tokenHash,
    )
    const resetToken =
      !sameBrowser && record.user.passwordHash ? generateToken() : null

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: record.userId },
        data: {
          emailVerified: new Date(),
          ...(sameBrowser
            ? {}
            : {
                passwordHash: null,
                failedLoginAttempts: 0,
                lockedUntil: null,
              }),
        },
      })
      await tx.verificationToken.deleteMany({
        where: { userId: record.userId },
      })
      await tx.session.deleteMany({ where: { userId: record.userId } })

      if (resetToken) {
        await tx.verificationToken.create({
          data: {
            userId: record.userId,
            type: "PASSWORD_RESET",
            tokenHash: hashToken(resetToken),
            expiresAt: new Date(Date.now() + RESET_TTL_SECONDS * 1000),
          },
        })
      }
    })

    await clearPendingVerificationCookie()

    if (resetToken) {
      const resetUrl = new URL("/reset-password", appUrl)
      resetUrl.searchParams.set("token", resetToken)
      resetUrl.searchParams.set("verified", "1")
      return NextResponse.redirect(resetUrl)
    }

    return NextResponse.redirect(successUrl)
  } catch (error) {
    logAuthError("email verification", error)
    return NextResponse.redirect(invalidUrl)
  }
}
