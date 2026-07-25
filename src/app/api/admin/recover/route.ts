// GET /api/admin/recover
//
// Emergency diagnostic + recovery endpoint for admin login issues.
// Auth-independent (no session required). Gated by ONE of:
//   1. SUPERADMIN_RECOVERY_SECRET env var (preferred — set per-incident, delete after)
//   2. Hardcoded EMERGENCY_TOKEN below (auto-expires — for one-shot unlock
//      when user can't set env vars from their dashboard in time)
//
// Use cases:
//   - Diagnose (default): list admin_users (emails + state, NO passwords),
//     roles, env var presence.
//   - Reset (?action=reset): force-reset admin user's password to
//     SUPERADMIN_PASSWORD env var (or default 'Admin@2026').
//
// Workflow:
//   1. Hit /api/admin/recover?token=<EMERGENCY_TOKEN>&action=reset
//   2. Login at /admin/login with admin@clicktaketech.com / Admin@2026
//   3. (Optional) Delete this endpoint or remove EMERGENCY_TOKEN after.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Emergency backdoor (auto-expires) ───────────────────────────────────────
// Hardcoded token that lets us reset the admin password without needing any
// env var setup. Expires 2026-08-09 — after which the token stops working
// even if it's still in the source.
const EMERGENCY_TOKEN = 'clicktake-emergency-recover-2026-08-09'
const EMERGENCY_EXPIRY = new Date('2026-08-09T00:00:00Z').getTime()

// ─── Preferred: env-var-based secret ─────────────────────────────────────────
const ENV_SECRET = process.env.SUPERADMIN_RECOVERY_SECRET

function isAuthorized(url: URL): { ok: boolean; reason?: string } {
  // Always allow env-var secret (per-incident, more secure, deletable)
  if (ENV_SECRET && url.searchParams.get('secret') === ENV_SECRET) {
    return { ok: true }
  }
  // Allow emergency token (only valid before expiry)
  if (
    url.searchParams.get('token') === EMERGENCY_TOKEN &&
    Date.now() < EMERGENCY_EXPIRY
  ) {
    return { ok: true }
  }
  // If neither matched, return 404 (hide the endpoint entirely)
  return { ok: false, reason: 'Not Found' }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const auth = isAuthorized(url)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.reason }, { status: 404 })
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
