// /api/admin/roles/[id] — update + delete role
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await prisma.adminRole.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.isSystem && body.name && body.name !== existing.name) {
    return NextResponse.json({ error: "Cannot rename system role" }, { status: 400 });
  }

  const data: any = {};
  if (body.name) data.name = body.name;
  if (body.description !== undefined) data.description = body.description;
  if (body.color) data.color = body.color;

  if (Array.isArray(body.permissions)) {
    // Recreate permission set
    await prisma.rolePermission.deleteMany({ where: { roleId: id } });
    if (body.permissions.length > 0) {
      await prisma.rolePermission.createMany({
        data: body.permissions.map((key: string) => ({
          roleId: id,
          permissionKey: key,
          allowed: true,
        })),
      });
    }
  }

  const updated = await prisma.adminRole.update({ where: { id }, data });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "role.update",
    entity: "AdminRole",
    entityId: id,
    details: { name: updated.name },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.adminRole.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.isSystem) {
    return NextResponse.json({ error: "Cannot delete system role" }, { status: 400 });
  }

  // Unassign users from this role
  await prisma.adminUser.updateMany({
    where: { roleId: id },
    data: { roleId: null },
  });

  await prisma.adminRole.delete({ where: { id } });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "role.delete",
    entity: "AdminRole",
    entityId: id,
    details: { name: existing.name },
  });

  return NextResponse.json({ success: true });
}
