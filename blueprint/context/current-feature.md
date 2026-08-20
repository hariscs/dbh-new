# Enforce trailing slashes site-wide

**Type:** Fix

## The problem

The site enforces the opposite of what it should. `next.config.ts` has no
`trailingSlash` key, so Next uses the default `false`: it strips the slash and
308s. Meanwhile the components, copied from the Elementor original, link almost
entirely with trailing slashes.

Measured on the live site and in the tree:

| Surface | Current form |
|---|---|
| `GET /our-facilities` | `200` |
| `GET /our-facilities/` | `308` -> `/our-facilities` |
| Internal `href`s | 2028 slashed, 88 slash-less |
| `<link rel="canonical">` | slash-less (`toApexCanonical` strips it) |
| `sitemap.xml` `<loc>` | slash-less (`normalize` strips it) |

So most internal clicks and route prefetches pay a 308 hop, and every
pre-migration WordPress backlink (WP appends a slash by default) lands on a
redirect instead of the page.

The target: `/our-locations` 308s to `/our-locations/`, and canonicals, the
sitemap, and internal links all agree on the slashed form.

## The fix

Flip `trailingSlash` to `true` and make the two URL emitters that explicitly
strip the slash append it instead.

The 88 slash-less internal `href`s are deliberately left alone: the new 308
handles them, and 44 of those point at `/contact`, which is a 404 today
regardless. The only real cost is that the two quiz links
(`/quiz/am-i-alcoholic`, `/quiz/am-i-addicted`) pay one redirect hop. Touching
them would mean editing 23 Elementor-derived layout components for a two-link
benefit, so the redirect covers them instead.

Must not break:

- **`POST /api/revalidate`** - route handlers are subject to `trailingSlash`
  too, so the WordPress webhook will start receiving a 308. A 308 preserves
  method and body, but only if the caller follows redirects. Verify before this
  lands, and hand the backend the slashed URL if it does not.
- **Canonical double-slashing** - Next may also normalize
  `alternates.canonical` per the config. Confirm the rendered tag is
  `/x/`, not `/x//`.
- **The 5 hardcoded canonicals** under `src/app/difference/*` already carry a
  trailing slash. They should stay as-is and not double up.
- **`generateStaticParams` / ISR** - prerendered paths and
  `POST /api/revalidate` payload paths are unaffected by the display form, but
  spot-check that a location page still builds and revalidates.

Out of scope, flagged only: `href="/contact"` appears 44 times and is a live
404 today (no `src/app/contact` route; the real page is `/contact-us`). That is
a pre-existing bug, not caused by this fix, and it stays a 404 either way.

## Build steps

- [x] Step 1 - turn on trailing slashes
- [x] Step 2 - emit the slashed form in canonicals and the sitemap
- [x] Step 3 - confirm the revalidate webhook survives
- [x] Step 4 - repoint the broken /contact CTA to /contact-us/

### Step 1 - turn on trailing slashes

Add `trailingSlash: true` to `nextConfig` in `next.config.ts`.

**Done when:** `pnpm build && pnpm start`, then `curl -sI localhost:3000/our-facilities`
returns `308` with `location: /our-facilities/`, and
`curl -sI localhost:3000/our-facilities/` returns `200`.

### Step 2 - emit the slashed form in canonicals and the sitemap

- `toApexCanonical` in `src/lib/wordpress.ts` currently does
  `.replace(/\/+$/, "")`. Emit exactly one trailing slash instead.
- `sitemap.ts`: `normalize` and `toUrl` strip the slash the same way. Keep
  `normalize` as the dedupe/exclusion key (so `EXCLUDED` prefix matching is
  unchanged) and append the slash in `toUrl` only.

**Done when:** the rendered `<link rel="canonical">` on `/our-facilities/` is
`https://districtbehavioralhealth.com/our-facilities/`, `/sitemap.xml` `<loc>`
values all end in `/`, the root entry is a single `https://.../`, and the
`difference/*` pages show no doubled slash.

### Step 3 - confirm the revalidate webhook survives

`curl -X POST` the local `/api/revalidate` with and without the slash, with a
valid `REVALIDATE_SECRET`, and record which forms work.

**Done when:** the slashed URL returns the normal success response, and the
slash-less behavior (308 vs. followed) is written down so the WordPress webhook
URL can be updated if needed.

## Verify

1. `pnpm typecheck` and `pnpm build` pass.
2. `pnpm start`, then check the matrix from the top is inverted: `/our-facilities`
   308s to `/our-facilities/`, which 200s.
3. Load the home page in a browser, click through the header nav and a
   location-served link, and confirm the network tab shows no 308 hops on
   internal navigation. The two quiz links are the known exception.
4. `/sitemap.xml` and `/robots.txt` render, and every sitemap URL ends in `/`.
5. A location-served page and a blog page render with correct styling and a
   slashed canonical.

## Post-merge note (not a code step)

This re-canonicalizes ~600 pages from the slash-less form Google currently has
indexed. Expect a few weeks of 308 churn in Search Console. Do not also change
the nginx/apex config in the same window, so there is one variable to watch.

### Step 4 - repoint the broken /contact CTA to /contact-us/

Added after the slash work surfaced it. The header "Contact Us" button pointed
at `/contact`, which is a live 404 on production; the real page is
`/contact-us`. The homepage carried no link to the working page at all. The
trailing-slash redirect cannot rescue this, since the destination does not exist
under either spelling.

Replace `href="/contact"` with `href="/contact-us/"` across the 22 components
that carry it (`Header.tsx` plus the Layout-N copies). Attribute value only: no
class, structure, or Elementor scoping changes.

**Done when:** no `href="/contact"` remains in `src`, the homepage renders the
CTA as `/contact-us/`, and that URL returns 200.
