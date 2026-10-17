import React from 'react';
import { X, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: string;
  onSelectRegion: (region: string) => void;
}

export const RegionModal: React.FC<RegionModalProps> = ({
  isOpen,
  onClose,
  currentRegion,
  onSelectRegion,
}) => {
  if (!isOpen) return null;

  const regions = [
    { code: 'US', name: 'United States', lang: 'English (US)', currency: 'USD ($)' },
    { code: 'DE', name: 'Deutschland', lang: 'Deutsch', currency: 'EUR (€)' },
    { code: 'GB', name: 'United Kingdom', lang: 'English (UK)', currency: 'GBP (£)' },
    { code: 'JP', name: '日本 (Japan)', lang: '日本語', currency: 'JPY (¥)' },
    { code: 'FR', name: 'France', lang: 'Français', currency: 'EUR (€)' },
    { code: 'CH', name: 'Schweiz / Suisse', lang: 'Deutsch / Français', currency: 'CHF' },
    { code: 'AE', name: 'United Arab Emirates', lang: 'English / العربية', currency: 'AED' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-neutral-950 border border-white/15 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              Porsche Global
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-white mt-0.5">
              Select Region & Language
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-2">
          {regions.map((reg) => {
            const isSelected = currentRegion === reg.code;
            return (
              <button
                key={reg.code}
                type="button"
                onClick={() => {
                  soundEngine.playClick(900);
                  onSelectRegion(reg.code);
                  onClose();
                }}
                className={`w-full p-3.5 border transition-all flex items-center justify-between text-left ${
                  isSelected
                    ? 'border-white bg-white/10 ring-1 ring-white'
                    : 'border-white/10 hover:border-white/30 bg-neutral-900/40'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-white uppercase">{reg.name}</div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    {reg.lang} · {reg.currency}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
