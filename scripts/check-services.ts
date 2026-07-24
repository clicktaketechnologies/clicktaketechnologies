import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const c = await pool.connect();
  try {
    const r = await c.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'services' ORDER BY ordinal_position`);
    console.log("services columns:");
    for (const row of r.rows) console.log(`  ${row.column_name} (${row.data_type})`);
    
    console.log("\nDirect query test:");
    try {
      const q = await c.query(`SELECT id, slug, category, category_label, title, description, detailed_description, icon_name, image_url, gradient, glow, eyebrow, items, results, differentiators, deliverables, faq, process_steps, pricing_packages, display_order, is_published, created_at, updated_at FROM services ORDER BY created_at DESC LIMIT 1`);
      console.log("✓ Success");
    } catch (e) {
      console.log("✗ Failed:", e.message);
    }
    
    // email_templates
    const r2 = await c.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'email_templates' ORDER BY ordinal_position`);
    console.log("\nemail_templates columns:");
    for (const row of r2.rows) console.log(`  ${row.column_name}`);
    
    // Check what providers table is
    const r3 = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE '%provider%'`);
    console.log("\nProvider-related tables:");
    for (const row of r3.rows) console.log(`  ${row.table_name}`);
    
    // Check nav links
    const r4 = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND (table_name LIKE '%nav%' OR table_name LIKE '%link%')`);
    console.log("\nNav/link tables:");
    for (const row of r4.rows) console.log(`  ${row.table_name}`);
  } finally { c.release(); await pool.end(); }
}

main().then(() => process.exit(0)).catch(e => { console.error("FATAL:", e); process.exit(1); });
