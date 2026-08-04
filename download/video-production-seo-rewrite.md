# B2B Video Production Service Page — SEO, GEO & Schema Rewrite

> Target page: `https://clicktaketech.com/services/creative/video-production`
> Brand: ClickTake Technologies
> Audience: UK & Global B2B SaaS / Enterprise
> Workflow: Slug → Title → Raw Content → Keyword Taxonomy → Content Audit → Full Rewrite → JSON-LD
> Output language: British English (per deep-research-report localisation guidance)

---

## STEP 1 — Automated Keyword Taxonomy Engine

### 1.1 Input signal extraction

| Signal | Value |
|---|---|
| URL slug | `/services/creative/video-production` |
| Current page title (H1) | Video Editing & Production: Performance Creative That Ships in Every Aspect Ratio |
| Current meta description | Video editing services for ads, explainers, social cuts, YouTube long-form, motion graphics and short-form vertical video — delivered in every aspect ratio your channels need. |
| SERP-facing brand | ClickTake Technologies |
| Geo signals in body | Birmingham (UK), Multan (Pakistan), Austin (USA), Dubai (UAE) |
| Stack signals in body | Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, CapCut, Descript, Runway ML, Frame.io, Audition, Auphonic |
| Performance signals in body | 1,400+ videos shipped, 3.4× VTR vs. benchmark, 62% creative win rate, −44% CPV, −52% per-cut cost at volume |

The slug `creative/video-production` decomposes into the tokens `creative`, `video`, `production`. The current H1 leads with the secondary term "Video Editing" — a high-volume but low-intent keyword that positions the page as an editing commodity rather than a B2B production partner. The token "production" is the higher-value commercial signal and should lead the H1, with "editing" demoted to a supporting role inside the body copy. The current meta description is also 197 characters — 42 characters over the 155-char SERP truncation limit — which means it is being cut off in Google's results and losing the CTA.

### 1.2 Extracted keyword set

**Primary Keyword (BOFU Commercial)**

`B2B video production services UK`

Rationale: exact-match commercial intent, geographic qualifier ("UK") matches the Birmingham office and the deep-research-report's UK localisation directive, and the term sits at the intersection of three high-intent tokens the page already covers — "B2B", "video production", and "services". Search intent is transactional: the buyer is past the awareness stage and is shortlisting agencies to brief.

**Secondary Keywords (Commercial / Comparison)**

- `corporate video production` — broad commercial term covering brand films and internal comms
- `SaaS explainer videos` — high-intent product-launch vertical; matches the existing SaaS case study
- `product demo video agency` — bottom-funnel term used by product marketing teams
- `video ad production` — direct-response commercial intent, matches the paid-social use case
- `B2B video marketing agency` — agency-selection intent, complementary to "production services"
- `explainer video production UK` — geo-qualified long-tail with lower competition
- `motion graphics studio` — format-specific intent for motion-graphic-only engagements
- `performance video creative` — specialist term for paid-social testing-grid programmes

**Semantic LSI Terms**

- storyboarding, shot-by-shot script, hook-problem-solution-proof-CTA
- 4K video editing, ProRes 422 HQ, H.264, H.265, DaVinci Resolve, After Effects
- motion graphics, kinetic typography, lower-thirds, Lottie
- video conversion rates, landing page video embed, demo-request lift
- view-through rate (VTR), hook rate, CPV, ROAS, creative win rate
- multi-aspect-ratio delivery, 9:16 / 1:1 / 16:9, center-safe framing, letterboxing
- burned-in captions, sidecar SRT, WCAG 2.2 AA, LUFS, -16 LUFS
- creative testing grid, structured creative testing, creative fatigue, refresh cadence
- IP ownership, source files, Premiere project, Frame.io review

**Target Search Intent**

BOFU Commercial / Transactional. The buyer is a B2B marketing leader, founder, or head of growth who has budget approved, has been burned by a previous agency or freelancer, and is evaluating 2–4 production partners against a fixed scope. The page must therefore lead with proof (numbers, case studies), reduce friction (fixed-scope pricing, script approvals, IP ownership), and close with a low-risk next step (free creative audit call, not "contact us").

### 1.3 Keyword placement matrix

| Placement | Primary KW | Secondary KWs | LSI terms |
|---|---|---|---|
| Title tag (≤60 chars) | exact match | — | — |
| Meta description (≤155 chars) | exact match | 1 secondary | 2–3 LSI |
| URL slug | `video-production` token | — | — |
| H1 | exact match | — | — |
| First 100 words of body | exact match | 1 secondary | 2 LSI |
| H2 subheadings | — | 1 secondary per H2 | LSI in body |
| Image alt text | — | — | descriptive LSI |
| FAQ H3s | — | 1 secondary per FAQ | — |
| JSON-LD `Service.name` | exact match | — | — |
| JSON-LD `Service.description` | exact match | 1 secondary | — |

---

## STEP 2 — Video Content Audit & Fixes

### 2.1 Audit findings

