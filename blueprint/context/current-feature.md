# Homepage image weight for PageSpeed

**Type:** Fix

## The problem

PageSpeed mobile runs on the homepage download two images far larger than
anything on a phone can show:

- The CSS background of the `elementor-element-0fab87b` section
  (`/images/d61e008e7716fcc7d92b35a3249568f7.webp`) is 1920x1118 and 216 KB
  and is fetched at full size on every viewport. It is the largest single
  request in the run and competes with the LCP image for bandwidth.
- The mega-menu card images come from WordPress at their natural 1920px
  width, and `PrimaryNav.tsx` passes that width to `next/image` with no
  `sizes`, so the srcset offers only 1920w and 3840w for a card about 300px
  wide. The "Tour The Center" card costs 96 KB on every page.

Third-party tag scripts remain the main cost (see chat, 2026-09-16); this fix
covers only what is in this repo.

## The fix

- Add `-1440.webp` (95 KB) and `-1024.webp` (56 KB) variants of the section
  background, encoded with cwebp at q75, and point the section at them from
  `page.css` under the existing 1024px and 767px breakpoints. Desktop keeps
  the original file.
- Add `sizes="300px"` to the mega-menu card `Image` so the srcset is built
  from the responsive widths and the browser picks a 640w or smaller variant.
- Add `sizes="130px"` to the mobile drawer logo in `MobileMenu.tsx`, which
  was requesting the 1920w variant (25 KB) for a 40px-tall logo on every page.

Verification note (2026-09-17): the CMS is unreachable from the dev machine
(connect timeout on 80 and 443, while the apex image proxy reaches it fine),
so local builds fall back to the static menu and the card `sizes` change can
only be confirmed on production HTML after deploy.

Checked and not changed: carousels already load Swiper lazily through an
IntersectionObserver, and the polyfills PageSpeed flags come from Next's own
`polyfill-module`, which ships regardless of the browserslist.

## Step 2 - GTM behind interaction, CTM decoupled (client decision 2026-09-17)

GTM (with GA4 and Clarity inside it) is the largest blocking-time cost. The
client approved loading it on first interaction or 10 s after the load event,
whichever comes first. Clarity stays and rides along inside GTM.

CTM's `t.js` is currently delivered only by GTM tag 27, so gating GTM alone
would delay the phone-number swap for visitors who do not interact. That is
the same failure that led to the gate being removed on 2026-08-27. So this
step also restores the direct `<script async src="https://224733.tctm.co/t.js">`
in `<head>` that commit 8e42846 dropped on 2026-08-12.

**Deploy coordination:** GTM tag 27 must be paused in container
`GTM-MGF7WNCV` when this ships, or `t.js` loads twice and CTM double-inits.

## Build steps

- [x] Step 1 - background variants and menu card sizes
- [x] Step 2 - GTM gate at interaction or 10 s after load; direct CTM script
- [x] Step 3 - run CTM after hydration (fixes React #418 seen in PSI on 2026-09-17)

### Step 3 - CTM after hydration

The head `<script async>` from Step 2 let `t.js` rewrite phone-number text
before React hydrated under PSI's slow-4G run, producing React error #418 and
a full client-side regeneration of the tree (Style & Layout 624 ms, TBT still
330 ms). The head tag is now a `<link rel="preload" as="script">` so the bytes
still arrive early, and `CtmRouteSwap.tsx` appends the script from a mount
effect, after hydration.

**Done when:** local devtools-throttled Lighthouse shows `t.js` preloaded
early, CTM's `p.js` beacon after hydration, and no console errors. Verified
2026-09-17: t.js at 0.6 s, p.js at 4.8 s, TBT 157 ms, no errors.

**Step 2 done when:** a local mobile Lighthouse run requests `t.js` but not
`gtm.js` or `clarity.js`, TBT drops well under 200 ms, and in a browser GTM
loads on the first scroll or after 10 s with no scroll.

**Done when:** a local production build's mobile Lighthouse run fetches the
1024 background variant instead of the 216 KB original, and the menu card
image request drops well below 96 KB. `pnpm typecheck` and `pnpm build` pass.

## Verify

1. `pnpm typecheck` and `pnpm build` pass.
2. Local Lighthouse, mobile, on `/`: no request for the original 216 KB
   background; card image request under 30 KB.
3. Desktop at 1280px still shows the original background; at 1000px and
   400px widths the section shows the same photo with no visible quality loss.
