# Deploy ClickTake to cPanel Hosting

This guide shows how to deploy the Next.js app to a cPanel host that supports
Node.js via the "Setup Node.js App" feature (CloudLinux + Alt-Node).

**Total time:** 30–45 min after purchase.
**Total cost:** $2–10/month depending on host.
**Build location:** Local (recommended) — most cPanel hosts don't have enough
RAM for Next.js production builds.

---

## Prerequisites — verify before buying

Check these 3 things in the host's feature page or via live chat:

1. ✅ "Setup Node.js App" icon exists in cPanel
2. ✅ Node.js 18.18+ available (preferably 20.x)
3. ✅ SSH access included (recommended for uploads; not strictly required)

If a host fails any of these, pick another. All hosts recommended in the main
chat (A2, Namecheap, Hostinger, GreenGeeks) pass all three.

---

## Step 1 — Build the app locally

On your local machine (this dev environment):

```bash
cd /home/z/my-project

# Install deps (skip the Cloudflare-specific postinstall patch)
SKIP_PATCH_PG_CLOUDFLARE=1 bun install --frozen-lockfile

# Production build (creates .next/standalone/ with self-contained server.js)
NODE_ENV=production bun run build
```

The build output lands in:
- `.next/standalone/` — self-contained server + node_modules (production deps only)
- `.next/static/` — JS/CSS chunks
- `public/` — static assets (images, logos)

Your `package.json` already has the build script wired correctly:
```json
"build": "next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/"
```

So after build, `.next/standalone/` contains everything needed to run.

---

## Step 2 — Package the build for upload

```bash
cd /home/z/my-project/.next/standalone
tar -czf /home/z/my-project/download/clicktake-deploy.tar.gz .
```

This creates a ~30–50 MB tarball ready to upload.

---

## Step 3 — Create the Node.js app in cPanel

Log in to cPanel on your host. Find **Setup Node.js App** (under "Software"
section). Click **Create Application**.

Fill in:

| Field | Value |
|---|---|
| Node.js version | 20.x (or 18.x if 20 not available) |
| Application mode | Production |
| Application root | `clicktake` (folder name under home dir) |
| Application URL | your domain (e.g. `clicktaketech.com`) |
| Application startup file | `server.js` |

Leave "Passenger log file" as default — you'll need it for debugging.

