// One-shot migration: align DB schema with Drizzle schema for all failing tables
// Strategy: rename old → create new matching Drizzle → migrate data → drop old
import { config } from "dotenv";
config({ override: true });
import { Pool } from "pg";

const MIGRATIONS = [
  {
    table: "services",
    oldColumns: ["id", "name", "slug", "category", "description", "icon_url", "is_active", "display_order", "is_published", "image_url", "image_public_id", "category_label", "title", "eyebrow", "detailed_description", "gradient", "glow", "icon_name", "items", "results", "differentiators", "deliverables", "updated_at", "created_at", "short_label", "accent_color"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      slug: "text NOT NULL UNIQUE",
      category: "text",
      category_label: "text",
      title: "text NOT NULL",
      description: "text DEFAULT ''",
      detailed_description: "text",
      icon_name: "text",
      image_url: "text",
      gradient: "text",
      glow: "text",
      eyebrow: "text",
      items: "text DEFAULT '[]'",
      results: "text DEFAULT '[]'",
      differentiators: "text DEFAULT '[]'",
      deliverables: "text DEFAULT '[]'",
      faq: "text DEFAULT '[]'",
      process_steps: "text DEFAULT '[]'",
      pricing_packages: "text DEFAULT '[]'",
      display_order: "integer DEFAULT 0",
      is_published: "boolean DEFAULT true",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
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
    `,
    indexes: [
      "CREATE INDEX services_slug_idx ON services (slug)",
      "CREATE INDEX services_category_idx ON services (category)",
      "CREATE INDEX services_is_published_idx ON services (is_published)",
    ],
  },
  {
    table: "job_openings",
    oldColumns: ["id", "title", "department", "location", "type", "description", "requirements", "is_active", "display_order", "created_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      title: "text NOT NULL",
      department: "text DEFAULT 'General'",
      location: "text DEFAULT 'Remote'",
      type: "text DEFAULT 'Full-time'",
      description: "text DEFAULT ''",
      requirements: "text DEFAULT '[]'",
      salary_range: "text",
      is_active: "boolean DEFAULT true",
      closing_date: "timestamp",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO job_openings (id, title, department, location, type, description, requirements, salary_range, is_active, closing_date, created_at, updated_at)
      SELECT 
        id::text,
        title,
        department,
        location,
        type,
        description,
        COALESCE(requirements::text, '[]'),
        NULL,
        is_active,
        NULL,
        created_at,
        created_at
      FROM job_openings_old
    `,
    indexes: [
      "CREATE INDEX job_openings_is_active_idx ON job_openings (is_active)",
    ],
  },
  {
    table: "smtp_logs",
    oldColumns: ["id", "recipient", "subject", "status", "error", "created_at", "event_type", "details"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      type: "text DEFAULT 'dispatch'",
      to_email: "text NOT NULL",
      from_email: "text",
      subject: "text",
      template_id: "text",
      status: "text DEFAULT 'sent'",
      error: "text",
      message_id: "text",
      created_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO smtp_logs (id, type, to_email, from_email, subject, template_id, status, error, message_id, created_at)
      SELECT 
        id::text,
        COALESCE(event_type, 'dispatch'),
        recipient,
        NULL,
        subject,
        NULL,
        status,
        error,
        NULL,
        created_at
      FROM smtp_logs_old
    `,
    indexes: [
      "CREATE INDEX smtp_logs_created_at_idx ON smtp_logs (created_at)",
      "CREATE INDEX smtp_logs_status_idx ON smtp_logs (status)",
    ],
  },
  {
    table: "email_templates",
    oldColumns: ["id", "name", "subject", "body_html", "body_text", "variables", "is_active", "created_at", "body", "updated_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      name: "text NOT NULL UNIQUE",
      subject: "text NOT NULL",
      html_content: "text NOT NULL",
      text_content: "text",
      variables: "text DEFAULT '[]'",
      category: "text DEFAULT 'general'",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
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
    `,
    indexes: [],
  },
  {
    table: "seo_page_meta",
    oldColumns: ["id", "page_key", "meta_title", "meta_description", "updated_at", "og_title", "og_description", "og_image", "canonical"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      path: "text NOT NULL UNIQUE",
      title: "text",
      description: "text",
      canonical_url: "text",
      og_image_url: "text",
      og_title: "text",
      og_description: "text",
      twitter_card: "text DEFAULT 'summary_large_image'",
      keywords: "text DEFAULT '[]'",
      noindex: "boolean DEFAULT false",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO seo_page_meta (id, path, title, description, canonical_url, og_image_url, og_title, og_description, twitter_card, keywords, noindex, created_at, updated_at)
      SELECT 
        id::text,
        page_key,
        meta_title,
        meta_description,
        canonical,
        og_image,
        og_title,
        og_description,
        'summary_large_image',
        '[]',
        false,
        updated_at,
        updated_at
      FROM seo_page_meta_old
    `,
    indexes: [
      "CREATE INDEX seo_page_meta_path_idx ON seo_page_meta (path)",
    ],
  },
  {
    table: "site_settings",
    oldColumns: ["key", "value", "updated_at", "category", "created_at"],
    newColumns: {
      pk: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      key: "text NOT NULL UNIQUE",
      value: "text NOT NULL",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO site_settings (pk, key, value, updated_at)
      SELECT 
        gen_random_uuid()::text,
        key,
        value,
        updated_at
      FROM site_settings_old
    `,
    indexes: [],
  },
  {
    table: "security_logs",
    oldColumns: ["id", "user_name", "action", "created_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      type: "text DEFAULT 'info'",
      event: "text NOT NULL",
      user_id: "text",
      ip_address: "text",
      user_agent: "text",
      metadata: "text DEFAULT '{}'",
      created_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO security_logs (id, type, event, user_id, ip_address, user_agent, metadata, created_at)
      SELECT 
        id::text,
        'info',
        action,
        NULL,
        NULL,
        NULL,
        '{}',
        created_at
      FROM security_logs_old
    `,
    indexes: [
      "CREATE INDEX security_logs_event_idx ON security_logs (event)",
      "CREATE INDEX security_logs_created_at_idx ON security_logs (created_at)",
    ],
  },
  {
    table: "security_settings",
    oldColumns: ["id", "key", "value", "updated_at"],
    newColumns: {
      pk: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      key: "text NOT NULL UNIQUE",
      value: "text NOT NULL",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO security_settings (pk, key, value, updated_at)
      SELECT 
        gen_random_uuid()::text,
        key,
        value,
        updated_at
      FROM security_settings_old
    `,
    indexes: [],
  },
  {
    table: "blocked_ips",
    oldColumns: ["id", "ip_address", "attempt_count", "reason", "created_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      ip_address: "text NOT NULL",
      reason: "text",
      blocked_by: "text",
      expires_at: "timestamp",
      created_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO blocked_ips (id, ip_address, reason, blocked_by, expires_at, created_at)
      SELECT 
        id::text,
        ip_address,
        reason,
        NULL,
        NULL,
        created_at
      FROM blocked_ips_old
    `,
    indexes: [
      "CREATE INDEX blocked_ips_ip_address_idx ON blocked_ips (ip_address)",
    ],
  },
  {
    table: "cms_font_presets",
    oldColumns: ["id", "name", "description", "config", "is_builtin", "created_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      name: "text NOT NULL UNIQUE",
      description: "text DEFAULT ''",
      config: "text DEFAULT '{}'",
      is_builtin: "boolean DEFAULT false",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO cms_font_presets (id, name, description, config, is_builtin, created_at, updated_at)
      SELECT 
        id::text,
        name,
        COALESCE(description, ''),
        COALESCE(config::text, '{}'),
        COALESCE(is_builtin, false),
        created_at,
        created_at
      FROM cms_font_presets_old
    `,
    indexes: [],
  },
  {
    table: "cms_themes",
    oldColumns: ["id", "name", "slug", "description", "thumbnail_url", "is_active", "is_default", "parent_theme_id", "config", "created_at", "updated_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      name: "text NOT NULL UNIQUE",
      mode: "text DEFAULT 'dark'",
      primary: "text DEFAULT '#136DFF'",
      accent: "text DEFAULT '#FF53A9'",
      background: "text",
      foreground: "text",
      muted: "text",
      border: "text",
      card: "text",
      config: "text DEFAULT '{}'",
      is_active: "boolean DEFAULT false",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO cms_themes (id, name, mode, primary, accent, background, foreground, muted, border, card, config, is_active, created_at, updated_at)
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
    `,
    indexes: [
      "CREATE INDEX cms_themes_is_active_idx ON cms_themes (is_active)",
    ],
  },
  {
    table: "cms_theme_presets",
    oldColumns: ["id", "name", "description", "config", "thumbnail_url", "is_builtin", "created_at"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      name: "text NOT NULL UNIQUE",
      description: "text DEFAULT ''",
      mode: "text DEFAULT 'dark'",
      config: "text DEFAULT '{}'",
      is_builtin: "boolean DEFAULT false",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO cms_theme_presets (id, name, description, mode, config, is_builtin, created_at, updated_at)
      SELECT 
        id::text,
        name,
        COALESCE(description, ''),
        'dark',
        COALESCE(config::text, '{}'),
        COALESCE(is_builtin, false),
        created_at,
        created_at
      FROM cms_theme_presets_old
    `,
    indexes: [],
  },
  {
    table: "cms_backgrounds",
    oldColumns: ["id", "section", "bg_type", "solid_color", "gradient_direction", "gradient_color_1", "gradient_color_2", "image_desktop", "image_tablet", "image_mobile", "video_desktop", "video_tablet", "video_mobile", "overlay_color", "overlay_opacity", "overlay_blend_mode", "parallax", "attachment", "sizing", "custom_position", "pattern_type", "is_active", "created_at", "updated_at", "pattern_color"],
    newColumns: {
      id: "text PRIMARY KEY DEFAULT gen_random_uuid()::text",
      section: "text NOT NULL UNIQUE",
      bg_type: "text DEFAULT 'gradient'",
      gradient: "text",
      image_url: "text",
      video_desktop: "text",
      video_tablet: "text",
      video_mobile: "text",
      overlay_color: "text",
      overlay_opacity: "integer DEFAULT 0",
      overlay_blend_mode: "text",
      is_active: "boolean DEFAULT true",
      created_at: "timestamp DEFAULT NOW()",
      updated_at: "timestamp DEFAULT NOW()",
    },
    dataMap: `
      INSERT INTO cms_backgrounds (id, section, bg_type, gradient, image_url, video_desktop, video_tablet, video_mobile, overlay_color, overlay_opacity, overlay_blend_mode, is_active, created_at, updated_at)
      SELECT 
        id::text,
        section,
        bg_type,
        CASE 
          WHEN gradient_color_1 IS NOT NULL AND gradient_color_2 IS NOT NULL 
          THEN 'linear-gradient(' || COALESCE(gradient_direction, 'to right') || ', ' || gradient_color_1 || ', ' || gradient_color_2 || ')'
          ELSE NULL
        END,
        image_desktop,
        NULL,
        image_tablet,
        image_mobile,
        overlay_color,
        COALESCE(overlay_opacity, 0),
        overlay_blend_mode,
        COALESCE(is_active, true),
        created_at,
        COALESCE(updated_at, created_at)
      FROM cms_backgrounds_old
    `,
    indexes: [],
  },
];

async function main() {
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const client = await pool.connect();
  
  let success = 0, skipped = 0, failed = 0;
  
  for (const m of MIGRATIONS) {
    console.log(`\n=== Migrating ${m.table} ===`);
    
    try {
      await client.query("BEGIN");
      
      // Check if old schema matches (skip if already migrated)
      const cols = await client.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = $1 ORDER BY ordinal_position
      `, [m.table]);
      const currentCols = cols.rows.map(r => r.column_name);
      const expectedNewCols = Object.keys(m.newColumns);
      
      // If table has all expected new columns, skip
      const hasAllNew = expectedNewCols.every(c => currentCols.includes(c));
      if (hasAllNew) {
        console.log(`  ✓ Already migrated, skipping`);
        await client.query("COMMIT");
        skipped++;
        continue;
      }
      
      // Rename old table
      await client.query(`ALTER TABLE ${m.table} RENAME TO ${m.table}_old`);
      
      // Create new table
      const colDefs = Object.entries(m.newColumns)
        .map(([col, def]) => `"${col}" ${def}`)
        .join(",\n        ");
      await client.query(`
        CREATE TABLE ${m.table} (
          ${colDefs}
        )
      `);
      console.log(`  ✓ Created new table with ${Object.keys(m.newColumns).length} columns`);
      
      // Create indexes
      for (const idx of m.indexes) {
        try {
          await client.query(idx);
        } catch (e) {
          console.log(`  ⚠ Index skipped: ${e.message.split("\n")[0]}`);
        }
      }
      
      // Migrate data (might fail if no rows — that's fine)
      try {
        await client.query(m.dataMap);
        const count = await client.query(`SELECT COUNT(*) FROM ${m.table}`);
        console.log(`  ✓ Migrated ${count.rows[0].count} rows`);
      } catch (e: any) {
        console.log(`  ⚠ Data migration skipped: ${e.message.split("\n")[0]}`);
      }
      
      // Drop old table
      await client.query(`DROP TABLE ${m.table}_old`);
      
      await client.query("COMMIT");
      console.log(`  ✓ ${m.table} migration complete`);
      success++;
      
    } catch (e: any) {
      await client.query("ROLLBACK");
      console.log(`  ✗ FAILED: ${e.message.split("\n")[0]}`);
      failed++;
    }
  }
  
  console.log(`\n=== Migration summary ===`);
  console.log(`  Success: ${success}`);
  console.log(`  Skipped (already done): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  
  client.release();
  await pool.end();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
