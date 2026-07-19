# Operations Runbook — ClickTake Technologies

**Version:** 3.0 (Phase 3)
**Last updated:** 2026-07-20
**Applies to:** ClickTake Next.js app + Cloudflare Pages/Workers + multi-provider storage/email/media

This runbook covers everything an on-call engineer needs to deploy, operate, and recover the ClickTake site. Keep it next to your paging dashboard.

---

## 1. Architecture at a Glance

```
                    ┌─────────────────────────────────────────────────────┐
                    │              Cloudflare Global Network               │
                    │                                                      │
   Users  ───────► │  clicktaketech.com  ──►  clicktake-web (Next.js)     │
                    │  media.clicktaketech.com  ──►  media-failover (Wkr)  │
                    │                                                      │
                    │  Cron (every 5 min)  ──►  /api/cron/provider-health │
                    └────────────┬─────────────────────────────────────────┘
                                 │
            ┌────────────────────┼──────────────────────────┐
            ▼                    ▼                          ▼
      Supabase Postgres    R2 + B2 + Cloudinary     Resend/Brevo/SMTP +
      (DATABASE_URL)       (storage chain)          Mailgun/Mailjet/etc.
                                 │                          │
                                 ▼                          ▼
                          Cloudflare Images +         Forwarded to inbox
                          Cloudinary + ImageKit +
                          Uploadcare + TwicPics
                          (media CDN chain)
```

**Three independent Worker deployments:**

1. `clicktake-web` — the Next.js app (Workers + static assets via OpenNext).
2. `media-failover` — the media CDN router (`workers/cloudflare/`).
3. `provider-health` cron — runs INSIDE `clicktake-web` on the `*/5 * * * *` schedule.

---

## 2. Daily Operations

### 2.1 Check system health (no login)

```bash
# 1. Worker liveness (returns 200 OK)
curl -sf https://clicktaketech.com/api/health || echo "❌ app down"

# 2. Media CDN liveness
curl -sf https://media-failover.<your-sub>.workers.dev/__health | jq

# 3. Cron recent result (admin only)
curl -sf -H "Cookie: next-auth.session-token=..." \
  https://clicktaketech.com/api/admin/providers/health | jq '.summary'
```

### 2.2 Stream live logs

```bash
# App logs
bun run tail                       # = wrangler tail clicktake-web

# Media CDN logs
cd workers/cloudflare && bunx wrangler tail
```

### 2.3 View email delivery log

Open `/admin/email` in the admin panel. Every send (success + failure) is recorded in the `EmailLog` table with `providerId`, `messageId`, `errorMessage`, and timestamp.

---

## 3. Deployment

### 3.1 First-time setup (one-time)

```bash
# 1. Install deploy tooling
bun add -D @opennextjs/cloudflare wrangler

# 2. Authenticate
bunx wrangler login

# 3. Create R2 buckets
bunx wrangler r2 bucket create clicktake-media
bunx wrangler r2 bucket create media-failover-fallback

# 4. Create KV namespace for hot-reloadable media CDN config
bunx wrangler kv namespace create MEDIA_CONFIG_KV
#   → Copy the `id` into workers/cloudflare/wrangler.toml

# 5. Set production secrets (interactive — prompts for each value)
bunx wrangler secret put DATABASE_URL
bunx wrangler secret put NEXTAUTH_SECRET
bunx wrangler secret put NEXTAUTH_URL
bunx wrangler secret put PROVIDER_CREDENTIALS_ENCRYPTION_KEY
bunx wrangler secret put CRON_SECRET
bunx wrangler secret put MAIL_FROM
bunx wrangler secret put PROVIDER_ALERT_TO

# 6. Generate the encryption key (paste into the prompt above)
openssl rand -hex 32

# 7. Generate the NEXTAUTH_SECRET
openssl rand -base64 32

# 8. Generate the CRON_SECRET (shared secret for the health-check cron)
openssl rand -hex 24

# 9. Push Prisma schema to Supabase Postgres
bun run db:push

# 10. Seed the initial super-admin
bunx tsx scripts/seed-admin.ts
```

### 3.2 Routine deploy

```bash
# From the project root:
bun run deploy:cloudflare         # builds + deploys to production
bun run deploy:staging            # builds + deploys to staging env
bun run deploy:worker             # deploys the media CDN failover Worker

# Or via Cloudflare Pages CI (auto on push to main):
#   1. Set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID in GitHub Actions secrets
#   2. Build command: bun install && bun run build:cloudflare
#   3. Deploy command: bunx wrangler deploy
```

