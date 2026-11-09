import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/env"
import { isDatabaseConfigured } from "@/lib/prisma"
import { getArtists } from "@/lib/content/artists"
import { getEvents } from "@/lib/content/events"
import { getMedia } from "@/lib/content/media"
import type { ArtistSummary, EventSummary, MediaSummary } from "@/lib/content/types"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl || "http://localhost:3000"
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/artist`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/media`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/music-production`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  let artists: ArtistSummary[] = []
  let events: EventSummary[] = []
  let mediaPosts: MediaSummary[] = []

  if (isDatabaseConfigured) {
    try {
      const [a, e, m] = await Promise.all([
        getArtists(),
        getEvents(),
        getMedia(),
      ])
      artists = a
      events = e
      mediaPosts = m
    } catch {
      // Database unavailable at build time — fall back to static routes only.
    }
  }

  const artistRoutes: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${base}${artist.profileUrl}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${base}/events`,
    lastModified: new Date(event.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const mediaRoutes: MetadataRoute.Sitemap = mediaPosts.map(() => ({
    url: `${base}/media`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...artistRoutes, ...eventRoutes, ...mediaRoutes]
}
