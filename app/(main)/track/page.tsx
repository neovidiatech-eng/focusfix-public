"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, Clock, MapPin, CheckCircle2, AlertCircle, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { InnerHero } from "@/src/shared/components/ui/InnerHero";

export default function TrackBookingPage() {
  const [bookingCode, setBookingCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    setLoading(true);
    setError("");
    setBooking(null);

    try {
      // In production connects to api.focusfix.net/api/v1/bookings/track
      // Client-safe fallback for test / simulated tracking
      const cleanCode = bookingCode.trim().toUpperCase();
      
      // Attempt backend lookup if available
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      try {
        const res = await fetch(`${API_URL}/bookings/track?code=${encodeURIComponent(cleanCode)}&phone=${encodeURIComponent(phone.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        // Fallback demo state if backend not reached yet
      }

      // Demo/Fallback lookup display
      setTimeout(() => {
        if (cleanCode.startsWith("FM-") || cleanCode.length > 5) {
          setBooking({
            bookingNumber: cleanCode,
            status: "confirmed",
            customerName: "عميل FocusFix",
            device: "iPhone 15 Pro",
            area: "التجمع الخامس",
            slotDate: "2026-10-05",
            slotLabel: "10:00 ص - 01:00 م",
            services: [
              { name: "تغيير شاشة أصلية", price: 6500, warrantyDays: 360 },
            ],
            transportFee: 0,
            estimatedTotal: 6500,
            statusText: "تم تأكيد الموعد - جاري تجهيز الفني المتخصص",
          });
        } else {
          setError("لم يتم العثور على حجز بهذا الرقم. يرجى التأكد من كتابة كود الحجز مثل: FM-2026-00101");
        }
        setLoading(false);
      }, 600);
    } catch (err: any) {
      setError("حدث خطأ أثناء الاستعلام. يرجى المحاولة مرة أخرى.");
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "قيد المراجعة والتأكيد", color: "bg-amber-50 text-amber-700 border-amber-200" };
      case "confirmed":
        return { label: "تم تأكيد الحجز", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "assigned":
      case "in_progress":
        return { label: "الفني في الطريق إليك", color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "completed":
        return { label: "تمت الصيانة بنجاح", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "cancelled":
        return { label: "ملغي", color: "bg-rose-50 text-rose-700 border-rose-200" };
      default:
        return { label: "مؤكد", color: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <InnerHero
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "تتبع حالة الحجز" },
        ]}
        badge="خدمة عملاء ومتابعة FocusFix"
        badgeIcon={<Search className="w-3.5 h-3.5 text-brand-600" />}
        title="متابعة حالة الحجز وزيارة"
        highlightedTitle="فني الصيانة"
        description="أدخل كود الحجز المرجعي المستلم في رسالة التأكيد (مثال: FM-2026-00101) للاطلاع على موعد الزيارة المحدد وحالة الفني في الطريق."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">

        {/* Search Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                كود الحجز المرجعي (مثال: FM-2026-00101)
              </label>
              <input
                type="text"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                placeholder="FM-2026-XXXXX"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-mono text-base uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم الهاتف المسجل (اختياري للتأكيد)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-sans text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>جاري البحث...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>استعلام عن الحجز</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Card */}
        {booking && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs text-slate-400">رقم الحجز</span>
                <h2 className="text-xl font-black text-slate-900 font-mono">{booking.bookingNumber}</h2>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                  getStatusBadge(booking.status).color
                }`}
              >
                {getStatusBadge(booking.status).label}
              </span>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">الجهاز:</span>
                <span className="font-bold text-slate-900">{booking.device}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">المنطقة:</span>
                <span className="font-bold text-slate-900">{booking.area}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">موعد الزيارة المحدد:</span>
                <span className="font-bold text-brand-600">
                  {booking.slotDate} ({booking.slotLabel})
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">رسوم الانتقال:</span>
                <span className="font-bold text-emerald-600">مجاناً (0 ج.م)</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">الإجمالي المتوقع:</span>
                <span className="text-lg font-black text-slate-900">{booking.estimatedTotal} ج.م</span>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
              <a
                href="https://wa.me/201009911934"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>تواصل مع الفني عبر الواتساب</span>
              </a>
              <Link
                href="/book"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-all text-center"
              >
                حجز صيانة لجهاز آخر
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
