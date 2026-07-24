import type { Metadata } from "next";
import { ShieldCheck, Lock } from "lucide-react";
import { LegalPage } from "@/components/site/pages/legal-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy and data protection terms for ClickTake Technologies. Learn how we handle your business information.",
  alternates: { canonical: "https://clicktaketech.com/legal/privacy" },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Privacy Policy", path: "/legal/privacy" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <LegalPage
      icon={<ShieldCheck className="h-6 w-6" />}
      title="Privacy Policy"
      lastUpdated="May 26, 2026"
      badge="GDPR & UK DPA Compliant"
      sections={[
        {
          num: "01",
          title: "Introduction & Scope",
          body: (
            <p>
              ClickTake Technologies Ltd. (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is committed to
              protecting your personal data. This privacy policy informs you how we look after your personal
              data when you visit our website, submit discovery calls, fill out project inquiry forms, or apply
              for vacancies.
            </p>
          ),
        },
        {
          num: "02",
          title: "Personal Data We Collect",
          body: (
            <>
              <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                <li><strong className="text-foreground">Identity Data:</strong> First name, last name, username, and job titles.</li>
                <li><strong className="text-foreground">Contact Data:</strong> Email address, telephone numbers, billing addresses, and country.</li>
                <li><strong className="text-foreground">Technical Data:</strong> IP address, login data, browser types, operating systems, and device specs.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website services, forms, and calculators.</li>
              </ul>
            </>
          ),
        },
        {
          num: "03",
          title: "How We Use Your Data",
          body: (
            <>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your data in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                <li>To register you as a new customer and scope your project requirements.</li>
                <li>To deliver custom development, search engine optimization campaigns, and automation pipelines.</li>
                <li>To manage our ongoing partnership relation (notifying you about milestones, payments, or updates).</li>
                <li>To screen prospective applicants who submit portfolios via our Careers portal.</li>
              </ul>
            </>
          ),
        },
        {
          num: "04",
          title: "Data Security",
          body: (
            <p>
              We have put in place appropriate security measures to prevent your personal data from being
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access
              to your personal data to those employees, agents, contractors and other third parties who have a
              business need to know.
            </p>
          ),
        },
        {
          num: "05",
          title: "Data Retention & Your Rights",
          body: (
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your
              personal data, including the right to request access, correction, erasure, restriction, transfer,
              or object to processing. If you wish to exercise any of these rights, please contact our team at{" "}
              <strong className="text-foreground">privacy@clicktaketech.com</strong>.
            </p>
          ),
        },
      ]}
    />
    </>
  );
}
