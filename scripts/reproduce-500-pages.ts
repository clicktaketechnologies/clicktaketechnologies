// Reproduce /admin/providers page query exactly
import { config } from "dotenv";
config({ override: true });
import { prisma } from "../src/lib/db.ts";

async function main() {
  console.log("=== /admin/providers page queries ===\n");
  
  // 1. providerConfig.findMany with orderBy array
  try {
    const r = await prisma.providerConfig.findMany({
      orderBy: [{ category: "asc" }, { priority: "asc" }],
    });
    console.log("✓ providerConfig.findMany orderBy array:", r.length);
  } catch (e: any) {
    console.log("✗ providerConfig.findMany orderBy array:", e.message);
  }
  
  // 2. providerHealth.findMany
  try {
    const r = await prisma.providerHealth.findMany();
    console.log("✓ providerHealth.findMany:", r.length);
  } catch (e: any) {
    console.log("✗ providerHealth.findMany:", e.message);
  }
  
  // 3. emailLog.findMany with orderBy + take
  try {
    const r = await prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" },
      take: 20,
    });
    console.log("✓ emailLog.findMany:", r.length);
  } catch (e: any) {
    console.log("✗ emailLog.findMany:", e.message);
  }
  
  // 4. storageObject.count
  try {
    const r = await prisma.storageObject.count();
    console.log("✓ storageObject.count:", r);
  } catch (e: any) {
    console.log("✗ storageObject.count:", e.message);
  }
  
  console.log("\n=== /admin/settings page queries ===\n");
  try {
    const r = await prisma.siteSetting.findMany();
    console.log("✓ siteSetting.findMany:", r.length);
  } catch (e: any) {
    console.log("✗ siteSetting.findMany:", e.message);
  }
  
  console.log("\n=== /admin/typography page queries ===\n");
  try {
    const r = await prisma.cmsTypography.findMany();
    console.log("✓ cmsTypography.findMany:", r.length);
  } catch (e: any) {
    console.log("✗ cmsTypography.findMany:", e.message);
  }
  try {
    const r = await prisma.cmsFontPreset.findMany({ orderBy: { name: "asc" } });
    console.log("✓ cmsFontPreset.findMany:", r.length);
  } catch (e: any) {
    console.log("✗ cmsFontPreset.findMany:", e.message);
  }
  
  console.log("\n=== /admin/roles page queries ===\n");
  try {
    const users = await prisma.adminUser.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    });
    console.log("✓ adminUser.findMany with include:", users.length);
  } catch (e: any) {
    console.log("✗ adminUser.findMany with include:", e.message);
  }
  try {
    const roles = await prisma.adminRole.findMany({
      include: { permissions: true },
      orderBy: { createdAt: "asc" },
    });
    console.log("✓ adminRole.findMany with include:", roles.length);
  } catch (e: any) {
    console.log("✗ adminRole.findMany with include:", e.message);
  }
  try {
    const ruc = await prisma.adminUser.findMany({ select: { roleId: true } });
    console.log("✓ adminUser.findMany with select:", ruc.length);
  } catch (e: any) {
    console.log("✗ adminUser.findMany with select:", e.message);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error("FATAL:", e); process.exit(1); });
