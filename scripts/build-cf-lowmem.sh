#!/bin/bash
# Memory-efficient Cloudflare Worker build for low-RAM environments.
# Uses NEXT_TELEMETRY_DISABLED, NEXT_WORKER_CACHE disabled, NODE_OPTIONS max-old-space-size=2048
# Runs next build with --no-lint and reduced concurrency to avoid OOM.

set -e
cd "$(dirname "$0")/.."

# Stub env vars (build-time only — replaced at runtime by wrangler secrets)
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NEXT_WORKER_CACHE=false
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

# Limit Node memory to 2.5GB to leave room for OS + other processes
export NODE_OPTIONS="--max-old-space-size=2560"

echo "── build-cf-lowmem: patching pg ──"
bash scripts/patch-pg-cloudflare.sh

echo "── build-cf-lowmem: swapping in stub db.ts ──"
cp src/lib/db.ts src/lib/db-impl.ts.bak
cp src/lib/db-stub.ts src/lib/db.ts

# Ensure restore even on failure
restore_db() {
  if [ -f src/lib/db-impl.ts.bak ]; then
    cp src/lib/db-impl.ts.bak src/lib/db.ts
    rm src/lib/db-impl.ts.bak
    echo "── build-cf-lowmem: restored real db.ts ──"
  fi
}
trap restore_db EXIT

echo "── build-cf-lowmem: running opennextjs-cloudflare build ──"
bunx opennextjs-cloudflare build

echo "── build-cf-lowmem: done ──"
ls -la .open-next/ 2>&1 | head -10
