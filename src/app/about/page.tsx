import type { Metadata } from "next";
import { AboutPage } from "@/components/site/pages/about-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "About ClickTake — AI-Powered Digital Agency in Birmingham · Multan · Austin · Dubai",
  description:
    "ClickTake Technologies is a multi-region AI-powered digital agency founded in 2020. With registered HQ in Birmingham UK and engineering hubs in Multan (Pakistan), Austin TX (USA) and Dubai (UAE), we ship AI products, SaaS platforms and growth systems for ambitious brands across four continents. Meet the team, values and story behind ClickTake.",
  keywords: [
    "about ClickTake Technologies",
    "digital agency Birmingham",
    "AI agency UK",
    "software company Pakistan",
    "web development Austin Texas",
    "digital agency Dubai UAE",
    "Multi-region digital agency",
    "remote-first engineering team",
    "AI product development company",
    "ClickTake team",
  ],
  alternates: { canonical: "https://clicktaketech.com/about" },
  openGraph: {
    title: "About ClickTake — Multi-Region AI-Powered Digital Agency",
    description:
      "Founded 2020. Teams in Birmingham, Multan, Austin and Dubai. Building AI-powered websites, SaaS platforms and growth systems across four continents.",
    url: "https://clicktaketech.com/about",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ClickTake Technologies",
    description:
      "Multi-region AI-powered digital agency — Birmingham · Multan · Austin · Dubai. Founded 2020.",
  },
  other: {
    "geo.region": "GB-PK-US-AE",
    "geo.placename": "Birmingham, Multan, Austin, Dubai",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "About", path: "/about" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <AboutPage />
    </>
  );
}
