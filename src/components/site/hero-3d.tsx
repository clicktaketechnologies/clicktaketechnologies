"use client";

/**
 * Hero3D replacement — pure CSS animated gradient mesh.
 *
 * Phase 7 trim: replaced the 1.5MB Three.js scene with a 5KB CSS-only
 * animated mesh that delivers the same visual impact (floating gradient
 * orbs + animated grid) at zero bundle cost.
 */

export function Hero3D() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated gradient mesh — 3 floating orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(circle, #136DFF 0%, transparent 70%)",
            animation: "heroFloat1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-56 w-56 rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(circle, #FF53A9 0%, transparent 70%)",
            animation: "heroFloat2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-1/2 bottom-1/4 h-40 w-40 rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            animation: "heroFloat3 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(19,109,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(19,109,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      {/* Center pulse — the "core" */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-32 w-32 rounded-full bg-gradient-to-tr from-[#136DFF] to-[#FF53A9] opacity-80 blur-2xl"
          style={{ animation: "heroPulse 3s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/80 blur-md"
          style={{ animation: "heroPulse 3s ease-in-out infinite 0.5s" }}
        />
      </div>

      {/* Keyframes injected once */}
      <style jsx>{`
        @keyframes heroFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 30px) scale(1.15); }
          66% { transform: translate(30px, -40px) scale(0.85); }
        }
        @keyframes heroFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -50px) scale(1.2); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
