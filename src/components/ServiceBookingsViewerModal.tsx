import React, { useState } from 'react';
import { X, Search, Calendar, Clock, Car, CheckCircle2, AlertCircle, Trash2, Download } from 'lucide-react';
import { ServiceBookingRecord, Language, ThemeMode } from '../data/centerContentI18n';
import { soundEngine } from '../utils/soundEngine';

interface ServiceBookingsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ServiceBookingRecord[];
  onCancelBooking: (id: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const ServiceBookingsViewerModal: React.FC<ServiceBookingsViewerModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  lang,
  theme,
}) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = bookings.filter(
    (b) =>
      b.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl fluid-glass-card rounded-[2.75rem] text-neutral-900 dark:text-white overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              {isAr ? 'استعلام مواعيد الصيانة' : 'Service Appointment Portal'}
            </span>
            <h3 className="text-xl font-bold uppercase tracking-tight mt-0.5">
              {isAr ? `مواعيد الصيانة المحجوزة (${bookings.length})` : `My Service Reservations (${bookings.length})`}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-2.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-5 bg-white/40 dark:bg-black/20 border-b border-black/5 dark:border-white/5 backdrop-blur-md">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5 rtl:right-4 rtl:left-auto" />
            <input
              type="text"
              placeholder={
                isAr
                  ? 'ابحث برقم التصريح (مثل PSC-10101)، الاسم، أو رقم الجوال...'
                  : 'Search by appointment code (e.g. PSC-10101), name, or phone...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full fluid-glass-input px-11 py-3 text-xs focus:outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <p className="text-sm text-neutral-500">
                {isAr ? 'لا توجد مواعيد صيانة مطابقة لبحثك.' : 'No service appointments match your query.'}
              </p>
              <p className="text-xs text-neutral-400 font-mono">
                {isAr
                  ? 'يمكنك حجز موعد جديد في أي وقت عبر نموذج الحجز المباشر.'
                  : 'You can book a new maintenance slot via the direct reservation form.'}
              </p>
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-[2rem] bg-white/60 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] hover:bg-white/90 dark:hover:bg-white/[0.07] transition-all flex flex-col sm:flex-row justify-between gap-4 backdrop-blur-md"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white bg-[#d5001c] px-3.5 py-0.5 rounded-full shadow-sm">
                      {b.referenceCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border-emerald-500/20'
                          : b.status === 'Completed'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border-blue-500/20'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border-red-500/20'
                      }`}
                    >
                      {b.status}
                    </span>
                    {b.loanerCarRequested && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-200/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'سيارة بديلة Macan' : 'Loaner Macan'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                    {b.serviceTitle}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{b.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{b.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">{isAr ? 'السيارة:' : 'Vehicle:'}</span>{' '}
                      <span className="text-neutral-900 dark:text-white font-medium">
                        {b.vehicleModel} ({b.vehicleYear})
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">{isAr ? 'العميل:' : 'Guest:'}</span>{' '}
                      <span className="text-neutral-900 dark:text-white">{b.customerName}</span>
                    </div>
                  </div>

                  {b.notes && (
                    <p className="text-[11px] text-neutral-500 italic pt-1">"{b.notes}"</p>
                  )}
                </div>

                <div className="flex sm:flex-col justify-between sm:items-end items-center shrink-0">
                  {b.status === 'Confirmed' && (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(600);
                        if (confirm(isAr ? `هل تريد إلغاء موعد الصيانة ${b.referenceCode}؟` : `Cancel appointment ${b.referenceCode}?`)) {
                          onCancelBooking(b.id);
                        }
                      }}
                      className="px-4 py-2 rounded-full text-xs font-mono uppercase text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      {isAr ? 'إلغاء الموعد' : 'Cancel Slot'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
