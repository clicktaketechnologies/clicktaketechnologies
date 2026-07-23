// ─────────────────────────────────────────────────────────────────────────────
// Prisma-compatible shim over Drizzle ORM.
//
// Exposes a `prisma` object whose API mirrors Prisma Client's top-level model
// access (prisma.user.findUnique(...), prisma.post.findMany(...), etc.) but
// translates each call to the equivalent Drizzle query.
//
// Supported subset (covers everything the codebase actually uses):
//   - findUnique / findFirst / findMany / create / createMany / update /
//     updateMany / delete / deleteMany / count / upsert / groupBy / aggregate
//   - where: equality, null (isNull), AND, OR, NOT, equals, not, in, notIn,
//            isNull, gte, lte, gt, lt, contains (ILIKE), startsWith, endsWith
//   - orderBy: { field: "asc"|"desc" } | [{ field: "asc" }, ...]
//   - take / skip / distinct
//   - include: shallow + nested (resolved via Drizzle's relational query API)
//   - select: column projection
//   - nested create: { relationName: { create: [...] | {...} } }
//
// Why this exists: Cloudflare Workers does not reliably run Prisma's WASM
// engine + driver adapter combination. Drizzle runs natively on Workers via
// the `pg` + `pg-cloudflare` socket adapter, with no engine binary at all.
// ─────────────────────────────────────────────────────────────────────────────

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  eq,
  ne,
  and,
  or,
  not,
  inArray,
  notInArray,
  isNull,
  isNotNull,
  gte,
  lte,
  gt,
  lt,
  ilike,
  asc,
  desc,
  sql,
  count as drizzleCount,
} from "drizzle-orm";
import * as schemaObj from "./schema";

// ─── Drizzle client ─────────────────────────────────────────────────────────
// Lazy-initialized so that runtime env var overrides (e.g. when running seed
// scripts that call dotenv.config({ override: true }) AFTER the module loads)
// are honored.
let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getPool(): Pool {
  if (!_pool) {
    const connectionString =
      process.env.DATABASE_URL || process.env.DIRECT_URL || "";
    _pool = new Pool({
      connectionString,
      max: 1,
      allowExitOnIdle: false,
    });
  }
  return _pool;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getPool(), { schema: schemaObj, logger: false });
  }
  return _db;
}

// For backwards compat with code that imports { db, pool } directly:
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_t, prop) {
    const realDb = getDb();
    return (realDb as any)[prop];
  },
});

export const pool = new Proxy({} as Pool, {
  get(_t, prop) {
    const realPool = getPool();
    return (realPool as any)[prop];
  },
});

// Also export a getter for code that needs the raw drizzle instance
export function getRawDb() {
  return getDb();
}

// ─── Schema map: Prisma model name → Drizzle table ──────────────────────────
const modelMap: Record<string, any> = {
  page: schemaObj.pages,
  cmsMedia: schemaObj.cmsMedia,
  cmsBlog: schemaObj.cmsBlogs,
  cmsBackground: schemaObj.cmsBackgrounds,
  cmsNavLink: schemaObj.cmsNavLinks,
  cmsTypography: schemaObj.cmsTypography,
  cmsFontPreset: schemaObj.cmsFontPresets,
  cmsTheme: schemaObj.cmsThemes,
  cmsThemePreset: schemaObj.cmsThemePresets,
  lead: schemaObj.leads,
  adminNotification: schemaObj.adminNotifications,
  emailTemplate: schemaObj.emailTemplates,
  emailWorkflow: schemaObj.emailWorkflows,
  smtpLog: schemaObj.smtpLogs,
  seoPageMeta: schemaObj.seoPageMeta,
  seoSitemapConfig: schemaObj.seoSitemapConfig,
  seoRobotsConfig: schemaObj.seoRobotsConfig,
  teamMember: schemaObj.teamMembers,
  jobOpening: schemaObj.jobOpenings,
  jobApplication: schemaObj.jobApplications,
  portfolioItem: schemaObj.portfolioItems,
  testimonial: schemaObj.testimonials,
  resource: schemaObj.resources,
  adminRole: schemaObj.adminRoles,
  rolePermission: schemaObj.rolePermissions,
  adminUser: schemaObj.adminUsers,
  securitySetting: schemaObj.securitySettings,
  securityLog: schemaObj.securityLogs,
  blockedIp: schemaObj.blockedIps,
  backup: schemaObj.backups,
  pageView: schemaObj.pageViews,
  auditLog: schemaObj.auditLogs,
  siteSetting: schemaObj.siteSettings,
  service: schemaObj.services,
  user: schemaObj.users,
  post: schemaObj.posts,
  providerConfig: schemaObj.providerConfigs,
  providerHealth: schemaObj.providerHealth,
  providerUsage: schemaObj.providerUsage,
  emailLog: schemaObj.emailLogs,
  storageObject: schemaObj.storageObjects,
};

