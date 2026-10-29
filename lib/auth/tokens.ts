import "server-only"

import { createHash, randomBytes } from "node:crypto"

/** Creates a URL-safe token with 256 bits of entropy. */
export function generateToken(): string {
  return randomBytes(32).toString("base64url")
}

/**
 * Only the hash is stored in Postgres. A database leak therefore does not
 * expose usable session, verification, or password-reset tokens.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex")
}
