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

// ─── Force-correct NEXTAUTH_URL ──────────────────────────────────────────────
// NEXTAUTH_URL was set in Vercel to the OLD preview URL (clicktaketech.vercel.app)
// instead of the production domain (clicktaketech.com). NextAuth uses this env
// var to construct signinUrl, callbackUrl, and cookie paths — getting it wrong
// breaks login (CredentialsSignin) because the credentials flow thinks the
// request is cross-origin.
//
// `trustHost: true` alone doesn't help because NEXTAUTH_URL env var takes
// precedence. So we override process.env.NEXTAUTH_URL directly at module load
// time. This is the production canonical URL.
//
// TODO: User should fix NEXTAUTH_URL in Vercel env vars
// (Settings → Environment Variables → NEXTAUTH_URL = https://clicktaketech.com)
// and this override can be removed.
if (process.env.NODE_ENV === "production") {
  process.env.NEXTAUTH_URL = "https://clicktaketech.com";
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ─── Ensure system roles + super-admin exist on first boot ──────────────────
//
// NOTE: Removed the `_seeded` cache flag. In serverless (Vercel), each cold
// start is a new instance — caching the seed flag meant that if the first
// attempt failed silently (transient DB error, partial insert, etc.), the
// admin user would NEVER be created on that instance. By running the
// idempotent seed check on every authorize() call, we self-heal.
// The cost is one `findFirst` + one `findUnique` per login attempt — trivial.
export async function ensureSeedAdmin() {
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

    const email = (process.env.SUPERADMIN_EMAIL || "admin@clicktaketech.com").toLowerCase();
    // PERMANENT ADMIN PASSWORD: Admin@2026
    // User has explicitly chosen to keep this as the permanent admin password.
    // We deliberately ignore SUPERADMIN_PASSWORD env var (it was previously set
    // to an unknown value and locked the user out). To change the admin password,
    // use the admin UI (admin/users) or the /api/admin/recover endpoint.
    const password = "Admin@2026";

    // Find by email — if exists, leave alone (don't overwrite a password the
    // admin may have changed via UI). If admin_users table is empty, create.
    const anyAdmin = await prisma.adminUser.findFirst();
    if (!anyAdmin) {
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
      console.log(`[seed] Created super-admin: ${email}`);
    }
  } catch (err) {
    // Non-fatal — login will fail with CredentialsSignin and we'll see the
    // server log. Don't throw, or every login attempt would 500.
    console.error("[ensureSeedAdmin] failed:", err);
  }
}

// ─── Auth config ────────────────────────────────────────────────────────────

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  // trustHost: true — Use the request's Host header instead of NEXTAUTH_URL
  // env var. Critical because NEXTAUTH_URL was previously set to the OLD
  // Vercel preview URL (clicktaketech.vercel.app) instead of the production
  // domain (clicktaketech.com). With trustHost, NextAuth generates
  // signinUrl/callbackUrl from the actual request host, so login flow works
  // regardless of what NEXTAUTH_URL is set to.
  //
  // Cast as any: NextAuth v4 type defs omit `trustHost`, but it is a valid
  // runtime option (added in next-auth@4.22) and required when NEXTAUTH_URL
  // is missing or stale. NextAuth v5 types include it natively.
  ...(process.env.NODE_ENV !== "test" ? { trustHost: true } : {}) as any,
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
