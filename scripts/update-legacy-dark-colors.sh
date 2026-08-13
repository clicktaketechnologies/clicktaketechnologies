***REMOVED***!/usr/bin/env bash
***REMOVED*** V5 CYBERPUNK ENFORCEMENT — Replace legacy dark hex values with ***REMOVED***03000D spec.
***REMOVED***
***REMOVED*** Replacements (matching html.dark .theme-nx token block in globals.css):
***REMOVED***   ***REMOVED***030014  →  ***REMOVED***03000D  (StatsBar outer / section bg)
***REMOVED***   ***REMOVED***0A0A14  →  ***REMOVED***070018  (stat tile inner / card)
***REMOVED***   ***REMOVED***050510  →  ***REMOVED***03000D  (inner page section bg)
***REMOVED***   ***REMOVED***050518  →  ***REMOVED***03000D  (inner page section bg variant)
***REMOVED***
***REMOVED*** Scopes touched:
***REMOVED***   - src/components/site/pages/*.tsx          (inner page components)
***REMOVED***   - src/components/site/deep-dive/*.tsx      (deep-dive layout / blocks)
***REMOVED***   - src/app/home-content.tsx                 (homepage sections)
***REMOVED***
***REMOVED*** NOT touched:
***REMOVED***   - src/app/globals.css  (CSS rules — the LIGHT MODE ADAPTATION LAYER still
***REMOVED***     needs to recognize these legacy hexes in case any old cached page renders
***REMOVED***     with them; the CSS uses :not(html.dark) selectors that are inert under
***REMOVED***     forcedTheme="dark", so leaving the catch-rules is harmless.)
set -euo pipefail

cd /home/z/my-project

files=(
  src/components/site/pages/case-studies-page.tsx
  src/components/site/pages/contact-page.tsx
  src/components/site/pages/services-page.tsx
  src/app/home-content.tsx
)

for f in "${files[@]}"; do
  if [[ -f "$f" ]]; then
    sed -i \
      -e 's/***REMOVED***030014/***REMOVED***03000D/g' \
      -e 's/***REMOVED***0A0A14/***REMOVED***070018/g' \
      -e 's/***REMOVED***050510/***REMOVED***03000D/g' \
      -e 's/***REMOVED***050518/***REMOVED***03000D/g' \
      "$f"
    echo "Updated: $f"
  fi
done

***REMOVED*** Also scan deep-dive layout (uses these hexes for sticky ToC + section bg)
deep_dive_files=$(find src/components/site/deep-dive -name "*.tsx" 2>/dev/null || true)
for f in $deep_dive_files; do
  if grep -qE '***REMOVED***030014|***REMOVED***0A0A14|***REMOVED***050510|***REMOVED***050518' "$f"; then
    sed -i \
      -e 's/***REMOVED***030014/***REMOVED***03000D/g' \
      -e 's/***REMOVED***0A0A14/***REMOVED***070018/g' \
      -e 's/***REMOVED***050510/***REMOVED***03000D/g' \
      -e 's/***REMOVED***050518/***REMOVED***03000D/g' \
      "$f"
    echo "Updated: $f"
  fi
done

echo "Done. V5 dark canvas (***REMOVED***03000D) is now universal."
