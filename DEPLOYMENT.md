# Deployment Guide — ClickTake Technologies

This project uses a **dual-platform production deployment**:

| Component | Host | Why |
|-----------|------|-----|
| Edge CDN + public pages (`/`, `/services`, `/about`, `/contact`, `/portfolio`, `/solutions`, `/pricing`, `/team`, `/careers`, `/blog`, `/case-studies`, etc.) | **Cloudflare Workers** | Edge CDN, fast global TTFB, free tier, custom domain |
| Full-stack runtime (`/api/*`, `/admin/*`, SSR with DB access) | **Vercel** | Native Next.js platform, serverless functions, automatic Postgres pooling, no socket-adapter issues |

The Cloudflare Worker serves public pages directly and proxies all `/api/*` and
`/admin/*` requests to the Vercel backend via `src/middleware.ts`.

> **Migration note (July 2026):** The backend was previously hosted on Render.
> It has been moved to Vercel for tighter Next.js integration (ISR, Edge
> Functions, automatic preview deployments on every PR). The Render service
> can be decommissioned once the Vercel deployment is verified live.

---

## Part 1 — One-time setup (skip if already done)

### 1.1 Install CLIs + authenticate

```bash
# Cloudflare
bunx wrangler login
# (or export CLOUDFLARE_API_TOKEN=cfut_... for CI)

# Vercel
bunx vercel login
# (or export VERCEL_TOKEN=vercel_... for CI)
```

### 1.2 Link the Vercel project (first time only)

```bash
bunx vercel link
# → Use existing project: clicktake-web
# (or accept "create new project" the first time)
```

### 1.3 Set production env vars

Copy `.env.production.example` → `.env.production` and fill in the values.
Then push them to both platforms:

```bash
# Cloudflare Worker (public + the BACKEND_URL secret)
bunx wrangler secret put NEXTAUTH_SECRET            < .env.production
bunx wrangler secret put DATABASE_URL               < .env.production
bunx wrangler secret put SUPERADMIN_PASSWORD        < .env.production
bunx wrangler secret put PROVIDER_CREDENTIALS_ENCRYPTION_KEY < .env.production
bunx wrangler secret put TURNSTILE_SECRET_KEY       < .env.production
bunx wrangler secret put CRON_SECRET                < .env.production

# Vercel — pull from .env.production automatically
bunx vercel env pull .env.local --environment=production
# Or set each via dashboard: https://vercel.com/clicktake/clicktake-web/settings/environment-variables
```

### 1.4 Run database migration (one-time)

Once the DB is reachable from Vercel, run the migration script to create all
41 tables required by the Drizzle schema (idempotent — safe to re-run):

```bash
DATABASE_URL="postgresql://..." npx tsx scripts/migrate-db-standalone.ts
```

### 1.5 Seed the super-admin (one-time)

```bash
DATABASE_URL="postgresql://..." SUPERADMIN_EMAIL=admin@clicktaketech.com \
  SUPERADMIN_PASSWORD='...' bunx tsx scripts/seed-admin.ts
```

---

## Part 2 — Daily deploy (the easy way)

One script does everything: build Vercel → deploy Vercel → build Cloudflare →
set `BACKEND_URL` → deploy Cloudflare.

```bash
export CLOUDFLARE_API_TOKEN=cfut_...
export VERCEL_TOKEN=vercel_...

bash scripts/deploy-production.sh
```

The script:
1. Builds Next.js with `next build` (for Vercel)
2. Deploys to Vercel production (`vercel deploy --prod`)
3. Builds the OpenNext bundle (for Cloudflare, with the db stub)
4. Sets the `BACKEND_URL` secret on the Cloudflare Worker to the new Vercel URL
5. Deploys the new Worker version

Total time: ~4–6 minutes.

---

## Part 3 — Manual deploy (step by step)

If you prefer to run each step yourself:

### 3.1 Deploy to Vercel

```bash
bun run build:vercel
bunx vercel --prod --yes
# Note the production URL printed at the end, e.g. https://clicktake.vercel.app
```

### 3.2 Repoint the Cloudflare Worker → Vercel

```bash
# Set the BACKEND_URL secret to the Vercel URL
echo "https://clicktake.vercel.app" | bunx wrangler secret put BACKEND_URL
```

### 3.3 Deploy the Cloudflare Worker

```bash
bun run deploy:cloudflare
# (builds OpenNext bundle + runs wrangler deploy)
```

### 3.4 Verify

```bash
curl -sI https://clicktaketech.com/                          | head -1   # HTTP/2 200
curl -s  https://clicktaketech.com/api/health                | head -c 100   # {"ok":true,...}
curl -s  https://clicktaketech.com/api/auth/csrf             | head -c 100   # {"csrfToken":"..."}
curl -sI https://clicktake.vercel.app/api/health             | head -1   # HTTP/2 200
```

---

## Part 4 — Smoke test

