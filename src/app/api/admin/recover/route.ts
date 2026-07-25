// GET /api/admin/recover
//
// Emergency diagnostic + recovery endpoint for admin login issues.
// Auth-independent (no session required). Gated by ONE of:
//   1. SUPERADMIN_RECOVERY_SECRET env var (preferred — set per-incident, delete after)
//   2. Hardcoded EMERGENCY_TOKEN below (auto-expires 2026-08-09)
//
// Actions:
//   ?action=diagnose (default) — list admin_users (emails + state, NO passwords),
//     roles, env var presence.
//   ?action=reset — force-reset admin user's password. New password comes from:
//     ?password=<value> query param (preferred, takes precedence) OR
//     SUPERADMIN_PASSWORD env var OR default 'Admin@2026'.
//   ?action=verify — test bcrypt verification against stored hash. Useful for
//     debugging when login fails after a reset.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Emergency backdoor (auto-expires) ───────────────────────────────────────
const EMERGENCY_TOKEN = 'clicktake-emergency-recover-2026-08-09'
const EMERGENCY_EXPIRY = new Date('2026-08-09T00:00:00Z').getTime()
const ENV_SECRET = process.env.SUPERADMIN_RECOVERY_SECRET

function isAuthorized(url: URL): { ok: boolean; reason?: string } {
  if (ENV_SECRET && url.searchParams.get('secret') === ENV_SECRET) {
    return { ok: true }
  }
  if (
    url.searchParams.get('token') === EMERGENCY_TOKEN &&
    Date.now() < EMERGENCY_EXPIRY
  ) {
    return { ok: true }
  }
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
        passwordHash: true, // only used by verify action; not serialized in diagnose
      },
    })

    // ─── Common diagnostic payload (NO password hashes serialized) ────────
    const safeResult: any = {
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
      action,
    }

    // ─── action=verify ────────────────────────────────────────────────────
    // Test bcrypt verification directly — bypasses the NextAuth authorize()
    // wrapper. Used to isolate whether the issue is in our bcrypt code or
    // in the NextAuth flow.
    if (action === 'verify') {
      const targetEmail = (
        url.searchParams.get('email') ||
        process.env.SUPERADMIN_EMAIL ||
        'admin@clicktaketech.com'
      ).toLowerCase()
      const testPassword = url.searchParams.get('password') || 'Admin@2026'

      const user = admins.find((a) => a.email === targetEmail)
      if (!user) {
        return NextResponse.json({
          ...safeResult,
          error: 'User not found',
          email: targetEmail,
        }, { status: 404 })
      }

      const storedHashResult = await verifyPassword(testPassword, user.passwordHash)
      const directBcryptResult = await bcrypt.compare(testPassword, user.passwordHash)
      const freshHash = await hashPassword(testPassword)
      const freshHashResult = await verifyPassword(testPassword, freshHash)

      return NextResponse.json({
        ...safeResult,
        verify: {
          email: user.email,
          status: user.status,
          hashPreview: user.passwordHash.substring(0, 30) + '...',
          hashLength: user.passwordHash.length,
          hashStartsWith2b: user.passwordHash.startsWith('$2b$'),
          hashStartsWith2a: user.passwordHash.startsWith('$2a$'),
          testPassword,
          verifyResult: storedHashResult,
          directBcryptResult,
          freshHashPreview: freshHash.substring(0, 30) + '...',
          freshHashResult,
          freshHashStartsWith2b: freshHash.startsWith('$2b$'),
        },
      }, { headers: { 'Cache-Control': 'no-store' } })
    }

    // ─── action=reset ─────────────────────────────────────────────────────
    if (action === 'reset') {
      const targetEmail = (
        url.searchParams.get('email') ||
        process.env.SUPERADMIN_EMAIL ||
        'admin@clicktaketech.com'
      ).toLowerCase()
      const newPassword =
        url.searchParams.get('password') ||
        process.env.SUPERADMIN_PASSWORD ||
        'Admin@2026'
      if (newPassword.length < 8) {
        return NextResponse.json({
          ...safeResult,
          error: 'Password must be at least 8 characters.',
        }, { status: 400 })
      }

      const existing = admins.find((a) => a.email === targetEmail)

      if (!existing) {
        const superAdminRole = roles.find((r) => r.name === 'Super Admin')
        if (!superAdminRole) {
          return NextResponse.json({
            ...safeResult,
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
        safeResult.resetResult = { created: true, userId: created.id, email: created.email, passwordNote: 'Reset to password param value' }
      } else {
        const hashed = await hashPassword(newPassword)
        await prisma.adminUser.update({
          where: { id: existing.id },
          data: { passwordHash: hashed, status: 'Active' },
        })
        safeResult.resetResult = { updated: true, userId: existing.id, email: existing.email, passwordNote: 'Reset to password param value' }
      }
    }

    return NextResponse.json(safeResult, {
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
