"""
HTML template functions for each page type.
Each function returns a complete <section data-page="slug">...</section> string.
All templates use the existing Glassmorphism 2.0 design system.
"""
from html import escape
from clicktake_pages import SERVICES, CASE_STUDIES


def _breadcrumb(items):
    """items: list of (label, slug) tuples. Last item is current page (no link)."""
    parts = ['<nav class="breadcrumb" aria-label="Breadcrumb"><ol class="flex flex-wrap items-center gap-2 text-sm text-ckbody/70">']
    for i, (label, slug) in enumerate(items):
        if i == len(items) - 1:
            parts.append(f'<li class="text-ckbody/90 font-medium" aria-current="page">{escape(label)}</li>')
        else:
            parts.append(f'<li><a href="#{slug}" data-nav="{slug}" class="hover:text-ckblue transition-colors">{escape(label)}</a></li>')
            parts.append('<li class="text-ckbody/40">/</li>')
    parts.append('</ol></nav>')
    return ''.join(parts)


# Varied paragraph templates for blog article sections.
# 5 distinct templates per paragraph slot (a/b), cycled by section index.
# Each substitutes the section title (s) and avoids duplication across sections.
_BLOG_PARAS_A = [
    lambda s: f"In this section we dig into {s.lower()} — not as a theoretical concept, but as the exact set of decisions, code patterns, and trade-offs our engineers make on client engagements every week. We open with the most common failure mode we see when teams attempt this on their own, then walk through the architecture or workflow we've settled on after 40+ production deployments. Expect concrete numbers: latency budgets, error rates, cost-per-unit, time-to-shipped. Where a choice is contested in the industry, we name the alternatives we rejected and why. The goal is to leave you with a mental model you can apply on Monday morning, not a list of buzzwords.",
    lambda s: f"Let's be specific about {s.lower()}. We'll start with the version of this that most teams try first — usually copied from a popular blog post or vendor demo — and explain why it breaks at production scale. Then we layer in the changes we've found matter most: observability hooks, fallback paths, the boring security headers nobody remembers, the one database index that takes p99 from 4s to 200ms. We've made every mistake in this list at least once; the goal of this section is to spare you the same debugging sessions. Wherever we reference a tool, we link the exact version we're running and note any flags or config we had to tune.",
    lambda s: f"This is where {s.lower()} gets interesting — and where most off-the-shelf playbooks stop being useful. The first 80% of the implementation is well-documented; the last 20% is where senior engineering judgment lives. We cover that 20% here: the edge cases that only surface under real traffic, the integrations that break in non-obvious ways, the monitoring signals that tell you something is wrong before customers notice. We also include the questions you should be asking your team or vendor if any of this feels unfamiliar. By the end you should be able to evaluate whether your current setup is healthy, and if not, what to fix first.",
    lambda s: f"Approaching {s.lower()} as a senior engineer means resisting two temptations: over-engineering for hypothetical scale, and under-engineering because the demo worked. This section is our attempt at the middle path. We walk through the architecture we actually run in production — not the simplified slide deck version — including the bits we're slightly embarrassed about and plan to refactor. We also include a short checklist you can run against your own setup. If you can answer every item with \"yes, and here's the metric that proves it,\" you're in good shape. If not, the section ends with the three highest-leverage fixes we'd prioritize.",
    lambda s: f"The honest version of {s.lower()} is messier than the conference-talk version. In this section we cover the implementation details that don't fit in a 30-minute lightning talk: the migration plan that didn't go sideways, the one that did, and what we learned from each. We include the actual PRs we shipped (or sanitized versions of them), the rollout strategy that let us revert in under 90 seconds when something broke, and the postmortem template we use to capture lessons so we don't repeat them. If you're about to attempt something similar, this should give you a 4-6 week head start.",
]

