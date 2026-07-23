// ─────────────────────────────────────────────────────────────────────────────
// Drizzle ORM schema — mirrors the prior Prisma schema (Postgres).
// Tables, columns, and defaults are 1:1 with the previous prisma/schema.prisma.
// All `@map` table names and `@map` column names from Prisma are preserved
// so existing DB rows keep working without migration.
// ─────────────────────────────────────────────────────────────────────────────

import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  bigint,
  uniqueIndex,
  index,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Helper: cuid-style id, mirrors Prisma's `@default(cuid())`.
const cuid = () => createId();

// ─── Pages ──────────────────────────────────────────────────────────────────
export const pages = pgTable(
  "pages",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").default(""),
    blocks: text("blocks").default("[]"),
    isPublished: boolean("is_published").default(false),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    canonicalUrl: text("canonical_url"),
    ogImageUrl: text("og_image_url"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("pages_slug_idx").on(t.slug)]
);

// ─── CMS Media ──────────────────────────────────────────────────────────────
export const cmsMedia = pgTable(
  "cms_media",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    filename: text("filename").notNull(),
    url: text("url").notNull(),
    mimeType: text("mime_type").notNull(),
    size: integer("size").default(0),
    altText: text("alt_text"),
    folder: text("folder").default("/"),
    uploadedBy: text("uploaded_by"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("cms_media_folder_idx").on(t.folder)]
);

// ─── CMS Blog ───────────────────────────────────────────────────────────────
export const cmsBlogs = pgTable(
  "cms_blogs",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").default(""),
    content: text("content").default(""),
    coverImage: text("cover_image"),
    category: text("category").default("General"),
    tags: text("tags").default("[]"),
    authorId: text("author_id"),
    isPublished: boolean("is_published").default(false),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("cms_blogs_slug_idx").on(t.slug),
    index("cms_blogs_category_idx").on(t.category),
  ]
);