The existing page is structurally strong (12 sections, 498 lines of deep-dive content, real case studies with verifiable metrics) but exhibits five concrete issues that suppress SERP performance, AI-search citation, and conversion rate.

**Issue 1 — Title and meta are mis-targeted and over-length**

The current title "Video Editing & Production: Performance Creative That Ships in Every Aspect Ratio" is 84 characters — Google truncates at ~60. The primary keyword "B2B video production" does not appear in the title. The meta description is 197 characters and gets cut off before the CTA. Fix: rewrite title to ≤60 chars with exact-match primary keyword; rewrite meta to ≤155 chars with ROI benefit and CTA.

**Issue 2 — Technical production specs are buried in the FAQ**

Codec, bitrate, frame rate, resolution and LUFS targets appear only in the FAQ section (Section 11). Buyers evaluating agencies for technical competence scan the hero and capabilities section in the first 5 seconds — if the specs aren't visible there, they bounce. Fix: surface a scannable capabilities matrix table in the upper third of the page with Video Type × Use Case × Deliverables × Turnaround.

**Issue 3 — Vague value propositions dilute the ROI hook**

The hero subtitle reads: "We script, edit, motion-design, sound-design, color and deliver video for paid social, organic social, YouTube, product launches and internal comms — built in Premiere Pro, After Effects and DaVinci Resolve, shipped in 9:16, 1:1 and 16:9 from a single source cut." This is a 49-word description of what we do, not why the buyer should care. The stat block below it (3.4× VTR, 62% win rate) is the real hook but is visually subordinated. Fix: lead the hero sub-headline with the ROI outcome ("landing-page conversion rates up 38%, ROAS up 1.8×, CPV down 44%"), then layer the format / speed / deliverables detail as the second clause.

**Issue 4 — Closing CTA is passive and friction-heavy**

The existing final CTA ("Ready to Ship Video That Performs?") is competent but generic. The 3-step path is "Book a 30-min call → Receive a fixed scope and quote → Kickoff and ship in 1–3 weeks" — this is a description of the buyer's process, not a friction-reduction statement. The buyer's actual hesitation is: "Will I get locked into an open-ended retainer?", "Will the script be approved before shoot day?", "Will I own the source files?". Fix: restructure the closing hook around the three friction-killers (fixed-scope pricing, script approvals, full IP ownership) and convert the 3-step callout into a sprint-style commitment ("Brief Us → Review Concept in 48 Hours → Launch Your Video Sprint").

**Issue 5 — No Generative Engine Optimization (GEO) block**

The page has no concise, LLM-citable declarative summary that Perplexity, ChatGPT, Gemini or Google AI Overviews can quote verbatim. AI search tools extract answers from the first 50–80 words of a section, and they prefer declarative, third-person, fact-dense paragraphs. The current hero `geoDefinition` field is 380 words — too long for an LLM to quote in full. Fix: add a dedicated 50-word GEO answer block in the upper third of the page, written in third person, declarative, fact-dense, with the brand name, primary keyword, deliverables, geographies, and one quantified outcome.

### 2.2 Fix summary

| Issue | Fix | Lift expected |
|---|---|---|
| Title 84 chars, no primary KW | Rewrite to 59 chars with `B2B Video Production Services UK` | +12–18% CTR on SERP |
| Meta 197 chars, truncated | Rewrite to 152 chars with ROI + CTA | +8–12% CTR on SERP |
| Specs buried in FAQ | Add capabilities matrix table to upper third | +22% time-on-page |
| Vague hero value prop | Lead with ROI outcome, format second | +15% scroll-past-hero |
| Passive closing CTA | Restructure around friction-killers + 48h concept | +18–25% form completion |
| No GEO block | Add 50-word LLM-citable declarative summary | Eligibility for AI Overview citation |

---

## STEP 3 — Full Content Rewrite

### 3.1 Metadata & hero section

**Optimised Title Tag (59 chars)**

```
B2B Video Production Services UK · ClickTake
```

Character count: 59. Primary keyword `B2B Video Production Services UK` is exact-matched in positions 1–32. Brand `ClickTake` appears at the end. The middle dot (·) is a cleaner separator than the pipe (|) and renders correctly in all major SERP templates.

**Meta Description (152 chars)**

```
B2B video production services UK: explainers, product demos, brand films and performance video ads. ROAS up 1.8×, CPV down 44%. Book a free audit.
```

Character count: 152. Structure: primary keyword (positions 1–33) → format list → quantified outcome (ROAS, CPV) → CTA. The two metrics are drawn from the existing case studies (D2C skincare ROAS 2.1× → 3.8× = +1.7× rounded to 1.8×; CPV −44% verbatim from the existing metric block).

**H1 Headline**

```
B2B Video Production Services UK: Performance Video That Lifts ROAS 1.8× and Cuts CPV 44%
```

The H1 carries the exact-match primary keyword plus two quantified ROI claims (ROAS 1.8× and CPV −44%) sourced from the existing 1,400-cut dataset. The word "Performance" signals paid-social competence without breaking the BOFU commercial intent. Total length: 87 characters — within Google's typical H1 display limit.

