"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, ArrowLeft, Clock, ShieldCheck, ChevronDown } from "lucide-react";
import type { PriceMatrix, DeviceType } from "@/src/lib/api";
import { cellPrice } from "@/src/lib/api";
import { egp, warrantyLabel } from "@/src/lib/format";
import { cn } from "@/src/shared/utils/utils";

interface Props {
  data: Array<{ type: DeviceType; matrix: PriceMatrix }>;
}

/** Pick a device → see every service price for it, with a one-tap booking link */
export function PriceChecker({ data }: Props) {
  const [typeSlug, setTypeSlug] = useState(data[0]?.type.slug || "");
  const current = data.find((d) => d.type.slug === typeSlug) || data[0];
  const models = useMemo(() => current?.matrix.series.flatMap((s) => s.models) || [], [current]);
  const [modelId, setModelId] = useState<string>(models[0]?.id || "");
  const [query, setQuery] = useState("");
  const [picking, setPicking] = useState(false);
  const model = models.find((m) => m.id === modelId) || models[0];

  const filtered = models.filter((m) => m.name.toLowerCase().includes(query.trim().toLowerCase()));

  if (!current || !model) return null;

  const rows = current.matrix.columns
    .map((col) => ({ col, cell: model.cells[col.slug] }))
    .filter(({ cell }) => cell && cell.status !== "unavailable");

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-ink/5">
      <div className="border-b border-line p-4 sm:p-6">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="نوع الجهاز">
          {data.map(({ type }) => (
            <button
              key={type.slug}
              role="tab"
              aria-selected={type.slug === current.type.slug}
              onClick={() => {
                setTypeSlug(type.slug);
                const first = data.find((d) => d.type.slug === type.slug)?.matrix.series[0]?.models[0];
                setModelId(first?.id || "");
                setQuery("");
              }}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                type.slug === current.type.slug ? "bg-ink text-white" : "bg-paper text-ink-2 hover:text-ink",
              )}
            >
              {type.name_en}
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => setPicking((v) => !v)}
            aria-expanded={picking}
            className="flex w-full items-center justify-between rounded-2xl border border-line bg-paper/60 px-4 py-3.5 text-start transition-colors hover:border-ink/20"
          >
            <span>
              <span className="block text-xs text-ink-3">موديل جهازك</span>
              <span className="mt-0.5 block font-display text-lg font-semibold" dir="ltr">{model.name}</span>
            </span>
            <ChevronDown className={cn("h-5 w-5 text-ink-3 transition-transform", picking && "rotate-180")} />
          </button>

          <AnimatePresence>
            {picking && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-x-0 top-full z-20 mt-2 rounded-2xl bg-white p-2 shadow-lift ring-1 ring-ink/10"
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="اكتب الموديل… مثلاً 13 Pro"
                    className="w-full rounded-xl bg-paper py-2.5 pe-3 ps-9 text-[15px] outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <ul className="mt-2 max-h-64 overflow-y-auto">
                  {filtered.length === 0 && <li className="px-3 py-4 text-center text-sm text-ink-3">مفيش موديل بالاسم ده</li>}
                  {filtered.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setModelId(m.id);
                          setPicking(false);
                          setQuery("");
                        }}
                        className={cn(
                          "w-full rounded-lg px-3 py-2.5 text-start text-[15px] hover:bg-paper",
                          m.id === model.id && "bg-brand-50 font-semibold text-brand-700",
                        )}
                        dir="ltr"
                      >
                        {m.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={model.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="divide-y divide-line"
        >
          {rows.length === 0 && <li className="p-6 text-center text-ink-3">الأسعار للموديل ده بتتحدد بعد الفحص — كلمنا واتساب.</li>}
          {rows.map(({ col, cell }) => {
            const price = cellPrice(cell);
            const original = cell?.price ? Number(cell.price) : null;
            const discounted = price !== null && original !== null && price < original;
            return (
              <li key={col.slug} className="flex items-center gap-3 px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{col.name_ar}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{col.estimatedMinutes} دقيقة</span>
                    {cell?.warrantyDays ? <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />{warrantyLabel(cell.warrantyDays)}</span> : null}
                  </p>
                </div>
                <div className="text-end">
                  {cell?.status === "included" ? (
                    <span className="text-sm font-semibold text-[#12a150]">مجاناً مع الخدمة</span>
                  ) : price !== null ? (
                    <>
                      <p className="num font-display text-lg font-bold text-ink">{egp(price)}</p>
                      {discounted && <p className="num text-xs text-ink-3 line-through">{egp(original)}</p>}
                    </>
                  ) : (
                    <span className="text-sm font-medium text-ink-2">بعد الفحص</span>
                  )}
                </div>
                <Link
                  href={`/book?model=${model.id}&service=${col.slug}`}
                  aria-label={`احجز ${col.name_ar}`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors hover:bg-brand-500 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>

      <div className="flex flex-col gap-3 bg-paper/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-ink-2">السعر شامل القطعة والتركيب. رسوم الانتقال حسب منطقتك.</p>
        <Link href="/prices" className="text-sm font-semibold text-brand-600 hover:underline">كل الأسعار ←</Link>
      </div>
    </div>
  );
}
