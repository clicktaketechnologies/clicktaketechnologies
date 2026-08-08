#!/usr/bin/env python3
"""
ClickTake Technologies — v4 Multi-Page SPA Generator
Builds a self-contained dark-mode futuristic site with:
- 10 SPA pages (home, services, solutions, cases, contact, about, blog, careers, privacy, terms)
- 3 CSS/SVG mascots (Dev w/ VR, AI Agent robot, Data Analyst)
- Canvas particle ambient background
- Parallax tilt cards + radial glow buttons
- Full per-page SEO (title/description/OG/canonical) + JSON-LD
- Multi-step glass contact form
Output: /home/z/my-project/download/clicktake-landing.html
"""
from pathlib import Path
from textwrap import dedent

OUT = Path("/home/z/my-project/download/clicktake-landing.html")

# ============================================================================
# HEAD — meta, Tailwind config, fonts, Lucide, JSON-LD, embedded <style>
# ============================================================================
HEAD = '''<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#03000D" />

  <!-- Default SEO (overridden per-page by SPA router) -->
  <title>ClickTake Technologies — Software · AI Agents · Cloud Architecture</title>
  <meta name="description" content="ClickTake Technologies engineers bespoke software, autonomous AI agents, and cloud architecture for global enterprises. 99.9% uptime, 150+ apps shipped, 10M+ API requests/day." />
  <meta name="keywords" content="AI agents, custom software development, cloud DevOps, RAG, LLM fine-tuning, multi-agent orchestration, enterprise AI, ClickTake" />
  <meta name="author" content="ClickTake Technologies" />
  <link rel="canonical" href="https://clicktaketech.com/" />

  <!-- OpenGraph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ClickTake Technologies" />
  <meta property="og:title" content="ClickTake Technologies — Software · AI Agents · Cloud Architecture" />
  <meta property="og:description" content="Engineering tomorrow's intelligence, today. Bespoke software, autonomous AI agents, and cloud architecture for global enterprises." />
  <meta property="og:url" content="https://clicktaketech.com/" />
  <meta property="og:image" content="https://clicktaketech.com/og-cover.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ClickTake Technologies — Software · AI Agents · Cloud Architecture" />
  <meta name="twitter:description" content="Engineering tomorrow's intelligence, today. Bespoke software, autonomous AI agents, and cloud architecture." />
  <meta name="twitter:image" content="https://clicktaketech.com/og-cover.jpg" />

  <script src="https://cdn.tailwindcss.com"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" defer></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            midnight: '#03000D',
            navy: '#070018',
            charcoal: '#0D0025',
            ckblue: '#136DFF',
            ckpink: '#FF53A9',
            ckpinkdeep: '#E0197A',
            ckpurple: '#7B2FBE',
            ckheading: '#F0EBF8',
            ckbody: '#9A8CB5',
          },
          fontFamily: {
            display: ['"Space Grotesk"', 'sans-serif'],
            body: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
        }
      }
    }
  </script>

  <!-- JSON-LD: Organization -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ClickTake Technologies",
    "url": "https://clicktaketech.com/",
    "logo": "https://clicktaketech.com/logo.png",
    "email": "info@clicktaketech.com",
    "description": "ClickTake Technologies engineers bespoke software, autonomous AI agents, and cloud architecture for global enterprises.",
    "sameAs": ["https://www.linkedin.com/company/clicktaketech","https://twitter.com/clicktaketech","https://github.com/clicktaketech"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "info@clicktaketech.com",
      "availableLanguage": ["English"]
    }
  }
  </script>

  <!-- JSON-LD: SoftwareApplication -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ClickTake AI Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud, Web, iOS, Android",
    "offers": {"@type":"Offer","price":"0","priceCurrency":"USD"},
    "description": "Multi-agent orchestration, enterprise RAG, and custom LLM fine-tuning platform.",
    "publisher": {"@type":"Organization","name":"ClickTake Technologies"}
  }
  </script>

  <style>
    :root {
      --midnight: #03000D;
      --navy: #070018;
      --charcoal: #0D0025;
      --blue: #136DFF;
      --pink: #FF53A9;
      --pink-deep: #E0197A;
      --purple: #7B2FBE;
      --heading: #F0EBF8;
      --body: #9A8CB5;
      --glass-bg: rgba(13, 0, 37, 0.55);
      --glass-border: rgba(19, 109, 255, 0.30);
    }

    * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    html, body { background: var(--midnight); color: var(--body); font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
    body { background:
      radial-gradient(1200px 800px at 10% 0%, rgba(123,47,190,0.18), transparent 60%),
      radial-gradient(1000px 700px at 90% 10%, rgba(19,109,255,0.14), transparent 60%),
      radial-gradient(900px 600px at 50% 100%, rgba(255,83,169,0.10), transparent 60%),
      linear-gradient(180deg, #03000D 0%, #070018 50%, #0D0025 100%);
      background-attachment: fixed;
    }

    h1,h2,h3,h4,h5,h6 { font-family: 'Space Grotesk', sans-serif; color: var(--heading); letter-spacing: -0.02em; }
    ::selection { background: rgba(255,83,169,0.35); color: #fff; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: #070018; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #136DFF, #FF53A9); border-radius: 6px; }

    /* Canvas particle background */
    #particle-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.6; }

    /* Mesh ambient blobs */
    .mesh-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; pointer-events: none; z-index: 1; }

    /* Glass container — Glassmorphism 2.0 */
    .glass {
      background: var(--glass-bg);
      backdrop-filter: blur(24px) saturate(140%);
      -webkit-backdrop-filter: blur(24px) saturate(140%);
      border: 1px solid transparent;
      background-clip: padding-box;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06);
      position: relative;
    }
    .glass::before {
      content: ''; position: absolute; inset: 0; padding: 1px; border-radius: inherit;
      background: linear-gradient(135deg, rgba(19,109,255,0.45), rgba(255,83,169,0.30));
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      pointer-events: none;
    }
    .glass-soft {
      background: rgba(13,0,37,0.40);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(240,235,248,0.06);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, #136DFF 0%, #FF53A9 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .grad-text-violet {
      background: linear-gradient(135deg, #7B2FBE 0%, #136DFF 50%, #FF53A9 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }

    /* Glow button with radial follow */
    .glow-btn {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, #136DFF, #FF53A9);
      color: #fff; border: none; cursor: pointer;
      box-shadow: 0 8px 24px rgba(19,109,255,0.35), 0 8px 24px rgba(255,83,169,0.20);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      --mx: 50%; --my: 50%;
    }
    .glow-btn::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(140px circle at var(--mx) var(--my), rgba(255,255,255,0.45), transparent 50%);
      opacity: 0; transition: opacity 0.25s;
    }
    .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(19,109,255,0.55), 0 14px 36px rgba(255,83,169,0.40); }
    .glow-btn:hover::after { opacity: 1; }

    .ghost-btn {
      background: rgba(13,0,37,0.5); color: var(--heading);
      border: 1px solid rgba(240,235,248,0.15); transition: all 0.25s;
    }
    .ghost-btn:hover { border-color: rgba(19,109,255,0.6); background: rgba(19,109,255,0.10); transform: translateY(-2px); }

    /* Tilt card */
    .tilt-card {
      transform-style: preserve-3d; transition: transform 0.2s ease;
      will-change: transform;
    }
    .tilt-card .tilt-layer { transform: translateZ(40px); }

    /* Page sections (SPA) */
    .page { display: none; }
    .page.active { display: block; animation: pageIn 0.55s cubic-bezier(0.22,1,0.36,1); }
    @keyframes pageIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

    /* Floating keyframes (4-7s) */
    @keyframes floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
    @keyframes floatB { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-22px) rotate(2deg); } }
    @keyframes floatC { 0%,100% { transform: translateY(0) rotate(0); } 33% { transform: translateY(-14px) rotate(1deg); } 66% { transform: translateY(8px) rotate(-1deg); } }
    .float-a { animation: floatA 5s ease-in-out infinite; }
    .float-b { animation: floatB 6s ease-in-out infinite; }
    .float-c { animation: floatC 7s ease-in-out infinite; }

    /* Pulsing glow */
    @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(19,109,255,0.45); } 50% { box-shadow: 0 0 30px 6px rgba(19,109,255,0.30); } }
    .pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }

    /* Shine sweep */
    @keyframes shine { 0% { transform: translateX(-120%) skewX(-15deg); } 60%,100% { transform: translateX(220%) skewX(-15deg); } }
    .shine::before {
      content:''; position:absolute; top:0; left:0; width:35%; height:100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent);
      animation: shine 4.5s ease-in-out infinite;
    }

    /* Scroll reveal */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
    .reveal.in { opacity: 1; transform: translateY(0); }

    /* Nav link */
    .nav-link { position: relative; color: var(--body); transition: color 0.2s; font-weight: 500; }
    .nav-link:hover, .nav-link.active { color: var(--heading); }
    .nav-link::after {
      content:''; position:absolute; left:0; bottom:-6px; width:0; height:2px;
      background: linear-gradient(90deg, #136DFF, #FF53A9); transition: width 0.3s;
    }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    /* Holographic ring */
    .holo-ring {
      background: conic-gradient(from 0deg, #136DFF, #FF53A9, #7B2FBE, #136DFF);
      animation: spin 8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Mascot containers */
    .mascot-stage { position: relative; width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; }

    /* Stat counter */
    .stat-num { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 2.5rem; line-height: 1; }

    /* Tag chip */
    .tag { display:inline-flex; align-items:center; gap:6px; padding: 4px 12px; border-radius: 999px;
      background: rgba(19,109,255,0.12); border: 1px solid rgba(19,109,255,0.30);
      color: #B4D1FF; font-size: 12px; font-weight: 500; font-family: 'JetBrains Mono', monospace; }

    /* Marquee */
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-track { display: flex; gap: 3rem; animation: marquee 28s linear infinite; width: max-content; }

    /* Perspective grid */
    .perspective-grid {
      background-image:
        linear-gradient(rgba(19,109,255,0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(19,109,255,0.18) 1px, transparent 1px);
      background-size: 50px 50px;
      transform: perspective(600px) rotateX(60deg);
      transform-origin: bottom;
    }

    /* Form input */
    .glass-input {
      background: rgba(7,0,24,0.6); border: 1px solid rgba(240,235,248,0.10);
      color: var(--heading); padding: 14px 16px; border-radius: 14px; width: 100%;
      transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .glass-input:focus { outline: none; border-color: rgba(19,109,255,0.6); box-shadow: 0 0 0 3px rgba(19,109,255,0.15); background: rgba(13,0,37,0.8); }
    .glass-input::placeholder { color: rgba(154,140,181,0.6); }

    /* Step indicator */
    .step-dot { width: 36px; height: 36px; border-radius: 50%; display:flex; align-items:center; justify-content:center;
      font-weight: 700; font-family: 'Space Grotesk'; transition: all 0.3s; }
    .step-dot.active { background: linear-gradient(135deg, #136DFF, #FF53A9); color:#fff; box-shadow: 0 0 20px rgba(19,109,255,0.5); }
    .step-dot.done { background: rgba(19,109,255,0.20); color: #B4D1FF; border:1px solid rgba(19,109,255,0.40); }
    .step-dot.idle { background: rgba(240,235,248,0.05); color: rgba(154,140,181,0.5); border:1px solid rgba(240,235,248,0.08); }
    .step-line { flex:1; height: 2px; background: rgba(240,235,248,0.08); position: relative; }
    .step-line.done { background: linear-gradient(90deg, #136DFF, #FF53A9); }

    /* Calendar widget */
    .cal-day { aspect-ratio: 1; display:flex; align-items:center; justify-content:center; border-radius: 8px;
      font-size: 14px; font-family: 'Space Grotesk'; cursor: pointer; transition: all 0.15s; color: var(--body); }
    .cal-day:hover { background: rgba(19,109,255,0.15); color: var(--heading); }
    .cal-day.selected { background: linear-gradient(135deg, #136DFF, #FF53A9); color: #fff; }
    .cal-day.disabled { opacity: 0.25; cursor: not-allowed; }
    .cal-day.today { border: 1px solid rgba(255,83,169,0.5); }

    /* Mobile menu */
    .mobile-menu { transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
    .mobile-menu.open { transform: translateX(0); }

    /* Hide scrollbar on horizontal scroll containers */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* Breadcrumb */
    .crumb a { color: var(--body); transition: color 0.2s; }
    .crumb a:hover { color: var(--heading); }
  </style>
</head>
'''

# ============================================================================
# CANVAS + AMBIENT MESH
# ============================================================================
AMBIENT = '''
<body class="font-body relative">
  <!-- Particle ambient canvas -->
  <canvas id="particle-canvas" aria-hidden="true"></canvas>

  <!-- Ambient mesh blobs (decorative, fixed) -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    <div class="mesh-blob" style="width:520px;height:520px;background:#7B2FBE;top:-120px;left:-80px;"></div>
    <div class="mesh-blob" style="width:480px;height:480px;background:#136DFF;top:30%;right:-120px;opacity:0.35;"></div>
    <div class="mesh-blob" style="width:420px;height:420px;background:#FF53A9;bottom:-100px;left:30%;opacity:0.30;"></div>
  </div>

  <div class="relative z-10">
'''

# ============================================================================
# UNIVERSAL STICKY GLASS HEADER
# ============================================================================
HEADER = '''
    <!-- Universal Sticky Glass Header -->
    <header id="site-header" class="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-5 lg:px-8">
        <div class="mt-3 glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <!-- Logo -->
          <a href="#home" data-nav="home" class="flex items-center gap-2.5 group" aria-label="ClickTake home">
            <span class="relative inline-flex h-9 w-9 items-center justify-center rounded-xl" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
              <span class="absolute inset-0 rounded-xl blur-md opacity-60" style="background:linear-gradient(135deg,#136DFF,#FF53A9);"></span>
              <svg class="relative w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </span>
            <span class="font-display font-bold text-lg tracking-tight text-ckheading">ClickTake<span class="grad-text">.</span></span>
          </a>

          <!-- Desktop Nav -->
          <nav class="hidden lg:flex items-center gap-7 text-sm" aria-label="Primary">
            <a href="#home" data-nav="home" class="nav-link">Home</a>
            <a href="#services" data-nav="services" class="nav-link">Services</a>
            <a href="#solutions" data-nav="solutions" class="nav-link">Solutions</a>
            <a href="#cases" data-nav="cases" class="nav-link">Case Studies</a>
            <a href="#about" data-nav="about" class="nav-link">About</a>
            <a href="#blog" data-nav="blog" class="nav-link">Blog</a>
            <a href="#careers" data-nav="careers" class="nav-link">Careers</a>
            <a href="#contact" data-nav="contact" class="nav-link">Contact</a>
          </nav>

          <!-- CTA -->
          <div class="hidden lg:flex items-center gap-3">
            <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-5 py-2.5 text-sm font-semibold font-display">Book a Demo</a>
          </div>

          <!-- Mobile toggle -->
          <button id="mobile-toggle" class="lg:hidden p-2 text-ckheading" aria-label="Open menu">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile menu drawer -->
    <div id="mobile-menu" class="mobile-menu lg:hidden fixed top-0 right-0 z-50 h-full w-80 max-w-[85%] glass p-6 pt-24" aria-hidden="true">
      <button id="mobile-close" class="absolute top-5 right-5 p-2 text-ckheading" aria-label="Close menu">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      <nav class="flex flex-col gap-4 text-base" aria-label="Mobile">
        <a href="#home" data-nav="home" class="nav-link mobile-link">Home</a>
        <a href="#services" data-nav="services" class="nav-link mobile-link">Services</a>
        <a href="#solutions" data-nav="solutions" class="nav-link mobile-link">Solutions</a>
        <a href="#cases" data-nav="cases" class="nav-link mobile-link">Case Studies</a>
        <a href="#about" data-nav="about" class="nav-link mobile-link">About</a>
        <a href="#blog" data-nav="blog" class="nav-link mobile-link">Blog</a>
        <a href="#careers" data-nav="careers" class="nav-link mobile-link">Careers</a>
        <a href="#contact" data-nav="contact" class="nav-link mobile-link">Contact</a>
        <a href="#privacy" data-nav="privacy" class="nav-link mobile-link text-xs mt-4 opacity-60">Privacy Policy</a>
        <a href="#terms" data-nav="terms" class="nav-link mobile-link text-xs opacity-60">Terms of Service</a>
        <a href="#contact" data-nav="contact" class="glow-btn mobile-link rounded-xl px-5 py-3 text-center font-display font-semibold mt-4">Book a Demo</a>
      </nav>
    </div>
'''

