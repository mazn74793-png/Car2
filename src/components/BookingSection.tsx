import React, { useState } from 'react';
import { CenterServicePackage, CenterFleetCar } from '../types/centerTypes';
import { Calendar, Clock, Gauge, Zap, CheckCircle2, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface BookingSectionProps {
  services: CenterServicePackage[];
  fleet: CenterFleetCar[];
  onOpenBookingModal: (serviceId?: string, vehicleName?: string) => void;
  onOpenMyBookings: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  services,
  fleet,
  onOpenBookingModal,
  onOpenMyBookings,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Track Drive' | 'Service & Maintenance' | 'VIP Consultation'>('All');

  const filteredServices = services.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory
  );

  return (
    <section id="bookings" className="py-24 bg-[#07070a] border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-2">
              <span>Porsche Experience & Service Center</span>
              <span aria-hidden="true">·</span>
              <span>Online Reservations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              Book Track Sessions & Workshop Care
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(900);
                onOpenMyBookings();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>View My Bookings</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(1000);
                onOpenBookingModal();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-xl"
            >
              <span>Instant Reservation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Tabs (Smooth Pill Bar) */}
        <div className="py-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/80 border border-white/10 rounded-full">
            {(['All', 'Track Drive', 'Service & Maintenance', 'VIP Consultation'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(850);
                    setActiveCategory(cat);
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Porsche Factory Certified Master Technicians</span>
            </span>
          </div>
        </div>

        {/* Services Showcase Cards (Smooth Rounded-3xl Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group smooth-glass-card p-6 rounded-3xl flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-black border border-white/10">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-neutral-300">
                    {service.category}
                  </div>

                  {service.badge && (
                    <div className="absolute top-3 right-3 text-[9px] font-mono uppercase bg-[#d5001c] text-white px-2.5 py-0.5 rounded-full font-bold shadow-lg">
                      {service.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 text-xs font-mono text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Body Content */}
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 py-3 border-t border-white/10 mb-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-neutral-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block">
                    Session Fee
                  </span>
                  <span className="text-xl font-bold font-mono text-white tabular-nums">
                    {service.price === 0 ? 'Complimentary' : `$${service.price.toLocaleString()}`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(1000);
                    onOpenBookingModal(service.id);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-lg group-hover:scale-105"
                >
                  <span>Book Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Available Center Fleet Strip */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-400 block mb-1">
                Center Driving Fleet
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                Vehicles Prepared For Track & Test Drives
              </h3>
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              Maintained to factory track standards · Fresh Michelin Pilot Sport Cup 2 tires
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {fleet.map((car) => (
              <div
                key={car.id}
                className="p-5 rounded-3xl bg-neutral-900/40 border border-white/10 hover:border-white/30 transition-all space-y-4"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 text-[10px] font-mono uppercase bg-black/60 px-2.5 py-0.5 rounded-full border border-white/15 text-neutral-300">
                    {car.category}
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {car.status}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold uppercase tracking-tight text-white mb-2">{car.name}</h4>
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">0–60</span>
                      <span className="font-bold text-white">{car.zeroToSixty}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Power</span>
                      <span className="font-bold text-white">{car.horsepower} hp</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Top Track</span>
                      <span className="font-bold text-white">{car.topSpeed} mph</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(1000);
                    onOpenBookingModal(undefined, car.name);
                  }}
                  className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Book Experience With This Car</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
