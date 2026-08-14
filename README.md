# Aristofrank World

**Where Brands Become Legends.**

Aristofrank World is a premium creative agency and artist management platform
focused on building iconic brands through branding, visual identity, media
production, music production, promotions, and talent representation.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Auth & Backend:** Appwrite
- **Fonts:** Playfair Display (headings), Open Sans (body)
- **Icons:** Google Material Symbols

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in your Appwrite credentials:

   ```bash
   cp .env.example .env.local
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script          | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start development server   |
| `npm run build` | Create production build    |
| `npm run start` | Start production server    |
| `npm run lint`  | Run ESLint                 |

## Project Structure

```
app/
  (home)/             # Homepage route group
  (protected)/        # Authenticated routes (dashboard, profile, etc.)
  sign-in/            # Sign-in flow
  sign-up/            # Sign-up flow
  check-email/        # Post-signup email verification prompt
  api/auth/oauth/     # Google OAuth callback
components/
  features/           # Feature-specific components by domain
  ui/                 # Reusable presentational primitives
lib/
  auth/               # Appwrite auth helpers
  appwrite.ts         # Appwrite client configuration
  env.ts              # Environment variable config
types/                # Shared TypeScript types
proxy.ts              # Route protection (public vs protected)
```

## Brand

- **Primary:** `#181711`
- **Secondary / background:** `#FFFFFF`
- **Accent:** `#F2CC0D`

## Conventions

Read `AGENTS.md` — it is the canonical rules file for this repo and binds all
AI coding agents and contributors. `CLAUDE.md` imports it.
