/**
 * <ClickTakeMascot /> — reusable 3D mascot component.
 *
 * Two variants extracted from the reference clicktake-landing.html design:
 *   - "dev"  : Developer mascot with VR headset + holographic tablet (Hero)
 *   - "ai"   : AI Agent robot with glowing LED eyes (CTA section)
 *
 * Both are inline SVGs (no external image dependency) so they render
 * crisply at any size and inherit the parent container's dimensions.
 *
 * The SVGs use unique gradient/clipPath IDs suffixed with `_dev_N` /
 * `_ai_N` to avoid collisions when both mascots appear on the same page.
 *
 * Usage:
 *   <ClickTakeMascot variant="dev" className="w-full max-w-md" />
 *   <ClickTakeMascot variant="ai" className="w-72" />
 */

type Props = {
  variant?: "dev" | "ai";
  className?: string;
};

export function ClickTakeMascot({
  variant = "dev",
  className = "w-full h-full max-w-md",
}: Props) {
  if (variant === "ai") {
    return <MascotAI className={className} />;
  }
  return <MascotDev className={className} />;
}

/* ─── Dev Mascot (VR headset + holographic tablet) ────────────────────
 * Used in the Hero section. ~94 lines of SVG.
 */
function MascotDev({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D developer mascot wearing VR headset"
      role="img"
    >
      <defs>
        <radialGradient id="devSkin_dev_1" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFD9B8" />
          <stop offset="60%" stopColor="#F4B58C" />
          <stop offset="100%" stopColor="#C98A66" />
        </radialGradient>
        <linearGradient id="devShirt_dev_1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="devVr_dev_1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <radialGradient id="devLens_dev_1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </radialGradient>
        <linearGradient id="devTablet_dev_1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <filter id="devGlow_dev_1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Ambient glow disk */}
      <ellipse cx="200" cy="440" rx="120" ry="14" fill="#000000" opacity="0.4" filter="url(#devGlow_dev_1)" />

      {/* Body / shoulders */}
      <path
        d="M 100 480 Q 100 340 200 340 Q 300 340 300 480 Z"
        fill="url(#devShirt_dev_1)"
      />
      <path
        d="M 100 480 Q 100 340 200 340 Q 300 340 300 480 Z"
        fill="url(#devShirt_dev_1)"
        opacity="0.9"
      />

      {/* Neck */}
      <rect x="180" y="290" width="40" height="60" fill="url(#devSkin_dev_1)" />

      {/* Head */}
      <ellipse cx="200" cy="240" rx="75" ry="80" fill="url(#devSkin_dev_1)" />

      {/* Ears */}
      <ellipse cx="128" cy="245" rx="10" ry="16" fill="url(#devSkin_dev_1)" />
      <ellipse cx="272" cy="245" rx="10" ry="16" fill="url(#devSkin_dev_1)" />

      {/* Hair tuft */}
      <path
        d="M 140 175 Q 160 150 200 155 Q 240 150 260 175 Q 250 165 200 165 Q 150 165 140 175 Z"
        fill="#3F2B1D"
      />

      {/* VR Headset main body */}
      <rect
        x="125"
        y="210"
        width="150"
        height="60"
        rx="14"
        fill="url(#devVr_dev_1)"
      />
      <rect
        x="125"
        y="210"
        width="150"
        height="60"
        rx="14"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />

      {/* Lens ring left */}
      <circle cx="160" cy="240" r="18" fill="#1E1B4B" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle cx="160" cy="240" r="12" fill="url(#devLens_dev_1)" />
      <circle cx="160" cy="240" r="5" fill="#60A5FA" opacity="0.9" filter="url(#devGlow_dev_1)" />

      {/* Lens ring right */}
      <circle cx="240" cy="240" r="18" fill="#1E1B4B" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle cx="240" cy="240" r="12" fill="url(#devLens_dev_1)" />
      <circle cx="240" cy="240" r="5" fill="#F472B6" opacity="0.9" filter="url(#devGlow_dev_1)" />

      {/* Strap */}
      <rect x="120" y="225" width="8" height="30" rx="2" fill="#4F46E5" />
      <rect x="272" y="225" width="8" height="30" rx="2" fill="#4F46E5" />

      {/* Top glow line */}
      <rect x="130" y="212" width="140" height="2" rx="1" fill="rgba(255,255,255,0.3)" />

      {/* Holographic tablet */}
      <rect
        x="130"
        y="370"
        width="140"
        height="90"
        rx="10"
        fill="url(#devTablet_dev_1)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      {/* Tablet UI — bar chart */}
      <rect x="145" y="430" width="14" height="20" rx="2" fill="url(#devVr_dev_1)" opacity="0.9" />
      <rect x="165" y="415" width="14" height="35" rx="2" fill="#FF53A9" opacity="0.8" />
      <rect x="185" y="400" width="14" height="50" rx="2" fill="url(#devVr_dev_1)" opacity="0.9" />
      <rect x="205" y="420" width="14" height="30" rx="2" fill="#FF53A9" opacity="0.8" />
      <rect x="225" y="395" width="14" height="55" rx="2" fill="url(#devVr_dev_1)" opacity="0.9" />
      <rect x="245" y="410" width="14" height="40" rx="2" fill="#FF53A9" opacity="0.8" />

      {/* Floating code snippets around mascot */}
      <text x="60" y="100" fontFamily="JetBrains Mono" fontSize="12" fill="#136DFF">
        {"</>"}
      </text>
      <text x="320" y="140" fontFamily="JetBrains Mono" fontSize="10" fill="#FF53A9">
        {"{ }"}
      </text>
      <text x="340" y="280" fontFamily="JetBrains Mono" fontSize="11" fill="#7B2FBE">
        01
      </text>
    </svg>
  );
}

