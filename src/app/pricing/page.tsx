import type { Metadata } from "next";
import { PricingPage } from "@/components/site/pages/pricing-page";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/components/site/json-ld";

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
];

export const metadata: Metadata = {
  title: "Pricing — Starter · Growth · Scale · Custom",
  description:
    "Transparent pricing for ClickTake Technologies. Four engagement tiers across the UK, Pakistan, USA and Dubai: Starter (£1,500+), Growth (£6,000+), Scale (£20,000+) and Custom Quote. No hidden fees, no fake universal pricing, no lock-in. Free 30-min consultation.",
  keywords: [
    "ClickTake pricing",
    "digital agency pricing UK",
    "web development cost Pakistan",
    "SaaS development pricing",
    "AI automation agency cost",
    "SEO retainer pricing",
    "starter kit pricing",
  ],
  alternates: { canonical: "https://clicktaketech.com/pricing" },
  openGraph: {
    title: "ClickTake Pricing — Starter · Growth · Scale · Custom",
    description:
      "Transparent pricing across 4 engagement tiers. No hidden fees, no lock-in. Free 30-minute consultation.",
    url: "https://clicktaketech.com/pricing",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — Pricing",
    description: "Starter, Growth, Scale & Custom. Transparent pricing, no hidden fees.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Pricing", path: "/pricing" },
  ]);
  const faq = buildFaqJsonLd(FAQS);
  return (
    <>
      <JsonLd data={[breadcrumb, faq]} />
      <PricingPage />
    </>
  );
}
