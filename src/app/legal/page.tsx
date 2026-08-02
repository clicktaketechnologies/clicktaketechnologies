import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, Cookie, ArrowUpRight } from "lucide-react";
import { NxPageLayout } from "@/components/site/nx-page-layout";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
export const metadata: Metadata = {
  title: "Legal — Policies & Documents",
  description:
    "ClickTake Technologies legal documents: Privacy Policy, Terms of Service, and Cookie Policy. How we handle your data, the terms under which we operate, and how cookies are used on our site.",
  alternates: { canonical: "https://clicktaketech.com/legal" },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "Legal — ClickTake Technologies",
    description:
      "Privacy Policy, Terms of Service, and Cookie Policy for ClickTake Technologies.",
    url: "https://clicktaketech.com/legal",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal | ClickTake Technologies",
    description: "Privacy Policy, Terms of Service, and Cookie Policy.",
  },
};

const LEGAL_DOCS = [
  {
    href: "/legal/privacy",
    icon: ShieldCheck,
    title: "Privacy Policy",
    description:
      "How ClickTake Technologies collects, uses, stores, and protects your personal data. GDPR & UK DPA compliant. Covers data subject rights, lawful basis for processing, data retention, and international transfers.",
    badge: "GDPR & UK DPA Compliant",
    updated: "May 26, 2026",
  },
  {
    href: "/legal/terms",
    icon: FileText,
    title: "Terms of Service",
    description:
      "The terms under which ClickTake Technologies provides its services — engagement scope, payment terms, intellectual property ownership, confidentiality, liability limitations, and dispute resolution.",
    badge: "Engagement Terms",
    updated: "May 26, 2026",
  },
  {
    href: "/legal/cookies",
    icon: Cookie,
    title: "Cookie Policy",
    description:
      "The cookies and similar technologies used on clicktaketech.com — what each cookie is for, how long it persists, and how to manage or disable cookies in your browser.",
    badge: "Cookie Transparency",
    updated: "May 26, 2026",
  },
];

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Legal", path: "/legal" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <NxPageLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Legal
            </div>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Policies &amp; legal documents
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              ClickTake Technologies is committed to transparency. Our legal
              documents are written in plain English and reviewed quarterly. If
              you have any questions about these policies, email{" "}
              <a
                href="mailto:legal@clicktaketech.com"
                className="text-brand-blue hover:underline"
              >
                legal@clicktaketech.com
              </a>
              .
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {LEGAL_DOCS.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 sm:p-6 hover:border-primary/40 hover:bg-card/60 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl border border-border bg-secondary/50 p-3">
                      <Icon className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition">
                          {doc.title}
                        </h2>
                        <span className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-blue">
                          {doc.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {doc.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          Last updated: {doc.updated}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                          Read document <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12 rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 sm:p-6">
            <h2 className="text-sm font-semibold mb-2">Need a specific legal document?</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For DPAs (Data Processing Agreements), MSAs (Master Services
              Agreements), SOWs (Statements of Work), or custom contractual
              documents, please contact{" "}
              <a
                href="mailto:legal@clicktaketech.com"
                className="text-brand-blue hover:underline"
              >
                legal@clicktaketech.com
              </a>
              . We typically turn around bespoke legal requests within 2
              business days.
            </p>
          </div>
        </div>
      </NxPageLayout>
    </>
  );
}
