#!/bin/bash
# Build for Cloudflare with stub db.ts to keep the bundle under 3 MiB free-plan limit.
#
# The CF Worker only serves public pages + proxies /api/* and /admin/* to the
# Render backend (configured via BACKEND_URL env var). It never actually
# executes DB code, so we swap in a stub db.ts at build time.
#
# Usage:
#   bash scripts/build-cloudflare.sh   # builds with stub
#
# After build, the real db.ts is restored automatically.

set -e

cd "$(dirname "$0")/.."

echo "── build-cloudflare: swapping in stub db.ts ──"
cp src/lib/db.ts src/lib/db-impl.ts.bak
cp src/lib/db-stub.ts src/lib/db.ts
trap 'cp src/lib/db-impl.ts.bak src/lib/db.ts && rm src/lib/db-impl.ts.bak; echo "── build-cloudflare: restored real db.ts ──"' EXIT

echo "── build-cloudflare: running opennextjs-cloudflare build ──"
bunx opennextjs-cloudflare build

echo "── build-cloudflare: done ──"
