'use client'

import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { SocialIcons } from "./social-icons";
import { SectionReveal } from "./scroll-animations";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-[32rem] w-[32rem] rounded-full bg-[#136DFF]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[#FF53A9]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: info */}
          <div>
            <SectionReveal variant="fadeUp">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#136DFF]" />
                Get in touch
              </div>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.1}>
              <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight">
                Let's build something{" "}
                <span className="gradient-text">remarkable together.</span>
              </h2>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Tell us about your project. We typically respond within one business day — and the
                first 30 minutes of consultation are always on us.
              </p>
            </SectionReveal>

            {/* Contact methods */}
            <div className="mt-10 space-y-4">
              <SectionReveal variant="slideLeft" delay={0}>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-4 rounded-2xl glass p-5 hover:border-white/20 transition"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-bg shadow-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                    <div className="text-sm font-bold group-hover:text-[#136DFF] transition">
                      {SITE.email}
                    </div>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-foreground transition" />
                </a>
              </SectionReveal>

              {SITE.phones.map((p, i) => (
                <SectionReveal key={p.href} variant="slideLeft" delay={(i + 1) * 0.05}>
                  <a
                    href={p.href}
                    className="group flex items-center gap-4 rounded-2xl glass p-5 hover:border-white/20 transition"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl gradient-bg shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        Phone · {p.label}
                      </div>
                      <div className="text-sm font-bold group-hover:text-[#136DFF] transition">
                        {p.value}
                      </div>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-foreground transition" />
                  </a>
                </SectionReveal>
              ))}

              <SectionReveal variant="slideLeft" delay={0.2}>
                <div className="rounded-2xl glass p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl gradient-bg shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        Global offices
                      </div>
                      <div className="text-sm font-bold">
                        UK · Pakistan · USA · Dubai
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {SITE.locations.map((l) => (
                      <div
                        key={l.country}
                        className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2"
                      >
                        <div className="text-xs font-bold">
                          {l.flag} {l.city}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{l.country}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Socials */}
            <SectionReveal variant="fadeUp" delay={0.2}>
              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Follow ClickTake
                </div>
                <SocialIcons />
              </div>
            </SectionReveal>
          </div>

          {/* Right: form */}
          <SectionReveal variant="zoomIn" delay={0.1}>
            <div className="rounded-3xl glass-strong p-7 sm:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold">Request a callback</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the form below and we'll be in touch within one business day.
              </p>
              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formEl = e.currentTarget;
                  const btn = formEl.querySelector('button[type="submit"]');
                  if (btn) {
                    btn.textContent = 'Sending...';
                    btn.setAttribute('disabled', 'true');
                  }
                  setTimeout(() => {
                    if (btn) {
                      btn.innerHTML = 'Sent ✓';
                    }
                    formEl.reset();
                  }, 1000);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#136DFF] focus:ring-2 focus:ring-[#136DFF]/30 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#136DFF] focus:ring-2 focus:ring-[#136DFF]/30 transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company Ltd."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#136DFF] focus:ring-2 focus:ring-[#136DFF]/30 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Region
                    </label>
                    <select
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm focus:outline-none focus:border-[#136DFF] focus:ring-2 focus:ring-[#136DFF]/30 transition"
                    >
                      <option value="">Select region…</option>
                      <option>🇬🇧 United Kingdom</option>
                      <option>🇵🇰 Pakistan</option>
                      <option>🇺🇸 United States</option>
                      <option>🇦🇪 UAE / Dubai</option>
                      <option>🌍 Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What do you need help with?
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, timeline and budget…"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#136DFF] focus:ring-2 focus:ring-[#136DFF]/30 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:scale-[1.01] transition glow-brand"
                >
                  Send message <Send className="h-4 w-4" />
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  By submitting you agree to be contacted by ClickTake Technologies. We never share your data.
                </p>
              </form>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