After deploy, run this end-to-end check:

```bash
# Public pages
for path in / /services /solutions /pricing /team /careers /blog /case-studies /contact; do
  status=$(curl -sI -o /dev/null -w '%{http_code}' "https://clicktaketech.com${path}")
  printf '  %-25s %s\n' "$path" "$status"
done

# Service detail pages (sample)
for slug in ai/automation web/wordpress digital-marketing/seo-services creative/web-design web/starter-kit; do
  status=$(curl -sI -o /dev/null -w '%{http_code}' "https://clicktaketech.com/services/${slug}")
  printf '  /services/%-22s %s\n' "$slug" "$status"
done

# Solution pages
for slug in startups local-businesses ecommerce-brands repair-shops uk-businesses agencies; do
  status=$(curl -sI -o /dev/null -w '%{http_code}' "https://clicktaketech.com/solutions/${slug}")
  printf '  /solutions/%-22s %s\n' "$slug" "$status"
done

# API endpoints
curl -s https://clicktaketech.com/api/health | head -c 200
echo
curl -s https://clicktaketech.com/api/auth/csrf | head -c 200
echo

# Admin login (CSRF + credentials roundtrip)
csrf=$(curl -sc /tmp/cj https://clicktaketech.com/api/auth/csrf | jq -r .csrfToken)
curl -sb /tmp/cj -c /tmp/cj -X POST https://clicktaketech.com/api/auth/callback/credentials \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfToken=${csrf}&email=admin@clicktaketech.com&password=Admin@2026&json=true" \
  | head -c 200
echo
```

All lines should print `200` (or `307` for the admin redirect).

---

## Architecture Notes

### Why split Cloudflare + Vercel?

- **Cloudflare Workers**: 3 MiB free-plan bundle limit, edge runtime, ideal for
  the public face of the site (SSG pages + ISR-cached content). Global CDN
  with ~30 ms TTFB worldwide. The Worker also handles the `www → apex`
  canonical redirect and injects security headers + RFC 8288 Link headers for
  AI agent discovery.
- **Vercel**: native Next.js platform. Serverless functions for `/api/*`, SSR
  for admin pages, automatic Postgres connection pooling, preview deploys on
  every PR, built-in cron. No bundle-size limit for the Node runtime.

### How the proxy works

`src/middleware.ts` runs on every request at the Cloudflare edge. When
`BACKEND_URL` is set:
- `/api/*` → forwarded to `${BACKEND_URL}/api/*`
- `/admin/*` → forwarded to `${BACKEND_URL}/admin/*`
- All other paths → served by the Cloudflare Worker (public pages)

Headers preserved: `cookie`, `authorization`, `content-type`, etc.
Added: `x-forwarded-host`, `x-forwarded-proto`.

### How the CF bundle stays small

The CF build (`scripts/build-cloudflare.sh`) swaps in `src/lib/db-stub.ts`
(a stub that throws on any DB access) before running `opennextjs-cloudflare build`.
The stub is never executed at runtime because the middleware intercepts
DB-touching routes first. The real Drizzle client lives in `src/lib/db.ts`
and is used by the Vercel build.

### DNS setup (one-time, manual)

- `clicktaketech.com` A record → Cloudflare (proxied, orange cloud)
- `www.clicktaketech.com` CNAME → `clicktake-web.<account>.workers.dev`
  (the Worker redirects www → apex with a 308)
- The Vercel deployment is reachable at `clicktake.vercel.app` (or any custom
  domain you point at Vercel — not required, since the CF Worker proxies to
  it via `BACKEND_URL`).

---

## Local Development

```bash
bun install
bun run dev
# → http://localhost:3000
```

In dev, `BACKEND_URL` is not set, so the app runs as a single Next.js server
with the real Drizzle client. Set `DATABASE_URL` in `.env`.

## Build Commands

| Command | What it does |
|---------|--------------|
| `bun run dev` | Start dev server (single-process) |
| `bun run build` | Build standalone Next.js (for Vercel/Render) |
| `bun run build:cloudflare` | Build OpenNext bundle with db stub |
| `bun run deploy:cloudflare` | Build + deploy to Cloudflare Workers |
| `bun run build:vercel` | Build Next.js (for Vercel) |
| `bun run deploy:vercel` | Build + deploy to Vercel (production) |
| `bun run deploy:vercel:preview` | Build + deploy to Vercel (preview) |
| `bash scripts/deploy-production.sh` | Build + deploy to BOTH platforms |
| `bun run seed:admin` | One-off: seed super-admin + roles |
| `npx tsx scripts/migrate-db-standalone.ts` | One-off: create DB tables |

## Rollback

### Vercel
```bash
bunx vercel ls                    # list recent deployments
bunx vercel promote <deployment-url>  # promote an older deployment to production
```

### Cloudflare
```bash
bunx wrangler deployments list
bunx wrangler rollback            # rolls back to the previous version
```
