"use client";

import { useState } from "react";
import { Loader2, Search, AlertCircle, Check } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { Button, ButtonLink } from "@/src/components/ui/Button";
import { WhatsAppIcon } from "@/src/components/site/WhatsAppIcon";
import { whatsappHref } from "@/src/shared/utils/settings";
import { useSiteSettings } from "@/src/providers/SiteSettingsProvider";
import { arabicDate, egp, to12h } from "@/src/lib/format";
import { API_BASE_URL } from "@/src/shared/utils/site";
import { cn } from "@/src/shared/utils/utils";

interface Tracked {
  bookingNumber: string;
  status: string;
  device: string;
  area: string;
  slotDate: string;
  slotLabel: string;
  services: Array<{ name: string; price: string }>;
  transportFee: string;
  estimatedTotal: string;
}

const FLOW = [
  { key: "pending", label: "استلمنا الطلب" },
  { key: "confirmed", label: "اتأكد الميعاد" },
  { key: "on_the_way", label: "الفني في الطريق" },
  { key: "completed", label: "اتصلح" },
];

// Map every backend status onto the 4-step customer timeline
function stageOf(status: string): number {
  if (["completed", "paid", "done"].includes(status)) return 3;
  if (["assigned", "on_the_way", "in_progress", "arrived"].includes(status)) return 2;
  if (status === "confirmed") return 1;
  return 0;
}

const inputClass = "h-12 w-full rounded-xl bg-white px-4 text-[16px] ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400";

export default function TrackPage() {
  const settings = useSiteSettings();
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<Tracked | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !phone.trim()) return;
    setLoading(true);
    setError("");
    setBooking(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/track?code=${encodeURIComponent(code.trim().toUpperCase())}&phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 404 || res.status === 400 ? "مش لاقيين حجز بالرقم ده والموبايل ده. اتأكد منهم وجرّب تاني." : data.error);
      setBooking(data);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "حصلت مشكلة، جرّب تاني.");
    } finally {
      setLoading(false);
    }
  };

  const cancelled = booking && ["cancelled", "no_show", "rejected"].includes(booking.status);
  const stage = booking ? stageOf(booking.status) : 0;
  const [start = "", end = ""] = String(booking?.slotLabel || "").match(/\d{2}:\d{2}/g) || [];

  return (
    <>
      <PageHero
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "تتبع حجزك" }]}
        eyebrow="متابعة الحجز"
        title="حجزك وصل لفين؟"
        desc="اكتب رقم الحجز اللي وصلك (زي FM-2026-00101) ورقم موبايلك."
      />
      <Container className="max-w-2xl py-12 sm:py-16">
        <form onSubmit={submit} className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink-2">رقم الحجز</span>
              <input value={code} onChange={(e) => setCode(e.target.value)} dir="ltr" placeholder="FM-2026-00101" className={cn(inputClass, "num uppercase")} required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink-2">رقم الموبايل</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))} inputMode="numeric" dir="ltr" placeholder="01xxxxxxxxx" className={cn(inputClass, "num")} required />
            </label>
          </div>
          <Button type="submit" size="lg" className="mt-5 w-full" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            تابع الحجز
          </Button>
          {error && (
            <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}
            </p>
          )}
        </form>

        {booking && (
          <div className="mt-6 rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="num font-display text-xl font-bold" dir="ltr">{booking.bookingNumber}</h2>
              {cancelled && <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">ملغي</span>}
            </div>

            {!cancelled && (
              <ol className="mt-6 grid grid-cols-4 gap-2">
                {FLOW.map((f, i) => (
                  <li key={f.key} className="text-center">
                    <span className={cn("mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-bold", i <= stage ? "bg-brand-500 text-white" : "bg-paper text-ink-3")}>
                      {i < stage ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={cn("mt-2 block text-xs font-medium", i <= stage ? "text-ink" : "text-ink-3")}>{f.label}</span>
                  </li>
                ))}
              </ol>
            )}

            <dl className="mt-6 divide-y divide-line text-[15px]">
              <Row k="الجهاز" v={<span dir="ltr">{booking.device}</span>} />
              <Row k="الخدمة" v={booking.services.map((s) => s.name).join("، ")} />
              <Row k="الميعاد" v={<span className="num">{arabicDate(String(booking.slotDate), { weekday: "long", day: "numeric", month: "long" })}{start && ` · ${to12h(start)} – ${to12h(end)}`}</span>} />
              <Row k="المنطقة" v={booking.area} />
              <Row k="الإجمالي" v={<b className="num">{egp(booking.estimatedTotal)}</b>} />
            </dl>

            <ButtonLink href={whatsappHref(settings.whatsapp, `أهلاً، بسأل على الحجز ${booking.bookingNumber}`)} variant="whatsapp" className="mt-6 w-full" size="lg">
              <WhatsAppIcon className="h-5 w-5" /> عايز تعدل أو تسأل؟ كلمنا
            </ButtonLink>
          </div>
        )}
      </Container>
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-ink-3">{k}</dt>
      <dd className="text-end font-medium">{v}</dd>
    </div>
  );
}
