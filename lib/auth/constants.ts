const production = process.env.NODE_ENV === "production"

/**
 * The `__Host-` prefix makes browsers reject cookies that try to set a Domain,
 * a non-root Path, or omit Secure. That blocks a compromised sibling subdomain
 * from overwriting the session cookie in production. Local development runs on
 * HTTP, where the prefix cannot be used.
 */
export const SESSION_COOKIE = production
  ? "__Host-af_session"
  : "af_session"
export const PENDING_COOKIE = production
  ? "__Host-af_pending_verification"
  : "af_pending_verification"
export const OAUTH_STATE_COOKIE = production
  ? "__Host-af_oauth_state"
  : "af_oauth_state"
export const OAUTH_VERIFIER_COOKIE = production
  ? "__Host-af_oauth_verifier"
  : "af_oauth_verifier"
export const OAUTH_REDIRECT_COOKIE = production
  ? "__Host-af_oauth_redirect"
  : "af_oauth_redirect"
// `__Host-` cookies must use Path=/ and must not set a Domain. Keeping the
// short-lived OAuth cookies on the root path also stops a sibling subdomain
// from injecting a state/verifier pair into the callback.
export const OAUTH_COOKIE_PATH = "/"

export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30
export const PENDING_TTL_SECONDS = 60 * 60 * 24
export const VERIFICATION_TTL_SECONDS = 60 * 60 * 24
export const RESET_TTL_SECONDS = 60 * 60
export const RESEND_COOLDOWN_SECONDS = 60
export const OAUTH_COOKIE_TTL_SECONDS = 60 * 10

export const MAX_LOGIN_ATTEMPTS = 5
export const LOCKOUT_SECONDS = 60 * 15
