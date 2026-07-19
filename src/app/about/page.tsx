import type { Metadata } from "next";
import { AboutPage } from "@/components/site/pages/about-page";

export const metadata: Metadata = {
  title: "About — A Multi-Region Digital Agency | ClickTake Technologies",
  description:
    "ClickTake Technologies is an AI-powered digital agency with teams in Birmingham, Multan, Austin and Dubai. Learn about our story, values, and the team building the next generation of digital products.",
  alternates: { canonical: "https://www.clicktaketech.com/about" },
  openGraph: {
    title: "About — ClickTake Technologies",
    description: "A multi-region digital agency engineering AI-powered products across four continents.",
    url: "https://www.clicktaketech.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
