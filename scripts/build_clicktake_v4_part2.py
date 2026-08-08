
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
