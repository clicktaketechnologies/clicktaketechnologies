import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/site/pages/service-detail-page";
import { SERVICES, CATEGORY_STYLES } from "@/lib/site-data";

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
      title: "Services — AI · Web · Marketing · Creative | ClickTake Technologies",
      description:
        "Browse all ClickTake Technologies services across four practice areas: AI & Machine Learning, Web Development, Digital Marketing, and Creative. Custom LLMs, chatbots, SaaS platforms, SEO, paid ads, branding and video — delivered from offices in Birmingham, Multan, Austin and Dubai.",
      alternates: { canonical: "https://www.clicktaketech.com/services" },
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

  const cat = CATEGORY_STYLES[service.category];
  const title = `${service.title} — ${cat?.eyebrow || "ClickTake Services"} | ClickTake Technologies`;
  const description = `${service.detailed_description || service.description} Available across the UK (Birmingham, London, Manchester), Pakistan (Multan, Lahore, Karachi, Islamabad), USA (Austin, New York, San Francisco) and Dubai (UAE, MENA region). Book a free 30-minute consultation with ClickTake Technologies.`;
  const url = `https://www.clicktaketech.com/services/${service.slug}`;

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
    return <ServicesPage />;
  }

  const joined = slug.join("/");
  const service = SERVICES.find((s) => s.slug === joined);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
