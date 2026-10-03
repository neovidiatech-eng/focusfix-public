import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";

export const metadata: Metadata = {
  title: "مدونة صيانة أبل ودليل العناية بالأجهزة | FocusFix",
  description:
    "مقالات ودلائل إرشادية حول صيانة أجهزة آيفون، تغيير البطاريات والشاشات، الحفاظ على عمر البطارية، وحلول مشاكل أبل الشائعة.",
  alternates: {
    canonical: "https://focusfix.net/blog",
  },
};

const BLOG_POSTS = [
  {
    slug: "when-to-replace-iphone-battery",
    title: "متى يجب عليك تغيير بطارية الآيفون؟ علامات وحلول نصائح الخبراء",
    excerpt:
      "هل لاحظت هبوط نسبة صحة البطارية أسفل 80%؟ تعرف على العلامات الحقيقية لتلف البطارية وكيف يؤثر ذلك على أداء جهازك، ومتى يكون التبديل آمناً.",
    category: "بطاريات أبل",
    readTime: "4 دقائق",
    publishedAt: "2026-03-15",
    coverImage: "/image1.jpeg",
  },
  {
    slug: "original-vs-copy-iphone-screen",
    title: "الفرق بين شاشة الآيفون الأصلية والتقليد: دليلك الكامل قبل الصيانة",
    excerpt:
      "تتعرف على الفروقات الجوهرية في ألوان الـ OLED ومعدل التحديث 120Hz، ودعم ميزة True Tone لضمان عدم تعرضك للغش في مراكز الصيانة غير المعتمدة.",
    category: "شاشات الآيفون",
    readTime: "6 دقائق",
    publishedAt: "2026-03-20",
    coverImage: "/image2.jpeg",
  },
  {
    slug: "what-to-do-when-iphone-drops-in-water",
    title: "ماذا تفعل عند سقوط الآيفون في الماء؟ 5 خطوات فورية لإنقاذه",
    excerpt:
      "تجنب خطأ وضع الهاتف في الأرز! إليك الخطوات الصحيحة والمثبتة علمياً لإيقاف تشغيل الجهاز وتجفيفه ومنع حدوث التماس كهربائي في اللوحة الأم.",
    category: "أعطال وحلول",
    readTime: "5 دقائق",
    publishedAt: "2026-03-25",
    coverImage: "/image3.jpeg",
  },
  {
    slug: "doorstep-repair-privacy-and-data-safety",
    title: "لماذا تعد الصيانة المنزلية أمام عينك أكثر أماناً لخصوصية صورك وبياناتك؟",
    excerpt:
      "لماذا تخاطر بترك هاتفك لعدة أيام في متجر صيانة؟ خدمة الصيانة المنزلية تمنحك الأمان التام حيث تتم معالجة الجهاز أمامك مباشرة بدون طلب كلمة المرور.",
    category: "خدمات FocusFix",
    readTime: "3 دقائق",
    publishedAt: "2026-03-28",
    coverImage: "/image4.jpeg",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة والدليل التقني" },
        ]}
        badge="مدونة وتقنيات FocusFix"
        badgeIcon={<BookOpen className="w-4 h-4 text-brand-600" />}
        title="دليلك التقني الشامل"
        highlightedTitle="لأجهزة أبل"
        description="نصائح عملية من مهندسي صيانة FocusFix المعتمدين حول الحفاظ على جهازك، حل المشاكل الشائعة، واختيار قطع الغيار المضمونة."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">

        {/* Featured Post (First one) */}
        {BLOG_POSTS.length > 0 && (
          <Link
            href={`/blog/${BLOG_POSTS[0].slug}`}
            className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-brand-100/10 text-brand-700 rounded-full border border-brand-200">
                    {BLOG_POSTS[0].category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{BLOG_POSTS[0].readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-brand-600 transition-colors mb-3 leading-snug">
                  {BLOG_POSTS[0].title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {BLOG_POSTS[0].excerpt}
                </p>

                <div className="flex items-center gap-2 text-brand-600 font-bold text-sm">
                  <span>قراءة المقال بالكامل</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-[-3px] transition-transform" />
                </div>
              </div>

              <div className="lg:col-span-5 h-64 lg:h-full relative bg-slate-100 overflow-hidden">
                <img
                  src={BLOG_POSTS[0].coverImage}
                  alt={BLOG_POSTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-brand-200 transition-all"
            >
              <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-800 rounded-lg shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 pt-3 border-t border-slate-100">
                  <span>اقرأ المزيد</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-16 bg-brand-50 border border-brand-200 rounded-3xl p-8 sm:p-12 text-center">
          <Sparkles className="w-8 h-8 text-brand-600 mx-auto mb-3" />
          <h3 className="text-2xl font-black text-slate-900 mb-2">
            هل جهازك يعاني من مشكلة حالياً؟
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
            بدلاً من البحث والقلق، احجز فحصاً منزلياً فورياً مع فني متخصص يصلك لباب بيتك بضمان وقطع أصلية.
          </p>
          <Link
            href="/book"
            className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-brand-600/20 text-sm"
          >
            احجز صيانة الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
