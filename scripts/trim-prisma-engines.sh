#!/bin/bash
# Prisma engine trimmer — removes unused engines for Cloudflare Workers.
#
# In Prisma 6.19 with driverAdapters + queryCompiler preview features:
# - The WASM query compiler (query_engine_bg.wasm + base64 bundles) IS needed
#   at runtime — it compiles Prisma queries into SQL.
# - The native library engine (libquery_engine-*.so.node) is NOT needed —
#   the adapter handles SQL execution directly.
# - Non-postgres WASM bundles (mysql, cockroachdb, sqlserver, sqlite) are not
#   needed since we only use postgres.

set -e

RUNTIME_DIR="node_modules/@prisma/client/runtime"
GEN_DIR="node_modules/.prisma/client"

echo "==> Trimming unused Prisma engines"

# 1. Remove non-postgres WASM base64 bundles (mysql, cockroachdb, sqlserver, sqlite)
if [ -d "$RUNTIME_DIR" ]; then
  find "$RUNTIME_DIR" -type f \( \
    -name "query_compiler_bg.cockroachdb.wasm-base64.*" -o \
    -name "query_compiler_bg.mysql.wasm-base64.*" -o \
    -name "query_compiler_bg.sqlserver.wasm-base64.*" -o \
    -name "query_compiler_bg.sqlite.wasm-base64.*" \
  \) -delete -print 2>/dev/null || true
fi

# 2. Remove native Node library engine binaries (unused with driverAdapters)
if [ -d "$GEN_DIR" ]; then
  find "$GEN_DIR" -type f \( \
    -name "libquery_engine-*.so.node" -o \
    -name "libquery_engine-*.dll.node" -o \
    -name "libquery_engine-*.dylib.node" -o \
    -name "query_engine-*.exe" \
  \) -delete -print 2>/dev/null || true
fi

echo "==> Done"
echo ""
echo "Remaining .prisma/client/ files:"
ls -lh "$GEN_DIR" 2>/dev/null | awk '{print "  " $5 "  " $9}' || echo "  (none)"
