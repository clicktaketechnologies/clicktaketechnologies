// Migrate services + email_templates — these failed earlier due to FK deps
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  
  // Check if services still has old schema
  const servicesCols = await client.query(`
    SELECT data_type FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'id'
  `);
  
  if (servicesCols.rows[0]?.data_type === 'uuid') {
    console.log("=== Migrating services ===");
    
    // Find FKs that depend on services
    const fks = await client.query(`
      SELECT tc.table_name, tc.constraint_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.constraint_column_usage ccu 
        ON tc.constraint_name = ccu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY' 
        AND ccu.table_name = 'services'
    `);
    console.log(`  Found ${fks.rows.length} FKs depending on services — dropping them`);
    for (const fk of fks.rows) {
      try {
        await client.query(`ALTER TABLE ${fk.table_name} DROP CONSTRAINT ${fk.constraint_name} CASCADE`);
        console.log(`    ✓ Dropped ${fk.constraint_name} on ${fk.table_name}`);
      } catch (e) {
        console.log(`    ⚠ ${fk.constraint_name}: ${e.message.split("\n")[0]}`);
      }
    }
    
    await client.query("BEGIN");
    try {
      // Rename
      await client.query(`ALTER TABLE services RENAME TO services_old`);
      
      // Create new schema
      await client.query(`
        CREATE TABLE services (
          "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "slug" text NOT NULL UNIQUE,
          "category" text,
          "category_label" text,
          "title" text NOT NULL,
          "description" text DEFAULT '',
          "detailed_description" text,
          "icon_name" text,
          "image_url" text,
          "gradient" text,
          "glow" text,
          "eyebrow" text,
          "items" text DEFAULT '[]',
          "results" text DEFAULT '[]',
          "differentiators" text DEFAULT '[]',
          "deliverables" text DEFAULT '[]',
          "faq" text DEFAULT '[]',
          "process_steps" text DEFAULT '[]',
          "pricing_packages" text DEFAULT '[]',
          "display_order" integer DEFAULT 0,
          "is_published" boolean DEFAULT true,
          "created_at" timestamp DEFAULT NOW(),
          "updated_at" timestamp DEFAULT NOW()
        )
      `);
      console.log("  ✓ Created new services table");
      
      // Migrate data
      await client.query(`
        INSERT INTO services (id, slug, category, category_label, title, description, detailed_description, icon_name, image_url, gradient, glow, eyebrow, items, results, differentiators, deliverables, faq, process_steps, pricing_packages, display_order, is_published, created_at, updated_at)
        SELECT 
          id::text,
          slug,
          category,
          category_label,
          COALESCE(title, name),
          description,
          detailed_description,
          COALESCE(icon_name, icon_url),
          image_url,
          gradient,
          glow,
          eyebrow,
          COALESCE(items::text, '[]'),
          COALESCE(results::text, '[]'),
          COALESCE(differentiators::text, '[]'),
          COALESCE(deliverables::text, '[]'),
          '[]',
          '[]',
          '[]',
          COALESCE(display_order, 0),
          COALESCE(is_published, is_active, true),
          created_at,
          COALESCE(updated_at, created_at)
        FROM services_old
      `);
      const cnt = await client.query("SELECT COUNT(*) FROM services");
      console.log(`  ✓ Migrated ${cnt.rows[0].count} rows`);
      
      // Drop old
      await client.query(`DROP TABLE services_old CASCADE`);
      console.log("  ✓ Dropped services_old");
      
      // Recreate indexes
      await client.query("CREATE INDEX services_slug_idx ON services (slug)");
      await client.query("CREATE INDEX services_category_idx ON services (category)");
      await client.query("CREATE INDEX services_is_published_idx ON services (is_published)");
      
      await client.query("COMMIT");
      console.log("  ✓ services migration complete");
    } catch (e) {
      await client.query("ROLLBACK");
      console.log("  ✗ Failed:", e.message.split("\n")[0]);
    }
  } else {
    console.log("✓ services already migrated");
  }
  
  // email_templates
  const etCols = await client.query(`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'email_templates' AND column_name = 'html_content'
  `);
  
  if (etCols.rows.length === 0) {
    console.log("\n=== Migrating email_templates ===");
    
    // Find FKs
    const fks = await client.query(`
      SELECT tc.table_name, tc.constraint_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.constraint_column_usage ccu 
        ON tc.constraint_name = ccu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY' 
        AND ccu.table_name = 'email_templates'
    `);
    console.log(`  Found ${fks.rows.length} FKs depending on email_templates`);
    for (const fk of fks.rows) {
      try {
        await client.query(`ALTER TABLE ${fk.table_name} DROP CONSTRAINT ${fk.constraint_name} CASCADE`);
        console.log(`    ✓ Dropped ${fk.constraint_name}`);
      } catch (e) {
        console.log(`    ⚠ ${fk.constraint_name}: ${e.message.split("\n")[0]}`);
      }
    }
    
    await client.query("BEGIN");
    try {
      await client.query(`ALTER TABLE email_templates RENAME TO email_templates_old`);
      
      await client.query(`
        CREATE TABLE email_templates (
          "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "name" text NOT NULL UNIQUE,
          "subject" text NOT NULL,
          "html_content" text NOT NULL,
          "text_content" text,
          "variables" text DEFAULT '[]',
          "category" text DEFAULT 'general',
          "created_at" timestamp DEFAULT NOW(),
          "updated_at" timestamp DEFAULT NOW()
        )
      `);
      console.log("  ✓ Created new email_templates table");
      
      await client.query(`
        INSERT INTO email_templates (id, name, subject, html_content, text_content, variables, category, created_at, updated_at)
        SELECT 
          id::text,
          name,
          subject,
          COALESCE(body_html, body, ''),
          COALESCE(body_text, ''),
          COALESCE(variables::text, '[]'),
          'general',
          created_at,
          COALESCE(updated_at, created_at)
        FROM email_templates_old
      `);
      const cnt = await client.query("SELECT COUNT(*) FROM email_templates");
      console.log(`  ✓ Migrated ${cnt.rows[0].count} rows`);
      
      await client.query(`DROP TABLE email_templates_old CASCADE`);
      console.log("  ✓ Dropped email_templates_old");
      
      await client.query("COMMIT");
      console.log("  ✓ email_templates migration complete");
    } catch (e) {
      await client.query("ROLLBACK");
      console.log("  ✗ Failed:", e.message.split("\n")[0]);
    }
  } else {
    console.log("✓ email_templates already migrated");
  }
  
  client.release();
  await pool.end();
  process.exit(0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
