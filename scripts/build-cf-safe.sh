#!/bin/bash
# Build the Cloudflare Worker bundle (.open-next/) using stub env values.
# At runtime on Cloudflare, the Worker reads real values from wrangler.toml [vars] + secrets.
# Build-time env vars are only needed to satisfy Next.js's static prerender step.

set -e
cd "$(dirname "$0")/.."

# Stub env vars (build-time only — replaced at runtime by wrangler secrets)
export NODE_ENV=production
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

# Run the cloudflare build (uses stub db.ts internally)
echo "── build-cf-safe: running patch + opennextjs-cloudflare build ──"
bash scripts/patch-pg-cloudflare.sh
bash scripts/build-cloudflare.sh

echo "── build-cf-safe: done ──"
ls -la .open-next/ 2>&1 | head -10
