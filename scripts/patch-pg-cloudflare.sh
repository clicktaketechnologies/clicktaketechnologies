#!/bin/bash
# Postinstall patch for `pg` package — make pg-cloudflare optional at bundle time.
#
# When bundling for Cloudflare Workers via OpenNext, esbuild doesn't apply
# the `workerd` condition, so `require('pg-cloudflare')` resolves to
# `dist/empty.js`. Without this patch, esbuild fails with
# "Could not resolve pg-cloudflare" because pg's stream.js does a static require.
#
# This patch wraps the require in try/catch so esbuild treats it as optional.
# At runtime on Cloudflare Workers, the require succeeds (returning the empty
# stub). pg's stream factory then sees `CloudflareSocket` is undefined and
# throws — but that's OK because /api/* and /admin/* are proxied to the
# Render backend via next.config.ts rewrites, so the CF Worker never
# actually executes any DB code.
#
# On Render (Node.js), pg-cloudflare isn't loaded at all — pg uses the
# standard net.Socket path.

set -e

PG_STREAM="node_modules/pg/lib/stream.js"

if [ ! -f "$PG_STREAM" ]; then
  echo "  pg package not found, skipping patch"
  exit 0
fi

if grep -q "// patched: pg-cloudflare optional" "$PG_STREAM"; then
  echo "  pg already patched, skipping"
  exit 0
fi

node -e "
const fs = require('fs');
const path = '$PG_STREAM';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const \{ CloudflareSocket \} = require\('pg-cloudflare'\)/,
  \"// patched: pg-cloudflare optional (for Cloudflare Workers bundle compatibility)\\n    let CloudflareSocket;\\n    try { ({ CloudflareSocket } = require('pg-cloudflare')); } catch (e) { CloudflareSocket = null; }\"
);

fs.writeFileSync(path, content);
console.log('  ✓ patched pg/lib/stream.js');
"

