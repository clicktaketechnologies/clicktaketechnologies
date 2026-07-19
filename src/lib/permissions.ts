// ─────────────────────────────────────────────────────────────────────────────
// Permission catalog — single source of truth for RBAC.
// Mirrors the original route.tsx ROUTE_PERMISSIONS map.
// ─────────────────────────────────────────────────────────────────────────────

export type Permission =
  | "manageRBAC" // super-admin: roles, users, security
  | "readCMS" // view CMS pages, media, services, themes, typography
  | "writeCMS" // create/update/delete CMS pages, media, services
  | "readLeads" // view CRM leads + email
  | "writeLeads" // update leads, send email
  | "manageSettings" // site settings, brand config
  | "viewDashboard" // access /admin dashboard
  | string;

export const ALL_PERMISSIONS: { key: Permission; label: string; description: string }[] = [
  { key: "viewDashboard", label: "View Dashboard", description: "Access the admin dashboard overview" },
  { key: "readCMS", label: "Read CMS", description: "View pages, services, media, themes, typography" },
  { key: "writeCMS", label: "Write CMS", description: "Create, update, delete CMS content" },
  { key: "readLeads", label: "Read Leads", description: "View CRM leads and email center" },
  { key: "writeLeads", label: "Write Leads", description: "Update leads, change status, send email" },
  { key: "manageRBAC", label: "Manage RBAC", description: "Manage roles, users, permissions, security" },
  { key: "manageSettings", label: "Manage Settings", description: "Configure site settings and brand" },
];

export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/admin": "viewDashboard",
  "/admin/cms": "readCMS",
  "/admin/services": "readCMS",
  "/admin/team-careers": "readCMS",
  "/admin/typography": "readCMS",
  "/admin/theme": "readCMS",
  "/admin/crm": "readLeads",
  "/admin/roles": "manageRBAC",
  "/admin/email": "readLeads",
  "/admin/seo": "readCMS",
  "/admin/settings": "manageSettings",
  "/admin/security": "manageRBAC",
};

export function permissionLabel(key: string): string {
  return ALL_PERMISSIONS.find((p) => p.key === key)?.label || key;
}

// ─── Built-in system roles (seeded on first run) ────────────────────────────

export const SYSTEM_ROLES = [
  {
    name: "Super Admin",
    description: "Full access to everything",
    color: "#FF53A9",
    permissions: ALL_PERMISSIONS.map((p) => p.key),
  },
  {
    name: "Editor",
    description: "Manage CMS content, services, team",
    color: "#136DFF",
    permissions: ["viewDashboard", "readCMS", "writeCMS", "readLeads"],
  },
  {
    name: "Sales Support",
    description: "Manage leads and email",
    color: "#10B981",
    permissions: ["viewDashboard", "readLeads", "writeLeads"],
  },
];
