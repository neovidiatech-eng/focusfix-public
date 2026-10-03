'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  MessageCircle,
  Calendar,
  Phone,
  Home,
  Clock,
  ShieldCheck,
  ChevronRight,
  Download,
} from 'lucide-react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingNumber = searchParams.get('bookingNumber') || 'FM-2026-00351';

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('focusfix_last_booking');
    if (saved) {
      try {
        setOrderData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FocusFix//Appointment//EN
BEGIN:VEVENT
SUMMARY:موعد صيانة أبل FocusFix (${bookingNumber})
DESCRIPTION:زيارة فني FocusFix لصيانة الجهاز مع ضمان معتمد.
LOCATION:القاهرة والجيزة
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${bookingNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const whatsappMessage = encodeURIComponent(
    `مرحباً FocusFix، قمت بعمل حجز صيانة برقم ${bookingNumber} وأريد متابعة الموعد.`
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            تم استلام طلبك بنجاح
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            شكراً لثقتك في FocusFix!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            تم تسجيل حجز الصيانة وسيقوم منسق العمليات بتأكيد الموعد معك هاتفياً
          </p>

          {/* Booking Code Banner */}
          <div className="my-6 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl max-w-sm mx-auto">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">رقم الحجز المرجعي</span>
            <span className="font-mono text-2xl font-black text-slate-900 tracking-wider">
              {bookingNumber}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/201009911934?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>متابعة الحجز عبر الواتساب</span>
            </a>

            <button
              onClick={handleDownloadICS}
              className="w-full sm:w-auto px-5 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>إضافة الموعد للتقويم (.ics)</span>
            </button>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>ما الذي سيحدث بعد ذلك؟</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">
                1
              </span>
              <h3 className="font-bold text-slate-900">مكالمة التأكيد</h3>
              <p className="text-slate-500 leading-relaxed">
                سيتواصل معك فريق الدعم خلال دقائق لتأكيد الموعد والعنوان بدقة.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">
                2
              </span>
              <h3 className="font-bold text-slate-900">حضور الفني</h3>
              <p className="text-slate-500 leading-relaxed">
                يصل الفني المتخصص إلى باب منزلك أو مكتبك ومعه قطع الغيار الأصلية.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">
                3
              </span>
              <h3 className="font-bold text-slate-900">إصلاح وضمان</h3>
              <p className="text-slate-500 leading-relaxed">
                يتم الإصلاح أمام عينيك في أقل من 30 دقيقة مع تسليم شهادة الضمان.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details Summary if found */}
        {orderData && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">تفاصيل الطلب:</h3>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div>الجهاز: <strong className="text-slate-900">{orderData.device}</strong></div>
              <div>المنطقة: <strong className="text-slate-900">{orderData.area}</strong></div>
              <div>الموعد: <strong className="text-slate-900">{orderData.slotDate} ({orderData.slotTime})</strong></div>
              <div>الإجمالي: <strong className="text-emerald-600">{orderData.total} ج.م</strong></div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 font-bold inline-flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 pt-28 pb-20 text-center text-slate-400">
          جاري التحميل...
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}

