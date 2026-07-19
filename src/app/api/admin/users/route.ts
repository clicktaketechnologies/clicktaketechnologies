// /api/admin/users — CRUD for admin users
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hashPassword } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await prisma.adminUser.findMany({
    include: { role: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      status: u.status,
      roleName: u.role?.name || null,
      roleId: u.roleId,
      avatarUrl: u.avatarUrl,
      lastLoginAt: u.lastLoginAt,
      createdAt: u.createdAt,
    })),
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

  const { fullName, email, password, roleName, status } = body;
  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  // Find role by name (default: Editor)
  const role = await prisma.adminRole.findUnique({ where: { name: roleName || "Editor" } });
  if (!role) {
    return NextResponse.json({ error: "Role not found" }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.adminUser.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      fullName,
      roleId: role.id,
      status: status || "Active",
    },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "user.create",
    entity: "AdminUser",
    entityId: user.id,
    details: { email: user.email, fullName: user.fullName, roleName: role.name },
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    roleName: role.name,
  });
}