_BLOG_PARAS_B = [
    lambda s: f"What we've learned from shipping {s.lower()} across multiple clients is that the technology is rarely the bottleneck — the bottleneck is organizational. Who owns this after launch? What's the on-call rotation? How do we know if it's getting worse? We address each of these explicitly: ownership handoff templates, runbooks we've stolen from SRE teams smarter than us, and the dashboard layout we've converged on after years of trial and error. If you take only one thing from this section, take the dashboard layout — it's the single highest-leverage artifact we ship on every engagement.",
    lambda s: f"The economics of {s.lower()} matter as much as the engineering. We close this section with a rough cost model: what we spent to build it, what we spend to run it monthly, and the break-even point where the investment starts returning positive ROI. Numbers are anonymized but real, drawn from 2026 client engagements. If your CFO asks why this is worth funding, the answer is here. If your CTO asks why it's worth doing in-house rather than buying a SaaS that does 70% of it, the answer is also here — and it's not always \"build it yourself.\"",
    lambda s: f"Two things we want to flag before moving on. First, {s.lower()} is one of those capabilities where the second iteration is dramatically better than the first — budget for a v2 within 90 days of launch, not 12 months. Second, the failure mode we see most often isn't technical; it's that the team who built it gets reassigned and nobody is left who understands why the config is the way it is. Document the why, not just the what. We include our template for architecture decision records (ADRs) at the end of this section.",
    lambda s: f"If you're evaluating whether {s.lower()} is worth pursuing for your context, here's the framework we use. We score the opportunity on five dimensions: strategic alignment, technical feasibility, cost-to-build, cost-to-operate, and risk-if-we-don't. Each gets a 1-5 score. Anything that totals 18+ is a yes. Anything below 12 is a no. The middle is where the interesting conversations happen — and where we usually propose a 6-week spike to de-risk the highest-uncertainty dimension before committing to a full build. We've found this framework more useful than any vendor ROI calculator we've ever been sent.",
    lambda s: f"Finally, a note on what {s.lower()} looks like 12 months from now. The space is moving fast — faster than most teams can keep up with internally. We close with the three signals we're tracking that will tell us the next shift is coming, and the canary tests we run quarterly to know when our current setup is starting to underperform. If you're working with us, this is the kind of forward-looking context you get on every quarterly review. If you're not, we hope this section at least gives you a head start on the questions to ask.",
]

def _blog_para_a(i, s):
    """Varied 'first paragraph' for blog section i, substituting section title s."""
    return _BLOG_PARAS_A[i % len(_BLOG_PARAS_A)](s)

def _blog_para_b(i, s):
    """Varied 'second paragraph' for blog section i, substituting section title s."""
    return _BLOG_PARAS_B[i % len(_BLOG_PARAS_B)](s)


def _hero(slug, eyebrow, title, subtitle, cta_label="Book a Demo", cta_slug="contact"):
    """Standard page hero with eyebrow, gradient title, subtitle, CTA."""
    return f'''
      <div class="relative pt-32 lg:pt-40 pb-16 overflow-hidden">
        <div class="absolute inset-x-0 bottom-0 h-72 perspective-grid opacity-20" aria-hidden="true"></div>
        <div class="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div class="reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-soft text-xs font-mono uppercase tracking-widest text-ckpink mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-ckpink animate-pulse"></span>
              {escape(eyebrow)}
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              <span class="gradient-text">{escape(title)}</span>
            </h1>
            <p class="text-lg md:text-xl text-ckbody max-w-3xl mx-auto mb-10 leading-relaxed">{escape(subtitle)}</p>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <a href="#{cta_slug}" data-nav="{cta_slug}" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold text-white inline-flex items-center gap-2">
                <i data-lucide="calendar" class="w-4 h-4"></i> {escape(cta_label)}
              </a>
              <a href="https://wa.link/iqz8eg" target="_blank" rel="noopener noreferrer" class="rounded-xl px-7 py-3.5 font-display font-semibold glass-soft text-ckheading hover:border-ckblue/40 transition-colors inline-flex items-center gap-2">
                <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>'''


def _section_heading(eyebrow, title, subtitle=None):
    sub_html = f'<p class="text-base md:text-lg text-ckbody mt-4 max-w-2xl mx-auto">{escape(subtitle)}</p>' if subtitle else ''
    return f'''
        <div class="text-center max-w-3xl mx-auto mb-12 reveal">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-xs font-mono uppercase tracking-widest text-ckblue mb-4">{escape(eyebrow)}</div>
          <h2 class="text-3xl md:text-4xl font-display font-bold tracking-tight">{escape(title)}</h2>
          {sub_html}
        </div>''' if title else f'''
        <div class="text-center max-w-3xl mx-auto mb-12 reveal">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-xs font-mono uppercase tracking-widest text-ckblue mb-4">{escape(eyebrow)}</div>
        </div>'''


