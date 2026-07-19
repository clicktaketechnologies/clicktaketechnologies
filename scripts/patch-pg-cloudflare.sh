***REMOVED***!/bin/bash
***REMOVED*** Postinstall patch for `pg` package — make pg-cloudflare optional at bundle time.
***REMOVED***
***REMOVED*** Without this patch, esbuild fails with "Could not resolve pg-cloudflare"
***REMOVED*** when bundling for Cloudflare Workers because pg's stream.js does a
***REMOVED*** static require('pg-cloudflare'). The conditional exports in pg-cloudflare
***REMOVED*** only resolve under the `workerd` runtime condition, which esbuild's
***REMOVED*** default resolver doesn't apply.
***REMOVED***
***REMOVED*** Wrapping the require in a try/catch makes esbuild treat it as optional,
***REMOVED*** while still loading the real implementation at runtime on Workers.

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

***REMOVED*** Replace the static require with a try/catch
node -e "
const fs = require('fs');
const path = '$PG_STREAM';
let content = fs.readFileSync(path, 'utf8');

// Wrap the require('pg-cloudflare') call in try/catch
content = content.replace(
  /const \{ CloudflareSocket \} = require\('pg-cloudflare'\)/,
  \"// patched: pg-cloudflare optional (for Cloudflare Workers bundle compatibility)\\n    let CloudflareSocket;\\n    try { ({ CloudflareSocket } = require('pg-cloudflare')); } catch (e) { CloudflareSocket = null; }\"
);

fs.writeFileSync(path, content);
console.log('  ✓ patched pg/lib/stream.js');
"
