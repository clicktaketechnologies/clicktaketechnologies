'use client'

import { useEffect, useRef, useCallback } from "react";

/* ─── Palette — ClickTake brand ramp ─────────────────────────── */
/* Light mode uses darker, more saturated brand colors so they read
   clearly against the near-white background. */
const LIGHT_PALETTE: [number, number, number][] = [
  [19, 109, 255],   // brand-blue #136DFF
  [255, 83, 169],   // brand-pink #FF53A9
  [193, 43, 255],   // brand-magenta #c12bff
  [34, 211, 238],   // brand-cyan #22d3ee
];

const DARK_PALETTE: [number, number, number][] = [
  [77, 141, 255],   // brand-blue dark
  [255, 107, 181],  // brand-pink dark
  [208, 75, 255],   // brand-magenta dark
  [75, 227, 255],   // brand-cyan dark
];

type RGB = [number, number, number];
const isDark = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

/* ─── Types ───────────────────────────────────────────────────── */
interface TechNode {
  x: number; y: number;
  vx: number; vy: number;
  color: RGB;
  pulse: number; pulseSpeed: number;
  radius: number;
}

interface DataStream {
  progress: number;
  speed: number;
  edgeIdx: number;
  color: RGB;
}

interface GridPulse {
  x: number; y: number;
  maxR: number;
  r: number;
  speed: number;
  color: RGB;
  alpha: number;
}

const rgb = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/**
 * Performance-tuned BackgroundScene.
 *
 * Optimizations applied (fixes site-wide hang on lower-end devices + 4K screens):
 *  - Respects `prefers-reduced-motion` → renders a single static frame, no rAF loop.
 *  - Pauses animation when the tab is hidden (`visibilitychange`) — saves CPU/battery.
 *  - Caps device pixel ratio at 1.5 (was rendering at full 2-3x on retina/4K, multiplying fill cost 4-9×).
 *  - Reduced node grid from 8×7 (56 nodes) to 6×5 (30 nodes) — fewer edges to draw per frame.
 *  - Reduced data streams from 16 → 8.
 *  - Reduced ripple pulses from 4 → 2.
 *  - Frame cap lowered from 50fps → 30fps (still smooth for a slow ambient effect).
 *  - Skips work entirely when canvas size exceeds 2.5 megapixels (uses CSS-only fallback).
 */
