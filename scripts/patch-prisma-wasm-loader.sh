#!/bin/bash
# Patch Prisma's WASM loader to fetch the WASM from a static URL instead of
# bundling it into the Worker. This saves ~2.2 MB raw / ~0.85 MiB gzip — the
# difference between fitting Cloudflare Free plan's 3 MiB limit and not.
#
# The WASM file is hosted at /prisma-wasm/query_engine_bg.wasm (copied to
# public/prisma-wasm/ by this script). At runtime, the Prisma loader fetches
# it via the global fetch() API.
#
# This patch modifies:
#   - node_modules/.prisma/client/wasm-worker-loader.mjs (used on workerd)
#   - node_modules/.prisma/client/wasm-edge-light-loader.mjs (used on edge-light)
#   - node_modules/@prisma/client/runtime/wasm-engine-edge.js (to handle the
#     fetch-based loader correctly — it expects a Module, not a Promise<Module>)
#
# After patching, the WASM file is deleted from .prisma/client/ so esbuild
# doesn't bundle it.

set -e

GEN_DIR="node_modules/.prisma/client"
PUBLIC_WASM_DIR="public/prisma-wasm"
WASM_FILE="query_engine_bg.wasm"
WASM_URL_PATH="/prisma-wasm/${WASM_FILE}"

echo "==> Patching Prisma WASM loader to use fetch()"

# 1. Copy the WASM file to public/ so it's served as a static asset
mkdir -p "$PUBLIC_WASM_DIR"
if [ -f "$GEN_DIR/$WASM_FILE" ]; then
  cp "$GEN_DIR/$WASM_FILE" "$PUBLIC_WASM_DIR/$WASM_FILE"
  echo "  ✓ copied $WASM_FILE to $PUBLIC_WASM_DIR/"
fi

# 2. Patch wasm-worker-loader.mjs (used on Cloudflare Workers / workerd)
WORKER_LOADER="$GEN_DIR/wasm-worker-loader.mjs"
if [ -f "$WORKER_LOADER" ]; then
  cat > "$WORKER_LOADER" << EOF
// Patched by scripts/patch-prisma-wasm-loader.sh
// Original: export default import('./query_engine_bg.wasm')
// New: fetch the WASM from the ASSETS binding (static assets) to avoid
// bundling it. Saves ~0.85 MiB gzip — the difference between fitting
// Cloudflare Free plan's 3 MiB limit and not.
//
// The ASSETS binding is accessed via the OpenNext request context
// (Symbol.for("__cloudflare-context__")) which is set up by init.js.
// This avoids self-fetching from the public URL (which causes 522 errors).
export default (async () => {
  const path = '${WASM_URL_PATH}';
  // Try the ASSETS binding first (works on Cloudflare Workers)
  try {
    const ctx = globalThis[Symbol.for('__cloudflare-context__')];
    const assets = ctx?.env?.ASSETS;
    if (assets && typeof assets.fetch === 'function') {
      const resp = await assets.fetch(new Request('https://internal' + path));
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        return WebAssembly.compile(buf);
      }
    }
  } catch (e) {
    // Fall through to fetch-based approach
  }
  // Fallback: fetch from the public URL (works on other runtimes)
  const origin = (typeof self !== 'undefined' && self.location && self.location.origin)
    || 'https://clicktaketech.com';
  const url = new URL(path, origin);
  const resp = await fetch(url.href);
  if (!resp.ok) throw new Error('Failed to fetch Prisma WASM: ' + resp.status + ' ' + url.href);
  const buf = await resp.arrayBuffer();
  return WebAssembly.compile(buf);
})();
EOF
  echo "  ✓ patched wasm-worker-loader.mjs"
fi

# 3. Patch wasm-edge-light-loader.mjs (used on edge-light runtimes)
EDGE_LOADER="$GEN_DIR/wasm-edge-light-loader.mjs"
if [ -f "$EDGE_LOADER" ]; then
  cat > "$EDGE_LOADER" << EOF
// Patched by scripts/patch-prisma-wasm-loader.sh
// Original: export default import('./query_engine_bg.wasm?module')
// New: fetch the WASM from the ASSETS binding (static assets) to avoid
// bundling it. Saves ~0.85 MiB gzip.
export default (async () => {
  const path = '${WASM_URL_PATH}';
  try {
    const ctx = globalThis[Symbol.for('__cloudflare-context__')];
    const assets = ctx?.env?.ASSETS;
    if (assets && typeof assets.fetch === 'function') {
      const resp = await assets.fetch(new Request('https://internal' + path));
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        return WebAssembly.compile(buf);
      }
    }
  } catch (e) {}
  const origin = (typeof self !== 'undefined' && self.location && self.location.origin)
    || 'https://clicktaketech.com';
  const url = new URL(path, origin);
  const resp = await fetch(url.href);
  if (!resp.ok) throw new Error('Failed to fetch Prisma WASM: ' + resp.status + ' ' + url.href);
  const buf = await resp.arrayBuffer();
  return WebAssembly.compile(buf);
})();
EOF
  echo "  ✓ patched wasm-edge-light-loader.mjs"
fi

# 4. Delete the WASM file from .prisma/client/ so esbuild doesn't bundle it
if [ -f "$GEN_DIR/$WASM_FILE" ]; then
  rm -f "$GEN_DIR/$WASM_FILE"
  echo "  ✓ removed $WASM_FILE from $GEN_DIR/"
fi

echo "==> Done"
