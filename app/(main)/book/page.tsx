'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  Wrench,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  User,
  Navigation,
  Check,
} from 'lucide-react';

export default function BookPage() {
  const router = useRouter();

  // Current Step: 1, 2, 3, 4
  const [step, setStep] = useState<number>(1);

  // Step 1: Model
  const [selectedDeviceType, setSelectedDeviceType] = useState<'iphone' | 'ipad' | 'watch'>('iphone');
  const [modelSearch, setModelSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState<any | null>({
    id: 'ip-15-pm',
    name: 'iPhone 15 Pro Max',
    series: 'iPhone 15 Series',
  });

  // Step 2: Services
  const [selectedServices, setSelectedServices] = useState<string[]>(['screen']);
  const [customIssueDesc, setCustomIssueDesc] = useState('');

  // Step 3: Area & Slot
  const [selectedArea, setSelectedArea] = useState<any>({
    id: 'maadi',
    name: 'المعادي',
    city: 'القاهرة',
    fee: 0,
  });
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState<'home' | 'office'>('home');
  const [selectedDate, setSelectedDate] = useState('2026-10-03');
  const [selectedSlot, setSelectedSlot] = useState('13:00 - 16:00');

  // Step 4: Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Available Data
  const models = [
    { id: 'ip-16-pm', type: 'iphone', series: 'iPhone 16 Series', name: 'iPhone 16 Pro Max' },
    { id: 'ip-16-p', type: 'iphone', series: 'iPhone 16 Series', name: 'iPhone 16 Pro' },
    { id: 'ip-16', type: 'iphone', series: 'iPhone 16 Series', name: 'iPhone 16' },
    { id: 'ip-15-pm', type: 'iphone', series: 'iPhone 15 Series', name: 'iPhone 15 Pro Max' },
    { id: 'ip-15-p', type: 'iphone', series: 'iPhone 15 Series', name: 'iPhone 15 Pro' },
    { id: 'ip-15', type: 'iphone', series: 'iPhone 15 Series', name: 'iPhone 15' },
    { id: 'ip-14-pm', type: 'iphone', series: 'iPhone 14 Series', name: 'iPhone 14 Pro Max' },
    { id: 'ip-14-p', type: 'iphone', series: 'iPhone 14 Series', name: 'iPhone 14 Pro' },
    { id: 'ip-13', type: 'iphone', series: 'iPhone 13 Series', name: 'iPhone 13' },
  ];

  const servicesList = [
    {
      id: 'screen',
      title: 'تغيير شاشة أصلية',
      desc: 'شاشة أصلية مع استعادة True Tone وحساس الإضاءة',
      price: 9500,
      discountPrice: 8900,
      warranty: 'ضمان 6 شهور',
      duration: '30 دقيقة',
    },
    {
      id: 'battery',
      title: 'تغيير بطارية أصلية',
      desc: 'بطارية أصلية بنسبة كفاءة 100% وأداء مستقر',
      price: 2800,
      warranty: 'ضمان 6 شهور',
      duration: '25 دقيقة',
    },
    {
      id: 'back',
      title: 'تغيير ظهر ليزر',
      desc: 'فك واستبدال الزجاج الخلفي بأحدث ماكينة ليزر',
      price: 2200,
      warranty: 'ضمان 6 شهور',
      duration: '45 دقيقة',
    },
    {
      id: 'camera',
      title: 'صيانة الكاميرا والعدسات',
      desc: 'تصليح اهتزاز الفوكس وتغيير الزجاج المكسور',
      price: 3100,
      warranty: 'ضمان 3 شهور',
      duration: '30 دقيقة',
    },
    {
      id: 'other',
      title: 'عطل آخر / فحص شامل',
      desc: 'إذا لم تكن متأكداً من العطل، سيقوم الفني بالفحص',
      price: 0,
      warranty: 'ضمان حسب العطل',
      duration: '30 دقيقة',
    },
  ];

  const areasList = [
    { id: 'maadi', name: 'المعادي', city: 'القاهرة', fee: 0 },
    { id: 'nasr-city', name: 'مدينة نصر', city: 'القاهرة', fee: 0 },
    { id: 'heliopolis', name: 'مصر الجديدة', city: 'القاهرة', fee: 0 },
    { id: 'new-cairo', name: 'التجمع الخامس والقاهرة الجديدة', city: 'القاهرة', fee: 0 },
    { id: 'dokki', name: 'الدقي والمهندسين والعجوزة', city: 'الجيزة', fee: 0 },
    { id: 'sheikh-zayed', name: 'الشيخ زايد', city: 'الجيزة', fee: 0 },
    { id: '6-october', name: '6 أكتوبر والواحات', city: 'الجيزة', fee: 0 },
    { id: 'shorouk', name: 'الشروق ومدينتي', city: 'القاهرة', fee: 0 },
  ];

  const availableDays = [
    { date: '2026-10-03', day: 'السبت', label: '3 أكتوبر' },
    { date: '2026-10-04', day: 'الأحد', label: '4 أكتوبر' },
    { date: '2026-10-05', day: 'الإثنين', label: '5 أكتوبر' },
    { date: '2026-10-06', day: 'الثلاثاء', label: '6 أكتوبر' },
    { date: '2026-10-07', day: 'الأربعاء', label: '7 أكتوبر' },
  ];

  const timeSlots = [
    { label: 'صباحاً: 10:00 ص - 01:00 م', time: '10:00 - 13:00' },
    { label: 'ظهراً: 01:00 م - 04:00 م', time: '13:00 - 16:00' },
    { label: 'مساءً: 04:00 م - 07:00 م', time: '16:00 - 19:00' },
  ];

  // Calculation
  const servicesTotal = useMemo(() => {
    return selectedServices.reduce((acc, sId) => {
      const s = servicesList.find((item) => item.id === sId);
      return acc + (s ? s.discountPrice || s.price : 0);
    }, 0);
  }, [selectedServices]);

  const transportFee = selectedArea?.fee || 0;
  const grandTotal = servicesTotal + transportFee;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setAddress('تم تحديد الإحداثيات الجغرافية لموقعك بنجاح');
        },
        () => {
          alert('تعذر الوصول للموقع التلقائي، يرجى كتابة العنوان يدوياً.');
        }
      );
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName || !customerPhone || !customerEmail) {
      setFormError('يرجى استكمال جميع البيانات المطلوبة (الاسم، الهاتف، والإيميل).');
      return;
    }

    if (!/^01[0125][0-9]{8}$/.test(customerPhone.trim())) {
      setFormError('يرجى إدخال رقم هاتف مصري صحيح يبدأ بـ 01 (11 رقماً).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate or call API: POST /api/v1/bookings
      const bookingNumber = `FM-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      // Save order snapshot in sessionStorage for safe receipt view
      sessionStorage.setItem(
        'focusfix_last_booking',
        JSON.stringify({
          bookingNumber,
          customerName,
          customerPhone,
          device: selectedModel?.name,
          services: selectedServices.map((id) => servicesList.find((s) => s.id === id)?.title),
          area: selectedArea?.name,
          slotDate: selectedDate,
          slotTime: selectedSlot,
          address,
          total: grandTotal,
        })
      );

      // Redirect to success page without leaking PII in the URL
      router.push(`/book/success?bookingNumber=${bookingNumber}`);
    } catch (err: any) {
      setFormError('حدث خطأ أثناء إرسال الحجز، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full inline-block mb-2">
            صيانة فورية أمامك في مكانك
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            احجز فني الصيانة في 4 خطوات بسيطة
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-lg mx-auto">
            الفني يصلك في أي مكان بالقاهرة والجيزة ويصلح جهازك في 30 دقيقة مع ضمان معتمد
          </p>
        </div>

        {/* Stepper Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: 1, title: 'الجهاز والموديل', icon: Smartphone },
              { num: 2, title: 'العطل والخدمة', icon: Wrench },
              { num: 3, title: 'المكان والموعد', icon: MapPin },
              { num: 4, title: 'البيانات والتأكيد', icon: CheckCircle2 },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div
                  key={s.num}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : isDone
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold truncate max-w-full">
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps Interactive Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: Model Selection */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">الخطوة 1: اختر نوع وموديل جهازك</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    اختر جهازك لتحديد قطع الغيار الأصلية المناسبة
                  </p>
                </div>

                {/* Device Type Tabs */}
                <div className="flex gap-2">
                  {[
                    { id: 'iphone', label: 'iPhone' },
                    { id: 'ipad', label: 'iPad' },
                    { id: 'watch', label: 'Apple Watch' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedDeviceType(t.id as any)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                        selectedDeviceType === t.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Search Model */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={modelSearch}
                    onChange={(e) => setModelSearch(e.target.value)}
                    placeholder="ابحث عن موديلك (مثال: 15 Pro Max)..."
                    className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Model Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {models
                    .filter((m) =>
                      m.name.toLowerCase().includes(modelSearch.toLowerCase().trim())
                    )
                    .map((m) => {
                      const isSelected = selectedModel?.id === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setSelectedModel(m)}
                          className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <Smartphone
                            className={`w-6 h-6 mx-auto mb-2 ${
                              isSelected ? 'text-emerald-600' : 'text-slate-400'
                            }`}
                          />
                          <div className="font-bold text-xs text-slate-900">{m.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{m.series}</div>
                        </div>
                      );
                    })}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    disabled={!selectedModel}
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <span>المتابعة لاختيار العطل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Issue / Services Selection */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">الخطوة 2: ما هو العطل الذي يواجهك؟</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    يمكنك اختيار أكثر من خدمة لجهازك ({selectedModel?.name})
                  </p>
                </div>

                <div className="space-y-3">
                  {servicesList.map((service) => {
                    const isChecked = selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900">{service.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{service.desc}</div>
                            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {service.warranty}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                {service.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left font-extrabold text-slate-900">
                          {service.price > 0 ? (
                            <div>
                              <span>{service.discountPrice || service.price} ج.م</span>
                              {service.discountPrice && (
                                <span className="block text-[11px] text-slate-400 line-through font-normal">
                                  {service.price} ج.م
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500 font-semibold">فحص وسعر لاحق</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>تغيير الموديل</span>
                  </button>
                  <button
                    disabled={selectedServices.length === 0}
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <span>المتابعة للمكان والموعد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Area and Slot */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">الخطوة 3: أين ومتى ترغب بالخدمة؟</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    الفني سيحضر إلى العنوان المحدد في الموعد المختار
                  </p>
                </div>

                {/* Area Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    اختر منطقتك (القاهرة والجيزة)
                  </label>
                  <select
                    value={selectedArea.id}
                    onChange={(e) => {
                      const found = areasList.find((a) => a.id === e.target.value);
                      if (found) setSelectedArea(found);
                    }}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {areasList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.city}) — انتقال: {a.fee === 0 ? 'مجاناً' : `+${a.fee} ج.م`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed Address */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      العنوان بالتفصيل (الشارع، العمارة، الشقة)
                    </label>
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>موقعي الحالي</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="مثال: شارع 9 المعادي، عمارة 15 الدور الرابع شقة 8"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    اختر يوم الزيارة
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {availableDays.map((d) => (
                      <div
                        key={d.date}
                        onClick={() => setSelectedDate(d.date)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          selectedDate === d.date
                            ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-[11px] font-bold text-slate-800">{d.day}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slot Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    اختر الفترة الزمنية المناسبة لك
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((ts) => (
                      <label
                        key={ts.time}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                          selectedSlot === ts.time
                            ? 'border-emerald-600 bg-emerald-50/50'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="slot"
                            checked={selectedSlot === ts.time}
                            onChange={() => setSelectedSlot(ts.time)}
                            className="text-emerald-600"
                          />
                          <span className="text-xs font-bold text-slate-800">{ts.label}</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                          متاح
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>الرجوع للخدمات</span>
                  </button>
                  <button
                    disabled={!address}
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <span>المتابعة للبيانات وتأكيد الحجز</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Customer Details and Final Submit */}
            {step === 4 && (
              <form
                onSubmit={handleSubmitBooking}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-slate-900">الخطوة 4: بيانات التواصل وتأكيد الحجز</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    سيصلك إشعار فوري برقم الحجز ومتابعة الفني
                  </p>
                </div>

                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم بالكامل</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: أحمد محمود"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهاتف (موبايل مصري)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                      +20
                    </span>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="01009911934"
                      className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    البريد الإلكتروني (لاستلام الفاتورة وشهادة الضمان)
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ملاحظات إضافية للفني (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي توضيحات بخصوص المكان أو العطل..."
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="text-emerald-600 rounded"
                    />
                    <span className="text-[11px] text-slate-600">
                      أوافق على الشروط وسياسة الضمان المعتمدة لدى FocusFix.
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>تعديل الموعد</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !termsAccepted}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                  >
                    <span>{isSubmitting ? 'جاري تأكيد الحجز...' : 'تأكيد الحجز الآن'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sticky Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm sticky top-28 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                ملخص طلب الصيانة
              </h3>

              {/* Device */}
              <div className="text-xs space-y-1">
                <span className="text-slate-400 block">الجهاز المختار:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedModel?.name || 'لم يحدد'}</span>
              </div>

              {/* Services */}
              <div className="text-xs space-y-1">
                <span className="text-slate-400 block">الخدمات المطلوبة:</span>
                <div className="space-y-1">
                  {selectedServices.map((id) => {
                    const s = servicesList.find((item) => item.id === id);
                    if (!s) return null;
                    return (
                      <div key={id} className="flex justify-between font-semibold text-slate-700">
                        <span>{s.title}</span>
                        <span>{s.discountPrice || s.price} ج.م</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Area & Fee */}
              <div className="text-xs space-y-1 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>منطقة الخدمة:</span>
                  <span className="font-semibold text-slate-800">{selectedArea?.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>رسوم الانتقال:</span>
                  <span className="font-bold text-emerald-600">
                    {transportFee === 0 ? 'مجاناً' : `${transportFee} ج.م`}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">الإجمالي التقديري:</span>
                <span className="text-xl font-black text-emerald-600 font-mono">
                  {grandTotal.toLocaleString()} ج.م
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                🛡️ الدفع عند الفني بعد إتمام الإصلاح والتجربة والتأكد من كفاءة الجهاز.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