def _cta_section(title="Ready to deploy your AI workforce?", subtitle="Book a 30-minute architecture review. No slides, no sales — just senior engineers and a whiteboard."):
    return f'''
      <div class="py-20 px-6 lg:px-8">
        <div class="max-w-5xl mx-auto tilt-card glass rounded-3xl p-10 lg:p-14 text-center reveal">
          <h2 class="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            <span class="gradient-text">{escape(title)}</span>
          </h2>
          <p class="text-base md:text-lg text-ckbody max-w-2xl mx-auto mb-8">{escape(subtitle)}</p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold text-white inline-flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4"></i> Book a Demo
            </a>
            <a href="mailto:info@clicktaketech.com" class="rounded-xl px-7 py-3.5 font-display font-semibold glass-soft text-ckheading hover:border-ckblue/40 transition-colors inline-flex items-center gap-2">
              <i data-lucide="mail" class="w-4 h-4"></i> info@clicktaketech.com
            </a>
            <a href="https://wa.link/iqz8eg" target="_blank" rel="noopener noreferrer" class="rounded-xl px-7 py-3.5 font-display font-semibold glass-soft text-ckheading hover:border-ckblue/40 transition-colors inline-flex items-center gap-2">
              <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>'''


# ============================================================================
# SERVICE DETAIL PAGE
# ============================================================================
def render_service_detail(slug, meta):
    d = meta["data"]
    title = d["title"]
    desc = d["desc"]
    cat = d["category"]
    benefits = d["benefits"]
    stack = d["stack"]

    benefits_cards = ''.join(f'''
              <div class="tilt-card glass rounded-2xl p-6 reveal">
                <div class="w-10 h-10 rounded-lg bg-ckblue/10 flex items-center justify-center mb-4">
                  <i data-lucide="check" class="w-5 h-5 text-ckblue"></i>
                </div>
                <h3 class="font-display font-semibold text-lg mb-2">{escape(b)}</h3>
              </div>''' for b in benefits)

    stack_chips = ''.join(f'<span class="px-3 py-1.5 rounded-full glass-soft text-xs font-mono text-ckbody">{escape(s)}</span>' for s in stack)

    related_html = ""
    if d.get("related"):
        rel_slug = d["related"]  # e.g. "seo-growth-sme"
        # Find matching case study title from CASE_STUDIES list
        full_slug = f"case-studies-{rel_slug}"
        rel_title = next((cs[1] for cs in CASE_STUDIES if cs[0] == full_slug), rel_slug.replace("-", " ").title())
        related_html = f'''
      <div class="py-16 px-6 lg:px-8 max-w-6xl mx-auto">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div class="text-xs font-mono uppercase tracking-widest text-ckpink mb-2">Related Case Study</div>
            <h3 class="text-xl md:text-2xl font-display font-bold mb-2">{escape(rel_title)}</h3>
            <p class="text-ckbody">See how we shipped this for a real client.</p>
          </div>
          <a href="#{full_slug}" data-nav="{full_slug}" class="glow-btn rounded-xl px-6 py-3 font-display font-semibold text-white inline-flex items-center gap-2 whitespace-nowrap">
            Read case study <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </div>'''

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Services", "services"), (title, slug)])}
      {_hero(slug, cat, title, desc)}
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("What We Deliver", f"{len(benefits)} capabilities. Senior engineers only.")}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits_cards}
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="text-xs font-mono uppercase tracking-widest text-ckblue mb-4">Tech Stack</div>
          <div class="flex flex-wrap gap-2">{stack_chips}</div>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("How We Work", "4-step process. Transparent from day one.")}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="text-3xl font-display font-bold gradient-text mb-2">01</div><h3 class="font-display font-semibold mb-2">Discovery</h3><p class="text-sm text-ckbody">30-min architecture review. Senior engineer, not sales.</p></div>
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="text-3xl font-display font-bold gradient-text mb-2">02</div><h3 class="font-display font-semibold mb-2">Scope</h3><p class="text-sm text-ckbody">Fixed-scope proposal in 5 business days. No vague estimates.</p></div>
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="text-3xl font-display font-bold gradient-text mb-2">03</div><h3 class="font-display font-semibold mb-2">Ship</h3><p class="text-sm text-ckbody">Weekly demos. Production deploys from week 2.</p></div>
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="text-3xl font-display font-bold gradient-text mb-2">04</div><h3 class="font-display font-semibold mb-2">Support</h3><p class="text-sm text-ckbody">30-day post-launch support. Optional retainer.</p></div>
        </div>
      </div>
      {related_html}
      {_cta_section()}
    </section>'''


# ============================================================================
# SOLUTION DETAIL PAGE
# ============================================================================
def render_solution_detail(slug, meta):
    d = meta["data"]
    title = d["title"]
    tagline = d["tagline"]
    pillars = d["pillars"]
    intro = d["intro"]

    pillars_html = ''.join(f'''
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="w-10 h-10 rounded-lg bg-ckpink/10 flex items-center justify-center mb-4">
              <i data-lucide="zap" class="w-5 h-5 text-ckpink"></i>
            </div>
            <h3 class="font-display font-semibold text-lg mb-2">{escape(p)}</h3>
          </div>''' for p in pillars)

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Solutions", "solutions"), (title, slug)])}
      {_hero(slug, "Solution", title, tagline)}
      <div class="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <p class="text-lg md:text-xl text-ckheading leading-relaxed">{escape(intro)}</p>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("What's Included", f"{len(pillars)} pillars of the solution.")}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars_html}
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("Outcomes", "What you can expect.")}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="tilt-card glass rounded-2xl p-6 text-center reveal"><div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">94%</div><div class="text-xs text-ckbody uppercase tracking-widest">Client Retention</div></div>
          <div class="tilt-card glass rounded-2xl p-6 text-center reveal"><div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">99.9%</div><div class="text-xs text-ckbody uppercase tracking-widest">Uptime SLA</div></div>
          <div class="tilt-card glass rounded-2xl p-6 text-center reveal"><div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">90d</div><div class="text-xs text-ckbody uppercase tracking-widest">Avg Time To Ship</div></div>
          <div class="tilt-card glass rounded-2xl p-6 text-center reveal"><div class="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">38</div><div class="text-xs text-ckbody uppercase tracking-widest">Senior Engineers</div></div>
        </div>
      </div>
      {_cta_section()}
    </section>'''


