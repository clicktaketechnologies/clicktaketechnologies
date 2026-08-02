import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAREER_ROLES } from "@/lib/site-data";
import { CareerDetailPage } from "@/components/site/pages/careers-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CAREER_ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const role = CAREER_ROLES.find((r) => r.slug === slug);
  if (!role) return { title: "Role not found" };

  const title = `${role.title} — ${role.location} | ClickTake Careers`;
  const description = role.summary;
  const url = `https://clicktaketech.com/careers/${role.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: role.summary,
      url,
      type: "article",
      locale: "en_GB",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${role.title} | ClickTake Technologies`,
      description: role.summary,
    },
    keywords: [
      role.title,
      role.department,
      role.location,
      "ClickTake careers",
      "remote engineering job",
      role.type,
    ],
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const role = CAREER_ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Careers", path: "/careers" },
    { name: role.title, path: `/careers/${role.slug}` },
  ]);

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.summary,
    employmentType: role.type === "Full-time" ? "FULL_TIME" : role.type === "Part-time" ? "PART_TIME" : role.type === "Contract" ? "CONTRACTOR" : "INTERN",
    hiringOrganization: {
      "@type": "Organization",
      name: "ClickTake Technologies",
      sameAs: "https://clicktaketech.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: role.location,
      },
    },
    datePosted: "2026-01-15",
  };

  return (
    <>
      <JsonLd data={[breadcrumb, jobPostingSchema]} />
      <CareerDetailPage role={role} />
    </>
  );
}
