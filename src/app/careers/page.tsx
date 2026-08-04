import type { Metadata } from "next";
import { CareersPage } from "@/components/site/pages/careers-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";

// /careers?role=<slug> URLs are anchor-jumps to the application form on the
// same /careers page — they produce duplicate-content variants that Ahrefs
// flags with separate meta/title/redirect issues. Mark them noindex so
// Google keeps only the canonical /careers page in the index.
export function generateMetadata({ searchParams }: { searchParams: Promise<{ role?: string }> }): Promise<Metadata> {
  return searchParams.then((sp) => {
    const hasRoleFilter = Boolean(sp.role);
    const base: Metadata = {
      title: "Careers — Build the Future with ClickTake",
      description:
        "Open roles at ClickTake Technologies across engineering, AI, marketing, creative & operations in the UK, Pakistan, USA & Dubai. Remote-first, senior-only, paid internships quarterly.",
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
        images: [DEFAULT_OG_IMAGE],
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
    if (hasRoleFilter) {
      return {
        ...base,
        robots: { index: false, follow: true }, // noindex but still follow links
      };
    }
    return base;
  });
}

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
