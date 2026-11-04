"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowLeft } from "lucide-react";
import type { DeviceType, PriceMatrix, PriceCell } from "@/src/lib/api";
import { cellPrice } from "@/src/lib/api";
import { egp, warrantyLabel } from "@/src/lib/format";
import { cn } from "@/src/shared/utils/utils";
import { DeviceImage, kindOf } from "@/src/components/ui/DeviceImage";

function PriceTag({ cell, compact }: { cell?: PriceCell; compact?: boolean }) {
  if (!cell || cell.status === "unavailable") return <span className="text-ink-3">—</span>;
  if (cell.status === "included") return <span className="text-sm font-semibold text-[#12a150]">مجاناً</span>;
  const price = cellPrice(cell);
  if (price === null) return <span className="text-sm text-ink-2">بعد الفحص</span>;
  const original = Number(cell.price);
  return (
    <span className="inline-flex flex-col items-center leading-tight">
      <span className={cn("num font-semibold text-ink", compact ? "text-[15px]" : "text-base")}>{egp(price)}</span>
      {price < original && <span className="num text-xs text-ink-3 line-through">{egp(original)}</span>}
    </span>
  );
}

export function PriceExplorer({ data }: { data: Array<{ type: DeviceType; matrix: PriceMatrix }> }) {
  const [typeSlug, setTypeSlug] = useState(data[0]?.type.slug);
  const [q, setQ] = useState("");
  const current = data.find((d) => d.type.slug === typeSlug) || data[0];

  const series = useMemo(() => {
    if (!current) return [];
    const query = q.trim().toLowerCase();
    return current.matrix.series
      .map((s) => ({ ...s, models: s.models.filter((m) => !query || m.name.toLowerCase().includes(query)) }))
      .filter((s) => s.models.length > 0);
  }, [current, q]);

  if (!current) return <p className="py-16 text-center text-ink-2">الأسعار هتنزل قريب. كلمنا واتساب وهنقولك السعر على طول.</p>;
  const cols = current.matrix.columns;

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-4 mb-6 bg-paper/90 px-4 py-3 backdrop-blur-xl sm:top-20 sm:mx-0 sm:rounded-2xl sm:px-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar" role="tablist">
            {data.map(({ type }) => (
              <button
                key={type.slug}
                role="tab"
                aria-selected={type.slug === current.type.slug}
                onClick={() => setTypeSlug(type.slug)}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  type.slug === current.type.slug ? "bg-ink text-white" : "bg-white text-ink-2 ring-1 ring-line hover:text-ink",
                )}
              >
                {type.name_en}
              </button>
            ))}
          </div>
          <label className="relative block sm:w-72">
            <span className="sr-only">ابحث عن موديلك</span>
            <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن موديلك… 14 Pro"
              className="h-11 w-full rounded-full bg-white pe-10 ps-10 text-[15px] ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="مسح البحث" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      {series.length === 0 && <p className="rounded-2xl bg-white p-10 text-center text-ink-2">مفيش موديل بالاسم ده. جرّب تكتب الرقم بس، مثلاً «13».</p>}

      <div className="space-y-10">
        {series.map((s) => (
          <section key={s.title}>
            <h2 className="mb-4 font-display text-xl font-semibold" dir="auto">{s.title}</h2>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink/5 md:block">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b border-line bg-paper/60 text-sm text-ink-2">
                    <th className="px-5 py-3.5 text-start font-semibold">الموديل</th>
                    {cols.map((c) => (
                      <th key={c.slug} className="px-3 py-3.5 font-semibold">{c.name_ar}</th>
                    ))}
                    <th className="w-24" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {s.models.map((m) => (
                    <tr key={m.id} className="transition-colors hover:bg-brand-50/40">
                      <td className="px-5 py-3 text-start font-semibold">
                        <span className="flex items-center gap-3">
                          <DeviceImage src={m.imageUrl} alt={m.name} kind={kindOf(current.type.slug)} className="h-11 w-11 shrink-0 rounded-lg bg-paper" />
                          <span dir="ltr">{m.name}</span>
                        </span>
                      </td>
                      {cols.map((c) => (
                        <td key={c.slug} className="px-3 py-4"><PriceTag cell={m.cells[c.slug]} /></td>
                      ))}
                      <td className="px-3">
                        <Link href={`/book?model=${m.id}`} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-600 hover:bg-brand-500 hover:text-white">
                          احجز <ArrowLeft className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
              {s.models.map((m) => (
                <article key={m.id} className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-ink/5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <DeviceImage src={m.imageUrl} alt={m.name} kind={kindOf(current.type.slug)} className="h-12 w-12 shrink-0 rounded-xl bg-paper" />
                      <h3 className="font-display text-lg font-semibold" dir="ltr">{m.name}</h3>
                    </span>
                    <Link href={`/book?model=${m.id}`} className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3.5 py-1.5 text-sm font-semibold text-white">
                      احجز <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <ul className="mt-3 divide-y divide-line">
                    {cols.map((c) => {
                      const cell = m.cells[c.slug];
                      if (!cell || cell.status === "unavailable") return null;
                      return (
                        <li key={c.slug} className="flex items-center justify-between py-2.5">
                          <span>
                            <span className="block text-[15px]">{c.name_ar}</span>
                            {cell.warrantyDays ? <span className="text-xs text-ink-3">{warrantyLabel(cell.warrantyDays)}</span> : null}
                          </span>
                          <PriceTag cell={cell} compact />
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
