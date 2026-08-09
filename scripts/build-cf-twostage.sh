#!/bin/bash
# Two-stage Cloudflare Worker build for low-RAM environments.
# Stage 1: next build with REAL db.ts (proven to work in 4GB RAM)
# Stage 2: swap to stub db.ts + opennextjs-cloudflare build --skipNextBuild
#
# The single-shot `bun run build:cloudflare` OOMs because:
#   1. It swaps in stub db.ts BEFORE next build
#   2. opennext runs next build AND packages in same process
# This script splits them and uses real db.ts for the build step.

set -e
cd "$(dirname "$0")/.."

# Stub env vars (build-time only — replaced at runtime by wrangler secrets)
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NEXT_PUBLIC_SUPABASE_URL="https://crejzifwpcnjqghlbbdf.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_rKUt-lIGNXG6QO9i8dLViw_FE0PcXyD"
export NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dwioesu97"
export NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="contact_uploads"
export NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAADpHuqrF417pgTBa"
export TURNSTILE_SECRET_KEY="stub"
export DATABASE_URL="postgresql://stub:stub@localhost:5432/stub"
export DIRECT_URL="postgresql://stub:stub@localhost:5432/stub"
export NEXTAUTH_SECRET="$(openssl rand -hex 32)"
export NEXTAUTH_URL="https://clicktaketech.com"
export PROVIDER_CREDENTIALS_ENCRYPTION_KEY="$(openssl rand -hex 32)"
export CRON_SECRET="$(openssl rand -hex 16)"
export SUPERADMIN_EMAIL="admin@clicktaketech.com"
export SUPERADMIN_PASSWORD="ChangeMe!2025"
export MAIL_FROM="noreply@clicktaketech.com"
export SMTP_FROM="noreply@clicktaketech.com"
export LEADS_EMAIL="leads@clicktaketech.com"
export CAREERS_EMAIL="careers@clicktaketech.com"
export PROVIDER_ALERT_TO="alerts@clicktaketech.com"
export BACKEND_URL=""
export SKIP_PATCH_PG_CLOUDFLARE=1

echo "═══════════════════════════════════════════════════════════════"
echo "  STAGE 1: next build --webpack (with REAL db.ts)"
echo "═══════════════════════════════════════════════════════════════"
bunx next build --webpack
echo "── next build done ──"
ls -la .next/BUILD_ID

echo "═══════════════════════════════════════════════════════════════"
echo "  STAGE 2: copy static + public into standalone"
echo "═══════════════════════════════════════════════════════════════"
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

echo "═══════════════════════════════════════════════════════════════"
echo "  STAGE 3: swap to stub db.ts for opennext packaging"
echo "═══════════════════════════════════════════════════════════════"
cp src/lib/db.ts src/lib/db-impl.ts.bak
cp src/lib/db-stub.ts src/lib/db.ts
restore_db() {
  if [ -f src/lib/db-impl.ts.bak ]; then
    cp src/lib/db-impl.ts.bak src/lib/db.ts
    rm src/lib/db-impl.ts.bak
    echo "── restored real db.ts ──"
  fi
}
trap restore_db EXIT

echo "═══════════════════════════════════════════════════════════════"
echo "  STAGE 4: opennextjs-cloudflare build --skipNextBuild"
echo "═══════════════════════════════════════════════════════════════"
bunx opennextjs-cloudflare build --skipNextBuild

echo "═══════════════════════════════════════════════════════════════"
echo "  BUILD COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
ls -la .open-next/ 2>&1 | head -10
du -sh .open-next 2>&1
