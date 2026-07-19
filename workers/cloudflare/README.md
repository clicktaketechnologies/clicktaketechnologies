***REMOVED*** Media CDN Failover Worker

A Cloudflare Worker that fronts all configured media CDN origins (Cloudflare Images, Cloudinary, ImageKit, Uploadcare, TwicPics) and provides automatic failover with an R2 bucket as last resort.

***REMOVED******REMOVED*** Architecture

```
Browser  ──►  media.clicktaketech.com  ──►  Worker
                                          │
                                          ├─► Provider 1 (Cloudflare Images, priority 1)
                                          ├─► Provider 2 (Cloudinary,         priority 2)
                                          ├─► Provider 3 (ImageKit,           priority 3)
                                          ├─► Provider 4 (Uploadcare,         priority 4)
                                          ├─► Provider 5 (TwicPics,           priority 5)
                                          └─► R2 fallback bucket (last resort)
```

For each incoming request:
1. Iterate providers in priority order.
2. Try the origin with a 4-second timeout.
3. If origin returns 5xx, aborts, or exceeds latency threshold → try next provider.
4. First successful response wins — returned with `x-cdn-provider` + `x-cdn-latency-ms` headers.
5. If all CDNs fail → fetch from R2 fallback bucket (`media-failover-fallback`).
6. If R2 also misses → return 502 with JSON error envelope.

All successful responses are cached at the edge for 24h (`max-age=86400`) and at the browser for 1 week (`s-maxage=604800`).

***REMOVED******REMOVED*** Files

- `media-failover-router.ts` — Worker source.
- `wrangler.toml` — Cloudflare deployment config (bindings, vars, routes).
- `package.json` — npm scripts (`dev`, `deploy`, `tail`, `typecheck`).
- `tsconfig.json` — TypeScript config for Workers types.

***REMOVED******REMOVED*** Setup (one-time)

```bash
cd workers/cloudflare

***REMOVED*** 1. Install wrangler
npm install

***REMOVED*** 2. Login to Cloudflare (interactive)
npx wrangler login

***REMOVED*** 3. Create the R2 fallback bucket
npx wrangler r2 bucket create media-failover-fallback
npx wrangler r2 bucket create media-failover-fallback-preview

***REMOVED*** 4. Create the KV namespace for hot-reloadable config
npx wrangler kv namespace create MEDIA_CONFIG_KV
***REMOVED***   Copy the `id` from the output into wrangler.toml's kv_namespaces.id

***REMOVED*** 5. Edit wrangler.toml — replace placeholder values:
***REMOVED***    - KV namespace id
***REMOVED***    - Cloudinary cloud name in baseUrl
***REMOVED***    - ImageKit ID in baseUrl
***REMOVED***    - TwicPics subdomain in baseUrl
***REMOVED***    - Uncomment `routes` once you've added media.clicktaketech.com to Cloudflare DNS

***REMOVED*** 6. Deploy
npm run deploy

***REMOVED*** 7. (Optional) Add a custom domain in the Cloudflare dashboard:
***REMOVED***    Workers & Pages → media-failover → Triggers → Add Custom Domain
```

***REMOVED******REMOVED*** Updating the Provider Chain (without redeploying)

Edit the live provider chain via KV — useful for emergency failover or for adding a new CDN without a code deploy:

```bash
npx wrangler kv key put --binding=MEDIA_CONFIG_KV "providerChain" '{
  "providers": [
    { "id": "cloudinary", "priority": 1, "baseUrl": "https://res.cloudinary.com/mycloud/image/fetch" },
    { "id": "cloudflare", "priority": 2, "baseUrl": "https://imagedelivery.net" }
  ]
}'
```

The Worker checks KV first; if absent, falls back to the `MEDIA_CONFIG` env var baked into the deploy.

***REMOVED******REMOVED*** Health Check

```bash
curl https://media-failover.<your-subdomain>.workers.dev/__health
***REMOVED*** → { "ok": true, "providers": ["cloudflare","cloudinary","imagekit","uploadcare","twicpics"], "r2Fallback": true, "ts": 1737... }
```

***REMOVED******REMOVED*** Observability

- `wrangler tail` — stream live logs (provider tried, latency, fallback hits).
- Cloudflare dashboard → Workers → media-failover → Metrics for request volume, error rate, CPU time.
- The Worker sets `x-cdn-provider` and `x-cdn-fallback: true` response headers — useful for log analysis.

***REMOVED******REMOVED*** Sync with the Next.js Admin Panel

The admin panel at `/admin/providers` shows the **app-side** provider chain (used by `src/lib/providers/media/index.ts` for direct image URLs in HTML). This Worker is the **edge-side** chain (used when serving images through `media.clicktaketech.com`).

When you change CDN priorities in the admin panel, also update the Worker's KV config so the two stay in sync. A future enhancement will add a `/api/admin/providers/sync-worker` route that pushes the DB config to KV automatically.
