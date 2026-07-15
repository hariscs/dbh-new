# dbh-test

Generated with **AI Builder**

## Step 1 — WordPress plugin

The Builder API plugin should already be installed on your WordPress site from the setup step.
The `wp-plugin/builder-api.zip` file in this ZIP is included in case you need to reinstall or update it.

**To update the plugin:**

1. Go to **WP Admin → Plugins**, deactivate and delete the existing Builder API plugin
2. Go to **Add New Plugin → Upload Plugin**, upload `wp-plugin/builder-api.zip` and activate

**To verify it is working:**

```bash
curl "https://your-wordpress-site.com/wp-json/builder/v1/page-data?slug=your-page-slug"
```

You should get a JSON response with `apiVersion`, `fields`, `seo`, and `meta`.

> **⚠️ Caching warning**
>
> Exclude `/wp-json/builder/v1/*` from any caching plugin (WP Rocket, NitroPack, LiteSpeed Cache, etc.)
> and from Cloudflare if applicable.
> Without this, content updates will not propagate to the Next.js site correctly.


## Step 2 — Configure environment variables

Open `.env.local` and update the values before deploying:

```env
WORDPRESS_URL=https://your-wordpress-site.com   # URL of your WordPress site (no trailing slash)
WORDPRESS_REVALIDATE_SECONDS=60                 # How often pages re-fetch from WordPress
REVALIDATE_SECRET=change-me-before-deploying    # Change this to a random secret string
```

## Step 3 — Deploy

Deploy this project to your preferred hosting platform.
Make sure the environment variables from `.env.local` are added to your hosting provider's
environment settings (not just the local file).

## Step 4 — Verify

Visit your deployed site. Content is fetched live from WordPress and cached for
`WORDPRESS_REVALIDATE_SECONDS` seconds (default: 60).

## How content updates work

When you update content in WordPress (manually or via WP All Import from Google Sheets):

- Pages automatically refresh within 60 seconds via Next.js ISR
- To force an immediate update, send a POST request to your revalidation webhook:

```bash
curl -X POST https://your-nextjs-site.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"slug": "your-page-slug", "secret": "your-revalidate-secret"}'
```

Omit `slug` to revalidate all pages at once.

## Local development

```bash
pnpm install
pnpm dev
```

Or with npm:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## File structure

- `src/app/base.css` — shared styles (header, footer, framework), loaded on every route
- `src/app/**/page.css` — per-route styles, loaded only by that page
- `src/components/pages/` — individual page components
- `src/components/templates/` — shared templates used across dynamic routes
- `src/components/layouts/` — shared layout sections
- `public/images/` — compressed WebP images
- `wp-plugin/builder-api.zip` — WordPress plugin (install on your WP site, not here)
