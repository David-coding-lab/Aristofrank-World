import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/env"
import { getArtists } from "@/lib/content/artists"
import { getUpcomingEvents } from "@/lib/content/events"
import { getMediaPosts } from "@/lib/content/media"

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

  const [artists, events, mediaPosts] = await Promise.all([
    getArtists(),
    getUpcomingEvents(),
    getMediaPosts(),
  ])

  const artistRoutes: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${base}/artist/${artist.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${base}/events`,
    lastModified: new Date(event.startsAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const mediaRoutes: MetadataRoute.Sitemap = mediaPosts.map((post) => ({
    url: `${base}/media`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...artistRoutes, ...eventRoutes, ...mediaRoutes]
}