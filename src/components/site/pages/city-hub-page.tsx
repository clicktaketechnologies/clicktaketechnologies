"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2, Clock } from "lucide-react";
import {
  NxPageLayout,
  NxPageHero,
  NxPageSection,
  NxSectionHeader,
  NxButton,
} from "@/components/site/nx-page-layout";
import type { CityHubContent } from "@/lib/seo/city-service-content";
import { CATEGORY_STYLES } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function CityHubPage({ content }: { content: CityHubContent }) {
  const { city } = content;

  // Group services by category for display
  const grouped = new Map<string, typeof content.servicesForCity>();
  for (const entry of content.servicesForCity) {
    const cat = entry.service.category;
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(entry);
  }

  return (
    <NxPageLayout>
      <NxPageHero
        eyebrow={`${content.city.context.keyIndustries[0]} · ${city.name}`}
        title={content.hero.h1}
        subtitle={content.hero.subtitle}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: city.name },
        ]}
        character="services"
        storyVariant="default"
        ctas={
          <>
            <NxButton href="#services">Browse services</NxButton>
            <NxButton href="/contact" variant="outline">
              Book a consultation
            </NxButton>
          </>
        }
        stats={[
          { value: content.servicesForCity.length.toString(), label: "Services available" },
          { value: city.context.startingPriceFrom, label: "Starting price" },
          {
            value: city.hasOffice ? "Local office" : "Remote",
            label: "Delivery model",
          },
        ]}
      />

      {/* City intro */}
      <NxPageSection variant="surface" padding="default">
        <div className="max-w-4xl mx-auto space-y-6">
          {content.intro.map((p, i) => (
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

        {/* Local facts grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <LocalFact icon={<Building2 className="h-5 w-5" />} label="Population" value={city.population.toLocaleString()} />
          <LocalFact icon={<MapPin className="h-5 w-5" />} label="Region" value={city.regionCode} />
          <LocalFact icon={<Clock className="h-5 w-5" />} label="Timezone" value={city.timezone.split("/").pop()?.replace("_", " ") || city.timezone} />
          <LocalFact icon={<span className="text-base">💱</span>} label="Currency" value={city.context.currency} />
        </div>

        {/* Key industries */}
        <div className="mt-10 max-w-5xl mx-auto">
          <h3 className="text-sm font-semibold nx-text-muted uppercase tracking-wider mb-3">
            Key industries in {city.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {city.context.keyIndustries.map((ind) => (
              <span
                key={ind}
                className="text-sm font-semibold px-3 py-1.5 rounded-full bg-[var(--nx-orange)]/10 text-[var(--nx-orange)] border border-[var(--nx-orange)]/20"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {city.context.complianceNotes && (
          <div className="mt-6 max-w-5xl mx-auto rounded-lg border border-nx-border bg-nx-surface-alt p-4 text-sm">
            <strong className="nx-text">Local compliance:</strong>{" "}
            <span className="nx-text-muted">{city.context.complianceNotes}</span>
          </div>
        )}
      </NxPageSection>

      {/* Services in this city */}
      <NxPageSection id="services" variant="surface-alt" padding="default">
        <NxSectionHeader
          eyebrow="Services in this city"
          title={`${content.servicesForCity.length} services available in ${city.name}`}
          subtitle={`Each service page includes ${city.name}-specific pricing, FAQ, and case studies. Click through for the full Ultimate Guide.`}
        />

        <div className="mt-12 space-y-10">
          {[...grouped.entries()].map(([catKey, services], gi) => {
            const style = CATEGORY_STYLES[catKey];
            return (
              <motion.div
                key={catKey}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={gi}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <h3 className="text-xl font-black nx-text">{style?.group || catKey}</h3>
                  <span className="text-xs nx-text-muted uppercase tracking-wider">
                    {services.length} services
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map(({ service, href, blurb }) => (
                    <Link
                      key={service.slug}
                      href={href}
                      className="group block h-full rounded-xl border border-nx-border bg-nx-surface p-5 transition hover:border-[var(--nx-orange)]/60 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold nx-text">{service.title}</h4>
                        <ArrowRight className="h-4 w-4 nx-text-muted group-hover:text-[var(--nx-orange)] group-hover:translate-x-1 transition flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm nx-text-muted mt-2 line-clamp-3">{blurb}</p>
                      <div className="mt-3 text-xs font-semibold text-[var(--nx-orange)]">
                        View in {city.name} →
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </NxPageSection>

      {/* Nearby cities */}
      {content.nearbyCities.length > 0 && (
        <NxPageSection variant="surface" padding="default">
          <NxSectionHeader
            eyebrow="Also serving"
            title={`Cities near ${city.name}`}
            subtitle="Same senior team, same delivery model. Browse nearby cities we serve."
            align="left"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {content.nearbyCities.map((nc) => (
              <Link
                key={nc.href}
                href={nc.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nx-border bg-nx-surface-alt text-sm font-semibold nx-text hover:border-[var(--nx-orange)]/60 transition"
              >
                <MapPin className="h-4 w-4 text-[var(--nx-orange)]" />
                {nc.name}
                <span className="nx-text-muted text-xs">· {nc.country}</span>
              </Link>
            ))}
          </div>
        </NxPageSection>
      )}

      <NxPageSection variant="navy" padding="default">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to start in {city.name}?
          </h2>
          <p className="mt-3 text-white/80">
            Book a free 30-minute consultation. We&apos;ll discuss your project, share
            relevant case studies under NDA, and provide a fixed-scope quote within 48 hours.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <NxButton href="/contact">Book a consultation</NxButton>
            <NxButton href="/services" variant="outline">
              Browse all services
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
