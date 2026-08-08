#!/usr/bin/env python3
"""Patch Terms page to match product standard."""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/scripts/build_v4_combined.py")
src = SRC.read_text()

NEW_TERMS = '''PAGE_TERMS = \'\'\'
    <!-- ========== PAGE: TERMS ========== -->
    <section data-page="terms" class="page">
      <div class="pt-32 lg:pt-40 pb-12">
        <div class="max-w-7xl mx-auto px-5 lg:px-8">
          <nav class="crumb text-xs font-mono text-ckbody/70 mb-6" aria-label="Breadcrumb">
            <a href="#home" data-nav="home">Home</a> <span class="mx-2">/</span> <span class="text-ckheading">Terms of Service</span>
          </nav>
          <div class="grid lg:grid-cols-3 gap-10 items-start">
            <div class="lg:col-span-2 reveal">
              <span class="tag mb-4 inline-flex"><i data-lucide="file-text" class="w-3.5 h-3.5"></i>Legal</span>
              <h1 class="font-display text-4xl lg:text-6xl font-bold text-ckheading mb-3 leading-tight">Terms of <span class="grad-text">Service</span></h1>
              <p class="text-sm text-ckbody/70 font-mono mb-8">Last updated: August 1, 2025</p>
              <p class="text-lg text-ckbody leading-relaxed mb-8">The rules of the road for using clicktaketech.com and engaging our services. Plain English wherever possible — when you sign an MSA, that document controls over these Terms.</p>

              <div class="space-y-5">
                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#7B2FBE);">
                        <span class="font-display font-bold text-white text-sm">1</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Acceptance of terms</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">By accessing or using the ClickTake Technologies website (clicktaketech.com) and any services provided by ClickTake Technologies ("ClickTake", "we", "us", "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access our website or use our services. These Terms constitute a legally binding agreement between you and ClickTake. We may update these Terms from time to time, and we will notify you of material changes by posting the updated Terms on this page with a revised "Last updated" date. Your continued use of our website or services after any such change constitutes your acceptance of the updated Terms.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#FF53A9,#7B2FBE);">
                        <span class="font-display font-bold text-white text-sm">2</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Services</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed mb-3">ClickTake Technologies provides custom software development, cloud and DevOps engineering, AI and machine learning pipeline development, and security consulting services to enterprise clients. The specific scope, deliverables, timeline, and fees for any engagement are governed by a separate Master Services Agreement (MSA) and Statement of Work (SOW) executed between you and ClickTake. In the event of any conflict between these Terms and the executed MSA or SOW, the terms of the MSA or SOW shall control with respect to the subject matter of the engagement.</p>
                    <p class="text-ckbody leading-relaxed">Our website also provides informational content including blog posts, case studies, and marketing materials. This content is provided for general informational purposes only and does not constitute professional advice. We make no representations about the suitability of this content for any specific business purpose.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#7B2FBE,#136DFF);">
                        <span class="font-display font-bold text-white text-sm">3</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Intellectual property</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed mb-3">All content on this website — including text, graphics, logos, images, audio, video, software code examples, and the overall look and feel — is the property of ClickTake Technologies or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, or otherwise exploit any content from this website without our prior written consent, except as expressly permitted by fair use under applicable copyright law.</p>
                    <p class="text-ckbody leading-relaxed">For client engagements, intellectual property rights in deliverables are governed by the executed MSA and SOW. Unless otherwise specified, custom code written for a client engagement becomes the client\\'s property upon full payment, while ClickTake retains ownership of its pre-existing tools, libraries, frameworks, and methodologies used in the engagement.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                        <span class="font-display font-bold text-white text-sm">4</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Warranty disclaimers</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">This website and its content are provided "as is" and "as available", without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of dealing. We do not warrant that the website will be uninterrupted, error-free, secure, or that defects will be corrected. We do not make any representations or warranties regarding the accuracy, completeness, or reliability of any content on this website. For client engagements, warranty terms are governed by the executed MSA and SOW, which typically include a 30-day hyper-care warranty for production deliverables.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#FF53A9,#136DFF);">
                        <span class="font-display font-bold text-white text-sm">5</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Limitation of liability</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">To the maximum extent permitted by applicable law, in no event shall ClickTake Technologies, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of, or inability to access or use, this website or its content. For client engagements, liability limitations are governed by the executed MSA, which typically caps aggregate liability at the fees paid in the preceding twelve months.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#7B2FBE,#FF53A9);">
                        <span class="font-display font-bold text-white text-sm">6</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Governing law</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law provisions. Any dispute arising under these Terms shall be resolved exclusively in the state or federal courts located in Delaware, and you consent to personal jurisdiction and venue in those courts. For client engagements, governing law and dispute resolution are governed by the executed MSA.</p>
                  </div>
                </div>

                <div class="tilt-card glass rounded-2xl p-7 reveal">
                  <div class="tilt-layer">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#136DFF,#FF53A9);">
                        <span class="font-display font-bold text-white text-sm">7</span>
                      </div>
                      <h2 class="font-display text-2xl font-bold text-ckheading">Contact</h2>
                    </div>
                    <p class="text-ckbody leading-relaxed">If you have questions about these Terms, contact us at info@clicktaketech.com.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <aside class="lg:sticky lg:top-28 space-y-5 reveal">
              <div class="glass rounded-3xl p-6 relative overflow-hidden">
                <div class="relative h-32 mb-4">
                  \'\'\' + MASCOTS["dev"] + \'\'\'
                </div>
                <h3 class="font-display font-bold text-ckheading mb-2">Quick nav</h3>
                <ul class="space-y-2 text-sm">
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Acceptance of terms</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Services</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Intellectual property</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Warranty disclaimers</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Limitation of liability</a></li>
                  <li><a href="#" class="text-ckbody hover:text-ckheading transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-ckblue"></i>Governing law</a></li>
                </ul>
              </div>

              <div class="glass rounded-3xl p-6">
                <h3 class="font-display font-bold text-ckheading mb-3 text-sm uppercase tracking-wider">Key facts</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex items-start gap-2">
                    <i data-lucide="gavel" class="w-4 h-4 text-ckblue mt-0.5 flex-shrink-0"></i>
                    <div>
                      <div class="text-ckbody/70 text-xs">Governing law</div>
                      <div class="text-ckheading">Delaware, USA</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <i data-lucide="file-signature" class="w-4 h-4 text-ckpink mt-0.5 flex-shrink-0"></i>
                    <div>
                      <div class="text-ckbody/70 text-xs">Client agreement</div>
                      <div class="text-ckheading">MSA + SOW controls</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <i data-lucide="clock" class="w-4 h-4 text-ckpurple mt-0.5 flex-shrink-0"></i>
                    <div>
                      <div class="text-ckbody/70 text-xs">Hyper-care warranty</div>
                      <div class="text-ckheading">30 days post-launch</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="glass rounded-3xl p-6 text-center">
                <h3 class="font-display font-bold text-ckheading mb-2 text-sm">Have questions?</h3>
                <p class="text-xs text-ckbody mb-4">Reach out before signing.</p>
                <a href="#contact" data-nav="contact" class="glow-btn rounded-xl px-4 py-2.5 font-display font-semibold text-sm w-full inline-flex items-center justify-center gap-2"><i data-lucide="message-circle" class="w-3.5 h-3.5"></i>Talk to us</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
\'\'\'
'''

src = re.sub(
    r"PAGE_TERMS = '''(.*?)'''",
    lambda m: NEW_TERMS,
    src,
    count=1,
    flags=re.DOTALL
)
SRC.write_text(src)
print("Terms page patched.")
