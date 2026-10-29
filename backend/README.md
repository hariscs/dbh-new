# DBH Backend

Payload CMS on Postgres. Replaces the WordPress backend behind the DBH frontend in `../frontend`.

## Setup

```bash
cp backend/.env.example backend/.env   # set DATABASE_URL and PAYLOAD_SECRET
pnpm install                           # from the repo root
pnpm dev:backend                       # http://localhost:3003/admin
```
