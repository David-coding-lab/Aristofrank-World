import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { EventSummary } from "./types"

export async function getEvents(): Promise<EventSummary[]> {
  if (!isDatabaseConfigured) return []

  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    select: {
      id: true,
      title: true,
      date: true,
      description: true,
      location: true,
      ticketPrice: true,
      availableTickets: true,
      coverImage: true,
    },
  })

  return events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
  }))
}
