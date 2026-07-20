***REMOVED***!/bin/bash
***REMOVED*** Restore Prisma engine files that were backed up by trim-prisma-engines.sh.
***REMOVED***
***REMOVED*** The `prisma generate` CLI requires query_engine_bg.postgresql.wasm-base64.*
***REMOVED*** to exist in node_modules/@prisma/client/runtime/ — but the trim script
***REMOVED*** removes it (since it's not needed at runtime on Cloudflare Workers).
***REMOVED***
***REMOVED*** This script restores the file from the backup so `prisma generate` can run.
***REMOVED*** Run this BEFORE `prisma generate` on subsequent builds.

set -e

RUNTIME_DIR="node_modules/@prisma/client/runtime"
BACKUP_DIR="node_modules/.prisma-backup"

if [ ! -d "$BACKUP_DIR" ]; then
  ***REMOVED*** No backup exists — first run, nothing to restore.
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
