// Standalone seed script — creates default super-admin + system roles.
// Run with: bun run scripts/seed-admin.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SYSTEM_ROLES = [
  {
    name: "Super Admin",
    description: "Full access to everything",
    color: "#FF53A9",
    permissions: ["viewDashboard", "readCMS", "writeCMS", "readLeads", "writeLeads", "manageRBAC", "manageSettings"],
  },
  {
    name: "Editor",
    description: "Manage CMS content, services, team",
    color: "#136DFF",
    permissions: ["viewDashboard", "readCMS", "writeCMS", "readLeads"],
  },
  {
    name: "Sales Support",
    description: "Manage leads and email",
    color: "#10B981",
    permissions: ["viewDashboard", "readLeads", "writeLeads"],
  },
];

async function main() {
  console.log("Seeding system roles...");
  const roleMap: Record<string, string> = {};
  for (const r of SYSTEM_ROLES) {
    const existing = await prisma.adminRole.findUnique({ where: { name: r.name } });
    if (existing) {
      roleMap[r.name] = existing.id;
      console.log(`  Role "${r.name}" already exists (id: ${existing.id})`);
      continue;
    }
    const created = await prisma.adminRole.create({
      data: {
        name: r.name,
        description: r.description,
        color: r.color,
        isSystem: true,
        permissions: {
          create: r.permissions.map((key) => ({ permissionKey: key, allowed: true })),
        },
      },
    });
    roleMap[r.name] = created.id;
    console.log(`  Created role "${r.name}" (id: ${created.id})`);
  }

  console.log("\nChecking for existing admin users...");
  const existingAdmin = await prisma.adminUser.findFirst();
  if (existingAdmin) {
    console.log(`  Admin user already exists: ${existingAdmin.email}`);
    return;
  }

  const email = process.env.SUPERADMIN_EMAIL || "admin@clicktaketech.com";
  const password = process.env.SUPERADMIN_PASSWORD || "Admin@2026";
  const hashed = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash: hashed,
      fullName: "Super Admin",
      roleId: roleMap["Super Admin"],
      status: "Active",
    },
  });
  console.log(`\n✅ Created super-admin:`);
  console.log(`   Email:    ${admin.email}`);
  console.log(`   Password: ${password}`);
  console.log(`   Role:     Super Admin`);
  console.log(`\n   ⚠️  Change this password immediately via the admin UI.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
