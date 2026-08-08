#!/usr/bin/env bash
# Fetch client sites with curl fallback for those that failed page_reader
set -e
OUT_DIR="/home/z/my-project/download/client-sites"
mkdir -p "$OUT_DIR"

# curl fallback fetcher — saves title + meta description + first chunk of body text
fetch_with_curl() {
  local url="$1"
  local slug="$2"
  local out="$OUT_DIR/${slug}.json"
  if [ -f "$out" ] && [ $(stat -c%s "$out") -gt 1000 ]; then
    echo "[skip] $slug (already fetched)"
    return 0
  fi
  echo "[curl] $slug ← $url"
  # Fetch HTML, extract title + meta description + first 5000 chars of text
  html=$(curl -sL --max-time 30 -A "Mozilla/5.0 (compatible; ClickTakeBot/1.0)" "$url" 2>/dev/null || true)
  if [ -z "$html" ]; then
    echo "  ⚠ empty response"
    return 1
  fi
  python3 -c "
import json, re, sys
html = sys.stdin.read()
title = ''
m = re.search(r'<title[^>]*>([^<]+)</title>', html, re.I)
if m: title = m.group(1).strip()[:200]
desc = ''
m = re.search(r'<meta\s+name=[\"\\']description[\"\\'][^>]*content=[\"\\']([^\"\\']+)[\"\\']', html, re.I)
if m: desc = m.group(1).strip()[:300]
# Strip scripts/styles
text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S|re.I)
text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.S|re.I)
text = re.sub(r'<[^>]+>', ' ', text)
text = re.sub(r'\s+', ' ', text).strip()[:5000]
data = {'url': '$url', 'title': title, 'description': desc, 'text': text, 'html_length': len(html)}
print(json.dumps(data))
" <<< "$html" > "$out"
  size=$(stat -c%s "$out")
  echo "  ✓ saved $size bytes"
}

# Re-fetch only the ones that failed (delete failed JSONs first)
for slug in gadgetdoctorls-co-uk gadgetrepairsglasgow-co-uk nltceducation-web-app students-learning-hub-web-app slasa-co-uk techrepairsglasgow-co-uk clicktake-academy-web-app clickopticx-onrender-com logitrack-blzq-onrender-com; do
  f="$OUT_DIR/${slug}.json"
  if [ -f "$f" ]; then
    size=$(stat -c%s "$f")
    if [ "$size" -lt 1000 ]; then
      rm -f "$f"
    fi
  fi
done

# Map slugs to URLs and fetch
fetch_with_curl "https://clickopticx.onrender.com" "clickopticx-onrender-com"
fetch_with_curl "https://logitrack-blzq.onrender.com" "logitrack-blzq-onrender-com"
fetch_with_curl "https://www.gadgetdoctorls.co.uk" "gadgetdoctorls-co-uk"
fetch_with_curl "https://www.gadgetrepairsglasgow.co.uk" "gadgetrepairsglasgow-co-uk"
fetch_with_curl "https://nltceducation.web.app/" "nltceducation-web-app"
fetch_with_curl "https://students-learning-hub.web.app/" "students-learning-hub-web-app"
fetch_with_curl "https://www.slasa.co.uk" "slasa-co-uk"
fetch_with_curl "https://www.techrepairsglasgow.co.uk" "techrepairsglasgow-co-uk"
fetch_with_curl "https://clicktake-academy.web.app/" "clicktake-academy-web-app"

echo ""
echo "=== Final fetch state ==="
ls -la "$OUT_DIR"/*.json | awk '{print $5, $9}'
