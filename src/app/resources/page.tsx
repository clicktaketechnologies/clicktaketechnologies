import type { Metadata } from "next";
import { ResourcesPage } from "@/components/site/pages/resources-page";

export const metadata: Metadata = {
  title: "Resources — Playbooks & Guides for Founders | ClickTake Technologies",
  description:
    "Practical playbooks, guides and comparisons from ClickTake Technologies. Topics include AI adoption, LLM fine-tuning, SEO for SaaS, headless commerce, hiring engineering talent, and market entry for UK, Pakistan, USA and Dubai. Written for founders shipping digital products — not vanity content.",
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
  alternates: { canonical: "https://www.clicktaketech.com/resources" },
  openGraph: {
    title: "Resources — Playbooks & Guides | ClickTake Technologies",
    description:
      "Practical playbooks on AI, SEO, headless commerce, hiring and market entry — written for founders in the UK, Pakistan, USA and Dubai.",
    url: "https://www.clicktaketech.com/resources",
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
  return <ResourcesPage />;
}
