import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { TestimonialSummary } from "./types"

export async function getTestimonials(): Promise<TestimonialSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.testimonial.findMany({
    orderBy: [{ rating: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      comment: true,
      rating: true,
      company: true,
    },
  })
}
