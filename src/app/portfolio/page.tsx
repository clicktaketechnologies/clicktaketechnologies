import type { Metadata } from "next";
import { PortfolioPage } from "@/components/site/pages/portfolio-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — AI · Web · Growth | Birmingham · Multan · Austin · Dubai",
  description:
    "Selected case studies from ClickTake Technologies — headless e-commerce, AI chatbots, SaaS dashboards, brand systems and growth campaigns delivered for clients across the UK (Birmingham, London), Pakistan (Lahore, Karachi), USA (Austin, NYC) and Dubai (UAE). Real metrics, real outcomes. Filter by service category: AI & Machine Learning, Web Development, Digital Marketing, Creative.",
  keywords: [
    "ClickTake portfolio",
    "case studies AI agency",
    "web development case studies UK",
    "SaaS development portfolio",
    "AI chatbot case study",
    "e-commerce development Pakistan",
    "SEO marketing results Dubai",
    "brand design case studies USA",
    "digital agency work examples",
    "ClickTake client work",
  ],
  alternates: { canonical: "https://clicktaketech.com/portfolio" },
  openGraph: {
    title: "Portfolio — Case Studies from ClickTake Technologies",
    description:
      "Headless commerce, AI dashboards, brand systems and growth campaigns shipped across UK, Pakistan, USA and Dubai.",
    url: "https://clicktaketech.com/portfolio",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Portfolio — Case Studies",
    description:
      "Selected work across AI, web, growth and brand — delivered across four continents.",
  },
  other: {
    "geo.region": "GB-PK-US-AE",
    "geo.placename": "Birmingham, Multan, Austin, Dubai",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Portfolio", path: "/portfolio" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <PortfolioPage />
    </>
  );
}