### 3.3 Rollback

Cloudflare Workers keep the last 10 deployments. Rollback via:

```bash
# List recent versions
bunx wrangler deployments list

# Rollback to the previous version
bunx wrangler rollback              # interactive picker
```

For the media Worker:

```bash
cd workers/cloudflare && bunx wrangler rollback
```

### 3.4 Database migrations (Supabase Postgres)

```bash
# Create a migration from schema changes
bun run db:migrate -- --name phase3_provider_tables

# Apply migrations to production
DATABASE_URL="<prod-connection-string>" bunx prisma migrate deploy
```

> ⚠️ **Never run `prisma migrate reset` against production.** It drops all data.

---

## 4. Provider Operations

### 4.1 Add a new email provider

1. Log in to `/admin/providers`.
2. Click **Email** tab → **Add Provider**.
3. Select provider type (e.g., "Brevo").
4. Fill in API key + sender domain.
5. Click **Test Connection** — should return `{ ok: true }`.
6. Set priority (1 = highest, tried first).
7. Save.

The registry refreshes automatically on save — no deploy needed.

### 4.2 Emergency: disable a failing provider

```bash
# Option A — via admin UI (preferred)
#   /admin/providers → click the toggle on the provider row

# Option B — via API (admin token required)
curl -X PATCH https://clicktaketech.com/api/admin/providers/<id> \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"isActive": false}'
```

The chain re-evaluates on the next request. The disabled provider is skipped; its cooldown timer is cleared.

### 4.3 Force-refresh the registry (after DB changes outside the UI)

```bash
curl -X POST https://clicktaketech.com/api/admin/providers/failover \
  -H "Cookie: next-auth.session-token=..."
```

Returns the new snapshot:

```json
{
  "snapshot": {
    "lastRefreshedAt": "2026-07-20T12:34:56.789Z",
    "media": ["cloudflare", "cloudinary"],
    "storage": ["cloudflare-r2", "backblaze-b2"],
    "email": ["brevo", "mailgun", "smtp"]
  }
}
```

### 4.4 Migrate `/public/` assets to R2/Cloudinary

```bash
# Dry-run first
bun run migrate:media

# If the output looks right, actually upload
bun run migrate:media:commit

# To namespace keys under "legacy/" (recommended for first migration)
bunx tsx scripts/migrate-public-to-storage.ts --commit --prefix "legacy/"

# To also delete the local files after successful upload
bunx tsx scripts/migrate-public-to-storage.ts --commit --delete
```

After migration, replace any `<img src="/foo.png">` references in code with the returned CDN URL — or better, use the `getMediaUrl(key)` helper from `@/lib/providers` so the runtime chain handles failover.

### 4.5 Update the media CDN Worker chain (without redeploying)

```bash
cd workers/cloudflare

# Update the KV key — takes effect on the next request
bunx wrangler kv key put --binding=MEDIA_CONFIG_KV "providerChain" '{
  "providers": [
    { "id": "cloudinary", "priority": 1, "baseUrl": "https://res.cloudinary.com/<cloud>/image/fetch" },
    { "id": "cloudflare", "priority": 2, "baseUrl": "https://imagedelivery.net" }
  ]
}'
```

The Worker checks KV first; absent that, falls back to the `MEDIA_CONFIG` env var baked into the deploy.

---

## 5. Incident Response

### 5.1 "No emails are going out"

```
1. Check /admin/providers → Email tab
   - Are all providers "Down" or "Degraded"?
   - Are any in cooldown (cooldownUntil > now)?

2. Check /admin/email → Logs tab
   - Are recent sends logging "failed"?
   - What's the errorMessage?

3. If all email providers are down:
   a. Emergency: re-enable SMTP fallback (lowest priority, never disabled)
   b. Or: add a new provider with fresh credentials
   c. Force-refresh: POST /api/admin/providers/failover

4. Verify with a test send:
   /admin/email → Send Test → your inbox

5. If only ONE provider is down (others healthy):
   - The chain should have failed over automatically.
   - Confirm /api/cron/provider-health fired an alert email.
   - Mark the provider as inactive in the UI to skip its cooldown retries.
```

### 5.2 "Images are broken"

