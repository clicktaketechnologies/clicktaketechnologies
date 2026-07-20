#!/bin/bash
# Postinstall patch for @prisma/client — create missing wasm.mjs shim.
#
# Prisma 6.19.3's package.json exports map for `./wasm` points `import` and
# `default` to `wasm.mjs`, but only `wasm.js` (CommonJS) is shipped. This
# causes Turbopack/Next.js builds to fail with "Module not found: Can't
# resolve '@prisma/client/wasm'" when db.ts imports from `@prisma/client/wasm`.
#
# This shim re-exports the CommonJS wasm.js as ESM, so the import resolves.

set -e

WASM_MJS="node_modules/@prisma/client/wasm.mjs"

if [ ! -f "node_modules/@prisma/client/wasm.js" ]; then
  echo "  @prisma/client not found, skipping wasm.mjs shim"
  exit 0
fi

if [ -f "$WASM_MJS" ]; then
  echo "  wasm.mjs shim already exists, skipping"
  exit 0
fi

cat > "$WASM_MJS" << 'SHIM'
// Re-export shim — @prisma/client 6.19.3 is missing wasm.mjs (only ships wasm.js).
// The package.json exports map points `import` and `default` to wasm.mjs which
// doesn't exist, causing Turbopack/Next.js builds to fail with "Module not found".
// This shim re-exports the CommonJS wasm.js as ESM.
import { PrismaClient } from "./wasm.js";
export { PrismaClient };
export * from "./wasm.js";
SHIM

echo "  ✓ created wasm.mjs shim at $WASM_MJS"