# ============================================================================
# CASE STUDY DETAIL PAGE
# ============================================================================
def render_case_study_detail(slug, meta):
    d = meta["data"]
    headline = d["headline"]
    client = d["client"]
    challenge = d["challenge"]
    solution = d["solution"]
    metrics = d["metrics"]
    stack = d["stack"]
    quote = d["quote"]
    attributed = d["attributed_to"]

    metrics_html = ''.join(f'''
          <div class="tilt-card glass rounded-2xl p-6 text-center reveal">
            <div class="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">{escape(m)}</div>
          </div>''' for m in metrics)

    stack_chips = ''.join(f'<span class="px-3 py-1.5 rounded-full glass-soft text-xs font-mono text-ckbody">{escape(s)}</span>' for s in stack)

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Case Studies", "cases"), (client, slug)])}
      {_hero(slug, client, headline, "Real client. Real engineering. Real outcomes.")}
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics_html}
        </div>
      </div>
      <div class="max-w-4xl mx-auto px-6 lg:px-8 pb-16 space-y-8">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="text-xs font-mono uppercase tracking-widest text-ckpink mb-3">The Challenge</div>
          <p class="text-lg text-ckheading leading-relaxed">{escape(challenge)}</p>
        </div>
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="text-xs font-mono uppercase tracking-widest text-ckblue mb-3">Our Solution</div>
          <p class="text-lg text-ckheading leading-relaxed">{escape(solution)}</p>
        </div>
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <div class="text-xs font-mono uppercase tracking-widest text-ckpurple mb-3">Tech Stack</div>
          <div class="flex flex-wrap gap-2">{stack_chips}</div>
        </div>
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal border-l-4 border-ckpink">
          <i data-lucide="quote" class="w-8 h-8 text-ckpink mb-4"></i>
          <p class="text-xl md:text-2xl font-display text-ckheading leading-relaxed mb-4">"{escape(quote)}"</p>
          <div class="text-sm text-ckbody">— {escape(attributed)}</div>
        </div>
      </div>
      {_cta_section("Your case study is next.", "Let's talk about what we can build together.")}
    </section>'''


# ============================================================================
# BLOG ARTICLE PAGE
# ============================================================================
def render_blog_article(slug, meta):
    d = meta["data"]
    title = d["title"]
    category = d["category"]
    read_time = d["read_time"]
    date = d["date"]
    author = d["author"]
    excerpt = d["excerpt"]
    sections = d["sections"]

    sections_html = ''.join(f'''
        <section class="mb-8">
          <h2 class="text-2xl md:text-3xl font-display font-bold mb-4 text-ckheading">{escape(f"{i+1}. {s}")}</h2>
          <p class="text-base md:text-lg text-ckbody leading-relaxed mb-4">{_blog_para_a(i, s)}</p>
          <p class="text-base md:text-lg text-ckbody leading-relaxed">{_blog_para_b(i, s)}</p>
        </section>''' for i, s in enumerate(sections))

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Blog", "blog"), (title[:40] + "...", slug)])}
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-3xl mx-auto px-6 lg:px-8">
          <div class="reveal">
            <div class="flex items-center gap-3 mb-6 text-sm">
              <span class="px-3 py-1 rounded-full glass-soft text-xs font-mono uppercase tracking-widest text-ckpink">{escape(category)}</span>
              <span class="text-ckbody">{escape(read_time)}</span>
              <span class="text-ckbody/40">·</span>
              <span class="text-ckbody">{escape(date)}</span>
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 gradient-text">{escape(title)}</h1>
            <p class="text-lg md:text-xl text-ckbody leading-relaxed mb-8">{escape(excerpt)}</p>
            <div class="flex items-center gap-4 pb-8 border-b border-ckbody/10">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-ckblue to-ckpink flex items-center justify-center font-display font-bold text-white text-lg">{escape(author[0])}</div>
              <div>
                <div class="font-display font-semibold">{escape(author)}</div>
                <div class="text-sm text-ckbody">Senior Engineer, ClickTake</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
        <article class="space-y-2 reveal">
          {sections_html}
        </article>
      </div>
      <div class="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal text-center">
          <div class="text-xs font-mono uppercase tracking-widest text-ckblue mb-3">Like what you read?</div>
          <h3 class="text-2xl font-display font-bold mb-4">Work with us.</h3>
          <p class="text-ckbody mb-6">We write from production. We can ship for you too.</p>
          <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold text-white inline-flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4"></i> Book a Demo
          </a>
        </div>
      </div>
      {_cta_section()}
    </section>'''


