# Coding Standards

> Tuned by `/adopt` to match the conventions actually in this codebase (headless
> WordPress frontend on Next.js). Edit anything that drifts from reality.

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Type WordPress API responses explicitly (see `BuilderPageData`, `BlogItem`,
  `InterlinkItem` in `src/lib/wordpress.ts`)
- Use type inference where obvious, explicit types where helpful

## React / Next.js

- App Router with server components by default; `'use client'` only for
  interactivity (menus, carousels, widget scripts, quiz)
- Pages are statically generated where possible: `generateStaticParams` for
  known WordPress paths, `dynamicParams = true` plus ISR for content created
  between builds
- `export const revalidate = 60` (or the `WORDPRESS_REVALIDATE_SECONDS` env) on
  WordPress-driven routes; on-demand revalidation goes through
  `POST /api/revalidate` with `REVALIDATE_SECRET`
- WordPress fetch helpers live in `src/lib/wordpress.ts` and return `null` on
  failure so callers can fall back (hardcoded cards, `notFound()`); keep new
  fetchers on that pattern, with bounded timeouts when a fetch can run inside a
  visitor's request
- The root `[...slug]` catch-all serves parentless WordPress pages; a top-level
  segment with its own route directory must be listed in its `ROUTED_SEGMENTS`
  set to avoid duplicate prerendering
- SEO metadata (`title`, `description`, `canonical`, `robots`) comes from the
  Builder API `seo` object via `generateMetadata`

## File Organization

- Routes: `src/app/[route]/page.tsx`, with route-scoped CSS next to the page
- Hardcoded page components: `src/components/pages/PageName.tsx`
- WP-driven template components: `src/components/templates/TemplateName.tsx`
- Shared layout chrome and widgets: `src/components/` (Header, Footer, nav,
  widget wrappers)
- Elementor layout wrappers: `src/components/layouts/Layout-N.tsx`
- Helpers: `src/lib/[utility].ts`

Both page styles are intentional and stay: hardcoded components for stable
marketing pages, Builder-API templates for scaled content (locations,
conditions, PPC). New scaled content should use the template system.

## Naming

- Components: PascalCase (`FacilityDetail.tsx`)
- Route directories: kebab-case matching the public URL (`rehab-admission`)
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

## Styling

- Plain CSS files, no Tailwind and no CSS modules
- Styles are Elementor-derived and scoped by Elementor page id
  (`.elementor-691` etc.) so multiple page stylesheets can coexist; keep new
  styles scoped the same way
- Global bases: `src/app/base.css` and `src/app/page.css`
- Match the existing Elementor look; do not introduce a new design system
- No inline styles

## Data Fetching

- All content comes from WordPress REST endpoints (`builder/v1/page-data`,
  `wp/v2/*`, RRIL interlinking); this app stores nothing and has no database or
  auth
- Fetch in server components with `next: { revalidate }` caching
- Never let a WordPress failure crash a page: return `null`, fall back, or
  `notFound()` deliberately
- Sanitize WordPress strings (entity decoding, tag stripping, `%sitename%`
  substitution) with the existing helpers in `src/lib/wordpress.ts`

## Error Handling

- Guard env vars at module load (`WORDPRESS_URL` throws if unset)
- API routes validate input and return proper status codes
  (`401` unauthorized, `400` invalid), never leak secrets

## Testing

No test runner is configured; testing is opt-in and currently **off**. The
opt-in switch is a `test` command in the Commands section of `AGENTS.md`.
Until one exists, verify logic-bearing changes with the build, lint, and
browser/manual evidence; there is no unit-test gate. Run `/tests` to add a
stack-native runner (Vitest for this stack) when the project decides to opt in;
adding it mid-feature without asking is not allowed.

When a runner is eventually configured: test pure logic (parsers, formatters,
URL/slug helpers, WordPress response normalizers), not UI components or
integration surfaces; test files live next to source (`wordpress.test.ts`); an
empty suite must fail.

## Browser Verification

For UI and integration behavior, prefer real browser evidence over reading the
code and assuming it works.

- Playwright is not installed; do not add it silently mid-feature. Use the dev
  server (`pnpm dev`), browser screenshots, build output, or manual verification.
- Browser evidence matters most for the interactive surfaces: menus, carousels,
  quiz, Jotform embeds, CTM number swapping, and anything Elementor-styled where
  CSS scoping can silently break.
- WordPress-driven pages need `WORDPRESS_URL` set (see `.env.local`); without it
  the app throws at startup.

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible
- Build memory limits are intentional (`--max-old-space-size=8192` in the dev
  and build scripts); do not remove them

## Comments

Write code that explains itself; comment only what the code cannot say.
Over-commenting is a common AI tell, so resist it.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner/header blocks, section dividers, or step-by-step narration of obvious
  code. A file does not need a comment announcing each region.
- A comment earns its place only when it captures something the code can't: a
  non-obvious decision, a gotcha or workaround, why a value is what it is, or a
  link to a spec or issue. This codebase leans on such comments for WordPress
  quirks and caching decisions; keep that bar.
- Prefer self-documenting names and small functions over explanatory comments.
- Keep doc comments minimal: a one-line purpose on an exported type or function is
  plenty; don't write JSDoc that just repeats the signature.
- When in doubt, leave the comment out.

## Writing

- No em dashes (U+2014) in generated content: docs, comments, commit messages,
  READMEs, specs. They read as AI-generated.
- Use a hyphen for `term - description` separators; rephrase prose with commas,
  parentheses, or a colon. Avoid en dashes and the ellipsis character too.
