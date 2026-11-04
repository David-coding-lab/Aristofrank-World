import "server-only"

import { isDatabaseConfigured, prisma } from "@/lib/prisma"
import type { TeamMemberSummary } from "./types"

export async function getTeamMembers(): Promise<TeamMemberSummary[]> {
  if (!isDatabaseConfigured) return []

  return prisma.teamMember.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      role: true,
      bio: true,
      imageUrl: true,
    },
  })
}
