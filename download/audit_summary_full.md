# Ahrefs Site Audit — Complete Issue Summary & Fix Plan

**Project:** clicktaketech.com
**Audit date:** 2026-08-03
**Source CSVs:** 16 files in `/home/z/my-project/upload/` (parsed fresh — 7 more than prior pass)
**Total issue-page pairs:** ~1,750 (across all severities)

---

## 1. Issues grouped by severity

### 🔴 ERROR (3 issue types — 4 distinct root causes)

| # | Issue | Affected pages | Root cause |
|---|---|---|---|
| E1 | 404 / 4XX page | **96** broken target URLs | Missing routes / missing content |
| E2 | Indexable page links to broken page | **391** source pages | `hub-spoke-map.ts` hardcodes dead links shown on every DeepDive page |
| E3 | Orphan page (no incoming internal links) | **2** — `/legal/cookies`, `/legal/terms` | Footer only links to `/legal/privacy` |

**The 96 broken URLs decompose into 6 route gaps:**

| Pattern | Count | Route status | Has data? |
|---|---|---|---|
| `/blog/<slug>` | 64 | ✅ `/blog/[slug]` exists | ❌ Slug not in `BLOG_POSTS`, no DB row |
| `/case-studies/<slug>` | 14 | ✅ `/case-studies/[slug]` exists | ❌ Slug not in `CASE_STUDIES` |
| `/careers/<slug>` | 5 | ❌ No `/careers/[slug]` route | ✅ Slug IS in `CAREER_ROLES` (4 of 5) |
| `/resources/<slug>` | 6 | ❌ No `/resources/[slug]` route | ✅ Slug IS in `RESOURCES` (all 6) |
| `/services/<top>` (ai, creative, digital-marketing, web) | 4 | ⚠️ Catch-all exists but slug not in `SERVICES` | ❌ Top-level category index never built |
| `/legal` (index) | 1 | ❌ No `/legal/page.tsx` | n/a |
| **Total** | **96** | | |

### 🟠 WARNING (4 issue types)

| # | Issue | Affected pages | Root cause |
|---|---|---|---|
| W1 | Open Graph tags incomplete (missing og:image) | **385** | Pages with own `openGraph` block override root layout and drop `og:image` |
| W2 | Open Graph URL not matching canonical | **4** — `/services`, `/legal/privacy`, `/legal/terms`, `/legal/cookies` | These pages don't set `openGraph.url`; falls back to homepage |
| W3 | Meta description too long (>160 chars) | **356** | Template concatenation: `${service.title} in ${city}, ${country}. ${service.description} From ${price}. Local/Remote delivery with senior engineers... Book consultation.` for `/cities/*` pages; similar pattern in `/services/*` and `/solutions/*` |
| W4 | Meta description too short (<70 chars) | **3** — `/case-studies/custom-software-saas` (88c — borderline), `/legal/terms` (96c), `/case-studies/ecommerce-headless-rebuild` (61c) | Per-page values in static data need shortening/expanding |

**Long-meta URL pattern breakdown (W3):**
- `/cities/<city>/<category>/<service>` — ~280 pages (14 cities × ~20 services each)
- `/services/<category>/<service>` — ~35 pages
- `/solutions/<slug>` — 6 pages
- `/` and section indices — ~35 pages

### 🟡 NOTICE (5 issue types)

| # | Issue | Affected pages | Status |
|---|---|---|---|
| N1 | Indexable page has only 1 dofollow incoming internal link | **12** | Blog/case-study detail pages only linked from their index page |
| N2 | HTTP→HTTPS redirect | **4** | Informational — redirects already configured correctly |
| N3 | Redirect chain (1 hop) | **3** | `www.clicktaketech.com → clicktaketech.com` chain on http variant; informational |
| N4 | Meta description too long (non-indexable) | **1** | Ahrefs flagged the `?subject=custom-quote` variant of `/contact`; not indexable, ignore |
| N5 | Pages to submit to IndexNow | **2,383** | Informational list, not a bug — Ahrefs suggests submitting these to Bing/Yandex IndexNow API |

---

## 2. Prioritised fix plan

**Ranking principle:** template fixes over per-page work, indexable pages first, then by affected-page count.

