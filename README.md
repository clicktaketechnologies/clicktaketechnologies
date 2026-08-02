<div align="center">

# ClickTake Technologies

### AI-Powered Digital Agency · UK · Pakistan · USA · Dubai

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle%20ORM-0.45-C5F74F?logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4-black?logo=next.js&logoColor=white)](https://next-auth.js.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#license)

**Custom software · AI automation · Web & SaaS · Growth marketing · Brand & creative**

🔗 [www.clicktaketech.com](https://www.clicktaketech.com) · 📧 Info@clicktaketech.com · 📞 +92 306 9753003 · +44 7391 653377

</div>

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Public Pages & Routes](#public-pages--routes)
- [Admin Panel](#admin-panel)
- [Blog Manager & Bulk Upload](#blog-manager--bulk-upload)
- [API Endpoints](#api-endpoints)
- [Database & Schema](#database--schema)
- [Authentication & RBAC](#authentication--rbac)
- [Storage & Email Providers](#storage--email-providers)
- [SEO & Structured Data](#seo--structured-data)
- [Deployment](#deployment)
- [Locations & Contact](#locations--contact)
- [License](#license)

---

## Overview

This repository contains the production website + admin panel for **ClickTake Technologies** — a multi-region digital agency serving clients across the UK (Birmingham), Pakistan (Multan), USA (Austin, TX), and UAE (Dubai). The site markets four core service lines: AI & Machine Learning, Web Development, Digital Marketing, and Creative Services, plus a flagship "Business Development Starter Kit" package for founders.

The codebase is built on **Next.js 16 (App Router)** with production-grade SSR, ISR, edge-ready API routes, a full admin dashboard (CMS, blog manager, A/B testing, RBAC, theme engine, lead CRM, email center, storage providers), and a multi-region SEO strategy.

**Live site:** [clicktaketech.com](https://clicktaketech.com) · **Admin:** [clicktaketech.com/admin](https://clicktaketech.com/admin)

## Highlights

### Public site
- **Multi-region SEO** — geo-targeted content for UK / Pakistan / USA / Dubai with localized keywords, hours, phone numbers, and addresses.
- **3D animation system** — Three.js hero (icosahedron + network nodes + dust), per-page 3D story scenes, animated 3D characters, futuristic textboxes, canvas tech-grid background.
- **Elite theme toggle** — switch between the default brand theme and an alternative "Elite" design system.
- **Light / Dark mode** — `next-themes` with FOUC-prevention inline script; theme persists across reloads.
- **Mega menu navbar** — Services, Solutions, Resources, Company dropdowns with category groupings and CTAs.
- **Contact API** — Turnstile-protected inquiry + booking endpoints that send thank-you emails to the user and notify the internal team.
- **Structured data** — JSON-LD `Organization` schema with multi-country address, 8 social profiles, and a sales contact point. Article schema for blog posts.
- **SEO primitives** — `sitemap.ts`, `robots.ts`, `llms.txt`, Open Graph, Twitter cards, canonical URLs, locale-aware metadata.
- **A/B testing** — built-in experiment framework for navbar CTAs and other conversion points.

### Admin panel (`/admin`)
- **Dashboard** — KPIs, recent leads, system status.
- **CMS — Pages** — full CRUD for dynamic content pages with rich-text editor (TipTap), SEO fields, publish toggle.
- **Blog Posts** — CRUD + **bulk upload from .md / .csv / .pdf** with auto-content extraction.
- **Services & Packages** — manage 14+ services with deep-dive content, pricing packages, FAQs.
- **Team & Careers** — manage team members, job openings, applications.
- **Lead CRM** — incoming inquiries, status pipeline, assignment, internal notes.
- **Email Center** — templates, workflows, SMTP logs, test sends, multi-provider failover.
- **A/B Experiments** — create experiments, variants, track conversions.
- **Typography Engine** — per-element font family/weight/size config.
- **Theme Engine** — create + switch custom themes (dark/light), preset library.
- **Storage & Email Providers** — manage R2/B2/S3 storage providers, email providers (Resend, Brevo, etc.) with priority-based failover.
- **SEO & Analytics** — per-path meta tags, sitemap config, robots config.
- **User Roles (RBAC)** — fine-grained permissions per role.
- **Security & Logs** — security logs, blocked IPs, audit trail, security settings.

## Tech Stack

| Layer              | Technology                                              |
| ------------------ | ------------------------------------------------------ |
| Framework          | Next.js 16 (App Router, standalone output)             |
| Language           | TypeScript 5                                            |
| UI Library         | React 19                                                |
| Styling            | Tailwind CSS v4 + `tailwind-merge` + `class-variance-authority` |
| Components         | shadcn/ui (Radix UI primitives)                        |
| Animation          | Framer Motion 12, Three.js 0.185, `@react-three/fiber` |
| Theme              | `next-themes` + custom Elite mode                      |
| Forms              | `react-hook-form` + `zod`                               |
| Database           | Drizzle ORM 0.45 (PostgreSQL via Neon serverless)      |
| Auth               | NextAuth.js v4 (JWT, credentials provider, bcrypt)     |
| Rich Text          | TipTap 3 (StarterKit + Link + Image + TextAlign + Placeholder) |
| File Parsing       | gray-matter (MD frontmatter), marked (MD→HTML), pdf-parse v2 (PDF text) |
| Email              | Resend, Brevo, nodemailer — multi-provider with failover |
| Storage            | Cloudflare R2, Backblaze B2, AWS S3 — multi-provider with replication |
| Anti-bot           | Cloudflare Turnstile                                    |
| Icons              | `lucide-react`                                          |
| Charts             | Recharts 2 (admin analytics)                           |
| Package Manager    | Bun (`bun.lock`) — npm/yarn also work                  |
| Runtime            | Node.js 20+ (Vercel) or Bun (self-hosted)              |
| Deployment         | Vercel (primary), Cloudflare Workers (alt via @opennextjs/cloudflare) |

## Project Structure

```
.
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout: theme provider, FOUC script, JSON-LD
│   │   ├── page.tsx                  # Home page (assembles all sections)
│   │   ├── home-content.tsx          # Home page client component
│   │   ├── globals.css               # Tailwind v4 + brand tokens + animations
│   │   ├── not-found.tsx             # 404 page
│   │   ├── robots.ts                 # Dynamic robots.txt
│   │   ├── sitemap.ts                # Dynamic sitemap.xml
│   │   ├── llms.txt/route.ts         # LLMs.txt for AI agents
│   │   ├── openapi.json/route.ts     # OpenAPI 3.1 spec
│   │   ├── rss.xml/route.ts          # RSS feed for blog
│   │   ├── about/page.tsx            # /about
│   │   ├── contact/page.tsx          # /contact
│   │   ├── portfolio/page.tsx        # /portfolio
│   │   ├── case-studies/             # /case-studies + /case-studies/[slug]
│   │   ├── resources/page.tsx        # /resources
│   │   ├── blog/                     # /blog + /blog/[slug] (DB-first with static fallback)
│   │   ├── services/[[...slug]]/     # /services + /services/[category]/[service]
│   │   ├── solutions/                # /solutions + /solutions/[slug]
│   │   ├── pricing/page.tsx          # /pricing
│   │   ├── team/page.tsx             # /team
│   │   ├── careers/page.tsx          # /careers
│   │   ├── cities/                   # /cities + /cities/[city]/[service]
│   │   ├── legal/                    # /legal/{terms,privacy,cookies}
│   │   ├── admin/                    # Admin panel (see below)
│   │   └── api/                      # API routes (see below)
│   │
│   ├── components/
│   │   ├── site/                     # Public site components
│   │   │   ├── nx-navbar.tsx         # Mega menu navbar (Services/Solutions/Resources/Company)
│   │   │   ├── nx-footer.tsx         # Multi-column footer + socials
│   │   │   ├── nx-page-layout.tsx    # Shared layout for inner pages
│   │   │   ├── nx-3d-scene.tsx       # Three.js floating geometric accents
│   │   │   ├── nx-3d-character.tsx   # Interactive 3D character per page
│   │   │   ├── nx-story-scene.tsx    # Per-page 3D story layer
│   │   │   ├── nx-three-scene.tsx    # Three.js ambient background (particles + icosahedron)
│   │   │   ├── background-scene.tsx  # Canvas tech-grid animation
│   │   │   ├── custom-cursor.tsx     # Aperture cursor + comet trail
│   │   │   ├── scroll-animations.tsx # Scroll progress, reveal, count-up, dividers
│   │   │   ├── theme-toggle.tsx      # Light/dark/Elite switch
│   │   │   ├── ab-test.tsx           # A/B testing component
│   │   │   ├── social-icons.tsx      # 8 social icons (Facebook, IG, LinkedIn, ...)
│   │   │   ├── json-ld.tsx           # JSON-LD schema injectors
│   │   │   └── pages/                # Routed page components
│   │   │       ├── blog-page.tsx
│   │   │       ├── blog-post-page.tsx
│   │   │       ├── service-detail-page.tsx
│   │   │       ├── contact-page.tsx
│   │   │       └── legal-page.tsx
│   │   ├── admin/                    # Admin-only components
│   │   │   ├── rich-text-editor.tsx  # TipTap-based WYSIWYG
│   │   │   └── ...
│   │   ├── ui/                       # shadcn/ui primitives (40+ components)
│   │   └── theme-provider.tsx        # next-themes wrapper
│   │
│   ├── lib/
│   │   ├── site-data.ts              # ⭐ Single source of truth: SITE, NAV_LINKS, SERVICES, SOLUTIONS, BLOG_POSTS, STARTER_KIT
│   │   ├── db.ts                     # Prisma-compatible shim over Drizzle ORM
│   │   ├── schema.ts                 # Drizzle schema (40+ tables)
│   │   ├── auth.ts                   # NextAuth config + ensureSeedAdmin()
│   │   ├── permissions.ts            # RBAC permission keys + system roles
│   │   ├── log-audit.ts              # Audit log helper
│   │   ├── ensure-blog-table.ts      # Self-heal: CREATE/ALTER cms_blogs on first request
│   │   ├── mailer.ts                 # Email sending + templates
│   │   ├── contact-schema.ts         # Zod schemas for inquiry + booking
│   │   ├── turnstile.ts              # Server-side Turnstile token verifier
│   │   └── providers/                # Storage + Email provider registry
│   │       ├── storage/              # R2/B2/S3 with failover + replication
│   │       ├── email/                # Resend/Brevo/SMTP with failover
│   │       └── registry.ts           # Provider registry
│   │
│   └── content/
│       └── deep-dive/                # Per-service 12-section deep-dive content
│
├── prisma/
│   └── schema.prisma                 # Prisma schema (mirror of Drizzle schema)
│
├── workers/cloudflare/               # Cloudflare Worker for media CDN failover
│
├── scripts/                          # Migration + admin scripts
│   ├── seed-admin.ts                 # Seed super-admin user
│   ├── migrate-public-to-storage.ts  # Migrate local images to R2/B2
│   └── patch-prisma-wasm-mjs.sh      # Patch Prisma WASM for Cloudflare
│
├── public/                           # Logo + brand images
├── next.config.ts                    # Next.js config (standalone build)
├── drizzle.config.ts                 # Drizzle Kit config
├── package.json                      # Scripts + deps
└── bun.lock                          # Lockfile (Bun)
```

## Getting Started

### Prerequisites

- **Node.js 20+** or **Bun 1.1+** (recommended)
- Git
- A Postgres database (Neon, Supabase, Railway, or self-hosted)

### Installation

```bash
# 1. Clone
git clone https://github.com/clicktaketechnologies/clicktaketechnologies.git
cd clicktaketechnologies

# 2. Install dependencies (pick one)
bun install          # recommended — uses bun.lock
# or
npm install
```

### Environment

Create a `.env` file in the project root:

```env
# Database (Postgres for production; SQLite for local dev)
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
DIRECT_URL="postgresql://user:pass@host:5432/db?sslmode=require"   # same as DATABASE_URL (Neon direct, no pooler)

# NextAuth
NEXTAUTH_URL="https://clicktaketech.com"
NEXTAUTH_SECRET="<openssl rand -base64 32>"

# Email (Resend or any SMTP)
RESEND_API_KEY=""
LEADS_EMAIL="Info@clicktaketech.com"
CONTACT_FROM_EMAIL="noreply@clicktaketech.com"

# Cloudflare Turnstile (anti-bot for contact form)
TURNSTILE_SECRET_KEY=""
TURNSTILE_SITE_KEY=""

# Storage (Cloudflare R2 — primary)
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET="clicktake-media"

# Optional: Backblaze B2 (backup storage)
B2_APPLICATION_KEY_ID=""
B2_APPLICATION_KEY=""
B2_BUCKET="clicktake-media-backup"

# Optional: Super-admin recovery (delete after first use)
SUPERADMIN_EMAIL="admin@clicktaketech.com"
SUPERADMIN_PASSWORD="Admin@2026"
```

### Database setup

```bash
# Push Drizzle schema to Postgres (creates all tables + indexes)
bun run db:push

# Seed the initial super-admin user
bunx tsx scripts/seed-admin.ts
```

### Run the dev server

```bash
bun run dev
# or
npm run dev
```

Open **http://localhost:3000** in your browser. The site defaults to dark theme.

**Admin login:** http://localhost:3000/admin/login
- Email: `admin@clicktaketech.com`
- Password: `Admin@2026` (set in `src/lib/auth.ts` → `ensureSeedAdmin()`)

## Available Scripts

| Script                | Description                                                        |
| --------------------- | ---------------------------------------------------------------- |
| `dev`                 | Start dev server on port 3000                                    |
| `build`               | Production build (Next.js standalone output + static + public)   |
| `start`               | Run the production standalone server                              |
| `lint`                | Run ESLint                                                       |
| `db:generate`         | Generate Drizzle migration from schema changes                   |
| `db:push`             | Push schema changes to DB (no migration history)                 |
| `db:migrate`          | Create + apply a Drizzle migration                               |
| `db:studio`           | Open Drizzle Studio (DB GUI)                                     |
| `build:cloudflare`    | Build for Cloudflare Workers deployment                          |
| `deploy:cloudflare`   | Build + deploy to Cloudflare Workers                             |
| `deploy:vercel`       | Build + deploy to Vercel                                         |
| `seed:admin`          | Seed the initial super-admin user                                |
| `migrate:media`       | Migrate local images to R2/B2 storage                            |

## Environment Variables

| Variable                | Required | Description                                       |
| ----------------------- | -------- | ------------------------------------------------- |
| `DATABASE_URL`          | ✅       | Postgres connection string (pooled, e.g. Neon pooler) |
| `DIRECT_URL`            | ✅       | Postgres direct connection (no pooler, for migrations) |
| `NEXTAUTH_URL`          | ✅       | Site canonical URL (e.g. `https://clicktaketech.com`) |
| `NEXTAUTH_SECRET`       | ✅       | JWT signing secret (`openssl rand -base64 32`)    |
| `RESEND_API_KEY`        | ⚠️       | Resend API key for transactional email           |
| `LEADS_EMAIL`           | ⚠️       | Inbox that receives new inquiries                |
| `CONTACT_FROM_EMAIL`    | ⚠️       | From-address for thank-you emails                |
| `TURNSTILE_SECRET_KEY`  | ⚠️       | Cloudflare Turnstile server secret               |
| `TURNSTILE_SITE_KEY`    | ⚠️       | Cloudflare Turnstile site key (client side)      |
| `R2_*`                  | ⚠️       | Cloudflare R2 credentials (primary storage)      |
| `B2_*`                  | ⚠️       | Backblaze B2 credentials (backup storage)        |
| `SUPERADMIN_EMAIL`      | ⚠️       | Initial super-admin email (seed only)            |
| `SUPERADMIN_PASSWORD`   | ⚠️       | Initial super-admin password (seed only)         |

⚠️ = optional in dev, required for production.

## Public Pages & Routes

| Route                              | Purpose                                              |
| ---------------------------------- | --------------------------------------------------- |
| `/`                                | Home — hero + services + work + process + testimonials + about + contact |
| `/about`                           | Company story, team, locations, timeline             |
| `/services`                        | All services grouped by category (4 categories, 14+ services) |
| `/services/[category]/[service]`   | Individual service detail with 12-section deep-dive |
| `/solutions`                       | Solutions index by industry                          |
| `/solutions/[slug]`                | Solution detail page                                |
| `/portfolio`                       | Selected case studies                                |
| `/case-studies`                    | Case studies index                                   |
| `/case-studies/[slug]`             | Case study detail                                    |
| `/blog`                            | Blog index (DB-first, falls back to static BLOG_POSTS) |
| `/blog/[slug]`                     | Blog post detail (DB-first with static fallback)    |
| `/pricing`                         | Pricing packages                                     |
| `/team`                            | Team members                                         |
| `/careers`                         | Open job listings                                    |
| `/cities`                          | Cities we serve                                      |
| `/cities/[city]/[service]`         | City-service geo-targeted page                       |
| `/resources`                       | Resources hub                                        |
| `/contact`                         | Inquiry form + discovery call booking                |
| `/legal/privacy`                   | Privacy policy                                       |
| `/legal/cookies`                   | Cookie policy                                        |
| `/legal/terms`                     | Terms of service                                     |
| `/rss.xml`                         | RSS feed for blog posts                              |
| `/sitemap.xml`                     | Dynamic sitemap                                      |
| `/robots.txt`                      | Dynamic robots                                       |
| `/llms.txt`                        # LLMs.txt for AI agents
| `/openapi.json`                    | OpenAPI 3.1 spec for /api endpoints                  |

## Admin Panel

The admin panel is at `/admin` and requires authentication via NextAuth (credentials provider).

### Admin Modules

| Route                  | Module                  | Description                                          |
| ---------------------- | ----------------------- | --------------------------------------------------- |
| `/admin`               | Dashboard               | KPIs, recent leads, system status                    |
| `/admin/cms`           | CMS — Pages             | CRUD for dynamic content pages (TipTap editor)       |
| `/admin/blog`          | Blog Posts              | CRUD + bulk upload from .md/.csv/.pdf (see below)    |
| `/admin/services`      | Services & Packages     | Manage services, pricing, FAQs, deep-dive content    |
| `/admin/team-careers`  | Team & Careers          | Team members, job openings, applications             |
| `/admin/typography`    | Typography Engine       | Per-element font family/weight/size config           |
| `/admin/theme`         | Theme Engine            | Custom themes (dark/light), preset library           |
| `/admin/crm`           | Lead CRM                | Inquiries pipeline, assignment, notes                |
| `/admin/email`         | Email Center            | Templates, workflows, SMTP logs, test sends          |
| `/admin/ab-tests`      | A/B Experiments         | Create experiments, variants, track conversions      |
| `/admin/providers`     | Storage & Email Providers | Manage R2/B2/S3 + email providers with failover   |
| `/admin/seo`           | SEO & Analytics         | Per-path meta tags, sitemap config, robots config    |
| `/admin/settings`      | Config Settings         | Site-wide settings, social links, contact info       |
| `/admin/roles`         | User Roles (RBAC)       | Roles + fine-grained permissions                     |
| `/admin/security`      | Security & Logs         | Security logs, blocked IPs, audit trail              |

### Default Admin Credentials

- **URL:** `/admin/login`
- **Email:** `admin@clicktaketech.com`
- **Password:** `Admin@2026`

These are seeded by `src/lib/auth.ts` → `ensureSeedAdmin()` on first login attempt. Change the password immediately after first login via the Security module.

## Blog Manager & Bulk Upload

The `/admin/blog` module supports **bulk uploading blog posts from `.md`, `.csv`, and `.pdf` files** with automatic content extraction.

### Supported File Formats

#### `.md` (Markdown with YAML frontmatter)
```markdown
---
title: My Article
slug: my-article
excerpt: Short description.
category: SEO
tags: [seo, local-seo]
author: ClickTake Team
publishedAt: 2026-01-15
coverImage: https://example.com/image.jpg
---

# Article body in Markdown

This is the article content...
```
- Frontmatter parsed by `gray-matter`
- Body converted from Markdown to HTML by `marked`
- Creates **1 post per file**

#### `.csv` (Header row + data rows)
```csv
title,slug,excerpt,category,tags,author,content
First Post,first-post,First excerpt,SEO,"seo|local",ClickTake,"<p>HTML body</p>"
Second Post,second-post,Second excerpt,Web Dev,"nextjs|react",ClickTake Eng,"<p>Body</p>"
```
- Recognized columns: `title`, `slug`, `excerpt`, `category`, `tags` (pipe-separated), `author`, `content`/`body`/`html`/`text`
- Creates **N posts per file** (one per data row)

#### `.pdf` (Text-based PDFs only)
- Text extracted by `pdf-parse` v2
- First meaningful line becomes the title
- Remaining text is split into paragraphs and wrapped in `<p>` tags
- Filename is used as the slug base
- Creates **1 post per file**
- Scanned image PDFs are not supported (no OCR)

### Upload Behavior

- All uploaded posts are saved as **DRAFTS** by default (`isPublished=false`) — admin reviews before publishing.
- Optional form field `publish=true` auto-publishes immediately.
- Optional form fields `author` and `category` override per-post values.
- Slugs are auto-deduplicated (appends `-2`, `-3`, etc. if a slug already exists).
- Returns a summary with created posts + any per-file errors.

### Sample Templates

Sample templates are included in `download/blog-templates/`:
- `sample-blog-post.md` — single Markdown post with full frontmatter
- `sample-blog-bulk.csv` — 3-post CSV bulk import example

### Public Blog Pages

- `/blog` queries the `cms_blogs` table for published posts and **merges with static `BLOG_POSTS`** from `site-data.ts`.
- DB posts take precedence on slug collisions (admin can override static content).
- ISR with 5-minute revalidation — newly published posts appear within 5 minutes.
- `/blog/[slug]` resolves DB-first, falls back to static `BLOG_POSTS` if not found.

## API Endpoints

### Public APIs

| Method | Route                | Description                                  |
| ------ | -------------------- | -------------------------------------------- |
| GET    | `/api`               | Health check                                 |
| GET    | `/api/health`        | Detailed health check (service + timestamp)  |
| POST   | `/api/contact`       | Inquiry + booking submission (Turnstile-protected) |
| GET    | `/rss.xml`           | RSS feed for blog posts                      |
| GET    | `/sitemap.xml`       | Dynamic sitemap                              |
| GET    | `/robots.txt`        | Dynamic robots                               |
| GET    | `/llms.txt`          | LLMs.txt for AI agents                       |
| GET    | `/openapi.json`      | OpenAPI 3.1 spec                             |

### Admin APIs (auth required)

| Method | Route                            | Description                                  |
| ------ | -------------------------------- | -------------------------------------------- |
| GET    | `/api/admin/pages`               | List CMS pages                               |
| POST   | `/api/admin/pages`               | Create CMS page                              |
| GET    | `/api/admin/pages/[id]`          | Get single CMS page                          |
| PATCH  | `/api/admin/pages/[id]`          | Update CMS page                              |
| DELETE | `/api/admin/pages/[id]`          | Delete CMS page                              |
| GET    | `/api/admin/blog`                | List blog posts                              |
| POST   | `/api/admin/blog`                | Create blog post                             |
| GET    | `/api/admin/blog/[id]`           | Get single blog post                         |
| PATCH  | `/api/admin/blog/[id]`           | Update blog post                             |
| DELETE | `/api/admin/blog/[id]`           | Delete blog post                             |
| POST   | `/api/admin/blog/upload`         | **Bulk upload .md/.csv/.pdf with auto-extract** |
| GET    | `/api/admin/services`            | List services                                |
| POST   | `/api/admin/services`            | Create service                               |
| GET    | `/api/admin/services/[id]`       | Get single service                           |
| PATCH  | `/api/admin/services/[id]`       | Update service                               |
| DELETE | `/api/admin/services/[id]`       | Delete service                               |
| GET    | `/api/admin/leads`               | List leads (CRM)                             |
| GET    | `/api/admin/leads/[id]`          | Get single lead                              |
| PATCH  | `/api/admin/leads/[id]`          | Update lead                                  |
| GET    | `/api/admin/themes`              | List themes + presets                        |
| POST   | `/api/admin/themes`              | Create theme                                 |
| GET    | `/api/admin/ab-tests`            | List A/B experiments                         |
| POST   | `/api/admin/ab-tests`            | Create experiment                            |
| GET    | `/api/admin/ab-tests/[id]/results` | Get experiment results                     |
| GET    | `/api/admin/team`                | List team members                            |
| GET    | `/api/admin/users`               | List admin users (RBAC)                      |
| GET    | `/api/admin/roles`               | List roles                                   |
| GET    | `/api/admin/providers`           | List storage + email providers               |
| GET    | `/api/admin/providers/health`    | Provider health status                       |
| GET    | `/api/admin/seo`                 | SEO meta per path                            |
| GET    | `/api/admin/settings`            | Site settings                                |
| GET    | `/api/admin/security`            | Security logs                                |
| GET    | `/api/admin/email/logs`          | Email send logs                              |
| POST   | `/api/admin/email/send-test`     | Send test email                              |

## Database & Schema

The codebase uses **Drizzle ORM** (not Prisma directly) for all database access. A Prisma-compatible shim (`src/lib/db.ts`) exposes a `prisma` object whose API mirrors Prisma Client's top-level model access, translating each call to the equivalent Drizzle query. This lets us use Drizzle on Cloudflare Workers (where Prisma's WASM engine has issues) while keeping the familiar Prisma API.

### Schema Files

- **`src/lib/schema.ts`** — Drizzle schema (canonical, 40+ tables)
- **`prisma/schema.prisma`** — Prisma schema (mirror, for IDE tooling)

### Production Database

- **Provider:** Neon Postgres (serverless)
- **Connection:** Pooled via `DATABASE_URL`, direct via `DIRECT_URL` for migrations
- **Tables (64 total):** pages, cms_blogs, cms_media, cms_backgrounds, cms_nav_links, cms_typography, cms_themes, cms_theme_presets, cms_font_presets, services, leads, admin_users, admin_roles, role_permissions, audit_logs, security_logs, blocked_ips, team_members, job_openings, job_applications, portfolio_items, testimonials, resources, provider_configs, provider_health, provider_usage, storage_objects, email_logs, email_templates, email_workflows, smtp_logs, seo_page_meta, seo_robots_config, seo_sitemap_config, site_settings, page_views, backups, admin_notifications, ab_experiments, ab_variants, ab_assignments, posts, users, and more.

### Self-Healing Schema

Some endpoints use idempotent `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE ADD COLUMN IF NOT EXISTS` patterns to self-heal schema drift between code deploys and DB migrations:

- **`src/lib/ensure-blog-table.ts`** — ensures `cms_blogs` table has all columns the current schema expects (handles legacy schemas by adding missing columns + backfilling from old columns).
- **`/api/admin/recover?action=auto-migrate`** — runs idempotent migrations for `services.deep_dive`, `ab_experiments`, `ab_variants`, `ab_assignments`.
- **`/api/admin/recover?action=blog-migrate`** — runs idempotent ALTER TABLE for `cms_blogs` with per-statement success/error reporting.

## Authentication & RBAC

### NextAuth.js Configuration

- **Provider:** Credentials (email + password)
- **Password hashing:** bcrypt (12 rounds)
- **Session:** JWT, 7-day expiry
- **Session payload:** `id`, `email`, `name`, `roleId`, `roleName`, `permissions[]`
- **Config:** `src/lib/auth.ts`

### Default Super Admin

On first login attempt, `ensureSeedAdmin()` runs idempotently:
- Creates `Super Admin` role with all permissions
- Creates `Editor` role with content permissions
- Creates `Sales Support` role with lead permissions
- Creates `admin@clicktaketech.com` user with `Admin@2026` password (bcrypt-hashed)

### Permission System

Permissions are defined in `src/lib/permissions.ts` and include:
- `viewDashboard`, `readCMS`, `writeCMS`
- `readLeads`, `writeLeads`, `assignLeads`
- `manageSettings`, `manageRBAC`
- `manageProviders`, `manageThemes`, `manageTypography`
- `viewSecurity`, `manageSecurity`

## Storage & Email Providers

### Storage (R2 → B2 with replication)

- **Primary:** Cloudflare R2 (zero egress fees)
- **Backup:** Backblaze B2 (async replication, fire-and-forget)
- **Failover:** tries each provider in priority order until one succeeds
- **DB tracking:** `storage_objects` table records every upload (key, content-type, size, primary provider, replication status)
- **Registry:** `src/lib/providers/storage/`

### Email (multi-provider with failover)

- **Supported:** Resend, Brevo, nodemailer (SMTP)
- **Failover:** priority-based — tries highest-priority active provider first, falls through on error
- **Health tracking:** `provider_health` table records latency, error count, cooldowns
- **Templates:** DB-stored HTML/text templates with variable substitution
- **Logs:** every send is logged in `email_logs` + `smtp_logs`
- **Registry:** `src/lib/providers/email/`

## SEO & Structured Data

- **`metadata` export** in every page — full Open Graph, Twitter cards, robots directives, locale-aware title template, canonical URLs.
- **JSON-LD schemas:**
  - `Organization` — multi-country `address` array, `areaServed`, 8 `sameAs` social links, sales `contactPoint`
  - `WebSite` — for site-wide search rich results
  - `BreadcrumbList` — on every page with breadcrumb nav
  - `Article` — on blog post pages (author, publishedTime, tags)
- **`sitemap.ts`** — generates `/sitemap.xml` covering all static routes + every service detail page + blog posts + portfolio items.
- **`robots.ts`** — generates `/robots.txt` referencing the sitemap.
- **`llms.txt`** — AI-agent-readable site summary (RFC: llmstxt.org).
- **Geo-targeted content** — each location section (`Birmingham`, `Multan`, `Austin`, `Dubai`) has localized keywords, hours, coordinates, and phone numbers.
- **OpenAPI 3.1** — `/openapi.json` describes all API endpoints for client SDK generation.
- **RSS** — `/rss.xml` feeds blog posts.

## Deployment

### Vercel (primary — production)

1. Push this repo to GitHub (already configured: `clicktaketechnologies/clicktaketechnologies`).
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add all environment variables from the [Environment Variables](#environment-variables) table.
5. Build command: `next build` (Vercel handles standalone output).
6. Deploy. Auto-deploys on every push to `main`.

**Production URL:** [clicktaketech.com](https://clicktaketech.com)

### Cloudflare Workers (alternative)

```bash
# Build for Cloudflare Workers
bun run build:cloudflare

# Deploy
bun run deploy:cloudflare
```

The build uses `@opennextjs/cloudflare` to package the Next.js app for Cloudflare Workers. Drizzle ORM runs natively on Workers via the `pg` + `pg-cloudflare` socket adapter (no Prisma WASM engine needed).

### Self-hosted (Bun + Caddy)

```bash
# Build
bun run build

# Run the standalone server (NODE_ENV=production)
bun run start
```

The `build` script outputs a standalone server to `.next/standalone/`. Point a reverse proxy (Caddy, Nginx) at port 3000.

### Database Migrations

```bash
# Create a migration from schema changes
bun run db:migrate -- --name <migration_name>

# Apply migrations to production
DATABASE_URL="<prod-connection-string>" bun run db:push
```

> ⚠️ **Never run `drizzle-kit push --force` against production without a backup.** Use `bun run db:push` (idempotent, safe).

## Locations & Contact

| Region                  | City        | Address                                                  | Hours                            |
| ----------------------- | ----------- | -------------------------------------------------------- | -------------------------------- |
| 🇬🇧 United Kingdom      | Birmingham  | Flat 312, Kitts Green Road, Birmingham B33 9SB          | Mon–Sat: 09:30 AM – 09:00 PM GMT |
| 🇵🇰 Pakistan            | Multan      | Office #12, B.C.G Chowk, Paracha Street, Multan 60600   | Mon–Sat: 09:30 AM – 09:00 PM PKT |
| 🇺🇸 United States       | Austin, TX  | Remote-first · Available across US time zones            | Mon–Fri: 9:00 AM – 6:00 PM CST   |
| 🇦🇪 United Arab Emirates| Dubai       | Business Bay · Dubai, UAE                                | Mon–Sat: 10:00 AM – 08:00 PM GST |

**Phones:** +92 306 9753003 (PK) · +44 7391 653377 (UK)
**Email:** Info@clicktaketech.com
**Website:** [www.clicktaketech.com](https://www.clicktaketech.com)

### Social

[Facebook](https://www.facebook.com/clicktaketechnologies/) ·
[Instagram](https://www.instagram.com/clicktaketechnologiesuk/) ·
[LinkedIn](https://www.linkedin.com/company/click-take-technologies/) ·
[YouTube](https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw) ·
[TikTok](https://www.tiktok.com/@clicktaketechnologies) ·
[Pinterest](https://www.pinterest.com/clicktaketechnologies/) ·
[Threads](https://www.threads.net/@clicktaketechnologies) ·
[Tumblr](https://clicktaketechnologies.tumblr.com/)

## License

Proprietary — © 2020–2026 ClickTake Technologies. All rights reserved.

This source code is the property of ClickTake Technologies and is not licensed for redistribution, modification, or commercial use without explicit written consent. Unauthorized copying, redistribution, or use of this codebase, in part or in whole, is strictly prohibited.

For licensing inquiries: Info@clicktaketech.com

---

<div align="center">

**Built with care by the ClickTake Technologies engineering team.**

[Report an issue](https://github.com/clicktaketechnologies/clicktaketechnologies/issues) ·
[Visit our website](https://www.clicktaketech.com) ·
[Email us](mailto:Info@clicktaketech.com)

</div>
