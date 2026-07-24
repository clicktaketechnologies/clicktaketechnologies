'use client'

import { SITE } from "@/lib/site-data";
import type { ReactElement } from "react";

// Inline SVGs for the 8 social platforms ClickTake is on.
// Using inline SVGs lets us cover Tumblr, Threads, TikTok, Pinterest etc.
const ICON_PATHS: Record<string, ReactElement> = {
  facebook: (
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </>
  ),
  tiktok: (
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  ),
  pinterest: (
    <>
      <path d="M8 12a4 4 0 1 1 8 0c0 2.21-1.79 4-4 4s-4-1.79-4-4z" opacity="0" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.971 1.172-4.971s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.067-4.177-4.067-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.144.222-.331.134-1.235-.575-2.007-2.379-2.007-3.83 0-3.117 2.265-5.985 6.531-5.985 3.429 0 6.094 2.443 6.094 5.708 0 3.407-2.149 6.149-5.133 6.149-1.003 0-1.946-.521-2.268-1.137l-.617 2.353c-.224.859-.827 1.933-1.232 2.588.927.286 1.91.44 2.932.44 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </>
  ),
  threads: (
    <path d="M17.5 12c-.27-1.06-1.62-1.78-3.04-1.78-1.65 0-2.96.86-2.96 2.36 0 1.36 1.07 2.04 2.65 2.34 1.86.34 2.3.71 2.3 1.42 0 .78-.74 1.3-2.06 1.3-1.5 0-2.13-.55-2.34-1.4l-1.7.4c.36 1.5 1.66 2.4 4.04 2.4 2.32 0 3.81-1.06 3.81-2.74 0-1.32-.78-2.05-2.7-2.4-1.78-.32-2.25-.62-2.25-1.27 0-.6.55-1.07 1.74-1.07 1.07 0 1.7.37 1.97 1.07l1.54-.55zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
  ),
  tumblr: (
    <path d="M14.5 2H10v6H6v4h4v6.5c0 2.49 1.51 3.5 3.5 3.5 1.21 0 2.07-.16 2.5-.34v-3.16c-.34.07-.74.12-1.16.12-.84 0-1.34-.34-1.34-1.34V12h3l.5-4h-3.5V2z" />
  ),
};

export function SocialIcons({ size = 18 }: { size?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SITE.socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="group grid h-10 w-10 place-items-center rounded-xl border ct-divider ct-surface text-muted-foreground hover:text-white hover:border-transparent hover:gradient-bg transition-all hover:scale-105"
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition"
          >
            {ICON_PATHS[s.icon]}
          </svg>
        </a>
      ))}
    </div>
  );
}
