import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetailPage } from "@/components/site/pages/solution-detail-page";
import { DeepDiveLayout } from "@/components/site/deep-dive/deep-dive-layout";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
  buildFaqJsonLd,
} from "@/components/site/json-ld";
import { SOLUTIONS, SITE } from "@/lib/site-data";
import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types";

import { startupsSolutionDeepDive } from "@/content/deep-dive/sol-startups";
import { localBusinessesSolutionDeepDive } from "@/content/deep-dive/sol-local-businesses";
import { ecommerceBrandsSolutionDeepDive } from "@/content/deep-dive/sol-ecommerce-brands";
import { repairShopsSolutionDeepDive } from "@/content/deep-dive/sol-repair-shops";
import { ukBusinessesSolutionDeepDive } from "@/content/deep-dive/sol-uk-businesses";
import { agenciesSolutionDeepDive } from "@/content/deep-dive/sol-agencies";

/**
 * Map of solution slugs that have full long-form "Ultimate Guide" content
 * authored. When a slug is in this map, the route renders DeepDiveLayout
 * with the deep-dive content + FAQ JSON-LD schema. Pages not in this map
 * continue to render the existing SolutionDetailPage.
 */
const SOLUTION_DEEP_DIVE: Record<string, DeepDiveContent> = {
  startups: startupsSolutionDeepDive,
  "local-businesses": localBusinessesSolutionDeepDive,
  "ecommerce-brands": ecommerceBrandsSolutionDeepDive,
  "repair-shops": repairShopsSolutionDeepDive,
  "uk-businesses": ukBusinessesSolutionDeepDive,
  agencies: agenciesSolutionDeepDive,
};

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

  // ── Deep-Dive path: long-form "Ultimate Guide" pages ──────────────
  const deepDive = SOLUTION_DEEP_DIVE[slug];
  if (deepDive) {
    const faqItems = (deepDive.faq?.categories ?? []).flatMap((c) =>
      c.questions.map((q) => ({ q: q.q, a: q.a }))
    );
    const schemas: Record<string, unknown>[] = [breadcrumb, serviceSchema];
    if (faqItems.length > 0) {
      schemas.push(buildFaqJsonLd(faqItems));
    }
    return (
      <>
        <JsonLd data={schemas} />
        <DeepDiveLayout content={deepDive} hubSpokeSlug={slug} />
      </>
    );
  }

  // ── Legacy path: existing SolutionDetailPage ──────────────────────
  return (
    <>
      <JsonLd data={[breadcrumb, serviceSchema]} />
      <SolutionDetailPage solution={solution} />
    </>
  );
}
