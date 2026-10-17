import React from 'react';
import { X, ArrowRight, Gauge, Zap, Disc3, ShieldCheck } from 'lucide-react';
import { CarModel } from '../data/porscheData';
import { soundEngine } from '../utils/soundEngine';

interface SpecsModalProps {
  car: CarModel | null;
  onClose: () => void;
  onConfigure: (car: CarModel) => void;
  onOpenTestDrive: (modelName: string) => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({
  car,
  onClose,
  onConfigure,
  onOpenTestDrive,
}) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-white/15 text-white overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              Technical Specification
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-0.5">
              {car.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Car Hero Preview */}
          <div className="relative aspect-[16/8] bg-neutral-900 overflow-hidden border border-white/10">
            <img
              src={car.image}
              alt={car.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">Starting MSRP</span>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  ${car.startingPrice.toLocaleString()}
                </div>
              </div>
              <span className="text-xs font-mono uppercase bg-black/60 px-2.5 py-1 border border-white/20">
                {car.category} Powertrain
              </span>
            </div>
          </div>

          {/* Performance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 border border-white/10 text-center">
            <div>
              <span className="block text-2xl font-bold font-mono text-white tabular-nums">
                {car.specs.zeroToSixty}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">0–60 mph</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-white tabular-nums">
                {car.specs.horsepower} hp
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">Total Power</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-white tabular-nums">
                {car.specs.topSpeedMph} mph
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">Top Speed</span>
            </div>
            <div>
              <span className="block text-sm font-semibold font-mono text-white tabular-nums mt-1.5">
                {car.specs.consumptionOrRange}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">Efficiency</span>
            </div>
          </div>

          {/* Key Standard Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Standard Motorsport Engineering Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {car.features.map((feature, i) => (
                <div key={i} className="p-3 bg-neutral-900/50 border border-white/10 text-xs text-neutral-300">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-white/10 bg-neutral-900/40 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(800);
              onOpenTestDrive(car.name);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs font-semibold tracking-wider uppercase border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-colors"
          >
            Book Experience Drive
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(1000);
              onConfigure(car);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open in Configurator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
