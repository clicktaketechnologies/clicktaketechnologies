***REMOVED*** Deployment Guide — ClickTake Technologies

This project uses a **hybrid deployment**:

| Component | Host | Why |
|-----------|------|-----|
| Frontend (public pages, /, /services, /about, /contact, /portfolio, etc.) | Cloudflare Workers | Edge CDN, fast global TTFB, free tier |
| Backend (/api/*, /admin/*) | Render | Full Node.js runtime, native Postgres TCP, no socket-adapter issues |

The Cloudflare Worker serves public pages directly and proxies all `/api/*` and
`/admin/*` requests to the Render backend via `src/middleware.ts`.

---

***REMOVED******REMOVED*** Part 1 — Deploy Backend to Render

***REMOVED******REMOVED******REMOVED*** 1.1 Push to GitHub
```bash
git remote add origin https://github.com/<your-org>/clicktake-web.git
git push -u origin main
```

***REMOVED******REMOVED******REMOVED*** 1.2 Create Render Web Service
1. Go to https://dashboard.render.com → New → Blueprint
2. Select your GitHub repo
3. Render detects `render.yaml` and creates a `clicktake-api` web service
4. Set the following env vars in the Render dashboard (under Environment):

| Variable | Value | How to generate |
|----------|-------|-----------------|
| `DATABASE_URL` | `postgresql://...` | Your Supabase/Neon Postgres connection string |
| `DIRECT_URL` | same as `DATABASE_URL` | Same connection string |
| `NEXTAUTH_SECRET` | random 32+ chars | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://clicktake-api.onrender.com` | Your Render URL |
| `SUPERADMIN_EMAIL` | `admin@clicktaketech.com` | Default admin email |
| `SUPERADMIN_PASSWORD` | `***REDACTED_ADMIN_PASSWORD***` (change on first login) | Default admin password |
| `PROVIDER_CREDENTIALS_ENCRYPTION_KEY` | 64-char hex | `openssl rand -hex 32` |
| `MAIL_FROM` | `ClickTake <noreply@clicktaketech.com>` | From address for emails |
| `MIGRATE_KEY` | `migrate_<random>` | `echo "migrate_$(openssl rand -hex 12)"` |
| `PORT` | `10000` | Render's default |

5. Deploy. First build takes ~3-5 minutes.

***REMOVED******REMOVED******REMOVED*** 1.3 Run Database Migration (one-time)
Once Render is up, run the migration script to create all DB tables:

```bash
DATABASE_URL="postgresql://..." npx tsx scripts/migrate-db-standalone.ts
```

This creates all 41 tables required by the Drizzle schema. Idempotent — safe to
re-run.

***REMOVED******REMOVED******REMOVED*** 1.4 Verify Backend
```bash
curl https://clicktake-api.onrender.com/api/health
***REMOVED*** Expected: {"ok":true,"service":"clicktake-api",...}

curl https://clicktake-api.onrender.com/api/auth/csrf
***REMOVED*** Expected: {"csrfToken":"..."}
```

---

***REMOVED******REMOVED*** Part 2 — Update Cloudflare Worker

Once Render is live, update the Cloudflare Worker to proxy to it:

***REMOVED******REMOVED******REMOVED*** 2.1 Set BACKEND_URL on Cloudflare
```bash
CLOUDFLARE_API_TOKEN=cfut_... bunx wrangler secret put BACKEND_URL
***REMOVED*** Enter: https://clicktake-api.onrender.com
```

***REMOVED******REMOVED******REMOVED*** 2.2 (Optional) Rebuild + Redeploy Cloudflare
The middleware reads `BACKEND_URL` at runtime, so you only need to set the
secret — no rebuild needed. But to be safe:

```bash
bun run deploy:cloudflare
```

***REMOVED******REMOVED******REMOVED*** 2.3 Verify Live Site
```bash
curl https://clicktaketech.com/
***REMOVED*** 200 — public page served from Cloudflare

curl https://clicktaketech.com/api/auth/csrf
***REMOVED*** {"csrfToken":"..."} — proxied to Render

curl -X POST https://clicktaketech.com/api/auth/callback/credentials \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfToken=...&email=admin@clicktaketech.com&password=***REDACTED_ADMIN_PASSWORD***&json=true"
***REMOVED*** {"url":"https://clicktaketech.com/admin"} — login works!
```

---

***REMOVED******REMOVED*** Architecture Notes

***REMOVED******REMOVED******REMOVED*** Why split?
- Cloudflare Workers free plan: 3 MiB bundle limit + flaky Postgres support
- Render: Standard Node.js runtime, native `pg` TCP, free tier available
- Public pages get CDN-fast delivery; admin/API gets reliable DB connectivity

***REMOVED******REMOVED******REMOVED*** How the proxy works
`src/middleware.ts` runs on every request. When `BACKEND_URL` is set:
- `/api/*` → forwarded to `${BACKEND_URL}/api/*`
- `/admin/*` → forwarded to `${BACKEND_URL}/admin/*`
- All other paths → served by the Cloudflare Worker (public pages)

Headers preserved: `cookie`, `authorization`, `content-type`, etc.
Added: `x-forwarded-host`, `x-forwarded-proto`.

***REMOVED******REMOVED******REMOVED*** How the CF bundle stays small
The CF build (`scripts/build-cloudflare.sh`) swaps in `src/lib/db-stub.ts`
(a stub that throws on any DB access) before running `opennextjs-cloudflare build`.
The stub is never executed at runtime because the middleware intercepts
DB-touching routes first. The real Drizzle client lives in `src/lib/db.ts`
and is used by the Render build.

---

***REMOVED******REMOVED*** Local Development
```bash
npm install
npm run dev
***REMOVED*** → http://localhost:3000
```
In dev, `BACKEND_URL` is not set, so the app runs as a single Next.js server
with the real Drizzle client. Set `DATABASE_URL` in `.env`.

***REMOVED******REMOVED*** Build Commands
| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server (single-process) |
| `npm run build` | Build standalone Next.js (for Render) |
| `npm run build:cloudflare` | Build OpenNext bundle with db stub |
| `npm run deploy:cloudflare` | Build + deploy to Cloudflare Workers |
| `npm run seed:admin` | One-off: seed super-admin + roles |
| `npx tsx scripts/migrate-db-standalone.ts` | One-off: create DB tables |
