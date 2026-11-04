import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { SiteSettings } from "@/src/shared/utils/settings";
import { cn } from "@/src/shared/utils/utils";

// The dashboard stores a Tailwind gradient string; map it to one of our themes
function themeFor(bg: string) {
  if (bg.includes("emerald") || bg.includes("green")) return "bg-[#0f7a43] text-white";
  if (bg.includes("blue") || bg.includes("indigo")) return "bg-brand-600 text-white";
  if (bg.includes("slate") || bg.includes("gray")) return "bg-ink text-white";
  return "bg-accent-500 text-white";
}

export function AnnouncementBar({ settings }: { settings: SiteSettings }) {
  if (settings.banner_enabled !== "true" || !settings.banner_text) return null;
  return (
    <div className={cn("absolute inset-x-0 top-0 z-[51] h-9", themeFor(settings.banner_bg_color || ""))}>
      <Link
        href={settings.banner_link || "/book"}
        className="mx-auto flex h-full max-w-6xl items-center justify-center gap-3 px-4 text-[13px] font-medium"
      >
        <span className="truncate">{settings.banner_text}</span>
        {settings.banner_badge && (
          <span className="hidden shrink-0 items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold sm:inline-flex">
            {settings.banner_badge}
            <ArrowLeft className="h-3 w-3" />
          </span>
        )}
      </Link>
    </div>
  );
}
