import React from 'react';
import { Language, ThemeMode } from '../data/centerContentI18n';
import { Wrench, Shield, Award, Clock, MapPin, Phone, CheckCircle, Cpu, Droplet, Gauge } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CenterStorySectionProps {
  lang: Language;
  theme: ThemeMode;
  onBookNow: () => void;
}

export const CenterStorySection: React.FC<CenterStorySectionProps> = ({
  lang,
  theme,
  onBookNow,
}) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Cpu,
      title: isAr ? 'أجهزة فحص PIWIS 4 الأصلية' : 'Genuine PIWIS 4 Diagnostic Units',
      desc: isAr
        ? 'اتصال رقمي مشفر ومباشر مع خوادم مصنع بورش في شتوتغارت لقراءة أحدث التحديثات البرمجية وفحص أداء كل حساس بدقة متناهية.'
        : 'Encrypted direct uplink to Porsche AG factory servers in Stuttgart for real-time ECU calibration and telemetry.',
    },
    {
      icon: Droplet,
      title: isAr ? 'زيوت Mobil 1 الأصلية وسوائل OEM' : 'Mobil 1 ESP Factory Lubricants',
      desc: isAr
        ? 'تزويد محركات البوكسر بست أسطوانات والمحركات التوربينية بزيوت مخصصة لتحمل درجات الحرارة القصوى وعزم الدوران العالي.'
        : 'Precision lubrication formulated specifically for high-stress boxer engines under extreme thermal loads.',
    },
    {
      icon: Award,
      title: isAr ? 'مهندسون معتمدون Gold Certified' : 'Zuffenhausen Certified Technicians',
      desc: isAr
        ? 'فريق فني خضع لآلاف ساعات التدريب العملي المعتمد في أكاديمية بورش لصيانة سيارات السباق وسيارات الشارع الرياضية.'
        : 'Master technicians certified through rigorous hands-on technical training at the official Porsche Motorsport academy.',
    },
    {
      icon: Shield,
      title: isAr ? 'قطع غيار بورش الأصلية 100%' : '100% Genuine Porsche Parts',
      desc: isAr
        ? 'جميع قطع الغيار مستوردة مباشرة من ألمانيا مع شهادة منشأ وضمان المصنع الشامل الممتد لمدة عامين دون تحديد مسافة.'
        : 'Directly sourced OEM inventory with official manufacturer serial tracking and full warranty protection.',
    },
  ];

  return (
    <section id="center-story" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-neutral-500/10 text-neutral-500 dark:text-neutral-400 backdrop-blur-md">
              <Wrench className="w-3.5 h-3.5 text-[#d5001c]" />
              <span>{isAr ? 'عن المركز وورشة الصيانة' : 'About the Certified Facility'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
              {isAr
                ? 'مركز بورش المعتمد: أقصى درجات الدقة لسيارتك'
                : 'The Certified Center: Precision Care For Pure Driving'}
            </h2>

            <p className="text-base text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              {isAr
                ? 'تأسس مركزنا ليكون المرجع الأول لعشاق وملاك سيارات بورش. نجمع بين أحدث تقنيات التشخيص والفحص العالمية، وبين الشغف الحقيقي برياضة السيارات. سواء كنت تقود طراز 911 كلاسيكي، أو كايين العائلية، أو تايكان الكهربائية الخارقة، فإن سيارتك تتلقى رعاية فائقة تحافظ على قيمتها وأدائها الأصلي كما خرجت من خط الإنتاج.'
                : 'Founded to deliver uncompromising engineering stewardship. Equipped with factory-approved alignment jigs, high-voltage battery isolation rooms, and clean-room diagnostic bays. Every Porsche is serviced to preserve its motorsport heritage and resale integrity.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick(1000);
                  onBookNow();
                }}
                className="px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-xl hover:scale-105 cursor-pointer active:scale-95"
              >
                {isAr ? 'حجز موعد صيانة الآن' : 'Schedule Service Visit'}
              </button>
              <a
                href="#booking-form"
                onClick={() => soundEngine.playClick(800)}
                className="px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer bg-neutral-100 dark:bg-white/5 backdrop-blur-md"
              >
                {isAr ? 'عرض جدول المواعيد' : 'Explore Timetable'}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-[2.75rem] overflow-hidden shadow-2xl border border-white/40 dark:border-white/10">
              <img
                src="/images/car_config_studio_1792255768943.jpg"
                alt="Porsche Certified Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-[2rem] bg-black/60 backdrop-blur-xl text-white text-xs font-mono space-y-1 border border-white/15">
                <div className="font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isAr ? 'مركز الفحص والصيانة السريعة' : 'Porsche Fast Lane Reception'}</span>
                </div>
                <div className="text-neutral-300 text-[11px] font-sans">
                  {isAr ? 'مجهز بـ 12 محطة صيانة هيدروليكية ومختبر معايرة إلكتروني ليزري' : '12 hydraulic service bays & laser chassis calibration'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Center Care (Subtle Glassmorphic Fluid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="fluid-glass-card p-7 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d5001c]/10 text-[#d5001c] flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