// ─── Where-clause builder ───────────────────────────────────────────────────
type PrismaWhere = Record<string, any>;
type DrizzleCondition = ReturnType<typeof eq> | ReturnType<typeof and> | undefined;

function buildWhere(table: any, where: PrismaWhere | undefined): DrizzleCondition {
  if (!where || Object.keys(where).length === 0) return undefined;
  const conditions: any[] = [];

  for (const [key, val] of Object.entries(where)) {
    if (val === undefined) continue;

    if (key === "AND") {
      const subs = (val as PrismaWhere[])
        .map((v) => buildWhere(table, v))
        .filter(Boolean) as any[];
      if (subs.length) conditions.push(and(...subs));
      continue;
    }
    if (key === "OR") {
      const subs = (val as PrismaWhere[])
        .map((v) => buildWhere(table, v))
        .filter(Boolean) as any[];
      if (subs.length) conditions.push(or(...subs));
      continue;
    }
    if (key === "NOT") {
      const sub = buildWhere(table, val as PrismaWhere);
      if (sub) conditions.push(not(sub));
      continue;
    }

    const col = table[key];
    if (!col) continue;

    if (val === null) {
      conditions.push(isNull(col));
      continue;
    }
    if (val instanceof Date) {
      conditions.push(eq(col, val));
      continue;
    }
    if (Array.isArray(val)) {
      conditions.push(inArray(col, val));
      continue;
    }
    if (typeof val === "object") {
      for (const [op, opVal] of Object.entries(val as Record<string, any>)) {
        switch (op) {
          case "equals":
            conditions.push(opVal === null ? isNull(col) : eq(col, opVal));
            break;
          case "not":
            conditions.push(opVal === null ? isNotNull(col) : not(eq(col, opVal)));
            break;
          case "in":
            conditions.push(inArray(col, opVal as any[]));
            break;
          case "notIn":
            conditions.push(notInArray(col, opVal as any[]));
            break;
          case "isNull":
            conditions.push(opVal ? isNull(col) : isNotNull(col));
            break;
          case "gte":
            conditions.push(gte(col, opVal));
            break;
          case "lte":
            conditions.push(lte(col, opVal));
            break;
          case "gt":
            conditions.push(gt(col, opVal));
            break;
          case "lt":
            conditions.push(lt(col, opVal));
            break;
          case "contains":
            conditions.push(ilike(col, `%${opVal}%`));
            break;
          case "startsWith":
            conditions.push(ilike(col, `${opVal}%`));
            break;
          case "endsWith":
            conditions.push(ilike(col, `%${opVal}`));
            break;
          case "mode":
            break; // ILIKE already case-insensitive
        }
      }
      continue;
    }
    conditions.push(eq(col, val));
  }

  return conditions.length === 0 ? undefined : and(...conditions);
}

// ─── Order-by builder (for select() queries) ────────────────────────────────
function applyOrderBy(qb: any, table: any, orderBy: any): any {
  if (!orderBy) return qb;
  const entries: [string, "asc" | "desc"][] = Array.isArray(orderBy)
    ? orderBy.flatMap((o: any) => Object.entries(o))
    : Object.entries(orderBy);
  for (const [field, dir] of entries) {
    const col = table[field];
    if (!col) continue;
    qb = qb.orderBy(dir === "desc" ? desc(col) : asc(col));
  }
  return qb;
}

// Convert Prisma orderBy to Drizzle's relational-query orderBy form
function toRelationalOrderBy(table: any, orderBy: any): any {
  if (!orderBy) return undefined;
  if (Array.isArray(orderBy)) {
    return orderBy.map((o: any) => {
      const [k, v] = Object.entries(o)[0];
      return v === "desc" ? desc(table[k]) : asc(table[k]);
    });
  }
  const [k, v] = Object.entries(orderBy)[0];
  return v === "desc" ? desc(table[k]) : asc(table[k]);
}

