# Active/Passive Failover Setup — cPanel + Vercel + Cloudflare Worker

This guide sets up automatic failover so that if your cPanel host goes down,
traffic is automatically routed to a Vercel backup within ~5 seconds. Both
backends share the same Supabase database, so admin sessions persist across
failover events.

```
                visitor
                   ↓
        Cloudflare Worker (smart proxy)
            ↓                  ↓
       try primary         if 5xx/timeout
            ↓                  ↓
       cPanel host        Vercel backup
            ↓                  ↓
            └───── Supabase Postgres ─────┘
                  (shared DB, sessions
                   work on both backends)
```

**Total cost:** $0 (Cloudflare Worker free tier, Vercel Hobby free, cPanel you already have)
**Failover time:** ~5 seconds
**Failback time:** ~60 seconds (after cPanel recovers)

---

## How it works

A small Cloudflare Worker (~150 lines) sits in front of your domain. On every
request:

1. **Circuit closed (normal)** → forward to cPanel. Track success/failure.
2. **cPanel returns 5xx or times out (>5s)** → increment failure counter.
3. **2 consecutive failures** → open the circuit. All traffic goes to Vercel.
4. **Circuit open** → every 15 seconds, do a background health probe against
   cPanel's `/api/health`. If healthy, close the circuit and resume traffic.

State is per-Worker-isolate (per-edge-location). If cPanel is unreachable from
Singapore but fine in Frankfurt, only the Singapore edge fails over — the rest
of the world keeps using cPanel directly. No global state to synchronize.

---

## Architecture summary

| Layer | Role | Cost |
|---|---|---|
| Cloudflare DNS | Resolves `clicktaketech.com` to the Worker | Free |
| Cloudflare Worker (`clicktake-failover`) | Smart reverse proxy with circuit breaker | Free (100k req/day) |
| cPanel host (primary) | Full Next.js app + DB connection | You already have it |
| Vercel (secondary) | Full Next.js app + DB connection | Free (Hobby tier) |
| Supabase Postgres | Shared database — single source of truth | Free |

---

## Prerequisites

- ✅ You have cPanel hosting with "Setup Node.js App" feature
- ✅ Cloudflare account with `clicktaketech.com` (already set up)
- ✅ GitHub repo `clicktaketechnologies/clicktaketechnologies`
- ⏳ Need to deploy the app to cPanel (see `DEPLOY-CPANEL.md`)
- ⏳ Need to deploy the app to Vercel (see `DEPLOY-VERCEL.md`)

**Both backends must point to the SAME Supabase database** (same `DATABASE_URL`
env var). This is critical — otherwise admin sessions don't carry over.

---

## Step 1 — Deploy to cPanel (primary)

Follow `DEPLOY-CPANEL.md`. Stop after you've verified:
- ✅ `https://<your-cpanel-url>/api/health` returns `{"status":"ok"}`
- ✅ `https://<your-cpanel-url>/admin/login` works
- ✅ Admin login succeeds with `admin@clicktaketech.com` / `ChangeMe!2025`

