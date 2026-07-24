#!/bin/bash
# Live SEO verification — confirms the P0+P1 fixes from the technical SEO
# audit are actually live on clicktaketech.com. Pure read-only HTTP probing,
# no auth required.
#
# Run: bash /home/z/my-project/scripts/verify-live-seo.sh

set -u
PASS=0
FAIL=0
OK="\033[32m✓\033[0m"
NO="\033[31m✗\033[0m"

check() {
  local label="$1" expected="$2" actual="$3"
  # Case-insensitive substring match — both sides lowercased.
  local e="$(echo "$expected" | tr 'A-Z' 'a-z')"
  local a="$(echo "$actual" | tr 'A-Z' 'a-z')"
  if [[ "$a" == *"$e"* ]]; then
    echo -e "  $OK $label"
    PASS=$((PASS+1))
  else
    echo -e "  $NO $label"
    echo -e "      expected: $expected"
    echo -e "      actual:   $(echo "$actual" | head -c 300)..."
    FAIL=$((FAIL+1))
  fi
}

H="https://clicktaketech.com"
W="https://www.clicktaketech.com"

echo "=== FIX-A/B/C: Apex domain (no www) ==="
# Sitemap URL must be apex, not www
SMAP=$(curl -sS "$H/sitemap.xml" | head -200)
check "sitemap.xml uses apex URL" "https://clicktaketech.com/" "$SMAP"
check "sitemap.xml does NOT contain www" "" "$(echo "$SMAP" | grep -c 'www.clicktaketech.com' || true)"
check "sitemap.xml does NOT contain /resources/" "" "$(echo "$SMAP" | grep -c '/resources/' || true)"
# robots.txt host + sitemap
ROBOTS=$(curl -sS "$H/robots.txt")
check "robots.txt sitemap = apex" "Sitemap: https://clicktaketech.com/sitemap.xml" "$ROBOTS"
check "robots.txt Host = apex" "Host: https://clicktaketech.com" "$ROBOTS"
check "robots.txt disallows /admin/" "Disallow: /admin/" "$ROBOTS"
check "robots.txt disallows /api/" "Disallow: /api/" "$ROBOTS"

echo ""
echo "=== FIX-C: www → apex redirect (308) ==="
WREDIR=$(curl -sS -o /dev/null -w "%{http_code} %{redirect_url}" "$W/" -I 2>&1 || true)
echo "    www redirect: $WREDIR"
check "www root 308s to apex" "https://clicktaketech.com/" "$(echo $WREDIR | awk '{print $2}')"

echo ""
echo "=== FIX-D: 404 page metadata ==="
NF404=$(curl -sS "$H/this-page-does-not-exist-$RANDOM")
check "404 emits noindex robots meta" '<meta name="robots" content="noindex' "$NF404"
check "404 emits follow: false" 'nofollow' "$NF404"

echo ""
echo "=== FIX-E: /api/* and /admin/* X-Robots-Tag ==="
API_HDRS=$(curl -sSI "$H/api/health" | tr -d '\r')
check "/api/health has X-Robots-Tag: noindex" "x-robots-tag: noindex" "$(echo $API_HDRS | tr 'A-Z' 'a-z')"

echo ""
echo "=== FIX-I: Security headers on homepage ==="
HDRS=$(curl -sSI "$H/" | tr -d '\r')
check "strict-transport-security present" "strict-transport-security:" "$(echo $HDRS | tr 'A-Z' 'a-z')"
check "x-frame-options present" "x-frame-options: SAMEORIGIN" "$(echo $HDRS | tr 'A-Z' 'a-z')"
check "x-content-type-options present" "x-content-type-options: nosniff" "$(echo $HDRS | tr 'A-Z' 'a-z')"
check "referrer-policy present" "referrer-policy: strict-origin-when-cross-origin" "$(echo $HDRS | tr 'A-Z' 'a-z')"
check "permissions-policy present" "permissions-policy:" "$(echo $HDRS | tr 'A-Z' 'a-z')"
check "x-powered-by removed" "" "$(echo $HDRS | grep -ic '^x-powered-by:' || true)"

echo ""
echo "=== FIX-H: og:image present on homepage ==="
HOME_HTML=$(curl -sS "$H/")
check "og:image meta tag present" 'og:image' "$HOME_HTML"
check "og:image points to /og-default.png" '/og-default.png' "$HOME_HTML"
check "twitter:image meta tag present" 'twitter:image' "$HOME_HTML"
# Verify the image itself is reachable
OG_IMG=$(curl -sS -o /dev/null -w "%{http_code} %{content_type}" "$H/og-default.png")
check "og-default.png returns 200 image/png" "200 image/png" "$OG_IMG"

echo ""
echo "=== FIX-J: Service + BreadcrumbList JSON-LD on /services/ai/llm ==="
SVC_HTML=$(curl -sS "$H/services/ai/llm")
check "Service schema present" '"@type":"Service"' "$(echo $SVC_HTML | tr -d ' \n')"
check "BreadcrumbList schema present" '"@type":"BreadcrumbList"' "$(echo $SVC_HTML | tr -d ' \n')"

echo ""
echo "=== FIX-L: BreadcrumbList JSON-LD on /portfolio ==="
PORT_HTML=$(curl -sS "$H/portfolio")
check "BreadcrumbList on /portfolio" '"@type":"BreadcrumbList"' "$(echo $PORT_HTML | tr -d ' \n')"

echo ""
echo "=== FIX-G: title template (no duplicate suffix) ==="
# Homepage <title> should NOT have two "ClickTake Technologies" repeats
TITLE=$(echo "$HOME_HTML" | grep -oP '<title>[^<]+</title>' | head -1)
echo "    homepage <title>: $TITLE"
check "homepage title contains ClickTake Technologies once" "" "$(echo "$TITLE" | grep -o 'ClickTake Technologies' | wc -l | awk '{print $1-1}')"

echo ""
echo "=== Score ==="
echo -e "  $OK Pass: $PASS"
if [ $FAIL -gt 0 ]; then
  echo -e "  $NO Fail: $FAIL"
  exit 1
else
  echo -e "  $OK Fail: 0"
  exit 0
fi
