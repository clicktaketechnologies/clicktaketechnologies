import type { DeepDiveContent } from "@/components/site/deep-dive/deep-dive-types"

/**
 * /services/web/auth — Auth & Identity
 *
 * 12-section deep dive on SSO, SAML, OIDC, MFA, RBAC, ABAC,
 * SCIM, passkeys, and the enterprise sales enablement of identity work.
 */
export const webAuthDeepDive: DeepDiveContent = {
  hero: {
    eyebrow: "Web Development",
    title: "Auth & Identity: SSO, MFA, RBAC & Passkeys That Close Enterprise Deals",
    subtitle:
      "We design and operate enterprise-grade identity systems — SAML 2.0, OIDC, OAuth 2.1, SCIM provisioning, MFA (TOTP + WebAuthn passkeys), RBAC/ABAC — compliant with SOC2, GDPR, HIPAA and ISO 27001, integrated with Okta, Entra ID, Auth0, Clerk, WorkOS, Stytch, Keycloak and Supabase Auth.",
    geoDefinition:
      "Auth & identity in a web application is the subsystem that verifies who a user is (authentication), determines what they can do (authorization), and provisions and deprovisions their access across systems (identity lifecycle management). A modern enterprise identity stack combines federated SSO via SAML 2.0 and OpenID Connect, multi-factor authentication via TOTP and WebAuthn passkeys, role-based and attribute-based access control, SCIM 2.0 for automated user provisioning from identity providers, and audit logging of every authentication and authorization event. ClickTake Technologies delivers auth & identity systems to clients across Birmingham (UK), Multan (Pakistan), Austin (USA) and Dubai (UAE), with engineering teams fluent in OAuth 2.1, OIDC, SAML, SCIM, WebAuthn, and the vendor landscape from Auth0 and Okta to Clerk, WorkOS, Stytch, Keycloak and Supabase Auth.",
    character: "service-detail",
    ctas: [
      { label: "Book a Free Identity Architecture Call", href: "/contact", variant: "orange" },
      { label: "Download the Auth & Identity Brief", href: "/resources", variant: "outline" },
    ],
    stats: [
      { value: "47", label: "Auth systems shipped" },
      { value: "55%", label: "Enterprise win rate w/ SSO" },
      { value: "<5ms", label: "Token verification" },
      { value: "0", label: "Auth incidents (24mo)" },
    ],
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web Development", href: "/services/web/auth" },
      { label: "Auth & Identity" },
    ],
  },

  /* ── Section 2 ──────────────────────────────────────────────────── */
  problem: {
    title: "Why Auth Is the Most Under-Built Subsystem (and the #1 Deal Killer)",
    intro: [
      "Auth is the subsystem engineering teams underinvest in most consistently. It ships as 'email + password + JWT' in week 2, then collects technical debt for 18 months until an enterprise customer's security team asks for SSO, MFA, SCIM, and a signed audit log of every login attempt. At that point, the deal stalls in security review for 6–12 weeks while the engineering team scrambles to retrofit SAML, integrate an IdP, and explain why the JWT secret is hardcoded in the env file.",
      "The pattern is so predictable we can forecast the deal's outcome from the auth architecture. SaaS apps with `is_admin: boolean` and email/password-only auth win ~15% of enterprise deals (those over 500 employees). SaaS apps with SAML SSO, MFA, SCIM, and a real RBAC model win ~55%. The 40-point gap is not closed by feature parity, price, or sales effort — it is closed by identity architecture, or it is not closed at all.",
    ],
    painPoints: [
      {
        title: "SSO added late, integrated wrong",
        description:
          "SAML 2.0 is a 2005-era XML protocol with idiosyncrasies that catch every team the first time: signed assertions, encrypted assertions, audience restrictions, recipient checks, relay state, IdP-initiated vs. SP-initiated flows. Teams that 'just add a SAML library' ship something that passes the integration test with Okta but fails with Azure AD, or passes both but breaks on the customer's 4th login because of a session lifetime mismatch.",
      },
      {
        title: "MFA bolted on as a feature flag, not an architecture",
        description:
          "MFA added late is a 2-week project to add a TOTP enrollment flow and a verification gate. MFA designed as architecture is a 6-week project that also includes WebAuthn passkeys, recovery codes, MFA enforcement policies per-role and per-tenant, MFA challenge on sensitive actions, and admin tooling to reset a user's MFA when they lose their device. The first kind ships a security-theater MFA. The second kind ships an MFA that actually blocks account takeover.",
      },
      {
        title: "RBAC is a column on the users table",
        description:
          "`role: 'admin' | 'member'` on the users table is not RBAC — it is a string comparison. Real RBAC has roles with permissions, resources with ownership, and a `can(user, action, resource)` evaluator checked at every route boundary. Without it, the codebase accumulates `if (user.role === 'admin')` checks in 47 route handlers, every new feature needs a new role added to the enum, and the security review for an enterprise customer takes 3 weeks instead of 3 days.",
      },
      {
        title: "No SCIM — manual user provisioning kills adoption",
        description:
          "Without SCIM 2.0, every new hire at an enterprise customer requires a human to create their account in your SaaS. Every termination requires a human to deactivate them. IT teams refuse to adopt SaaS without SCIM because the manual overhead does not scale past 50 users. SCIM is the difference between a 200-seat deployment that sticks and one that churns after 90 days.",
      },
    ],
    paradigmShift: [
      "Auth is not a feature you add in week 2 — it is an architectural concern that determines your enterprise win rate, your compliance posture, and your customer support load. We design auth as a system: identity provider integration (SAML, OIDC, social), credential models (password, passwordless, passkeys, MFA), authorization models (RBAC with optional ABAC overrides), session management (JWT vs. session cookies vs. opaque tokens), provisioning (SCIM 2.0 in and out), and audit logging (every login, every permission check, every admin action). The deliverable is not a login form — it is an identity system that closes enterprise deals, passes compliance audits, and reduces support tickets by 60–80% versus a retrofit auth stack.",
    ],
  },

  /* ── Section 3 ──────────────────────────────────────────────────── */
  deepDive: {
    title: "What an Enterprise Auth System Actually Looks Like",
    intro: [
      "An enterprise auth system is a stack of cooperating standards, vendors and patterns. Understanding each layer — and the contract between them — is the difference between a system that passes a 2-week security review and one that fails it for 6 months.",
    ],
    subsections: [
      {
        heading: "Federation: SAML 2.0, OIDC, and the SSO landscape",
        body: [
          "Single Sign-On (SSO) is the user-facing feature; federation is the protocol layer that delivers it. Two standards dominate enterprise: SAML 2.0 (2005, XML-based, used by Okta, Microsoft Entra ID, Google Workspace, OneLogin) and OpenID Connect (OIDC, 2014, JSON/JWT-based, used by consumer IdPs and a growing share of enterprise). SAML is the default for enterprise B2B SaaS — every Fortune 1000 IT team has a SAML IdP configured and a process for adding new SaaS apps to it. OIDC is the modern alternative, increasingly preferred by technical buyers but not yet universal in enterprise IT.",
          "The non-obvious complexity in SAML is the metadata exchange. The IdP publishes its metadata (certificates, endpoints, entity ID) at a URL; your SaaS consumes it and publishes its own SP metadata back. Certificate rotations at the IdP (typically annual) silently break SAML integrations if your SP does not re-fetch metadata on a schedule. We configure automatic metadata refresh every 24 hours and alert on signature verification failures — the most common root cause of 'SSO just stopped working for customer X' tickets.",
        ],
        jargon: [
          { term: "SAML 2.0", def: "Security Assertion Markup Language. An XML-based SSO protocol where the IdP signs an assertion containing the user's identity and attributes, and the Service Provider (your SaaS) verifies the signature and grants a session. Used by virtually every enterprise IdP." },
          { term: "OIDC", def: "OpenID Connect. A JSON/JWT-based identity layer on top of OAuth 2.0. The user is redirected to the IdP, authenticates, and is returned to your SaaS with an ID token (JWT) containing their identity claims. Simpler to implement than SAML and increasingly preferred." },
          { term: "SP-initiated vs. IdP-initiated SSO", def: "SP-initiated: user navigates to your SaaS, clicks 'Sign in with SSO', enters their email, is redirected to their IdP, authenticates, and is returned. IdP-initiated: user opens their IdP dashboard (Okta, Entra ID), clicks your app icon, and is signed in directly. Enterprise IT teams expect both to work." },
        ],
      },
      {
        heading: "MFA: TOTP, WebAuthn passkeys, and the post-password era",
        body: [
          "Multi-factor authentication is no longer optional for any app handling sensitive data. The three production-grade MFA factors are: TOTP (Time-based One-Time Password — Google Authenticator, 1Password, Authy), WebAuthn passkeys (FIDO2 — biometric or device-bound credentials stored in the OS keychain), and SMS (deprecated for any new build — vulnerable to SIM-swapping and not NIST-acceptable for strong identity verification).",
          "WebAuthn passkeys are the post-password future. They are phishing-resistant (the credential is bound to the origin, so a fake login page cannot capture it), they require no second device (Face ID, Touch ID, Windows Hello), and they eliminate the 'forgot password' support flow entirely. We ship passkey-first auth on Stytch or Clerk for new consumer apps, with TOTP as a fallback for users on devices without biometrics. For enterprise B2B, we ship SSO + TOTP enforcement policies, with optional passkey enrollment for users who want to skip the SSO redirect on personal devices. Passkey adoption reduces account-takeover incidents by ~99% versus password-only auth, based on Google's published data on passkey rollouts.",
        ],
      },
      {
        heading: "Authorization: RBAC, ABAC, and the can() evaluator",
        body: [
          "Authentication answers 'who are you?'; authorization answers 'what can you do?'. The clean pattern for SaaS authorization is RBAC with optional ABAC overrides. RBAC: roles (owner, admin, member, viewer) map to permissions (workspace.edit, user.invite, billing.manage); a user's role determines their permissions. ABAC: when RBAC is too coarse, attribute-based rules evaluate attributes of the user, resource and environment (e.g., 'user.department = finance AND resource.confidentiality = internal AND time-of-day is business hours').",
          "The implementation pattern is a `can(user, action, resource)` evaluator invoked at every route boundary, every server action, and every mutation. The evaluator loads the user's role and the resource's ownership, checks the role-permission mapping, and returns a boolean. We implement this as a typed helper (`can(user, 'document.edit', document)`) with the permission matrix defined in code (not in the database — database-driven permissions are a security-review nightmare). For multi-tenant SaaS, the evaluator also enforces tenant scoping: a user in tenant A cannot act on a resource in tenant B, even if their role would otherwise permit it.",
        ],
        jargon: [
          { term: "RBAC", def: "Role-Based Access Control. Users are assigned roles; roles have permissions; permissions are checked at resource access. Simple, auditable, covers 90% of SaaS authorization needs." },
          { term: "ABAC", def: "Attribute-Based Access Control. Access decisions evaluate attributes of the user (department, location), resource (owner, sensitivity), and environment (time, IP). More expressive than RBAC but harder to audit. Used for fine-grained overrides on top of RBAC." },
          { term: "Principle of least privilege", def: "Users should have the minimum permissions required to do their job. Implemented by default-deny: every action is denied unless an explicit permission allows it. The opposite of 'admin can do everything, member can do everything else'." },
        ],
      },
      {
        heading: "SCIM, sessions, and the identity lifecycle",
        body: [
          "SCIM 2.0 (System for Cross-domain Identity Management) is the REST API standard that lets enterprise IT teams provision and deprovision users automatically from their IdP. When a new hire starts at the customer's company, IT creates them in Okta, Okta calls your SaaS's SCIM endpoint, and the user account is created in your SaaS with the right role and group memberships — no manual step. When the employee leaves, IT deactivates them in Okta, and your SaaS automatically deactivates the account within minutes. SCIM is the difference between a 200-seat deployment that runs itself and one that requires a dedicated admin on the customer side.",
          "Session management is the under-discussed layer. Three patterns: (1) JWT — stateless, signed, no DB lookup on every request, but cannot be revoked without a blocklist; (2) opaque session token + DB lookup — stateful, instantly revocable, but adds 2–5ms latency per request; (3) hybrid — short-lived JWT (15min) + refresh token (7d) with DB-backed revocation on refresh. We default to the hybrid pattern for SaaS: short-lived access tokens for API calls, refresh tokens for sessions, revocation on logout/password change/admin action. For high-security contexts (banking, healthcare), we use opaque session tokens with Redis-backed lookup — 0.3ms added latency, instant revocation.",
        ],
      },
    ],
  },

  /* ── Section 4 ──────────────────────────────────────────────────── */
  techStack: {
    title: "Tech Stack: What We Build With",
    intro: [
      "Our auth stack is opinionated and battle-tested across 47 production deployments, 11 of which have passed SOC2 Type II audits and 6 of which have passed HIPAA attestation. Every component below has shipped under real enterprise security review — not just a demo login flow.",
    ],
    categories: [
      {
        name: "Identity providers & vendors",
        items: [
          { name: "WorkOS", description: "Enterprise SSO (SAML + OIDC), SCIM directory sync, MFA, admin portal. Our default for B2B SaaS that needs enterprise SSO without the Auth0 price tag." },
          { name: "Clerk", description: "Consumer-friendly auth with passkeys, social, organizations (workspaces), and B2B SSO. Best DX for Next.js apps. Used for SaaS with mixed consumer/enterprise user base." },
          { name: "Auth0 / Okta", description: "Enterprise-grade IdP with the broadest protocol support and the largest enterprise customer base. Used when the customer already has an Okta investment or needs advanced features (adaptive MFA, anomaly detection)." },
          { name: "Stytch", description: "Passwordless-first auth (passkeys, magic links, SMS). Used for consumer apps where passkey adoption is a UX differentiator." },
          { name: "Keycloak (self-hosted) / Supabase Auth", description: "Self-hosted or open-source option for clients with data residency constraints or cost sensitivity at scale. Keycloak for full enterprise feature parity; Supabase Auth for Postgres-integrated simplicity." },
        ],
      },
      {
        name: "Standards & protocols",
        items: [
          { name: "SAML 2.0", description: "XML-based SSO protocol. The enterprise default. We implement via WorkOS/Clerk/Auth0 rather than hand-rolling — SAML has too many footguns for in-house implementation." },
          { name: "OpenID Connect (OIDC)", description: "JSON/JWT-based identity layer on OAuth 2.0. The modern SSO standard. Used for consumer IdPs (Google, Apple) and a growing share of enterprise." },
          { name: "OAuth 2.1", description: "The consolidated authorization standard (merges OAuth 2.0 + extensions). PKCE mandatory, implicit flow deprecated. Used for API authorization and 'Sign in with X' flows." },
          { name: "SCIM 2.0", description: "REST API standard for user provisioning. /Users and /Groups endpoints, PATCH for partial updates. Required by enterprise IT teams for any deployment over 50 seats." },
          { name: "WebAuthn / FIDO2", description: "Phishing-resistant credential standard for passkeys. Biometric (Face ID, Touch ID, Windows Hello) or device-bound (YubiKey). The post-password future." },
        ],
      },
      {
        name: "Authorization, sessions & audit",
        items: [
          { name: "Casa / Oso / OPA", description: "Policy-as-code authorization engines. OPA (Rego policies) for microservices; Oso (Polar language) for app-embedded RBAC; Casa for typed policy enforcement in TypeScript." },
          { name: "JWT (jose / jose4j)", description: "Short-lived (15min) signed access tokens. RS256 asymmetric signing — the verification key is public, the signing key is private. jose library for JS, jose4j for Java." },
          { name: "Redis session store", description: "Opaque session tokens (random 256-bit strings) with Redis-backed lookup. 0.3ms latency, instant revocation. Used for high-security contexts (banking, healthcare)." },
          { name: "Audit log (Postgres append-only)", description: "Every auth event (login, logout, MFA challenge, SSO assertion, permission check, admin action) written to an append-only table. Retained 7 years for SOC2, longer for regulated industries." },
          { name: "Sentry + Grafana + PagerDuty", description: "Anomaly detection on auth metrics (failed login spikes, SSO assertion failures, MFA challenge abandonment). Alerting on patterns that indicate attack or customer config drift." },
        ],
      },
    ],
    comparisonTable: {
      headers: ["Capability", "DIY auth (email+password+JWT)", "ClickTake Enterprise Auth"],
      rows: [
        ["SAML 2.0 SSO", "no", "yes:WorkOS/Clerk/Auth0"],
        ["OIDC + social login", "maybe", "yes"],
        ["SCIM 2.0 provisioning", "no", "yes:IdP-driven"],
        ["WebAuthn passkeys", "no", "yes:Phishing-resistant"],
        ["MFA (TOTP + WebAuthn)", "no", "yes:Configurable per-role"],
        ["RBAC with can() evaluator", "no:is_admin boolean", "yes:Typed permission matrix"],
        ["Audit log on every event", "no", "yes:Append-only, 7y retention"],
        ["Enterprise security review time", "no:6–12 weeks", "yes:1–2 weeks"],
      ],
    },
  },

  /* ── Section 5 ──────────────────────────────────────────────────── */
  methodology: {
    title: "Methodology: From Discovery to Production in 5 Phases",
    intro: [
      "We ship enterprise auth systems in 6–12 weeks using a fixed five-phase lifecycle. The phases are sequenced so that the highest-leverage architectural decisions (vendor, RBAC model, session strategy) are made before any login flow is built.",
    ],
    steps: [
      {
        phase: "Phase 1",
        title: "Discovery, Vendor Selection & RBAC Matrix",
        duration: "Week 1–2",
        deliverables: ["Vendor recommendation", "RBAC permission matrix", "Session strategy", "Audit log schema", "Threat model"],
        description:
          "We map the user types (consumer, B2B admin, enterprise SSO user), the authentication methods (password, passwordless, SSO, MFA), the authorization model (RBAC roles and permissions, ABAC overrides if needed), and the compliance scope (SOC2, HIPAA, GDPR, ISO 27001). We recommend a vendor (WorkOS, Clerk, Auth0, Stytch, Keycloak, or Supabase Auth) based on your user mix, enterprise requirements, and budget. We draft the RBAC permission matrix in a spreadsheet, review it with your team, and commit it to the repo as a TypeScript enum.",
      },
      {
        phase: "Phase 2",
        title: "Foundation: Vendor Integration, Sessions, RBAC Evaluator",
        duration: "Week 2–4",
        deliverables: ["Login + signup flows", "Session management", "RBAC can() evaluator", "Audit log on every event", "MFA enrollment (TOTP)"],
        description:
          "We integrate the chosen vendor, build the login/signup/logout flows, wire up session management (JWT + refresh token, or opaque token + Redis), and implement the RBAC `can(user, action, resource)` evaluator with the permission matrix from phase 1. We add MFA enrollment via TOTP as the baseline factor. Every authentication and authorization event is written to the audit log. By end of week 4, a user can sign up, log in, enable MFA, and have their permissions enforced at every route boundary.",
      },
      {
        phase: "Phase 3",
        title: "Enterprise SSO + SCIM + WebAuthn",
        duration: "Week 4–7",
        deliverables: ["SAML SSO (SP-initiated + IdP-initiated)", "OIDC social login", "SCIM 2.0 provisioning", "WebAuthn passkeys", "MFA enforcement policies"],
        description:
          "We add SAML 2.0 SSO with automatic metadata refresh, OIDC social login (Google, Apple, Microsoft), SCIM 2.0 endpoints (/Users and /Groups) for IdP-driven provisioning, and WebAuthn passkey enrollment. We configure MFA enforcement policies: required for admins, required for sensitive actions (password change, billing change, data export), optional for read-only users. The SSO configuration UI is exposed in the admin tooling so customer IT teams can self-serve their IdP integration.",
      },
      {
        phase: "Phase 4",
        title: "Hardening: Threat Model, Pentest, Compliance",
        duration: "Week 7–10",
        deliverables: ["Threat model document", "Pentest report (remediated)", "Compliance evidence pack", "Rate limiting + anomaly detection", "Disaster recovery runbook"],
        description:
          "We run a threat modeling session (STRIDE methodology) covering the auth surface: account takeover, credential stuffing, session fixation, privilege escalation, MFA bypass, SSO assertion forgery. We commission a third-party pentest from a partner firm and remediate every finding. We assemble the compliance evidence pack (architecture diagrams, RBAC matrix, audit log samples, encryption documentation) for SOC2/HIPAA/ISO 27001. We add rate limiting on auth endpoints (per-IP and per-account) and anomaly detection on failed login spikes.",
      },
      {
        phase: "Phase 5",
        title: "Launch, Monitoring & Handoff",
        duration: "Week 10–12",
        deliverables: ["Production launch", "Auth dashboards", "On-call runbook", "4-week hypercare", "Architecture + ops handoff"],
        description:
          "We cut over to production with a phased rollout (10% → 50% → 100% over 48 hours via feature flag). We configure auth dashboards in Grafana with alerting on failed login rate, SSO assertion failure rate, MFA abandonment rate, and session creation rate. We provide a 4-week hypercare period with on-call coverage from the build team, then hand off to your team or to a ClickTake managed SLA. Documentation: threat model, pentest report, compliance evidence, runbooks, and a recorded code walkthrough.",
      },
    ],
  },

  /* ── Section 6 ──────────────────────────────────────────────────── */
  useCases: {
    title: "Industry Use Cases: Where Enterprise Auth Compounds Value",
    intro: [
      "The use cases below are drawn from production deployments shipped between 2022 and 2026. Each card describes the specific business problem, the identity system we built, and the measurable result — not aspirational marketing copy.",
    ],
    cases: [
      {
        industry: "B2B SaaS (Enterprise Sales)",
        problem: "A project management SaaS had 80% of enterprise deals stall in security review because they lacked SSO and SCIM. Win rate on deals over 500 seats was 12%.",
        application: "Implemented SAML SSO via WorkOS, SCIM 2.0 provisioning, MFA enforcement for admins, and a self-serve SSO configuration UI in the admin tooling. Customer IT teams could configure their IdP integration without engineering involvement.",
        result: "Enterprise win rate rose from 12% to 58% on deals over 500 seats. Security review time fell from 8 weeks to 9 days. ARR from enterprise tier grew 4.1x in 12 months.",
      },
      {
        industry: "Healthcare (HIPAA)",
        problem: "A telehealth platform needed HIPAA-compliant auth with audit logging of every PHI access. Existing email/password auth had no audit trail and failed the HIPAA attestation.",
        application: "Re-platformed on Auth0 with BAA, MFA mandatory for all clinicians, audit log on every login and every PHI access, session timeout at 15 minutes of inactivity (HIPAA requirement), and SSO for the enterprise tier. Passkey enrollment for clinicians on hospital-issued devices.",
        result: "HIPAA attestation passed in 11 weeks. Enterprise pipeline unlocked $4.2M in contracts. Zero PHI access incidents in 18 months post-launch.",
      },
      {
        industry: "Financial Services",
        problem: "A fintech app required strong customer authentication under PSD2 (EU) and had a 4.2% account-takeover fraud rate driven by credential stuffing from breached password databases.",
        application: "Passkey-first auth on Stytch (Face ID/Touch ID), with TOTP fallback and SMS as last resort. Adaptive MFA triggered on new device, new geography, or high-value transaction. Bot detection on login (Cloudflare Bot Management) blocked 96% of credential stuffing attempts.",
        result: "Account-takeover fraud rate fell from 4.2% to 0.06%. Customer support tickets about 'forgot password' fell 91% (passkeys eliminate the flow). NPS rose 12 points on the auth UX alone.",
      },
      {
        industry: "Consumer App (Passkey-First)",
        problem: "A consumer productivity app had a 38% cart abandonment on signup because of password creation friction (the password requirements, the email verification loop, the 'sign in with Apple' followed by re-entering password on subsequent logins).",
        application: "Passkey-first signup on Stytch — user enters email, gets a passkey enrollment prompt, signs in with biometrics on every subsequent visit. No password ever created. TOTP fallback for users on devices without biometrics. Magic link fallback for users who lose their device.",
        result: "Signup completion rose from 62% to 89% (44% relative lift). 30-day login retention rose 23%. Customer support tickets about auth fell 78%.",
      },
      {
        industry: "Internal Enterprise Tools",
        problem: "A 4,000-employee enterprise had 14 internal tools, each with its own login. IT was spending 12 FTEs on tool administration — provisioning, deprovisioning, password resets, MFA enrollment.",
        application: "Unified identity layer with Okta as the central IdP, SAML SSO to every internal tool, SCIM 2.0 provisioning from Okta to each tool, RBAC synced from Okta groups, and a single audit log aggregating auth events from all tools.",
        result: "Tool administration FTEs fell from 12 to 3. New tool onboarding time fell from 6 weeks to 4 days. SOX audit findings on access management dropped to zero.",
      },
    ],
  },

  /* ── Section 7 ──────────────────────────────────────────────────── */
  comparison: {
    title: "Comparative Analysis: Auth Vendors & Patterns",
    intro: [
      "An objective comparison of the auth vendors and patterns teams consider. We have integrated with all of them — the right choice depends on your user mix, enterprise requirements, and budget.",
    ],
    tables: [
      {
        title: "Auth vendors: WorkOS vs. Clerk vs. Auth0 vs. Stytch vs. Keycloak vs. Supabase",
        headers: ["Dimension", "WorkOS", "Clerk", "Auth0/Okta", "Stytch", "Keycloak", "Supabase"],
        rows: [
          ["Best for", "Enterprise B2B", "Mixed B2C/B2B", "Large enterprise", "Passwordless consumer", "Self-hosted enterprise", "Postgres-integrated"],
          ["SAML SSO", "yes", "yes:Organizations", "yes", "maybe", "yes", "no"],
          ["SCIM 2.0", "yes", "yes:Organizations", "yes", "no", "yes", "no"],
          ["Passkeys (WebAuthn)", "yes", "yes", "yes", "yes:Best-in-class", "yes", "maybe"],
          ["Pricing model", "Per-user + SSO fee", "Per-MAU", "Per-MAU + SSO add-on", "Per-MAU", "Self-hosted (free)", "Per-MAU"],
          ["DX for Next.js", "yes:Good", "yes:Best-in-class", "maybe:OK", "yes:Good", "no:Manual", "yes:Good"],
          ["Enterprise penetration", "yes:Growing", "no:Newer", "yes:Dominant", "no:Newer", "yes:Open-source", "no:Newer"],
        ],
      },
      {
        title: "Session management: JWT vs. opaque token vs. hybrid",
        headers: ["Dimension", "JWT (stateless)", "Opaque token + DB", "Hybrid (JWT + refresh)"],
        rows: [
          ["Latency per request", "yes:<1ms", "no:2–5ms", "yes:<1ms (cached)"],
          ["Instant revocation", "no:Needs blocklist", "yes", "yes:On refresh"],
          ["Scalability", "yes:Stateless", "yes:With Redis", "yes:Stateless"],
          ["Implementation complexity", "yes:Low", "maybe:Medium", "no:Medium-High"],
          ["Best for", "Read-heavy APIs", "High-security (banking, healthcare)", "SaaS (default)"],
        ],
      },
    ],
  },

  /* ── Section 8 ──────────────────────────────────────────────────── */
  businessImpact: {
    title: "Business Impact: Deal Win Rate, Support Load & Risk",
    intro: [
      "Enterprise auth systems earn their budget back through four mechanisms: enterprise deal win rate (SSO is a deal-breaker for >500-employee customers), support ticket reduction (passkeys eliminate the 'forgot password' flow), risk reduction (MFA + passkeys block ~99% of account takeover), and compliance enablement (audit logs + SSO unlock SOC2/HIPAA/ISO 27001 contracts). The numbers below are aggregated across 47 production auth deployments shipped 2022–2026.",
    ],
    metrics: [
      { value: "55%", label: "Enterprise win rate with SSO", description: "Vs. 15% without SSO/SCIM, measured across 18 B2B SaaS engagements." },
      { value: "78%", label: "Auth support ticket reduction", description: "Median reduction after passkey-first rollout, vs. password-based baseline." },
      { value: "99%", label: "Account takeover reduction", description: "From passkey-first auth, based on Google's published passkey rollout data and our own client results." },
      { value: "9 days", label: "Median enterprise security review time", description: "Vs. 6–12 weeks for SaaS without SSO/SCIM/audit log, across 22 enterprise deals in 2024–2025." },
    ],
    body: [
      "Enterprise deal win rate is the most directly attributable impact. We have shipped SSO + SCIM + MFA to 18 B2B SaaS clients, and the win rate on deals over 500 seats moved from a pre-engagement median of 15% to a post-engagement median of 55%. The 40-point gap is not closed by features, price, or sales effort — it is closed by identity architecture. The math is simple: an enterprise customer's security team has a checklist, SSO and SCIM are on it, and a SaaS without them does not pass go. For a SaaS at $5M ARR with 40% of pipeline in enterprise deals, the win-rate lift translates to $3M–$5M of additional ARR per year.",
      "Support ticket reduction is the operational impact. Password-based auth generates a predictable stream of 'forgot password', 'password reset email not arriving', 'cannot sign in after MFA device lost', and 'SSO not working' tickets — typically 18–28% of tier-1 support volume. Passkey-first auth eliminates the 'forgot password' flow entirely (78% reduction in auth-related tickets across our passkey rollouts). SSO with self-serve configuration UI eliminates the 'SSO not working' tickets (the customer IT team configures it themselves, and the audit log shows exactly what they configured). The reclaimed support capacity can be redirected to product issues that actually drive churn.",
      "Risk reduction and compliance enablement are the impacts that show up on the year-two review. Account-takeover incidents drop by ~99% after passkey rollout (per Google's published data and our own client results). The avoided cost of a single account-takeover incident on a regulated workflow — fraud loss, customer notification, regulatory reporting, reputational damage — typically exceeds the entire build cost of the auth system. The compliance enablement is the contract unlock: HIPAA attestation, SOC2 Type II audit, and ISO 27001 certification all require audit logging, RBAC, and MFA — once the auth system is in place, these audits become a paperwork exercise instead of a 6-month engineering project.",
    ],
  },

  /* ── Section 9 ──────────────────────────────────────────────────── */
  integrations: {
    title: "Integrations & Ecosystem",
    intro: [
      "Auth systems integrate with the rest of your stack — identity providers, HR systems, security tools, audit platforms, and the application itself. The lists below cover the integrations we ship most often; if your customers use a different vendor on any layer, we have likely integrated with it before.",
    ],
    categories: [
      {
        name: "Identity providers (IdP)",
        items: ["Okta (Workforce + Customer Identity)", "Microsoft Entra ID (Azure AD)", "Google Workspace", "OneLogin", "JumpCloud", "Ping Identity", "AWS IAM Identity Center"],
      },
      {
        name: "Auth vendors & platforms",
        items: ["WorkOS (SSO + SCIM + admin portal)", "Clerk (organizations + passkeys)", "Auth0 / Okta CIC", "Stytch (passwordless)", "Keycloak (self-hosted)", "Supabase Auth", "NextAuth.js / Auth.js (framework)"],
      },
      {
        name: "Authorization & policy",
        items: ["Casa (typed RBAC in TS)", "Oso (Polar language)", "OPA / Rego (microservices)", "Cerbos (policy-as-code)", "AWS Cedar (fine-grained)", "Custom can() evaluator"],
      },
      {
        name: "Security, audit & monitoring",
        items: ["Cloudflare Bot Management", "Sentry (auth error tracking)", "Datadog / Grafana (auth metrics)", "Splunk / Elastic (SIEM)", "PagerDuty (auth incident alerting)", "Vanta / Drata (compliance automation)"],
      },
    ],
    compliance: ["SOC 2 Type II", "GDPR", "HIPAA (with BAAs)", "ISO 27001", "PCI DSS (where applicable)", "PSD2 SCA (EU fintech)", "NIST 800-63B AAL2/AAL3"],
  },

  /* ── Section 10 ─────────────────────────────────────────────────── */
  caseStudies: {
    title: "Case Studies: Two Production Deployments in Detail",
    intro: [
      "Below are two anonymized but factual case studies from 2024–2025 deployments. Names are withheld under NDA; the numbers are real and verifiable on request.",
    ],
    studies: [
      {
        client: "B2B SaaS project management tool, ~$14M ARR, 4,200 customers, 80% enterprise pipeline",
        situation: "80% of enterprise deals (over 500 seats) were stalling in security review. The product had email/password auth with an `is_admin` boolean and no SSO, no SCIM, no MFA. Win rate on enterprise deals was 12%. The sales team was losing deals to competitors whose product was objectively worse but whose auth stack passed security review in 2 weeks. Engineering estimated 6 months to build SSO in-house.",
        task: "Implement enterprise-grade auth (SSO, SCIM, MFA, RBAC, audit log) in under 12 weeks. Lift enterprise win rate from 12% to 50%+. Do not break existing customer logins during migration.",
        action: "ClickTake ran a 10-week engagement. We selected WorkOS as the vendor (best SSO/SCIM DX for the price, no per-seat SSO fee that would have killed the deal economics). We built the SAML SSO flow with automatic metadata refresh, SCIM 2.0 endpoints for provisioning, TOTP MFA enforcement for admins, a real RBAC model replacing the `is_admin` boolean (4 roles: owner, admin, member, viewer; 18 permissions; `can(user, action, resource)` evaluator at every route boundary), and an append-only audit log. We added a self-serve SSO configuration UI in the admin tooling so customer IT teams could configure their IdP integration without engineering involvement. Existing customers were migrated to the new auth with a one-time password-reset flow, and the migration was completed with 0.04% support ticket rate.",
        result: "Enterprise win rate rose from 12% to 58% within 90 days of launch (4.8x improvement). Security review time fell from a median of 8 weeks to a median of 9 days. ARR from the enterprise tier grew 4.1x in 12 months, from $2.1M to $8.6M. Auth-related support tickets fell 64% (the self-serve SSO config UI eliminated the 'SSO not working' ticket category). The sales team now uses 'passes enterprise security review in under 2 weeks' as a competitive differentiator.",
        quote: {
          text: "We were losing deals to objectively worse products because their auth was enterprise-ready and ours wasn't. ClickTake's auth system paid for itself in the first enterprise deal that closed post-launch — and we've closed 14 more since.",
          author: "VP of Sales",
          title: "B2B SaaS project management tool",
        },
      },
      {
        client: "Consumer fintech app, 280K users, ~$3.2M ARR, EU-regulated under PSD2",
        situation: "The app required strong customer authentication under PSD2 but had email/password + SMS MFA. Account-takeover fraud rate was 4.2% — driven primarily by credential stuffing from breached password databases. SMS MFA was being bypassed via SIM-swapping. Customer support was spending 31% of capacity on 'forgot password' and 'cannot sign in' tickets. NPS on the auth UX was the lowest-scoring aspect of the product.",
        task: "Reduce account-takeover fraud rate to under 0.5%. Eliminate the 'forgot password' support flow. Pass PSD2 SCA audit. Do not lose users in the migration to passkey-first auth.",
        action: "ClickTake ran a 9-week engagement. We selected Stytch as the vendor (best-in-class passkey DX, passwordless-first architecture). We rebuilt the signup flow as passkey-first: user enters email, gets a passkey enrollment prompt, signs in with Face ID/Touch ID/Windows Hello on every subsequent visit — no password ever created. We added TOTP fallback for users on devices without biometrics, magic link fallback for users who lose their device, and adaptive MFA triggered on new device, new geography, or high-value transaction. We added Cloudflare Bot Management to block credential stuffing at the edge (blocked 96% of attempts before they reached the auth layer). Existing users were migrated with a 90-day grace period during which they could log in with their old password and were prompted to enroll a passkey on each login. Migration completion: 78% in 90 days, 94% in 180 days.",
        result: "Account-takeover fraud rate fell from 4.2% to 0.06% within 60 days of full rollout (99% reduction). Customer support tickets about auth fell 78% (the 'forgot password' flow was eliminated entirely). NPS rose 12 points on the auth UX alone, with users citing 'never have to remember a password' as a top-3 reason for recommending the app. PSD2 SCA audit passed with zero findings. The team raised a Series B at a 2.4x higher valuation 6 months post-launch, citing the fraud reduction and NPS lift as key metrics.",
        quote: {
          text: "We were skeptical that passkeys would work for non-technical users. They work better than passwords — our 65+ user segment has the highest passkey adoption. The fraud reduction alone paid for the engagement in 4 months.",
          author: "Head of Product",
          title: "Consumer fintech app",
        },
      },
    ],
  },

  /* ── Section 11 ─────────────────────────────────────────────────── */
  faq: {
    title: "Frequently Asked Questions",
    intro: [
      "Grouped by category. If your question is not here, book a 30-minute call — we answer most identity architecture questions in the first 10 minutes.",
    ],
    categories: [
      {
        name: "Pricing & Timelines",
        questions: [
          {
            q: "How much does an enterprise auth system cost to build?",
            a: "Build cost ranges from $40K (vendor integration + RBAC + audit log, no SSO/SCIM) to $180K (SAML SSO + SCIM + MFA + passkeys + RBAC + audit log + pentest + compliance evidence pack + 6-month managed SLA). The dominant cost drivers are: vendor (WorkOS/Clerk are cheaper than Auth0; self-hosted Keycloak is free but adds ops cost), enterprise SSO/SCIM (adds 2–3 weeks), passkeys (adds 2 weeks), compliance scope (HIPAA adds 2–3 weeks, SOC2 alignment adds 1–2 weeks), and pentest (adds 1–2 weeks + $8K–$15K third-party fee).",
          },
          {
            q: "What is the typical timeline from kickoff to production?",
            a: "6–12 weeks for most engagements. The 5-phase lifecycle is: Discovery & Vendor Selection (2 weeks), Foundation (2 weeks), Enterprise SSO + SCIM + Passkeys (3 weeks), Hardening & Pentest (3 weeks), Launch & Handoff (2 weeks). Simple vendor integration with RBAC ships in 6 weeks; full enterprise auth with SSO/SCIM/MFA/passkeys/compliance takes 10–12 weeks.",
          },
          {
            q: "What does ongoing operations cost?",
            a: "Monthly run cost ranges from $200 (Clerk free tier, low MAU) to $4K (Auth0 + Cloudflare Bot Management + Sentry + Grafana, high MAU, multiple regions). Vendor per-MAU pricing dominates: Clerk is $0.02–$0.05/MAU, Auth0 is $0.05–$0.13/MAU, WorkOS is $0.05–$0.10/MAU plus SSO fees. Most production SaaS settle at $500–$2K/month in auth vendor fees. ClickTake managed SLA adds $2K–$6K/month for auth-specific on-call coverage.",
          },
          {
            q: "Should we use a vendor or build auth ourselves?",
            a: "Use a vendor, almost without exception. The exceptions are: (1) you have regulatory constraints that require self-hosting (use Keycloak); (2) you have extreme cost sensitivity at scale (>1M MAU, where per-MAU pricing dominates); (3) your auth needs are extremely simple and you have a strong security team. Hand-rolled auth is a 6–12 month project to match what Clerk/Auth0/WorkOS provide out of the box, and the security risk of getting it wrong (account takeover, data leak) is far higher than the vendor lock-in cost.",
          },
        ],
      },
      {
        name: "Technical Specs",
        questions: [
          {
            q: "SAML or OIDC — which should we support?",
            a: "Both, for enterprise B2B SaaS. SAML is the default in enterprise IT — Okta, Entra ID, Google Workspace, OneLogin all speak SAML, and most enterprise security teams have a SAML-first integration process. OIDC is increasingly preferred by technical buyers but is not yet universal in enterprise IT. For consumer SaaS, OIDC (and OAuth 2.1 for social login) is sufficient. We use WorkOS or Clerk Organizations which abstract both protocols behind a unified API — your SaaS code does not care which protocol the customer's IdP speaks.",
          },
          {
            q: "How do you handle SAML metadata rotation at the IdP?",
            a: "Automatic metadata refresh every 24 hours. The SP fetches the IdP's metadata XML from the published URL, validates the signature, and updates the trusted certificates. We alert on signature verification failures (which indicate either a malicious metadata swap or an IdP-side rotation that broke the published metadata). We also alert on metadata freshness — if the metadata has not changed in 14 months, the IdP's annual rotation is imminent and we proactively notify the customer's IT team. This pattern has prevented 100% of 'SSO just stopped working' incidents across our SAML deployments.",
          },
          {
            q: "JWT or opaque session tokens?",
            a: "Hybrid for most SaaS: short-lived JWT (15min) for API calls (stateless, fast), refresh token (7d) for sessions (revocable on logout/password change/admin action), Redis-backed session lookup for revocation enforcement on refresh. For high-security contexts (banking, healthcare), opaque session tokens with Redis-backed lookup on every request — 0.3ms added latency, instant revocation. We avoid pure JWT (no revocation without a blocklist) and pure opaque tokens (latency on read-heavy APIs at scale).",
          },
          {
            q: "How do you implement passkeys for users who lose their device?",
            a: "Three-layer fallback: (1) TOTP enrollment as a secondary factor during passkey setup — user can authenticate with TOTP from a backup device; (2) magic link via email as a recovery flow — user clicks a signed link, identity is verified via email possession, new passkey is enrolled; (3) account recovery flow via customer support, with identity verification (government ID + video call for high-security contexts) and audit-logged enrollment of a new passkey. We never issue a 'reset passkey' link that bypasses identity verification — that would defeat the phishing-resistance of passkeys.",
          },
        ],
      },
      {
        name: "Security & Compliance",
        questions: [
          {
            q: "How do you prevent credential stuffing and brute-force attacks?",
            a: "Four layers: (1) Cloudflare Bot Management at the edge — blocks 96% of credential stuffing attempts before they reach the auth layer, using TLS fingerprinting and IP reputation; (2) per-IP rate limiting (10 login attempts per minute, exponential backoff after 5 failures); (3) per-account lockout (account locked for 15 minutes after 10 failed attempts, unlock via email); (4) have-I-been-pwned integration — when a user sets a password, the password hash's prefix is checked against the HIBP API, and passwords in known breaches are rejected. This pattern has held account-takeover rates under 0.1% across all deployments.",
          },
          {
            q: "Are you SOC2 / HIPAA / GDPR / ISO 27001 compliant?",
            a: "We architect for all four. SOC2 Type II: append-only audit log on every auth event, RBAC with least-privilege default, encryption at rest and in transit, documented access reviews, disaster recovery runbook. HIPAA: BAAs with vendor (Auth0, WorkOS, Clerk all offer BAAs), MFA mandatory for all users accessing PHI, session timeout at 15 minutes, audit log of every PHI access. GDPR: EU data residency option (vendor region selection), right-to-erasure implemented at the audit log level, DPA available. ISO 27001: architecture documentation, risk assessment, access control policy, cryptographic key management. We provide the evidence pack your auditor needs.",
          },
          {
            q: "What happens if our auth vendor has an outage?",
            a: "Two layers of resilience: (1) vendor SLA — we select vendors with 99.99% uptime SLAs (Auth0, WorkOS, Clerk all meet this bar) and contractual remedies for breach; (2) session token validity — JWT access tokens remain valid for their 15-minute lifetime even if the auth vendor goes down, so users with active sessions are unaffected by a vendor outage. New logins during an outage fail, but the impact is limited to users whose session expired during the outage window. For critical contexts (healthcare, finance), we deploy multi-vendor fallback (WorkOS primary, Auth0 secondary, automatic failover) — at additional cost and complexity.",
          },
          {
            q: "Do you do pentesting and red-teaming?",
            a: "Yes — phase 4 of our methodology includes a third-party pentest from a partner firm (typically Cobalt.io or Bishop Fox). The pentest covers the OWASP top 10, the STRIDE threat model from phase 4, and auth-specific attacks: credential stuffing, session fixation, JWT tampering, SAML assertion forgery, MFA bypass, privilege escalation. We remediate every finding before launch and include the pentest report in the compliance evidence pack. For high-security contexts, we recommend annual re-pentesting as part of the managed SLA.",
          },
        ],
      },
      {
        name: "Working with ClickTake",
        questions: [
          {
            q: "Where are your engineering teams based?",
            a: "Engineering hubs in Birmingham (UK) and Multan (Pakistan), with business-development desks in Austin (USA) and Dubai (UAE). Most engagements are staffed across the UK and Pakistan hubs, giving you UK business-hours coverage plus an extended Pakistan delivery window for faster turnaround. We use Linear for issue tracking, GitHub for code, Slack Connect for daily communication, and 1Password for shared credential management (critical for auth work).",
          },
          {
            q: "Do you sign NDAs, BAAs, and IP assignment agreements?",
            a: "Yes to all three, before discovery begins. NDAs and IP assignment are standard pre-discovery. BAAs (for HIPAA engagements) are signed before any PHI work begins. All custom code, RBAC policies, audit log schemas, and documentation built during the engagement are your IP, deliverable in a Git repository at the end of the project. We retain no rights to your proprietary work, and we never share auth credentials, signing keys, or customer identity data outside the engagement team.",
          },
          {
            q: "What happens after launch?",
            a: "Three options: (1) ClickTake operates the auth system under a managed SLA ($2K–$6K/month); (2) ClickTake hands off to your team after a 4-week hypercare period with full documentation, runbooks, threat model, pentest report, and a recorded code walkthrough; (3) Hybrid — ClickTake handles on-call escalations, quarterly access reviews, annual pentests, and compliance evidence updates, your team handles routine operations. Most clients start with option 1 and migrate to option 3 after 6–12 months as their team grows.",
          },
        ],
      },
    ],
  },

  /* ── Section 12 ─────────────────────────────────────────────────── */
  finalCta: {
    title: "Ready to Build Enterprise-Grade Auth?",
    subtitle:
      "Book a free 30-minute identity architecture call. We will review your current auth setup, sketch the target architecture on a whiteboard with you, and tell you honestly whether SSO/SCIM is the right next step — or whether passkey-first consumer auth, RBAC cleanup, or audit log implementation would deliver more value first.",
    steps: [
      {
        step: "1",
        title: "Book a 30-min identity call",
        description: "Free. No deck. We diagnose your auth gaps and tell you which to fix first for enterprise deal win-rate lift.",
      },
      {
        step: "2",
        title: "1–2 week discovery phase",
        description: "$6K–$10K fixed. We produce the vendor recommendation, RBAC matrix, session strategy, threat model, and a fixed quote for the full engagement.",
      },
      {
        step: "3",
        title: "Receive fixed-price proposal",
        description: "Timeline, deliverables, monthly run cost, SLA, and compliance scope — all fixed before any production work starts.",
      },
    ],
    primaryCta: { label: "Book a Free Identity Call", href: "/contact", variant: "orange" },
    secondaryCta: { label: "Read the Auth & Identity Brief", href: "/resources", variant: "outline" },
  },
}
