"use client";

import React from "react";
import { ShieldCheck, FileText, Phone } from "lucide-react";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";
import { useTranslation } from "react-i18next";

export default function WarrantyPage() {
  const { t } = useTranslation();

  const warrantyFeatures = [
    {
      title: t("warrantyPage.screensTitle"),
      description: t("warrantyPage.screensDesc"),
      period: t("warrantyPage.screensPeriod"),
      badge: "iPhone",
    },
    {
      title: t("warrantyPage.batteriesTitle"),
      description: t("warrantyPage.batteriesDesc"),
      period: t("warrantyPage.batteriesPeriod"),
      badge: "Battery",
    },
    {
      title: t("warrantyPage.portsTitle"),
      description: t("warrantyPage.portsDesc"),
      period: t("warrantyPage.portsPeriod"),
      badge: "Parts",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Sleek Inner Hero */}
      <InnerHero
        breadcrumb={[
          { label: t("nav.home"), href: "/" },
          { label: t("warrantyPage.title") },
        ]}
        badge={t("warrantyPage.badge")}
        badgeIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        title={t("warrantyPage.title")}
        highlightedTitle={t("warrantyPage.highlight")}
        description={t("warrantyPage.desc")}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Warranty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {warrantyFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                    {item.badge}
                  </span>
                  <span className="text-xs font-black text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Terms Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-8 text-slate-700">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-600" />
              <span>{t("warrantyPage.title")}</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {t("warrantyPage.desc")}
            </p>
          </div>

          {/* Claim Callout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-brand-50 to-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {t("warrantyPage.claimTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {t("warrantyPage.claimDesc")}
              </p>
            </div>
            <a
              href="https://wa.me/201009911934"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-xs shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>{t("warrantyPage.claimBtn")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
