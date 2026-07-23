import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { ALL_PERMISSIONS } from "@/lib/permissions";
import { RbacClient } from "./rbac-client";

export const dynamic = "force-dynamic";

export default async function RbacPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/roles");
  if (!hasPermission(session.user, "manageRBAC")) redirect("/admin");

  const [users, roles, roleUserCounts] = await Promise.all([
    prisma.adminUser.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.adminRole.findMany({
      include: {
        permissions: true,
      },
      orderBy: { createdAt: "asc" },
    }),
    // Drizzle shim doesn't support Prisma's _count syntax — fetch separately
    prisma.adminUser.findMany({
      select: { roleId: true },
    }),
  ]);

  // Build role -> user count map manually
  const userCountByRole: Record<string, number> = {};
  for (const u of roleUserCounts) {
    if (u.roleId) userCountByRole[u.roleId] = (userCountByRole[u.roleId] || 0) + 1;
  }

  return (
    <RbacClient
      users={users.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        status: u.status,
        roleName: u.role?.name || null,
        roleId: u.roleId,
        avatarUrl: u.avatarUrl,
        lastLoginAt: u.lastLoginAt?.toISOString() || null,
        createdAt: u.createdAt.toISOString(),
      }))}
      roles={roles.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        color: r.color,
        isSystem: r.isSystem,
        userCount: userCountByRole[r.id] || 0,
        permissions: r.permissions.map((p) => p.permissionKey),
      }))}
      availablePermissions={ALL_PERMISSIONS}
      currentUser={session.user}
    />
  );
}
