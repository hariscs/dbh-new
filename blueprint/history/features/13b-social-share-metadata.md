# Feature: Social share metadata (OG / Twitter)

**From build-plan:** feature 13b
**Status:** complete (built ad hoc alongside 13a, 2026-08-14)

## What shipped

- `src/app/opengraph-image.tsx` - generated 1200x630 brand card via `next/og`
  `ImageResponse` (pattern borrowed from reline-digital): #273F52 background,
  tagline eyebrow, site name, #2E6AA1 accent bar, domain.
- `src/app/layout.tsx` - `metadataBase` from `SITE_URL`, `openGraph`
  (`type`, `siteName`, `locale` only) and `twitter.card = summary_large_image`.
  Deliberately no layout-level og:title/description: Next.js derives per-page
  og:title/og:description/twitter:title from each page's own metadata, so all
  ~600 pages get page-specific share text with a shared brand card.

## Verified

- `GET /opengraph-image` 200, PNG, card visually checked.
- og:*/twitter:* tags confirmed page-specific on `/` and `/reviews`.

## Deferred

- Page title rendered inside the card image (would need an `/api/og?title=`
  route plus pointing `openGraph.images` at it from the 56 generateMetadata
  sites via a shared helper).
