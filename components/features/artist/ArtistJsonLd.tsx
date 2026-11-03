import { siteUrl } from "@/lib/env"
import type { ArtistDetail } from "@/lib/content/types"

interface ArtistJsonLdProps {
  artist: ArtistDetail
}

/** Server-rendered Person structured data for an artist profile. */
export function ArtistJsonLd({ artist }: ArtistJsonLdProps) {
  const base = siteUrl || "http://localhost:3000"
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artist.bio,
    image: artist.imageUrl,
    url: `${base}/artist/${artist.slug}`,
    jobTitle: artist.roles,
    worksFor: {
      "@type": "Organization",
      name: "Aristofrank World",
      url: base,
    },
    ...(artist.socialLinks.length > 0 ? { sameAs: artist.socialLinks } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  )
}
