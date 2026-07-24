// Reproduce /admin page query locally
import { config } from "dotenv";
config({ override: true });

async function main() {
  const { prisma } = await import("../src/lib/db.ts");
  
  console.log("Testing queries similar to /admin/page.tsx...");
  
  try {
    const r = await Promise.all([
      prisma.lead.count({ where: { deletedAt: null } }),
      prisma.lead.count({ where: { deletedAt: null, status: "New" } }),
      prisma.lead.count({ where: { deletedAt: null, status: "Converted" } }),
      prisma.page.count(),
      prisma.service.count(),
      prisma.page.count({ where: { isPublished: true } }),
      prisma.smtpLog.count({ where: { status: "sent" } }),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.lead.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);
    console.log("✓ All queries succeeded");
    console.log("  leads total:", r[0]);
    console.log("  new leads:", r[1]);
    console.log("  converted:", r[2]);
    console.log("  pages:", r[3]);
    console.log("  services:", r[4]);
    console.log("  published pages:", r[5]);
    console.log("  smtp sent:", r[6]);
    console.log("  team active:", r[7]);
    console.log("  recent leads count:", r[8].length);
    console.log("  recent audit count:", r[9].length);
    
    // Test the 30-day query too
    const dailyLeads = await prisma.lead.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      select: { createdAt: true, status: true },
    });
    console.log("  daily leads (30d):", dailyLeads.length);
  } catch (e) {
    console.error("✗ Query failed:", e.message);
    console.error("Stack:", e.stack);
  }
  
  process.exit(0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