// Convert Prisma include to Drizzle's `with`
function toWith(include: any): any {
  if (!include) return undefined;
  const w: Record<string, any> = {};
  for (const [k, vRaw] of Object.entries(include)) {
    const v = vRaw as any;
    if (v === true) {
      w[k] = true;
    } else if (v && typeof v === "object") {
      const sub: Record<string, any> = {};
      if (v.with || v.include) sub.with = toWith(v.with || v.include);
      if (v.where) sub.where = v.where;
      if (v.orderBy) sub.orderBy = v.orderBy;
      if (v.take) sub.limit = v.take;
      if (v.skip) sub.offset = v.skip;
      if (v.select) sub.columns = toColumns(v.select);
      w[k] = sub;
    }
  }
  return w;
}

// Convert Prisma select to Drizzle's `columns`
function toColumns(select: any): any {
  if (!select) return undefined;
  const out: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(select)) {
    if (v === true) out[k] = true;
  }
  return out;
}

// ─── Helper: split nested writes from flat column writes ────────────────────
const NESTED_WRITE_OPS = new Set([
  "create",
  "update",
  "connect",
  "connectOrCreate",
  "upsert",
  "set",
  "disconnect",
  "delete",
  "deleteMany",
  "updateMany",
  "createMany",
]);

function splitNested(data: any): {
  nested: Record<string, any>;
  flat: Record<string, any>;
} {
  const nested: Record<string, any> = {};
  const flat: Record<string, any> = {};
  if (!data || typeof data !== "object") return { nested, flat };
  for (const [k, v] of Object.entries(data)) {
    if (
      v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      !(v instanceof Date)
    ) {
      const keys = Object.keys(v as Record<string, any>);
      if (keys.some((kk) => NESTED_WRITE_OPS.has(kk))) {
        nested[k] = v;
        continue;
      }
    }
    flat[k] = v;
  }
  return { nested, flat };
}

// ─── Model factory ──────────────────────────────────────────────────────────
// Drizzle's relational query API exposes per-table finders under db.query.<name>
// where <name> is the camelCase VARIABLE name from the schema export (e.g.
// "adminUsers" — note the plural, matching `export const adminUsers = ...`),
// NOT the snake_case DB table name ("admin_users") and NOT the singular
// Prisma-style model name ("adminUser"). The Drizzle symbol `drizzle:Name`
// returns the snake_case DB name, so we map back to the actual export key
// by iterating schemaObj's exports.
let _relationalKeyMap: Record<string, string> | null = null;
function getRelationalKeyMap(): Record<string, string> {
  if (!_relationalKeyMap) {
    _relationalKeyMap = {};
    // schemaObj's exports are the schema variable names (adminUsers, adminRoles, etc.)
    for (const [exportName, table] of Object.entries(schemaObj)) {
      // Skip relation definitions (e.g. adminUsersRelations) and the `schema` aggregate.
      if (exportName.endsWith("Relations") || exportName === "schema") continue;
      if (table && typeof table === "object" && Symbol.for("drizzle:Name") in table) {
        const dbTableName = (table as any)[Symbol.for("drizzle:Name")];
        _relationalKeyMap[dbTableName] = exportName;
      }
    }
  }
  return _relationalKeyMap;
}

