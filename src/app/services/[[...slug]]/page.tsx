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
      title: "Services — AI · Web · Marketing",
      description: truncateMeta(
        "Browse all ClickTake Technologies services across four practice areas: AI & Machine Learning, Web Development, Digital Marketing, and Creative. Custom LLMs, chatbots, SaaS platforms, SEO, paid ads, branding and video — delivered from offices in Birmingham, Multan, Austin and Dubai."
      ),
      alternates: { canonical: "https://clicktaketech.com/services" },
      openGraph: {
        title: "Services — AI · Web · Marketing",
        description: truncateMeta(
          "Browse all ClickTake Technologies services across four practice areas: AI & Machine Learning, Web Development, Digital Marketing, and Creative. Custom LLMs, chatbots, SaaS platforms, SEO, paid ads, branding and video — delivered from offices in Birmingham, Multan, Austin and Dubai."
        ),
        url: "https://clicktaketech.com/services",
        type: "website",
        locale: "en_GB",
        images: [DEFAULT_OG_IMAGE],
      },
      keywords: [
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
              <p className={`mt-2 text-base sm:text-lg font-medium bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>
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

  // ── Deep-Dive path: long-form "Ultimate Guide" pages ──────────────
  const deepDive = DEEP_DIVE_CONTENT[joined];
  if (deepDive) {
    // Build FAQ schema from the content's FAQ section (if present).
    const faqItems = (deepDive.faq?.categories ?? []).flatMap((c) =>
      c.questions.map((q) => ({ q: q.q, a: q.a }))
    );
    const schemas: Record<string, unknown>[] = [serviceSchema, breadcrumb];
    if (faqItems.length > 0) {
      schemas.push(buildFaqJsonLd(faqItems));
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
  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumb]} />
      <ServiceDetailPage service={service} />
    </>
  );
}
