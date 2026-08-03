#!/usr/bin/env bash
# One-time setup for the staging box. Idempotent — safe to re-run.
#
#   scp -i ~/work/keys/jake-district.pem deploy/*.cjs deploy/setup-server.sh ubuntu@34.233.131.184:/tmp/
#   ssh -i ~/work/keys/jake-district.pem ubuntu@34.233.131.184 'sudo bash /tmp/setup-server.sh'
#
# Context that drove the design here — this is NOT a dedicated staging box:
#   * /var/www/dbh is root-owned and shares the host with five other apps
#     (api, web, deploy-manager, plus gbp-auto-posting and district-complinace).
#   * pm2 runs as root under pm2-root.service and owns all of them. Anything
#     that talks to pm2 must therefore run as root, or it silently addresses a
#     different, empty pm2 daemon and the deploy becomes a no-op.
#   * Node is pinned to root's nvm v20.20.2. The `ubuntu` user's default node is
#     18.19.1, which cannot run Next 16.
# So: nothing here chowns or relocates the existing checkout. The release layout
# is created alongside it and stays root-owned, matching every other app.
set -euo pipefail

APP_DIR=/var/www/dbh
NODE_BIN=/root/.nvm/versions/node/v20.20.2/bin

if [ "$(id -u)" -ne 0 ]; then
  echo "Run me as root (sudo bash $0) — the release layout and pm2 are root-owned." >&2
  exit 1
fi

echo "==> Release layout under $APP_DIR"
mkdir -p "$APP_DIR/releases" "$APP_DIR/shared" /var/log/dbh

echo "==> Runtime env at $APP_DIR/shared/.env.local"
# Shared across releases so a deploy can never drop it. Seeded from the
# pre-pipeline $APP_DIR/.env if that is still around.
if [ ! -f "$APP_DIR/shared/.env.local" ]; then
  if [ -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env" "$APP_DIR/shared/.env.local"
    echo "    seeded from $APP_DIR/.env"
  else
    cat > "$APP_DIR/shared/.env.local" <<'ENVFILE'
WORDPRESS_URL=https://districtbehavioralhealth.com
WORDPRESS_REVALIDATE_SECONDS=60
REVALIDATE_SECRET=CHANGE-ME
ENVFILE
    echo "    !! Set a real REVALIDATE_SECRET in $APP_DIR/shared/.env.local"
  fi
  chmod 600 "$APP_DIR/shared/.env.local"
else
  echo "    already exists, leaving alone"
fi
# Must equal the REVALIDATE_SECRET repo secret in GitHub Actions, and whatever
# WordPress sends to the revalidate webhook.

echo "==> pm2 ecosystem configs"
for f in ecosystem.config.cjs ecosystem.legacy.cjs; do
  if [ -f "/tmp/$f" ]; then
    install -m 644 "/tmp/$f" "$APP_DIR/shared/$f"
    echo "    installed $f"
  elif [ ! -f "$APP_DIR/shared/$f" ]; then
    echo "    !! MISSING: copy deploy/$f to $APP_DIR/shared/"
  else
    echo "    $f already present"
  fi
done
# The deploy workflow READS these and never rewrites them, so edits in the repo
# do not reach the server on their own — re-run this script to push them.

echo "==> Verifying the pinned Node interpreter exists"
if [ -x "$NODE_BIN/node" ]; then
  echo "    $("$NODE_BIN/node" -v) at $NODE_BIN/node"
else
  echo "    !! MISSING $NODE_BIN/node — update `interpreter` in ecosystem.config.cjs"
  echo "       and node-version in .github/workflows/deploy-staging.yml to match."
fi

echo "==> CI deploy key"
# The workflow connects as a non-root user and escalates with sudo, so the CI
# public key goes in THAT user's authorized_keys (not root's).
if grep -qs "gh-actions-dbh-staging" /home/ubuntu/.ssh/authorized_keys; then
  echo "    already authorised for ubuntu"
else
  echo "    !! Append the CI public key to /home/ubuntu/.ssh/authorized_keys"
fi

echo "==> pm2 boot persistence"
"$NODE_BIN/pm2" startup systemd -u root --hp /root | tail -1
echo "    ^ run the sudo command above if pm2 printed one"

echo
echo "==> Current state"
df -h /
echo
"$NODE_BIN/pm2" list
