#!/usr/bin/env bash
# Bundle the ClickTake website source into a clean zip for the user.
# Excludes node_modules, .next, .env, .git, tool-results, worklog, etc.

set -euo pipefail

SRC="/home/z/my-project"
STAGE="/tmp/clicktake-website-stage"
OUT="/home/z/my-project/download/clicktake-website.zip"

rm -rf "$STAGE" "$OUT"
mkdir -p "$STAGE/clicktake-website"

# Files and folders to include (whitelist approach for safety)
INCLUDE=(
  "src"
  "public"
  "prisma"
  "package.json"
  "bun.lock"
  "next.config.ts"
  "tsconfig.json"
  "tailwind.config.ts"
  "postcss.config.mjs"
  "eslint.config.mjs"
  "components.json"
  "Caddyfile"
  ".gitignore"
  "README.md"
)

for item in "${INCLUDE[@]}"; do
  if [ -e "$SRC/$item" ]; then
    cp -a "$SRC/$item" "$STAGE/clicktake-website/"
    echo "  + $item"
  else
    echo "  - skip $item (not found)"
  fi
done

# Add a README with quick start instructions
cat > "$STAGE/clicktake-website/README.md" <<'EOF'
# ClickTake Technologies — Website

Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui.

## Quick start

```bash
# 1. Install dependencies
npm install        # or: bun install

# 2. Create .env.local with:
#    DATABASE_URL="file:./db/custom.db"
#    (plus RESEND_API_KEY, TURNSTILE_SECRET_KEY, TURNSTILE_SITE_KEY if you wire them up)

# 3. Run the dev server
npm run dev        # or: bun dev
```

Visit http://localhost:3000

## Production

```bash
npm run build
npm start
```

## Brand

- Primary: #136DFF
- Accent:  #FF53A9
- Domain:  www.clicktaketech.com
- Email:   Info@clicktaketech.com
- Phones:  +923069753003 (PK) / +447391653377 (UK)
- Locations: UK (Birmingham), Pakistan, USA, Dubai

## Structure

- `src/app/` — Next.js App Router pages & API routes
- `src/components/site/` — ClickTake site components (Navbar, Hero, Services, etc.)
- `src/components/ui/` — shadcn/ui primitives
- `src/lib/` — site-data, db, mailer, turnstile, utils
- `public/` — logo + images
- `prisma/schema.prisma` — DB schema (User, Post, ContactMessage)

## Features

- Multi-region SEO content (UK / Pakistan / USA / Dubai)
- Background canvas animation + custom cursor + Three.js hero
- Light/dark theme toggle (next-themes, FOUC-safe)
- Mega menu with all service categories
- Contact form API route with Turnstile + Prisma + nodemailer
- JSON-LD Organization schema with multi-country address + 8 socials
- sitemap.ts + robots.ts
EOF

# Create a default .env.example (NOT .env — that should stay gitignored)
cat > "$STAGE/clicktake-website/.env.example" <<'EOF'
# Database (SQLite for dev)
DATABASE_URL="file:./db/custom.db"

# Email (Resend)
RESEND_API_KEY=""
CONTACT_TO_EMAIL="info@clicktaketech.com"
CONTACT_FROM_EMAIL="noreply@clicktaketech.com"

# Cloudflare Turnstile (anti-bot)
TURNSTILE_SECRET_KEY=""
TURNSTILE_SITE_KEY=""
EOF

# Zip it up
cd "$STAGE"
zip -rq "$OUT" "clicktake-website"

echo ""
echo "============================================"
echo "Bundle ready: $OUT"
echo "Size: $(du -h "$OUT" | cut -f1)"
echo "Contents:"
cd "$STAGE/clicktake-website"
find . -maxdepth 2 -type d | head -20
echo "..."
echo "Total files: $(find . -type f | wc -l)"
echo "============================================"
