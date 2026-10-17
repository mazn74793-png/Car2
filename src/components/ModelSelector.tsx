import React, { useState } from 'react';
import { CAR_MODELS, CarModel } from '../data/porscheData';
import { ArrowUpRight, SlidersHorizontal, Calendar } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ModelSelectorProps {
  onConfigureModel: (model: CarModel) => void;
  onOpenSpecsModal: (model: CarModel) => void;
  onOpenTestDrive: (modelName: string) => void;
}

type CategoryFilter = 'All' | 'Gasoline' | 'Hybrid' | 'All-Electric';
type SeriesFilter = 'All' | '911' | '718' | 'Taycan' | 'Panamera' | 'Macan';

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  onConfigureModel,
  onOpenSpecsModal,
  onOpenTestDrive,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [activeSeries, setActiveSeries] = useState<SeriesFilter>('All');

  const filteredModels = CAR_MODELS.filter((car) => {
    const matchesCategory = activeCategory === 'All' || car.category === activeCategory;
    const matchesSeries = activeSeries === 'All' || car.series === activeSeries;
    return matchesCategory && matchesSeries;
  });

  const categories: CategoryFilter[] = ['All', 'Gasoline', 'Hybrid', 'All-Electric'];
  const seriesList: SeriesFilter[] = ['All', '911', '718', 'Taycan', 'Panamera', 'Macan'];

  return (
    <section id="models" className="py-24 bg-[#080808] border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-2">
              <span>Center Showroom Fleet</span>
              <span aria-hidden="true">·</span>
              <span>Stuttgart Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              Explore The Vehicle Fleet
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Every vehicle engineered with uncompromising racing DNA. From naturally aspirated boxers to high-voltage electric track performance.
          </p>
        </div>

        {/* Filter Controls Bar (Smooth rounded pill container) */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Powertrain Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/80 border border-white/10 rounded-full overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundEngine.playClick(850);
                  setActiveCategory(cat);
                }}
                className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap rounded-full ${
                  activeCategory === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Series filter tabs */}
          <div className="flex items-center gap-4 text-xs font-mono tracking-wider text-neutral-400 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-neutral-500 uppercase">Series:</span>
            {seriesList.map((series) => (
              <button
                key={series}
                type="button"
                onClick={() => {
                  soundEngine.playClick(900);
                  setActiveSeries(series);
                }}
                className={`transition-colors whitespace-nowrap px-2 py-1 rounded-full ${
                  activeSeries === series
                    ? 'text-white font-bold bg-white/10'
                    : 'hover:text-white'
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>

        {/* Models Grid (Smooth Rounded-3xl Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredModels.map((car) => (
            <div
              key={car.id}
              className="group smooth-glass-card rounded-3xl flex flex-col justify-between overflow-hidden"
            >
              {/* Image & Silhouette Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 rounded-t-3xl">
                <img
                  src={car.image}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Badge text (smooth pill) */}
                {car.badge && (
                  <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] font-mono uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-neutral-200">
                    {car.badge}
                  </div>
                )}

                <div className="absolute top-4 right-4 text-[10px] font-mono bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full text-neutral-300">
                  {car.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-neutral-100 transition-colors">
                      {car.name}
                    </h3>
                  </div>

                  <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6 line-clamp-2">
                    {car.tagline}
                  </p>

                  {/* Clean unboxed specs strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center mb-6">
                    <div>
                      <span className="block text-sm font-bold font-mono text-white tabular-nums">
                        {car.specs.zeroToSixty}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                        0–60 mph
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold font-mono text-white tabular-nums">
                        {car.specs.horsepower} hp
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                        Power
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold font-mono text-white tabular-nums">
                        {car.specs.topSpeedMph} mph
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                        Top Speed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer price & actions (Smooth pill buttons) */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                      Starting MSRP
                    </span>
                    <span className="text-lg font-bold font-mono text-white tabular-nums">
                      ${car.startingPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(1000);
                        onConfigureModel(car);
                      }}
                      className="py-2.5 px-3 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-1 shadow-md"
                    >
                      <span>Build</span>
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(800);
                        onOpenSpecsModal(car);
                      }}
                      className="py-2.5 px-3 rounded-full text-xs font-medium tracking-wider uppercase bg-transparent text-neutral-300 hover:text-white border border-white/20 hover:border-white transition-all flex items-center justify-center gap-1"
                    >
                      <span>Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(900);
                        onOpenTestDrive(car.name);
                      }}
                      className="py-2.5 px-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Drive</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
