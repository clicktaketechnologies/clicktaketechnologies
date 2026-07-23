// Quick DB check — verify all tables admin dashboard needs exist
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

// Use DIRECT_URL (port 5432) for ad-hoc queries — PgBouncer mode (port 6543) doesn't support prepared statements
const connStr = process.env.DIRECT_URL || process.env.DATABASE_URL;
console.log("Connecting with:", connStr.replace(/:[^:@]+@/, ":***@"));

const pool = new Pool({
  connectionString: connStr,
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log("=== All tables in DB ===");
    for (const row of res.rows) {
      console.log(`  ${row.table_name}`);
    }

    console.log("\n=== Required tables for /admin dashboard ===");
    const required = ["leads", "pages", "services", "smtp_logs", "team_members", "audit_logs"];
    for (const t of required) {
      const check = await client.query(
        `SELECT to_regclass('public.${t}') as exists`
      );
      console.log(`  ${t}: ${check.rows[0].exists ? "EXISTS" : "MISSING"}`);
    }

    console.log("\n=== Try a simple count on each required table ===");
    for (const t of required) {
      try {
        const count = await client.query(`SELECT COUNT(*) FROM ${t}`);
        console.log(`  ${t}: ${count.rows[0].count} rows`);
      } catch (e) {
        console.log(`  ${t}: ERROR — ${e.message}`);
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
