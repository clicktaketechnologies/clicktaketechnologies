import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { TypographyClient } from "./typography-client";

export const dynamic = "force-dynamic";

const ELEMENT_LABELS: Record<string, string> = {
  heading_h1: "Heading H1",
  heading_h2: "Heading H2",
  heading_h3: "Heading H3",
  body: "Body Text",
  nav: "Navigation",
  button: "Button Text",
  quote: "Blockquote",
  code: "Code",
  pricing_number: "Pricing Number",
};

export default async function TypographyPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/typography");
  if (!hasPermission(session.user, "readCMS")) redirect("/admin");

  const [typography, presets] = await Promise.all([
    prisma.cmsTypography.findMany(),
    prisma.cmsFontPreset.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <TypographyClient
      typography={typography.map((t) => ({
        element: t.element,
        fontFamily: t.fontFamily,
        fontWeight: t.fontWeight,
        fontSize: t.fontSize || "",
        lineHeight: t.lineHeight || "",
        letterSpacing: t.letterSpacing || "",
        fontSource: t.fontSource,
        fontFileUrl: t.fontFileUrl || "",
      }))}
      presets={presets.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        isBuiltin: p.isBuiltin,
      }))}
      elementLabels={ELEMENT_LABELS}
      canWrite={hasPermission(session.user, "writeCMS")}
    />
  );
}