function makeModel(modelName: string, table: any) {
  const tableName = table[Symbol.for("drizzle:Name")];
  // Look up the relational query by the camelCase schema-export variable name.
  // Done lazily so the map is populated by the time any model method is called.
  const getRelationalQuery = (): any => {
    const key = getRelationalKeyMap()[tableName];
    return (getDb() as any).query?.[key];
  };

  return {
    async findUnique(opts: {
      where: PrismaWhere;
      include?: Record<string, any>;
      select?: Record<string, boolean>;
    }): Promise<any> {
      const cond = buildWhere(table, opts.where);
      if (opts.include && getRelationalQuery()) {
        const row = await getRelationalQuery().findFirst({
          where: cond,
          with: toWith(opts.include),
          columns: opts.select ? toColumns(opts.select) : undefined,
        });
        return row || null;
      }
      let q: any = getDb().select().from(table);
      if (cond) q = q.where(cond);
      q = q.limit(1);
      const rows = await q;
      if (rows.length === 0) return null;
      return rows[0];
    },

    async findFirst(opts: {
      where?: PrismaWhere;
      include?: Record<string, any>;
      orderBy?: any;
      select?: Record<string, boolean>;
      distinct?: any;
    } = {}): Promise<any> {
      const cond = buildWhere(table, opts.where);
      if (opts.include && getRelationalQuery()) {
        const row = await getRelationalQuery().findFirst({
          where: cond,
          with: toWith(opts.include),
          orderBy: toRelationalOrderBy(table, opts.orderBy),
          columns: opts.select ? toColumns(opts.select) : undefined,
        });
        return row || null;
      }
      let q: any = getDb().select(opts.select ? toColumnsForSelect(table, opts.select) : undefined).from(table);
      if (cond) q = q.where(cond);
      q = applyOrderBy(q, table, opts.orderBy);
      q = q.limit(1);
      const rows = await q;
      if (rows.length === 0) return null;
      return rows[0];
    },

    async findMany(opts: {
      where?: PrismaWhere;
      include?: Record<string, any>;
      orderBy?: any;
      take?: number;
      skip?: number;
      distinct?: any;
      select?: Record<string, boolean>;
    }): Promise<any[]> {
      const cond = buildWhere(table, opts.where);
      if (opts.include && getRelationalQuery()) {
        const rows = await getRelationalQuery().findMany({
          where: cond,
          with: toWith(opts.include),
          orderBy: toRelationalOrderBy(table, opts.orderBy),
          limit: opts.take,
          offset: opts.skip,
          columns: opts.select ? toColumns(opts.select) : undefined,
        });
        return rows;
      }
      let q: any = getDb().select(
        opts.select ? toColumnsForSelect(table, opts.select) : undefined
      ).from(table);
      if (cond) q = q.where(cond);
      q = applyOrderBy(q, table, opts.orderBy);
      if (opts.skip) q = q.offset(opts.skip);
      if (opts.take) q = q.limit(opts.take);
      if (opts.distinct) {
        const cols = (Array.isArray(opts.distinct) ? opts.distinct : [opts.distinct])
          .map((k: string) => table[k])
          .filter(Boolean);
        if (cols.length) q = q.distinct(...cols);
      }
      const rows: any[] = await q;
      return rows;
    },

    async create(opts: { data: any; include?: Record<string, any> }): Promise<any> {
      const { nested, flat } = splitNested(opts.data);
      if ("updatedAt" in table && flat.updatedAt === undefined) {
        flat.updatedAt = new Date();
      }
      const insertedRows: any[] = (await getDb().insert(table).values(flat).returning()) as any[];
      const row = insertedRows[0];
      if (!row) return null;

      // Resolve nested creates
      const relConfig = (schemaObj as any)[`${tableName}Relations`];
      if (relConfig && relConfig.config) {
        // Drizzle relation configs are functions taking (helpers) — call them
        // to get the actual relation descriptors.
      }
      // Walk over schema to find relations whose sourceTable === table
      for (const [relName, sub] of Object.entries(nested)) {
        const targetTable = findTargetTableForRelation(tableName, relName);
        const fkColName = findFkColumnForRelation(tableName, relName);
        if (!targetTable || !fkColName) continue;
        const subSpec = sub as any;
        if (subSpec.create) {
          const arr = Array.isArray(subSpec.create)
            ? subSpec.create
            : [subSpec.create];
          for (const item of arr) {
            if (item[fkColName] === undefined) {
              item[fkColName] = row.id;
            }
            if ("updatedAt" in targetTable && item.updatedAt === undefined) {
              item.updatedAt = new Date();
            }
            await getDb().insert(targetTable).values(item);
          }
        }
      }

      if (opts.include && getRelationalQuery()) {
        // Re-read to attach relations
        return getRelationalQuery().findFirst({
          where: eq(table.id, row.id),
          with: toWith(opts.include),
        });
      }
      return row;
    },

    async createMany(opts: {
      data: any[];
      skipDuplicates?: boolean;
    }): Promise<{ count: number }> {
      const arr = Array.isArray(opts.data) ? opts.data : [opts.data];
      if (arr.length === 0) return { count: 0 };
      const cleaned = arr.map((d) => {
        const { flat } = splitNested(d);
        if ("updatedAt" in table && flat.updatedAt === undefined) {
          flat.updatedAt = new Date();
        }
        return flat;
      });
      const result: any[] = (await getDb().insert(table).values(cleaned).returning()) as any[];
      return { count: result.length };
    },

    async update(opts: {
      where: PrismaWhere;
      data: any;
      include?: Record<string, any>;
    }): Promise<any> {
      const cond = buildWhere(table, opts.where);
      const { flat } = splitNested(opts.data);
      if ("updatedAt" in table && flat.updatedAt === undefined) {
        flat.updatedAt = new Date();
      }
      const rows: any[] = (await db
        .update(table)
        .set(flat)
        .where(cond || undefined)
        .returning()) as any[];
      if (rows.length === 0) return null;
      if (opts.include && getRelationalQuery()) {
        return getRelationalQuery().findFirst({
          where: eq(table.id, rows[0].id),
          with: toWith(opts.include),
        });
      }
      return rows[0];
    },

    async updateMany(opts: {
      where: PrismaWhere;
      data: any;
    }): Promise<{ count: number }> {
      const cond = buildWhere(table, opts.where);
      const { flat } = splitNested(opts.data);
      if ("updatedAt" in table && flat.updatedAt === undefined) {
        flat.updatedAt = new Date();
      }
      const rows = await db
        .update(table)
        .set(flat)
        .where(cond || undefined)
        .returning();
      return { count: rows.length };
    },

    async delete(opts: { where: PrismaWhere }): Promise<any> {
      const cond = buildWhere(table, opts.where);
      const rows: any[] = (await db
        .delete(table)
        .where(cond || undefined)
        .returning()) as any[];
      return rows[0] || null;
    },

    async deleteMany(opts: { where: PrismaWhere }): Promise<{ count: number }> {
      const cond = buildWhere(table, opts.where);
      const rows: any[] = (await db
        .delete(table)
        .where(cond || undefined)
        .returning()) as any[];
      return { count: rows.length };
    },

    async count(opts: { where?: PrismaWhere } = {}): Promise<number> {
      const cond = buildWhere(table, opts.where);
      const rows = await db
        .select({ count: drizzleCount() })
        .from(table)
        .where(cond || undefined);
      return Number(rows[0]?.count ?? 0);
    },

    async upsert(opts: {
      where: PrismaWhere;
      create: any;
      update: any;
      include?: Record<string, any>;
    }): Promise<any> {
      const cond = buildWhere(table, opts.where);
      const existing: any[] = (await db
        .select()
        .from(table)
        .where(cond || undefined)
        .limit(1)) as any[];
      if (existing.length > 0) {
        const { flat } = splitNested(opts.update);
        if ("updatedAt" in table && flat.updatedAt === undefined) {
          flat.updatedAt = new Date();
        }
        const updatedRows: any[] = (await db
          .update(table)
          .set(flat)
          .where(cond || undefined)
          .returning()) as any[];
        const row = updatedRows[0];
        if (opts.include && getRelationalQuery()) {
          return getRelationalQuery().findFirst({
            where: eq(table.id, row.id),
            with: toWith(opts.include),
          });
        }
        return row;
      }
      return makeModel(modelName, table).create({
        data: opts.create,
        include: opts.include,
      });
    },

    async groupBy(opts: {
      by: string[];
      where?: PrismaWhere;
      _count?: boolean | Record<string, boolean>;
      _sum?: Record<string, boolean>;
      _avg?: Record<string, boolean>;
      _min?: Record<string, boolean>;
      _max?: Record<string, boolean>;
      orderBy?: any;
      take?: number;
      skip?: number;
    }): Promise<any[]> {
      const cond = buildWhere(table, opts.where);
      const sel: Record<string, any> = {};
      for (const field of opts.by) {
        if (table[field]) sel[field] = table[field];
      }
      if (opts._count === true) {
        sel["_count"] = drizzleCount();
      } else if (typeof opts._count === "object") {
        for (const f of Object.keys(opts._count)) {
          sel[`_count_${f}`] = drizzleCount(table[f]);
        }
      }
      const aggMap: Record<string, Function> = {
        _sum: (c: any) => sql`sum(${c})`,
        _avg: (c: any) => sql`avg(${c})`,
        _min: (c: any) => sql`min(${c})`,
        _max: (c: any) => sql`max(${c})`,
      };
      for (const agg of ["_sum", "_avg", "_min", "_max"] as const) {
        const fields = (opts as any)[agg];
        if (!fields || typeof fields !== "object") continue;
        for (const f of Object.keys(fields)) {
          if (table[f]) sel[`${agg}_${f}`] = aggMap[agg](table[f]);
        }
      }
      let q: any = getDb().select(sel).from(table);
      if (cond) q = q.where(cond);
      const groupCols = opts.by.map((f) => table[f]).filter(Boolean);
      if (groupCols.length) q = q.groupBy(...groupCols);
      q = applyOrderBy(q, table, opts.orderBy);
      if (opts.skip) q = q.offset(opts.skip);
      if (opts.take) q = q.limit(opts.take);
      const rows = await q;
      // Reshape to Prisma's groupBy response
      return rows.map((r: any) => {
        const out: any = {};
        for (const [k, v] of Object.entries(r)) {
          if (k.startsWith("_count_")) {
            out._count = out._count || {};
            out._count[k.slice("_count_".length)] = Number(v);
          } else if (k === "_count") {
            out._count = Number(v);
          } else if (
            k.startsWith("_sum_") ||
            k.startsWith("_avg_") ||
            k.startsWith("_min_") ||
            k.startsWith("_max_")
          ) {
            const idx = k.indexOf("_", 1);
            const agg = k.slice(0, idx);
            const f = k.slice(idx + 1);
            out[agg] = out[agg] || {};
            out[agg][f] = v === null ? null : Number(v);
          } else {
            out[k] = v;
          }
        }
        return out;
      });
    },

    async aggregate(opts: any): Promise<any> {
      return makeModel(modelName, table).groupBy(opts);
    },
  };
}

