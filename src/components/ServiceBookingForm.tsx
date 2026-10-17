import React, { useState } from 'react';
import {
  Wrench,
  Calendar,
  Clock,
  Car,
  CheckCircle2,
  Phone,
  User,
  ShieldCheck,
  Download,
  AlertCircle,
  FileCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { CENTER_SERVICES, PORSCHE_MODELS_LIST, Language, ThemeMode, ServiceBookingRecord } from '../data/centerContentI18n';
import { soundEngine } from '../utils/soundEngine';

interface ServiceBookingFormProps {
  lang: Language;
  theme: ThemeMode;
  preselectedServiceId?: string;
  onBookingConfirmed: (booking: ServiceBookingRecord) => void;
  onViewMyBookings: () => void;
}

export const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({
  lang,
  theme,
  preselectedServiceId,
  onBookingConfirmed,
  onViewMyBookings,
}) => {
  const isAr = lang === 'ar';

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || CENTER_SERVICES[0].id
  );
  const [vehicleModel, setVehicleModel] = useState<string>(PORSCHE_MODELS_LIST[0]);
  const [vehicleYear, setVehicleYear] = useState<string>('2024');
  const [mileage, setMileage] = useState<string>('15,000 km');
  const [customerName, setCustomerName] = useState<string>('محمد المنصوري');
  const [customerPhone, setCustomerPhone] = useState<string>('+966 50 123 4567');
  const [customerEmail, setCustomerEmail] = useState<string>('m.almansoori@porsche-club.com');
  const [bookingDate, setBookingDate] = useState<string>('2026-11-20');
  const [timeSlot, setTimeSlot] = useState<string>('09:00 AM');
  const [notes, setNotes] = useState<string>('');
  const [loanerCarRequested, setLoanerCarRequested] = useState<boolean>(true);
  const [confirmedBooking, setConfirmedBooking] = useState<ServiceBookingRecord | null>(null);

  React.useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const selectedService =
    CENTER_SERVICES.find((s) => s.id === selectedServiceId) || CENTER_SERVICES[0];

  const timeSlots = [
    { id: '08:00 AM', label: isAr ? '08:00 صباحاً (الموعد المبكر)' : '08:00 AM (Early Drop-off)' },
    { id: '10:30 AM', label: isAr ? '10:30 صباحاً (الفترة الصباحية)' : '10:30 AM (Morning Slot)' },
    { id: '01:30 PM', label: isAr ? '01:30 ظهراً (فترة الظهيرة)' : '01:30 PM (Midday Slot)' },
    { id: '04:00 PM', label: isAr ? '04:00 عصراً (فترة المساء)' : '04:00 PM (Afternoon Slot)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(1150);

    const ref = `PSC-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: ServiceBookingRecord = {
      id: `bk-${Date.now()}`,
      referenceCode: ref,
      customerName,
      customerPhone,
      customerEmail,
      vehicleModel,
      vehicleYear,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title[lang],
      bookingDate,
      timeSlot,
      notes,
      loanerCarRequested,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onBookingConfirmed(record);
    setConfirmedBooking(record);
  };

  const handleDownloadVoucher = () => {
    if (!confirmedBooking) return;
    soundEngine.playClick(900);
    const voucherData = {
      porscheCenterServiceVoucher: {
        bookingReference: confirmedBooking.referenceCode,
        service: confirmedBooking.serviceTitle,
        model: `${confirmedBooking.vehicleModel} (${confirmedBooking.vehicleYear})`,
        customer: confirmedBooking.customerName,
        phone: confirmedBooking.customerPhone,
        date: confirmedBooking.bookingDate,
        time: confirmedBooking.timeSlot,
        loanerVehicleProvided: confirmedBooking.loanerCarRequested ? 'Yes (Macan/Cayenne)' : 'No',
        location: 'مركز بورش المعتمد للصيانة - طريق الملك فهد / Stuttgart Boulevard',
        instructions: isAr
          ? 'يرجى تقديم هذا الرمز عند مدخل ورشة الصيانة المعتمدة'
          : 'Please present this reference upon arrival at the Service Reception',
      },
    };
    const blob = new Blob([JSON.stringify(voucherData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `porsche-service-${confirmedBooking.referenceCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="booking-form" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-neutral-500/10 text-neutral-500 dark:text-neutral-400 backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5 text-[#d5001c]" />
            <span>{isAr ? 'حجز صيانة بورش الفوري' : 'Direct Service Appointment'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
            {isAr ? 'احجز موعد صيانة سيارتك الآن' : 'Book Your Porsche Service Slot'}
          </h2>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {isAr
              ? 'اختر الخدمة المطلوبة وطراز سيارتك وحدد الوقت الأنسب لك. سيقوم مستشار الخدمة المعتمد بتأكيد موعدك فوراً مع توفير سيارة بديلة عند الطلب.'
              : 'Select your preferred maintenance package and vehicle model. Our certified service advisor will prepare your slot and dispatch a loaner upon request.'}
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-8 sm:p-14 fluid-glass-card rounded-[2.75rem] space-y-8 text-center animate-in fade-in zoom-in-95 duration-400">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                {isAr ? 'تم تأكيد موعد الصيانة بنجاح' : 'Service Appointment Confirmed'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mt-1">
                {isAr ? 'رقم تصريح الصيانة:' : 'Appointment Reference:'}{' '}
                <span className="text-[#d5001c] font-mono">{confirmedBooking.referenceCode}</span>
              </h3>
            </div>

            {/* Voucher Card */}
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-[2rem] bg-white/70 dark:bg-black/50 border border-black/[0.04] dark:border-white/[0.06] backdrop-blur-xl text-left space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    {isAr ? 'الخدمة المحددة' : 'Service Package'}
                  </span>
                  <span className="text-base font-bold text-neutral-900 dark:text-white">
                    {confirmedBooking.serviceTitle}
                  </span>
                </div>
                <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  {isAr ? 'مؤكد في النظام' : 'Confirmed in System'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isAr ? 'السيارة' : 'Vehicle'}</span>
                  <span className="text-neutral-900 dark:text-white font-semibold">
                    {confirmedBooking.vehicleModel} ({confirmedBooking.vehicleYear})
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isAr ? 'التاريخ والوقت' : 'Date & Window'}</span>
                  <span className="text-neutral-900 dark:text-white font-semibold">
                    {confirmedBooking.bookingDate} · {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isAr ? 'اسم العميل' : 'Guest Name'}</span>
                  <span className="text-neutral-900 dark:text-white">{confirmedBooking.customerName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">{isAr ? 'سيارة بديلة مجانية' : 'Porsche Loaner'}</span>
                  <span className="text-neutral-900 dark:text-white font-semibold">
                    {confirmedBooking.loanerCarRequested
                      ? isAr
                        ? 'نعم (ماكان / كايين)'
                        : 'Yes (Macan / Cayenne)'
                      : isAr
                      ? 'غير مطلوبة'
                      : 'Not requested'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-neutral-500 font-light">
                <span>{isAr ? 'ورشة مركز بورش المعتمدة - استقبال الصيانة السريعة' : 'Porsche Certified Workshop - Fast Lane Reception'}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadVoucher}
                className="px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل تصريح الموعد' : 'Download Digital Voucher'}</span>
              </button>
              <button
                type="button"
                onClick={onViewMyBookings}
                className="px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-200/80 dark:bg-white/10 text-neutral-800 dark:text-white hover:bg-neutral-300 dark:hover:bg-white/20 transition-all cursor-pointer backdrop-blur-md"
              >
                {isAr ? 'استعراض جميع مواعيدي' : 'View My Appointments'}
              </button>
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="px-5 py-3 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {isAr ? 'حجز موعد جديد' : 'Book Another Slot'}
              </button>
            </div>
          </div>
        ) : (
          /* Main Form with Subtle Glassmorphic Panel & Softer Radii */
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-14 fluid-glass-card rounded-[2.75rem] space-y-10"
          >
            {/* Step 1: Service Package Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d5001c] font-bold">
                  {isAr ? '1. اختر نوع الصيانة المطلوبة' : '1. Select Maintenance Package'}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {isAr ? `${CENTER_SERVICES.length} خدمات معتمدة` : `${CENTER_SERVICES.length} Certified Services`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CENTER_SERVICES.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => {
                        soundEngine.playClick(850);
                        setSelectedServiceId(srv.id);
                      }}
                      className={`p-5 rounded-[1.75rem] cursor-pointer transition-all duration-300 flex flex-col justify-between backdrop-blur-md ${
                        isSelected
                          ? 'bg-neutral-900/10 dark:bg-white/15 border-2 border-[#d5001c] shadow-lg scale-[1.02]'
                          : 'bg-white/50 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] hover:bg-white/80 dark:hover:bg-white/[0.07] hover:scale-[1.01]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            {srv.duration[lang]}
                          </span>
                          {srv.badge && (
                            <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[#d5001c]/10 text-[#d5001c] font-bold">
                              {srv.badge[lang]}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold leading-snug mb-1 text-neutral-900 dark:text-white">
                          {srv.title[lang]}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light line-clamp-2">
                          {srv.subtitle[lang]}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                          {srv.priceEstimate[lang]}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#d5001c] text-white shadow-md'
                              : 'bg-neutral-200/80 dark:bg-white/10'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Porsche Vehicle Details */}
            <div className="space-y-4 pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d5001c] font-bold block">
                {isAr ? '2. بيانات سيارة بورش' : '2. Porsche Vehicle Specification'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'طراز السيارة' : 'Porsche Model Series'}
                  </label>
                  <select
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none cursor-pointer"
                  >
                    {PORSCHE_MODELS_LIST.map((model) => (
                      <option key={model} value={model} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'سنة الصنع' : 'Model Year'}
                  </label>
                  <select
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none cursor-pointer font-mono"
                  >
                    {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2015-2010', 'Classic'].map(
                      (yr) => (
                        <option key={yr} value={yr} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                          {yr}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'المممات الحالية التقريبية' : 'Current Odometer (km)'}
                  </label>
                  <input
                    type="text"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="e.g. 24,000 km"
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Date & Time Window */}
            <div className="space-y-4 pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d5001c] font-bold block">
                {isAr ? '3. موعد الحجز وفترة الاستقبال' : '3. Appointment Date & Arrival Window'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'تاريخ الحضور' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none font-mono cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'فترة الاستقبال في المركز' : 'Arrival Time Window'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = timeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => {
                            soundEngine.playClick(900);
                            setTimeSlot(slot.id);
                          }}
                          className={`px-3 py-2.5 rounded-2xl text-[11px] font-mono transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-bold shadow-md'
                              : 'bg-white/40 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:bg-white/80 dark:hover:bg-white/10 border border-black/[0.03] dark:border-white/[0.05]'
                          }`}
                        >
                          {slot.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Driver / Owner Details & Loaner Macan */}
            <div className="space-y-4 pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d5001c] font-bold block">
                {isAr ? '4. بيانات مالك السيارة والتواصل' : '4. Vehicle Owner Details'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'الاسم بالكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full fluid-glass-input px-4 py-3 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1.5 font-medium">
                  {isAr ? 'ملاحظات أو أعطال معينة تود فحصها' : 'Specific Issues / Additional Requests'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isAr
                      ? 'مثال: فحص صوت خفيف في الفرامل الخلفية، فحص ضغط الإطارات...'
                      : 'e.g. slight brake squeal at low speed, wheel alignment check...'
                  }
                  className="w-full fluid-glass-input px-4 py-2.5 text-xs focus:outline-none resize-none"
                />
              </div>

              {/* VIP Loaner Car Option */}
              <div
                onClick={() => setLoanerCarRequested(!loanerCarRequested)}
                className={`p-5 rounded-[1.75rem] cursor-pointer transition-all flex items-center justify-between backdrop-blur-md ${
                  loanerCarRequested
                    ? 'bg-neutral-900/10 dark:bg-white/10 border border-[#d5001c]/40 shadow-sm'
                    : 'bg-white/40 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      loanerCarRequested
                        ? 'bg-[#d5001c] text-white shadow-md'
                        : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  >
                    {loanerCarRequested && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wide block text-neutral-900 dark:text-white">
                      {isAr
                        ? 'طلب سيارة بورش بديلة مجانية (Macan / Cayenne Loaner)'
                        : 'Request Complimentary Porsche Loaner Vehicle'}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {isAr
                        ? 'استلم سيارة بديلة فارهة طوال فترة بقاء سيارتك في الورشة لتنقلاتك اليومية دون انقطاع.'
                        : 'Enjoy a current-model Porsche loaner throughout your service duration.'}
                    </span>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-neutral-400 shrink-0 hidden sm:block" />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {isAr
                    ? 'قطع غيار بورش أصلية 100% مع ضمان رسمي لمدة عامين'
                    : '100% Genuine Porsche parts with 2-year warranty'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase bg-[#d5001c] hover:bg-red-700 text-white transition-all shadow-xl hover:scale-105 cursor-pointer active:scale-95"
              >
                {isAr ? 'تأكيد موعد الصيانة وإصدار التصريح' : 'Confirm Service Appointment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
