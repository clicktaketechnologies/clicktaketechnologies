import type { Metadata } from "next";
import { ResourcesPage } from "@/components/site/pages/resources-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
export const metadata: Metadata = {
  title: "Resources — Founders' Playbooks",
  description:
    "Practical playbooks & guides from ClickTake: AI adoption, LLM fine-tuning, SaaS SEO, headless commerce, hiring talent and market entry for UK, Pakistan, USA & Dubai founders.",
  keywords: [
    "AI adoption playbook",
    "SaaS SEO guide",
    "headless commerce guide",
    "LLM fine-tuning guide",
    "engineering hiring guide",
    "market entry Dubai",
    "Pakistan software development",
    "UK startup resources",
    "USA SaaS market entry",
    "ClickTake guides",
  ],
  alternates: { canonical: "https://clicktaketech.com/resources" },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "Resources — Playbooks & Guides | ClickTake Technologies",
    description:
      "Practical playbooks on AI, SEO, headless commerce, hiring and market entry — written for founders in the UK, Pakistan, USA and Dubai.",
    url: "https://clicktaketech.com/resources",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Resources — Playbooks & Guides",
    description:
      "Practical playbooks on AI, SEO, headless commerce, hiring and market entry.",
  },
  other: {
    "geo.region": "GB-PK-US-AE",
    "geo.placename": "Birmingham, Multan, Austin, Dubai",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Resources", path: "/resources" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <ResourcesPage />
    </>
  );
}
