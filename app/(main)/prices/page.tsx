'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  ArrowLeft,
  MapPin,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { InnerHero } from '@/src/shared/components/ui/InnerHero';
import { useTranslation } from 'react-i18next';

interface ServiceColumn {
  id: string;
  slug: string;
  name_ar: string;
  name_en?: string;
  estimatedMinutes?: number;
}

interface PriceCell {
  id?: string;
  price: number;
  discountPrice?: number | null;
  warrantyDays?: number;
  status: string;
}

interface PriceModel {
  id: string;
  name: string;
  slug?: string;
  cells: Record<string, PriceCell>;
}

interface PriceSeries {
  series: string;
  models: PriceModel[];
}

interface AreaItem {
  name: string;
  city: string;
  fee: string;
}

export default function PricesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'iphone' | 'ipad' | 'watch'>('iphone');
  const [isLoading, setIsLoading] = useState(true);

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || 'https://foucs.agro-plus.net/api/v1';

  const [columns, setColumns] = useState<ServiceColumn[]>([]);
  const [seriesData, setSeriesData] = useState<PriceSeries[]>([]);
  const [areasFees, setAreasFees] = useState<AreaItem[]>([]);

  // Load Areas from API
  useEffect(() => {
    fetch(`${apiBase}/areas`)
      .then((r) => r.json())
      .then((areas) => {
        if (Array.isArray(areas) && areas.length > 0) {
          setAreasFees(
            areas.map((a: any) => ({
              name: a.name_ar,
              city: a.city_ar,
              fee: Number(a.transport_fee) === 0 ? 'مجاناً 0 ج.م' : `${a.transport_fee} ج.م`,
            }))
          );
        }
      })
      .catch(() => {});
  }, [apiBase]);

  // Load Pricing Matrix from API for selected Device Type
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const typeSlug = activeTab === 'watch' ? 'apple-watch' : activeTab;

    fetch(`${apiBase}/pricing?type=${typeSlug}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;

        if (data?.columns && Array.isArray(data.columns) && data.columns.length > 0) {
          setColumns(
            data.columns.map((c: any) => ({
              id: c.id,
              slug: c.slug,
              name_ar: c.name_ar,
              name_en: c.name_en,
              estimatedMinutes: c.estimatedMinutes,
            }))
          );
        }

        if (data?.series && Array.isArray(data.series) && data.series.length > 0) {
          const mappedSeries: PriceSeries[] = data.series.map((sGroup: any) => ({
            series: sGroup.title || 'سلسلة الأجهزة',
            models: (sGroup.models || []).map((m: any) => {
              const cellsMap: Record<string, PriceCell> = {};
              if (m.cells) {
                Object.entries(m.cells).forEach(([slug, val]: [string, any]) => {
                  cellsMap[slug] = {
                    id: val.id,
                    price: Number(val.price || 0),
                    discountPrice: val.discountPrice ? Number(val.discountPrice) : null,
                    warrantyDays: val.warrantyDays || 180,
                    status: val.status || 'available',
                  };
                });
              }
              return {
                id: m.id,
                name: m.name,
                slug: m.slug,
                cells: cellsMap,
              };
            }),
          }));

          setSeriesData(mappedSeries);
        } else {
          setSeriesData([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load live prices:', err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiBase, activeTab]);

  // Filter models
  const cleanSearch = search.toLowerCase().replace(/\s+/g, '');
  const filteredSeries = useMemo(() => {
    return seriesData
      .map((s) => ({
        ...s,
        models: s.models.filter((m) =>
          m.name.toLowerCase().replace(/\s+/g, '').includes(cleanSearch)
        ),
      }))
      .filter((s) => s.models.length > 0);
  }, [seriesData, cleanSearch]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <InnerHero
        breadcrumb={[
          { label: t('nav.home', 'الرئيسية'), href: '/' },
          { label: t('pricesPage.title', 'أسعار الصيانة') },
        ]}
        badge={t('pricesPage.badge', 'ضمان معتمد حتى سنة')}
        badgeIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        title={t('pricesPage.title', 'قائمة أسعار صيانة أجهزة Apple')}
        highlightedTitle={t('pricesPage.highlight', 'شفافة ومحددة مسبقاً')}
        description={t(
          'pricesPage.desc',
          'أسعار قطع الغيار الأصلية المعتمدة مع خدمة الصيانة في منزلك وضمان مكتوب فور انتهاء الإصلاح.'
        )}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-10">
        {/* Search & Tabs Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('pricesPage.searchPlaceholder', 'ابحث عن موديل جهازك...')}
              className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Device Tabs */}
          <div className="flex gap-2 w-full md:w-auto">
            {[
              { id: 'iphone', label: 'iPhone' },
              { id: 'ipad', label: 'iPad' },
              { id: 'watch', label: 'Apple Watch' },
            ].map((tItem) => (
              <button
                key={tItem.id}
                onClick={() => setActiveTab(tItem.id as any)}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === tItem.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tItem.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && seriesData.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm">
            <RefreshCw className="w-7 h-7 text-emerald-600 animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800">جاري تحميل الأسعار الحية المحدثة...</p>
            <p className="text-xs text-slate-400 mt-1">يتم جلب قائمة الأسعار الرسمية والضمان من الخادم مباشرة</p>
          </div>
        ) : (
          /* Pricing Tables Grouped by Series */
          <div className="space-y-8">
            {filteredSeries.length > 0 ? (
              filteredSeries.map((sGroup) => (
                <div
                  key={sGroup.series}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Series Banner */}
                  <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
                    <h2 className="font-bold text-sm tracking-wide">{sGroup.series}</h2>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {t('pricesPage.seriesBadge', 'أسعار حية وضمان معتمد')}
                    </span>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-right text-sm border-collapse">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs">
                        <tr>
                          <th className="py-3 px-5">{t('pricesPage.colModel', 'الموديل')}</th>
                          {columns.map((col) => (
                            <th key={col.id} className="py-3 px-4 text-center">
                              <div>{col.name_ar}</div>
                              {col.estimatedMinutes && (
                                <div className="text-[10px] text-slate-400 font-normal">
                                  ~{col.estimatedMinutes} دقيقة
                                </div>
                              )}
                            </th>
                          ))}
                          <th className="py-3 px-5 text-center">{t('pricesPage.colAction', 'حجز صيانة')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sGroup.models.map((m) => (
                          <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-5 font-bold text-slate-900">
                              <div>{m.name}</div>
                            </td>

                            {columns.map((col) => {
                              const cell = m.cells[col.slug];
                              return (
                                <td key={col.id} className="py-4 px-4 text-center">
                                  {cell && cell.price > 0 ? (
                                    <div>
                                      <div className="font-extrabold text-slate-900">
                                        {(cell.discountPrice || cell.price).toLocaleString()} ج.م
                                      </div>
                                      <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                                        ضمان {cell.warrantyDays} يوم
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-xs text-slate-300 font-medium">—</span>
                                  )}
                                </td>
                              );
                            })}

                            {/* Direct Book CTA */}
                            <td className="py-4 px-5 text-center">
                              <Link
                                href={`/book?model=${m.id}`}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm inline-flex items-center gap-1.5 transition-colors"
                              >
                                <span>{t('pricesPage.bookNow', 'احجز الآن')}</span>
                                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards View */}
                  <div className="md:hidden divide-y divide-slate-100 p-4 space-y-4">
                    {sGroup.models.map((m) => (
                      <div key={m.id} className="pt-4 first:pt-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                          <Link
                            href={`/book?model=${m.id}`}
                            className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                          >
                            احجز
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {columns.map((col) => {
                            const cell = m.cells[col.slug];
                            if (!cell || !cell.price) return null;
                            return (
                              <div
                                key={col.id}
                                className="bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                              >
                                <span className="text-slate-500 block text-[10px]">
                                  {col.name_ar}:
                                </span>
                                <span className="font-bold text-slate-900">
                                  {(cell.discountPrice || cell.price).toLocaleString()} ج.م
                                </span>
                                <span className="text-[9px] text-emerald-700 block font-semibold">
                                  ضمان {cell.warrantyDays} يوم
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">
                  {search ? 'لم نجد نتائج مطابقة لبحثك' : 'لا توجد أسعار معلنة لهذا الجهاز حالياً'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  هل تبحث عن صيانة لموديل خاص؟ تواصل معنا وسنقدم لك تسعيراً ومعاينة فورية
                </p>
                <Link
                  href="/book"
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold inline-block"
                >
                  طلب كشف وتحديد سعر
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Areas & Transport Fees Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900">
              تغطية الخدمة ومصاريف الانتقال في القاهرة والجيزة
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            فريق فنيي FocusFix يغطي كافة مناطق القاهرة والجيزة دون رسوم خفية:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {areasFees.map((a, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-slate-800">{a.name}</span>
                <span className="font-bold text-emerald-600">{a.fee}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            * السعر النهائي قد يخضع لمعاينة الفني المباشرة في حالة وجود أعطال إضافية غير محددة مسبقاً في اللوحة الأم.
          </div>
        </div>
      </div>
    </div>
  );
}
