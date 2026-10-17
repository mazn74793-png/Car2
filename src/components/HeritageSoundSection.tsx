import React, { useState } from 'react';
import { Volume2, Gauge, Zap, Disc3, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Language, ThemeMode } from '../data/centerContentI18n';

interface HeritageSoundSectionProps {
  lang?: Language;
  theme?: ThemeMode;
}

export const HeritageSoundSection: React.FC<HeritageSoundSectionProps> = ({
  lang = 'ar',
  theme = 'light',
}) => {
  const isAr = lang === 'ar';
  const [rpm, setRpm] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThrottleRev = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    soundEngine.playEngineRev((currentRpm) => {
      setRpm(currentRpm);
      if (currentRpm === 0) {
        setIsPlaying(false);
      }
    });
  };

  const engineeringPillars = [
    {
      title: isAr ? 'هندسة محرك البوكسر Flat-6' : 'Boxer Engine Architecture',
      desc: isAr
        ? 'تموضع أسطوانات المحرك الأفقي المتقابل يضمن مركز ثقل فائق الانخفاض وتوازناً مثالياً عند المنعطفات السريعة.'
        : 'Horizontally opposed cylinders ensure an ultra-low center of gravity and optimum chassis balance.',
      stat: '9,000 RPM',
      statLabel: isAr ? 'الحد الأقصى للدوران' : 'Rev Limit',
    },
    {
      title: isAr ? 'نظام العادم التيتانيوم الرياضي' : 'Titanium Sport Exhaust',
      desc: isAr
        ? 'مسارات عادم متطورة مصنوعة من التيتانيوم الخفيف تخلق صوتاً جهورياً مميزاً لا تخطئه الأذن لسيارات بورش.'
        : 'Lightweight titanium exhaust routing creates the unmistakable resonant acoustic signature of Stuttgart.',
    },
    {
      title: isAr ? 'فرامل السيراميك الكربوني PCCB' : 'Ceramic Composite (PCCB)',
      desc: isAr
        ? 'أقراص فرامل كربونية معززة تتحمل درجات حرارة تتجاوز 1,000 درجة مئوية دون أي تراجع في قوة الكبح.'
        : 'Carbon-fiber reinforced ceramic discs withstand extreme track temperatures above 1,000°C without fade.',
      stat: '410 mm',
      statLabel: isAr ? 'قطر قرص الفرامل' : 'Rotor Diameter',
    },
    {
      title: isAr ? 'معمارية الجهد الفائق 800-Volt' : '800-Volt EV Powertrain',
      desc: isAr
        ? 'إمكانية شحن سريع فائق القدرة واستجابة فورية لعزم الدوران مع كفاءة تبريد عالية ومستمرة على الحلبة.'
        : 'High-voltage repeatable peak power output with rapid charging and active thermal management.',
      stat: '320 kW',
      statLabel: isAr ? 'سرعة الشحن القصوى' : 'Peak Charge Rate',
    },
  ];

  const rpmPercentage = Math.min(100, Math.round((rpm / 9000) * 100));

  return (
    <section id="heritage" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d5001c]" />
            <span>{isAr ? 'الهندسة الصوتية والتراث' : 'Acoustic Heritage'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'نبض مضمار السباق' : 'Born on Track'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
            {isAr ? 'نبض محركات بورش الأسطورية: تجربة الصوت الحي' : 'Born on Track. Built for the Senses.'}
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base font-light leading-relaxed">
            {isAr
              ? 'صوت محرك البوكسر ذو الست أسطوانات بتنفس طبيعي هو بصمة صوتية لا مثيل لها في عالم السيارات الرياضية. اختبر استجابة المحرك ودوران التاتشوميتر حتى 9,000 دورة في الدقيقة.'
              : 'Every Porsche engine is crafted with racing DNA. Experience the live acoustic roar of the naturally aspirated 4.0-liter flat-six boxer as it revs toward its 9,000 RPM redline.'}
          </p>
        </div>

        {/* Interactive Acoustic Cockpit Experience (Subtle Glass Container) */}
        <div className="fluid-glass-card rounded-[2.5rem] sm:rounded-[2.75rem] p-4 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Tachometer Display */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 sm:p-8 bg-neutral-950/90 text-white rounded-[2rem] sm:rounded-[2.25rem] shadow-2xl border border-white/10 backdrop-blur-xl w-full max-w-full">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex flex-col items-center justify-center max-w-full">
                {/* Dial circle */}
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Gauge background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="4"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                  />
                  {/* Active gauge arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={rpm > 7500 ? '#d5001c' : '#ffffff'}
                    strokeWidth="4"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (rpmPercentage / 100) * 188.4}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out, stroke 0.2s ease' }}
                  />
                </svg>

                {/* Digital Needle & Value Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400">
                    {isAr ? 'سرعة دوران المحرك' : 'Engine Speed'}
                  </span>
                  <div className="text-4xl font-extrabold font-mono text-white tabular-nums tracking-tight my-1">
                    {rpm > 0 ? rpm.toLocaleString() : '850'}
                  </div>
                  <div className="text-xs font-mono text-[#d5001c] font-bold tracking-widest">
                    RPM × 1000
                  </div>
                </div>
              </div>

              {/* Shift Light Array (Smooth Rounded-Full) */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((barIdx) => {
                  const threshold = barIdx * 1200;
                  const active = rpm >= threshold;
                  const isRedline = barIdx >= 6;
                  return (
                    <div
                      key={barIdx}
                      className={`h-2 w-6 rounded-full transition-all duration-100 ${
                        active
                          ? isRedline
                            ? 'bg-[#d5001c] shadow-[0_0_8px_#d5001c]'
                            : 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                          : 'bg-white/10'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right: Engine Information & Interactive Throttle Trigger */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                  {isAr ? 'محاكي الصوت الحي' : 'Live Acoustic Simulator'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white mt-1">
                  {isAr ? 'محرك 4.0 لتر سداسي الأسطوانات Flat-6' : 'Naturally Aspirated 4.0L Boxer 6'}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light mt-2 leading-relaxed">
                  {isAr
                    ? 'اضغط على دواسة الوقود التفاعلية لتشغيل تسارع صوت المحرك الحقيقي بتقنية Web Audio API عالية الدقة.'
                    : 'Engage the throttle to synthesize the mechanical valve pulse and harmonic exhaust note in real time.'}
                </p>
              </div>

              <div className="p-5 bg-white/60 dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.06] rounded-[1.75rem] backdrop-blur-md text-xs font-mono space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isAr ? 'نوع المحرك:' : 'Engine Type:'}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">4.0L Boxer Flat-6 Titanium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isAr ? 'السرعة الخاملة / القصوى:' : 'Idle / Redline:'}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">850 / 9,000 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isAr ? 'نظام العادم:' : 'Exhaust:'}</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{isAr ? 'مخارج تيتانيوم مركزية مزدوجة' : 'Dual Central Titanium Tailpipes'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleThrottleRev}
                  disabled={isPlaying}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                    isPlaying
                      ? 'bg-[#d5001c] text-white shadow-[0_0_24px_rgba(213,0,28,0.5)] cursor-not-allowed'
                      : 'bg-[#d5001c] hover:bg-red-700 text-white active:scale-95'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                  <span>{isPlaying ? (isAr ? 'صوت المحرك ينطلق...' : 'Revving...') : (isAr ? 'اضغط دواسة الوقود وتشغيل الصوت' : 'Press Throttle Pedal')}</span>
                </button>

                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono text-center sm:text-start">
                  {isAr ? 'يعمل بالصوت الفوري بدون إنترنت' : 'Real-time Web Audio API'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Engineering (Subtle Glass Fluid Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="fluid-glass-card p-7 flex flex-col justify-between"
            >
              <div>
                <span className="block text-2xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums mb-1">
                  {pillar.stat || '99.9%'}
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-4">
                  {pillar.statLabel}
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2 uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
