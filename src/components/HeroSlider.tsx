import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, ArrowRight, Wrench, Calendar } from 'lucide-react';
import { CenterHeroSlide } from '../types/centerTypes';
import { Language, ThemeMode } from '../data/centerContentI18n';
import { soundEngine } from '../utils/soundEngine';

interface HeroSliderProps {
  slides: CenterHeroSlide[];
  lang: Language;
  theme: ThemeMode;
  onOpenBookingForm: () => void;
  onExploreServices: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  lang,
  theme,
  onOpenBookingForm,
  onExploreServices,
}) => {
  const isAr = lang === 'ar';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liveRpm, setLiveRpm] = useState(0);
  const [isIgniting, setIsIgniting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlides = slides.length > 0 ? slides : [];
  const slide = activeSlides[currentIdx] || activeSlides[0];

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
      className="relative w-full h-[88vh] min-h-[620px] max-h-[920px] overflow-hidden select-none"
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
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Measured dark gradient scrims for pristine text legibility in both light and dark modes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-black/60 pointer-events-none rtl:bg-gradient-to-l" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-8 pb-12 text-white">
        {/* Top Kicker (Smooth rounded pill tag) */}
        <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-neutral-300">
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-white font-semibold">
              {isAr ? 'مركز بورش المعتمد' : slide.subtitle}
            </span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>{isAr ? 'صيانة وضمان شتوتغارت' : slide.tag}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-neutral-300 bg-black/50 px-3 py-1 rounded-full border border-white/10">
            <span>0{currentIdx + 1}</span>
            <span>/</span>
            <span>0{activeSlides.length}</span>
          </div>
        </div>

        {/* Center / Lower Content */}
        <div className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-neutral-300 block">
              {isAr ? 'المركز المتخصص لسيارات بورش' : 'Official Porsche Center'}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-sans [text-wrap:balance]">
              {isAr
                ? currentIdx === 0
                  ? 'صيانة حلبات وسباقات GT'
                  : currentIdx === 1
                  ? 'صيانة تايكان وبطاريات 800V'
                  : 'ورشة الفحص الدوري المعتمد'
                : slide.model}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-200 font-light tracking-wide max-w-2xl leading-relaxed">
              {isAr
                ? currentIdx === 0
                  ? 'معايرة دقيقة لأنظمة الفرامل الكربونية PCCB، موازنة الشاسيه، وضبط زوايا الحلبة تحت إشراف مهندسي بورش المعتمدين.'
                  : currentIdx === 1
                  ? 'فحص شامل لخلايا بطاريات الجهد العالي وتحديث برمجيات الإنفيرتر والتبريد لأعلى أداء كهربائي موثوق.'
                  : 'فحص إلكتروني شامل عبر جهاز PIWIS 4، تغيير زيوت Mobil 1، وضمان معتمد لمدة عامين على جميع قطع الغيار الأصلية.'
                : slide.headline}
            </p>
          </div>

          {/* Performance & Center Specs Strip (Subtle Glassmorphic Fluid Card) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 bg-black/40 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.25rem] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            <div>
              <span className="block text-xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {isAr ? '100%' : slide.specs.acceleration}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-300">
                {isAr ? 'قطع غيار أصلية' : 'Acceleration'}
              </span>
            </div>
            <div>
              <span className="block text-xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {isAr ? 'PIWIS 4' : slide.specs.power}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-300">
                {isAr ? 'أحدث أجهزة فحص' : 'Diagnostics'}
              </span>
            </div>
            <div>
              <span className="block text-xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {isAr ? 'عامان' : slide.specs.topSpeed}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-300">
                {isAr ? 'ضمان رسمي شامل' : 'Warranty'}
              </span>
            </div>
            <div>
              <span className="block text-xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {isAr ? 'Macan' : 'Loaner'}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-neutral-300">
                {isAr ? 'سيارة بديلة مجانية' : 'Loaner Car'}
              </span>
            </div>
          </div>

          {/* Call to Actions & Engine Rev Experience (Smooth Rounded-Full Buttons) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(1100);
                onOpenBookingForm();
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all duration-300 whitespace-nowrap shadow-xl hover:scale-105"
            >
              <Wrench className="w-4 h-4 text-[#d5001c]" />
              <span>{isAr ? 'حجز موعد صيانة فورية' : 'Book Maintenance Visit'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(800);
                onExploreServices();
              }}
              className="inline-flex items-center px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            >
              {isAr ? 'خدمات الصيانة المتاحة' : 'Explore Services'}
            </button>

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
              <span>{isIgniting ? (isAr ? 'صوت المحرك يعمل...' : 'Revving...') : isAr ? 'تشغيل صوت المحرك' : 'Sound Rev'}</span>
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

        {/* Bottom Slide Controller & Indicators (Smooth rounded pills) */}
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
                    idx === currentIdx ? 'text-white font-medium' : 'text-neutral-400'
                  }`}
                >
                  {isAr ? `القسم 0${idx + 1}` : s.model.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-3 text-white border border-white/20 hover:border-white hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="p-3 text-white border border-white/20 hover:border-white hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
