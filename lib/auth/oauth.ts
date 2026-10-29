import "server-only"

import { createHash } from "node:crypto"
import { env } from "@/lib/env"

const GOOGLE_AUTHORIZATION_ENDPOINT =
  "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
const GOOGLE_USERINFO_ENDPOINT =
  "https://openidconnect.googleapis.com/v1/userinfo"

interface GoogleConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

function getGoogleConfig(): GoogleConfig {
  if (
    !env.google.clientId ||
    !env.google.clientSecret ||
    !env.google.redirectUri
  ) {
    throw new Error("Google OAuth is not configured")
  }

  return {
    clientId: env.google.clientId,
    clientSecret: env.google.clientSecret,
    redirectUri: env.google.redirectUri,
  }
}

function codeChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url")
}

/**
 * Builds Google's authorization URL using PKCE (S256). The verifier stays in an
 * HttpOnly cookie and is never sent in the browser URL; only its hash is sent
 * to Google. The client secret is added only during the server-side token
 * exchange, so it never reaches the browser.
 */
export function createGoogleAuthorizationUrl(
  state: string,
  verifier: string,
): URL {
  const config = getGoogleConfig()
  const url = new URL(GOOGLE_AUTHORIZATION_ENDPOINT)

  url.searchParams.set("client_id", config.clientId)
  url.searchParams.set("redirect_uri", config.redirectUri)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("scope", "openid profile email")
  url.searchParams.set("state", state)
  url.searchParams.set("code_challenge", codeChallenge(verifier))
  url.searchParams.set("code_challenge_method", "S256")
  url.searchParams.set("prompt", "select_account")

  return url
}

type GoogleTokenResponse = {
  access_token?: unknown
  token_type?: unknown
}

export async function exchangeGoogleCode(
  code: string,
  verifier: string,
): Promise<{ accessToken: string }> {
  const config = getGoogleConfig()
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    code_verifier: verifier,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
  })

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Google token exchange failed (${response.status})`)
  }

  const data = (await response.json()) as GoogleTokenResponse
  if (typeof data.access_token !== "string" || data.access_token.length === 0) {
    throw new Error("Google token response is missing an access token")
  }

  return { accessToken: data.access_token }
}

export interface GoogleUserInfo {
  sub: string
  email: string
  emailVerified: boolean
  name: string | null
  picture: string | null
}

type GoogleUserInfoResponse = {
  sub?: unknown
  email?: unknown
  email_verified?: unknown
  name?: unknown
  picture?: unknown
}

export async function fetchGoogleUserInfo(
  accessToken: string,
): Promise<GoogleUserInfo> {
  const response = await fetch(GOOGLE_USERINFO_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Google userinfo request failed (${response.status})`)
  }

  const data = (await response.json()) as GoogleUserInfoResponse
  if (
    typeof data.sub !== "string" ||
    data.sub.length === 0 ||
    typeof data.email !== "string"
  ) {
    throw new Error("Google userinfo response is missing required fields")
  }

  return {
    sub: data.sub,
    email: data.email,
    emailVerified: data.email_verified === true,
    name: typeof data.name === "string" ? data.name : null,
    picture: typeof data.picture === "string" ? data.picture : null,
  }
}
