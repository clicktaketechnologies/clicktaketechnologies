***REMOVED***!/usr/bin/env bash
***REMOVED*** Phase 3 ***REMOVED***4 — Programmatic SEO verification script.
***REMOVED***
***REMOVED*** Verifies that the production build generated the expected city pages
***REMOVED*** and that the sitemap.xml includes all city × service permutations.
***REMOVED***
***REMOVED*** Usage:
***REMOVED***   bash scripts/verify-city-pages.sh
***REMOVED***
***REMOVED*** Exit codes:
***REMOVED***   0 — all checks pass
***REMOVED***   1 — one or more checks failed

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$ROOT_DIR/.next/server/app"
EXPECTED_CITIES=("birmingham" "london" "manchester" "leeds" "multan" "lahore" "karachi" "islamabad" "austin" "new-york" "san-francisco" "dubai" "abu-dhabi")
***REMOVED*** 24 services × 13 cities = 312 city × service pages + 13 city hubs = 325 city pages
***REMOVED*** (Note: abu-dhabi was added later, bringing cities from 12 to 13)
EXPECTED_MIN_CITY_PAGES=300

echo "─── Phase 3 ***REMOVED***4 — Programmatic SEO verification ───"
echo ""

***REMOVED*** Check 1: cities index page exists
if [[ -f "$BUILD_DIR/cities.html" ]]; then
  echo "✓ /cities index page rendered"
else
  echo "✗ /cities index page MISSING"
  exit 1
fi

***REMOVED*** Check 2: every city has a hub page
missing_hubs=()
for city in "${EXPECTED_CITIES[@]}"; do
  if [[ ! -f "$BUILD_DIR/cities/$city.html" ]]; then
    missing_hubs+=("$city")
  fi
done
if [[ ${***REMOVED***missing_hubs[@]} -eq 0 ]]; then
  echo "✓ All ${***REMOVED***EXPECTED_CITIES[@]} city hub pages rendered"
else
  echo "✗ Missing city hub pages: ${missing_hubs[*]}"
  exit 1
fi

***REMOVED*** Check 3: count city × service pages
total_city_pages=$(find "$BUILD_DIR/cities" -name "*.html" 2>/dev/null | wc -l)
echo "✓ Total city pages rendered: $total_city_pages (expected ≥ $EXPECTED_MIN_CITY_PAGES)"
if [[ $total_city_pages -lt $EXPECTED_MIN_CITY_PAGES ]]; then
  echo "✗ City page count below threshold"
  exit 1
fi

***REMOVED*** Check 4: spot-check a sample city × service page has expected content
sample="$BUILD_DIR/cities/birmingham/ai/llm.html"
if [[ -f "$sample" ]]; then
  if grep -q "Custom LLM Solutions in Birmingham" "$sample" && \
     grep -q "ProfessionalService" "$sample" && \
     grep -q "FAQPage" "$sample" && \
     grep -q "£3,500" "$sample"; then
    echo "✓ Sample /cities/birmingham/ai/llm has H1, JSON-LD, local pricing"
  else
    echo "✗ Sample page missing expected content"
    exit 1
  fi
else
  echo "✗ Sample page $sample MISSING"
  exit 1
fi

***REMOVED*** Check 5: sitemap.ts includes city × service permutation logic
if grep -q 'cities/${c.slug}' "$ROOT_DIR/src/app/sitemap.ts" && \
   grep -q 'cities/${city.slug}/${service.slug}' "$ROOT_DIR/src/app/sitemap.ts"; then
  echo "✓ sitemap.ts includes city hub + city × service permutation logic"
else
  echo "✗ sitemap.ts missing city permutation logic"
  exit 1
fi

***REMOVED*** Check 6: services page links to /cities
if grep -q 'href="/cities"' "$ROOT_DIR/src/components/site/pages/service-detail-page.tsx"; then
  echo "✓ Service detail page links to /cities"
else
  echo "✗ Service detail page missing /cities link"
  exit 1
fi

***REMOVED*** Check 7: footer links to /cities
if grep -q '"/cities"' "$ROOT_DIR/src/components/site/nx-footer.tsx"; then
  echo "✓ Footer links to /cities"
else
  echo "✗ Footer missing /cities link"
  exit 1
fi

echo ""
echo "─── All Phase 3 ***REMOVED***4 checks passed ✓ ───"
exit 0
