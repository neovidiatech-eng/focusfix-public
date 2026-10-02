"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, ChevronLeft } from "lucide-react";

import { useTranslation } from "react-i18next";

interface TopBannerData {
  enabled: boolean;
  textAr: string;
  textEn: string;
  badgeAr: string;
  badgeEn: string;
  link: string;
  bgColor: string;
}

export const TopAnnouncementBar = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "ar";

  const [banner, setBanner] = useState<TopBannerData>({
    enabled: true,
    textAr: "خصم حصري 15% على صيانة أجهزة آيفون اليوم + كشف فوري وقطع غيار أصلية بضمان عام كامل",
    textEn: "Exclusive 15% OFF iPhone repairs today + instant inspection & genuine parts with 1-Year warranty",
    badgeAr: "خدمة الطوارئ متوفرة الآن 24/7",
    badgeEn: "Emergency 24/7 Service Available",
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
              textAr: data.banner_text || "خصم حصري 15% على صيانة أجهزة آيفون اليوم + كشف فوري وقطع غيار أصلية بضمان عام كامل",
              textEn: data.banner_text_en || "Exclusive 15% OFF iPhone repairs today + instant inspection & genuine parts with 1-Year warranty",
              badgeAr: data.banner_badge || "خدمة الطوارئ متوفرة الآن 24/7",
              badgeEn: data.banner_badge_en || "Emergency 24/7 Service Available",
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
          <span>{currentLang === "en" ? banner.textEn : banner.textAr}</span>
        </span>

        {(currentLang === "en" ? banner.badgeEn : banner.badgeAr) && (
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-950/85 text-amber-300 text-[11px] font-extrabold shadow-xs shrink-0">
            <span>{currentLang === "en" ? banner.badgeEn : banner.badgeAr}</span>
            <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
          </span>
        )}
      </Link>
    </div>
  );
};
