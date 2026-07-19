"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Users,
  Plus,
  Trash2,
  Edit3,
  Search,
  X,
  Mail,
  Lock,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type User = {
  id: string;
  email: string;
  fullName: string;
  status: string;
  roleName: string | null;
  roleId: string | null;
  avatarUrl: string | null;
  lastLoginAt: string | null;
  createdAt: string;
};

type Role = {
  id: string;
  name: string;
  description: string;
  color: string;
  isSystem: boolean;
  userCount: number;
  permissions: string[];
};

type Permission = { key: string; label: string; description: string };

type Props = {
  users: User[];
  roles: Role[];
  availablePermissions: Permission[];
  currentUser: { id: string; roleName?: string };
};

export function RbacClient({ users, roles, availablePermissions, currentUser }: Props) {
  const [tab, setTab] = useState<"users" | "roles">("users");
  const [search, setSearch] = useState("");
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [creatingRole, setCreatingRole] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Roles (RBAC)</h1>
        <p className="text-sm text-muted-foreground">
          Manage admin users, roles, and granular permissions.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex w-fit rounded-lg border border-border/60 bg-card/40 p-1">
        <button
          onClick={() => setTab("users")}
          className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm transition-colors ${
            tab === "users" ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="size-4" />
          Users ({users.length})
        </button>
        <button
          onClick={() => setTab("roles")}
          className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm transition-colors ${
            tab === "roles" ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Shield className="size-4" />
          Roles ({roles.length})
        </button>
      </div>

      {tab === "users" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <button
              onClick={() => setCreatingUser(true)}
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
            >
              <Plus className="size-4" />
              Add User
            </button>
          </div>

          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last login</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-semibold text-brand-blue">
                          {u.fullName[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{u.fullName}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {u.roleName ? (
                        <span
                          className="rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: (roles.find((r) => r.name === u.roleName)?.color || "#136DFF") + "20",
                            color: roles.find((r) => r.name === u.roleName)?.color || "#136DFF",
                          }}
                        >
                          {u.roleName}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">No role</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          u.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : "Never"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.id !== currentUser.id && (
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete ${u.fullName}?`)) return;
                            const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
                            if (res.ok) {
                              toast.success("User deleted");
                              window.location.reload();
                            } else {
                              toast.error("Failed to delete");
                            }
                          }}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                          title="Delete user"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === "roles" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setCreatingRole(true)}
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
            >
              <Plus className="size-4" />
              Create Role
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((r) => (
              <Card key={r.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: r.color }}
                    >
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{r.name}</h3>
                      <p className="text-xs text-muted-foreground">{r.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingRole(r)}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Edit3 className="size-3.5" />
                    </button>
                    {!r.isSystem && (
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete role "${r.name}"?`)) return;
                          const res = await fetch(`/api/admin/roles/${r.id}`, { method: "DELETE" });
                          if (res.ok) {
                            toast.success("Role deleted");
                            window.location.reload();
                          } else {
                            const data = await res.json();
                            toast.error(data.error || "Failed");
                          }
                        }}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  {r.userCount} {r.userCount === 1 ? "user" : "users"}
                  {r.isSystem && (
                    <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                      System
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {r.permissions.length === 0 ? (
                    <span className="text-xs text-muted-foreground">No permissions</span>
                  ) : (
                    r.permissions.map((p) => {
                      const perm = availablePermissions.find((ap) => ap.key === p);
                      return (
                        <span
                          key={p}
                          className="rounded-md bg-brand-blue/10 px-2 py-0.5 text-[10px] text-brand-blue"
                          title={perm?.description}
                        >
                          {perm?.label || p}
                        </span>
                      );
                    })
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Role editor modal */}
      <AnimatePresence>
        {(editingRole || creatingRole) && (
          <RoleEditorModal
            role={editingRole}
            availablePermissions={availablePermissions}
            onClose={() => {
              setEditingRole(null);
              setCreatingRole(false);
            }}
            onSaved={() => {
              setEditingRole(null);
              setCreatingRole(false);
              window.location.reload();
            }}
          />
        )}
      </AnimatePresence>

      {/* User creator modal */}
      <AnimatePresence>
        {creatingUser && (
          <UserCreatorModal
            roles={roles}
            onClose={() => setCreatingUser(false)}
            onSaved={() => {
              setCreatingUser(false);
              window.location.reload();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RoleEditorModal({
  role,
  availablePermissions,
  onClose,
  onSaved,
}: {
  role: Role | null;
  availablePermissions: Permission[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [color, setColor] = useState(role?.color || "#136DFF");
  const [permissions, setPermissions] = useState<string[]>(role?.permissions || []);
  const [saving, setSaving] = useState(false);

  const togglePerm = (key: string) => {
    setPermissions((p) => (p.includes(key) ? p.filter((x) => x !== key) : [...p, key]));
  };

  const handleSave = async () => {
    if (!name) return toast.error("Name is required");
    setSaving(true);
    try {
      const url = role ? `/api/admin/roles/${role.id}` : "/api/admin/roles";
      const method = role ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, color, permissions }),
      });
      if (res.ok) {
        toast.success(role ? "Role updated" : "Role created");
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{role ? "Edit role" : "Create role"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={role?.isSystem}
              className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Color</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-10 rounded border border-border/60"
              />
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Permissions</label>
            <div className="mt-2 space-y-2">
              {availablePermissions.map((p) => (
                <label
                  key={p.key}
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-border/40 p-2.5 hover:bg-muted/30"
                >
                  <input
                    type="checkbox"
                    checked={permissions.includes(p.key)}
                    onChange={() => togglePerm(p.key)}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="text-sm font-medium">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : role ? "Save changes" : "Create role"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function UserCreatorModal({
  roles,
  onClose,
  onSaved,
}: {
  roles: Role[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(roles[0]?.id || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!fullName || !email || !password) return toast.error("All fields required");
    if (password.length < 8) return toast.error("Password must be 8+ characters");
    setSaving(true);
    try {
      const role = roles.find((r) => r.id === roleId);
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, roleName: role?.name }),
      });
      if (res.ok) {
        toast.success("User created");
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add new user</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password (min 8 chars)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Role</label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create user"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
