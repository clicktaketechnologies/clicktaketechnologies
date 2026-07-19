import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { TeamCareersClient } from "./team-careers-client";

export const dynamic = "force-dynamic";

export default async function TeamCareersPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/team-careers");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  const [team, jobs, applicants] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.jobOpening.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { job: { select: { title: true } } } }),
  ]);

  return (
    <TeamCareersClient
      team={team.map((t) => ({ id: t.id, fullName: t.fullName, roleTitle: t.roleTitle, bio: t.bio, linkedinUrl: t.linkedinUrl, githubUrl: t.githubUrl, avatarUrl: t.avatarUrl, displayOrder: t.displayOrder, isActive: t.isActive }))}
      jobs={jobs.map((j) => ({ id: j.id, title: j.title, department: j.department, location: j.location, type: j.type, description: j.description, requirements: JSON.parse(j.requirements || "[]"), salaryRange: j.salaryRange, isActive: j.isActive, closingDate: j.closingDate?.toISOString() || null }))}
      applicants={applicants.map((a) => ({ id: a.id, jobId: a.jobId, jobTitle: a.job?.title || "—", fullName: a.fullName, email: a.email, phone: a.phone, status: a.status, createdAt: a.createdAt.toISOString() }))}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
