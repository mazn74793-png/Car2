import React, { useState } from 'react';
import { X, Calendar, Clock, Car, User, CheckCircle2, QrCode, Shield, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { CenterServicePackage, CenterFleetCar, BookingRecord } from '../types/centerTypes';
import { soundEngine } from '../utils/soundEngine';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: CenterServicePackage[];
  fleet: CenterFleetCar[];
  selectedServiceId?: string;
  selectedVehicleName?: string;
  onConfirmBooking: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  fleet,
  selectedServiceId,
  selectedVehicleName,
  onConfirmBooking,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<CenterServicePackage>(
    services.find((s) => s.id === selectedServiceId) || services[0]
  );
  const [selectedVehicle, setSelectedVehicle] = useState<string>(
    selectedVehicleName || (fleet[0]?.name ?? 'Porsche 911 GT3 RS')
  );
  const [bookingDate, setBookingDate] = useState('2026-11-25');
  const [timeSlot, setTimeSlot] = useState('10:00 AM – 11:30 AM');
  const [customerName, setCustomerName] = useState('Alexander Vance');
  const [customerEmail, setCustomerEmail] = useState('mizoo2y2@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 911-7180');
  const [vipInstructor, setVipInstructor] = useState(true);
  const [notes, setNotes] = useState('Interested in track telemetry review and cornering analysis.');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Sync if prop updates
  React.useEffect(() => {
    if (selectedServiceId) {
      const match = services.find((s) => s.id === selectedServiceId);
      if (match) setSelectedService(match);
    }
  }, [selectedServiceId, services]);

  React.useEffect(() => {
    if (selectedVehicleName) {
      setSelectedVehicle(selectedVehicleName);
    }
  }, [selectedVehicleName]);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM – 10:30 AM',
    '10:00 AM – 11:30 AM',
    '01:00 PM – 02:30 PM',
    '03:00 PM – 04:30 PM',
    '05:00 PM – 06:30 PM (Sunset Session)',
  ];

  const instructorFee = vipInstructor && selectedService.category === 'Track Drive' ? 150 : 0;
  const totalPrice = selectedService.price + instructorFee;

  const handleNextStep = () => {
    soundEngine.playClick(900);
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  };

  const handlePrevStep = () => {
    soundEngine.playClick(750);
    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(1200);

    const ref = `PEC-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: BookingRecord = {
      id: `bk-${Date.now()}`,
      referenceCode: ref,
      customerName,
      customerEmail,
      customerPhone,
      serviceTitle: selectedService.title,
      vehicleName: selectedVehicle,
      bookingDate,
      timeSlot,
      totalPrice,
      vipInstructor,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onConfirmBooking(record);
    setConfirmedBooking(record);
    setStep(4);
  };

  const handleDownloadPass = () => {
    if (!confirmedBooking) return;
    soundEngine.playClick(900);
    const passData = {
      porscheCenterPass: {
        passNumber: confirmedBooking.referenceCode,
        service: confirmedBooking.serviceTitle,
        vehicle: confirmedBooking.vehicleName,
        guest: confirmedBooking.customerName,
        email: confirmedBooking.customerEmail,
        date: confirmedBooking.bookingDate,
        time: confirmedBooking.timeSlot,
        location: 'Porsche Experience & Service Center, 1948 Speedster Blvd',
        totalPrice: `$${confirmedBooking.totalPrice.toLocaleString()}`,
        status: confirmedBooking.status,
      },
    };
    const blob = new Blob([JSON.stringify(passData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `porsche-pass-${confirmedBooking.referenceCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-neutral-950/95 border border-white/15 text-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              Porsche Center Reservations
            </div>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mt-0.5">
              {step === 4 ? 'Booking Confirmed' : 'Reserve Track & Service Experience'}
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

        {/* Step Progress Indicators (Steps 1-3) */}
        {step < 4 && (
          <div className="px-6 sm:px-8 pt-4 pb-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400">
              <span className={step >= 1 ? 'text-white font-bold' : ''}>1. Service</span>
              <span className="text-neutral-600">―</span>
              <span className={step >= 2 ? 'text-white font-bold' : ''}>2. Vehicle & Date</span>
              <span className="text-neutral-600">―</span>
              <span className={step >= 3 ? 'text-white font-bold' : ''}>3. Driver Details</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                Choose Center Service or Track Program
              </h4>
              <div className="grid grid-cols-1 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {services.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => {
                        soundEngine.playClick(850);
                        setSelectedService(srv);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-white bg-white/10 shadow-lg ring-1 ring-white/50'
                          : 'border-white/10 hover:border-white/30 bg-neutral-900/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                              {srv.category}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-[10px] font-mono text-neutral-400">{srv.duration}</span>
                            {srv.badge && (
                              <span className="text-[9px] font-mono uppercase bg-white/15 px-2 py-0.5 rounded-full text-white">
                                {srv.badge}
                              </span>
                            )}
                          </div>
                          <h5 className="text-sm sm:text-base font-bold text-white uppercase">{srv.title}</h5>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{srv.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base font-bold font-mono text-white tabular-nums">
                            {srv.price === 0 ? 'Complimentary' : `$${srv.price.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-2"
                >
                  <span>Select Date & Car</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              {/* Vehicle Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                  Select Center Vehicle for the Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {fleet.map((car) => {
                    const isSelected = selectedVehicle === car.name;
                    return (
                      <div
                        key={car.id}
                        onClick={() => {
                          soundEngine.playClick(900);
                          setSelectedVehicle(car.name);
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-white bg-white/10 ring-1 ring-white/50'
                            : 'border-white/10 hover:border-white/30 bg-neutral-900/40'
                        }`}
                      >
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-20 object-cover rounded-xl mb-2"
                        />
                        <div className="text-xs font-bold text-white uppercase truncate">{car.name}</div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {car.horsepower} hp · {car.zeroToSixty}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Circuit Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* VIP Options */}
              {selectedService.category === 'Track Drive' && (
                <div
                  onClick={() => setVipInstructor(!vipInstructor)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    vipInstructor ? 'border-white/40 bg-white/5' : 'border-white/10 bg-neutral-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={vipInstructor}
                      onChange={() => {}}
                      className="rounded accent-white"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white uppercase block">
                        Add Porsche Factory Lead Instructor (+ $150)
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        Dedicated 1-on-1 radio coaching and real-time telemetry trace review.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-full text-xs font-medium uppercase border border-white/20 text-neutral-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-2"
                >
                  <span>Driver Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Driver / Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Email Address for Digital Pass
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Special Driving Requests / Dietary Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-white resize-none"
                />
              </div>

              {/* Summary Bar */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Program:</span>
                  <span className="text-white truncate max-w-[260px]">{selectedService.title}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Vehicle:</span>
                  <span className="text-white">{selectedVehicle}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Date & Slot:</span>
                  <span className="text-white">{bookingDate} · {timeSlot}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm font-bold text-white">
                  <span>Total Amount:</span>
                  <span className="text-base">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-full text-xs font-medium uppercase border border-white/20 text-neutral-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all shadow-xl"
                >
                  Confirm & Generate Pass
                </button>
              </div>
            </form>
          )}

          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-14 h-14 text-white mx-auto" />
              <div>
                <h4 className="text-2xl font-bold uppercase tracking-tight text-white">
                  Reservation Confirmed
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Access Code: <span className="text-white font-bold">{confirmedBooking.referenceCode}</span>
                </p>
              </div>

              {/* Digital Circuit Pass Card */}
              <div className="p-6 bg-gradient-to-br from-neutral-900 to-black border border-white/20 rounded-3xl text-left space-y-4 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="text-xs font-bold tracking-widest uppercase text-white">
                    PORSCHE EXPERIENCE PASS
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    VIP Confirmed
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block">Service Program</span>
                    <span className="text-white font-semibold">{confirmedBooking.serviceTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block">Assigned Car</span>
                    <span className="text-white font-semibold">{confirmedBooking.vehicleName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block">Date & Session</span>
                    <span className="text-white">{confirmedBooking.bookingDate} · {confirmedBooking.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block">Guest Name</span>
                    <span className="text-white">{confirmedBooking.customerName}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] text-neutral-400 font-light">
                    Present this pass at the Center Reception desk on arrival.
                  </div>
                  <QrCode className="w-8 h-8 text-white shrink-0" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPass}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase border border-white/30 hover:border-white hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Digital Pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all"
                >
                  Return to Center
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
