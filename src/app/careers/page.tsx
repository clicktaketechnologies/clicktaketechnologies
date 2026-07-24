import type { Metadata } from "next";
import { CareersPage } from "@/components/site/pages/careers-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Careers — Build the Future with ClickTake",
  description:
    "Open roles at ClickTake Technologies across engineering, AI, marketing, creative and operations in the UK, Pakistan, USA and Dubai. Remote-first, senior-only, paid internships every quarter. Submit an open application today.",
  keywords: [
    "ClickTake careers",
    "remote engineering jobs UK",
    "AI engineer jobs Pakistan",
    "marketing jobs Birmingham",
    "design jobs Dubai",
    "paid internship Multan",
    "front-end engineer internship",
    "Next.js engineer job",
  ],
  alternates: { canonical: "https://clicktaketech.com/careers" },
  openGraph: {
    title: "Careers at ClickTake Technologies — Build the Future with Us",
    description:
      "Open roles + internships across 5 departments and 4 regions. Remote-first, senior-only, paid internships every quarter.",
    url: "https://clicktaketech.com/careers",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — ClickTake Technologies",
    description: "Open roles + internships across 5 departments and 4 regions.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Careers", path: "/careers" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <CareersPage />
    </>
  );
}
