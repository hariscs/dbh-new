# DBH Backend

Payload CMS on Postgres. Replaces the WordPress backend behind the DBH frontend in `apps/frontend`.

## Local setup

Run from the repo root:

```bash
cp apps/backend/.env.example apps/backend/.env   # set PAYLOAD_SECRET
pnpm db:up                             # Postgres 16 in Docker on 127.0.0.1:5435
pnpm install
pnpm dev:backend                       # http://localhost:3003/admin
```

`pnpm db:down` stops it. `docker compose down -v` also wipes the data.

## Importing from WordPress

```bash
pnpm wp:up                                   # MySQL 8 in Docker on 127.0.0.1:3307 (profile "import")
pnpm wp:load <path-to-dump.sql.gz>           # ~20 min for the DBH dump
pnpm import:wp                               # terms, pages, field groups, RRIL rules, menu; re-runnable
pnpm parity                                  # quick check: saved samples of every endpoint
pnpm capture:baselines                       # once: ~1,250 prod responses into baseline-all/ (~25 min)
pnpm parity:all                              # every page-data and RRIL path against baseline-all/
```

- `import:wp` reads `WP_DATABASE_URL`. The first run fetches each post's `present[]` from the prod
  `page-data` endpoint (two at a time) and caches it in `.cache/present.json`; later runs only fetch
  posts missing from the cache.
- `parity` reads `PARITY_BASELINE_DIR` (prod responses, with `paths.txt` one level up) and calls the
  same lookups as the endpoints, so no server needs to run. `capture:baselines` and `parity:all` use
  `baseline-all/` next to it; capture resumes, stops after 10 consecutive failures, and only reads prod.
- The menu is a snapshot of prod's `builder/v1/menu`, cached in `.cache/menu.json`.
- If the import hangs at 0% CPU after a collection was renamed or removed, Payload's dev schema push is
  waiting for an interactive answer. Drop the old table locally and rerun.
- The output reproduces the WordPress Builder API plugin exactly, including ACF's wysiwyg formatting
  (`src/import/wp-text.ts`) and DBH-specific behaviour (`FALLBACK_VALUES`, `[nav_glbl_var]`).

## API

Same paths and responses as WordPress, so the frontend switches by changing `WORDPRESS_URL`. Every
endpoint the frontend calls is served, and all are public:

| Endpoint | Code |
| --- | --- |
| `builder/v1/page-data`, `pages`, `field-groups` | `src/builder-api/page-data.ts`, `pages.ts`, `field-groups.ts` |
| `builder/v1/menu` | `src/builder-api/menu.ts` |
| `builder/v1/drug-index` | `src/builder-api/drug-index.ts` |
| `rril/v1/interlinking/<path>` | `src/builder-api/interlinking.ts` (rules in `interlinking-rules`) |
| `wp/v2/<type>` | `src/builder-api/wp-v2.ts` (only the query shapes the frontend sends) |

Intended differences from WordPress: an unknown RRIL path returns 404 (WordPress crashes and sends an
empty 200), and pages with an empty-slug ancestor are never served by path, matching what WordPress serves.

## Editing

Edit pages in the admin at `/admin`. `fields` holds the finished values the API serves (HTML for wysiwyg
fields). Terms are stored as IDs in `termIds`; on every save `src/content/derive.ts` rebuilds the
term-based fields, `templates`, RRIL data (`interlinking`), `meta`, and the path when the slug or parent
changes. The importer goes through the same hook with `context: { import: true }`.

After a save, `src/content/revalidate.ts` asks the frontend to refresh that page (and its old path after a
slug change); menu saves refresh the whole site. Set `FRONTEND_URL` and `REVALIDATE_SECRET` (same value as
the frontend). A failed refresh is logged and never blocks the save; other pages pick the change up on the
frontend's normal revalidation timer.

Known limits: changing a parent's slug doesn't move its children, and the menu is a JSON snapshot.

## Docker image

```bash
pnpm docker:build
docker run --env-file apps/backend/.env -p 3000:3000 dbh-backend
```

One image for every environment, variables supplied at start. Inside the container nginx listens on
3000 and proxies to Next.js on 8080 under supervisord (`devops/`). The entrypoint runs
`payload migrate` before starting, so schema changes must ship as migrations
(`pnpm --dir apps/backend payload migrate:create`).
