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

## Docker image

```bash
pnpm docker:build
docker run --env-file apps/backend/.env -p 3000:3000 dbh-backend
```

One image for every environment, variables supplied at start. Inside the container nginx listens on
3000 and proxies to Next.js on 8080 under supervisord (`devops/`). The entrypoint runs
`payload migrate` before starting, so schema changes must ship as migrations
(`pnpm --dir apps/backend payload migrate:create`).