# ============================================================================
# MASCOTS — CSS/SVG-built 3D cartoon mascots
# ============================================================================
MASCOT_DEV = '''
<!-- Mascot 1: Dev Mascot with VR headset + holographic tablet -->
<svg class="mascot-dev w-full h-full max-w-md" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" aria-label="3D developer mascot wearing VR headset" role="img">
  <defs>
    <radialGradient id="devSkin" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFD9B8"/><stop offset="60%" stop-color="#F4B58C"/><stop offset="100%" stop-color="#C98A66"/>
    </radialGradient>
    <linearGradient id="devShirt" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#1E3A8A"/><stop offset="100%" stop-color="#0A1746"/>
    </linearGradient>
    <linearGradient id="vrBody" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#136DFF"/><stop offset="50%" stop-color="#7B2FBE"/><stop offset="100%" stop-color="#FF53A9"/>
    </linearGradient>
    <linearGradient id="holoTab" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#136DFF" stop-opacity="0.85"/><stop offset="100%" stop-color="#FF53A9" stop-opacity="0.70"/>
    </linearGradient>
    <filter id="softGlow"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>

  <!-- Ambient glow disk -->
  <ellipse cx="200" cy="440" rx="140" ry="20" fill="#136DFF" opacity="0.25" filter="url(#softGlow)"/>

  <!-- Body / shoulders -->
  <path d="M110 380 Q200 320 290 380 L290 460 Q200 440 110 460 Z" fill="url(#devShirt)"/>
  <path d="M150 360 Q200 340 250 360 L255 410 Q200 395 145 410 Z" fill="#0A1746" opacity="0.6"/>
  <!-- Neck -->
  <rect x="180" y="240" width="40" height="60" rx="14" fill="url(#devSkin)"/>
  <ellipse cx="200" cy="300" rx="22" ry="8" fill="#000" opacity="0.20"/>

  <!-- Head -->
  <ellipse cx="200" cy="190" rx="78" ry="86" fill="url(#devSkin)"/>
  <!-- Ears -->
  <ellipse cx="125" cy="200" rx="14" ry="20" fill="url(#devSkin)"/>
  <ellipse cx="275" cy="200" rx="14" ry="20" fill="url(#devSkin)"/>

  <!-- Hair tuft -->
  <path d="M140 130 Q170 95 200 100 Q230 95 260 130 Q255 105 200 95 Q145 105 140 130 Z" fill="#2D1B4E"/>
  <path d="M170 115 Q200 105 230 115 Q220 95 200 95 Q180 95 170 115 Z" fill="#1A0F33"/>

  <!-- VR Headset main body -->
  <g class="float-b" style="transform-origin: 200px 190px;">
    <rect x="115" y="155" width="170" height="80" rx="22" fill="url(#vrBody)"/>
    <rect x="125" y="160" width="150" height="70" rx="18" fill="#0A0118" opacity="0.55"/>
    <!-- Lens ring left -->
    <circle cx="160" cy="195" r="20" fill="#0A0118"/>
    <circle cx="160" cy="195" r="16" fill="url(#vrBody)" opacity="0.85"/>
    <circle cx="160" cy="195" r="10" fill="#136DFF"/>
    <circle cx="156" cy="191" r="4" fill="#fff" opacity="0.85"/>
    <!-- Lens ring right -->
    <circle cx="240" cy="195" r="20" fill="#0A0118"/>
    <circle cx="240" cy="195" r="16" fill="url(#vrBody)" opacity="0.85"/>
    <circle cx="240" cy="195" r="10" fill="#FF53A9"/>
    <circle cx="236" cy="191" r="4" fill="#fff" opacity="0.85"/>
    <!-- Strap -->
    <path d="M115 175 Q90 180 80 200 Q90 220 115 215" stroke="#0A0118" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M285 175 Q310 180 320 200 Q310 220 285 215" stroke="#0A0118" stroke-width="8" fill="none" stroke-linecap="round"/>
    <!-- Top glow line -->
    <rect x="135" y="150" width="130" height="3" rx="1.5" fill="#FF53A9" opacity="0.8"/>
  </g>

  <!-- Smile peeking below -->
  <path d="M175 232 Q200 248 225 232" stroke="#7A3B23" stroke-width="3" fill="none" stroke-linecap="round"/>

  <!-- Arms holding tablet -->
  <path d="M115 380 Q90 350 130 320 L170 330 L150 380 Z" fill="url(#devShirt)"/>
  <path d="M285 380 Q310 350 270 320 L230 330 L250 380 Z" fill="url(#devShirt)"/>
  <!-- Hands -->
  <circle cx="140" cy="325" r="14" fill="url(#devSkin)"/>
  <circle cx="260" cy="325" r="14" fill="url(#devSkin)"/>

  <!-- Holographic tablet -->
  <g class="float-a" style="transform-origin: 200px 310px;">
    <rect x="140" y="290" width="120" height="80" rx="10" fill="url(#holoTab)" opacity="0.95"/>
    <rect x="145" y="295" width="110" height="70" rx="6" fill="#0A0118" opacity="0.30"/>
    <!-- Code lines -->
    <rect x="152" y="305" width="40" height="3" rx="1.5" fill="#B4D1FF"/>
    <rect x="152" y="313" width="60" height="3" rx="1.5" fill="#FFB4DC"/>
    <rect x="152" y="321" width="30" height="3" rx="1.5" fill="#B4D1FF"/>
    <rect x="152" y="329" width="50" height="3" rx="1.5" fill="#D4B4FF"/>
    <rect x="152" y="337" width="35" height="3" rx="1.5" fill="#B4D1FF"/>
    <!-- Mini chart -->
    <rect x="200" y="320" width="6" height="20" fill="#FFB4DC"/>
    <rect x="210" y="312" width="6" height="28" fill="#B4D1FF"/>
    <rect x="220" y="318" width="6" height="22" fill="#D4B4FF"/>
    <rect x="230" y="308" width="6" height="32" fill="#FFB4DC"/>
    <!-- Tablet glow underline -->
    <rect x="140" y="370" width="120" height="3" rx="1.5" fill="#FF53A9" opacity="0.6"/>
  </g>

  <!-- Floating code particles -->
  <g class="float-c" opacity="0.8">
    <text x="60" y="100" font-family="JetBrains Mono" font-size="12" fill="#136DFF">&lt;/&gt;</text>
    <text x="320" y="140" font-family="JetBrains Mono" font-size="10" fill="#FF53A9">{ }</text>
    <text x="340" y="280" font-family="JetBrains Mono" font-size="11" fill="#7B2FBE">01</text>
  </g>
</svg>
'''

MASCOT_AI = '''
<!-- Mascot 2: AI Agent Robot -->
<svg class="mascot-ai w-full h-full max-w-md" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" aria-label="3D AI agent robot mascot with glowing LED eyes" role="img">
  <defs>
    <linearGradient id="aiBody" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#E8E2F0"/><stop offset="50%" stop-color="#9A8CB5"/><stop offset="100%" stop-color="#5A4D78"/>
    </linearGradient>
    <linearGradient id="aiHead" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#F4EEFB"/><stop offset="100%" stop-color="#7A6F94"/>
    </linearGradient>
    <radialGradient id="aiHeart" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF53A9"/><stop offset="60%" stop-color="#136DFF"/><stop offset="100%" stop-color="#7B2FBE"/>
    </radialGradient>
    <radialGradient id="aiEye" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="40%" stop-color="#136DFF"/><stop offset="100%" stop-color="#0A1746"/>
    </radialGradient>
    <filter id="aiGlow"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>

  <!-- Ambient hover glow -->
  <ellipse cx="200" cy="440" rx="130" ry="18" fill="#7B2FBE" opacity="0.30" filter="url(#aiGlow)"/>

  <!-- Hover thruster -->
  <ellipse cx="200" cy="410" rx="60" ry="10" fill="#136DFF" opacity="0.45" filter="url(#aiGlow)"/>
  <ellipse cx="200" cy="410" rx="40" ry="6" fill="#FF53A9" opacity="0.55"/>

  <!-- Body -->
  <g class="float-b" style="transform-origin: 200px 280px;">
    <!-- Antenna -->
    <line x1="200" y1="80" x2="200" y2="50" stroke="#9A8CB5" stroke-width="3"/>
    <circle cx="200" cy="46" r="8" fill="#FF53A9"/>
    <circle cx="200" cy="46" r="12" fill="#FF53A9" opacity="0.30" filter="url(#aiGlow)"/>

    <!-- Head -->
    <rect x="135" y="90" width="130" height="110" rx="32" fill="url(#aiHead)"/>
    <rect x="145" y="100" width="110" height="90" rx="24" fill="#0A0118" opacity="0.20"/>
    <!-- Head seam -->
    <line x1="200" y1="90" x2="200" y2="105" stroke="#5A4D78" stroke-width="2"/>

    <!-- Eyes (LED) -->
    <circle cx="170" cy="145" r="16" fill="#0A0118"/>
    <circle cx="170" cy="145" r="13" fill="url(#aiEye)"/>
    <circle cx="166" cy="141" r="4" fill="#fff"/>

    <circle cx="230" cy="145" r="16" fill="#0A0118"/>
    <circle cx="230" cy="145" r="13" fill="url(#aiEye)" />
    <circle cx="226" cy="141" r="4" fill="#fff"/>

    <!-- Eye glow halos -->
    <circle cx="170" cy="145" r="22" fill="#136DFF" opacity="0.25" filter="url(#aiGlow)"/>
    <circle cx="230" cy="145" r="22" fill="#FF53A9" opacity="0.25" filter="url(#aiGlow)"/>

    <!-- Mouth speaker grid -->
    <rect x="178" y="175" width="44" height="14" rx="4" fill="#0A0118" opacity="0.6"/>
    <circle cx="186" cy="182" r="2" fill="#136DFF"/>
    <circle cx="196" cy="182" r="2" fill="#136DFF"/>
    <circle cx="206" cy="182" r="2" fill="#FF53A9"/>
    <circle cx="216" cy="182" r="2" fill="#FF53A9"/>

    <!-- Side ears -->
    <rect x="120" y="130" width="15" height="30" rx="5" fill="#5A4D78"/>
    <rect x="265" y="130" width="15" height="30" rx="5" fill="#5A4D78"/>
    <circle cx="127" cy="145" r="4" fill="#FF53A9"/>
    <circle cx="273" cy="145" r="4" fill="#FF53A9"/>

    <!-- Neck -->
    <rect x="185" y="200" width="30" height="20" fill="#5A4D78"/>

    <!-- Torso -->
    <path d="M130 220 Q200 200 270 220 L280 350 Q200 370 120 350 Z" fill="url(#aiBody)"/>
    <!-- Chest plate -->
    <rect x="160" y="240" width="80" height="80" rx="16" fill="#0A0118" opacity="0.25"/>
    <!-- Heart core -->
    <circle cx="200" cy="280" r="22" fill="url(#aiHeart)"/>
    <circle cx="200" cy="280" r="22" fill="#FF53A9" opacity="0.40" filter="url(#aiGlow)"/>
    <path d="M200 290 L188 278 Q180 270 188 262 Q200 254 200 270 Q200 254 212 262 Q220 270 212 278 Z" fill="#fff" opacity="0.85"/>

    <!-- Arms -->
    <rect x="100" y="240" width="22" height="80" rx="11" fill="url(#aiBody)"/>
    <rect x="278" y="240" width="22" height="80" rx="11" fill="url(#aiBody)"/>
    <circle cx="111" cy="330" r="14" fill="#5A4D78"/>
    <circle cx="289" cy="330" r="14" fill="#5A4D78"/>

    <!-- Circuit lines -->
    <line x1="160" y1="335" x2="240" y2="335" stroke="#136DFF" stroke-width="1.5" opacity="0.6"/>
    <line x1="170" y1="345" x2="230" y2="345" stroke="#FF53A9" stroke-width="1.5" opacity="0.6"/>
  </g>

  <!-- Floating data orbs -->
  <g class="float-a" opacity="0.85">
    <circle cx="60" cy="200" r="6" fill="#136DFF"/>
    <circle cx="60" cy="200" r="10" fill="#136DFF" opacity="0.30" filter="url(#aiGlow)"/>
  </g>
  <g class="float-c" opacity="0.85">
    <circle cx="345" cy="250" r="5" fill="#FF53A9"/>
    <circle cx="345" cy="250" r="9" fill="#FF53A9" opacity="0.30" filter="url(#aiGlow)"/>
  </g>
</svg>
'''

MASCOT_DATA = '''
<!-- Mascot 3: Data Analyst with floating bar charts -->
<svg class="mascot-data w-full h-full max-w-md" viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" aria-label="3D data analyst mascot holding floating bar charts" role="img">
  <defs>
    <radialGradient id="daSkin" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFE0C2"/><stop offset="60%" stop-color="#E8A884"/><stop offset="100%" stop-color="#B47952"/>
    </radialGradient>
    <linearGradient id="daShirt" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#7B2FBE"/><stop offset="100%" stop-color="#3D1666"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#FF53A9"/><stop offset="100%" stop-color="#136DFF"/>
    </linearGradient>
    <linearGradient id="barGrad2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#136DFF"/><stop offset="100%" stop-color="#7B2FBE"/>
    </linearGradient>
    <filter id="daGlow"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>

  <!-- Ambient glow -->
  <ellipse cx="200" cy="440" rx="130" ry="18" fill="#7B2FBE" opacity="0.30" filter="url(#daGlow)"/>

  <!-- Body / coat -->
  <path d="M115 370 Q200 310 285 370 L290 460 Q200 440 110 460 Z" fill="url(#daShirt)"/>
  <path d="M170 360 L200 410 L230 360 L225 420 L175 420 Z" fill="#3D1666"/>
  <!-- Lapels -->
  <path d="M170 360 L200 410 L195 360 Z" fill="#5A1A99"/>
  <path d="M230 360 L200 410 L205 360 Z" fill="#5A1A99"/>
  <!-- Tie -->
  <path d="M195 360 L205 360 L208 410 L192 410 Z" fill="#FF53A9"/>

  <!-- Neck -->
  <rect x="180" y="240" width="40" height="55" rx="14" fill="url(#daSkin)"/>

  <!-- Head -->
  <ellipse cx="200" cy="195" rx="74" ry="82" fill="url(#daSkin)"/>
  <!-- Ears -->
  <ellipse cx="128" cy="200" rx="12" ry="18" fill="url(#daSkin)"/>
  <ellipse cx="272" cy="200" rx="12" ry="18" fill="url(#daSkin)"/>
  <!-- Glasses -->
  <circle cx="170" cy="190" r="22" fill="none" stroke="#136DFF" stroke-width="3"/>
  <circle cx="230" cy="190" r="22" fill="none" stroke="#136DFF" stroke-width="3"/>
  <line x1="192" y1="190" x2="208" y2="190" stroke="#136DFF" stroke-width="3"/>
  <!-- Glass reflection -->
  <path d="M160 180 Q170 175 178 180" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/>
  <path d="M220 180 Q230 175 238 180" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/>
  <!-- Eyes -->
  <circle cx="170" cy="190" r="6" fill="#2D1B4E"/>
  <circle cx="230" cy="190" r="6" fill="#2D1B4E"/>
  <!-- Smile -->
  <path d="M175 232 Q200 248 225 232" stroke="#7A3B23" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Hair / beard -->
  <path d="M135 140 Q170 100 200 105 Q230 100 265 140 Q260 110 200 100 Q140 110 135 140 Z" fill="#3D2860"/>
  <path d="M165 240 Q200 260 235 240 Q230 270 200 275 Q170 270 165 240 Z" fill="#3D2860" opacity="0.85"/>

  <!-- Arms raised holding chart -->
  <path d="M115 370 Q90 320 130 280 L165 295 L150 370 Z" fill="url(#daShirt)"/>
  <path d="M285 370 Q310 320 270 280 L235 295 L250 370 Z" fill="url(#daShirt)"/>
  <circle cx="140" cy="280" r="13" fill="url(#daSkin)"/>
  <circle cx="260" cy="280" r="13" fill="url(#daSkin)"/>

  <!-- Floating bar chart widget -->
  <g class="float-a" style="transform-origin: 200px 240px;">
    <rect x="135" y="220" width="130" height="90" rx="14" fill="rgba(13,0,37,0.85)" stroke="rgba(19,109,255,0.40)" stroke-width="1.5"/>
    <text x="145" y="240" font-family="Space Grotesk" font-size="10" fill="#9A8CB5">REVENUE / Q</text>
    <text x="145" y="258" font-family="Space Grotesk" font-size="18" font-weight="700" fill="#F0EBF8">$2.4M</text>
    <!-- Bars -->
    <rect x="148" y="282" width="14" height="18" rx="2" fill="url(#barGrad2)"/>
    <rect x="168" y="272" width="14" height="28" rx="2" fill="url(#barGrad)"/>
    <rect x="188" y="262" width="14" height="38" rx="2" fill="url(#barGrad2)"/>
    <rect x="208" y="252" width="14" height="48" rx="2" fill="url(#barGrad)"/>
    <rect x="228" y="242" width="14" height="58" rx="2" fill="url(#barGrad2)"/>
    <!-- Up arrow -->
    <path d="M250 290 L256 280 L262 290 Z" fill="#FF53A9"/>
  </g>

  <!-- Floating mini glass metric -->
  <g class="float-c" style="transform-origin: 320px 200px;">
    <rect x="290" y="170" width="80" height="60" rx="10" fill="rgba(13,0,37,0.85)" stroke="rgba(255,83,169,0.40)" stroke-width="1.5"/>
    <text x="298" y="188" font-family="Space Grotesk" font-size="8" fill="#9A8CB5">CONVERSION</text>
    <text x="298" y="208" font-family="Space Grotesk" font-size="16" font-weight="700" fill="#FF53A9">+38%</text>
    <!-- Sparkline -->
    <polyline points="298,222 308,218 318,214 328,208 338,202 348,196 358,188" stroke="#FF53A9" stroke-width="1.5" fill="none"/>
  </g>

  <!-- Floating mini donut -->
  <g class="float-b" style="transform-origin: 80px 200px;">
    <circle cx="80" cy="190" r="22" fill="none" stroke="rgba(19,109,255,0.20)" stroke-width="6"/>
    <circle cx="80" cy="190" r="22" fill="none" stroke="#136DFF" stroke-width="6" stroke-dasharray="100 60" transform="rotate(-90 80 190)"/>
    <text x="73" y="195" font-family="Space Grotesk" font-size="10" font-weight="700" fill="#F0EBF8">62%</text>
  </g>
</svg>
'''

# Save mascots in a dict for use across pages
MASCOTS = {"dev": MASCOT_DEV, "ai": MASCOT_AI, "data": MASCOT_DATA}

print("Part 1 (head + ambient + header + mascots) prepared.")

