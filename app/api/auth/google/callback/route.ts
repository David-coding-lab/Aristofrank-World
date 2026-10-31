import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { env } from "@/lib/env"
import {
  clearOAuthCookies,
  clearPendingVerificationCookie,
  getOAuthCookies,
} from "@/lib/auth/cookies"
import { normalizeEmail } from "@/lib/auth/identity"
import { logAuthError } from "@/lib/auth/log"
import { exchangeGoogleCode, fetchGoogleUserInfo } from "@/lib/auth/oauth"
import {
  AUTH_RATE_LIMIT_SCOPE,
  AUTH_RATE_LIMITS,
  consumeAuthRateLimit,
} from "@/lib/auth/rate-limit"
import { safeRedirectPath } from "@/lib/auth/redirects"
import { requestMeta } from "@/lib/auth/request"
import { createSession } from "@/lib/auth/session"
import { emailSchema } from "@/lib/validations/auth"

export async function GET(request: NextRequest) {
  const appUrl = env.siteUrl || request.url
  const failureUrl = new URL("/sign-in?error=oauth", appUrl)

  if (request.nextUrl.searchParams.get("error") === "access_denied") {
    await clearOAuthCookies()
    return NextResponse.redirect(new URL("/sign-in", appUrl))
  }

  const limit = await consumeAuthRateLimit({
    scope: AUTH_RATE_LIMIT_SCOPE.oauthIp,
    key: requestMeta(request.headers).ipAddress,
    policy: AUTH_RATE_LIMITS.oauthIp,
  })
  if (!limit.allowed) {
    await clearOAuthCookies()
    return NextResponse.redirect(
      new URL("/sign-in?error=rate_limit", appUrl),
    )
  }

  const oauth = await getOAuthCookies()

  const code = request.nextUrl.searchParams.get("code")
  const state = request.nextUrl.searchParams.get("state")

  if (
    !code ||
    !state ||
    !oauth.state ||
    !oauth.verifier ||
    state !== oauth.state
  ) {
    await clearOAuthCookies()
    return NextResponse.redirect(failureUrl)
  }

  try {
    const tokens = await exchangeGoogleCode(code, oauth.verifier)
    const profile = await fetchGoogleUserInfo(tokens.accessToken)

    if (!profile.emailVerified) {
      throw new Error("Google account email is not verified")
    }

    const parsedEmail = emailSchema.safeParse(profile.email)
    if (!parsedEmail.success) {
      throw new Error("Google account email is invalid")
    }

    const email = normalizeEmail(parsedEmail.data)
    const name = (
      profile.name?.trim() ||
      email.split("@")[0] ||
      "Aristofrank user"
    ).slice(0, 128)

    const user = await prisma.$transaction(async (tx) => {
      const linked = await tx.oAuthAccount.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: profile.sub,
          },
        },
        include: { user: true },
      })

      if (linked) {
        await tx.verificationToken.deleteMany({
          where: { userId: linked.userId },
        })
        if (!linked.user.emailVerified) {
          // A Google-verified email proves control of the address. Clear any
          // password that was set while the account was unverified so someone
          // who pre-registered the address cannot keep a usable credential.
          await tx.session.deleteMany({ where: { userId: linked.userId } })
          return tx.user.update({
            where: { id: linked.userId },
            data: {
              emailVerified: new Date(),
              passwordHash: null,
              failedLoginAttempts: 0,
              lockedUntil: null,
              image: linked.user.image ?? profile.picture,
            },
          })
        }
        return linked.user
      }

      const existing = await tx.user.findUnique({ where: { email } })

      if (existing) {
        await tx.oAuthAccount.create({
          data: {
            userId: existing.id,
            provider: "google",
            providerAccountId: profile.sub,
          },
        })
        await tx.verificationToken.deleteMany({
          where: { userId: existing.id },
        })
        if (!existing.emailVerified) {
          // Same protection as above: never leave a password created by a
          // pre-registration attempt attached to a now-verified account.
          await tx.session.deleteMany({ where: { userId: existing.id } })
          return tx.user.update({
            where: { id: existing.id },
            data: {
              emailVerified: new Date(),
              passwordHash: null,
              failedLoginAttempts: 0,
              lockedUntil: null,
              image: existing.image ?? profile.picture,
            },
          })
        }
        return existing
      }

      return tx.user.create({
        data: {
          name,
          email,
          emailVerified: new Date(),
          image: profile.picture,
          oauthAccounts: {
            create: {
              provider: "google",
              providerAccountId: profile.sub,
            },
          },
        },
      })
    })

    await createSession(user.id, requestMeta(request.headers))
    await clearPendingVerificationCookie()
    await clearOAuthCookies()

    return NextResponse.redirect(
      new URL(safeRedirectPath(oauth.redirectTo), appUrl),
    )
  } catch (error) {
    logAuthError("Google OAuth callback", error)
    await clearOAuthCookies()
    return NextResponse.redirect(failureUrl)
  }
}
