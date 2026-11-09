import 'server-only';

import { isDatabaseConfigured, prisma } from '@/lib/prisma';
import type { VideoSummary } from './types';

export async function getVideos(): Promise<VideoSummary[]> {
  if (!isDatabaseConfigured) return [];

  return prisma.video.findMany({
    orderBy: [{ createdAt: 'asc' }],
    select: {
      id: true,
      title: true,
      thumbnailImage: true,
      videoUrl: true,
    },
  });
}
