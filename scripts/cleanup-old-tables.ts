// Find and drop FKs that reference the old tables, then drop the old tables
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  
  const tablesToClean = ["services_old", "email_templates_old", "cms_themes_old"];
  
  for (const table of tablesToClean) {
    console.log(`\n=== Cleaning up ${table} ===`);
    
    // Check if exists
    const exists = await client.query(`
      SELECT to_regclass('public.${table}') as exists
    `);
    if (!exists.rows[0].exists) {
      console.log(`  ✓ Already gone, skipping`);
      continue;
    }
    
    // Find FKs pointing to this table
    const fks = await client.query(`
      SELECT 
        tc.table_name, 
        tc.constraint_name,
        kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND kcu.position_in_unique_constraint IS NOT NULL
        AND tc.table_name IN (
          SELECT DISTINCT tc2.table_name
          FROM information_schema.table_constraints tc2
          JOIN information_schema.constraint_column_usage ccu 
            ON tc2.constraint_name = ccu.constraint_name
          WHERE ccu.table_name = $1
        )
    `, [table]);
    
    console.log(`  Found ${fks.rows.length} FKs depending on ${table}`);
    
    for (const fk of fks.rows) {
      console.log(`    Dropping FK: ${fk.constraint_name} on ${fk.table_name}`);
      try {
        await client.query(`ALTER TABLE ${fk.table_name} DROP CONSTRAINT ${fk.constraint_name} CASCADE`);
      } catch (e) {
        console.log(`      ⚠ ${e.message.split("\n")[0]}`);
      }
    }
    
    // Now drop the old table
    try {
      await client.query(`DROP TABLE ${table} CASCADE`);
      console.log(`  ✓ Dropped ${table}`);
    } catch (e) {
      console.log(`  ✗ Still failed: ${e.message.split("\n")[0]}`);
    }
  }
  
  // Now migrate cms_themes
  console.log(`\n=== Migrating cms_themes (with quoted "primary" column) ===`);
  try {
    await client.query("BEGIN");
    
    // Check if old schema (id uuid)
    const cols = await client.query(`
      SELECT data_type FROM information_schema.columns 
      WHERE table_name = 'cms_themes' AND column_name = 'id'
    `);
    
    if (cols.rows[0]?.data_type === 'uuid') {
      // Old schema — rename
      await client.query(`ALTER TABLE cms_themes RENAME TO cms_themes_old`);
      
      // Create new
      await client.query(`
        CREATE TABLE cms_themes (
          "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "name" text NOT NULL UNIQUE,
          "mode" text DEFAULT 'dark',
          "primary" text DEFAULT '#136DFF',
          "accent" text DEFAULT '#FF53A9',
          "background" text,
          "foreground" text,
          "muted" text,
          "border" text,
          "card" text,
          "config" text DEFAULT '{}',
          "is_active" boolean DEFAULT false,
          "created_at" timestamp DEFAULT NOW(),
          "updated_at" timestamp DEFAULT NOW()
        )
      `);
      
      // Migrate data with quoted column
      await client.query(`
        INSERT INTO cms_themes ("id", "name", "mode", "primary", "accent", "background", "foreground", "muted", "border", "card", "config", "is_active", "created_at", "updated_at")
        SELECT 
          id::text,
          name,
          'dark',
          '#136DFF',
          '#FF53A9',
          NULL,
          NULL,
          NULL,
          NULL,
          NULL,
          COALESCE(config::text, '{}'),
          COALESCE(is_active, false),
          created_at,
          COALESCE(updated_at, created_at)
        FROM cms_themes_old
      `);
      
      const cnt = await client.query("SELECT COUNT(*) FROM cms_themes");
      console.log(`  ✓ Migrated ${cnt.rows[0].count} rows`);
      
      await client.query(`DROP TABLE cms_themes_old CASCADE`);
      console.log(`  ✓ Dropped cms_themes_old`);
      
      await client.query("COMMIT");
    } else {
      console.log(`  ✓ Already has new schema, skipping`);
      await client.query("ROLLBACK");
    }
  } catch (e) {
    await client.query("ROLLBACK");
    console.log(`  ✗ Failed: ${e.message.split("\n")[0]}`);
  }
  
  client.release();
  await pool.end();
  process.exit(0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
