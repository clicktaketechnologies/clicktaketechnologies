"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Trash2, X, Mail, Phone, Clock,
  FileSpreadsheet, CheckCircle2, Loader2, Save, MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceInterest: string | null;
  message: string;
  status: string;
  source: string;
  sourcePage: string | null;
  notes: string;
  internalNotes: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  leads: Lead[];
  statusCounts: Record<string, number>;
  statuses: string[];
  canWrite: boolean;
};

const STATUS_COLORS: Record<string, string> = {
  New: "#136DFF",
  Contacted: "#FF53A9",
  Qualified: "#10B981",
  Proposal: "#F59E0B",
  Converted: "#8B5CF6",
  Closed: "#6B7280",
};

export function CrmClient({ leads, statusCounts, statuses, canWrite }: Props) {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Lead | null>(null);

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          !search ||
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.email.toLowerCase().includes(search.toLowerCase()) ||
          (l.serviceInterest || "").toLowerCase().includes(search.toLowerCase())
      ),
    [leads, search]
  );

  const byStatus = useMemo(() => {
    const map: Record<string, Lead[]> = {};
    for (const s of statuses) map[s] = [];
    for (const l of filtered) {
      if (!map[l.status]) map[l.status] = [];
      map[l.status].push(l);
    }
    return map;
  }, [filtered, statuses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead CRM</h1>
          <p className="text-sm text-muted-foreground">
            {leads.length} total leads · {statusCounts.New || 0} new · {statusCounts.Converted || 0} converted
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
          <button
            onClick={() => setView("kanban")}
            className={`rounded-md px-3 py-1 text-xs ${view === "kanban" ? "bg-brand-blue text-white" : "text-muted-foreground"}`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("table")}
            className={`rounded-md px-3 py-1 text-xs ${view === "table" ? "bg-brand-blue text-white" : "text-muted-foreground"}`}
          >
            Table
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads by name, email, service..."
          className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue"
        />
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {statuses.map((status) => {
            const color = STATUS_COLORS[status] || "#6B7280";
            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs font-semibold uppercase tracking-wider">{status}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{byStatus[status]?.length || 0}</span>
                </div>
                <div className="space-y-2">
                  {(byStatus[status] || []).map((l) => (
                    <motion.div
                      key={l.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={() => setEditing(l)}
                        className="w-full rounded-lg border border-border/60 bg-card p-3 text-left hover:border-brand-blue/40 hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: color }}>
                            {l.name[0]?.toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-xs font-medium">{l.name}</div>
                            <div className="truncate text-[10px] text-muted-foreground">{l.email}</div>
                          </div>
                        </div>
                        {l.serviceInterest && (
                          <div className="mt-2 truncate text-[10px] text-muted-foreground">
                            {l.serviceInterest}
                          </div>
                        )}
                        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{new Date(l.createdAt).toLocaleDateString()}</span>
                          <span>{l.source}</span>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                  {canWrite && (
                    <select
                      onChange={async (e) => {
                        const target = e.target.value;
                        if (!target) return;
                        // Move first lead in this column to next status (quick action)
                        e.target.value = "";
                      }}
                      defaultValue=""
                      className="w-full rounded-md border border-dashed border-border/40 bg-transparent px-2 py-1 text-[10px] text-muted-foreground"
                    >
                      <option value="">+ Quick add</option>
                      <option value="new">New lead form...</option>
                    </select>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{l.serviceInterest || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: (STATUS_COLORS[l.status] || "#6B7280") + "20", color: STATUS_COLORS[l.status] || "#6B7280" }}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{l.source}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(l)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <MessageSquare className="size-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <AnimatePresence>
        {editing && (
          <LeadDrawer
            lead={editing}
            statuses={statuses}
            canWrite={canWrite}
            onClose={() => setEditing(null)}
            onSaved={() => { setEditing(null); window.location.reload(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LeadDrawer({
  lead,
  statuses,
  canWrite,
  onClose,
  onSaved,
}: {
  lead: Lead;
  statuses: string[];
  canWrite: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [internalNotes, setInternalNotes] = useState(lead.internalNotes);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes, internalNotes }),
      });
      if (res.ok) {
        toast.success("Lead updated");
        onSaved();
      } else toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lead details</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase text-muted-foreground">Name</div>
            <div className="text-sm font-medium">{lead.name}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs uppercase text-muted-foreground">Email</div>
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm text-brand-blue hover:underline">
                <Mail className="size-3" /> {lead.email}
              </a>
            </div>
            {lead.phone && (
              <div>
                <div className="text-xs uppercase text-muted-foreground">Phone</div>
                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm text-brand-blue hover:underline">
                  <Phone className="size-3" /> {lead.phone}
                </a>
              </div>
            )}
          </div>
          {lead.serviceInterest && (
            <div>
              <div className="text-xs uppercase text-muted-foreground">Service interest</div>
              <div className="text-sm">{lead.serviceInterest}</div>
            </div>
          )}
          {lead.message && (
            <div>
              <div className="text-xs uppercase text-muted-foreground">Message</div>
              <div className="rounded-lg border border-border/60 bg-background/40 p-3 text-sm">{lead.message}</div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <Clock className="mr-1 inline size-3" />
              Created {new Date(lead.createdAt).toLocaleString()}
            </div>
            <div>Source: {lead.source}</div>
          </div>

          {canWrite && (
            <>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        status === s ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                      style={status === s ? { backgroundColor: STATUS_COLORS[s] || "#6B7280" } : {}}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Notes (visible to lead)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Internal notes</label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this lead?")) return;
                    const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
                    if (res.ok) { toast.success("Lead deleted"); onSaved(); }
                  }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="size-4" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
