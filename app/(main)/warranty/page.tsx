import type { Metadata } from "next";
import { Smartphone, BatteryCharging, Camera, ShieldCheck, XCircle, Check } from "lucide-react";
import { PageHero, Container, SectionHeader } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { Photo } from "@/src/components/ui/Photo";
import { ButtonLink } from "@/src/components/ui/Button";
import { WhatsAppIcon } from "@/src/components/site/WhatsAppIcon";
import { PHOTOS } from "@/src/lib/images";
import { getSiteSettings, whatsappHref } from "@/src/shared/utils/settings";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "ضمان FocusFix على صيانة الآيفون | لحد سنة كاملة",
  description: "ضمان مكتوب على كل إصلاح: سنة على الشاشات، 6 شهور على البطاريات، و3 شهور على المنافذ والكاميرات. اعرف الضمان بيغطي إيه وتطلبه إزاي.",
  alternates: { canonical: `${SITE_URL}/warranty` },
};

const PLANS = [
  { icon: Smartphone, period: "12 شهر", title: "الشاشات الأصلية", desc: "اللمس، السطوع، البكسلات، ثبات الألوان، ونقل True Tone." },
  { icon: BatteryCharging, period: "6 شهور", title: "البطاريات", desc: "الفصل المفاجئ، الاستهلاك غير الطبيعي، أو نزول صحة البطارية بدون استخدام يبرر ده." },
  { icon: Camera, period: "3 شهور", title: "المنافذ والكاميرات", desc: "مدخل الشحن، الكاميرا الأمامية والخلفية، المايك والسماعات الداخلية." },
];

export default async function WarrantyPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "الضمان" }]}
        eyebrow="ضمان مكتوب"
        title={<>لو حصلت مشكلة، <span className="text-brand-500">بنرجعلك ببلاش</span></>}
        desc="بنثق في القطع اللي بنركبها، عشان كده كل إصلاح بيطلع بضمان مكتوب باسمك ورقم حجزك."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-ink/5">
              <p.icon className="h-8 w-8 text-brand-500" />
              <p className="num mt-6 font-display text-4xl font-bold">{p.period}</p>
              <h2 className="mt-1 text-lg font-semibold">ضمان {p.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="bg-white py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-[1.75rem] bg-paper p-7">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold"><ShieldCheck className="h-6 w-6 text-[#12a150]" />الضمان بيغطي</h2>
            <ul className="mt-5 space-y-3 text-ink-2">
              {["عيوب القطعة نفسها", "أي مشكلة سببها التركيب", "زيارة الفني لفحص المشكلة", "تغيير القطعة لو طلع فيها عيب"].map((x) => (
                <li key={x} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#12a150]" />{x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.75rem] bg-paper p-7">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold"><XCircle className="h-6 w-6 text-red-500" />الضمان ما بيغطيش</h2>
            <ul className="mt-5 space-y-3 text-ink-2">
              {["الكسر أو الخبط بعد الإصلاح", "دخول مياه أو سوائل", "فتح الجهاز عند حد تاني بعدنا", "أعطال تانية ملهاش علاقة بالإصلاح"].map((x) => (
                <li key={x} className="flex gap-2"><XCircle className="mt-1 h-4 w-4 shrink-0 text-ink-3" />{x}</li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Photo src={PHOTOS.openedPhone} alt="فحص آيفون تحت الضمان" aspect={4 / 3} className="aspect-[4/3] w-full rounded-[1.75rem]" />
          </Reveal>
          <div>
            <SectionHeader eyebrow="طلب الضمان" title="تطلب الضمان إزاي؟" className="mb-6" />
            <ol className="space-y-4">
              {["ابعتلنا واتساب برقم الحجز أو رقم موبايلك.", "قولنا المشكلة، ولو تقدر ابعت صورة أو فيديو.", "الفني بيزورك يفحص ويصلح العيب مجاناً."].map((x, i) => (
                <li key={x} className="flex gap-4">
                  <span className="num grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-bold text-white">{i + 1}</span>
                  <span className="pt-1.5 text-lg text-ink-2">{x}</span>
                </li>
              ))}
            </ol>
            <ButtonLink href={whatsappHref(settings.whatsapp, "أهلاً، عايز أطلب ضمان على إصلاح. رقم الحجز: ")} variant="whatsapp" size="lg" className="mt-8">
              <WhatsAppIcon className="h-5 w-5" /> اطلب الضمان واتساب
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
