"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft, ArrowRight, Check, Search, MapPin, Clock, ShieldCheck, Navigation, Home, Building2,
  Loader2, AlertCircle, ChevronDown, CalendarX2,
} from "lucide-react";
import type { Area, DeviceType, PriceMatrix } from "@/src/lib/api";
import { cellPrice } from "@/src/lib/api";
import { addDays, arabicDate, cairoToday, egp, periodName, to12h, warrantyLabel, WEEKDAYS_AR } from "@/src/lib/format";
import { API_BASE_URL } from "@/src/shared/utils/site";
import { whatsappHref } from "@/src/shared/utils/settings";
import { useSiteSettings } from "@/src/providers/SiteSettingsProvider";
import { cn } from "@/src/shared/utils/utils";
import { DeviceImage, kindOf } from "@/src/components/ui/DeviceImage";

interface Props {
  catalog: Array<{ type: DeviceType; matrix: PriceMatrix }>;
  areas: Area[];
}

interface Slot { id: string; startTime: string; endTime: string; label: string; remaining: number; available: boolean }
interface DaySummary { date: string; configured: boolean; closed: boolean; remaining: number | null }

const STEPS = ["الجهاز", "العطل", "الميعاد", "بياناتك"];
const DEFAULT_SLOTS = [
  { start: "10:00", end: "13:00" },
  { start: "13:00", end: "16:00" },
  { start: "16:00", end: "19:00" },
];

const inputClass =
  "h-12 w-full rounded-xl bg-white px-4 text-[16px] ring-1 ring-line outline-none transition-shadow placeholder:text-ink-3 focus:ring-2 focus:ring-brand-400";

