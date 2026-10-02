import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ChevronLeft, ArrowRight, ShieldCheck, Wrench, Share2 } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  content: string[];
}

const ARTICLES: Record<string, Article> = {
  "when-to-replace-iphone-battery": {
    slug: "when-to-replace-iphone-battery",
    title: "متى يجب عليك تغيير بطارية الآيفون؟ علامات وحلول نصائح الخبراء",
    category: "بطاريات أبل",
    readTime: "4 دقائق",
    publishedAt: "15 مارس 2026",
    coverImage: "/image1.jpeg",
    content: [
      "تعتبر بطارية الآيفون من المكونات الكيميائية القابلة للاستهلاك مع مرور الوقت وكثرة دورات الشحن. وفقاً لشركة Apple، تبدأ كفاءة البطارية بالانخفاض بعد حوالي 500 دورة شحن كاملة.",
      "العلامة الأولى والأكثر وضوحاً هي هبوط نسبة 'أقصى قدرة' (Maximum Capacity) في إعدادات البطارية إلى أقل من 80%. عند هذه النقطة، يقوم نظام iOS تلقائياً بتفعيل إدارة الأداء لتجنب الإغلاق المفاجئ للجهاز تحت الضغط.",
      "علامات إضافية تدل على ضرورة تغيير البطارية فوراً:",
      "1. بطء ملحوظ وتقطيع أثناء فتح التطبيقات أو التنقل في النظام.",
      "2. إغلاق مفاجئ للهاتف حتى عند وجود نسبة شحن تفوق 20% أو 30%.",
      "3. ارتفاع حرارة الهاتف أثناء الشحن أو الاستخدام الخفيف.",
      "4. انتفاخ البطارية (علامة خطيرة تتطلب التوقف الفوري عن الاستخدام لأنها قد تكسر الشاشة أو تشتعل).",
      "مع خدمة FocusFix المنزلية، يمكنك حجز تغيير بطارية آيفون أصلية تتم أمام عينك في منزلك خلال 15 دقيقة فقط، مع ضمان رسمي يبدأ من 6 أشهر، دون الحاجة لترك الهاتف أو إفشاء كلمة المرور وبياناتك الشخصية.",
    ],
  },
  "original-vs-copy-iphone-screen": {
    slug: "original-vs-copy-iphone-screen",
    title: "الفرق بين شاشة الآيفون الأصلية والتقليد: دليلك الكامل قبل الصيانة",
    category: "شاشات الآيفون",
    readTime: "6 دقائق",
    publishedAt: "20 مارس 2026",
    coverImage: "/image2.jpeg",
    content: [
      "عند تعرض شاشة الآيفون للكسر أو الخطوط الملونة، يقع الكثيرون في حيرة بين الشاشات الأصلية والشاشات المقلدة من الدرجات المختلفة (Copy / Incell / OLED Replica).",
      "الشاشة الأصلية (Original OEM) تضمن لك درجات الألوان الطبيعية بنظام P3، واستجابة لمس فائقة السرعة بدون أي تأخير، ودعم كامل لتقنيات True Tone ومعدل التحديث التكيفي ProMotion حتى 120Hz.",
      "أما الشاشات المقلدة الرخيصة، فتأتي عادة بسطوع منخفض تحت أشعة الشمس، وألوان باهتة تميل للأزرق، وزجاج غير مقاوم للخدوش والصدمات البسيطة، بالإضافة إلى استهلاك أعلى لطاقة البطارية.",
      "في FocusFix، نلتزم بالشفافية الكاملة وتوفير شاشات أصلية ومطابقة لمعايير المصنع مع ضمان شامل وميزة برمجة الشاشة ونقل بيانات الحساسات الذكية (True Tone Transfer) أمامك في المنزل.",
    ],
  },
  "what-to-do-when-iphone-drops-in-water": {
    slug: "what-to-do-when-iphone-drops-in-water",
    title: "ماذا تفعل عند سقوط الآيفون في الماء؟ 5 خطوات فورية لإنقاذه",
    category: "أعطال وحلول",
    readTime: "5 دقائق",
    publishedAt: "25 مارس 2026",
    coverImage: "/image3.jpeg",
    content: [
      "رغم أن أجهزة iPhone الحديثة مقاومة للماء والغبار وفق معيار IP68، إلا أن هذه المقاومة تضعف بمرور الوقت مع الصدمات وتمدد العوازل المطاطية.",
      "الخطأ الأكثر شيوعاً وكارثية هو وضع الهاتف في كيس أرز؛ فالأرز يولد غباراً نشوياً يترسب داخل منافذ الشحن ويزيد من تأكسد المكونات الداخلية.",
      "الخطوات الصحيحة الفورية:",
      "1. أوقف تشغيل الهاتف تماماً على الفور (Shut Down) ولا تحاول الضغط على الأزرار بشكل متكرر.",
      "2. جفف السطح الخارجي بقطعة قماش ناعمة خالية من الوبر.",
      "3. اقلب الهاتف برفق بحيث يكون منفذ Lightning أو Type-C لأسفل لإخراج قطرات الماء الزائدة.",
      "4. لا تقم بتوصيل الهاتف بالشاحن الكهربائي نهائياً قبل مرور 24 ساعة على الأقل.",
      "إذا تسرب الماء إلى الشاشة وظهرت بقع مائية أو تشويش، احجز فحصاً سريعاً مع فني FocusFix لفتح الجهاز وتنظيف اللوحة الأم بالألتراسونيك والمواد المخصصة قبل تلف الدوائر الكهربائية بشكل دائم.",
    ],
  },
  "doorstep-repair-privacy-and-data-safety": {
    slug: "doorstep-repair-privacy-and-data-safety",
    title: "لماذا تعد الصيانة المنزلية أمام عينك أكثر أماناً لخصوصية صورك وبياناتك؟",
    category: "خدمات FocusFix",
    readTime: "3 دقائق",
    publishedAt: "28 مارس 2026",
    coverImage: "/image4.jpeg",
    content: [
      "يحتوي الهاتف الذكي اليوم على أسرارنا، حساباتنا البنكية، رسائلنا الخاصة، ومئات الصور التذكارية العائلية. تسليم هاتفك لمتجر صيانة تقليدي يطلب منك كلمة السر (Passcode) يشكل خطراً كبيراً على خصوصيتك.",
      "مع نموذج الصيانة المنزلية الفورية من FocusFix، تتم عملية الصيانة بالكامل أمام ناظريك في صالون منزلك أو مكتبك. لا يُطلب منك إعطاء كلمة المرور، ويتم فحص الشاشة أو الكاميرا بحضورك وبمشاركتك.",
      "إلى جانب الأمان التام، يوفر عليك هذا الحل ساعات طويلة من قيادة السيارة وزحمة السير والانتظار لأيام حتى استلام الهاتف.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "المقال غير موجود | FocusFix" };

  return {
    title: `${article.title} | مدونة FocusFix`,
    description: article.content[0],
    alternates: {
      canonical: `https://focusfix.net/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.content[0],
      images: [article.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  // Schema markup
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    image: [`https://focusfix.net${article.coverImage}`],
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "FocusFix Team",
      url: "https://focusfix.net",
    },
    publisher: {
      "@type": "Organization",
      name: "FocusFix",
      logo: {
        "@type": "ImageObject",
        url: "https://focusfix.net/logo1.jpeg",
      },
    },
    description: article.content[0],
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-brand-600 transition-colors">
            المدونة
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-800 line-clamp-1">{article.title}</span>
        </div>

        {/* Article Meta */}
        <div className="mb-6">
          <span className="text-xs font-bold px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-slate-200 mb-10 shadow-sm border border-slate-200">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Action card */}
        <div className="mt-12 bg-white rounded-2xl border border-brand-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">
              هل تواجه نفس المشكلة في جهازك الآن؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              اطلب فني FocusFix المحترف لزيارتك في المنزل وفحص جهازك بالكامل أمامك.
            </p>
          </div>
          <Link
            href="/book"
            className="shrink-0 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm"
          >
            حجز فحص وصيانة
          </Link>
        </div>
      </article>
    </div>
  );
}
