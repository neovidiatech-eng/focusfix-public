"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, ChevronLeft } from "lucide-react";

interface TopBannerData {
  enabled: boolean;
  text: string;
  badge: string;
  link: string;
  bgColor: string;
}

export const TopAnnouncementBar = () => {
  const [banner, setBanner] = useState<TopBannerData>({
    enabled: true,
    text: "خصم حصري 15% على صيانة أجهزة آيفون اليوم + كشف فوري وقطع غيار أصلية بضمان عام كامل",
    badge: "خدمة الطوارئ متوفرة الآن 24/7",
    link: "/book",
    bgColor: "amber",
  });

  useEffect(() => {
    // Dynamic fetch from backend settings API
    const fetchSettings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const res = await fetch(`${apiUrl}/settings/public`);
        if (res.ok) {
          const data = await res.json();
          if (data.banner_enabled !== undefined) {
            setBanner({
              enabled: data.banner_enabled === "true" || data.banner_enabled === true,
              text: data.banner_text || "خصم حصري 15% على صيانة أجهزة آيفون اليوم + كشف فوري وقطع غيار أصلية بضمان عام كامل",
              badge: data.banner_badge || "خدمة الطوارئ متوفرة الآن 24/7",
              link: data.banner_link || "/book",
              bgColor: data.banner_bg_color || "amber",
            });
          }
        }
      } catch (e) {
        // Fallback to default high-converting announcement
      }
    };

    fetchSettings();
  }, []);

  if (!banner.enabled) return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-2 relative z-50 shadow-xs border-b border-amber-600/20 text-xs sm:text-sm font-bold tracking-tight">
      <Link
        href={banner.link}
        className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 hover:opacity-95 transition-opacity"
      >
        <span className="flex items-center gap-1.5 text-center">
          <Zap className="w-4 h-4 fill-amber-900 text-amber-900 shrink-0" />
          <span>{banner.text}</span>
        </span>

        {banner.badge && (
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-950/85 text-amber-300 text-[11px] font-extrabold shadow-xs shrink-0">
            <span>{banner.badge}</span>
            <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
          </span>
        )}
      </Link>
    </div>
  );
};
