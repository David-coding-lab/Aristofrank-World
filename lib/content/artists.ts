import 'server-only';

import type { Prisma } from '@prisma/client';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';
import type { ArtistDetail, ArtistSummary } from './types';

const artistSummarySelect = {
  id: true,
  name: true,
  genre: true,
  profileUrl: true,
  profileImage: true,
} as const satisfies Prisma.ArtistSelect;

function genreOf(value: Prisma.JsonValue | null): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function toArtistSummary(row: {
  id: string;
  name: string;
  genre: Prisma.JsonValue | null;
  profileUrl: string;
  profileImage: string;
}): ArtistSummary {
  return {
    id: row.id,
    name: row.name,
    genre: genreOf(row.genre),
    profileUrl: row.profileUrl,
    profileImage: row.profileImage,
  };
}

export async function getArtists(): Promise<ArtistSummary[]> {
  if (!isDatabaseConfigured) return [];

  const rows = await prisma.artist.findMany({
    orderBy: [{ name: 'asc' }],
    select: artistSummarySelect,
  });

  return rows.map(toArtistSummary);
}

export async function getFeaturedArtists(limit = 4): Promise<ArtistSummary[]> {
  if (!isDatabaseConfigured) return [];

  const rows = await prisma.artist.findMany({
    orderBy: [{ name: 'asc' }],
    take: limit,
    select: artistSummarySelect,
  });

  return rows.map(toArtistSummary);
}

export async function getArtistByProfileUrl(profileUrl: string): Promise<ArtistDetail | null> {
  if (!isDatabaseConfigured) return null;

  const artist = await prisma.artist.findUnique({
    where: { profileUrl },
    select: {
      ...artistSummarySelect,
      bio: true,
    },
  });

  if (!artist) return null;

  return {
    id: artist.id,
    name: artist.name,
    genre: genreOf(artist.genre),
    profileUrl: artist.profileUrl,
    profileImage: artist.profileImage,
    bio: artist.bio,
  };
}

export async function getRelatedArtists(
  excludeArtistId: string,
  limit = 3
): Promise<ArtistSummary[]> {
  if (!isDatabaseConfigured) return [];

  const rows = await prisma.artist.findMany({
    where: { id: { not: excludeArtistId } },
    orderBy: [{ name: 'asc' }],
    take: limit,
    select: artistSummarySelect,
  });

  return rows.map(toArtistSummary);
}
