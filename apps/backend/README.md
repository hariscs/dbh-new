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
pnpm import:wp                               # all published posts → Payload "pages", re-runnable
pnpm parity                                  # diff page-data against saved prod responses
```

- `import:wp` reads `WP_DATABASE_URL`. The first run fetches each post's `present[]` from the prod
  `page-data` endpoint (two at a time) and caches it in `.cache/present.json`; later runs only fetch
  posts missing from the cache.
- `parity` reads `PARITY_BASELINE_DIR` (prod `page-data?present=1` JSON per path, with `paths.txt`
  one level up) and calls the same lookup as the endpoint, so no server needs to run.
- The output reproduces the WordPress Builder API plugin exactly, including ACF's wysiwyg formatting
  (`src/import/wp-text.ts`) and DBH-specific behaviour (`FALLBACK_VALUES`, `[nav_glbl_var]`).

## API

`GET /wp-json/builder/v1/page-data?path=…|id=…|slug=…[&present=1]` — same path and response as the
WordPress plugin, so the frontend switches by changing `WORDPRESS_URL`. Other endpoints are not ported yet.

## Docker image

```bash
pnpm docker:build
docker run --env-file apps/backend/.env -p 3000:3000 dbh-backend
```

One image for every environment, variables supplied at start. Inside the container nginx listens on
3000 and proxies to Next.js on 8080 under supervisord (`devops/`). The entrypoint runs
`payload migrate` before starting, so schema changes must ship as migrations
(`pnpm --dir apps/backend payload migrate:create`).
