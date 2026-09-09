"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Calculator,
  FileText,
  FolderTree,
  Layers,
  Sparkles,
} from "lucide-react"
import type {
  HubSpokeEntry,
  ResourceLink,
} from "@/lib/seo/hub-spoke-map"

/* ─── Service title lookup (for Solution-to-Service bridge) ──────────
 * Maps a service slug (as used in `bridgeTo`) to its title + href + blurb.
 * Maintained as a separate table so the layout doesn't need to import the
 * full content map (which would create a circular dep). Keep in sync with
 * HUB_SPOKE_MAP and the DEEP_DIVE_CONTENT map in services/[[...slug]]/page.tsx.
 *
 * When adding a new service: add an entry here, in HUB_SPOKE_MAP, and in
 * the DEEP_DIVE_CONTENT map.
 */
const SERVICE_TITLE_MAP: Record<
  string,
  { title: string; href: string; blurb?: string }
> = {
  "ai/llm": { title: "LLM Development & Deployment", href: "/services/ai/llm", blurb: "Production LLM hosting, fine-tuning, RAG." },
  "ai/chatbots": { title: "AI Chatbots & Assistants", href: "/services/ai/chatbots", blurb: "Conversational agents for support + sales." },
  "ai/prompt-engineering": { title: "Prompt Engineering", href: "/services/ai/prompt-engineering", blurb: "Eval-driven prompt libraries." },
  "ai/cv-nlp": { title: "Computer Vision & NLP", href: "/services/ai/cv-nlp", blurb: "Vision + document intelligence." },
  "ai/automation": { title: "AI Automation & Workflows", href: "/services/ai/automation", blurb: "Agentic workflows that remove manual ops." },
  "web/full-stack": { title: "Full-Stack Web Development", href: "/services/web/full-stack", blurb: "Next.js + Prisma + Postgres." },
  "web/saas": { title: "SaaS Platform Development", href: "/services/web/saas", blurb: "Multi-tenant SaaS with billing + RBAC." },
  "web/auth": { title: "Authentication & Security", href: "/services/web/auth", blurb: "OAuth, SSO, MFA, zero-trust." },
  "web/python-backend": { title: "Python Backend Development", href: "/services/web/python-backend", blurb: "FastAPI + Django async services." },
  "web/wordpress": { title: "WordPress Development", href: "/services/web/wordpress", blurb: "Headless WP + classic WP." },
  "web/ecommerce": { title: "E-commerce Development", href: "/services/web/ecommerce", blurb: "Shopify, headless, custom commerce." },
  "web/custom-software": { title: "Custom Software Development", href: "/services/web/custom-software", blurb: "Bespoke line-of-business apps." },
  "web/maintenance": { title: "Web Maintenance & Support", href: "/services/web/maintenance", blurb: "SLA-backed ongoing engineering." },
  "web/redesign": { title: "Web Redesign Services", href: "/services/web/redesign", blurb: "Conversion-led rebuilds." },
  "web/domain-hosting": { title: "Web Domain & Hosting", href: "/services/web/domain-hosting", blurb: "Managed infra + DNS." },
  "digital-marketing/paid-advertising": { title: "Paid Advertising", href: "/services/digital-marketing/paid-advertising", blurb: "Meta, Google, TikTok paid social." },
  "digital-marketing/content-strategy": { title: "Content Strategy", href: "/services/digital-marketing/content-strategy", blurb: "Pillar/cluster content engines." },
  "digital-marketing/cro": { title: "Conversion Rate Optimization", href: "/services/digital-marketing/cro", blurb: "Funnel diagnostics + A/B testing." },
  "seo": { title: "Search Engine Optimization", href: "/services/seo", blurb: "Technical + on-page + programmatic SEO." },
  "digital-marketing/social-media": { title: "Social Media Marketing", href: "/services/digital-marketing/social-media", blurb: "Organic + paid social synergy." },
  "creative/graphic-design": { title: "Graphic Design", href: "/services/creative/graphic-design", blurb: "Brand systems + design tokens." },
  "creative/web-design": { title: "Web Design", href: "/services/creative/web-design", blurb: "UX-led design systems." },
  "creative/video-production": { title: "Video Production", href: "/services/creative/video-production", blurb: "Short-form + brand films." },
  "starter-kit": { title: "Starter Kit", href: "/services/starter-kit", blurb: "Fixed-scope MVP package." },
}

/* ─── PillarContextBanner ─────────────────────────────────────────────
 * Injected immediately after the hero (within the first 200 words of
 * viewport text). Renders a slim "Part of the [Cluster] hub" strip with
 * a contextual link back to the pillar page. This satisfies the
 * Cluster-to-Pillar rule from the SEO brief.
 *
 * Non-destructive: if no entry is provided, renders nothing. */
const CLUSTER_LABEL: Record<HubSpokeEntry["cluster"], string> = {
  ai: "AI & Machine Learning",
  web: "Web & Software",
  marketing: "Digital Marketing",
  creative: "Creative & Brand",
  solution: "Industry Solutions",
  company: "About ClickTake",
}

