#!/usr/bin/env npx tsx
// Standalone DB migration script — creates all tables required by the Drizzle schema.
// Idempotent (uses CREATE TABLE IF NOT EXISTS).
//
// Usage:
//   DATABASE_URL="postgresql://..." npx tsx scripts/migrate-db-standalone.ts
//
// Or with .env auto-loaded:
//   npx tsx scripts/migrate-db-standalone.ts
//
// Run this once against your production Postgres (Supabase / Neon / etc.)
// before starting the app for the first time.

import { Pool } from "pg";
import { config as loadEnv } from "dotenv";
import path from "path";

loadEnv({ path: path.resolve(process.cwd(), ".env") });

const SCHEMA_SQL = `
-- Pages
CREATE TABLE IF NOT EXISTS "pages" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "content" text DEFAULT '',
  "blocks" text DEFAULT '[]',
  "is_published" boolean DEFAULT false,
  "meta_title" text,
  "meta_description" text,
  "canonical_url" text,
  "og_image_url" text,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");

-- CMS Media
CREATE TABLE IF NOT EXISTS "cms_media" (
  "id" text PRIMARY KEY,
  "filename" text NOT NULL,
  "url" text NOT NULL,
  "mime_type" text NOT NULL,
  "size" integer DEFAULT 0,
  "alt_text" text,
  "folder" text DEFAULT '/',
  "uploaded_by" text,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "cms_media_folder_idx" ON "cms_media" ("folder");

-- CMS Blogs
CREATE TABLE IF NOT EXISTS "cms_blogs" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "excerpt" text DEFAULT '',
  "content" text DEFAULT '',
  "cover_image" text,
  "category" text DEFAULT 'General',
  "tags" text DEFAULT '[]',
  "author_id" text,
  "is_published" boolean DEFAULT false,
  "published_at" timestamptz,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "cms_blogs_slug_idx" ON "cms_blogs" ("slug");
CREATE INDEX IF NOT EXISTS "cms_blogs_category_idx" ON "cms_blogs" ("category");

-- CMS Backgrounds
CREATE TABLE IF NOT EXISTS "cms_backgrounds" (
  "id" text PRIMARY KEY,
  "section" text NOT NULL UNIQUE,
  "bg_type" text DEFAULT 'gradient',
  "gradient" text,
  "image_url" text,
  "video_desktop" text,
  "video_tablet" text,
  "video_mobile" text,
  "overlay_color" text,
  "overlay_opacity" integer DEFAULT 0,
  "overlay_blend_mode" text,
  "is_active" boolean DEFAULT true,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- CMS Nav Links
CREATE TABLE IF NOT EXISTS "cms_nav_links" (
  "id" text PRIMARY KEY,
  "label" text NOT NULL,
  "href" text NOT NULL,
  "is_page" boolean DEFAULT false,
  "mega" boolean DEFAULT false,
  "display_order" integer DEFAULT 0,
  "is_active" boolean DEFAULT true,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "cms_nav_links_display_order_idx" ON "cms_nav_links" ("display_order");

-- CMS Typography
CREATE TABLE IF NOT EXISTS "cms_typography" (
  "id" text PRIMARY KEY,
  "element" text NOT NULL UNIQUE,
  "font_family" text NOT NULL,
  "font_weight" text DEFAULT '400',
  "font_size" text,
  "line_height" text,
  "letter_spacing" text,
  "font_source" text DEFAULT 'system',
  "font_file_url" text,
  "font_file_format" text,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- CMS Font Presets
CREATE TABLE IF NOT EXISTS "cms_font_presets" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "description" text DEFAULT '',
  "config" text DEFAULT '{}',
  "is_builtin" boolean DEFAULT false,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- CMS Themes
CREATE TABLE IF NOT EXISTS "cms_themes" (
  "id" text PRIMARY KEY,
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
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- CMS Theme Presets
CREATE TABLE IF NOT EXISTS "cms_theme_presets" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "description" text DEFAULT '',
  "mode" text DEFAULT 'dark',
  "config" text DEFAULT '{}',
  "is_builtin" boolean DEFAULT false,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- Leads
CREATE TABLE IF NOT EXISTS "leads" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text DEFAULT '',
  "service_interest" text,
  "message" text DEFAULT '',
  "status" text DEFAULT 'New',
  "source_page" text,
  "source" text DEFAULT 'Contact Form',
  "notes" text DEFAULT '',
  "internal_notes" text DEFAULT '',
  "assigned_to" text,
  "deleted_at" timestamptz,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "leads_status_idx" ON "leads" ("status");
CREATE INDEX IF NOT EXISTS "leads_created_at_idx" ON "leads" ("created_at");
CREATE INDEX IF NOT EXISTS "leads_assigned_to_idx" ON "leads" ("assigned_to");

-- Admin Notifications
CREATE TABLE IF NOT EXISTS "admin_notifications" (
  "id" text PRIMARY KEY,
  "type" text DEFAULT 'info',
  "title" text NOT NULL,
  "message" text NOT NULL,
  "link" text,
  "read" boolean DEFAULT false,
  "user_id" text,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "admin_notifications_read_idx" ON "admin_notifications" ("read");
CREATE INDEX IF NOT EXISTS "admin_notifications_user_id_idx" ON "admin_notifications" ("user_id");

-- Email Templates
CREATE TABLE IF NOT EXISTS "email_templates" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "subject" text NOT NULL,
  "html_content" text NOT NULL,
  "text_content" text,
  "variables" text DEFAULT '[]',
  "category" text DEFAULT 'general',
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- Email Workflows
CREATE TABLE IF NOT EXISTS "email_workflows" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "description" text DEFAULT '',
  "trigger" text DEFAULT 'manual',
  "steps" text DEFAULT '[]',
  "is_active" boolean DEFAULT true,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- SMTP Logs
CREATE TABLE IF NOT EXISTS "smtp_logs" (
  "id" text PRIMARY KEY,
  "type" text DEFAULT 'dispatch',
  "to_email" text NOT NULL,
  "from_email" text,
  "subject" text,
  "template_id" text,
  "status" text DEFAULT 'sent',
  "error" text,
  "message_id" text,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "smtp_logs_created_at_idx" ON "smtp_logs" ("created_at");
CREATE INDEX IF NOT EXISTS "smtp_logs_status_idx" ON "smtp_logs" ("status");

-- SEO Page Meta
CREATE TABLE IF NOT EXISTS "seo_page_meta" (
  "id" text PRIMARY KEY,
  "path" text NOT NULL UNIQUE,
  "title" text,
  "description" text,
  "canonical_url" text,
  "og_image_url" text,
  "og_title" text,
  "og_description" text,
  "twitter_card" text DEFAULT 'summary_large_image',
  "keywords" text DEFAULT '[]',
  "noindex" boolean DEFAULT false,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "seo_page_meta_path_idx" ON "seo_page_meta" ("path");

-- SEO Sitemap Config
CREATE TABLE IF NOT EXISTS "seo_sitemap_config" (
  "id" text PRIMARY KEY,
  "base_url" text DEFAULT 'https://www.clicktaketech.com',
  "include_pages" boolean DEFAULT true,
  "include_services" boolean DEFAULT true,
  "include_blogs" boolean DEFAULT true,
  "include_portfolio" boolean DEFAULT true,
  "changefreq" text DEFAULT 'weekly',
  "priority" text DEFAULT '0.7',
  "updated_at" timestamptz DEFAULT now()
);

-- SEO Robots Config
CREATE TABLE IF NOT EXISTS "seo_robots_config" (
  "id" text PRIMARY KEY,
  "user_agent" text DEFAULT '*',
  "allow_all" boolean DEFAULT true,
  "disallow_paths" text DEFAULT '/admin,/api',
  "sitemap_url" text DEFAULT 'https://www.clicktaketech.com/sitemap.xml',
  "crawl_delay" integer,
  "updated_at" timestamptz DEFAULT now()
);

-- Team Members
CREATE TABLE IF NOT EXISTS "team_members" (
  "id" text PRIMARY KEY,
  "full_name" text NOT NULL,
  "role_title" text NOT NULL,
  "bio" text DEFAULT '',
  "linkedin_url" text,
  "github_url" text,
  "avatar_url" text,
  "display_order" integer DEFAULT 0,
  "is_active" boolean DEFAULT true,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "team_members_display_order_idx" ON "team_members" ("display_order");

-- Job Openings
CREATE TABLE IF NOT EXISTS "job_openings" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "department" text DEFAULT 'General',
  "location" text DEFAULT 'Remote',
  "type" text DEFAULT 'Full-time',
  "description" text DEFAULT '',
  "requirements" text DEFAULT '[]',
  "salary_range" text,
  "is_active" boolean DEFAULT true,
  "closing_date" timestamptz,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "job_openings_is_active_idx" ON "job_openings" ("is_active");

-- Job Applications
CREATE TABLE IF NOT EXISTS "job_applications" (
  "id" text PRIMARY KEY,
  "job_id" text NOT NULL,
  "full_name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "resume_url" text,
  "cover_letter" text,
  "status" text DEFAULT 'Submitted',
  "notes" text DEFAULT '',
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "job_applications_job_id_idx" ON "job_applications" ("job_id");
CREATE INDEX IF NOT EXISTS "job_applications_status_idx" ON "job_applications" ("status");

-- Portfolio Items
CREATE TABLE IF NOT EXISTS "portfolio_items" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "client" text DEFAULT '',
  "category" text DEFAULT 'Web Development',
  "industry" text DEFAULT '',
  "excerpt" text DEFAULT '',
  "description" text DEFAULT '',
  "cover_image" text,
  "gallery" text DEFAULT '[]',
  "results" text DEFAULT '[]',
  "technologies" text DEFAULT '[]',
  "live_url" text,
  "case_study_url" text,
  "is_featured" boolean DEFAULT false,
  "is_published" boolean DEFAULT true,
  "display_order" integer DEFAULT 0,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "portfolio_items_category_idx" ON "portfolio_items" ("category");
CREATE INDEX IF NOT EXISTS "portfolio_items_is_featured_idx" ON "portfolio_items" ("is_featured");

-- Testimonials
CREATE TABLE IF NOT EXISTS "testimonials" (
  "id" text PRIMARY KEY,
  "client_name" text NOT NULL,
  "client_title" text,
  "client_company" text,
  "avatar_url" text,
  "quote" text NOT NULL,
  "rating" integer DEFAULT 5,
  "service_id" text,
  "is_featured" boolean DEFAULT false,
  "is_published" boolean DEFAULT true,
  "display_order" integer DEFAULT 0,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "testimonials_is_published_idx" ON "testimonials" ("is_published");

-- Resources
CREATE TABLE IF NOT EXISTS "resources" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "type" text DEFAULT 'blog',
  "excerpt" text DEFAULT '',
  "content" text DEFAULT '',
  "cover_image" text,
  "file_url" text,
  "video_url" text,
  "category" text DEFAULT 'General',
  "tags" text DEFAULT '[]',
  "author_id" text,
  "status" text DEFAULT 'Upcoming',
  "is_published" boolean DEFAULT false,
  "published_at" timestamptz,
  "download_count" integer DEFAULT 0,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "resources_type_idx" ON "resources" ("type");
CREATE INDEX IF NOT EXISTS "resources_is_published_idx" ON "resources" ("is_published");

-- Admin Roles
CREATE TABLE IF NOT EXISTS "admin_roles" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "description" text DEFAULT '',
  "color" text DEFAULT '#136DFF',
  "is_system" boolean DEFAULT false,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- Role Permissions
CREATE TABLE IF NOT EXISTS "role_permissions" (
  "id" text PRIMARY KEY,
  "role_id" text NOT NULL,
  "permission_key" text NOT NULL,
  "allowed" boolean DEFAULT true
);
CREATE UNIQUE INDEX IF NOT EXISTS "role_permissions_role_id_permission_key_idx" ON "role_permissions" ("role_id", "permission_key");
CREATE INDEX IF NOT EXISTS "role_permissions_role_id_idx" ON "role_permissions" ("role_id");

-- Admin Users
CREATE TABLE IF NOT EXISTS "admin_users" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "password_hash" text NOT NULL,
  "full_name" text NOT NULL,
  "role_id" text,
  "status" text DEFAULT 'Active',
  "avatar_url" text,
  "last_login_at" timestamptz,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "admin_users_email_idx" ON "admin_users" ("email");

-- Security Settings
CREATE TABLE IF NOT EXISTS "security_settings" (
  "pk" text PRIMARY KEY,
  "key" text NOT NULL UNIQUE,
  "value" text NOT NULL,
  "updated_at" timestamptz DEFAULT now()
);

-- Security Logs
CREATE TABLE IF NOT EXISTS "security_logs" (
  "id" text PRIMARY KEY,
  "type" text DEFAULT 'info',
  "event" text NOT NULL,
  "user_id" text,
  "ip_address" text,
  "user_agent" text,
  "metadata" text DEFAULT '{}',
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "security_logs_event_idx" ON "security_logs" ("event");
CREATE INDEX IF NOT EXISTS "security_logs_created_at_idx" ON "security_logs" ("created_at");

-- Blocked IPs
CREATE TABLE IF NOT EXISTS "blocked_ips" (
  "id" text PRIMARY KEY,
  "ip_address" text NOT NULL UNIQUE,
  "reason" text DEFAULT '',
  "blocked_by" text,
  "expires_at" timestamptz,
  "created_at" timestamptz DEFAULT now()
);

-- Backups
CREATE TABLE IF NOT EXISTS "backups" (
  "id" text PRIMARY KEY,
  "filename" text NOT NULL,
  "size_bytes" integer NOT NULL,
  "status" text DEFAULT 'completed',
  "type" text DEFAULT 'manual',
  "created_by" text,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "backups_created_at_idx" ON "backups" ("created_at");

-- Page Views
CREATE TABLE IF NOT EXISTS "page_views" (
  "id" text PRIMARY KEY,
  "path" text NOT NULL,
  "referrer" text,
  "user_agent" text,
  "country" text,
  "city" text,
  "session_id" text,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "page_views_path_idx" ON "page_views" ("path");
CREATE INDEX IF NOT EXISTS "page_views_created_at_idx" ON "page_views" ("created_at");

-- Audit Logs
CREATE TABLE IF NOT EXISTS "audit_logs" (
  "id" text PRIMARY KEY,
  "user_id" text,
  "user_name" text,
  "action" text NOT NULL,
  "entity" text,
  "entity_id" text,
  "details" text DEFAULT '{}',
  "ip_address" text,
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "audit_logs_user_id_idx" ON "audit_logs" ("user_id");
CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs" ("action");
CREATE INDEX IF NOT EXISTS "audit_logs_created_at_idx" ON "audit_logs" ("created_at");

-- Site Settings
CREATE TABLE IF NOT EXISTS "site_settings" (
  "pk" text PRIMARY KEY,
  "key" text NOT NULL UNIQUE,
  "value" text NOT NULL,
  "updated_at" timestamptz DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS "services" (
  "id" text PRIMARY KEY,
  "slug" text NOT NULL UNIQUE,
  "category" text NOT NULL,
  "category_label" text,
  "title" text NOT NULL,
  "description" text DEFAULT '',
  "detailed_description" text DEFAULT '',
  "icon_name" text DEFAULT 'Sparkles',
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
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "services_category_idx" ON "services" ("category");
CREATE INDEX IF NOT EXISTS "services_display_order_idx" ON "services" ("display_order");

-- Generic Users (legacy)
CREATE TABLE IF NOT EXISTS "users" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "name" text,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- Posts (legacy)
CREATE TABLE IF NOT EXISTS "posts" (
  "id" text PRIMARY KEY,
  "title" text NOT NULL,
  "content" text,
  "published" boolean DEFAULT false,
  "author_id" text NOT NULL,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);

-- Provider Configs
CREATE TABLE IF NOT EXISTS "provider_configs" (
  "id" text PRIMARY KEY,
  "category" text NOT NULL,
  "provider_id" text NOT NULL,
  "display_name" text NOT NULL,
  "is_active" boolean DEFAULT false,
  "priority" integer DEFAULT 0,
  "credentials" text DEFAULT '{}',
  "config" text DEFAULT '{}',
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "provider_configs_category_provider_id_idx" ON "provider_configs" ("category", "provider_id");
CREATE INDEX IF NOT EXISTS "provider_configs_category_is_active_priority_idx" ON "provider_configs" ("category", "is_active", "priority");

-- Provider Health
CREATE TABLE IF NOT EXISTS "provider_health" (
  "id" text PRIMARY KEY,
  "provider_id" text NOT NULL UNIQUE,
  "category" text NOT NULL,
  "status" text DEFAULT 'healthy',
  "latency_ms" integer,
  "last_checked_at" timestamptz DEFAULT now(),
  "last_error" text,
  "error_count_5min" integer DEFAULT 0,
  "cooldown_until" timestamptz
);
CREATE INDEX IF NOT EXISTS "provider_health_category_status_idx" ON "provider_health" ("category", "status");

-- Provider Usage
CREATE TABLE IF NOT EXISTS "provider_usage" (
  "id" text PRIMARY KEY,
  "provider_id" text NOT NULL,
  "category" text NOT NULL,
  "metric" text NOT NULL,
  "value" bigint NOT NULL,
  "recorded_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "provider_usage_provider_id_metric_recorded_at_idx" ON "provider_usage" ("provider_id", "metric", "recorded_at");

-- Email Logs
CREATE TABLE IF NOT EXISTS "email_logs" (
  "id" text PRIMARY KEY,
  "message_id" text,
  "provider_id" text NOT NULL,
  "to_address" text NOT NULL,
  "subject" text NOT NULL,
  "status" text DEFAULT 'sent',
  "error_message" text,
  "metadata" text DEFAULT '{}',
  "sent_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "email_logs_provider_id_sent_at_idx" ON "email_logs" ("provider_id", "sent_at");
CREATE INDEX IF NOT EXISTS "email_logs_status_sent_at_idx" ON "email_logs" ("status", "sent_at");

-- Storage Objects
CREATE TABLE IF NOT EXISTS "storage_objects" (
  "id" text PRIMARY KEY,
  "key" text NOT NULL UNIQUE,
  "content_type" text NOT NULL,
  "size_bytes" bigint NOT NULL,
  "primary_provider" text NOT NULL,
  "replicated_to" text DEFAULT '[]',
  "uploaded_by" text,
  "metadata" text DEFAULT '{}',
  "created_at" timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "storage_objects_primary_provider_idx" ON "storage_objects" ("primary_provider");
`;

async function main() {
  const connectionString =
    process.env.DATABASE_URL || process.env.DIRECT_URL || "";
  if (!connectionString) {
    console.error("ERROR: DATABASE_URL env var not set.");
    console.error("Set it inline or in .env, then re-run.");
    process.exit(1);
  }

  console.log("Connecting to:", connectionString.replace(/:[^:@]+@/, ":****@"));
  const pool = new Pool({ connectionString, max: 1 });
  const startedAt = Date.now();
  const warnings: string[] = [];

  try {
    const client = await pool.connect();
    try {
      const statements = SCHEMA_SQL
        .split(/;\s*\n/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith("--"));

      console.log(`Running ${statements.length} statements...`);
      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        try {
          await client.query(stmt + ";");
          if (i % 10 === 0) process.stdout.write(`  ${i}/${statements.length}\r`);
        } catch (err: any) {
          if (!/already exists|duplicate/i.test(err.message)) {
            warnings.push(`WARN: ${err.message}`);
          }
        }
      }
      console.log(`  ${statements.length}/${statements.length} done ✓`);
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }

  console.log(`\nMigration complete in ${Date.now() - startedAt}ms.`);
  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) console.log("  " + w);
  } else {
    console.log("No warnings — all tables ensured cleanly.");
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