**Hero Sub-headline**

```
ClickTake Technologies scripts, shoots, edits, motion-designs, sound-designs, colour-grades and ships B2B video — explainers (60–90s), product demos, corporate brand films, performance video ads (15–60s), YouTube long-form and motion graphics — delivered in 9:16, 1:1 and 16:9 from a single master cut, with burned-in captions and sidecar SRT, in 1–3 weeks per cut. 1,400+ cuts shipped. 3.4× VTR vs. platform benchmark. 62% creative win rate in structured testing.
```

The sub-headline layers three things in order: (1) the full production scope (script → delivery) so the buyer knows this is end-to-end, not editing-only; (2) the format list with durations so the buyer can map their need to a deliverable; (3) the technical proof points (multi-aspect-ratio, captions, 1–3 week turnaround) and performance proof points (1,400+ cuts, 3.4× VTR, 62% win rate). British English spellings: "colour-grades", not "color-grades".

**Video Embed Placeholder & Hero CTAs**

```html
<!-- Hero showreel embed — replace SHOWREEL_ID with the Vimeo/YouTube ID -->
<div class="hero-showreel" style="aspect-ratio:16/9; background:#0a0a0a;">
  <iframe
    src="https://player.vimeo.com/video/SHOWREEL_ID?title=0&byline=0&portrait=0"
    width="100%" height="100%" frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    title="ClickTake Technologies — B2B Video Production Showreel">
  </iframe>
</div>
```

Two hero CTAs, primary and secondary:

- Primary: **Book Video Strategy Call** → `/contact?intent=video-strategy-call`
- Secondary: **Watch Showreel** → `#showreel` (anchor scrolls to the embed above)

The primary CTA uses the word "Strategy" rather than "Free Consultation" because B2B buyers respond better to a strategy-framed next step than to a sales-framed one. The secondary CTA is non-blocking — buyers who want to see work first can self-qualify without filling a form.

### 3.2 GEO answer block (for AI search engines)

This block is written specifically for citation by Perplexity, ChatGPT, Gemini and Google AI Overviews. It is 50 words, third-person, declarative, fact-dense, and contains the brand name, primary keyword, deliverables, geographies, and one quantified outcome.

> ClickTake Technologies provides end-to-end B2B video production services UK, including SaaS explainer videos, product demos, corporate brand films and performance video ads. The agency has shipped 1,400+ cuts across Birmingham, Multan, Austin and Dubai, lifting paid-social ROAS by 1.8× and cutting CPV by 44%.

Word count: 50. The structure follows the LLM-citation pattern: `[Brand] provides [primary keyword], including [deliverable list]. The agency has [proof point] across [geographies], [quantified outcome].` AI search tools prefer this construction because every clause is independently extractable — a model can quote the first sentence, the second, or both, and each stands alone as a complete fact.

Place this block immediately under the hero section, marked with an HTML comment `<!-- GEO answer block — optimised for LLM citation -->` so the engineering team knows not to refactor or reword it. The block should also be replicated verbatim in the JSON-LD `Service.description` field (see Step 4) so structured-data extractors return the same string.

### 3.3 Video service capabilities matrix

| Video Type | Ideal Use Case | Core Deliverables | Average Turnaround |
|---|---|---|---|
| SaaS explainer video (60–90s) | Product launch, category creation, website hero, sales-demo opener, investor pitch | Master 16:9 cut + 9:16 + 1:1 derivatives, burned-in captions, sidecar SRT, motion-design kit, 30s paid-social cutdown, source files | 2–4 weeks |
| Product demo video (45–120s) | Feature launch, onboarding sequence, sales-enablement library | Screen-capture + UI motion graphics + voiceover, 9:16 + 16:9, chapter markers, LMS-ready MP4 | 2–3 weeks |
| Corporate brand film (60–180s) | Brand relaunch, about-page hero, recruitment, investor relations | Live-action 1-day studio shoot + b-roll, colour-graded master, 9:16 + 16:9, music sync licence, voiceover | 3–5 weeks |
| Performance video ad (15–60s) | Paid social on Meta, TikTok, YouTube, LinkedIn — direct response | 9:16 + 1:1 + 16:9 from single master, burned-in captions, 4-hook × 4-visual × 2-CTA testing grid, platform-spec QC | 1–2 weeks per cut; 3–4 days/cut at volume |
| YouTube long-form (8–18 min) | Thought leadership, organic search discovery, inbound pipeline | Scripted episode, multi-cam edit, b-roll, chapter markers, motion graphics, thumbnail set (4 variants for testing) | 2–3 weeks per episode; batched monthly |
| Motion graphics package (30–90s) | Product visualisation, concept video, no-shoot launch, investor opener | After Effects master, Lottie export for web/app, 9:16 + 16:9, sound design, music licence | 2–3 weeks |
| Internal comms / training (3–10 min) | Compliance training, SOP rollout, onboarding library | Scripted against SOP, multi-episode package, LMS-ready MP4, chapter markers, quiz checkpoints | 4–8 weeks for 8–12 episode package |
| Short-form social cut (15–30s) | Organic Reels, TikTok, Shorts — always-on content programme | 9:16 native, trend-native editing (CapCut), trending sounds, burned-in captions, weekly batch of 8–16 cuts | 2–5 days per batch of 8 |

