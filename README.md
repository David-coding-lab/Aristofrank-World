# Aristofrank World

**Where Brands Become Legends.**

Aristofrank World is a premium creative agency and artist management platform
focused on building iconic brands through branding, visual identity, media
production, music production, promotions, and talent representation.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL via Prisma, using the official `@prisma/adapter-pg`
  driver adapter and Prisma's client engine (no native query engine required)
- **Auth:** Email/password with database sessions, email verification, password
  reset, and Google OAuth (PKCE, direct Google endpoints)
- **Email:** Resend
- **Fonts:** Playfair Display (headings), Open Sans (body)
- **Icons:** Google Material Symbols

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SITE_URL`, and the
   Resend/Google credentials you need. See `.env.example` for the Google redirect
   URI and optional trusted-proxy setting.

3. **Apply the database migration**

   ```bash
   pnpm db:deploy
   ```

   For local development, `pnpm db:migrate` creates a new migration when the
   schema changes.

4. **Start the dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

In development, when Resend is not configured, verification and reset links are
printed to the server console instead of being emailed.

## Available Scripts

| Script              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Start the development server                     |
| `pnpm build`        | Generate Prisma Client and create a production build |
| `pnpm start`        | Start the production server                      |
| `pnpm lint`         | Run ESLint                                       |
| `pnpm typecheck`    | Generate Next.js route types and run `tsc`       |
| `pnpm db:generate`  | Generate Prisma Client                           |
| `pnpm db:migrate`   | Create/apply a migration in development          |
| `pnpm db:deploy`    | Apply pending migrations in production           |
| `pnpm db:studio`    | Open Prisma Studio                               |

## Auth Flow

- `User` stores an optional bcrypt password hash, email-verified timestamp, and
  a per-account login lockout after repeated failures.
- `Session` rows store only SHA-256 hashes of random 256-bit session tokens; the
  raw token lives in an `HttpOnly`, `SameSite=Lax`, `Secure` cookie. Production
  cookies use the `__Host-` prefix.
- `VerificationToken` covers email verification and one-time password resets.
  Tokens are hashed at rest, expire, and are deleted after use.
- Clicking a verification link in the browser that started sign-up completes
  verification. Opening it elsewhere clears any pre-registration password and
  asks the mailbox owner to set a new one.
- Google OAuth uses PKCE and a state cookie. A verified Google email links to an
  existing account or creates a new one.
- Auth actions and OAuth/verification routes use database-backed throttles keyed by
  hashed IP and email values. Sign-in, sign-up, password-reset requests, password-reset
  submissions, resend-verification, Google OAuth, and email verification have
  independent limits.

Appwrite password hashes cannot be exported from Appwrite. Accounts migrated
from the old Appwrite backend must use “Forgot password?” to set a password.

## Project Structure

```
app/
  (home)/                 # Homepage route group
  (protected)/            # Authenticated routes (dashboard, profile)
  sign-in/ sign-up/       # Auth routes
  forgot-password/        # Password reset request
  reset-password/         # One-time password reset form
  check-email/            # Post-signup email verification prompt
  api/auth/google/        # Google OAuth start + callback
  api/auth/verify/        # Email verification link handler
components/
  features/               # Feature-specific components by domain
  ui/                     # Reusable presentational primitives
lib/
  auth/                   # Sessions, tokens, email, OAuth, server actions
  validations/            # Zod schemas
  prisma.ts               # Prisma client singleton
  env.ts                  # Server-side environment configuration
prisma/
  schema.prisma           # Auth models
  migrations/             # PostgreSQL migrations
types/                    # Shared TypeScript types
proxy.ts                  # Route protection (public vs protected)
```

## Brand

- **Primary:** `#181711`
- **Secondary / background:** `#FFFFFF`
- **Accent:** `#F2CC0D`

## Local Android / Termux

The Next.js scripts use Webpack because Turbopack has no native android/arm64
bindings. `@next/swc-wasm-nodejs` and `@img/sharp-wasm32` are included so the
compiler and image optimization work locally. Node reports Termux as
`linux/arm64`, so force the WASM compiler for local commands. If the OpenClaw
Node wrapper rejects `--r=` in `NODE_OPTIONS`, put Termux's Node binary first:

```bash
PATH=/data/data/com.termux/files/usr/bin:$PATH NEXT_TEST_WASM=1 pnpm dev
PATH=/data/data/com.termux/files/usr/bin:$PATH NEXT_TEST_WASM=1 pnpm typecheck
PATH=/data/data/com.termux/files/usr/bin:$PATH NEXT_TEST_WASM=1 pnpm build
```

Do not set `NEXT_TEST_WASM` on Vercel or other native x64/arm64 hosts; those
builds use the normal native SWC binary.

PostgreSQL migrations are best applied from CI/Vercel or a machine with a
reachable database; the Prisma CLI's schema engine is not supported on Android.

## Security

See `SECURITY.md` for the implemented controls, required production
configuration, and remaining hardening work.

## Conventions

Read `AGENTS.md` — it is the canonical rules file for this repo and binds all
AI coding agents and contributors. `CLAUDE.md` imports it.