# ============================================================================
# PAGE 1: HOME
# ============================================================================
PAGE_HOME = '''
    <!-- ========== PAGE: HOME ========== -->
    <section data-page="home" class="page active">
      <!-- Hero -->
      <div class="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <!-- Perspective grid floor -->
        <div class="absolute inset-x-0 bottom-0 h-72 perspective-grid opacity-30" aria-hidden="true"></div>

        <div class="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left copy -->
          <div class="reveal">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft text-xs font-mono text-ckblue mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-ckpink pulse-glow"></span>
              v4 · Multi-Agent AI Platform Live
            </span>
            <h1 class="font-display text-5xl lg:text-7xl font-bold leading-[1.05] text-ckheading mb-6">
              Engineering<br/>
              <span class="grad-text">Tomorrow's Intelligence</span>,<br/>
              Today.
            </h1>
            <p class="text-lg text-ckbody max-w-xl mb-8 leading-relaxed">
              ClickTake Technologies ships production-grade software, autonomous AI agents, and cloud architecture for global enterprises — trusted by 150+ teams across 4 continents with 99.9% uptime and 10M+ API requests served every day.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold text-base shine">Book a Demo <i data-lucide="arrow-right" class="inline w-4 h-4 ml-1"></i></a>
              <a href="#cases" data-nav="cases" class="ghost-btn rounded-xl px-7 py-3.5 font-display font-semibold text-base">View Case Studies</a>
            </div>
            <!-- Trust strip -->
            <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ckbody/70 font-mono">
              <span class="flex items-center gap-1.5"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-ckblue"></i>SOC 2 Type II</span>
              <span class="flex items-center gap-1.5"><i data-lucide="cloud" class="w-3.5 h-3.5 text-ckblue"></i>AWS · GCP · Azure</span>
              <span class="flex items-center gap-1.5"><i data-lucide="zap" class="w-3.5 h-3.5 text-ckpink"></i>99.9% SLA</span>
              <span class="flex items-center gap-1.5"><i data-lucide="lock" class="w-3.5 h-3.5 text-ckpink"></i>GDPR · CCPA</span>
            </div>
          </div>

          <!-- Right: Mascot 1 + 3D dashboard stage -->
          <div class="relative reveal">
            <!-- Holo ring behind -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div class="holo-ring w-[420px] h-[420px] rounded-full opacity-25"></div>
            </div>
            <!-- Mascot -->
            <div class="relative mascot-stage h-[440px] lg:h-[520px]">
              ''' + MASCOTS["dev"] + '''
            </div>
            <!-- Floating metric chip -->
            <div class="absolute top-6 right-2 lg:right-6 glass rounded-2xl p-3.5 float-a w-44" aria-hidden="true">
              <div class="text-[10px] font-mono text-ckbody uppercase tracking-wider">Build Pipeline</div>
              <div class="font-display font-bold text-2xl text-ckheading mt-1">98<span class="text-ckblue">%</span></div>
              <div class="text-[11px] text-ckbody/70 mt-0.5">Test coverage</div>
              <div class="h-1 bg-ckbody/15 rounded-full mt-2 overflow-hidden">
                <div class="h-full w-[98%] rounded-full" style="background:linear-gradient(90deg,#136DFF,#FF53A9);"></div>
              </div>
            </div>
            <!-- Floating metric chip 2 -->
            <div class="absolute bottom-12 -left-2 lg:left-0 glass rounded-2xl p-3.5 float-c w-40" aria-hidden="true">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-ckpink pulse-glow"></span>
                <span class="text-[10px] font-mono text-ckbody uppercase tracking-wider">Live Deploy</span>
              </div>
              <div class="font-display font-bold text-lg text-ckheading mt-1">+1,284</div>
              <div class="text-[11px] text-ckbody/70">commits this week</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 pb-16">
        <div class="glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center lg:text-left">
              <div class="stat-num grad-text" data-counter="99.9" data-suffix="%">0%</div>
              <div class="text-sm text-ckbody mt-2 font-medium">Uptime SLA</div>
              <div class="text-xs text-ckbody/60 mt-1">Across all production environments</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="stat-num grad-text" data-counter="150" data-suffix="+">0</div>
              <div class="text-sm text-ckbody mt-2 font-medium">Enterprise Apps</div>
              <div class="text-xs text-ckbody/60 mt-1">Shipped to production since 2019</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="stat-num grad-text" data-counter="40" data-suffix="%">0%</div>
              <div class="text-sm text-ckbody mt-2 font-medium">AI Workflow Efficiency</div>
              <div class="text-xs text-ckbody/60 mt-1">Avg. lift across client base</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="stat-num grad-text" data-counter="10" data-suffix="M+">0</div>
              <div class="text-sm text-ckbody mt-2 font-medium">API Requests / Day</div>
              <div class="text-xs text-ckbody/60 mt-1">Served at p99 &lt; 120ms</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3D Glass Services Overview -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div class="text-center max-w-2xl mx-auto mb-14 reveal">
          <span class="tag mb-4 inline-flex"><i data-lucide="layers" class="w-3.5 h-3.5"></i>Core Capabilities</span>
          <h2 class="font-display text-4xl lg:text-5xl font-bold text-ckheading mb-4">Four pillars. <span class="grad-text-violet">One delivery engine.</span></h2>
          <p class="text-ckbody">Every ClickTake engagement is structured around four tightly-integrated practices. They share the same design system, the same observability stack, and the same engineering bar — so your roadmap ships as one coherent product, not four vendor handoffs.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card 1 -->
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style="background:linear-gradient(135deg,rgba(19,109,255,0.25),rgba(19,109,255,0.05));border:1px solid rgba(19,109,255,0.30);">
                <i data-lucide="code-2" class="w-6 h-6 text-ckblue"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">Custom Web & Mobile</h3>
              <p class="text-sm text-ckbody leading-relaxed mb-4">Next.js 16, React Native, Flutter. Production apps with design systems, observability, and CI/CD baked in from day one.</p>
              <ul class="text-xs text-ckbody/80 space-y-1.5 font-mono">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckblue"></i>Next.js 16 · React 19</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckblue"></i>Design system + Storybook</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckblue"></i>E2E Playwright suite</li>
              </ul>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style="background:linear-gradient(135deg,rgba(255,83,169,0.25),rgba(255,83,169,0.05));border:1px solid rgba(255,83,169,0.30);">
                <i data-lucide="cloud" class="w-6 h-6 text-ckpink"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">Cloud & DevOps</h3>
              <p class="text-sm text-ckbody leading-relaxed mb-4">AWS, GCP, Azure. IaC with Terraform, GitOps with ArgoCD, observability with OpenTelemetry + Grafana stack.</p>
              <ul class="text-xs text-ckbody/80 space-y-1.5 font-mono">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckpink"></i>Terraform · ArgoCD</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckpink"></i>K8s autoscaling</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckpink"></i>p99 &lt; 120ms SLAs</li>
              </ul>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style="background:linear-gradient(135deg,rgba(123,47,190,0.25),rgba(123,47,190,0.05));border:1px solid rgba(123,47,190,0.40);">
                <i data-lucide="brain-circuit" class="w-6 h-6 text-ckpurple"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">AI / ML Pipelines</h3>
              <p class="text-sm text-ckbody leading-relaxed mb-4">Multi-agent orchestration, RAG over your enterprise data, custom LLM fine-tuning. From PoC to production in 6 weeks.</p>
              <ul class="text-xs text-ckbody/80 space-y-1.5 font-mono">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckpurple"></i>LangGraph · OpenAI · Anthropic</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckpurple"></i>Pinecone · Weaviate · pgvector</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckpurple"></i>vLLM serving</li>
              </ul>
            </div>
          </div>
          <!-- Card 4 -->
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style="background:linear-gradient(135deg,rgba(19,109,255,0.25),rgba(255,83,169,0.05));border:1px solid rgba(255,83,169,0.30);">
                <i data-lucide="shield-check" class="w-6 h-6 text-ckblue"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">Security Systems</h3>
              <p class="text-sm text-ckbody leading-relaxed mb-4">Zero-trust architectures, SOC 2 Type II audit prep, SAST/DAST in CI, pen-test remediation. Compliance as code.</p>
              <ul class="text-xs text-ckbody/80 space-y-1.5 font-mono">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckblue"></i>SOC 2 · HIPAA · GDPR</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckblue"></i>Semgrep · Snyk · OWASP</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-3 h-3 text-ckblue"></i>WAF + Bot defense</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center mt-10 reveal">
          <a href="#services" data-nav="services" class="ghost-btn rounded-xl px-6 py-3 font-display font-semibold text-sm inline-flex items-center gap-2">Explore all services <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
        </div>
      </div>

      <!-- Interactive Case Metric Sliders -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div class="grid lg:grid-cols-3 gap-8 items-center">
          <div class="lg:col-span-1 reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="bar-chart-3" class="w-3.5 h-3.5"></i>Production Impact</span>
            <h2 class="font-display text-4xl font-bold text-ckheading mb-4">Numbers that <span class="grad-text">compounded</span>.</h2>
            <p class="text-ckbody mb-6">Three real client outcomes from the past 18 months. Each metric is measured against the client's pre-engagement baseline and verified by their analytics team.</p>
            <a href="#cases" data-nav="cases" class="glow-btn rounded-xl px-6 py-3 font-display font-semibold text-sm">Read full case studies</a>
          </div>
          <div class="lg:col-span-2 grid sm:grid-cols-3 gap-4 reveal">
            <div class="glass rounded-2xl p-6">
              <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-2">FinTech · Latency</div>
              <div class="font-display font-bold text-3xl text-ckheading">−72%</div>
              <div class="text-xs text-ckbody mt-1">p99 API latency</div>
              <div class="mt-4 h-1.5 bg-ckbody/15 rounded-full overflow-hidden">
                <div class="h-full w-[72%] rounded-full" style="background:linear-gradient(90deg,#136DFF,#FF53A9);"></div>
              </div>
            </div>
            <div class="glass rounded-2xl p-6">
              <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-2">E-commerce · CVR</div>
              <div class="font-display font-bold text-3xl text-ckheading">+38%</div>
              <div class="text-xs text-ckbody mt-1">Checkout conversion</div>
              <div class="mt-4 h-1.5 bg-ckbody/15 rounded-full overflow-hidden">
                <div class="h-full w-[38%] rounded-full" style="background:linear-gradient(90deg,#FF53A9,#7B2FBE);"></div>
              </div>
            </div>
            <div class="glass rounded-2xl p-6">
              <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-2">Healthcare · Cost</div>
              <div class="font-display font-bold text-3xl text-ckheading">−$1.4M</div>
              <div class="text-xs text-ckbody mt-1">Annual cloud spend</div>
              <div class="mt-4 h-1.5 bg-ckbody/15 rounded-full overflow-hidden">
                <div class="h-full w-[58%] rounded-full" style="background:linear-gradient(90deg,#7B2FBE,#136DFF);"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Global CTA Capsule with Mascot 2 -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div class="glass rounded-3xl overflow-hidden relative">
          <div class="absolute inset-0 opacity-30" aria-hidden="true">
            <div class="absolute top-0 right-0 w-80 h-80 rounded-full" style="background:radial-gradient(circle,#7B2FBE,transparent 70%);"></div>
            <div class="absolute bottom-0 left-1/3 w-72 h-72 rounded-full" style="background:radial-gradient(circle,#FF53A9,transparent 70%);"></div>
          </div>
          <div class="relative grid lg:grid-cols-5 items-center gap-8 p-8 lg:p-12">
            <div class="lg:col-span-3 reveal">
              <h2 class="font-display text-3xl lg:text-5xl font-bold text-ckheading leading-tight mb-4">
                Ready to deploy <span class="grad-text">your AI workforce?</span>
              </h2>
              <p class="text-ckbody text-lg max-w-xl mb-6">Book a 30-minute architecture review. We'll map your roadmap, identify the highest-ROI automation, and ship a working PoC within 6 weeks.</p>
              <div class="flex flex-wrap items-center gap-4">
                <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold">Book a Demo</a>
                <a href="mailto:info@clicktaketech.com" class="ghost-btn rounded-xl px-7 py-3.5 font-display font-semibold text-sm inline-flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4"></i>info@clicktaketech.com</a>
              </div>
            </div>
            <div class="lg:col-span-2 relative h-72 reveal">
              ''' + MASCOTS["ai"] + '''
            </div>
          </div>
        </div>
      </div>

      <!-- Tech marquee -->
      <div class="py-10 overflow-hidden">
        <div class="marquee-track text-ckbody/50 font-mono text-sm whitespace-nowrap">
          <span class="flex items-center gap-2"><i data-lucide="code" class="w-4 h-4"></i>Next.js 16</span>
          <span class="flex items-center gap-2"><i data-lucide="terminal" class="w-4 h-4"></i>Python</span>
          <span class="flex items-center gap-2"><i data-lucide="brain" class="w-4 h-4"></i>OpenAI</span>
          <span class="flex items-center gap-2"><i data-lucide="box" class="w-4 h-4"></i>Docker</span>
          <span class="flex items-center gap-2"><i data-lucide="database" class="w-4 h-4"></i>PostgreSQL</span>
          <span class="flex items-center gap-2"><i data-lucide="cloud" class="w-4 h-4"></i>AWS</span>
          <span class="flex items-center gap-2"><i data-lucide="zap" class="w-4 h-4"></i>Vercel</span>
          <span class="flex items-center gap-2"><i data-lucide="git-branch" class="w-4 h-4"></i>Terraform</span>
          <span class="flex items-center gap-2"><i data-lucide="code" class="w-4 h-4"></i>Next.js 16</span>
          <span class="flex items-center gap-2"><i data-lucide="terminal" class="w-4 h-4"></i>Python</span>
          <span class="flex items-center gap-2"><i data-lucide="brain" class="w-4 h-4"></i>OpenAI</span>
          <span class="flex items-center gap-2"><i data-lucide="box" class="w-4 h-4"></i>Docker</span>
          <span class="flex items-center gap-2"><i data-lucide="database" class="w-4 h-4"></i>PostgreSQL</span>
          <span class="flex items-center gap-2"><i data-lucide="cloud" class="w-4 h-4"></i>AWS</span>
          <span class="flex items-center gap-2"><i data-lucide="zap" class="w-4 h-4"></i>Vercel</span>
          <span class="flex items-center gap-2"><i data-lucide="git-branch" class="w-4 h-4"></i>Terraform</span>
        </div>
      </div>
    </section>
'''

