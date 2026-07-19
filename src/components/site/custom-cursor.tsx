'use client'

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor (ClickTake Technologies) — refined, subtle, "smart".
 *
 * Design philosophy:
 *  - Minimal visual footprint at rest (small dot + soft ring)
 *  - Grows ONLY over interactive elements (a, button, input, [data-cursor])
 *  - Label-style reactions via data-cursor attribute (e.g. data-cursor="View")
 *  - Removes the long comet trail — instead a single, short trailing halo
 *  - Disables itself on touch / coarse-pointer devices
 *  - Hides until the first mousemove (so it never "appears" at 0,0)
 *  - Pauses the rotation animation when not hovering to save CPU
 *
 * The cursor has 4 contextual states:
 *   - default  →  small dot + faint ring
 *   - hover    →  ring expands, dot fills, gentle scale pulse
 *   - click    →  contracts briefly for tactile feedback
 *   - label    →  shows a tiny label badge (e.g. "Open", "View") from data-cursor
 */
type CursorState = "default" | "hover" | "click";

export function CustomCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Tip springs instantly; halo trails slightly behind for a subtle parallax.
  const tipX = useSpring(x, { damping: 40, stiffness: 900, mass: 0.15 });
  const tipY = useSpring(y, { damping: 40, stiffness: 900, mass: 0.15 });
  const haloX = useSpring(x, { damping: 28, stiffness: 220, mass: 0.5 });
  const haloY = useSpring(y, { damping: 28, stiffness: 220, mass: 0.5 });

  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string>("");
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Track whether the cursor is currently over an interactive element,
  // so we can update label/state reactively without re-running effects.
  const rafRef = useRef<number>(0);
  const lastTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => {
      setEnabled(mq.matches);
      if (mq.matches) {
        document.documentElement.setAttribute("data-cursor", "active");
      } else {
        document.documentElement.removeAttribute("data-cursor");
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const inspectTarget = (t: HTMLElement) => {
      // Walk up the DOM looking for the closest interactive ancestor or
      // element with a data-cursor hint.
      const interactive = t.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-cursor]"
      ) as HTMLElement | null;

      if (interactive) {
        const hint = interactive.getAttribute("data-cursor");
        if (hint && hint !== "hover" && hint !== "active") {
          setLabel(hint);
        } else {
          setLabel("");
        }
        setState("hover");
      } else {
        setLabel("");
        setState("default");
      }
    };

    const onMove = (e: MouseEvent) => {
      // Throttle DOM inspection to ~30fps using rAF — `mousemove` can fire
      // hundreds of times per second, but `closest()` is not cheap.
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const t = e.target as HTMLElement;
        if (t !== lastTargetRef.current) {
          lastTargetRef.current = t;
          inspectTarget(t);
        }
      });

      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) {
        setHidden(false);
        setVisible(true);
      }
    };

    const onDown = () => setState("click");
    const onUp = () => {
      // After a click, revert to hover if still over an interactive element,
      // otherwise default.
      const t = lastTargetRef.current;
      if (t && t.closest("a, button, input, textarea, select, label, [role='button'], [data-cursor]")) {
        setState("hover");
      } else {
        setState("default");
      }
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, x, y, hidden]);

  if (!enabled) return null;

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <>
      {/* Soft trailing halo — single layer, blurred, brand-tinted */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9990]"
        style={{ x: haloX, y: haloY }}
        animate={{
          opacity: visible ? (isHover ? 0.55 : 0.35) : 0,
          scale: isClick ? 0.6 : isHover ? 1.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-blue) 35%, transparent) 0%, color-mix(in oklab, var(--brand-pink) 18%, transparent) 45%, transparent 75%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Outer ring — expands on hover, contracts on click */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: tipX, y: tipY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isClick ? 0.7 : isHover ? 1.4 : 1,
          rotate: isHover ? 0 : 0,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 350 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: isHover ? 44 : 28,
            height: isHover ? 44 : 28,
            borderColor: isHover
              ? "color-mix(in oklab, var(--brand-pink) 70%, transparent)"
              : "color-mix(in oklab, var(--brand-blue) 50%, transparent)",
            borderWidth: 1.5,
            transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
          }}
        />
      </motion.div>

      {/* Center dot — solid brand color, scales on hover */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: tipX, y: tipY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isClick ? 1.4 : isHover ? 0.4 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 500 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 6,
            height: 6,
            background: isHover
              ? "var(--brand-pink)"
              : "var(--brand-blue)",
            boxShadow: "0 0 8px color-mix(in oklab, var(--brand-blue) 60%, transparent)",
            transition: "background 0.2s ease",
          }}
        />
      </motion.div>

      {/* Label badge — appears when [data-cursor="label"] is set on hover target */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x: tipX, y: tipY }}
        animate={{
          opacity: label ? 1 : 0,
          scale: label ? 1 : 0.6,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="absolute left-6 top-4 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background shadow-lg"
        >
          {label}
        </div>
      </motion.div>
    </>
  );
}