### Tier 1 — Critical (do first, biggest impact) ✅ PREVIOUSLY APPROVED

#### FIX-1: Purge dead links from `hub-spoke-map.ts` → kills 64 + 14 = 78 of the 96 broken URLs at the source
- **Why first:** One file edit removes 78 broken targets AND clears the "links to broken page" warning on all 391 source pages. Highest leverage by far.
- **Approach:** For each `/blog/<slug>` and `/case-studies/<slug>` href in `hub-spoke-map.ts`, check if the slug exists in `BLOG_POSTS` / `CASE_STUDIES`. If not, remove the entry.
- **Decision:** Remove placeholder links entirely (keep the file honest about what exists). Move unwritten topics to a content backlog in a `TODO.md`, not in the rendered source.

#### FIX-2: Add missing routes for `/careers/[slug]`, `/resources/[slug]`, `/services/<top>`, `/legal`
- **2a. `/careers/[slug]/page.tsx`** — new route. Renders `CAREER_ROLES.find(slug)`. Data already exists for 4 of 5 slugs; the 5th (`frontend-engineer-intern`) needs a record added OR the link removed from `careers-page.tsx`. Recommendation: add the record (cheap, real role).
- **2b. `/resources/[slug]/page.tsx`** — new route. Renders `RESOURCES.find(slug)`. All 6 slugs have data.
- **2c. `/services/<top>` category index** — 4 category index pages (`/services/ai`, `/services/creative`, `/services/digital-marketing`, `/services/web`). Add early branch in `services/[[...slug]]/page.tsx` that detects single-segment category slugs and renders a category landing page (lists sub-services in that category).
- **2d. `/legal/page.tsx`** — simple index page listing the 3 legal sub-pages. Also fixes the orphan-page issue for `/legal/terms` and `/legal/cookies` if linked from this index.

### Tier 2 — High (large affected-page count) ✅ FIX-3 PREVIOUSLY APPROVED + NEW FIX-7

#### FIX-3: Fix Open Graph inheritance — clears 385 + 4 = 389 warnings
- **3a. OG image missing (385 pages):** Add a shared `DEFAULT_OG_IMAGE` constant and include `images: [DEFAULT_OG_IMAGE]` in every page-level `openGraph` block. Explicit, easy to audit. (Note: `DEFAULT_OG_IMAGE` already exists at `src/lib/og-image.ts` per import I saw in `cities/[city]/[[...service]]/page.tsx` — need to apply to remaining ~12 page files.)
- **3b. OG URL ≠ canonical (4 pages):** Add `url: <canonical-url>` to the `openGraph` block on `/services`, `/legal/privacy`, `/legal/terms`, `/legal/cookies`.

#### FIX-7 (NEW): Truncate meta descriptions to ≤155 chars — clears 356 + 3 = 359 warnings
- **7a. `/cities/*` template (280 pages):** Edit `src/lib/seo/city-service-content.ts` line 150 — replace concatenation with a length-bounded helper:
  ```ts
  const metaDescription = truncateMeta(
    `${service.title} in ${city.name}. ${service.description} ${city.hasOffice ? "Local office." : "Remote delivery."} Book a free consultation.`,
    155
  );
  ```
