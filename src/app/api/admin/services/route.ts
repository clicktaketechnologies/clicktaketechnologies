// /api/admin/services
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return NextResponse.json({
    services: services.map((s) => ({
      ...s,
      items: JSON.parse(s.items || "[]"),
      results: JSON.parse(s.results || "[]"),
      differentiators: JSON.parse(s.differentiators || "[]"),
      deliverables: JSON.parse(s.deliverables || "[]"),
      faq: JSON.parse(s.faq || "[]"),
      processSteps: JSON.parse(s.processSteps || "[]"),
      pricingPackages: JSON.parse(s.pricingPackages || "[]"),
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const {
    slug, category, categoryLabel, title, description, detailedDescription,
    iconName, imageUrl, gradient, glow, eyebrow,
    items, results, differentiators, deliverables, faq, processSteps, pricingPackages,
    displayOrder, isPublished,
  } = body;

  if (!slug || !title) return NextResponse.json({ error: "Slug and title required" }, { status: 400 });

  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });

  const service = await prisma.service.create({
    data: {
      slug, category: category || "web", categoryLabel, title, description: description || "",
      detailedDescription: detailedDescription || "", iconName: iconName || "Sparkles",
      imageUrl, gradient, glow, eyebrow,
      items: JSON.stringify(items || []),
      results: JSON.stringify(results || []),
      differentiators: JSON.stringify(differentiators || []),
      deliverables: JSON.stringify(deliverables || []),
      faq: JSON.stringify(faq || []),
      processSteps: JSON.stringify(processSteps || []),
      pricingPackages: JSON.stringify(pricingPackages || []),
      displayOrder: displayOrder || 0,
      isPublished: isPublished !== false,
    },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "service.create",
    entity: "Service",
    entityId: service.id,
    details: { title, slug },
  });

  return NextResponse.json({ id: service.id });
}
