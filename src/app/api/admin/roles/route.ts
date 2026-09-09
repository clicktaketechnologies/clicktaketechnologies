// /api/admin/roles — CRUD for admin roles
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { ALL_PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // NOTE: Drizzle shim doesn't support Prisma's `_count` include syntax,
  // so fetch users separately and compute counts in JS. Same pattern as
  // /admin/roles/page.tsx.
  const [roles, users] = await Promise.all([
    prisma.adminRole.findMany({
      include: { permissions: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.adminUser.findMany({ select: { id: true, roleId: true } }),
  ]);
  const userCountByRole = new Map<string, number>();
  for (const u of users) {
    if (!u.roleId) continue;
    userCountByRole.set(u.roleId, (userCountByRole.get(u.roleId) || 0) + 1);
  }

  return NextResponse.json({
    roles: roles.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      color: r.color,
      isSystem: r.isSystem,
      userCount: userCountByRole.get(r.id) || 0,
      permissions: r.permissions.map((p) => ({
        key: p.permissionKey,
        allowed: p.allowed,
      })),
    })),
    availablePermissions: ALL_PERMISSIONS,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, description, color, permissions } = body;
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const existing = await prisma.adminRole.findUnique({ where: { name } });
  if (existing) return NextResponse.json({ error: "Role name already exists" }, { status: 409 });

  const role = await prisma.adminRole.create({
    data: {
      name,
      description: description || "",
      color: color || "#136DFF",
      isSystem: false,
      permissions: {
        create: (permissions || []).map((key: string) => ({
          permissionKey: key,
          allowed: true,
        })),
      },
    },
    include: { permissions: true },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "role.create",
    entity: "AdminRole",
    entityId: role.id,
    details: { name, permissions: permissions || [] },
  });

  return NextResponse.json({ id: role.id, name: role.name });
}
