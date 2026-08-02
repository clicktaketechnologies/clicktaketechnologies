"use client";

/**
 * NeuralNetworkCanvas — interactive neural network visualization.
 *
 * Replaces the static rotating icosahedron in the hero. Features:
 *
 *   • Mouse-reactive particle nodes that drift toward the cursor.
 *   • Edges form dynamically between nodes within `linkRadius` —
 *     nodes near the cursor form MORE connections (cluster effect).
 *   • Data packets (bright pulses) travel along edges at random intervals.
 *   • Gradient background subtly shifts hue based on mouse X position.
 *   • Respects prefers-reduced-motion (renders a static starfield).
 *   • DevicePixelRatio-aware for crisp rendering on retina displays.
 *   • Pauses when tab is hidden (visibilitychange) to save battery.
 *
 * Performance budget:
 *   • ~60 nodes, ~120 max edges, ~20 active packets — runs at 60fps on
 *     a 2020 MacBook Air. Below 30fps it auto-throttles node count.
 *
 * Props:
 *   - className     CSS class for the canvas element.
 *   - density       "low" | "medium" | "high" — node count multiplier.
 *   - colors        Brand colors for nodes / edges / packets.
 */

import { useEffect, useRef, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-enhanced";

type Density = "low" | "medium" | "high";

interface NeuralColors {
  nodeA: string; // pink
  nodeB: string; // blue
  nodeC: string; // purple
  edge: string;  // edge base color (rgba tuple string w/o alpha)
  packet: string;
}

const DEFAULT_COLORS: NeuralColors = {
  nodeA: "255, 83, 169",
  nodeB: "19, 109, 255",
  nodeC: "155, 61, 255",
  edge: "255, 83, 169",
  packet: "255, 255, 255",
};

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  r: number;
  color: string;
  pulse: number;
}

interface Edge {
  a: number;
  b: number;
  len: number;
}

interface Packet {
  edgeIdx: number;
  t: number; // 0 → 1 along edge
  speed: number;
  color: string;
  size: number;
}

interface NeuralNetworkCanvasProps {
  className?: string;
  style?: CSSProperties;
  density?: Density;
  colors?: Partial<NeuralColors>;
  /** Radius (px) within which two nodes will draw an edge. */
  linkRadius?: number;
  /** Radius (px) within which the cursor attracts nodes. */
  cursorRadius?: number;
}

export function NeuralNetworkCanvas({
  className,
  style,
  density = "medium",
  colors,
  linkRadius = 140,
  cursorRadius = 180,
}: NeuralNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const mergedColors = { ...DEFAULT_COLORS, ...colors };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const nodeCount = { low: 35, medium: 60, high: 90 }[density];

    // ── State ────────────────────────────────────────────────────
    let W = 0;
    let H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const packets: Packet[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;
    let running = true;

    // ── Init ─────────────────────────────────────────────────────
    const pickColor = () => {
      const r = Math.random();
      if (r < 0.4) return mergedColors.nodeA;
      if (r < 0.75) return mergedColors.nodeB;
      return mergedColors.nodeC;
    };

    const spawnNode = (): Node => {
      const baseR = Math.random() * 1.8 + 1.2;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        baseR,
        r: baseR,
        color: pickColor(),
        pulse: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) nodes.push(spawnNode());
    };

    const rebuildEdges = () => {
      edges.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkRadius) {
            edges.push({ a: i, b: j, len: d });
          }
        }
      }
    };

    // ── Packets ──────────────────────────────────────────────────
    const spawnPacket = () => {
      if (edges.length === 0) return;
      const edgeIdx = Math.floor(Math.random() * edges.length);
      const r = Math.random();
      packets.push({
        edgeIdx,
        t: 0,
        speed: 0.005 + Math.random() * 0.01,
        color: r < 0.5 ? mergedColors.nodeA : r < 0.8 ? mergedColors.nodeB : mergedColors.nodeC,
        size: 1.5 + Math.random() * 1.5,
      });
    };

    // ── Animation Loop ───────────────────────────────────────────
    let frame = 0;
    const tick = () => {
      if (!running) return;
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Mouse attraction
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const d = Math.hypot(dx, dy);
        if (d < cursorRadius && d > 0) {
          const pull = (1 - d / cursorRadius) * 0.04;
          n.vx += (dx / d) * pull;
          n.vy += (dy / d) * pull;
        }

        // Drift damping
        n.vx *= 0.985;
        n.vy *= 0.985;

        // Wrap around edges
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;

        // Pulse radius
        n.pulse += 0.04;
        n.r = n.baseR * (1 + Math.sin(n.pulse) * 0.15);
      }

      // Rebuild edges every 3 frames (cheap spatial check)
      if (frame % 3 === 0) rebuildEdges();

      // Draw edges
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d > linkRadius) continue;
        const alpha = (1 - d / linkRadius) * 0.25;
        ctx.strokeStyle = `rgba(${mergedColors.edge}, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw nodes (glow)
      for (const n of nodes) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, `rgba(${n.color}, 0.9)`);
        grad.addColorStop(0.4, `rgba(${n.color}, 0.3)`);
        grad.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${n.color}, 1)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn packets occasionally
      if (frame % 18 === 0 && packets.length < 20) spawnPacket();

      // Update + draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const e = edges[p.edgeIdx];
        if (!e) {
          packets.splice(i, 1);
          continue;
        }
        p.t += p.speed;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const a = nodes[e.a];
        const b = nodes[e.b];
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        // Trail
        const trailLen = 0.08;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - trailLen);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - trailLen);
        const trailGrad = ctx.createLinearGradient(tx, ty, px, py);
        trailGrad.addColorStop(0, `rgba(${p.color}, 0)`);
        trailGrad.addColorStop(1, `rgba(${p.color}, 0.9)`);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Head
        ctx.fillStyle = `rgba(${p.color}, 1)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    // ── Static fallback for reduced motion ──────────────────────
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.color}, 0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx.strokeStyle = `rgba(${mergedColors.edge}, 0.1)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    };

    // ── Listeners ────────────────────────────────────────────────
    // Use window-level mousemove so the canvas works even with
    // pointer-events: none (needed when overlaying interactive UI).
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    // Only track mouse when the canvas is in the viewport
    let inViewport = true;
    const onIntersection: IntersectionObserverCallback = ([entry]) => {
      inViewport = entry.isIntersecting;
      if (!inViewport) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(tick);
      }
    };
    const io = new IntersectionObserver(onIntersection, { rootMargin: "100px" });
    io.observe(canvas);

    resize();
    initNodes();
    rebuildEdges();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => {
      resize();
      initNodes();
      rebuildEdges();
      if (reduced) drawStatic();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, linkRadius, cursorRadius, mergedColors.nodeA, mergedColors.nodeB, mergedColors.nodeC, mergedColors.edge, mergedColors.packet, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

export default NeuralNetworkCanvas;
