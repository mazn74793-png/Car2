import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Lockup & Top Scroll */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-2xl font-bold tracking-[0.35em] uppercase text-white mb-1">
              PORSCHE
            </div>
            <p className="text-xs text-neutral-400 font-light tracking-wider uppercase">
              Dr. Ing. h.c. F. Porsche AG · Stuttgart-Zuffenhausen
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-4">Models & Build</h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><a href="#models" className="hover:text-white transition-colors">911 Coupe & Cabriolet</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">718 Cayman & Boxster</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Taycan Electric</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Panamera E-Hybrid</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Macan Electric</a></li>
              <li><a href="#configurator" className="hover:text-white transition-colors">Porsche Car Configurator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-4">Porsche Design</h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><a href="#shop" className="hover:text-white transition-colors">Chronographs & Watches</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Heritage Luggage & Bags</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">911 Exhaust Audio Systems</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Motorsport Technical Apparel</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Carbon Fiber Eyewear</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-4">Experience & Services</h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><a href="#dealers" className="hover:text-white transition-colors">Porsche Experience Centers</a></li>
              <li><a href="#heritage" className="hover:text-white transition-colors">Acoustic Sound Simulator</a></li>
              <li><a href="#dealers" className="hover:text-white transition-colors">Porsche Track Experience</a></li>
              <li><a href="#dealers" className="hover:text-white transition-colors">Porsche Classic Restoration</a></li>
              <li><a href="#dealers" className="hover:text-white transition-colors">Financial Services & Leasing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-4">Company & Heritage</h4>
            <ul className="space-y-2.5 text-neutral-400 font-light">
              <li><span className="text-neutral-400">Porsche Motorsport History</span></li>
              <li><span className="text-neutral-400">Sustainability & eFuels</span></li>
              <li><span className="text-neutral-400">Porsche Museum Stuttgart</span></li>
              <li><span className="text-neutral-400">Newsroom & Press</span></li>
              <li><span className="text-neutral-400">Investor Relations</span></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Emissions Disclaimer (Industry Standard for Automotive) */}
        <div className="pt-8 border-t border-white/10 text-[11px] text-neutral-400 font-light leading-relaxed space-y-2">
          <p>
            *Manufacturer’s Suggested Retail Price (MSRP) excludes destination freight charge, tax, title, license, options, dealer preparation, and dealer charges. Actual price determined by authorized Porsche Centers.
          </p>
          <p>
            Official fuel consumption and CO2 emissions determined in accordance with the prescribed measurement procedure (WLTP / EPA). Figures do not refer to a single vehicle and do not constitute part of the offer, but serve solely for purposes of comparison between the different vehicle types.
          </p>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © 2026 Dr. Ing. h.c. F. Porsche AG. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Notice</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Recall Information</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
