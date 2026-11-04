import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { TestimonialSummary } from "./types"

export async function getTestimonials(): Promise<TestimonialSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      quote: true,
      name: true,
      role: true,
      rating: true,
    },
  })
}
