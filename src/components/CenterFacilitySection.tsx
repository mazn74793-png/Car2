import React from 'react';
import { CenterInfo, CenterGalleryItem } from '../types/centerTypes';
import { MapPin, Phone, Mail, Clock, Flag, Wrench, Award, Shield } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CenterFacilitySectionProps {
  info: CenterInfo;
  gallery: CenterGalleryItem[];
  onOpenBookingModal: () => void;
}

export const CenterFacilitySection: React.FC<CenterFacilitySectionProps> = ({
  info,
  gallery,
  onOpenBookingModal,
}) => {
  return (
    <section id="center-about" className="py-24 bg-[#050508] border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center Banner / Announcement Notice */}
        {info.announcementNotice && (
          <div className="mb-12 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-200">
                {info.announcementNotice}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(900);
                onOpenBookingModal();
              }}
              className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors shrink-0"
            >
              Reserve Slot
            </button>
          </div>
        )}

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-16 border-b border-white/10">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400">
              <span>Center Overview</span>
              <span aria-hidden="true">·</span>
              <span>Stuttgart Pedigree</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
              {info.name}
            </h2>
            <p className="text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
              {info.description}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-neutral-900/60 border border-white/10 space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-neutral-300">
              <MapPin className="w-4 h-4 text-[#d5001c] shrink-0" />
              <span>{info.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{info.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{info.workingHours}</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-neutral-500 uppercase">Handling Track:</span>
              <span className="text-white font-bold">{info.trackLength}</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the Center (Smooth Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          {[
            {
              icon: Flag,
              title: 'Handling Track',
              desc: 'FIA-certified technical circuit with dynamic kick-plate, ice hill, and high-speed banked apexes.',
            },
            {
              icon: Wrench,
              title: 'Certified Workshop',
              desc: 'Official Porsche diagnostic rigs, laser suspension calibration, and 100% genuine parts.',
            },
            {
              icon: Award,
              title: 'Factory Coaches',
              desc: 'Direct radio telemetry coaching from certified Porsche racing drivers and track instructors.',
            },
            {
              icon: Shield,
              title: 'VIP Concierge',
              desc: 'Private vehicle delivery suites, bespoke Exclusive Manufaktur atelier, and member lounge.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-neutral-900/40 border border-white/10 hover:border-white/25 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Facility Gallery (Admin Uploadable) */}
        <div className="pt-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Inside the Facility
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                Showroom, Handling Track & Workshop
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[16/10] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/15 w-fit mb-1">
                    {item.tag}
                  </span>
                  <h4 className="text-lg font-bold uppercase tracking-tight text-white">{item.title}</h4>
                  <p className="text-xs text-neutral-300 font-light mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
