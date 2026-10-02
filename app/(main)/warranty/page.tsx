import React from "react";
import { Metadata } from "next";
import { ShieldCheck, CheckCircle2, Clock, Wrench, Phone, FileText } from "lucide-react";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "شروط وسياسة الضمان المعتمد (360 يوماً) | FocusFix",
  description:
    "تعرف على تفاصيل ضمان صيانة FocusFix الرسمي: ضمان 360 يوماً على شاشات الآيفون الأصلية، و6 أشهر على البطاريات، وحماية كاملة لحقك.",
};

export default function WarrantyPage() {
  const warrantyFeatures = [
    {
      title: "ضمان 360 يوماً للشاشات الأصلية",
      description:
        "يغطي استجابة اللمس التامة (Touch Response)، عيوب السطوع والبكسلات (Dead Pixels)، واستقرار الألوان ونقل ميزة True Tone بدون أي رسوم إضافية.",
      period: "12 شهر كامل",
      badge: "شاشات أبل",
    },
    {
      title: "ضمان 6 أشهر لبطاريات أبل",
      description:
        "يغطي الاستنزاف غير الطبيعي للطاقة، الإغلاق المفاجئ للهاتف، أو هبوط نسبة صحة البطارية دون الاستهلاك القياسي لدورات الشحن.",
      period: "6 شهور",
      badge: "البطاريات",
    },
    {
      title: "ضمان 90 يوماً للمنافذ والكاميرات",
      description:
        "يشمل صيانة مدخل الشحن، الكاميرات الخلفية والأمامية، المايكروفون والسماعات الداخلية ضد أي عيوب تصنيعية.",
      period: "3 شهور",
      badge: "القطع الداخلية",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Sleek Inner Hero */}
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "شروط وسياسة الضمان" },
        ]}
        badge="ضمان FocusFix المعتمد الرسمي"
        badgeIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        title="صيانة موثوقة مع"
        highlightedTitle="أطول فترة ضمان في مصر"
        description="نحن نثق تماماً بجودة قطع الغيار الأصلية وكفاءة مهندسينا المعتمدين، لذلك نقدم لك ضماناً رسمياً مكتوباً يمنحك راحة البال التامة."
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
              <span>ما هي شروط وضوابط سريان الضمان؟</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              يبدأ سريان فترة الضمان المعتمد من تاريخ إتمام الصيانة واستلام الفاتورة الإلكترونية عبر رقم الواتساب أو الإيميل الخاص بك.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              الحالات المستثناة من الضمان (خارج التغطية):
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>الكسر الخارجي أو الشروخ الناتجة عن السقوط أو الصدمات القوية بعد إتمام الصيانة.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>تسرب السوائل أو الغمر في الماء بعد تسليم الهاتف.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>فتح الجهاز أو محاولة صيانته لدى مركز صيانة غير معتمد من FocusFix خلال فترة الضمان.</span>
              </li>
            </ul>
          </div>

          {/* Claim Callout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-brand-50 to-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                كيف تقوم بتفعيل أو طلب فحص الضمان؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                بكل بساطة تواصل معنا برقم الحجز أو هاتفك، وسيقوم الفني بزيارتك فوراً وإصلاح العيب مجاناً.
              </p>
            </div>
            <a
              href="https://wa.me/201009911934"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-xs shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>طلب ضمان عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