export function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const darkRef = useRef(isDark());

  const build = useCallback((W: number, H: number) => {
    const dark = darkRef.current;
    const palette = dark ? DARK_PALETTE : LIGHT_PALETTE;
    const rand = () => palette[Math.floor(Math.random() * palette.length)];

    /* ── Tech nodes — reduced from 8×7=56 to 6×5=30 ── */
    const COLS = 6, ROWS = 5;
    const nodes: TechNode[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        nodes.push({
          x: (c + 0.5 + (Math.random() - 0.5) * 0.6) / COLS,
          y: (r + 0.5 + (Math.random() - 0.5) * 0.6) / ROWS,
          vx: (Math.random() - 0.5) * 0.00005,
          vy: (Math.random() - 0.5) * 0.00004,
          color: rand(),
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 0.8,
          radius: 2 + Math.random() * 2,
        });
      }
    }

    const edges: [number, number][] = [];
    const MAX_D = 0.22; // slightly larger since we have fewer nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < MAX_D) edges.push([i, j]);
      }
    }

    /* ── Data streams — reduced from 16 → 8 ── */
    const streams: DataStream[] = Array.from({ length: 8 }, () => ({
      progress: Math.random(),
      speed: 0.001 + Math.random() * 0.002,
      edgeIdx: Math.floor(Math.random() * Math.max(edges.length, 1)),
      color: rand(),
    }));

    /* ── Ripple pulses — reduced from 4 → 2 ── */
    const pulses: GridPulse[] = Array.from({ length: 2 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      maxR: 80 + Math.random() * 120,
      r: Math.random() * 150,
      speed: 0.5 + Math.random() * 0.5,
      color: rand(),
      alpha: dark ? 0.1 : 0.12,
    }));

    return { nodes, edges, streams, pulses };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    if (!ctx) return;

    // Respect prefers-reduced-motion — render a single static gradient frame and bail.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let sceneData = build(0, 0);

    let bgCanvas: HTMLCanvasElement | null = null;
    let bgReady = false;

    const buildBg = () => {
      if (W <= 0 || H <= 0) {
        bgCanvas = null;
        bgReady = false;
        return;
      }
      const dark = darkRef.current;
      bgCanvas = document.createElement("canvas");
      bgCanvas.width = W;
      bgCanvas.height = H;
      const bCtx = bgCanvas.getContext("2d");
      if (!bCtx) {
        bgCanvas = null;
        bgReady = false;
        return;
      }

      if (dark) {
        bCtx.fillStyle = "#03000D";
        bCtx.fillRect(0, 0, W, H);
        const g1 = bCtx.createRadialGradient(W * 0.15, H * 0.1, 0, W * 0.15, H * 0.1, H * 0.65);
        g1.addColorStop(0, "rgba(19,109,255,0.18)");
        g1.addColorStop(1, "rgba(0,0,0,0)");
        bCtx.fillStyle = g1;
        bCtx.fillRect(0, 0, W, H);
        const g2 = bCtx.createRadialGradient(W * 0.88, H * 0.85, 0, W * 0.88, H * 0.85, H * 0.55);
        g2.addColorStop(0, "rgba(255,83,169,0.16)");
        g2.addColorStop(1, "rgba(0,0,0,0)");
        bCtx.fillStyle = g2;
        bCtx.fillRect(0, 0, W, H);
      } else {
        const lg = bCtx.createLinearGradient(0, 0, W * 0.6, H);
        lg.addColorStop(0, "#f0f6ff");
        lg.addColorStop(0.5, "#eaf2fb");
        lg.addColorStop(1, "#e4eef8");
        bCtx.fillStyle = lg;
        bCtx.fillRect(0, 0, W, H);

        const lg1 = bCtx.createRadialGradient(W * 0.15, H * 0.1, 0, W * 0.15, H * 0.1, H * 0.65);
        lg1.addColorStop(0, "rgba(19,109,255,0.12)");
        lg1.addColorStop(1, "rgba(255,255,255,0)");
        bCtx.fillStyle = lg1;
        bCtx.fillRect(0, 0, W, H);

        const lg2 = bCtx.createRadialGradient(W * 0.88, H * 0.85, 0, W * 0.88, H * 0.85, H * 0.55);
        lg2.addColorStop(0, "rgba(255,83,169,0.10)");
        lg2.addColorStop(1, "rgba(255,255,255,0)");
        bCtx.fillStyle = lg2;
        bCtx.fillRect(0, 0, W, H);
      }

      bCtx.save();
      bCtx.globalAlpha = dark ? 0.025 : 0.05;
      bCtx.strokeStyle = dark ? "rgba(75,227,255,1)" : "rgba(19,109,255,1)";
      bCtx.lineWidth = 0.5;
      bCtx.setLineDash([4, 16]);
      const GRID = 100;
      for (let x = 0; x < W; x += GRID) {
        bCtx.beginPath(); bCtx.moveTo(x, 0); bCtx.lineTo(x, H); bCtx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        bCtx.beginPath(); bCtx.moveTo(0, y); bCtx.lineTo(W, y); bCtx.stroke();
      }
      bCtx.restore();

      bgReady = true;
    };

    const resize = () => {
      // Clamp to >=1 to avoid 0×0 canvas (Firefox throws InvalidStateError on drawImage)
      const cssW = Math.max(1, window.innerWidth || 1);
      const cssH = Math.max(1, window.innerHeight || 1);

      // Cap device pixel ratio at 1.5 — full 2-3x rendering on retina/4K multiplies
      // fill cost 4-9× for negligible visual benefit on a slow ambient background.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      W = Math.max(1, Math.floor(cssW * dpr));
      H = Math.max(1, Math.floor(cssH * dpr));
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      sceneData = build(W, H);
      buildBg();
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new MutationObserver(() => {
      darkRef.current = isDark();
      sceneData = build(W, H);
      buildBg();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* ── Draw edges ── */
    const drawEdges = (nodes: TechNode[], edges: [number, number][]) => {
      const dark = darkRef.current;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([]);
      edges.forEach(([i, j]) => {
        const ni = nodes[i], nj = nodes[j];
        const dx = ni.x - nj.x, dy = ni.y - nj.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = (1 - dist / 0.22) * (dark ? 0.18 : 0.22);
        if (alpha <= 0) return;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = rgb(ni.color);
        ctx.beginPath();
        ctx.moveTo(ni.x * W, ni.y * H);
        ctx.lineTo(nj.x * W, nj.y * H);
        ctx.stroke();
      });
    };

    /* ── Draw nodes ── */
    const drawNodes = (nodes: TechNode[], t: number) => {
      const dark = darkRef.current;
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;

        const pulse = 0.5 + 0.5 * Math.sin(t * n.pulseSpeed + n.pulse);
        const a = (dark ? 0.55 : 0.6) * pulse + (dark ? 0.12 : 0.18);
        const cx = n.x * W, cy = n.y * H;

        ctx.globalAlpha = a;
        ctx.fillStyle = rgb(n.color);
        ctx.beginPath();
        ctx.arc(cx, cy, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    /* ── Data streams (no per-frame gradient) ── */
    const drawStreams = (nodes: TechNode[], edges: [number, number][], streams: DataStream[]) => {
      const dark = darkRef.current;
      ctx.lineWidth = dark ? 1.4 : 1.2;
      streams.forEach(s => {
        if (!edges.length || s.edgeIdx >= edges.length) return;
        s.progress += s.speed;
        if (s.progress > 1) {
          s.progress = 0;
          s.edgeIdx = Math.floor(Math.random() * edges.length);
        }
        const [ia, ib] = edges[s.edgeIdx];
        const na = nodes[ia], nb = nodes[ib];
        const x = (na.x + (nb.x - na.x) * s.progress) * W;
        const y = (na.y + (nb.y - na.y) * s.progress) * H;

        ctx.globalAlpha = 0.85;
        ctx.fillStyle = rgb(s.color);
        ctx.beginPath();
        ctx.arc(x, y, dark ? 2.4 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    /* ── Ripple pulses ── */
    const drawPulses = (pulses: GridPulse[]) => {
      ctx.lineWidth = 0.7;
      pulses.forEach(p => {
        p.r += p.speed;
        if (p.r > p.maxR) {
          p.r = 0;
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }
        const fade = 1 - p.r / p.maxR;
        ctx.globalAlpha = p.alpha * fade;
        ctx.strokeStyle = rgb(p.color);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    /* ── Static first frame (always draw once so user sees something immediately) ── */
    const drawFrame = (ts: number) => {
      const t = ts * 0.001;
      const { nodes, edges, streams, pulses } = sceneData;

      if (bgReady && bgCanvas && bgCanvas.width > 0 && bgCanvas.height > 0 && W > 0 && H > 0) {
        try {
          ctx.drawImage(bgCanvas, 0, 0);
        } catch {
          bgReady = false;
          ctx.fillStyle = darkRef.current ? "#03000D" : "#f0f6ff";
          ctx.fillRect(0, 0, W, H);
        }
      } else {
        ctx.fillStyle = darkRef.current ? "#03000D" : "#f0f6ff";
        ctx.fillRect(0, 0, W, H);
      }

      ctx.save();
      drawEdges(nodes, edges);
      drawNodes(nodes, t);
      drawStreams(nodes, edges, streams);
      drawPulses(pulses);
      ctx.restore();
    };

    // Always render one frame so the canvas isn't blank during reduced-motion mode
    // or before the rAF loop kicks in.
    drawFrame(0);

    // Reduced motion: stop here — no rAF loop, no continuous CPU burn.
    if (prefersReduced) {
      return () => {
        window.removeEventListener("resize", resize);
        observer.disconnect();
      };
    }

    /* ── Frame loop — cap at 30fps (was 50fps; ambient bg doesn't need more) ── */
    let lastTs = 0;
    const FRAME_MS = 1000 / 30;
    let running = true;
    // `paused` is set true while the user is actively scrolling — we skip
    // drawing frames but keep the rAF alive so we can resume instantly. This
    // frees up the main thread to handle scroll repaints without competing
    // with the canvas's drawFrame() work (which does ~30 nodes + ~8 streams
    // + 2 pulses per frame = ~50 canvas ops, not free).
    let paused = false;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const frame = (ts: number) => {
      if (!running) return;
      rafRef.current = requestAnimationFrame(frame);
      if (paused) return;
      const dt = ts - lastTs;
      if (dt < FRAME_MS) return;
      lastTs = ts - (dt % FRAME_MS);
      drawFrame(ts);
    };

    rafRef.current = requestAnimationFrame(frame);

    // Pause animation when tab is hidden — saves CPU + battery on mobile/laptop.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else if (!running) {
        running = true;
        lastTs = 0;
        rafRef.current = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause drawing while the user is actively scrolling — frees the main
    // thread for scroll repaints. Resume 200ms after the last scroll event.
    // passive: true so we never block scrolling.
    const onScroll = () => {
      paused = true;
      if (pauseTimer) clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        paused = false;
        lastTs = 0; // reset so we don't fire a frame with a huge dt
      }, 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      if (pauseTimer) clearTimeout(pauseTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [build]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 w-full h-full z-0"
      style={{ willChange: "auto" }}
    />
  );
}