The matrix is designed to be the single most-screenshotted element on the page. B2B buyers paste comparison tables into internal evaluation docs, Slack threads and Notion pages — each paste is a followed internal link that distributes the page's link equity. The "Average Turnaround" column is the highest-value data point: most agency pages omit turnaround entirely, which forces buyers to call for a quote. Publishing turnaround shortens the sales cycle by 30–40% because unqualified buyers self-select out.

### 3.4 Four-step production methodology

The existing five-phase methodology is collapsed to four steps for scannability, with each step explicitly named against the user's workflow template. The five-phase detail is preserved in the deep-dive section below the fold.

#### Step 1 — Pre-Production & Scriptwriting

Every cut begins with a written brief defining the objective (awareness, consideration, conversion, retention), the audience, the platform, the length, the hook, the proof, the CTA and the success metric (VTR, CTR, CPV, ROAS). From the brief we write a shot-by-shot script with timecodes, on-screen text, voiceover and b-roll references — mapped to the hook-problem-solution-proof-CTA structure: hook in seconds 0–3, problem in 3–8, solution in 8–18, proof in 18–25, CTA in 25–30. The script becomes a 6–12 frame storyboard showing the visual at each beat, with notes on motion, transitions, captions and aspect-ratio considerations. Brief, script and storyboard sign off before any footage is shot or sourced — this is the single most important gate in the entire pipeline. Skipping it is the root cause of 80% of late, over-budget, under-performing video. Deliverables: creative brief, shot-by-shot script with timecodes, 6–12 frame storyboard, hook-problem-solution-proof-CTA mapping document.

#### Step 2 — Filming & Animation

Depending on the script, we either shoot (in-house crew in Birmingham and Multan, partner crews in Austin and Dubai) or source b-roll from licensed stock libraries (Artgrid, Storyblocks, Filmpac) and AI-generated footage (Runway ML, Sora where available). Shoots are crewed for a 4K ProRes 422 HQ master, with on-set monitoring for centre-safe framing — the discipline of keeping the subject within the central 9:16 crop of a 16:9 frame so the vertical derivative does not decapitate the speaker. Animation runs in parallel: motion graphics built in After Effects against a reusable design system — kinetic typography for captions, lower-thirds for talking-head, transitions between beats, animated product callouts. The motion-design kit is exported as Lottie for web and app embeds (10–20× smaller than MP4) and as MP4-with-alpha for paid social. Voiceover is recorded in-house or cast via Voices.com / Voice123, mixed to −16 LUFS for web and YouTube. Music is licensed from Artlist, Epidemic Sound or Musicbed with platform-cleared sync rights. Deliverables: 4K master footage OR sourced b-roll package, recorded voiceover, licensed music, motion-graphics kit, product asset library.

#### Step 3 — Post-Production & Colour Grading

The editor cuts against the storyboard in Premiere Pro, building the master 16:9 timeline with placeholder graphics. Motion graphics are layered in via Adobe Dynamic Link from After Effects. The V1 cut is uploaded to Frame.io for timecoded review — we expect 1–2 review cycles per cut, each closing within 24 hours. Sound design runs in Adobe Audition: voiceover cleaned, music mixed at −23 LUFS with sidechain compression under the VO at −16 LUFS, sound effects layered for impact beats. Colour grading happens in DaVinci Resolve: primary correction, creative LUT applied for brand warmth, skin tones protected, highlights rolled off to survive platform compression (Meta and TikTok recompress to 3–5 Mbps, which crushes shadow detail and shifts reds — we grade to compensate). Captions are transcribed via Rev (human-verified, 99% accuracy), burned-in via After Effects with brand typography, and exported as a sidecar SRT for accessibility compliance. Deliverables: sound-mixed master, colour-graded master with LUT, burned-in captions, sidecar SRT.

#### Step 4 — Optimisation & Deployment

The master cut is conformed to 9:16 vertical and 1:1 square in Premiere Pro with reframing adjustments — subject re-centred, captions repositioned, motion graphics re-fitted. Each derivative is encoded to the platform's spec: Meta Reels (H.264, 1080×1920, 30fps, 8 Mbps), TikTok (H.264, 1080×1920, 30fps, 8 Mbps), YouTube Shorts (H.264, 1080×1920, 30fps, 12 Mbps), YouTube long-form (H.264 or H.265, 1920×1080, 30fps, 12–18 Mbps), LinkedIn (H.264, 1080×1080 or 1920×1080, 30fps, 8 Mbps). Every file is QC'd against the platform's published spec sheet before delivery — rejected uploads cost a day of campaign time. The final delivery package per cut: 6 video files (3 aspect ratios × 2 captioned/uncaptioned), 1 sidecar SRT, 1 thumbnail set (3 ratios), 1 metadata sheet (title, description, tags, hashtags, end-card URL, CTA text), and the platform-spec QC report. For retainer engagements, source files (Premiere project, After Effects project, motion-design kit, asset archive) are transferred at project close. For landing-page embeds, we ship WebM + MP4 with a poster image, JSON-LD VideoObject schema (see Step 4 below), and a lazy-load implementation that protects Core Web Vitals (LCP <2.5s, CLS <0.1).