```
1. Check the media CDN Worker:
   curl https://media-failover.<sub>.workers.dev/__health
   → Should return ok:true with all providers listed

2. If the Worker is up but images still broken:
   - Inspect response headers on a broken image:
     curl -I https://media.clicktaketech.com/foo.jpg
     → Look for x-cdn-provider and x-cdn-fallback

   - If x-cdn-fallback: true → ALL CDNs failed, R2 is serving
     → Check R2 bucket for the missing object
     → Re-upload via `bun run migrate:media:commit`

   - If 502 "All media CDN providers failed":
     → All CDNs AND R2 are missing the file
     → Check the StorageObject table: is the key recorded?
     → Re-upload from backup or original source

3. If only ONE CDN is having issues:
   - Edit the KV chain (Section 4.5) to move it to the bottom
   - Or set its priority to 99 via /admin/providers
```

### 5.3 "Site is down / 5xx on every page"

```
1. Check Cloudflare status: https://www.cloudflarestatus.com
2. Check Supabase status:    https://status.supabase.com
3. Stream app logs:          bun run tail
4. Common causes:
   a. DATABASE_URL unreachable → Supabase project paused?
      Fix: bump Supabase plan or unpause via dashboard
   b. ProviderHealth table missing → migration didn't run
      Fix: bun run db:push
   c. Encryption key mismatch (after secret rotation):
      Symptoms: "Unsupported state or unable to authenticate data"
      Fix: roll back the secret OR re-encrypt all provider creds
           (write a one-off script using decryptCredentials + encryptCredentials
            with old key, then new key)
   d. Worker exceeded CPU limit (50ms):
      Fix: optimize the route — check /api routes for expensive operations
5. Rollback if needed:
   bunx wrangler rollback
```

### 5.4 "Admin can't log in"

```
1. Try /admin/login → enter credentials
2. If "Invalid email or password":
   a. Verify the admin user exists:
      sqlite3 dev.db "SELECT email FROM AdminUser WHERE email='admin@clicktaketech.com';"
      (OR for prod: query Supabase via dashboard SQL editor)
   b. Reset password:
      bunx tsx -e "
        import { prisma } from './src/lib/db';
        import bcrypt from 'bcryptjs';
        const hash = await bcrypt.hash('NewPassword123', 10);
        await prisma.adminUser.update({ where: { email: 'admin@clicktaketech.com' }, data: { passwordHash: hash } });
        console.log('Password reset');
      "
3. If "useSearchParams() should be wrapped in Suspense":
   - This was a Phase 2 closeout fix; verify /admin/login/page.tsx has the wrapper
4. If NEXTAUTH_URL mismatch:
   - Set NEXTAUTH_URL to the exact production URL (https://clicktaketech.com)
```

### 5.5 "Cron health checks stopped"

```
1. Verify the cron is registered:
   bunx wrangler triggers list

2. Verify CRON_SECRET matches between wrangler secrets and the route
   - The route /api/cron/provider-health expects Authorization: Bearer <CRON_SECRET>
   - Cloudflare Cron sends X-Cf-Cron: 1 (no secret)
   - If both checks fail → 401

3. Manually trigger a run:
   curl -X POST https://clicktaketech.com/api/cron/provider-health \
     -H "Authorization: Bearer $CRON_SECRET"

4. Check the response: should be { checked: N, healthy: N, ... }
   - checked: 0 → registry is empty → add providers via /admin/providers
```

---

## 6. Backup & Recovery

### 6.1 Daily backups (automated)

- **Supabase Postgres** — automatic daily backups retained 7 days (free tier) / 30 days (Pro). Restore via Supabase dashboard.
- **R2 bucket** — versioning enabled by default. Restore via `wrangler r2 object get`.
- **B2 bucket** — lifecycle rules retain deleted files for 30 days. Restore via Backblaze dashboard.
- **Cloudinary** — no automatic backup. Use the `migrate:media:commit` script to re-push from `/public/` if needed.

### 6.2 Manual full backup

```bash
# 1. DB snapshot
pg_dump "$DATABASE_URL" > backups/db-$(date +%Y%m%d).sql

# 2. R2 bucket sync to local
bunx wrangler r2 object list clicktake-media --remote-path / | \
  xargs -I {} bunx wrangler r2 object get clicktake-media/{}

# 3. Provider configs (encrypted creds + config JSON)
sqlite3 dev.db "SELECT * FROM provider_config;" > backups/providers-$(date +%Y%m%d).sql
# (OR for prod: SELECT * FROM provider_config; in Supabase SQL editor)
```

### 6.3 Disaster recovery

If the entire production database is lost:

1. Create a new Supabase project (or restore from daily backup).
2. Update `DATABASE_URL` wrangler secret: `bunx wrangler secret put DATABASE_URL`
3. Run `bunx prisma migrate deploy` to recreate schema.
4. Restore provider configs from `backups/providers-*.sql`.
5. Re-encrypt credentials (the old `PROVIDER_CREDENTIALS_ENCRYPTION_KEY` must match — if lost, you must re-enter all provider credentials via the admin panel).
6. Redeploy: `bun run deploy:cloudflare`

