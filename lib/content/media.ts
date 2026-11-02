import "server-only"

import { prisma } from "@/lib/prisma"
import type { MediaSummary } from "./types"

export async function getMediaPosts(): Promise<MediaSummary[]> {
  const posts = await prisma.mediaPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverUrl: true,
      videoUrl: true,
      category: true,
      publishedAt: true,
    },
  })

  return posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt.toISOString(),
  }))
}
