import React, { useState } from 'react';
import { ShoppingBag, Globe, Bookmark, Search, Menu, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  garageCount: number;
  onOpenGarage: () => void;
  onOpenSearch: () => void;
  onOpenRegion: () => void;
  currentRegion: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  garageCount,
  onOpenGarage,
  onOpenSearch,
  onOpenRegion,
  currentRegion,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Models', href: '#models' },
    { label: 'Configurator', href: '#configurator' },
    { label: 'Lifestyle Shop', href: '#shop' },
    { label: 'Acoustic Heritage', href: '#heritage' },
    { label: 'Experience Centers', href: '#dealers' },
  ];

  const handleLinkClick = () => {
    soundEngine.playClick(900);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single element Brand Wordmark */}
        <a
          href="#"
          onClick={() => soundEngine.playClick(600)}
          className="text-lg sm:text-xl font-bold tracking-[0.35em] uppercase text-white hover:text-white/80 transition-colors whitespace-nowrap shrink-0"
        >
          PORSCHE
        </a>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Interactive Affordances & Primary Action */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenSearch();
            }}
            aria-label="Search models and accessories"
            className="p-2 text-neutral-300 hover:text-white transition-colors hover:bg-white/5 rounded-full"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Region / Country selector */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenRegion();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 rounded-full transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase">{currentRegion}</span>
          </button>

          {/* Saved Garage / Builds */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenGarage();
            }}
            aria-label="View Saved Garage Builds"
            className="relative p-2 text-neutral-300 hover:text-white transition-colors hover:bg-white/5 rounded-full"
          >
            <Bookmark className="w-5 h-5" />
            {garageCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {garageCount}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenCart();
            }}
            aria-label="Shopping bag"
            className="relative p-2 text-neutral-300 hover:text-white transition-colors hover:bg-white/5 rounded-full"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d5001c] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <a
            href="#configurator"
            onClick={handleLinkClick}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all duration-300 whitespace-nowrap shrink-0"
          >
            Configure
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-white/10 px-6 py-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col space-y-5 text-base tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="text-neutral-300 hover:text-white transition-colors py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenRegion();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-neutral-400 py-2"
              >
                <Globe className="w-4 h-4" />
                <span>Region: {currentRegion}</span>
              </button>
              <a
                href="#configurator"
                onClick={handleLinkClick}
                className="w-full text-center py-3 text-xs font-semibold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                Configure Your 911
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
