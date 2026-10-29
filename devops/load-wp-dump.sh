#!/bin/sh
set -e

dump="${1:?usage: pnpm wp:load <path-to-dump.sql.gz>}"

{
  echo "SET autocommit=0; SET unique_checks=0; SET foreign_key_checks=0;"
  gunzip -c "$dump"
  echo "COMMIT;"
} | docker compose exec -T wp-mysql mysql -uroot -pwordpress wordpress
