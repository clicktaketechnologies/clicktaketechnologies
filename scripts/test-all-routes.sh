#!/bin/bash
# Single-shot server start + comprehensive route test
set -e

cd /home/z/my-project
pkill -9 -f "next" 2>/dev/null || true
sleep 2
rm -f /home/z/my-project/dev.log

# Start server
nohup bash -c 'exec npx next dev -p 3000' > /home/z/my-project/dev.log 2>&1 &
disown
SERVER_PID=$!
echo "Server PID: $SERVER_PID"

# Wait for ready
echo "Waiting for server ready..."
for i in $(seq 1 60); do
  if curl -s --max-time 2 -o /dev/null http://localhost:3000/ 2>/dev/null; then
    echo "Server ready after ${i}s"
    break
  fi
  sleep 1
done

# Warmup compile (one slow request)
echo "Warming up..."
curl -s --max-time 120 -o /tmp/home.html http://localhost:3000/
sleep 2

# Test all routes sequentially with short waits
declare -a ROUTES=(
  "/"
  "/services"
  "/services/ai/llm"
  "/services/web/full-stack"
  "/services/marketing/seo"
  "/services/creative/video-production"
  "/services/starter-kit"
  "/portfolio"
  "/about"
  "/contact"
  "/resources"
  "/legal/privacy"
  "/legal/terms"
  "/legal/cookies"
  "/nonexistent"
  "/sitemap.xml"
  "/robots.txt"
)

PASS=0
FAIL=0
for url in "${ROUTES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "http://localhost:3000${url}")
  if [ "$status" -ge 200 ] && [ "$status" -lt 500 ]; then
    echo "PASS  ${status}  ${url}"
    PASS=$((PASS + 1))
  else
    echo "FAIL  ${status}  ${url}"
    FAIL=$((FAIL + 1))
  fi
  sleep 1
done

echo ""
echo "=== RESULT: ${PASS} passed, ${FAIL} failed ==="

# Test contact API
echo ""
echo "=== Contact API test ==="
RESULT=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"kind":"inquiry","data":{"name":"Test User","email":"test@example.com","company":"Acme","service":"Web Dev","budget":"£5,000 - £10,000","message":"This is a test inquiry with at least twenty characters of message body.","turnstileToken":"test"}}' \
  --max-time 60)
echo "Inquiry response: ${RESULT}"

# Verify mega menu content in home page HTML
echo ""
echo "=== Mega menu check ==="
echo "FLAGSHIP occurrences: $(grep -c 'FLAGSHIP' /tmp/home.html || echo 0)"
echo "Service categories found:"
grep -oE "AI \& Machine Learning|Web Development|Digital Marketing|Creative Services" /tmp/home.html | sort -u | head -10
echo ""
echo "Service items found:"
grep -oE "Custom LLM Solutions|AI Chatbots|Full-Stack Web Development|Brand & Graphic Design|Video Production|Paid Advertising" /tmp/home.html | sort -u | head -10
echo ""
echo "Theme toggle present: $(grep -c 'aria-label="Toggle color theme"' /tmp/home.html || echo 0)"

# Leave server running for browser testing
echo ""
echo "Server still running on http://localhost:3000/"
