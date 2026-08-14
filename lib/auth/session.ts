import "server-only"

import { createSessionClient } from "@/lib/server/appwrite"
import type { User } from "@/types"

type RawAccount = {
  $id: string
  name: string
  email: string
  emailVerification: boolean
  prefs: Record<string, string>
}

function toUser(raw: RawAccount): User {
  return {
    id: raw.$id,
    name: raw.name,
    email: raw.email,
    emailVerification: raw.emailVerification,
    prefs: raw.prefs,
  }
}

/**
 * Reads the current user from the session cookie for Server Components.
 * Returns null when there is no session, the session is invalid, or the email
 * is unverified. `proxy.ts` handles redirect-level route protection.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { account } = await createSessionClient()
    const raw = await account.get()
    if (!raw.emailVerification) {
      return null
    }
    return toUser(raw as RawAccount)
  } catch {
    return null
  }
}