# ============================================================================
# PAGE 2: SERVICES
# ============================================================================
PAGE_SERVICES = '''
    <!-- ========== PAGE: SERVICES ========== -->
    <section data-page="services" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Services</span>
          </nav>
          <div class="max-w-3xl reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="wrench" class="w-3.5 h-3.5"></i>What we build</span>
            <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">Full-spectrum <span class="grad-text">engineering services</span>.</h1>
            <p class="text-lg text-ckbody leading-relaxed">From the first whiteboard sketch to a 24/7 production command center, ClickTake owns the entire delivery lifecycle. We embed senior engineers (8+ yrs avg), ship every two weeks, and hand over an architecture your team can actually maintain.</p>
          </div>
        </div>
      </div>

      <!-- Service deep-dive grid -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="space-y-6">
          <!-- Service 1: Web/Mobile -->
          <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
            <div class="tilt-layer grid lg:grid-cols-3 gap-8 items-start">
              <div class="lg:col-span-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,rgba(19,109,255,0.30),rgba(19,109,255,0.05));border:1px solid rgba(19,109,255,0.40);">
                    <i data-lucide="code-2" class="w-6 h-6 text-ckblue"></i>
                  </div>
                  <span class="font-mono text-xs text-ckbody/70">01 / Web & Mobile</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-3">Custom Web & Mobile Apps</h2>
                <p class="text-sm text-ckbody leading-relaxed">Production-grade applications built on Next.js 16, React Native, and Flutter. We don't ship prototypes — we ship products with design systems, observability, CI/CD, and E2E test coverage from day one.</p>
              </div>
              <div class="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckblue uppercase tracking-wider mb-3">Stack</div>
                  <div class="flex flex-wrap gap-2">
                    <span class="tag">Next.js 16</span><span class="tag">React 19</span><span class="tag">TypeScript</span><span class="tag">React Native</span><span class="tag">Flutter</span><span class="tag">Tailwind</span><span class="tag">Prisma</span>
                  </div>
                </div>
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckpink uppercase tracking-wider mb-3">Deliverables</div>
                  <ul class="text-sm text-ckbody space-y-1.5">
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Design system + Storybook</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Playwright E2E suite</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Lighthouse 95+ baseline</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>WCAG 2.2 AA compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Service 2: Cloud DevOps -->
          <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
            <div class="tilt-layer grid lg:grid-cols-3 gap-8 items-start">
              <div class="lg:col-span-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,rgba(255,83,169,0.30),rgba(255,83,169,0.05));border:1px solid rgba(255,83,169,0.40);">
                    <i data-lucide="cloud" class="w-6 h-6 text-ckpink"></i>
                  </div>
                  <span class="font-mono text-xs text-ckbody/70">02 / Cloud DevOps</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-3">Enterprise Cloud DevOps</h2>
                <p class="text-sm text-ckbody leading-relaxed">AWS, GCP, Azure — pick one or all three. We deliver infrastructure-as-code, GitOps pipelines, autoscaling K8s clusters, and observability stacks that surface regressions before your users do.</p>
              </div>
              <div class="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckpink uppercase tracking-wider mb-3">Stack</div>
                  <div class="flex flex-wrap gap-2">
                    <span class="tag">AWS</span><span class="tag">GCP</span><span class="tag">Azure</span><span class="tag">Terraform</span><span class="tag">ArgoCD</span><span class="tag">Kubernetes</span><span class="tag">OpenTelemetry</span><span class="tag">Grafana</span>
                  </div>
                </div>
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckblue uppercase tracking-wider mb-3">Deliverables</div>
                  <ul class="text-sm text-ckbody space-y-1.5">
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckblue mt-0.5"></i>Terraform modules library</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckblue mt-0.5"></i>GitOps release pipeline</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckblue mt-0.5"></i>Cost optimization (avg 35%↓)</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckblue mt-0.5"></i>24/7 on-call runbook</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Service 3: AI/ML -->
          <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
            <div class="tilt-layer grid lg:grid-cols-3 gap-8 items-start">
              <div class="lg:col-span-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,rgba(123,47,190,0.30),rgba(123,47,190,0.05));border:1px solid rgba(123,47,190,0.50);">
                    <i data-lucide="brain-circuit" class="w-6 h-6 text-ckpurple"></i>
                  </div>
                  <span class="font-mono text-xs text-ckbody/70">03 / AI & ML</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-3">AI / ML Pipelines</h2>
                <p class="text-sm text-ckbody leading-relaxed">From RAG over your internal knowledge base to multi-agent orchestration handling real customer workflows. We move from PoC to production in 6 weeks — with evals, guardrails, and human-in-loop fallbacks.</p>
              </div>
              <div class="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckpurple uppercase tracking-wider mb-3">Stack</div>
                  <div class="flex flex-wrap gap-2">
                    <span class="tag">LangGraph</span><span class="tag">OpenAI</span><span class="tag">Anthropic</span><span class="tag">Pinecone</span><span class="tag">Weaviate</span><span class="tag">pgvector</span><span class="tag">vLLM</span><span class="tag">LangSmith</span>
                  </div>
                </div>
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckpink uppercase tracking-wider mb-3">Deliverables</div>
                  <ul class="text-sm text-ckbody space-y-1.5">
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Multi-agent orchestration</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Enterprise RAG (10M+ docs)</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Custom LLM fine-tuning</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Eval harness + guardrails</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Service 4: Security -->
          <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
            <div class="tilt-layer grid lg:grid-cols-3 gap-8 items-start">
              <div class="lg:col-span-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,rgba(19,109,255,0.30),rgba(255,83,169,0.05));border:1px solid rgba(19,109,255,0.40);">
                    <i data-lucide="shield-check" class="w-6 h-6 text-ckblue"></i>
                  </div>
                  <span class="font-mono text-xs text-ckbody/70">04 / Security</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-3">Security Systems</h2>
                <p class="text-sm text-ckbody leading-relaxed">Zero-trust architectures, compliance as code, and pen-test-ready hardening. We've taken 20+ clients through SOC 2 Type II audit prep with zero findings on first attempt.</p>
              </div>
              <div class="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckblue uppercase tracking-wider mb-3">Stack</div>
                  <div class="flex flex-wrap gap-2">
                    <span class="tag">Semgrep</span><span class="tag">Snyk</span><span class="tag">OWASP ZAP</span><span class="tag">HashiCorp Vault</span><span class="tag">Cloudflare WAF</span><span class="tag">Auth0</span>
                  </div>
                </div>
                <div class="glass-soft rounded-xl p-5">
                  <div class="text-xs font-mono text-ckpink uppercase tracking-wider mb-3">Deliverables</div>
                  <ul class="text-sm text-ckbody space-y-1.5">
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>SOC 2 / HIPAA / GDPR prep</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>SAST + DAST in CI</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Pen-test remediation</li>
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-ckpink mt-0.5"></i>Zero-trust network design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4-Step Workflow -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div class="text-center max-w-2xl mx-auto mb-14 reveal">
          <span class="tag mb-4 inline-flex"><i data-lucide="git-branch" class="w-3.5 h-3.5"></i>How we work</span>
          <h2 class="font-display text-4xl lg:text-5xl font-bold text-ckheading mb-4">Four steps. <span class="grad-text-violet">Six weeks to live.</span></h2>
          <p class="text-ckbody">Our delivery cadence is the same on every engagement — it's what lets us hit timelines and ship maintainable code. Here's what happens after you sign.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="tilt-card glass rounded-2xl p-6 reveal relative">
            <div class="tilt-layer">
              <div class="text-xs font-mono text-ckblue mb-4">STEP 01</div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#136DFF,#7B2FBE);">
                <i data-lucide="search" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">Discovery</h3>
              <p class="text-sm text-ckbody leading-relaxed">2-week deep dive. Stakeholder interviews, architecture audit, competitive scan. We end with a written engineering roadmap.</p>
              <div class="mt-4 text-xs font-mono text-ckbody/60">Week 1–2</div>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal relative">
            <div class="tilt-layer">
              <div class="text-xs font-mono text-ckpink mb-4">STEP 02</div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#FF53A9,#7B2FBE);">
                <i data-lucide="box" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">3D Prototyping</h3>
              <p class="text-sm text-ckbody leading-relaxed">Clickable Figma + design system tokens + component library skeleton. You click through the actual product before we write a line of backend code.</p>
              <div class="mt-4 text-xs font-mono text-ckbody/60">Week 3–4</div>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal relative">
            <div class="tilt-layer">
              <div class="text-xs font-mono text-ckpurple mb-4">STEP 03</div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#7B2FBE,#136DFF);">
                <i data-lucide="git-merge" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">Agile Sprints</h3>
              <p class="text-sm text-ckbody leading-relaxed">2-week sprints with live staging URL, demo every Friday, Slack channel with the team. You see code shipping in week 5.</p>
              <div class="mt-4 text-xs font-mono text-ckbody/60">Week 5–10</div>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal relative">
            <div class="tilt-layer">
              <div class="text-xs font-mono text-ckblue mb-4">STEP 04</div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                <i data-lucide="rocket" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-xl text-ckheading mb-2">Deploy & Scale</h3>
              <p class="text-sm text-ckbody leading-relaxed">Production cutover with full observability, on-call runbook, and 30-day hyper-care window. Then we hand over a system your team owns.</p>
              <div class="mt-4 text-xs font-mono text-ckbody/60">Week 11+</div>
            </div>
          </div>
        </div>

        <!-- Workflow guide mascot strip -->
        <div class="mt-12 glass rounded-3xl p-8 reveal">
          <div class="grid lg:grid-cols-4 gap-6 items-center">
            <div class="lg:col-span-3">
              <h3 class="font-display text-2xl font-bold text-ckheading mb-2">A dedicated lead engineer owns your project end-to-end.</h3>
              <p class="text-ckbody text-sm">No account managers, no offshore handoffs. The person you talk to in the kickoff is the person writing the architecture decision records.</p>
            </div>
            <div class="h-32">
              ''' + MASCOTS["ai"] + '''
            </div>
          </div>
        </div>
      </div>
    </section>
'''

print("Part 2 (home + services) prepared.")

# ============================================================================
# PAGE 3: SOLUTIONS / AI PLATFORM
# ============================================================================
PAGE_SOLUTIONS = '''
    <!-- ========== PAGE: SOLUTIONS / AI PLATFORM ========== -->
    <section data-page="solutions" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Solutions</span>
          </nav>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="reveal">
              <span class="tag mb-4 inline-flex"><i data-lucide="cpu" class="w-3.5 h-3.5"></i>AI Platform</span>
              <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">
                The <span class="grad-text">ClickTake AI Platform</span> — production agents, not demos.
              </h1>
              <p class="text-lg text-ckbody leading-relaxed mb-6">Three layered capabilities that turn frontier LLMs into business infrastructure. Multi-agent orchestration routes work between specialized agents. Enterprise RAG grounds every answer in your private data. Custom fine-tuning compresses cost and latency for your highest-volume workflows.</p>
              <div class="flex flex-wrap gap-3">
                <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-6 py-3 font-display font-semibold text-sm">Request architecture review</a>
                <a href="#cases" data-nav="cases" class="ghost-btn rounded-xl px-6 py-3 font-display font-semibold text-sm">See it in production</a>
              </div>
            </div>
            <div class="relative h-80 reveal">
              ''' + MASCOTS["ai"] + '''
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Matrix -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="glass rounded-3xl overflow-hidden">
          <!-- Header row -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-charcoal/80 p-6">
              <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-2">Capability</div>
              <div class="font-display font-bold text-ckheading">Feature Matrix</div>
            </div>
            <div class="bg-charcoal/80 p-6">
              <div class="text-xs font-mono text-ckblue uppercase tracking-wider mb-2">Multi-Agent Orchestration</div>
              <div class="font-display font-bold text-ckheading text-sm">LangGraph + custom router</div>
            </div>
            <div class="bg-charcoal/80 p-6">
              <div class="text-xs font-mono text-ckpink uppercase tracking-wider mb-2">Enterprise RAG Engine</div>
              <div class="font-display font-bold text-ckheading text-sm">Hybrid · 10M+ docs</div>
            </div>
            <div class="bg-charcoal/80 p-6">
              <div class="text-xs font-mono text-ckpurple uppercase tracking-wider mb-2">Custom LLM Fine-Tuning</div>
              <div class="font-display font-bold text-ckheading text-sm">LoRA · QLoRA · DPO</div>
            </div>
          </div>

          <!-- Rows -->
          <!-- Row 1 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-midnight/80 p-6 text-sm text-ckbody">Max context window</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">2M tokens (Claude)</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">128k chunked + reranked</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Up to 32k trained</div>
          </div>
          <!-- Row 2 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-midnight/80 p-6 text-sm text-ckbody">Vector store</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Pinecone · Weaviate · pgvector</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">All three + hybrid BM25</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">In-model weights</div>
          </div>
          <!-- Row 3 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-midnight/80 p-6 text-sm text-ckbody">Observability</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">LangSmith traces</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Retrieval evals (RAGAS)</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Weights & Biases</div>
          </div>
          <!-- Row 4 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-midnight/80 p-6 text-sm text-ckbody">Guardrails</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Tool-call schema + human-in-loop</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Citation + grounded checks</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Constitutional DPO</div>
          </div>
          <!-- Row 5 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-midnight/80 p-6 text-sm text-ckbody">Deployment</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">vLLM · Triton · Bedrock</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Hybrid (cloud + on-prem)</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">Single-GPU LoRA swap</div>
          </div>
          <!-- Row 6 -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-px bg-ckbody/10">
            <div class="bg-midnight/80 p-6 text-sm text-ckbody">SLA / Latency</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">p99 &lt; 800ms (stream)</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">p99 &lt; 120ms (retrieve)</div>
            <div class="bg-midnight/80 p-6 text-sm text-ckheading font-mono">p99 &lt; 200ms (infer)</div>
          </div>
        </div>
      </div>

      <!-- Three capability deep-dives -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12 space-y-6">
        <!-- Multi-Agent Orchestration -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#7B2FBE);">
                  <i data-lucide="network" class="w-5 h-5 text-white"></i>
                </div>
                <span class="font-mono text-xs text-ckblue uppercase tracking-wider">Capability 01</span>
              </div>
              <h2 class="font-display text-3xl font-bold text-ckheading mb-4">Multi-Agent Orchestration</h2>
              <p class="text-ckbody mb-5 leading-relaxed">A custom LangGraph-based router that decomposes complex workflows into specialized agents — research, retrieval, code-gen, validation, and human-escalation — each with scoped tools and policies. Agents communicate through typed state, so you can replay any decision and audit every tool call.</p>
              <ul class="space-y-2.5 text-sm text-ckbody">
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckblue mt-0.5 flex-shrink-0"></i>Up to 12 specialized agents per workflow, each with scoped tool access.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckblue mt-0.5 flex-shrink-0"></i>Typed state graph (LangGraph) — every decision is replayable and auditable.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckblue mt-0.5 flex-shrink-0"></i>Human-in-loop escalation on low-confidence branches (configurable threshold).</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckblue mt-0.5 flex-shrink-0"></i>Cost ceiling per run — auto-fallback to smaller model on budget breach.</li>
              </ul>
            </div>
            <!-- Architecture diagram (CSS) -->
            <div class="relative h-80 glass-soft rounded-2xl p-6">
              <div class="absolute inset-0 perspective-grid opacity-20 rounded-2xl"></div>
              <div class="relative h-full flex flex-col items-center justify-center gap-3">
                <!-- Router node -->
                <div class="px-5 py-3 rounded-xl text-center" style="background:linear-gradient(135deg,#136DFF,#FF53A9);box-shadow:0 0 30px rgba(19,109,255,0.5);">
                  <div class="text-[10px] font-mono text-white/80 uppercase">Router</div>
                  <div class="font-display font-bold text-white">Orchestrator</div>
                </div>
                <div class="w-px h-4 bg-ckblue/40"></div>
                <!-- Branch row -->
                <div class="grid grid-cols-3 gap-3 w-full max-w-md">
                  <div class="glass rounded-lg p-3 text-center">
                    <i data-lucide="search" class="w-4 h-4 text-ckblue mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckheading">Research</div>
                  </div>
                  <div class="glass rounded-lg p-3 text-center">
                    <i data-lucide="database" class="w-4 h-4 text-ckpink mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckheading">Retrieval</div>
                  </div>
                  <div class="glass rounded-lg p-3 text-center">
                    <i data-lucide="code" class="w-4 h-4 text-ckpurple mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckheading">Code-Gen</div>
                  </div>
                </div>
                <div class="w-px h-4 bg-ckpink/40"></div>
                <div class="grid grid-cols-2 gap-3 w-full max-w-sm">
                  <div class="glass rounded-lg p-3 text-center">
                    <i data-lucide="shield-check" class="w-4 h-4 text-ckblue mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckheading">Validator</div>
                  </div>
                  <div class="glass rounded-lg p-3 text-center">
                    <i data-lucide="user-check" class="w-4 h-4 text-ckpink mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckheading">Human-Escalate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enterprise RAG -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer grid lg:grid-cols-2 gap-10 items-center">
            <div class="order-2 lg:order-1 relative h-80 glass-soft rounded-2xl p-6">
              <div class="absolute inset-0 perspective-grid opacity-20 rounded-2xl"></div>
              <div class="relative h-full flex flex-col justify-center gap-3">
                <div class="glass rounded-lg p-3 flex items-center gap-3">
                  <i data-lucide="file-text" class="w-5 h-5 text-ckpink flex-shrink-0"></i>
                  <div class="flex-1">
                    <div class="text-[10px] font-mono text-ckbody">Source: 10M+ docs</div>
                    <div class="h-1.5 bg-ckbody/15 rounded-full mt-1 overflow-hidden"><div class="h-full w-[85%]" style="background:linear-gradient(90deg,#FF53A9,#7B2FBE);"></div></div>
                  </div>
                </div>
                <div class="glass rounded-lg p-3 flex items-center gap-3">
                  <i data-lucide="scissors" class="w-5 h-5 text-ckblue flex-shrink-0"></i>
                  <div class="flex-1">
                    <div class="text-[10px] font-mono text-ckbody">Chunk + embed</div>
                    <div class="h-1.5 bg-ckbody/15 rounded-full mt-1 overflow-hidden"><div class="h-full w-[92%]" style="background:linear-gradient(90deg,#136DFF,#FF53A9);"></div></div>
                  </div>
                </div>
                <div class="glass rounded-lg p-3 flex items-center gap-3">
                  <i data-lucide="search" class="w-5 h-5 text-ckpurple flex-shrink-0"></i>
                  <div class="flex-1">
                    <div class="text-[10px] font-mono text-ckbody">Hybrid: BM25 + vector</div>
                    <div class="h-1.5 bg-ckbody/15 rounded-full mt-1 overflow-hidden"><div class="h-full w-[78%]" style="background:linear-gradient(90deg,#7B2FBE,#136DFF);"></div></div>
                  </div>
                </div>
                <div class="glass rounded-lg p-3 flex items-center gap-3">
                  <i data-lucide="filter" class="w-5 h-5 text-ckpink flex-shrink-0"></i>
                  <div class="flex-1">
                    <div class="text-[10px] font-mono text-ckbody">Rerank (cross-encoder)</div>
                    <div class="h-1.5 bg-ckbody/15 rounded-full mt-1 overflow-hidden"><div class="h-full w-[88%]" style="background:linear-gradient(90deg,#FF53A9,#136DFF);"></div></div>
                  </div>
                </div>
                <div class="glass rounded-lg p-3 flex items-center gap-3">
                  <i data-lucide="quote" class="w-5 h-5 text-ckblue flex-shrink-0"></i>
                  <div class="flex-1">
                    <div class="text-[10px] font-mono text-ckbody">Cited answer + sources</div>
                    <div class="h-1.5 bg-ckbody/15 rounded-full mt-1 overflow-hidden"><div class="h-full w-[96%]" style="background:linear-gradient(90deg,#136DFF,#FF53A9);"></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#FF53A9,#7B2FBE);">
                  <i data-lucide="database" class="w-5 h-5 text-white"></i>
                </div>
                <span class="font-mono text-xs text-ckpink uppercase tracking-wider">Capability 02</span>
              </div>
              <h2 class="font-display text-3xl font-bold text-ckheading mb-4">Enterprise RAG Engine</h2>
              <p class="text-ckbody mb-5 leading-relaxed">A hybrid retrieval pipeline that scales to 10M+ documents while keeping p99 retrieval latency under 120ms. BM25 + dense vector + cross-encoder reranking means your agents cite the right paragraph, not just the right neighborhood.</p>
              <ul class="space-y-2.5 text-sm text-ckbody">
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpink mt-0.5 flex-shrink-0"></i>Hybrid retrieval: BM25 + dense (Cohere / OpenAI / custom embeddings).</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpink mt-0.5 flex-shrink-0"></i>Cross-encoder rerank top-K (BGE-reranker, Cohere Rerank).</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpink mt-0.5 flex-shrink-0"></i>Per-document ACL — agents only see what the user can see.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpink mt-0.5 flex-shrink-0"></i>Citation rendering with source preview + page-level deep links.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpink mt-0.5 flex-shrink-0"></i>RAGAS evals in CI — every prompt change scored on faithfulness.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Custom LLM Fine-Tuning -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#7B2FBE,#136DFF);">
                  <i data-lucide="sliders-horizontal" class="w-5 h-5 text-white"></i>
                </div>
                <span class="font-mono text-xs text-ckpurple uppercase tracking-wider">Capability 03</span>
              </div>
              <h2 class="font-display text-3xl font-bold text-ckheading mb-4">Custom LLM Fine-Tuning</h2>
              <p class="text-ckbody mb-5 leading-relaxed">When you have 50k+ examples of a workflow that matters, fine-tuning compresses cost and latency by 5–10× compared to GPT-4 prompts. We handle dataset curation, LoRA/QLoRA training, DPO alignment, and safe rollout side-by-side with the prompt-version baseline.</p>
              <ul class="space-y-2.5 text-sm text-ckbody">
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpurple mt-0.5 flex-shrink-0"></i>LoRA + QLoRA for single-GPU training (Llama 3, Mistral, Qwen).</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpurple mt-0.5 flex-shrink-0"></i>DPO / RLHF alignment for tone, safety, brand voice.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpurple mt-0.5 flex-shrink-0"></i>Side-by-side eval harness — fine-tuned vs. prompt-baseline, every release.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpurple mt-0.5 flex-shrink-0"></i>vLLM serving with hot-swap LoRA adapters — zero downtime.</li>
                <li class="flex items-start gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-ckpurple mt-0.5 flex-shrink-0"></i>Typical savings: 5–10× cost, 3–4× latency at parity quality.</li>
              </ul>
            </div>
            <div class="relative h-80 glass-soft rounded-2xl p-6 flex flex-col justify-center">
              <div class="text-center mb-4">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider">Cost per 1M tokens</div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-xs font-mono mb-1">
                    <span class="text-ckbody">GPT-4 baseline</span>
                    <span class="text-ckheading">$30.00</span>
                  </div>
                  <div class="h-3 bg-ckbody/15 rounded-full overflow-hidden"><div class="h-full w-full" style="background:linear-gradient(90deg,#7A6F94,#9A8CB5);"></div></div>
                </div>
                <div>
                  <div class="flex justify-between text-xs font-mono mb-1">
                    <span class="text-ckbody">Fine-tuned Llama 3 70B (LoRA)</span>
                    <span class="text-ckheading">$4.20</span>
                  </div>
                  <div class="h-3 bg-ckbody/15 rounded-full overflow-hidden"><div class="h-full w-[14%]" style="background:linear-gradient(90deg,#136DFF,#FF53A9);"></div></div>
                </div>
                <div>
                  <div class="flex justify-between text-xs font-mono mb-1">
                    <span class="text-ckbody">Fine-tuned Mistral 7B (QLoRA)</span>
                    <span class="text-ckheading">$0.80</span>
                  </div>
                  <div class="h-3 bg-ckbody/15 rounded-full overflow-hidden"><div class="h-full w-[3%]" style="background:linear-gradient(90deg,#7B2FBE,#136DFF);"></div></div>
                </div>
              </div>
              <div class="mt-6 text-center text-xs font-mono text-ckpink">↓ 37× cost reduction · 4× latency improvement</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integration partners -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="glass rounded-3xl p-8 reveal">
          <div class="text-center mb-8">
            <span class="tag mb-3 inline-flex"><i data-lucide="plug" class="w-3.5 h-3.5"></i>Integrations</span>
            <h3 class="font-display text-2xl font-bold text-ckheading">Works with your existing stack</h3>
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="cloud" class="w-6 h-6 text-ckblue mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">AWS</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="cloud" class="w-6 h-6 text-ckpink mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">GCP</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="cloud" class="w-6 h-6 text-ckpurple mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">Azure</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="box" class="w-6 h-6 text-ckblue mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">Docker</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="database" class="w-6 h-6 text-ckpink mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">Postgres</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="zap" class="w-6 h-6 text-ckpurple mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">Vercel</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="git-branch" class="w-6 h-6 text-ckblue mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">GitHub</div>
            </div>
            <div class="glass-soft rounded-xl p-4 text-center hover:border-ckblue/40 transition-colors cursor-default">
              <i data-lucide="slack" class="w-6 h-6 text-ckpink mx-auto mb-2"></i>
              <div class="text-xs font-mono text-ckbody">Slack</div>
            </div>
          </div>
        </div>
      </div>
    </section>
'''

