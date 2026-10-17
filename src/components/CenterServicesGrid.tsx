import React, { useState } from 'react';
import { CENTER_SERVICES, CenterServiceItem, Language, ThemeMode } from '../data/centerContentI18n';
import { Clock, ArrowRight, ShieldCheck, CheckCircle2, Wrench, Sparkles, Zap, Shield } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CenterServicesGridProps {
  lang: Language;
  theme: ThemeMode;
  onSelectServiceToBook: (serviceId: string) => void;
}

export const CenterServicesGrid: React.FC<CenterServicesGridProps> = ({
  lang,
  theme,
  onSelectServiceToBook,
}) => {
  const isAr = lang === 'ar';
  const [filterCategory, setFilterCategory] = useState<'all' | 'maintenance' | 'performance' | 'diagnostics' | 'body_care'>('all');

  const categories = [
    { id: 'all', label: isAr ? 'جميع خدمات الصيانة' : 'All Services' },
    { id: 'maintenance', label: isAr ? 'الصيانة الدورية والفرامل' : 'Maintenance & Brakes' },
    { id: 'performance', label: isAr ? 'تجهيز الحلبة و GT' : 'Motorsport & GT' },
    { id: 'diagnostics', label: isAr ? 'فحص تايكان والكهرباء' : 'Taycan EV & Electronics' },
    { id: 'body_care', label: isAr ? 'العناية وحماية الطلاء' : 'Detailing & Protection' },
  ];

  const filteredServices = CENTER_SERVICES.filter(
    (s) => filterCategory === 'all' || s.category === filterCategory
  );

  return (
    <section id="services-grid" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#d5001c]" />
              <span>{isAr ? 'ورشة مركز بورش المعتمدة' : 'Official Porsche Certified Workshop'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'معايير شتوتغارت' : 'Stuttgart Standards'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              {isAr ? 'خدمات الصيانة والعناية الفائقة' : 'Comprehensive Service Capabilities'}
            </h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            {isAr
              ? 'أعلى درجات الدقة الهندسية بأيدي مهندسين معتمدين من ألمانيا. نستخدم أجهزة الفحص الأصلية PIWIS 4 وقطع غيار بورش الأصلية 100% مع ضمان رسمي.'
              : 'Factory-certified master technicians equipped with genuine PIWIS 4 diagnostic stations and 100% authentic Porsche OEM components.'}
          </p>
        </div>

        {/* Filter Pills Bar (Subtle Frosted Glass) */}
        <div className="py-2 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-200/60 dark:bg-white/5 backdrop-blur-xl rounded-full border border-black/[0.03] dark:border-white/[0.06]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick(850);
                  setFilterCategory(cat.id as typeof filterCategory);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-bold shadow-lg shadow-black/10 dark:shadow-white/10'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-white/60 dark:bg-white/5 px-4 py-2 rounded-full border border-black/[0.04] dark:border-white/[0.06] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{isAr ? 'ضمان رسمي عامين على كافة قطع الغيار' : '2-Year Official Porsche Parts Warranty'}</span>
          </div>
        </div>

        {/* Services Grid (Subtle Glassmorphism Fluid Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group fluid-glass-card p-6 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header with Soft Curves */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-neutral-950 shadow-md">
                  <img
                    src={service.image}
                    alt={service.title[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                  {/* Badge */}
                  {service.badge && (
                    <div className="absolute top-3.5 right-3.5 text-[10px] font-mono uppercase bg-[#d5001c] text-white px-3 py-1 rounded-full font-bold shadow-md tracking-wider">
                      {service.badge[lang]}
                    </div>
                  )}

                  <div className="absolute bottom-3.5 left-3.5 text-xs font-mono text-white flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration[lang]}</span>
                  </div>
                </div>

                {/* Body Content */}
                <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white mb-2 leading-snug">
                  {service.title[lang]}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-4">
                  {service.description[lang]}
                </p>

                {/* Bullet Features */}
                <div className="space-y-2 py-4 border-t border-black/[0.06] dark:border-white/[0.06] mb-4">
                  {service.features[lang].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Book Action Button */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                    {isAr ? 'التكلفة المقدرة' : 'Estimate'}
                  </span>
                  <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                    {service.priceEstimate[lang]}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(1000);
                    onSelectServiceToBook(service.id);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md cursor-pointer group-hover:scale-105"
                >
                  <span>{isAr ? 'حجز هذه الخدمة' : 'Book This Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
