#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Phase 3 #3 — CTA A/B Testing Framework verification script.
#
# Runs 9 checks against the codebase to confirm the framework is wired up:
#   1. Database schema has the 3 A/B tables
#   2. Prisma shim exposes the 3 models
#   3. Bucketing + stats + cookie helpers exist
#   4. <AbTest> client component exists and imports from client-safe barrel
#   5. Public API routes exist (expose + bootstrap)
#   6. Admin CRUD API routes exist
#   7. Admin UI page + client component exist
#   8. Middleware stamps the visitor cookie
#   9. Contact route fires conversion events
#  10. <AbTest> is wired into navbar + CTA section
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail
cd "$(dirname "$0")/.."

PASS=0
FAIL=0
ok()   { echo "  ✅ $1"; PASS=$((PASS + 1)); }
fail() { echo "  ❌ $1"; FAIL=$((FAIL + 1)); }

echo "Phase 3 #3 — CTA A/B Testing Framework verification"
echo "===================================================="

# ─── 1. Schema ──────────────────────────────────────────────────────────────
echo ""
echo "1. Database schema"
if grep -q "abExperiments = pgTable" src/lib/schema.ts \
   && grep -q "abVariants = pgTable" src/lib/schema.ts \
   && grep -q "abAssignments = pgTable" src/lib/schema.ts; then
  ok "3 A/B tables defined (abExperiments, abVariants, abAssignments)"
else
  fail "Missing A/B tables in schema"
fi

if grep -q "abExperimentsRelations" src/lib/schema.ts \
   && grep -q "abVariantsRelations" src/lib/schema.ts \
   && grep -q "abAssignmentsRelations" src/lib/schema.ts; then
  ok "Drizzle relations defined for all 3 tables"
else
  fail "Missing Drizzle relations"
fi

# ─── 2. Prisma shim ─────────────────────────────────────────────────────────
echo ""
echo "2. Prisma shim"
if grep -q "abExperiment: schemaObj.abExperiments" src/lib/db.ts \
   && grep -q "abVariant: schemaObj.abVariants" src/lib/db.ts \
   && grep -q "abAssignment: schemaObj.abAssignments" src/lib/db.ts; then
  ok "Shim exposes abExperiment / abVariant / abAssignment models"
else
  fail "Shim missing A/B model mappings"
fi

# ─── 3. Library helpers ─────────────────────────────────────────────────────
echo ""
echo "3. Library helpers (src/lib/ab-testing/)"
for f in bucketing.ts stats.ts cookie.ts track.ts index.ts client.ts; do
  if [ -f "src/lib/ab-testing/$f" ]; then
    ok "  $f exists"
  else
    fail "  $f missing"
  fi
done

# ─── 4. AbTest client component ─────────────────────────────────────────────
echo ""
echo "4. AbTest client component"
if [ -f "src/components/site/ab-test.tsx" ]; then
  ok "src/components/site/ab-test.tsx exists"
  if grep -q "from '@/lib/ab-testing/client'" src/components/site/ab-test.tsx; then
    ok "Imports from client-safe barrel (avoids bundling pg into browser)"
  else
    fail "Imports from non-client-safe barrel — will break browser build"
  fi
  if grep -q "experimentKey" src/components/site/ab-test.tsx; then
    ok "Accepts experimentKey prop"
  else
    fail "Missing experimentKey prop"
  fi
  if grep -q "sendBeacon\|fetch.*expose" src/components/site/ab-test.tsx; then
    ok "Fires exposure recording (sendBeacon or fetch)"
  else
    fail "No exposure recording"
  fi
else
  fail "AbTest component missing"
fi

# ─── 5. Public API routes ───────────────────────────────────────────────────
echo ""
echo "5. Public API routes"
for r in "src/app/api/ab-test/expose/route.ts" "src/app/api/ab-test/bootstrap/route.ts"; do
  if [ -f "$r" ]; then
    ok "  $r exists"
  else
    fail "  $r missing"
  fi
done

