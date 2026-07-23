-- Migrate audit_logs table to match Drizzle schema
-- 
-- The existing audit_logs table has columns from an OLD Prisma schema:
--   admin_id (uuid), action (text), target_type (text), target_id (text),
--   created_at (timestamptz), old_data (jsonb), new_data (jsonb),
--   ip_address (text), table_name (text), record_id (uuid), changed_by (text)
--
-- The new Drizzle schema expects:
--   id (text), user_id (text), user_name (text), action (text),
--   entity (text), entity_id (text), details (text json string),
--   ip_address (text), created_at (timestamp)
--
-- Strategy:
-- 1. Rename existing table to audit_logs_old
-- 2. Create new table matching Drizzle schema
-- 3. Migrate data with column mapping:
--    admin_id  -> user_id (cast uuid to text)
--    changed_by-> user_name
--    action    -> action (keep)
--    target_type -> entity
--    target_id -> entity_id
--    old_data/new_data -> details (merge as JSON string)
--    ip_address -> ip_address (keep)
--    created_at -> created_at (keep)
-- 4. Drop old table

BEGIN;

ALTER TABLE audit_logs RENAME TO audit_logs_old;

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
);

CREATE INDEX audit_logs_user_id_idx ON audit_logs (user_id);
CREATE INDEX audit_logs_action_idx ON audit_logs (action);
CREATE INDEX audit_logs_created_at_idx ON audit_logs (created_at);

-- Migrate data
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
FROM audit_logs_old;

DROP TABLE audit_logs_old;

COMMIT;

-- Verify
SELECT 'audit_logs after migration:' as status, COUNT(*) as row_count FROM audit_logs;
