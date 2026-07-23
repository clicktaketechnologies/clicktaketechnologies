// Migrate remaining tables: email_logs, seo_sitemap_config, seo_robots_config, cms_typography
// Plus check/create: provider_configs, provider_health, provider_usage, storage_objects (may not exist)
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

async function migrateTable(client: any, tableName: string, newSchema: string, dataMap?: string) {
  // Check if table exists
  const exists = await client.query(`SELECT to_regclass('public.${tableName}') as exists`);
  if (!exists.rows[0].exists) {
    console.log(`  ✓ Table ${tableName} doesn't exist — creating empty`);
    await client.query(newSchema);
    return;
  }
  
  // Check if already migrated (has expected new columns)
  // Simple heuristic: check the id column type
  const idType = await client.query(`
    SELECT data_type FROM information_schema.columns 
    WHERE table_name = $1 AND column_name = 'id'
  `, [tableName]);
  
  if (idType.rows[0]?.data_type === 'text') {
    console.log(`  ✓ ${tableName} already migrated`);
    return;
  }
  
  console.log(`  Migrating ${tableName}...`);
  
  // Drop FKs that reference this table
  const fks = await client.query(`
    SELECT tc.table_name, tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.constraint_column_usage ccu 
      ON tc.constraint_name = ccu.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY' 
      AND ccu.table_name = $1
  `, [tableName]);
  
  for (const fk of fks.rows) {
    try {
      await client.query(`ALTER TABLE ${fk.table_name} DROP CONSTRAINT IF EXISTS ${fk.constraint_name} CASCADE`);
    } catch (e) {}
  }
  
  await client.query(`ALTER TABLE ${tableName} RENAME TO ${tableName}_old`);
  await client.query(newSchema);
  
  if (dataMap) {
    try {
      await client.query(dataMap);
      const cnt = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
      console.log(`    ✓ Migrated ${cnt.rows[0].count} rows`);
    } catch (e: any) {
      console.log(`    ⚠ Data migration failed: ${e.message.split("\n")[0]}`);
    }
  }
  
  await client.query(`DROP TABLE ${tableName}_old CASCADE`);
  console.log(`    ✓ Dropped ${tableName}_old`);
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  
  // email_logs
  console.log("=== email_logs ===");
  await migrateTable(client, "email_logs", `
    CREATE TABLE email_logs (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "message_id" text,
      "provider_id" text NOT NULL DEFAULT '',
      "to_address" text NOT NULL,
      "subject" text NOT NULL DEFAULT '',
      "status" text DEFAULT 'sent',
      "error_message" text,
      "metadata" text DEFAULT '{}',
      "sent_at" timestamp DEFAULT NOW()
    )
  `, `
    INSERT INTO email_logs (id, message_id, provider_id, to_address, subject, status, error_message, metadata, sent_at)
    SELECT 
      id::text,
      NULL,
      COALESCE(template_id::text, ''),
      to_email,
      COALESCE(subject, ''),
      COALESCE(status, 'sent'),
      error_message,
      '{}',
      sent_at
    FROM email_logs_old
  `);
  try { await client.query("CREATE INDEX email_logs_provider_id_sent_at_idx ON email_logs (provider_id, sent_at)"); } catch {}
  try { await client.query("CREATE INDEX email_logs_status_sent_at_idx ON email_logs (status, sent_at)"); } catch {}
  
  // seo_sitemap_config
  console.log("\n=== seo_sitemap_config ===");
  await migrateTable(client, "seo_sitemap_config", `
    CREATE TABLE seo_sitemap_config (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "base_url" text DEFAULT 'https://www.clicktaketech.com',
      "include_pages" boolean DEFAULT true,
      "include_services" boolean DEFAULT true,
      "include_blogs" boolean DEFAULT true,
      "include_portfolio" boolean DEFAULT true,
      "changefreq" text DEFAULT 'weekly',
      "priority" text DEFAULT '0.7',
      "updated_at" timestamp DEFAULT NOW()
    )
  `, `
    INSERT INTO seo_sitemap_config (id, base_url, include_pages, include_services, include_blogs, include_portfolio, changefreq, priority, updated_at)
    SELECT 
      id::text,
      'https://www.clicktaketech.com',
      true, true, true, true,
      'weekly', '0.7',
      updated_at
    FROM seo_sitemap_config_old
  `);
  
  // seo_robots_config
  console.log("\n=== seo_robots_config ===");
  await migrateTable(client, "seo_robots_config", `
    CREATE TABLE seo_robots_config (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "user_agent" text DEFAULT '*',
      "allow_all" boolean DEFAULT true,
      "disallow_paths" text DEFAULT '/admin,/api',
      "sitemap_url" text DEFAULT 'https://www.clicktaketech.com/sitemap.xml',
      "crawl_delay" integer,
      "updated_at" timestamp DEFAULT NOW()
    )
  `, `
    INSERT INTO seo_robots_config (id, user_agent, allow_all, disallow_paths, sitemap_url, crawl_delay, updated_at)
    SELECT 
      id::text,
      '*', true, '/admin,/api',
      'https://www.clicktaketech.com/sitemap.xml',
      NULL,
      updated_at
    FROM seo_robots_config_old
  `);
  
  // cms_typography — Drizzle expects: element, font_family, font_weight, font_size, line_height, letter_spacing, font_source, font_file_url, font_file_format
  console.log("\n=== cms_typography ===");
  await migrateTable(client, "cms_typography", `
    CREATE TABLE cms_typography (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "element" text NOT NULL UNIQUE,
      "font_family" text NOT NULL,
      "font_weight" text DEFAULT '400',
      "font_size" text,
      "line_height" text,
      "letter_spacing" text,
      "font_source" text DEFAULT 'system',
      "font_file_url" text,
      "font_file_format" text,
      "created_at" timestamp DEFAULT NOW(),
      "updated_at" timestamp DEFAULT NOW()
    )
  `, `
    INSERT INTO cms_typography (id, element, font_family, font_weight, font_size, line_height, letter_spacing, font_source, font_file_url, font_file_format, created_at, updated_at)
    SELECT 
      id::text,
      element,
      font_family,
      COALESCE(font_weight, '400'),
      NULL,
      COALESCE(line_height::text, NULL),
      letter_spacing,
      COALESCE(font_source, 'system'),
      font_file_url,
      font_file_format,
      created_at,
      updated_at
    FROM cms_typography_old
  `);
  
  // provider_configs — may not exist
  console.log("\n=== provider_configs ===");
  await migrateTable(client, "provider_configs", `
    CREATE TABLE provider_configs (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "category" text NOT NULL,
      "provider_id" text NOT NULL,
      "display_name" text NOT NULL,
      "is_active" boolean DEFAULT false,
      "priority" integer DEFAULT 0,
      "credentials" text DEFAULT '{}',
      "config" text DEFAULT '{}',
      "created_at" timestamp DEFAULT NOW(),
      "updated_at" timestamp DEFAULT NOW()
    )
  `);
  try { await client.query("CREATE UNIQUE INDEX provider_configs_category_provider_id_idx ON provider_configs (category, provider_id)"); } catch {}
  try { await client.query("CREATE INDEX provider_configs_category_is_active_priority_idx ON provider_configs (category, is_active, priority)"); } catch {}
  
  // provider_health
  console.log("\n=== provider_health ===");
  await migrateTable(client, "provider_health", `
    CREATE TABLE provider_health (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "provider_id" text NOT NULL UNIQUE,
      "category" text NOT NULL,
      "status" text DEFAULT 'healthy',
      "latency_ms" integer,
      "last_checked_at" timestamp DEFAULT NOW(),
      "last_error" text,
      "error_count_5min" integer DEFAULT 0,
      "cooldown_until" timestamp
    )
  `);
  try { await client.query("CREATE INDEX provider_health_category_status_idx ON provider_health (category, status)"); } catch {}
  
  // provider_usage
  console.log("\n=== provider_usage ===");
  await migrateTable(client, "provider_usage", `
    CREATE TABLE provider_usage (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "provider_id" text NOT NULL,
      "category" text NOT NULL,
      "metric" text NOT NULL,
      "value" bigint NOT NULL DEFAULT 0,
      "recorded_at" timestamp DEFAULT NOW()
    )
  `);
  try { await client.query("CREATE INDEX provider_usage_provider_id_metric_recorded_at_idx ON provider_usage (provider_id, metric, recorded_at)"); } catch {}
  
  // storage_objects
  console.log("\n=== storage_objects ===");
  await migrateTable(client, "storage_objects", `
    CREATE TABLE storage_objects (
      "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text,
      "key" text NOT NULL UNIQUE,
      "content_type" text NOT NULL,
      "size_bytes" bigint NOT NULL DEFAULT 0,
      "primary_provider" text NOT NULL DEFAULT '',
      "replicated_to" text DEFAULT '[]',
      "uploaded_by" text,
      "metadata" text DEFAULT '{}',
      "created_at" timestamp DEFAULT NOW()
    )
  `);
  try { await client.query("CREATE INDEX storage_objects_primary_provider_idx ON storage_objects (primary_provider)"); } catch {}
  
  client.release();
  await pool.end();
  process.exit(0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
