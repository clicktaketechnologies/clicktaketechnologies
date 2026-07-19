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

  const [users, roles] = await Promise.all([
    prisma.adminUser.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.adminRole.findMany({
      include: {
        permissions: true,
        _count: { select: { users: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

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
        userCount: r._count.users,
        permissions: r.permissions.map((p) => p.permissionKey),
      }))}
      availablePermissions={ALL_PERMISSIONS}
      currentUser={session.user}
    />
  );
}