# ============================================================================
# CAREER DETAIL PAGE
# ============================================================================
def render_career_detail(slug, meta):
    d = meta["data"]
    role = d["role"]
    location_type = d["location_type"]
    salary = d["salary"]
    summary = d["summary"]
    responsibilities = d["responsibilities"]
    requirements = d["requirements"]
    benefits = d["benefits"]

    resp_html = ''.join(f'<li class="flex items-start gap-3 mb-3"><i data-lucide="check-circle-2" class="w-5 h-5 text-ckblue flex-shrink-0 mt-0.5"></i><span class="text-ckbody">{escape(r)}</span></li>' for r in responsibilities)
    req_html = ''.join(f'<li class="flex items-start gap-3 mb-3"><i data-lucide="check-circle-2" class="w-5 h-5 text-ckpink flex-shrink-0 mt-0.5"></i><span class="text-ckbody">{escape(r)}</span></li>' for r in requirements)
    benefits_html = ''.join(f'''
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="w-10 h-10 rounded-lg bg-ckpurple/10 flex items-center justify-center mb-4">
              <i data-lucide="gift" class="w-5 h-5 text-ckpurple"></i>
            </div>
            <h3 class="font-display font-semibold">{escape(b)}</h3>
          </div>''' for b in benefits)

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Careers", "careers"), (role, slug)])}
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-5xl mx-auto px-6 lg:px-8">
          <div class="reveal">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-xs font-mono uppercase tracking-widest text-ckpink mb-4">Open Role</div>
            <h1 class="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 gradient-text">{escape(role)}</h1>
            <div class="flex flex-wrap items-center gap-4 mb-6 text-ckbody">
              <span class="inline-flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4"></i> {escape(location_type)}</span>
              <span class="inline-flex items-center gap-2"><i data-lucide="banknote" class="w-4 h-4"></i> {escape(salary)}</span>
            </div>
            <p class="text-lg md:text-xl text-ckbody leading-relaxed max-w-3xl mb-8">{escape(summary)}</p>
            <a href="mailto:info@clicktaketech.com?subject=Application: {escape(role)}" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold text-white inline-flex items-center gap-2">
              <i data-lucide="send" class="w-4 h-4"></i> Apply Now
            </a>
          </div>
        </div>
      </div>
      <div class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="tilt-card glass rounded-3xl p-8 reveal">
            <h2 class="text-xl font-display font-bold mb-6 flex items-center gap-2"><i data-lucide="briefcase" class="w-5 h-5 text-ckblue"></i> Responsibilities</h2>
            <ul class="space-y-2">{resp_html}</ul>
          </div>
          <div class="tilt-card glass rounded-3xl p-8 reveal">
            <h2 class="text-xl font-display font-bold mb-6 flex items-center gap-2"><i data-lucide="user-check" class="w-5 h-5 text-ckpink"></i> Requirements</h2>
            <ul class="space-y-2">{req_html}</ul>
          </div>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("Benefits", "Why work with us?")}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{benefits_html}</div>
      </div>
      <div class="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <h2 class="text-xl font-display font-bold mb-4">Application Process</h2>
          <ol class="space-y-3">
            <li class="flex gap-3"><span class="text-ckblue font-mono font-bold">1.</span><span class="text-ckbody">Send your CV + GitHub/portfolio to info@clicktaketech.com</span></li>
            <li class="flex gap-3"><span class="text-ckblue font-mono font-bold">2.</span><span class="text-ckbody">30-min intro call with a senior engineer (not HR)</span></li>
            <li class="flex gap-3"><span class="text-ckblue font-mono font-bold">3.</span><span class="text-ckbody">60-min technical conversation (no whiteboard riddles)</span></li>
            <li class="flex gap-3"><span class="text-ckblue font-mono font-bold">4.</span><span class="text-ckbody">Meet 2-3 future teammates informally</span></li>
            <li class="flex gap-3"><span class="text-ckblue font-mono font-bold">5.</span><span class="text-ckbody">Offer within 7 business days of step 1</span></li>
          </ol>
        </div>
      </div>
      {_cta_section("Don't see your role?", "Email us anyway. We're always hiring senior people.")}
    </section>'''


# ============================================================================
# RESOURCE DETAIL PAGE
# ============================================================================
def render_resource_detail(slug, meta):
    d = meta["data"]
    title = d["title"]
    meta_info = d["meta"]
    excerpt = d["excerpt"]
    sections = d["sections"]

    sections_html = ''.join(f'''
          <div class="tilt-card glass rounded-2xl p-6 reveal flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-ckblue/10 flex items-center justify-center flex-shrink-0">
              <i data-lucide="file-text" class="w-5 h-5 text-ckblue"></i>
            </div>
            <div>
              <h3 class="font-display font-semibold text-lg mb-1">{escape(s)}</h3>
              <p class="text-sm text-ckbody">Practical, production-tested guidance from our engineering team.</p>
            </div>
          </div>''' for s in sections)

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Resources", "resources"), (title[:30] + "...", slug)])}
      {_hero(slug, "Free Resource", title, excerpt, cta_label="Download Free", cta_slug="contact")}
      <div class="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-xs font-mono uppercase tracking-widest text-ckpink mb-4">{escape(meta_info)}</div>
          <h2 class="text-2xl md:text-3xl font-display font-bold mb-4">What's inside</h2>
          <p class="text-ckbody mb-8 max-w-2xl mx-auto">This is the same playbook our engineering team uses with clients. No fluff, no sales pitch — just battle-tested patterns you can apply immediately.</p>
          <a href="mailto:info@clicktaketech.com?subject=Resource request: {escape(title)}" class="glow-btn rounded-xl px-7 py-3.5 font-display font-semibold text-white inline-flex items-center gap-2">
            <i data-lucide="download" class="w-4 h-4"></i> Get the PDF
          </a>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("Table of Contents", f"{len(sections)} sections. {meta_info.split('·')[1].strip() if '·' in meta_info else 'Full guide.'}")}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">{sections_html}</div>
      </div>
      {_cta_section("Want this customized for your team?", "We do custom workshops. Book a call.")}
    </section>'''


