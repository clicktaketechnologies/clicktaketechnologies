#!/usr/bin/env bash
# Comprehensive browser smoke test — all 10 main + 6 new top-level + sample sub-pages per category
set -e
PAGES=(
  # 10 main pages
  "home" "services" "solutions" "cases" "contact" "about" "blog" "careers" "privacy" "terms"
  # 6 new top-level pages
  "portfolio" "pricing" "team" "resources" "cities" "cookies"
  # Service detail samples (one per category)
  "services-seo" "services-seo-web-design" "services-starter-kit"
  "services-ai" "services-ai-llm" "services-ai-chatbots" "services-ai-automation" "services-ai-agents"
  "services-web" "services-web-full-stack" "services-web-saas" "services-web-ecommerce" "services-web-wordpress" "services-web-redesign"
  "services-creative" "services-creative-graphic-design" "services-creative-video-production"
  "services-digital-marketing" "services-digital-marketing-paid-advertising" "services-digital-marketing-cro"
  # Solution detail samples
  "solutions-startups" "solutions-ecommerce-brands" "solutions-uk-businesses" "solutions-local-businesses"
  # Case study detail samples
  "case-studies-seo-growth-sme" "case-studies-ecommerce-headless-rebuild" "case-studies-custom-software-saas"
  # Blog detail samples
  "blog-case-study-lumen-commerce-3x-revenue" "blog-ai-chatbot-for-lead-qualification" "blog-ppc-creative-testing-framework"
  "blog-ai-automation-playbook-for-sme" "blog-wcag-2-2-aa-accessibility-guide"
  # Career detail sample
  "careers-senior-nextjs-engineer" "careers-ai-ml-engineer"
  # Resource detail sample
  "resources-ai-adoption-playbook-2026" "resources-birmingham-seo-guide"
  # City detail samples
  "city-birmingham" "city-london" "city-karachi"
)
OUT_DIR="/home/z/my-project/download/qa-v6-pages"
mkdir -p "$OUT_DIR"

agent-browser open "file:///home/z/my-project/download/clicktake-landing.html" 2>&1 | tail -1
agent-browser set viewport 1440 900 2>&1 | tail -1
agent-browser wait 2500 2>&1 | tail -1

TOTAL=${#PAGES[@]}
i=0
ERR=0
declare -a FAILED

for page in "${PAGES[@]}"; do
  i=$((i+1))
  echo "[$i/$TOTAL] === $page ==="
  agent-browser eval "window.location.hash = '#$page';" 2>&1 | tail -1
  agent-browser wait 2500 2>&1 | tail -1
  TITLE=$(agent-browser get title 2>&1 | tail -1)
  # Verify the page actually exists by checking the active section
  HAS_SECTION=$(agent-browser eval "document.querySelector('[data-page=\"$page\"].active') ? 'YES' : 'NO';" 2>&1 | tail -1)
  echo "  Title: $TITLE | Active section: $HAS_SECTION"
  if [ "$HAS_SECTION" != "YES" ]; then
    FAILED+=("$page")
    ERR=$((ERR+1))
  fi
  agent-browser screenshot --full "$OUT_DIR/page-$page.png" 2>&1 | tail -1
done

agent-browser close 2>&1 | tail -1
echo ""
echo "=== Summary ==="
echo "  Total pages tested: $TOTAL"
echo "  Pages with active section: $((TOTAL - ERR))"
echo "  Pages missing active section: $ERR"
if [ $ERR -gt 0 ]; then
  echo "  FAILED pages: ${FAILED[*]}"
fi
echo ""
echo "=== Screenshots ==="
ls -la "$OUT_DIR"/*.png 2>&1 | wc -l
