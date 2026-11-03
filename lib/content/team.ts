import "server-only"

import { prisma } from "@/lib/prisma"
import type { TeamMemberSummary } from "./types"

export async function getTeamMembers(): Promise<TeamMemberSummary[]> {
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
