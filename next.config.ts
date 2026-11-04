import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Vercel injects its Live feedback toolbar into deployments and serves it from
// both vercel.live and the deployment's own *.vercel.app origin. Widen the
// policy only when building on Vercel so local and self-hosted builds keep the
// stricter baseline. See SECURITY.md for the trust boundary on this origin.
const isVercelDeployment = Boolean(process.env.VERCEL);

function toOrigin(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).origin;
  } catch {
    return null;
  }
}

// `'self'` already covers the origin currently rendering, but the toolbar and
// its assets can be fetched from the deployment alias even when the page is
// served from a custom domain. Include the known Vercel origins explicitly.
const vercelDeploymentOrigins = isVercelDeployment
  ? Array.from(
      new Set(
        [
          toOrigin(process.env.NEXT_PUBLIC_SITE_URL),
          toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
          toOrigin(process.env.VERCEL_URL),
        ].filter((origin): origin is string => Boolean(origin)),
      ),
    )
  : [];

function allowlist(sources: string[]): string {
  return sources.length > 0 ? ` ${sources.join(" ")}` : "";
}

const vercelLiveScript = isVercelDeployment
  ? allowlist(["https://vercel.live", ...vercelDeploymentOrigins])
  : "";
const vercelLiveConnect = isVercelDeployment
  ? allowlist([
      "https://vercel.live",
      "wss://ws-us3.pusher.com",
      ...vercelDeploymentOrigins,
    ])
  : "";
const vercelLiveImage = isVercelDeployment
  ? allowlist([
      "https://vercel.live",
      "https://vercel.com",
      ...vercelDeploymentOrigins,
    ])
  : "";
const vercelLiveStyle = isVercelDeployment
  ? allowlist(["https://vercel.live", ...vercelDeploymentOrigins])
  : "";
const vercelLiveFont = isVercelDeployment
  ? allowlist([
      "https://vercel.live",
      "https://assets.vercel.com",
      ...vercelDeploymentOrigins,
    ])
  : "";
const vercelLiveFrame = isVercelDeployment
  ? allowlist(["https://vercel.live", ...vercelDeploymentOrigins]).trim()
  : "'none'";

// Next injects inline bootstrap scripts and this UI uses inline style props, so
// the policy keeps inline script/style allowances while blocking plugins,
// framing, base-tag hijacking, and cross-origin form posts. A nonce-based
// script policy would require every page to render dynamically; see SECURITY.md.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}${vercelLiveScript}`,
  "script-src-attr 'none'",
  `style-src 'self' 'unsafe-inline'${vercelLiveStyle}`,
  `img-src 'self' data: blob: https://images.unsplash.com https://commondatastorage.googleapis.com https://*.googleusercontent.com https://ik.imagekit.io${vercelLiveImage}`,
  `font-src 'self' data:${vercelLiveFont}`,
  `connect-src 'self'${isProduction ? "" : " ws: wss:"}${vercelLiveConnect}`,
  "media-src 'self' https://commondatastorage.googleapis.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  `frame-src ${vercelLiveFrame}`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Low-resource hosts: a single static-generation worker keeps CPU use flat
    // and avoids several processes competing for the same limited memory.
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "commondatastorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const noStore = [{ key: "Cache-Control", value: "no-store" }];
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/auth/:path*",
        headers: noStore,
      },
      ...["/sign-in", "/sign-up", "/forgot-password", "/reset-password", "/check-email", "/dashboard", "/profile"].map(
        (source) => ({ source, headers: noStore }),
      ),
    ];
  },
};

export default nextConfig;
