/**
 * Validate the three JSON-LD blocks emitted for the
 * /services/creative/video-production page.
 *
 * Run with:  npx tsx scripts/validate-video-production-schema.ts
 *
 * The script imports the live helper functions from
 * src/components/site/json-ld.tsx and asserts that:
 *   1. Each block is valid JSON (trivially true — JS objects)
 *   2. Each block has the required schema.org fields for its @type
 *   3. The ProfessionalService description matches the GEO answer block
 *      verbatim (LLM citation consistency)
 *   4. The VideoObject has a non-empty transcript
 *   5. All URLs are absolute (https://)
 *   6. The OfferCatalog has at least 3 offers with valid price ranges
 */

import {
  buildProfessionalServiceJsonLd,
  buildVideoObjectJsonLd,
  buildFaqJsonLd,
} from "../src/components/site/json-ld";

const GEO_ANSWER_BLOCK =
  "ClickTake Technologies provides end-to-end B2B video production services UK, including SaaS explainer videos, product demos, corporate brand films and performance video ads. The agency has shipped 1,400+ cuts across Birmingham, Multan, Austin and Dubai, lifting paid-social ROAS by 1.8× and cutting CPV by 44%.";

const SHOWREEL_TRANSCRIPT =
  "[00:00–00:03] One thousand four hundred videos. Shipped. [00:03–00:08] ClickTake Technologies — B2B video production services, UK and global. [00:08–00:18] We script, shoot, edit, motion-design, colour-grade and ship video for paid social — explainers, product demos, brand films, performance ads. Delivered in 9:16, 1:1 and 16:9, from a single master cut. [00:18–00:28] For SaaS founders creating a new category: one 75-second master explainer that works across investor pitch, website hero, paid social and sales demo. Demo-request conversion up 38%. [00:28–00:38] For B2B thought leadership: YouTube long-form, scripted against a hook-value-deep-dive-CTA framework. View-through rate up from 18% to 41% within 6 months. [00:38–00:48] 3.4× VTR vs. platform benchmark. 62% creative win rate in structured testing. 44% lower cost-per-view. 52% lower per-cut cost at volume. [00:48–00:58] Five-phase methodology: brief and storyboard, footage and animation, master edit and motion graphics, sound design and colour, multi-aspect-ratio delivery with platform-spec QC. 1–3 weeks per cut. [00:58–01:08] Fixed-scope pricing, signed before shoot day. Script and storyboard approval before any footage is shot. Full IP ownership — source files, motion-design kit, music sync licences — transferred at project close. [01:08–01:18] Trusted by D2C brands running $80K/month on paid social, SaaS founders closing $14M Series A rounds, and multi-site operators training 1,400 staff. [01:18–01:25] Brief us. Review a fixed-scope concept in 48 hours. Launch your video sprint. [01:25–01:30] ClickTake Technologies. Book your free video strategy call today.";

const FAQ_ITEMS = [
  {
    q: "Who owns the video raw footage and source files after the engagement?",
    a: "You do — fully. All final delivered video files, raw footage (where shot by our crew), source files (Premiere project, After Effects project, motion-design kit, asset archive), scripts, storyboards and music sync licences are your IP, transferred in a structured archive at project close.",
  },
  {
    q: "How long does a 90-second SaaS explainer video take to produce?",
    a: "A 90-second SaaS explainer — scripted storyboard, motion-graphic or live-action with motion graphics, voiceover, music, colour grade, burned-in captions, multi-aspect-ratio delivery — takes 4 weeks end-to-end.",
  },
  {
    q: "Do you handle voiceover licensing and music sync rights?",
    a: "Yes — both are included in every fixed-scope quote. Voiceover is cast via Voices.com or Voice123, with usage rights negotiated for the channels and territories you specify.",
  },
  {
    q: "Can you deliver in 9:16 vertical, 1:1 square and 16:9 horizontal from a single master?",
    a: "Yes — this is the default delivery, not an add-on. Every master cut is designed from frame one to derive 9:16 vertical, 1:1 square and 16:9 horizontal derivatives without re-editing.",
  },
  {
    q: "What does a B2B video production engagement cost?",
    a: "Single-cut production ranges from £3,000 (60-second motion-graphic explainer, no shoot) to £18,000 (60-second live-action ad with 1-day studio shoot). Volume programmes drop per-cut cost to £1,200–£3,000.",
  },
];

