#!/usr/bin/env bash
# Smoke-test 12 representative pages: 4 new top-level + 8 sub-pages
set -e
PAGES=("home" "portfolio" "pricing" "team" "resources" "cities" "cookies"
       "services-seo" "services-ai-llm" "services-web-ecommerce"
       "solutions-startups" "case-studies-seo-growth-sme"
       "blog-case-study-lumen-commerce-3x-revenue"
       "careers-senior-nextjs-engineer"
       "resources-ai-adoption-playbook-2026"
       "city-birmingham")
OUT_DIR="/home/z/my-project/download/qa-v5-pages"
mkdir -p "$OUT_DIR"

agent-browser open "file:///home/z/my-project/download/clicktake-landing.html" 2>&1 | tail -2
agent-browser set viewport 1440 900 2>&1 | tail -1
agent-browser wait 2500 2>&1 | tail -1

for page in "${PAGES[@]}"; do
  echo "=== $page ==="
  agent-browser eval "window.location.hash = '#$page';" 2>&1 | tail -1
  agent-browser wait 3500 2>&1 | tail -1
  TITLE=$(agent-browser get title 2>&1 | tail -1)
  echo "  Title: $TITLE"
  agent-browser screenshot --full "$OUT_DIR/page-$page.png" 2>&1 | tail -1
done

agent-browser close 2>&1 | tail -1
echo ""
echo "=== Screenshots ==="
ls -la "$OUT_DIR" | wc -l
