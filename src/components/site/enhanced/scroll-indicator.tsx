"use client";

/**
 * ScrollIndicator — bounce-animated scroll cue for the hero.
 *
 * Renders a small mouse-outline with an animated dot that bounces
 * up and down. Clicking scrolls to the next section.
 *
 * Respects prefers-reduced-motion (renders static, no bounce).
 */

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-enhanced";

interface ScrollIndicatorProps {
  /** Selector or id to scroll to on click. Defaults to next section. */
  targetId?: string;
  className?: string;
  label?: string;
}

export function ScrollIndicator({
  targetId,
  className,
  label = "Scroll",
}: ScrollIndicatorProps) {
  const reduced = usePrefersReducedMotion();

  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Scroll down by ~90% of viewport height
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className={`group flex flex-col items-center gap-2 ${className ?? ""}`}
      aria-label="Scroll to next section"
    >
      <span className="text-[10px] font-mono uppercase tracking-[3px] text-white/50 group-hover:text-white/80 transition-colors">
        {label}
      </span>
      {/* Mouse outline */}
      <div
        className="relative h-9 w-5 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors"
      >
        {/* Bouncing dot */}
        {!reduced && (
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF53A9]"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {reduced && (
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF53A9]" />
        )}
      </div>
      {/* Chevrons */}
      {!reduced && (
        <div className="flex flex-col items-center -mt-1">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="block h-3 w-3 rotate-45 border-b-2 border-r-2 border-white/30"
              animate={{ opacity: [0, 1, 0], y: [0, 4, 8] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}

export default ScrollIndicator;
