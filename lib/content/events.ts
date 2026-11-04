import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { EventSummary } from "./types"

export async function getUpcomingEvents(): Promise<EventSummary[]> {
  if (!isDatabaseConfigured) return []

  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      imageUrl: true,
      startsAt: true,
      venue: true,
      city: true,
      ticketUrl: true,
    },
  })

  return events.map((event) => ({
    ...event,
    startsAt: event.startsAt.toISOString(),
  }))
}
