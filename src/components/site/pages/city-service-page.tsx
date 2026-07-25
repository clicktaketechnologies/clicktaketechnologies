"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Building2,
  ChevronRight,
  CheckCircle2,
  Clock,
  Currency,
} from "lucide-react";
import {
  NxPageLayout,
  NxPageHero,
  NxPageSection,
  NxSectionHeader,
  NxButton,
} from "@/components/site/nx-page-layout";
import type { CityServiceContent } from "@/lib/seo/city-service-content";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function CityServicePage({ content }: { content: CityServiceContent }) {
  const { city, service, hero, intro, localFaq, serviceContent, links } = content;

  return (
    <NxPageLayout>
      <NxPageHero
        eyebrow={hero.eyebrow}
        title={hero.h1}
        subtitle={hero.subtitle}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: city.name, href: `/cities/${city.slug}` },
          { label: service.title },
        ]}
        character="service-detail"
        ctas={
          <>
            <NxButton href="/contact">Book a consultation</NxButton>
            <NxButton href={links.canonicalService.href} variant="outline">
              View full guide
            </NxButton>
          </>
        }
        stats={[
          { value: city.context.startingPriceFrom, label: "Starting price" },
          {
            value: city.hasOffice ? "Local office" : "Remote",
            label: "Delivery model",
          },
          { value: "30 min", label: "Free consultation" },
        ]}
      />

      {/* City-specific intro (220-280 words unique content) */}
      <NxPageSection variant="surface" padding="default">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-black nx-text mb-6"
          >
            {intro.heading}
          </motion.h2>
          <div className="space-y-5">
            {intro.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="text-base sm:text-lg nx-text-muted leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Local facts strip */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          <LocalFact
            icon={<Building2 className="h-5 w-5" />}
            label="Region"
            value={`${city.name}, ${city.regionCode}`}
          />
          <LocalFact
            icon={<Currency className="h-5 w-5" />}
            label="Currency"
            value={city.context.currency}
          />
          <LocalFact
            icon={<Clock className="h-5 w-5" />}
            label="Timezone"
            value={city.timezone.split("/").pop()?.replace("_", " ") || city.timezone}
          />
          <LocalFact
            icon={<MapPin className="h-5 w-5" />}
            label="Industries"
            value={`${city.context.keyIndustries.length} sectors`}
          />
        </div>

        {city.context.complianceNotes && (
          <div className="mt-8 max-w-5xl mx-auto rounded-lg border border-[var(--nx-orange)]/30 bg-[var(--nx-orange)]/5 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--nx-orange)] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="nx-text">Compliance-engineered for {city.name}:</strong>{" "}
                <span className="nx-text-muted">{city.context.complianceNotes}</span>
              </div>
            </div>
          </div>
        )}
      </NxPageSection>

      {/* Service overview (canonical content reused) */}
      <NxPageSection variant="surface-alt" padding="default">
        <NxSectionHeader
          eyebrow="What we deliver"
          title={serviceContent.title}
          subtitle={serviceContent.description}
          align="left"
        />
        <div className="mt-6 max-w-4xl">
          <p className="text-base nx-text-muted leading-relaxed">
            {serviceContent.detailedDescription}
          </p>
          <div className="mt-6">
            <Link
              href={links.canonicalService.href}
              className="inline-flex items-center gap-2 font-bold text-[var(--nx-orange)] hover:underline"
            >
              View the full {service.title} Ultimate Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </NxPageSection>

      {/* Local FAQ */}
      <NxPageSection variant="surface" padding="default">
        <NxSectionHeader
          eyebrow={`${city.name} FAQ`}
          title={`Common questions about ${service.title.toLowerCase()} in ${city.name}`}
          subtitle="Straight answers from our delivery team — no marketing fluff."
        />
        <div className="mt-10 max-w-4xl mx-auto space-y-4">
          {localFaq.map((item, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="group rounded-lg border border-nx-border bg-nx-surface-alt p-5 open:bg-nx-surface open:border-[var(--nx-orange)]/30 transition"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                <h3 className="font-bold nx-text pr-4">{item.q}</h3>
                <ChevronRight className="h-5 w-5 text-[var(--nx-orange)] flex-shrink-0 mt-0.5 transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm nx-text-muted leading-relaxed">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </NxPageSection>

      {/* Internal links: sibling services in same city */}
      {links.siblingServices.length > 0 && (
        <NxPageSection variant="surface-alt" padding="default">
          <NxSectionHeader
            eyebrow={`More in ${city.name}`}
            title="Other services we deliver here"
            subtitle="Same senior team, same delivery model. Browse related services."
            align="left"
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.siblingServices.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block rounded-xl border border-nx-border bg-nx-surface p-5 transition hover:border-[var(--nx-orange)]/60 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold nx-text">{s.label}</h4>
                  <ArrowRight className="h-4 w-4 nx-text-muted group-hover:text-[var(--nx-orange)] group-hover:translate-x-1 transition flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm nx-text-muted mt-2 line-clamp-2">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </NxPageSection>
      )}

      {/* Internal links: same service in nearby cities */}
      {links.siblingCities.length > 0 && (
        <NxPageSection variant="surface" padding="default">
          <NxSectionHeader
            eyebrow={`${service.title} elsewhere`}
            title={`Also delivering ${service.title.toLowerCase()} in`}
            subtitle="Same service, different city. Browse nearby locations."
            align="left"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {links.siblingCities.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nx-border bg-nx-surface-alt text-sm font-semibold nx-text hover:border-[var(--nx-orange)]/60 transition"
              >
                <MapPin className="h-4 w-4 text-[var(--nx-orange)]" />
                {c.label}
              </Link>
            ))}
          </div>
        </NxPageSection>
      )}

      {/* CTA */}
      <NxPageSection variant="navy" padding="default">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to ship {service.title.toLowerCase()} in {city.name}?
          </h2>
          <p className="mt-3 text-white/80">
            Book a free 30-minute consultation with our {city.name} team. We&apos;ll discuss
            your project, share relevant case studies under NDA, and provide a fixed-scope
            quote within 48 hours — in {city.context.currency}.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <NxButton href="/contact">Book a consultation</NxButton>
            <NxButton href={links.cityHub.href} variant="outline">
              All {city.name} services
            </NxButton>
          </div>
        </div>
      </NxPageSection>
    </NxPageLayout>
  );
}

function LocalFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-nx-border bg-nx-surface-alt p-4 text-center">
      <div className="flex justify-center mb-2 text-[var(--nx-orange)]">{icon}</div>
      <div className="text-xs nx-text-muted uppercase tracking-wider">{label}</div>
      <div className="font-bold nx-text mt-1 text-sm">{value}</div>
    </div>
  );
}
