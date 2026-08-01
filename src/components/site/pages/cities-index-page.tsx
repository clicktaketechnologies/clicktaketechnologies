"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import {
  NxPageLayout,
  NxPageHero,
  NxPageSection,
  NxSectionHeader,
  NxButton,
} from "@/components/site/nx-page-layout";
import type { CitiesIndexContent } from "@/lib/seo/city-service-content";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function CitiesIndexPage({ content }: { content: CitiesIndexContent }) {
  return (
    <NxPageLayout>
      <NxPageHero
        eyebrow="Local Delivery · Global Standards"
        title={content.hero.h1}
        subtitle={content.hero.subtitle}
        crumbs={[{ label: "Home", href: "/" }, { label: "Cities" }]}
        character="default"
        storyVariant="default"
        ctas={
          <>
            <NxButton href="#cities">Browse cities</NxButton>
            <NxButton href="/contact" variant="outline">
              Book a consultation
            </NxButton>
          </>
        }
      />

      <NxPageSection id="cities" variant="surface" padding="loose">
        <NxSectionHeader
          eyebrow="Where we work"
          title="12 cities across 4 countries"
          subtitle="ClickTake Technologies serves clients from offices in Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE) — with delivery to nearby cities in each region. Every engagement includes local-currency pricing, in-region compliance, and a free 30-minute consultation."
        />

        <div className="mt-12 space-y-12">
          {content.citiesByCountry.map((group, gi) => (
            <motion.div
              key={group.country.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={gi}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{group.country.flag}</span>
                <h3 className="text-2xl font-black nx-text">{group.country.name}</h3>
                <span className="text-sm nx-text-muted">
                  {group.cities.length} {group.cities.length === 1 ? "city" : "cities"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.cities.map((city, ci) => (
                  <motion.div
                    key={city.slug}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={ci}
                  >
                    <Link
                      href={`/cities/${city.slug}`}
                      className="group block h-full rounded-xl border border-nx-border bg-nx-surface-alt p-6 transition hover:border-[var(--nx-orange)]/60 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            {city.hasOffice && (
                              <Building2 className="h-4 w-4 text-[var(--nx-orange)]" />
                            )}
                            <h4 className="text-lg font-bold nx-text">{city.name}</h4>
                          </div>
                          <p className="text-xs nx-text-muted mt-1">
                            {city.regionCode} · Pop. {city.population.toLocaleString()}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 nx-text-muted group-hover:text-[var(--nx-orange)] group-hover:translate-x-1 transition" />
                      </div>

                      <p className="text-sm nx-text-muted mt-3 line-clamp-3">
                        {city.context.economy}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {city.context.keyIndustries.slice(0, 3).map((ind) => (
                          <span
                            key={ind}
                            className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[var(--nx-orange)]/10 text-[var(--nx-orange)]"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="nx-text-muted">
                          {city.hasOffice ? "📦 Local office" : "🚀 Remote delivery"}
                        </span>
                        <span className="font-bold nx-text">
                          From {city.context.startingPriceFrom}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </NxPageSection>

      <NxPageSection variant="surface-alt" padding="default">
        <div className="text-center max-w-3xl mx-auto">
          <MapPin className="h-10 w-10 mx-auto text-[var(--nx-orange)] mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black nx-text">
            Don&apos;t see your city?
          </h2>
          <p className="mt-3 nx-text-muted">
            We work with clients in 18+ countries. If your city isn&apos;t listed, we
            deliver remotely with the same senior engineering team, weekly demos, and
            local-currency invoicing. Book a free consultation to discuss your project.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <NxButton href="/contact">Contact us</NxButton>
            <NxButton href="/services" variant="dark">
              Browse all services
            </NxButton>
          </div>
        </div>
      </NxPageSection>
    </NxPageLayout>
  );
}