// Convert Prisma select to Drizzle's select() arg
function toColumnsForSelect(table: any, select: any): any {
  if (!select) return undefined;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(select)) {
    if (v === true && table[k]) out[k] = table[k];
  }
  return out;
}

// ─── Relation resolvers (used by nested creates) ────────────────────────────
// We hard-code the small set of relations the codebase actually uses for
// nested creates. (Nested creates are rare — only the seed-admin path uses
// `adminRole.create({ ... permissions: { create: [...] } })`.)
// Keys are the camelCase MODEL name (adminRoles), but the shim's runtime
// tableName is the snake_case DB table name (admin_roles). Accept both.
const RELATION_MAP: Record<
  string,
  Record<string, { target: string; fkColumn: string }>
> = {
  adminRoles: {
    permissions: { target: "rolePermissions", fkColumn: "roleId" },
  },
  admin_roles: {
    permissions: { target: "role_permissions", fkColumn: "roleId" },
  },
  adminUsers: {
    role: { target: "adminRoles", fkColumn: "roleId" },
  },
  admin_users: {
    role: { target: "admin_roles", fkColumn: "roleId" },
  },
  jobOpenings: {
    applications: { target: "jobApplications", fkColumn: "jobId" },
  },
  job_openings: {
    applications: { target: "job_applications", fkColumn: "jobId" },
  },
};

