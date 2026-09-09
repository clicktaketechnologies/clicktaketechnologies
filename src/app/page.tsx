import type { Metadata } from "next";
import HomeContent from "./home-content";
import {
  JsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from "@/components/site/json-ld";
import { SITE, TESTIMONIALS } from "@/lib/site-data";

/**
 * Home page — server component wrapper.
 *
 * The actual UI is rendered by the `HomeContent` client component
 * (src/app/home-content.tsx) which depends on framer-motion, Three.js
 * dynamic import, and other client-only libraries.
 *
 * This server wrapper exists so we can inject server-rendered JSON-LD
 * (FAQPage, BreadcrumbList, Organization) for SEO without paying the
 * client-bundle cost. The JSON-LD scripts are plain <script> tags —
 * Next.js renders them in the initial HTML, no hydration needed.
 */

/**
 * Home-page metadata — aligned with the Hero's enterprise / AI-agent
 * positioning (Issue 3: Brand Positioning & Messaging Alignment).
 *
 * Previously this metadata targeted the "web design services UK" long-
 * tail — conflicting with the Hero headline "Engineering Tomorrow's
 * Intelligence, Today" and the AI/agent-focused service cards. The
 * updated metadata keeps the regional SEO qualifiers (UK/PK/USA/Dubai)
 * but reframes the keywords around AI-native engineering, autonomous
 * agents, and multi-tenant SaaS — the actual high-margin work the Hero
 * advertises. The legacy "web design" keywords remain on the dedicated
 * `/services/web-design-services` route where they convert.
 */
export const metadata: Metadata = {
  title: "AI-Native Software Engineering · Multi-Agent Systems — ClickTake",
  description:
    "ClickTake Technologies ships production-grade autonomous AI agents, multi-tenant SaaS platforms and cloud architecture for global enterprises. 150+ teams across 4 continents. 99.9% uptime SLA. Book a 30-min architecture review.",
  alternates: { canonical: SITE.url },
  keywords: [
    "AI agent development",
    "multi-agent systems",
    "LLM engineering",
    "autonomous AI agents",
    "production AI",
    "SaaS platform engineering",
    "multi-tenant SaaS",
    "cloud architecture",
    "AWS GCP Azure",
    "DevOps consulting",
    "AI automation agency",
    "custom software development",
    "ClickTake Technologies",
  ],
  openGraph: {
    title: "ClickTake Technologies — AI-Native Software Engineering & Multi-Agent Systems",
    description:
      "Production-grade autonomous AI agents, SaaS platforms and cloud architecture for global enterprises. 150+ teams across 4 continents. 99.9% uptime. Book a 30-min architecture review.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ClickTake Technologies — AI-Native Software Engineering & Multi-Agent Systems.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — AI-Native Software Engineering",
    description:
      "Autonomous AI agents, multi-tenant SaaS platforms and cloud architecture for global enterprises. 150+ teams across 4 continents.",
    images: ["/og-default.png"],
  },
};

// FAQ data — must match the FAQS array in src/components/site/nx-faq.tsx.
// Kept here (not imported) so it ships in the server bundle for JSON-LD
// without bloating the client component.
const HOME_FAQS = [
  {
    q: "What are web design services?",
    a: "Web design services cover everything needed to plan, design, build and launch a website — UX research, UI design, frontend development on Next.js, content, SEO setup, hosting and ongoing maintenance. ClickTake bundles all of these into a single fixed-scope engagement for brands across the UK, Pakistan, USA and Dubai.",
  },
  {
    q: "How much do web design services cost?",
    a: "Most ClickTake web design projects land between £1,500 (Starter landing page) and £25,000+ (custom SaaS site). Small business sites start at £1,500, marketing sites are £6,000-12,000, and custom SaaS sites are £20,000+. Every quote is fixed-scope with a written Statement of Work — no surprises after kickoff.",
  },
  {
    q: "How to choose a web design services agency?",
    a: "Look for: (1) a portfolio of sites in your industry, (2) case studies with measurable outcomes like traffic, conversions and Core Web Vitals, (3) a transparent fixed-scope contract, (4) senior engineers (not juniors) on your project, and (5) post-launch maintenance included. ClickTake meets all five — book a free 30-min consult and we'll show you the receipts.",
  },
  {
    q: "How fast can you start?",
    a: "We typically kick off new projects within 7 days of signing the proposal. For urgent launches we can fast-track to a 48-hour start if a senior team is available. Book a call today and we'll confirm a real start date before you commit.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. About 60% of our clients are seed-to-Series-B startups and 40% are mid-market and enterprise. We adjust the engagement model — startups get sprint-based MVP work, enterprises get dedicated teams and quarterly roadmaps.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do — 100%. Everything we build is committed to your GitHub repo under your account from day one. Our contracts include an IP assignment clause so there's no ambiguity. You can take the code to any other agency or hire in-house any time.",
  },
  {
    q: "What's your tech stack?",
    a: "Default stack: Next.js 14+ App Router, TypeScript, Tailwind CSS, Supabase/Postgres, Drizzle ORM, Vercel for hosting, Cloudflare for CDN/edge. For mobile: React Native + Expo. For AI: OpenAI / Anthropic / open-source LLMs via LangChain or LangGraph. We can also work in your existing stack if needed.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. After launch we offer monthly maintenance retainers (£150-4k/mo depending on app complexity) that cover bug fixes, security updates, dependency upgrades, and small feature requests. Most clients stay on maintenance for 12+ months — it's month-to-month, cancel anytime.",
  },
];

export default function Page() {
  // FAQPage schema — eligible for Google FAQ rich results.
  const faq = buildFaqJsonLd(HOME_FAQS);

  // BreadcrumbList — Home is the root; only one item. This signals
  // canonical home URL to Google for sitelinks display.
  const breadcrumb = buildBreadcrumbJsonLd([], { prependHome: true });

  // Organization schema with embedded Review + AggregateRating — uses the
  // testimonials already in the codebase. Google requires at least 2 reviews
  // for the rating rich result.
  const reviews = (TESTIMONIALS || [])
    .slice(0, 6)
    .map((t: { name: string; quote: string; rating?: number }) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating || 5),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: t.quote,
    }));

  const orgWithRating =
    reviews.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: String(reviews.length),
            bestRating: "5",
            worstRating: "1",
          },
          review: reviews,
        }
      : null;

  return (
    <>
      <JsonLd data={orgWithRating ? [faq, breadcrumb, orgWithRating] : [faq, breadcrumb]} />
      <HomeContent />
    </>
  );
}
