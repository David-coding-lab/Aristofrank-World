/**
 * Public origin of this deployment. Metadata is generated server-side, so this
 * cannot be read from the browser; the request `Host` header is spoofable and
 * would opt the root layout into dynamic rendering. Set per environment.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (configured) {
    return configured.replace(/\/+$/, "")
  }

  // Vercel injects per-deployment URLs for every build. Prefer the project's
  // stable production origin (NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) over
  // the current deployment's VERCEL_URL, which can be a short-lived preview
  // URL even when building the production deployment.
  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/^https?:\/\//, "")}`
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Set it to this deployment's own origin."
    )
  }

  return "http://localhost:3000"
}

export const siteUrl = resolveSiteUrl()

export const env = {
  siteUrl,
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    verifyRedirectUrl: process.env.NEXT_PUBLIC_APPWRITE_VERIFY_REDIRECT_URL!,
    resetRedirectUrl: process.env.NEXT_PUBLIC_APPWRITE_RESET_REDIRECT_URL!,
  },
} as const
