import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? '',
});

const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

async function main() {
  const sql = `
    CREATE TABLE IF NOT EXISTS "Artist" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "imageUrl" TEXT,
      "bio" TEXT,
      "slug" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "Testimonial" (
      "id" TEXT NOT NULL,
      "quote" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "rating" INTEGER NOT NULL DEFAULT 5,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
    );
    CREATE TABLE IF NOT EXISTS "Service" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "icon" TEXT,
      "slug" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "Artist_slug_key" ON "Artist"("slug");
    CREATE UNIQUE INDEX IF NOT EXISTS "Service_slug_key" ON "Service"("slug");
  `;
  await prisma.$executeRawUnsafe(sql);
  console.log('Tables created successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
