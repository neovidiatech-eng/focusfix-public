import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { CtaBand } from "@/src/components/site/CtaBand";
import { getAreas } from "@/src/lib/api";
import { feeLabel } from "@/src/lib/format";
import { getSiteSettings, whatsappHref } from "@/src/shared/utils/settings";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "مناطق خدمة صيانة الآيفون في القاهرة والجيزة | FocusFix",
  description: "شوف المناطق اللي بنوصلها في القاهرة والجيزة، ورسوم الانتقال والمواعيد المتاحة في كل منطقة.",
  alternates: { canonical: `${SITE_URL}/areas` },
};

export default async function AreasPage() {
  const [areas, settings] = await Promise.all([getAreas(), getSiteSettings()]);
  const byCity = areas.reduce<Record<string, typeof areas>>((acc, a) => {
    (acc[a.city_ar || "أخرى"] ||= []).push(a);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المناطق" }]}
        eyebrow={`${areas.length} منطقة`}
        title="بنوصلك فين؟"
        desc="اختار منطقتك عشان تشوف المواعيد المتاحة ورسوم الانتقال، واحجز على طول."
      />

      <Container className="py-14 sm:py-20">
        <div className="space-y-12">
          {Object.entries(byCity).map(([city, list]) => (
            <section key={city}>
              <h2 className="mb-5 font-display text-2xl font-semibold">{city}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a, i) => (
                  <Reveal key={a.id} delay={Math.min(i * 0.04, 0.3)} y={14}>
                    <Link href={`/areas/${a.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink/5 transition-all hover:-translate-y-0.5 hover:ring-brand-200">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-lg font-semibold">{a.name_ar}</span>
                        <span className="num text-sm text-ink-3">{feeLabel(a.transport_fee)}</span>
                      </span>
                      <ArrowLeft className="h-5 w-5 text-ink-3 transition-transform group-hover:-translate-x-1 group-hover:text-brand-500" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start gap-4 rounded-[1.75rem] border-2 border-dashed border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <Search className="h-8 w-8 text-ink-3" />
            <div>
              <h2 className="text-xl font-semibold">منطقتك مش موجودة؟</h2>
              <p className="text-ink-2">ابعتلنا اسم المنطقة، وغالباً هنقدر نوصلك.</p>
            </div>
          </div>
          <a href={whatsappHref(settings.whatsapp, "أهلاً، عايز أعرف لو بتوصلوا منطقة: ")} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 hover:underline">
            اسألنا واتساب ←
          </a>
        </Reveal>
      </Container>

      <CtaBand settings={settings} />
    </>
  );
}
