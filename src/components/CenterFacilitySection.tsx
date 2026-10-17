import React from 'react';
import { CenterInfo, CenterGalleryItem } from '../types/centerTypes';
import { Language, ThemeMode } from '../data/centerContentI18n';
import { MapPin, Phone, Mail, Clock, Wrench, Award, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CenterFacilitySectionProps {
  info: CenterInfo;
  gallery: CenterGalleryItem[];
  lang: Language;
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const CenterFacilitySection: React.FC<CenterFacilitySectionProps> = ({
  info,
  gallery,
  lang,
  theme,
  onOpenBooking,
}) => {
  const isAr = lang === 'ar';

  const defaultFacilityPillars = [
    {
      icon: Wrench,
      title: isAr ? '12 محطة صيانة هيدروليكية' : '12 Hydraulic Service Bays',
      desc: isAr
        ? 'محطات رفع معتمدة من شتوتغارت مخصصة للسيارات الرياضية المنخفضة وسيارات السباق GT مع حساسات توازن ليزرية ثلاثية الأبعاد.'
        : 'Stuttgart-certified low-profile lifts engineered for GT race cars and low-clearance chassis with laser alignment.',
    },
    {
      icon: Award,
      title: isAr ? 'مختبر فحص البطاريات والجهد العالي' : 'High Voltage 800V Cleanroom',
      desc: isAr
        ? 'غرفة معزولة ومكيفة مخصصة لفحص بطاريات تايكان ونماذج E-Hybrid بواسطة مهندسي بطاريات معتمدين.'
        : 'Isolated climate-controlled facility dedicated to Taycan and E-Hybrid high-voltage pack diagnostic servicing.',
    },
    {
      icon: Sparkles,
      title: isAr ? 'استوديو حماية وتصحيح الطلاء (PPF)' : 'Cleanroom Detailing & PPF Atelier',
      desc: isAr
        ? 'بيئة معقمة وخالية من الغبار لتركيب أفلام الحماية الشفافة الأصلية وعزل السيراميك النانوي لمقاومة الخدوش.'
        : 'Dust-free sterile environment for precision Paint Protection Film installation and multi-stage ceramic coatings.',
    },
    {
      icon: Shield,
      title: isAr ? 'استراحة VIP لرجال الأعمال والعملاء' : 'Executive Owners Concierge Lounge',
      desc: isAr
        ? 'استمتع بقهوة مختصة، شاشات متابعة حية لمسار صيانة سيارتك، وإنترنت فائق السرعة أثناء انتظارك في المركز.'
        : 'Complimentary artisanal espresso, live telemetry display of your vehicle service progress, and private work suites.',
    },
  ];

  return (
    <section id="facilities" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Center Banner / Announcement Notice (Soft Glass) */}
        {info.announcementNotice && (
          <div className="p-5 rounded-[2rem] fluid-glass-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {info.announcementNotice}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(900);
                onOpenBooking();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d5001c] text-white hover:bg-red-700 transition-colors shrink-0 shadow-md cursor-pointer active:scale-95"
            >
              {isAr ? 'حجز موعد فوري' : 'Reserve Slot Now'}
            </button>
          </div>
        )}

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-12 border-b border-black/5 dark:border-white/10">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#d5001c]" />
              <span>{isAr ? 'مرافق وتجهيزات المركز' : 'Certified Facilities'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'أعلى معايير التميز' : 'Stuttgart Standards'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
              {isAr ? 'أحدث ورشة صيانة متخصصة بمعايير المصنع' : 'Precision Workshop & Diagnostic Pavilion'}
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl">
              {isAr
                ? 'تم بناء وتجهيز المركز وفقاً لأدق المعايير الهندسية لشركة د. إنج. إتش. سي. إف. بورش إيه جي، بما يشمل محطات الفحص الهيدروليكية الخاصة بسيارات GT، ومعايرة الشاسيه بالليزر ثلاثي الأبعاد.'
                : 'Constructed to exact Dr. Ing. h.c. F. Porsche AG engineering standards, incorporating dedicated GT motorsport alignment rigs and 3D digital laser wheel geometry sensors.'}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-[2.25rem] fluid-glass-card space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
              <MapPin className="w-4 h-4 text-[#d5001c] shrink-0" />
              <span>{info.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{info.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{info.workingHours}</span>
            </div>
            <div className="pt-2.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <span className="text-neutral-400 uppercase">{isAr ? 'الاستقبال المباشر:' : 'Direct Reception:'}</span>
              <span className="text-emerald-500 font-bold">{isAr ? 'مفتوح الآن' : 'Available'}</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the Center (Subtle Glass Fluid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultFacilityPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="fluid-glass-card p-7 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100/80 dark:bg-white/10 text-[#d5001c] flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Facility Gallery */}
        <div className="pt-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                {isAr ? 'جولة مصورة داخل المركز' : 'Facility Highlights'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
                {isAr ? 'صالات الاستقبال، الورشة واستراحة كبار الزوار' : 'Showroom, Workshop & VIP Suites'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[16/10] rounded-[2.25rem] overflow-hidden bg-neutral-950 shadow-xl border border-white/20 dark:border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 w-fit mb-2">
                    {item.tag}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-light mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
