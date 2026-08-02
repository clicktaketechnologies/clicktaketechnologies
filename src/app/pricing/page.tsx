import type { Metadata } from "next";
import { PricingPage } from "@/components/site/pages/pricing-page";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildProductJsonLd,
} from "@/components/site/json-ld";
import { PRICING_PLANS } from "@/lib/site-data";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
const FAQS = [
  {
    q: "Do you offer payment plans?",
    a: "Yes. For projects over £5,000 we offer milestone-based billing (typically 30% upfront, 30% at midpoint, 40% on launch). For retainers we bill monthly in advance. Talk to us about your cash flow needs and we'll structure a plan that works.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Every plan is fixed-scope with a written Statement of Work. If you request work outside scope we will quote it explicitly in writing before starting — no surprise invoices. Third-party costs (hosting, domains, ad spend, stock) are passed through at cost with no markup.",
  },
  {
    q: "What happens if we go over scope?",
    a: "We flag it immediately. Any scope change is documented in a Change Order with a fixed price and timeline, signed by both parties before work starts. You always know what you're paying for and why.",
  },
  {
    q: "Do you offer discounts for startups or non-profits?",
    a: "Yes. We offer a 15% discount for verified startups (pre-Series A), registered non-profits and educational institutions. We also reserve 5% of our capacity for pro-bono work each quarter — reach out if you have a project that qualifies.",
  },
  {
    q: "Can we start with one plan and upgrade later?",
    a: "Absolutely. Many clients start on Starter, prove ROI and upgrade to Growth. We credit 50% of any unused project fees toward the upgrade. We never lock you into a plan — we'd rather earn the upgrade through results.",
  },
  {
    q: "What currencies do you bill in?",
    a: "GBP (£) by default for UK and international clients. We can also invoice in USD ($) for US clients, PKR for Pakistan clients and AED for UAE clients. Currency is fixed at contract signing; we don't pass on FX risk.",
  },
  {
    q: "How much do web design services cost in the UK?",
    a: "UK web design services cost £1,500-25,000+ depending on scope. ClickTake's Starter tier begins at £1,500 (4-page responsive site), Growth at £6,000 (marketing site), Scale at £20,000 (SaaS/custom), and Custom is quoted per project. All pricing is fixed-scope with no hidden fees, no lock-in, and a free 30-min consultation to scope the right tier for your business.",
  },
  {
    q: "Do you offer affordable web design services for small businesses?",
    a: "Yes. Our Starter tier (£1,500+) is built specifically for small businesses and includes a 4-page responsive website, basic SEO setup, contact form, Google Business Profile optimization, and 30 days of post-launch support. Payment plans available for projects over £5,000. Book a free consult and we'll scope the most affordable path to launch.",
  },
];

export const metadata: Metadata = {
  title: "Affordable Web Design Services Pricing — Starter · Growth · Scale",
  description:
    "Affordable web design services pricing: Starter £1,500+, Growth £6,000+, Scale £20,000+, Custom. No hidden fees, no lock-in. UK · PK · USA · Dubai. Free 30-min consult.",
  keywords: [
    "ClickTake pricing",
    "affordable web design services",
    "low cost web design services",
    "cheap web design services",
    "inexpensive web design services",
    "web design services cost",
    "how to price web design services",
    "web design services pricing UK",
    "digital agency pricing UK",
    "web development cost Pakistan",
    "SaaS development pricing",
    "AI automation agency cost",
    "SEO retainer pricing",
    "starter kit pricing",
  ],
  alternates: { canonical: "https://clicktaketech.com/pricing" },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "ClickTake — Affordable Web Design Services Pricing | UK · PK · USA · Dubai",
    description:
      "Starter £1,500+, Growth £6,000+, Scale £20,000+, Custom. Transparent pricing for web design services — no hidden fees, no lock-in. Free 30-min consult.",
    url: "https://clicktaketech.com/pricing",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — Affordable Web Design Services Pricing",
    description: "Starter, Growth, Scale & Custom. Transparent pricing for web design services — no hidden fees.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Pricing", path: "/pricing" },
  ]);
  const faq = buildFaqJsonLd(FAQS);
  // Product + Offer JSON-LD for each pricing plan — enables Google Merchant
  // listings + price rich results for each tier.
  const products = PRICING_PLANS.filter((p) => p.price_from).map((p) =>
    buildProductJsonLd({
      name: p.name,
      description: p.description,
      slug: p.slug,
      priceFrom: p.price_from,
      billing: p.billing,
      category: "Professional Services",
    }),
  );
  return (
    <>
      <JsonLd data={[breadcrumb, faq, ...products]} />
      <PricingPage />
    </>
  );
}
