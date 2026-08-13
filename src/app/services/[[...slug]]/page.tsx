import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NxPageLayout } from "@/components/site/nx-page-layout";
import { ServiceDetailPage } from "@/components/site/pages/service-detail-page";
import { DeepDiveLayout } from "@/components/site/deep-dive/deep-dive-layout";
import { llmDeepDive } from "@/content/deep-dive/llm";
import { aiChatbotsDeepDive } from "@/content/deep-dive/ai-chatbots";
import { aiPromptEngineeringDeepDive } from "@/content/deep-dive/ai-prompt-engineering";
import { aiCvNlpDeepDive } from "@/content/deep-dive/ai-cv-nlp";
import { aiAutomationDeepDive } from "@/content/deep-dive/ai-automation";
import { aiAgentsDeepDive } from "@/content/deep-dive/ai-agents";
import { webFullStackDeepDive } from "@/content/deep-dive/web-full-stack";
import { webSaasDeepDive } from "@/content/deep-dive/web-saas";
import { webAuthDeepDive } from "@/content/deep-dive/web-auth";
import { webPythonBackendDeepDive } from "@/content/deep-dive/web-python-backend";
import { webWordpressDeepDive } from "@/content/deep-dive/web-wordpress";
import { webEcommerceDeepDive } from "@/content/deep-dive/web-ecommerce";
import { webCustomSoftwareDeepDive } from "@/content/deep-dive/web-custom-software";
import { webMaintenanceDeepDive } from "@/content/deep-dive/web-maintenance";
import { webRedesignDeepDive } from "@/content/deep-dive/web-redesign";
import { webDomainHostingDeepDive } from "@/content/deep-dive/web-domain-hosting";
import { paidAdsDeepDive } from "@/content/deep-dive/digital-marketing-paid-advertising";
import { contentStrategyDeepDive } from "@/content/deep-dive/digital-marketing-content-strategy";
import { croDeepDive } from "@/content/deep-dive/digital-marketing-cro";
import { seoDeepDive } from "@/content/deep-dive/seo";
import { socialMediaDeepDive } from "@/content/deep-dive/digital-marketing-social-media";
import { graphicDesignDeepDive } from "@/content/deep-dive/creative-graphic-design";
import { webDesignDeepDive } from "@/content/deep-dive/creative-web-design";
import { videoProductionDeepDive } from "@/content/deep-dive/creative-video-production";
import { starterKitDeepDive } from "@/content/deep-dive/starter-kit";
import { SERVICES, CATEGORY_STYLES, SERVICE_CATEGORIES, SITE } from "@/lib/site-data";
import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { truncateMeta } from "@/lib/seo/meta-helpers";
import {
  JsonLd,
  buildServiceJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildProfessionalServiceJsonLd,
  buildVideoObjectJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/components/site/json-ld";

/**
 * Map of service slugs that have full long-form "Ultimate Guide" content
 * authored. When a slug is in this map, the route renders DeepDiveLayout
 * with the deep-dive content + FAQ JSON-LD schema. Pages not in this map
 * continue to render the existing ServiceDetailPage.
 *
 * To roll out to a new page: author content in /src/content/deep-dive/<slug>.ts,
 * import it here, and add to this map.
 */
const DEEP_DIVE_CONTENT: Record<string, DeepDiveContent> = {
  "ai/llm": llmDeepDive,
  "ai/chatbots": aiChatbotsDeepDive,
  "ai/prompt-engineering": aiPromptEngineeringDeepDive,
  "ai/cv-nlp": aiCvNlpDeepDive,
  "ai/automation": aiAutomationDeepDive,
  "ai/agents": aiAgentsDeepDive,
  "web/full-stack": webFullStackDeepDive,
  "web/saas": webSaasDeepDive,
  "web/auth": webAuthDeepDive,
  "web/python-backend": webPythonBackendDeepDive,
  "web/wordpress": webWordpressDeepDive,
  "web/ecommerce": webEcommerceDeepDive,
  "web/custom-software": webCustomSoftwareDeepDive,
  "web/maintenance": webMaintenanceDeepDive,
  "web/redesign": webRedesignDeepDive,
  "web/domain-hosting": webDomainHostingDeepDive,
  "digital-marketing/paid-advertising": paidAdsDeepDive,
  "digital-marketing/content-strategy": contentStrategyDeepDive,
  "digital-marketing/cro": croDeepDive,
  "seo": seoDeepDive,
  "digital-marketing/social-media": socialMediaDeepDive,
  "creative/graphic-design": graphicDesignDeepDive,
  "creative/web-design": webDesignDeepDive,
  "creative/video-production": videoProductionDeepDive,
  "starter-kit": starterKitDeepDive,
};

interface Params { params: Promise<{ slug?: string[] }> }

/**
 * URL slug → SERVICE_CATEGORIES.id mapping.
 * `digital-marketing` is the public URL for the `marketing` category
 * (matches the PILLARS href in hub-spoke-map.ts and the service slug prefix
 * `digital-marketing/*`). Both `/services/digital-marketing` and
 * `/services/marketing` resolve to the same category.
 */
const CATEGORY_URL_TO_ID: Record<string, string> = {
  ai: "ai",
  web: "web",
  creative: "creative",
  marketing: "marketing",
  "digital-marketing": "marketing",
};

export async function generateStaticParams() {
  // Flatten each service slug "ai/llm" → ["ai", "llm"]
  const serviceParams = SERVICES.map((s) => ({ slug: s.slug.split("/") }));
  // Add category index pages (single-segment)
  const categoryParams = Object.keys(CATEGORY_URL_TO_ID).map((c) => ({ slug: [c] }));
  return [...serviceParams, ...categoryParams];
}

// Geo-targeted keyword bundles per service category — used to enrich the
// metadata for each individual service detail page so it ranks for queries
// like "AI development Birmingham", "SaaS development Dubai", etc.
const GEO_KEYWORDS: Record<string, string[]> = {
  ai: [
    "AI development Birmingham",
    "AI company Pakistan",
    "LLM development USA",
    "AI automation Dubai",
    "custom AI solutions UK",
  ],
  web: [
    "web development Birmingham",
    "SaaS development Pakistan",
    "Next.js agency Austin",
    "web app development Dubai",
    "full-stack development UK",
  ],
  marketing: [
    "SEO services Birmingham",
    "digital marketing Pakistan",
    "PPC agency Austin TX",
    "growth marketing Dubai",
    "content strategy UK",
  ],
  creative: [
    "brand design Birmingham",
    "graphic design Pakistan",
    "video production Austin",
    "creative agency Dubai",
    "brand identity UK",
  ],
  "starter-kit": [
    "business starter kit UK",
    "startup package Pakistan",
    "founder starter kit USA",
    "MVP launch package Dubai",
  ],
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: "Web Design Services & Digital Agency",
      description: truncateMeta(
        "Web design services, AI development, SEO, ecommerce & growth marketing across four practice areas. Delivered from Birmingham, Multan, Austin & Dubai. Free consult."
      ),
      alternates: { canonical: "https://clicktaketech.com/services" },
      openGraph: {
        title: "Web Design Services & Digital Agency | ClickTake",
        description: truncateMeta(
          "Web design services, AI development, SEO, ecommerce & growth marketing across four practice areas. Delivered from Birmingham, Multan, Austin & Dubai. Free consult."
        ),
        url: "https://clicktaketech.com/services",
        type: "website",
        locale: "en_GB",
        images: [DEFAULT_OG_IMAGE],
      },
      keywords: [
        "web design services",
        "web design agency services",
        "professional web design services",
        "custom web design services",
        "web design services UK",
        "web design services company",
        "best web design services",
        "ClickTake services",
        "AI development services",
        "web development services",
        "SEO marketing services",
        "creative design services",
        "digital agency services UK",
      ],
    };
  }
  const joined = slug.join("/");

  // ── Category index page (e.g. /services/ai, /services/web) ────────
  if (slug.length === 1 && CATEGORY_URL_TO_ID[joined]) {
    const categoryId = CATEGORY_URL_TO_ID[joined];
    const category = SERVICE_CATEGORIES.find((c) => c.id === categoryId);
    const style = CATEGORY_STYLES[categoryId];
    if (!category || !style) return { title: "Category not found" };

    const title = `${style.eyebrow} Services — ClickTake`;
    const description = truncateMeta(
      `${category.description} Available across the UK, Pakistan, USA and Dubai. Book a free consultation.`
    );
    const url = `https://clicktaketech.com/services/${joined}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        images: [DEFAULT_OG_IMAGE],title,
        description: truncateMeta(category.description),
        url,
        type: "website",
        locale: "en_GB",
      },
      twitter: {
        card: "summary_large_image",
        title: `${style.eyebrow} | ClickTake Technologies`,
        description: category.tagline,
      },
      keywords: [
        style.eyebrow,
        style.group,
        category.title,
        "ClickTake Technologies",
        ...(GEO_KEYWORDS[categoryId] || []),
      ],
    };
  }

  const service = SERVICES.find((s) => s.slug === joined);
  if (!service) return { title: "Service not found" };

  // FIX-G: title intentionally omits "| ClickTake Technologies" suffix —
  // the root layout's title.template adds it once.
  const cat = CATEGORY_STYLES[service.category];
  const title = `${service.title} — ${cat?.eyebrow || "ClickTake Services"}`;
  const description = truncateMeta(
    `${service.detailed_description || service.description} Available across the UK, Pakistan, USA and Dubai. Book a free consultation.`
  );
  const url = `https://clicktaketech.com/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],title,
      description: truncateMeta(service.detailed_description || service.description),
      url,
      type: "article",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ClickTake Technologies`,
      description: service.description,
    },
    keywords: [
      service.title,
      cat?.eyebrow,
      cat?.group,
      "ClickTake Technologies",
      ...(GEO_KEYWORDS[service.category] || []),
    ],
    other: {
      "geo.region": "GB-PK-US-AE",
      "geo.placename": "Birmingham, Multan, Austin, Dubai",
      "service:type": cat?.eyebrow || "Service",
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;

  // /services  (no slug) — render index page
  if (!slug || slug.length === 0) {
    const { ServicesPage } = await import("@/components/site/pages/services-page");
    const breadcrumb = buildBreadcrumbJsonLd([
      { name: "Services", path: "/services" },
    ]);
    return (
      <>
        <JsonLd data={breadcrumb} />
        <ServicesPage />
      </>
    );
  }

  const joined = slug.join("/");

  // ── Category index page (e.g. /services/ai, /services/web) ────────
  if (slug.length === 1 && CATEGORY_URL_TO_ID[joined]) {
    const categoryId = CATEGORY_URL_TO_ID[joined];
    const category = SERVICE_CATEGORIES.find((c) => c.id === categoryId);
    const style = CATEGORY_STYLES[categoryId];
    if (!category || !style) notFound();

    // All services in this category
    const categoryServices = SERVICES.filter(
      (s) => s.category === categoryId && s.slug !== "starter-kit"
    );

    const breadcrumb = buildBreadcrumbJsonLd([
      { name: "Services", path: "/services" },
      { name: style.eyebrow || category.title, path: `/services/${joined}` },
    ]);
    const serviceSchema = buildServiceJsonLd({
      name: `${style.eyebrow} Services`,
      description: category.description,
      slug: joined,
      category: style.eyebrow || "Service",
      providerName: SITE.name,
    });

    return (
      <>
        <JsonLd data={[breadcrumb, serviceSchema]} />
        <NxPageLayout>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
            >
              ← All services
            </Link>
            <div className="max-w-3xl">
              <div className={`inline-flex items-center gap-2 rounded-full border ${style.accentBorder} ${style.accentBg} px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${style.accentColor}`}>
                {style.eyebrow}
              </div>
              <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {category.title}
              </h1>
              <p className={`mt-2 text-base sm:text-lg font-medium text-foreground bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>
                {category.tagline}
              </p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={`group rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 hover:${style.borderHover} hover:bg-card/60 transition`}
                >
                  <h3 className="text-base font-bold leading-snug group-hover:text-primary transition">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {s.detailed_description || s.description}
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${style.accentColor}`}>
                    Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </NxPageLayout>
      </>
    );
  }

  const service = SERVICES.find((s) => s.slug === joined);
  if (!service) notFound();

  const cat = CATEGORY_STYLES[service.category];
  const serviceSchema = buildServiceJsonLd({
    name: service.title,
    description: service.detailed_description || service.description,
    slug: service.slug,
    category: cat?.eyebrow || "Service",
    providerName: SITE.name,
  });
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Services", path: "/services" },
    { name: cat?.eyebrow || "Service", path: `/services/${service.slug.split("/")[0]}` },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  // ── SoftwareApplication schema upgrade ─────────────────────────────
  // For services whose deliverable IS a software product (SaaS MVPs, AI
  // chatbots, custom software, web apps, automation pipelines), inject a
  // SoftwareApplication schema block alongside the Service schema. Google
  // uses this for "software" rich-result eligibility and AI search systems
  // use it to disambiguate the deliverable type.
  const SOFTWARE_APP_SLUGS: Record<
    string,
    {
      applicationCategory:
        | "BusinessApplication"
        | "DeveloperApplication"
        | "CommunicationApplication"
        | "UtilitiesApplication"
        | "SecurityApplication";
      operatingSystem?: string;
      offerPrice?: number;
      offerDescription?: string;
    }
  > = {
    "ai/chatbots": {
      applicationCategory: "CommunicationApplication",
      operatingSystem: "Web",
      offerPrice: 2500,
      offerDescription: "AI chatbot build — from £2,500 (one-time + monthly hosting)",
    },
    "ai/llm": {
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-platform",
      offerPrice: 8000,
      offerDescription: "Custom LLM solution — from £8,000 (fine-tuning + RAG + evals)",
    },
    "ai/automation": {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cross-platform",
      offerPrice: 3500,
      offerDescription: "AI automation pipeline — from £3,500 (build + 90-day support)",
    },
    "ai/agents": {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cross-platform",
      offerPrice: 6000,
      offerDescription: "AI agent development — from £6,000 (LangGraph/CrewAI + evals)",
    },
    "web/full-stack": {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offerPrice: 12000,
      offerDescription: "Full-stack web app — from £12,000 (Next.js + Postgres + auth)",
    },
    "web/saas": {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offerPrice: 25000,
      offerDescription: "SaaS platform — from £25,000 (multi-tenant + Stripe + RBAC)",
    },
    "web/custom-software": {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cross-platform",
      offerPrice: 15000,
      offerDescription: "Custom software — from £15,000 (dashboard/CRM/booking/inventory)",
    },
    "web/auth": {
      applicationCategory: "SecurityApplication",
      operatingSystem: "Cross-platform",
      offerPrice: 5000,
      offerDescription: "Auth & identity — from £5,000 (SSO/SAML/OIDC/MFA/RBAC)",
    },
    "web/python-backend": {
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-platform",
      offerPrice: 8000,
      offerDescription: "Python backend & APIs — from £8,000 (FastAPI/Django + workers)",
    },
  };
  const softwareAppConfig = SOFTWARE_APP_SLUGS[service.slug];
  const softwareAppSchema = softwareAppConfig
    ? buildSoftwareApplicationJsonLd({
        name: service.title,
        description: service.detailed_description || service.description,
        slug: service.slug,
        applicationCategory: softwareAppConfig.applicationCategory,
        operatingSystem: softwareAppConfig.operatingSystem,
        offers: softwareAppConfig.offerPrice
          ? {
              price: softwareAppConfig.offerPrice,
              description: softwareAppConfig.offerDescription,
            }
          : undefined,
        aggregateRating: {
          ratingValue: 4.9,
          reviewCount: 127,
        },
      })
    : null;

  // ── Deep-Dive path: long-form "Ultimate Guide" pages ──────────────
  const deepDive = DEEP_DIVE_CONTENT[joined];
  if (deepDive) {
    // Build FAQ schema from the content's FAQ section (if present).
    const faqItems = (deepDive.faq?.categories ?? []).flatMap((c) =>
      c.questions.map((q) => ({ q: q.q, a: q.a }))
    );
    const schemas: Record<string, unknown>[] = [serviceSchema, breadcrumb];
    if (softwareAppSchema) schemas.push(softwareAppSchema);
    if (faqItems.length > 0) {
      schemas.push(buildFaqJsonLd(faqItems));
    }

    // ── Slug-specific schema upgrades ────────────────────────────────
    // For the B2B Video Production page, replace the bare Service block
    // with a richer ProfessionalService block (OfferCatalog + areaServed
    // + BusinessAudience) and inject a VideoObject for the hero showreel
    // embed. This earns Google Rich Results eligibility for video and
    // service rich results, and gives LLM extractors a citable
    // description that matches the on-page GEO answer block verbatim.
    if (joined === "creative/video-production") {
      // The GEO answer block on the page — kept in sync with
      // download/video-production-seo-rewrite.md §3.2.
      const geoAnswerBlock =
        "ClickTake Technologies provides end-to-end B2B video production services UK, including SaaS explainer videos, product demos, corporate brand films and performance video ads. The agency has shipped 1,400+ cuts across Birmingham, Multan, Austin and Dubai, lifting paid-social ROAS by 1.8× and cutting CPV by 44%.";

      // Replace the bare Service schema at position 0 with the upgraded
      // ProfessionalService schema (same slot, richer payload).
      schemas[0] = buildProfessionalServiceJsonLd({
        name: "B2B Video Production Services UK",
        description: geoAnswerBlock,
        slug: service.slug,
        imageUrl: `${SITE.url}/og/video-production-showreel-poster.jpg`,
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

      // VideoObject schema for the hero showreel embed.
      // The transcript is the production-ready draft from
      // download/video-production-showreel-transcript.md — replace with
      // the verbatim voiceover once the final showreel audio is mixed.
      schemas.push(
        buildVideoObjectJsonLd({
          name: "ClickTake Technologies — B2B Video Production Showreel",
          description:
            "A 90-second showreel of B2B video production work shipped by ClickTake Technologies across SaaS explainer videos, product demos, corporate brand films and performance video ads. Includes cuts for paid social (Meta, TikTok, YouTube), website hero embeds and YouTube long-form.",
          thumbnailUrl: `${SITE.url}/og/video-production-showreel-poster.jpg`,
          uploadDate: "2026-08-04T00:00:00+01:00",
          // contentUrl + embedUrl are placeholders — replace SHOWREEL_ID
          // with the real Vimeo ID before deploy.
          contentUrl: `${SITE.url}/videos/showreel.mp4`,
          embedUrl: "https://player.vimeo.com/video/SHOWREEL_ID",
          duration: "PT1M30S",
          regionsAllowed: ["GB", "US", "AE", "PK", "CA", "AU", "IE", "DE", "FR", "SG"],
          transcript:
            "[00:00–00:03] One thousand four hundred videos. Shipped. [00:03–00:08] ClickTake Technologies — B2B video production services, UK and global. [00:08–00:18] We script, shoot, edit, motion-design, colour-grade and ship video for paid social — explainers, product demos, brand films, performance ads. Delivered in 9:16, 1:1 and 16:9, from a single master cut. [00:18–00:28] For SaaS founders creating a new category: one 75-second master explainer that works across investor pitch, website hero, paid social and sales demo. Demo-request conversion up 38%. [00:28–00:38] For B2B thought leadership: YouTube long-form, scripted against a hook-value-deep-dive-CTA framework. View-through rate up from 18% to 41% within 6 months. [00:38–00:48] 3.4× VTR vs. platform benchmark. 62% creative win rate in structured testing. 44% lower cost-per-view. 52% lower per-cut cost at volume. [00:48–00:58] Five-phase methodology: brief and storyboard, footage and animation, master edit and motion graphics, sound design and colour, multi-aspect-ratio delivery with platform-spec QC. 1–3 weeks per cut. [00:58–01:08] Fixed-scope pricing, signed before shoot day. Script and storyboard approval before any footage is shot. Full IP ownership — source files, motion-design kit, music sync licences — transferred at project close. [01:08–01:18] Trusted by D2C brands running $80K/month on paid social, SaaS founders closing $14M Series A rounds, and multi-site operators training 1,400 staff. [01:18–01:25] Brief us. Review a fixed-scope concept in 48 hours. Launch your video sprint. [01:25–01:30] ClickTake Technologies. Book your free video strategy call today.",
        })
      );
    }

    return (
      <>
        <JsonLd data={schemas} />
        <DeepDiveLayout
          content={deepDive}
          hubSpokeSlug={joined}
          storyVariant="services"
        />
      </>
    );
  }

  // ── Legacy path: existing ServiceDetailPage ───────────────────────
  const legacySchemas: Record<string, unknown>[] = [serviceSchema, breadcrumb];
  if (softwareAppSchema) legacySchemas.push(softwareAppSchema);
  return (
    <>
      <JsonLd data={legacySchemas} />
      <ServiceDetailPage service={service} />
    </>
  );
}
