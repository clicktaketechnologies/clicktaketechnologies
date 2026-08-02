import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailPage } from "@/components/site/pages/case-studies-page";
import { JsonLd, buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/components/site/json-ld";
import { CASE_STUDIES, SITE } from "@/lib/site-data";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { truncateMeta } from "@/lib/seo/meta-helpers";
interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return { title: "Case study not found" };

  const title = `${cs.client} — ${cs.industry} Case Study | ClickTake`;
  // Combine the short result_summary with the client/industry context to
  // produce a meta description that meets Ahrefs' ≥70-char minimum.
  // The standalone `result_summary` field is too short on some entries
  // (e.g. ecommerce-headless-rebuild at 61 chars).
  const description = truncateMeta(
    `${cs.result_summary} ${cs.client} (${cs.industry}, ${cs.location}) engagement by ClickTake Technologies.`
  );
  const url = `https://clicktaketech.com/case-studies/${cs.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],title,
      description: truncateMeta(cs.challenge),
      url,
      type: "article",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.client} — Case Study | ClickTake`,
      description,
    },
    keywords: [cs.client, cs.industry, ...cs.services, "case study"],
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Case Studies", path: "/case-studies" },
    { name: cs.client, path: `/case-studies/${cs.slug}` },
  ]);
  const serviceSchema = buildServiceJsonLd({
    name: `${cs.client} — Case Study`,
    description: cs.challenge,
    slug: `case-studies/${cs.slug}`,
    category: cs.industry,
    providerName: SITE.name,
  });

  return (
    <>
      <JsonLd data={[breadcrumb, serviceSchema]} />
      <CaseStudyDetailPage cs={cs} />
    </>
  );
}
