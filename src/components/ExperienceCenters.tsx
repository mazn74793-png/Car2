import React from 'react';
import { MapPin, Navigation, Calendar, Award } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ExperienceCentersProps {
  onBookExperience: (centerName: string) => void;
}

export const ExperienceCenters: React.FC<ExperienceCentersProps> = ({ onBookExperience }) => {
  const centers = [
    {
      name: 'Porsche Experience Center Los Angeles',
      location: 'Carson, California, USA',
      track: '4.1-mile driver development track, kick plate & ice hill simulator',
      highlight: '911 GT3 RS Masterclass & Off-Road Course',
      image: '/images/hero_flagship_gt3rs_1792255768458.jpg',
    },
    {
      name: 'Porsche Experience Center Atlanta',
      location: 'One Porsche Drive, Georgia, USA',
      track: '1.6-mile handling circuit, low-friction handling & dynamics area',
      highlight: 'Heritage Gallery & Restaurant 356',
      image: '/images/car_config_studio_1792255768943.jpg',
    },
    {
      name: 'Porsche Experience Center Leipzig',
      location: 'Porschestraße 1, Leipzig, Germany',
      track: 'FIA-certified circuit replicating iconic motorsport corners',
      highlight: 'Factory Collection & Off-Road Wilderness Terrain',
      image: '/images/hero_taycan_ev_1792255769211.jpg',
    },
  ];

  return (
    <section id="dealers" className="py-24 bg-[#070709] border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-2">
              <span>Porsche Experience Centers</span>
              <span aria-hidden="true">·</span>
              <span>Global Destination Circuits</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              Drive Beyond the Limit
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Test the dynamics of the Porsche range under the guidance of certified Porsche track instructors on world-class closed circuits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {centers.map((c) => (
            <div
              key={c.name}
              className="group smooth-glass-card rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 rounded-t-3xl">
                <img
                  src={c.image}
                  alt={c.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#d5001c]" />
                  <span>{c.location}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    {c.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-3">
                    {c.track}
                  </p>
                  <div className="text-[11px] font-mono text-neutral-300 bg-white/5 p-3 rounded-2xl border border-white/10">
                    <span className="text-neutral-400 block text-[9px] uppercase tracking-wider mb-0.5">
                      Featured Program
                    </span>
                    {c.highlight}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(1000);
                    onBookExperience(c.name);
                  }}
                  className="w-full py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Track Program</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
