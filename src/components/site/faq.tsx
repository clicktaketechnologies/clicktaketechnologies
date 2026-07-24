'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionReveal } from "./scroll-animations";

/* FAQ — 8 questions using the shadcn/ui Accordion (Radix UI primitive).
 * Wraps each item in a theme-aware ct-card surface and uses brand-tinted
 * chevron via the existing AccordionTrigger component. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What services does ClickTake Technologies offer?",
    a: "We are a full-stack digital agency covering four practices: AI & machine learning, web & software development, digital marketing, and creative services. From custom LLM applications and SaaS platforms to SEO, paid ads, branding and video — you can engage one practice or all four under a single delivery team.",
  },
  {
    q: "Where is ClickTake Technologies based?",
    a: "We have two delivery hubs: Birmingham (UK-registered HQ) and Multan, Pakistan (engineering centre). We also run business desks serving the USA and UAE/Dubai. The UK–Pakistan overlap gives us roughly 12 working hours of overlap each day with clients worldwide.",
  },
  {
    q: "How do I get started with a project?",
    a: "Book a free 30-minute consultation through our contact page. We'll audit your current setup, map goals to the right practice, and send a no-obligation proposal within one business day. Once you sign off, we kick off with a discovery sprint the following week.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes — roughly half our clients are pre-Series A startups or local SMBs. Our Business Startup Kit is built specifically for new founders who need domain, hosting, branding, website and foundational SEO in one fixed-price package.",
  },
  {
    q: "What is your typical project process?",
    a: "Every engagement runs through six milestones: Discover → Strategy → Design → Develop → Launch → Grow. You'll get weekly demos, Notion docs you own, and a named point of contact — no ticket-based black boxes.",
  },
  {
    q: "Do you offer ongoing support after project completion?",
    a: "Yes. We offer monthly maintenance retainers covering security patches, dependency upgrades, daily backups, uptime monitoring and content updates — for WordPress, Next.js, Shopify and custom platforms. Most clients stay with us for 2+ years.",
  },
  {
    q: "How do you handle communication across time zones?",
    a: "Our UK desk and Pakistan engineering hub share 12 hours of overlap each business day, which covers UK morning through late evening. We use Slack, Notion and weekly demo calls — and we agree a single primary contact for each project so nothing falls through the cracks.",
  },
  {
    q: "Can I see examples of your previous work?",
    a: "Absolutely. Browse our Portfolio for selected case stories and the Case Studies section for deep dives with measurable results. We can also share relevant references on a discovery call once we understand your industry and goals.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="text-center">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
              FAQ
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Everything you need to know about working with ClickTake Technologies. Still curious?{" "}
              <a href="/contact" className="text-brand-blue font-semibold hover:underline">
                Talk to a human →
              </a>
            </p>
          </SectionReveal>
        </div>

        {/* Accordion — wrapped in a single ct-card surface for visual cohesion. */}
        <SectionReveal variant="fadeUp" delay={0.2}>
          <div className="mt-10 sm:mt-12 rounded-2xl ct-card p-4 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-border last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline px-2">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed px-2">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
