import type { Metadata } from "next";
import { ResourcesPage } from "@/components/site/pages/resources-page";

export const metadata: Metadata = {
  title: "Resources — Playbooks, Guides & Comparisons | ClickTake Technologies",
  description:
    "Practical playbooks and guides on AI adoption, SEO, headless commerce, hiring and market entry — written for founders shipping in the UK, Pakistan, USA and Dubai.",
  alternates: { canonical: "https://www.clicktaketech.com/resources" },
  openGraph: {
    title: "Resources — ClickTake Technologies",
    description: "Playbooks, guides and comparisons for ambitious founders.",
    url: "https://www.clicktaketech.com/resources",
  },
};

export default function Page() {
  return <ResourcesPage />;
}
