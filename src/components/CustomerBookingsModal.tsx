import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, QrCode, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { BookingRecord } from '../types/centerTypes';
import { soundEngine } from '../utils/soundEngine';

interface CustomerBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
}

export const CustomerBookingsModal: React.FC<CustomerBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filtered = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.referenceCode.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-neutral-950/95 border border-white/15 text-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              Center Concierge
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-0.5">
              My Active Reservations ({bookings.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by code (e.g. PEC-89104), guest name, or email..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <p className="text-sm text-neutral-400">No matching reservations found.</p>
              <p className="text-xs text-neutral-600 font-mono">
                Book a track masterclass, vehicle test drive, or scheduled service.
              </p>
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/25 transition-all flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {b.referenceCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : b.status === 'Completed'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white uppercase tracking-tight">
                    {b.serviceTitle}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 font-mono pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{b.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{b.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Vehicle:</span> <span className="text-neutral-200">{b.vehicleName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Guest:</span> <span className="text-neutral-200">{b.customerName}</span>
                    </div>
                  </div>

                  {b.notes && (
                    <p className="text-[11px] text-neutral-400 italic pt-1">"{b.notes}"</p>
                  )}
                </div>

                <div className="flex sm:flex-col justify-between sm:items-end items-center border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-neutral-500 block">Total</span>
                    <span className="text-lg font-bold font-mono text-white tabular-nums">
                      ${b.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {b.status === 'Confirmed' && (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(600);
                        if (confirm(`Cancel reservation ${b.referenceCode}?`)) {
                          onCancelBooking(b.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-full text-[10px] font-mono uppercase text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/20 transition-colors"
                    >
                      Cancel Reservation
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
