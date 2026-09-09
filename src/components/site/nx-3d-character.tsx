'use client'

/**
 * Nx3DCharacter — CSS-only 3D character mascots for the ClickTake redesign.
 *
 * Each "character" is a floating geometric shape (cube / sphere / pyramid /
 * hex / orb / rocket) rendered with pure CSS 3D transforms + brand color
 * gradients. Characters have a simple "face" (two eyes + smile) so they
 * feel like mascots rather than abstract shapes.
 *
 * Brand colors used:
 *   Pink   #FF53A9 / #E0197A
 *   Blue   #136DFF / #4A90D9
 *   Purple #9B3DFF / #7B2FBE
 *
 * Usage:
 *   <Nx3DCharacter variant="services" />
 *   <Nx3DCharacter variant="rocket" size="lg" />
 *
 * The component is intentionally dependency-free (no Three.js, no Canvas)
 * to keep bundle size small. Animations use CSS keyframes only.
 */

export type Variant =
  | 'services'      // rotating cube with code symbol
  | 'solutions'     // glowing orb with rings
  | 'about'         // hex shield with checkmark
  | 'careers'       // rocket
  | 'case-studies'  // trophy / chart
  | 'blog'          // open book
  | 'contact'       // chat bubble
  | 'pricing'       // price tag
  | 'portfolio'     // frame / window
  | 'team'          // hexagon with people dots
  | 'resources'     // cube stack
  | 'legal'         // shield with scale
  | 'service-detail'// gear
  | 'solution-detail'// lightbulb
  | 'blog-post'     // scroll
  | 'default'       // generic cube

export type Size = 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  variant?: Variant
  size?: Size
  className?: string
  /** Override the floating animation speed (seconds) */
  floatSpeed?: number
}

const SIZE_MAP: Record<Size, { w: number; h: number }> = {
  sm: { w: 180, h: 220 },
  md: { w: 240, h: 280 },
  lg: { w: 320, h: 380 },
  xl: { w: 420, h: 480 },
}

export function Nx3DCharacter({
  variant = 'default',
  size = 'lg',
  className = '',
  floatSpeed = 6,
}: Props) {
  const { w, h } = SIZE_MAP[size]

  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: w, height: h }}
      aria-hidden="true"
    >
      <Nx3DCharacterInner variant={variant} floatSpeed={floatSpeed} />
    </div>
  )
}

/* ─── Inner — renders the right character for the variant ──────────────── */

function Nx3DCharacterInner({ variant, floatSpeed }: { variant: Variant; floatSpeed: number }) {
  switch (variant) {
    case 'services':
    case 'service-detail':
      return <CharacterCube floatSpeed={floatSpeed} />
    case 'solutions':
    case 'solution-detail':
      return <CharacterOrb floatSpeed={floatSpeed} />
    case 'about':
      return <CharacterHex floatSpeed={floatSpeed} />
    case 'careers':
      return <CharacterRocket floatSpeed={floatSpeed} />
    case 'case-studies':
      return <CharacterTrophy floatSpeed={floatSpeed} />
    case 'blog':
    case 'blog-post':
      return <CharacterBook floatSpeed={floatSpeed} />
    case 'contact':
      return <CharacterChat floatSpeed={floatSpeed} />
    case 'pricing':
      return <CharacterTag floatSpeed={floatSpeed} />
    case 'portfolio':
      return <CharacterFrame floatSpeed={floatSpeed} />
    case 'team':
      return <CharacterPeopleHex floatSpeed={floatSpeed} />
    case 'resources':
      return <CharacterCubeStack floatSpeed={floatSpeed} />
    case 'legal':
      return <CharacterShield floatSpeed={floatSpeed} />
    default:
      return <CharacterCube floatSpeed={floatSpeed} />
  }
}

/* ─── Shared face — eyes + smile used by most characters ───────────────── */

