<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# AGENTS.md

Rules for any AI coding agent (Claude Code, Cursor, Copilot, etc.) working in this repo.
This is the canonical rules file — CLAUDE.md imports it. Keep this file under ~200 lines;
add detail to code comments or docs, not here.

## Stack

- Next.js (App Router, Server Components by default)
- TypeScript (strict mode — no `any` without a comment explaining why)
- Tailwind CSS
- npm (do not use yarn/pnpm lockfiles or commands)
- Appwrite for authentication and backend services

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`

Run lint + type-check before considering any task done. Do not fix style issues
a formatter would catch automatically — run the formatter instead.

## Folder Structure

Follow the existing structure. Don't invent new top-level folders without asking.

```
app/                    # routes only — layout.tsx, page.tsx, route.ts, loading/error states
  (home)/               # route group for the homepage
  (protected)/          # route groups for authenticated routes, guarded by proxy.ts
  sign-in/ sign-up/     # auth routes
components/
  ui/                   # small, reusable, presentational primitives (Button, Input, Card)
  features/<feature>/   # feature-specific components, colocated by domain
lib/                    # framework-agnostic utilities, helpers, constants
  auth/                 # Appwrite auth config, session helpers, server actions
  validations/          # zod schemas
  server/               # server-only Appwrite clients
