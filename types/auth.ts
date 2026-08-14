import type { User } from "./user"

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  name: string
  email: string
  password: string
}

/** Per-field validation messages keyed by field name (e.g. `{ email: "..." }`). */
export type FieldErrors = Record<string, string>

/**
 * Result of `signInAction`. A thrown custom Error can't cross the server→client
 * boundary with its type intact, so actions return plain discriminated results
 * that the form maps to inline messages.
 */
export type SignInResult =
  | { ok: true }
  | {
      ok: false
      reason: "invalid" | "unverified" | "error"
      fieldErrors?: FieldErrors
    }

/** Result of `signUpAction`. */
export type SignUpResult =
  | { ok: true; verificationSent: true }
  | {
      ok: false
      reason: "invalid" | "exists" | "error"
      fieldErrors?: FieldErrors
    }

/**
 * Result of `resendVerificationAction`. `expired` means the pending-verification
 * window lapsed; `rate_limit` means Appwrite is throttling resend attempts.
 */
export type ResendResult =
  | { ok: true }
  | { ok: false; reason: "expired" | "rate_limit" | "error" }
