import { Hero } from "@/src/components/home/Hero";
import { PriceChecker } from "@/src/components/home/PriceChecker";
import { ModelMarquee, ServicesGrid, HowItWorks, WhyUs, AreasStrip } from "@/src/components/home/Sections";
import { Faq } from "@/src/components/home/Faq";
import { CtaBand } from "@/src/components/site/CtaBand";
import { Container, SectionHeader } from "@/src/components/ui/Section";
import { getAllPriceMatrices, getAreas, getServices, startingPrices, cellPrice } from "@/src/lib/api";
import { getSiteSettings } from "@/src/shared/utils/settings";
import { egp } from "@/src/lib/format";

export default async function HomePage() {
  const [matrices, services, areas, settings] = await Promise.all([getAllPriceMatrices(), getServices(), getAreas(), getSiteSettings()]);

  const iphone = matrices.find((m) => m.type.slug === "iphone")?.matrix || matrices[0]?.matrix || null;
  const from = startingPrices(iphone);
  const modelNames = matrices.flatMap((m) => m.matrix.series.flatMap((s) => s.models.map((x) => x.name))).slice(0, 24);

  // A real price for the hero card, e.g. the newest model's screen
  const firstModel = iphone?.series.flatMap((s) => s.models).find((m) => Object.values(m.cells).some((c) => cellPrice(c) !== null));
  const firstCol = iphone?.columns.find((c) => cellPrice(firstModel?.cells[c.slug]) !== null);
  const heroPrice = firstModel && firstCol ? { label: `${firstCol.name_ar} ${firstModel.name}`, price: egp(cellPrice(firstModel.cells[firstCol.slug])) } : undefined;

  return (
    <>
      <Hero priceHint={heroPrice} />
      <ModelMarquee names={modelNames} />

      {matrices.length > 0 && (
        <section id="price-check" className="scroll-mt-24 py-16 sm:py-24">
          <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
            <SectionHeader
              eyebrow="اعرف سعرك في ثانية"
              title="الأسعار واضحة من الأول"
              desc="اختار جهازك وهتشوف سعر كل خدمة. السعر ده هو اللي هتدفعه، شامل القطعة والتركيب."
              className="lg:sticky lg:top-28"
            />
            <PriceChecker data={matrices} />
          </Container>
        </section>
      )}

      <ServicesGrid services={services} from={from} />
      <HowItWorks />
      <WhyUs />
      <AreasStrip areas={areas} />
      <Faq />
      <CtaBand settings={settings} />
    </>
  );
}
