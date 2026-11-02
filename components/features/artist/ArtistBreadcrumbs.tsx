import Link from "next/link"
import { siteUrl } from "@/lib/env"

interface ArtistBreadcrumbsProps {
  artistName: string
  artistSlug: string
}

/** Visible breadcrumbs plus the matching BreadcrumbList structured data. */
export function ArtistBreadcrumbs({
  artistName,
  artistSlug,
}: ArtistBreadcrumbsProps) {
  const base = siteUrl || "http://localhost:3000"
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artists",
        item: `${base}/artist`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artistName,
        item: `${base}/artist/${artistSlug}`,
      },
    ],
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
          <li>
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/artist" className="transition-colors hover:text-accent">
              Artists
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-white">
            {artistName}
          </li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}