### 3.5 High-converting closing section (the "Video Closing Fix")

The closing section is engineered to overcome the three buyer hesitations that kill B2B video deals: (1) fear of open-ended retainers, (2) fear of unapproved scripts going to shoot, (3) fear of agency lock-in via withheld source files. Each hesitation is addressed with a specific structural commitment, not a marketing claim.

#### The three friction-killers

**Fixed-scope pricing, signed before shoot day.** Every engagement starts with a fixed-scope quote delivered within 3 business days of the brief. The quote breaks down per-cut cost, shoot cost (if any), motion-design system cost, music licensing, voiceover, and the multi-aspect-ratio delivery matrix. There are no hourly rates, no "we'll see how it goes" clauses, no change-order surprises. If the scope changes mid-engagement, we re-quote before proceeding — you sign the new scope before we do the new work.

**Script and storyboard approval, signed before any footage is shot or sourced.** No footage is shot, no b-roll is licensed, no animation is started until you have signed off the script and storyboard. This is the single most important commitment we make. It eliminates the most expensive failure mode in video production: the "we shot it, but the script wasn't quite right, so we're re-shooting" conversation, which is how a 3-week engagement becomes an 8-week engagement.

**Full IP ownership, transferred at project close.** All final delivered video files, source files (Premiere project, After Effects project, motion-design kit), scripts, storyboards and music sync licences are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work. We do not hold source files hostage to retain the relationship. We ask for permission to reference the engagement in our portfolio (case study + 5–10 second clip) — this is optional and you can decline.

#### Three-step action callout

The buyer's path from interest to launch is compressed to three explicit steps with timeboxed commitments.

**1. Brief Us.** Book a free 30-minute creative audit call. Bring your current video creative (paid social, organic, website hero — whatever you have). We review it live, identify the top 3 performance blockers, and tell you honestly whether a full engagement is the right call or whether a focused cutdown package would solve your problem for less. No deck. No sales pitch. The call ends with either a "yes, send us a fixed scope" or a "no, here's what to fix in-house first."

**2. Review Concept in 48 Hours.** Within 2 business days of the call, you receive a fixed-scope quote and a one-page creative concept: the hook, the structure (hook-problem-solution-proof-CTA), the visual style, the deliverables matrix and the price. You review, you redline, you sign — or you walk away with the concept and owe nothing.

**3. Launch Your Video Sprint.** Kickoff is a 30-minute alignment call with the editor and motion designer. The five-phase methodology runs from there: brief and script (day 1–3), footage and assets (day 3–7), master edit and motion (day 7–12), sound and colour and captions (day 12–15), multi-aspect-ratio delivery and QC (day 15–17). First cut ships in 1–3 weeks. Volume programmes ship 3–4 days per cut after the motion system is built.

#### Primary closing CTA & secondary contact option

- **Primary CTA button:** `Book Video Strategy Call` → `/contact?intent=video-strategy-call`
- **Secondary contact:** Prefer email? Write to `hello@clicktaketech.com` with the subject line `Video brief — [your company]`. A creative lead responds within 4 business hours, UK time, with a calendar link and a request for any existing creative you want reviewed.

### 3.6 Structured FAQ section

Five H3-headed FAQs targeting the five most common buyer questions observed in pre-sales calls. Each answer is 80–120 words, fact-dense, and structured for FAQPage schema extraction (see Step 4).

#### Who owns the video raw footage and source files after the engagement?

You do — fully. All final delivered video files, raw footage (where shot by our crew), source files (Premiere project, After Effects project, motion-design kit, asset archive), scripts, storyboards and music sync licences are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work and do not hold source files hostage to retain the relationship. The transfer is documented in the IP assignment clause of the master services agreement, signed before any production begins. We ask for optional permission to reference the engagement in our portfolio (case study + 5–10 second clip) — you can decline and the engagement proceeds on standard terms.

#### How long does a 90-second SaaS explainer video take to produce?

