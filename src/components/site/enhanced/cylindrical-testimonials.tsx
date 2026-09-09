"use client";

/**
 * CylindricalTestimonials — 3D cylindrical rotating carousel.
 *
 * Features:
 *   • Cards arranged on a virtual cylinder (rotateY around Y-axis).
 *   • Auto-rotation (configurable speed, default 12s per revolution).
 *   • Pauses on hover.
 *   • Navigation dots with active-state animation.
 *   • Active card is highlighted (scale, opacity, glow).
 *   • Smooth cubic-bezier transition between manual selections.
 *   • Avatar with animated ring (conic gradient rotation).
 *   • Star rating with staggered appearance.
 *   • Respects prefers-reduced-motion (renders as static grid).
 *   • Touch-friendly: swipe left/right to navigate (basic).
 *
 * Layout:
 *   • Cylinder computed via: angle = (i / n) * 360deg
 *   • Card transform: rotateY(angle) translateZ(radius)
 *   • Radius auto-scales with card count: radius = (cardW / 2) / tan(π / n)
 *
 * Props:
 *   - items     Testimonial array.
 *   - autoMs    Auto-rotation period in ms. 0 = no auto-rotation.
 */

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-enhanced";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location?: string;
  avatar: string; // initials
  color: string;
  rating: number;
}

interface CylindricalTestimonialsProps {
  items: Testimonial[];
  autoMs?: number;
  className?: string;
}

const CARD_WIDTH = 320; // px

export function CylindricalTestimonials({
  items,
  autoMs = 12000,
  className,
}: CylindricalTestimonialsProps) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const n = items.length;
  // Cylinder radius — cards face outward, spaced evenly
  const radius = Math.max(
    220,
    (CARD_WIDTH / 2) / Math.tan(Math.PI / Math.max(n, 4))
  );

  // ── Auto-rotation ──────────────────────────────────────────────
  useEffect(() => {
    if (reduced || autoMs === 0 || paused || n <= 1) return;
    const interval = autoMs / n; // time per card
    const id = setInterval(() => {
      setActive((i) => (i + 1) % n);
    }, interval);
    return () => clearInterval(id);
  }, [reduced, autoMs, paused, n]);

  // ── Angle follows active card ──────────────────────────────────
  useEffect(() => {
    if (reduced) return;
    setAngle(-(360 / n) * active);
  }, [active, n, reduced]);

  // ── Touch swipe ────────────────────────────────────────────────
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx > 0) setActive((i) => (i - 1 + n) % n);
      else setActive((i) => (i + 1) % n);
    }
    touchStartX.current = null;
  };

  // ── Reduced-motion: render as flat grid ────────────────────────
  if (reduced) {
    return (
      <div className={className}>
        <div className="mx-auto max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t) => (
            <FlatCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    );
  }

  const active_item = items[active];

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Cylinder viewport — perspective + overflow hidden so cards off-stage don't bleed */}
      <div
        ref={containerRef}
        className="relative mx-auto h-[420px] w-full max-w-3xl"
        style={{ perspective: "1400px" }}
      >
        {/* Cylinder ring */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            width: CARD_WIDTH,
            height: 360,
            marginLeft: -CARD_WIDTH / 2,
            marginTop: -180,
          }}
          animate={{ rotateY: angle }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map((t, i) => {
            const cardAngle = (360 / n) * i;
            const isActive = i === active;
            return (
              <div
                key={t.name}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <TestimonialCard t={t} isActive={isActive} />
              </div>
            );
          })}
        </motion.div>

        {/* Floor reflection — subtle gradient under the cylinder */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[80%] rounded-[50%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${active_item.color}22 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Active card spotlight — quote + author below the cylinder */}
      <div className="mt-6 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <AvatarWithRing item={active_item} />
            <div className="text-left">
              <div className="font-bold text-white">{active_item.name}</div>
              <div className="text-xs text-white/60">
                {active_item.role}{active_item.location ? ` · ${active_item.location}` : ""}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className="group relative h-2.5"
          >
            <span
              className={`block h-full rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#FF53A9]" : "w-2.5 bg-white/20 group-hover:bg-white/40"
              }`}
            />
            {i === active && (
              <motion.span
                layoutId="dot-active-glow"
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 12px #FF53A9" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────── */

function TestimonialCard({ t, isActive }: { t: Testimonial; isActive: boolean }) {
  return (
    <div
      className="nx-cyl-card relative h-full w-full rounded-2xl border p-6 transition-all duration-500"
      style={{
        background: isActive
          ? "linear-gradient(145deg, rgba(22,16,42,0.98), rgba(12,8,24,0.98))"
          : "linear-gradient(145deg, rgba(22,16,42,0.7), rgba(12,8,24,0.7))",
        borderColor: isActive ? `${t.color}55` : "rgba(255,255,255,0.08)",
        boxShadow: isActive
          ? `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${t.color}22, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 20px 50px rgba(0,0,0,0.4)",
        opacity: isActive ? 1 : 0.55,
        transform: isActive ? "scale(1.04)" : "scale(0.96)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Quote icon */}
      <Quote className="h-7 w-7 opacity-30 mb-3" style={{ color: t.color }} />

      {/* Stars with staggered appearance */}
      <div className="mb-3 flex items-center gap-0.5">
        {Array.from({ length: t.rating }).map((_, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={isActive ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0.7, scale: 0.9, rotate: 0 }}
            transition={{ delay: idx * 0.05, type: "spring", stiffness: 300 }}
          >
            <Star className="h-3.5 w-3.5 fill-[#FF53A9] text-[#FF53A9]" />
          </motion.span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-white/85 line-clamp-5">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
        <AvatarWithRing item={t} small />
        <div className="min-w-0">
          <div className="text-sm font-bold text-white truncate">{t.name}</div>
          <div className="text-[11px] text-white/50 truncate">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Avatar with animated conic-gradient ring ──────────────── */

function AvatarWithRing({ item, small = false }: { item: Testimonial; small?: boolean }) {
  const size = small ? 36 : 48;
  return (
    <div
      className="relative grid place-items-center shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Rotating conic-gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${item.color}, transparent, ${item.color})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner avatar */}
      <div
        className="relative grid place-items-center rounded-full font-black text-white"
        style={{
          width: size - 4,
          height: size - 4,
          background: item.color,
          fontSize: small ? 11 : 14,
        }}
      >
        {item.avatar}
      </div>
    </div>
  );
}

/* ── Flat card (reduced-motion fallback) ────────────────────── */

function FlatCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#100820]/80 p-6 backdrop-blur"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
    >
      <Quote className="h-7 w-7 opacity-30 mb-3" style={{ color: t.color }} />
      <div className="mb-3 flex items-center gap-0.5">
        {Array.from({ length: t.rating }).map((_, idx) => (
          <Star key={idx} className="h-3.5 w-3.5 fill-[#FF53A9] text-[#FF53A9]" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-white/85 mb-5">&ldquo;{t.quote}&rdquo;</p>
      <div className="pt-4 border-t border-white/10 flex items-center gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-full font-black text-white"
          style={{ background: t.color }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="text-sm font-bold text-white">{t.name}</div>
          <div className="text-xs text-white/50">
            {t.role}{t.location ? ` · ${t.location}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CylindricalTestimonials;
