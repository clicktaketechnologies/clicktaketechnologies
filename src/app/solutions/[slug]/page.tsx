import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetailPage } from "@/components/site/pages/solution-detail-page";
import { JsonLd, buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/components/site/json-ld";
import { SOLUTIONS, SITE } from "@/lib/site-data";

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return { title: "Solution not found" };

  const title = `${solution.title} — ClickTake Solutions`;
  const description = `${solution.hero} ${solution.summary}`;
  const url = `https://clicktaketech.com/solutions/${solution.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: solution.summary,
      url,
      type: "article",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | ClickTake Technologies`,
      description: solution.hero,
    },
    keywords: [
      solution.title,
      solution.audience,
      "ClickTake Technologies",
      "digital agency solutions",
    ],
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) notFound();

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Solutions", path: "/solutions" },
    { name: solution.title, path: `/solutions/${solution.slug}` },
  ]);
  const serviceSchema = buildServiceJsonLd({
    name: solution.title,
    description: solution.summary,
    slug: `solutions/${solution.slug}`,
    category: "Solution",
    providerName: SITE.name,
  });

  return (
    <>
      <JsonLd data={[breadcrumb, serviceSchema]} />
      <SolutionDetailPage solution={solution} />
    </>
  );
}
