import "server-only"

import { cookies } from "next/headers"
import type { User as PrismaUser } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import type { User } from "@/types"
import { SESSION_COOKIE, SESSION_TTL_SECONDS } from "./constants"
import {
  clearSessionCookie,
  setSessionCookie,
} from "./cookies"
import { logAuthError } from "./log"
import { generateToken, hashToken } from "./tokens"
import type { RequestMeta } from "./request"

function toUser(user: PrismaUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerification: Boolean(user.emailVerified),
    image: user.image,
    prefs: {},
  }
}

export async function createSession(
  userId: string,
  meta: RequestMeta,
): Promise<void> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000)

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      userAgent: meta.userAgent,
      ipAddress: meta.ipAddress,
    },
  })

  await setSessionCookie(token, expiresAt)
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: true },
    })

    if (!session) return null

    if (session.expiresAt <= new Date() || !session.user.emailVerified) {
      await prisma.session
        .delete({ where: { id: session.id } })
        .catch(() => undefined)
      return null
    }

    return toUser(session.user)
  } catch (error) {
    logAuthError("session lookup", error)
    return null
  }
}

export async function destroyCurrentSession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (token) {
    await prisma.session
      .deleteMany({ where: { tokenHash: hashToken(token) } })
      .catch(() => undefined)
  }
  await clearSessionCookie()
}

export async function revokeAllSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { userId } })
}
