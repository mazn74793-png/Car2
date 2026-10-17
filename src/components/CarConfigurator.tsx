import React, { useState } from 'react';
import {
  CONFIG_COLORS,
  CONFIG_WHEELS,
  CONFIG_INTERIORS,
  ConfigColor,
  ConfigWheel,
  ConfigInterior,
} from '../data/porscheData';
import {
  Check,
  Bookmark,
  Share2,
  Sparkles,
  Download,
  Info,
  Calendar,
  Layers,
  CircleDot,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CarConfiguratorProps {
  onSaveToGarage: (build: SavedBuild) => void;
  onOpenTestDrive: (modelName: string) => void;
}

export interface SavedBuild {
  id: string;
  model: string;
  color: ConfigColor;
  wheel: ConfigWheel;
  interior: ConfigInterior;
  caliperColor: string;
  headlightsOn: boolean;
  totalPrice: number;
  savedAt: string;
}

export const CarConfigurator: React.FC<CarConfiguratorProps> = ({
  onSaveToGarage,
  onOpenTestDrive,
}) => {
  const basePrice = 164900;
  const [selectedColor, setSelectedColor] = useState<ConfigColor>(CONFIG_COLORS[0]); // Crayon White by default
  const [selectedWheel, setSelectedWheel] = useState<ConfigWheel>(CONFIG_WHEELS[0]);
  const [selectedInterior, setSelectedInterior] = useState<ConfigInterior>(CONFIG_INTERIORS[0]);
  const [selectedCaliper, setSelectedCaliper] = useState<{ name: string; hex: string; price: number }>({
    name: 'PCCB Racing Yellow',
    hex: '#F5B700',
    price: 9860,
  });
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [spoilerExtended, setSpoilerExtended] = useState(false);
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'interior' | 'calipers'>('paint');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const calipers = [
    { name: 'PCCB Racing Yellow', hex: '#F5B700', price: 9860 },
    { name: 'Carmine Red', hex: '#A1121C', price: 0 },
    { name: 'High-Gloss Black', hex: '#111111', price: 900 },
  ];

  const totalPrice =
    basePrice +
    selectedColor.price +
    selectedWheel.price +
    selectedInterior.price +
    selectedCaliper.price;

  const handleColorChange = (c: ConfigColor) => {
    soundEngine.playClick(950);
    setSelectedColor(c);
  };

  const handleWheelChange = (w: ConfigWheel) => {
    soundEngine.playClick(880);
    setSelectedWheel(w);
  };

  const handleInteriorChange = (i: ConfigInterior) => {
    soundEngine.playClick(820);
    setSelectedInterior(i);
  };

  const handleCaliperChange = (caliper: typeof calipers[0]) => {
    soundEngine.playClick(780);
    setSelectedCaliper(caliper);
  };

  const handleSaveBuild = () => {
    soundEngine.playClick(1100);
    const newBuild: SavedBuild = {
      id: `build-${Date.now()}`,
      model: 'Porsche 911 Carrera GTS',
      color: selectedColor,
      wheel: selectedWheel,
      interior: selectedInterior,
      caliperColor: selectedCaliper.name,
      headlightsOn,
      totalPrice,
      savedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    onSaveToGarage(newBuild);
    setSavedNotification(`Saved ${selectedColor.name} 911 build to your garage`);
    setTimeout(() => setSavedNotification(null), 3500);
  };

  const handleDownloadSpecs = () => {
    soundEngine.playClick(900);
    const specData = {
      model: 'Porsche 911 Carrera GTS (992.2)',
      configurationDate: new Date().toISOString(),
      exteriorColor: {
        name: selectedColor.name,
        finish: selectedColor.finish,
        price: selectedColor.price,
      },
      wheels: {
        name: selectedWheel.name,
        size: selectedWheel.size,
        price: selectedWheel.price,
      },
      interior: {
        name: selectedInterior.name,
        material: selectedInterior.material,
        price: selectedInterior.price,
      },
      brakeSystem: {
        name: selectedCaliper.name,
        price: selectedCaliper.price,
      },
      financialSummary: {
        baseMSRP: basePrice,
        optionsTotal: totalPrice - basePrice,
        totalConfiguredMSRP: totalPrice,
      },
    };

    const blob = new Blob([JSON.stringify(specData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `porsche-911-config-${selectedColor.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="configurator" className="py-24 bg-neutral-950 border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-10 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-2">
              <span>Porsche Exclusive Manufaktur</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Configurator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              Build Your 911 Carrera GTS
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {savedNotification && (
              <span className="text-xs text-emerald-400 font-mono tracking-wide animate-in fade-in duration-200">
                {savedNotification}
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveBuild}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save to Garage</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadSpecs}
              aria-label="Download specification summary"
              className="p-2.5 text-neutral-400 hover:text-white border border-white/20 hover:border-white transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Configurator Workspace (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10">
          {/* Visual Stage (Left / Center Column - 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Visualizer Frame */}
            <div className="relative w-full aspect-[16/9] bg-[#0c0d10] border border-white/10 overflow-hidden flex items-center justify-center group shadow-2xl">
              {/* Studio Stage Ambient Lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

              {/* Base Studio Car Image with Dynamic Color Transformations */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/src/assets/images/car_config_studio_1792255768943.jpg"
                  alt={`Porsche 911 configured in ${selectedColor.name}`}
                  referrerPolicy="no-referrer"
                  style={{
                    filter: selectedColor.filterStyle.filter,
                    transition: 'filter 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full object-cover select-none"
                />

                {/* Metallic / Color Layer Blend Shading */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{
                    backgroundColor: selectedColor.filterStyle.overlayBg,
                    mixBlendMode: selectedColor.filterStyle.blendMode as unknown as React.CSSProperties['mixBlendMode'],
                  }}
                />

                {/* Headlights Glow Overlay */}
                {headlightsOn && (
                  <div className="absolute top-[48%] left-[17%] w-16 h-16 rounded-full bg-cyan-100/30 blur-xl pointer-events-none transition-opacity duration-500 animate-pulse" />
                )}

                {/* Active Aero Downforce Wing Simulation Marker */}
                {spoilerExtended && (
                  <div className="absolute top-[41%] right-[15%] w-12 h-3 border-t-2 border-white/80 pointer-events-none transition-all duration-300" />
                )}

                {/* Selected Caliper Color Accent Indicator near wheels */}
                <div
                  className="absolute bottom-[23%] left-[29%] w-3 h-4 rounded-sm shadow-sm transition-colors duration-500 pointer-events-none opacity-90"
                  style={{ backgroundColor: selectedCaliper.hex }}
                />
                <div
                  className="absolute bottom-[23%] right-[29%] w-3 h-4 rounded-sm shadow-sm transition-colors duration-500 pointer-events-none opacity-90"
                  style={{ backgroundColor: selectedCaliper.hex }}
                />
              </div>

              {/* Stage Controls Overlay (Bottom bar inside visualizer) */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{selectedColor.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedWheel.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setHeadlightsOn(!headlightsOn);
                    }}
                    className={`flex items-center gap-1 transition-colors ${
                      headlightsOn ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lights {headlightsOn ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSpoilerExtended(!spoilerExtended);
                    }}
                    className={`flex items-center gap-1 transition-colors ${
                      spoilerExtended ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Aero {spoilerExtended ? 'Extended' : 'Standard'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Spec Strip */}
            <div className="grid grid-cols-4 gap-4 py-6 border-b border-white/10 text-center">
              <div>
                <span className="block text-xl font-bold font-mono text-white tabular-nums">532 hp</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">T-Hybrid Power</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-white tabular-nums">2.9 s</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">0–60 mph</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-white tabular-nums">194 mph</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">Top Speed</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-white tabular-nums">Boxer 6</span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">3.6L Turbo</span>
              </div>
            </div>
          </div>

          {/* Configuration Options Column (Right - 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Category Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 border border-white/10 rounded-lg mb-6">
                {[
                  { id: 'paint', label: 'Paint' },
                  { id: 'wheels', label: 'Wheels' },
                  { id: 'calipers', label: 'Brakes' },
                  { id: 'interior', label: 'Cabin' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick(900);
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`py-2 text-[11px] font-bold tracking-wider uppercase transition-colors rounded-md ${
                      activeTab === tab.id
                        ? 'bg-white text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Paint Colors */}
              {activeTab === 'paint' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-400">
                    <span>Exterior Color ({CONFIG_COLORS.length})</span>
                    <span className="font-mono text-white">
                      {selectedColor.price === 0 ? 'Standard' : `+$${selectedColor.price.toLocaleString()}`}
                    </span>
                  </div>

                  {/* Swatches Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {CONFIG_COLORS.map((c) => {
                      const isSelected = selectedColor.id === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleColorChange(c)}
                          className={`flex flex-col items-center gap-2 p-3 border transition-all text-left ${
                            isSelected
                              ? 'border-white bg-white/10 ring-1 ring-white'
                              : 'border-white/10 hover:border-white/40 bg-neutral-900/60'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full border border-white/30 shadow-inner flex items-center justify-center transition-transform group-hover:scale-105"
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <Check
                                className={`w-4 h-4 ${
                                  c.hex === '#D9D7CE' || c.hex === '#989DA1' ? 'text-black' : 'text-white'
                                }`}
                              />
                            )}
                          </div>
                          <div className="text-center">
                            <span className="block text-[11px] font-medium text-white line-clamp-1 leading-tight">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {c.price === 0 ? 'Included' : `+$${c.price}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-2">
                    Features dual-layer clear lacquer for profound optical depth. Formulated to resist high thermal stress during circuit operation.
                  </p>
                </div>
              )}

              {/* Tab 2: Wheels */}
              {activeTab === 'wheels' && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-400">
                    <span>Wheel Package</span>
                    <span className="font-mono text-white">
                      {selectedWheel.price === 0 ? 'Standard' : `+$${selectedWheel.price.toLocaleString()}`}
                    </span>
                  </div>

                  {CONFIG_WHEELS.map((w) => {
                    const isSelected = selectedWheel.id === w.id;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => handleWheelChange(w)}
                        className={`w-full text-left p-3.5 border transition-all ${
                          isSelected
                            ? 'border-white bg-white/10 ring-1 ring-white'
                            : 'border-white/10 hover:border-white/40 bg-neutral-900/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white uppercase tracking-wide">
                            {w.name}
                          </span>
                          <span className="text-xs font-mono text-neutral-300">
                            {w.price === 0 ? 'Included' : `+$${w.price.toLocaleString()}`}
                          </span>
                        </div>
                        <span className="block text-[11px] text-neutral-400 font-mono mb-1">{w.size}</span>
                        <p className="text-[11px] text-neutral-400 font-light">{w.description}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 3: Calipers */}
              {activeTab === 'calipers' && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-400">
                    <span>Braking System & Calipers</span>
                    <span className="font-mono text-white">
                      {selectedCaliper.price === 0 ? 'Standard' : `+$${selectedCaliper.price.toLocaleString()}`}
                    </span>
                  </div>

                  {calipers.map((cal) => {
                    const isSelected = selectedCaliper.name === cal.name;
                    return (
                      <button
                        key={cal.name}
                        type="button"
                        onClick={() => handleCaliperChange(cal)}
                        className={`w-full text-left p-3.5 border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-white bg-white/10 ring-1 ring-white'
                            : 'border-white/10 hover:border-white/40 bg-neutral-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: cal.hex }}
                          />
                          <div>
                            <span className="text-xs font-bold text-white uppercase block">
                              {cal.name}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              High-performance monobloc fixed calipers
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-neutral-300">
                          {cal.price === 0 ? 'Standard' : `+$${cal.price.toLocaleString()}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 4: Cabin Interior */}
              {activeTab === 'interior' && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-400">
                    <span>Interior Upholstery</span>
                    <span className="font-mono text-white">
                      {selectedInterior.price === 0 ? 'Standard' : `+$${selectedInterior.price.toLocaleString()}`}
                    </span>
                  </div>

                  {CONFIG_INTERIORS.map((inter) => {
                    const isSelected = selectedInterior.id === inter.id;
                    return (
                      <button
                        key={inter.id}
                        type="button"
                        onClick={() => handleInteriorChange(inter)}
                        className={`w-full text-left p-3.5 border transition-all ${
                          isSelected
                            ? 'border-white bg-white/10 ring-1 ring-white'
                            : 'border-white/10 hover:border-white/40 bg-neutral-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                            style={{ backgroundColor: inter.colorHex }}
                          />
                          <span className="text-xs font-bold text-white uppercase">
                            {inter.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-light mb-1">{inter.material}</p>
                        <span className="text-xs font-mono text-neutral-300">
                          {inter.price === 0 ? 'Included' : `+$${inter.price.toLocaleString()}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price Breakdown & Final Reserve Bar */}
            <div className="pt-6 border-t border-white/15 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Base Vehicle MSRP</span>
                  <span className="font-mono tabular-nums text-white">${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Equipment</span>
                  <span className="font-mono tabular-nums text-white">
                    +${(totalPrice - basePrice).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Delivery & Processing</span>
                  <span className="font-mono tabular-nums text-white">$1,650</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Total Configured Price
                  </span>
                  <span className="text-xl font-bold font-mono text-white tabular-nums">
                    ${(totalPrice + 1650).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick(1000);
                    onOpenTestDrive('Porsche 911 Carrera GTS');
                  }}
                  className="w-full py-3.5 px-4 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors text-center"
                >
                  Book Test Drive
                </button>
                <button
                  type="button"
                  onClick={handleSaveBuild}
                  className="w-full py-3.5 px-4 text-xs font-bold tracking-widest uppercase bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 transition-colors text-center flex items-center justify-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Build</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
