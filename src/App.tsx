/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CenterStorySection } from './components/CenterStorySection';
import { CenterServicesGrid } from './components/CenterServicesGrid';
import { ServiceBookingForm } from './components/ServiceBookingForm';
import { CenterFacilitySection } from './components/CenterFacilitySection';
import { HeritageSoundSection } from './components/HeritageSoundSection';
import { Footer } from './components/Footer';
import { ServiceBookingsViewerModal } from './components/ServiceBookingsViewerModal';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_CENTER_DATA } from './data/centerInitialData';
import { CenterStoreData } from './types/centerTypes';
import { Language, ThemeMode, ServiceBookingRecord } from './data/centerContentI18n';

export default function App() {
  // Language State: 'ar' (العربية) or 'en' (English)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('porsche_lang');
      return (saved === 'en' || saved === 'ar') ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('porsche_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  // Center Store Data (editable via Admin Panel with Cloudinary & device uploads)
  const [centerData, setCenterData] = useState<CenterStoreData>(() => {
    try {
      const saved = localStorage.getItem('porsche_center_store_v4');
      if (saved) {
        // Automatically migrate any legacy /src/assets/images paths to /images
        const sanitized = saved.replace(/\/src\/assets\/images\//g, '/images/');
        return JSON.parse(sanitized);
      }
    } catch {
      // fallback
    }
    return INITIAL_CENTER_DATA;
  });

  // Service Maintenance Bookings
  const [serviceBookings, setServiceBookings] = useState<ServiceBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('porsche_service_bookings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'init-1',
        referenceCode: 'PSC-49102',
        customerName: 'فهد السديري',
        customerPhone: '+966 55 911 2024',
        customerEmail: 'fahad@alsudairi.sa',
        vehicleModel: '911 Carrera / Turbo / GT3 (992 / 991)',
        vehicleYear: '2024',
        serviceId: 'srv-periodic',
        serviceTitle: 'الصيانة الدورية المعتمدة وفحص المحرك',
        bookingDate: '2026-11-22',
        timeSlot: '08:00 AM',
        loanerCarRequested: true,
        notes: 'فحص ضغط زيت المحرك عند درجات الحرارة العالية.',
        status: 'Confirmed',
        createdAt: '2026-10-16T10:00:00.000Z',
      },
    ];
  });

  // Preselected service for the booking form
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<string | undefined>();

  // Modals & Panels State
  const [adminOpen, setAdminOpen] = useState(false);
  const [serviceBookingsOpen, setServiceBookingsOpen] = useState(false);

  // Sync state to local storage and document root
  useEffect(() => {
    try {
      localStorage.setItem('porsche_lang', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    } catch {
      // fallback
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('porsche_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // fallback
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('porsche_center_store_v4', JSON.stringify(centerData));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [centerData]);

  useEffect(() => {
    try {
      localStorage.setItem('porsche_service_bookings', JSON.stringify(serviceBookings));
    } catch {
      // fallback
    }
  }, [serviceBookings]);

  // Handlers
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSaveAdminData = (newData: CenterStoreData) => {
    setCenterData(newData);
  };

  const handleResetDefaults = () => {
    setCenterData(INITIAL_CENTER_DATA);
    localStorage.removeItem('porsche_center_store_v4');
  };

  const handleBookingConfirmed = (newRecord: ServiceBookingRecord) => {
    setServiceBookings((prev) => [newRecord, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setServiceBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  const handleSelectServiceFromGrid = (serviceId: string) => {
    setSelectedServiceToBook(serviceId);
    const formEl = document.getElementById('booking-form');
    if (formEl) {
      const navOffset = 78;
      const elementPosition = formEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const scrollToBooking = () => {
    const formEl = document.getElementById('booking-form');
    if (formEl) {
      const navOffset = 78;
      const elementPosition = formEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const isAr = lang === 'ar';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full max-w-[100vw] overflow-x-hidden transition-colors duration-300 font-sans ${
        theme === 'light' ? 'theme-light bg-[#f8f9fb] text-[#0f1115]' : 'theme-dark bg-[#050507] text-[#f4f4f6]'
      }`}
    >
      {/* 1. Sticky Navigation Bar with Language & Theme Switches */}
      <Navbar
        centerName={centerData.centerInfo.name}
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        bookingsCount={serviceBookings.length}
        onOpenBookings={() => setServiceBookingsOpen(true)}
        onOpenBookingForm={scrollToBooking}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Showcase (Connected to Admin Slides & Device/Cloudinary Uploads) */}
        <HeroSlider
          slides={centerData.heroSlides}
          lang={lang}
          theme={theme}
          onOpenBookingForm={scrollToBooking}
          onExploreServices={() => {
            const gridEl = document.getElementById('services-grid');
            if (gridEl) {
              const navOffset = 78;
              const elementPosition = gridEl.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: elementPosition - navOffset,
                behavior: 'smooth',
              });
            }
          }}
        />

        {/* 3. Center Story & Certified Facility Overview (Fluid Cards - No Harsh Boxes) */}
        <CenterStorySection
          lang={lang}
          theme={theme}
          onBookNow={scrollToBooking}
        />

        {/* 4. Comprehensive Maintenance & Diagnostics Services Grid */}
        <CenterServicesGrid
          lang={lang}
          theme={theme}
          onSelectServiceToBook={handleSelectServiceFromGrid}
        />

        {/* 5. Direct Service Booking Form (Vehicle model, issue, time, loaner car, digital pass) */}
        <ServiceBookingForm
          lang={lang}
          theme={theme}
          preselectedServiceId={selectedServiceToBook}
          onBookingConfirmed={handleBookingConfirmed}
          onViewMyBookings={() => setServiceBookingsOpen(true)}
        />

        {/* 6. Certified Facility Workshop Bays, Cleanroom & VIP Lounge */}
        <CenterFacilitySection
          info={centerData.centerInfo}
          gallery={centerData.gallery}
          lang={lang}
          theme={theme}
          onOpenBooking={scrollToBooking}
        />

        {/* 7. Acoustic Flat-6 Sound Engine Rev Simulator */}
        <HeritageSoundSection
          lang={lang}
          theme={theme}
        />
      </main>

      {/* Global Minimalist Footer with Location & Hours */}
      <Footer
        lang={lang}
        theme={theme}
        onOpenBooking={scrollToBooking}
      />

      {/* Admin Panel (Edit text, upload images from device/Cloudinary with live preview) */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={centerData}
        onSaveData={handleSaveAdminData}
        onResetDefaults={handleResetDefaults}
      />

      {/* Customer Service Appointments Lookup Modal */}
      <ServiceBookingsViewerModal
        isOpen={serviceBookingsOpen}
        onClose={() => setServiceBookingsOpen(false)}
        bookings={serviceBookings}
        onCancelBooking={handleCancelBooking}
        lang={lang}
        theme={theme}
      />
    </div>
  );
}