print("Part 3 (solutions) prepared.")

# ============================================================================
# PAGE 4: CASE STUDIES
# ============================================================================
PAGE_CASES = '''
    <!-- ========== PAGE: CASE STUDIES ========== -->
    <section data-page="cases" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Case Studies</span>
          </nav>
          <div class="max-w-3xl reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="award" class="w-3.5 h-3.5"></i>Production Impact</span>
            <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">Real clients. <span class="grad-text">Real numbers.</span></h1>
            <p class="text-lg text-ckbody leading-relaxed">Four engagements from the past 18 months. Every metric is measured against the client's pre-engagement baseline and verified by their analytics team. Tech tags reflect the actual production stack — not what we wanted to use, what we shipped.</p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-8 space-y-8">

        <!-- Case 1 -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer">
            <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="tag"><i data-lucide="landmark" class="w-3 h-3"></i>FinTech · B2B</span>
                  <span class="text-xs font-mono text-ckbody/60">2024 · 14 weeks</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-2">Real-time Payments API — p99 latency cut 72%</h2>
                <p class="text-ckbody text-sm max-w-2xl">A Series-C fintech processing $4.2B/yr in B2B payments needed to bring p99 API latency under 200ms to qualify for tier-1 bank partnerships. We rebuilt the request hot-path, replaced synchronous compliance calls with an event-driven sidecar, and migrated to a multi-region active-active Postgres + Redis topology.</p>
              </div>
              <div class="flex flex-wrap gap-2 max-w-xs">
                <span class="tag">Next.js 16</span><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">PostgreSQL</span><span class="tag">Redis</span><span class="tag">Docker</span><span class="tag">AWS</span><span class="tag">Terraform</span>
              </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-4 mt-6">
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">p99 Latency</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">720ms</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckblue"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">200ms</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−72%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Throughput</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">8K rps</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckblue"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">22K rps</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">+175%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Infra cost / mo</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">$48K</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckblue"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">$31K</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−35%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Case 2 -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer">
            <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="tag"><i data-lucide="shopping-cart" class="w-3 h-3"></i>E-commerce · D2C</span>
                  <span class="text-xs font-mono text-ckbody/60">2024 · 10 weeks</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-2">AI Shopping Assistant — +38% checkout conversion</h2>
                <p class="text-ckbody text-sm max-w-2xl">A 9-figure D2C skincare brand deployed a RAG-grounded shopping assistant across PDP pages and cart. We built the retrieval pipeline over 14k SKUs + 280k reviews, integrated a multi-agent orchestrator for product-match + ingredient-safety checks, and A/B-tested against the static chatbot for 8 weeks.</p>
              </div>
              <div class="flex flex-wrap gap-2 max-w-xs">
                <span class="tag">Next.js 16</span><span class="tag">Python</span><span class="tag">OpenAI</span><span class="tag">LangGraph</span><span class="tag">Pinecone</span><span class="tag">PostgreSQL</span><span class="tag">Vercel</span>
              </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-4 mt-6">
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Checkout CVR</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">2.6%</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckpink"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">3.6%</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">+38%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Avg. order value</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">$42</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckpink"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">$54</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">+29%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Returns rate</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">12.4%</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckpink"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">8.1%</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−35%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Case 3 -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer">
            <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="tag"><i data-lucide="heart-pulse" class="w-3 h-3"></i>Healthcare · HIPAA</span>
                  <span class="text-xs font-mono text-ckbody/60">2023 · 22 weeks</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-2">Clinical Notes RAG — $1.4M annual cloud savings</h2>
                <p class="text-ckbody text-sm max-w-2xl">A regional hospital network (1,200 beds, 14 facilities) needed to make 18M anonymized clinical notes searchable for clinical research. We built a hybrid RAG pipeline with per-patient ACLs, replaced a $2.4M/yr third-party search contract with a self-hosted stack, and gave researchers sub-second retrieval across the full corpus.</p>
              </div>
              <div class="flex flex-wrap gap-2 max-w-xs">
                <span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">Weaviate</span><span class="tag">OpenAI</span><span class="tag">BGE-Reranker</span><span class="tag">PostgreSQL</span><span class="tag">Docker</span><span class="tag">GCP</span>
              </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-4 mt-6">
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Annual cloud spend</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">$2.4M</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckpurple"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">$1.0M</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−$1.4M / yr</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Retrieval p99</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">4.8s</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckpurple"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">112ms</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−98%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Researcher NPS</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">+8</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckpurple"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">+72</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">+64 pts</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Case 4 -->
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="tilt-layer">
            <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <span class="tag"><i data-lucide="factory" class="w-3 h-3"></i>Logistics · Enterprise</span>
                  <span class="text-xs font-mono text-ckbody/60">2024 · 18 weeks</span>
                </div>
                <h2 class="font-display text-3xl font-bold text-ckheading mb-2">Fleet Orchestration Agents — 31% fewer empty miles</h2>
                <p class="text-ckbody text-sm max-w-2xl">A national last-mile logistics operator (1,800 trucks, 40 hubs) needed to reduce deadhead miles. We deployed a multi-agent orchestrator that runs every 90 seconds: a forecast agent predicts demand, a matcher agent proposes load pairings, a validator agent checks DOT compliance, and a human-in-loop dispatcher approves exceptions.</p>
              </div>
              <div class="flex flex-wrap gap-2 max-w-xs">
                <span class="tag">Python</span><span class="tag">LangGraph</span><span class="tag">Anthropic</span><span class="tag">PostgreSQL</span><span class="tag">Redis</span><span class="tag">Kafka</span><span class="tag">Kubernetes</span><span class="tag">AWS</span>
              </div>
            </div>
            <div class="grid sm:grid-cols-3 gap-4 mt-6">
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Empty miles</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">21.4%</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckblue"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">14.8%</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−31%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">Fuel spend / mo</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">$2.8M</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckblue"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">$2.1M</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">−25%</div>
              </div>
              <div class="glass-soft rounded-xl p-5">
                <div class="text-xs font-mono text-ckbody/70 uppercase tracking-wider mb-1">On-time delivery</div>
                <div class="flex items-baseline gap-2">
                  <span class="font-display font-bold text-2xl text-ckbody line-through opacity-60">91.2%</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-ckblue"></i>
                  <span class="font-display font-bold text-3xl text-ckheading">96.4%</span>
                </div>
                <div class="text-xs text-ckpink mt-1 font-mono">+5.2 pts</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- CTA -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="glass rounded-3xl p-8 lg:p-12 text-center reveal relative overflow-hidden">
          <div class="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
            <div class="absolute top-0 left-1/4 w-72 h-72 rounded-full" style="background:radial-gradient(circle,#136DFF,transparent 70%);"></div>
            <div class="absolute bottom-0 right-1/4 w-72 h-72 rounded-full" style="background:radial-gradient(circle,#FF53A9,transparent 70%);"></div>
          </div>
          <div class="relative">
            <h3 class="font-display text-3xl lg:text-4xl font-bold text-ckheading mb-3">Your case study is next.</h3>
            <p class="text-ckbody max-w-xl mx-auto mb-6">Book a 30-minute architecture review. We'll whiteboard your highest-ROI automation and ship a working PoC within 6 weeks.</p>
            <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold inline-flex items-center gap-2">Book a Demo <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
          </div>
        </div>
      </div>
    </section>
'''

print("Part 4 (cases) prepared.")

# ============================================================================
# PAGE 5: CONTACT & BOOK DEMO (Multi-step form + calendar)
# ============================================================================
PAGE_CONTACT = '''
    <!-- ========== PAGE: CONTACT ========== -->
    <section data-page="contact" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Contact</span>
          </nav>
          <div class="max-w-3xl reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>Book a Demo</span>
            <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">Let's build something <span class="grad-text">extraordinary</span>.</h1>
            <p class="text-lg text-ckbody leading-relaxed">Three short steps. Pick a slot. A senior engineer (not a salesperson) joins the call with a draft architecture for your use case. Average response time: under 4 hours during business days.</p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="grid lg:grid-cols-5 gap-8">
          <!-- Form -->
          <div class="lg:col-span-3 glass rounded-3xl p-8 lg:p-10 reveal">
            <!-- Step indicator -->
            <div class="flex items-center gap-3 mb-10">
              <div class="step-dot active" data-step="1">1</div>
              <div class="step-line" data-line="1"></div>
              <div class="step-dot idle" data-step="2">2</div>
              <div class="step-line" data-line="2"></div>
              <div class="step-dot idle" data-step="3">3</div>
            </div>

            <!-- Step 1: Project info -->
            <div class="form-step" data-form-step="1">
              <h2 class="font-display text-2xl font-bold text-ckheading mb-2">Tell us about your project</h2>
              <p class="text-sm text-ckbody mb-6">Step 1 of 3 · Project information</p>
              <div class="space-y-4">
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">Full name *</label>
                  <input type="text" class="glass-input" placeholder="Alex Morgan" required />
                </div>
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">Work email *</label>
                  <input type="email" class="glass-input" placeholder="alex@yourcompany.com" required />
                </div>
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">Company *</label>
                  <input type="text" class="glass-input" placeholder="Your Company Inc." required />
                </div>
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">What do you need? *</label>
                  <div class="grid sm:grid-cols-2 gap-2">
                    <label class="glass-input cursor-pointer flex items-center gap-2 hover:border-ckblue/40 transition-colors">
                      <input type="checkbox" class="accent-ckblue"/> Custom Web/Mobile App
                    </label>
                    <label class="glass-input cursor-pointer flex items-center gap-2 hover:border-ckblue/40 transition-colors">
                      <input type="checkbox" class="accent-ckblue"/> Cloud / DevOps
                    </label>
                    <label class="glass-input cursor-pointer flex items-center gap-2 hover:border-ckblue/40 transition-colors">
                      <input type="checkbox" class="accent-ckblue"/> AI / ML Pipeline
                    </label>
                    <label class="glass-input cursor-pointer flex items-center gap-2 hover:border-ckblue/40 transition-colors">
                      <input type="checkbox" class="accent-ckblue"/> Security Audit
                    </label>
                  </div>
                </div>
                <div class="flex justify-end pt-2">
                  <button class="glow-btn rounded-xl px-6 py-3 font-display font-semibold text-sm" data-next="2">Continue <i data-lucide="arrow-right" class="inline w-4 h-4 ml-1"></i></button>
                </div>
              </div>
            </div>

            <!-- Step 2: Timeline + scope -->
            <div class="form-step hidden" data-form-step="2">
              <h2 class="font-display text-2xl font-bold text-ckheading mb-2">Timeline & budget</h2>
              <p class="text-sm text-ckbody mb-6">Step 2 of 3 · Helps us scope the right team</p>
              <div class="space-y-4">
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">When do you want to start? *</label>
                  <div class="grid sm:grid-cols-2 gap-2">
                    <label class="glass-input cursor-pointer flex items-center gap-2"><input type="radio" name="start" class="accent-ckpink"/> Immediately (this week)</label>
                    <label class="glass-input cursor-pointer flex items-center gap-2"><input type="radio" name="start" class="accent-ckpink"/> 2–4 weeks</label>
                    <label class="glass-input cursor-pointer flex items-center gap-2"><input type="radio" name="start" class="accent-ckpink"/> 1–2 months</label>
                    <label class="glass-input cursor-pointer flex items-center gap-2"><input type="radio" name="start" class="accent-ckpink"/> Just exploring</label>
                  </div>
                </div>
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">Budget range *</label>
                  <select class="glass-input">
                    <option style="background:#0D0025;">Under $25k</option>
                    <option style="background:#0D0025;">$25k – $75k</option>
                    <option style="background:#0D0025;">$75k – $150k</option>
                    <option style="background:#0D0025;">$150k – $500k</option>
                    <option style="background:#0D0025;">$500k+</option>
                  </select>
                </div>
                <div>
                  <label class="text-xs font-mono text-ckbody uppercase tracking-wider mb-2 block">Project description *</label>
                  <textarea class="glass-input" rows="4" placeholder="What are you trying to build? What does success look like in 90 days?"></textarea>
                </div>
                <div class="flex justify-between pt-2">
                  <button class="ghost-btn rounded-xl px-6 py-3 font-display font-semibold text-sm" data-prev="1">Back</button>
                  <button class="glow-btn rounded-xl px-6 py-3 font-display font-semibold text-sm" data-next="3">Continue <i data-lucide="arrow-right" class="inline w-4 h-4 ml-1"></i></button>
                </div>
              </div>
            </div>

            <!-- Step 3: Calendar + confirm -->
            <div class="form-step hidden" data-form-step="3">
              <h2 class="font-display text-2xl font-bold text-ckheading mb-2">Pick a time</h2>
              <p class="text-sm text-ckbody mb-6">Step 3 of 3 · 30-minute architecture review</p>
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Calendar widget -->
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <button id="cal-prev" class="ghost-btn rounded-lg w-9 h-9 flex items-center justify-center" aria-label="Previous month"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                    <div id="cal-month" class="font-display font-bold text-ckheading"></div>
                    <button id="cal-next" class="ghost-btn rounded-lg w-9 h-9 flex items-center justify-center" aria-label="Next month"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                  </div>
                  <div class="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-ckbody/60 uppercase mb-2">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  </div>
                  <div id="cal-grid" class="grid grid-cols-7 gap-1"></div>
                </div>
                <!-- Time slots -->
                <div>
                  <div class="text-xs font-mono text-ckbody uppercase tracking-wider mb-3">Available slots</div>
                  <div class="space-y-2" id="time-slots">
                    <button class="glass-input text-left text-sm hover:border-ckblue/50 transition-colors w-full">09:00 AM · EST</button>
                    <button class="glass-input text-left text-sm hover:border-ckblue/50 transition-colors w-full">10:30 AM · EST</button>
                    <button class="glass-input text-left text-sm hover:border-ckblue/50 transition-colors w-full">01:00 PM · EST</button>
                    <button class="glass-input text-left text-sm hover:border-ckblue/50 transition-colors w-full">03:30 PM · EST</button>
                    <button class="glass-input text-left text-sm hover:border-ckblue/50 transition-colors w-full">05:00 PM · EST</button>
                  </div>
                </div>
              </div>
              <div class="flex justify-between pt-6">
                <button class="ghost-btn rounded-xl px-6 py-3 font-display font-semibold text-sm" data-prev="2">Back</button>
                <button id="submit-booking" class="glow-btn rounded-xl px-6 py-3 font-display font-semibold text-sm">Confirm booking <i data-lucide="check" class="inline w-4 h-4 ml-1"></i></button>
              </div>
              <div id="booking-success" class="hidden mt-6 glass-soft rounded-xl p-5 text-center">
                <div class="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                  <i data-lucide="check" class="w-6 h-6 text-white"></i>
                </div>
                <h3 class="font-display font-bold text-ckheading text-lg mb-1">Booking received!</h3>
                <p class="text-sm text-ckbody">A senior engineer will email you within 4 hours with a calendar invite and a draft architecture for your use case.</p>
              </div>
            </div>
          </div>

          <!-- Sidebar: contact info + mascot -->
          <div class="lg:col-span-2 space-y-6 reveal">
            <div class="glass rounded-3xl p-8 relative overflow-hidden">
              <div class="relative h-40 mb-4">
                ''' + MASCOTS["data"] + '''
              </div>
              <h3 class="font-display text-xl font-bold text-ckheading mb-3">Direct contact</h3>
              <p class="text-sm text-ckbody mb-5">Prefer email? Reach out directly — we read every message.</p>
              <div class="space-y-3">
                <a href="mailto:info@clicktaketech.com" class="flex items-center gap-3 glass-soft rounded-xl p-4 hover:border-ckblue/40 transition-colors">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#7B2FBE);">
                    <i data-lucide="mail" class="w-5 h-5 text-white"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-mono text-ckbody/70 uppercase">Email</div>
                    <div class="text-sm text-ckheading font-medium truncate">info@clicktaketech.com</div>
                  </div>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-ckbody"></i>
                </a>
                <a href="tel:+18005550100" class="flex items-center gap-3 glass-soft rounded-xl p-4 hover:border-ckpink/40 transition-colors">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#FF53A9,#7B2FBE);">
                    <i data-lucide="phone" class="w-5 h-5 text-white"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-mono text-ckbody/70 uppercase">Phone</div>
                    <div class="text-sm text-ckheading font-medium">+1 (800) 555-0100</div>
                  </div>
                  <i data-lucide="arrow-up-right" class="w-4 h-4 text-ckbody"></i>
                </a>
                <div class="flex items-center gap-3 glass-soft rounded-xl p-4">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#7B2FBE,#136DFF);">
                    <i data-lucide="map-pin" class="w-5 h-5 text-white"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-mono text-ckbody/70 uppercase">HQ</div>
                    <div class="text-sm text-ckheading font-medium">Remote-first · Global team</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="glass rounded-3xl p-8">
              <h3 class="font-display text-lg font-bold text-ckheading mb-4">What happens next?</h3>
              <ol class="space-y-4">
                <li class="flex gap-3">
                  <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-display font-bold" style="background:linear-gradient(135deg,#136DFF,#FF53A9);color:#fff;">1</div>
                  <div>
                    <div class="text-sm text-ckheading font-medium">Senior engineer reviews your brief</div>
                    <div class="text-xs text-ckbody mt-1">Within 4 hours during business days.</div>
                  </div>
                </li>
                <li class="flex gap-3">
                  <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-display font-bold" style="background:linear-gradient(135deg,#136DFF,#FF53A9);color:#fff;">2</div>
                  <div>
                    <div class="text-sm text-ckheading font-medium">30-minute architecture call</div>
                    <div class="text-xs text-ckbody mt-1">We bring a draft architecture + ballpark estimate.</div>
                  </div>
                </li>
                <li class="flex gap-3">
                  <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-display font-bold" style="background:linear-gradient(135deg,#136DFF,#FF53A9);color:#fff;">3</div>
                  <div>
                    <div class="text-sm text-ckheading font-medium">Working PoC in 6 weeks</div>
                    <div class="text-xs text-ckbody mt-1">Fixed-scope, fixed-fee. No long-term contract required.</div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
'''

