import React, { useState } from 'react';
import { ShoppingBag, Globe, Bookmark, Search, Menu, X, Calendar, Settings, Shield } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  centerName: string;
  cartCount: number;
  onOpenCart: () => void;
  garageCount: number;
  onOpenGarage: () => void;
  bookingsCount: number;
  onOpenBookings: () => void;
  onOpenBookingModal: () => void;
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  onOpenRegion: () => void;
  currentRegion: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  centerName,
  cartCount,
  onOpenCart,
  garageCount,
  onOpenGarage,
  bookingsCount,
  onOpenBookings,
  onOpenBookingModal,
  onOpenAdmin,
  onOpenSearch,
  onOpenRegion,
  currentRegion,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Center & Circuit', href: '#center-about' },
    { label: 'Bookings & Services', href: '#bookings' },
    { label: 'Model Fleet', href: '#models' },
    { label: 'Configurator', href: '#configurator' },
    { label: 'Lifestyle Store', href: '#shop' },
    { label: 'Acoustic Sound', href: '#heritage' },
  ];

  const handleLinkClick = () => {
    soundEngine.playClick(900);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single element Brand Wordmark + Center subtext */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={() => soundEngine.playClick(600)}
            className="flex flex-col group"
          >
            <span className="text-lg sm:text-xl font-bold tracking-[0.35em] uppercase text-white group-hover:text-white/80 transition-colors whitespace-nowrap shrink-0">
              PORSCHE
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors hidden sm:block">
              Experience & Service Center
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Smooth typography) */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-white transition-colors relative py-1.5 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Interactive Affordances & Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Admin Panel Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(1000);
              onOpenAdmin();
            }}
            title="Open Center Admin Console"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase bg-white/10 hover:bg-white hover:text-black border border-white/20 transition-all text-neutral-200"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-semibold">Admin Panel</span>
          </button>

          {/* Bookings Tracker Trigger */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenBookings();
            }}
            title="My Center Reservations"
            className="relative p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {bookingsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* Search Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenSearch();
            }}
            aria-label="Search models and services"
            className="p-2 text-neutral-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Saved Garage / Builds */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenGarage();
            }}
            aria-label="View Saved Garage Builds"
            className="relative p-2 text-neutral-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
          >
            <Bookmark className="w-4 h-4" />
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
            className="relative p-2 text-neutral-300 hover:text-white transition-colors hover:bg-white/10 rounded-full"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#d5001c] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button (Smooth pill) */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(1100);
              onOpenBookingModal();
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-all duration-300 whitespace-nowrap shrink-0 shadow-lg"
          >
            Book Experience
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="xl:hidden p-2 text-neutral-300 hover:text-white rounded-full hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-950/98 border-b border-white/10 px-6 py-8 rounded-b-3xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col space-y-4 text-sm tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="text-neutral-300 hover:text-white transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/20 text-white hover:bg-white/10"
              >
                Admin Control Console
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenBookingModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 shadow-xl"
              >
                Book Track or Service Session
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
