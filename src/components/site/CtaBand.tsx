import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Section";
import { Photo } from "@/src/components/ui/Photo";
import { Reveal } from "@/src/components/ui/Reveal";
import { PHOTOS } from "@/src/lib/images";
import { whatsappHref, type SiteSettings } from "@/src/shared/utils/settings";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function CtaBand({ settings, title = "جهازك يرجع زي الجديد النهارده", desc = "احجز في دقيقة، والفني يوصلك في الميعاد اللي يناسبك. الدفع بعد ما تجرب جهازك." }: { settings: SiteSettings; title?: string; desc?: string }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="navy-surface relative overflow-hidden rounded-[2rem] px-6 py-12 text-white sm:px-12 sm:py-16">
          <Photo src={PHOTOS.repairMat} alt="" className="absolute inset-y-0 left-0 hidden h-full w-1/2 opacity-30 mix-blend-luminosity md:block" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-l from-brand-800/90 via-brand-800/60 to-brand-800/10" />
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/80">{desc}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/book" variant="light" size="lg">
                احجز فني دلوقتي <ArrowLeft className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={whatsappHref(settings.whatsapp, "أهلاً FocusFix، محتاج أصلح جهازي")} variant="whatsapp" size="lg">
                <WhatsAppIcon className="h-5 w-5" /> اسألنا واتساب
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
