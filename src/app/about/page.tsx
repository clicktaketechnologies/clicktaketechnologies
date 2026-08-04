import type { Metadata } from "next";
import { AboutPage } from "@/components/site/pages/about-page";
import { DeepDiveLayout } from "@/components/site/deep-dive/deep-dive-layout";
import { aboutDeepDive } from "@/content/deep-dive/about";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "About — AI Digital Agency",
  description:
    "ClickTake Technologies is a multi-region AI-powered digital agency founded 2019. HQ in Birmingham UK, hubs in Multan, Austin & Dubai. We ship AI products, SaaS platforms and growth systems for ambitious brands.",
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
    images: [DEFAULT_OG_IMAGE],
    title: "About ClickTake — Multi-Region AI-Powered Digital Agency",
    description:
      "Founded 2019. Teams in Birmingham, Multan, Austin and Dubai. Building AI-powered websites, SaaS platforms and growth systems across four continents.",
    url: "https://clicktaketech.com/about",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ClickTake Technologies",
    description:
      "Multi-region AI-powered digital agency — Birmingham · Multan · Austin · Dubai. Founded 2019.",
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
  const faqItems = (aboutDeepDive.faq?.categories ?? []).flatMap((c) =>
    c.questions.map((q) => ({ q: q.q, a: q.a }))
  );
  const schemas: Record<string, unknown>[] = [breadcrumb];
  if (faqItems.length > 0) {
    schemas.push(buildFaqJsonLd(faqItems));
  }
  return (
    <>
      <JsonLd data={schemas} />
      <DeepDiveLayout
        content={aboutDeepDive}
        hubSpokeSlug="about"
        storyVariant="about"
      />
    </>
  );
}
