import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle2, Phone } from "lucide-react";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";

export const metadata: Metadata = {
  title: "المناطق المشمولة بالصيانة المنزلية في القاهرة والجيزة | FocusFix",
  description:
    "تعرف على جميع المناطق التي نغطيها بخدمة صيانة أبل المنزلية الفورية في القاهرة والجيزة. فني متخصص يصلك حتى باب بيتك.",
  alternates: {
    canonical: "https://focusfix.net/areas",
  },
};

const AREAS_DATA = [
  {
    nameAr: "التجمع الخامس والقاهرة الجديدة",
    nameEn: "New Cairo & 5th Settlement",
    slug: "new-cairo",
    governorate: "القاهرة",
    travelFee: 0,
    eta: "30 - 45 دقيقة",
    neighborhoods: ["شارع التسعين", "حي النرجس", "حي الياسمين", "حي البنفسج", "مدينتي", "الرحاب"],
    isPopular: true,
  },
  {
    nameAr: "مدينة نصر",
    nameEn: "Nasr City",
    slug: "nasr-city",
    governorate: "القاهرة",
    travelFee: 0,
    eta: "30 - 45 دقيقة",
    neighborhoods: ["عباس العقاد", "مكرم عبيد", "سيتي ستارز", "الحي السابع", "الحي العاشر"],
    isPopular: true,
  },
  {
    nameAr: "مصر الجديدة",
    nameEn: "Heliopolis",
    slug: "heliopolis",
    governorate: "القاهرة",
    travelFee: 0,
    eta: "30 - 45 دقيقة",
    neighborhoods: ["الكوربة", "روكسي", "ميدان الحجاز", "تريومف", "النزهة الجديدة"],
    isPopular: true,
  },
  {
    nameAr: "المعادي",
    nameEn: "Maadi",
    slug: "maadi",
    governorate: "القاهرة",
    travelFee: 0,
    eta: "30 - 45 دقيقة",
    neighborhoods: ["المعادي القديمة", "دجلة المعادي", "اللاسلكي", "زهراء المعادي"],
    isPopular: true,
  },
  {
    nameAr: "الشيخ زايد",
    nameEn: "Sheikh Zayed",
    slug: "sheikh-zayed",
    governorate: "الجيزة",
    travelFee: 0,
    eta: "45 - 60 دقيقة",
    neighborhoods: ["بيفرلي هيلز", "الزايد ديونز", "الحي الثامن", "أركان بلازا"],
    isPopular: true,
  },
  {
    nameAr: "6 أكتوبر",
    nameEn: "6th of October",
    slug: "6th-of-october",
    governorate: "الجيزة",
    travelFee: 0,
    eta: "45 - 60 دقيقة",
    neighborhoods: ["الحصري", "غرب سوميد", "الأحياء", "مول العرب", "حدائق الأهرام"],
    isPopular: true,
  },
  {
    nameAr: "الدقي والمهندسين",
    nameEn: "Dokki & Mohandessin",
    slug: "dokki-mohandessin",
    governorate: "الجيزة",
    travelFee: 0,
    eta: "30 - 40 دقيقة",
    neighborhoods: ["شارع مصدق", "ميدان المساحة", "شارع جامعة الدول", "ميدان لبنان"],
    isPopular: true,
  },
  {
    nameAr: "الزمالك وسط البلد",
    nameEn: "Zamalek & Downtown",
    slug: "zamalek",
    governorate: "القاهرة",
    travelFee: 0,
    eta: "30 - 45 دقيقة",
    neighborhoods: ["ش 26 يوليو", "ميدان التحرير", "جاردن سيتي", "أبو الفدا"],
    isPopular: false,
  },
  {
    nameAr: "الشروق وبدر والمستقبل",
    nameEn: "Shorouk & Badr",
    slug: "shorouk",
    governorate: "القاهرة",
    travelFee: 0,
    eta: "45 - 60 دقيقة",
    neighborhoods: ["مدينة الشروق", "مدينتي", "مدينة بدر", "المستقبل سيتي"],
    isPopular: false,
  },
];

export default function AreasIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "مناطق التغطية والزيارات" },
        ]}
        badge="تغطية كاملة للقاهرة الكبرى والجيزة"
        badgeIcon={<MapPin className="w-4 h-4 text-brand-600" />}
        title="صيانة أبل الفورية"
        highlightedTitle="عند باب بيتك"
        description="فريق فنيي FocusFix المتخصص يصلك أينما كنت في أسرع وقت. نصلح شاشات وبطاريات الآيفون وأجهزة أبل أمام عينك بقطع غيار أصلية وضمان معتمد."
      >
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>رسوم انتقال مجانية تماماً (0 ج.م)</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ضمان رسمي يصل إلى سنة</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>تصليح فوري خلال 25 دقيقة</span>
          </div>
        </div>
      </InnerHero>

      {/* Grid of Areas */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS_DATA.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group block bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-brand-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    انتقال مجاني
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">{area.governorate}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
                {area.nameAr}
              </h2>
              <p className="text-xs text-slate-500 mb-4">{area.nameEn}</p>

              <div className="text-xs text-slate-600 space-y-1.5 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">متوسط الوصول:</span>
                  <span className="font-semibold text-slate-700">{area.eta}</span>
                </div>
                <div className="text-slate-500 line-clamp-1">
                  <span className="text-slate-400">تشمل: </span>
                  {area.neighborhoods.join(" · ")}
                </div>
              </div>

              <div className="flex items-center justify-between text-brand-600 font-bold text-sm pt-2 border-t border-slate-100 group-hover:translate-x-[-2px] transition-transform">
                <span>عرض خدمات وصيانة المنطقة</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-700">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              منطقتك غير موجودة بالقائمة؟
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
              تواصل مباشرة مع خدمة عملاء FocusFix عبر الهاتف أو الواتساب، وفريقنا سيقوم بترتيب أقرب فني متخصص لزيارتك في نفس اليوم.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-brand-500/20 text-sm"
              >
                احجز موعد صيانة الآن
              </Link>
              <a
                href="https://wa.me/201009911934"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg hover:shadow-emerald-600/20"
              >
                <Phone className="w-4 h-4" />
                <span>تواصل واتساب: 01009911934</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
