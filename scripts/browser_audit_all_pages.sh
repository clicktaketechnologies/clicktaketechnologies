#!/usr/bin/env bash
# Browser-verify each of the 10 pages
set -e
PAGES=("home" "services" "solutions" "cases" "contact" "about" "blog" "careers" "privacy" "terms")
OUT_DIR="/home/z/my-project/download/qa-pages"
mkdir -p "$OUT_DIR"

agent-browser open "file:///home/z/my-project/download/clicktake-landing.html" 2>&1 | tail -2
agent-browser set viewport 1440 900 2>&1 | tail -1
agent-browser wait 1500 2>&1 | tail -1

for page in "${PAGES[@]}"; do
  echo "=== $page ==="
  agent-browser eval "window.location.hash = '#$page';" 2>&1 | tail -1
  agent-browser wait 3500 2>&1 | tail -1
  TITLE=$(agent-browser get title 2>&1 | tail -1)
  echo "Title: $TITLE"
  agent-browser screenshot --full "$OUT_DIR/page-$page.png" 2>&1 | tail -1
done

agent-browser close 2>&1 | tail -1
echo ""
echo "=== Screenshots ==="
ls -la "$OUT_DIR"
