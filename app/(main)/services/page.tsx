import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import { PageHero, Container, SectionHeader } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { Photo } from "@/src/components/ui/Photo";
import { ButtonLink } from "@/src/components/ui/Button";
import { CtaBand } from "@/src/components/site/CtaBand";
import { Faq } from "@/src/components/home/Faq";
import { getAllPriceMatrices, getServices, startingPrices } from "@/src/lib/api";
import { deviceTypePhoto, servicePhoto } from "@/src/lib/images";
import { egp, warrantyLabel } from "@/src/lib/format";
import { getSiteSettings } from "@/src/shared/utils/settings";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "خدمات صيانة آيفون في البيت: شاشة، بطارية، ظهر | FocusFix",
  description: "تغيير شاشة وبطارية وظهر الآيفون وصيانة الآيباد وأبل ووتش في مكانك بالقاهرة والجيزة، بقطع أصلية وضمان مكتوب.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const DESCRIPTIONS: Record<string, string> = {
  screen: "شاشة مكسورة أو فيها خطوط أو اللمس مش مظبوط؟ بنركب شاشة أصلية ونظبط True Tone قدامك.",
  battery: "البطارية بتفصل بسرعة أو صحتها تحت 80%؟ بطارية أصلية جديدة والجهاز يرجع يكمل يومه.",
  "back-glass": "ظهر مكسور؟ بنغيره بالليزر من غير ما نفك الجهاز كله، ويرجع شكله زي الجديد.",
};

export default async function ServicesPage() {
  const [services, matrices, settings] = await Promise.all([getServices(), getAllPriceMatrices(), getSiteSettings()]);
  const from: Record<string, number> = {};
  for (const { matrix } of matrices) {
    for (const [slug, p] of Object.entries(startingPrices(matrix))) if (from[slug] === undefined || p < from[slug]) from[slug] = p;
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "الخدمات" }]}
        eyebrow="خدماتنا"
        title="كل اللي جهازك محتاجه، في مكانك"
        desc="الفني بيجيلك بكل العدة والقطع، ويخلص الإصلاح في نفس الزيارة."
      />

      <Container className="py-14 sm:py-20">
        <div className="space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.id} className="grid overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-ink/5 md:grid-cols-2">
              <Photo src={s.image_url || servicePhoto(s.slug)} alt={s.name_ar} aspect={4 / 3} className={`aspect-[4/3] h-full w-full md:aspect-auto ${i % 2 ? "md:order-last" : ""}`} sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <h2 className="text-2xl font-semibold sm:text-3xl">{s.name_ar}</h2>
                <p className="mt-3 leading-relaxed text-ink-2">{s.description_ar || DESCRIPTIONS[s.slug] || "إصلاح احترافي بقطع أصلية في مكانك، مع ضمان مكتوب على القطعة والتركيب."}</p>
                <ul className="mt-5 flex flex-wrap gap-2 text-sm text-ink-2">
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5"><Clock className="h-4 w-4 text-brand-500" />حوالي {s.estimated_minutes} دقيقة</li>
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5"><ShieldCheck className="h-4 w-4 text-brand-500" />{warrantyLabel(s.default_warranty_days)}</li>
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <ButtonLink href={`/book?service=${s.slug}`}>احجز الخدمة <ArrowLeft className="h-4 w-4" /></ButtonLink>
                  <span className="text-ink-2">
                    {from[s.slug] !== undefined ? <>يبدأ من <b className="num text-ink">{egp(from[s.slug])}</b></> : "السعر حسب الموديل"}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {matrices.length > 0 && (
        <section className="bg-white py-14 sm:py-20">
          <Container>
            <SectionHeader eyebrow="الأجهزة" title="بنصلح أجهزة أبل كلها" align="center" />
            <div className="grid gap-4 sm:grid-cols-3">
              {matrices.map(({ type, matrix }, i) => (
                <Reveal key={type.slug} delay={i * 0.08}>
                  <Link href="/prices" className="group block overflow-hidden rounded-[1.5rem] bg-paper">
                    <Photo src={type.image_url || deviceTypePhoto(type.slug)} alt={type.name_ar} aspect={1} className="aspect-square w-full transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                    <div className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="text-xl font-semibold">{type.name_en}</h3>
                        <p className="text-sm text-ink-3">{matrix.series.reduce((n, s) => n + s.models.length, 0)} موديل</p>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white transition-transform group-hover:-translate-x-1"><ArrowLeft className="h-4 w-4" /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Faq />
      <CtaBand settings={settings} />
    </>
  );
}
