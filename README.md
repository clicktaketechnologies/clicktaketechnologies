<div align="center">

# ClickTake Technologies

### AI-Powered Digital Agency · UK · Pakistan · USA · Dubai

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?logo=three.js&logoColor=white)](https://threejs.org/)
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
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Brand & Identity](#brand--identity)
- [SEO & Structured Data](#seo--structured-data)
- [Database](#database)
- [Deployment](#deployment)
- [Locations & Contact](#locations--contact)
- [License](#license)

---

## Overview

This repository contains the production website for **ClickTake Technologies** — a multi-region digital agency serving clients across the UK (Birmingham), Pakistan (Multan), USA (Austin, TX), and UAE (Dubai). The site markets four core service lines: AI & Machine Learning, Web Development, Digital Marketing, and Creative Services, plus a flagship "Business Development Starter Kit" package for founders.

The codebase is a complete rebuild of the agency's original Vite + React + TanStack Router site, ported to **Next.js 16 (App Router)** for production-grade SSR, ISR, SEO primitives, and edge-ready API routes. All original UI, animations, brand assets, content, and feature logic were preserved during the port — only the rendering framework and SEO content were upgraded.

## Highlights

- **Multi-region SEO** — geo-targeted content for UK / Pakistan / USA / Dubai with localized keywords, hours, phone numbers, and addresses.
- **Full animation system** — canvas background (tech nodes, edges, data streams, ripples), aperture-style custom cursor with comet trail, Three.js hero (icosahedron + network nodes + dust), scroll progress bar, scroll-to-top, section reveal-on-scroll, animated count-up stats, and animated section dividers.
- **Light / Dark theme** — `next-themes` with FOUC-prevention inline script; theme persists across reloads; defaults to dark.
- **Mega menu** — services dropdown with all 14 services grouped by category.
- **Contact API** — Turnstile-protected inquiry + booking endpoints that send thank-you emails to the user and notify the internal team via Resend/nodemailer.
- **Structured data** — JSON-LD `Organization` schema with multi-country address, 8 social profiles, and a sales contact point.
- **SEO primitives** — `sitemap.ts`, `robots.ts`, Open Graph, Twitter cards, canonical URLs, locale-aware metadata.
- **Database-ready** — Prisma schema (User, Post, ContactMessage models) with SQLite for dev; swap to Postgres for production by changing `DATABASE_URL`.

## Tech Stack

| Layer              | Technology                                              |
| ------------------ | ------------------------------------------------------ |
| Framework          | Next.js 16 (App Router)                                |
| Language           | TypeScript 5                                            |
| UI Library         | React 19                                                |
| Styling            | Tailwind CSS v4 + `tailwind-merge` + `class-variance-authority` |
| Components         | shadcn/ui (Radix UI primitives)                        |
| Animation          | Framer Motion 12, Three.js 0.185, `@react-three/fiber` |
| Theme              | `next-themes`                                           |
| Forms              | `react-hook-form` + `zod`                               |
| Database           | Prisma 6 (SQLite dev / Postgres prod)                  |
| Email              | `nodemailer` / Resend                                  |
| Anti-bot           | Cloudflare Turnstile                                    |
| Charts             | Recharts 2                                              |
| Icons              | `lucide-react`                                          |
| Package Manager    | Bun (`bun.lock`) — npm/yarn also work                  |
| Runtime            | Bun (production) or Node.js 20+                         |

## Project Structure

```
.
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout: theme provider, FOUC script, JSON-LD
│   │   ├── page.tsx                  # Home page (assembles all sections)
│   │   ├── globals.css               # Tailwind v4 + brand tokens + animations
│   │   ├── not-found.tsx             # 404 page
│   │   ├── robots.ts                 # Dynamic robots.txt
│   │   ├── sitemap.ts                # Dynamic sitemap.xml
│   │   ├── about/page.tsx            # /about
│   │   ├── contact/page.tsx          # /contact
│   │   ├── portfolio/page.tsx        # /portfolio
│   │   ├── resources/page.tsx        # /resources
│   │   ├── services/[[...slug]]/page.tsx  # /services + /services/[category]/[service]
│   │   ├── legal/cookies/page.tsx    # /legal/cookies
│   │   ├── legal/privacy/page.tsx    # /legal/privacy
│   │   ├── legal/terms/page.tsx      # /legal/terms
│   │   └── api/
│   │       ├── route.ts              # /api health check
│   │       └── contact/route.ts      # /api/contact (Turnstile + mail)
│   │
│   ├── components/
│   │   ├── site/                     # ClickTake-specific components
│   │   │   ├── navbar.tsx            # Mega menu + theme toggle + mobile nav
│   │   │   ├── hero.tsx              # Hero with CTAs + stats
│   │   │   ├── hero-3d.tsx           # Three.js icosahedron + network nodes
│   │   │   ├── background-scene.tsx  # Canvas tech-grid animation
│   │   │   ├── custom-cursor.tsx     # Aperture cursor + comet trail
│   │   │   ├── scroll-animations.tsx # Scroll progress, reveal, count-up, dividers
│   │   │   ├── services.tsx          # Services grid with category gradients
│   │   │   ├── work.tsx              # Case studies / portfolio
│   │   │   ├── process.tsx           # How-we-work timeline
│   │   │   ├── testimonials.tsx      # Client testimonials
│   │   │   ├── about.tsx             # About preview section
│   │   │   ├── contact.tsx           # Inquiry + booking forms
│   │   │   ├── footer.tsx            # Multi-region footer + socials
│   │   │   ├── social-icons.tsx      # 8 social icons (Facebook, IG, Tumblr, ...)
│   │   │   ├── theme-toggle.tsx      # Light/dark switch
│   │   │   ├── turnstile-widget.tsx  # Cloudflare Turnstile React component
│   │   │   └── pages/                # Routed page components
│   │   │       ├── about-page.tsx
│   │   │       ├── services-page.tsx
│   │   │       ├── service-detail-page.tsx
│   │   │       ├── portfolio-page.tsx
│   │   │       ├── resources-page.tsx
│   │   │       ├── contact-page.tsx
│   │   │       └── legal-page.tsx
│   │   ├── ui/                       # shadcn/ui primitives (40+ components)
│   │   └── theme-provider.tsx        # next-themes wrapper
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts             # Mobile viewport hook
│   │   └── use-toast.ts              # Toast hook
│   │
│   └── lib/
│       ├── site-data.ts              # ⭐ Single source of truth for all brand/contact/nav data
│       ├── contact-schema.ts         # Zod schemas for inquiry + booking
│       ├── turnstile.ts              # Server-side Turnstile token verifier
│       ├── mailer.ts                 # Email sending + templates
│       ├── db.ts                     # Prisma client singleton
│       └── utils.ts                  # `cn()` and helpers
│
├── prisma/
│   └── schema.prisma                 # User, Post, ContactMessage models
│
├── public/                           # Logo + brand images
│   ├── clicktake-logo.png            # Primary logo (transparent)
│   ├── clicktake-logo.jpg            # Logo with white bg
│   ├── logo.svg                      # SVG logo
│   ├── image1.png ... image4.jpg     # OG / case study images
│   └── robots.txt                    # Static fallback
│
├── next.config.ts                    # Next.js config (standalone build)
├── tailwind.config.ts                # Tailwind v4 config + brand tokens
├── tsconfig.json                     # TypeScript config + path aliases
├── eslint.config.mjs                 # ESLint config
├── postcss.config.mjs                # PostCSS (Tailwind plugin)
├── components.json                   # shadcn/ui config
├── Caddyfile                         # Production reverse proxy config
├── package.json                      # Scripts + deps
└── bun.lock                          # Lockfile (Bun)
```

## Getting Started

### Prerequisites

- **Node.js 20+** or **Bun 1.1+** (recommended)
- Git

### Installation

```bash
# 1. Clone
git clone https://github.com/clicktaketechnologies/clicktaketechnologies.git
cd clicktaketechnologies

# 2. Install dependencies (pick one)
bun install          # recommended — uses bun.lock
# or
npm install
# or
yarn install
```

### Environment

Create a `.env.local` file in the project root:

```env
# Database (SQLite for dev; switch to Postgres URL for prod)
DATABASE_URL="file:./db/custom.db"

# Email (Resend or any SMTP)
RESEND_API_KEY=""
LEADS_EMAIL="Info@clicktaketech.com"
CONTACT_FROM_EMAIL="noreply@clicktaketech.com"

# Cloudflare Turnstile (anti-bot for contact form)
TURNSTILE_SECRET_KEY=""
TURNSTILE_SITE_KEY=""
```

> **Tip:** A `.env.example` file is included as a reference. Copy it to `.env.local` and fill in your keys.

### Database setup

```bash
# Generate Prisma client
bun run db:generate

# Push schema to SQLite (creates db/custom.db)
bun run db:push
```

### Run the dev server

```bash
bun run dev
# or
npm run dev
```

Open **http://localhost:3000** in your browser. The site defaults to dark theme.

## Available Scripts

| Script                | Description                                                        |
| --------------------- | ---------------------------------------------------------------- |
| `dev`                 | Start dev server on port 3000 (logs to `dev.log`)                |
| `build`               | Production build (Next.js standalone output + static + public)   |
| `start`               | Run the production standalone server (`bun .next/standalone/server.js`) |
| `lint`                | Run ESLint                                                       |
| `db:generate`         | Generate Prisma Client                                           |
| `db:push`             | Push schema changes to DB (no migration history)                 |
| `db:migrate`          | Create + apply a Prisma migration (dev)                          |
| `db:reset`            | Reset DB + reapply all migrations                                |

## Environment Variables

| Variable                | Required | Description                                       |
| ----------------------- | -------- | ------------------------------------------------- |
| `DATABASE_URL`          | ✅       | Prisma datasource URL (SQLite file or Postgres)  |
| `RESEND_API_KEY`        | ⚠️       | Resend API key for transactional email           |
| `LEADS_EMAIL`           | ⚠️       | Inbox that receives new inquiries (default: Info@) |
| `CONTACT_FROM_EMAIL`    | ⚠️       | From-address for thank-you emails                |
| `TURNSTILE_SECRET_KEY`  | ⚠️       | Cloudflare Turnstile server secret               |
| `TURNSTILE_SITE_KEY`    | ⚠️       | Cloudflare Turnstile site key (client side)      |

⚠️ = optional in dev (contact form falls back to skip-email / skip-verify), required for production contact form.

## Pages & Routes

| Route                              | Page Component               | Purpose                                              |
| ---------------------------------- | --------------------------- | --------------------------------------------------- |
| `/`                                | `page.tsx` (home)           | Hero + services + work + process + testimonials + about + contact |
| `/about`                           | `about-page.tsx`            | Company story, team, locations, timeline             |
| `/services`                        | `services-page.tsx`         | All services grouped by category                     |
| `/services/[category]/[service]`   | `service-detail-page.tsx`   | Individual service detail (dynamic, ISR-friendly)    |
| `/portfolio`                       | `portfolio-page.tsx`        | Selected case studies                                |
| `/resources`                       | `resources-page.tsx`        | Blog / insights / resources index                    |
| `/contact`                         | `contact-page.tsx`          | Inquiry form + discovery call booking                |
| `/legal/privacy`                   | `legal-page.tsx`            | Privacy policy                                       |
| `/legal/cookies`                   | `legal-page.tsx`            | Cookie policy                                        |
| `/legal/terms`                     | `legal-page.tsx`            | Terms of service                                     |
| `/api`                             | `route.ts`                  | Health check                                         |
| `/api/contact`                     | `contact/route.ts`          | POST endpoint for inquiry + booking                  |
| `/robots.txt`                      | `robots.ts`                 | Dynamic robots                                       |
| `/sitemap.xml`                     | `sitemap.ts`                | Dynamic sitemap (all pages + service detail routes)  |

## Components

### Site Components (`src/components/site/`)

- **`navbar.tsx`** — Sticky nav with logo, mega menu (Services), theme toggle, CTA button, mobile sheet menu.
- **`hero.tsx`** — Hero section with animated headline, dual CTAs, and stats row.
- **`hero-3d.tsx`** — Three.js scene: rotating icosahedron with wireframe edges, floating network nodes, and ambient dust particles.
- **`background-scene.tsx`** — Full-page `<canvas>` background: connected tech-grid nodes, animated edges, data streams, and click ripples. Theme-aware (re-paints on `.dark` class change via `MutationObserver`).
- **`custom-cursor.tsx`** — Aperture-style cursor that scales on hover, plus a fading comet trail. Hidden on touch devices.
- **`scroll-animations.tsx`** — Bundle of: `ScrollProgressBar` (top gradient bar), `ScrollToTop` (floating button), `SectionReveal` (viewport-triggered fade-up), `CountUp` (animated number counters), `SectionDivider` (decorative SVG dividers between sections).
- **`services.tsx`** — Services grid with per-category gradient, glow, hover-border, and accent colors. Renders the 14 services from `SERVICES` array.
- **`work.tsx`** — Portfolio showcase with case-study cards.
- **`process.tsx`** — 4-step delivery timeline (Discover → Design → Build → Launch).
- **`testimonials.tsx`** — Client quote carousel.
- **`about.tsx`** — About preview block on home page.
- **`contact.tsx`** — Two-form section: project inquiry + discovery-call booking. Wired to `/api/contact` with Turnstile.
- **`footer.tsx`** — Multi-column footer with brand, nav, locations, socials, and legal links.
- **`social-icons.tsx`** — 8 brand-accurate social icons (Facebook, Instagram, LinkedIn, YouTube, TikTok, Pinterest, Threads, Tumblr).
- **`theme-toggle.tsx`** — Animated sun/moon switch.
- **`turnstile-widget.tsx`** — React wrapper for Cloudflare Turnstile.

### UI Components (`src/components/ui/`)

40+ shadcn/ui primitives built on Radix UI: Accordion, AlertDialog, Alert, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, InputOTP, Input, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toaster, Toggle, ToggleGroup, Tooltip.

## API Endpoints

### `GET /api`
Health check. Returns `{ status: "ok", timestamp: <ISO> }`.

### `POST /api/contact`
Submits either an inquiry or a booking. Body shape:
```json
{
  "kind": "inquiry" | "booking",
  "data": { ... }
}
```

**Inquiry flow:**
1. Validate payload against `inquirySchema` (zod).
2. Verify Cloudflare Turnstile token server-side.
3. Send a thank-you email to the submitter.
4. Notify the internal team (`LEADS_EMAIL`) with full inquiry details.
5. Return `{ success: true }`.

**Booking flow:**
1. Validate payload against `bookingSchema` (zod).
2. Verify Turnstile.
3. Send a confirmation email to the submitter with date/time.
4. Notify the internal team with booking details.
5. Return `{ success: true }`.

## Brand & Identity

All brand constants live in **`src/lib/site-data.ts`** as the `SITE` object — the single source of truth consumed by every component.

| Property   | Value                                              |
| ---------- | ------------------------------------------------- |
| Name       | ClickTake Technologies                             |
| Domain     | www.clicktaketech.com                              |
| Email      | Info@clicktaketech.com                             |
| Tagline    | "Connecting in a better way"                      |
| Founded    | 2020                                               |
| Primary    | `#136DFF` (brand-blue)                            |
| Accent     | `#FF53A9` (brand-pink)                            |
| Phones     | +92 306 9753003 (PK) · +44 7391 653377 (UK)       |

**Tailwind tokens** (defined in `tailwind.config.ts` and `globals.css`):
- `--brand-blue: #136DFF`
- `--brand-pink: #FF53A9`
- `--brand-magenta`, `--brand-cyan`, `--brand-emerald` (companion palette)
- Plus full neutral scale, adaptive glass surfaces (`.glass`, `.glass-strong` using `color-mix in oklab`), gradient scrollbar, accent `::selection`, and `focus-visible` rings.

## SEO & Structured Data

- **`metadata` export** in `layout.tsx` — full Open Graph, Twitter cards, robots directives, locale-aware title template.
- **JSON-LD `Organization` schema** — injected via `<script type="application/ld+json">` in `<head>`. Includes multi-country `address` array, `areaServed`, 8 `sameAs` social links, and a `contactPoint` with sales email + phone.
- **`sitemap.ts`** — generates `/sitemap.xml` covering all static routes + every service detail page (computed from `SERVICES` array).
- **`robots.ts`** — generates `/robots.txt` referencing the sitemap and allowing all crawlers.
- **Geo-targeted content** — each location section (`Birmingham`, `Multan`, `Austin`, `Dubai`) has localized keywords, hours, coordinates, and phone numbers, improving local SEO for each market.

## Database

Prisma schema (`prisma/schema.prisma`) defines three models:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

> **Note:** A `ContactMessage` model is referenced in the codebase docs but the production contact API currently emails leads rather than persisting them. To persist inquiries, add a `ContactMessage` model and insert in `/api/contact` before sending emails. The schema is intentionally minimal to keep migrations clean — extend as needed.

**Dev DB:** SQLite at `./db/custom.db` (auto-created on `db:push`).
**Prod DB:** Switch `DATABASE_URL` to a Postgres connection string (e.g. Supabase, Neon, Railway). No code changes needed.

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add all environment variables from the [Environment Variables](#environment-variables) table.
4. Framework preset: **Next.js** (auto-detected).
5. Build command: `next build` (Vercel ignores the `cp` part of the npm script — that's for standalone Docker/Caddy deploys).
6. Deploy. Vercel will give you a `*.vercel.app` URL immediately.

### Self-hosted (Bun + Caddy)

The `build` script outputs a standalone server to `.next/standalone/`. To run with Bun behind Caddy:

```bash
# Build
bun run build

# Run the standalone server (NODE_ENV=production)
bun run start
```

The included `Caddyfile` shows a sample reverse-proxy config — point it at the Next.js port (default 3000) and enable HTTPS automatically via Let's Encrypt.

### Docker

```dockerfile
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", "server.js"]
```

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
[Instagram](https://www.instagram.com/clicktaketechuk/) ·
[LinkedIn](https://www.linkedin.com/company/click-take-technologies/) ·
[YouTube](https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw) ·
[TikTok](https://tiktok.com/@clicktaketech) ·
[Pinterest](https://pinterest.com/clicktaketech) ·
[Threads](https://threads.net/@clicktaketech) ·
[Tumblr](https://clicktaketech.tumblr.com)

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
