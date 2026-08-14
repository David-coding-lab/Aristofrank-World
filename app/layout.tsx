import type { Metadata } from "next"
import { headers } from "next/headers"
import { Playfair_Display, Open_Sans } from "next/font/google"
import "material-symbols/outlined.css"
import "./globals.css"
import { NavigationProgress } from "@/components/ui/NavigationProgress"
import { siteUrl } from "@/lib/env"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

/**
 * Resolves the deployment origin for absolute metadata URLs (og:image,
 * canonical, etc.). Prefers the configured NEXT_PUBLIC_SITE_URL, then falls
 * back to the request's Host header so previews never point at localhost.
 */
export async function generateMetadata(): Promise<Metadata> {
  let metadataBase: URL | undefined
  if (siteUrl) {
    metadataBase = new URL(siteUrl)
  } else {
    const host = (await headers()).get("host")
    if (host) metadataBase = new URL(`https://${host}`)
  }

  return {
    metadataBase,
    title: {
      default: "Aristofrank World | Where Brands Become Legends",
      template: "%s | Aristofrank World",
    },
    description:
      "Aristofrank World is a creative agency and artist management company helping brands and artists become legends through branding, visual identity, media production, music production, promotions, and strategic storytelling.",
    icons: {
      icon: { url: "/favicon.svg", type: "image/svg+xml" },
    },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: "Aristofrank World",
      title: "Aristofrank World | Where Brands Become Legends",
      description:
        "A premium creative agency and artist management company helping brands and artists become legends.",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${openSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NavigationProgress />
        {children}
      </body>
    </html>
  )
}