---

## 7. Security

### 7.1 Rotate the encryption key

```bash
# 1. Generate new key
NEW_KEY=$(openssl rand -hex 32)

# 2. Run rotation script (decrypts with OLD_KEY, re-encrypts with NEW_KEY)
#    Write a one-off script:
PROVIDER_CREDENTIALS_ENCRYPTION_KEY=$OLD_KEY bunx tsx scripts/rotate-encryption-key.ts $NEW_KEY

# 3. Update wrangler secret
bunx wrangler secret put PROVIDER_CREDENTIALS_ENCRYPTION_KEY
#    (paste NEW_KEY when prompted)

# 4. Verify by testing one provider via /admin/providers → Test
```

### 7.2 Rotate NEXTAUTH_SECRET

⚠️ Rotating NEXTAUTH_SECRET invalidates ALL active admin sessions — every user gets logged out.

```bash
bunx wrangler secret put NEXTAUTH_SECRET
# No redeploy needed — Workers pick up new secrets on next request
```

### 7.3 Audit log

Every provider create/update/delete is recorded in the `AuditLog` table (filter by `action LIKE 'provider.%'`). Accessible via `/admin/audit`.

---

## 8. Performance Tuning

### 8.1 Worker CPU budget

Each Worker invocation has a 50ms CPU limit. If you see `exceededCPU` in logs:

- Move heavy work into queues (use Cloudflare Queues binding).
- Cache aggressively — the Worker runtime survives between requests within the same isolate.
- Offload image transforms to the media CDN (don't do sharp inside the Worker).

### 8.2 Database connection pooling

Supabase provides PgBouncer on port 6543. Use that for the connection string in production:

```
postgresql://postgres.<project>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true
```

Add `?pgbouncer=true&connection_limit=1` to the `DATABASE_URL` for Workers (they share isolates).

### 8.3 Edge caching

The media Worker sets `s-maxage=604800` (1 week at the CDN edge). To bust the cache:

```bash
# Purge by URL
curl -X POST "https://api.cloudflare.com/client/v4/zones/<zone_id>/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"files": ["https://media.clicktaketech.com/foo.jpg"]}'
```

---

## 9. Useful Commands Cheatsheet

| Task | Command |
|------|---------|
| Deploy app to prod | `bun run deploy:cloudflare` |
| Deploy media Worker | `bun run deploy:worker` |
| Stream app logs | `bun run tail` |
| Rollback app | `bunx wrangler rollback` |
| Push DB schema | `bun run db:push` |
| Run integration tests | `bun run test:integration` |
| Migrate /public → R2 | `bun run migrate:media:commit` |
| Generate encryption key | `openssl rand -hex 32` |
| Set a wrangler secret | `bunx wrangler secret put <NAME>` |
| List recent deploys | `bunx wrangler deployments list` |
| Force-refresh provider registry | `POST /api/admin/providers/failover` |
| Trigger health cron manually | `POST /api/cron/provider-health` (with Bearer token) |
| Inspect provider health | `GET /api/admin/providers/health` |

---

## 10. Contacts & Escalation

| Layer | Owner | Escalation |
|-------|-------|------------|
| App (Next.js) | Dev team | #eng-oncall Slack |
| Cloudflare (Workers/Pages/R2) | DevOps | Cloudflare support (Enterprise plan) |
| Supabase (DB) | DevOps | Supabase support |
| Email provider outage | DevOps | Provider status page + failover chain |
| DNS / domain | DevOps | Cloudflare dashboard → DNS |

**Paging rule:** any alert from `/api/cron/provider-health` with `newStatus: "down"` pages the on-call engineer.

---

## 11. Postmortem Template

After any incident, fill this in within 48 hours and link it from the audit log:

```markdown
## [Date] — [Short title]

**Impact:** [What users experienced, duration, blast radius]
**Root cause:** [Technical root cause]
**Trigger:** [What event started it]
**Detection:** [How we found out — alert? user report? cron?]
**Resolution:** [What we did to fix it]
**Time to detect (TTD):** [N minutes]
**Time to resolve (TTR):** [N minutes]
**Action items:**
- [ ] [Concrete next step, owner, due date]
- [ ] ...

**Lessons:**
- [What went well]
- [What went poorly]
- [Where we got lucky]
```

Append to `/home/z/my-project/download/incidents/` (create directory on first use).
