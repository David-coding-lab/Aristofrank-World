import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL?.trim());

/**
 * Creates a fresh Prisma client per invocation. Serverless runtimes (Vercel,
 * AWS Lambda) isolate each request, so caching on `globalThis` causes stale
 * connections, connection leaks, and pool exhaustion across invocations.
 */
export function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? '',
    }),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

/**
 * Singleton Prisma client for long-running processes (local dev, `next start`).
 * In serverless environments, prefer `createPrismaClient()` per invocation.
 */
export const prisma = createPrismaClient();
