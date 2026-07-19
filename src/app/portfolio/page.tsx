import type { Metadata } from "next";
import { PortfolioPage } from "@/components/site/pages/portfolio-page";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies from UK · Pakistan · USA · Dubai | ClickTake Technologies",
  description:
    "Selected work from ClickTake Technologies — headless e-commerce, AI dashboards, brand systems and growth campaigns delivered across the UK, Pakistan, USA and Dubai.",
  alternates: { canonical: "https://www.clicktaketech.com/portfolio" },
  openGraph: {
    title: "Portfolio — ClickTake Technologies",
    description: "Case studies across AI, web, growth and brand — shipped across four continents.",
    url: "https://www.clicktaketech.com/portfolio",
  },
};

export default function Page() {
  return <PortfolioPage />;
}