export function PillarContextBanner({ entry }: { entry?: HubSpokeEntry }) {
  if (!entry) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="nx-surface border nx-bd rounded-xl flex flex-wrap items-center gap-3 px-4 py-3 mb-8 text-sm"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF53A9]/10 px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF53A9]">
        <FolderTree className="size-3.5" />
        {CLUSTER_LABEL[entry.cluster]}
      </span>
      <span className="nx-text-muted text-xs sm:text-sm">
        Part of the{" "}
        <Link
          href={entry.pillar.href}
          className="nx-text font-semibold hover:text-[#FF53A9] transition-colors underline-offset-4 hover:underline"
        >
          {entry.pillar.label}
        </Link>{" "}
        hub. Explore related services below.
      </span>
    </motion.div>
  )
}

/* ─── RelatedResources ────────────────────────────────────────────────
 * Mandatory footer section on every DeepDive page per the design brief.
 * Renders up to 4 columns:
 *   1. Related Services (siblings — Sibling-to-Sibling cross-linking)
 *      OR for solutions: Recommended Services (bridgeTo) + Related Solutions
 *   2. Blogs & Guides (resources.blogs)
 *   3. Case Studies (resources.caseStudies)
 *   4. Pricing & Resources (resources.pricing)
 *
 * Non-destructive: if entry is undefined, the entire section is omitted
 * (legacy pages still render but don't get the SEO footer until their
 * entry is added to HUB_SPOKE_MAP).
 *
 * Theme-aware: uses nx-* utility classes so it works in light + dark.
 */

function ResourceColumn({
  icon,
  title,
  links,
  accent = "#FF53A9",
}: {
  icon: React.ReactNode
  title: string
  links: ResourceLink[]
  accent?: string
}) {
  if (!links || links.length === 0) return null
  return (
    <div className="nx-surface border nx-bd rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex size-7 items-center justify-center rounded-md"
          style={{ background: `${accent}1a`, color: accent }}
        >
          {icon}
        </span>
        <h3 className="text-xs font-mono uppercase tracking-wider nx-text-muted">
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="group block rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-[var(--nx-hover,rgba(255,83,169,0.06))]"
            >
              <div className="flex items-start gap-1.5">
                <span className="nx-text text-sm font-semibold leading-snug group-hover:text-[#FF53A9] transition-colors">
                  {link.label}
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 mt-0.5 nx-text-muted opacity-0 group-hover:opacity-100 group-hover:text-[#FF53A9] transition-all" />
              </div>
              {link.blurb && (
                <div className="nx-text-muted text-xs leading-relaxed mt-1">
                  {link.blurb}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RelatedResources({ entry }: { entry?: HubSpokeEntry }) {
  if (!entry) return null

  const columns: React.ReactNode[] = []

  // Column 1: Solution-to-Service bridge + Related Solutions (solution pages)
  //       OR  Related Services (siblings) for service pages
  if (entry.cluster === "solution" && entry.bridgeTo && entry.bridgeTo.length > 0) {
    const bridgeLinks: ResourceLink[] = entry.bridgeTo
      .map((slug): ResourceLink | null => {
        const svc = SERVICE_TITLE_MAP[slug]
        if (!svc) return null
        return {
          label: svc.title,
          href: svc.href,
          blurb: svc.blurb,
        }
      })
      .filter((l): l is ResourceLink => l !== null)

    if (bridgeLinks.length > 0) {
      columns.push(
        <ResourceColumn
          key="bridge"
          icon={<Sparkles className="size-3.5" />}
          title="Recommended Services"
          links={bridgeLinks}
          accent="#9B3DFF"
        />
      )
    }

    if (entry.siblings.length > 0) {
      columns.push(
        <ResourceColumn
          key="siblings"
          icon={<Layers className="size-3.5" />}
          title="Related Solutions"
          links={entry.siblings}
          accent="#136DFF"
        />
      )
    }
  } else if (entry.siblings.length > 0) {
    columns.push(
      <ResourceColumn
        key="siblings"
        icon={<Layers className="size-3.5" />}
        title="Related Services"
        links={entry.siblings}
        accent="#FF53A9"
      />
    )
  }

  // Column: Blogs & Guides
  if (entry.resources.blogs && entry.resources.blogs.length > 0) {
    columns.push(
      <ResourceColumn
        key="blogs"
        icon={<BookOpen className="size-3.5" />}
        title="Blogs & Guides"
        links={entry.resources.blogs}
        accent="#136DFF"
      />
    )
  }

  // Column: Case Studies
  if (entry.resources.caseStudies && entry.resources.caseStudies.length > 0) {
    columns.push(
      <ResourceColumn
        key="cases"
        icon={<Briefcase className="size-3.5" />}
        title="Case Studies"
        links={entry.resources.caseStudies}
        accent="#22c55e"
      />
    )
  }

  // Column: Pricing & Resources
  if (entry.resources.pricing && entry.resources.pricing.length > 0) {
    columns.push(
      <ResourceColumn
        key="pricing"
        icon={<Calculator className="size-3.5" />}
        title="Pricing & Resources"
        links={entry.resources.pricing}
        accent="#f59e0b"
      />
    )
  }

  if (columns.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-[var(--nx-border)]">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="size-4 text-[#FF53A9]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF53A9]">
            Continue Reading
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black nx-text">
          Related Resources
        </h2>
        <p className="nx-text-muted text-sm mt-2 max-w-2xl leading-relaxed">
          Dive deeper. Hand-picked guides, case studies, and adjacent services
          that pair naturally with this page.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns}
      </div>
    </section>
  )
}
