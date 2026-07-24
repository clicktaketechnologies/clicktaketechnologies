#!/bin/bash
# Fresh combined SEO + agent-readiness audit of https://clicktaketech.com
# Outputs a structured report for the Ahrefs-style workflow.
#
# Run: bash /home/z/my-project/scripts/fresh-audit.sh

set -u
H="https://clicktaketech.com"
declare -a PAGES=(
  "/" "/about" "/services" "/services/ai-llm" "/portfolio"
  "/resources" "/contact" "/legal/terms" "/legal/privacy" "/legal/cookies"
)
declare -a WELL_KNOWN=(
  "/robots.txt" "/sitemap.xml" "/openapi.json"
  "/.well-known/api-catalog" "/.well-known/ucp" "/.well-known/acp.json"
  "/.well-known/x402.json" "/.well-known/oauth-authorization-server"
  "/.well-known/oauth-protected-resource" "/.well-known/jwks.json"
  "/.well-known/mcp/server-card.json" "/auth.md"
)

echo "============================================================"
echo "  CLICKTAKETECH.COM — FRESH AUDIT $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "============================================================"

echo ""
echo "── A. Page status codes (HTTP, final URL, canonical, robots meta, title) ──"
printf "%-32s %-5s %-8s %-12s %-12s %s\n" "PATH" "HTTP" "BYTES" "CANONICAL" "ROBOTS" "TITLE(60)"
printf "%-32s %-5s %-8s %-12s %-12s %s\n" "----" "----" "-----" "---------" "------" "----------"
for p in "${PAGES[@]}"; do
  resp=$(curl -sS -o /tmp/page.html -w "%{http_code}|%{size_download}|%{url_effective}" -L "$H$p")
  code=$(echo "$resp" | cut -d'|' -f1)
  bytes=$(echo "$resp" | cut -d'|' -f2)
  final=$(echo "$resp" | cut -d'|' -f3)
  # Canonical
  canon=$(grep -oiE '<link[^>]*rel=["\x27]canonical["\x27][^>]*href=["\x27]([^"\x27]+)' /tmp/page.html | sed -E 's/.*href=["\x27]([^"\x27]+).*/\1/' | head -1)
  [ -z "$canon" ] && canon="(none)"
  canon_short=$(echo "$canon" | sed -E 's|https?://[^/]+||' | head -c 10)
  # Robots meta
  robots=$(grep -oiE '<meta[^>]*name=["\x27]robots["\x27][^>]*content=["\x27]([^"\x27]+)' /tmp/page.html | sed -E 's/.*content=["\x27]([^"\x27]+).*/\1/' | head -1)
  [ -z "$robots" ] && robots="(none)"
  # Title
  title=$(grep -oiE '<title[^>]*>([^<]+)' /tmp/page.html | sed -E 's/<title[^>]*>//' | head -1 | tr -d '\n')
  title_len=${#title}
  title_short=$(echo "$title" | head -c 60)
  printf "%-32s %-5s %-8s %-12s %-12s %s(%d)\n" "$p" "$code" "$bytes" "$canon_short" "$robots" "$title_short" "$title_len"
done

echo ""
echo "── B. Well-known endpoints (HTTP + key signal) ──"
for p in "${WELL_KNOWN[@]}"; do
  code=$(curl -sS -o /tmp/wk.json -w "%{http_code}" "$H$p")
  # For HTML pages, capture <title>; for JSON, capture first JSON key
  if head -c 1 /tmp/wk.json | grep -q '<'; then
    signal=$(grep -oiE '<title[^>]*>([^<]+)' /tmp/wk.json | sed -E 's/<title[^>]*>//' | head -1 | head -c 40)
    kind="HTML"
  else
    signal=$(head -c 80 /tmp/wk.json | tr -d '\n' | head -c 80)
    kind="JSON"
  fi
  printf "  %-44s %-4s [%s] %s\n" "$p" "$code" "$kind" "$signal"
done

echo ""
echo "── C. /robots.txt (first 10 non-empty lines + byte count) ──"
robots_bytes=$(curl -sS -o /tmp/robots.txt -w "%{size_download}" "$H/robots.txt")
echo "  bytes: $robots_bytes"
echo "  server: $(curl -sSI $H/robots.txt | grep -i '^server:' | tr -d '\r' | head -1)"
head -10 /tmp/robots.txt | sed 's/^/  | /'

echo ""
echo "── D. /sitemap.xml (URL count + lastmod presence) ──"
sitemap=$(curl -sS "$H/sitemap.xml")
url_count=$(echo "$sitemap" | grep -c '<loc>')
lastmod_count=$(echo "$sitemap" | grep -c '<lastmod>')
echo "  URL count: $url_count"
echo "  lastmod count: $lastmod_count"

echo ""
echo "── E. DNSSEC chain of trust ──"
ds=$(dig clicktaketech.com DS +short 2>&1)
echo "  DS at parent (.com): ${ds:-(empty — DS not published at registrar)}"
dnskey=$(dig clicktaketech.com DNSKEY +short 2>&1)
echo "  DNSKEY at zone: $(if [ -z "$dnskey" ]; then echo '(none)'; else echo "$dnskey" | head -1; fi)"
rrsig=$(dig clicktaketech.com A +dnssec +short 2>&1 | grep -c '^RRSIG')
echo "  RRSIG on A record: $rrsig"

echo ""
echo "── F. DNS-AID: _index._agents HTTPS record ──"
aid=$(dig _index._agents.clicktaketech.com HTTPS +short 2>&1)
echo "  _index._agents.clicktaketech.com HTTPS:"
if [ -z "$aid" ]; then
  echo "    (empty — DNS-AID record missing)"
else
  echo "$aid" | sed 's/^/    /'
fi

echo ""
echo "── G. x402 paid endpoint ──"
echo "  GET /api/premium:"
hdrs=$(curl -sSI "$H/api/premium" 2>&1 | tr -d '\r')
echo "    status: $(echo "$hdrs" | head -1)"
echo "$hdrs" | grep -iE '^(www-authenticate|x-payment-requirements|content-type)' | sed 's/^/    /'

echo ""
echo "── H. Security/HTTP headers on home page ──"
hdrs=$(curl -sSI "$H/" | tr -d '\r')
for h in 'strict-transport-security' 'content-security-policy' 'x-frame-options' 'x-content-type-options' 'referrer-policy' 'permissions-policy'; do
  val=$(echo "$hdrs" | grep -i "^$h:" | head -1)
  if [ -z "$val" ]; then
    printf "  %-32s %s\n" "$h" "(missing)"
  else
    printf "  %-32s %s\n" "$h" "$(echo "$val" | cut -d':' -f2- | head -c 80)"
  fi
done

echo ""
echo "── I. Server / cache / edge ──"
echo "$hdrs" | grep -iE '^(server|x-vercel|x-powered-by|cf-|cache-control|age|via)' | sed 's/^/  /'

echo ""
echo "============================================================"
echo "  AUDIT COMPLETE"
echo "============================================================"
