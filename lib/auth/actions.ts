"use server"

import { ID, AppwriteException, OAuthProvider } from "node-appwrite"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  createAdminClient,
  createSessionClient,
  setSessionCookie,
  SESSION_COOKIE,
  PENDING_COOKIE,
} from "@/lib/server/appwrite"
import { env } from "@/lib/env"
import { signInSchema, signUpSchema, fieldErrorsOf } from "@/lib/validations/auth"
import type { SignInResult, SignUpResult, ResendResult } from "@/types"

const isProduction = process.env.NODE_ENV === "production"

/**
 * Logs the real cause of an auth failure to the server console (dev terminal),
 * unpacking AppwriteException so you see the code, type, and message instead of
 * the vague result string the client receives.
 */
function logAuthError(context: string, error: unknown): void {
  if (error instanceof AppwriteException) {
    console.error(
      `[auth] ${context} failed:`,
      `code=${error.code}`,
      `type=${error.type}`,
      `message=${error.message}`,
    )
  } else {
    console.error(`[auth] ${context} failed:`, error)
  }
}

// How long the unverified sign-up session stays available for resending the
// verification email before the pending cookie expires.
const PENDING_TTL_MS = 60 * 60 * 1000 // 1 hour

async function setPendingVerificationCookie(secret: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(PENDING_COOKIE, secret, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + PENDING_TTL_MS),
  })
}

export async function signInAction(input: {
  email: string
  password: string
}): Promise<SignInResult> {
  const parsed = signInSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, reason: "invalid", fieldErrors: fieldErrorsOf(parsed.error) }
  }
  const { email, password } = parsed.data

  const { account } = createAdminClient()

  let session
  try {
    session = await account.createEmailPasswordSession({ email, password })
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 401) {
      return { ok: false, reason: "invalid" }
    }
    logAuthError("signInAction:createSession", error)
    return { ok: false, reason: "error" }
  }

  // Enforce verified email before granting a session cookie.
  try {
    const sessionClient = await createSessionClient(session.secret)
    const user = await sessionClient.account.get()
    if (!user.emailVerification) {
      try {
        await sessionClient.account.deleteSession({ sessionId: "current" })
      } catch {
        // best effort — the unverified session will expire on its own
      }
      return { ok: false, reason: "unverified" }
    }
  } catch (error) {
    logAuthError("signInAction:verifyCheck", error)
    return { ok: false, reason: "error" }
  }

  await setSessionCookie(session.secret, session.expire)
  const cookieStore = await cookies()
  cookieStore.delete(PENDING_COOKIE)
  return { ok: true }
}

export async function signUpAction(input: {
  name: string
  email: string
  password: string
  confirmPassword: string
}): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, reason: "invalid", fieldErrors: fieldErrorsOf(parsed.error) }
  }
  const { name, email, password } = parsed.data

  const { account } = createAdminClient()

  try {
    await account.create({ userId: ID.unique(), email, password, name })
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 409) {
      return { ok: false, reason: "exists" }
    }
    logAuthError("signUpAction:create", error)
    return { ok: false, reason: "error" }
  }

  // Send the verification email from the new session. We do NOT log the user in
  // (no SESSION_COOKIE), but we keep the session secret in the short-lived
  // pending cookie so the check-email page can resend without the password.
  try {
    const session = await account.createEmailPasswordSession({ email, password })
    const sessionClient = await createSessionClient(session.secret)
    await sessionClient.account.createVerification({
      url: env.appwrite.verifyRedirectUrl,
    })
    await setPendingVerificationCookie(session.secret)
  } catch (error) {
    // Account was created; surface a generic error so the user can retry sign-in
    // (which will re-send verification via the resend flow later).
    logAuthError("signUpAction:verify", error)
    return { ok: false, reason: "error" }
  }

  return { ok: true, verificationSent: true }
}

/**
 * Resends the verification email using the unverified session stashed in the
 * pending cookie at sign-up. Returns `expired` when that cookie is gone (window
 * lapsed or the user never signed up in this browser).
 */
export async function resendVerificationAction(): Promise<ResendResult> {
  const cookieStore = await cookies()
  const pendingSecret = cookieStore.get(PENDING_COOKIE)?.value
  if (!pendingSecret) {
    return { ok: false, reason: "expired" }
  }

  try {
    const sessionClient = await createSessionClient(pendingSecret)
    await sessionClient.account.createVerification({
      url: env.appwrite.verifyRedirectUrl,
    })
    return { ok: true }
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 429) {
      return { ok: false, reason: "rate_limit" }
    }
    logAuthError("resendVerificationAction", error)
    return { ok: false, reason: "error" }
  }
}

export async function signOutAction(): Promise<void> {
  try {
    const { account } = await createSessionClient()
    await account.deleteSession({ sessionId: "current" })
  } catch {
    // no active session / already signed out
  }
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  cookieStore.delete(PENDING_COOKIE)
}

/**
 * Starts the Google OAuth2 flow. Appwrite redirects the user to Google's
 * consent screen; on success Google returns to Appwrite, which appends a
 * one-time `userId` + `secret` to our callback route where the session
 * cookie is created (`app/api/auth/oauth/route.ts`).
 *
 * The OAuth URL is built manually and the browser is redirected to it —
 * the admin SDK's `createOAuth2Token` cannot be used here because this
 * Appwrite server rejects OAuth token requests that carry an API key
 * (401 "Invalid redirect"). The endpoint must be hit as the end user.
 *
 * `redirectPath` is the post-login destination and is re-validated here —
 * only same-origin relative paths are forwarded to the callback.
 */
export async function signInWithGoogleAction(redirectPath?: string): Promise<void> {
  const safePath =
    redirectPath && redirectPath.startsWith("/") && !redirectPath.startsWith("//")
      ? redirectPath
      : "/"

  let authUrl: string
  try {
    if (!env.siteUrl) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is not set — add it to .env.local and restart the dev server",
      )
    }
    const successUrl = new URL("/api/auth/oauth", env.siteUrl)
    successUrl.searchParams.set("redirect", safePath)
    const failureUrl = new URL("/sign-in?error=oauth", env.siteUrl)

    const oauthUrl = new URL(
      `${env.appwrite.endpoint}/account/tokens/oauth2/${OAuthProvider.Google}`,
    )
    oauthUrl.searchParams.set("project", env.appwrite.projectId)
    oauthUrl.searchParams.set("success", successUrl.toString())
    oauthUrl.searchParams.set("failure", failureUrl.toString())
    authUrl = oauthUrl.toString()
  } catch (error) {
    logAuthError("signInWithGoogleAction:buildOAuthUrl", error)
    redirect("/sign-in?error=oauth")
  }

  redirect(authUrl)
}