Write down your cPanel URL — could be:
- `https://clicktaketech.com` (if you've already pointed the domain to cPanel)
- `https://server.host.com/~yourusername/` (temporary cPanel URL before DNS)
- `https://123.45.67.89` (direct IP)

> ⚠️ For the failover setup, **do NOT point `clicktaketech.com` DNS to cPanel yet**.
> Keep it pointing to the Cloudflare Worker. The Worker will proxy to cPanel.

---

## Step 2 — Deploy to Vercel (secondary)

Follow `DEPLOY-VERCEL.md`. Stop after you've verified:
- ✅ `https://<your-vercel-url>.vercel.app/api/health` returns `{"status":"ok"}`
- ✅ Admin login works at the Vercel URL
- ✅ **CRITICAL:** Same `DATABASE_URL`, `NEXTAUTH_SECRET`, and
  `PROVIDER_CREDENTIALS_ENCRYPTION_KEY` env vars as cPanel (so sessions work
  on both)

Write down your Vercel URL, e.g. `https://clicktaketechnologies-abc123.vercel.app`.

---

## Step 3 — Deploy the failover Worker

The Worker code is already in your repo at `workers/cloudflare-failover/`.

### 3.1 — Edit `wrangler.toml`

Open `workers/cloudflare-failover/wrangler.toml` and update the `[vars]` section
with your real URLs:

```toml
[vars]
PRIMARY_BACKEND = "https://<your-cpanel-url>"        # e.g. https://server.a2hosting.com/~clicktake
SECONDARY_BACKEND = "https://<your-vercel-url>"      # e.g. https://clicktaketechnologies-abc.vercel.app
HEALTH_PATH = "/api/health"
PRIMARY_TIMEOUT_MS = "5000"
COOLDOWN_SEC = "60"
HEALTH_PROBE_SEC = "15"
```

### 3.2 — Get your Cloudflare API token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token** → "Edit Cloudflare Workers" template → Continue
3. Under "Account Resources" select your account
4. Under "Zone Resources" select `clicktaketech.com`
5. Click **Continue to summary** → **Create Token**
6. Copy the token (starts with `cfut_` or similar) — you'll need it next

### 3.3 — Deploy the Worker

From your local machine:

```bash
cd /home/z/my-project/workers/cloudflare-failover
CLOUDFLARE_API_TOKEN=cfut_your_token_here bunx wrangler deploy
```

You should see:
```
Uploaded clicktake-failover (1.23 sec)
Published clicktake-failover (x sec)
  https://clicktake-failover.<your-account>.workers.dev
```

The Worker is now live at the `*.workers.dev` URL. Test it:
```bash
curl -i https://clicktake-failover.<your-account>.workers.dev/api/health
# Should return {"status":"ok"} with header: x-backend: primary
```

---

## Step 4 — Route `clicktaketech.com` through the Worker

Right now `clicktaketech.com` is handled by your old `clicktake-web` Worker
(the one running Next.js via OpenNext — which doesn't work for admin). We need
to swap it out.

### 4.1 — Remove the old Worker's custom domain

1. Cloudflare dashboard → **Workers & Pages → clicktake-web**
2. Go to **Settings → Domains & Routes**
3. Remove `clicktaketech.com` and `www.clicktaketech.com`
4. (Optional) Delete the `clicktake-web` Worker entirely — we don't need it
   anymore. The failover Worker replaces it.

### 4.2 — Add custom domain to the new Worker

1. Cloudflare dashboard → **Workers & Pages → clicktake-failover**
2. Go to **Settings → Domains & Routes → Add → Custom Domain**
3. Type `clicktaketech.com` → **Add Domain**
4. Repeat for `www.clicktaketech.com`

Cloudflare automatically creates the DNS records pointing to the Worker.

### 4.3 — Verify DNS

In Cloudflare → **DNS → Records**, you should now see:
- `clicktaketech.com` → proxied (orange cloud) to the Worker
- `www.clicktaketech.com` → proxied (orange cloud) to the Worker

If you see old A records pointing to cPanel or Vercel directly, **delete them**.
All traffic must flow through the Worker for failover to work.

---

## Step 5 — Test the failover

### 5.1 — Normal operation

```bash
curl -i https://clicktaketech.com/api/health
# Expected: 200 OK, header x-backend: primary
```

Open `https://clicktaketech.com/admin/login` — should work normally.

### 5.2 — Simulate cPanel failure

Easiest way: temporarily change `PRIMARY_BACKEND` in the Worker to a URL that
doesn't exist, then redeploy:

```bash
cd /home/z/my-project/workers/cloudflare-failover
# Edit wrangler.toml — change PRIMARY_BACKEND to https://broken.example.invalid
CLOUDFLARE_API_TOKEN=cfut_... bunx wrangler deploy
```

Now test:
```bash
# First 2 requests: try primary, fail, fall through to secondary
curl -i https://clicktaketech.com/api/health
# Expected: 200 OK, header x-backend: secondary

# Subsequent requests: circuit is open, go straight to secondary (fast)
curl -i https://clicktaketech.com/api/health
# Expected: 200 OK, header x-backend: secondary, faster
```

Visit `https://clicktaketech.com` in your browser — should still load, now
served by Vercel.

### 5.3 — Simulate cPanel recovery

Change `PRIMARY_BACKEND` back to the real cPanel URL and redeploy. Within ~60
seconds (next background probe), the circuit closes and traffic flows back to
cPanel. Verify:

```bash
curl -i https://clicktaketech.com/api/health
# After ~60s, expected: x-backend: primary
```

---

## Step 6 — Set up monitoring alerts (optional but recommended)

Use **UptimeRobot** (free, 50 monitors) to alert you when failover kicks in:

1. Sign up at https://uptimerobot.com
2. Add monitor:
   - Type: HTTP(s)
   - URL: `https://clicktaketech.com/api/health`
   - Interval: 5 minutes
3. Add a second monitor that checks if cPanel is **directly** reachable:
   - URL: `https://<your-cpanel-url>/api/health`
   - Interval: 5 minutes
4. Set up alert (email/Slack/Telegram) on either monitor going down

When you get an alert for monitor #2 (cPanel directly down) but monitor #1
still passes, failover is working as designed. When monitor #1 also fails,
both backends are down — that's a real emergency.

---

## Trade-offs vs. paid Cloudflare Load Balancing

Cloudflare offers native Load Balancing for $5/month. Here's when each approach
makes sense:

| Feature | This Worker (free) | CF Load Balancing ($5/mo) |
|---|---|---|
| Cost | $0 | $5/mo |
| Failover speed | ~5 sec | ~3 sec |
| Health check frequency | Per-request + 15s probe | Configurable (10s minimum) |
| Per-region health | ✅ (per-isolate) | ✅ |
| Active/active load balancing | ❌ | ✅ |
| Sticky sessions | ❌ | ✅ |
| Setup complexity | Medium | Easy (dashboard UI) |
| Maintenance | You own the code | Cloudflare manages |
| Logs | Cloudflare Workers dashboard | More detailed analytics |

**Recommendation:** Start with the free Worker. If you find yourself tweaking
it often, or need active/active, upgrade to the paid version later.

---

## Troubleshooting

### "502 Both backends unreachable"
- Check both `PRIMARY_BACKEND` and `SECONDARY_BACKEND` URLs in `wrangler.toml`
- Test each directly: `curl -i https://<backend-url>/api/health`
- If only primary is down (expected failover), check that secondary is reachable

### Failover doesn't trigger
- Make sure you're hitting the Worker URL, not cPanel directly
- Check `x-backend` response header — should be `primary` normally, `secondary` during failover
- Look at Worker logs: Cloudflare dashboard → Workers → clicktake-failover → Logs

### Sessions don't persist across failover
- Both backends MUST have the same `NEXTAUTH_SECRET` env var
- Both MUST connect to the same Supabase DB (same `DATABASE_URL`)
- Check `PROVIDER_CREDENTIALS_ENCRYPTION_KEY` is identical on both

### `x-backend: secondary` even when cPanel is up
- The circuit is probably still open from a previous failure
- Wait 60 seconds for the background probe to close it
- Or redeploy the Worker to reset state (extreme case)

### Worker URL works but custom domain returns old site
- DNS is cached. Wait 5 min.
- Make sure no old A/CNAME records in Cloudflare DNS point to cPanel directly
- Make sure the old `clicktake-web` Worker no longer has the custom domain attached

### CORS errors after failover
- Both backends need to set `Access-Control-Allow-Origin` for `clicktaketech.com`
- The Worker passes through response headers unchanged, so this is a backend issue

---

## Future improvements

If you want to extend the Worker later:

1. **Active/active load balancing** — split traffic 80/20 between cPanel and Vercel, failover to 100% Vercel on cPanel failure. Better latency globally.

2. **Weighted routing by region** — keep cPanel as primary for North America (closer to your customers), Vercel as primary for Europe/Asia.

3. **Sticky sessions** — use Cloudflare KV to remember which backend served a user's first request, keep them on that backend to avoid mid-session failover.

4. **Cache static assets at the edge** — Worker can cache `.next/static/*` and `public/*` responses in Cloudflare's cache, reducing load on both backends.

5. **Web analytics** — log every request to Cloudflare Analytics Engine (free up to 10M rows/day) for a dashboard of which backend served what.

These are all incremental — the current setup is production-ready as-is for a
small business site.
