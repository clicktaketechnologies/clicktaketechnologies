// Migrate job_applications to match Drizzle schema
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const c = await pool.connect();
  
  // Check current schema
  const r = await c.query(`
    SELECT data_type FROM information_schema.columns 
    WHERE table_name = 'job_applications' AND column_name = 'id'
  `);
  
  if (r.rows[0]?.data_type !== 'uuid') {
    console.log("✓ job_applications already migrated");
    c.release(); await pool.end(); process.exit(0);
  }
  
  console.log("=== Migrating job_applications ===");
  
  // Drop existing FK
  try {
    await c.query(`ALTER TABLE job_applications DROP CONSTRAINT IF EXISTS job_applications_job_id_fkey CASCADE`);
    console.log("  ✓ Dropped old FK");
  } catch (e) {
    console.log("  ⚠ FK drop:", e.message.split("\n")[0]);
  }
  
  await c.query("BEGIN");
  try {
    await c.query(`ALTER TABLE job_applications RENAME TO job_applications_old`);
    
    await c.query(`
      CREATE TABLE job_applications (
        "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "job_id" text NOT NULL,
        "full_name" text NOT NULL,
        "email" text NOT NULL,
        "phone" text,
        "resume_url" text,
        "cover_letter" text,
        "status" text DEFAULT 'Submitted',
        "notes" text DEFAULT '',
        "created_at" timestamp DEFAULT NOW()
      )
    `);
    console.log("  ✓ Created new job_applications table");
    
    await c.query(`
      INSERT INTO job_applications (id, job_id, full_name, email, phone, resume_url, cover_letter, status, notes, created_at)
      SELECT 
        id::text,
        COALESCE(job_id::text, ''),
        applicant_name,
        email,
        phone,
        resume_url,
        cover_letter,
        COALESCE(status, 'Submitted'),
        COALESCE(notes, ''),
        applied_at
      FROM job_applications_old
    `);
    const cnt = await c.query("SELECT COUNT(*) FROM job_applications");
    console.log(`  ✓ Migrated ${cnt.rows[0].count} rows`);
    
    // Add FK to job_openings (skip if orphan rows exist)
    try {
      await c.query("SAVEPOINT before_fk");
      await c.query(`
        ALTER TABLE job_applications 
        ADD CONSTRAINT job_applications_job_id_fkey 
        FOREIGN KEY (job_id) REFERENCES job_openings(id) ON DELETE CASCADE
      `);
      console.log("  ✓ Restored FK to job_openings");
    } catch (e: any) {
      await c.query("ROLLBACK TO SAVEPOINT before_fk");
      console.log(`  ⚠ FK not restored: ${e.message.split("\n")[0]}`);
      console.log("    (orphan job_id values exist — Drizzle include will return null)");
    }
    
    await c.query(`
      CREATE INDEX job_applications_job_id_idx ON job_applications (job_id)
    `);
    await c.query(`
      CREATE INDEX job_applications_status_idx ON job_applications (status)
    `);
    
    await c.query(`DROP TABLE job_applications_old CASCADE`);
    console.log("  ✓ Dropped job_applications_old");
    
    await c.query("COMMIT");
    console.log("  ✓ job_applications migration complete");
  } catch (e) {
    await c.query("ROLLBACK");
    console.log("  ✗ Failed:", e.message.split("\n")[0]);
  }
  
  c.release();
  await pool.end();
  process.exit(0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