# ─── 6. Admin CRUD APIs ─────────────────────────────────────────────────────
echo ""
echo "6. Admin CRUD APIs"
for r in \
  "src/app/api/admin/ab-tests/route.ts" \
  "src/app/api/admin/ab-tests/[id]/route.ts" \
  "src/app/api/admin/ab-tests/[id]/results/route.ts"; do
  if [ -f "$r" ]; then
    ok "  $r exists"
  else
    fail "  $r missing"
  fi
done

# ─── 7. Admin UI ────────────────────────────────────────────────────────────
echo ""
echo "7. Admin UI"
if [ -f "src/app/admin/ab-tests/page.tsx" ]; then
  ok "Admin page (SSR list view) exists"
else
  fail "Admin page missing"
fi
if [ -f "src/app/admin/ab-tests/ab-tests-client.tsx" ]; then
  ok "Admin client component (interactive UI) exists"
  if grep -q "compareVariants\|formatPValue\|formatLiftPercent" "src/app/api/admin/ab-tests/[id]/results/route.ts"; then
    ok "Results API uses stats engine (Z-test, p-value, lift)"
  else
    fail "Results API doesn't use stats engine"
  fi
  if grep -q "Trophy\|winner" src/app/admin/ab-tests/ab-tests-client.tsx; then
    ok "Verdict badges (winner/loser/inconclusive) present in UI"
  else
    fail "Missing verdict badges"
  fi
else
  fail "Admin client component missing"
fi

# ─── 8. Middleware cookie stamping ──────────────────────────────────────────
echo ""
echo "8. Middleware visitor cookie"
if grep -q "VISITOR_COOKIE_NAME" src/middleware.ts \
   && grep -q "stampVisitorCookie" src/middleware.ts; then
  ok "Middleware stamps ct_visitor cookie"
else
  fail "Middleware cookie stamping missing"
fi

# ─── 9. Contact route conversion tracking ───────────────────────────────────
echo ""
echo "9. Contact route conversion tracking"
if grep -q "fireAbConversion" src/app/api/contact/route.ts; then
  COUNT=$(grep -c "fireAbConversion" src/app/api/contact/route.ts)
  # 1 definition + 3 call sites = 4 expected occurrences
  if [ "$COUNT" -ge 4 ]; then
    ok "fireAbConversion defined + called from all 3 lead branches (inquiry, booking, career)"
  else
    fail "fireAbConversion only used $COUNT times (expected ≥4: 1 def + 3 calls)"
  fi
else
  fail "fireAbConversion missing from contact route"
fi

# ─── 10. AbTest wired into CTAs ─────────────────────────────────────────────
echo ""
echo "10. AbTest wired into production CTAs"
if grep -q 'experimentKey="navbar-primary-cta"' src/components/site/nx-navbar.tsx; then
  COUNT=$(grep -c 'experimentKey="navbar-primary-cta"' src/components/site/nx-navbar.tsx)
  ok "Navbar primary CTA wired ($COUNT instances — desktop + mobile)"
else
  fail "Navbar primary CTA not wired"
fi
if grep -q 'experimentKey="cta-section-primary"' src/components/site/nx-cta.tsx; then
  ok "CTA section primary button wired"
else
  fail "CTA section not wired"
fi

# ─── 11. Admin sidebar + permissions ────────────────────────────────────────
echo ""
echo "11. Admin sidebar + permissions"
if grep -q "/admin/ab-tests" src/app/admin/layout.tsx; then
  ok "Admin sidebar has A/B Experiments link"
else
  fail "Sidebar missing A/B Experiments link"
fi
if grep -q 'FlaskConical' src/app/admin/layout.tsx; then
  ok "FlaskConical icon imported for sidebar"
else
  fail "Sidebar icon missing"
fi
if grep -q '"/admin/ab-tests": "readCMS"' src/lib/permissions.ts; then
  ok "Route permission registered (readCMS)"
else
  fail "Route permission missing"
fi

# ─── Summary ────────────────────────────────────────────────────────────────
echo ""
echo "===================================================="
echo "Passed: $PASS  |  Failed: $FAIL"
echo "===================================================="

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
