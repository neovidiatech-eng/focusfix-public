import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles, Wallet, MapPin } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { PriceExplorer } from "@/src/components/prices/PriceExplorer";
import { CtaBand } from "@/src/components/site/CtaBand";
import { getAllPriceMatrices, getAreas } from "@/src/lib/api";
import { feeLabel } from "@/src/lib/format";
import { getSiteSettings } from "@/src/shared/utils/settings";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "أسعار صيانة آيفون وآيباد وأبل ووتش في مصر | FocusFix",
  description: "أسعار تغيير شاشة وبطارية وظهر الآيفون والآيباد وأبل ووتش في القاهرة والجيزة، شاملة القطعة الأصلية والتركيب في مكانك مع ضمان.",
  alternates: { canonical: `${SITE_URL}/prices` },
};

export default async function PricesPage() {
  const [data, areas, settings] = await Promise.all([getAllPriceMatrices(), getAreas(), getSiteSettings()]);

  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأسعار" }]}
        eyebrow="أسعار محدثة"
        title="أسعار الصيانة، من غير مفاجآت"
        desc="السعر شامل القطعة الأصلية والتركيب في مكانك. اللي مكتوب هنا هو اللي هتدفعه."
      >
        <ul className="flex flex-wrap gap-2 text-sm">
          {[
            { icon: Sparkles, t: "قطع أصلية" },
            { icon: ShieldCheck, t: "ضمان مكتوب على كل خدمة" },
            { icon: Wallet, t: "الدفع بعد التجربة" },
          ].map(({ icon: Icon, t }) => (
            <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-ink-2 ring-1 ring-line">
              <Icon className="h-4 w-4 text-brand-500" /> {t}
            </li>
          ))}
        </ul>
      </PageHero>

      <Container className="py-10 sm:py-14">
        <PriceExplorer data={data} />
      </Container>

      {areas.length > 0 && (
        <Container className="pb-6">
          <Reveal className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">رسوم الانتقال حسب المنطقة</h2>
            <p className="mt-2 text-ink-2">بتتضاف مرة واحدة على الطلب مهما كان عدد الخدمات.</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((a) => (
                <li key={a.id}>
                  <Link href={`/areas/${a.slug}`} className="flex items-center justify-between rounded-xl bg-paper/60 px-4 py-3 hover:bg-brand-50">
                    <span className="flex items-center gap-2 font-medium"><MapPin className="h-4 w-4 text-brand-500" />{a.name_ar}</span>
                    <span className="num text-sm text-ink-2">{feeLabel(a.transport_fee)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      )}

      <CtaBand settings={settings} title="لقيت سعرك؟ احجز في دقيقة" />
    </>
  );
}
