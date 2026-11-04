import "server-only"

import type { Prisma } from "@prisma/client"
import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { ArtistDetail, ArtistSummary } from "./types"

const artistSummarySelect = {
  id: true,
  slug: true,
  name: true,
  roles: true,
  imageUrl: true,
  externalUrl: true,
} as const satisfies Prisma.ArtistSelect

function socialLinksOf(value: Prisma.JsonValue | null): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return []

  return Object.values(value).filter(
    (entry): entry is string => typeof entry === "string" && entry.length > 0,
  )
}

export async function getArtists(): Promise<ArtistSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.artist.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: artistSummarySelect,
  })
}

export async function getFeaturedArtists(
  limit = 4,
): Promise<ArtistSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.artist.findMany({
    where: { status: "PUBLISHED", featured: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    take: limit,
    select: artistSummarySelect,
  })
}

export async function getArtistBySlug(
  slug: string,
): Promise<ArtistDetail | null> {
  if (!isDatabaseConfigured) return null

  const artist = await prisma.artist.findUnique({
    where: { slug },
    select: {
      ...artistSummarySelect,
      bio: true,
      socialLinks: true,
      status: true,
    },
  })

  if (!artist || artist.status !== "PUBLISHED") return null

  return {
    id: artist.id,
    slug: artist.slug,
    name: artist.name,
    roles: artist.roles,
    imageUrl: artist.imageUrl,
    externalUrl: artist.externalUrl,
    bio: artist.bio,
    socialLinks: socialLinksOf(artist.socialLinks),
  }
}

export async function getRelatedArtists(
  excludeArtistId: string,
  limit = 3,
): Promise<ArtistSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.artist.findMany({
    where: { status: "PUBLISHED", id: { not: excludeArtistId } },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    take: limit,
    select: artistSummarySelect,
  })
}
