import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  try {
    const r = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'audit_logs' 
      ORDER BY ordinal_position;
    `);
    console.log("=== audit_logs columns ===");
    for (const row of r.rows) console.log(`  ${row.column_name} (${row.data_type})`);
    
    // Now try the exact failing query
    console.log("\n=== Try exact failing query ===");
    try {
      const q = await client.query(`SELECT id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 8`);
      console.log("✓ Success, rows:", q.rows.length);
    } catch (e) {
      console.error("✗ Failed:", e.message);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error("FATAL:", e); process.exit(1); });
