import type { Metadata } from "next";
import { CaseStudiesIndexPage } from "@/components/site/pages/case-studies-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Case Studies — Real Engagements, Real Metrics",
  description:
    "ClickTake Technologies case studies — SEO growth, website redesign, e-commerce, social media, custom SaaS, and branding/video editing engagements across the UK, Pakistan, USA and Dubai. Real metrics, no fake results. Engagements in progress are labeled as such.",
  keywords: [
    "ClickTake case studies",
    "SEO case study UK",
    "website redesign case study",
    "ecommerce case study",
    "SaaS case study",
    "branding case study",
  ],
  alternates: { canonical: "https://clicktaketech.com/case-studies" },
  openGraph: {
    title: "ClickTake Case Studies — Real Engagements, Real Metrics",
    description:
      "Real case studies with verifiable metrics across SEO, web, e-commerce, SaaS, branding and social. No fake results.",
    url: "https://clicktaketech.com/case-studies",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — Case Studies",
    description: "Real engagements, real metrics, no fake case studies.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Case Studies", path: "/case-studies" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <CaseStudiesIndexPage />
    </>
  );
}
