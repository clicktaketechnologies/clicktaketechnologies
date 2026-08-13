#!/usr/bin/env bash
# V5 CYBERPUNK ENFORCEMENT — Replace legacy dark hex values with #03000D spec.
#
# Replacements (matching html.dark .theme-nx token block in globals.css):
#   #030014  →  #03000D  (StatsBar outer / section bg)
#   #0A0A14  →  #070018  (stat tile inner / card)
#   #050510  →  #03000D  (inner page section bg)
#   #050518  →  #03000D  (inner page section bg variant)
#
# Scopes touched:
#   - src/components/site/pages/*.tsx          (inner page components)
#   - src/components/site/deep-dive/*.tsx      (deep-dive layout / blocks)
#   - src/app/home-content.tsx                 (homepage sections)
#
# NOT touched:
#   - src/app/globals.css  (CSS rules — the LIGHT MODE ADAPTATION LAYER still
#     needs to recognize these legacy hexes in case any old cached page renders
#     with them; the CSS uses :not(html.dark) selectors that are inert under
#     forcedTheme="dark", so leaving the catch-rules is harmless.)
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
      -e 's/#030014/#03000D/g' \
      -e 's/#0A0A14/#070018/g' \
      -e 's/#050510/#03000D/g' \
      -e 's/#050518/#03000D/g' \
      "$f"
    echo "Updated: $f"
  fi
done

# Also scan deep-dive layout (uses these hexes for sticky ToC + section bg)
deep_dive_files=$(find src/components/site/deep-dive -name "*.tsx" 2>/dev/null || true)
for f in $deep_dive_files; do
  if grep -qE '#030014|#0A0A14|#050510|#050518' "$f"; then
    sed -i \
      -e 's/#030014/#03000D/g' \
      -e 's/#0A0A14/#070018/g' \
      -e 's/#050510/#03000D/g' \
      -e 's/#050518/#03000D/g' \
      "$f"
    echo "Updated: $f"
  fi
done

echo "Done. V5 dark canvas (#03000D) is now universal."
