import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionsIndexPage } from "@/components/site/pages/solutions-page";
import { JsonLd, buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/components/site/json-ld";
import { SOLUTIONS, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Solutions — By Audience & Industry",
  description:
    "ClickTake Technologies ships tailored solutions for six audience types across the UK, Pakistan, USA and Dubai: Startups, Local Businesses, E-commerce Brands, Repair Shops, UK Businesses and Agencies. Each combines web, AI, marketing and creative services into a fixed-scope, fixed-timeline engagement with measurable outcomes.",
  keywords: [
    "ClickTake solutions",
    "AI solutions for startups",
    "local business SEO UK",
    "ecommerce development Dubai",
    "repair shop software",
    "white-label agency UK",
    "digital agency solutions Pakistan",
  ],
  alternates: { canonical: "https://clicktaketech.com/solutions" },
  openGraph: {
    title: "ClickTake Solutions — Built for your business type",
    description:
      "Six tailored solutions for Startups, Local Businesses, E-commerce Brands, Repair Shops, UK Businesses and Agencies — across the UK, Pakistan, USA and Dubai.",
    url: "https://clicktaketech.com/solutions",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Solutions",
    description: "Tailored solutions for 6 audience types across 4 regions.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Solutions", path: "/solutions" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SolutionsIndexPage />
    </>
  );
}
