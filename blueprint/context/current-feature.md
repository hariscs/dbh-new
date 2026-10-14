# Drug Index page

**Type:** Fix

## The problem

`https://cms.districtbehavioralhealth.com/drug-index/` has no equivalent route
in this app yet. It's a static hero + an interactive A-Z glossary of drug/topic
pages + an FAQ accordion + the standard Contact Us/Jotform block. The glossary
is the hard part: clicking a letter calls WordPress `admin-ajax.php` directly
(action `index_glossary`, a nonce, `letter`) and swaps in a result grid. The
browser can't call that from our apex domain (CORS, and the nonce is minted by
WordPress at render time), so this needs a server-side proxy, not a client-side
port of the WP JS.

Captured from the live CMS page source (full HTML/CSS/JS in chat history):

- Hero: dark boxed container, two absolute-positioned side images
  (`banner-left-img.png` / `banner-right-img.png`, 461x537 originals,
  `wp-image-2128` / `wp-image-2127` ids reused — download fresh assets for this
  page, don't point at the Contact Us hero's hashed images, they're a different
  upload), centered `h2` "Drug Index". Elementor page id `109371`.
- Glossary widget, custom (not Elementor-scoped) markup/CSS/JS, root
  `.index-glossary` with `data-ajax-url`, `data-action="index_glossary"`,
  `data-nonce`, `data-skeleton-count="12"`:
  - `.index-glossary__alphabet` (`role="tablist"`) — 26 `button[role=tab]`,
    `data-letter`, "A" active by default, roving tabindex + arrow-key nav.
  - `.index-glossary__results` (`role="tabpanel"`, `aria-live="polite"`) — on
    letter click, POST `{action, nonce, letter}` to `admin-ajax.php`, abort any
    in-flight request first, show a shimmer skeleton while loading, replace
    `innerHTML` with `payload.data.html` from `{success, data:{html}}`, fall
    back to "No pages found." on error/non-success.
  - Initial state (letter A) is server-rendered on the live page, not fetched
    client-side on load — the client JS only runs on click.
  - ~200 lines of inline CSS: pill alphabet bar, card grid of links with an
    arrow icon (SVG data-URI, swaps color on hover), shimmer skeleton,
    breakpoints at 1024/768/480px.
- FAQ: "Rehabs Near Orange County FAQs", 5 Q&A pairs, standard `n-accordion`
  Elementor markup (same shape `FaqAccordion.tsx` already parses).
- Below that: the same Contact Us heading/copy/image + Jotform iframe block
  that's already duplicated verbatim into every other hardcoded page
  (`ContactUs.tsx`, `RehabAdmission.tsx`, etc.) — copy it the same way, it's
  not a shared component in this codebase.
- Footer is global (`layout.tsx`), nothing to add there.

## The fix

**Scope change (client decision, this session):** the client will provide
their own API for the per-letter dynamic fetch later. Until then, ship the
page with the glossary **statically showing letter A only** — no client-side
fetch, no `/api/drug-index-letter` route yet. B-Z render visibly but
disabled/greyed (not clickable, not a tab target). The `fetchDrugIndexLetter`
helper built in Step 1 already proves the real data path end-to-end and is
reused to pull A's data at render time; the dynamic letter-switching wiring
(API route + client widget + full keyboard/tablist behavior) is a follow-up
once the client's API is in hand — noted as Step 4 below, not built now.

New route, following the existing hardcoded-page convention
(`src/components/pages/PageName.tsx` + `src/app/[route]/page.tsx` +
`page.css`).

- `src/components/pages/DrugIndex.tsx` — server component:
  - Hero (ported from the `ContactUs.tsx` hero pattern, new images, "Drug
    Index" heading, no subtext).
  - Glossary section: `.index-glossary__alphabet` with all 26 letters, "A"
    styled `.active`, B-Z styled `.disabled` (dimmed, `aria-disabled="true"`,
    no click handler — plain server-rendered markup, no `'use client'`
    needed for this reduced scope). `.index-glossary__results` renders the
    letter-A grid from `fetchDrugIndexLetter('A')` (same shape as the live
    page's SSR output); if that returns `null`, fall back to
    `.index-glossary__empty` rather than crash the page.
  - FAQ accordion (`FaqAccordion` with a hardcoded HTML blob matching its
    heading/paragraph parser).
  - The duplicated Contact Us/Jotform block, copied the same way every other
    hardcoded page does it (not a shared component in this codebase).
- `src/app/drug-index/page.tsx` + `page.css` — route entry, SEO metadata,
  imports `page.css`, scoped `.elementor-109371` like the rest of the
  Elementor-derived stylesheets; the `.index-glossary*` rules are global
  (they're not Elementor-scoped on the source page either). CSS still
  includes the `.active`/hover states for all letters (pixel parity), plus a
  new `.index-glossary__letter.disabled` rule (dimmed, `cursor: default`,
  hover suppressed).
- Add `"drug-index"` to `ROUTED_SEGMENTS` in `src/app/[...slug]/page.tsx` so
  the catch-all doesn't also try to prerender it.
- Download the two hero images (`banner-left-img.png`, `banner-right-img.png`)
  into `public/images/` as webp, same as every other hardcoded-page hero
  image in this repo.

Must not break: the `[...slug]` catch-all's `generateStaticParams` for every
other route; any other page that already imports `FaqAccordion` or
`WidgetInteractions`.

## Build steps

- [x] Step 1 - `fetchDrugIndexLetter` helper in `wordpress.ts` (nonce scrape +
      cache, admin-ajax POST, timeout, retry-once-on-invalid-nonce, returns
      `{href, title}[]` parsed from the WP HTML fragment or `null`). Also
      fixed `decodeEntities` to unescape `&#038;`.
      Done when: calling it locally for letter "A"/"B" returns the same links
      seen on the live page. Verified live against the CMS.
- [x] Step 2 - `DrugIndex.tsx` page component: hero, glossary section
      (alphabet bar with A active / B-Z disabled, results grid from
      `fetchDrugIndexLetter('A')`), FAQ, Contact Us/Jotform block.
      Done when: the section renders real letter-A links server-side with no
      client JS, B-Z are visibly disabled, nothing throws if WordPress is
      unreachable (falls back to the empty state).
- [x] Step 3 - `page.tsx` + `page.css`, downloaded hero images,
      `ROUTED_SEGMENTS` update.
      Done when: `pnpm typecheck` and `pnpm build` pass, and a full-page
      screenshot of `/drug-index` at 1440/900/390px matches the live CMS page
      (hero, alphabet bar, A's grid, FAQ, Contact Us block). Typecheck/build
      verified; screenshot comparison blocked — see note below.
- [ ] Step 4 (follow-up, not built now) - once the client provides their API:
      wire B-Z to a real per-letter fetch (API route or direct call to their
      endpoint) and a `'use client'` widget with the skeleton/abort/roving-
      tabindex behavior from the captured WP JS.

## Verify

1. `pnpm typecheck` and `pnpm build` pass.
2. Local prod server, `/drug-index`: letter A renders server-side (view
   source has the real links, not a skeleton); B-Z are visibly disabled and
   inert.
3. Screenshots at 1440/900/390px match the live CMS page (alphabet bar
   disabled-state styling aside).
4. `/drug-index` is not duplicated by the `[...slug]` catch-all
   (`generateStaticParams` for that route no longer includes it).
