import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { MediaSummary } from "./types"

export async function getMedia(): Promise<MediaSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.media.findMany({
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      thumbnailImage: true,
      sourceUrl: true,
      category: true,
    },
  })
}
