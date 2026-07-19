// /api/admin/roles — CRUD for admin roles
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { ALL_PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const roles = await prisma.adminRole.findMany({
    include: {
      permissions: true,
      _count: { select: { users: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    roles: roles.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      color: r.color,
      isSystem: r.isSystem,
      userCount: r._count.users,
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
