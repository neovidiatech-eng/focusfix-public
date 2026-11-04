"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { useSiteSettings } from "@/src/providers/SiteSettingsProvider";
import { telHref, whatsappHref } from "@/src/shared/utils/settings";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Thumb-reachable actions on phones; the booking flow has its own sticky bar */
export function MobileDock() {
  const pathname = usePathname();
  const settings = useSiteSettings();
  if (pathname.startsWith("/book")) return null;
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-2">
          <a href={telHref(settings.phone)} aria-label="اتصل بينا" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-ink">
            <Phone className="h-5 w-5" />
          </a>
          <a
            href={whatsappHref(settings.whatsapp, "أهلاً FocusFix، محتاج أصلح جهازي")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="كلمنا واتساب"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1fa855] text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Link href="/book" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 font-semibold text-white">
            <CalendarCheck className="h-5 w-5" />
            احجز فني دلوقتي
          </Link>
        </div>
      </div>
      {/* Desktop floating WhatsApp */}
      <a
        href={whatsappHref(settings.whatsapp, "أهلاً FocusFix، محتاج أصلح جهازي")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="كلمنا واتساب"
        className="fixed bottom-6 left-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#1fa855] text-white shadow-lift transition-transform hover:scale-105 md:grid"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </>
  );
}