hooks/                  # custom React hooks
types/                  # shared TypeScript types/interfaces
proxy.ts                # route protection (public vs protected) + redirects
```

- Route files (`page.tsx`, `layout.tsx`) stay thin: compose components, fetch data, render.
  No business logic, no large JSX trees directly in route files.
- If a component file is doing more than one job (e.g. fetching + form + table), split it.
- A component file approaching ~150–200 lines is a signal to extract subcomponents,
  not a hard rule — use judgment, but don't let files grow unchecked.

## Routing & Auth

- **Always ask the user whether a new route is public or protected before scaffolding it.**
  Never assume. If ambiguous from context, ask explicitly rather than guessing.
- Protected routes live under the `(protected)` route group and are guarded by
  `proxy.ts` (redirect-level) — do not write ad hoc per-page auth checks.
- Server Components fetch data directly; only mark a component `"use client"` when it
  genuinely needs interactivity, state, or browser APIs. Default to Server Components.

## Code Style

- Name things for what they do: `ArtistProfileCard`, `getCampaignTotal`, `useAuthSession`.
  No `data`, `temp`, `handleStuff`, `fn1`, single-letter function names, or joke names.
- Functions do one thing. If a function needs a comment to explain "and then it also...",
  split it.
- Prefer named exports for components; one component per file, file name matches
  component name.
- No commented-out code, no `console.log` left in committed code.
- Co-locate types with the component/feature that owns them unless shared across
  3+ features, in which case move to `types/`.

## Non-Negotiable Priorities (in this order when trade-offs arise)

1. **Security** — validate all input (server-side, even if validated client-side too),
   never trust client data, parameterize queries, keep secrets in env vars only,
   sanitize anything rendered as HTML.
2. **Speed/Performance** — prefer Server Components and streaming over client-side
   fetching waterfalls; use `next/image` and `next/font`; avoid unnecessary
   `"use client"` boundaries; lazy-load below-the-fold and heavy components
   (`next/dynamic`); memoize only when profiling shows it's needed, not by default.
3. **SEO** — treated as a first-class, non-negotiable output requirement. Every public
   page, card component, and artist/brand view must be SEO-complete before it is
   considered done. See the dedicated SEO section below for the full checklist.

---

## SEO (Non-Negotiable — Enforced for Every Public Page)

SEO is not an afterthought. It is a delivery requirement. A public page or component
is **not done** until every applicable item in this section is satisfied.

### Metadata — every public route

- Use `generateMetadata()` (async, data-driven) for all dynamic routes such as artist
  and brand detail pages. Use the static `metadata` export only for truly static pages.
- Every page exports a `title`, `description`, `openGraph`, and `twitter` block.
  Never leave these as defaults or empty.
- Titles follow the pattern: `"<Entity Name> — Aristofrank World"`. Keep under 60 characters.
- Descriptions are unique per page, written for the user, 120–155 characters.
  They are not tag dumps.
- `openGraph.images` must include at least one image with explicit `width`, `height`,
  and `alt`. Never omit `alt` on OG images.
- `canonical` URL is set on every public page via `alternates.canonical`.
  This is mandatory — duplicate or paginated content without a canonical will hurt rankings.

```ts
// Example: app/artists/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = await getArtist(params.slug);
  return {
    title: `${artist.name} — Aristofrank World`,
    description: artist.seoDescription ?? artist.bio,
    alternates: { canonical: `/artists/${artist.slug}` },
    openGraph: {
      title: artist.name,
      description: artist.seoDescription ?? artist.bio,
      images: [{ url: artist.coverImageUrl, width: 1200, height: 630, alt: artist.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}
```

### OG Images

- Static OG images are generated with `next/og` (`ImageResponse`) in
  `app/**/opengraph-image.tsx`, following the existing 1200×630 pattern.
- Dynamic OG images (per-entity) use `generateImageMetadata` and the entity data —
  never bake entity names into a shared static image.
- The root `app/opengraph-image.tsx` is the site-wide fallback; every public route
  group can override it with its own `opengraph-image.tsx`.

### Structured Data (JSON-LD) — mandatory on entity pages

Every artist/brand/project detail page **must** include a
`<script type="application/ld+json">` block rendered server-side. Omitting
structured data on entity pages is a bug, not a stylistic choice.

Required schema types:

| Page type        | Required schema(s)                          |
|------------------|---------------------------------------------|
| Artist detail    | `Person` (with `sameAs`, `worksFor`/`affiliation`) |
| Brand detail     | `Organization` (with `logo`, `sameAs`, `contactPoint`) |
| Project/campaign | `CreativeWork` (with `creator`, `publisher`) |
| Homepage         | `WebSite` + `SearchAction` (sitelinks search box) |
| Breadcrumbs      | `BreadcrumbList` on every artist/brand page |
| FAQ sections     | `FAQPage`                                   |
| Article/blog     | `Article` or `BlogPosting`                  |

Implement structured data in a dedicated server component (e.g. `ArtistJsonLd.tsx`)
that accepts the entity as a prop and renders the script tag. Never inline ad hoc
JSON-LD strings in page files.

```tsx
// components/features/artists/ArtistJsonLd.tsx
export function ArtistJsonLd({ artist }: { artist: Artist }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artist.bio,
    image: artist.images,
    sameAs: artist.socialLinks,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/artists/${artist.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Semantic HTML & Heading Hierarchy

- One `<h1>` per page — never zero, never more than one.
- Entity name on a detail page is always the `<h1>`.
- Heading levels descend logically: `h1 → h2 → h3`. Never skip levels.
- Cards in a listing use `<h2>` (or `<h3>` if nested inside a section with its
  own `<h2>`). Never render card titles as `<div>` or `<p>`.
- Use semantic elements: `<article>` for cards, `<nav>` for navigation,
  `<main>` for page content, `<aside>` for filters/sidebars, `<header>`/`<footer>`.

### Images — SEO-critical on entity and card components

- Every entity image uses `next/image` — no exceptions.
- `alt` text is **mandatory and descriptive**: `alt={`${artist.name} — ${artist.genre}`}`.
  Never use `alt=""` on a content image. Empty alt is for decorative-only images.
- Primary entity image (above the fold, hero) gets `priority` prop to avoid LCP penalty.
- All other images get `loading="lazy"`.
- Set the `sizes` prop to match actual rendered breakpoints — do not omit it.
- Image filenames served from your own storage should be descriptive slugs
  (`artist-name-tour-poster.jpg`), not UUIDs. Document this requirement for
  the upload pipeline.

```tsx
<Image
  src={artist.coverImageUrl}
  alt={`${artist.name} — ${artist.genre}`}
  width={800}
  height={800}
  priority          // only on the above-the-fold hero image
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="w-full h-auto object-cover"
/>
```

### Entity Cards — SEO checklist (apply to every card component)

Cards appear in listing pages and are crawled as the entry point to detail pages.
Every card must satisfy all of the following:

- Rendered as `<article>` with a semantic heading (`<h2>` or `<h3>` depending on context).
- The entire card (or at minimum the entity name and image) is wrapped in an `<a>` linking
  to the canonical URL (`/artists/[slug]`, `/brands/[slug]`). Use the slug, never a
  numeric ID, in the URL.
- The `<a>` has a descriptive `aria-label` if the link text alone is ambiguous.
- Images use `next/image` with descriptive `alt`, correct `sizes`, and
  `loading="lazy"` (cards are rarely above the fold).
- Do **not** client-side-render card listings where it can be avoided. Card grids that
  can be statically generated or server-rendered must be — crawlers don't execute JS
  reliably on paginated or infinitely scrolled lists.

### Entity Detail Pages — SEO checklist (apply to every `/artists/[slug]` / `/brands/[slug]` route)

- `generateStaticParams` should be used if the catalogue is bounded and
  build-time generation is feasible; otherwise use ISR (`revalidate`) — never
  purely client-side fetch.
- Breadcrumb component is mandatory on every entity page. It renders both visible
  breadcrumbs **and** `BreadcrumbList` JSON-LD.
- The entity's `<h1>` matches (or closely mirrors) the page `<title>` — Google expects
  title/h1 alignment.
- Entity description copy lives in a `<p>` or structured prose element in the DOM —
  not only inside JS state or a collapsed accordion that requires interaction to open.
  Crawlers must be able to read the description without executing interaction handlers.
- Include `<link rel="preload">` for the primary entity image if not using `priority`
  prop (prefer the `priority` prop).
- Verify `robots` metadata is not accidentally set to `noindex` on entity pages —
  this has happened before on auth-guarded or draft pages leaking into public routes.

### URLs & Slugs

- All public URLs use human-readable slugs: `/artists/davido-afrobeats`, not
  `/artists/90fj20dk`.
- Slugs are generated at content-creation time (not on the fly in the component) and
  stored in the database. The slug generation utility must: lowercase, replace spaces
  with hyphens, strip special characters, and guarantee uniqueness.
- Category/filter pages use consistent, stable query param conventions:
  `/artists?genre=afrobeats&status=active` — not arbitrary keys that change between
  renders. Canonical tags on filtered pages should point to the base category URL
  unless the filter has significant independent search volume.

### Performance as an SEO signal (Core Web Vitals)

Poor CWV directly hurts search ranking. These requirements overlap with the Performance
priority above but are restated here because they are also an SEO requirement:

- LCP target: under 2.5 s. The primary entity image is the most common LCP element —
  always use `priority` on it and ensure it is not lazy-loaded.
- CLS target: under 0.1. Reserve space for images with explicit `width`/`height` or
  `aspect-ratio`. Never let images reflow after load.
- INP target: under 200 ms. Keep entity pages as Server Components; defer heavy
  interactive widgets with `next/dynamic` and a skeleton placeholder.

### sitemap.xml & robots.txt

- `/app/sitemap.ts` must include all public artist, brand, and project URLs. If the
  catalogue is large, use a dynamic sitemap with `generateSitemaps()`.
- Entity URLs in the sitemap include `lastmod` (use the entity's `updatedAt`
  timestamp) and `changefreq: "weekly"`.
- `/app/robots.ts` explicitly disallows crawling of `/api/`, `/(protected)/`, and
  any search/filter URLs with `?` params that produce near-duplicate content.

### Enforcement Checklist (run before marking any public page PR ready)

Before opening a PR for any public-facing page or card component, verify:

- [ ] `generateMetadata` exports `title`, `description`, `openGraph`, `twitter`, `canonical`
- [ ] JSON-LD structured data rendered server-side (Person, Organization, CreativeWork, breadcrumb as applicable)
- [ ] One `<h1>` on the page; card titles use `<h2>`/`<h3>`
- [ ] All images use `next/image` with descriptive `alt` and correct `sizes`
- [ ] Hero/primary entity image has `priority`; all others `loading="lazy"`
- [ ] Entity cards rendered in `<article>` with an `<a>` linking to the canonical URL
- [ ] Entity description copy is in the DOM, not JS-only state
- [ ] Breadcrumbs present on entity pages (visible + JSON-LD)
- [ ] Page is server-rendered or statically generated — not purely CSR
- [ ] `robots` metadata does not accidentally `noindex` a public page
- [ ] Slug is human-readable; canonical URL is set
- [ ] Page is in `sitemap.ts`
- [ ] Comments should be professional not like your teaching`

---

## Enterprise-Readiness

- **Error handling**: every route segment that fetches data should have an
  `error.tsx`; every async UI should have a `loading.tsx` or Suspense boundary.
  Don't let errors fail silently — surface them or log them.
- **Accessibility**: interactive elements are keyboard-navigable, use semantic
  elements over `<div onClick>`, forms have associated labels.
- **Environment variables**: never hardcode URLs, keys, or config — use `.env.local`
  and document new variables in `.env.example`.
- **Data validation**: validate all external input (forms, API payloads, query
  params) with a schema (zod) at the boundary, not deep in business logic.
- **Testing**: new logic in `lib/` or hooks gets a unit test; non-trivial UI flows
  get at least one test. Don't skip tests to "save time."
- **Accessibility & i18n-readiness**: avoid hardcoding user-facing strings deep in
  logic if the project has (or is likely to add) i18n — keep copy near the top of
  components.
- **No silent breaking changes**: if a change affects a shared component, type, or
  API contract used elsewhere, say so explicitly before/while making it — don't
  quietly modify shared code as a side effect of an unrelated task.

## When Unsure

Ask rather than assume — especially for: route protection (public vs protected),
breaking changes to shared/shared-by-multiple-features code, new dependencies,
and new top-level folders or architectural patterns not already in the codebase.

## Responsiveness (Non-Negotiable)

Every UI component created or modified must be fully responsive using Tailwind CSS.
Never ship a component that only works at one viewport size.

### Layout & Grid
- Use fluid, multi-column grids with responsive breakpoints:
  `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Prefer `gap-*` over margins between grid/flex children.
- Containers get `w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8` — never a fixed pixel width.

### Cards
- Cards are always full-width on mobile, then grow into columns: `w-full sm:max-w-sm` or inside a responsive grid.
- Apply a `max-w-*` cap so cards never stretch uncomfortably wide on large screens.
- Card internals (image, body, footer) stack vertically by default; go horizontal only with an explicit `sm:flex-row` or `md:flex-row` when it genuinely improves the layout.
- Padding scales with viewport: `p-4 sm:p-6`.

### Typography
- Use fluid type scales — never hardcode `text-xl` only; pair sizes across breakpoints:
  `text-base sm:text-lg lg:text-xl`
- Headings: `text-2xl sm:text-3xl lg:text-4xl` (or larger for hero text).
- Line lengths stay readable: cap prose content at `max-w-prose` or `max-w-2xl`.

### Spacing
- All padding/margin uses responsive variants where context changes:
  `py-8 sm:py-12 lg:py-16`, `space-y-4 sm:space-y-6`.
- Section/page-level vertical rhythm: `px-4 sm:px-6 lg:px-8`.

### Images & Media
- Always use `next/image` with `sizes` prop reflecting the actual rendered breakpoints.
- Images inside cards use `w-full h-auto object-cover` with a capped `max-h-*` where needed.
- Avoid fixed `w-*` or `h-*` on images unless inside a known fixed-size container.

### Interactive Elements
- Buttons and inputs are full-width on mobile by default, then `w-auto` on larger screens
  where they sit inline: `w-full sm:w-auto`.
- Touch targets are at least 44×44px — use `min-h-[44px] min-w-[44px]` on icon buttons.

### Enforcement
- When touching any existing component that is NOT responsive, make it responsive as
  part of that task — don't leave breakage in place.
- Never use arbitrary fixed widths (`w-[380px]`) for layout — use Tailwind's responsive
  scale or `max-w-*` utilities instead.
- Run a quick mental pass at sm / md / lg before calling a component done.

- Comments should be professional not like your teaching
