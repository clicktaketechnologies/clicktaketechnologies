***REMOVED***!/usr/bin/env bash
***REMOVED*** ─────────────────────────────────────────────────────────────────────────────
***REMOVED*** ClickTake Technologies — dual-platform production deployer
***REMOVED***
***REMOVED*** Deploys the site to BOTH:
***REMOVED***   1. Cloudflare Workers  (edge CDN + public pages)
***REMOVED***   2. Vercel              (full-stack runtime: API + admin + DB)
***REMOVED***
***REMOVED*** After both deploys succeed, the Cloudflare Worker is repointed to use the
***REMOVED*** new Vercel URL as BACKEND_URL (replacing the previous Render backend).
***REMOVED***
***REMOVED*** Auth requirements (set as env vars before running):
***REMOVED***   CLOUDFLARE_API_TOKEN  — token with Workers Scripts:Edit on clicktake-web
***REMOVED***   CLOUDFLARE_ACCOUNT_ID — optional, inferable from token
***REMOVED***   VERCEL_TOKEN          — token with deploy scope on the clicktake project
***REMOVED***
***REMOVED*** If any token is missing, the script prints a clear error and exits before
***REMOVED*** touching anything.
***REMOVED*** ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

cd "$(dirname "$0")/.."

***REMOVED*** ─── 0. Pre-flight checks ───────────────────────────────────────────────────
log()  { printf "\n\033[1;34m▶ %s\033[0m\n" "$1"; }
ok()   { printf "\033[1;32m  ✓ %s\033[0m\n" "$1"; }
warn() { printf "\033[1;33m  ⚠ %s\033[0m\n" "$1"; }
err()  { printf "\033[1;31m  ✘ %s\033[0m\n" "$1" >&2; }

log "Pre-flight: verifying credentials"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  err "CLOUDFLARE_API_TOKEN is not set."
  err "  Create one at: https://dash.cloudflare.com/profile/api-tokens"
  err "  Required scope: Account → Workers Scripts → Edit"
  err "  Then: export CLOUDFLARE_API_TOKEN=cfut_..."
  exit 1
fi
ok "CLOUDFLARE_API_TOKEN is set"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  err "VERCEL_TOKEN is not set."
  err "  Create one at: https://vercel.com/account/tokens"
  err "  Required scope: Full account (or Deploy on the clicktake project)"
  err "  Then: export VERCEL_TOKEN=vercel_..."
  exit 1
fi
ok "VERCEL_TOKEN is set"

***REMOVED*** Detect Vercel project name + scope
VERCEL_SCOPE="${VERCEL_SCOPE:-}"
VERCEL_PROJECT="${VERCEL_PROJECT:-clicktake-web}"

***REMOVED*** ─── 1. Build the standard Next.js bundle (for Vercel) ──────────────────────
log "Step 1/4: Building Next.js bundle (for Vercel)"
if bun run build:vercel 2>&1 | tail -30; then
  ok "Next.js build complete"
else
  err "Next.js build failed — aborting deploy"
  exit 1
fi

***REMOVED*** ─── 2. Deploy to Vercel (production) ───────────────────────────────────────
log "Step 2/4: Deploying to Vercel (production)"

VERCEL_ARGS=(--prod --yes --token "$VERCEL_TOKEN")
if [[ -n "$VERCEL_SCOPE" ]]; then
  VERCEL_ARGS+=(--scope "$VERCEL_SCOPE")
fi

VERCEL_OUTPUT="$(bunx vercel deploy "${VERCEL_ARGS[@]}" 2>&1 | tee /dev/stderr)" || {
  err "Vercel deploy failed"
  exit 1
}

***REMOVED*** Extract the production URL from the last non-empty line of vercel output
VERCEL_URL="$(printf '%s\n' "$VERCEL_OUTPUT" | grep -E '^https://.*\.vercel\.app$' | tail -1 || true)"
if [[ -z "$VERCEL_URL" ]]; then
  warn "Could not auto-detect Vercel URL from CLI output."
  warn "Paste the production URL printed by Vercel above and press Enter:"
  read -r VERCEL_URL
fi
ok "Vercel production URL: $VERCEL_URL"

***REMOVED*** ─── 3. Build the Cloudflare Worker bundle ──────────────────────────────────
log "Step 3/4: Building Cloudflare Worker bundle (OpenNext)"
if bun run build:cloudflare 2>&1 | tail -30; then
  ok "Cloudflare build complete"
else
  err "Cloudflare build failed — aborting deploy"
  exit 1
fi

***REMOVED*** ─── 4. Deploy to Cloudflare + repoint BACKEND_URL → Vercel ─────────────────
log "Step 4/4: Deploying Cloudflare Worker + setting BACKEND_URL"

***REMOVED*** Set the BACKEND_URL secret to the new Vercel URL BEFORE deploying, so the
***REMOVED*** new Worker version picks it up at first request.
***REMOVED*** (Repointing happens atomically with the new Worker version going live.)
echo "$VERCEL_URL" | timeout 60 bunx wrangler secret put BACKEND_URL 2>&1 | tail -5 || {
  warn "Could not set BACKEND_URL secret via wrangler — set it manually in the dashboard:"
  warn "  Workers & Pages → clicktake-web → Settings → Variables → BACKEND_URL = $VERCEL_URL"
}

***REMOVED*** Deploy the Worker itself
if timeout 180 bunx wrangler deploy 2>&1 | tail -40; then
  ok "Cloudflare Worker deployed"
else
  err "Cloudflare Worker deploy failed"
  err "BACKEND_URL secret was set to $VERCEL_URL — fix the deploy issue and re-run wrangler deploy"
  exit 1
fi

***REMOVED*** ─── Done ────────────────────────────────────────────────────────────────────
log "Deploy complete"
ok "Vercel:  $VERCEL_URL"
ok "Cloudflare Worker: https://clicktake-web.<account>.workers.dev (and https://clicktaketech.com)"
ok "BACKEND_URL is now → $VERCEL_URL"
echo
echo "Smoke-test:"
echo "  curl -sI https://clicktaketech.com/                          | head -1   ***REMOVED*** 200"
echo "  curl -s  https://clicktaketech.com/api/health                | head -1   ***REMOVED*** {\"ok\":true,...}"
echo "  curl -s  https://clicktaketech.com/api/auth/csrf             | head -1   ***REMOVED*** {\"csrfToken\":\"...\"}"
echo "  curl -sI https://$VERCEL_URL/api/health                      | head -1   ***REMOVED*** 200"