- **7b. `/services/*` template (~35 pages):** Audit `src/app/services/[[...slug]]/page.tsx` `description:` blocks at lines 150/155/191/199 — apply same `truncateMeta` helper or shorten source strings.
- **7c. `/solutions/*` template (6 pages):** `src/app/solutions/[slug]/page.tsx` uses `solution.summary` / `solution.hero` — bound these to ≤155 chars in the metadata layer (don't shorten the body hero text — only the meta description copy).
- **7d. `/` homepage (1 page):** `src/app/page.tsx` line 25/30/48 — manually shorten the homepage meta description to ≤155 chars. Current is 171 chars.
- **7e. 3 short meta descriptions (3 pages):** Per-page fix in `src/lib/site-data.ts` — lengthen the `description` for `custom-software-saas` case study, `legal/terms`, and `ecommerce-headless-rebuild` case study to ≥70 chars.

### Tier 3 — Medium (orphans + low internal-link count)

#### FIX-4: Link `/legal/terms` and `/legal/cookies` from the footer
- Currently footer only links to `/legal/privacy`. Add the other two — also fixed by FIX-2d if the `/legal` index page is linked from the footer.

#### FIX-5: Boost internal links to the 12 single-inlink pages
- Add a "Related blog posts" / "More case studies" block to the bottom of each blog post and case study detail page. Template fix in `blog-post-page.tsx` and `case-studies-page.tsx`. Picks 3 sibling slugs from the same category and renders dofollow links.

### Tier 4 — Low / informational (no code change needed)

#### FIX-6 (optional): Decide on the 64 unwritten blog posts
- These are real planned topics referenced as "spoke" content in the SEO hub-spoke strategy. If they will be authored soon, leave them in a content backlog OUTSIDE the rendered HTML. If not, remove from `hub-spoke-map.ts` permanently (covered by FIX-1).

#### FIX-8 (informational, NO action): Redirects, chains, IndexNow
- N2 (HTTP→HTTPS), N3 (redirect chains) — your `vercel.json` / Cloudflare config already handles these correctly; Ahrefs is reporting the redirect hops themselves, not a misconfiguration.
- N5 (IndexNow submission) — optional SEO acceleration. If you want to act on it: set up an IndexNow key at `/api/indexnow/route.ts` and POST the URL list on deploy. Not a bug, so not in scope unless you explicitly want it.

---

## 3. Fix matrix (what to approve)

| Fix | Files touched | Est. lines | Affects | Tier | Status |
|---|---|---|---|---|---|
| FIX-1 | `src/lib/seo/hub-spoke-map.ts` | ~80 (remove) | 78 broken URLs + 391 source pages | 1 | ✅ Approved |
| FIX-2a | New `src/app/careers/[slug]/page.tsx` + add 1 role record | ~80 | 5 broken URLs | 1 | ✅ Approved |
| FIX-2b | New `src/app/resources/[slug]/page.tsx` | ~80 | 6 broken URLs | 1 | ✅ Approved |
| FIX-2c | `src/app/services/[[...slug]]/page.tsx` (early branch) | ~40 | 4 broken URLs | 1 | ✅ Approved |
| FIX-2d | New `src/app/legal/page.tsx` | ~30 | 1 broken URL + 2 orphans | 1 | ✅ Approved |
| FIX-3a | `src/lib/og-image.ts` (existing) + ~12 page files | ~50 | 385 warnings | 2 | ✅ Approved |
| FIX-3b | 4 page files (add `url:`) | ~4 | 4 warnings | 2 | ✅ Approved |
| **FIX-7a** | `src/lib/seo/city-service-content.ts` + new `truncateMeta` helper | ~20 | 280 warnings | 2 | ⏳ **NEW — needs approval** |
| **FIX-7b** | `src/app/services/[[...slug]]/page.tsx` | ~15 | 35 warnings | 2 | ⏳ **NEW — needs approval** |
| **FIX-7c** | `src/app/solutions/[slug]/page.tsx` + `site-data.ts` SOLUTIONS | ~10 | 6 warnings | 2 | ⏳ **NEW — needs approval** |
| **FIX-7d** | `src/app/page.tsx` | ~3 | 1 warning | 2 | ⏳ **NEW — needs approval** |
| **FIX-7e** | `src/lib/site-data.ts` (3 entries) | ~6 | 3 warnings | 2 | ⏳ **NEW — needs approval** |
| FIX-4 | `src/components/site/nx-footer.tsx` | ~6 | 2 orphans | 3 | ⏳ Needs approval |
| FIX-5 | `blog-post-page.tsx`, `case-studies-page.tsx` | ~60 | 12 notices | 3 | ⏳ Needs approval |

**Total: ~14 source files modified, ~5 new files created, ~500 lines of code.**

---

## 4. What I will NOT touch
- The 64 unwritten blog post slugs stay as a content backlog (not auto-generated stub pages — that would create thin content and hurt SEO more than 404s).
- No redirects to homepage (would be soft-404s).
- No `robots.txt` disallow (would deindex legitimate future content).
- No auto-merge / auto-publish — you push to `main` when ready.
- FIX-8 (redirects / IndexNow) is informational only — no code change.
