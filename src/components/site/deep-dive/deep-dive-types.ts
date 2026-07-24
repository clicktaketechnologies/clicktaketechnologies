/**
 * DeepDivePage content schema — a single typed object that describes all
 * 12 sections of the "Ultimate Guide" blueprint. Content authors write
 * data files in this shape; the DeepDiveLayout component renders them.
 *
 * Every section is OPTIONAL — a page can omit sections it doesn't need.
 * The sticky Table of Contents auto-builds from whichever sections are
 * present.
 */

export type DeepDiveCta = {
  label: string
  href: string
  variant?: "orange" | "outline" | "dark"
}

export type DeepDiveHero = {
  /** Eyebrow chip above the H1, e.g. "AI & AUTOMATION" */
  eyebrow: string
  /** The H1 itself — primary keyword + value prop */
  title: string
  /** 3-sentence encyclopedic definition (GEO — what AI engines scrape) */
  geoDefinition: string
  /** Optional smaller subtitle under the H1 */
  subtitle?: string
  /** Hero CTAs */
  ctas: DeepDiveCta[]
  /** 3D character variant for the hero column */
  character?:
    | "about" | "services" | "solutions" | "careers" | "case-studies"
    | "blog" | "contact" | "pricing" | "portfolio" | "team"
    | "resources" | "legal" | "service-detail" | "solution-detail"
    | "blog-post" | "default"
  /** Optional stats row */
  stats?: { value: string; label: string }[]
  /** Breadcrumb items */
  crumbs?: { label: string; href?: string }[]
}

export type JargonDef = { term: string; def: string }

export type DeepDiveSubsection = {
  heading: string
  /** 2-4 paragraphs of dense body copy */
  body: string[]
  /** Optional inline term/definition list for jargon */
  jargon?: JargonDef[]
}

export type DeepDiveProblem = {
  title: string
  /** Section intro — 1-2 paragraphs */
  intro: string[]
  /** 3-4 pain points */
  painPoints: { title: string; description: string }[]
  /** "Our paradigm shift" closing paragraph */
  paradigmShift: string[]
}

export type DeepDiveDeepDive = {
  title: string
  intro: string[]
  subsections: DeepDiveSubsection[]
}

export type DeepDiveTechStack = {
  title: string
  intro: string[]
  categories: { name: string; items: { name: string; description: string }[] }[]
  /** Optional feature/comparison table */
  comparisonTable?: { headers: string[]; rows: string[][] }
}

export type DeepDiveMethodology = {
  title: string
  intro: string[]
  steps: {
    phase: string
    title: string
    duration: string
    deliverables: string[]
    description: string
  }[]
}

export type DeepDiveUseCase = {
  industry: string
  problem: string
  application: string
  result: string
}

export type DeepDiveUseCases = {
  title: string
  intro: string[]
  cases: DeepDiveUseCase[]
}

export type DeepDiveComparison = {
  title: string
  intro: string[]
  tables: { title: string; headers: string[]; rows: string[][] }[]
}

export type DeepDiveBusinessImpact = {
  title: string
  intro: string[]
  metrics: { value: string; label: string; description: string }[]
  body: string[]
}

export type DeepDiveIntegrations = {
  title: string
  intro: string[]
  categories: { name: string; items: string[] }[]
  compliance?: string[]
}

export type DeepDiveCaseStudy = {
  client: string
  situation: string
  task: string
  action: string
  result: string
  quote?: { text: string; author: string; title: string }
}

export type DeepDiveCaseStudies = {
  title: string
  intro: string[]
  studies: DeepDiveCaseStudy[]
}

export type DeepDiveFaq = {
  title: string
  intro: string[]
  categories: { name: string; questions: { q: string; a: string }[] }[]
}

export type DeepDiveFinalCta = {
  title: string
  subtitle: string
  steps: { step: string; title: string; description: string }[]
  primaryCta: DeepDiveCta
  secondaryCta?: DeepDiveCta
}

export type DeepDiveContent = {
  hero: DeepDiveHero
  problem?: DeepDiveProblem
  deepDive?: DeepDiveDeepDive
  techStack?: DeepDiveTechStack
  methodology?: DeepDiveMethodology
  useCases?: DeepDiveUseCases
  comparison?: DeepDiveComparison
  businessImpact?: DeepDiveBusinessImpact
  integrations?: DeepDiveIntegrations
  caseStudies?: DeepDiveCaseStudies
  faq?: DeepDiveFaq
  finalCta: DeepDiveFinalCta
}