# ============================================================================
# CITY DETAIL PAGE
# ============================================================================
def render_city_detail(slug, meta):
    d = meta["data"]
    name = d["name"]
    country = d["country"]
    intro = d["intro"]
    services = d["services"]
    blurb = d["blurb"]

    services_html = ''.join(f'''
          <div class="tilt-card glass rounded-2xl p-6 reveal">
            <div class="w-10 h-10 rounded-lg bg-ckpink/10 flex items-center justify-center mb-4">
              <i data-lucide="zap" class="w-5 h-5 text-ckpink"></i>
            </div>
            <h3 class="font-display font-semibold text-lg mb-2">{escape(s)}</h3>
          </div>''' for s in services)

    return f'''
    <section data-page="{slug}" class="page">
      {_breadcrumb([("Home", "home"), ("Cities", "cities"), (name, slug)])}
      {_hero(slug, f"{country}", f"ClickTake {name}", intro)}
      <div class="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div class="tilt-card glass rounded-3xl p-8 lg:p-10 reveal">
          <p class="text-lg md:text-xl text-ckheading leading-relaxed">{escape(blurb)}</p>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("Services in " + name, "Full-stack capabilities, locally aware.")}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{services_html}</div>
      </div>
      <div class="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {_section_heading("Why ClickTake " + name, "3 reasons clients pick us.")}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="w-10 h-10 rounded-lg bg-ckblue/10 flex items-center justify-center mb-4"><i data-lucide="users" class="w-5 h-5 text-ckblue"></i></div><h3 class="font-display font-semibold mb-2">Senior Engineers</h3><p class="text-sm text-ckbody">Average 11 years experience. No juniors on your project.</p></div>
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="w-10 h-10 rounded-lg bg-ckpink/10 flex items-center justify-center mb-4"><i data-lucide="clock" class="w-5 h-5 text-ckpink"></i></div><h3 class="font-display font-semibold mb-2">Time-Zone Aligned</h3><p class="text-sm text-ckbody">9 time zones, 38 engineers. Real overlap with your hours.</p></div>
          <div class="tilt-card glass rounded-2xl p-6 reveal"><div class="w-10 h-10 rounded-lg bg-ckpurple/10 flex items-center justify-center mb-4"><i data-lucide="shield-check" class="w-5 h-5 text-ckpurple"></i></div><h3 class="font-display font-semibold mb-2">GDPR / UK Compliant</h3><p class="text-sm text-ckbody">UK-registered. GDPR, CCPA, HIPAA aware. Your data stays yours.</p></div>
        </div>
      </div>
      {_cta_section(f"Build something in {name}.")}
    </section>'''


# ============================================================================
# MAIN DISPATCHER
# ============================================================================
TEMPLATE_DISPATCH = {
    "service_detail": render_service_detail,
    "solution_detail": render_solution_detail,
    "case_study_detail": render_case_study_detail,
    "blog_article": render_blog_article,
    "career_detail": render_career_detail,
    "resource_detail": render_resource_detail,
    "city_detail": render_city_detail,
}


def render_page(slug, meta):
    """Render a sub-page by template type."""
    template = meta.get("template", "")
    if template in TEMPLATE_DISPATCH:
        return TEMPLATE_DISPATCH[template](slug, meta)
    return ""  # main_* templates are handled by existing build script
