import React from 'react';
import { X, Trash2, ArrowRight, ExternalLink } from 'lucide-react';
import { SavedBuild } from './CarConfigurator';
import { soundEngine } from '../utils/soundEngine';

interface GarageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  builds: SavedBuild[];
  onRemoveBuild: (id: string) => void;
  onLoadBuild: (build: SavedBuild) => void;
  onOpenTestDrive: (modelName: string) => void;
}

export const GarageDrawer: React.FC<GarageDrawerProps> = ({
  isOpen,
  onClose,
  builds,
  onRemoveBuild,
  onLoadBuild,
  onOpenTestDrive,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundEngine.playClick(600);
          onClose();
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400">
                My Porsche Garage
              </span>
              <span className="font-mono text-xs text-neutral-500">
                ({builds.length} builds)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(600);
                onClose();
              }}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close garage"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {builds.length === 0 ? (
              <div className="py-24 text-center space-y-3">
                <p className="text-neutral-400 text-sm font-light">No saved configurations yet.</p>
                <p className="text-xs text-neutral-500 font-mono">
                  Use the interactive configurator to personalize your 911 and save your custom build here.
                </p>
                <a
                  href="#configurator"
                  onClick={() => {
                    soundEngine.playClick();
                    onClose();
                  }}
                  className="inline-block mt-4 px-6 py-2.5 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  Go to Configurator
                </a>
              </div>
            ) : (
              builds.map((build) => (
                <div
                  key={build.id}
                  className="p-4 bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-tight text-white">
                        {build.model}
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Saved on {build.savedAt}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick(600);
                        onRemoveBuild(build.id);
                      }}
                      aria-label="Delete saved build"
                      className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono py-2 border-y border-white/10 text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/20"
                        style={{ backgroundColor: build.color.hex }}
                      />
                      <span className="truncate text-white">{build.color.name}</span>
                    </div>
                    <div className="truncate text-right text-neutral-300">
                      {build.wheel.name}
                    </div>
                    <div className="truncate text-neutral-400">
                      {build.interior.name}
                    </div>
                    <div className="text-right text-neutral-400">
                      {build.caliperColor}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                        Configured MSRP
                      </span>
                      <span className="text-base font-bold font-mono text-white tabular-nums">
                        ${build.totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick(900);
                          onOpenTestDrive(`${build.model} (${build.color.name})`);
                          onClose();
                        }}
                        className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-colors"
                      >
                        Reserve
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick(1000);
                          onLoadBuild(build);
                          onClose();
                        }}
                        className="px-3 py-2 text-[11px] font-bold tracking-wider uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
                      >
                        Load
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