type Assertion = {
  name: string;
  pass: boolean;
  detail?: string;
};

const results: Assertion[] = [];

function assert(name: string, cond: boolean, detail?: string) {
  results.push({ name, pass: cond, detail });
}

function isAbsoluteUrl(s: unknown): boolean {
  return typeof s === "string" && /^https?:\/\//.test(s);
}

// ─── Build the three blocks ────────────────────────────────────────────────
const professionalService = buildProfessionalServiceJsonLd({
  name: "B2B Video Production Services UK",
  description: GEO_ANSWER_BLOCK,
  slug: "creative/video-production",
  imageUrl: "https://clicktaketech.com/og/video-production-showreel-poster.jpg",
  priceRange: "£££",
  serviceType: "B2B Video Production",
  audienceType: "B2B SaaS / Enterprise",
  offers: [
    {
      serviceName: "SaaS Explainer Video (60–90s)",
      serviceDescription:
        "Scripted storyboard, motion-graphic or live-action, voiceover, music, colour grade, burned-in captions, multi-aspect-ratio delivery.",
      minPrice: 3000,
      maxPrice: 12000,
    },
    {
      serviceName: "Performance Video Ad (15–60s, multi-aspect-ratio)",
      serviceDescription:
        "9:16 + 1:1 + 16:9 from single master, burned-in captions, structured creative testing grid, platform-spec QC.",
      minPrice: 1500,
      maxPrice: 6000,
    },
    {
      serviceName: "Corporate Brand Film (60–180s)",
      serviceDescription:
        "Live-action 1-day studio shoot, b-roll, colour-graded master, music sync licence, voiceover, multi-aspect-ratio delivery.",
      minPrice: 8000,
      maxPrice: 18000,
    },
  ],
});

const videoObject = buildVideoObjectJsonLd({
  name: "ClickTake Technologies — B2B Video Production Showreel",
  description:
    "A 90-second showreel of B2B video production work shipped by ClickTake Technologies across SaaS explainer videos, product demos, corporate brand films and performance video ads.",
  thumbnailUrl: "https://clicktaketech.com/og/video-production-showreel-poster.jpg",
  uploadDate: "2026-08-04T00:00:00+01:00",
  contentUrl: "https://clicktaketech.com/videos/showreel.mp4",
  embedUrl: "https://player.vimeo.com/video/SHOWREEL_ID",
  duration: "PT1M30S",
  regionsAllowed: ["GB", "US", "AE", "PK", "CA", "AU", "IE", "DE", "FR", "SG"],
  transcript: SHOWREEL_TRANSCRIPT,
});

const faqPage = buildFaqJsonLd(FAQ_ITEMS);

