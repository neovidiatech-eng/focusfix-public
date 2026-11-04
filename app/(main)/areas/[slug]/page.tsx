import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Car, Clock, CalendarDays, MapPin } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { ButtonLink } from "@/src/components/ui/Button";
import { CtaBand } from "@/src/components/site/CtaBand";
import { Faq } from "@/src/components/home/Faq";
import { getArea, getAreas, getPriceMatrix, startingPrices } from "@/src/lib/api";
import { egp, feeLabel, to12h, WEEKDAYS_AR } from "@/src/lib/format";
import { getSiteSettings } from "@/src/shared/utils/settings";
import { SITE_URL } from "@/src/shared/utils/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = await getArea(slug);
  if (!area) return { title: "المنطقة غير موجودة | FocusFix" };
  return {
    title: area.seo_title || `صيانة آيفون في ${area.name_ar} — فني لحد باب البيت | FocusFix`,
    description: area.seo_desc || `صيانة آيفون وآيباد في ${area.name_ar}: تغيير شاشة وبطارية وظهر في مكانك خلال 30 دقيقة، بقطع أصلية وضمان. ${feeLabel(area.transport_fee)}.`,
    alternates: { canonical: `${SITE_URL}/areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const [area, areas, matrix, settings] = await Promise.all([getArea(slug), getAreas(), getPriceMatrix("iphone"), getSiteSettings()]);
  if (!area) notFound();

  const from = startingPrices(matrix);
  const slots = area.time_slots.filter((s) => s.is_active && s.max_bookings > 0);
  const days = WEEKDAYS_AR.map((name, dow) => ({ name, slots: slots.filter((s) => s.day_of_week === dow).sort((a, b) => a.start_time.localeCompare(b.start_time)) }));
  const others = areas.filter((a) => a.id !== area.id).slice(0, 8);

  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المناطق", href: "/areas" }, { label: area.name_ar }]}
        eyebrow={area.city_ar}
        title={<>صيانة آيفون في {area.name_ar}، <span className="text-brand-500">لحد باب البيت</span></>}
        desc={area.intro_ar || `فنيين FocusFix بيغطوا ${area.name_ar} يومياً. احجز ميعادك والفني يوصلك ويصلح جهازك قدامك.`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={`/book?area=${area.slug}`} size="lg">احجز في {area.name_ar} <ArrowLeft className="h-4 w-4" /></ButtonLink>
          <span className="inline-flex items-center gap-2 text-ink-2"><Car className="h-5 w-5 text-brand-500" /><span className="num">{feeLabel(area.transport_fee)}</span></span>
        </div>
      </PageHero>

      <Container className="grid gap-6 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold"><CalendarDays className="h-6 w-6 text-brand-500" />مواعيد الزيارات</h2>
          <p className="mt-2 text-ink-2">الفترات المتاحة في {area.name_ar}. هتختار اليوم والفترة وانت بتحجز.</p>
          {slots.length === 0 ? (
            <p className="mt-6 rounded-xl bg-paper p-5 text-ink-2">بنحدد الميعاد معاك بالتليفون بعد الحجز.</p>
          ) : (
            <ul className="mt-6 divide-y divide-line">
              {days.map((d) => (
                <li key={d.name} className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center">
                  <span className="w-24 shrink-0 font-semibold">{d.name}</span>
                  {d.slots.length === 0 ? (
                    <span className="text-sm text-ink-3">إجازة</span>
                  ) : (
                    <span className="flex flex-wrap gap-2">
                      {d.slots.map((s) => (
                        <span key={s.id} className="num inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700">
                          <Clock className="h-3.5 w-3.5" />
                          {to12h(s.start_time)} – {to12h(s.end_time)}
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <div className="space-y-6">
          {matrix && (
            <Reveal delay={0.08} className="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
              <h2 className="font-display text-xl font-semibold">أسعار آيفون في {area.name_ar}</h2>
              <ul className="mt-5 space-y-3">
                {matrix.columns.filter((c) => from[c.slug] !== undefined).map((c) => (
                  <li key={c.slug} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-white/80">{c.name_ar}</span>
                    <span>يبدأ من <b className="num">{egp(from[c.slug])}</b></span>
                  </li>
                ))}
                <li className="flex items-center justify-between">
                  <span className="text-white/80">الانتقال</span>
                  <b className="num">{Number(area.transport_fee) === 0 ? "مجاناً" : egp(area.transport_fee)}</b>
                </li>
              </ul>
              <Link href="/prices" className="mt-5 inline-block text-sm font-semibold text-brand-200 hover:underline">الأسعار حسب الموديل ←</Link>
            </Reveal>
          )}
          {others.length > 0 && (
            <Reveal delay={0.16} className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5">
              <h2 className="font-display text-lg font-semibold">مناطق قريبة</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {others.map((o) => (
                  <Link key={o.id} href={`/areas/${o.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-sm hover:bg-brand-50 hover:text-brand-700">
                    <MapPin className="h-3.5 w-3.5" />{o.name_ar}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </Container>

      <Faq />
      <CtaBand settings={settings} title={`فني FocusFix في ${area.name_ar}`} />
    </>
  );
}