print("Part 5 (contact) prepared.")

# ============================================================================
# PAGE 6: ABOUT
# ============================================================================
PAGE_ABOUT = '''
    <!-- ========== PAGE: ABOUT ========== -->
    <section data-page="about" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">About</span>
          </nav>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="reveal">
              <span class="tag mb-4 inline-flex"><i data-lucide="users" class="w-3.5 h-3.5"></i>Our Story</span>
              <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">
                A senior engineering team that <span class="grad-text">actually ships</span>.
              </h1>
              <p class="text-lg text-ckbody leading-relaxed mb-5">ClickTake Technologies was founded in 2019 by a small group of staff engineers who were tired of agency theatre — the 30-person standups, the offshore handoffs, the decks that said "innovation" while shipping spaghetti.</p>
              <p class="text-ckbody leading-relaxed mb-5">We kept the team small on purpose. Today we're 38 engineers across 9 time zones, every one of them 8+ years into their craft. No juniors learning on your dollar. No middle management. Just people who've shipped production systems at scale and want to do it again — this time for you.</p>
              <p class="text-ckbody leading-relaxed">The result: 150+ production deployments, 99.9% uptime SLAs we actually meet, and a client retention rate of 94% over the past three years.</p>
            </div>
            <div class="relative h-80 reveal">
              ''' + MASCOTS["dev"] + '''
            </div>
          </div>
        </div>
      </div>

      <!-- Values -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="text-center max-w-2xl mx-auto mb-12 reveal">
          <span class="tag mb-4 inline-flex"><i data-lucide="compass" class="w-3.5 h-3.5"></i>Operating Principles</span>
          <h2 class="font-display text-4xl font-bold text-ckheading mb-3">Four principles we don't <span class="grad-text-violet">compromise on</span>.</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#136DFF,#7B2FBE);">
                <i data-lucide="hammer" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-lg text-ckheading mb-2">Ship over polish</h3>
              <p class="text-sm text-ckbody leading-relaxed">A working PoC in week 6 beats a perfect Figma file in week 12. We optimize for code in production, not artifacts in meetings.</p>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#FF53A9,#7B2FBE);">
                <i data-lucide="eye" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-lg text-ckheading mb-2">Radical transparency</h3>
              <p class="text-sm text-ckbody leading-relaxed">Live staging URL from week 1. Demo every Friday. Slack channel with the engineering team — not an account manager relaying messages.</p>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#7B2FBE,#136DFF);">
                <i data-lucide="git-fork" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-lg text-ckheading mb-2">No vendor lock-in</h3>
              <p class="text-sm text-ckbody leading-relaxed">Your code, your repos, your cloud account. We hand over an architecture your team can maintain — with runbooks and 30 days of hyper-care.</p>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="tilt-layer">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                <i data-lucide="graduation-cap" class="w-6 h-6 text-white"></i>
              </div>
              <h3 class="font-display font-bold text-lg text-ckheading mb-2">Senior-only benches</h3>
              <p class="text-sm text-ckbody leading-relaxed">8+ years minimum, every engineer. No juniors learning on your dollar, no offshore handoffs, no surprise staffing changes mid-engagement.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team stats -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div class="stat-num grad-text">38</div>
              <div class="text-sm text-ckbody mt-2 font-medium">Senior engineers</div>
              <div class="text-xs text-ckbody/60 mt-1">9 time zones</div>
            </div>
            <div>
              <div class="stat-num grad-text">8.4</div>
              <div class="text-sm text-ckbody mt-2 font-medium">Avg. years experience</div>
              <div class="text-xs text-ckbody/60 mt-1">Minimum 8 to join</div>
            </div>
            <div>
              <div class="stat-num grad-text">94%</div>
              <div class="text-sm text-ckbody mt-2 font-medium">Client retention</div>
              <div class="text-xs text-ckbody/60 mt-1">3-year rolling</div>
            </div>
            <div>
              <div class="stat-num grad-text">2019</div>
              <div class="text-sm text-ckbody mt-2 font-medium">Founded</div>
              <div class="text-xs text-ckbody/60 mt-1">Remote-first since day 1</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="text-center mb-12 reveal">
          <h2 class="font-display text-4xl font-bold text-ckheading mb-3">Five years. <span class="grad-text">A few milestones.</span></h2>
        </div>
        <div class="space-y-6">
          <div class="tilt-card glass rounded-2xl p-6 reveal flex gap-6 items-start">
            <div class="font-display font-bold text-3xl grad-text flex-shrink-0">2019</div>
            <div class="flex-1">
              <div class="font-display font-bold text-lg text-ckheading mb-1">Founded · 4 engineers</div>
              <p class="text-sm text-ckbody">First engagement: rebuild a healthcare scheduling platform for a regional hospital network. Shipped in 11 weeks.</p>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal flex gap-6 items-start">
            <div class="font-display font-bold text-3xl grad-text flex-shrink-0">2021</div>
            <div class="flex-1">
              <div class="font-display font-bold text-lg text-ckheading mb-1">Cloud DevOps practice launched</div>
              <p class="text-sm text-ckbody">Hit 50 enterprise apps shipped. Added a dedicated DevOps practice — Terraform modules library, GitOps pipelines, observability stack.</p>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal flex gap-6 items-start">
            <div class="font-display font-bold text-3xl grad-text flex-shrink-0">2023</div>
            <div class="flex-1">
              <div class="font-display font-bold text-lg text-ckheading mb-1">AI Platform division</div>
              <p class="text-sm text-ckbody">Launched the ClickTake AI Platform — multi-agent orchestration, enterprise RAG, custom fine-tuning. First 10 production deployments within 9 months.</p>
            </div>
          </div>
          <div class="tilt-card glass rounded-2xl p-6 reveal flex gap-6 items-start">
            <div class="font-display font-bold text-3xl grad-text flex-shrink-0">2024</div>
            <div class="flex-1">
              <div class="font-display font-bold text-lg text-ckheading mb-1">150+ apps · 10M+ API requests/day</div>
              <p class="text-sm text-ckbody">Crossed 150 production deployments. Now serving 10M+ API requests every day at p99 &lt; 120ms across all client environments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
'''

# ============================================================================
# PAGE 7: BLOG
# ============================================================================
PAGE_BLOG = '''
    <!-- ========== PAGE: BLOG ========== -->
    <section data-page="blog" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Blog</span>
          </nav>
          <div class="max-w-3xl reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="rss" class="w-3.5 h-3.5"></i>Engineering Notes</span>
            <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">Field notes from the <span class="grad-text">production floor</span>.</h1>
            <p class="text-lg text-ckbody leading-relaxed">Long-form writeups from our engineering team. We publish what we learn shipping — architecture patterns, eval harnesses, post-mortems, and the occasional opinionated take on the AI tooling stack.</p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <article class="tilt-card glass rounded-2xl overflow-hidden reveal">
            <a href="#blog" class="block tilt-layer">
              <div class="h-48 relative overflow-hidden" style="background:linear-gradient(135deg,#136DFF 0%,#7B2FBE 60%,#FF53A9 100%);">
                <div class="absolute inset-0 perspective-grid opacity-30"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="tag" style="background:rgba(0,0,0,0.40);border-color:rgba(255,255,255,0.30);color:#fff;">AI Architecture</span>
                </div>
              </div>
              <div class="p-6">
                <div class="text-xs font-mono text-ckbody/60 mb-2">12 min read · March 14, 2025</div>
                <h3 class="font-display font-bold text-xl text-ckheading mb-2 leading-snug">Designing multi-agent systems that don't collapse on edge cases</h3>
                <p class="text-sm text-ckbody leading-relaxed mb-4">A field guide to LangGraph state design, tool-call schemas, and the human-in-loop patterns we've shipped in production. Includes three real failure modes and how we patched them.</p>
                <div class="flex items-center gap-2 text-xs text-ckbody/70">
                  <i data-lucide="user" class="w-3 h-3"></i> Sarah Chen · Principal Engineer
                </div>
              </div>
            </a>
          </article>

          <article class="tilt-card glass rounded-2xl overflow-hidden reveal">
            <a href="#blog" class="block tilt-layer">
              <div class="h-48 relative overflow-hidden" style="background:linear-gradient(135deg,#FF53A9 0%,#7B2FBE 60%,#136DFF 100%);">
                <div class="absolute inset-0 perspective-grid opacity-30"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="tag" style="background:rgba(0,0,0,0.40);border-color:rgba(255,255,255,0.30);color:#fff;">RAG</span>
                </div>
              </div>
              <div class="p-6">
                <div class="text-xs font-mono text-ckbody/60 mb-2">9 min read · March 7, 2025</div>
                <h3 class="font-display font-bold text-xl text-ckheading mb-2 leading-snug">RAG at 10M documents: the retrieval pipeline we ship</h3>
                <p class="text-sm text-ckbody leading-relaxed mb-4">Why hybrid BM25 + dense + cross-encoder rerank beats any single retrieval strategy at scale. Benchmarks on three real client corpora, with cost and latency breakdowns.</p>
                <div class="flex items-center gap-2 text-xs text-ckbody/70">
                  <i data-lucide="user" class="w-3 h-3"></i> Marcus Webb · Staff ML Engineer
                </div>
              </div>
            </a>
          </article>

          <article class="tilt-card glass rounded-2xl overflow-hidden reveal">
            <a href="#blog" class="block tilt-layer">
              <div class="h-48 relative overflow-hidden" style="background:linear-gradient(135deg,#7B2FBE 0%,#136DFF 60%,#FF53A9 100%);">
                <div class="absolute inset-0 perspective-grid opacity-30"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="tag" style="background:rgba(0,0,0,0.40);border-color:rgba(255,255,255,0.30);color:#fff;">DevOps</span>
                </div>
              </div>
              <div class="p-6">
                <div class="text-xs font-mono text-ckbody/60 mb-2">15 min read · February 28, 2025</div>
                <h3 class="font-display font-bold text-xl text-ckheading mb-2 leading-snug">Cutting cloud spend 35% without firing anyone</h3>
                <p class="text-sm text-ckbody leading-relaxed mb-4">The exact Terraform module patterns, autoscaling configs, and FinOps rituals we use to take 35% off the average client cloud bill in the first 60 days. No magic, just discipline.</p>
                <div class="flex items-center gap-2 text-xs text-ckbody/70">
                  <i data-lucide="user" class="w-3 h-3"></i> Priya Raman · Cloud Architect
                </div>
              </div>
            </a>
          </article>

          <article class="tilt-card glass rounded-2xl overflow-hidden reveal">
            <a href="#blog" class="block tilt-layer">
              <div class="h-48 relative overflow-hidden" style="background:linear-gradient(135deg,#136DFF 0%,#FF53A9 60%,#7B2FBE 100%);">
                <div class="absolute inset-0 perspective-grid opacity-30"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="tag" style="background:rgba(0,0,0,0.40);border-color:rgba(255,255,255,0.30);color:#fff;">Frontend</span>
                </div>
              </div>
              <div class="p-6">
                <div class="text-xs font-mono text-ckbody/60 mb-2">7 min read · February 21, 2025</div>
                <h3 class="font-display font-bold text-xl text-ckheading mb-2 leading-snug">Next.js 16 in production: what actually changed for us</h3>
                <p class="text-sm text-ckbody leading-relaxed mb-4">A pragmatic migration guide from 14 → 16. Server Actions vs Route Handlers, the new caching defaults, and the three regressions we hit in the first week.</p>
                <div class="flex items-center gap-2 text-xs text-ckbody/70">
                  <i data-lucide="user" class="w-3 h-3"></i> Diego Alvarez · Senior Frontend
                </div>
              </div>
            </a>
          </article>

          <article class="tilt-card glass rounded-2xl overflow-hidden reveal">
            <a href="#blog" class="block tilt-layer">
              <div class="h-48 relative overflow-hidden" style="background:linear-gradient(135deg,#FF53A9 0%,#136DFF 60%,#7B2FBE 100%);">
                <div class="absolute inset-0 perspective-grid opacity-30"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="tag" style="background:rgba(0,0,0,0.40);border-color:rgba(255,255,255,0.30);color:#fff;">Security</span>
                </div>
              </div>
              <div class="p-6">
                <div class="text-xs font-mono text-ckbody/60 mb-2">11 min read · February 14, 2025</div>
                <h3 class="font-display font-bold text-xl text-ckheading mb-2 leading-snug">SOC 2 in 90 days: the audit prep checklist we use</h3>
                <p class="text-sm text-ckbody leading-relaxed mb-4">The exact 87-item checklist we walk clients through before a SOC 2 Type II audit. Includes the controls we always see fail on first attempt and how to remediate them in a sprint.</p>
                <div class="flex items-center gap-2 text-xs text-ckbody/70">
                  <i data-lucide="user" class="w-3 h-3"></i> Aisha Okoye · Security Lead
                </div>
              </div>
            </a>
          </article>

          <article class="tilt-card glass rounded-2xl overflow-hidden reveal">
            <a href="#blog" class="block tilt-layer">
              <div class="h-48 relative overflow-hidden" style="background:linear-gradient(135deg,#7B2FBE 0%,#FF53A9 60%,#136DFF 100%);">
                <div class="absolute inset-0 perspective-grid opacity-30"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="tag" style="background:rgba(0,0,0,0.40);border-color:rgba(255,255,255,0.30);color:#fff;">LLM</span>
                </div>
              </div>
              <div class="p-6">
                <div class="text-xs font-mono text-ckbody/60 mb-2">13 min read · February 7, 2025</div>
                <h3 class="font-display font-bold text-xl text-ckheading mb-2 leading-snug">Fine-tuning vs RAG: the decision framework we actually use</h3>
                <p class="text-sm text-ckbody leading-relaxed mb-4">Stop arguing on Twitter. Here's the cost, latency, and quality tradeoff matrix we use to decide which path to take — with three real client examples and the math behind each call.</p>
                <div class="flex items-center gap-2 text-xs text-ckbody/70">
                  <i data-lucide="user" class="w-3 h-3"></i> Sarah Chen · Principal Engineer
                </div>
              </div>
            </a>
          </article>

        </div>
      </div>
    </section>
'''

