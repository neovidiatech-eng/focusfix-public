"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, CalendarPlus, Search, Phone, Wrench, Home } from "lucide-react";
import { Container } from "@/src/components/ui/Section";
import { ButtonLink } from "@/src/components/ui/Button";
import { WhatsAppIcon } from "@/src/components/site/WhatsAppIcon";
import { whatsappHref } from "@/src/shared/utils/settings";
import { useSiteSettings } from "@/src/providers/SiteSettingsProvider";
import { arabicDate, egp, to12h } from "@/src/lib/format";
import { API_BASE_URL } from "@/src/shared/utils/site";

interface Order {
  bookingNumber: string;
  device?: string;
  services?: string[];
  area?: string;
  slotDate?: string;
  slotTime?: string;
  address?: string;
  total?: number;
}

function SuccessContent() {
  const settings = useSiteSettings();
  const params = useSearchParams();
  const token = params.get("token");
  const number = params.get("bookingNumber") || "";
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("focusfix_last_booking") || "null");
      if (saved && (!number || saved.bookingNumber === number)) return setOrder(saved);
    } catch {
      // corrupted storage — fall through to the API
    }
    // Opened on another device: load the booking by its confirmation token
    if (!token) return;
    fetch(`${API_BASE_URL}/bookings/confirmation/${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => {
        if (!b) return;
        setOrder({
          bookingNumber: b.bookingNumber,
          device: b.device,
          area: b.area,
          slotDate: String(b.slotDate).slice(0, 10),
          slotTime: b.slotLabel,
          total: Number(b.estimatedTotal),
          services: (b.services || []).map((x: { name: string }) => x.name),
        });
      })
      .catch(() => {});
  }, [number, token]);

  const bookingNumber = order?.bookingNumber || number;
  const [start = "", end = ""] = String(order?.slotTime || "").match(/\d{2}:\d{2}/g) || [];

  const downloadIcs = () => {
    const day = String(order?.slotDate || "").replace(/-/g, "");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//FocusFix//Appointment//AR",
      "BEGIN:VEVENT",
      `UID:${bookingNumber}@focusfix.net`,
      `DTSTAMP:${stamp}`,
      day && start ? `DTSTART;TZID=Africa/Cairo:${day}T${start.replace(":", "")}00` : "",
      day && end ? `DTEND;TZID=Africa/Cairo:${day}T${end.replace(":", "")}00` : "",
      `SUMMARY:زيارة فني FocusFix (${bookingNumber})`,
      `DESCRIPTION:صيانة ${order?.device || "جهازك"}`,
      `LOCATION:${order?.address || order?.area || ""}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].filter(Boolean).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = `${bookingNumber}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="grain min-h-screen pt-28 pb-32 sm:pt-36">
      <Container className="max-w-2xl">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#12a150] text-white shadow-[0_12px_30px_-10px_rgb(18_161_80/0.7)]"
          >
            <Check className="h-10 w-10" strokeWidth={3} />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">حجزك وصلنا!</h1>
          <p className="mt-3 text-lg text-ink-2">هنكلمك قريب عشان نأكد الميعاد. احتفظ برقم الحجز عشان تتابعه.</p>
          <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border-2 border-dashed border-brand-200 bg-white px-8 py-4">
            <span className="text-xs text-ink-3">رقم الحجز</span>
            <span className="num mt-1 font-display text-2xl font-bold tracking-wider" dir="ltr">{bookingNumber}</span>
          </div>
        </div>

        {order && (
          <div className="mt-8 rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5">
            <dl className="divide-y divide-line text-[15px]">
              {order.device && <Item k="الجهاز" v={<span dir="ltr">{order.device}</span>} />}
              {order.services?.length ? <Item k="الخدمة" v={order.services.join("، ")} /> : null}
              {order.slotDate && <Item k="اليوم" v={arabicDate(order.slotDate, { weekday: "long", day: "numeric", month: "long" })} />}
              {start && <Item k="الفترة" v={<span className="num">{to12h(start)} – {to12h(end)}</span>} />}
              {order.area && <Item k="المنطقة" v={order.area} />}
              {order.total !== undefined && <Item k="الإجمالي التقديري" v={<b className="num">{egp(order.total)}</b>} />}
            </dl>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ButtonLink href={whatsappHref(settings.whatsapp, `أهلاً FocusFix، عملت حجز رقم ${bookingNumber}`)} variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-5 w-5" /> تابع معانا واتساب
          </ButtonLink>
          <button onClick={downloadIcs} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white font-semibold ring-1 ring-line hover:ring-ink/20">
            <CalendarPlus className="h-5 w-5" /> ضيف الميعاد للتقويم
          </button>
        </div>

        <div className="mt-10 rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <h2 className="font-display text-xl font-semibold">اللي جاي</h2>
          <ol className="mt-5 space-y-5">
            {[
              { icon: Phone, t: "هنكلمك نأكد", d: "خلال ساعات العمل هنتصل بيك نأكد الميعاد والعنوان." },
              { icon: Wrench, t: "الفني يوصلك", d: "بيكلمك قبل ما يوصل، ويصلح جهازك قدامك." },
              { icon: Check, t: "جرّب وادفع", d: "بعد ما تتأكد إن كل حاجة تمام، بتدفع وتستلم الضمان." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10"><Icon className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-white/70">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-brand-600">
          <Link href="/track" className="inline-flex items-center gap-1.5 hover:underline"><Search className="h-4 w-4" />تتبع حجزك</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 hover:underline"><Home className="h-4 w-4" />الرئيسية</Link>
        </div>
      </Container>
    </div>
  );
}

function Item({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-ink-3">{k}</dt>
      <dd className="text-end font-medium">{v}</dd>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}
