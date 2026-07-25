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

    // ─── action=simulate ──────────────────────────────────────────────────
    // Runs the EXACT same code path as NextAuth authorize() — step by step,
    // catching and reporting errors at each stage. This isolates exactly
    // where the CredentialsSignin is coming from.
    if (action === 'simulate') {
      const targetEmail = (
        url.searchParams.get('email') ||
        process.env.SUPERADMIN_EMAIL ||
        'admin@clicktaketech.com'
      ).toLowerCase()
      const testPassword = url.searchParams.get('password') || 'Admin@2026'

      const steps: any[] = []

      // Step 1: ensureSeedAdmin (should be no-op if admin exists)
      try {
        const { ensureSeedAdmin } = await import('@/lib/auth')
        await ensureSeedAdmin()
        steps.push({ step: 'ensureSeedAdmin', ok: true })
      } catch (e: any) {
        steps.push({ step: 'ensureSeedAdmin', ok: false, error: e?.message, stack: e?.stack?.split('\n').slice(0,3) })
      }

      // Step 2: findUnique with nested includes (same as authorize)
      let user: any = null
      try {
        user = await prisma.adminUser.findUnique({
          where: { email: targetEmail },
          include: { role: { include: { permissions: true } } },
        })
        steps.push({
          step: 'findUnique',
          ok: true,
          found: !!user,
          hasRole: !!user?.role,
          permissionCount: user?.role?.permissions?.length || 0,
        })
      } catch (e: any) {
        steps.push({ step: 'findUnique', ok: false, error: e?.message, stack: e?.stack?.split('\n').slice(0,3) })
        return NextResponse.json({ ...safeResult, simulate: { steps, aborted: true } }, { headers: { 'Cache-Control': 'no-store' } })
      }

      if (!user) {
        steps.push({ step: 'user-check', ok: false, error: 'User not found' })
        return NextResponse.json({ ...safeResult, simulate: { steps, aborted: true } }, { headers: { 'Cache-Control': 'no-store' } })
      }

      // Step 3: status check
      if (user.status !== 'Active') {
        steps.push({ step: 'status-check', ok: false, status: user.status })
        return NextResponse.json({ ...safeResult, simulate: { steps, aborted: true } }, { headers: { 'Cache-Control': 'no-store' } })
      }
      steps.push({ step: 'status-check', ok: true, status: user.status })

      // Step 4: verifyPassword
      let ok: boolean
      try {
        const { verifyPassword } = await import('@/lib/auth')
        ok = await verifyPassword(testPassword, user.passwordHash)
        steps.push({ step: 'verifyPassword', ok: true, result: ok })
      } catch (e: any) {
        steps.push({ step: 'verifyPassword', ok: false, error: e?.message })
        return NextResponse.json({ ...safeResult, simulate: { steps, aborted: true } }, { headers: { 'Cache-Control': 'no-store' } })
      }

      if (!ok) {
        steps.push({ step: 'password-match', ok: false })
        return NextResponse.json({ ...safeResult, simulate: { steps, aborted: true } }, { headers: { 'Cache-Control': 'no-store' } })
      }
      steps.push({ step: 'password-match', ok: true })

      // Step 5: update lastLoginAt
      try {
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        })
        steps.push({ step: 'update-lastLogin', ok: true })
      } catch (e: any) {
        steps.push({ step: 'update-lastLogin', ok: false, error: e?.message })
        return NextResponse.json({ ...safeResult, simulate: { steps, aborted: true } }, { headers: { 'Cache-Control': 'no-store' } })
      }

      // Step 6: logAudit
      try {
        const { logAudit } = await import('@/lib/log-audit')
        await logAudit({
          userId: user.id,
          userName: user.fullName,
          action: 'auth.login',
          details: { email: user.email, simulatedBy: 'recover-endpoint' },
        })
        steps.push({ step: 'logAudit', ok: true })
      } catch (e: any) {
        steps.push({ step: 'logAudit', ok: false, error: e?.message })
        // logAudit catches its own errors internally, so this shouldn't fire
      }

      // Step 7: build the return object
      const permissions = (user.role?.permissions || [])
        .filter((p: any) => p.allowed)
        .map((p: any) => p.permissionKey)

      const returnedUser = {
        id: user.id,
        email: user.email,
        name: user.fullName,
        roleId: user.roleId || '',
        roleName: user.role?.name || '',
        permissions,
      }

      steps.push({ step: 'build-return', ok: true, returnedUser })

      return NextResponse.json({
        ...safeResult,
        simulate: { steps, aborted: false, allPassed: true, returnedUser },
      }, { headers: { 'Cache-Control': 'no-store' } })
    }

    // ─── action=dbtables — list all tables in the production database ─────
    // Used to diagnose 500s on admin pages that query tables which may not
    // have been migrated (e.g. ab_experiments, services). Uses the same
    // connection pool that the prisma shim uses, so it reflects the actual
    // production database state.
    if (action === 'dbtables') {
      try {
        const { pool } = await import('@/lib/db')
        const res = await pool.query(
          `SELECT table_name FROM information_schema.tables
           WHERE table_schema = 'public'
           ORDER BY table_name`
        )
        const tables = res.rows.map((r: any) => r.table_name)
        return NextResponse.json({
          ...safeResult,
          dbtables: tables,
          count: tables.length,
          hasServices: tables.includes('services'),
          hasAbExperiments: tables.includes('ab_experiments'),
          hasAbVariants: tables.includes('ab_variants'),
          hasAbAssignments: tables.includes('ab_assignments'),
        }, { headers: { 'Cache-Control': 'no-store' } })
      } catch (e: any) {
        return NextResponse.json({
          ...safeResult,
          error: 'dbtables query failed',
          message: e?.message,
          stack: e?.stack?.split('\n').slice(0, 5),
        }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
      }
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
      // PERMANENT ADMIN PASSWORD: Admin@2026
      // The user has explicitly chosen to keep Admin@2026 as the permanent
      // admin password. The recovery endpoint ALWAYS resets to this value
      // unless an explicit ?password= override is provided. We deliberately
      // do NOT fall back to SUPERADMIN_PASSWORD env var anymore, because
      // that env var was set to an unknown value in the past and locked
      // the user out. To change the admin password in the future, the
      // user must either:
      //   1. Use the admin UI (admin/users → change password), OR
      //   2. Hit this endpoint with ?action=reset&password=<new-password>
      const newPassword = url.searchParams.get('password') || 'Admin@2026'
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
