import React, { useState } from 'react';
import { LIFESTYLE_PRODUCTS, LifestyleProduct } from '../data/porscheData';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface LifestyleShopProps {
  onAddToCart: (product: LifestyleProduct) => void;
  onQuickView: (product: LifestyleProduct) => void;
}

type ShopCategory = 'All' | 'Timepieces' | 'Luggage' | 'Audio' | 'Apparel';

export const LifestyleShop: React.FC<LifestyleShopProps> = ({ onAddToCart, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = LIFESTYLE_PRODUCTS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const categories: ShopCategory[] = ['All', 'Timepieces', 'Luggage', 'Audio', 'Apparel'];

  const handleAdd = (product: LifestyleProduct) => {
    soundEngine.playClick(1150);
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 2000);
  };

  return (
    <section id="shop" className="py-24 bg-[#0a0a0c] border-b border-white/10 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-neutral-400 mb-2">
              <span>Porsche Design</span>
              <span aria-hidden="true">·</span>
              <span>Center Boutique</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase [text-wrap:balance]">
              The Lifestyle Collection
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Form follows function. Precision-crafted timepieces, handcrafted leather travel goods, and acoustic systems forged with motorsport pedigree.
          </p>
        </div>

        {/* Category Tabs (Smooth Pill Bar) */}
        <div className="py-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/80 border border-white/10 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundEngine.playClick(900);
                  setSelectedCategory(cat);
                }}
                className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap rounded-full ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span>Complimentary Global Express Delivery</span>
            <span aria-hidden="true">·</span>
            <span>2-Year Warranty</span>
          </div>
        </div>

        {/* Product Cards Grid (Smooth Rounded-3xl Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                className="group smooth-glass-card rounded-3xl flex flex-col justify-between overflow-hidden"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed tag */}
                  <div className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-mono text-neutral-300 bg-black/60 px-3 py-1 rounded-full border border-white/15">
                    {product.tag}
                  </div>

                  {/* Quick View Button on Image Hover */}
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      onQuickView(product);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-neutral-300 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1 text-amber-400/90">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px]">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-white tracking-wide leading-snug mb-2 group-hover:text-neutral-200 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-neutral-400 font-light line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Bag (Smooth pill button) */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <span className="text-base font-bold font-mono text-white tabular-nums">
                      ${product.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-black hover:bg-neutral-200'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
