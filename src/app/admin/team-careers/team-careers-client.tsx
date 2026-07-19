"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Users, Plus, Trash2, Edit3, X, Save, Loader2, Mail, MapPin, FileText, Github, Linkedin, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type Member = { id: string; fullName: string; roleTitle: string; bio: string; linkedinUrl: string | null; githubUrl: string | null; avatarUrl: string | null; displayOrder: number; isActive: boolean };
type Job = { id: string; title: string; department: string; location: string; type: string; description: string; requirements: string[]; salaryRange: string | null; isActive: boolean; closingDate: string | null };
type Applicant = { id: string; jobId: string; jobTitle: string; fullName: string; email: string; phone: string | null; status: string; createdAt: string };

type Props = { team: Member[]; jobs: Job[]; applicants: Applicant[]; canWrite: boolean };

export function TeamCareersClient({ team, jobs, applicants, canWrite }: Props) {
  const [tab, setTab] = useState<"team" | "jobs" | "applicants">("team");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [creatingMember, setCreatingMember] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [creatingJob, setCreatingJob] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team & Careers</h1>
        <p className="text-sm text-muted-foreground">Manage team profiles, job openings, and applicant pipeline.</p>
      </div>

      <div className="flex w-fit rounded-lg border border-border/60 bg-card/40 p-1">
        {[
          { id: "team", label: `Team (${team.length})`, icon: Users },
          { id: "jobs", label: `Jobs (${jobs.length})`, icon: Briefcase },
          { id: "applicants", label: `Applicants (${applicants.length})`, icon: FileText },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id as any)} className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm ${tab === t.id ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground"}`}>
              <Icon className="size-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "team" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {canWrite && <button onClick={() => setCreatingMember(true)} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"><Plus className="size-4" /> Add Member</button>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <Card key={m.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    {m.avatarUrl ? <img src={m.avatarUrl} alt={m.fullName} className="size-12 rounded-full object-cover" /> : m.fullName[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{m.fullName}</h3>
                    <p className="text-xs text-muted-foreground">{m.roleTitle}</p>
                    <div className="mt-1 flex gap-1">
                      {m.linkedinUrl && <a href={m.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-brand-blue"><Linkedin className="size-3.5" /></a>}
                      {m.githubUrl && <a href={m.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-brand-blue"><Github className="size-3.5" /></a>}
                    </div>
                  </div>
                  {canWrite && (
                    <div className="flex gap-1">
                      <button onClick={() => setEditingMember(m)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Edit3 className="size-3.5" /></button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Remove ${m.fullName}?`)) return;
                          await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete_member", id: m.id }) });
                          toast.success("Deleted"); window.location.reload();
                        }}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                      ><Trash2 className="size-3.5" /></button>
                    </div>
                  )}
                </div>
                {m.bio && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{m.bio}</p>}
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "jobs" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {canWrite && <button onClick={() => setCreatingJob(true)} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"><Plus className="size-4" /> Add Job</button>}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {jobs.map((j) => (
              <Card key={j.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{j.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                      <span className="rounded-md bg-brand-blue/10 px-2 py-0.5 text-brand-blue">{j.department}</span>
                      <span className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground">{j.location}</span>
                      <span className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground">{j.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {canWrite && (
                      <>
                        <button onClick={() => setEditingJob(j)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Edit3 className="size-3.5" /></button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete "${j.title}"?`)) return;
                            await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete_job", id: j.id }) });
                            toast.success("Deleted"); window.location.reload();
                          }}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                        ><Trash2 className="size-3.5" /></button>
                      </>
                    )}
                  </div>
                </div>
                {j.description && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{j.description}</p>}
                {j.salaryRange && <div className="mt-2 text-xs font-medium text-emerald-500">{j.salaryRange}</div>}
                <div className="mt-2 text-[10px] text-muted-foreground">
                  Status: {j.isActive ? <span className="text-emerald-500">Active</span> : <span className="text-amber-500">Closed</span>}
                  {j.closingDate && <span> · Closes {new Date(j.closingDate).toLocaleDateString()}</span>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "applicants" && (
        <Card className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {applicants.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No applicants yet.</td></tr>
              ) : (
                applicants.map((a) => (
                  <tr key={a.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="font-medium">{a.fullName}</div>
                      <a href={`mailto:${a.email}`} className="text-xs text-brand-blue hover:underline">{a.email}</a>
                    </td>
                    <td className="px-4 py-3 text-xs">{a.jobTitle}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] text-brand-blue">{a.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${a.email}`} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Mail className="size-3.5" /></a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      )}

      <AnimatePresence>
        {(editingMember || creatingMember) && (
          <MemberEditorModal
            member={editingMember}
            onClose={() => { setEditingMember(null); setCreatingMember(false); }}
            onSaved={() => { setEditingMember(null); setCreatingMember(false); window.location.reload(); }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(editingJob || creatingJob) && (
          <JobEditorModal
            job={editingJob}
            onClose={() => { setEditingJob(null); setCreatingJob(false); }}
            onSaved={() => { setEditingJob(null); setCreatingJob(false); window.location.reload(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MemberEditorModal({ member, onClose, onSaved }: { member: Member | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    fullName: member?.fullName || "",
    roleTitle: member?.roleTitle || "",
    bio: member?.bio || "",
    linkedinUrl: member?.linkedinUrl || "",
    githubUrl: member?.githubUrl || "",
    avatarUrl: member?.avatarUrl || "",
    displayOrder: member?.displayOrder || 0,
    isActive: member?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.fullName || !form.roleTitle) return toast.error("Name and role required");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: member ? "update_member" : "create_member", ...(member ? { id: member.id } : {}), ...form }),
      });
      if (res.ok) { toast.success("Saved"); onSaved(); }
      else toast.error("Failed");
    } finally { setSaving(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{member ? "Edit member" : "Add team member"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
            <Field label="Role title" value={form.roleTitle} onChange={(v) => setForm({ ...form, roleTitle: v })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={(v) => setForm({ ...form, linkedinUrl: v })} />
            <Field label="GitHub URL" value={form.githubUrl} onChange={(v) => setForm({ ...form, githubUrl: v })} />
          </div>
          <Field label="Avatar URL" value={form.avatarUrl} onChange={(v) => setForm({ ...form, avatarUrl: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Display order" type="number" value={String(form.displayOrder)} onChange={(v) => setForm({ ...form, displayOrder: parseInt(v) || 0 })} />
            <label className="flex items-center gap-2 text-xs self-end pb-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted">Cancel</button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function JobEditorModal({ job, onClose, onSaved }: { job: Job | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: job?.title || "",
    department: job?.department || "General",
    location: job?.location || "Remote",
    type: job?.type || "Full-time",
    description: job?.description || "",
    requirements: (job?.requirements || []).join("\n"),
    salaryRange: job?.salaryRange || "",
    isActive: job?.isActive ?? true,
    closingDate: job?.closingDate ? job.closingDate.split("T")[0] : "",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.title) return toast.error("Title required");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: job ? "update_job" : "create_job",
          ...(job ? { id: job.id } : {}),
          title: form.title,
          department: form.department,
          location: form.location,
          type: form.type,
          description: form.description,
          requirements: form.requirements.split("\n").filter(Boolean),
          salaryRange: form.salaryRange || null,
          isActive: form.isActive,
          closingDate: form.closingDate || null,
        }),
      });
      if (res.ok) { toast.success("Saved"); onSaved(); }
      else toast.error("Failed");
    } finally { setSaving(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{job ? "Edit job" : "Add job opening"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>
        <div className="space-y-3">
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Department" value={form.department} onChange={(v) => setForm({ ...form, department: v })} />
            <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue">
                {["Full-time", "Part-time", "Contract", "Internship"].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <Field label="Salary range" value={form.salaryRange} onChange={(v) => setForm({ ...form, salaryRange: v })} placeholder="$80k-$120k" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Requirements (one per line)</label>
            <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={4} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Closing date" type="date" value={form.closingDate} onChange={(v) => setForm({ ...form, closingDate: v })} />
            <label className="flex items-center gap-2 text-xs self-end pb-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted">Cancel</button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
    </div>
  );
}