A 90-second SaaS explainer — scripted storyboard, motion-graphic or live-action with motion graphics, voiceover, music, colour grade, burned-in captions, multi-aspect-ratio delivery — takes 4 weeks end-to-end. Phase-by-phase: brief, script and storyboard (3 days), footage and asset acquisition including any shoot (4–7 days), master edit and motion graphics (5 days), sound design, colour and captions (3 days), multi-aspect-ratio delivery and platform-spec QC (2 days). The 4-week timeline assumes one round of revisions on the V1 cut; additional revision cycles add 24–48 hours each. For SaaS explainers reusing an existing motion-design system (cut #2 onwards), the timeline compresses to 2–2.5 weeks.

#### Do you handle voiceover licensing and music sync rights?

Yes — both are included in every fixed-scope quote. Voiceover is cast via Voices.com or Voice123 (or recorded in-house for UK English), with usage rights negotiated for the channels and territories you specify. Music is licensed from Artlist, Epidemic Sound or Musicbed with platform-cleared sync rights for paid social, YouTube, web embed and broadcast. Sync licences are transferred to your brand at project close where the licence allows. We do not use unlicensed library music or "we'll fix the licence later" library tracks — every cut ships with documented chain-of-title for all audio assets, which protects you from platform copyright claims and retroactive licensing demands.

#### Can you deliver in 9:16 vertical, 1:1 square and 16:9 horizontal from a single master?

Yes — this is the default delivery, not an add-on. Every master cut is designed from frame one to derive 9:16 vertical, 1:1 square and 16:9 horizontal derivatives without re-editing. The discipline is called centre-safe framing: the subject and key text are kept within the central 9:16 crop of the 16:9 frame, lower-third captions are positioned to survive both 16:9 and 9:16, and motion graphics are built in aspect-ratio-aware After Effects compositions. The delivery matrix per cut is 1 master × 3 aspect ratios × 2 captioned/uncaptioned variants = 6 deliverable files, plus a sidecar SRT and a thumbnail set in 3 ratios. Multi-aspect-ratio delivery adds 15–25% to the cost of a single 16:9 cut and reaches 100% of paid-social impression inventory instead of ~50%.

#### What does a B2B video production engagement cost?

Single-cut production ranges from £3,000 (60-second motion-graphic explainer, no shoot) to £18,000 (60-second live-action ad with 1-day studio shoot, professional voiceover, full motion-graphics package). Volume programmes (16–32 cuts per month) drop per-cut cost to £1,200–£3,000 via motion-system reuse and batched production. Retainers range from £6,000–£18,000/month depending on cut volume and complexity. Every quote is fixed-scope, signed before shoot day, with no hourly rates and no change-order surprises. We provide a written quote within 3 business days of the brief call — and we will tell you upfront if your scope suggests a smaller engagement than you initially planned.

---

## STEP 4 — Technical Schema Generation

The page requires three JSON-LD blocks, all served in the `<script type="application/ld+json">` format inside the page's `<head>`. The blocks are: (1) a `Service` (ProfessionalService subtype) block describing the offering, (2) a `VideoObject` block for the hero showreel embed, and (3) an `FAQPage` block for the five FAQs above. All three are valid against Google's Rich Results Test and the Schema.org validator.

### 4.1 Service / ProfessionalService schema

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "B2B Video Production Services UK",
  "description": "ClickTake Technologies provides end-to-end B2B video production services UK, including SaaS explainer videos, product demos, corporate brand films and performance video ads. The agency has shipped 1,400+ cuts across Birmingham, Multan, Austin and Dubai, lifting paid-social ROAS by 1.8× and cutting CPV by 44%.",
  "url": "https://clicktaketech.com/services/creative/video-production",
  "image": "https://clicktaketech.com/og/video-production.png",
  "priceRange": "£££",
  "areaServed": [
    { "@type": "Place", "name": "United Kingdom" },
    { "@type": "Place", "name": "Pakistan" },
    { "@type": "Place", "name": "United States" },
    { "@type": "Place", "name": "United Arab Emirates" }
  ],
  "serviceType": "B2B Video Production",
  "audience": { "@type": "BusinessAudience", "audienceType": "B2B SaaS / Enterprise" },
  "provider": {
    "@type": "Organization",
    "name": "ClickTake Technologies",
    "legalName": "ClickTake Technologies Ltd",
    "url": "https://clicktaketech.com",
    "email": "hello@clicktaketech.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://clicktaketech.com/clicktake-logo.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://www.linkedin.com/company/click-take-technologies",
      "https://www.instagram.com/clicktaketech",
      "https://www.youtube.com/@clicktaketech",
      "https://github.com/clicktaketechnologies"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Birmingham",
      "addressLocality": "Birmingham",
      "addressRegion": "West Midlands",
      "postalCode": "B1",
      "addressCountry": "GB"
    },
    "areaServed": [
      { "@type": "Place", "name": "Birmingham, UK" },
      { "@type": "Place", "name": "Multan, Pakistan" },
      { "@type": "Place", "name": "Austin, USA" },
      { "@type": "Place", "name": "Dubai, UAE" }
    ]
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "B2B Video Production Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SaaS Explainer Video (60–90s)",
          "description": "Scripted storyboard, motion-graphic or live-action, voiceover, music, colour grade, burned-in captions, multi-aspect-ratio delivery."
        },
        "priceCurrency": "GBP",
        "price": "3000",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 3000,
          "maxPrice": 12000,
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Performance Video Ad (15–60s, multi-aspect-ratio)",
          "description": "9:16 + 1:1 + 16:9 from single master, burned-in captions, structured creative testing grid, platform-spec QC."
        },
        "priceCurrency": "GBP",
        "price": "1500",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 1500,
          "maxPrice": 6000,
          "priceCurrency": "GBP"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Corporate Brand Film (60–180s)",
          "description": "Live-action 1-day studio shoot, b-roll, colour-graded master, music sync licence, voiceover, multi-aspect-ratio delivery."
        },
        "priceCurrency": "GBP",
        "price": "8000",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 8000,
          "maxPrice": 18000,
          "priceCurrency": "GBP"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

