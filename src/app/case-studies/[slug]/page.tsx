import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailPage } from "@/components/site/pages/case-studies-page";
import { JsonLd, buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/components/site/json-ld";
import { CASE_STUDIES, SITE } from "@/lib/site-data";

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return { title: "Case study not found" };

  const title = `${cs.client} — ${cs.industry} Case Study | ClickTake`;
  const description = cs.result_summary;
  const url = `https://clicktaketech.com/case-studies/${cs.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: cs.challenge,
      url,
      type: "article",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.client} — Case Study | ClickTake`,
      description: cs.result_summary,
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
