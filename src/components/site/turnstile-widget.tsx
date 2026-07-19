'use client'

import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile widget — ported from original TurnstileWidget.tsx.
 * Renders the challenge and exposes the token via onChange.
 */
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: any) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

interface Props {
  onChange: (token: string) => void;
  resetTrigger?: number;
}

export function TurnstileWidget({ onChange, resetTrigger }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load Turnstile script once
  useEffect(() => {
    if (document.getElementById("turnstile-script")) {
      setLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.id = "turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, []);

  // Render widget when script is ready
  useEffect(() => {
    if (!loaded || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA", // Cloudflare test key (always passes)
      theme: "auto",
      callback: (token: string) => onChange(token),
      "error-callback": () => onChange(""),
      "expired-callback": () => onChange(""),
    });
  }, [loaded, onChange]);

  // Reset when resetTrigger changes
  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onChange("");
    }
  }, [resetTrigger, onChange]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
