// Run the audit_logs migration via Node pg
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  
  try {
    // Begin transaction
    await client.query("BEGIN");
    
    // Check current state
    const beforeCount = await client.query("SELECT COUNT(*) FROM audit_logs");
    console.log(`audit_logs before: ${beforeCount.rows[0].count} rows`);
    
    // Rename existing table
    await client.query("ALTER TABLE audit_logs RENAME TO audit_logs_old");
    console.log("✓ Renamed audit_logs -> audit_logs_old");
    
    // Create new table matching Drizzle schema
    await client.query(`
      CREATE TABLE audit_logs (
        id text PRIMARY KEY,
        user_id text,
        user_name text,
        action text NOT NULL,
        entity text,
        entity_id text,
        details text DEFAULT '{}',
        ip_address text,
        created_at timestamp DEFAULT NOW()
      )
    `);
    console.log("✓ Created new audit_logs table");
    
    await client.query("CREATE INDEX audit_logs_user_id_idx ON audit_logs (user_id)");
    await client.query("CREATE INDEX audit_logs_action_idx ON audit_logs (action)");
    await client.query("CREATE INDEX audit_logs_created_at_idx ON audit_logs (created_at)");
    console.log("✓ Created indexes");
    
    // Migrate data
    await client.query(`
      INSERT INTO audit_logs (id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at)
      SELECT 
        gen_random_uuid()::text,
        admin_id::text,
        COALESCE(changed_by, ''),
        action,
        target_type,
        target_id,
        CASE 
          WHEN old_data IS NOT NULL AND new_data IS NOT NULL 
            THEN json_build_object('old', old_data, 'new', new_data)::text
          WHEN old_data IS NOT NULL 
            THEN json_build_object('old', old_data)::text
          WHEN new_data IS NOT NULL 
            THEN json_build_object('new', new_data)::text
          ELSE '{}'
        END,
        ip_address,
        created_at
      FROM audit_logs_old
    `);
    
    const migratedCount = await client.query("SELECT COUNT(*) FROM audit_logs");
    console.log(`✓ Migrated ${migratedCount.rows[0].count} rows to new schema`);
    
    // Drop old table
    await client.query("DROP TABLE audit_logs_old");
    console.log("✓ Dropped audit_logs_old");
    
    await client.query("COMMIT");
    console.log("✓ Transaction committed");
    
    // Verify the fix
    const testQuery = await client.query(`
      SELECT id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at 
      FROM audit_logs 
      ORDER BY created_at DESC 
      LIMIT 8
    `);
    console.log(`\n=== Test query succeeded — sample rows: ${testQuery.rows.length} ===`);
    if (testQuery.rows.length > 0) {
      console.log("Sample row:", JSON.stringify(testQuery.rows[0], null, 2));
    }
    
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("✗ Migration failed, rolled back:", e.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
