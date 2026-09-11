# Staging environment on its own EC2 instance

> **Archived retroactively on 2026-09-11.** The code for this feature merged
> into `main` from branch `feature/staging-environment` via PR #17
> (2026-09-01), but `/complete` was never run, so the spec stayed in
> `current-feature.md`. Recovered unchanged; only this note was added.
>
> Rollout was **not finished** at archive time: no `staging` branch exists and
> `staging.districtbehavioralhealth.com` does not resolve, so Rollout order
> steps 2-5 and the External prerequisites below remain open. Build-plan 14a
> stays unchecked until staging is live.

**Type:** Feature (build-plan 14a)

## The problem

There is one environment. `main` deploys straight to the EC2 box serving the
apex domain, so every change is validated in production. There is no safe place
to test against real WordPress content before visitors see it.

The naming makes this worse. The workflow is called `deploy-staging.yml` even
though its target is production, inherited from build-plan item 11 and from an
older hostname (`dbh.staging-gl.com`) that still resolves to the same box.

One thing blocks any staging host outright: `SITE_URL` in
`src/lib/wordpress.ts` is a hardcoded constant feeding `robots.ts`, the sitemap,
and `toApexCanonical`. Deployed as-is to a second host it would serve a fully
crawlable (`allow: "/"`) clone of ~2,900 URLs advertising canonicals on the
production domain.

## The fix

A `staging` branch deploying to `staging.districtbehavioralhealth.com` on a
separate EC2 instance, so the flow becomes `feature -> staging -> main`.

Decisions taken during design:

- **Same EC2 instance as production**, under a separate `APP_DIR` and pm2 app
  name. An earlier draft called for a separate instance on the grounds that a
  staging deploy peak would be ~18G against 21G free. That was wrong: it assumed
  staging releases match production's ~9G, but production only reaches that size
  through ISR caching one page per crawled URL. Staging sits behind basic auth,
  so it gets no crawlers and no accumulation, and a staging release is close to
  pure build output at ~2G (~4G at deploy peak). RAM is not a factor either
  (15Gi total, 13Gi free). The remaining risk is blast radius, addressed by the
  three mitigations below rather than by a second machine.
- **Collision guards, required by sharing the box.** `APP_DIR`, `APP_PORT` and
  the pm2 app name are parameterised per environment, and both workflows verify
  `$APP_DIR/shared/ENVIRONMENT` matches `EXPECTED_ENV` before touching
  anything. Without that check, a staging deploy resolving production's
  `SSH_HOST` would delete production's releases and restart its pm2 process.
- **Staging reads the production WordPress.** No second WP instance.
- **HTTP basic auth at nginx** is the real protection. `X-Robots-Tag` and a
  disallow-all `robots.txt` are defence in depth.
- **Fail open on robots.** `SITE_URL` and `ROBOTS_ALLOW` default to current
  production behaviour; only staging overrides them. A build with neither set
  behaves exactly as today. A missing env var on production would otherwise
  deindex ~2,900 URLs, which is far worse than a staging leak that basic auth
  already prevents.
- **Staging-only GitHub Environment.** Environment secrets override repo-level
  ones for jobs declaring `environment: staging`, so production's secret wiring
  is untouched.
- **Staging keeps 1 release**, production keeps 2 (unchanged).

Must not break:

- **Production `robots.txt`, canonicals, and sitemap.** This ships to `main`
  before staging exists, and it changes the code that generates all three.
- **The production deploy itself.** The workflow being renamed is the one
  keeping the site alive.
- **`generateStaticParams` / ISR.** Unaffected by display URL, but spot-check
  that a location page still builds.

## Build steps

- [x] Step 1 - make site identity environment-driven
- [x] Step 2 - rename the production workflow
- [x] Step 3 - add the staging workflow
- [x] Step 4 - rollback runbook
- [x] Step 5 - correct the plans so `/overview` regenerates accurately
- [x] Step 6 - reconfigure both workflows to share the production box

### Step 1 - make site identity environment-driven

- `src/lib/wordpress.ts`: `SITE_URL` reads `process.env.SITE_URL`, defaulting to
  the production URL.
- `src/app/robots.ts`: gate on `process.env.ROBOTS_ALLOW !== "false"`. When not
  indexable, return `disallow: "/"` and advertise no sitemap.

**Done when:** with no env set, `/robots.txt` and `/sitemap.xml` are byte-identical
to before. With `SITE_URL=https://staging.districtbehavioralhealth.com` and
`ROBOTS_ALLOW=false`, `/robots.txt` is disallow-all with no sitemap line and
sitemap `<loc>` values use the staging host.

