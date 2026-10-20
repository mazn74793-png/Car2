import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Calendar,
  Settings,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  Volume2,
  MapPin,
} from 'lucide-react';
import { Language, ThemeMode } from '../data/centerContentI18n';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  centerName: string;
  lang: Language;
  onToggleLang: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  bookingsCount: number;
  onOpenBookings: () => void;
  onOpenBookingForm: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  centerName,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  bookingsCount,
  onOpenBookings,
  onOpenBookingForm,
  onOpenAdmin,
}) => {
  const isAr = lang === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      id: 'center-story',
      label: isAr ? 'عن المركز' : 'About Center',
      icon: Info,
    },
    {
      id: 'services-grid',
      label: isAr ? 'خدمات الصيانة' : 'Services',
      icon: Wrench,
    },
    {
      id: 'booking-form',
      label: isAr ? 'حجز موعد صيانة' : 'Book Appointment',
      icon: Calendar,
      highlight: true,
    },
    {
      id: 'facilities',
      label: isAr ? 'مرافق المركز' : 'Workshop Bays',
      icon: Sparkles,
    },
    {
      id: 'heritage',
      label: isAr ? 'صوت المحرك' : 'Acoustic Sound',
      icon: Volume2,
    },
    {
      id: 'location-contact',
      label: isAr ? 'الموقع وساعات العمل' : 'Location & Hours',
      icon: MapPin,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    soundEngine.playClick(900);
    setMobileMenuOpen(false);

    // Smooth direct scroll to section
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const navHeight = 78;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth',
        });
      }
    });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-black/5 dark:border-white/10'
            : 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Wordmark & Official Service Label */}
          <div className="flex items-center gap-3.5 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playClick(600);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col group cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-[0.35em] uppercase text-neutral-900 dark:text-white group-hover:opacity-90 transition-opacity whitespace-nowrap">
                  PORSCHE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d5001c] animate-pulse" />
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#d5001c] font-bold">
                {isAr ? 'مركز الصيانة المعتمد' : 'Certified Service Center'}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links (Visible on xl screens 1280px+ to ensure zero collision) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-semibold tracking-wider text-neutral-700 dark:text-neutral-300 shrink">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors relative py-1.5 whitespace-nowrap cursor-pointer ${
                  link.highlight
                    ? 'text-[#d5001c] font-bold hover:text-red-700 dark:hover:text-red-400'
                    : 'hover:text-black dark:hover:text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d5001c] hover:after:w-full after:transition-all after:duration-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Controls Bar (Clean, Constrained, Zero Overflow) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(900);
                onToggleLang();
              }}
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-100/90 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white transition-all cursor-pointer shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#d5001c]" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Theme Switcher (Light / Dark) */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(850);
                onToggleTheme();
              }}
              title={theme === 'dark' ? (isAr ? 'الوضع النهاري' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}
              className="p-2 rounded-full bg-neutral-100/90 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white transition-all cursor-pointer shrink-0"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Customer Bookings Lookup */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onOpenBookings();
              }}
              title={isAr ? 'مواعيد صيانتي' : 'My Bookings'}
              className="relative p-2 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <Calendar className="w-4 h-4" />
              {bookingsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#d5001c] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Admin Console Button (Hidden on small screens, accessible via hamburger) */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(1000);
                onOpenAdmin();
              }}
              title={isAr ? 'لوحة تحكم المركز' : 'Admin Console'}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white transition-all cursor-pointer shrink-0"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isAr ? 'التحكم' : 'Admin'}</span>
            </button>

            {/* Primary Action Button (Only on large screens to guarantee zero horizontal overflow) */}
            <button
              type="button"
              onClick={() => scrollToSection('booking-form')}
              className="hidden xl:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#d5001c] text-white hover:bg-red-700 transition-all duration-300 whitespace-nowrap shadow-md cursor-pointer hover:scale-105 shrink-0"
            >
              <Wrench className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0 text-white" />
              <span>{isAr ? 'حجز صيانة' : 'Book Service'}</span>
            </button>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(750);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 text-neutral-800 dark:text-neutral-200 hover:text-[#d5001c] rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Luxury Slide-Down Menu for Phones & Tablets (Subtle Glassmorphic) */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white/90 dark:bg-neutral-950/90 backdrop-blur-3xl border-b border-black/5 dark:border-white/10 px-5 pt-4 pb-7 rounded-b-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Quick Action Button for Phone & Tablet */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => scrollToSection('booking-form')}
                className="w-full py-3.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase bg-[#d5001c] text-white hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Wrench className="w-4 h-4" />
                <span>{isAr ? 'احجز موعد صيانة سيارتك الآن' : 'Book Service Appointment Now'}</span>
              </button>
            </div>

            {/* Links List */}
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-start py-3 px-3.5 rounded-2xl text-sm font-semibold tracking-wide text-neutral-800 dark:text-neutral-100 hover:bg-white/60 dark:hover:bg-white/10 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 rtl:rotate-180" />
                  </button>
                );
              })}
            </nav>

            {/* Bottom Utilities for Phones */}
            <div className="pt-4 mt-3 border-t border-black/5 dark:border-white/10 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenBookings();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-2xl text-xs font-semibold bg-neutral-100/80 dark:bg-white/10 text-neutral-800 dark:text-white flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <Calendar className="w-3.5 h-3.5 text-[#d5001c]" />
                <span>{isAr ? 'استعلام مواعيدي' : 'My Bookings'}</span>
                {bookingsCount > 0 && (
                  <span className="w-4 h-4 bg-[#d5001c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {bookingsCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick(1000);
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-2xl text-xs font-semibold bg-neutral-100/80 dark:bg-white/10 text-neutral-800 dark:text-white flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{isAr ? 'لوحة التحكم' : 'Admin Panel'}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
