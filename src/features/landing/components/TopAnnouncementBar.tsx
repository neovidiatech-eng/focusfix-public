"use client";

import React from "react";
import Link from "next/link";
import { Zap, ChevronLeft } from "lucide-react";

import { useTranslation } from "react-i18next";
import { useSiteSettings } from "@/src/providers/SiteSettingsProvider";

// Full class strings must appear literally so Tailwind generates them
const THEMES = {
  amber: {
    bar: "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 border-amber-600/20",
    icon: "fill-amber-900 text-amber-900",
    badge: "bg-slate-950/85 text-amber-300",
  },
  emerald: {
    bar: "bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white border-emerald-700/30",
    icon: "fill-white text-white",
    badge: "bg-white/90 text-emerald-800",
  },
  blue: {
    bar: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-blue-800/30",
    icon: "fill-white text-white",
    badge: "bg-white/90 text-blue-800",
  },
  dark: {
    bar: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white border-slate-700",
    icon: "fill-amber-400 text-amber-400",
    badge: "bg-amber-400 text-slate-950",
  },
};

function themeFor(bgColor: string) {
  if (bgColor.includes("emerald")) return THEMES.emerald;
  if (bgColor.includes("blue")) return THEMES.blue;
  if (bgColor.includes("slate")) return THEMES.dark;
  return THEMES.amber;
}

export const TopAnnouncementBar = () => {
  const { i18n } = useTranslation();
  const settings = useSiteSettings();
  const isEn = (i18n.language || "ar") === "en";

  const text = isEn ? settings.banner_text_en || settings.banner_text : settings.banner_text;
  const badge = isEn ? settings.banner_badge_en : settings.banner_badge;

  if (settings.banner_enabled !== "true" || !text) return null;

  const theme = themeFor(settings.banner_bg_color || "");

  return (
    <div className={`w-full px-4 py-2 relative z-50 shadow-xs border-b text-xs sm:text-sm font-bold tracking-tight ${theme.bar}`}>
      <Link
        href={settings.banner_link || "/book"}
        className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 hover:opacity-95 transition-opacity"
      >
        <span className="flex items-center gap-1.5 text-center">
          <Zap className={`w-4 h-4 shrink-0 ${theme.icon}`} />
          <span>{text}</span>
        </span>

        {badge && (
          <span className={`hidden sm:inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-extrabold shadow-xs shrink-0 ${theme.badge}`}>
            <span>{badge}</span>
            <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
          </span>
        )}
      </Link>
    </div>
  );
};