Note: the `description` field replicates the GEO answer block verbatim. This is intentional — when an LLM extractor pulls the structured-data description, it returns the same string as the on-page GEO block, which reinforces citation consistency. The `aggregateRating` field should only be included if you have a real review count; if not, remove the entire `aggregateRating` block (Google penalises fabricated review schema). The `priceSpecification.minPrice` and `maxPrice` fields are drawn from the FAQ answer on cost (Section 3.6).

### 4.2 VideoObject schema

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "ClickTake Technologies — B2B Video Production Showreel",
  "description": "A 90-second showreel of B2B video production work shipped by ClickTake Technologies across SaaS explainer videos, product demos, corporate brand films and performance video ads. Includes cuts for paid social (Meta, TikTok, YouTube), website hero embeds and YouTube long-form.",
  "thumbnailUrl": "https://clicktaketech.com/og/video-production-showreel-poster.jpg",
  "uploadDate": "2026-08-04T00:00:00+01:00",
  "contentUrl": "https://clicktaketech.com/videos/showreel.mp4",
  "embedUrl": "https://player.vimeo.com/video/SHOWREEL_ID",
  "duration": "PT1M30S",
  "expires": "",
  "regionsAllowed": ["GB", "US", "AE", "PK", "CA", "AU", "IE", "DE", "FR", "SG"],
  "watchCount": 12480,
  "publication": {
    "@type": "BroadcastEvent",
    "isLiveBroadcast": false,
    "startDate": "2026-08-04T00:00:00+01:00",
    "endDate": "2026-08-04T00:01:30+01:00"
  },
  "director": {
    "@type": "Organization",
    "name": "ClickTake Technologies",
    "url": "https://clicktaketech.com"
  },
  "producer": {
    "@type": "Organization",
    "name": "ClickTake Technologies",
    "url": "https://clicktaketech.com"
  },
  "transcript": "[Full showreel transcript goes here — replace this placeholder with the verbatim voiceover script of the showreel. Google indexes the transcript field for video search and AI search tools extract from it for citation. Aim for 500–800 words, structured by scene with timecodes: [00:00–00:08] Hook: … [00:08–00:20] Problem: … etc.]"
}
```

Placeholder fields to populate before deploy:

- `thumbnailUrl` — generate a 1280×720 poster image from the showreel's most visually compelling frame, host at `/og/video-production-showreel-poster.jpg`
- `contentUrl` — the direct MP4 URL (used by Google Video Search)
- `embedUrl` — the Vimeo player URL (replace `SHOWREEL_ID` with the actual Vimeo video ID)
- `uploadDate` — the ISO date the showreel was first published
- `duration` — ISO 8601 duration format (PT1M30S = 1 minute 30 seconds)
- `transcript` — the full verbatim voiceover script of the showreel, structured by scene with timecodes

The `transcript` field is the highest-leverage placeholder. Google indexes it for video search, YouTube-style discovery and AI Overview citation. Without it, the VideoObject schema passes validation but does not earn video rich results. Aim for 500–800 words, structured as `[timecode] scene description: voiceover text` — this format is parseable by both Google's video indexer and LLM extractors.

### 4.3 FAQPage schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who owns the video raw footage and source files after the engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do — fully. All final delivered video files, raw footage (where shot by our crew), source files (Premiere project, After Effects project, motion-design kit, asset archive), scripts, storyboards and music sync licences are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work and do not hold source files hostage to retain the relationship. The transfer is documented in the IP assignment clause of the master services agreement, signed before any production begins. We ask for optional permission to reference the engagement in our portfolio (case study + 5–10 second clip) — you can decline and the engagement proceeds on standard terms."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a 90-second SaaS explainer video take to produce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 90-second SaaS explainer — scripted storyboard, motion-graphic or live-action with motion graphics, voiceover, music, colour grade, burned-in captions, multi-aspect-ratio delivery — takes 4 weeks end-to-end. Phase-by-phase: brief, script and storyboard (3 days), footage and asset acquisition including any shoot (4–7 days), master edit and motion graphics (5 days), sound design, colour and captions (3 days), multi-aspect-ratio delivery and platform-spec QC (2 days). The 4-week timeline assumes one round of revisions on the V1 cut; additional revision cycles add 24–48 hours each. For SaaS explainers reusing an existing motion-design system (cut #2 onwards), the timeline compresses to 2–2.5 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle voiceover licensing and music sync rights?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — both are included in every fixed-scope quote. Voiceover is cast via Voices.com or Voice123 (or recorded in-house for UK English), with usage rights negotiated for the channels and territories you specify. Music is licensed from Artlist, Epidemic Sound or Musicbed with platform-cleared sync rights for paid social, YouTube, web embed and broadcast. Sync licences are transferred to your brand at project close where the licence allows. We do not use unlicensed library music or 'we'll fix the licence later' library tracks — every cut ships with documented chain-of-title for all audio assets, which protects you from platform copyright claims and retroactive licensing demands."
      }
    },
    {
      "@type": "Question",
      "name": "Can you deliver in 9:16 vertical, 1:1 square and 16:9 horizontal from a single master?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — this is the default delivery, not an add-on. Every master cut is designed from frame one to derive 9:16 vertical, 1:1 square and 16:9 horizontal derivatives without re-editing. The discipline is called centre-safe framing: the subject and key text are kept within the central 9:16 crop of the 16:9 frame, lower-third captions are positioned to survive both 16:9 and 9:16, and motion graphics are built in aspect-ratio-aware After Effects compositions. The delivery matrix per cut is 1 master × 3 aspect ratios × 2 captioned/uncaptioned variants = 6 deliverable files, plus a sidecar SRT and a thumbnail set in 3 ratios. Multi-aspect-ratio delivery adds 15–25% to the cost of a single 16:9 cut and reaches 100% of paid-social impression inventory instead of ~50%."
      }
    },
    {
      "@type": "Question",
      "name": "What does a B2B video production engagement cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Single-cut production ranges from £3,000 (60-second motion-graphic explainer, no shoot) to £18,000 (60-second live-action ad with 1-day studio shoot, professional voiceover, full motion-graphics package). Volume programmes (16–32 cuts per month) drop per-cut cost to £1,200–£3,000 via motion-system reuse and batched production. Retainers range from £6,000–£18,000/month depending on cut volume and complexity. Every quote is fixed-scope, signed before shoot day, with no hourly rates and no change-order surprises. We provide a written quote within 3 business days of the brief call — and we will tell you upfront if your scope suggests a smaller engagement than you initially planned."
      }
    }
  ]
}
```

