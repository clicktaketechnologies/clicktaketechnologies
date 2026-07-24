import type { Metadata } from "next";
import { TeamPage } from "@/components/site/pages/team-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Team — Multi-Region Specialists",
  description:
    "Meet the ClickTake Technologies team — 42 specialists across Leadership, Development, Marketing, Creative and Operations in the UK, Pakistan, USA and Dubai. Founded 2019. Senior-only engineering, named teams, radical transparency.",
  keywords: [
    "ClickTake team",
    "digital agency team UK",
    "AI engineers Pakistan",
    "marketing team Birmingham",
    "creative team Dubai",
    "remote-first agency",
  ],
  alternates: { canonical: "https://clicktaketech.com/team" },
  openGraph: {
    title: "ClickTake Team — Multi-Region Specialists",
    description:
      "42 specialists across 5 departments and 4 regions. Senior-only engineering, named teams, radical transparency.",
    url: "https://clicktaketech.com/team",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickTake Technologies — Team",
    description: "42 specialists across 4 regions. Senior-only engineering.",
  },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Team", path: "/team" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <TeamPage />
    </>
  );
}
