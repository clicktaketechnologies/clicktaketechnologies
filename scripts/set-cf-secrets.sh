#!/bin/bash
# Set all required Cloudflare Worker secrets from .env
# Token-scoped: only sets secrets on the clicktake-web worker.

set -e
cd "$(dirname "$0")/.."

TOKEN="cfut_8Dq3UerHsvTy8C3RKTF4uYfq6gsruz2xw5waBbIS016bfda4"
WORKER="clicktake-web"

# Parse .env file (skipping comments + blank lines)
# Quotes values that contain spaces (MAIL_FROM, etc.)
set_secret() {
  local key="$1"
  local value="$2"
  echo "  → Setting $key..."
  echo "$value" | bunx wrangler secret put "$key" --name "$WORKER" --token "$TOKEN" 2>&1 | tail -1
}

echo "=== Setting Cloudflare Worker secrets for $WORKER ==="
echo ""

# Use awk to parse .env (handles values with spaces, =, etc.)
awk -F'=' '
/^#/ { next }           # skip comments
/^$/ { next }           # skip blank lines
/^_/ { next }           # skip vars starting with underscore
{
  key = $1
  # value is everything after the first =
  sub(/^[^=]*=/, "", $0)
  value = $0
  print key "\t" value
}' .env | while IFS=$'\t' read -r key value; do
  # Skip NEXT_PUBLIC_* — those need to be in [vars] not secrets (they're inlined at build time)
  case "$key" in
    NEXT_PUBLIC_*)
      echo "  ⊘ Skipping $key (NEXT_PUBLIC_* must be set as build-time vars, not runtime secrets)"
      continue
      ;;
    NODE_ENV)
      echo "  ⊘ Skipping NODE_ENV (set via Cloudflare automatically)"
      continue
      ;;
  esac
  set_secret "$key" "$value"
done

echo ""
echo "=== Done setting secrets ==="
