import "server-only"

import { cookies } from "next/headers"
import {
  OAUTH_COOKIE_PATH,
  OAUTH_COOKIE_TTL_SECONDS,
  OAUTH_REDIRECT_COOKIE,
  OAUTH_STATE_COOKIE,
  OAUTH_VERIFIER_COOKIE,
  PENDING_COOKIE,
  PENDING_TTL_SECONDS,
  SESSION_COOKIE,
} from "./constants"

function secureCookies(): boolean {
  return process.env.NODE_ENV === "production"
}

function cookieOptions(path = "/") {
  return {
    httpOnly: true,
    secure: secureCookies(),
    sameSite: "lax" as const,
    path,
  }
}

export async function setSessionCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    ...cookieOptions(),
    expires: expiresAt,
  })
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.set(SESSION_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  })
}

export async function setPendingVerificationCookie(
  token: string,
): Promise<void> {
  const store = await cookies()
  store.set(PENDING_COOKIE, token, {
    ...cookieOptions(),
    maxAge: PENDING_TTL_SECONDS,
  })
}

export async function getPendingVerificationToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(PENDING_COOKIE)?.value ?? null
}

export async function clearPendingVerificationCookie(): Promise<void> {
  const store = await cookies()
  store.set(PENDING_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  })
}

export async function setOAuthCookies(
  state: string,
  verifier: string,
  redirectTo: string,
): Promise<void> {
  const store = await cookies()
  const options = {
    ...cookieOptions(OAUTH_COOKIE_PATH),
    maxAge: OAUTH_COOKIE_TTL_SECONDS,
  }
  store.set(OAUTH_STATE_COOKIE, state, options)
  store.set(OAUTH_VERIFIER_COOKIE, verifier, options)
  store.set(OAUTH_REDIRECT_COOKIE, redirectTo, options)
}

export async function getOAuthCookies(): Promise<{
  state: string | null
  verifier: string | null
  redirectTo: string
}> {
  const store = await cookies()
  return {
    state: store.get(OAUTH_STATE_COOKIE)?.value ?? null,
    verifier: store.get(OAUTH_VERIFIER_COOKIE)?.value ?? null,
    redirectTo: store.get(OAUTH_REDIRECT_COOKIE)?.value ?? "/",
  }
}

export async function clearOAuthCookies(): Promise<void> {
  const store = await cookies()
  for (const name of [
    OAUTH_STATE_COOKIE,
    OAUTH_VERIFIER_COOKIE,
    OAUTH_REDIRECT_COOKIE,
  ]) {
    store.set(name, "", {
      ...cookieOptions(OAUTH_COOKIE_PATH),
      maxAge: 0,
    })
  }
}
