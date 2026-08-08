#!/usr/bin/env bash
# Batch browser audit — takes page list as arg1 (comma-separated)
# Each line of agent-browser output: result + "✓ Done" status. We use head -1 to get the actual value.
set -e
IFS=',' read -ra PAGES <<< "$1"
OUT_DIR="/home/z/my-project/download/qa-v6-pages"
mkdir -p "$OUT_DIR"

agent-browser open "file:///home/z/my-project/download/clicktake-landing.html" 2>&1 | head -1
agent-browser set viewport 1440 900 2>&1 | head -1
agent-browser wait 3000 2>&1 | head -1

TOTAL=${#PAGES[@]}
i=0
ERR=0
declare -a FAILED

for page in "${PAGES[@]}"; do
  i=$((i+1))
  agent-browser eval "window.location.hash = '#$page';" 2>&1 > /dev/null
  agent-browser wait 2500 2>&1 > /dev/null
  # Get the actual title (first line of output, not the status)
  TITLE=$(agent-browser get title 2>&1 | head -1 | tr -d '"')
  # Check active section
  HAS_SECTION=$(agent-browser eval "document.querySelector('[data-page=\"$page\"].active') ? 'YES' : 'NO';" 2>&1 | head -1 | tr -d '"')
  echo "[$i/$TOTAL] $page | active: $HAS_SECTION | title: $TITLE"
  if [ "$HAS_SECTION" != "YES" ]; then
    FAILED+=("$page")
    ERR=$((ERR+1))
  fi
  agent-browser screenshot --full "$OUT_DIR/page-$page.png" 2>&1 > /dev/null
done

agent-browser close 2>&1 > /dev/null
echo ""
echo "Batch: $TOTAL tested, $((TOTAL - ERR)) ok, $ERR failed"
if [ $ERR -gt 0 ]; then
  echo "FAILED: ${FAILED[*]}"
fi