**Evidence (2026-08-31):** verified against a dev server on both configurations.
Production output unchanged; staging output correct on both counts.

### Step 2 - rename the production workflow

`git mv .github/workflows/deploy-staging.yml deploy-production.yml`. Trigger
stays `push: branches: [main]`. Concurrency group becomes `deploy-production`.
Add `SITE_URL` and `ROBOTS_ALLOW: 'true'` to the build env. Leave
`KEEP_RELEASES` and `MIN_FREE_MB` alone.

**Done when:** git records it as a rename, the trigger and retention values are
unchanged, and the build env carries the two new variables.

### Step 3 - add the staging workflow

New `.github/workflows/deploy-staging.yml`, generated from the production file so
the bodies cannot drift. Only these differ: name, trigger (`staging`),
concurrency group, `KEEP_RELEASES: '1'`, `MIN_FREE_MB: '6000'`,
`environment: staging`, and a build env with the staging `SITE_URL` and
`ROBOTS_ALLOW: 'false'`. Update `AGENTS.md` to document both workflows and the
mirror rule.

**Done when:** `diff` between the two workflow files shows only those deltas.

### Step 4 - rollback runbook

Write the rollback procedure somewhere tracked: the automatic health-check
rollback already in the workflow, and the manual symlink flip for a deploy that
passes the health check but is still wrong. Include the three limits: one step
back only, a server rollback does not roll back `main`, and the rollback target
dies on the next deploy.

**Done when:** the runbook exists in a version-controlled path and its commands
match the workflow's actual paths and pm2 invocation.

**Evidence (2026-08-31):** written to `runbooks/rollback.md`, outside the
gitignored `/docs/`. `APP_DIR`, the pm2 binary path, the ecosystem config path,
and the health-check URL all verified against `deploy-production.yml`.

### Step 5 - correct the plans so `/overview` regenerates accurately

`/overview` distills the plans, not the code, so the plans have to be right
first.

- `blueprint/build-plan.md` item 11 - reword "Staging deploy pipeline" to name
  what it actually built (the production pipeline). This wording is the origin
  of the misnomer.
- `blueprint/build-plan.md` item 14 - record 14a as this staging environment.
- `blueprint/project-plan.md` section 8 - describe two environments.

**Done when:** the plans describe both environments, and a subsequent
`/overview` run produces a `project-overview.md` that no longer claims `main`
deploys to staging.

**Evidence (2026-08-31):** build-plan item 11 reworded and its misnomer
explained, 14a recorded, project-plan section 8 now describes both environments
and the two build-time env vars. `/overview` has not been run yet; it is the
next action once this branch merges.

### Step 6 - reconfigure both workflows to share the production box

Added after the separate-instance decision was reversed. Parameterise everything
that would otherwise collide, and guard against the collision that parameters
cannot prevent.

- Both files gain `PM2_APP` and `EXPECTED_ENV` in their env block.
- Every hardcoded `$PM2 delete/pid/logs dbh` becomes `"$PM2_APP"`.
- Staging uses `APP_DIR: /var/www/dbh-staging`, `APP_PORT: '3002'`, and
  `PM2_APP: dbh-staging`.
- Both remote scripts start by reading `$APP_DIR/shared/ENVIRONMENT` and
  aborting unless it matches `EXPECTED_ENV`. This runs in the disk-space step
  as well as the release step, because the disk-space step deletes release
  directories under `$APP_DIR` before any deploy logic runs.
- Staging `MIN_FREE_MB: '4000'`, covering its own ~2G extract with margin.

**Done when:** `diff` between the two workflows shows differences only in the
header, trigger, concurrency group, env block, `environment:`, and build env.
No hardcoded pm2 app name remains in either file.

**Evidence (2026-08-31):** diff confirmed clean, `grep` finds no remaining
`PM2 <cmd> dbh`, and each file contains the marker guard twice.

## External prerequisites (not code steps)

Owner tasks. Full operational detail is in the local `docs/staging-environment-task.md`.

