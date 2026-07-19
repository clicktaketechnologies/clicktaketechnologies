#!/bin/bash
# Prisma engine trimmer — removes WASM/native engines that are unused on Cloudflare
# Workers when running in `driverAdapters` + `queryCompiler` mode.
#
# After `prisma generate`, the @prisma/client package ships ~30MB of engine
# files for 5 database backends × 2 file types × 2 formats. On Cloudflare
# Workers with the @prisma/adapter-pg driver adapter + queryCompiler,
# Prisma compiles queries in pure JS and the adapter speaks SQL directly
# to Postgres — NO WASM engine is needed at runtime.
#
# This script removes:
#   - All non-postgresql WASM engine base64 bundles (cockroachdb/sqlserver/mysql/sqlite)
#   - The native Node library engine (.so.node, .dll, .dylib, .exe) — unused on Workers
#   - The standalone query_engine_bg.wasm — queryCompiler mode doesn't use it
#   - The postgresql WASM base64 bundles — only referenced by generator-build (build-time)
#   - Stubs `wasm-worker-loader.mjs` to a no-op so esbuild doesn't bundle the .wasm file
#
# It KEEPS:
#   - The generated client.js / index.js / index.d.ts (the actual client)
#   - @prisma/client/runtime/wasm-engine-edge.js (used at runtime for type imports)
#
# Re-run any time. Idempotent. Safe to run on dev machines too — the local
# `prisma generate` will repopulate files on the next install if needed.
# (When developing locally on Node, set PRISMA_FORCE_WASM=0 to use the
# library engine; or just re-run `prisma generate` to repopulate engines.)

set -e

RUNTIME_DIR="node_modules/@prisma/client/runtime"
GEN_DIR="node_modules/.prisma/client"

echo "==> Trimming unused Prisma engines"

# 1. Remove ALL WASM engine base64 bundles (none are imported at runtime in
#    queryCompiler mode — only by the generator-build, which is build-time)
if [ -d "$RUNTIME_DIR" ]; then
  find "$RUNTIME_DIR" -type f -name "*.wasm-base64.*" -delete -print 2>/dev/null || true
fi

# 2. Remove native Node library engine binaries (huge — 17MB+ each, unused on Workers)
if [ -d "$GEN_DIR" ]; then
  find "$GEN_DIR" -type f \( \
    -name "libquery_engine-*.so.node" -o \
    -name "libquery_engine-*.dll.node" -o \
    -name "libquery_engine-*.dylib.node" -o \
    -name "query_engine-*.exe" \
  \) -delete -print 2>/dev/null || true
fi

# 3. Remove the standalone WASM engine — queryCompiler mode doesn't use it
if [ -f "$GEN_DIR/query_engine_bg.wasm" ]; then
  rm -f "$GEN_DIR/query_engine_bg.wasm"
  echo "  removed $GEN_DIR/query_engine_bg.wasm"
fi

# 4. Stub the workerd WASM loader so esbuild doesn't try to bundle the .wasm file.
#    The original: `export default import('./query_engine_bg.wasm')`
#    Our stub: throws a clear error IF ever called (which it shouldn't be in
#    queryCompiler mode). This breaks the import chain at the last hop and
#    prevents the 2.2MB WASM from being included in the Worker bundle.
cat > "$GEN_DIR/wasm-worker-loader.mjs" <<'STUB'
// Stubbed by scripts/trim-prisma-engines.sh
// In queryCompiler + driverAdapter mode, this loader is never invoked.
// If you see this error at runtime, the Prisma client is trying to use the
// WASM query engine — set `previewFeatures = ["queryCompiler"]` in schema.prisma
// and pass a driver adapter to PrismaClient.
export default Promise.reject(new Error(
  "Prisma WASM engine loader stubbed out. Use @prisma/adapter-pg + queryCompiler mode. " +
  "See scripts/trim-prisma-engines.sh for details."
));
STUB

cat > "$GEN_DIR/wasm-edge-light-loader.mjs" <<'STUB'
// Stubbed by scripts/trim-prisma-engines.sh (edge-light variant)
export default Promise.reject(new Error(
  "Prisma WASM engine loader stubbed out. Use @prisma/adapter-pg + queryCompiler mode."
));
STUB

echo "  stubbed wasm-worker-loader.mjs + wasm-edge-light-loader.mjs"
echo "==> Done"
echo ""
echo "Remaining @prisma/client/runtime WASM bundles:"
ls -lh "$RUNTIME_DIR"/*.wasm-base64.* 2>/dev/null | awk '{print "  " $5 "  " $9}' || echo "  (none)"
echo ""
echo "Remaining .prisma/client/ files:"
ls -lh "$GEN_DIR" 2>/dev/null | awk '{print "  " $5 "  " $9}' || echo "  (none)"