export function BookingFlow({ catalog, areas }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const settings = useSiteSettings();
  const topRef = useRef<HTMLDivElement>(null);

  // Preselection from links like /book?model=…&service=…&area=…
  const urlModel = params.get("model");
  const urlService = params.get("service");
  const urlArea = params.get("area");

  const initialType =
    catalog.find((c) => c.matrix.series.some((s) => s.models.some((m) => m.id === urlModel || m.slug === urlModel)))?.type.slug ||
    catalog[0]?.type.slug ||
    "";

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [typeSlug, setTypeSlug] = useState(initialType);
  const [modelQuery, setModelQuery] = useState("");
  const [modelId, setModelId] = useState<string | null>(null);
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  const [areaId, setAreaId] = useState<string | null>(areas.find((a) => a.slug === urlArea)?.id || null);
  const [areaQuery, setAreaQuery] = useState("");
  const [areaOpen, setAreaOpen] = useState(!urlArea);
  const [date, setDate] = useState<string | null>(null);
  const [slotKey, setSlotKey] = useState<string | null>(null);
  const [days, setDays] = useState<DaySummary[] | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState<"home" | "office">("home");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const current = catalog.find((c) => c.type.slug === typeSlug) || catalog[0];
  const models = useMemo(() => current?.matrix.series.flatMap((s) => s.models.map((m) => ({ ...m, series: s.title }))) || [], [current]);
  const model = models.find((m) => m.id === modelId) || null;
  const area = areas.find((a) => a.id === areaId) || null;

  // Apply ?model= once the catalog is known; jump straight to services
  useEffect(() => {
    if (!urlModel) return;
    const found = models.find((m) => m.id === urlModel || m.slug === urlModel);
    if (found) {
      setModelId(found.id);
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const services = useMemo(() => {
    if (!current || !model) return [];
    return current.matrix.columns.flatMap((col) => {
      const cell = model.cells[col.slug];
      if (!cell || (cell.status !== "available" && cell.status !== "on_request")) return [];
      const price = cellPrice(cell);
      const original = cell.price ? Number(cell.price) : null;
      return [{ id: col.id, slug: col.slug, name: col.name_ar, minutes: col.estimatedMinutes, warranty: cell.warrantyDays, note: cell.note_ar || col.description_ar, image: col.imageUrl, price, original }];
    });
  }, [current, model]);

  // Keep only services the chosen model offers; preselect from ?service=
  useEffect(() => {
    setServiceIds((cur) => {
      const kept = cur.filter((id) => services.some((s) => s.id === id));
      if (kept.length) return kept;
      const fromUrl = services.find((s) => s.slug === urlService);
      return fromUrl ? [fromUrl.id] : [];
    });
  }, [services, urlService]);

  const chosen = services.filter((s) => serviceIds.includes(s.id));
  const servicesTotal = chosen.reduce((sum, s) => sum + (s.price ?? 0), 0);
  const hasOnRequest = chosen.some((s) => s.price === null);
  const fee = Number(area?.transport_fee || 0);
  const total = servicesTotal + (area ? fee : 0);

  // Upcoming days for the chosen area (closed / full days greyed out)
  const daysAhead = Math.min(30, Math.max(1, Number(settings.booking_days_ahead) || 7));
  useEffect(() => {
    if (!area) return;
    let cancelled = false;
    setDays(null);
    fetch(`${API_BASE_URL}/bookings/availability?area_id=${area.id}&from=${cairoToday()}&days=${daysAhead}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: DaySummary[] | null) => {
        if (cancelled) return;
        const list = Array.isArray(d) ? d : Array.from({ length: daysAhead }, (_, i) => ({ date: addDays(cairoToday(), i), configured: false, closed: false, remaining: null }));
        setDays(list);
        setDate((cur) => (cur && list.some((x) => x.date === cur && !x.closed && x.remaining !== 0) ? cur : list.find((x) => !x.closed && x.remaining !== 0)?.date || null));
      })
      .catch(() => !cancelled && setDays([]));
    return () => {
      cancelled = true;
    };
  }, [area, daysAhead]);

  // Live slots + remaining capacity for the chosen day
  useEffect(() => {
    if (!area || !date) return;
    let cancelled = false;
    setSlotsLoading(true);
    fetch(`${API_BASE_URL}/bookings/availability?area_id=${area.id}&date=${date}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        const list: Slot[] | null = d?.configured ? d.slots : null;
        setSlots(list);
        setSlotKey((cur) => {
          if (list) return list.some((s) => s.id === cur && s.available) ? cur : list.find((s) => s.available)?.id || null;
          return cur && DEFAULT_SLOTS.some((s) => `${s.start} - ${s.end}` === cur) ? cur : null;
        });
      })
      .catch(() => !cancelled && setSlots(null))
      .finally(() => !cancelled && setSlotsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [area, date]);

  const slotOptions = slots
    ? slots.map((s) => ({ key: s.id, id: s.id as string | null, start: s.startTime, end: s.endTime, available: s.available, remaining: s.remaining }))
    : DEFAULT_SLOTS.map((s) => ({ key: `${s.start} - ${s.end}`, id: null as string | null, start: s.start, end: s.end, available: true, remaining: undefined as number | undefined }));
  const slot = slotOptions.find((s) => s.key === slotKey) || null;

  const phoneOk = /^01[0125][0-9]{8}$/.test(phone.trim());
  const emailOk = !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canNext = [!!model, chosen.length > 0, !!area && !!date && !!slot && !slotsLoading, name.trim().length >= 2 && phoneOk && emailOk && address.trim().length >= 5 && terms][step];

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    setError(null);
    setTouched(false);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return setError("المتصفح مش بيدعم تحديد الموقع، اكتب العنوان بس.");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setError("مقدرناش نوصل لموقعك. اسمح للمتصفح بالموقع أو اكتب العنوان بالتفصيل.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const submit = async () => {
    setTouched(true);
    if (!canNext || !model || !area || !date || !slot) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          whatsappNumber: phone.trim(),
          email: email.trim() || undefined,
          modelId: model.id,
          serviceIds,
          areaId: area.id,
          slotId: slot.id || undefined,
          slotDate: date,
          slotLabel: `${slot.start} - ${slot.end}`,
          address: address.trim(),
          propertyType,
          notes: notes.trim() || undefined,
          termsAccepted: terms,
          locationLat: location?.lat,
          locationLng: location?.lng,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "مقدرناش نسجل الحجز");
      sessionStorage.setItem(
        "focusfix_last_booking",
        JSON.stringify({
          bookingNumber: result.bookingNumber,
          confirmationToken: result.confirmationToken,
          customerName: name.trim(),
          device: model.name,
          services: chosen.map((s) => s.name),
          area: area.name_ar,
          slotDate: date,
          slotTime: `${slot.start} - ${slot.end}`,
          address: address.trim(),
          total,
        }),
      );
      router.push(`/book/success?bookingNumber=${encodeURIComponent(result.bookingNumber)}&token=${encodeURIComponent(result.confirmationToken)}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setError(msg && msg !== "Failed to fetch" ? msg : "حصلت مشكلة في الاتصال. جرّب تاني أو كلمنا واتساب.");
      setSubmitting(false);
    }
  };

  const filteredModels = models.filter((m) => m.name.toLowerCase().includes(modelQuery.trim().toLowerCase()));
  const filteredAreas = areas.filter((a) => !areaQuery.trim() || a.name_ar.includes(areaQuery.trim()) || a.name_en.toLowerCase().includes(areaQuery.trim().toLowerCase()));

  const summary = (
    <div className="space-y-3 text-[15px]">
      <Row label="الجهاز" value={model ? <span dir="ltr">{model.name}</span> : null} />
      <Row label="الخدمة" value={chosen.length ? chosen.map((s) => s.name).join("، ") : null} />
      <Row label="الميعاد" value={date && slot ? `${arabicDate(date, { weekday: "long", day: "numeric", month: "long" })} · ${to12h(slot.start)}` : null} />
      <Row label="المنطقة" value={area?.name_ar || null} />
      <div className="space-y-2 border-t border-line pt-3">
        {chosen.map((s) => (
          <div key={s.id} className="flex justify-between text-ink-2">
            <span>{s.name}</span>
            <span className="num">{s.price === null ? "بعد الفحص" : egp(s.price)}</span>
          </div>
        ))}
        {area && (
          <div className="flex justify-between text-ink-2">
            <span>الانتقال</span>
            <span className="num">{fee === 0 ? "مجاناً" : egp(fee)}</span>
          </div>
        )}
      </div>
      <div className="flex items-end justify-between border-t border-line pt-3">
        <span className="font-semibold">الإجمالي</span>
        <span className="num font-display text-2xl font-bold">{egp(total)}{hasOnRequest && <span className="text-sm font-normal text-ink-3"> +</span>}</span>
      </div>
      <p className="rounded-xl bg-[#e7f6ee] px-3 py-2.5 text-sm text-[#0f6b3a]">بتدفع بعد ما الفني يخلص وتجرب جهازك.</p>
    </div>
  );

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Progress */}
      <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="خطوات الحجز">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              disabled={i > step}
              onClick={() => i < step && go(i)}
              className="group w-full text-start disabled:cursor-default"
              aria-current={i === step ? "step" : undefined}
            >
              <span className="block h-1.5 overflow-hidden rounded-full bg-line">
                <motion.span className="block h-full rounded-full bg-brand-500" initial={false} animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} transition={{ duration: 0.4 }} />
              </span>
              <span className={cn("mt-2 flex items-center gap-1 text-[13px] font-semibold", i <= step ? "text-ink" : "text-ink-3")}>
                {i < step && <Check className="h-3.5 w-3.5 text-brand-500" />}
                {label}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="min-w-0 rounded-[1.75rem] bg-white p-5 shadow-soft ring-1 ring-ink/5 sm:p-8">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * 24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div>
                  <StepTitle title="جهازك إيه؟" desc="اختار النوع والموديل عشان نوريك الأسعار الصح." />
                  <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
                    {catalog.map(({ type, matrix }) => (
                      <button
                        key={type.slug}
                        type="button"
                        aria-pressed={type.slug === typeSlug}
                        onClick={() => {
                          setTypeSlug(type.slug);
                          setModelId(null);
                          setModelQuery("");
                        }}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-2xl p-3 ring-1 transition-all",
                          type.slug === typeSlug ? "bg-brand-50/70 ring-2 ring-brand-500" : "bg-paper/60 ring-transparent hover:ring-line",
                        )}
                      >
                        <DeviceImage src={type.image_url || matrix.deviceType.imageUrl} alt={type.name_ar} kind={kindOf(type.slug)} className="h-16 w-16 sm:h-20 sm:w-20" />
                        <span className="text-sm font-semibold">{type.name_en}</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                    <input value={modelQuery} onChange={(e) => setModelQuery(e.target.value)} placeholder="ابحث… مثلاً 13 Pro Max" className={cn(inputClass, "ps-11")} />
                  </div>
                  <div className="grid max-h-[26rem] grid-cols-2 gap-2 overflow-y-auto p-0.5 sm:grid-cols-3">
                    {filteredModels.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setModelId(m.id);
                          setDir(1);
                          setTimeout(() => go(1), 180);
                        }}
                        aria-pressed={m.id === modelId}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center transition-all",
                          m.id === modelId ? "bg-brand-500 text-white shadow-[0_8px_20px_-10px_rgb(35_48_143/0.8)]" : "bg-paper/70 hover:bg-brand-50",
                        )}
                      >
                        <DeviceImage src={m.imageUrl} alt="" kind={kindOf(typeSlug)} className={cn("h-14 w-14 rounded-lg", m.id === modelId ? "bg-white" : "")} />
                        <span className="block text-[14px] font-semibold leading-tight" dir="ltr">{m.name}</span>
                      </button>
                    ))}
                    {filteredModels.length === 0 && (
                      <p className="col-span-full rounded-xl bg-paper p-6 text-center text-ink-2">
                        مش لاقي جهازك؟{" "}
                        <a className="font-semibold text-brand-600 underline" href={whatsappHref(settings.whatsapp, `أهلاً، عايز أصلح ${modelQuery}`)} target="_blank" rel="noopener noreferrer">ابعتلنا واتساب</a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <StepTitle title="إيه المشكلة؟" desc={<>اختار خدمة أو أكتر لـ <b dir="ltr">{model?.name}</b>.</>} />
                  {services.length === 0 ? (
                    <p className="rounded-xl bg-paper p-6 text-ink-2">
                      الموديل ده بنسعّره بعد الفحص.{" "}
                      <a className="font-semibold text-brand-600 underline" href={whatsappHref(settings.whatsapp, `أهلاً، عايز أصلح ${model?.name}`)} target="_blank" rel="noopener noreferrer">كلمنا واتساب</a>
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {services.map((s) => {
                        const on = serviceIds.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            role="checkbox"
                            aria-checked={on}
                            onClick={() => setServiceIds((cur) => (on ? cur.filter((x) => x !== s.id) : [...cur, s.id]))}
                            className={cn(
                              "flex w-full items-center gap-4 rounded-2xl p-4 text-start ring-1 transition-all",
                              on ? "bg-brand-50/70 ring-2 ring-brand-500" : "ring-line hover:ring-ink/20",
                            )}
                          >
                            <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors", on ? "border-brand-500 bg-brand-500 text-white" : "border-ink/20")}>
                              {on && <Check className="h-4 w-4" />}
                            </span>
                            {s.image && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={s.image} alt="" loading="lazy" className="hidden h-14 w-14 shrink-0 rounded-xl object-cover sm:block" />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold">{s.name}</span>
                              <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink-3">
                                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{s.minutes} دقيقة</span>
                                {s.warranty ? <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />{warrantyLabel(s.warranty)}</span> : null}
                              </span>
                              {s.note && <span className="mt-1 block text-[13px] text-ink-2">{s.note}</span>}
                            </span>
                            <span className="shrink-0 text-end">
                              {s.price === null ? (
                                <span className="text-sm text-ink-2">بعد الفحص</span>
                              ) : (
                                <>
                                  <span className="num block font-display text-lg font-bold">{egp(s.price)}</span>
                                  {s.original !== null && s.price < s.original && <span className="num block text-xs text-ink-3 line-through">{egp(s.original)}</span>}
                                </>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-7">
                  <StepTitle title="فين وإمتى؟" desc="الفني هيجيلك في المنطقة والميعاد اللي تختاره." className="mb-0" />

                  {/* Area */}
                  <section>
                    <Label>المنطقة</Label>
                    {area && !areaOpen ? (
                      <button type="button" onClick={() => setAreaOpen(true)} className="flex w-full items-center justify-between rounded-2xl bg-paper/70 px-4 py-3.5 text-start">
                        <span className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-brand-500" />
                          <span>
                            <span className="block font-semibold">{area.name_ar}</span>
                            <span className="num text-sm text-ink-3">{fee === 0 ? "انتقال مجاني" : `انتقال ${egp(fee)}`}</span>
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-brand-600">تغيير</span>
                      </button>
                    ) : (
                      <div>
                        <div className="relative mb-2">
                          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                          <input value={areaQuery} onChange={(e) => setAreaQuery(e.target.value)} placeholder="اكتب اسم منطقتك…" className={cn(inputClass, "ps-11")} />
                        </div>
                        <div className="grid max-h-64 gap-1.5 overflow-y-auto p-0.5 sm:grid-cols-2">
                          {filteredAreas.map((a) => (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => {
                                setAreaId(a.id);
                                setAreaOpen(false);
                                setAreaQuery("");
                              }}
                              className={cn("flex items-center justify-between rounded-xl px-4 py-3 text-start", a.id === areaId ? "bg-brand-500 text-white" : "bg-paper/70 hover:bg-brand-50")}
                            >
                              <span className="font-medium">{a.name_ar}</span>
                              <span className={cn("num text-xs", a.id === areaId ? "text-white/80" : "text-ink-3")}>{Number(a.transport_fee) === 0 ? "مجاني" : `+${egp(a.transport_fee)}`}</span>
                            </button>
                          ))}
                          {filteredAreas.length === 0 && (
                            <p className="col-span-full rounded-xl bg-paper p-4 text-center text-sm text-ink-2">
                              منطقتك مش في القايمة؟{" "}
                              <a className="font-semibold text-brand-600 underline" href={whatsappHref(settings.whatsapp, `أهلاً، بتوصلوا ${areaQuery}؟`)} target="_blank" rel="noopener noreferrer">اسألنا واتساب</a>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Day */}
                  {area && (
                    <section>
                      <Label>اليوم</Label>
                      {!days ? (
                        <div className="flex gap-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-[76px] w-[72px] shrink-0 animate-pulse rounded-2xl bg-paper" />)}</div>
                      ) : (
                        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:px-0">
                          {days.map((d, i) => {
                            const off = d.closed || d.remaining === 0;
                            const dow = new Date(`${d.date}T12:00:00Z`).getUTCDay();
                            return (
                              <button
                                key={d.date}
                                type="button"
                                disabled={off}
                                onClick={() => setDate(d.date)}
                                className={cn(
                                  "flex w-[72px] shrink-0 flex-col items-center rounded-2xl py-3 transition-all",
                                  d.date === date ? "bg-ink text-white" : off ? "bg-paper/50 text-ink-3" : "bg-paper/70 hover:bg-brand-50",
                                )}
                              >
                                <span className="text-xs">{i === 0 ? "النهارده" : i === 1 ? "بكرة" : WEEKDAYS_AR[dow]}</span>
                                <span className="num mt-1 font-display text-xl font-bold">{Number(d.date.slice(8))}</span>
                                <span className={cn("mt-0.5 text-[11px]", d.date === date ? "text-white/70" : "text-ink-3")}>{d.closed ? "إجازة" : d.remaining === 0 ? "محجوز" : arabicDate(d.date, { month: "short" })}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  )}

                  {/* Time */}
                  {area && date && (
                    <section>
                      <Label>الفترة</Label>
                      <div className={cn("grid gap-2 sm:grid-cols-3", slotsLoading && "pointer-events-none opacity-50")}>
                        {slotOptions.map((s) => (
                          <button
                            key={s.key}
                            type="button"
                            disabled={!s.available}
                            onClick={() => setSlotKey(s.key)}
                            className={cn(
                              "rounded-2xl p-4 text-start ring-1 transition-all",
                              s.key === slotKey ? "bg-brand-50/70 ring-2 ring-brand-500" : s.available ? "ring-line hover:ring-ink/20" : "bg-paper/50 text-ink-3 ring-transparent",
                            )}
                          >
                            <span className="block text-sm text-ink-3">{periodName(s.start)}</span>
                            <span className="num mt-0.5 block font-semibold">{to12h(s.start)} – {to12h(s.end)}</span>
                            <span className={cn("mt-1.5 block text-xs font-medium", !s.available ? "text-ink-3" : s.remaining === 1 ? "text-accent-600" : "text-[#12a150]")}>
                              {!s.available ? "محجوزة" : s.remaining === 1 ? "آخر مكان" : "متاحة"}
                            </span>
                          </button>
                        ))}
                      </div>
                      {slots && !slots.some((s) => s.available) && !slotsLoading && (
                        <p className="mt-3 flex items-center gap-2 rounded-xl bg-accent-50 p-3 text-sm text-accent-600"><CalendarX2 className="h-4 w-4" />اليوم ده اتحجز كله، اختار يوم تاني.</p>
                      )}
                    </section>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <StepTitle title="آخر خطوة" desc="هنكلمك على الرقم ده عشان نأكد الميعاد." className="mb-1" />
                  <Field label="اسمك" error={touched && name.trim().length < 2 ? "اكتب اسمك" : null}>
                    <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="مثلاً: أحمد محمود" className={inputClass} />
                  </Field>
                  <Field label="رقم الموبايل (وعليه واتساب)" error={touched && !phoneOk ? "رقم مصري 11 رقم بيبدأ بـ 01" : null}>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 11))}
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      className={cn(inputClass, "num text-start")}
                    />
                  </Field>
                  <Field label="العنوان بالتفصيل" error={touched && address.trim().length < 5 ? "اكتب الشارع ورقم العمارة" : null}>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" rows={2} placeholder="الشارع، رقم العمارة، الدور، الشقة" className={cn(inputClass, "h-auto py-3")} />
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {([["home", "بيت", Home], ["office", "شغل", Building2]] as const).map(([v, l, Icon]) => (
                        <button key={v} type="button" onClick={() => setPropertyType(v)} className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm", propertyType === v ? "bg-ink text-white" : "bg-paper text-ink-2")}>
                          <Icon className="h-4 w-4" />{l}
                        </button>
                      ))}
                      <button type="button" onClick={useMyLocation} className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm", location ? "bg-[#e7f6ee] text-[#0f6b3a]" : "bg-brand-50 text-brand-700")}>
                        {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : location ? <Check className="h-4 w-4" /> : <Navigation className="h-4 w-4" />}
                        {location ? "اتحدد موقعك" : "ابعت موقعي"}
                      </button>
                    </div>
                  </Field>
                  <details className="group rounded-xl bg-paper/60 px-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-sm font-semibold text-ink-2 [&::-webkit-details-marker]:hidden">
                      إيميل وملاحظات (اختياري)
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="space-y-4 pb-4">
                      <Field label="الإيميل — هيوصلك عليه تأكيد الحجز" error={!emailOk ? "الإيميل مش مظبوط" : null}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" dir="ltr" placeholder="name@example.com" className={cn(inputClass, "text-start")} />
                      </Field>
                      <Field label="ملاحظات للفني">
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="أي تفاصيل عن العطل أو المكان" className={cn(inputClass, "h-auto py-3")} />
                      </Field>
                    </div>
                  </details>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
                    <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-5 w-5 accent-brand-500" />
                    <span>موافق على <a href="/warranty" target="_blank" className="font-semibold text-brand-600 underline">شروط الخدمة والضمان</a></span>
                  </label>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          {/* Desktop nav */}
          <div className="mt-8 hidden items-center justify-between border-t border-line pt-6 lg:flex">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-ink-2 hover:bg-paper">
                <ArrowRight className="h-4 w-4" /> رجوع
              </button>
            ) : <span />}
            <NextButton step={step} canNext={!!canNext} submitting={submitting} onNext={() => (step < 3 ? go(step + 1) : submit())} onBlocked={() => setTouched(true)} />
          </div>
        </div>

        {/* Desktop summary */}
        <aside className="hidden rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 lg:sticky lg:top-24 lg:block">
          <h2 className="mb-4 font-display text-lg font-semibold">ملخص الحجز</h2>
          {summary}
        </aside>
      </div>

      {/* Mobile sticky bar */}
      <MobileBar
        step={step}
        total={total}
        hasOnRequest={hasOnRequest}
        summary={summary}
        canNext={!!canNext}
        submitting={submitting}
        onBack={() => go(step - 1)}
        onNext={() => (step < 3 ? go(step + 1) : submit())}
        onBlocked={() => setTouched(true)}
      />
    </div>
  );
}

function NextButton({ step, canNext, submitting, onNext, onBlocked, className }: { step: number; canNext: boolean; submitting: boolean; onNext: () => void; onBlocked: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => (canNext ? onNext() : onBlocked())}
      disabled={submitting}
      aria-disabled={!canNext}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 font-semibold text-white transition-all",
        canNext ? "bg-brand-500 hover:bg-brand-600 shadow-[0_8px_20px_-8px_rgb(35_48_143/0.6)]" : "bg-ink/25",
        className,
      )}
    >
      {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
      {step === 3 ? (submitting ? "بنأكد حجزك…" : "أكد الحجز") : "التالي"}
      {!submitting && <ArrowLeft className="h-4 w-4" />}
    </button>
  );
}

function MobileBar(props: { step: number; total: number; hasOnRequest: boolean; summary: React.ReactNode; canNext: boolean; submitting: boolean; onBack: () => void; onNext: () => void; onBlocked: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[1.75rem] bg-white p-5 pb-28 lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />
              <h2 className="mb-4 font-display text-lg font-semibold">ملخص الحجز</h2>
              {props.summary}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          {props.step > 0 && (
            <button type="button" onClick={props.onBack} aria-label="رجوع" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper">
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
          <button type="button" onClick={() => setOpen((v) => !v)} className="min-w-0 flex-1 text-start">
            <span className="block text-xs text-ink-3">الإجمالي · اضغط للتفاصيل</span>
            <span className="num font-display text-xl font-bold">{egp(props.total)}{props.hasOnRequest && "+"}</span>
          </button>
          <NextButton step={props.step} canNext={props.canNext} submitting={props.submitting} onNext={props.onNext} onBlocked={props.onBlocked} className="px-6" />
        </div>
      </div>
    </>
  );
}

function StepTitle({ title, desc, className }: { title: string; desc?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-2xl font-bold sm:text-[28px]">{title}</h2>
      {desc && <p className="mt-1.5 text-ink-2">{desc}</p>}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-sm font-semibold text-ink-2">{children}</h3>;
}

function Field({ label, error, children }: { label: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink-2">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode | null }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-ink-3">{label}</span>
      <span className={cn("text-end font-medium", !value && "text-ink-3")}>{value || "—"}</span>
    </div>
  );
}