// Map a snake_case DB table name (used by RELATION_MAP values' target field
// at runtime) back to the modelMap key (camelCase, SINGULAR) so we can look
// up the actual Drizzle table object.
const SNAKE_TO_CAMEL_MODEL: Record<string, string> = {
  admin_roles: "adminRole",
  role_permissions: "rolePermission",
  admin_users: "adminUser",
  job_openings: "jobOpening",
  job_applications: "jobApplication",
};

function findTargetTableForRelation(
  tableName: string,
  relName: string
): any | null {
  const rel = RELATION_MAP[tableName]?.[relName];
  if (!rel) return null;
  // rel.target may be camelCase plural (rolePermissions), snake_case plural
  // (role_permissions), or camelCase singular. Normalize via the snake→camel
  // map first, then fall back to direct lookup.
  const targetKey = SNAKE_TO_CAMEL_MODEL[rel.target] || rel.target;
  return (
    (modelMap as any)[targetKey] ||
    (modelMap as any)[rel.target] ||
    null
  );
}

function findFkColumnForRelation(
  tableName: string,
  relName: string
): string | null {
  const rel = RELATION_MAP[tableName]?.[relName];
  if (!rel) return null;
  return rel.fkColumn;
}

// ─── Build the public `prisma` object ───────────────────────────────────────
const prismaObj: Record<string, any> = {};
for (const [modelName, table] of Object.entries(modelMap)) {
  prismaObj[modelName] = makeModel(modelName, table);
}

export const prisma = prismaObj as any;
export { schemaObj as schema };