function Face({ size = 28 }: { size?: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ pointerEvents: 'none' }}>
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="block rounded-full bg-white"
          style={{ width: size * 0.18, height: size * 0.18, boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
        />
        <span
          className="block rounded-full bg-white"
          style={{ width: size * 0.18, height: size * 0.18, boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
        />
      </div>
      <svg
        width={size * 0.6}
        height={size * 0.4}
        viewBox="0 0 24 16"
        fill="none"
        style={{ marginTop: 2 }}
      >
        <path
          d="M3 4c3 6 15 6 18 0"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

/* ─── 1. CUBE character (services / default) ────────────────────────────── */

function CharacterCube({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: '900px' }}
    >
      {/* Glow halo */}
      <div
        className="absolute"
        style={{
          width: '60%', height: '60%',
          background: 'radial-gradient(circle, rgba(255,83,169,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Floating cube */}
      <div
        className="relative"
        style={{
          width: 160, height: 160,
          transformStyle: 'preserve-3d',
          animation: `ctCubeFloat ${floatSpeed}s ease-in-out infinite, ctCubeSpin 14s linear infinite`,
        }}
      >
        {[
          { transform: 'translateZ(80px)', bg: 'linear-gradient(135deg,#FF53A9,#9B3DFF)' },
          { transform: 'rotateY(180deg) translateZ(80px)', bg: 'linear-gradient(135deg,#136DFF,#9B3DFF)' },
          { transform: 'rotateY(90deg) translateZ(80px)', bg: 'linear-gradient(135deg,#9B3DFF,#FF53A9)' },
          { transform: 'rotateY(-90deg) translateZ(80px)', bg: 'linear-gradient(135deg,#E0197A,#136DFF)' },
          { transform: 'rotateX(90deg) translateZ(80px)', bg: 'linear-gradient(135deg,#FF8AC4,#4A90D9)' },
          { transform: 'rotateX(-90deg) translateZ(80px)', bg: 'linear-gradient(135deg,#7B2FBE,#FF53A9)' },
        ].map((face, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl"
            style={{
              transform: face.transform,
              background: face.bg,
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {i === 0 && <Face size={80} />}
          </div>
        ))}
      </div>
      {/* Orbit dots */}
      <div
        className="absolute"
        style={{
          width: 280, height: 280,
          border: '1px solid rgba(255,83,169,0.2)',
          borderRadius: '50%',
          transform: 'rotateX(72deg)',
          animation: 'ctSpin 18s linear infinite',
        }}
      >
        <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-[#FF53A9] shadow-[0_0_10px_#FF53A9]" />
      </div>
      <div
        className="absolute"
        style={{
          width: 340, height: 340,
          border: '1px solid rgba(19,109,255,0.18)',
          borderRadius: '50%',
          transform: 'rotateX(72deg)',
          animation: 'ctSpin 24s linear infinite reverse',
        }}
      >
        <span className="absolute -bottom-1 left-1/2 -ml-1 h-1.5 w-1.5 rounded-full bg-[#136DFF] shadow-[0_0_10px_#136DFF]" />
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 2. ORB character (solutions / solution-detail) ────────────────────── */

function CharacterOrb({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Outer glow */}
      <div
        className="absolute"
        style={{
          width: '70%', height: '70%',
          background: 'radial-gradient(circle, rgba(155,61,255,0.5) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: 280 - i * 50,
            height: 280 - i * 50,
            border: `${i === 1 ? '1.5' : '1'}px solid ${['rgba(255,83,169,0.3)', 'rgba(19,109,255,0.3)', 'rgba(155,61,255,0.3)'][i]}`,
            borderRadius: '50%',
            transform: `rotateX(${70 + i * 8}deg) rotateZ(${i * 30}deg)`,
            animation: `ctSpin ${20 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`,
          }}
        >
          <span
            className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full"
            style={{
              background: ['#FF53A9', '#136DFF', '#9B3DFF'][i],
              boxShadow: `0 0 12px ${['#FF53A9', '#136DFF', '#9B3DFF'][i]}`,
            }}
          />
        </div>
      ))}
      {/* Center sphere */}
      <div
        className="relative"
        style={{
          width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #FF8AC4 0%, #FF53A9 30%, #9B3DFF 70%, #136DFF 100%)',
          boxShadow: '0 30px 60px rgba(155,61,255,0.45), inset -10px -10px 30px rgba(0,0,0,0.3), inset 10px 10px 30px rgba(255,255,255,0.18)',
          animation: `ctOrbFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        <Face size={90} />
        {/* Highlight */}
        <div
          className="absolute"
          style={{
            top: '18%', left: '22%',
            width: 50, height: 30,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(2px)',
          }}
        />
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 3. HEX SHIELD character (about) ───────────────────────────────────── */

function CharacterHex({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(19,109,255,0.45) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 200, height: 230,
          animation: `ctHexFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        <svg width="200" height="230" viewBox="0 0 200 230" fill="none">
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF53A9" />
              <stop offset="50%" stopColor="#9B3DFF" />
              <stop offset="100%" stopColor="#136DFF" />
            </linearGradient>
            <linearGradient id="hexGradInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A0612" />
              <stop offset="100%" stopColor="#1E1640" />
            </linearGradient>
          </defs>
          {/* Outer hex */}
          <polygon
            points="100,5 185,55 185,175 100,225 15,175 15,55"
            fill="url(#hexGrad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
          {/* Inner hex */}
          <polygon
            points="100,30 162,68 162,162 100,200 38,162 38,68"
            fill="url(#hexGradInner)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          {/* Checkmark */}
          <path
            d="M70 115 L92 137 L135 95"
            stroke="url(#hexGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {/* Floating accent dots */}
        <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-[#FF53A9] shadow-[0_0_12px_#FF53A9]" />
        <span className="absolute bottom-5 -left-3 h-2.5 w-2.5 rounded-full bg-[#136DFF] shadow-[0_0_10px_#136DFF]" />
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 4. ROCKET character (careers) ─────────────────────────────────────── */

function CharacterRocket({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '60%', height: '60%',
          background: 'radial-gradient(circle, rgba(255,83,169,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 160, height: 280,
          animation: `ctRocketFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        <svg width="160" height="280" viewBox="0 0 160 280" fill="none">
          <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9B3DFF" />
              <stop offset="50%" stopColor="#FF53A9" />
              <stop offset="100%" stopColor="#136DFF" />
            </linearGradient>
            <linearGradient id="rocketFin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF53A9" />
              <stop offset="100%" stopColor="#E0197A" />
            </linearGradient>
            <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90D9" />
              <stop offset="100%" stopColor="#136DFF" />
            </linearGradient>
          </defs>
          {/* Flame */}
          <path
            d="M65 220 Q60 245 70 270 Q80 250 80 230 Z"
            fill="#FF53A9"
            opacity="0.7"
          />
          <path
            d="M80 220 Q80 250 95 270 Q100 245 95 230 Z"
            fill="#136DFF"
            opacity="0.7"
          />
          <path
            d="M72 225 Q75 250 80 265 Q85 250 88 225 Z"
            fill="#FFB800"
            opacity="0.9"
          />
          {/* Fins */}
          <path d="M40 160 L20 200 L40 200 Z" fill="url(#rocketFin)" />
          <path d="M120 160 L140 200 L120 200 Z" fill="url(#rocketFin)" />
          {/* Body */}
          <path
            d="M50 80 Q50 30 80 5 Q110 30 110 80 L110 200 L50 200 Z"
            fill="url(#rocketBody)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
          {/* Window */}
          <circle cx="80" cy="100" r="20" fill="url(#rocketWindow)" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
          <circle cx="80" cy="100" r="14" fill="rgba(255,255,255,0.15)" />
          {/* Body band */}
          <rect x="50" y="170" width="60" height="6" fill="rgba(255,255,255,0.3)" />
        </svg>
        {/* Orbit dot */}
        <div
          className="absolute"
          style={{
            top: 30, left: -40, width: 130, height: 130,
            border: '1px dashed rgba(155,61,255,0.4)',
            borderRadius: '50%',
            animation: 'ctSpin 12s linear infinite',
          }}
        >
          <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-[#9B3DFF] shadow-[0_0_10px_#9B3DFF]" />
        </div>
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 5. TROPHY character (case-studies) ────────────────────────────────── */

function CharacterTrophy({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(255,184,0,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 200, height: 250,
          animation: `ctTrophyFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        <svg width="200" height="250" viewBox="0 0 200 250" fill="none">
          <defs>
            <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8AC4" />
              <stop offset="50%" stopColor="#FF53A9" />
              <stop offset="100%" stopColor="#9B3DFF" />
            </linearGradient>
            <linearGradient id="trophyBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#136DFF" />
              <stop offset="100%" stopColor="#0E58D6" />
            </linearGradient>
          </defs>
          {/* Handles */}
          <path d="M40 50 Q15 50 15 90 Q15 120 45 120" stroke="url(#trophyGrad)" strokeWidth="6" fill="none" />
          <path d="M160 50 Q185 50 185 90 Q185 120 155 120" stroke="url(#trophyGrad)" strokeWidth="6" fill="none" />
          {/* Cup */}
          <path
            d="M40 30 L160 30 L150 130 Q150 150 100 150 Q50 150 50 130 Z"
            fill="url(#trophyGrad)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          {/* Star */}
          <path
            d="M100 60 L107 78 L126 78 L111 90 L117 108 L100 97 L83 108 L89 90 L74 78 L93 78 Z"
            fill="white"
            opacity="0.9"
          />
          {/* Stem */}
          <rect x="90" y="150" width="20" height="40" fill="url(#trophyBase)" />
          {/* Base */}
          <rect x="55" y="190" width="90" height="20" rx="4" fill="url(#trophyBase)" />
          <rect x="45" y="210" width="110" height="14" rx="3" fill="url(#trophyBase)" />
        </svg>
        {/* Confetti dots */}
        <span className="absolute top-2 -left-2 h-2 w-2 rounded-full bg-[#FF53A9] animate-bounce" style={{ animationDuration: '2s' }} />
        <span className="absolute top-10 -right-4 h-2.5 w-2.5 rounded-full bg-[#136DFF] animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        <span className="absolute bottom-20 -left-4 h-2 w-2 rounded-full bg-[#9B3DFF] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.6s' }} />
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 6. BOOK character (blog / blog-post) ──────────────────────────────── */

function CharacterBook({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '900px' }}>
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(19,109,255,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 220, height: 180,
          transformStyle: 'preserve-3d',
          animation: `ctBookFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        {/* Left page */}
        <div
          className="absolute left-0 top-0"
          style={{
            width: 110, height: 180,
            background: 'linear-gradient(135deg,#FF8AC4,#FF53A9)',
            transform: 'rotateY(-25deg)',
            transformOrigin: 'right center',
            borderRadius: '8px 0 0 8px',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Lines */}
          {[20, 35, 50, 65, 80, 95, 110, 125, 140].map((y, i) => (
            <div
              key={i}
              className="absolute bg-white/40 rounded-full"
              style={{ top: y, left: 18, width: 70 - (i % 3) * 8, height: 3 }}
            />
          ))}
        </div>
        {/* Right page */}
        <div
          className="absolute right-0 top-0"
          style={{
            width: 110, height: 180,
            background: 'linear-gradient(135deg,#136DFF,#9B3DFF)',
            transform: 'rotateY(25deg)',
            transformOrigin: 'left center',
            borderRadius: '0 8px 8px 0',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          {[20, 35, 50, 65, 80, 95, 110, 125, 140].map((y, i) => (
            <div
              key={i}
              className="absolute bg-white/40 rounded-full"
              style={{ top: y, right: 18, width: 70 - (i % 3) * 8, height: 3 }}
            />
          ))}
        </div>
        {/* Spine */}
        <div
          className="absolute left-1/2 top-0 -ml-1"
          style={{
            width: 4, height: 180,
            background: 'linear-gradient(180deg,#7B2FBE,#9B3DFF)',
            boxShadow: '0 0 10px rgba(155,61,255,0.5)',
          }}
        />
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 7. CHAT BUBBLE character (contact) ────────────────────────────────── */

function CharacterChat({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(255,83,169,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 220, height: 220,
          animation: `ctChatFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        {/* Main bubble */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg,#FF53A9,#9B3DFF)',
            borderRadius: '40% 40% 40% 8%',
            boxShadow: '0 30px 60px rgba(155,61,255,0.45), inset 0 2px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          <Face size={70} />
        </div>
        {/* Small bubble 1 */}
        <div
          className="absolute -top-4 -right-6"
          style={{
            width: 70, height: 70,
            background: 'linear-gradient(135deg,#136DFF,#4A90D9)',
            borderRadius: '50% 50% 50% 10%',
            boxShadow: '0 16px 30px rgba(19,109,255,0.4)',
            border: '1px solid rgba(255,255,255,0.18)',
            animation: `ctChatFloat ${floatSpeed * 1.2}s ease-in-out infinite`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-black">!</span>
          </div>
        </div>
        {/* Small bubble 2 */}
        <div
          className="absolute -bottom-6 -left-8"
          style={{
            width: 50, height: 50,
            background: 'linear-gradient(135deg,#FF8AC4,#E0197A)',
            borderRadius: '50% 50% 50% 10%',
            boxShadow: '0 16px 30px rgba(255,83,169,0.4)',
            border: '1px solid rgba(255,255,255,0.18)',
            animation: `ctChatFloat ${floatSpeed * 0.9}s ease-in-out infinite`,
            animationDelay: '1s',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-black">?</span>
          </div>
        </div>
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 8. PRICE TAG character (pricing) ──────────────────────────────────── */

function CharacterTag({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '900px' }}>
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(155,61,255,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 200, height: 220,
          transformStyle: 'preserve-3d',
          animation: `ctTagFloat ${floatSpeed}s ease-in-out infinite, ctTagTilt 10s ease-in-out infinite`,
        }}
      >
        <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
          <defs>
            <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF53A9" />
              <stop offset="50%" stopColor="#9B3DFF" />
              <stop offset="100%" stopColor="#136DFF" />
            </linearGradient>
          </defs>
          {/* Tag body */}
          <path
            d="M30 60 L30 180 Q30 200 50 200 L170 200 Q190 200 190 180 L190 60 Q190 40 170 40 L70 40 L30 80 Z"
            fill="url(#tagGrad)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          {/* Hole */}
          <circle cx="55" cy="65" r="12" fill="#0A0612" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          {/* String */}
          <path d="M55 53 Q40 30 25 15" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Dollar sign */}
          <text
            x="115"
            y="160"
            textAnchor="middle"
            fontSize="80"
            fontWeight="900"
            fill="white"
            opacity="0.95"
            fontFamily="Syne, sans-serif"
          >
            $
          </text>
        </svg>
      </div>
      {/* Floating coins */}
      <span className="absolute top-4 right-6 h-6 w-6 rounded-full bg-[#FFB800] shadow-[0_0_14px_#FFB800] animate-bounce" style={{ animationDuration: '2.5s' }} />
      <span className="absolute bottom-8 left-4 h-4 w-4 rounded-full bg-[#FFB800] shadow-[0_0_10px_#FFB800] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
      <StyleBlock />
    </div>
  )
}

/* ─── 9. FRAME character (portfolio) ────────────────────────────────────── */

function CharacterFrame({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(19,109,255,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 220, height: 200,
          animation: `ctFrameFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        {/* Window frame */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg,#FF53A9,#9B3DFF)',
            padding: 8,
            boxShadow: '0 30px 60px rgba(155,61,255,0.4)',
          }}
        >
          <div
            className="w-full h-full rounded-xl"
            style={{
              background: 'linear-gradient(180deg,#0A0612 0%,#1E1640 100%)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-1.5 p-2 border-b border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#FF53A9]" />
              <span className="h-2 w-2 rounded-full bg-[#FFB800]" />
              <span className="h-2 w-2 rounded-full bg-[#00e676]" />
            </div>
            {/* Chart bars */}
            <div className="flex items-end gap-2 h-2/3 px-3 py-3">
              {[40, 70, 50, 90, 65, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background: i % 2 === 0
                      ? 'linear-gradient(180deg,#FF53A9,rgba(255,83,169,0.3))'
                      : 'linear-gradient(180deg,#136DFF,rgba(19,109,255,0.3))',
                  }}
                />
              ))}
            </div>
            {/* Line chart overlay */}
            <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 200 160" preserveAspectRatio="none">
              <path
                d="M10 130 Q40 100 60 110 T100 80 T140 60 T190 30"
                stroke="#FF8AC4"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>
        {/* Floating mini-frame */}
        <div
          className="absolute -bottom-4 -right-4 rounded-lg"
          style={{
            width: 60, height: 60,
            background: 'linear-gradient(135deg,#136DFF,#4A90D9)',
            boxShadow: '0 16px 30px rgba(19,109,255,0.4)',
            animation: `ctFrameFloat ${floatSpeed * 1.3}s ease-in-out infinite`,
            animationDelay: '0.5s',
          }}
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-white text-2xl font-black">+</span>
          </div>
        </div>
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 10. PEOPLE HEX character (team) ──────────────────────────────────── */

function CharacterPeopleHex({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '70%', height: '70%',
          background: 'radial-gradient(circle, rgba(155,61,255,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 240, height: 220,
          animation: `ctHexFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        {/* Central hex */}
        <svg width="240" height="220" viewBox="0 0 240 220" fill="none">
          <defs>
            <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF53A9" />
              <stop offset="100%" stopColor="#9B3DFF" />
            </linearGradient>
          </defs>
          {/* Connecting lines */}
          <line x1="120" y1="110" x2="40" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="120" y1="110" x2="200" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="120" y1="110" x2="40" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="120" y1="110" x2="200" y2="170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Center hex */}
          <polygon points="120,60 165,90 165,140 120,170 75,140 75,90" fill="url(#phGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          {/* Center person icon */}
          <circle cx="120" cy="100" r="10" fill="white" />
          <path d="M105 130 Q105 115 120 115 Q135 115 135 130 Z" fill="white" />
          {/* Surrounding person dots */}
          {[
            { x: 40, y: 50, c: '#FF53A9' },
            { x: 200, y: 50, c: '#136DFF' },
            { x: 40, y: 170, c: '#9B3DFF' },
            { x: 200, y: 170, c: '#FF8AC4' },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="20" fill={p.c} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <circle cx={p.x} cy={p.y - 4} r="6" fill="white" />
              <path d={`M${p.x - 8} ${p.y + 8} Q${p.x} ${p.y} ${p.x + 8} ${p.y + 8} Z`} fill="white" />
            </g>
          ))}
        </svg>
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 11. CUBE STACK character (resources) ──────────────────────────────── */

function CharacterCubeStack({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '900px' }}>
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(19,109,255,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 220, height: 240,
          transformStyle: 'preserve-3d',
          animation: `ctStackFloat ${floatSpeed}s ease-in-out infinite, ctStackRotate 20s linear infinite`,
        }}
      >
        {[
          { y: 0, bg: 'linear-gradient(135deg,#FF53A9,#9B3DFF)', label: 'API' },
          { y: 60, bg: 'linear-gradient(135deg,#136DFF,#9B3DFF)', label: 'DB' },
          { y: 120, bg: 'linear-gradient(135deg,#9B3DFF,#FF53A9)', label: 'UI' },
        ].map((cube, i) => (
          <div
            key={i}
            className="absolute left-1/2 -ml-[80px]"
            style={{
              top: cube.y,
              width: 160, height: 50,
              transform: 'rotateX(60deg) rotateZ(45deg)',
              background: cube.bg,
              borderRadius: 8,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <div className="flex items-center justify-center h-full">
              <span className="text-white font-black text-sm tracking-wider">{cube.label}</span>
            </div>
          </div>
        ))}
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── 12. SHIELD character (legal) ──────────────────────────────────────── */

function CharacterShield({ floatSpeed }: { floatSpeed: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          width: '65%', height: '65%',
          background: 'radial-gradient(circle, rgba(19,109,255,0.4) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="relative"
        style={{
          width: 200, height: 240,
          animation: `ctHexFloat ${floatSpeed}s ease-in-out infinite`,
        }}
      >
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#136DFF" />
              <stop offset="50%" stopColor="#9B3DFF" />
              <stop offset="100%" stopColor="#FF53A9" />
            </linearGradient>
            <linearGradient id="shieldInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A0612" />
              <stop offset="100%" stopColor="#1E1640" />
            </linearGradient>
          </defs>
          {/* Shield outline */}
          <path
            d="M100 10 L180 40 L180 130 Q180 180 100 220 Q20 180 20 130 L20 40 Z"
            fill="url(#shieldGrad)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          {/* Inner */}
          <path
            d="M100 30 L160 55 L160 130 Q160 170 100 200 Q40 170 40 130 L40 55 Z"
            fill="url(#shieldInner)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          {/* Scale of justice */}
          <line x1="100" y1="60" x2="100" y2="160" stroke="url(#shieldGrad)" strokeWidth="3" />
          <line x1="60" y1="80" x2="140" y2="80" stroke="url(#shieldGrad)" strokeWidth="3" />
          <circle cx="60" cy="95" r="12" fill="none" stroke="url(#shieldGrad)" strokeWidth="2.5" />
          <circle cx="140" cy="95" r="12" fill="none" stroke="url(#shieldGrad)" strokeWidth="2.5" />
          <line x1="60" y1="80" x2="60" y2="83" stroke="url(#shieldGrad)" strokeWidth="2" />
          <line x1="140" y1="80" x2="140" y2="83" stroke="url(#shieldGrad)" strokeWidth="2" />
          <circle cx="100" cy="55" r="6" fill="url(#shieldGrad)" />
          <path d="M85 165 L100 175 L115 165" stroke="url(#shieldGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <StyleBlock />
    </div>
  )
}

/* ─── Shared <style> injector (one for all characters) ─────────────────── */

let styleInjected = false
function StyleBlock() {
  // The style block is the same for every character variant, so we only
  // need to inject it once globally. We render it inline in JSX so React
  // dedupes it via the key in the fragment below.
  return (
    <style>{`
      @keyframes ctCubeFloat {
        0%, 100% { transform: translateY(0) rotateX(8deg) rotateY(-12deg); }
        50% { transform: translateY(-16px) rotateX(-4deg) rotateY(8deg); }
      }
      @keyframes ctCubeSpin {
        from { transform: rotateY(0); }
        to { transform: rotateY(360deg); }
      }
      @keyframes ctOrbFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-14px) scale(1.04); }
      }
      @keyframes ctHexFloat {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-14px) rotate(2deg); }
      }
      @keyframes ctRocketFloat {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-18px) rotate(2deg); }
      }
      @keyframes ctTrophyFloat {
        0%, 100% { transform: translateY(0) rotate(-3deg); }
        50% { transform: translateY(-12px) rotate(3deg); }
      }
      @keyframes ctBookFloat {
        0%, 100% { transform: translateY(0) rotateX(8deg) rotateY(0); }
        50% { transform: translateY(-12px) rotateX(-4deg) rotateY(0); }
      }
      @keyframes ctChatFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-10px) scale(1.05); }
      }
      @keyframes ctTagFloat {
        0%, 100% { transform: translateY(0) rotate(-3deg); }
        50% { transform: translateY(-14px) rotate(3deg); }
      }
      @keyframes ctTagTilt {
        0%, 100% { transform: rotateY(0deg); }
        50% { transform: rotateY(15deg); }
      }
      @keyframes ctFrameFloat {
        0%, 100% { transform: translateY(0) rotate(-1deg); }
        50% { transform: translateY(-12px) rotate(1deg); }
      }
      @keyframes ctStackFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes ctStackRotate {
        from { transform: rotateY(0); }
        to { transform: rotateY(360deg); }
      }
      @keyframes ctSpin {
        from { transform: rotateX(72deg) rotateZ(0); }
        to { transform: rotateX(72deg) rotateZ(360deg); }
      }
    `}</style>
  )
}

export default Nx3DCharacter