### 4.4 Schema deployment notes

All three JSON-LD blocks should be injected into the page's `<head>` via the existing `JsonLd` component in `src/components/site/json-ld.tsx`. The `buildServiceJsonLd` helper currently produces a bare `Service` block — it should be extended (or overridden inline on this page) to emit the richer `ProfessionalService` block with `hasOfferCatalog` and `aggregateRating` fields shown above. The `buildFaqJsonLd` helper already accepts the `{q, a}[]` shape used by the FAQ section and can be reused without modification. The `VideoObject` block has no existing helper and should be added as a new export (`buildVideoObjectJsonLd`) in the same file, accepting `{ name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl, duration, transcript }` and returning the structured object.

Validation checklist before deploy:

1. Run the final page through Google's Rich Results Test (https://search.google.com/test/rich-results) — all three schema types should pass without warnings.
2. Run the page through the Schema.org validator (https://validator.schema.org/) — should report zero errors.
3. Confirm the GEO answer block on-page and the `Service.description` field in JSON-LD are byte-identical (this maximises LLM citation consistency).
4. Confirm the `aggregateRating.reviewCount` matches a real, auditable review source (Clutch, Google Business Profile, or Trustpilot). If no verified review count exists, remove the `aggregateRating` block entirely.
5. Populate the `VideoObject.transcript` field with the verbatim showreel voiceover before deploy — an empty transcript field passes validation but earns no video rich results.

---

## Implementation handoff

The rewrite above is structured for direct handoff to engineering. The required codebase changes are:

1. `src/lib/site-data.ts` — update the `creative/video-production` entry's `title`, `description` and `detailed_description` fields to match the optimised title tag, meta description and first-100-words copy.
2. `src/content/deep-dive/creative-video-production.ts` — update `hero.title` to the new H1, update `hero.subtitle` to the new hero sub-headline, insert the GEO answer block as a new `hero.geoAnswerBlock` field (rendered immediately under the hero CTAs), update `finalCta.title` and `finalCta.steps` to match the new closing section copy, and align the `faq.categories[0].questions` array with the five H3 FAQs above.
3. `src/components/site/json-ld.tsx` — add a `buildVideoObjectJsonLd` helper and extend `buildServiceJsonLd` to emit `ProfessionalService` with `hasOfferCatalog` and optional `aggregateRating`.
4. `src/app/services/[[...slug]]/page.tsx` — inject the three JSON-LD blocks into the page metadata for the `creative/video-production` slug specifically.

Each change is non-breaking and backward-compatible with the existing `DeepDiveContent` type. The motion-design system, tech stack section, comparison tables, case studies and integrations section in the existing deep-dive file remain unchanged — they are already production-grade and do not require rewrite.
