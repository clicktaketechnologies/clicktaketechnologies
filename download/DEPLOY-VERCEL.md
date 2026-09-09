# Deploy ClickTake to Vercel (Free)

Render's free Web Service tier was discontinued for new accounts — new services
need at least the Starter plan ($7/mo). **Vercel Hobby is free** and is the
native host for Next.js apps. This guide walks you through migrating off the
Cloudflare Worker + Render split and onto Vercel as a single host.

> Total time: ~20 minutes. Total cost: $0.

---

## What you get

| | Cloudflare Worker (old) | Vercel (new) |
|---|---|---|
| Public pages | ✅ on CF Worker | ✅ on Vercel |
| Admin panel | ❌ broken (db-stub) | ✅ on Vercel |
| /api/* routes | ❌ broken (db-stub) | ✅ on Vercel |
| Cron (provider health) | every 5 min | every 1 hour (Hobby limit) |
| Build bundle limit | 3 MiB gzip (free) | 100 MB per function |
| Custom domain | ✅ clicktaketech.com | ✅ clicktaketech.com |
| Always-on | ✅ | ✅ (serverless, cold-start ~1s) |
| Commercial use | ✅ | ⚠️ Hobby TOS says "no commercial" — rarely enforced for low-traffic SMB sites. Upgrade to Pro ($20/mo) when traffic grows. |

---

## Step 1 — Push latest code to GitHub (already done)

Latest commit on `main`: `a482fa1 feat(vercel): add vercel.json with hourly provider-health cron`

If you've made local changes since then, run:
```bash
git push origin main
```

---

## Step 2 — Sign up for Vercel and import the repo

1. Go to **https://vercel.com/signup**
2. Click **Continue with GitHub** → authorize Vercel to access your GitHub account
3. In Vercel dashboard → **Add New… → Project**
4. Find `clicktaketechnologies/clicktaketechnologies` → click **Import**
5. Vercel auto-detects Next.js — leave Framework Preset as "Next.js"
6. **Don't click Deploy yet** — expand "Environment Variables" first

---

## Step 3 — Add environment variables

Add each of these in the Vercel UI (or use `vercel env pull` later for CLI).
For each one: select **all environments** (Production, Preview, Development).

### Database (Supabase)
| Key | Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres:***REDACTED***@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres:***REDACTED***@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres` |
| `SUPABASE_SERVICE_ROLE_KEY` | (the long JWT from .env line 28) |

### Supabase public (NEXT_PUBLIC_*)
| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://crejzifwpcnjqghlbbdf.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `***REDACTED_SUPABASE_ANON_KEY***` |

### SMTP / Gmail (nodemailer)
| Key | Value |
|---|---|
| `GMAIL_USER` | `clicktaketechnologies@gmail.com` |
| `GMAIL_APP_PASSWORD` | `***REDACTED_GMAIL_APP_PASSWORD***` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `clicktaketechnologies@gmail.com` |
| `SMTP_PASS` | `***REDACTED_GMAIL_APP_PASSWORD***` |
| `MAIL_FROM` | `ClickTake <clicktaketechnologies@gmail.com>` |
| `LEADS_EMAIL` | `clicktaketechnologies@gmail.com` |
| `PROVIDER_ALERT_TO` | `clicktaketechnologies@gmail.com` |

### Turnstile (bot protection)
| Key | Value |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAAAAADpHuqrF417pgTBa` |
| `TURNSTILE_SECRET_KEY` | `***REDACTED_TURNSTILE_SECRET***` |

### Cloudinary (media)
| Key | Value |
|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dwioesu97` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `contact_uploads` |
| `CLOUDINARY_CLOUD_NAME` | `dwioesu97` |
| `CLOUDINARY_UPLOAD_PRESET` | `contact_uploads` |

### Admin + auth
| Key | Value |
|---|---|
| `SUPERADMIN_EMAIL` | `admin@clicktaketech.com` |
| `SUPERADMIN_PASSWORD` | `ChangeMe!2025` |
| `NEXTAUTH_URL` | `https://clicktaketech.com` |
| `NEXTAUTH_SECRET` | `***REDACTED_NEXTAUTH_SECRET***` |

### Security
| Key | Value |
|---|---|
| `PROVIDER_CREDENTIALS_ENCRYPTION_KEY` | `***REDACTED_PROVIDER_ENCRYPTION_KEY***` |
| `CRON_SECRET` | `***REDACTED_CRON_SECRET***` |

### ⚠️ DO NOT set these on Vercel
| Key | Why |
|---|---|
| `BACKEND_URL` | If set, middleware will try to proxy /api/* and /admin/* to a backend. Leave it **unset** so Vercel serves everything itself. |
| `NODE_ENV` | Vercel sets this automatically based on environment. |

---

## Step 4 — Deploy

1. Click **Deploy**
2. Wait ~2-3 minutes for the build to finish
3. Vercel gives you a URL like `clicktaketechnologies-xyz.vercel.app`
4. Click it to verify the public homepage loads

---

## Step 5 — Test admin login

1. Go to `https://clicktaketechnologies-xyz.vercel.app/admin/login`
2. Login with:
   - Email: `admin@clicktaketech.com`
   - Password: `ChangeMe!2025`
3. You should land on `/admin` dashboard

If login fails with "Database access is not available" — that means you forgot
to add `DATABASE_URL` to Vercel env vars. Add it and redeploy.

---

## Step 6 — Point clicktaketech.com to Vercel

Right now `clicktaketech.com` resolves to your Cloudflare Worker. We need to
repoint it to Vercel.

### In Vercel:
1. Go to your project → **Settings → Domains**
2. Type `clicktaketech.com` → click Add
3. Vercel shows a DNS record to add. Usually:
   - **A record**: `@ → 76.76.21.21` (or)
   - **CNAME**: `clicktaketech.com → cname.vercel-dns.com`
4. Also add `www.clicktaketech.com` → it'll be set to redirect to apex
   (the Next.js middleware already does this, but adding it in Vercel is cleaner)

### In Cloudflare DNS:
1. Go to **Cloudflare dashboard → your domain → DNS → Records**
2. **Delete** the existing record pointing `@` to the Cloudflare Worker
   (it'll be a AAAA record `@ → 100::` or similar Worker route, or a CNAME to `clicktake-web.workers.dev`)
3. **Add** the record Vercel showed you:
   - Type: `A`, Name: `@`, IPv4: `76.76.21.21`, Proxy: **off (gray cloud)** ← important!
   - OR Type: `CNAME`, Name: `@`, Target: `cname.vercel-dns.com`, Proxy: **off**
4. For `www`: Type `CNAME`, Name `www`, Target `cname.vercel-dns.com`, Proxy off
5. Save

### ⚠️ Critical: turn OFF Cloudflare proxy (orange cloud → gray cloud)

If you leave the orange cloud on, Vercel's SSL won't match Cloudflare's SSL and
you'll get redirect loops. Either:
- **Recommended**: turn off the proxy (gray cloud) — Vercel handles SSL + CDN
- **Alternative**: keep proxy ON, but set Cloudflare SSL/TLS mode to **Full (strict)**
  AND disable "Always Use HTTPS" in Cloudflare. Much more fiddly — just turn it off.

### Disable the Cloudflare Worker route (cleanup)
1. Cloudflare dashboard → **Workers & Pages → clicktake-web**
2. Go to **Triggers → Custom Domains**
3. Remove `clicktaketech.com` and `www.clicktaketech.com` from the Worker
4. You can keep the Worker deployed (it costs nothing) — just don't route the
   custom domain to it anymore

---

## Step 7 — Verify everything works

Wait 2-5 min for DNS to propagate, then check:

| URL | Expected |
|---|---|
| `https://clicktaketech.com` | ClickTake homepage (dark hero with 3D scene) |
| `https://clicktaketech.com/services` | Services page |
| `https://clicktaketech.com/contact` | Contact form with Turnstile |
| `https://clicktaketech.com/admin/login` | Admin login form |
| `https://clicktaketech.com/api/health` | `{"status":"ok"}` JSON |

Try logging in at `/admin/login` with the admin credentials — should now work
end-to-end (DB connection works, NextAuth session sets cookie, dashboard loads).

---

## Step 8 — (Optional) Move DNS off Cloudflare to Vercel

If you want to fully consolidate: you can change nameservers from Cloudflare
to Vercel DNS. But this is **not required** — keeping Cloudflare as DNS-only
(no proxy) works fine. Skip this step unless you have a specific reason.

---

## Vercel free tier limits you'll actually care about

| Limit | Hobby tier | Your expected usage |
|---|---|---|
| Bandwidth | 100 GB / month | <1 GB (small biz site) |
| Serverless function exec | 100 GB-hours / month | <1 GB-hr |
| Build time | 6000 min / month | ~3 min per deploy |
| Cron jobs | 2 jobs, **min hourly** | 1 job (provider-health) |
| Concurrent builds | 1 | Fine |
| Team members | 1 (solo) | Fine for now |

If you exceed Hobby limits or want commercial-use compliance, upgrade to
**Vercel Pro** ($20/month) — covers everything and removes the TOS issue.

---

## Troubleshooting

### "401 Unauthorized" on admin login
→ `NEXTAUTH_SECRET` not set on Vercel, or mismatched between environments.

### "Database access is not available"
→ `DATABASE_URL` not set on Vercel. Add it and redeploy.

### Too many redirects on clicktaketech.com
→ Cloudflare proxy is ON. Turn it OFF (gray cloud) for the A/CNAME record
pointing to Vercel.

### Turnstile widget doesn't load
→ `NEXT_PUBLIC_TURNSTILE_SITE_KEY` not set on Vercel (must be `NEXT_PUBLIC_*`
so it's inlined at build time).

### Email sending fails
→ Check `GMAIL_USER` / `GMAIL_APP_PASSWORD` are set. Gmail app passwords
sometimes get revoked — regenerate at
https://myaccount.google.com/apppasswords if needed.

### Provider health cron doesn't run
→ Vercel Hobby cron runs at most once per hour. Check Vercel dashboard →
your project → **Cron Jobs** tab to see execution history.

