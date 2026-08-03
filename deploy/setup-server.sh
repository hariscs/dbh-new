#!/usr/bin/env bash
# One-time setup on the staging box. Run once as the deploy user; after this the
# GitHub Actions workflow owns every subsequent deploy.
#
#   scp -i ~/work/keys/jake-district.pem deploy/setup-server.sh ubuntu@34.233.131.184:/tmp/
#   ssh -i ~/work/keys/jake-district.pem ubuntu@34.233.131.184 'bash /tmp/setup-server.sh'
set -euo pipefail

APP_DIR=/var/www/dbh
DEPLOY_USER="$(whoami)"

echo "==> Creating release layout under $APP_DIR"
sudo mkdir -p "$APP_DIR"/{releases,shared}
sudo mkdir -p /var/log/dbh
sudo chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$APP_DIR" /var/log/dbh

# The existing checkout at $APP_DIR is whatever is running today. Keep it around
# as a fallback rather than deleting it — it is the only rollback target until
# the first two pipeline deploys have run.
if [ -d "$APP_DIR/.git" ]; then
  echo "==> Existing git checkout found; preserving it at $APP_DIR/../dbh-legacy"
  sudo mv "$APP_DIR/.git" "$APP_DIR/../dbh-legacy-git" 2>/dev/null || true
fi

echo "==> Writing runtime env to $APP_DIR/shared/.env.local"
if [ ! -f "$APP_DIR/shared/.env.local" ]; then
  cat > "$APP_DIR/shared/.env.local" <<'ENVFILE'
WORDPRESS_URL=https://districtbehavioralhealth.com
WORDPRESS_REVALIDATE_SECONDS=60
REVALIDATE_SECRET=CHANGE-ME
ENVFILE
  chmod 600 "$APP_DIR/shared/.env.local"
  echo "    !! Set a real REVALIDATE_SECRET in $APP_DIR/shared/.env.local"
else
  echo "    already exists, leaving alone"
fi

echo "==> Installing pm2 ecosystem config"
# Copy deploy/ecosystem.config.cjs from the repo to $APP_DIR/shared/ before this,
# or paste it in now.
if [ ! -f "$APP_DIR/shared/ecosystem.config.cjs" ]; then
  echo "    !! MISSING: copy deploy/ecosystem.config.cjs to $APP_DIR/shared/"
fi

echo "==> Authorising the CI deploy key"
# Paste the PUBLIC half of the ed25519 key generated for CI.
echo "    Append the CI public key to ~/.ssh/authorized_keys, then re-run a deploy."

echo "==> Making pm2 survive reboots (note: a restart is already pending on this box)"
pm2 startup systemd -u "$DEPLOY_USER" --hp "$HOME" | tail -1
echo "    ^ run the sudo command above if pm2 printed one"

echo
echo "==> Current state"
df -h /
echo
echo "Who owns the running processes:"
sudo pm2 list 2>/dev/null || echo "  (no root pm2)"
pm2 list