// ─── ProfessionalService assertions ────────────────────────────────────────
assert(
  "ProfessionalService @type is correct",
  professionalService["@type"] === "ProfessionalService",
  `Got: ${professionalService["@type"]}`
);
assert(
  "ProfessionalService @context is schema.org",
  professionalService["@context"] === "https://schema.org"
);
assert(
  "ProfessionalService.name contains primary keyword",
  typeof professionalService.name === "string" &&
    professionalService.name.includes("B2B Video Production Services UK")
);
assert(
  "ProfessionalService.description matches GEO answer block verbatim",
  professionalService.description === GEO_ANSWER_BLOCK,
  "Description must match the on-page GEO answer block for LLM citation consistency"
);
assert(
  "ProfessionalService.url is absolute",
  isAbsoluteUrl(professionalService.url),
  `Got: ${professionalService.url}`
);
assert(
  "ProfessionalService.image is absolute URL",
  isAbsoluteUrl(professionalService.image),
  `Got: ${professionalService.image}`
);
assert(
  "ProfessionalService.serviceType set",
  typeof professionalService.serviceType === "string" &&
    professionalService.serviceType.length > 0
);
assert(
  "ProfessionalService.audience is BusinessAudience",
  professionalService.audience?.["@type"] === "BusinessAudience" &&
    typeof professionalService.audience?.audienceType === "string"
);
assert(
  "ProfessionalService.provider is Organization with logo",
  professionalService.provider?.["@type"] === "Organization" &&
    professionalService.provider?.logo?.["@type"] === "ImageObject"
);
assert(
  "ProfessionalService.areaServed is non-empty array of Place",
  Array.isArray(professionalService.areaServed) &&
    professionalService.areaServed.length > 0 &&
    professionalService.areaServed.every(
      (p: unknown) =>
        typeof p === "object" && p !== null && (p as Record<string, unknown>)["@type"] === "Place"
    )
);
assert(
  "ProfessionalService.hasOfferCatalog is OfferCatalog",
  professionalService.hasOfferCatalog?.["@type"] === "OfferCatalog",
  "Missing or wrong @type on hasOfferCatalog"
);
assert(
  "ProfessionalService OfferCatalog has ≥3 offers",
  Array.isArray(professionalService.hasOfferCatalog?.itemListElement) &&
    (professionalService.hasOfferCatalog?.itemListElement as unknown[]).length >= 3
);
const offers = professionalService.hasOfferCatalog
  ?.itemListElement as Array<Record<string, unknown>>;
const allOffersValid =
  Array.isArray(offers) &&
  offers.every((o) => {
    const ps = o.priceSpecification as Record<string, unknown>;
    return (
      o["@type"] === "Offer" &&
      typeof o.priceCurrency === "string" &&
      typeof o.price === "string" &&
      ps?.["@type"] === "PriceSpecification" &&
      typeof ps.minPrice === "number" &&
      typeof ps.maxPrice === "number" &&
      ps.maxPrice >= ps.minPrice
    );
  });
assert("All OfferCatalog entries have valid priceSpecification", allOffersValid);

// ─── VideoObject assertions ────────────────────────────────────────────────
assert(
  "VideoObject @type is correct",
  videoObject["@type"] === "VideoObject"
);
assert(
  "VideoObject @context is schema.org",
  videoObject["@context"] === "https://schema.org"
);
assert(
  "VideoObject.name is non-empty string",
  typeof videoObject.name === "string" && videoObject.name.length > 0
);
assert(
  "VideoObject.description is non-empty string",
  typeof videoObject.description === "string" && videoObject.description.length > 0
);
assert(
  "VideoObject.thumbnailUrl is absolute URL",
  isAbsoluteUrl(videoObject.thumbnailUrl),
  `Got: ${videoObject.thumbnailUrl}`
);
assert(
  "VideoObject.uploadDate is ISO 8601",
  typeof videoObject.uploadDate === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(videoObject.uploadDate),
  `Got: ${videoObject.uploadDate}`
);
assert(
  "VideoObject.duration is ISO 8601 duration",
  typeof videoObject.duration === "string" && /^PT/.test(videoObject.duration),
  `Got: ${videoObject.duration}`
);
assert(
  "VideoObject.embedUrl is absolute URL",
  isAbsoluteUrl(videoObject.embedUrl),
  `Got: ${videoObject.embedUrl}`
);
assert(
  "VideoObject.contentUrl is absolute URL",
  isAbsoluteUrl(videoObject.contentUrl),
  `Got: ${videoObject.contentUrl}`
);
assert(
  "VideoObject.transcript is non-empty",
  typeof videoObject.transcript === "string" && videoObject.transcript.length > 100,
  `Transcript length: ${videoObject.transcript?.length ?? 0}`
);
assert(
  "VideoObject.transcript contains timecode markers",
  typeof videoObject.transcript === "string" && /\[\d{2}:\d{2}–\d{2}:\d{2}\]/.test(videoObject.transcript)
);
assert(
  "VideoObject.regionsAllowed is non-empty array of ISO codes",
  Array.isArray(videoObject.regionsAllowed) &&
    (videoObject.regionsAllowed as string[]).every(
      (r) => typeof r === "string" && r.length === 2
    )
);
assert(
  "VideoObject.publisher is Organization",
  videoObject.publisher?.["@type"] === "Organization"
);

