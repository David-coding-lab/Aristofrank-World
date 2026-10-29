import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { env } from "@/lib/env"
import { setOAuthCookies } from "@/lib/auth/cookies"
import { logAuthError } from "@/lib/auth/log"
import { createGoogleAuthorizationUrl } from "@/lib/auth/oauth"
import {
  AUTH_RATE_LIMIT_SCOPE,
  AUTH_RATE_LIMITS,
  consumeAuthRateLimit,
} from "@/lib/auth/rate-limit"
import { safeRedirectPath } from "@/lib/auth/redirects"
import { requestMeta } from "@/lib/auth/request"
import { generateToken } from "@/lib/auth/tokens"

export async function GET(request: NextRequest) {
  try {
    const limit = await consumeAuthRateLimit({
      scope: AUTH_RATE_LIMIT_SCOPE.oauthIp,
      key: requestMeta(request.headers).ipAddress,
      policy: AUTH_RATE_LIMITS.oauthIp,
    })
    if (!limit.allowed) {
      return NextResponse.redirect(
        new URL("/sign-in?error=rate_limit", env.siteUrl || request.url),
      )
    }

    const state = generateToken()
    const verifier = generateToken()
    const redirectTo = safeRedirectPath(
      request.nextUrl.searchParams.get("redirect"),
    )

    const authorizationUrl = createGoogleAuthorizationUrl(state, verifier)

    await setOAuthCookies(state, verifier, redirectTo)
    return NextResponse.redirect(authorizationUrl)
  } catch (error) {
    logAuthError("Google OAuth start", error)
    return NextResponse.redirect(
      new URL("/sign-in?error=oauth", env.siteUrl || request.url),
    )
  }
}
