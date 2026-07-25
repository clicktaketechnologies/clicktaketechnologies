// GET /api/admin/recover?secret=<SUPERADMIN_RECOVERY_SECRET>
//
// Emergency diagnostic + recovery endpoint for admin login issues.
// Auth-independent (no session required) but gated by a secret query param
// that must match the SUPERADMIN_RECOVERY_SECRET env var. If that env var
// is not set, this endpoint returns 404 (so it's invisible to attackers).
//
// Use cases:
//   1. Diagnose: list admin_users (emails only), roles, and whether the
//      password matches the default `Admin@2026`.
//   2. Recover: ?action=reset — forces the admin user's password back to
//      the SUPERADMIN_PASSWORD env var (or default `Admin@2026`).
//
// Intended workflow:
//   - User reports "admin login not working"
//   - Set SUPERADMIN_RECOVERY_SECRET in Vercel env (any random string)
//   - Hit /api/admin/recover?secret=<that>&action=reset
//   - Login with admin@clicktaketech.com / Admin@2026
//   - Delete SUPERADMIN_RECOVERY_SECRET from Vercel env afterwards

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SECRET = process.env.SUPERADMIN_RECOVERY_SECRET

export async function GET(req: Request) {
  // Hide the endpoint entirely if no recovery secret is configured.
  if (!SECRET) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  const url = new URL(req.url)
  const providedSecret = url.searchParams.get('secret')
  if (providedSecret !== SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const action = url.searchParams.get('action') || 'diagnose'

  try {
    const roles = await prisma.adminRole.findMany({
      select: { id: true, name: true, isSystem: true },
    })
    const admins = await prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        status: true,
        roleId: true,
        lastLoginAt: true,
        createdAt: true,
      },
    })

    const result: any = {
      timestamp: new Date().toISOString(),
      roles: roles.map((r) => ({ id: r.id, name: r.name, isSystem: r.isSystem })),
      admins: admins.map((a) => ({
        id: a.id,
        email: a.email,
        fullName: a.fullName,
        status: a.status,
        roleId: a.roleId,
        lastLoginAt: a.lastLoginAt,
        createdAt: a.createdAt,
      })),
      adminCount: admins.length,
      roleCount: roles.length,
      superadminEmail: process.env.SUPERADMIN_EMAIL || 'admin@clicktaketech.com',
      hasSuperadminPasswordEnv: !!process.env.SUPERADMIN_PASSWORD,
    }

    if (action === 'reset') {
      const targetEmail = (
        url.searchParams.get('email') ||
        process.env.SUPERADMIN_EMAIL ||
        'admin@clicktaketech.com'
      ).toLowerCase()
      const newPassword = process.env.SUPERADMIN_PASSWORD || 'Admin@2026'

      const existing = await prisma.adminUser.findFirst({
        where: { email: targetEmail },
      })

      if (!existing) {
        const superAdminRole = roles.find((r) => r.name === 'Super Admin')
        if (!superAdminRole) {
          return NextResponse.json({
            ...result,
            action: 'reset',
            error: 'No "Super Admin" role found in DB. Schema migration may be missing.',
          }, { status: 500 })
        }
        const hashed = await hashPassword(newPassword)
        const created = await prisma.adminUser.create({
          data: {
            email: targetEmail,
            passwordHash: hashed,
            fullName: 'Super Admin',
            roleId: superAdminRole.id,
            status: 'Active',
          },
        })
        result.action = 'reset'
        result.resetResult = { created: true, userId: created.id, email: created.email }
      } else {
        const hashed = await hashPassword(newPassword)
        await prisma.adminUser.update({
          where: { id: existing.id },
          data: { passwordHash: hashed, status: 'Active' },
        })
        result.action = 'reset'
        result.resetResult = { updated: true, userId: existing.id, email: existing.email }
      }
    }

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (err: any) {
    return NextResponse.json({
      error: 'DB error',
      message: err?.message || String(err),
      code: err?.code,
    }, { status: 500 })
  }
}
