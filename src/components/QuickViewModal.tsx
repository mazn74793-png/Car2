import React from 'react';
import { X, ShoppingBag, Star, Check, Shield } from 'lucide-react';
import { LifestyleProduct } from '../data/porscheData';
import { soundEngine } from '../utils/soundEngine';

interface QuickViewModalProps {
  product: LifestyleProduct | null;
  onClose: () => void;
  onAddToCart: (product: LifestyleProduct) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-[11px] font-mono text-neutral-400">{product.tag}</span>
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

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="aspect-[4/3] bg-neutral-900 border border-white/10 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-mono">{product.rating} / 5.0 Precision Rating</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                {product.name}
              </h3>
              <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                ${product.price.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                Specification Details
              </span>
              {product.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                  <Check className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick(1150);
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