// ─── CMS Background ─────────────────────────────────────────────────────────
export const cmsBackgrounds = pgTable("cms_backgrounds", {
  id: text("id").primaryKey().$defaultFn(cuid),
  section: text("section").notNull().unique(),
  bgType: text("bg_type").default("gradient"),
  gradient: text("gradient"),
  imageUrl: text("image_url"),
  videoDesktop: text("video_desktop"),
  videoTablet: text("video_tablet"),
  videoMobile: text("video_mobile"),
  overlayColor: text("overlay_color"),
  overlayOpacity: integer("overlay_opacity").default(0),
  overlayBlendMode: text("overlay_blend_mode"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── CMS Nav Links ──────────────────────────────────────────────────────────
export const cmsNavLinks = pgTable(
  "cms_nav_links",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    label: text("label").notNull(),
    href: text("href").notNull(),
    isPage: boolean("is_page").default(false),
    mega: boolean("mega").default(false),
    displayOrder: integer("display_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("cms_nav_links_display_order_idx").on(t.displayOrder)]
);

// ─── CMS Typography ─────────────────────────────────────────────────────────
export const cmsTypography = pgTable("cms_typography", {
  id: text("id").primaryKey().$defaultFn(cuid),
  element: text("element").notNull().unique(),
  fontFamily: text("font_family").notNull(),
  fontWeight: text("font_weight").default("400"),
  fontSize: text("font_size"),
  lineHeight: text("line_height"),
  letterSpacing: text("letter_spacing"),
  fontSource: text("font_source").default("system"),
  fontFileUrl: text("font_file_url"),
  fontFileFormat: text("font_file_format"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── CMS Font Presets ───────────────────────────────────────────────────────
export const cmsFontPresets = pgTable("cms_font_presets", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull().unique(),
  description: text("description").default(""),
  config: text("config").default("{}"),
  isBuiltin: boolean("is_builtin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── CMS Themes ─────────────────────────────────────────────────────────────
export const cmsThemes = pgTable("cms_themes", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull().unique(),
  mode: text("mode").default("dark"),
  primary: text("primary").default("#136DFF"),
  accent: text("accent").default("#FF53A9"),
  background: text("background"),
  foreground: text("foreground"),
  muted: text("muted"),
  border: text("border"),
  card: text("card"),
  config: text("config").default("{}"),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── CMS Theme Presets ──────────────────────────────────────────────────────
export const cmsThemePresets = pgTable("cms_theme_presets", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull().unique(),
  description: text("description").default(""),
  mode: text("mode").default("dark"),
  config: text("config").default("{}"),
  isBuiltin: boolean("is_builtin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Leads ──────────────────────────────────────────────────────────────────
export const leads = pgTable(
  "leads",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").default(""),
    serviceInterest: text("service_interest"),
    message: text("message").default(""),
    status: text("status").default("New"),
    sourcePage: text("source_page"),
    source: text("source").default("Contact Form"),
    notes: text("notes").default(""),
    internalNotes: text("internal_notes").default(""),
    assignedTo: text("assigned_to"),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("leads_status_idx").on(t.status),
    index("leads_created_at_idx").on(t.createdAt),
    index("leads_assigned_to_idx").on(t.assignedTo),
  ]
);

// ─── Admin Notifications ────────────────────────────────────────────────────
export const adminNotifications = pgTable(
  "admin_notifications",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    type: text("type").default("info"),
    title: text("title").notNull(),
    message: text("message").notNull(),
    link: text("link"),
    read: boolean("read").default(false),
    userId: text("user_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("admin_notifications_read_idx").on(t.read),
    index("admin_notifications_user_id_idx").on(t.userId),
  ]
);

// ─── Email Templates ────────────────────────────────────────────────────────
export const emailTemplates = pgTable("email_templates", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull().unique(),
  subject: text("subject").notNull(),
  htmlContent: text("html_content").notNull(),
  textContent: text("text_content"),
  variables: text("variables").default("[]"),
  category: text("category").default("general"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Email Workflows ────────────────────────────────────────────────────────
export const emailWorkflows = pgTable("email_workflows", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull().unique(),
  description: text("description").default(""),
  trigger: text("trigger").default("manual"),
  steps: text("steps").default("[]"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── SMTP Logs ──────────────────────────────────────────────────────────────
export const smtpLogs = pgTable(
  "smtp_logs",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    type: text("type").default("dispatch"),
    toEmail: text("to_email").notNull(),
    fromEmail: text("from_email"),
    subject: text("subject"),
    templateId: text("template_id"),
    status: text("status").default("sent"),
    error: text("error"),
    messageId: text("message_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("smtp_logs_created_at_idx").on(t.createdAt),
    index("smtp_logs_status_idx").on(t.status),
  ]
);

// ─── SEO Page Meta ──────────────────────────────────────────────────────────
export const seoPageMeta = pgTable(
  "seo_page_meta",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    path: text("path").notNull().unique(),
    title: text("title"),
    description: text("description"),
    canonicalUrl: text("canonical_url"),
    ogImageUrl: text("og_image_url"),
    ogTitle: text("og_title"),
    ogDescription: text("og_description"),
    twitterCard: text("twitter_card").default("summary_large_image"),
    keywords: text("keywords").default("[]"),
    noindex: boolean("noindex").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("seo_page_meta_path_idx").on(t.path)]
);

// ─── SEO Sitemap Config ─────────────────────────────────────────────────────
export const seoSitemapConfig = pgTable("seo_sitemap_config", {
  id: text("id").primaryKey().$defaultFn(cuid),
  baseUrl: text("base_url").default("https://clicktaketech.com"),
  includePages: boolean("include_pages").default(true),
  includeServices: boolean("include_services").default(true),
  includeBlogs: boolean("include_blogs").default(true),
  includePortfolio: boolean("include_portfolio").default(true),
  changefreq: text("changefreq").default("weekly"),
  priority: text("priority").default("0.7"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── SEO Robots Config ──────────────────────────────────────────────────────
export const seoRobotsConfig = pgTable("seo_robots_config", {
  id: text("id").primaryKey().$defaultFn(cuid),
  userAgent: text("user_agent").default("*"),
  allowAll: boolean("allow_all").default(true),
  disallowPaths: text("disallow_paths").default("/admin,/api"),
  sitemapUrl: text("sitemap_url").default("https://clicktaketech.com/sitemap.xml"),
  crawlDelay: integer("crawl_delay"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Team Members ───────────────────────────────────────────────────────────
export const teamMembers = pgTable(
  "team_members",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    fullName: text("full_name").notNull(),
    roleTitle: text("role_title").notNull(),
    bio: text("bio").default(""),
    linkedinUrl: text("linkedin_url"),
    githubUrl: text("github_url"),
    avatarUrl: text("avatar_url"),
    displayOrder: integer("display_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("team_members_display_order_idx").on(t.displayOrder)]
);

// ─── Job Openings ───────────────────────────────────────────────────────────
export const jobOpenings = pgTable(
  "job_openings",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    title: text("title").notNull(),
    department: text("department").default("General"),
    location: text("location").default("Remote"),
    type: text("type").default("Full-time"),
    description: text("description").default(""),
    requirements: text("requirements").default("[]"),
    salaryRange: text("salary_range"),
    isActive: boolean("is_active").default(true),
    closingDate: timestamp("closing_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("job_openings_is_active_idx").on(t.isActive)]
);

// ─── Job Applications ───────────────────────────────────────────────────────
export const jobApplications = pgTable(
  "job_applications",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    jobId: text("job_id").notNull(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    resumeUrl: text("resume_url"),
    coverLetter: text("cover_letter"),
    status: text("status").default("Submitted"),
    notes: text("notes").default(""),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("job_applications_job_id_idx").on(t.jobId),
    index("job_applications_status_idx").on(t.status),
  ]
);

// ─── Portfolio Items ────────────────────────────────────────────────────────
export const portfolioItems = pgTable(
  "portfolio_items",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    client: text("client").default(""),
    category: text("category").default("Web Development"),
    industry: text("industry").default(""),
    excerpt: text("excerpt").default(""),
    description: text("description").default(""),
    coverImage: text("cover_image"),
    gallery: text("gallery").default("[]"),
    results: text("results").default("[]"),
    technologies: text("technologies").default("[]"),
    liveUrl: text("live_url"),
    caseStudyUrl: text("case_study_url"),
    isFeatured: boolean("is_featured").default(false),
    isPublished: boolean("is_published").default(true),
    displayOrder: integer("display_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("portfolio_items_category_idx").on(t.category),
    index("portfolio_items_is_featured_idx").on(t.isFeatured),
  ]
);

// ─── Testimonials ───────────────────────────────────────────────────────────
export const testimonials = pgTable(
  "testimonials",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    clientName: text("client_name").notNull(),
    clientTitle: text("client_title"),
    clientCompany: text("client_company"),
    avatarUrl: text("avatar_url"),
    quote: text("quote").notNull(),
    rating: integer("rating").default(5),
    serviceId: text("service_id"),
    isFeatured: boolean("is_featured").default(false),
    isPublished: boolean("is_published").default(true),
    displayOrder: integer("display_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("testimonials_is_published_idx").on(t.isPublished)]
);

// ─── Resources ──────────────────────────────────────────────────────────────
export const resources = pgTable(
  "resources",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    type: text("type").default("blog"),
    excerpt: text("excerpt").default(""),
    content: text("content").default(""),
    coverImage: text("cover_image"),
    fileUrl: text("file_url"),
    videoUrl: text("video_url"),
    category: text("category").default("General"),
    tags: text("tags").default("[]"),
    authorId: text("author_id"),
    status: text("status").default("Upcoming"),
    isPublished: boolean("is_published").default(false),
    publishedAt: timestamp("published_at"),
    downloadCount: integer("download_count").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("resources_type_idx").on(t.type),
    index("resources_is_published_idx").on(t.isPublished),
  ]
);

// ─── Admin Roles ────────────────────────────────────────────────────────────
export const adminRoles = pgTable("admin_roles", {
  id: text("id").primaryKey().$defaultFn(cuid),
  name: text("name").notNull().unique(),
  description: text("description").default(""),
  color: text("color").default("#136DFF"),
  isSystem: boolean("is_system").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Role Permissions ───────────────────────────────────────────────────────
export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    roleId: text("role_id").notNull(),
    permissionKey: text("permission_key").notNull(),
    allowed: boolean("allowed").default(true),
  },
  (t) => [
    uniqueIndex("role_permissions_role_id_permission_key_idx").on(
      t.roleId,
      t.permissionKey
    ),
    index("role_permissions_role_id_idx").on(t.roleId),
  ]
);

// ─── Admin Users ────────────────────────────────────────────────────────────
export const adminUsers = pgTable(
  "admin_users",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    fullName: text("full_name").notNull(),
    roleId: text("role_id"),
    status: text("status").default("Active"),
    avatarUrl: text("avatar_url"),
    lastLoginAt: timestamp("last_login_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [index("admin_users_email_idx").on(t.email)]
);

// ─── Security Settings ──────────────────────────────────────────────────────
export const securitySettings = pgTable("security_settings", {
  id: text("pk").primaryKey().$defaultFn(cuid),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Security Logs ──────────────────────────────────────────────────────────
export const securityLogs = pgTable(
  "security_logs",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    type: text("type").default("info"),
    event: text("event").notNull(),
    userId: text("user_id"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    metadata: text("metadata").default("{}"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("security_logs_event_idx").on(t.event),
    index("security_logs_created_at_idx").on(t.createdAt),
  ]
);

// ─── Blocked IPs ────────────────────────────────────────────────────────────
export const blockedIps = pgTable("blocked_ips", {
  id: text("id").primaryKey().$defaultFn(cuid),
  ipAddress: text("ip_address").notNull().unique(),
  reason: text("reason").default(""),
  blockedBy: text("blocked_by"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Backups ────────────────────────────────────────────────────────────────
export const backups = pgTable(
  "backups",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    filename: text("filename").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    status: text("status").default("completed"),
    type: text("type").default("manual"),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("backups_created_at_idx").on(t.createdAt)]
);

// ─── Page Views ─────────────────────────────────────────────────────────────
export const pageViews = pgTable(
  "page_views",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    path: text("path").notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    country: text("country"),
    city: text("city"),
    sessionId: text("session_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("page_views_path_idx").on(t.path),
    index("page_views_created_at_idx").on(t.createdAt),
  ]
);

// ─── Audit Logs ─────────────────────────────────────────────────────────────
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    userId: text("user_id"),
    userName: text("user_name"),
    action: text("action").notNull(),
    entity: text("entity"),
    entityId: text("entity_id"),
    details: text("details").default("{}"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("audit_logs_user_id_idx").on(t.userId),
    index("audit_logs_action_idx").on(t.action),
    index("audit_logs_created_at_idx").on(t.createdAt),
  ]
);

// ─── Site Settings ──────────────────────────────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  id: text("pk").primaryKey().$defaultFn(cuid),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Services ───────────────────────────────────────────────────────────────
export const services = pgTable(
  "services",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull(),
    categoryLabel: text("category_label"),
    title: text("title").notNull(),
    description: text("description").default(""),
    detailedDescription: text("detailed_description").default(""),
    iconName: text("icon_name").default("Sparkles"),
    imageUrl: text("image_url"),
    gradient: text("gradient"),
    glow: text("glow"),
    eyebrow: text("eyebrow"),
    items: text("items").default("[]"),
    results: text("results").default("[]"),
    differentiators: text("differentiators").default("[]"),
    deliverables: text("deliverables").default("[]"),
    faq: text("faq").default("[]"),
    processSteps: text("process_steps").default("[]"),
    pricingPackages: text("pricing_packages").default("[]"),
    displayOrder: integer("display_order").default(0),
    isPublished: boolean("is_published").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    index("services_category_idx").on(t.category),
    index("services_display_order_idx").on(t.displayOrder),
  ]
);

// ─── Generic Users (legacy) ─────────────────────────────────────────────────
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(cuid),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Posts (legacy) ─────────────────────────────────────────────────────────
export const posts = pgTable("posts", {
  id: text("id").primaryKey().$defaultFn(cuid),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").default(false),
  authorId: text("author_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Provider Configs ───────────────────────────────────────────────────────
export const providerConfigs = pgTable(
  "provider_configs",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    category: text("category").notNull(),
    providerId: text("provider_id").notNull(),
    displayName: text("display_name").notNull(),
    isActive: boolean("is_active").default(false),
    priority: integer("priority").default(0),
    credentials: text("credentials").default("{}"),
    config: text("config").default("{}"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [
    uniqueIndex("provider_configs_category_provider_id_idx").on(
      t.category,
      t.providerId
    ),
    index("provider_configs_category_is_active_priority_idx").on(
      t.category,
      t.isActive,
      t.priority
    ),
  ]
);

// ─── Provider Health ────────────────────────────────────────────────────────
export const providerHealth = pgTable(
  "provider_health",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    providerId: text("provider_id").notNull().unique(),
    category: text("category").notNull(),
    status: text("status").default("healthy"),
    latencyMs: integer("latency_ms"),
    lastCheckedAt: timestamp("last_checked_at").defaultNow(),
    lastError: text("last_error"),
    errorCount5min: integer("error_count_5min").default(0),
    cooldownUntil: timestamp("cooldown_until"),
  },
  (t) => [index("provider_health_category_status_idx").on(t.category, t.status)]
);

// ─── Provider Usage ─────────────────────────────────────────────────────────
export const providerUsage = pgTable(
  "provider_usage",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    providerId: text("provider_id").notNull(),
    category: text("category").notNull(),
    metric: text("metric").notNull(),
    value: bigint("value", { mode: "number" }).notNull(),
    recordedAt: timestamp("recorded_at").defaultNow(),
  },
  (t) => [
    index("provider_usage_provider_id_metric_recorded_at_idx").on(
      t.providerId,
      t.metric,
      t.recordedAt
    ),
  ]
);

// ─── Email Logs ─────────────────────────────────────────────────────────────
export const emailLogs = pgTable(
  "email_logs",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    messageId: text("message_id"),
    providerId: text("provider_id").notNull(),
    toAddress: text("to_address").notNull(),
    subject: text("subject").notNull(),
    status: text("status").default("sent"),
    errorMessage: text("error_message"),
    metadata: text("metadata").default("{}"),
    sentAt: timestamp("sent_at").defaultNow(),
  },
  (t) => [
    index("email_logs_provider_id_sent_at_idx").on(t.providerId, t.sentAt),
    index("email_logs_status_sent_at_idx").on(t.status, t.sentAt),
  ]
);

// ─── Storage Objects ────────────────────────────────────────────────────────
export const storageObjects = pgTable(
  "storage_objects",
  {
    id: text("id").primaryKey().$defaultFn(cuid),
    key: text("key").notNull().unique(),
    contentType: text("content_type").notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
    primaryProvider: text("primary_provider").notNull(),
    replicatedTo: text("replicated_to").default("[]"),
    uploadedBy: text("uploaded_by"),
    metadata: text("metadata").default("{}"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("storage_objects_primary_provider_idx").on(t.primaryProvider)]
);

// ─── Drizzle relations ──────────────────────────────────────────────────────
// Used by the shim to resolve `include` clauses.
import { relations } from "drizzle-orm";

export const adminUsersRelations = relations(adminUsers, ({ one }) => ({
  role: one(adminRoles, {
    fields: [adminUsers.roleId],
    references: [adminRoles.id],
  }),
}));

export const adminRolesRelations = relations(adminRoles, ({ many }) => ({
  users: many(adminUsers),
  permissions: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(adminRoles, {
    fields: [rolePermissions.roleId],
    references: [adminRoles.id],
  }),
}));

export const jobOpeningsRelations = relations(jobOpenings, ({ many }) => ({
  applications: many(jobApplications),
}));

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobOpenings, {
    fields: [jobApplications.jobId],
    references: [jobOpenings.id],
  }),
}));

// ─── Schema export ──────────────────────────────────────────────────────────
export const schema = {
  pages,
  cmsMedia,
  cmsBlogs,
  cmsBackgrounds,
  cmsNavLinks,
  cmsTypography,
  cmsFontPresets,
  cmsThemes,
  cmsThemePresets,
  leads,
  adminNotifications,
  emailTemplates,
  emailWorkflows,
  smtpLogs,
  seoPageMeta,
  seoSitemapConfig,
  seoRobotsConfig,
  teamMembers,
  jobOpenings,
  jobApplications,
  portfolioItems,
  testimonials,
  resources,
  adminRoles,
  rolePermissions,
  adminUsers,
  securitySettings,
  securityLogs,
  blockedIps,
  backups,
  pageViews,
  auditLogs,
  siteSettings,
  services,
  users,
  posts,
  providerConfigs,
  providerHealth,
  providerUsage,
  emailLogs,
  storageObjects,
  adminUsersRelations,
  adminRolesRelations,
  rolePermissionsRelations,
  jobOpeningsRelations,
  jobApplicationsRelations,
};
