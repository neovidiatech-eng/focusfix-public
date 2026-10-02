import React from "react";
import { Metadata } from "next";
import { Users, Briefcase, CheckCircle2, Mail, Phone, Sparkles } from "lucide-react";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";

export const metadata: Metadata = {
  title: "انضم لفريق فنيي ومهندسي FocusFix | فرص عمل صيانة أبل",
  description:
    "هل أنت فني أو مهندس صيانة أبل محترف؟ انضم إلى فريق FocusFix لتقديم أرقى خدمة صيانة منزلية في القاهرة والجيزة بدخل متميز وبيئة عمل متطورة.",
};

export default function JoinPage() {
  const perks = [
    "دخل شهري مجزي وعمولات فورية على كل عملية صيانة ناجحة",
    "توفير أحدث معدات الصيانة الدقيقة وأدوات الفحص المتطورة",
    "توفير قطع غيار أصلية 100% ومضمونة من إدارة الشركة",
    "مرونة في جداول العمل وتوزيع جغرافي ذكي للمناطق القريبة منك",
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Sleek Inner Hero */}
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "انضم لفريق العمل" },
        ]}
        badge="وظائف وفرص عمل بفريق FocusFix"
        badgeIcon={<Users className="w-4 h-4 text-brand-600" />}
        title="شاركنا رحلة النجاح وانضم لنخبة"
        highlightedTitle="فنيي ومهندسي أبل"
        description="إذا كنت تمتلك الخبرة والاحترافية العالية في صيانة أجهزة iPhone وiPad، انضم الآن إلى المنصة الأسرع نمواً في خدمات الصيانة المنزلية بمصر."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-10">
        {/* Perks Grid */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>مميزات الانضمام لأسرة FocusFix</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((p, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Position card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                دوام كامل / مرن
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                فني صيانة أجهزة أبل متقدم (Field Specialist)
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">القاهرة والجيزة</span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            المسؤولية الأساسية هي زيارة العملاء في منازلهم ومكاتبهم، وتقديم فحص دقيق واستبدال الشاشات والبطاريات والمنافذ بدقة متناهية وأسلوب تعامل راقٍ ولبق.
          </p>

          <h4 className="text-sm font-bold text-slate-900 mb-3">المتطلبات الأساسية:</h4>
          <ul className="space-y-2.5 text-sm text-slate-600 mb-8">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
              <span>خبرة لا تقل عن سنتين في فك وتركيب شاشات وبطاريات هواتف iPhone بمختلف فئاتها.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
              <span>اللباقة وحسن المظهر والقدرة على شرح الخطوات للعميل باحترافية.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
              <span>وسيلة تنقل (موتوسيكل أو سيارة) للتنقل بين العملاء في نطاق منطقتك.</span>
            </li>
          </ul>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <a
              href="mailto:jobs@focusfix.net?subject=طلب انضمام فني صيانة - FocusFix"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>أرسل سيرتك الذاتية (CV)</span>
            </a>
            <a
              href="https://wa.me/201009911934?text=مرحباً، أود التقديم لوظيفة فني صيانة في FocusFix"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>تواصل مع الإدارة عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
