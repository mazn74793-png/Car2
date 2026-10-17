import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, ArrowRight, Calendar } from 'lucide-react';
import { CenterHeroSlide } from '../types/centerTypes';
import { soundEngine } from '../utils/soundEngine';

interface HeroSliderProps {
  slides: CenterHeroSlide[];
  onOpenBookingModal: (serviceId?: string, vehicleName?: string) => void;
  onExploreFleet: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  onOpenBookingModal,
  onExploreFleet,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liveRpm, setLiveRpm] = useState(0);
  const [isIgniting, setIsIgniting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Guard against empty array
  const activeSlides = slides.length > 0 ? slides : [];
  const slide = activeSlides[currentIdx] || activeSlides[0];

  // Auto advance slides every 8 seconds unless hovered
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, activeSlides.length]);

  const handleNext = () => {
    soundEngine.playClick(900);
    setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    soundEngine.playClick(750);
    setCurrentIdx((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleIgnition = () => {
    if (isIgniting) return;
    setIsIgniting(true);
    soundEngine.playEngineRev((rpm) => {
      setLiveRpm(rpm);
      if (rpm === 0) setIsIgniting(false);
    });
  };

  if (!slide) return null;

  return (
    <section
      aria-label="Porsche Center Showcase"
      className="relative w-full h-[90vh] min-h-[640px] max-h-[960px] bg-neutral-950 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-out">
        <img
          key={slide.id + slide.image}
          src={slide.image}
          alt={slide.model}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[kenburns_20s_infinite_alternate]"
        />
        {/* Measured smooth dark gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-black/65 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-8 pb-12">
        {/* Top Kicker (Smooth rounded pill tag) */}
        <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-neutral-400">
          <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-white font-medium">{slide.subtitle}</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>{slide.tag}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-neutral-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
            <span>0{currentIdx + 1}</span>
            <span>/</span>
            <span>0{activeSlides.length}</span>
          </div>
        </div>

        {/* Center / Lower Content */}
        <div className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-neutral-400 block">
              Official Center Program
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-sans [text-wrap:balance]">
              {slide.model}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300 font-light tracking-wide max-w-2xl leading-relaxed">
              {slide.headline}
            </p>
          </div>

          {/* Performance Stats Strip (Smooth Glass Card with Rounded-2xl) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {slide.specs.acceleration}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-400">
                Acceleration
              </span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {slide.specs.power}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-400">
                Peak Output
              </span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {slide.specs.topSpeed}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-400">
                Top Speed
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-xs font-semibold text-neutral-200 uppercase line-clamp-1 mt-1 font-mono">
                {slide.priceFrom}
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-400">
                Session Fee
              </span>
            </div>
          </div>

          {/* Call to Actions & Engine Rev Experience (Smooth Rounded-Full Buttons) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(1100);
                onOpenBookingModal(undefined, slide.model);
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all duration-300 whitespace-nowrap shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Session</span>
            </button>

            <a
              href="#bookings"
              onClick={() => soundEngine.playClick(800)}
              className="inline-flex items-center px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            >
              Explore Services
            </a>

            {/* Flat-6 Acoustic Ignition Simulator */}
            <button
              type="button"
              onClick={handleIgnition}
              disabled={isIgniting}
              className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 whitespace-nowrap ${
                isIgniting
                  ? 'bg-[#d5001c] border-[#d5001c] text-white shadow-[0_0_24px_rgba(213,0,28,0.6)]'
                  : 'bg-black/50 border-white/20 text-neutral-300 hover:text-white hover:border-white/50'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isIgniting ? 'animate-pulse' : ''}`} />
              <span>{isIgniting ? 'Acoustic Sound Active' : 'Exhaust Rev'}</span>
            </button>

            {/* Live digital tachometer pill */}
            {liveRpm > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-black/90 border border-white/20 rounded-full text-xs font-mono text-white tabular-nums shadow-lg">
                <span className="text-[#d5001c] font-bold">RPM</span>
                <span>{liveRpm.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Slide Controller & Indicators (Smooth pills) */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-3">
            {activeSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setCurrentIdx(idx);
                }}
                aria-label={`Go to slide ${s.model}`}
                className="group flex flex-col items-start gap-1 text-left py-2"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentIdx
                      ? 'w-14 sm:w-20 bg-white'
                      : 'w-6 sm:w-10 bg-white/25 group-hover:bg-white/50'
                  }`}
                />
                <span
                  className={`text-[10px] tracking-widest uppercase transition-colors hidden sm:block ${
                    idx === currentIdx ? 'text-white font-medium' : 'text-neutral-500'
                  }`}
                >
                  {s.model.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous flagship model"
              className="p-3 text-white border border-white/20 hover:border-white hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next flagship model"
              className="p-3 text-white border border-white/20 hover:border-white hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
