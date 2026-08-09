#!/usr/bin/env bash
# Smoke-test blog pages: blog listing + 3 real article pages
set -e
PAGES=("blog"
       "blog-7-best-ai-chatbots-for-capturing-website-leads-2026"
       "blog-next-js-pagespeed-optimisation-how-to-hit-90-scores"
       "blog-seo-audit-checklist-25-steps-to-rank-higher-in-2026"
       "home" "services" "cases" "contact")
OUT_DIR="/home/z/my-project/download/qa-v5-blog-pages"
mkdir -p "$OUT_DIR"

agent-browser open "file:///home/z/my-project/download/clicktake-landing.html" 2>&1 | tail -2
agent-browser set viewport 1440 900 2>&1 | tail -1
agent-browser wait 2500 2>&1 | tail -1

for page in "${PAGES[@]}"; do
  echo "=== $page ==="
  agent-browser eval "window.location.hash = '#$page';" 2>&1 | tail -1
  agent-browser wait 4000 2>&1 | tail -1
  TITLE=$(agent-browser get title 2>&1 | tail -1)
  echo "  Title: $TITLE"
  # Verify the page section actually exists and is visible
  VISIBLE=$(agent-browser eval "(() => { const s = document.querySelector('[data-page=\"$page\"]'); if (!s) return 'NOT_FOUND'; const r = s.getBoundingClientRect(); return 'visible:' + (r.width > 0 && r.height > 0); })()" 2>&1 | tail -1)
  echo "  Visible: $VISIBLE"
  agent-browser screenshot --full "$OUT_DIR/page-$page.png" 2>&1 | tail -1
done

agent-browser close 2>&1 | tail -1
echo ""
echo "=== Screenshots ==="
ls -la "$OUT_DIR"
