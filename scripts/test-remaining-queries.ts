import { config } from "dotenv";
config({ override: true });
import { prisma } from "../src/lib/db.ts";

async function main() {
  // Test RBAC with _count
  try {
    const r = await prisma.adminRole.findMany({
      include: {
        permissions: true,
        _count: { select: { users: true } },
      },
      orderBy: { createdAt: "asc" },
    });
    console.log("✓ roles with _count worked, rows:", r.length);
  } catch (e: any) {
    console.log("✗ RBAC _count failed:", e.message);
  }
  
  // Test providers (with emailLog include?)
  try {
    const configs = await prisma.providerConfig.findMany({
      orderBy: [{ category: "asc" }, { priority: "asc" }],
    });
    console.log("✓ providerConfig findMany worked, rows:", configs.length);
  } catch (e: any) {
    console.log("✗ providerConfig failed:", e.message);
  }
  
  try {
    const emailLogs = await prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" },
      take: 20,
    });
    console.log("✓ emailLog findMany worked, rows:", emailLogs.length);
  } catch (e: any) {
    console.log("✗ emailLog failed:", e.message);
  }
  
  try {
    const count = await prisma.storageObject.count();
    console.log("✓ storageObject count worked:", count);
  } catch (e: any) {
    console.log("✗ storageObject failed:", e.message);
  }
  
  // Settings
  try {
    const s = await prisma.siteSetting.findMany();
    console.log("✓ siteSetting findMany worked, rows:", s.length);
  } catch (e: any) {
    console.log("✗ siteSetting failed:", e.message);
  }
  
  // Typography
  try {
    const t = await prisma.cmsTypography.findMany();
    console.log("✓ cmsTypography findMany worked, rows:", t.length);
  } catch (e: any) {
    console.log("✗ cmsTypography failed:", e.message);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error("FATAL:", e); process.exit(1); });
