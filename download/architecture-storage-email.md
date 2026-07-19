# ClickTake Technologies — Storage & Email Architecture

> **Version**: 1.0  
> **Last updated**: 2026-07-19  
> **Scope**: Media optimization CDNs, object storage, and email services for the ClickTake Next.js 16 platform  
> **Design principle**: Provider-agnostic adapters with admin-configurable failover chains — no code redeploy to switch providers.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Media Optimization & CDNs](#2-media-optimization--cdns)
   - 2.1 Provider Matrix
   - 2.2 Cloudflare Configuration (Full Switch vs Failover)
   - 2.3 Media Adapter Interface
   - 2.4 Admin Panel UI
3. [Object Storage](#3-object-storage)
   - 3.1 Provider Matrix
   - 3.2 Recommended Strategy (R2 + B2 + Cloudinary)
   - 3.3 Storage Adapter Interface
   - 3.4 Failover & Replication
4. [Email Services](#4-email-services)
   - 4.1 Provider Matrix (11 providers)
   - 4.2 Admin-Configurable Provider Chain
   - 4.3 Email Adapter Interface
   - 4.4 Failover Logic
   - 4.5 Admin Panel UI
5. [Database Schema Additions](#5-database-schema-additions)
6. [Environment Variables](#6-environment-variables)
7. [Deployment Notes](#7-deployment-notes)
8. [Migration Path](#8-migration-path)

---

## 1. Architecture Overview

The ClickTake platform uses a **multi-provider adapter pattern** for storage and email. The system has three abstraction layers:

```
┌─────────────────────────────────────────────────────────────────┐
│  Admin Panel (src/app/admin/settings)                           │
│  - Provider dropdown selection                                  │
│  - Per-provider credentials                                     │
│  - Failover chain ordering                                      │
│  - Usage analytics & health checks                              │
└────────────────────────┬────────────────────────────────────────┘
                         │ reads/writes
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Provider Registry (src/lib/providers/registry.ts)              │
│  - Holds all configured adapters                                 │
│  - Routes calls to active provider                              │
│  - Triggers failover on error                                   │
│  - Logs usage to ProviderUsage table                            │
└────────────────────────┬────────────────────────────────────────┘
                         │ invokes
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Adapters (src/lib/providers/*)                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Media CDN    │  │ Object Store │  │ Email Provider       │  │
│  │ - Cloudflare │  │ - R2         │  │ - SMTP / Brevo       │  │
│  │ - Cloudinary │  │ - B2         │  │ - Mailgun / Mailjet  │  │
│  │ - ImageKit   │  │ - Cloudinary │  │ - Elastic / Zoho     │  │
│  │ - Uploadcare │  │ - Supabase   │  │ - Zepto / Mailtrap   │  │
│  │ - TwicPics   │  │              │  │ - MailerLite / Sender│  │
│  │              │  │              │  │ - CF Email Routing   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Design rules:**
- All providers implement a common TypeScript interface
- Provider selection is **runtime-configurable** via admin panel (no redeploy)
- Every outbound call is wrapped in retry + failover logic
- Credentials are stored encrypted in the database (Settings table)
- Health-check cron job pings each configured provider every 5 min

---

## 2. Media Optimization & CDNs

### 2.1 Provider Matrix

| Provider | Free Tier | Optimization Features | Edge Network | Best For |
|---|---|---|---|---|
| **Cloudflare Images** | 100k images/mo ($5 flat) | Polish, Mirage, Smart Resize, AVIF/WebP | 300+ cities (incl. Karachi, Lahore, Dubai, London, NYC) | Tight CF integration, failover target |
| **Cloudinary** | 25 credits/mo (~25k transformations) | AI-powered transforms, video, lazy loading, responsive breakpoints | Multi-CDN (Akamai+Fastly+CloudFront) | Rich media, video, AI crops |
| **ImageKit** | 20GB bandwidth, 2GB storage, 2k transformations/mo | Real-time URL transforms, AI background removal | AWS CloudFront | General purpose, dev-friendly |
| **Uploadcare** | 3GB storage, 3k transformations/mo, 500 uploads/mo | Adaptive compression, smart crop, AI face detection | AWS CloudFront | Uploads + transforms |
| **TwicPics** | 1TB bandwidth, 25k transformations/mo | AI-driven responsive images, context-aware | Multi-CDN | E-commerce, retail |

### 2.2 Cloudflare Configuration (Full Switch vs Failover)

The Cloudflare media layer supports two modes — switchable from the admin panel without code changes.

#### Mode 1: Full Switch (all media via Cloudflare)

All image URLs in the app rewrite to `https://images.clicktaketech.com/<key>?width=…&height=…&format=auto`. A Cloudflare Worker intercepts requests and applies:

- **Polish**: lossless/lossy compression → AVIF/WebP fallback
- **Mirage**: device-aware resizing for mobile
- **Smart Resize**: server-side resizing per URL params
- **Cache TTL**: 1 year on assets, 5 min on HTML

**Worker config:**

```js
// Cloudflare Worker — images.clicktaketech.com
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const upstream = `${env.R2_BUCKET_URL}${url.pathname}`;

    // Polish + Mirage headers
    const headers = new Headers(req.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    const response = await fetch(upstream, {
      cf: {
        image: {
          width: Number(url.searchParams.get('width')) || undefined,
          height: Number(url.searchParams.get('height')) || undefined,
          fit: url.searchParams.get('fit') || 'scale-down',
          format: 'auto',         // AVIF → WebP → JPEG
          quality: url.searchParams.get('q') || '85',
          polish: 'lossless',
          mirage: true,
        },
        cacheEverything: true,
        cacheTtl: 31536000,
      },
      headers,
    });

    return response;
  },
};
```

#### Mode 2: Failover (primary → Cloudflare)

A Cloudflare Worker sits in front of the primary CDN (Cloudinary/ImageKit/etc.). On 5xx errors or timeout (2s), it transparently rewrites the request to Cloudflare Images backed by R2.

```js
// Cloudflare Worker — failover router at media.clicktaketech.com
const PRIMARY = 'https://res.cloudinary.com/clicktake';
const FALLBACK = 'https://images.clicktaketech.com';   // CF Images
const ERROR_THRESHOLD = 3;
const errorCounts = new Map();   // edge-region error counter

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const region = req.cf?.colo || 'unknown';
    const errors = errorCounts.get(region) || 0;

    const upstream = errors >= ERROR_THRESHOLD ? FALLBACK : PRIMARY;

    try {
      const res = await fetch(`${upstream}${url.pathname}${url.search}`, {
        cf: { cacheEverything: true, cacheTtl: 86400 },
        signal: AbortSignal.timeout(2000),
      });

      if (res.status >= 500) {
        errorCounts.set(region, errors + 1);
        // Retry once on fallback
        return fetch(`${FALLBACK}${url.pathname}${url.search}`);
      }
      errorCounts.set(region, 0);
      return res;
    } catch (err) {
      errorCounts.set(region, errors + 1);
      return fetch(`${FALLBACK}${url.pathname}${url.search}`);
    }
  },
};
```

**Failover triggers:**
- HTTP 5xx from primary ≥ 3 in 60s window (per edge region)
- Timeout (no response in 2s)
- DNS failure on primary hostname
- Admin panel "force failover" toggle

**Recovery:**
- Health-check Worker pings primary every 60s
- After 3 consecutive successes, error counter resets, traffic returns to primary
- Admin receives Slack/email alert on every failover event

### 2.3 Media Adapter Interface

```typescript
// src/lib/providers/media/types.ts
export interface ImageTransforms {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'scale-down' | 'crop';
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  quality?: number;        // 1-100
  blur?: number;
  sharpen?: number;
  gravity?: 'auto' | 'face' | 'center';
}

export interface MediaProvider {
  readonly id: string;
  readonly displayName: string;

  /** Returns a URL that delivers the image with transforms applied. */
  getUrl(key: string, transforms?: ImageTransforms): string;

  /** Uploads an image to the provider's storage. */
  upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }>;

  /** Pings the provider's health endpoint. */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }>;

  /** Returns quota usage for the current billing period. */
  getUsage(): Promise<{ bandwidthBytes: number; transformCount: number; storageBytes: number }>;
}
```

**Adapter files:**
```
src/lib/providers/media/
├── types.ts
├── cloudflare.ts        # Cloudflare Images adapter
├── cloudinary.ts        # Cloudinary adapter
├── imagekit.ts          # ImageKit adapter
├── uploadcare.ts        # Uploadcare adapter
├── twicpics.ts          # TwicPics adapter
├── registry.ts          # selects active provider + handles failover
└── index.ts             # public API: getMediaUrl(), uploadImage()
```

### 2.4 Admin Panel UI

**Path**: `/admin/settings` → "Media & CDN" tab

```
┌─────────────────────────────────────────────────────────────────┐
│  Media & CDN Configuration                                       │
├─────────────────────────────────────────────────────────────────┤
│  Mode:  (•) Full Switch   ( ) Failover                          │
│                                                                  │
│  ─── Primary Provider ───                                        │
│  Provider: [Cloudflare Images ▾]                                 │
│  Status:  ● Healthy  (45ms latency)                              │
│  Usage this month:  2.4M / 100k requests                         │
│                                                                  │
│  Credentials:                                                    │
│  Account Hash:   [______________________]                        │
│  API Token:      [______________________]                        │
│  Custom Domain:  [images.clicktaketech.com]                      │
│                                                                  │
│  ─── Failover Chain (if Failover mode) ───                       │
│  1. Primary:  [Cloudinary ▾]                                     │
│  2. Backup 1: [Cloudflare Images ▾]                              │
│  3. Backup 2: [ImageKit ▾]                                       │
│                                                                  │
│  [Test Connection]   [Save]   [Force Failover Test]              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Object Storage

### 3.1 Provider Matrix

| Provider | Free Tier | Egress Cost | Region | Bandwidth Alliance | Use Case |
|---|---|---|---|---|---|
| **Cloudflare R2** | 10GB storage, 1M Class A ops/mo, 10M Class B ops/mo | **$0 (zero egress)** | Global (multi-region) | N/A (native CF) | Primary hot media — best cost |
| **Backblaze B2** | 10GB storage, 1GB/day egress | Free to Cloudflare (Bandwidth Alliance) | US, EU | Yes — paired with CF | Backup / cold storage |
| **Cloudinary** | 25 credits/mo (~25 GB storage) | Metered | Multi-CDN | No | Transformed/processed media |
| **Supabase Storage** (existing) | 1GB storage, 2GB bandwidth | Metered | Single region | No | User-uploaded avatars, small files |

### 3.2 Recommended Strategy

**Three-tier storage layout:**

| Tier | Provider | Purpose | Why |
|---|---|---|---|
| **Hot** (primary) | Cloudflare R2 | All website media — hero images, portfolio, blog covers | Zero egress = no bill shock; native CF CDN caching |
| **Warm** (backup) | Backblaze B2 | Replicated copy of every R2 object | Free egress to CF, durable, 99.9% durability |
| **Transformed** | Cloudinary | AI-transformed variants (smart crops, format conversion) | On-the-fly transform pipeline, video support |

**Why this combination wins on cost:**

- Cloudflare R2 has **zero egress** → no bandwidth bill ever (within free tier)
- Backblaze B2 + Cloudflare = **Bandwidth Alliance** → B2 egress to CF is free
- Cloudinary free tier covers ~25k transforms/mo — plenty for a marketing site
- Combined free storage: **20GB across R2 + B2** + 25GB Cloudinary = **45GB free**

### 3.3 Storage Adapter Interface

```typescript
// src/lib/providers/storage/types.ts
export interface StorageProvider {
  readonly id: string;
  readonly displayName: string;

  /** Uploads a file. Returns the storage key + size. */
  upload(file: Buffer, key: string, contentType: string, metadata?: Record<string, string>): Promise<UploadResult>;

  /** Downloads a file as a Buffer. */
  get(key: string): Promise<Buffer>;

  /** Returns a signed or public URL for the file. */
  getUrl(key: string, options?: { expiresIn?: number }): Promise<string>;

  /** Deletes a file. */
  delete(key: string): Promise<void>;

  /** Lists files with optional prefix. */
  list(prefix?: string, limit?: number): Promise<StorageObject[]>;

  /** Health check. */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number }>;

  /** Quota usage. */
  getUsage(): Promise<{ storageBytes: number; objectCount: number }>;
}

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  etag?: string;
  replicatedTo?: string[];   // for multi-region replication
}
```

**Adapter files:**

```
src/lib/providers/storage/
├── types.ts
├── r2.ts                # Cloudflare R2 adapter (S3-compatible API)
├── b2.ts                # Backblaze B2 adapter (S3-compatible API)
├── cloudinary.ts        # Cloudinary storage adapter
├── supabase.ts          # Supabase Storage adapter (existing fallback)
├── replicator.ts        # async replication R2 → B2
├── registry.ts          # active provider + replication orchestrator
└── index.ts             # public API: upload(), get(), delete()
```

### 3.4 Failover & Replication

**Read failover:**

```typescript
// pseudocode — src/lib/providers/storage/registry.ts
export async function getWithFailover(key: string): Promise<Buffer> {
  const providers = registry.getActiveChain();   // [R2, B2, Supabase]
  for (const p of providers) {
    try {
      return await p.get(key);
    } catch (err) {
      log.warn({ provider: p.id, err }, 'storage read failed, trying next');
    }
  }
  throw new Error('All storage providers failed for key: ' + key);
}
```

**Write replication (R2 → B2):**

```typescript
// On every successful R2 upload, queue a B2 replication job
export async function upload(file: Buffer, key: string, contentType: string) {
  const primary = registry.getPrimary();   // R2
  const result = await primary.upload(file, key, contentType);

  // Fire-and-forget replication
  await replicator.queueReplicate(key, file, contentType);
  return result;
}

// Replication worker (runs in background, retried 3x on failure)
async function replicateToB2(key: string, file: Buffer, contentType: string) {
  if (!replicationEnabled) return;
  try {
    await b2Provider.upload(file, key, contentType);
    await db.storageObject.update({ where: { key }, data: { replicatedTo: ['R2', 'B2'] } });
  } catch (err) {
    log.error({ key, err }, 'B2 replication failed, will retry');
    await replicator.retry(key, 3);
  }
}
```

**Health check cron:**
- Every 5 min: `healthCheck()` on each configured provider
- Results stored in `ProviderHealth` table
- 3 consecutive failures → provider marked `degraded`, alerts admin
- 10 consecutive failures → provider marked `down`, removed from rotation

---

## 4. Email Services

### 4.1 Provider Matrix

| Provider | Free Tier | Best For | Type | Notes |
|---|---|---|---|---|
| **Mailtrap** | 1000 emails/mo | Dev/testing | SMTP + API | Sandbox mode for staging |
| **SMTP (custom)** | N/A | Self-hosted / corporate | SMTP | Bring-your-own server |
| **Brevo** (formerly Sendinblue) | 300 emails/day (~9k/mo) | Marketing + transactional | SMTP + API | Most generous free tier |
| **Mailgun** | 100/day on trial, then pay-as-you-go | Transactional | API + SMTP | Best deliverability |
| **Elastic Email** | 100/day (~3k/mo) | Bulk/marketing | API | Low cost for high volume |
| **Mailjet** | 200/day (~6k/mo) | Marketing + transactional | API + SMTP | Good EU deliverability |
| **Cloudflare Email Routing** | Unlimited forwards | Forwarding only | Routing | Free, but no sending — for inbound |
| **Zoho Mail** | 5 users free (5GB each) | Business email | SMTP + IMAP | Custom domain email hosting |
| **ZeptoMail** | 10k emails trial credit | Transactional | API | Zoho's transactional arm |
| **MailerLite** | 1000 subscribers, 12k/mo | Newsletters | API | Best for marketing lists |
| **Sender** | 2500 subscribers, 15k/mo | Marketing automation | API | Most generous subscriber tier |

### 4.2 Admin-Configurable Provider Chain

The admin panel lets you configure **up to 5 email providers in a failover chain**. The system tries them in order until one succeeds.

**Use case examples:**

| Scenario | Chain |
|---|---|
| **Production (transactional)** | Brevo → Mailgun → SMTP |
| **Production (marketing/newsletter)** | MailerLite → Sender → Brevo |
| **Development / staging** | Mailtrap → console log |
| **Backup email hosting** | Zoho (SMTP) → Cloudflare Email Routing (forwarding) |

### 4.3 Email Adapter Interface

```typescript
// src/lib/providers/email/types.ts
export interface EmailProvider {
  readonly id: string;
  readonly displayName: string;
  readonly supportedFeatures: EmailFeature[];

  /** Sends an email. */
  send(params: SendEmailParams): Promise<SendResult>;

  /** Verifies credentials are valid. */
  testConnection(): Promise<TestResult>;

  /** Returns current quota usage. */
  getQuota(): Promise<EmailQuota>;

  /** Health check (lighter than testConnection). */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number }>;
}

export interface SendEmailParams {
  to: string | string[];
  cc?: string[];
  bcc?: string[];
  from: string;            // must match provider's verified domain
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;           // plain-text fallback
  attachments?: EmailAttachment[];
  tags?: string[];         // for analytics grouping
  metadata?: Record<string, string>;
}

export interface SendResult {
  messageId: string;       // provider's ID
  providerId: string;
  accepted: boolean;
  rejected?: string[];
}

export type EmailFeature =
  | 'transactional'
  | 'marketing'
  | 'attachments'
  | 'templates'
  | 'tracking'
  | 'inbound-forwarding';
```

**Adapter files:**

```
src/lib/providers/email/
├── types.ts
├── smtp.ts              # generic SMTP adapter (works with Mailtrap, Zoho, Brevo SMTP, custom)
├── brevo.ts             # Brevo API adapter
├── mailgun.ts           # Mailgun API adapter
├── elastic-email.ts     # Elastic Email API adapter
├── mailjet.ts           # Mailjet API adapter
├── cloudflare-routing.ts # Cloudflare Email Routing (inbound forwarding)
├── zoho.ts              # Zoho Mail SMTP adapter
├── zeptomail.ts         # ZeptoMail API adapter
├── mailerlite.ts        # MailerLite API adapter
├── sender.ts            # Sender API adapter
├── mailtrap.ts          # Mailtrap API adapter
├── registry.ts          # provider chain + failover
└── index.ts             # public API: sendEmail(), testEmailProvider()
```

### 4.4 Failover Logic

```typescript
// src/lib/providers/email/registry.ts
export async function sendEmailWithFailover(params: SendEmailParams): Promise<SendResult> {
  const chain = registry.getActiveEmailChain();   // ordered list
  const errors: { providerId: string; error: string }[] = [];

  for (const provider of chain) {
    try {
      // Skip providers that are marked down
      if (registry.isDown(provider.id)) continue;

      const result = await Promise.race([
        provider.send(params),
        timeout(10000, `${provider.id} timeout`),
      ]);

      // Log success + reset error counter
      await registry.markHealthy(provider.id);
      await logEmailSend({ provider: provider.id, to: params.to, success: true });
      return result;
    } catch (err) {
      errors.push({ providerId: provider.id, error: String(err) });
      await registry.recordError(provider.id, err);

      // After 5 errors in 5 min, mark provider as down for 10 min
      if (registry.errorCount(provider.id, last5Min) >= 5) {
        await registry.markDown(provider.id, durationMin: 10);
        await alertAdmin(`Email provider ${provider.id} marked down`);
      }
      continue;
    }
  }

  // All providers failed — log + alert
  await logEmailSend({ success: false, errors, params });
  await alertAdmin('All email providers failed', { errors });
  throw new Error('Email delivery failed across all providers');
}
```

**Failover triggers:**

- HTTP 5xx / 4xx (except auth) → retry next provider
- Timeout (10s) → retry next provider
- Rate-limit (429) → skip to next, queue retry for next minute
- Auth error (401/403) → mark provider as misconfigured, alert admin
- 5 errors in 5 min → provider marked down for 10 min cooldown

### 4.5 Admin Panel UI

**Path**: `/admin/settings` → "Email" tab

```
┌─────────────────────────────────────────────────────────────────┐
│  Email Provider Configuration                                     │
├─────────────────────────────────────────────────────────────────┤
│  Active Chain (drag to reorder):                                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │ ⋮⋮ 1. Brevo (transactional)         ● Healthy    │ [Edit]    │
│  │     300/day — used today: 47                       │           │
│  ├──────────────────────────────────────────────────┤           │
│  │ ⋮⋮ 2. Mailgun (transactional)       ● Healthy    │ [Edit]    │
│  │     100/day — used today: 12                       │           │
│  ├──────────────────────────────────────────────────┤           │
│  │ ⋮⋮ 3. SMTP Custom (mail.clicktaketech.com) ● Degraded │ [Edit]│
│  │     Last error: Connection timeout (2 min ago)    │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  [+ Add Provider]                                                │
│                                                                  │
│  ─── Provider Catalog ───                                        │
│  [SMTP] [Brevo] [Mailgun] [Elastic Email] [Mailjet]              │
│  [Cloudflare Routing] [Zoho] [ZeptoMail] [MailerLite]            │
│  [Mailtrap] [Sender]                                             │
│                                                                  │
│  ─── Test Send ───                                               │
│  To:  [______________________]                                   │
│  Subject: [Test from ClickTake]                                  │
│  Body:    [______________]                                       │
│  Provider: [All in chain ▾]                                      │
│  [Send Test Email]                                               │
│                                                                  │
│  ─── Analytics (last 30 days) ───                                │
│  Sent: 1,247  Delivered: 1,238 (99.3%)  Bounced: 9              │
│  By provider:                                                    │
│    Brevo:     897 (97.8% delivery)                               │
│    Mailgun:   312 (99.4% delivery)                               │
│    SMTP:        38 (91.2% delivery)                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Database Schema Additions

Add the following models to `prisma/schema.prisma`:

```prisma
// ─────────────────────────────────────────────────────────────────
// Provider configuration & health tracking
// ─────────────────────────────────────────────────────────────────

model ProviderConfig {
  id              String   @id @default(cuid())
  category        String   // "media" | "storage" | "email"
  providerId      String   // "brevo" | "cloudflare-r2" | etc.
  displayName     String
  isActive        Boolean  @default(false)
  priority        Int      @default(0)   // lower = higher in failover chain
  credentials     String   @default("{}") // JSON, encrypted at rest
  config          String   @default("{}") // JSON, non-secret config (host, port, region, etc.)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([category, providerId])
  @@index([category, isActive, priority])
  @@map("provider_configs")
}

model ProviderHealth {
  id              String   @id @default(cuid())
  providerId      String
  category        String
  status          String   // "healthy" | "degraded" | "down"
  latencyMs       Int?
  lastCheckedAt   DateTime @default(now())
  lastError       String?
  errorCount5min  Int      @default(0)
  cooldownUntil   DateTime?

  @@index([providerId, lastCheckedAt])
  @@map("provider_health")
}

model ProviderUsage {
  id              String   @id @default(cuid())
  providerId      String
  category        String
  metric          String   // "requests" | "bandwidthBytes" | "storageBytes" | "emailSent"
  value           BigInt
  recordedAt      DateTime @default(now())

  @@index([providerId, metric, recordedAt])
  @@map("provider_usage")
}

model EmailLog {
  id              String   @id @default(cuid())
  messageId       String?  // provider's ID
  providerId      String
  toAddress       String
  subject         String
  status          String   // "sent" | "failed" | "bounced" | "deferred"
  errorMessage    String?
  metadata        String   @default("{}")
  sentAt          DateTime @default(now())

  @@index([providerId, sentAt])
  @@index([status, sentAt])
  @@map("email_logs")
}

model StorageObject {
  id              String   @id @default(cuid())
  key             String   @unique
  contentType     String
  sizeBytes       BigInt
  primaryProvider String   // "r2" | "b2" | "cloudinary" | "supabase"
  replicatedTo    String   @default("[]") // JSON array
  uploadedBy      String?
  metadata        String   @default("{}")
  createdAt       DateTime @default(now())

  @@index([primaryProvider])
  @@map("storage_objects")
}
```

---

## 6. Environment Variables

All provider credentials are **stored in the database** (encrypted), but the following base env vars are still required at boot time (for the very first provider before DB is populated):

```env
# ─── Storage: Cloudflare R2 (primary) ───
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=clicktake-media

# ─── Storage: Backblaze B2 (backup) ───
B2_APPLICATION_KEY_ID=...
B2_APPLICATION_KEY=...
B2_BUCKET_ID=...
B2_BUCKET_NAME=clicktake-backup

# ─── Media CDN: Cloudflare Images ───
CLOUDFLARE_IMAGES_ACCOUNT_HASH=...
CLOUDFLARE_IMAGES_API_TOKEN=...
CLOUDFLARE_IMAGES_DELIVERY_DOMAIN=images.clicktaketech.com

# ─── Media CDN: Cloudinary (optional) ───
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# ─── Media CDN: ImageKit (optional) ───
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/clicktake

# ─── Media CDN: Uploadcare (optional) ───
UPLOADCARE_PUBLIC_KEY=...
UPLOADCARE_SECRET_KEY=...

# ─── Media CDN: TwicPics (optional) ───
TWICPICS_DOMAIN=clicktake.twic.pics
TWICPICS_API_KEY=...

# ─── Email: Brevo ───
BREVO_API_KEY=...

# ─── Email: Mailgun ───
MAILGUN_API_KEY=...
MAILGUN_DOMAIN=mail.clicktaketech.com

# ─── Email: Elastic Email ───
ELASTIC_EMAIL_API_KEY=...

# ─── Email: Mailjet ───
MJ_APIKEY_PUBLIC=...
MJ_APIKEY_PRIVATE=...

# ─── Email: Zoho ───
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
ZOHO_SMTP_USER=...
ZOHO_SMTP_PASS=...

# ─── Email: ZeptoMail ───
ZEPTOMAIL_API_KEY=...

# ─── Email: MailerLite ───
MAILERLITE_API_KEY=...

# ─── Email: Sender ───
SENDER_API_KEY=...

# ─── Email: Mailtrap ───
MAILTRAP_API_KEY=...
MAILTRAP_INBOX_ID=...

# ─── Email: Cloudflare Email Routing (inbound) ───
CLOUDFLARE_EMAIL_ROUTING_ZONE_ID=...

# ─── Email: Generic SMTP (any custom provider) ───
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=ClickTake <noreply@clicktaketech.com>

# ─── Encryption key for credentials stored in DB ───
PROVIDER_CREDENTIALS_ENCRYPTION_KEY=...   # 32-byte hex, never commit
```

---

## 7. Deployment Notes

### 7.1 Provider initialization order (on first boot)

1. Read `ProviderConfig` table → build adapter instances
2. For each adapter, run `healthCheck()` → write to `ProviderHealth`
3. Pick healthy providers in priority order → populate runtime registry
4. Start failover watchdog (background cron every 5 min)

### 7.2 Cloudflare-specific optimizations

- **R2 + Cloudflare Workers**: Use Workers binding `R2_BUCKET` for zero-egress reads
- **Cloudflare Images**: Use `cf.image` property in fetch options (no extra API call)
- **Email Routing**: Configure MX records in Cloudflare DNS to forward inbound emails to `info@`, `support@` → `admin@clicktaketech.com`
- **Email Worker**: A Worker can intercept inbound emails (via `email` event) → log to DB → trigger webhook

### 7.3 Free-tier budget guardrails

| Layer | Free limit | Alert threshold |
|---|---|---|
| Cloudflare R2 | 10GB storage | 8GB → email admin |
| Backblaze B2 | 10GB storage | 8GB → email admin |
| Cloudinary | 25 credits/mo | 20 credits → email admin |
| Brevo | 300/day | 250 → failover to Mailgun |
| Mailgun | 100/day | 80 → failover to SMTP |
| MailerLite | 12k/mo | 10k → email admin |
| Sender | 15k/mo | 12k → email admin |
| ZeptoMail | 10k total trial | 8k → email admin |
| Mailtrap | 1000/mo | 800 → block sends (dev only) |

### 7.4 Compliance notes

- **GDPR (UK/EU customers)**: Cloudinary EU region, Brevo EU infrastructure, Mailjet EU infra — all GDPR-compliant
- **Data residency**: R2 lets you pin objects to EU/US regions via `r2-region` header
- **Email opt-out**: Every provider adapter auto-appends unsubscribe header; `MailerLite` and `Sender` handle list-unsubscribe natively

---

## 8. Migration Path

### 8.1 Phase 1 (Week 1) — Scaffolding

1. Add Prisma models (`ProviderConfig`, `ProviderHealth`, `ProviderUsage`, `EmailLog`, `StorageObject`)
2. Create `src/lib/providers/` directory with `types.ts` files for each category
3. Add admin panel UI scaffolding under `/admin/settings` with three new tabs: "Media & CDN", "Object Storage", "Email Providers"
4. Encrypt-credentials helper (`src/lib/crypto.ts`) — AES-256-GCM with `PROVIDER_CREDENTIALS_ENCRYPTION_KEY`

### 8.2 Phase 2 (Week 2) — Storage adapters

1. Implement R2 adapter (S3-compatible via `@aws-sdk/client-s3`)
2. Implement B2 adapter (S3-compatible)
3. Implement Cloudinary adapter (`cloudinary` npm package)
4. Implement Supabase Storage adapter (existing `@supabase/storage-js`)
5. Wire registry with read-failover + write-replication
6. Add admin "Test Connection" + "Force Failover Test" buttons

### 8.3 Phase 3 (Week 2-3) — Media CDN adapters

1. Implement Cloudflare Images adapter (URL builder + upload API)
2. Implement Cloudinary, ImageKit, Uploadcare, TwicPics adapters
3. Build Cloudflare Worker (`failover-router`) — deploy via `wrangler deploy`
4. Wire admin "Mode" toggle (Full Switch vs Failover)

### 8.4 Phase 4 (Week 3) — Email adapters

1. Implement SMTP adapter (using `nodemailer`) — works for Mailtrap, Zoho, custom
2. Implement API adapters for Brevo, Mailgun, Elastic Email, Mailjet, ZeptoMail, MailerLite, Sender, Mailtrap
3. Implement Cloudflare Email Routing adapter (inbound forwarding only)
4. Wire failover chain logic with health tracking
5. Add email analytics dashboard under `/admin/email`

### 8.5 Phase 5 (Week 4) — Testing & rollout

1. Integration tests for every adapter (mock + live API tests)
2. Load test failover logic (simulate provider down → verify switch)
3. Migrate existing contact form from Resend → new email registry
4. Migrate existing media uploads (currently in `public/`) → R2
5. Set up monitoring dashboards (Cloudflare Analytics + admin panel)
6. Documentation for admins (how to add new provider via UI)

---

## Appendix A: File Structure (final)

```
src/lib/providers/
├── media/
│   ├── types.ts
│   ├── cloudflare.ts
│   ├── cloudinary.ts
│   ├── imagekit.ts
│   ├── uploadcare.ts
│   ├── twicpics.ts
│   ├── registry.ts
│   └── index.ts
├── storage/
│   ├── types.ts
│   ├── r2.ts
│   ├── b2.ts
│   ├── cloudinary.ts
│   ├── supabase.ts
│   ├── replicator.ts
│   ├── registry.ts
│   └── index.ts
├── email/
│   ├── types.ts
│   ├── smtp.ts
│   ├── brevo.ts
│   ├── mailgun.ts
│   ├── elastic-email.ts
│   ├── mailjet.ts
│   ├── cloudflare-routing.ts
│   ├── zoho.ts
│   ├── zeptomail.ts
│   ├── mailerlite.ts
│   ├── sender.ts
│   ├── mailtrap.ts
│   ├── registry.ts
│   └── index.ts
├── crypto.ts             # AES-256-GCM encryption helper
├── health-checker.ts     # cron job
├── usage-tracker.ts      # usage logging
└── index.ts              # public API surface

src/app/admin/settings/
├── page.tsx
├── settings-client.tsx   # existing — extend with 3 new tabs
├── media-tab.tsx         # NEW
├── storage-tab.tsx       # NEW
└── email-tab.tsx         # NEW

src/app/api/admin/providers/
├── route.ts              # GET/POST provider configs
├── [id]/route.ts         # GET/PATCH/DELETE single provider
├── test/route.ts         # POST — run health check on a provider
└── failover/route.ts     # POST — force failover test

workers/cloudflare/
├── media-failover-router.ts   # deployed via wrangler
└── email-inbound-handler.ts   # deployed via wrangler
```

## Appendix B: Provider Selection Cheat Sheet

| Need | Recommended Provider |
|---|---|
| Cheapest image CDN, integrated with CF | **Cloudflare Images** |
| Most powerful AI transforms + video | **Cloudinary** |
| Best dev experience + generous free tier | **ImageKit** |
| Uploads + smart crop in one | **Uploadcare** |
| E-commerce responsive images | **TwicPics** |
| Cheapest long-term object storage | **Cloudflare R2** (zero egress) |
| Backup storage with Bandwidth Alliance | **Backblaze B2** |
| Most generous transactional free tier | **Brevo** (300/day) |
| Best deliverability, paid | **Mailgun** |
| EU-hosted transactional | **Mailjet** |
| Dev/test sandbox | **Mailtrap** |
| Free custom-domain business email | **Zoho Mail** |
| Transactional from Zoho ecosystem | **ZeptoMail** |
| Newsletters / marketing lists | **MailerLite** (1000 subs free) |
| Marketing automation, generous subs | **Sender** (2500 subs free) |
| Bulk email on a budget | **Elastic Email** |
| Inbound email forwarding (free) | **Cloudflare Email Routing** |
| Bring-your-own mail server | **SMTP (custom)** |
