import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESOURCES } from "@/lib/site-data";
import { ResourceDetailPage } from "@/components/site/pages/resources-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) return { title: "Resource not found" };

  const title = `${resource.title} | ClickTake Resources`;
  const description = resource.excerpt;
  const url = `https://clicktaketech.com/resources/${resource.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: resource.excerpt,
      url,
      type: "article",
      locale: "en_GB",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: resource.title,
      description: resource.excerpt,
    },
    keywords: [
      resource.title,
      resource.category,
      "ClickTake resources",
      "guide",
      "playbook",
    ],
  };
}

// What-you'll-learn sections, keyed by slug. These are short, honest summaries
// of what each guide covers — derived from the excerpt and category. Keeps
// the page from being thin content while we author the full guides.
const WHAT_YOU_LEARN: Record<string, string[]> = {
  "ai-adoption-playbook-2026": [
    "A 5-pillar framework for evaluating where AI creates real ROI vs. vanity automation.",
    "How to score your workflows on AI suitability — data availability, decision complexity, error cost.",
    "Build vs. buy vs. fine-tune decision matrix for LLM applications.",
    "Budget benchmarks for AI initiatives by company size and industry.",
    "A 90-day rollout plan template you can adapt to your org.",
  ],
  "birmingham-seo-guide": [
    "How to rank in Birmingham's local pack — Google Business Profile optimization step-by-step.",
    "The 14 local citations that actually move the needle for UK SMEs.",
    "Neighbourhood-level landing page strategy for multi-location businesses.",
    "Birmingham-specific link-building opportunities (press, chambers, universities).",
    "How to track local rank with Search Console + GBP insights.",
  ],
  "headless-shopify-vs-medusa": [
    "Architecture comparison: Shopify Storefront API vs. Medusa's self-hosted commerce engine.",
    "Total cost of ownership over 24 months — license, infra, dev, maintenance.",
    "Time-to-market benchmarks for a 100-SKU store on each platform.",
    "When headless Shopify wins (most DTC brands) and when Medusa wins (custom commerce).",
    "Migration path from each platform to the other — what to expect.",
  ],
  "pakistan-tech-talent-guide": [
    "Salary benchmarks for senior engineers, AI specialists and designers in Pakistan (2026).",
    "Time zone overlap with UK, US, EU — and how to structure async work.",
    "Quality bar: which universities, bootcamps and portfolios produce hireable talent.",
    "Legal structures: contractor vs. EOR vs. subsidiary — pros, cons, costs.",
    "Cultural and communication norms that affect delivery.",
  ],
  "dubai-market-entry": [
    "Domain strategy: .ae vs. .com vs. .co — what ranks in UAE Google.",
    "Local payment gateways: Telr, PayTabs, Network International, Tap — fees and integration effort.",
    "UAE specific compliance: VAT (5%), data residency, Arabic language requirements.",
    "Local SEO in Dubai: Google Business Profile, local directories, Arabic content strategy.",
    "Hiring in the UAE: free zone vs. mainland, visa sponsorship, labour law basics.",
  ],
  "austin-saas-growth-channels": [
    "The 7 growth channels producing pipeline for Austin SaaS startups in 2026.",
    "Paid channels: Google Search, LinkedIn, Reddit — what works for B2B SaaS.",
    "Organic channels: SEO, content marketing, community building on Slack/Discord.",
    "Event-based channels: Capital Factory, SXSW, local meetups — how to leverage them.",
    "Attribution stack: HubSpot + Linear + Vercel — what to measure and what to ignore.",
  ],
};

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) notFound();

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Resources", path: "/resources" },
    { name: resource.title, path: `/resources/${resource.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.excerpt,
    articleSection: resource.category,
    author: {
      "@type": "Organization",
      name: "ClickTake Technologies",
      url: "https://clicktaketech.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ClickTake Technologies",
      url: "https://clicktaketech.com",
    },
  };

  const learnPoints = WHAT_YOU_LEARN[resource.slug] || [];

  // Find 2 related resources (same category if possible, else random)
  const related = RESOURCES
    .filter((r) => r.slug !== resource.slug)
    .sort((a, b) => {
      const aMatch = a.category === resource.category ? -1 : 0;
      const bMatch = b.category === resource.category ? -1 : 0;
      return aMatch - bMatch;
    })
    .slice(0, 2);

  return (
    <>
      <JsonLd data={[breadcrumb, articleSchema]} />
      <ResourceDetailPage
        resource={resource}
        learnPoints={learnPoints}
        related={related}
      />
    </>
  );
}
