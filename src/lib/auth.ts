// ─────────────────────────────────────────────────────────────────────────────
// NextAuth.js v4 configuration
// Credentials provider validates against AdminUser table (bcrypt-hashed passwords).
// Session JWT carries: id, email, name, roleId, roleName, permissions[].
// ─────────────────────────────────────────────────────────────────────────────

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { logAudit, logSecurityEvent } from "@/lib/log-audit";
import { SYSTEM_ROLES } from "@/lib/permissions";

// ─── Helpers ────────────────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ─── Ensure system roles + super-admin exist on first boot ──────────────────

let _seeded = false;
export async function ensureSeedAdmin() {
  if (_seeded) return;
  _seeded = true;
  try {
    const roleMap: Record<string, string> = {};
    for (const r of SYSTEM_ROLES) {
      const existing = await prisma.adminRole.findUnique({ where: { name: r.name } });
      if (existing) {
        roleMap[r.name] = existing.id;
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
    }

    const existingAdmin = await prisma.adminUser.findFirst();
    if (!existingAdmin) {
      const email = process.env.SUPERADMIN_EMAIL || "admin@clicktaketech.com";
      const password = process.env.SUPERADMIN_PASSWORD || "Admin@2026";
      const hashed = await hashPassword(password);
      await prisma.adminUser.create({
        data: {
          email,
          passwordHash: hashed,
          fullName: "Super Admin",
          roleId: roleMap["Super Admin"],
          status: "Active",
        },
      });
      console.log(`[seed] Created super-admin: ${email} / ${password}`);
    }
  } catch (err) {
    console.error("[ensureSeedAdmin] failed:", err);
  }
}

// ─── Auth config ────────────────────────────────────────────────────────────

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email as string | undefined;
        const password = creds?.password as string | undefined;
        if (!email || !password) return null;

        await ensureSeedAdmin();

        const user = await prisma.adminUser.findUnique({
          where: { email: email.toLowerCase() },
          include: { role: { include: { permissions: true } } },
        });
        if (!user) return null;
        if (user.status !== "Active") return null;

        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) {
          await logSecurityEvent({
            type: "warning",
            event: "login_failed",
            userId: user.id,
            metadata: { email },
          });
          return null;
        }

        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
        await logAudit({
          userId: user.id,
          userName: user.fullName,
          action: "auth.login",
          details: { email: user.email },
        });

        const permissions = (user.role?.permissions || [])
          .filter((p) => p.allowed)
          .map((p) => p.permissionKey);

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          roleId: user.roleId || "",
          roleName: user.role?.name || "",
          permissions,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.roleId = (user as any).roleId;
        token.roleName = (user as any).roleName;
        token.permissions = (user as any).permissions || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).roleId = token.roleId;
        (session.user as any).roleName = token.roleName;
        (session.user as any).permissions = token.permissions || [];
      }
      return session;
    },
  },
};

// Re-export for convenience
import NextAuth from "next-auth";
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

// ─── RBAC helpers ───────────────────────────────────────────────────────────

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  roleId?: string;
  roleName?: string;
  permissions: string[];
};

export async function getServerSession(): Promise<{ user: SessionUser } | null> {
  const { getServerSession: gs } = await import("next-auth");
  const session = await gs(authOptions);
  if (!session?.user) return null;
  return { user: session.user as unknown as SessionUser };
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const s = await getServerSession();
  return s?.user || null;
}

export async function requireAuth(): Promise<SessionUser> {
  const u = await getSessionUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}

export async function requirePermission(perm: string): Promise<SessionUser> {
  const u = await requireAuth();
  if (u.roleName === "Super Admin" || u.permissions.includes("manageRBAC")) return u;
  if (!u.permissions.includes(perm)) {
    throw new Error("FORBIDDEN:" + perm);
  }
  return u;
}

export function hasPermission(user: SessionUser | null, perm: string): boolean {
  if (!user) return false;
  if (user.roleName === "Super Admin") return true;
  if (user.permissions.includes("manageRBAC")) return true;
  return user.permissions.includes(perm);
}
