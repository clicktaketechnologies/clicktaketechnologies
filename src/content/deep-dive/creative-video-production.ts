import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/creative/video-production — B2B Video Production Services UK
 *
 * Ads (15s/30s/60s), explainers (60–90s), social cuts (Reels/TikTok/Shorts),
 * YouTube long-form, motion graphics and product demos — delivered in every
 * aspect ratio the channels need, with structured creative testing.
 *
 * Primary keyword: "B2B video production services UK" (BOFU commercial)
 * Secondary: corporate video production, SaaS explainer videos, product demo
 * video agency, video ad production, B2B video marketing agency.
 */
export const videoProductionDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Creative",
    title: "B2B Video Production Services UK: Performance Video That Lifts ROAS 1.8× and Cuts CPV 44%",
    subtitle:
      "ClickTake Technologies scripts, shoots, edits, motion-designs, sound-designs, colour-grades and ships B2B video — SaaS explainer videos (60–90s), product demos, corporate brand films, performance video ads (15–60s), YouTube long-form and motion graphics — delivered in 9:16, 1:1 and 16:9 from a single master cut, with burned-in captions and sidecar SRT, in 1–3 weeks per cut. 1,400+ cuts shipped. 3.4× VTR vs. platform benchmark. 62% creative win rate in structured testing.",
    geoDefinition:
      "Video production services produce the moving-image layer of a marketing programme — covering paid ads (15s/30s/60s), explainers (60–90s), social cuts (Reels, TikTok, Shorts), YouTube long-form, motion graphics, product demos and internal comms videos. Production-grade video ships as a master cut plus platform-native derivatives in every aspect ratio (9:16 vertical, 1:1 square, 16:9 horizontal, 4:5 portrait), encoded in the codec, frame rate and bitrate each platform requires, with captions burned-in and sidecar SRT for accessibility. ClickTake Technologies delivers B2B video production services UK to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with editors and motion designers fluent in Adobe Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, CapCut, Descript and Runway ML, and a production pipeline grounded in scripted storyboards, structured creative testing and measurable view-through, CTR and CPV targets.",
    character: "service-detail",
    ctas: [
      { label: "Book Video Strategy Call", href: "/contact?intent=video-strategy-call", variant: "orange" },
      { label: "Watch Showreel", href: "#showreel", variant: "outline" },
    ],
    stats: [
      { value: "1,400+", label: "Videos shipped" },
      { value: "3.4×", label: "Avg. VTR vs. platform benchmark" },
      { value: "62%", label: "Avg. creative win rate" },
      { value: "3", label: "Aspect ratios per cut" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Creative", href: "/services/creative/video-production" },
      { label: "Video Editing" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Most Performance Video Ships Late, Burn Out Fast, and Convert Poorly",
    intro: [
      "Most performance-video programmes fail in one of four ways. They ship late because every cut is built bespoke from a blank timeline — no template, no reusable motion system, no batched production. They burn out fast because the team produces 4–6 creatives per month when the ad platform's fatigue algorithm demands 16–32. They convert poorly because the creative is the editor's opinion of what looks cool, not a script grounded in the audience's actual buying objections. And they waste budget because every cut is delivered in 16:9 only — half the paid-social impression inventory is 9:16.",
      "The root cause is structural: video treated as artwork rather than as a performance system. Without scripted storyboards, a reusable motion-design system, multi-aspect-ratio delivery from a single master, and a structured creative-testing grid, every video is bespoke — and bespoke does not scale, does not iterate, and does not feed performance data back into the next cut.",
    ],
    painPoints: [
      {
        title: "Creative fatigue in 7–14 days",
        description:
          "Paid-social platforms decay creative performance 15–40% within two weeks of launch. Without a refresh pipeline producing 16–32 new variants per month per ad set, ROAS erodes and the team scrambles to extend life with budget changes that do not fix the underlying fatigue.",
      },
      {
        title: "Single-aspect-ratio delivery",
        description:
          "Agencies deliver a 16:9 horizontal cut and call it done. Half the Meta and TikTok impression inventory is 9:16 vertical; the horizontal cut is letterboxed, CTR drops 40–60%, and the budget is wasted. A master cut must be designed to derive 9:16, 1:1 and 16:9 derivatives from day one.",
      },
      {
        title: "No script, no storyboard",
        description:
          "Editors are handed raw footage and asked to 'make an ad'. The result is a 30-second cut that buries the hook in second 8, leads with a feature the audience does not care about, and ends without a CTA. A scripted storyboard — hook (0–3s), problem (3–8s), solution (8–18s), proof (18–25s), CTA (25–30s) — beats 'editing from feel' by 2–3× on view-through rate.",
      },
      {
        title: "Captions and accessibility bolted on",
        description:
          "80% of paid-social video plays with sound off. Without burned-in captions, the script is invisible and the hook fails. Captions are added as an afterthought in a separate export pass, costing 1–2 days per cut and producing inconsistent typography across the account.",
      },
    ],
    paradigmShift: [
      "Performance video is not artwork — it is a measurable, refreshable, multi-derivative production system. We script every cut against a hook-problem-solution-proof-CTA framework, shoot or source footage against the script, edit in a master timeline designed to derive 3 aspect ratios, motion-design in a reusable system, sound-design for silent playback, color-grade for the platform's compression, and ship with burned-in captions plus sidecar SRT. The first cut takes 2–3 weeks; the next 31 cuts in the testing grid take 2–4 days each.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What Exactly Is a Production-Grade Video Engagement?",
    intro: [
      "A production-grade video engagement is a layered pipeline: brief and script at the top, storyboard next, then master cut, motion design, sound design, color grade, and finally multi-aspect-ratio delivery with captions. Each layer gates the next — and skipping a layer compounds cost downstream. Understanding the layers is the difference between a 2-week ship and a 6-week drift.",
    ],
    subsections: [
      {
        heading: "Layer 1 — Brief, script and storyboard",
        body: [
          "Every cut starts with a written brief that defines the objective (awareness, consideration, conversion, retention), the audience, the platform, the length, the hook, the proof, the CTA and the success metric (VTR, CTR, CPV, ROAS). The brief is signed off before any footage is shot or sourced. From the brief we write a script — not 'a script' in the loose sense, but a shot-by-shot script with timecodes, on-screen text, voiceover, b-roll references and the hook-problem-solution-proof-CTA structure mapped to specific seconds.",
          "The script becomes the storyboard: 6–12 frames showing the visual at each beat, with notes on motion, transitions, captions and aspect-ratio considerations. The storyboard is the document the editor cuts against — without it, the edit drifts and the cut loses the structural beats that drive performance. Most agencies skip the storyboard because 'the editor knows what to do'; the result is a 30-second cut that misses its hook in second 8 and loses 40% of viewers by second 12.",
        ],
        jargon: [
          { term: "VTR (View-Through Rate)", def: "The percentage of viewers who watch a video to its end (or to a defined milestone like 50% or 75%). The dominant predictor of paid-social video performance — beats production polish, beats brand recall, beats creative 'quality'." },
          { term: "Hook rate", def: "The percentage of viewers who watch past the first 3 seconds. The single most-contested metric in performance video — a 90% hook rate vs. a 60% hook rate changes ROAS by 2–4× on the same spend." },
          { term: "CPV (Cost Per View)", def: "The ad-platform cost for one qualified view (defined per platform — typically 3s or 10s on Meta, 6s on YouTube). Lower is better; tracked against platform benchmark and creative variant." },
        ],
      },
      {
        heading: "Layer 2 — Master cut & multi-aspect-ratio design",
        body: [
          "The master cut is the 16:9 horizontal edit, but it is designed from frame one to derive 9:16 vertical and 1:1 square derivatives without re-editing. This means: key subject framed center-safe for vertical crop, lower-third captions positioned to survive both 16:9 and 9:16, b-roll chosen for compositional flexibility, motion graphics built in aspect-ratio-aware compositions in After Effects. The editor does not 'make a 16:9 and hope the vertical works' — the vertical is a designed deliverable, not an afterthought.",
          "Aspect-ratio strategy follows platform economics: Meta Reels and TikTok are 9:16 only (1:1 fallback for legacy placements); YouTube Shorts are 9:16; YouTube long-form is 16:9; LinkedIn is 1:1 or 16:9; Pinterest is 2:3 or 9:16. A master cut that derives all three reaches 100% of paid-social impression inventory; a 16:9-only cut reaches ~50% and is letterboxed on the rest. The delivery matrix is 1 master × 3 aspect ratios × 2 captioned/uncaptioned variants = 6 deliverables per cut.",
        ],
        jargon: [
          { term: "Center-safe framing", def: "Cinematography and motion-design discipline that keeps the subject and key text within the central 9:16 crop of a 16:9 frame — so the vertical derivative does not decapitate the speaker or cut off the headline." },
          { term: "Letterboxing", def: "The black bars above and below a horizontal video played in a vertical placement. Signals 'lazy agency' to the platform's algorithm and cuts CTR 40–60% versus a native vertical cut." },
          { term: "Burned-in captions", def: "Captions rendered as pixels in the video file itself — visible regardless of player or sound-off state. Required for performance video because 80% of paid-social plays with sound off." },
        ],
      },
      {
        heading: "Layer 3 — Motion graphics, sound design & color",
        body: [
          "Motion graphics are the kinetic typography, lower-thirds, transitions, product-callouts and animated logos that elevate a cut from 'footage with voiceover' to 'branded video'. We build motion in After Effects against a reusable design system — a 12-frame kit of transitions, a typography kit for captions and headlines, a kinetic-logo kit for openers and end-cards — so motion-design work on cut #2 is 70% faster than cut #1. Motion is exported as Lottie where the platform supports it (web, app) and as MP4 with alpha where it does not (paid social).",
          "Sound design is the discipline that makes a cut work in both sound-on and sound-off playback. For sound-off (the 80% case on paid social), burned-in captions carry the message; the soundtrack is mixed to feel energetic through visual rhythm alone. For sound-on (YouTube long-form, podcasts, conference playback), we mix voiceover at -16 LUFS, music at -23 LUFS, with sidechain compression to keep the voice dominant. Color grading happens in DaVinci Resolve against a LUT that survives platform compression — Meta and TikTok recompress to ~3–5 Mbps, which crushes shadow detail and shifts reds; we grade to compensate.",
        ],
      },
      {
        heading: "Layer 4 — Delivery, captions & structured testing",
        body: [
          "Final delivery is a package per cut: 6 video files (3 aspect ratios × 2 captioned/uncaptioned), 1 sidecar SRT caption file, 1 thumbnail set (3 ratios), 1 metadata sheet (title, description, tags, hashtags, end-card URL, CTA text), and 1 naming-convention-compliant filename set so the ad-platform upload is unambiguous. Every file is QC'd against the platform's spec sheet (codec, frame rate, bitrate, audio sample rate, duration) before delivery — rejected uploads cost a day of campaign time.",
          "Structured testing is the layer that turns one-off video production into a performance programme. Each cut is tagged with its position in the testing grid: hook type (problem-led, feature-led, social-proof-led, contrarian), visual style (UGC, studio, motion-graphic, hybrid), value-prop (price, speed, quality, support), CTA (shop now, learn more, sign up, watch more). Performance data flows back from Meta, TikTok and YouTube into a creative-analytics dashboard (Triple Whale, Northbeam or in-house) so the next brief is grounded in what the last grid taught.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Edit With",
    intro: [
      "Our video stack is opinionated and battle-tested across 1,400+ cuts shipped to paid social, YouTube and broadcast. Every tool below is in active production use; we do not switch tools to chase the newest release.",
    ],
    categories: [
      {
        name: "Editing & color",
        items: [
          { name: "Adobe Premiere Pro", description: "Primary NLE for paid-social and YouTube cuts — multi-cam, proxy workflow, Adobe Dynamic Link to After Effects, native support for 4K–8K ProRes and H.264/H.265. Used for 70% of cuts." },
          { name: "DaVinci Resolve", description: "Color-grading and finishing — used for the color pass on every cut. Studio-grade node-based grading, LUT export, HDR mastering. Free Studio tier used for dailies and review." },
          { name: "Final Cut Pro", description: "macOS-native NLE for fast-turnaround social cuts — magnetic timeline, background rendering, optimised for MacBook-portable editing on travel and event shoots." },
          { name: "CapCut (Desktop + Mobile)", description: "Trend-native short-form editor for TikTok-native cuts — built-in templates, trending sounds, auto-captions. Used for UGC-style cuts where platform-native feel is critical." },
          { name: "Descript", description: "Text-based editing — transcribes footage, lets editor cut by deleting text, auto-removes filler words, generates captions. 3–5× faster than timeline editing for talking-head footage." },
        ],
      },
      {
        name: "Motion graphics & VFX",
        items: [
          { name: "Adobe After Effects", description: "Primary motion-graphics tool — kinetic typography, lower-thirds, animated logos, product callouts, transitions. Used for every cut with on-screen graphics." },
          { name: "Cinema 4D Lite", description: "3D motion graphics for product visualisation, logo reveals and complex transitions. Bundled with After Effects; full Cinema 4D used for advanced 3D work." },
          { name: "Runway ML", description: "AI-assisted video — generative fill, motion brush, green-screen removal, frame interpolation. Used to extend footage, clean up b-roll and produce shots that would otherwise require a re-shoot." },
          { name: "Lottie / LottieFiles", description: "Vector animation format exported from After Effects via Bodymovin — used for web and app video where 10–20× smaller file size than MP4 matters." },
        ],
      },
      {
        name: "Audio, captions & delivery",
        items: [
          { name: "Adobe Audition", description: "Audio cleanup and mixing — noise reduction, voiceover mastering, music ducking, LUFS-targeted export for platform spec compliance." },
          { name: "Auphonic", description: "Automated audio post-production — level normalisation, loudness targeting, noise reduction. Used for batch processing podcast and YouTube long-form episodes." },
          { name: "Rev / Otter.ai / Whisper", description: "Caption transcription — Rev for human-verified accuracy on paid social, Whisper for fast first-pass on internal and review cuts. Output as SRT and VTT." },
          { name: "Frame.io", description: "Review-and-approve workflow — timecoded comments, version comparison, asset delivery. Replaces email-attachment review cycles for every cut." },
          { name: "HandBrake / Shutter Encoder", description: "Final encoding and transcoding — codec, bitrate and resolution conform to each platform's spec sheet. Used for the final delivery pass before ad-platform upload." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "Freelance editor", "Traditional agency", "ClickTake video system"],
      rows: [
        ["Scripted storyboard", "no", "partially", "yes:Hook-problem-solution-proof-CTA"],
        ["Multi-aspect-ratio delivery", "no:16:9 only", "partially:+ 9:16", "yes:9:16 + 1:1 + 16:9 + 4:5"],
        ["Burned-in captions + SRT", "no", "partially", "yes:Every cut"],
        ["Motion-design system", "no", "no", "yes:Reusable kit"],
        ["Structured testing grid", "no", "no", "yes:Hook × visual × value-prop × CTA"],
        ["Creative win rate", "no:20–30%", "no:25–35%", "yes:55–65%"],
        ["Refresh cadence", "no:4–6/month", "no:6–10/month", "yes:16–32/month per ad set"],
        ["Platform-spec QC", "no", "partially", "yes:Every file pre-upload"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Brief to Delivery in 5 Phases",
    intro: [
      "We ship performance video in 1–3 weeks per cut (faster for ongoing programmes with a motion system in place) using a fixed five-phase lifecycle. Each phase ends with a deliverable you can review and a gate you can pass or fail — no vague 'rough-cut review' meetings where the team shows three edits and asks which you like.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Brief, Script & Storyboard",
        duration: "Day 1–3",
        deliverables: ["Creative brief (objective, audience, platform, length, success metric)", "Shot-by-shot script with timecodes", "Storyboard (6–12 frames)", "Hook-problem-solution-proof-CTA mapping"],
        description:
          "We write the brief against your campaign objective and audience, then draft a shot-by-shot script with timecodes, on-screen text, voiceover and b-roll references. The script is mapped to the hook-problem-solution-proof-CTA structure: hook in seconds 0–3, problem in 3–8, solution in 8–18, proof in 18–25, CTA in 25–30. From the script we draw a 6–12 frame storyboard showing the visual at each beat. Brief, script and storyboard sign off before any footage is shot or sourced.",
      },
      {
        phase: "Phase 2",
        title: "Footage & Asset Acquisition",
        duration: "Day 3–7",
        deliverables: ["Shot footage OR sourced b-roll", "Voiceover recorded", "Music licensed", "Product assets (logos, screenshots, packaging)"],
        description:
          "Depending on the script, we either shoot (in-house crew in UK/Pakistan, partner crews in US/UAE) or source b-roll from licensed stock (Artgrid, Storyblocks, Filmpac) and AI-generated footage (Runway ML, Sora where available). Voiceover is recorded in-house or via Voices.com / Voice123. Music is licensed from Artlist, Epidemic Sound or Musicbed (with platform-cleared sync rights). All assets are ingested to Frame.io with scene and take metadata.",
      },
      {
        phase: "Phase 3",
        title: "Master Edit & Motion Graphics",
        duration: "Day 7–12",
        deliverables: ["Master 16:9 cut", "Motion graphics (lower-thirds, kinetic type, transitions)", "Rough V1 review link", "Sign-off V1"],
        description:
          "The editor cuts against the storyboard in Premiere Pro, building the master 16:9 timeline with placeholder graphics. Motion graphics are built in After Effects against the reusable motion-design system — kinetic typography for captions, lower-thirds for talking-head, transitions between beats, animated product callouts. The V1 cut is uploaded to Frame.io for timecoded review. We expect 1–2 review cycles; each cycle closes within 24 hours.",
      },
      {
        phase: "Phase 4",
        title: "Sound Design, Color & Captions",
        duration: "Day 12–15",
        deliverables: ["Sound-mixed master (LUFS-targeted)", "Color-graded master (LUT applied)", "Burned-in captions", "Sidecar SRT file"],
        description:
          "Sound design: voiceover cleaned in Audition, music mixed at -23 LUFS with sidechain compression under the VO at -16 LUFS, sound effects layered for impact beats. Color grading: primary correction in DaVinci Resolve, creative LUT applied for brand warmth, skin tones protected, highlights rolled off to survive platform compression. Captions: transcribed via Rev (human-verified), burned-in via After Effects with the brand typography, exported as sidecar SRT for accessibility compliance.",
      },
      {
        phase: "Phase 5",
        title: "Multi-Aspect-Ratio Delivery & QC",
        duration: "Day 15–17",
        deliverables: ["6 deliverable files (3 aspect ratios × 2 captioned/uncaptioned)", "Thumbnail set (3 ratios)", "Metadata sheet (title, description, tags, CTA)", "Platform-spec QC pass"],
        description:
          "The master cut is conformed to 9:16 vertical and 1:1 square in Premiere Pro with reframing adjustments (subject re-centered, captions repositioned, motion graphics re-fitted). Each derivative is encoded to the platform's spec: Meta Reels (H.264, 1080×1920, 30fps, 8 Mbps), TikTok (H.264, 1080×1920, 30fps, 8 Mbps), YouTube Shorts (H.264, 1080×1920, 30fps, 12 Mbps), YouTube long-form (H.264, 1920×1080, 30fps, 12 Mbps), LinkedIn (H.264, 1080×1080 or 1920×1080, 30fps, 8 Mbps). Every file is QC'd against the spec sheet before delivery.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Performance Video Compounds Value",
    intro: [
      "The use cases below are drawn from production engagements shipped between 2022 and 2026. Each card describes the specific business problem, the video engagement we ran, and the measurable result — not aspirational view counts.",
    ],
    cases: [
      {
        industry: "Paid social ads for a D2C e-commerce brand",
        problem: "D2C skincare brand running paid social at $80K/month with 6 creatives in rotation. Creative fatigue hit at day 9. ROAS sat at 2.1× (target: 3.5×). Agency was delivering 16:9 only — 60% of Meta impressions were 9:16 and were letterboxed.",
        application: "A 12-week performance-video engagement: 32-cut creative programme on a 4-hook × 4-visual × 2-CTA testing grid, all delivered in 9:16, 1:1 and 16:9 with burned-in captions. Reusable motion-design system built in After Effects for cut #2 onwards. Weekly creative refresh replacing fatigued variants. Triple Whale integration for creative-level attribution.",
        result: "ROAS rose from 2.1× to 3.8× in 60 days. Creative win rate hit 61% (was 24%). Creative fatigue extended from day 9 to day 17. Cost-per-view fell 44%. The brand retained ClickTake for ongoing creative at $14K/month.",
      },
      {
        industry: "SaaS explainer video for product launch",
        problem: "B2B SaaS company launching a new product category needs a 75-second explainer that survives an investor pitch, a website hero, a sales-demo opener and a paid-social campaign — without producing 4 different videos.",
        application: "One 75-second master explainer shot against a scripted storyboard (hook 0–5s, problem 5–20s, solution 20–50s, proof 50–65s, CTA 65–75s). Delivered in 9:16, 1:1 and 16:9 with burned-in captions plus sidecar SRT. Plus a 30-second cutdown for paid social (same master, trimmed to the highest-performing beats). Motion-design system built in After Effects for the brand's product UI animation.",
        result: "Explainer shipped in 4 weeks. Website demo-request conversion rose 38% on the page where the explainer was embedded. The 30-second paid-social cutdown hit 4.2% CTR (industry avg 1.1%). Investors referenced the explainer in 3 of 4 term-sheet conversations.",
      },
      {
        industry: "YouTube long-form for a B2B services firm",
        problem: "B2B IT services firm wants to build a YouTube presence for thought leadership but has no in-house production. Existing videos were 12-minute talking-head monologues averaging 18% VTR (industry benchmark 35–45%).",
        application: "A 6-month YouTube programme: 24 long-form videos (10–18 minutes) scripted against a hook-value-deep-dive-CTA framework, shot in monthly batches of 4, edited in Premiere Pro with b-roll, motion graphics and chapter markers, mixed at -16 LUFS for YouTube, color-graded for skin-tone warmth, thumbnails designed against a 4-variant testing pattern.",
        result: "Average VTR rose from 18% to 41% within 6 months. Subscriber count grew from 1,400 to 18,700. Three videos crossed 100K views (previous best: 4,200). Inbound qualified leads attributed to YouTube rose from 2/month to 19/month.",
      },
      {
        industry: "Product launch for a consumer hardware brand",
        problem: "Consumer electronics brand launching a new product needs launch creative across paid social, organic social, YouTube, the website, retail point-of-sale and an investor event — in 6 weeks, from raw product photography only (no video shoot).",
        application: "A launch video package: 60-second hero film (motion-graphic + product photography + lifestyle b-roll), 30-second and 15-second paid-social cutdowns, 9:16 + 1:1 + 16:9 derivatives of each, 6-second bumper for YouTube, motion-design system in After Effects for the brand's product visualisation, retail loop video for in-store displays, investor-event opener.",
        result: "Launch campaign hit 3.6× ROAS on paid social in week one. Pre-order sign-ups exceeded forecast by 47%. The hero film was viewed 2.4M times in the first 14 days across paid and organic. Retail partners referenced the loop video as the best in-store asset they had been given.",
      },
      {
        industry: "Internal comms & training for a multi-site operator",
        problem: "Multi-site operator with 1,400 staff across 22 locations needs to roll out a new compliance training programme. Existing training was a 90-page PDF; completion rate was 41%, comprehension tested at 58%.",
        application: "A 12-video training programme: 8× 5-minute procedural videos (scripted against the SOP, shot against the SOP, edited with motion graphics showing the correct procedure step-by-step) plus 4× 3-minute scenario videos. Delivered in 16:9 with burned-in captions, hosted on the company's LMS with chapter markers and quiz checkpoints.",
        result: "Training completion rose from 41% to 89% in 90 days. Comprehension test scores rose from 58% to 84%. Compliance audit pass rate hit 100% (was 76%). The video library now serves as the onboarding resource for all new hires.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Performance Video System vs. Alternatives",
    intro: [
      "An objective comparison of the four approaches most teams consider before engaging us. We have shipped all four — the right choice depends on your volume, your platform mix, and whether performance data is feeding back into the next brief.",
    ],
    tables: [
      {
        title: "ClickTake video system vs. Freelance editor vs. Creative agency vs. In-house team",
        headers: ["Dimension", "Freelance editor", "Creative agency", "In-house team", "ClickTake video system"],
        rows: [
          ["Time per cut (one-off)", "yes:2–4 weeks", "no:4–8 weeks", "no:6–12 weeks to hire", "yes:1–3 weeks"],
          ["Scripted storyboard", "no", "partially", "maybe", "yes:Hook-problem-solution-proof-CTA"],
          ["Multi-aspect-ratio delivery", "no:16:9 only", "partially:+ 9:16", "maybe", "yes:9:16 + 1:1 + 16:9 + 4:5"],
          ["Burned-in captions + SRT", "no", "partially", "maybe", "yes:Every cut"],
          ["Motion-design system", "no", "no", "maybe", "yes:Reusable kit"],
          ["Structured testing grid", "no", "no", "no", "yes:Hook × visual × value-prop × CTA"],
          ["Creative win rate", "no:20–30%", "no:25–35%", "yes:30–40%", "yes:55–65%"],
          ["Cost per cut (mid-market)", "yes:$1.5–4K", "no:$5–15K", "no:$3–8K + FTE", "yes:$2–6K (drops 50%+ in volume)"],
          ["Best for", "One-off cuts", "Big launches", "Volume programmes (100+ cuts/yr)", "Performance programmes"],
        ],
      },
      {
        title: "Ad vs. explainer vs. YouTube long-form vs. motion graphic — what each format solves",
        headers: ["Need", "Paid ad (15–60s)", "Explainer (60–90s)", "YouTube long-form", "Motion graphic"],
        rows: [
          ["Direct-response conversion", "yes", "partially", "no", "partially"],
          ["Category / product education", "no", "yes", "yes", "yes"],
          ["Thought leadership", "no", "no", "yes", "no"],
          ["No footage available (launch)", "partially", "partially", "no", "yes"],
          ["Investor / enterprise pitch", "no", "yes", "no", "yes"],
          ["Internal training", "no", "partially", "yes", "yes"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: ROI, Cost Savings & Revenue Lift",
    intro: [
      "Video engagements earn their budget back through one of three mechanisms: paid-media efficiency (better creative lowers CPV and lifts ROAS), production-cost reduction (a motion system + scripted pipeline cuts per-cut cost 50%+ in volume), or revenue lift (video drives measurable conversion lift on the website, in the funnel, or in the sales cycle). The numbers below are aggregated across 1,400+ cuts shipped 2022–2026.",
    ],
    metrics: [
      { value: "3.4×", label: "Avg. VTR vs. benchmark", description: "Average view-through rate on paid-social cuts versus the platform benchmark, measured across 800+ paid cuts." },
      { value: "+62%", label: "Avg. creative win rate", description: "Percentage of paid-social creative variants that beat the control in structured testing-grid programmes." },
      { value: "−44%", label: "Avg. CPV reduction", description: "Average reduction in cost-per-view on paid social after replacing low-VTR creative with testing-grid winners." },
      { value: "−52%", label: "Per-cut cost at volume", description: "Average reduction in per-cut production cost from cut #1 to cut #16, driven by motion-system reuse and batched production." },
    ],
    body: [
      "Paid-media efficiency is the most measurable impact and typically funds the engagement within 60–90 days. A D2C brand running $80K/month on paid social at 2.1× ROAS lifts to 3.8× ROAS by replacing low-VTR creative with testing-grid winners — that is $136K/month additional revenue against a $14K/month retainer, payback in 9 days. The leverage is in the testing grid: 32 cuts in structured rotation beat 6 cuts of higher-production-value work because the platform's fatigue algorithm demands volume, and volume requires a system that produces 16–32 cuts per month per ad set without burning out the editor.",
      "Production-cost reduction is the second mechanism. The first cut in a programme takes 17 days; the sixteenth cut takes 4 days, because the motion-design system is built, the script framework is established, the editor has batched production rhythm, and the asset library is stocked. Per-cut cost drops 52% from cut #1 to cut #16. For a brand producing 24 cuts per month, this is the difference between $96K/month (freelance, bespoke) and $42K/month (ClickTake, system) — a $648K/year saving on a $180K/year retainer.",
      "Revenue lift on owned channels is the third mechanism. Adding a 75-second explainer to a SaaS website's hero typically lifts demo-request conversion 25–45% (we have measured this across 18 SaaS engagements). A YouTube long-form programme compounds: subscriber growth, organic search discoverability (YouTube is the world's second-largest search engine), and inbound-pipeline lift attributed to YouTube — typically 4–8× the pre-engagement inbound rate within 6 months. Investor-event openers and pitch videos shorten the fundraising cycle — founders report 20–40% faster round closes when a 60-second opener precedes the partner meeting.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Performance video does not live in isolation — it sits inside your paid-media, organic, web, sales and analytics stack. The list below covers the integrations we ship most often — if your stack uses a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Paid social & ad platforms",
        items: ["Meta Ads (Reels, Stories, Feed, In-Stream)", "TikTok Ads (Spark Ads, TopView, In-Feed)", "YouTube Ads (Skippable, Non-Skippable, Bumper, Shorts)", "LinkedIn Ads (Sponsored Content, Video Ads)", "Google Ads (Performance Max, Demand Gen)", "Pinterest / Reddit / X video ads", "Microsoft Ads video"],
      },
      {
        name: "Creative analytics & attribution",
        items: ["Triple Whale (D2C creative analytics)", "Northbeam (multi-touch attribution)", "Hyros (info-product attribution)", "Meta Ads Manager (creative-level reporting)", "TikTok Ads Manager (creative-level reporting)", "YouTube Studio + Google Ads (video analytics)", "VidIQ / TubeBuddy (YouTube SEO)"],
      },
      {
        name: "Hosting, CMS & web embed",
        items: ["YouTube (unlisted + public hosting)", "Vimeo (privacy-controlled hosting)", "Wistia (lead-capture video)", "Mux / Cloudflare Stream (developer-grade video)", "JW Player (enterprise video)", "Loom (sales / support video)", "Webflow / Framer / Next.js native video embeds"],
      },
      {
        name: "Asset, review & ops",
        items: ["Frame.io (review + asset management)", "Adobe Creative Cloud Libraries", "Artlist / Epidemic Sound / Musicbed (music licensing)", "Artgrid / Storyblocks / Filmpac (b-roll licensing)", "Voices.com / Voice123 (voiceover casting)", "Runway ML / Sora (AI footage)"],
      },
    ],
    compliance: ["Platform-spec QC on every file (codec, bitrate, frame rate, duration, audio)", "Music sync rights cleared for paid use", "Talent release forms on file for all on-camera talent", "Burned-in captions + sidecar SRT for accessibility (WCAG 2.2 AA / ADA)", "Brand-safety review on every cut pre-launch", "Source-file archive (Premiere project + After Effects project + assets) on engagement close"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Video Engagements in Detail",
    intro: [
      "Below are two anonymised but factual case studies from 2024–2025 engagements. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "D2C skincare brand, $4M ARR, $80K/month paid social",
        situation: "The brand's paid social was running 6 creatives in rotation against $80K/month spend. Creative fatigue hit at day 9. ROAS sat at 2.1× (target: 3.5×). The previous agency delivered 16:9 horizontal cuts only — 60% of Meta impressions were 9:16 vertical and were letterboxed, killing CTR on the highest-traffic placement.",
        task: "Lift ROAS from 2.1× to 3.5× within 90 days without increasing spend; produce enough creative volume to keep fatigue under 15% through 16–32 cuts per month per ad set.",
        action: "ClickTake ran a 12-week performance-video programme. We built a 32-cut creative plan on a 4-hook × 4-visual × 2-CTA testing grid (problem-led, feature-led, social-proof-led, contrarian × UGC, studio, motion-graphic, hybrid × shop-now, learn-more). Every cut was scripted against the hook-problem-solution-proof-CTA framework, delivered in 9:16, 1:1 and 16:9 with burned-in captions and sidecar SRT. We built a reusable motion-design system in After Effects so cuts #2–32 were produced against pre-built kits. Triple Whale integration gave creative-level attribution. Weekly refresh replaced fatigued variants.",
        result: "ROAS rose from 2.1× to 3.8× in 60 days (target: 3.5×). Creative win rate hit 61% (was 24%). Creative fatigue extended from day 9 to day 17. Cost-per-view fell 44%. The 9:16 vertical derivatives outperformed the 16:9 originals by 2.4× on CTR. The brand retained ClickTake for ongoing creative at $14K/month, replacing a $22K/month agency retainer.",
        quote: {
          text: "We were about to give up on paid social. The first week of the new creative grid was the first week we hit 3× ROAS. The vertical cuts alone paid for the engagement.",
          author: "Head of Growth",
          title: "D2C skincare brand",
        },
      },
      {
        client: "B2B SaaS company, Series A, launching a new product category",
        situation: "The company was creating a new product category that did not exist in buyers' minds. Investors needed to understand it in 60 seconds. Buyers needed to understand it before booking a demo. The website needed a hero video. The paid-social campaign needed cutdowns. The sales team needed a demo opener. The previous 'explainer video' (produced by a different agency) was 4 minutes long, watched by 12% of viewers to the end, and converted at 1.1%.",
        task: "Produce one master explainer that works across investor pitch, website hero, paid social and sales demo — without producing 4 separate videos. Ship in 4 weeks. Lift website demo-request conversion by 25%+.",
        action: "ClickTake scripted a 75-second master against a hook-problem-solution-proof-CTA framework (hook 0–5s, problem 5–20s, solution 20–50s, proof 50–65s, CTA 65–75s). We shot against the storyboard (1 day studio, 2 days b-roll), edited the master in Premiere Pro, built product-UI motion graphics in After Effects, sound-mixed at -16 LUFS for web, color-graded in DaVinci Resolve. Delivered 9:16, 1:1 and 16:9 with burned-in captions. Plus a 30-second paid-social cutdown trimmed to the highest-performing beats.",
        result: "Explainer shipped in 4 weeks. Website demo-request conversion rose 38% (target: 25%) on the page where the explainer was embedded. The 30-second paid-social cutdown hit 4.2% CTR (industry avg 1.1%). Investors referenced the explainer in 3 of 4 term-sheet conversations; the company closed a $14M Series A. The master video has been viewed 1.8M times across paid and organic in 12 months.",
        quote: {
          text: "We needed one video that worked for an investor, a buyer, and a Facebook scroller. We got one. It still does work — 14 months later it's still our top-converting asset.",
          author: "Founder & CEO",
          title: "B2B SaaS company",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most strategy questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does a video engagement cost?",
            a: "Single-cut production ranges from $4K (60-second motion-graphic explainer, no shoot) to $25K (60-second live-action ad with 1-day studio shoot, professional voiceover, full motion-graphics package). Volume programmes (16–32 cuts per month) drop per-cut cost to $1.5–4K via motion-system reuse and batched production. Retainers range from $8K–$24K/month depending on cut volume and complexity. We provide a fixed quote after the discovery call.",
          },
          {
            q: "What is the typical timeline per cut?",
            a: "1–3 weeks per cut. Phase-by-phase: Brief, Script & Storyboard (1–3 days), Footage & Asset Acquisition (3–5 days, longer if a shoot is required), Master Edit & Motion Graphics (3–5 days), Sound Design, Color & Captions (2–3 days), Multi-Aspect-Ratio Delivery & QC (1–2 days). Motion-graphic-only cuts ship in 1 week; live-action cuts with shoots take 2–3 weeks. Volume-programme cuts after cut #1 typically ship in 3–4 days via motion-system reuse.",
          },
          {
            q: "Do you offer ongoing video production retainers?",
            a: "Yes — three models. (1) Performance retainer: $14K–$24K/month for 16–32 cuts per month per ad set, structured against a testing grid, with weekly refresh. (2) Project retainer: $8K–$14K/month for a fixed allocation of editor and motion-designer hours, used for ad-hoc cuts. (3) Per-cut: $2K–$6K per cut for one-off work, with 50%+ discount at volume. Most paid-social clients start on a performance retainer; content-marketing clients typically use a project retainer.",
          },
          {
            q: "What does a multi-aspect-ratio delivery cost vs. a single-ratio cut?",
            a: "Multi-ratio delivery (9:16 + 1:1 + 16:9 + burned-in captions + sidecar SRT) adds 15–25% to the cost of a single 16:9 cut. The reason it is cheap: the master is designed from frame one to derive the other ratios, so the additional work is reframing and re-encoding, not re-editing. A $6K master cut delivered in 3 aspect ratios costs ~$7.2K — and reaches 100% of paid-social impression inventory instead of ~50%.",
          },
        ],
      },
      {
        name: "Process & Deliverables",
        questions: [
          {
            q: "What exactly do I receive at the end of each cut?",
            a: "The full delivery package per cut contains: (1) 6 video files (3 aspect ratios × 2 captioned/uncaptioned); (2) 1 sidecar SRT caption file; (3) 1 thumbnail set (3 ratios); (4) 1 metadata sheet (title, description, tags, hashtags, end-card URL, CTA text); (5) Platform-spec QC report; (6) Source files (Premiere project, After Effects project, asset archive) on retainer engagements. Files are delivered via Frame.io with version control and timecoded comments.",
          },
          {
            q: "Who owns the IP after the engagement?",
            a: "You do — fully. All final delivered video files, source files (Premiere project, After Effects project, motion-design kits), scripts, storyboards and music sync licenses (transferred to your brand) are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work. We do ask for permission to reference the engagement in our portfolio (case study + 5–10 second clip) — this is optional and you can decline.",
          },
          {
            q: "Can you work with our existing footage and brand assets?",
            a: "Yes — about 30% of our engagements use client-supplied footage (event recordings, product demos, customer testimonials) and brand assets. We ingest via Frame.io, assess the footage against the script's requirements, and supplement with b-roll or motion graphics where the footage has gaps. We will tell you upfront if the supplied footage is insufficient for the script — re-shooting is cheaper than editing around missing shots.",
          },
          {
            q: "How do you handle stakeholder reviews and approvals?",
            a: "Each phase ends with a Frame.io review link with timecoded comments, a 30–60 minute review meeting, and a sign-off document. The V1 review is the most important — by this point the structure, script, footage, motion graphics and rough sound are locked; subsequent reviews are refinement, not re-conception. We expect 1–2 review cycles per cut; each cycle closes within 24 hours. We avoid 'show three rough cuts and pick one' — instead, we present one V1 grounded in the storyboard and iterate from there.",
          },
        ],
      },
      {
        name: "Technical Specs & Delivery",
        questions: [
          {
            q: "Which platforms do you deliver for?",
            a: "All major paid-social and video platforms: Meta (Reels, Stories, Feed, In-Stream), TikTok (Spark Ads, In-Feed), YouTube (Skippable, Non-Skippable, Bumper, Shorts, long-form), LinkedIn (Sponsored Content, Video Ads), Google Ads (Performance Max, Demand Gen), Pinterest, Reddit, X, Microsoft Ads. Plus web embed (YouTube, Vimeo, Wistia, Mux, Cloudflare Stream, self-hosted), broadcast (ProRes 422 HQ, XDCAM), and retail / OOH (loop video, digital signage). Each platform has its own spec; every file is QC'd against the platform's spec sheet before delivery.",
          },
          {
            q: "What codecs, resolutions and frame rates do you deliver?",
            a: "Default: H.264, 1080p (or 1080×1920 for vertical, 1080×1080 for square), 30fps, 8–12 Mbps depending on platform. Higher-spec: H.265 for YouTube long-form (12–18 Mbps), ProRes 422 HQ for broadcast masters, 4K (3840×2160) for YouTube long-form and hero website video. Frame rates: 24fps for cinematic look, 30fps for standard, 60fps for gameplay and sports. Audio: AAC, 48kHz, stereo, -16 LUFS (YouTube) or -23 LUFS (broadcast). Every spec conforms to the platform's published requirements.",
          },
          {
            q: "How do you handle captions and accessibility?",
            a: "Every cut ships with burned-in captions (rendered as pixels in the video file, visible regardless of player or sound state) AND a sidecar SRT file (for platforms that support closed captions and for accessibility compliance). Captions are transcribed via Rev (human-verified, 99% accuracy), rendered in After Effects with the brand typography, positioned to survive all three aspect ratios. This is non-negotiable for paid social (80% sound-off playback) and required for WCAG 2.2 AA / ADA compliance on owned channels.",
          },
          {
            q: "Can you produce video without a live-action shoot?",
            a: "Yes — about 40% of our cuts are motion-graphic-only or stock-footage-only. Motion-graphic explainers (60–90 seconds, $4–8K, 2-week timeline) are the right choice for product launches, SaaS explainers and concept videos where no live-action footage is needed. Stock-footage ads (15–60 seconds, $2–5K, 1-week timeline) use licensed b-roll from Artgrid, Storyblocks or Filmpac with motion graphics and voiceover. AI-generated footage (Runway ML, Sora) is used selectively where stock would not deliver the shot.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your editors and motion designers based?",
            a: "Senior editors and creative directors in Birmingham (UK) and Austin (USA); motion designers, colorists and production editors in Multan (Pakistan); client-facing creative leads in Dubai (UAE) for Middle East engagements. Shoots in UK and Pakistan are crewed in-house; US and UAE shoots use partner crews. Most engagements are staffed across UK + Pakistan to give you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround on production work.",
          },
          {
            q: "Do you sign NDAs and IP assignment agreements?",
            a: "Yes to both, before any production begins. All final video files, source files, scripts, storyboards and motion-design kits built during the engagement are your IP, transferred in a structured archive at project close. We retain no rights to your proprietary work. Music sync licenses are transferred to your brand where the license allows.",
          },
          {
            q: "Can you work alongside our in-house video or marketing team?",
            a: "Yes — about 35% of our engagements involve an in-house marketer, video producer or editor. We typically lead the script, motion-design system and master cut, then transition to a supporting role (weekly refresh, motion-kit maintenance, color and sound pass) as the in-house team takes over operational production. We treat the in-house team as the long-term owner of the system and onboard them accordingly.",
          },
          {
            q: "What happens if a cut underperforms after launch?",
            a: "We treat every cut as a hypothesis and the launch data as the test result. If a cut underperforms, we diagnose against the testing grid: was the hook wrong, the visual wrong, the value-prop wrong, or the CTA wrong? The diagnosis informs the next brief — not a free re-edit of the same cut. On performance retainers, underperformance is the point: 38% of cuts in a testing grid will underperform the control; the 62% that beat the control carry the budget. We do not charge for cuts that are part of a testing grid; we charge for the grid.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Launch Your Video Sprint — Fixed Scope, Script Approval, Full IP",
    subtitle:
      "Book a free 30-minute video strategy call. We review your current video creative across paid and organic, identify the top 3 performance blockers, and tell you honestly whether a full engagement is the right call — or whether a focused cutdown package would solve your problem for less. Fixed-scope pricing signed before shoot day. Script and storyboard approval before any footage is shot or sourced. Full IP ownership — source files, motion-design kit, scripts and music sync licences — transferred at project close.",
    steps: [
      {
        step: "1",
        title: "Brief Us",
        description: "Free 30-min creative audit call. No deck. We review your current video creative and tell you the top 3 performance blockers.",
      },
      {
        step: "2",
        title: "Review Concept in 48 Hours",
        description: "Within 2 business days — fixed-scope quote, one-page creative concept (hook, structure, visual style, deliverables matrix, price). You sign or walk away with the concept and owe nothing.",
      },
      {
        step: "3",
        title: "Launch Your Video Sprint",
        description: "Five-phase methodology: brief and script (day 1–3), footage and assets (day 3–7), master edit and motion (day 7–12), sound and colour and captions (day 12–15), multi-aspect-ratio delivery and QC (day 15–17). First cut ships in 1–3 weeks.",
      },
    ],
    primaryCta: { label: "Book Video Strategy Call", href: "/contact?intent=video-strategy-call", variant: "orange" },
    secondaryCta: { label: "Email hello@clicktaketech.com", href: "mailto:hello@clicktaketech.com?subject=Video%20brief", variant: "outline" },
  },
}
