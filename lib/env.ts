import "server-only"

/**
 * Public origin of this deployment. Keep this in trusted configuration; the
 * request `Host` header is spoofable and must not become the origin used for
 * OAuth callbacks, email links, or canonical URLs. Set per environment.
 *
 * Normalizes a bare origin to a full URL: strips trailing slashes, prepends
 * https:// when the protocol was omitted, and returns "" when the value does
 * not parse as an http(s) origin (e.g. stray quotes or whitespace) so callers
 * can fall back to a sane default.
 */
function normalizeOrigin(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "")
  if (!trimmed) return ""
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(candidate)
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.origin
    }
  } catch {
    // Not a parseable origin — leave it to the caller's fallbacks.
  }
  return ""
}

function resolveSiteUrl(): string {
  const configured = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "")

  if (configured) {
    return configured
  }

  // Vercel injects per-deployment URLs for every build. Prefer the project's
  // stable production origin (NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) over
  // the current deployment's VERCEL_URL, which can be a short-lived preview
  // URL even when building the production deployment.
  const vercelUrl = normalizeOrigin(
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.NEXT_PUBLIC_VERCEL_URL ??
      process.env.VERCEL_URL ??
      "",
  )
  if (vercelUrl) {
    return vercelUrl
  }

  if (process.env.NODE_ENV === "production" && !vercelUrl) {
    // Other hosts do not inject a deployment origin. Metadata is still emitted
    // with relative og:image paths; consumers that need an absolute origin
    // guard on `siteUrl`.
    return ""
  }

  return "http://localhost:3000"
}

export const siteUrl = resolveSiteUrl()

const googleRedirectUri =
  process.env.GOOGLE_REDIRECT_URI?.trim() ||
  (siteUrl ? `${siteUrl}/api/auth/google/callback` : "")

export const env = {
  siteUrl,
  databaseUrl: process.env.DATABASE_URL ?? "",
  email: {
    apiKey: process.env.RESEND_API_KEY ?? "",
    from: process.env.EMAIL_FROM ?? "",
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    redirectUri: googleRedirectUri,
  },
} as const

export function hasEmailConfig(): boolean {
  return Boolean(env.siteUrl && env.email.apiKey && env.email.from)
}
