# Exit-intent popup

**Type:** Fix

## The problem

Visitors who are about to leave get no last prompt to call. The owner wants
a site-leaving popup: when a desktop visitor's cursor leaves the top of the
window (toward the tab bar, address bar, or close button), a modal shows up
with a call-to-action.

No such popup exists anywhere in the app, and there is no equivalent on the
WordPress original to copy. The only Elementor popups on the original
(`1821`, `104913`) are the menus. This is a new component, built to the
reference below.

**Design reference:** `blueprint/reference/exit-intent-popup.png`

## The fix

A client component, `src/components/ExitIntentPopup.tsx`, mounted once in
`src/app/layout.tsx` next to the other site-wide widgets, with its styles in a
new `src/app/exit-intent-popup.css` scoped under `.dbh-exit-popup` (matches the
existing `dbh-` prefix used by the nav and mobile menu).

**Layout, from the reference:**

- Dark overlay over the page, popup centered, white card with rounded corners.
- Left column: photo of a woman in a sunlit field, cropped to cover, with a
  translucent dark pill near the bottom holding a white dot and "All Calls are
  100% free and confidential".
- Right column: DISTRICT logo (`/images/27be6d13936a8bc6dbcfb656bcd95b80.webp`,
  the header logo), a gray close X top right, the heading "Real Recovery from
  Substance Abuse & Mental Health Starts Here", the body copy "Connect with our
  experienced clinicians to get a personalized substance abuse and mental
  health treatment plan designed for you.", and a `#2E6AA1` pill button with
  the phone number.
- Fonts from the site tokens: Avenir for the heading, Montserrat for body copy.
  Final weights and sizes are matched against the reference in Step 1.

**Sizing.** The reference is not 1:1: it was captured at 80%. The supplied
photo is a 400x469 design export, and the reference shows it at 319x375 (0.80
on both axes). In the reference the popup is 654x375, so the CSS target is
**about 818x469**: a 400px photo column and a ~418px content column. Every
other measurement taken from the reference is divided by 0.8.

**Not replicated:** the blue bar with arrows on the popup's right edge in the
reference is a native scrollbar from an overflowing container, not a design
element. It will not be copied unless the owner says otherwise.

**Behavior (decided 2026-09-11):**

| Rule | Decision |
|---|---|
| Trigger | `mouseout` on the document with no `relatedTarget` and `clientY <= 0`, i.e. the cursor left through the top edge |
| Devices | Desktop only: `(hover: hover) and (pointer: fine) and (min-width: 1025px)`. No trigger on touch devices or below Elementor's desktop breakpoint, which also avoids Google's mobile interstitial penalty |
| Arm delay | Listener attaches 3s after the page loads, so an immediate move to the tab bar on landing doesn't fire it |
| Frequency | Once per session: `sessionStorage` flag set on open, read and written in `try/catch` so blocked storage just means no popup |
| Excluded | `/thank-you/` only |
| Close | X button, click on the overlay, `Escape` |
| Phone | At open time, read the `tel:` link from the page's header CTA (`.elementor-location-header .menu-cta a[href^="tel:"]`), which CallTrackingMetrics has already swapped. Use its href, and display its digits as `888-707-6073` to match the reference. Fall back to `FALLBACK_PHONE` / `FALLBACK_TEL_HREF` from `src/lib/phone.ts` when no header link exists |
| Accessibility | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on the heading, focus moves to the close button on open and back to the previous element on close |

**Must not break:**

- **Page weight.** The popup markup mounts only when triggered, so no popup
  HTML is prerendered. Its CSS (~1.9KB minified) is inlined like every other
  stylesheet under `experimental.inlineCss`, which writes each rule into the
  page three times: about 5.8KB per page, 0.35% of the 1.6MB homepage.
- **The `body-style-guard` script in `layout.tsx`.** It clears
  `body.style.overflow = hidden` until the visitor's first click or keypress,
  and exit intent needs neither. So the popup does **not** lock scrolling
  through body inline styles. The fixed overlay covers the page anyway.
- **CTM number swapping.** The popup reads the header number after the swap
  and never calls CTM itself.
- **Existing Elementor popup styles.** Class names stay under
  `.dbh-exit-popup`, never `.elementor-popup-modal`, so the `base.css` popup
  rules for the menus cannot bleed in.

**Photo:** supplied by the owner on 2026-09-11 as `Frame-2147227713-1.png`
(400x469, from the staging WordPress uploads). It already has rounded corners
on all four sides as transparency, and no pill, so the component draws the
pill but not the photo's corners. It is saved as
`public/images/exit-intent-popup.webp`, keeping the alpha channel.

**Out of scope:** GTM/analytics events for popup open or click, A/B testing,
mobile triggers, and editing the popup copy from WordPress.

## Build steps

- [x] Step 1 - popup UI, opened by exit intent
- [x] Step 2 - trigger rules, close behavior, and phone number

### Step 1 - popup UI, opened by exit intent

- Add the supplied photo as `public/images/exit-intent-popup.webp`.
- `ExitIntentPopup.tsx`: the markup above, rendered through `next/image`,
  opened by a basic top-edge `mouseout` listener, closable with the X. Phone
  hardcoded to the fallback for now.
- `exit-intent-popup.css`: the layout and type from the reference.
- Mount it in `layout.tsx`.

**Done when:** in the dev server, dispatching a top-edge `mouseout` on `/`
opens the popup, and a screenshot taken at the reference's scale lines up with
`blueprint/reference/exit-intent-popup.png` in size, crop, type, colors, and
spacing. The X closes it.

### Step 2 - trigger rules, close behavior, and phone number

- Desktop-only media gate, 3s arm delay, once-per-session flag, `/thank-you/`
  exclusion.
- Overlay click and `Escape` close it. Dialog roles and focus handling as in the
  table.
- Phone read from the header CTA at open time, with the fallback.

**Done when:**

- A second exit on the same tab, including after navigating to another page,
  does not reopen it.
- It never opens on `/thank-you/`, at a 1024px viewport, or with touch
  emulation on.
- Exiting within 3s of load does nothing.
- On `/contact-us/` (server-rendered header number 866-330-9449) the button
  reads and dials exactly what the header shows once CallTrackingMetrics has
  run, which in a browser is a swapped tracking number.
- `Escape` and an overlay click both close it, and focus returns.

## Verify

1. `pnpm typecheck` and `pnpm build` pass.
2. Dev server, desktop viewport: wait 3s on `/`, move the cursor out through
   the top of the window. The popup appears and matches the reference. Close
   it, leave again: nothing. Open a new tab: it shows again.
3. `/contact-us/`: the button shows and dials the same number as the header.
4. `/thank-you/`, a 1024px window, and DevTools mobile emulation: no popup.
5. View source of any page: no popup markup in the prerendered HTML.
