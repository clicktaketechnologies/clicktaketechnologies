// Diagnose all admin pages that 500 by running their actual queries
import { config } from "dotenv";
config({ override: true });
import { prisma } from "../src/lib/db.ts";

async function test(label: string, fn: () => Promise<any>) {
  try {
    const result = await fn();
    console.log(`✓ ${label}`);
    return result;
  } catch (e: any) {
    console.log(`✗ ${label}: ${e.message.split("\n")[0]}`);
    return null;
  }
}

async function main() {
  console.log("=== Testing admin page queries ===\n");
  
  // /admin/page.tsx — already fixed
  
  // /admin/services/page.tsx
  await test("/admin/services — list services", () =>
    prisma.service.findMany({ orderBy: { createdAt: "desc" } })
  );
  
  // /admin/team-careers/page.tsx
  await test("/admin/team-careers — list team", () =>
    prisma.teamMember.findMany({ orderBy: { createdAt: "desc" } })
  );
  await test("/admin/team-careers — list jobs", () =>
    prisma.jobOpening.findMany({})
  );
  
  // /admin/providers/page.tsx
  await test("/admin/providers — list providers", () =>
    prisma.provider.findMany({})
  );
  
  // /admin/leads/page.tsx — does /admin/leads exist?
  // (404, not 500 — likely missing route)
  
  // /admin/cms/page.tsx — works
  
  // /admin/email/page.tsx
  await test("/admin/email — email logs", () =>
    prisma.smtpLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  );
  await test("/admin/email — email templates", () =>
    prisma.emailTemplate.findMany({})
  );
  
  // /admin/seo/page.tsx
  await test("/admin/seo — page meta", () =>
    prisma.seoPageMeta.findMany({})
  );
  
  // /admin/settings/page.tsx
  await test("/admin/settings — site settings", () =>
    prisma.siteSetting.findMany({})
  );
  
  // /admin/security/page.tsx
  await test("/admin/security — security logs", () =>
    prisma.securityLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  );
  await test("/admin/security — security settings", () =>
    prisma.securitySetting.findFirst({})
  );
  await test("/admin/security — blocked IPs", () =>
    prisma.blockedIp.findMany({})
  );
  
  // /admin/typography/page.tsx
  await test("/admin/typography — font presets", () =>
    prisma.cmsFontPreset.findMany({})
  );
  
  // /admin/theme/page.tsx
  await test("/admin/theme — themes", () =>
    prisma.cmsTheme.findMany({})
  );
  await test("/admin/theme — theme presets", () =>
    prisma.cmsThemePreset.findMany({})
  );
  
  // /admin/backgrounds
  await test("/admin/backgrounds — backgrounds", () =>
    prisma.cmsBackground.findMany({})
  );
  
  // /admin/roles/page.tsx
  await test("/admin/roles — roles", () =>
    prisma.adminRole.findMany({ include: { permissions: true } })
  );
  
  // /admin/users/page.tsx
  await test("/admin/users — admin users", () =>
    prisma.adminUser.findMany({ include: { role: true } })
  );
  
  // /admin/nav-links/page.tsx
  await test("/admin/nav-links — nav links", () =>
    prisma.navLink.findMany({})
  );
  
  // /admin/pages/page.tsx (CMS pages list)
  await test("/admin/pages — list pages", () =>
    prisma.page.findMany({ orderBy: { updatedAt: "desc" } })
  );
  
  process.exit(0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
