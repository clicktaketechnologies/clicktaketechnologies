"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Quote } from "lucide-react"

/* ─── Accordion ────────────────────────────────────────────────────
 * Used for FAQ categories and any other expandable content.
 * Single-open behavior — clicking an open item closes it. */

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-semibold text-white">
                {item.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#FF8AC4] transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm sm:text-[15px] text-white/70 leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ─── ComparisonTable ──────────────────────────────────────────────
 * Accessible striped table with sticky header. Headers can include a
 * leading ✓/✗ icon by prefixing the cell with "yes:" or "no:". */

export function ComparisonTable({
  headers,
  rows,
  caption,
}: {
  headers: string[]
  rows: string[][]
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-[#FF53A9]/10">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-left font-bold text-white border-b border-white/10 ${i === 0 ? "text-left" : "text-center"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
            >
              {row.map((cell, ci) => {
                const isYes = cell.startsWith("yes:")
                const isNo = cell.startsWith("no:")
                const display = isYes || isNo ? cell.slice(4) : cell
                return (
                  <td
                    key={ci}
                    className={`px-4 py-3 text-white/80 border-b border-white/5 align-top ${ci === 0 ? "font-semibold text-white" : "text-center"}`}
                  >
                    {isYes && <span className="text-emerald-400 font-bold mr-1.5">✓</span>}
                    {isNo && <span className="text-red-400 font-bold mr-1.5">✗</span>}
                    {display}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── PullQuote ────────────────────────────────────────────────────
 * Styled blockquote for key statistics or important GEO definitions. */

export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode
  attribution?: string
}) {
  return (
    <blockquote className="relative my-8 rounded-2xl border-l-4 border-[#FF53A9] bg-gradient-to-r from-[#FF53A9]/10 to-transparent px-6 py-5 sm:px-8 sm:py-6">
      <Quote className="absolute top-4 right-4 h-6 w-6 text-[#FF53A9]/30" />
      <div className="text-lg sm:text-xl font-semibold text-white leading-relaxed pr-8">
        {children}
      </div>
      {attribution && (
        <footer className="mt-3 text-sm text-white/60">— {attribution}</footer>
      )}
    </blockquote>
  )
}

/* ─── StatCaseStudy (STAR) ─────────────────────────────────────────
 * Renders a single mini case study using the STAR method. */

export function StarCaseStudy({
  client,
  situation,
  task,
  action,
  result,
  quote,
}: {
  client: string
  situation: string
  task: string
  action: string
  result: string
  quote?: { text: string; author: string; title: string }
}) {
  const rows = [
    { label: "Situation", body: situation },
    { label: "Task", body: task },
    { label: "Action", body: action },
    { label: "Result", body: result },
  ]
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <header className="flex items-center justify-between mb-5">
        <h4 className="text-lg font-bold text-white">{client}</h4>
        <span className="rounded-full bg-[#FF53A9]/15 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#FF8AC4]">
          Case Study
        </span>
      </header>
      <dl className="space-y-4">
        {rows.map((r) => (
          <div key={r.label} className="grid sm:grid-cols-[110px_1fr] gap-2 sm:gap-4">
            <dt className="text-xs font-mono uppercase tracking-wider text-[#FF8AC4] pt-0.5">
              {r.label}
            </dt>
            <dd className="text-sm text-white/75 leading-relaxed">{r.body}</dd>
          </div>
        ))}
      </dl>
      {quote && (
        <PullQuote attribution={`${quote.author}, ${quote.title}`}>
          {quote.text}
        </PullQuote>
      )}
    </article>
  )
}

/* ─── UseCaseCard ────────────────────────────────────────────────── */

export function UseCaseCard({
  industry,
  problem,
  application,
  result,
}: {
  industry: string
  problem: string
  application: string
  result: string
}) {
  return (
    <article className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#FF53A9]/40 hover:bg-white/[0.04] transition">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-[#FF53A9]" />
        <h4 className="text-base font-bold text-white">{industry}</h4>
      </div>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1">Problem</dt>
          <dd className="text-white/70 leading-relaxed">{problem}</dd>
        </div>
        <div>
          <dt className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1">Application</dt>
          <dd className="text-white/70 leading-relaxed">{application}</dd>
        </div>
        <div>
          <dt className="text-xs font-mono uppercase tracking-wider text-[#FF8AC4] mb-1">Result</dt>
          <dd className="text-white font-medium leading-relaxed">{result}</dd>
        </div>
      </dl>
    </article>
  )
}

/* ─── MethodologyStep ────────────────────────────────────────────── */

export function MethodologyStep({
  index,
  phase,
  title,
  duration,
  deliverables,
  description,
  isLast,
}: {
  index: number
  phase: string
  title: string
  duration: string
  deliverables: string[]
  description: string
  isLast?: boolean
}) {
  return (
    <div className="relative grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6">
      {/* Timeline marker */}
      <div className="flex sm:flex-col items-center sm:items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF53A9] to-[#136DFF] text-sm font-black text-white shadow-[0_0_20px_rgba(255,83,169,0.3)]">
          {index}
        </div>
        {!isLast && (
          <div className="hidden sm:block w-px h-full bg-gradient-to-b from-[#FF53A9]/40 to-transparent ml-5" />
        )}
      </div>
      <div className="pb-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF8AC4]">
            {phase}
          </span>
          <span className="text-xs text-white/40">·</span>
          <span className="text-xs text-white/50">{duration}</span>
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-white/70 leading-relaxed mb-3">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {deliverables.map((d, i) => (
            <span
              key={i}
              className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-white/60"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── FeatureGrid (Tech Stack) ───────────────────────────────────── */

export function FeatureGrid({
  categories,
}: {
  categories: { name: string; items: { name: string; description: string }[] }[]
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
        >
          <h4 className="text-sm font-mono uppercase tracking-wider text-[#FF8AC4] mb-4">
            {cat.name}
          </h4>
          <ul className="space-y-3">
            {cat.items.map((item) => (
              <li key={item.name}>
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="text-xs text-white/55 leading-relaxed mt-0.5">
                  {item.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ─── PillList (Integrations / Compliance) ───────────────────────── */

export function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/75"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
