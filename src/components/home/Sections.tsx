import Link from "next/link";
import { ArrowLeft, Clock, MapPin, ShieldCheck, Eye, Wallet, BadgeCheck, CalendarCheck, Wrench, Smartphone } from "lucide-react";
import { Container, SectionHeader } from "@/src/components/ui/Section";
import { Photo } from "@/src/components/ui/Photo";
import { Reveal } from "@/src/components/ui/Reveal";
import { ButtonLink } from "@/src/components/ui/Button";
import { PHOTOS, servicePhoto } from "@/src/lib/images";
import { egp, feeLabel } from "@/src/lib/format";
import type { Area, Service } from "@/src/lib/api";

export function ModelMarquee({ names }: { names: string[] }) {
  if (names.length === 0) return null;
  const row = [...names, ...names];
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-5" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="flex w-max animate-marquee gap-10" dir="ltr">
        {row.map((n, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-ink-3">
            {n}
            <span className="h-1.5 w-1.5 rounded-full bg-brand-200" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function ServicesGrid({ services, from }: { services: Service[]; from: Record<string, number> }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="خدماتنا"
          title="أشهر الأعطال، بنحلها في نفس الزيارة"
          desc="كل الخدمات بقطع غيار أصلية، والسعر المكتوب هو اللي هتدفعه."
          action={<ButtonLink href="/services" variant="outline" size="sm">كل الخدمات <ArrowLeft className="h-4 w-4" /></ButtonLink>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <Link href={`/book?service=${s.slug}`} className="group relative block overflow-hidden rounded-[1.5rem] bg-ink">
                <Photo src={servicePhoto(s.slug)} alt={s.name_ar} aspect={4 / 3} className="aspect-[4/3] w-full opacity-80 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{s.estimated_minutes} دقيقة</span>
                    <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />ضمان</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{s.name_ar}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white/80">
                      {from[s.slug] !== undefined ? <>يبدأ من <b className="num text-white">{egp(from[s.slug])}</b></> : "السعر حسب الموديل"}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform group-hover:-translate-x-1">
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const STEPS = [
  { icon: Smartphone, title: "اختار جهازك والعطل", desc: "هتعرف السعر على طول، من غير مكالمات ولا مفاجآت." },
  { icon: CalendarCheck, title: "حدد المكان والميعاد", desc: "اختار اليوم والفترة اللي تناسبك، في البيت أو الشغل." },
  { icon: Wrench, title: "الفني يصلح قدامك", desc: "بيخلص في حوالي 30 دقيقة، وبتجرب جهازك قبل ما تدفع." },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative order-last lg:order-first">
          <div className="grid grid-cols-5 gap-3">
            <Photo src={PHOTOS.screwdriver} alt="فك وتركيب قطع الآيفون" aspect={3 / 4} className="col-span-3 aspect-[3/4] w-full rounded-[1.5rem]" sizes="30vw" />
            <div className="col-span-2 flex flex-col gap-3 pt-10">
              <Photo src={PHOTOS.handIphone} alt="آيفون بعد الإصلاح" aspect={3 / 4} className="aspect-[3/4] w-full rounded-[1.5rem]" sizes="20vw" />
              <div className="rounded-[1.5rem] bg-brand-500 p-4 text-white">
                <p className="num font-display text-3xl font-bold">30</p>
                <p className="text-sm text-white/80">دقيقة متوسط الإصلاح</p>
              </div>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeader eyebrow="بتمشي إزاي؟" title="3 خطوات، وجهازك يرجع زي الجديد" className="mb-8" />
          <ol className="space-y-3">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="flex gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-brand-200 hover:bg-brand-50/40">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paper text-brand-500">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink-3">خطوة {i + 1}</p>
                  <h3 className="mt-0.5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-ink-2">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <ButtonLink href="/book" className="mt-8" size="lg">ابدأ الحجز <ArrowLeft className="h-4 w-4" /></ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader eyebrow="ليه FocusFix؟" title="مش هتسيب جهازك عند حد تاني تاني" align="center" />
        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white md:col-span-4 md:row-span-2 md:min-h-[26rem]">
            <Photo src={PHOTOS.partsFlatlay} alt="" className="absolute inset-0 h-full w-full opacity-40" sizes="60vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
            <div className="relative flex h-full flex-col justify-end">
              <Eye className="h-8 w-8 text-accent-500" />
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">جهازك ما بيغيبش عن عينك</h3>
              <p className="mt-3 max-w-md text-white/75">
                الإصلاح بيحصل قدامك في مكانك. صورك وبياناتك ما بتطلعش برا البيت، ومش هنطلب منك الباسورد.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.75rem] bg-brand-500 p-7 text-white md:col-span-2">
            <BadgeCheck className="h-7 w-7" />
            <h3 className="mt-4 text-xl font-semibold">قطع أصلية</h3>
            <p className="mt-2 text-white/80">بتشوف القطعة بعينك قبل ما تتركب في جهازك.</p>
          </Reveal>
          <Reveal delay={0.16} className="rounded-[1.75rem] bg-white p-7 shadow-soft md:col-span-2">
            <ShieldCheck className="h-7 w-7 text-brand-500" />
            <h3 className="mt-4 text-xl font-semibold">ضمان مكتوب</h3>
            <p className="mt-2 text-ink-2">لو حصلت أي مشكلة في القطعة، بنرجعلك ونصلحها ببلاش.</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.75rem] bg-accent-50 p-7 md:col-span-3">
            <Wallet className="h-7 w-7 text-accent-600" />
            <h3 className="mt-4 text-xl font-semibold">ادفع بعد ما تجرب</h3>
            <p className="mt-2 text-ink-2">مفيش عربون. بتدفع بعد ما تتأكد إن كل حاجة شغالة.</p>
          </Reveal>
          <Reveal delay={0.16} className="rounded-[1.75rem] bg-white p-7 shadow-soft md:col-span-3">
            <Clock className="h-7 w-7 text-brand-500" />
            <h3 className="mt-4 text-xl font-semibold">ميعاد مضبوط</h3>
            <p className="mt-2 text-ink-2">بتختار الفترة اللي تناسبك، والفني بيكلمك قبل ما يوصل.</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function AreasStrip({ areas }: { areas: Area[] }) {
  if (areas.length === 0) return null;
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="مناطق الخدمة"
          title="بنوصلك في القاهرة والجيزة"
          desc="اختار منطقتك وشوف المواعيد المتاحة ورسوم الانتقال."
          action={<ButtonLink href="/areas" variant="outline" size="sm">كل المناطق <ArrowLeft className="h-4 w-4" /></ButtonLink>}
        />
        <div className="flex flex-wrap gap-2.5">
          {areas.map((a, i) => (
            <Reveal key={a.id} delay={Math.min(i * 0.03, 0.4)} y={12}>
              <Link
                href={`/areas/${a.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper/50 py-2.5 ps-3 pe-4 transition-colors hover:border-brand-500 hover:bg-brand-50"
              >
                <MapPin className="h-4 w-4 text-brand-500" />
                <span className="font-medium">{a.name_ar}</span>
                <span className="text-xs text-ink-3 group-hover:text-brand-600">{feeLabel(a.transport_fee)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
