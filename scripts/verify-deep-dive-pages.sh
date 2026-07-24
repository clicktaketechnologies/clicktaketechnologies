#!/bin/bash
# Verify all 32 deep-dive pages have FAQ JSON-LD schema and reasonable HTML size.
set -e
cd /home/z/my-project

# All 32 deep-dive pages: 24 services + 6 solutions + about + team
PAGES=(
  # AI services (5)
  "services/ai/llm"
  "services/ai/chatbots"
  "services/ai/prompt-engineering"
  "services/ai/cv-nlp"
  "services/ai/automation"
  # Web services (10)
  "services/web/full-stack"
  "services/web/saas"
  "services/web/auth"
  "services/web/python-backend"
  "services/web/wordpress"
  "services/web/ecommerce"
  "services/web/custom-software"
  "services/web/maintenance"
  "services/web/redesign"
  "services/web/domain-hosting"
  # Marketing services (5)
  "services/digital-marketing/paid-advertising"
  "services/digital-marketing/content-strategy"
  "services/digital-marketing/cro"
  "services/seo"
  "services/digital-marketing/social-media"
  # Creative services (3)
  "services/creative/graphic-design"
  "services/creative/web-design"
  "services/creative/video-production"
  # Starter kit (1)
  "services/starter-kit"
  # Solutions (6)
  "solutions/startups"
  "solutions/local-businesses"
  "solutions/ecommerce-brands"
  "solutions/repair-shops"
  "solutions/uk-businesses"
  "solutions/agencies"
  # Company (2)
  "about"
  "team"
)

total=${#PAGES[@]}
ok=0
fail=0
total_html_bytes=0
total_words=0

printf "%-55s %12s %8s %6s %6s\n" "PAGE" "HTML_BYTES" "WORDS" "FAQ" "JSONLD"
printf "%-55s %12s %8s %6s %6s\n" "----" "----------" "-----" "---" "------"

for slug in "${PAGES[@]}"; do
  html_path=".next/server/app/${slug}.html"
  if [[ ! -f "$html_path" ]]; then
    printf "%-55s %12s %8s %6s %6s\n" "$slug" "MISSING" "-" "FAIL" "-"
    fail=$((fail + 1))
    continue
  fi
  bytes=$(wc -c < "$html_path")
  # Strip tags + scripts to estimate visible words
  words=$(python3 -c "
import re
with open('$html_path') as f: html = f.read()
text = re.sub(r'<script[^>]*>.*?</script>', ' ', html, flags=re.DOTALL)
text = re.sub(r'<style[^>]*>.*?</style>', ' ', text, flags=re.DOTALL)
text = re.sub(r'<[^>]+>', ' ', text)
text = re.sub(r'\s+', ' ', text).strip()
print(len(text.split()))
")
  faq_count=$(grep -c '"@type":"FAQPage"' "$html_path" 2>/dev/null || echo 0)
  jsonld_count=$(grep -c 'application/ld+json' "$html_path" 2>/dev/null || echo 0)
  faq_status="OK"
  if [[ "$faq_count" -eq 0 ]]; then faq_status="MISS"; fi
  printf "%-55s %12d %8d %6s %6d\n" "$slug" "$bytes" "$words" "$faq_status" "$jsonld_count"
  total_html_bytes=$((total_html_bytes + bytes))
  total_words=$((total_words + words))
  if [[ "$faq_count" -gt 0 ]]; then ok=$((ok + 1)); else fail=$((fail + 1)); fi
done

echo ""
echo "================================================"
echo "SUMMARY"
echo "================================================"
echo "Total pages:      $total"
echo "Pages with FAQ:   $ok"
echo "Pages w/o FAQ:    $fail"
echo "Total HTML bytes: $total_html_bytes"
echo "Total words:      $total_words"
echo "Avg words/page:   $((total_words / total))"
