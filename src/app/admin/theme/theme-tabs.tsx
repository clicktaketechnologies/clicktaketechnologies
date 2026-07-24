"use client";

import { useState, Children, isValidElement } from "react";
import { Palette, Sparkles } from "lucide-react";

/* THEME TABS — toggles between the new NX Design System editor and the
 * legacy Themes manager. Default tab is "nx" (the new design).
 *
 * Children are inspected for a `data-tab` prop matching "nx" or "legacy"
 * and only the matching one is rendered. */

type Tab = "nx" | "legacy";

export function ThemeTabs({
  children,
  defaultTab = "nx",
}: {
  children: React.ReactNode;
  defaultTab?: Tab;
}) {
  const [tab, setTab] = useState<Tab>(defaultTab);

  // Find the child whose data-tab matches the active tab
  const childArray = Children.toArray(children).filter(isValidElement);
  const activeChild = childArray.find(
    (c) => (c.props as any)?.["data-tab"] === tab,
  );

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-border">
        <TabButton
          active={tab === "nx"}
          onClick={() => setTab("nx")}
          icon={<Sparkles className="size-4" />}
          label="NX Design System"
          sub="New"
        />
        <TabButton
          active={tab === "legacy"}
          onClick={() => setTab("legacy")}
          icon={<Palette className="size-4" />}
          label="Legacy Themes"
          sub="Old design"
        />
      </div>

      {/* Render only the active tab */}
      <div>{activeChild}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "text-brand-blue"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
      {sub && (
        <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
          active ? "bg-brand-blue/15 text-brand-blue" : "bg-muted text-muted-foreground"
        }`}>
          {sub}
        </span>
      )}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-blue" />
      )}
    </button>
  );
}
