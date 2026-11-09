import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { MusicSummary } from "./types"

export async function getMusic(limit?: number): Promise<MusicSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.music.findMany({
    orderBy: [{ createdAt: "asc" }],
    ...(limit ? { take: limit } : {}),
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      coverImage: true,
      artistProfileUrl: true,
      duration: true,
    },
  })
}

export async function getMusicById(
  id: string,
): Promise<MusicSummary | null> {
  if (!isDatabaseConfigured) return null

  return prisma.music.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      coverImage: true,
      artistProfileUrl: true,
      duration: true,
    },
  })
}
