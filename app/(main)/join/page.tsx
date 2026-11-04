import type { Metadata } from "next";
import { Mail, Wallet, CalendarClock, MapPin, GraduationCap, Check } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { Photo } from "@/src/components/ui/Photo";
import { ButtonLink } from "@/src/components/ui/Button";
import { WhatsAppIcon } from "@/src/components/site/WhatsAppIcon";
import { PHOTOS } from "@/src/lib/images";
import { getSiteSettings, whatsappHref } from "@/src/shared/utils/settings";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "اشتغل معانا — وظائف فني صيانة آيفون | FocusFix",
  description: "بندور على فنيين صيانة آيفون شاطرين في القاهرة والجيزة. شغل مرن ودخل كويس وتدريب مستمر.",
  alternates: { canonical: `${SITE_URL}/join` },
};

const PERKS = [
  { icon: Wallet, t: "دخل كويس", d: "عمولة على كل زيارة، والدفع أسبوعي." },
  { icon: CalendarClock, t: "مواعيد مرنة", d: "اختار الأيام والفترات اللي تناسبك." },
  { icon: MapPin, t: "قريب منك", d: "الزيارات في نطاق منطقتك." },
  { icon: GraduationCap, t: "تدريب مستمر", d: "على أحدث الموديلات والأدوات." },
];

export default async function JoinPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "اشتغل معانا" }]}
        eyebrow="وظائف"
        title="فني شاطر؟ مكانك معانا"
        desc="بندور على فنيين صيانة آيفون في القاهرة والجيزة، بيحبوا الشغل النضيف والتعامل المحترم مع العميل."
      />
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PERKS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06} className="rounded-[1.5rem] bg-white p-6 shadow-soft ring-1 ring-ink/5">
                <p.icon className="h-7 w-7 text-brand-500" />
                <h2 className="mt-4 text-lg font-semibold">{p.t}</h2>
                <p className="mt-1 text-ink-2">{p.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 rounded-[1.5rem] bg-paper-2 p-6">
            <h2 className="font-display text-xl font-semibold">محتاجين منك</h2>
            <ul className="mt-4 space-y-3 text-ink-2">
              {[
                "خبرة سنتين على الأقل في فك وتركيب شاشات وبطاريات الآيفون.",
                "لبق ومظهرك محترم، وتعرف تشرح للعميل بتعمل إيه.",
                "وسيلة مواصلات (موتوسيكل أو عربية) تتحرك بيها في منطقتك.",
              ].map((x) => (
                <li key={x} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-500" />{x}</li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappHref(settings.whatsapp, "أهلاً، عايز أقدم على وظيفة فني صيانة في FocusFix")} variant="whatsapp" size="lg">
              <WhatsAppIcon className="h-5 w-5" /> قدّم واتساب
            </ButtonLink>
            <ButtonLink href="mailto:jobs@focusfix.net?subject=طلب انضمام فني صيانة" variant="outline" size="lg">
              <Mail className="h-5 w-5" /> ابعت الـ CV
            </ButtonLink>
          </div>
        </div>
        <Reveal delay={0.1}>
          <Photo src={PHOTOS.technician} alt="فني صيانة بيشتغل على موبايل" aspect={3 / 4} className="aspect-[3/4] w-full rounded-[1.75rem]" />
        </Reveal>
      </Container>
    </>
  );
}
