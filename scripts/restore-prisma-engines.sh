#!/bin/bash
# Restore Prisma engine files that were backed up by trim-prisma-engines.sh.
#
# The `prisma generate` CLI requires query_engine_bg.postgresql.wasm-base64.*
# to exist in node_modules/@prisma/client/runtime/ — but the trim script
# removes it (since it's not needed at runtime on Cloudflare Workers).
#
# This script restores the file from the backup so `prisma generate` can run.
# Run this BEFORE `prisma generate` on subsequent builds.

set -e

RUNTIME_DIR="node_modules/@prisma/client/runtime"
BACKUP_DIR="node_modules/.prisma-backup"

if [ ! -d "$BACKUP_DIR" ]; then
  # No backup exists — first run, nothing to restore.
  exit 0
fi

echo "==> Restoring backed-up Prisma engine files"

mkdir -p "$RUNTIME_DIR"
for f in "$BACKUP_DIR"/*; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  if [ ! -f "$RUNTIME_DIR/$base" ]; then
    cp "$f" "$RUNTIME_DIR/$base"
    echo "  restored: $base"
  fi
done

echo "==> Done"
