"use client";

/**
 * MagneticButton — cursor-following magnetic button with:
 *   • Magnetic hover (button translates toward cursor within `radius` px)
 *   • Ripple effect on click (originates at click position)
 *   • Animated gradient border (pink → purple → blue rotation)
 *   • Spring-back to origin on mouse leave
 *   • Respects prefers-reduced-motion (renders as plain button)
 *   • Touch-device fallback (no magnetic effect, still clickable)
 *
 * Usage:
 *   <MagneticButton href="/contact" strength={24} radius={100}>
 *     Book Free Consultation
 *   </MagneticButton>
 */

import { forwardRef, useRef, useState, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMagnetic, usePrefersReducedMotion } from "@/hooks/use-enhanced";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number;
  radius?: number;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "nx-magnetic-primary text-white border-transparent",
  secondary:
    "nx-magnetic-secondary text-foreground border-border",
  ghost:
    "bg-transparent text-foreground border-transparent hover:bg-foreground/5",
  outline:
    "bg-transparent text-foreground border-foreground/20 hover:border-foreground/40",
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  function MagneticButton(
    { children, href, onClick, variant = "primary", className, strength = 20, radius = 100, type = "button", disabled, ariaLabel },
    _fwdRef
  ) {
    const reduced = usePrefersReducedMotion();
    const btnRef = useRef<HTMLButtonElement>(null);
    const { ref: magRef, transform } = useMagnetic<HTMLButtonElement>({ strength, radius });
    const [ripples, setRipples] = useState<Ripple[]>([]);

    // Spring-smoothed transform for buttery motion
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

    // Sync magnetic transform → motion values
    const parseTransform = (t: string) => {
      const m = t.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/);
      if (m) {
        x.set(parseFloat(m[1]));
        y.set(parseFloat(m[2]));
      }
    };
    // Run on each render — cheap, and keeps motion value in sync
    if (!reduced) parseTransform(transform);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      // Spawn ripple
      const r = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((rp) => rp.id !== id));
      }, 700);
      onClick?.();
    };

    const sharedClass = cn(
      "nx-magnetic-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF53A9] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:opacity-50 disabled:pointer-events-none",
      VARIANT_CLASSES[variant],
      className
    );

    // Reduced-motion: skip magnetic + ripple, plain accessible button
    const inner = (
      <>
        {/* Animated gradient border layer (only for primary / outline) */}
        {(variant === "primary" || variant === "outline") && (
          <span
            aria-hidden
            className="nx-magnetic-border pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        {/* Content */}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
        {/* Ripples */}
        {ripples.map((rp) => (
          <motion.span
            key={rp.id}
            className="nx-magnetic-ripple pointer-events-none absolute rounded-full bg-white/40"
            style={{ left: rp.x, top: rp.y }}
            initial={{ width: 0, height: 0, x: "-50%", y: "-50%", opacity: 0.6 }}
            animate={{ width: 320, height: 320, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </>
    );

    if (reduced) {
      if (href) {
        return (
          <Link href={href} className={sharedClass} aria-label={ariaLabel}>
            {inner}
          </Link>
        );
      }
      return (
        <button
          ref={btnRef}
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={sharedClass}
        >
          {inner}
        </button>
      );
    }

    const motionStyle = { x: sx, y: sy };

    if (href) {
      return (
        <motion.div style={motionStyle} className="inline-block">
          <Link
            href={href}
            className={sharedClass}
            aria-label={ariaLabel}
            ref={magRef as unknown as React.Ref<HTMLAnchorElement>}
          >
            {inner}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={(node) => {
          btnRef.current = node;
          (magRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        type={type}
        style={motionStyle}
        onClick={handleClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={sharedClass}
      >
        {inner}
      </motion.button>
    );
  }
);

export default MagneticButton;
