import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { LegalPage } from "@/components/site/pages/legal-page";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the Terms of Service and contract parameters for working with ClickTake Technologies Ltd.",
  alternates: { canonical: "https://clicktaketech.com/legal/terms" },
};

export default function Page() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Terms of Service", path: "/legal/terms" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <LegalPage
      icon={<FileText className="h-6 w-6" />}
      title="Terms of Service"
      lastUpdated="May 26, 2026"
      badge="Service Agreement parameters"
      accentClass="bg-brand-magenta/20"
      sections={[
        {
          num: "01",
          title: "Acceptance of Terms",
          body: (
            <p>
              By accessing or using the services provided by ClickTake Technologies Ltd. (&quot;the Company&quot;,
              &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree with any
              part of these terms, you must not engage with our services or use our website.
            </p>
          ),
        },
        {
          num: "02",
          title: "Services & Engagements",
          body: (
            <>
              <p>We provide digital services including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                <li>Custom software, web and mobile application development</li>
                <li>AI, machine learning and automation solutions</li>
                <li>Search engine optimization, paid media and digital marketing</li>
                <li>Brand identity, design and creative production</li>
              </ul>
              <p className="mt-3">
                Each engagement is governed by a separate Statement of Work (SOW) that specifies deliverables,
                timeline, price, and acceptance criteria. In the event of a conflict, the SOW prevails over
                these Terms.
              </p>
            </>
          ),
        },
        {
          num: "03",
          title: "Payment Terms",
          body: (
            <>
              <p>
                Unless otherwise stated in your SOW, invoices are due within 14 days of issue. We accept bank
                transfer (GBP, USD, PKR, AED), Stripe, and Wise. Late payments may incur a 1.5% monthly interest
                charge. Deposits at project kickoff are non-refundable once work commences.
              </p>
            </>
          ),
        },
        {
          num: "04",
          title: "Intellectual Property",
          body: (
            <>
              <p>
                Upon receipt of full payment, all custom-developed source code, designs, and assets delivered
                under an SOW are transferred to the client under a worldwide, perpetual, royalty-free license.
                We retain rights to reusable components, libraries, and tooling developed prior to or
                independently of the engagement.
              </p>
            </>
          ),
        },
        {
          num: "05",
          title: "Confidentiality & NDAs",
          body: (
            <p>
              We treat all client information as confidential. We are happy to sign mutual NDAs before
              sensitive disclosures — request one at Info@clicktaketech.com.
            </p>
          ),
        },
        {
          num: "06",
          title: "Limitation of Liability",
          body: (
            <p>
              To the maximum extent permitted by law, ClickTake Technologies Ltd. shall not be liable for any
              indirect, incidental, special, consequential or punitive damages, or any loss of profits or
              revenues, arising from or related to the services provided.
            </p>
          ),
        },
        {
          num: "07",
          title: "Governing Law",
          body: (
            <p>
              These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          ),
        },
      ]}
    />
    </>
  );
}
