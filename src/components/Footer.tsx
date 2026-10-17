import React from 'react';
import { ArrowUp, Phone, MapPin, Mail, ShieldCheck, Clock, Wrench } from 'lucide-react';
import { Language, ThemeMode } from '../data/centerContentI18n';
import { soundEngine } from '../utils/soundEngine';

interface FooterProps {
  lang: Language;
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, theme, onOpenBooking }) => {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    soundEngine.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="location-contact" className="pt-16 pb-12 transition-colors duration-300 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-white border-t border-black/5 dark:border-white/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Lockup & Top Scroll */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="text-2xl font-bold tracking-[0.35em] uppercase text-neutral-900 dark:text-white mb-1">
              PORSCHE
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light tracking-wider uppercase">
              {isAr
                ? 'مركز وورشة بورش المعتمدة للصيانة · شتوتغارت - زوفنهاوزن'
                : 'Dr. Ing. h.c. F. Porsche AG · Stuttgart Certified Service Center'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-md"
            >
              {isAr ? 'حجز موعد صيانة' : 'Book Service'}
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <span>{isAr ? 'العودة للأعلى' : 'Back to Top'}</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-4">
              {isAr ? 'خدمات الصيانة' : 'Maintenance & Care'}
            </h4>
            <ul className="space-y-2.5 text-neutral-600 dark:text-neutral-400 font-light">
              <li><a href="#services-grid" className="hover:text-black dark:hover:text-white transition-colors">{isAr ? 'الصيانة الدورية وفحص المحرك' : 'Scheduled Factory Maintenance'}</a></li>
              <li><a href="#services-grid" className="hover:text-black dark:hover:text-white transition-colors">{isAr ? 'صيانة الفرامل وأقراص PCCB' : 'Ceramic Brake (PCCB) Service'}</a></li>
              <li><a href="#services-grid" className="hover:text-black dark:hover:text-white transition-colors">{isAr ? 'تجهيز سيارات الحلبة GT' : 'Motorsport & GT Track Setup'}</a></li>
              <li><a href="#services-grid" className="hover:text-black dark:hover:text-white transition-colors">{isAr ? 'فحص تايكان وبطاريات 800V' : 'High Voltage 800V Diagnostics'}</a></li>
              <li><a href="#services-grid" className="hover:text-black dark:hover:text-white transition-colors">{isAr ? 'استوديو تصحيح وحماية الطلاء' : 'Paint Correction & Ceramic PPF'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-4">
              {isAr ? 'مزايا المركز المعتمد' : 'Center Highlights'}
            </h4>
            <ul className="space-y-2.5 text-neutral-600 dark:text-neutral-400 font-light">
              <li><span className="text-neutral-600 dark:text-neutral-400">{isAr ? 'أجهزة فحص PIWIS 4 الأصلية' : 'Genuine PIWIS 4 Diagnostics'}</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">{isAr ? 'مهندسون معتمدون من ألمانيا' : 'Zuffenhausen Trained Engineers'}</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">{isAr ? 'سيارة بديلة مجانية (Macan Loaner)' : 'Complimentary Executive Loaner'}</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">{isAr ? 'ضمان رسمي عامين على القطع' : '2-Year Parts Warranty'}</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">{isAr ? 'استراحة VIP لرجال الأعمال' : 'Private Concierge Suite'}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-4">
              {isAr ? 'الطرازات المدعومة' : 'Supported Models'}
            </h4>
            <ul className="space-y-2.5 text-neutral-600 dark:text-neutral-400 font-light">
              <li><span className="text-neutral-600 dark:text-neutral-400">911 (992 / 991 / Turbo / GT3)</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">Cayenne & Cayenne Coupe</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">Panamera & E-Hybrid</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">Macan & Macan Electric</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">Taycan & Cross Turismo</span></li>
              <li><span className="text-neutral-600 dark:text-neutral-400">Porsche Classic (Air-Cooled)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-4">
              {isAr ? 'الموقع وساعات العمل' : 'Location & Hours'}
            </h4>
            <div className="space-y-2.5 text-neutral-600 dark:text-neutral-400 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d5001c] shrink-0" />
                <span>{isAr ? 'طريق الملك فهد / حي السرعة والمضمار' : 'Porsche Boulevard, Racing District'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-mono">+966 800 767 7243</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{isAr ? 'السبت - الخميس: 08:00 - 20:00' : 'Mon - Sat: 08:00 - 20:00'}</span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  {isAr ? 'استقبال الصيانة الفورية متاح' : 'Fast-Lane Bays Active'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Warranty Notice */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 text-[11px] text-neutral-500 font-light leading-relaxed space-y-1.5">
          <p>
            {isAr
              ? '* جميع أعمال الصيانة وقطع الغيار المعتمدة تخضع لمعايير الجودة الألمانية من د. إنج. إتش. سي. إف. بورش إيه جي (Dr. Ing. h.c. F. Porsche AG). الضمان الرسمي الممتد يغطي العيوب المصنعية لقطع الغيار الأصلية لمدة 24 شهراً دون حد أقصى للمسافة.'
              : '* All maintenance procedures and genuine replacement parts comply with strict German engineering protocols from Dr. Ing. h.c. F. Porsche AG. Official extended warranty covers manufacturing defects for 24 months with unlimited mileage.'}
          </p>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 Dr. Ing. h.c. F. Porsche AG. {isAr ? 'جميع الحقوق محفوظة لمركز بورش المعتمد.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Notice'}</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{isAr ? 'شروط الخدمة' : 'Terms of Service'}</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{isAr ? 'ضمان المصنع' : 'Factory Warranty'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
