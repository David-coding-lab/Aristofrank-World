import "server-only"

import { prisma } from "@/lib/prisma"
import type { TrackSummary } from "./types"

const trackSelect = {
  id: true,
  title: true,
  artistName: true,
  coverUrl: true,
  audioUrl: true,
  duration: true,
  description: true,
} as const

export async function getTracks(limit?: number): Promise<TrackSummary[]> {
  return prisma.track.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    ...(limit ? { take: limit } : {}),
    select: trackSelect,
  })
}

export async function getFeaturedTrack(): Promise<TrackSummary | null> {
  return prisma.track.findFirst({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: trackSelect,
  })
}

export async function getArtistTracks(
  artistId: string,
): Promise<TrackSummary[]> {
  return prisma.track.findMany({
    where: { artistId },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: trackSelect,
  })
}
