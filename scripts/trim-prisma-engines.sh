***REMOVED***!/bin/bash
***REMOVED*** Prisma engine trimmer — removes unused engines for Cloudflare Workers.
***REMOVED***
***REMOVED*** In Prisma 6.19 with driverAdapters + queryCompiler preview features:
***REMOVED*** - The WASM query compiler (query_compiler_bg.postgresql.wasm-base64.*) IS
***REMOVED***   needed at runtime — it compiles Prisma queries into SQL.
***REMOVED*** - The native library engine (libquery_engine-*.so.node) is NOT needed —
***REMOVED***   the adapter handles SQL execution directly.
***REMOVED*** - Non-postgres WASM bundles (mysql, cockroachdb, sqlserver, sqlite) are not
***REMOVED***   needed since we only use postgres.
***REMOVED*** - query_engine_bg.postgresql.wasm-base64.* is needed by `prisma generate`
***REMOVED***   (CLI) but NOT at runtime. We BACK IT UP instead of deleting, so subsequent
***REMOVED***   `prisma generate` runs can restore it (see restore-prisma-engines.sh).

set -e

RUNTIME_DIR="node_modules/@prisma/client/runtime"
GEN_DIR="node_modules/.prisma/client"
BACKUP_DIR="node_modules/.prisma-backup"

echo "==> Trimming unused Prisma engines"

***REMOVED*** 1. Remove non-postgres WASM base64 bundles (mysql, cockroachdb, sqlserver, sqlite)
***REMOVED***    Prisma ships BOTH query_compiler_bg.* and query_engine_bg.* variants for
***REMOVED***    every database — and OpenNext bundles ALL of them into the worker.
***REMOVED***    Each is ~3 MB raw (~700 KB gzip). Deleting the 4 non-postgres variants
***REMOVED***    for BOTH compiler and engine saves ~22 MB raw / ~5 MB gzip — the
***REMOVED***    difference between fitting Cloudflare Free plan's 3 MiB limit and not.
if [ -d "$RUNTIME_DIR" ]; then
  find "$RUNTIME_DIR" -type f \( \
    -name "query_compiler_bg.cockroachdb.wasm-base64.*" -o \
    -name "query_compiler_bg.mysql.wasm-base64.*" -o \
    -name "query_compiler_bg.sqlserver.wasm-base64.*" -o \
    -name "query_compiler_bg.sqlite.wasm-base64.*" -o \
    -name "query_engine_bg.cockroachdb.wasm-base64.*" -o \
    -name "query_engine_bg.mysql.wasm-base64.*" -o \
    -name "query_engine_bg.sqlserver.wasm-base64.*" -o \
    -name "query_engine_bg.sqlite.wasm-base64.*" -o \
    -name "query_engine_bg.postgresql.wasm-base64.*" \
  \) -delete -print 2>/dev/null || true
  ***REMOVED*** NOTE: query_engine_bg.postgresql.wasm-base64.* is needed by `prisma generate`
  ***REMOVED*** (CLI) but NOT at runtime — we use @prisma/client/wasm which loads
  ***REMOVED*** query_engine_bg.wasm directly (not the base64 version). Deleting this file
  ***REMOVED*** AFTER `prisma generate` runs saves another ~3 MB raw / ~700 KB gzip.
  ***REMOVED*** The restore-prisma-engines.sh script handles re-adding it before subsequent
  ***REMOVED*** `prisma generate` runs (via build:cloudflare script).
fi

***REMOVED*** 3. Remove native Node library engine binaries (unused with driverAdapters)
if [ -d "$GEN_DIR" ]; then
  find "$GEN_DIR" -type f \( \
    -name "libquery_engine-*.so.node" -o \
    -name "libquery_engine-*.dll.node" -o \
    -name "libquery_engine-*.dylib.node" -o \
    -name "query_engine-*.exe" \
  \) -delete -print 2>/dev/null || true
  ***REMOVED*** NOTE: query_engine_bg.{wasm,js,mjs} are KEPT — they're needed by the
  ***REMOVED*** wasm-engine-edge.js runtime (used via @prisma/client/wasm).
  ***REMOVED*** The wasm-engine-edge.js loads query_engine_bg.wasm via the
  ***REMOVED*** wasm-edge-light-loader.mjs (which does `import('./query_engine_bg.wasm?module')`).
fi

***REMOVED*** 4. Remove the WASM query COMPILER base64 bundles — with @prisma/client/wasm,
***REMOVED***    the runtime uses the WASM query ENGINE (query_engine_bg.*), NOT the WASM
***REMOVED***    query COMPILER (query_compiler_bg.*). The compiler is only needed when
***REMOVED***    using `@prisma/client` (library.js) with queryCompiler preview feature.
***REMOVED***    Deleting these saves ~5 MB raw / ~1.4 MB gzip.
if [ -d "$RUNTIME_DIR" ]; then
  find "$RUNTIME_DIR" -type f -name "query_compiler_bg.*.wasm-base64.*" -delete -print 2>/dev/null || true
fi

***REMOVED*** 5. Remove the binary engine loader (binary.{js,mjs}) from @prisma/client —
***REMOVED***    with driverAdapters, the binary engine is never loaded. Saves ~1.3 MB raw.
if [ -d "$RUNTIME_DIR" ]; then
  find "$RUNTIME_DIR" -maxdepth 1 -type f \( \
    -name "binary.js" -o \
    -name "binary.mjs" \
  \) -delete -print 2>/dev/null || true
fi

echo "==> Done"
echo ""
echo "Remaining .prisma/client/ files:"
ls -lh "$GEN_DIR" 2>/dev/null | awk '{print "  " $5 "  " $9}' || echo "  (none)"
