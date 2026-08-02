# Ahrefs Site Audit — Issue Summary & Fix Plan

**Project:** clicktaketech.com
**Audit date:** 2026-08-03
**Source CSVs:** 9 files in `/home/z/my-project/upload/`
**Total issue-page pairs:** 1,387 (across all severities)

---

## 1. Issues grouped by severity

### ERROR (6 issue types — 4 distinct root causes)

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

### WARNING (2 issue types)

| # | Issue | Affected pages | Root cause |
|---|---|---|---|
| W1 | Open Graph tags incomplete | **385** | Pages with own `openGraph` block override root layout and drop `og:image` |
| W2 | Open Graph URL not matching canonical | **4** — `/services`, `/legal/privacy`, `/legal/terms`, `/legal/cookies` | These pages don't set `openGraph.url`; falls back to homepage |

### NOTICE (2 issue types)

| # | Issue | Affected pages | Root cause |
|---|---|---|---|
| N1 | Indexable page has only 1 dofollow incoming internal link | **12** | Blog/case-study detail pages only linked from their index page |
| N2 | (links file for N1 — 4 source pages link to those 12) | 4 sources | Same as N1 |

---

## 2. Prioritised fix plan

**Ranking principle:** template fixes over per-page work, indexable pages first, then by affected-page count.

### Tier 1 — Critical (do first, biggest impact)

#### FIX-1: Purge dead links from `hub-spoke-map.ts` → kills 64 + 14 = 78 of the 96 broken URLs at the source
- **Why first:** One file edit removes 78 broken targets AND clears the "Indexable page links to broken page" warning on all 391 source pages. Highest leverage by far.
- **Approach:** For each `/blog/<slug>` and `/case-studies/<slug>` href in `hub-spoke-map.ts`, check if the slug exists in `BLOG_POSTS` / `CASE_STUDIES`. If not, either (a) remove the entry, or (b) comment it out with a `// TODO: author <slug>` marker for future content.
- **Decision needed:** Remove the placeholder links entirely, OR keep them as a content backlog but mark them `rel="nofollow"` + `data-pending` so Ahrefs stops flagging? **Recommendation: remove** — keeps the file honest about what exists.

#### FIX-2: Add missing routes for `/careers/[slug]`, `/resources/[slug]`, `/services/<top>`, `/legal`
- **2a. `/careers/[slug]/page.tsx`** — new route. Renders `CAREER_ROLES.find(slug)`. Data already exists for 4 of 5 slugs; the 5th (`frontend-engineer-intern`) needs a record added or the link removed from `careers-page.tsx`.
- **2b. `/resources/[slug]/page.tsx`** — new route. Renders `RESOURCES.find(slug)`. All 6 slugs have data.
- **2c. `/services/<top>/page.tsx`** — 4 category index pages (`/services/ai`, `/services/creative`, `/services/digital-marketing`, `/services/web`). Either:
  - Add top-level slugs `ai`, `creative`, `digital-marketing`, `web` to `SERVICES` (cleanest), OR
  - Add an early branch in `services/[[...slug]]/page.tsx` that detects single-segment category slugs and renders a category landing page.
- **2d. `/legal/page.tsx`** — simple index page listing the 3 legal sub-pages. Also fixes the orphan-page issue for `/legal/terms` and `/legal/cookies` if linked from this index.

### Tier 2 — High (large affected-page count)

#### FIX-3: Fix Open Graph inheritance — clears 385 + 4 = 389 warnings
- **3a. OG image missing (385 pages):** Pages with their own `openGraph` block (`/contact`, `/case-studies`, `/solutions/*`, `/services/*`, `/blog/*`, `/about`, `/team`, `/pricing`, `/portfolio`, `/resources`, `/careers`) override the root `openGraph.images`. Two options:
  - **Option A (recommended):** Add a shared `DEFAULT_OG_IMAGE` constant and include `images: [DEFAULT_OG_IMAGE]` in every page-level `openGraph` block. Explicit, easy to audit.
  - **Option B:** Refactor pages to spread `...rootOpenGraph` and override only `title`/`description`/`url`. Less code, harder to reason about.
- **3b. OG URL ≠ canonical (4 pages):** Add `url: <canonical-url>` to the `openGraph` block on `/services`, `/legal/privacy`, `/legal/terms`, `/legal/cookies`.

### Tier 3 — Medium (orphans + low internal-link count)

#### FIX-4: Link `/legal/terms` and `/legal/cookies` from the footer
- Currently footer only links to `/legal/privacy`. Add the other two — also fixed by FIX-2d if the `/legal` index page is linked from the footer.

#### FIX-5: Boost internal links to the 12 single-inlink pages
- Add a "Related blog posts" / "More case studies" block to the bottom of each blog post and case study detail page. Template fix in `blog-post-page.tsx` and `case-studies-page.tsx`. Picks 3 sibling slugs from the same category and renders dofollow links.

### Tier 4 — Low / data hygiene

#### FIX-6 (optional): Decide on the 64 unwritten blog posts
- These are real planned topics (RAG architecture guide, OAuth flows explained, etc.) referenced as "spoke" content in the SEO hub-spoke strategy.
- If they will be authored soon, leave them in a content backlog OUTSIDE the rendered HTML (e.g. a `TODO.md` in the repo, not in `hub-spoke-map.ts`).
- If they won't be authored, remove the entries from `hub-spoke-map.ts` permanently (covered by FIX-1).

---

## 3. Fix matrix (what to approve)

| Fix | Files touched | Est. lines | Affects | Tier |
|---|---|---|---|---|
| FIX-1 | `src/lib/seo/hub-spoke-map.ts` | ~80 (remove/comment) | 78 broken URLs + 391 source pages | 1 |
| FIX-2a | New `src/app/careers/[slug]/page.tsx` + remove dead link if needed | ~80 | 5 broken URLs | 1 |
| FIX-2b | New `src/app/resources/[slug]/page.tsx` | ~80 | 6 broken URLs | 1 |
| FIX-2c | `src/app/services/[[...slug]]/page.tsx` (early branch) | ~40 | 4 broken URLs | 1 |
| FIX-2d | New `src/app/legal/page.tsx` | ~30 | 1 broken URL + 2 orphans | 1 |
| FIX-3a | `src/lib/og-image.ts` (new const) + ~12 page files | ~50 | 385 warnings | 2 |
| FIX-3b | 4 page files (add `url:`) | ~4 | 4 warnings | 2 |
| FIX-4 | `src/components/site/footer.tsx` | ~6 | 2 orphans | 3 |
| FIX-5 | `blog-post-page.tsx`, `case-studies-page.tsx` | ~60 | 12 notices | 3 |

**Total: ~9 source files modified, ~4 new files created, ~400 lines of code.**

---

## 4. What I will NOT touch
- The 64 unwritten blog post slugs stay as a content backlog (not auto-generated stub pages — that would create thin content and hurt SEO more than 404s).
- No redirects to homepage (would be soft-404s).
- No `robots.txt` disallow (would deindex legitimate future content).
- No auto-merge / auto-publish — you push to `main` when ready.
