import { config } from "dotenv";
config({ override: true });
import { prisma } from "../src/lib/db.ts";

async function main() {
  console.log("=== Testing failing queries with stack traces ===\n");
  
  try {
    const t = await prisma.cmsTypography.findMany();
    console.log("✓ cmsTypography:", t.length);
  } catch (e: any) {
    console.log("✗ cmsTypography failed");
    console.log("  message:", e.message);
    console.log("  stack:", e.stack?.split("\n").slice(0, 6).join("\n  "));
  }
  
  try {
    const s = await prisma.siteSetting.findMany();
    console.log("✓ siteSetting:", s.length);
  } catch (e: any) {
    console.log("✗ siteSetting failed");
    console.log("  message:", e.message);
    console.log("  stack:", e.stack?.split("\n").slice(0, 6).join("\n  "));
  }
  
  // Try with select
  try {
    const t2 = await prisma.cmsTypography.findMany({ select: { element: true, fontFamily: true } });
    console.log("✓ cmsTypography with select:", t2.length);
  } catch (e: any) {
    console.log("✗ cmsTypography with select failed:", e.message);
  }
  
  // Try count
  try {
    const c = await prisma.cmsTypography.count();
    console.log("✓ cmsTypography count:", c);
  } catch (e: any) {
    console.log("✗ cmsTypography count failed:", e.message);
  }
}

main().then(() => process.exit(0)).catch(e => { console.error("FATAL:", e); process.exit(1); });
