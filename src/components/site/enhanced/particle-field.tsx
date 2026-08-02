"use client";

/**
 * ParticleField — performant canvas-based particle background.
 *
 * Designed for the CTA section. Features:
 *   • N particles (default 60) drifting with subtle parallax.
 *   • Connection lines between nearby particles (neural-net feel).
 *   • Optional cursor attraction (off by default for CTA — too distracting).
 *   • Respects prefers-reduced-motion (renders static dots).
 *   • Pauses when offscreen (IntersectionObserver).
 *   • DPR-aware for crisp rendering.
 *
 * Performance:
 *   • O(n²) edge check — capped at 80 particles for 60fps on mid hardware.
 *   • Particles wrap around edges (no respawn cost).
 */

import { useEffect, useRef, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-enhanced";

interface ParticleFieldProps {
  className?: string;
  style?: CSSProperties;
  count?: number;
  linkRadius?: number;
  color?: string; // rgb triplet string, e.g. "255,255,255"
  speed?: number;
  size?: number;
  attractCursor?: boolean;
}

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function ParticleField({
  className,
  style,
  count = 60,
  linkRadius = 110,
  color = "255, 255, 255",
  speed = 0.3,
  size = 1.6,
  attractCursor = false,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: P[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (): P => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: Math.random() * size + 0.6,
    });

    const init = () => {
      particles.length = 0;
      const n = Math.min(count, 80);
      for (let i = 0; i < n; i++) particles.push(spawn());
    };

    const tick = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);

      // Update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (attractCursor) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 150 && d > 0) {
            const pull = (1 - d / 150) * 0.03;
            p.vx += (dx / d) * pull;
            p.vy += (dy / d) * pull;
          }
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        // Wrap
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;
      }

      // Edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkRadius) {
            const alpha = (1 - d / linkRadius) * 0.18;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of particles) {
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.fillStyle = `rgba(${color}, 0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // IntersectionObserver — pause when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) {
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "50px" }
    );
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onResize = () => {
      resize();
      init();
      if (reduced) drawStatic();
    };

    resize();
    init();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", onResize);
    if (attractCursor) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [count, linkRadius, color, speed, size, attractCursor, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

export default ParticleField;
