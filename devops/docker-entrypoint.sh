#!/bin/sh
set -e

cd /usr/src/app/apps/backend
node_modules/.bin/payload migrate

exec /usr/bin/supervisord -c /etc/supervisord.conf
