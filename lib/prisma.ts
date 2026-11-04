import "server-only"

import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Whether a database connection has been configured. Builds run without a
 * database (local `pnpm build`, CI without secrets); content readers use this
 * to return empty results instead of attempting a doomed connection.
 */
export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL?.trim())

/**
 * One Prisma client per server process. Next.js reloads modules during
 * development, so the client is cached on `globalThis` outside production to
 * avoid exhausting the Postgres connection pool.
 *
 * The pg driver adapter keeps Prisma working on runtimes that cannot load the
 * native query engine (including Termux/Android) while still using Prisma's
 * typed query layer and PostgreSQL migrations.
 */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
})

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
