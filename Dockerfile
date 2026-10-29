# Backend (Payload CMS) image. The frontend deploys separately to EC2 via GitHub Actions.

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat && npm install -g pnpm@11.20.0

COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/pnpm-lock.yaml apps/backend/
RUN pnpm install --frozen-lockfile --filter ./apps/backend

COPY apps/backend apps/backend
RUN pnpm --dir apps/backend build

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM node:lts-alpine

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat nginx supervisor && npm install -g pnpm@11.20.0

WORKDIR /usr/src/app

COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/pnpm-lock.yaml apps/backend/
RUN pnpm install --frozen-lockfile --prod --filter ./apps/backend

COPY --from=builder /usr/src/app/apps/backend/.next          apps/backend/.next
COPY --from=builder /usr/src/app/apps/backend/src            apps/backend/src
COPY --from=builder /usr/src/app/apps/backend/next.config.ts apps/backend/next.config.ts
COPY --from=builder /usr/src/app/apps/backend/tsconfig.json  apps/backend/tsconfig.json

COPY devops/nginx.conf /etc/nginx/http.d/default.conf
COPY devops/supervisord.conf /etc/supervisord.conf

COPY devops/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
