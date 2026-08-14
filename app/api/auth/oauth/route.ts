import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AppwriteException } from "node-appwrite"
import { cookies } from "next/headers"
import { z } from "zod"
import {
  createAdminClient,
  setSessionCookie,
  PENDING_COOKIE,
} from "@/lib/server/appwrite"

/**
 * OAuth2 callback (public by necessity — Appwrite redirects here after the
 * provider consent screen, before any session exists). Exchanges the one-time
 * `userId` + `secret` token for a session and sets the same httpOnly cookie
 * as the email/password flow, so `proxy.ts` and `getCurrentUser` work
 * unchanged.
 */

const callbackParamsSchema = z.object({
  userId: z.string().min(1).max(36),
  secret: z.string().min(1),
})

/**
 * Post-login destination forwarded through the OAuth flow. Only same-origin
 * relative paths are honored — mirrors `safeRedirectTarget` on the sign-in
 * page to prevent open redirects.
 */
function safeRedirectPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/"
  return raw
}

/**
 * Google proved ownership of this email. If the linked account was still
 * unverified (e.g. a prior unverified email/password sign-up on the same
 * email), mark it verified so the UI (`getCurrentUser`) and route guard agree,
 * and rotate any existing password to an unknown value so that stale
 * credential can't be used to enter the now Google-owned account (the owner
 * can set a new one via password recovery). Best-effort: never block login.
 */
async function upgradeOAuthAccount(userId: string): Promise<void> {
  try {
    const { users } = createAdminClient()
    const user = await users.get({ userId })
    if (user.emailVerification) return // already verified — nothing to do
    if (user.passwordUpdate) {
      // A password was set at some point → invalidate it (owner can recover).
      await users.updatePassword({
        userId,
        password: `${crypto.randomUUID()}${crypto.randomUUID()}`,
      })
    }
    await users.updateEmailVerification({ userId, emailVerification: true })
  } catch (error) {
    // If this fails the account stays in the split-brain state, so log loudly.
    console.error("[auth] oauth verify-upgrade failed:", error)
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const failureUrl = new URL("/sign-in?error=oauth", request.url)

  const parsed = callbackParamsSchema.safeParse({
    userId: searchParams.get("userId"),
    secret: searchParams.get("secret"),
  })
  if (!parsed.success) {
    return NextResponse.redirect(failureUrl)
  }

  try {
    const { account } = createAdminClient()
    const session = await account.createSession(parsed.data)
    await setSessionCookie(session.secret, session.expire)
    await upgradeOAuthAccount(parsed.data.userId)
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error(
        "[auth] oauth callback failed:",
        `code=${error.code}`,
        `type=${error.type}`,
        `message=${error.message}`,
      )
    } else {
      console.error("[auth] oauth callback failed:", error)
    }
    return NextResponse.redirect(failureUrl)
  }

  const cookieStore = await cookies()
  cookieStore.delete(PENDING_COOKIE)

  const destination = safeRedirectPath(searchParams.get("redirect"))
  return NextResponse.redirect(new URL(destination, request.url))
}