// ─── FAQPage assertions ───────────────────────────────────────────────────
assert(
  "FAQPage @type is correct",
  faqPage["@type"] === "FAQPage"
);
assert(
  "FAQPage @context is schema.org",
  faqPage["@context"] === "https://schema.org"
);
assert(
  "FAQPage has ≥5 questions",
  Array.isArray(faqPage.mainEntity) && faqPage.mainEntity.length >= 5
);
const allFaqsValid =
  Array.isArray(faqPage.mainEntity) &&
  faqPage.mainEntity.every(
    (q: Record<string, unknown>) =>
      q["@type"] === "Question" &&
      typeof q.name === "string" &&
      q.name.length > 0 &&
      (q.acceptedAnswer as Record<string, unknown>)?.["@type"] === "Answer" &&
      typeof (q.acceptedAnswer as Record<string, unknown>)?.text === "string"
  );
assert("All FAQPage entries are valid Question/Answer pairs", allFaqsValid);

// ─── Cross-block consistency ───────────────────────────────────────────────
assert(
  "ProfessionalService.description and VideoObject.description are both non-empty",
  typeof professionalService.description === "string" &&
    professionalService.description.length > 0 &&
    typeof videoObject.description === "string" &&
    videoObject.description.length > 0
);
assert(
  "Thumbnail URL is consistent across ProfessionalService.image and VideoObject.thumbnailUrl",
  professionalService.image === videoObject.thumbnailUrl,
  `PS image: ${professionalService.image}\nVO thumb: ${videoObject.thumbnailUrl}`
);

// ─── Serializability check ────────────────────────────────────────────────
try {
  JSON.stringify(professionalService);
  JSON.stringify(videoObject);
  JSON.stringify(faqPage);
  assert("All three blocks serialize to JSON without error", true);
} catch (e) {
  assert("All three blocks serialize to JSON without error", false, String(e));
}

// ─── Report ────────────────────────────────────────────────────────────────
const passed = results.filter((r) => r.pass).length;
const failed = results.filter((r) => !r.pass).length;

console.log("\n═══════════════════════════════════════════════════════════════");
console.log("  JSON-LD VALIDATION REPORT");
console.log("  /services/creative/video-production");
console.log("═══════════════════════════════════════════════════════════════");
console.log(`  ✓ Passed: ${passed}`);
console.log(`  ✗ Failed: ${failed}`);
console.log("───────────────────────────────────────────────────────────────\n");

if (failed > 0) {
  console.log("FAILURES:\n");
  for (const r of results) {
    if (!r.pass) {
      console.log(`  ✗ ${r.name}`);
      if (r.detail) console.log(`    ${r.detail}\n`);
    }
  }
  process.exit(1);
} else {
  console.log("All assertions passed. Schema is valid and ready for deploy.\n");

  // Also dump the three blocks for visual inspection
  console.log("───────────────────────────────────────────────────────────────");
  console.log("PROFESSIONAL SERVICE SCHEMA (first 600 chars):");
  console.log("───────────────────────────────────────────────────────────────");
  console.log(JSON.stringify(professionalService, null, 2).slice(0, 600) + "...\n");

  console.log("───────────────────────────────────────────────────────────────");
  console.log("VIDEO OBJECT SCHEMA (first 600 chars):");
  console.log("───────────────────────────────────────────────────────────────");
  console.log(JSON.stringify(videoObject, null, 2).slice(0, 600) + "...\n");

  console.log("───────────────────────────────────────────────────────────────");
  console.log("FAQ PAGE SCHEMA (first 400 chars):");
  console.log("───────────────────────────────────────────────────────────────");
  console.log(JSON.stringify(faqPage, null, 2).slice(0, 400) + "...\n");

  process.exit(0);
}
