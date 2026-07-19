// /api/admin/users/[id] — get, update, delete single user
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hashPassword } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const user = await prisma.adminUser.findUnique({
    where: { id },
    include: { role: { include: { permissions: true } } },
  });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    status: user.status,
    avatarUrl: user.avatarUrl,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    role: user.role
      ? {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description,
          color: user.role.color,
          permissions: user.role.permissions.map((p) => ({
            key: p.permissionKey,
            allowed: p.allowed,
          })),
        }
      : null,
  });
}

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

  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: any = {};
  if (body.fullName) data.fullName = body.fullName;
  if (body.status) data.status = body.status;
  if (body.roleId) data.roleId = body.roleId;
  if (body.password) {
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }
    data.passwordHash = await hashPassword(body.password);
  }
  if (body.email && body.email !== existing.email) {
    const conflict = await prisma.adminUser.findUnique({ where: { email: body.email.toLowerCase() } });
    if (conflict) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    data.email = body.email.toLowerCase();
  }

  const updated = await prisma.adminUser.update({ where: { id }, data });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "user.update",
    entity: "AdminUser",
    entityId: id,
    details: { changes: Object.keys(data) },
  });

  return NextResponse.json({ id: updated.id, email: updated.email });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.adminUser.delete({ where: { id } });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "user.delete",
    entity: "AdminUser",
    entityId: id,
    details: { email: existing.email },
  });

  return NextResponse.json({ success: true });
}
