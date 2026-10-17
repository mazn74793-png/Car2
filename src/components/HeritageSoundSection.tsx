import React, { useState } from 'react';
import { Volume2, Gauge, Zap, Disc3, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const HeritageSoundSection: React.FC = () => {
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
      title: 'Boxer Engine Geometry',
      desc: 'Horizontally opposed cylinders ensure a remarkably low center of gravity and optimum balance under severe lateral cornering loads.',
      stat: '9,000 RPM',
      statLabel: 'Rev Limit',
    },
    {
      title: 'Aerodynamic Drag Reduction (DRS)',
      desc: 'Hydraulically actuated rear wing and continuous active front diffusers generate up to 860 kg of downforce at 177 mph.',
      stat: '860 kg',
      statLabel: 'Peak Downforce',
    },
    {
      title: 'Porsche Ceramic Composite Brakes (PCCB)',
      desc: 'Carbon fiber reinforced ceramic discs deliver fade-free braking stability and approximately 50% unsprung mass reduction.',
      stat: '410 mm',
      statLabel: 'Disc Diameter',
    },
    {
      title: '800-Volt Electric Architecture',
      desc: 'Enables continuous repeatable high-power discharge and ultra-fast DC charging from 10% to 80% SoC in just 18 minutes.',
      stat: '320 kW',
      statLabel: 'Charge Rate',
    },
  ];

  const rpmPercentage = Math.min(100, Math.round((rpm / 9000) * 100));

  return (
    <section id="heritage" className="py-24 bg-black border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-3">
            <span>Engineering Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Since 1948</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight [text-wrap:balance]">
            Born on the Track. Built for the Senses.
          </h2>
          <p className="mt-4 text-neutral-400 text-base font-light leading-relaxed">
            Every Porsche is the direct consequence of over 30,000 motorsport race victories. From the 24 Hours of Le Mans to the twisty mountain passes of the Alps, our benchmark remains absolute driving engagement.
          </p>
        </div>

        {/* Interactive Acoustic Cockpit Experience */}
        <div className="bg-neutral-900/60 border border-white/10 p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Tachometer Display */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-black/80 border border-white/10 rounded-sm">
              <div className="relative w-64 h-64 flex flex-col items-center justify-center">
                {/* Dial circle */}
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Gauge background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.1)"
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
                    Engine Speed
                  </span>
                  <div className="text-4xl font-extrabold font-mono text-white tabular-nums tracking-tight my-1">
                    {rpm > 0 ? rpm.toLocaleString() : '850'}
                  </div>
                  <div className="text-xs font-mono text-[#d5001c] font-bold tracking-widest">
                    RPM × 1000
                  </div>
                </div>
              </div>

              {/* Shift Light Array */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((barIdx) => {
                  const threshold = barIdx * 1200;
                  const active = rpm >= threshold;
                  const isRedline = barIdx >= 6;
                  return (
                    <div
                      key={barIdx}
                      className={`h-2 w-6 transition-all duration-100 ${
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
                  Acoustic Simulator
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-white mt-1">
                  Naturally Aspirated Flat-6 Exhaust
                </h3>
                <p className="text-sm text-neutral-400 font-light mt-2 leading-relaxed">
                  Experience the pulse of the 4.0-liter six-cylinder boxer. The unique firing order creates resonant acoustic waves celebrated by enthusiasts worldwide.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Engine Type</span>
                  <span className="text-white">4.0L Aluminum Boxer 6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Idle / Peak RPM</span>
                  <span className="text-white">850 / 9,000 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Exhaust Layout</span>
                  <span className="text-white">Dual Center Titanium Tailpipes</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleThrottleRev}
                  disabled={isPlaying}
                  className={`w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isPlaying
                      ? 'bg-[#d5001c] text-white shadow-[0_0_20px_rgba(213,0,28,0.5)] cursor-not-allowed'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlaying ? 'Revving to 8,500 RPM...' : 'Press Throttle Pedal'}</span>
                </button>

                <span className="text-xs text-neutral-400 font-mono text-center sm:text-left">
                  Click to fire audio rev sequence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 bg-neutral-900/30 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="block text-2xl font-bold font-mono text-white tabular-nums mb-1">
                  {pillar.stat}
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-4">
                  {pillar.statLabel}
                </span>
                <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
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
