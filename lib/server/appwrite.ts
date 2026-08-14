import "server-only"

import { Client, Account, TablesDB, Users } from "node-appwrite"
import { cookies } from "next/headers"
import { env } from "@/lib/env"

export const SESSION_COOKIE = "a_session"

/**
 * Short-lived cookie holding the unverified user's session secret after sign-up.
 * Lets the check-email page resend the verification email without re-asking for
 * the password. It is deliberately NOT the login cookie — route protection
 * (`proxy.ts`) and `getCurrentUser` only ever read `SESSION_COOKIE`, so holding
 * this does not grant access to protected routes.
 */
export const PENDING_COOKIE = "a_pending_verification"

/**
 * Stores the Appwrite session secret in the httpOnly login cookie. Shared by
 * the email/password sign-in action and the OAuth callback route so both
 * flows produce identical cookies.
 */
export async function setSessionCookie(secret: string, expire: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expire),
  })
}

/**
 * Admin client authenticated with the auth-scoped server API key
 * (sessions/users scopes only — no database access). Used for operations that
 * must run before a session exists (registration, creating the initial
 * email/password session whose secret we store in the cookie) and for managing
 * a user account out-of-band via the `users` service (e.g. marking an OAuth
 * user's email verified). Requires `users.read`/`users.write` scopes on the key.
 */
export function createAdminClient() {
  const apiKey = process.env.APPWRITE_API_KEY
  if (!apiKey) {
    throw new Error("APPWRITE_API_KEY is not set")
  }

  const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(apiKey)

  return {
    get account() {
      return new Account(client)
    },
    get users() {
      return new Users(client)
    },
  }
}

/**
 * Admin client authenticated with the database-scoped server API key
 * (Databases read/write only — no auth scopes). Used exclusively for writes
 * to tables that grant no client write permissions. Keeping this key separate
 * from the auth key means neither key holds more power than its call sites need.
 */
export function createDbAdminClient() {
  const apiKey = process.env.APPWRITE_DB_API_KEY
  if (!apiKey) {
    throw new Error("APPWRITE_DB_API_KEY is not set")
  }

  const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(apiKey)

  return {
    get tables() {
      return new TablesDB(client)
    },
  }
}

/**
 * Client scoped to a single user's session. Pass a `secret` explicitly during
 * sign-up (before the cookie is set); otherwise it reads the session secret from
 * the httpOnly cookie so Server Components and actions act as the logged-in user.
 */
export async function createSessionClient(secret?: string) {
  const sessionSecret = secret ?? (await cookies()).get(SESSION_COOKIE)?.value
  if (!sessionSecret) {
    throw new Error("No session")
  }

  const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setSession(sessionSecret)

  return {
    get account() {
      return new Account(client)
    },
  }
}

/**
 * Unauthenticated client for reading publicly-readable data from Server
 * Components. It carries no session and no API key, so it can only ever read
 * rows whose permissions grant read to `Any`. The caller is responsible for
 * filtering to publicly-visible rows; pending/draft rows must not be surfaced.
 */
export function createPublicClient() {
  const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)

  return {
    get tables() {
      return new TablesDB(client)
    },
  }
}
