import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";
import { Logo } from "@/src/components/ui/Logo";
import { Container } from "@/src/components/ui/Section";
import { getAreas } from "@/src/lib/api";
import { displayPhone, telHref, whatsappHref, type SiteSettings } from "@/src/shared/utils/settings";
import { to12h } from "@/src/lib/format";
import { NAV_LINKS } from "./nav";
import { WhatsAppIcon } from "./WhatsAppIcon";

export async function Footer({ settings }: { settings: SiteSettings }) {
  const areas = (await getAreas()).slice(0, 10);
  return (
    <footer className="bg-ink pb-28 text-white/70 md:pb-0">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-xs leading-relaxed">
              صيانة آيفون وآيباد وأبل ووتش في بيتك أو مكتبك، أمام عينك، بقطع أصلية وضمان مكتوب.
            </p>
            <div className="mt-6 flex gap-2">
              <a href={whatsappHref(settings.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="واتساب" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a href={telHref(settings.phone)} aria-label="اتصال" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <Phone className="h-5 w-5" />
              </a>
              <a href={`mailto:${settings.supportEmail}`} aria-label="إيميل" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-white">الموقع</h3>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/book" className="hover:text-white">احجز فني</Link></li>
              {NAV_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
              ))}
              <li><Link href="/join" className="hover:text-white">اشتغل معانا</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold text-white">بنوصلك في</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[15px] md:grid-cols-1">
              {areas.map((a) => (
                <li key={a.id}><Link href={`/areas/${a.slug}`} className="hover:text-white">{a.name_ar}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold text-white">تواصل معانا</h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a href={telHref(settings.phone)} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4" /> <span className="num" dir="ltr">{displayPhone(settings.phone)}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.supportEmail}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4" /> {settings.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="num">من {to12h(settings.working_hours_start)} لـ {to12h(settings.working_hours_end)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FocusFix. كل الحقوق محفوظة.</p>
          <p className="text-white/40">FocusFix مركز صيانة مستقل وغير تابع لشركة Apple.</p>
        </div>
      </Container>
    </footer>
  );
}
