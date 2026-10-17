import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { CAR_MODELS, LIFESTYLE_PRODUCTS, CarModel, LifestyleProduct } from '../data/porscheData';
import { soundEngine } from '../utils/soundEngine';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (car: CarModel) => void;
  onSelectProduct: (product: LifestyleProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCar,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredCars = CAR_MODELS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      c.series.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = LIFESTYLE_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search 911, Taycan, Chronograph, GT3, Leather..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-500 font-sans"
          />
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Vehicles matches */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-3">
              Porsche Vehicles ({filteredCars.length})
            </span>
            {filteredCars.length === 0 ? (
              <p className="text-xs text-neutral-500">No vehicles match your search query.</p>
            ) : (
              <div className="space-y-2">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      soundEngine.playClick(900);
                      onSelectCar(car);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-neutral-900/60 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-9 object-cover bg-neutral-950"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase">{car.name}</h4>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {car.category} · {car.specs.horsepower} hp · {car.specs.zeroToSixty} 0-60
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white tabular-nums">
                        ${car.startingPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lifestyle products matches */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-3">
              Lifestyle & Accessories ({filteredProducts.length})
            </span>
            {filteredProducts.length === 0 ? (
              <p className="text-xs text-neutral-500">No lifestyle items found.</p>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      soundEngine.playClick(900);
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-neutral-900/60 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover bg-neutral-950"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-white">{prod.name}</h4>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {prod.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-white tabular-nums">
                      ${prod.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
