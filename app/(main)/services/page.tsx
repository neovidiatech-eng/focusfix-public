import React from "react";
import { Metadata } from "next";
import { Wrench, ShieldCheck, Sparkles } from "lucide-react";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";
import { Services } from "@/src/features/landing/components/Services";
import { CommonProblems } from "@/src/features/landing/components/CommonProblems";
import { Process } from "@/src/features/landing/components/Process";

export const metadata: Metadata = {
  title: "خدمات صيانة أجهزة Apple المعتمدة عند باب بيتك | FocusFix",
  description:
    "تعرف على خدمات FocusFix لصيانة شاشات وبطاريات الآيفون، تغيير الظهر الزجاجي، وإصلاح الكاميرات بأعلى معايير الدقة وضمان معتمد.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sleek Inner Hero */}
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "خدمات الصيانة" },
        ]}
        badge="خدمات صيانة أبل الاحترافية"
        badgeIcon={<Wrench className="w-4 h-4 text-brand-600" />}
        title="خدمات صيانة متكاملة"
        highlightedTitle="أمام عينك في مكانك"
        description="نقدم حلول صيانة متطورة لجميع موديلات Apple مع الالتزام بأعلى معايير الخصوصية والجودة وقطع الغيار الأصلية بضمان رسمي."
      />

      <div className="-mt-8 relative z-20 space-y-12">
        <Services />
        <CommonProblems />
        <Process />
      </div>
    </div>
  );
}
