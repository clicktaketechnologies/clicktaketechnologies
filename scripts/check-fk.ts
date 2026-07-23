import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const c = await pool.connect();
  try {
    // Check job_applications columns
    const r = await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'job_applications' ORDER BY ordinal_position");
    console.log("job_applications columns:");
    for (const row of r.rows) console.log(`  ${row.column_name} (${row.data_type})`);
    
    // Check FKs on job_applications
    const fks = await c.query(`
      SELECT tc.constraint_name, kcu.column_name, ccu.table_name AS ref_table
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
      WHERE tc.table_name = 'job_applications' AND tc.constraint_type = 'FOREIGN KEY'
    `);
    console.log("\njob_applications FKs:");
    for (const row of fks.rows) console.log(`  ${row.constraint_name}: ${row.column_name} -> ${row.ref_table}`);
    
    // Try the actual team-careers query
    console.log("\n=== Trying actual team-careers query ===");
    try {
      const q = await c.query(`
        SELECT ja.*, jo.title as job_title
        FROM job_applications ja
        LEFT JOIN job_openings jo ON ja.job_id = jo.id
        ORDER BY ja.created_at DESC
        LIMIT 50
      `);
      console.log("✓ Query succeeded, rows:", q.rows.length);
    } catch (e: any) {
      console.log("✗ Failed:", e.message);
    }
  } finally { c.release(); await pool.end(); }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
