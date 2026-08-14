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

  // Vercel injects VERCEL_URL for every deployment; fall back to it so
  // builds succeed before a custom domain or env var is configured.
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL
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