print("Part 6 (about + blog) prepared.")

# ============================================================================
# PAGE 8: CAREERS
# ============================================================================
PAGE_CAREERS = '''
    <!-- ========== PAGE: CAREERS ========== -->
    <section data-page="careers" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Careers</span>
          </nav>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="reveal">
              <span class="tag mb-4 inline-flex"><i data-lucide="briefcase" class="w-3.5 h-3.5"></i>Open Roles</span>
              <h1 class="font-display text-5xl lg:text-6xl font-bold text-ckheading mb-5 leading-tight">
                Engineer the future with <span class="grad-text">people you respect</span>.
              </h1>
              <p class="text-lg text-ckbody leading-relaxed mb-5">We're a 38-person senior engineering team. We hire slowly — usually 3–4 people a year — and only when we find someone we'd want to pair-program with for the next five years. If that sounds like you, the open roles are below.</p>
              <p class="text-ckbody leading-relaxed">All roles are remote-first, async-friendly, and pay top-of-market. We don't track hours, we don't micromanage, and we don't promote people who do. We promote people who ship.</p>
            </div>
            <div class="relative h-80 reveal">
              ''' + MASCOTS["ai"] + '''
            </div>
          </div>
        </div>
      </div>

      <!-- Perks -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="glass rounded-2xl p-6 reveal">
            <i data-lucide="banknote" class="w-7 h-7 text-ckblue mb-3"></i>
            <div class="font-display font-bold text-ckheading mb-1">Top of market</div>
            <p class="text-xs text-ckbody">Salary bands at 90th percentile for your region. Equity for every full-time hire.</p>
          </div>
          <div class="glass rounded-2xl p-6 reveal">
            <i data-lucide="globe" class="w-7 h-7 text-ckpink mb-3"></i>
            <div class="font-display font-bold text-ckheading mb-1">Remote-first</div>
            <p class="text-xs text-ckbody">Work from anywhere. Async by default — only 4 hours of meetings per week.</p>
          </div>
          <div class="glass rounded-2xl p-6 reveal">
            <i data-lucide="book-open" class="w-7 h-7 text-ckpurple mb-3"></i>
            <div class="font-display font-bold text-ckheading mb-1">$4k learning budget</div>
            <p class="text-xs text-ckbody">Annual stipend for books, courses, conferences. No approval needed for technical material.</p>
          </div>
          <div class="glass rounded-2xl p-6 reveal">
            <i data-lucide="monitor" class="w-7 h-7 text-ckblue mb-3"></i>
            <div class="font-display font-bold text-ckheading mb-1">$3k gear budget</div>
            <p class="text-xs text-ckbody">Pick your own hardware. Refresh every 24 months. Keep the laptop if you stay 3+ years.</p>
          </div>
        </div>
      </div>

      <!-- Open positions -->
      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div class="text-center mb-10 reveal">
          <h2 class="font-display text-3xl font-bold text-ckheading mb-2">Open positions</h2>
          <p class="text-ckbody">Click any role to apply — no cover letter required, just a portfolio or GitHub link.</p>
        </div>

        <div class="space-y-4">
          <a href="mailto:info@clicktaketech.com?subject=Application: Senior Full-Stack Engineer" class="tilt-card glass rounded-2xl p-6 reveal block">
            <div class="tilt-layer flex flex-wrap items-center justify-between gap-4">
              <div class="flex-1 min-w-[240px]">
                <div class="flex items-center gap-3 mb-1">
                  <span class="tag"><i data-lucide="code" class="w-3 h-3"></i>Engineering</span>
                  <span class="text-xs font-mono text-ckbody/60">Full-time · Remote (Americas)</span>
                </div>
                <h3 class="font-display font-bold text-xl text-ckheading">Senior Full-Stack Engineer · Next.js / Python</h3>
                <p class="text-sm text-ckbody mt-1">Lead client engagements end-to-end. 8+ yrs production experience. Deep Next.js + FastAPI + Postgres.</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="text-xs font-mono text-ckbody/60">Salary</div>
                  <div class="font-display font-bold text-ckheading">$180k–$240k</div>
                </div>
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-ckblue"></i>
              </div>
            </div>
          </a>

          <a href="mailto:info@clicktaketech.com?subject=Application: Staff ML Engineer" class="tilt-card glass rounded-2xl p-6 reveal block">
            <div class="tilt-layer flex flex-wrap items-center justify-between gap-4">
              <div class="flex-1 min-w-[240px]">
                <div class="flex items-center gap-3 mb-1">
                  <span class="tag"><i data-lucide="brain-circuit" class="w-3 h-3"></i>AI / ML</span>
                  <span class="text-xs font-mono text-ckbody/60">Full-time · Remote (Global)</span>
                </div>
                <h3 class="font-display font-bold text-xl text-ckheading">Staff ML Engineer · LLM Fine-Tuning</h3>
                <p class="text-sm text-ckbody mt-1">Own fine-tuning pipelines (LoRA/QLoRA, DPO) for client workflows. 8+ yrs ML, 2+ yrs LLM production.</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="text-xs font-mono text-ckbody/60">Salary</div>
                  <div class="font-display font-bold text-ckheading">$220k–$290k</div>
                </div>
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-ckpink"></i>
              </div>
            </div>
          </a>

          <a href="mailto:info@clicktaketech.com?subject=Application: Cloud Architect" class="tilt-card glass rounded-2xl p-6 reveal block">
            <div class="tilt-layer flex flex-wrap items-center justify-between gap-4">
              <div class="flex-1 min-w-[240px]">
                <div class="flex items-center gap-3 mb-1">
                  <span class="tag"><i data-lucide="cloud" class="w-3 h-3"></i>DevOps</span>
                  <span class="text-xs font-mono text-ckbody/60">Full-time · Remote (Americas / EU)</span>
                </div>
                <h3 class="font-display font-bold text-xl text-ckheading">Cloud Architect · AWS / GCP</h3>
                <p class="text-sm text-ckbody mt-1">Design and ship multi-region IaC for enterprise clients. Terraform, K8s, ArgoCD. 10+ yrs infrastructure.</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="text-xs font-mono text-ckbody/60">Salary</div>
                  <div class="font-display font-bold text-ckheading">$200k–$260k</div>
                </div>
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-ckpurple"></i>
              </div>
            </div>
          </a>

          <a href="mailto:info@clicktaketech.com?subject=Application: Security Engineer" class="tilt-card glass rounded-2xl p-6 reveal block">
            <div class="tilt-layer flex flex-wrap items-center justify-between gap-4">
              <div class="flex-1 min-w-[240px]">
                <div class="flex items-center gap-3 mb-1">
                  <span class="tag"><i data-lucide="shield" class="w-3 h-3"></i>Security</span>
                  <span class="text-xs font-mono text-ckbody/60">Full-time · Remote (Americas)</span>
                </div>
                <h3 class="font-display font-bold text-xl text-ckheading">Security Engineer · SOC 2 / Pen-test</h3>
                <p class="text-sm text-ckbody mt-1">Lead audit prep, run pen-tests, build compliance-as-code pipelines. CISSP or OSCP preferred.</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="text-xs font-mono text-ckbody/60">Salary</div>
                  <div class="font-display font-bold text-ckheading">$180k–$230k</div>
                </div>
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-ckblue"></i>
              </div>
            </div>
          </a>

          <a href="mailto:info@clicktaketech.com?subject=Application: Senior Product Designer" class="tilt-card glass rounded-2xl p-6 reveal block">
            <div class="tilt-layer flex flex-wrap items-center justify-between gap-4">
              <div class="flex-1 min-w-[240px]">
                <div class="flex items-center gap-3 mb-1">
                  <span class="tag"><i data-lucide="palette" class="w-3 h-3"></i>Design</span>
                  <span class="text-xs font-mono text-ckbody/60">Full-time · Remote (Americas / EU)</span>
                </div>
                <h3 class="font-display font-bold text-xl text-ckheading">Senior Product Designer · Design Systems</h3>
                <p class="text-sm text-ckbody mt-1">Own the design system + client design discovery. Strong Figma + prototyping. 8+ yrs product design.</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <div class="text-xs font-mono text-ckbody/60">Salary</div>
                  <div class="font-display font-bold text-ckheading">$160k–$210k</div>
                </div>
                <i data-lucide="arrow-up-right" class="w-5 h-5 text-ckpink"></i>
              </div>
            </div>
          </a>
        </div>

        <div class="text-center mt-12 reveal">
          <p class="text-ckbody mb-4">Don't see your role? We're always open to exceptional engineers.</p>
          <a href="mailto:info@clicktaketech.com?subject=Open Application" class="ghost-btn rounded-xl px-6 py-3 font-display font-semibold text-sm inline-flex items-center gap-2">Send an open application <i data-lucide="mail" class="w-4 h-4"></i></a>
        </div>
      </div>
    </section>
'''

# ============================================================================
# PAGE 9: PRIVACY POLICY
# ============================================================================
PAGE_PRIVACY = '''
    <!-- ========== PAGE: PRIVACY ========== -->
    <section data-page="privacy" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-4xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Privacy Policy</span>
          </nav>
          <div class="reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="lock" class="w-3.5 h-3.5"></i>Legal</span>
            <h1 class="font-display text-4xl lg:text-5xl font-bold text-ckheading mb-3">Privacy Policy</h1>
            <p class="text-sm text-ckbody/70 font-mono mb-10">Last updated: August 1, 2025</p>
          </div>

          <div class="glass rounded-3xl p-8 lg:p-10 space-y-8 reveal">
            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">1. Who we are</h2>
              <p class="text-ckbody leading-relaxed">ClickTake Technologies ("ClickTake", "we", "us", "our") is a software engineering and AI services company headquartered remotely with operations across nine time zones. We provide custom software development, cloud DevOps, AI/ML pipeline engineering, and security consulting services to enterprise clients worldwide. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. We are committed to transparent data practices and operate in compliance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the Health Insurance Portability and Accountability Act (HIPAA) where applicable.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">2. Information we collect</h2>
              <p class="text-ckbody leading-relaxed mb-3">We collect information that you provide directly to us when you fill out our contact form, request a demo, subscribe to our newsletter, or engage our services. This includes your name, work email address, company name, job title, project description, and any information you choose to share in correspondence with our team. We also collect technical information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. This technical data is collected through server logs and privacy-preserving analytics (Plausible Analytics) that do not use cookies for tracking.</p>
              <p class="text-ckbody leading-relaxed">When you become a client, we may process additional data on your behalf under a Data Processing Agreement (DPA). This data is governed by the terms of that agreement and is never used for any purpose other than providing the contracted services.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">3. How we use your information</h2>
              <p class="text-ckbody leading-relaxed mb-3">We use the information we collect to respond to your inquiries, schedule and conduct sales and architecture calls, deliver contracted services, send transactional communications, and improve our website and service offerings. Specifically, we use your contact information to communicate with you about your project, your name and company to maintain accurate records of our engagements, and your project description to scope potential engagements and assign appropriate engineering teams. We may also use aggregated, de-identified data for analytics and business intelligence purposes — this data cannot be used to identify you personally.</p>
              <p class="text-ckbody leading-relaxed">We do not sell your personal information to third parties. We do not use your personal information for cross-contextual behavioral advertising. We do not share your information with data brokers.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">4. Data retention</h2>
              <p class="text-ckbody leading-relaxed">We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with our legal obligations, resolve disputes, and enforce our agreements. Contact form submissions and sales correspondence are retained for 24 months after our last interaction. Client project data is retained for the duration of the engagement plus 36 months for audit and compliance purposes, unless a shorter retention period is specified in your service agreement. You may request deletion of your personal information at any time by emailing info@clicktaketech.com, subject to our legal retention obligations.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">5. Your rights</h2>
              <p class="text-ckbody leading-relaxed mb-3">Depending on your location, you may have the following rights regarding your personal information: the right to access the personal information we hold about you, the right to request correction of inaccurate information, the right to request deletion of your personal information, the right to request that we restrict the processing of your information, the right to data portability, the right to object to processing, and the right to withdraw consent to processing at any time. California residents have additional rights under the CCPA, including the right to know what personal information is collected and the right to opt-out of the sale of personal information (we do not sell personal information).</p>
              <p class="text-ckbody leading-relaxed">To exercise any of these rights, email info@clicktaketech.com with the subject line "Privacy Request". We will respond within 30 days.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">6. Contact</h2>
              <p class="text-ckbody leading-relaxed">If you have questions about this Privacy Policy or our data practices, contact us at info@clicktaketech.com. We aim to respond to all privacy inquiries within 5 business days.</p>
            </section>
          </div>
        </div>
      </div>
    </section>
'''

# ============================================================================
# PAGE 10: TERMS OF SERVICE
# ============================================================================
PAGE_TERMS = '''
    <!-- ========== PAGE: TERMS ========== -->
    <section data-page="terms" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-4xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Terms of Service</span>
          </nav>
          <div class="reveal">
            <span class="tag mb-4 inline-flex"><i data-lucide="file-text" class="w-3.5 h-3.5"></i>Legal</span>
            <h1 class="font-display text-4xl lg:text-5xl font-bold text-ckheading mb-3">Terms of Service</h1>
            <p class="text-sm text-ckbody/70 font-mono mb-10">Last updated: August 1, 2025</p>
          </div>

          <div class="glass rounded-3xl p-8 lg:p-10 space-y-8 reveal">
            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">1. Acceptance of terms</h2>
              <p class="text-ckbody leading-relaxed">By accessing or using the ClickTake Technologies website (clicktaketech.com) and any services provided by ClickTake Technologies ("ClickTake", "we", "us", "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access our website or use our services. These Terms constitute a legally binding agreement between you and ClickTake. We may update these Terms from time to time, and we will notify you of material changes by posting the updated Terms on this page with a revised "Last updated" date. Your continued use of our website or services after any such change constitutes your acceptance of the updated Terms.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">2. Services</h2>
              <p class="text-ckbody leading-relaxed mb-3">ClickTake Technologies provides custom software development, cloud and DevOps engineering, AI and machine learning pipeline development, and security consulting services to enterprise clients. The specific scope, deliverables, timeline, and fees for any engagement are governed by a separate Master Services Agreement (MSA) and Statement of Work (SOW) executed between you and ClickTake. In the event of any conflict between these Terms and the executed MSA or SOW, the terms of the MSA or SOW shall control with respect to the subject matter of the engagement.</p>
              <p class="text-ckbody leading-relaxed">Our website also provides informational content including blog posts, case studies, and marketing materials. This content is provided for general informational purposes only and does not constitute professional advice. We make no representations about the suitability of this content for any specific business purpose.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">3. Intellectual property</h2>
              <p class="text-ckbody leading-relaxed mb-3">All content on this website — including text, graphics, logos, images, audio, video, software code examples, and the overall look and feel — is the property of ClickTake Technologies or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, or otherwise exploit any content from this website without our prior written consent, except as expressly permitted by fair use under applicable copyright law.</p>
              <p class="text-ckbody leading-relaxed">For client engagements, intellectual property rights in deliverables are governed by the executed MSA and SOW. Unless otherwise specified, custom code written for a client engagement becomes the client's property upon full payment, while ClickTake retains ownership of its pre-existing tools, libraries, frameworks, and methodologies used in the engagement.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">4. Warranty disclaimers</h2>
              <p class="text-ckbody leading-relaxed">This website and its content are provided "as is" and "as available", without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of dealing. We do not warrant that the website will be uninterrupted, error-free, secure, or that defects will be corrected. We do not make any representations or warranties regarding the accuracy, completeness, or reliability of any content on this website. For client engagements, warranty terms are governed by the executed MSA and SOW, which typically include a 30-day hyper-care warranty for production deliverables.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">5. Limitation of liability</h2>
              <p class="text-ckbody leading-relaxed">To the maximum extent permitted by applicable law, in no event shall ClickTake Technologies, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of, or inability to access or use, this website or its content. For client engagements, liability limitations are governed by the executed MSA, which typically caps aggregate liability at the fees paid in the preceding twelve months.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">6. Governing law</h2>
              <p class="text-ckbody leading-relaxed">These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be resolved exclusively in the state or federal courts located in Delaware, and you consent to personal jurisdiction and venue in those courts. For client engagements, governing law and dispute resolution are governed by the executed MSA.</p>
            </section>

            <section>
              <h2 class="font-display text-2xl font-bold text-ckheading mb-3">7. Contact</h2>
              <p class="text-ckbody leading-relaxed">If you have questions about these Terms, contact us at info@clicktaketech.com.</p>
            </section>
          </div>
        </div>
      </div>
    </section>
'''

print("Part 7 (careers + privacy + terms) prepared.")

