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

export const metadata: Metadata = {
  title: "ClickTake — AI-Powered Digital Agency",
  description:
    "ClickTake builds AI-powered websites, SaaS platforms, mobile apps and growth systems for brands in UK, Pakistan, USA and Dubai. 120+ projects shipped.",
  alternates: { canonical: SITE.url },
  openGraph: {
    title: "ClickTake Technologies — AI-Powered Digital Agency | UK · PK · USA · Dubai",
    description:
      "Custom software, AI automation and growth marketing for brands in the UK, Pakistan, USA and Dubai. 120+ projects shipped. Free 30-min consult.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ClickTake Technologies — AI-Powered Digital Agency.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — AI-Powered Digital Agency",
    description:
      "Custom software, AI automation and growth marketing for brands in the UK, Pakistan, USA and Dubai.",
    images: ["/og-default.png"],
  },
};

// FAQ data — must match the FAQS array in src/components/site/nx-faq.tsx.
// Kept here (not imported) so it ships in the server bundle for JSON-LD
// without bloating the client component.
const HOME_FAQS = [
  {
    q: "How much does a typical project cost?",
    a: "Most projects land between $5k and $80k. A landing page sprint starts at $5k, a marketing site is $12–25k, a SaaS MVP is $30–80k, and ongoing growth retainers start at $4k/month. Every quote is fixed-scope and includes a written technical spec — no surprises after kickoff.",
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
    a: "Yes. After launch we offer monthly maintenance retainers ($1.5–4k/mo depending on app complexity) that cover bug fixes, security updates, dependency upgrades, and small feature requests. Most clients stay on maintenance for 12+ months — it's month-to-month, cancel anytime.",
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
