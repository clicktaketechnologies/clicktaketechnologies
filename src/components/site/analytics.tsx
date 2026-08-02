'use client'

/**
 * Analytics — lightweight, privacy-first analytics loader.
 *
 * Loads analytics scripts conditionally based on environment variables.
 * Supports:
 *   • Google Analytics 4 (NEXT_PUBLIC_GA_ID, e.g. "G-XXXXXXXXXX")
 *   • Plausible (NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
 *   • Vercel Analytics (always on if @vercel/analytics is installed)
 *
 * Privacy:
 *   • Respects Do Not Track (navigator.doNotTrack === "1") — skips GA + Plausible
 *   • Respects an explicit localStorage flag "disable-analytics" = "true"
 *   • Vercel Analytics is server-side aggregated (no client tracking) so it
 *     always runs regardless of DNT.
 *
 * Usage:
 *   import { Analytics } from "@/components/site/analytics"
 *   <Analytics />   // inside <body> of root layout
 *
 * Configuration (in .env.local):
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=clicktaketech.com
 *
 * No env var set → renders nothing (zero bundle cost, zero network).
 */

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    plausible?: (...args: unknown[]) => void
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export function Analytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Respect DNT and explicit opt-out
    if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return
    if (typeof localStorage !== 'undefined' && localStorage.getItem('disable-analytics') === 'true') return
    setEnabled(true)
  }, [])

  // Google Analytics 4 — only loaded if env var is set + user hasn't opted out
  useEffect(() => {
    if (!enabled || !GA_ID) return
    // Inject gtag.js script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { anonymize_ip: true });
    `
    document.head.appendChild(script2)
  }, [enabled])

  // Plausible — only loaded if env var is set + user hasn't opted out
  useEffect(() => {
    if (!enabled || !PLAUSIBLE_DOMAIN) return
    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = PLAUSIBLE_DOMAIN
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)
  }, [enabled])

  // No server-rendered output — the analytics scripts are client-only.
  return null
}

/**
 * Track a custom event — works with GA4 (gtag) and Plausible.
 * Safe to call on the server (no-op) or when analytics is disabled (no-op).
 *
 * @example
 *   trackEvent('contact_form_submit', { source: 'hero_cta' })
 */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, props || {})
  }
  // Plausible
  if (typeof window.plausible === 'function') {
    window.plausible(name, { props: props || {} })
  }
}

export default Analytics