# ============================================================================
# UNIVERSAL FOOTER (4-column)
# ============================================================================
FOOTER = '''
    <!-- ========== Universal 4-Column Footer ========== -->
    <footer class="relative mt-20 border-t border-ckbody/10">
      <div class="absolute inset-x-0 top-0 h-px" style="background:linear-gradient(90deg,transparent,#136DFF 30%,#FF53A9 70%,transparent);"></div>

      <div class="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div class="grid lg:grid-cols-4 gap-10">
          <!-- Brand column -->
          <div class="lg:col-span-1">
            <a href="#home" data-nav="home" class="flex items-center gap-2.5 mb-5">
              <span class="relative inline-flex h-9 w-9 items-center justify-center rounded-xl" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </span>
              <span class="font-display font-bold text-lg text-ckheading">ClickTake<span class="grad-text">.</span></span>
            </a>
            <p class="text-sm text-ckbody leading-relaxed mb-5">Engineering tomorrow's intelligence, today. Bespoke software, autonomous AI agents, and cloud architecture for global enterprises.</p>
            <div class="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/clicktaketech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-9 h-9 rounded-lg glass-soft flex items-center justify-center hover:border-ckblue/40 transition-colors">
                <i data-lucide="linkedin" class="w-4 h-4 text-ckbody"></i>
              </a>
              <a href="https://twitter.com/clicktaketech" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="w-9 h-9 rounded-lg glass-soft flex items-center justify-center hover:border-ckblue/40 transition-colors">
                <i data-lucide="twitter" class="w-4 h-4 text-ckbody"></i>
              </a>
              <a href="https://github.com/clicktaketech" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-9 h-9 rounded-lg glass-soft flex items-center justify-center hover:border-ckblue/40 transition-colors">
                <i data-lucide="github" class="w-4 h-4 text-ckbody"></i>
              </a>
              <a href="mailto:info@clicktaketech.com" aria-label="Email" class="w-9 h-9 rounded-lg glass-soft flex items-center justify-center hover:border-ckblue/40 transition-colors">
                <i data-lucide="mail" class="w-4 h-4 text-ckbody"></i>
              </a>
            </div>
          </div>

          <!-- Services column -->
          <div>
            <h4 class="font-display font-bold text-ckheading text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul class="space-y-3 text-sm">
              <li><a href="#services" data-nav="services" class="text-ckbody hover:text-ckheading transition-colors">Custom Web & Mobile</a></li>
              <li><a href="#services" data-nav="services" class="text-ckbody hover:text-ckheading transition-colors">Cloud & DevOps</a></li>
              <li><a href="#services" data-nav="services" class="text-ckbody hover:text-ckheading transition-colors">AI / ML Pipelines</a></li>
              <li><a href="#services" data-nav="services" class="text-ckbody hover:text-ckheading transition-colors">Security Systems</a></li>
              <li><a href="#solutions" data-nav="solutions" class="text-ckbody hover:text-ckheading transition-colors">AI Platform</a></li>
            </ul>
          </div>

          <!-- Company column -->
          <div>
            <h4 class="font-display font-bold text-ckheading text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul class="space-y-3 text-sm">
              <li><a href="#about" data-nav="about" class="text-ckbody hover:text-ckheading transition-colors">About</a></li>
              <li><a href="#cases" data-nav="cases" class="text-ckbody hover:text-ckheading transition-colors">Case Studies</a></li>
              <li><a href="#blog" data-nav="blog" class="text-ckbody hover:text-ckheading transition-colors">Blog</a></li>
              <li><a href="#careers" data-nav="careers" class="text-ckbody hover:text-ckheading transition-colors">Careers</a></li>
              <li><a href="#contact" data-nav="contact" class="text-ckbody hover:text-ckheading transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Contact + newsletter column -->
          <div>
            <h4 class="font-display font-bold text-ckheading text-sm uppercase tracking-wider mb-4">Get in touch</h4>
            <ul class="space-y-3 text-sm mb-5">
              <li class="flex items-start gap-2">
                <i data-lucide="mail" class="w-4 h-4 text-ckblue mt-0.5"></i>
                <a href="mailto:info@clicktaketech.com" class="text-ckbody hover:text-ckheading transition-colors">info@clicktaketech.com</a>
              </li>
              <li class="flex items-start gap-2">
                <i data-lucide="phone" class="w-4 h-4 text-ckpink mt-0.5"></i>
                <a href="tel:+18005550100" class="text-ckbody hover:text-ckheading transition-colors">+1 (800) 555-0100</a>
              </li>
              <li class="flex items-start gap-2">
                <i data-lucide="map-pin" class="w-4 h-4 text-ckpurple mt-0.5"></i>
                <span class="text-ckbody">Remote-first · Global team</span>
              </li>
            </ul>
            <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-5 py-2.5 font-display font-semibold text-sm inline-flex items-center gap-2">Book a Demo <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></a>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-12 pt-8 border-t border-ckbody/10 flex flex-wrap items-center justify-between gap-4">
          <div class="text-xs font-mono text-ckbody/60">© 2025 ClickTake Technologies. All rights reserved.</div>
          <div class="flex items-center gap-5 text-xs font-mono">
            <a href="#privacy" data-nav="privacy" class="text-ckbody/70 hover:text-ckheading transition-colors">Privacy Policy</a>
            <a href="#terms" data-nav="terms" class="text-ckbody/70 hover:text-ckheading transition-colors">Terms of Service</a>
            <a href="#contact" data-nav="contact" class="text-ckbody/70 hover:text-ckheading transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>

  </div> <!-- /relative z-10 -->

'''

# ============================================================================
# JAVASCRIPT — router, tilt, glow, particles, observer, form, calendar
# ============================================================================
JS = r'''
  <script>
    // ============================================================
    // SPA ROUTER — hashchange based, with per-page SEO meta updates
    // ============================================================
    const PAGES = {
      home: {
        title: 'ClickTake Technologies — Software · AI Agents · Cloud Architecture',
        desc: 'ClickTake Technologies engineers bespoke software, autonomous AI agents, and cloud architecture for global enterprises. 99.9% uptime, 150+ apps shipped, 10M+ API requests/day.',
        kw: 'AI agents, custom software development, cloud DevOps, RAG, LLM fine-tuning, multi-agent orchestration, enterprise AI, ClickTake',
        url: 'https://clicktaketech.com/'
      },
      services: {
        title: 'Services — Custom Software, Cloud DevOps, AI/ML, Security | ClickTake',
        desc: 'Full-spectrum engineering services: custom web/mobile apps (Next.js 16, React Native), enterprise cloud DevOps (AWS/GCP/Azure), AI/ML pipelines, and security systems.',
        kw: 'custom software development services, cloud devops consulting, AI ML pipeline, security audit, Next.js, Terraform, Kubernetes',
        url: 'https://clicktaketech.com/#services'
      },
      solutions: {
        title: 'AI Platform — Multi-Agent Orchestration, RAG, LLM Fine-Tuning | ClickTake',
        desc: 'Production AI platform: multi-agent orchestration with LangGraph, enterprise RAG over 10M+ documents, custom LLM fine-tuning (LoRA/QLoRA/DPO). p99 < 200ms.',
        kw: 'multi-agent orchestration, LangGraph, enterprise RAG, LLM fine-tuning, LoRA, QLoRA, DPO, vLLM, Pinecone, Weaviate',
        url: 'https://clicktaketech.com/#solutions'
      },
      cases: {
        title: 'Case Studies — Production Client Impact | ClickTake Technologies',
        desc: 'Real client outcomes: 72% latency reduction for fintech, +38% conversion for e-commerce, $1.4M annual savings for healthcare, 31% fewer empty miles for logistics.',
        kw: 'case studies, client success, fintech API, e-commerce AI, healthcare RAG, logistics agents, ROI metrics',
        url: 'https://clicktaketech.com/#cases'
      },
      contact: {
        title: 'Contact & Book a Demo | ClickTake Technologies',
        desc: 'Book a 30-minute architecture review with a senior ClickTake engineer. Multi-step form, calendar widget, direct contact: info@clicktaketech.com.',
        kw: 'contact ClickTake, book demo, software consultation, AI architecture review, enterprise software quote',
        url: 'https://clicktaketech.com/#contact'
      },
      about: {
        title: 'About — Senior Engineering Team | ClickTake Technologies',
        desc: 'Founded 2019. 38 senior engineers across 9 time zones. 150+ production deployments, 94% client retention, 99.9% uptime SLAs. Ship over polish, radical transparency, no vendor lock-in.',
        kw: 'about ClickTake, senior engineering team, remote-first, software agency, AI consultancy',
        url: 'https://clicktaketech.com/#about'
      },
      blog: {
        title: 'Blog — Engineering Notes from Production | ClickTake',
        desc: 'Field notes from our engineering team: multi-agent system design, RAG at scale, cloud cost optimization, Next.js 16 migration, SOC 2 prep, fine-tuning vs RAG.',
        kw: 'AI engineering blog, multi-agent systems, RAG pipeline, cloud cost optimization, Next.js 16, SOC 2, LLM fine-tuning',
        url: 'https://clicktaketech.com/#blog'
      },
      careers: {
        title: 'Careers — Senior Engineering Roles | ClickTake Technologies',
        desc: 'Remote-first, top-of-market salaries, 38-person senior team. Open roles: Full-Stack Engineer, Staff ML Engineer, Cloud Architect, Security Engineer, Product Designer.',
        kw: 'software engineer jobs, remote AI engineer, ML engineer careers, cloud architect jobs, senior developer roles',
        url: 'https://clicktaketech.com/#careers'
      },
      privacy: {
        title: 'Privacy Policy | ClickTake Technologies',
        desc: 'ClickTake Technologies Privacy Policy. GDPR, CCPA, and HIPAA compliant. We do not sell personal information. Contact: info@clicktaketech.com.',
        kw: 'privacy policy, GDPR, CCPA, HIPAA, data protection, ClickTake',
        url: 'https://clicktaketech.com/#privacy'
      },
      terms: {
        title: 'Terms of Service | ClickTake Technologies',
        desc: 'ClickTake Technologies Terms of Service. Governing law: Delaware, USA. Intellectual property, warranty disclaimers, limitation of liability.',
        kw: 'terms of service, ClickTake legal, software consulting agreement, IP rights',
        url: 'https://clicktaketech.com/#terms'
      }
    };

    function navigateTo(page) {
      if (!PAGES[page]) page = 'home';
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const target = document.querySelector('[data-page="' + page + '"]');
      if (target) target.classList.add('active');
      document.querySelectorAll('[data-nav]').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-nav') === page);
      });
      const meta = PAGES[page];
      document.title = meta.title;
      document.querySelector('meta[name="description"]').setAttribute('content', meta.desc);
      document.querySelector('meta[name="keywords"]').setAttribute('content', meta.kw);
      document.querySelector('link[rel="canonical"]').setAttribute('href', meta.url);
      document.querySelector('meta[property="og:title"]').setAttribute('content', meta.title);
      document.querySelector('meta[property="og:description"]').setAttribute('content', meta.desc);
      document.querySelector('meta[property="og:url"]').setAttribute('content', meta.url);
      document.querySelector('meta[name="twitter:title"]').setAttribute('content', meta.title);
      document.querySelector('meta[name="twitter:description"]').setAttribute('content', meta.desc);
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('mobile-menu').classList.remove('open');
      setTimeout(() => {
        document.querySelectorAll('.page.active .reveal').forEach(el => {
          revealObserver.observe(el);
        });
        if (window.lucide) window.lucide.createIcons();
      }, 50);
    }

    window.addEventListener('hashchange', () => {
      const hash = (window.location.hash || '#home').replace('#', '');
      navigateTo(hash);
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-nav]');
      if (link) {
        e.preventDefault();
        const page = link.getAttribute('data-nav');
        window.location.hash = '#' + page;
      }
    });

    // ============================================================
    // INTERSECTION OBSERVER — scroll reveal
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // ============================================================
    // PARALLAX TILT
    // ============================================================
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(1000px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateZ(0)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      });
    });

    // ============================================================
    // RADIAL GLOW FOLLOW
    // ============================================================
    document.querySelectorAll('.glow-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        btn.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });

    // ============================================================
    // COUNTER ANIMATION
    // ============================================================
    function animateCounter(el) {
      const target = parseFloat(el.getAttribute('data-counter'));
      const suffix = el.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = target * eased;
        el.textContent = (isDecimal ? v.toFixed(1) : Math.floor(v)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    // ============================================================
    // CANVAS PARTICLE BACKGROUND
    // ============================================================
    (function initParticles() {
      const canvas = document.getElementById('particle-canvas');
      const ctx = canvas.getContext('2d');
      let particles = [];
      let w, h;
      const COLORS = ['#136DFF', '#FF53A9', '#7B2FBE'];

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        const count = Math.min(Math.floor((w * h) / 18000), 90);
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.6 + 0.4,
            c: COLORS[Math.floor(Math.random() * COLORS.length)],
            a: Math.random() * 0.5 + 0.15
          });
        }
      }
      resize();
      window.addEventListener('resize', resize);

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.c;
          ctx.globalAlpha = p.a;
          ctx.fill();
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x, dy = p.y - q.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = p.c;
              ctx.globalAlpha = (1 - dist / 130) * 0.12;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
      }
      draw();
    })();

    // ============================================================
    // MOBILE MENU
    // ============================================================
    document.getElementById('mobile-toggle').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.add('open');
    });
    document.getElementById('mobile-close').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.remove('open');
    });

    // ============================================================
    // MULTI-STEP CONTACT FORM
    // ============================================================
    function showFormStep(n) {
      document.querySelectorAll('.form-step').forEach(s => s.classList.add('hidden'));
      document.querySelector('[data-form-step="' + n + '"]').classList.remove('hidden');
      document.querySelectorAll('.step-dot').forEach(d => {
        const s = parseInt(d.getAttribute('data-step'));
        d.classList.remove('active', 'done', 'idle');
        if (s < n) d.classList.add('done');
        else if (s === n) d.classList.add('active');
        else d.classList.add('idle');
      });
      document.querySelectorAll('.step-line').forEach(l => {
        const s = parseInt(l.getAttribute('data-line'));
        l.classList.toggle('done', s < n);
      });
    }
    document.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        showFormStep(parseInt(btn.getAttribute('data-next')));
      });
    });
    document.querySelectorAll('[data-prev]').forEach(btn => {
      btn.addEventListener('click', () => {
        showFormStep(parseInt(btn.getAttribute('data-prev')));
      });
    });
    document.getElementById('submit-booking').addEventListener('click', () => {
      document.getElementById('booking-success').classList.remove('hidden');
      document.getElementById('submit-booking').disabled = true;
      document.getElementById('submit-booking').textContent = 'Confirmed';
    });

    // ============================================================
    // CALENDAR WIDGET
    // ============================================================
    (function initCalendar() {
      const grid = document.getElementById('cal-grid');
      const monthLabel = document.getElementById('cal-month');
      let viewDate = new Date();
      const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      function render() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const today = new Date();
        monthLabel.textContent = monthNames[month] + ' ' + year;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        grid.innerHTML = '';
        for (let i = 0; i < firstDay; i++) {
          const empty = document.createElement('div');
          grid.appendChild(empty);
        }
        for (let d = 1; d <= daysInMonth; d++) {
          const cell = document.createElement('div');
          cell.className = 'cal-day';
          cell.textContent = d;
          const cellDate = new Date(year, month, d);
          const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
          if (isPast || isWeekend) cell.classList.add('disabled');
          if (cellDate.toDateString() === today.toDateString()) cell.classList.add('today');
          if (!isPast && !isWeekend) {
            cell.addEventListener('click', () => {
              grid.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
              cell.classList.add('selected');
            });
          }
          grid.appendChild(cell);
        }
      }
      document.getElementById('cal-prev').addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() - 1);
        render();
      });
      document.getElementById('cal-next').addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() + 1);
        render();
      });
      render();
    })();

    // ============================================================
    // INIT
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) window.lucide.createIcons();
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
      document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
      const hash = (window.location.hash || '#home').replace('#', '');
      navigateTo(PAGES[hash] ? hash : 'home');
    });
  </script>
</body>
</html>
'''

# ============================================================================
# ASSEMBLE & WRITE
# ============================================================================
html = HEAD + AMBIENT + HEADER + PAGE_HOME + PAGE_SERVICES + PAGE_SOLUTIONS + PAGE_CASES + PAGE_CONTACT + PAGE_ABOUT + PAGE_BLOG + PAGE_CAREERS + PAGE_PRIVACY + PAGE_TERMS + FOOTER + JS

OUT = Path("/home/z/my-project/download/clicktake-landing.html")
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(html, encoding='utf-8')

lines = html.count('\n') + 1
size_kb = len(html.encode('utf-8')) / 1024
print(f"=== BUILD COMPLETE ===")
print(f"Output: {OUT}")
print(f"Size: {size_kb:.1f} KB")
print(f"Lines: {lines}")
print(f"\nPage sections:")
for page in ['home','services','solutions','cases','contact','about','blog','careers','privacy','terms']:
    found = f'data-page="{page}"' in html
    print(f"  [{'OK' if found else 'MISSING'}] {page}")
print(f"\nMascots:")
for m in ['mascot-dev','mascot-ai','mascot-data']:
    print(f"  [{'OK' if m in html else 'MISSING'}] {m}")
print(f"\nKey features:")
checks = {
    'particle-canvas': 'particle-canvas',
    'tilt-card': 'tilt-card',
    'glow-btn': 'glow-btn',
    'form-step': 'form-step',
    'cal-grid': 'cal-grid',
    'holo-ring': 'holo-ring',
    'perspective-grid': 'perspective-grid',
    'marquee-track': 'marquee-track',
    'JSON-LD': 'application/ld+json',
    'hashchange': 'hashchange',
    'IntersectionObserver': 'IntersectionObserver',
    'navigateTo': 'navigateTo'
}
for label, token in checks.items():
    print(f"  [{'OK' if token in html else 'MISSING'}] {label}")
print(f"\nColor palette compliance:")
for c in ['#03000D','#070018','#0D0025','#136DFF','#FF53A9','#7B2FBE','#F0EBF8','#9A8CB5']:
    print(f"  [{'OK' if c in html else 'MISSING'}] {c}")
print(f"\nInternal links (data-nav count): {html.count('data-nav=')}")