Click **Create**. cPanel creates:
- `~/clicktake/` directory
- A default `app.js` (delete it — we'll upload our own `server.js`)
- An Apache `.htaccess` rewrite rule pointing to the Node app

---

## Step 4 — Upload the build

You have 3 options. Pick whichever your host supports.

### Option A — File Manager (easiest, no SSH needed)
1. In cPanel → **File Manager** → navigate to `~/clicktake/`
2. Delete the default `app.js` and `package.json` if present
3. Click **Upload** → upload `clicktake-deploy.tar.gz`
4. Right-click the tarball → **Extract** → extract to current dir
5. Delete the tarball after extraction

### Option B — FTP (recommended for repeat deploys)
1. In cPanel → **FTP Accounts** → create one if needed
2. Use FileZilla / WinSCP / Cyberduck to connect
3. Upload everything inside `.next/standalone/` to `~/clicktake/`
4. Overwrite existing files

### Option C — SSH (most reliable, fastest)
```bash
# From your local machine
scp /home/z/my-project/download/clicktake-deploy.tar.gz user@yourhost:~/

# SSH into the host
ssh user@yourhost
cd ~/clicktake
tar -xzf ~/clicktake-deploy.tar.gz
rm ~/clicktake-deploy.tar.gz
```

---

## Step 5 — Create the .env file on the server

In cPanel → **File Manager** → navigate to `~/clicktake/` → click **+ File** →
name it `.env`. Paste the contents of your local `.env` file with these
**changes**:

```diff
- NODE_ENV=development
+ NODE_ENV=production

- NEXTAUTH_URL=https://clicktaketech.com
+ NEXTAUTH_URL=https://clicktaketech.com   # keep same if domain is set up
```

Make sure ALL these are present (copy from local .env):

```
DATABASE_URL=postgresql://postgres.crejzifwpcnjqghlbbdf:qXXHfTESjFlmWn0W@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.crejzifwpcnjqghlbbdf:qXXHfTESjFlmWn0W@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SUPABASE_URL=https://crejzifwpcnjqghlbbdf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
GMAIL_USER=clicktaketechnologies@gmail.com
GMAIL_APP_PASSWORD=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=clicktaketechnologies@gmail.com
SMTP_PASS=...
MAIL_FROM=ClickTake <clicktaketechnologies@gmail.com>
LEADS_EMAIL=clicktaketechnologies@gmail.com
PROVIDER_ALERT_TO=clicktaketechnologies@gmail.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwioesu97
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=contact_uploads
CLOUDINARY_CLOUD_NAME=dwioesu97
CLOUDINARY_UPLOAD_PRESET=contact_uploads
SUPERADMIN_EMAIL=admin@clicktaketech.com
SUPERADMIN_PASSWORD=ChangeMe!2025
NEXTAUTH_URL=https://clicktaketech.com
NEXTAUTH_SECRET=g8CbWa4WRygZnbSayGkpNBpLs0iMEmmzmXK56PlvKPM=
PROVIDER_CREDENTIALS_ENCRYPTION_KEY=...
CRON_SECRET=...
```

**DO NOT add** `BACKEND_URL` — leave it unset so the app serves everything
itself.

**Important**: cPanel Node apps don't auto-load `.env` files. We need to
modify the startup to load dotenv. See Step 7.

---

## Step 6 — Set environment variables via cPanel (alternative to .env)

Instead of using a `.env` file (which requires code changes to load), you can
set env vars directly in cPanel:

1. In **Setup Node.js App** → click your app → scroll to "Environment variables"
2. Add each variable one by one (same list as above)
3. Click **Save** → **Restart App**

This is the **preferred method** on cPanel — vars survive redeploys and don't
require dotenv.

---

## Step 7 — Make sure the app loads .env (only if using .env file method)

If you went with the .env file (Step 5) instead of cPanel env vars (Step 6),
add this near the top of `~/clicktake/server.js`:

```javascript
// Load .env file (cPanel doesn't auto-load it)
require('dotenv').config();
```

You'll need to also upload a `node_modules/dotenv/` folder, or install it:
```bash
cd ~/clicktake
npm install dotenv --production
```

If you went with Step 6 (cPanel env vars), skip this entirely.

---

## Step 8 — Restart the Node app

In **Setup Node.js App** → click your app → click **Restart**.

Wait 10 seconds, then visit the Application URL shown in cPanel (usually
`https://clicktaketech.com` if you've already pointed DNS, or a temporary
URL like `https://server123.host.com/~username/` for testing).

---

## Step 9 — Check the Passenger log if anything fails

In **Setup Node.js App** → click your app → there's a "Log file" path shown,
usually `~/clicktake/logs/passenger.log`. Click **View** or open it in File
Manager.

Common errors:
- `Error: Cannot find module 'next'` → standalone build was incomplete. Rebuild locally and re-upload.
- `EADDRINUSE` → another process is on port 3000. cPanel assigns a random port to your app; don't try to set PORT manually.
- `Database connection failed` → check DATABASE_URL env var is set in cPanel.
- `404 on /admin/login` → middleware not running. Confirm `.next/static/` and `.next/standalone/.next/` were uploaded.

---

## Step 10 — Set up the cron job for provider-health

cPanel includes a Cron Jobs feature. In cPanel → **Cron Jobs** → "Add New Cron
Job".

| Field | Value |
|---|---|
| Common Settings | Once per hour (`0 * * * *`) |
| Command | `curl -s -X POST -H "Authorization: Bearer bc5897828779be9dac20963c" https://clicktaketech.com/api/cron/provider-health > /dev/null 2>&1` |

Replace `bc5897828779be9dac20963c` with your actual `CRON_SECRET` value.

Click **Add New Cron Job**. The provider-health check will now run hourly.

---

## Step 11 — Point clicktaketech.com to the cPanel host

Your domain is currently on Cloudflare. Two options:

### Option A — Use Cloudflare as DNS only (recommended)
1. In Cloudflare → **DNS → Records**
2. Delete the existing A/AAAA/CNAME records pointing to the Cloudflare Worker
3. Add an **A record**: `@ → <cPanel host IP>` (find IP in cPanel → "Server Information" → "Shared IP")
4. Add another A record: `www → <cPanel host IP>`
5. **Turn OFF proxy** (gray cloud) for both records — Vercel/cPanel both prefer this
6. In Cloudflare → **SSL/TLS → Overview** → set mode to **Full** (not Flexible, not Full Strict — cPanel AutoSSL certs are self-signed at the edge)
7. Cloudflare Worker → Triggers → Custom Domains → remove `clicktaketech.com` and `www.clicktaketech.com`

### Option B — Use cPanel host's nameservers
1. In cPanel → look for "Nameservers" (e.g. `ns1.hostgator.com`, `ns2.hostgator.com`)
2. In your domain registrar (where you bought `clicktaketech.com`) → update nameservers
3. Wait 24-48h for DNS propagation

Option A is faster and keeps Cloudflare's DNS performance. Option B is simpler
but slower to propagate.

---

## Step 12 — SSL setup

cPanel hosts usually include **AutoSSL** (Let's Encrypt) for free. In cPanel →
**SSL/TLS Status** → click **Run AutoSSL** for `clicktaketech.com` and
`www.clicktaketech.com`.

If you're using Cloudflare as DNS-only (gray cloud), the AutoSSL cert secures
the connection between visitors and your cPanel host. Done.

If you turned ON Cloudflare's proxy (orange cloud), set SSL/TLS mode to **Full**
or **Full (strict)** and disable "Always Use HTTPS" in Cloudflare.

---

## Step 13 — Verify

Wait 5-10 min for DNS, then test:

| URL | Expected |
|---|---|
| `https://clicktaketech.com` | ClickTake homepage (dark hero, 3D scene) |
| `https://clicktaketech.com/services` | Services page |
| `https://clicktaketech.com/contact` | Contact form with Turnstile |
| `https://clicktaketech.com/admin/login` | Admin login form |
| `https://clicktaketech.com/api/health` | `{"status":"ok"}` JSON |

Admin login: `admin@clicktaketech.com` / `ChangeMe!2025`

---

## Future deploys (after first setup)

For subsequent code changes:

```bash
# Local: pull latest, rebuild, repackage
cd /home/z/my-project
git pull
bun install --frozen-lockfile
NODE_ENV=production bun run build
cd .next/standalone && tar -czf /home/z/my-project/download/clicktake-deploy.tar.gz .

# Upload via FTP/SSH/File Manager to ~/clicktake/
# Then in cPanel → Setup Node.js App → Restart
```

Total redeploy time: ~5 min once you have the workflow down.

---

## When cPanel is NOT a good fit

- You expect 1000+ daily visitors from multiple continents → use Vercel/Cloudflare for edge caching
- You want git-push-to-deploy without manual upload → use Vercel
- You need serverless functions (per-request billing) → use Vercel
- You want automated preview deployments per PR → use Vercel

For a small business site with <500 daily visitors in mostly one region,
cPanel is fine and cheaper long-term.
