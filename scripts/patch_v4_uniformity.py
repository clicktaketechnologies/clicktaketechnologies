#!/usr/bin/env python3
"""Patch v4 generator: bring privacy, terms, blog, services, cases up to uniform product standard."""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/scripts/build_v4_combined.py")
src = SRC.read_text()

# ============================================================================
# NEW PRIVACY PAGE — 2-col with sidebar quick-nav, mascot, glass cards per section, CTA
# ============================================================================
NEW_PRIVACY = '''PAGE_PRIVACY = \'\'\'
    <!-- ========== PAGE: PRIVACY ========== -->
    <section data-page="privacy" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Privacy Policy</span>
          </nav>
          <div class="grid lg:grid-cols-3 gap-10 items-start">
            <div class="lg:col-span-2 reveal">
              <span class="tag mb-4 inline-flex"><i data-lucide="lock" class="w-3.5 h-3.5"></i>Legal</span>
              <h1 class="font-display text-4xl lg:text-6xl font-bold text-ckheading mb-3 leading-tight">Privacy <span class="grad-text">Policy</span></h1>
              <p class="text-sm text-ckbody/70 font-mono mb-8">Last updated: August 1, 2025</p>
              <p class="text-lg text-ckbody leading-relaxed mb-8">Your data, your rights. This policy explains exactly what we collect, why we collect it, how long we keep it, and how you can request deletion. We don\\'t sell personal information — full stop.</p>

              <div class="space-y-5">
                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#7B2FBE);">
                        <span class="font-display font-bold text-white text-sm">1</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Who we are</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">ClickTake Technologies ("ClickTake", "we", "us", "our") is a software engineering and AI services company headquartered remotely with operations across nine time zones. We provide custom software development, cloud DevOps, AI/ML pipeline engineering, and security consulting services to enterprise clients worldwide. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. We are committed to transparent data practices and operate in compliance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the Health Insurance Portability and Accountability Act (HIPAA) where applicable.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#FF53A9,#7B2FBE);">
                        <span class="font-display font-bold text-white text-sm">2</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Information we collect</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed mb-3">We collect information that you provide directly to us when you fill out our contact form, request a demo, subscribe to our newsletter, or engage our services. This includes your name, work email address, company name, job title, project description, and any information you choose to share in correspondence with our team. We also collect technical information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits. This technical data is collected through server logs and privacy-preserving analytics (Plausible Analytics) that do not use cookies for tracking.</p>
                    <p class="text-ckbody leading-relaxed">When you become a client, we may process additional data on your behalf under a Data Processing Agreement (DPA). This data is governed by the terms of that agreement and is never used for any purpose other than providing the contracted services.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#7B2FBE,#136DFF);">
                        <span class="font-display font-bold text-white text-sm">3</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">How we use your information</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed mb-3">We use the information we collect to respond to your inquiries, schedule and conduct sales and architecture calls, deliver contracted services, send transactional communications, and improve our website and service offerings. Specifically, we use your contact information to communicate with you about your project, your name and company to maintain accurate records of our engagements, and your project description to scope potential engagements and assign appropriate engineering teams. We may also use aggregated, de-identified data for analytics and business intelligence purposes — this data cannot be used to identify you personally.</p>
                    <p class="text-ckbody leading-relaxed">We do not sell your personal information to third parties. We do not use your personal information for cross-contextual behavioral advertising. We do not share your information with data brokers.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                        <span class="font-display font-bold text-white text-sm">4</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Data retention</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with our legal obligations, resolve disputes, and enforce our agreements. Contact form submissions and sales correspondence are retained for 24 months after our last interaction. Client project data is retained for the duration of the engagement plus 36 months for audit and compliance purposes, unless a shorter retention period is specified in your service agreement. You may request deletion of your personal information at any time by emailing info@clicktaketech.com, subject to our legal retention obligations.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#FF53A9,#136DFF);">
                        <span class="font-display font-bold text-white text-sm">5</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Your rights</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed mb-3">Depending on your location, you may have the following rights regarding your personal information: the right to access the personal information we hold about you, the right to request correction of inaccurate information, the right to request deletion of your personal information, the right to request that we restrict the processing of your information, the right to data portability, the right to object to processing, and the right to withdraw consent to processing at any time. California residents have additional rights under the CCPA, including the right to know what personal information is collected and the right to opt-out of the sale of personal information (we do not sell personal information).</p>
                    <p class="text-ckbody leading-relaxed">To exercise any of these rights, email info@clicktaketech.com with the subject line "Privacy Request". We will respond within 30 days.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#7B2FBE,#FF53A9);">
                        <span class="font-display font-bold text-white text-sm">6</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Contact</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">If you have questions about this Privacy Policy or our data practices, contact us at info@clicktaketech.com. We aim to respond to all privacy inquiries within 5 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar: quick nav + mascot + compliance badges + CTA -->
            <aside class="lg:sticky lg:top-28 space-y-5 reveal">
              <div class="glass rounded-3xl p-6 relative overflow-hidden">
                <div class="relative h-32 mb-4">
                  \'\'\' + MASCOTS["ai"] + \'\'\'
                </div>
                <h3 class="font-display font-bold text-ckheading mb-2">Quick nav</h3>
                <ul class="space-y-2 text-sm">
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Who we are</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Information we collect</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>How we use it</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Data retention</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Your rights</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Contact</a></li>
                </ul>
              </div>

              <div class="glass rounded-3xl p-6">
                <h3 class="font-display font-bold text-ckheading mb-3 text-sm uppercase tracking-wider">Compliance</h3>
                <div class="grid grid-cols-2 gap-2">
                  <div class="glass-soft rounded-lg p-3 text-center">
                    <i data-lucide="shield-check" class="w-5 h-5 text-ckblue mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckbody">GDPR</div>
                  </div>
                  <div class="glass-soft rounded-lg p-3 text-center">
                    <i data-lucide="shield-check" class="w-5 h-5 text-ckpink mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckbody">CCPA</div>
                  </div>
                  <div class="glass-soft rounded-lg p-3 text-center">
                    <i data-lucide="shield-check" class="w-5 h-5 text-ckpurple mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckbody">HIPAA</div>
                  </div>
                  <div class="glass-soft rounded-lg p-3 text-center">
                    <i data-lucide="shield-check" class="w-5 h-5 text-ckblue mx-auto mb-1"></i>
                    <div class="text-[10px] font-mono text-ckbody">SOC 2</div>
                  </div>
                </div>
              </div>

              <div class="glass rounded-3xl p-6 text-center">
                <h3 class="font-display font-bold text-ckheading mb-2 text-sm">Questions?</h3>
                <p class="text-xs text-ckbody mb-4">Email our privacy team directly.</p>
                <a href="mailto:info@clicktaketech.com?subject=Privacy Question" class="glow-btn rounded-xl px-4 py-2.5 font-display font-semibold text-sm w-full inline-flex items-center justify-center gap-2"><i data-lucide="mail" class="w-3.5 h-3.5"></i>Email us</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
\'\'\'
'''

# Replace the old PAGE_PRIVACY block
src = re.sub(
    r"PAGE_PRIVACY = '''(.*?)'''",
    lambda m: NEW_PRIVACY,
    src,
    count=1,
    flags=re.DOTALL
)

print("Privacy page patched.")
SRC.write_text(src)
