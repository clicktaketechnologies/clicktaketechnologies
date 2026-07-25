/**
 * QA Check — runs the Master Copywriting prompt's QA checklist against
 * generated LLM content. Used by:
 *   - POST /api/admin/services/generate (auto-validates before returning)
 *   - POST /api/admin/services/validate  (manual re-check from UI)
 *
 * The LLM self-reports its QA block, but we re-validate server-side
 * because LLMs are unreliable at self-assessment.
 */

import { FORBIDDEN_PHRASES } from "@/lib/seo/brand-voice";
import type { ServiceFormSchema } from "./copywriting-prompt";

export type QaResult = {
  pass: boolean;
  wordCount: number;
  sectionWordCounts: Record<string, number>;
  forbiddenPhrasesFound: string[];
  longSentences: { section: string; words: number; preview: string }[];
  caseStudiesCount: number;
  faqCount: number;
  internalLinksCount: number;
  hasGeoDefinition: boolean;
  hasWhatIsQuestion: boolean;
  hasClusterToPillarLink: boolean;
  errors: string[];
  warnings: string[];
};

const MIN_WORD_COUNT = 2500;
const MAX_SENTENCE_WORDS = 28;

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function splitSentences(s: string): string[] {
  // Naive but good enough for QA — split on ., !, ? followed by space or end.
  return s
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Flatten all text content of the form into a single string for word-count. */
function flattenAllText(form: ServiceFormSchema): string {
  const parts: string[] = [];
  parts.push(form.title, form.description, form.detailedDescription, form.eyebrow || "");
  parts.push(...(form.items || []));
  parts.push(...(form.differentiators || []));
  parts.push(...(form.deliverables || []));
  (form.results || []).forEach((r) => parts.push(r.label, r.value));
  (form.faq || []).forEach((f) => parts.push(f.q, f.a));
  (form.processSteps || []).forEach((p) => parts.push(p.title, p.description, p.duration));
  (form.pricingPackages || []).forEach((p) => parts.push(p.package_level, p.price, p.delivery_days, p.description, ...(p.features || [])));

  const dd = form.deepDive;
  if (dd) {
    parts.push(dd.geoDefinition, dd.heroSubtitle);
    parts.push(...(dd.problem?.intro || []));
    (dd.problem?.painPoints || []).forEach((p) => parts.push(p.title, p.description));
    parts.push(...(dd.problem?.paradigmShift || []));
    parts.push(...(dd.deepDive?.intro || []));
    (dd.deepDive?.subsections || []).forEach((s) => {
      parts.push(s.heading, ...(s.body || []));
    });
    parts.push(...(dd.techStack?.intro || []));
    (dd.techStack?.categories || []).forEach((c) => {
      parts.push(c.name);
      (c.items || []).forEach((i) => parts.push(i.name, i.description));
    });
    parts.push(...(dd.methodology?.intro || []));
    (dd.methodology?.steps || []).forEach((s) => {
      parts.push(s.phase, s.title, s.duration, s.description, ...(s.deliverables || []));
    });
    parts.push(...(dd.useCases?.intro || []));
    (dd.useCases?.cases || []).forEach((c) => parts.push(c.industry, c.problem, c.application, c.result));
    parts.push(...(dd.comparison?.intro || []));
    (dd.comparison?.tables || []).forEach((t) => {
      parts.push(t.title, ...(t.headers || []));
      (t.rows || []).forEach((r) => parts.push(...r));
    });
    parts.push(...(dd.businessImpact?.intro || []));
    (dd.businessImpact?.metrics || []).forEach((m) => parts.push(m.value, m.label, m.description));
    parts.push(...(dd.businessImpact?.body || []));
    parts.push(...(dd.integrations?.intro || []));
    (dd.integrations?.categories || []).forEach((c) => parts.push(c.name, ...(c.items || [])));
    parts.push(...(dd.integrations?.compliance || []));
    parts.push(...(dd.caseStudies?.intro || []));
    (dd.caseStudies?.studies || []).forEach((s) => {
      parts.push(s.client, s.situation, s.task, s.action, s.result);
      if (s.quote) parts.push(s.quote.text, s.quote.author, s.quote.title);
    });
    parts.push(...(dd.faq?.intro || []));
    (dd.faq?.categories || []).forEach((c) => {
      parts.push(c.name);
      (c.questions || []).forEach((q) => parts.push(q.q, q.a));
    });
    parts.push(dd.finalCta?.title || "", dd.finalCta?.subtitle || "");
    (dd.finalCta?.steps || []).forEach((s) => parts.push(s.step, s.title, s.description));
  }
  return parts.join(" \n ");
}

export function runQa(form: ServiceFormSchema): QaResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // ─── Word count ─────────────────────────────────────────────────────────
  const allText = flattenAllText(form);
  const wordCount = countWords(allText);
  if (wordCount < MIN_WORD_COUNT) {
    errors.push(`Word count ${wordCount} < minimum ${MIN_WORD_COUNT}.`);
  }

  // Section word counts (rough).
  const sectionWordCounts: Record<string, number> = {
    hero: countWords([form.title, form.description, form.deepDive?.geoDefinition, form.deepDive?.heroSubtitle].filter(Boolean).join(" ")),
    problem: countWords([
      ...(form.deepDive?.problem?.intro || []),
      ...(form.deepDive?.problem?.painPoints || []).map((p) => `${p.title} ${p.description}`),
      ...(form.deepDive?.problem?.paradigmShift || []),
    ].join(" ")),
    deepDive: countWords([
      ...(form.deepDive?.deepDive?.intro || []),
      ...(form.deepDive?.deepDive?.subsections || []).map((s) => `${s.heading} ${(s.body || []).join(" ")}`),
    ].join(" ")),
    techStack: countWords([
      ...(form.deepDive?.techStack?.intro || []),
      ...(form.deepDive?.techStack?.categories || []).map((c) => `${c.name} ${(c.items || []).map((i) => i.name + " " + i.description).join(" ")}`),
    ].join(" ")),
    methodology: countWords([
      ...(form.deepDive?.methodology?.intro || []),
      ...(form.deepDive?.methodology?.steps || []).map((s) => `${s.phase} ${s.title} ${s.duration} ${s.description} ${(s.deliverables || []).join(" ")}`),
    ].join(" ")),
    useCases: countWords([
      ...(form.deepDive?.useCases?.intro || []),
      ...(form.deepDive?.useCases?.cases || []).map((c) => `${c.industry} ${c.problem} ${c.application} ${c.result}`),
    ].join(" ")),
    comparison: countWords([
      ...(form.deepDive?.comparison?.intro || []),
      ...(form.deepDive?.comparison?.tables || []).map((t) => `${t.title} ${(t.headers || []).join(" ")} ${(t.rows || []).map((r) => r.join(" ")).join(" ")}`),
    ].join(" ")),
    businessImpact: countWords([
      ...(form.deepDive?.businessImpact?.intro || []),
      ...(form.deepDive?.businessImpact?.metrics || []).map((m) => `${m.value} ${m.label} ${m.description}`),
      ...(form.deepDive?.businessImpact?.body || []),
    ].join(" ")),
    integrations: countWords([
      ...(form.deepDive?.integrations?.intro || []),
      ...(form.deepDive?.integrations?.categories || []).map((c) => `${c.name} ${(c.items || []).join(" ")}`),
      ...(form.deepDive?.integrations?.compliance || []),
    ].join(" ")),
    caseStudies: countWords([
      ...(form.deepDive?.caseStudies?.intro || []),
      ...(form.deepDive?.caseStudies?.studies || []).map((s) => `${s.client} ${s.situation} ${s.task} ${s.action} ${s.result}${s.quote ? " " + s.quote.text : ""}`),
    ].join(" ")),
    faq: countWords([
      ...(form.deepDive?.faq?.intro || []),
      ...(form.deepDive?.faq?.categories || []).map((c) => `${c.name} ${(c.questions || []).map((q) => q.q + " " + q.a).join(" ")}`),
      ...(form.faq || []).map((q) => `${q.q} ${q.a}`),
    ].join(" ")),
    finalCta: countWords([
      form.deepDive?.finalCta?.title || "",
      form.deepDive?.finalCta?.subtitle || "",
      ...(form.deepDive?.finalCta?.steps || []).map((s) => `${s.step} ${s.title} ${s.description}`),
    ].join(" ")),
  };

  // ─── Forbidden phrases ──────────────────────────────────────────────────
  const lower = allText.toLowerCase();
  const forbiddenPhrasesFound: string[] = [];
  for (const phrase of FORBIDDEN_PHRASES) {
    if (lower.includes(phrase.avoid.toLowerCase())) {
      forbiddenPhrasesFound.push(phrase.avoid);
    }
  }
  if (forbiddenPhrasesFound.length > 0) {
    errors.push(`Forbidden phrases found: ${forbiddenPhrasesFound.join(", ")}.`);
  }

  // ─── Long sentences ─────────────────────────────────────────────────────
  const longSentences: { section: string; words: number; preview: string }[] = [];
  const allSentences = splitSentences(allText);
  for (const sentence of allSentences) {
    const w = countWords(sentence);
    if (w > MAX_SENTENCE_WORDS) {
      longSentences.push({
        section: "(any)",
        words: w,
        preview: sentence.slice(0, 120) + (sentence.length > 120 ? "…" : ""),
      });
    }
  }
  if (longSentences.length > 0) {
    warnings.push(`${longSentences.length} sentence(s) exceed ${MAX_SENTENCE_WORDS} words (max allowed).`);
  }

  // ─── Case studies count ─────────────────────────────────────────────────
  const caseStudiesCount = form.deepDive?.caseStudies?.studies?.length || 0;
  if (caseStudiesCount < 1) {
    errors.push("At least 1 STAR case study is required.");
  }

  // ─── FAQ count ──────────────────────────────────────────────────────────
  const deepFaqCount = (form.deepDive?.faq?.categories || []).reduce(
    (sum, c) => sum + (c.questions?.length || 0), 0,
  );
  const topFaqCount = form.faq?.length || 0;
  const faqCount = deepFaqCount + topFaqCount;
  if (faqCount < 12) {
    warnings.push(`FAQ count ${faqCount} < recommended 12.`);
  }

  // ─── Internal links ─────────────────────────────────────────────────────
  const internalLinksCount = form.deepDive?.internalLinks?.length || 0;
  if (internalLinksCount < 4) {
    errors.push(`Internal links ${internalLinksCount} < minimum 4.`);
  }
  if (internalLinksCount > 7) {
    warnings.push(`Internal links ${internalLinksCount} > recommended max 7.`);
  }
  const hasClusterToPillarLink = (form.deepDive?.internalLinks || []).some(
    (l) => l.type === "cluster-to-pillar",
  );
  if (!hasClusterToPillarLink) {
    errors.push("Missing Cluster-to-Pillar link in first 200 words.");
  }

  // ─── GEO definition ─────────────────────────────────────────────────────
  const hasGeoDefinition = !!(form.deepDive?.geoDefinition && form.deepDive.geoDefinition.split(".").length >= 3);
  if (!hasGeoDefinition) {
    warnings.push("GEO definition should be 3 encyclopedic sentences.");
  }

  // ─── "What is X?" question ──────────────────────────────────────────────
  const allFaqQuestions: string[] = [];
  (form.deepDive?.faq?.categories || []).forEach((c) => (c.questions || []).forEach((q) => allFaqQuestions.push(q.q)));
  (form.faq || []).forEach((q) => allFaqQuestions.push(q.q));
  const hasWhatIsQuestion = allFaqQuestions.some((q) => /^what is\s+/i.test(q.trim()));
  if (!hasWhatIsQuestion) {
    warnings.push('FAQ should include a "What is [concept]?" question for GEO citation.');
  }

  // ─── Vague metrics ──────────────────────────────────────────────────────
  const vagueTerms = ["high accuracy", "many ", "significant", "a lot of", "numerous", "various "];
  const vagueHits = vagueTerms.filter((t) => lower.includes(t));
  if (vagueHits.length > 0) {
    warnings.push(`Vague terms found: ${vagueHits.join(", ")}. Replace with specific metrics.`);
  }

  const pass = errors.length === 0;

  return {
    pass,
    wordCount,
    sectionWordCounts,
    forbiddenPhrasesFound,
    longSentences: longSentences.slice(0, 10), // cap for UI readability
    caseStudiesCount,
    faqCount,
    internalLinksCount,
    hasGeoDefinition,
    hasWhatIsQuestion,
    hasClusterToPillarLink,
    errors,
    warnings,
  };
}
