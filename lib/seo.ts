import type { Metadata } from "next"

interface PageMetadataInput {
  title: string
  description: string
  path: string
  imageUrl?: string
  imageAlt?: string
}

const DEFAULT_OG_IMAGE = "/opengraph-image"

/**
 * Builds the metadata contract required for every public route: title,
 * description, canonical URL, Open Graph image with explicit dimensions, and
 * a Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  imageUrl = DEFAULT_OG_IMAGE,
  imageAlt,
}: PageMetadataInput): Metadata {
  const image = {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: imageAlt ?? title,
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

/** Keeps meta descriptions inside the 120–155 character target. */
export function truncateDescription(text: string, maxLength = 155): string {
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
}
