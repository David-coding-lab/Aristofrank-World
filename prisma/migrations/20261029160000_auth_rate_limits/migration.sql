-- Persistent auth throttles. Raw email addresses and IP addresses are never
-- stored; callers hash the scope key before writing here.
CREATE TABLE "AuthThrottle" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "windowStart" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedUntil" TIMESTAMPTZ(3),
    "lastAttemptAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthThrottle_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AuthThrottle_scope_keyHash_key" ON "AuthThrottle"("scope", "keyHash");
CREATE INDEX "AuthThrottle_lastAttemptAt_idx" ON "AuthThrottle"("lastAttemptAt");
CREATE INDEX "AuthThrottle_lockedUntil_idx" ON "AuthThrottle"("lockedUntil");
