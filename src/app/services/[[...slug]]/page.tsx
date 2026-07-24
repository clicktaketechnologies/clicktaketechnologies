import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/site/pages/service-detail-page";
import { DeepDiveLayout } from "@/components/site/deep-dive/deep-dive-layout";
import { llmDeepDive } from "@/content/deep-dive/llm";
import { SERVICES, CATEGORY_STYLES, SITE } from "@/lib/site-data";
import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types";
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
};

interface Params { params: Promise<{ slug?: string[] }> }

export async function generateStaticParams() {
  // Flatten each service slug "ai/llm" → ["ai", "llm"]
  return SERVICES.map((s) => ({ slug: s.slug.split("/") }));
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
      description:
        "Browse all ClickTake Technologies services across four practice areas: AI & Machine Learning, Web Development, Digital Marketing, and Creative. Custom LLMs, chatbots, SaaS platforms, SEO, paid ads, branding and video — delivered from offices in Birmingham, Multan, Austin and Dubai.",
      alternates: { canonical: "https://clicktaketech.com/services" },
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
  const service = SERVICES.find((s) => s.slug === joined);
  if (!service) return { title: "Service not found" };

  // FIX-G: title intentionally omits "| ClickTake Technologies" suffix —
  // the root layout's title.template adds it once.
  const cat = CATEGORY_STYLES[service.category];
  const title = `${service.title} — ${cat?.eyebrow || "ClickTake Services"}`;
  const description = `${service.detailed_description || service.description} Available across the UK (Birmingham, London, Manchester), Pakistan (Multan, Lahore, Karachi, Islamabad), USA (Austin, New York, San Francisco) and Dubai (UAE, MENA region). Book a free 30-minute consultation with ClickTake Technologies.`;
  const url = `https://clicktaketech.com/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: service.detailed_description || service.description,
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
        <DeepDiveLayout content={deepDive} />
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
