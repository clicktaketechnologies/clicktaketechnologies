"use client";

/**
 * SkipToContent — accessibility skip link.
 *
 * Visually hidden until focused (keyboard Tab). Clicking it moves focus
 * to the main content landmark so screen-reader & keyboard users can
 * bypass the 40+ nav links.
 *
 * Mount ONCE at the app root, before the navbar.
 */

import { useEffect, useState } from "react";

export function SkipToContent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main =
      document.getElementById("main-content") ||
      document.querySelector("main") ||
      document.querySelector('[role="main"]');
    if (main) {
      // Make it focusable temporarily
      main.setAttribute("tabindex", "-1");
      (main as HTMLElement).focus();
      // Remove tabindex after blur to avoid stray focus ring on click
      main.addEventListener("blur", () => main.removeAttribute("tabindex"), {
        once: true,
      });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only z-[300] rounded-lg bg-[#FF53A9] px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}

export default SkipToContent;
