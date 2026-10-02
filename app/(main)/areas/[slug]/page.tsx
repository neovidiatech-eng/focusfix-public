import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  Wrench,
  Battery,
  Smartphone,
  ChevronLeft,
} from "lucide-react";

interface AreaDetail {
  slug: string;
  nameAr: string;
  nameEn: string;
  governorate: string;
  eta: string;
  description: string;
  neighborhoods: string[];
}

const AREAS_MAP: Record<string, AreaDetail> = {
  "new-cairo": {
    slug: "new-cairo",
    nameAr: "التجمع الخامس والقاهرة الجديدة",
    nameEn: "New Cairo & 5th Settlement",
    governorate: "القاهرة",
    eta: "30 - 45 دقيقة",
    description:
      "خدمة صيانة أبل وآيفون منزلية وفورية في التجمع الخامس وجميع أحياء القاهرة الجديدة. فني متخصص يصلك حتى منزلك أو مقر عملك لتصليح الشاشات والبطاريات أمام عينك.",
    neighborhoods: ["شارع التسعين الشمالي والجنوبي", "حي النرجس", "حي الياسمين", "حي البنفسج", "المستثمرين", "الرحاب", "مدينتي", "حي القرنفل", "اللوتس"],
  },
  "nasr-city": {
    slug: "nasr-city",
    nameAr: "مدينة نصر",
    nameEn: "Nasr City",
    governorate: "القاهرة",
    eta: "30 - 45 دقيقة",
    description:
      "صيانة أجهزة آبل في مدينة نصر بالمنزل فورياً. تبديل شاشات آيفون وتغيير بطاريات وكونكتر شحن بجودة أصلية وضمان رسمي معتمد.",
    neighborhoods: ["شارع عباس العقاد", "مكرم عبيد", "سيتي ستارز", "الحي السابع", "الحي العاشر", "المنطقة الأولى", "أول عباس", "النادي الأهلي"],
  },
  "heliopolis": {
    slug: "heliopolis",
    nameAr: "مصر الجديدة",
    nameEn: "Heliopolis",
    governorate: "القاهرة",
    eta: "30 - 45 دقيقة",
    description:
      "أسرع خدمة تصليح آيفون منزلية في مصر الجديدة. نوفر قطع غيار موثوقة وشاشات أصلية مع فحص شامل لجهازك أينما كنت.",
    neighborhoods: ["الكوربة", "ميدان روكسي", "ميدان الحجاز", "شارع الميرغني", "تريومف", "النزهة الجديدة", "أرض الجولف"],
  },
  "maadi": {
    slug: "maadi",
    nameAr: "المعادي",
    nameEn: "Maadi",
    governorate: "القاهرة",
    eta: "30 - 45 دقيقة",
    description:
      "صيانة آبل منزلية راقية في المعادي. يصلك فني FocusFix المعتمد لتقديم صيانة سريعة ومضمونة في منزلك.",
    neighborhoods: ["المعادي القديمة", "دجلة المعادي", "شارع النصر واللاسلكي", "زهراء المعادي", "المعادي الجديدة", "كورنيش المعادي"],
  },
  "sheikh-zayed": {
    slug: "sheikh-zayed",
    nameAr: "الشيخ زايد",
    nameEn: "Sheikh Zayed",
    governorate: "الجيزة",
    eta: "45 - 60 دقيقة",
    description:
      "صيانة آيفون وأجهزة أبل المنزلية في الشيخ زايد. بدون عناء الذهاب لمراكز الصيانة وزحام الطرق، نصلك في كومباوندك أو بيتك في الميعاد المحدد.",
    neighborhoods: ["بيفرلي هيلز", "الزايد ديونز", "الحي الثامن", "أركان بلازا", "الياسمين", "خمائل", "كازا", "رويال سيتي"],
  },
  "6th-of-october": {
    slug: "6th-of-october",
    nameAr: "6 أكتوبر",
    nameEn: "6th of October",
    governorate: "الجيزة",
    eta: "45 - 60 دقيقة",
    description:
      "خدمة تصليح هواتف أبل وآيفون بمدينة 6 أكتوبر. صيانة منزلية فورية بقطع غيار أصلية وضمان معتمد يصل إلى عام كامل.",
    neighborhoods: ["ميدان الحصري", "غرب سوميد", "الأحياء السكنية", "مول العرب ومول مصر", "حدائق الأهرام", "المنطقة الصناعية"],
  },
  "dokki-mohandessin": {
    slug: "dokki-mohandessin",
    nameAr: "الدقي والمهندسين",
    nameEn: "Dokki & Mohandessin",
    governorate: "الجيزة",
    eta: "30 - 40 دقيقة",
    description:
      "صيانة أبل فورية في الدقي والمهندسين والعجوزة. خدمة منزلية في أقل من 40 دقيقة مع أعلى معايير الأمان والخصوصية لجهازك وبياناتك.",
    neighborhoods: ["شارع مصدق", "ميدان المساحة", "شارع جامعة الدول العربية", "ميدان لبنان", "شارع سوريا", "العجوزة", "شارع السودان"],
  },
  "zamalek": {
    slug: "zamalek",
    nameAr: "الزمالك ووسط البلد",
    nameEn: "Zamalek & Downtown",
    governorate: "القاهرة",
    eta: "30 - 45 دقيقة",
    description:
      "خدمة صيانة آيفون معتمدة وفورية لسكان الزمالك وجاردن سيتي ووسط القاهرة. فني متخصص يصلك بأعلى احترافية.",
    neighborhoods: ["شارع 26 يوليو", "شارع البرازيل", "شارع أبو الفدا", "جاردن سيتي", "ميدان التحرير", "باب اللوق"],
  },
  "shorouk": {
    slug: "shorouk",
    nameAr: "الشروق وبدر والمستقبل",
    nameEn: "Shorouk & Badr",
    governorate: "القاهرة",
    eta: "45 - 60 دقيقة",
    description:
      "خدمة صيانة هواتف آبل المنزلية في مدن الشروق وبدر والمستقبل سيتي ومدينتي. راحة تامة وضمان شامل لجميع خدمات التصليح.",
    neighborhoods: ["مدينة الشروق", "مدينتي", "مدينة بدر", "المستقبل سيتي", "هيليوبوليس الجديدة"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS_MAP[slug];
  if (!area) return { title: "المنطقة غير موجودة | FocusFix" };

  return {
    title: `صيانة آيفون وأبل منزلية في ${area.nameAr} | تصليح فوري FocusFix`,
    description: area.description,
    alternates: {
      canonical: `https://focusfix.net/areas/${area.slug}`,
    },
    openGraph: {
      title: `صيانة آيفون فورية في ${area.nameAr} | FocusFix`,
      description: area.description,
      url: `https://focusfix.net/areas/${area.slug}`,
    },
  };
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS_MAP[slug];

  if (!area) {
    notFound();
  }

  // LocalBusiness structured schema for SEO & Google Ads campaigns
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `FocusFix صيانة أبل المنزلية - ${area.nameAr}`,
    image: "https://focusfix.net/logo1.jpeg",
    telephone: "+201009911934",
    url: `https://focusfix.net/areas/${area.slug}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.nameAr,
      addressRegion: area.governorate,
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.0444",
      longitude: "31.2357",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href="/areas" className="hover:text-brand-600 transition-colors">
            مناطق التغطية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-800">{area.nameAr}</span>
        </div>

        {/* Hero Area */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            فنيون متاحون حالياً في نطاق {area.nameAr}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            صيانة آيفون وأبل منزلية في <span className="text-brand-600">{area.nameAr}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
            {area.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
              <Clock className="w-8 h-8 text-brand-600 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">زمن وصول الفني</p>
                <p className="font-bold text-slate-800">{area.eta}</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">الضمان المعتمد</p>
                <p className="font-bold text-slate-800">حتى سنة كاملة</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">رسوم الانتقال</p>
                <p className="font-bold text-emerald-600">مجاناً (0 ج.م)</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/book"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-brand-600/25 transition-all text-base"
            >
              احجز فني صيانة في {area.nameAr}
            </Link>
            <a
              href="https://wa.me/201009911934"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 text-base shadow-lg hover:shadow-emerald-600/25"
            >
              <Phone className="w-4 h-4" />
              <span>تواصل واتساب مباشر</span>
            </a>
          </div>
        </div>

        {/* Coverage details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-600" />
              الأحياء والشوارع المشمولة في {area.nameAr}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              نغطي جميع الشوارع والكمبوندات الرئيسية والفرعية:
            </p>
            <div className="flex flex-wrap gap-2">
              {area.neighborhoods.map((n, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-600" />
              الخدمات الأكثر طلباً في المنطقة
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-slate-700" />
                  <span className="text-sm font-bold text-slate-800">تغيير شاشة آيفون أصلية</span>
                </div>
                <span className="text-xs font-semibold text-brand-600">خلال 25 دقيقة</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Battery className="w-5 h-5 text-slate-700" />
                  <span className="text-sm font-bold text-slate-800">تبديل بطارية آيفون أصلية</span>
                </div>
                <span className="text-xs font-semibold text-brand-600">خلال 15 دقيقة</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-slate-700" />
                  <span className="text-sm font-bold text-slate-800">صيانة ظهر زجاجي ومدخل شحن</span>
                </div>
                <span className="text-xs font-semibold text-brand-600">فحص فوري</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">جاهز لإصلاح جهازك الآن؟</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
            اختر موديل جهازك والخدمة المطلوبة، وحدد الموعد الأنسب لك وسيقوم فنينا بزيارتك فوراً.
          </p>
          <Link
            href="/book"
            className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3 rounded-xl transition-all"
          >
            بدء حجز الصيانة
          </Link>
        </div>
      </div>
    </div>
  );
}
