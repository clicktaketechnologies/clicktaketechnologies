import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/site/pages/service-detail-page";
import { SERVICES, CATEGORY_STYLES } from "@/lib/site-data";

interface Params { params: Promise<{ slug?: string[] }> }

export async function generateStaticParams() {
  // Flatten each service slug "ai/llm" → ["ai", "llm"]
  return SERVICES.map((s) => ({ slug: s.slug.split("/") }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: "Services — ClickTake Technologies",
      description: "Browse all ClickTake services across AI, web, marketing and creative.",
    };
  }
  const joined = slug.join("/");
  const service = SERVICES.find((s) => s.slug === joined);
  if (!service) return { title: "Service not found" };

  const cat = CATEGORY_STYLES[service.category];
  const title = `${service.title} — ClickTake Technologies`;
  const description = service.detailed_description || service.description;
  const url = `https://www.clicktaketech.com/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    keywords: [service.title, cat?.eyebrow, "ClickTake Technologies", cat?.group],
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;

  // /services  (no slug) — render index page
  if (!slug || slug.length === 0) {
    const { ServicesPage } = await import("@/components/site/pages/services-page");
    return <ServicesPage />;
  }

  const joined = slug.join("/");
  const service = SERVICES.find((s) => s.slug === joined);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
