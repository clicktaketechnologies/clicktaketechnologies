-- Drop and recreate admin_users, admin_roles, role_permissions to match the
-- new Drizzle schema (text/cuid ids, password_hash NOT NULL, name NOT NULL on roles).
-- Backed up existing admin emails before running.
-- Run via: psql "$DATABASE_URL" -f scripts/migrate-admin-tables.sql

BEGIN;

-- Drop dependent foreign keys + tables in correct order
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS admin_roles CASCADE;

-- Recreate admin_roles matching src/lib/schema.ts
CREATE TABLE admin_roles (
  id text PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text DEFAULT '',
  color text DEFAULT '#136DFF',
  is_system boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Recreate role_permissions
CREATE TABLE role_permissions (
  id text PRIMARY KEY,
  role_id text NOT NULL REFERENCES admin_roles(id) ON DELETE CASCADE,
  permission_key text NOT NULL,
  allowed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
CREATE UNIQUE INDEX role_permissions_role_id_permission_key_idx
  ON role_permissions(role_id, permission_key);
CREATE INDEX role_permissions_role_id_idx ON role_permissions(role_id);

-- Recreate admin_users matching src/lib/schema.ts
CREATE TABLE admin_users (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role_id text REFERENCES admin_roles(id) ON DELETE SET NULL,
  status text DEFAULT 'Active',
  avatar_url text,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX admin_users_email_idx ON admin_users(email);

COMMIT;

-- Verify
SELECT 'admin_roles' AS t, count(*) FROM admin_roles
UNION ALL SELECT 'role_permissions', count(*) FROM role_permissions
UNION ALL SELECT 'admin_users', count(*) FROM admin_users;
