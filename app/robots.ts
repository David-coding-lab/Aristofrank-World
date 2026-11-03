import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/env"

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl || "http://localhost:3000"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/sign-in",
        "/sign-up",
        "/forgot-password",
        "/reset-password",
        "/check-email",
        "/dashboard",
        "/profile",
        "/*?*",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}