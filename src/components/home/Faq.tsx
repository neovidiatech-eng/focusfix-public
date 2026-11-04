import { Plus } from "lucide-react";
import { Container, SectionHeader } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";

export const HOME_FAQ = [
  { q: "الإصلاح بياخد وقت قد إيه؟", a: "تغيير الشاشة أو البطارية بياخد في المتوسط 30 دقيقة. بعض الأعطال زي الظهر بتاخد حوالي 45 دقيقة. الفني بيقولك الوقت المتوقع قبل ما يبدأ." },
  { q: "هدفع إمتى؟", a: "بعد ما الفني يخلص وتجرب جهازك بنفسك. مفيش أي عربون ولا دفع مقدم." },
  { q: "القطع أصلية؟", a: "أيوه، بنستخدم قطع غيار أصلية، وبتشوف القطعة بعينك قبل ما تتركب." },
  { q: "الضمان بيغطي إيه؟", a: "ضمان مكتوب على القطعة والتركيب، مدته من 3 شهور لسنة حسب الخدمة. تفاصيله كاملة في صفحة الضمان." },
  { q: "هتطلبوا الباسورد بتاع الموبايل؟", a: "لأ. الإصلاح بيحصل قدامك ومش محتاجين نفتح الجهاز ولا ندخل على بياناتك." },
  { q: "لو منطقتي مش موجودة؟", a: "كلمنا واتساب ونشوف أقرب ميعاد نقدر نوصلك فيه، وغالباً بنقدر نغطي المناطق القريبة." },
];

export function Faq({ items = HOME_FAQ }: { items?: typeof HOME_FAQ }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeader eyebrow="أسئلة بتتكرر" title="عندك سؤال؟ غالباً إجابته هنا" desc="لو مش لاقي إجابتك، كلمنا واتساب وهنرد عليك في دقايق." className="lg:mb-0" />
        <div className="space-y-3">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05} y={12}>
              <details className="group rounded-2xl border border-line bg-white px-5 open:shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
