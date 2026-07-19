import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { SettingsClient } from "./settings-client";

export const dynamic = "force-dynamic";

const SETTING_GROUPS: { name: string; icon: string; settings: { key: string; label: string; type: "text" | "color" | "textarea"; default: string }[] }[] = [
  {
    name: "Brand",
    icon: "Palette",
    settings: [
      { key: "brand.name", label: "Brand Name", type: "text", default: "ClickTake Technologies" },
      { key: "brand.tagline", label: "Tagline", type: "text", default: "Connecting in a better way" },
      { key: "brand.primary_color", label: "Primary Color", type: "color", default: "#136DFF" },
      { key: "brand.accent_color", label: "Accent Color", type: "color", default: "#FF53A9" },
      { key: "brand.logo_url", label: "Logo URL", type: "text", default: "/clicktake-logo.png" },
    ],
  },
  {
    name: "Contact",
    icon: "Mail",
    settings: [
      { key: "contact.email", label: "Contact Email", type: "text", default: "Info@clicktaketech.com" },
      { key: "contact.phone_uk", label: "UK Phone", type: "text", default: "+44 7391 653377" },
      { key: "contact.phone_pk", label: "PK Phone", type: "text", default: "+92 306 9753003" },
      { key: "contact.leads_email", label: "Leads Email", type: "text", default: "Info@clicktaketech.com" },
    ],
  },
  {
    name: "SEO",
    icon: "Globe",
    settings: [
      { key: "seo.title_suffix", label: "Title Suffix", type: "text", default: "| ClickTake Technologies" },
      { key: "seo.default_og_image", label: "Default OG Image URL", type: "text", default: "" },
      { key: "seo.google_analytics_id", label: "Google Analytics ID", type: "text", default: "" },
      { key: "seo.google_search_console", label: "Search Console verification", type: "text", default: "" },
    ],
  },
  {
    name: "Social",
    icon: "Share2",
    settings: [
      { key: "social.facebook", label: "Facebook URL", type: "text", default: "https://www.facebook.com/clicktaketechnologies/" },
      { key: "social.instagram", label: "Instagram URL", type: "text", default: "https://www.instagram.com/clicktaketechuk/" },
      { key: "social.linkedin", label: "LinkedIn URL", type: "text", default: "https://www.linkedin.com/company/click-take-technologies/" },
      { key: "social.youtube", label: "YouTube URL", type: "text", default: "https://www.youtube.com/channel/UCt527M4hxeFOavWdXSRTsdw" },
      { key: "social.tiktok", label: "TikTok URL", type: "text", default: "https://tiktok.com/@clicktaketech" },
      { key: "social.pinterest", label: "Pinterest URL", type: "text", default: "https://pinterest.com/clicktaketech" },
      { key: "social.threads", label: "Threads URL", type: "text", default: "https://threads.net/@clicktaketech" },
      { key: "social.tumblr", label: "Tumblr URL", type: "text", default: "https://clicktaketech.tumblr.com" },
    ],
  },
];

export default async function SettingsPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/settings");
  if (!hasPermission(session.user, "manageSettings")) redirect("/admin");

  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return <SettingsClient settings={map} groups={SETTING_GROUPS} />;
}
