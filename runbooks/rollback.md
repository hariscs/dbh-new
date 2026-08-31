# Runbook: roll back a bad deploy

Applies to both environments. Paths and the pm2 binary location come from
`.github/workflows/deploy-production.yml`; if that file changes, change this too.

Both environments run on the same box, separated by app dir, port, and pm2 app
name. Check which one you are touching before running anything.

| | Production | Staging |
|---|---|---|
| Host | `34.233.131.184` | same box |
| Site | districtbehavioralhealth.com | staging.districtbehavioralhealth.com |
| `APP_DIR` | `/var/www/dbh` | `/var/www/dbh-staging` |
| Port | 3001 | 3002 |
| pm2 app | `dbh` | `dbh-staging` |
| Releases kept | 2 | 1 |
| Manual rollback possible | yes | **no**, redeploy instead |

## First: is a rollback the right move?

The deploy already rolls itself back automatically if the health check fails.
That check is narrow: it polls `http://127.0.0.1:3001/` for 60 seconds and
confirms the pm2 process is running from the new release directory. A hard
failure of the homepage is caught and reversed without you doing anything.

So if you are reading this, the deploy most likely **passed** its health check
and is still wrong. A broken template, a bad canonical, one route returning 500,
or a visual regression all pass that check.

If the site is truncating pages rather than erroring, this is the wrong runbook.
Check `df -h /` first: a full disk makes nginx cut every response short, which
looks like an application bug and is not one.

## Manual rollback (production)

Takes about 30 seconds, versus 15 to 25 minutes for a rebuild.

```bash
ssh -i docs/keys/keys/jake-district.pem ubuntu@34.233.131.184
```

```bash
APP_DIR=/var/www/dbh
PM2=/root/.nvm/versions/node/v20.20.2/bin/pm2

# Newest first. [0] is what is live now, [1] is what you are going back to.
sudo ls -1dt $APP_DIR/releases/*/
readlink -f $APP_DIR/current
```

Release directories are named `<git-sha>-<github-run-id>`, so the directory name
tells you exactly which commit you are reverting to and which Actions run built
it.

```bash
# Atomic swap. Write the new target to a temp name, then rename over the old one,
# so `current` never fails to resolve mid-switch.
sudo ln -sfnT $APP_DIR/releases/<PREVIOUS-DIR> $APP_DIR/current.tmp
sudo mv -Tf $APP_DIR/current.tmp $APP_DIR/current

sudo $PM2 delete dbh
sudo $PM2 start $APP_DIR/shared/ecosystem.config.cjs --update-env
sudo $PM2 save

curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3001/
```

Then confirm from outside the box that the public site is serving the older
build.

## Three limits, all of which have bitten people

**1. One step back only.** Production keeps 2 releases, so the only rollback
target is the immediately previous deploy. Two bad deploys in a row and the last
good release is already deleted.

**2. Rolling back the server does not roll back `main`.** The bad commit is
still on the branch. The next push to `main`, by anyone, for any reason,
redeploys the bug **and** destroys your rollback target in the same run. The
symlink flip buys you time; it is not the fix.

Finish the job:

```bash
git revert <bad-sha>
```

then let the pipeline deploy the revert normally.

**3. The rollback target dies on the next deploy**, successful or not. The
deploy script deletes every release except `current` before extracting the new
one. There is no way to pin a known-good release.

## Staging

Staging keeps 1 release, so once a deploy succeeds there is nothing to roll back
to. This is deliberate. Push a fix to the `staging` branch and redeploy.

If you do run commands against staging, substitute `/var/www/dbh-staging` for
`APP_DIR` and `dbh-staging` for the pm2 app name. Running the production
commands above while intending to fix staging would restart the live site.

The automatic health-check rollback still works during a staging deploy, because
it runs before the retention prune.

## If the deploy failed rather than succeeded badly

The workflow's own rollback should already have restored the previous release
and printed 60 lines of pm2 logs into the Actions output. Read those first.

If it reported `No previous release to roll back to`, the app is down and there
is nothing on disk to revert to. Redeploying a known-good commit via
`workflow_dispatch` is the fastest recovery.

## Related

- `blueprint/context/current-feature.md` for the current environment layout
- `.github/workflows/deploy-production.yml` and `deploy-staging.yml` for the
  authoritative paths, retention, and health check