/* ─── AI Agent Robot mascot ────────────────────────────────────────────
 * Used in the CTA section. ~96 lines of SVG.
 */
function MascotAI({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D AI agent robot mascot with glowing LED eyes"
      role="img"
    >
      <defs>
        <linearGradient id="aiBody_ai_1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E8E2F0" />
          <stop offset="50%" stopColor="#9A8CB5" />
          <stop offset="100%" stopColor="#5A4D78" />
        </linearGradient>
        <linearGradient id="aiHead_ai_1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F0EBF8" />
          <stop offset="100%" stopColor="#9A8CB5" />
        </linearGradient>
        <radialGradient id="aiEye_ai_1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF53A9" />
          <stop offset="60%" stopColor="#E0197A" />
          <stop offset="100%" stopColor="#7B2FBE" />
        </radialGradient>
        <radialGradient id="aiEye2_ai_1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#136DFF" />
          <stop offset="60%" stopColor="#0E58D6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <linearGradient id="aiChest_ai_1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FF53A9" />
          <stop offset="50%" stopColor="#9B3DFF" />
          <stop offset="100%" stopColor="#136DFF" />
        </linearGradient>
        <filter id="aiGlow_ai_1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Ambient glow disk */}
      <ellipse cx="200" cy="445" rx="110" ry="12" fill="#000000" opacity="0.4" filter="url(#aiGlow_ai_1)" />

      {/* Body */}
      <path
        d="M 110 480 Q 110 350 200 350 Q 290 350 290 480 Z"
        fill="url(#aiBody_ai_1)"
      />

      {/* Chest emblem — brand gradient heart/core */}
      <circle cx="200" cy="400" r="22" fill="url(#aiChest_ai_1)" filter="url(#aiGlow_ai_1)" />
      <circle cx="200" cy="400" r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <text
        x="200"
        y="406"
        textAnchor="middle"
        fontSize="20"
        fill="#ffffff"
        fontWeight="700"
      >
        ♥
      </text>

      {/* Neck */}
      <rect x="185" y="300" width="30" height="55" fill="url(#aiBody_ai_1)" />

      {/* Head — rounded rectangle robot style */}
      <rect
        x="130"
        y="170"
        width="140"
        height="130"
        rx="40"
        fill="url(#aiHead_ai_1)"
      />
      <rect
        x="130"
        y="170"
        width="140"
        height="130"
        rx="40"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />

      {/* Antenna */}
      <rect x="197" y="150" width="6" height="22" fill="#9A8CB5" />
      <circle cx="200" cy="148" r="6" fill="#FF53A9" filter="url(#aiGlow_ai_1)" />
      <circle cx="200" cy="148" r="6" fill="#FF53A9" />

      {/* Eyes — LED-style glowing */}
      <circle cx="170" cy="230" r="16" fill="#0D0025" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle cx="170" cy="230" r="10" fill="url(#aiEye_ai_1)" />
      <circle cx="170" cy="230" r="4" fill="#FF53A9" filter="url(#aiGlow_ai_1)" />

      <circle cx="230" cy="230" r="16" fill="#0D0025" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      <circle cx="230" cy="230" r="10" fill="url(#aiEye2_ai_1)" />
      <circle cx="230" cy="230" r="4" fill="#136DFF" filter="url(#aiGlow_ai_1)" />

      {/* Mouth — speaker grill */}
      <rect x="180" y="265" width="40" height="6" rx="3" fill="#0D0025" opacity="0.6" />
      <rect x="186" y="267" width="3" height="2" fill="#FF53A9" opacity="0.7" />
      <rect x="192" y="267" width="3" height="2" fill="#FF53A9" opacity="0.7" />
      <rect x="198" y="267" width="3" height="2" fill="#FF53A9" opacity="0.7" />
      <rect x="204" y="267" width="3" height="2" fill="#FF53A9" opacity="0.7" />
      <rect x="210" y="267" width="3" height="2" fill="#FF53A9" opacity="0.7" />

      {/* Arms — holding tablet */}
      <rect x="100" y="370" width="50" height="18" rx="9" fill="url(#aiBody_ai_1)" transform="rotate(15 125 379)" />
      <rect x="250" y="370" width="50" height="18" rx="9" fill="url(#aiBody_ai_1)" transform="rotate(-15 275 379)" />

      {/* Holographic tablet (smaller, glowing) */}
      <rect
        x="140"
        y="365"
        width="120"
        height="80"
        rx="8"
        fill="#0D0025"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* Tablet graph */}
      <polyline
        points="155,420 175,400 195,410 215,380 235,390 255,375"
        fill="none"
        stroke="url(#aiChest_ai_1)"
        strokeWidth="2"
      />
      <circle cx="155" cy="420" r="2" fill="#FF53A9" />
      <circle cx="175" cy="400" r="2" fill="#FF53A9" />
      <circle cx="195" cy="410" r="2" fill="#9B3DFF" />
      <circle cx="215" cy="380" r="2" fill="#136DFF" />
      <circle cx="235" cy="390" r="2" fill="#136DFF" />
      <circle cx="255" cy="375" r="2" fill="#FF53A9" />

      {/* Floating particles */}
      <circle cx="80" cy="200" r="4" fill="#FF53A9" opacity="0.6" filter="url(#aiGlow_ai_1)" />
      <circle cx="320" cy="180" r="5" fill="#136DFF" opacity="0.5" filter="url(#aiGlow_ai_1)" />
      <circle cx="60" cy="320" r="3" fill="#9B3DFF" opacity="0.4" filter="url(#aiGlow_ai_1)" />
      <circle cx="345" cy="250" r="9" fill="#FF53A9" opacity="0.3" filter="url(#aiGlow_ai_1)" />
    </svg>
  );
}