- GitHub: create the `staging` Environment. It needs all **seven** secrets the
  workflow references, because any name left undefined falls back to the
  repo-level secret, which points at production: `SSH_HOST`, `SSH_USER`,
  `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`, `WORDPRESS_URL` (same as production),
  `WORDPRESS_REVALIDATE_SECONDS`, and a new distinct `REVALIDATE_SECRET`.
  Restrict deployment branches to `staging`. Do not set required reviewers or a
  wait timer; either would pause every staging deploy. Do not touch repo-level
  secrets.

  Status 2026-08-31: environment created with `REVALIDATE_SECRET`,
  `WORDPRESS_REVALIDATE_SECONDS`, `WORDPRESS_URL`, and the `staging` branch
  rule.

  Because staging now shares the production box, `SSH_HOST`, `SSH_USER`,
  `SSH_PRIVATE_KEY` and `SSH_KNOWN_HOSTS` are deliberately left undefined in the
  environment: falling back to the repo-level values is correct, since the target
  machine is the same. **If staging ever moves to its own instance, all four must
  be defined in the environment**, or the staging deploy will target production.
- Server, on the existing production box (34.233.131.184). No new instance.
  - **Environment markers, before this branch merges.** Production's is a merge
    blocker: without it the next production deploy aborts on the new guard.
    Production marker created 2026-08-31; staging marker still pending.
    ```
    sudo mkdir -p /var/www/dbh/shared /var/www/dbh-staging/shared
    echo production | sudo tee /var/www/dbh/shared/ENVIRONMENT
    echo staging    | sudo tee /var/www/dbh-staging/shared/ENVIRONMENT
    ```
  - `/var/www/dbh-staging/{releases,shared}`, with `shared/.env.local` and
    `shared/ecosystem.config.cjs` copied from production and edited: pm2 app
    name `dbh-staging`, port 3002, and staging's own `REVALIDATE_SECRET`.
  - DNS `A` record for `staging.districtbehavioralhealth.com` pointing at the
    same box.
- nginx, a new server block on the same box: proxy to `127.0.0.1:3002`, certbot
  TLS for the staging hostname, `auth_basic` plus htpasswd, and
  `X-Robots-Tag: noindex, nofollow`. Run `nginx -t` before every reload; a bad
  block takes down all sites on this machine.

## Rollout order

1. Merge this branch to `main` and watch that production deploy closely. Highest
   risk step: it changes the code generating production's `robots.txt`, sitemap,
   and canonicals.
2. Create the two environment markers on the box. Production's must exist before
   the merge in step 1, not after.
3. Add the staging nginx server block, TLS, basic auth, and DNS, with no app
   deployed. Confirm an unauthenticated request returns `401`.
4. `git checkout -b staging main && git push -u origin staging`. The staging
   branch is born here, already carrying the staging workflow, and the first
   staging deploy fires. A workflow triggered by pushes to `staging` must exist
   on that branch, which is why this comes after the merge.
5. Verify staging.
6. Switch feature work to `feature -> staging -> main`. This branch is the one
   exception, going straight to `main` because `staging` does not exist yet.

## Verify

1. `pnpm typecheck` and `pnpm build` pass. Both confirmed 2026-08-31; the build
   ran with no `SITE_URL` or `ROBOTS_ALLOW` set, which is the production path.
2. After the merge, on production: `/robots.txt` still reads `Allow: /` with the
   apex sitemap URL, a sample page canonical is unchanged and on the apex, and
   `/sitemap.xml` renders with slashed apex URLs.
3. On staging behind auth: unauthenticated `curl -I` returns `401`,
   `/robots.txt` is disallow-all, canonicals use the staging host, and a
   location-served page and a blog page render with correct styling.
4. A location-served page still prerenders and revalidates.

## Branch model

`main` receives nothing except merges from `staging`. If production needs a
hotfix, branch from `main`, merge to `staging` first, then `staging` into
`main`. Committing directly to `main` is what makes cascading environment
branches drift, and drift means a `staging -> main` merge starts dragging in
unreviewed commits.

## Out of scope, flagged

- **Production `MIN_FREE_MB` is `2200`** but the guard runs immediately before
  extracting a ~9G release, so it can pass and then fill the disk mid-`tar`.
  Deliberately excluded so production workflow values stay untouched in this
  change. Should be raised in its own commit.
- **`dbh.staging-gl.com` still serves production.** Retiring it needs a certbot
  reissue first, because the production certificate is issued under that
  lineage and includes it as a SAN. Reissue, then remove from `server_name`.
- **An nginx scanner blocklist was applied to the production box on 2026-08-31**
  (returns `444` for `wp-admin`, `wp-content`, `@fs` and similar). It is server
  config, not repo code, so it is not part of this feature. It stopped an
  unauthenticated disk-fill vector where every bot probe was rendered and cached
  at ~3MB.
- **`blueprint/context/project-overview.md`** is `/overview`-generated and must
  not be hand-edited. Step 5 fixes its inputs.
