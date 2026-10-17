import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LifestyleProduct } from '../data/porscheData';
import { soundEngine } from '../utils/soundEngine';

export interface CartItem {
  product: LifestyleProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: 'Alexander Vance',
    email: 'mizoo2y2@gmail.com',
    address: '742 Evergreen Terrace',
    city: 'Beverly Hills',
    postal: '90210',
    country: 'United States',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const estimatedTax = Math.round(subtotal * 0.0825);
  const orderTotal = subtotal + shipping + estimatedTax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(1200);
    const orderNumber = `PD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmed(orderNumber);
    setIsCheckingOut(false);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
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
                Shopping Bag
              </span>
              <span className="font-mono text-xs text-neutral-500">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(600);
                onClose();
              }}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Order Confirmed</h3>
                <p className="text-xs text-neutral-400 font-mono">Reference #{orderConfirmed}</p>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Thank you for purchasing from the Porsche Design Collection. A confirmation email with white-glove tracking has been sent to your email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderConfirmed(null);
                    onClose();
                  }}
                  className="mt-4 px-6 py-3 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  Return to Store
                </button>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 border-b border-white/10 pb-2">
                  White Glove Shipping Details
                </h3>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postal}
                      onChange={(e) => setFormData({ ...formData, postal: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Total Billed</span>
                    <span className="font-bold text-white">${orderTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Payment Method</span>
                    <span>Encrypted Card / Apple Pay</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-3 text-xs font-medium uppercase border border-white/20 hover:border-white text-neutral-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
                  >
                    Authorize Payment
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-neutral-400 text-sm font-light">Your shopping bag is empty.</p>
                <p className="text-xs text-neutral-500 font-mono">
                  Explore our curated watches, bags, and lifestyle equipment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-neutral-900/50 border border-white/10"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover bg-neutral-950 shrink-0 border border-white/10"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick(600);
                              onRemoveItem(item.product.id);
                            }}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-neutral-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase">
                          {item.product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/15 bg-black">
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick(750);
                              onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1));
                            }}
                            aria-label="Decrease quantity"
                            className="p-1 hover:text-white text-neutral-400"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick(850);
                              onUpdateQuantity(item.product.id, item.quantity + 1);
                            }}
                            aria-label="Increase quantity"
                            className="p-1 hover:text-white text-neutral-400"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold font-mono text-white tabular-nums">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {!orderConfirmed && !isCheckingOut && items.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4 bg-neutral-950">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>White Glove Express Delivery</span>
                  <span className="font-mono text-white">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax</span>
                  <span className="font-mono text-white tabular-nums">${estimatedTax.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Total</span>
                  <span className="text-xl font-bold font-mono text-white tabular-nums">
                    ${orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick(1000);
                  setIsCheckingOut(true);
                }}
                className="w-full py-3.5 px-4 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-light">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>Official Porsche Design Authenticity Guaranteed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
