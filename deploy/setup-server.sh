#!/usr/bin/env bash
#   scp -i ~/work/keys/jake-district.pem deploy/*.cjs deploy/setup-server.sh ubuntu@34.233.131.184:/tmp/
#   ssh -i ~/work/keys/jake-district.pem ubuntu@34.233.131.184 'sudo bash /tmp/setup-server.sh'
set -euo pipefail

APP_DIR=/var/www/dbh
NODE_BIN=/root/.nvm/versions/node/v20.20.2/bin

if [ "$(id -u)" -ne 0 ]; then
  echo "Run me as root (sudo bash $0)." >&2
  exit 1
fi

echo "==> Release layout under $APP_DIR"
mkdir -p "$APP_DIR/releases" "$APP_DIR/shared" /var/log/dbh

echo "==> Runtime env at $APP_DIR/shared/.env.local"
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

echo "==> pm2 ecosystem configs"
for f in ecosystem.config.cjs; do
  if [ -f "/tmp/$f" ]; then
    install -m 644 "/tmp/$f" "$APP_DIR/shared/$f"
    echo "    installed $f"
  elif [ ! -f "$APP_DIR/shared/$f" ]; then
    echo "    !! MISSING: copy deploy/$f to $APP_DIR/shared/"
  else
    echo "    $f already present"
  fi
done

echo "==> Verifying the pinned Node interpreter exists"
if [ -x "$NODE_BIN/node" ]; then
  echo "    $("$NODE_BIN/node" -v) at $NODE_BIN/node"
else
  echo "    !! MISSING $NODE_BIN/node"
fi

echo "==> CI deploy key"
if grep -qs "gh-actions-dbh-staging" /home/ubuntu/.ssh/authorized_keys; then
  echo "    already authorised for ubuntu"
else
  echo "    !! Append the CI public key to /home/ubuntu/.ssh/authorized_keys"
fi

echo "==> pm2 boot persistence"
"$NODE_BIN/pm2" startup systemd -u root --hp /root | tail -1

echo
echo "==> Current state"
df -h /
echo
"$NODE_BIN/pm2" list
