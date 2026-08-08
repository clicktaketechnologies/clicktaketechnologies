
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
