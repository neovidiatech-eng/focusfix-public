'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  Clock,
  ArrowLeft,
  Smartphone,
  MapPin,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { InnerHero } from '@/src/shared/components/ui/InnerHero';

export default function PricesPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'iphone' | 'ipad' | 'watch'>('iphone');

  const seriesData = [
    {
      series: 'iPhone 16 Series',
      models: [
        {
          id: 'ip-16-pm',
          name: 'iPhone 16 Pro Max',
          screen: { price: 14500, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 3800, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 3200, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 4200, warranty: 'ضمان 3 شهور', status: 'available' },
        },
        {
          id: 'ip-16-p',
          name: 'iPhone 16 Pro',
          screen: { price: 13200, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 3600, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 2900, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 3900, warranty: 'ضمان 3 شهور', status: 'available' },
        },
      ],
    },
    {
      series: 'iPhone 15 Series',
      models: [
        {
          id: 'ip-15-pm',
          name: 'iPhone 15 Pro Max',
          screen: { price: 9500, discountPrice: 8900, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 2800, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 2400, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 3100, warranty: 'ضمان 3 شهور', status: 'available' },
        },
        {
          id: 'ip-15-p',
          name: 'iPhone 15 Pro',
          screen: { price: 8800, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 2700, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 2200, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 2900, warranty: 'ضمان 3 شهور', status: 'available' },
        },
        {
          id: 'ip-15',
          name: 'iPhone 15',
          screen: { price: 6900, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 2400, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 1900, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 2400, warranty: 'ضمان 3 شهور', status: 'available' },
        },
      ],
    },
    {
      series: 'iPhone 14 Series',
      models: [
        {
          id: 'ip-14-pm',
          name: 'iPhone 14 Pro Max',
          screen: { price: 7900, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 2400, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 1900, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 2600, warranty: 'ضمان 3 شهور', status: 'available' },
        },
        {
          id: 'ip-14',
          name: 'iPhone 14',
          screen: { price: 5400, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 2100, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 1600, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 2100, warranty: 'ضمان 3 شهور', status: 'available' },
        },
      ],
    },
    {
      series: 'iPhone 13 Series',
      models: [
        {
          id: 'ip-13-pm',
          name: 'iPhone 13 Pro Max',
          screen: { price: 6800, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 2100, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 1700, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 2300, warranty: 'ضمان 3 شهور', status: 'available' },
        },
        {
          id: 'ip-13',
          name: 'iPhone 13',
          screen: { price: 4600, warranty: 'ضمان 6 شهور', status: 'available' },
          battery: { price: 1900, warranty: 'ضمان 6 شهور', status: 'available' },
          back: { price: 1400, warranty: 'ضمان 6 شهور', status: 'available' },
          camera: { price: 1800, warranty: 'ضمان 3 شهور', status: 'available' },
        },
      ],
    },
  ];

  const areasFees = [
    { name: 'المعادي والبساتين', city: 'القاهرة', fee: 'مجاناً 0 ج.م' },
    { name: 'مدينة نصر ومصر الجديدة', city: 'القاهرة', fee: 'مجاناً 0 ج.م' },
    { name: 'التجمع الخامس والقاهرة الجديدة', city: 'القاهرة', fee: 'مجاناً 0 ج.م' },
    { name: 'الدقي والمهندسين والزمالك', city: 'الجيزة', fee: 'مجاناً 0 ج.م' },
    { name: 'الشيخ زايد و 6 أكتوبر', city: 'الجيزة', fee: 'مجاناً 0 ج.م' },
    { name: 'الشروق ومدينتي والرحاب', city: 'القاهرة', fee: 'مجاناً 0 ج.م' },
  ];

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
  }, [cleanSearch]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "قائمة الأسعار والضمانات" },
        ]}
        badge="تسعير شفاف وشامل التركيب المنزلي"
        badgeIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
        title="جدول أسعار صيانة أجهزة"
        highlightedTitle="Apple الأصلية"
        description="جميع الأسعار تشمل انتقال الفني إلى موقعك وقطع غيار أصلية مع ضمان معتمد يبدأ من 6 شهور حتى عام كامل بدون أي رسوم خفية."
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
              placeholder="ابحث عن موديلك (مثال: 15 pro max)..."
              className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Device Tabs */}
          <div className="flex gap-2 w-full md:w-auto">
            {[
              { id: 'iphone', label: 'iPhone' },
              { id: 'ipad', label: 'iPad' },
              { id: 'watch', label: 'Apple Watch' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === t.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Tables Grouped by Series */}
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
                  <span className="text-xs text-emerald-400 font-semibold">قطع غيار أصلية</span>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right text-sm border-collapse">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs">
                      <tr>
                        <th className="py-3 px-5">الموديل</th>
                        <th className="py-3 px-4 text-center">تغيير شاشة أصلية</th>
                        <th className="py-3 px-4 text-center">تغيير بطارية أصلية</th>
                        <th className="py-3 px-4 text-center">تغيير ظهر ليزر</th>
                        <th className="py-3 px-4 text-center">صيانة الكاميرا</th>
                        <th className="py-3 px-5 text-center">حجز فوري</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sGroup.models.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-5 font-bold text-slate-900">
                            <div>{m.name}</div>
                          </td>

                          {/* Screen */}
                          <td className="py-4 px-4 text-center">
                            <div className="font-extrabold text-slate-900">
                              {m.screen.discountPrice || m.screen.price} ج.م
                            </div>
                            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                              {m.screen.warranty}
                            </span>
                          </td>

                          {/* Battery */}
                          <td className="py-4 px-4 text-center">
                            <div className="font-extrabold text-slate-900">{m.battery.price} ج.م</div>
                            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                              {m.battery.warranty}
                            </span>
                          </td>

                          {/* Back Glass */}
                          <td className="py-4 px-4 text-center">
                            <div className="font-extrabold text-slate-900">{m.back.price} ج.م</div>
                            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                              {m.back.warranty}
                            </span>
                          </td>

                          {/* Camera */}
                          <td className="py-4 px-4 text-center">
                            <div className="font-extrabold text-slate-900">{m.camera.price} ج.م</div>
                            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                              {m.camera.warranty}
                            </span>
                          </td>

                          {/* Direct Book CTA */}
                          <td className="py-4 px-5 text-center">
                            <Link
                              href={`/book?model=${m.id}`}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm inline-flex items-center gap-1.5 transition-colors"
                            >
                              <span>احجز الآن</span>
                              <ArrowLeft className="w-3.5 h-3.5" />
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
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">شاشة أصلية:</span>
                          <span className="font-bold text-slate-900">{m.screen.price} ج.م</span>
                          <span className="text-[9px] text-emerald-700 block font-semibold">
                            {m.screen.warranty}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">بطارية أصلية:</span>
                          <span className="font-bold text-slate-900">{m.battery.price} ج.م</span>
                          <span className="text-[9px] text-emerald-700 block font-semibold">
                            {m.battery.warranty}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">ظهر ليزر:</span>
                          <span className="font-bold text-slate-900">{m.back.price} ج.م</span>
                          <span className="text-[9px] text-emerald-700 block font-semibold">
                            {m.back.warranty}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-slate-500 block text-[10px]">صيانة كاميرا:</span>
                          <span className="font-bold text-slate-900">{m.camera.price} ج.م</span>
                          <span className="text-[9px] text-emerald-700 block font-semibold">
                            {m.camera.warranty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">لم نجد نتائج مطابقة لبحثك</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                هل تبحث عن موديل غير مدرج؟ تواصل معنا وسنقدم لك تسعيراً فورياً
              </p>
              <Link
                href="/book"
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold inline-block"
              >
                طلب سعر مخصص
              </Link>
            </div>
          )}
        </div>

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
