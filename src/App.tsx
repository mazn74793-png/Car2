/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CenterFacilitySection } from './components/CenterFacilitySection';
import { BookingSection } from './components/BookingSection';
import { ModelSelector } from './components/ModelSelector';
import { CarConfigurator, SavedBuild } from './components/CarConfigurator';
import { LifestyleShop } from './components/LifestyleShop';
import { HeritageSoundSection } from './components/HeritageSoundSection';
import { ExperienceCenters } from './components/ExperienceCenters';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { GarageDrawer } from './components/GarageDrawer';
import { SpecsModal } from './components/SpecsModal';
import { TestDriveModal } from './components/TestDriveModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { RegionModal } from './components/RegionModal';
import { BookingModal } from './components/BookingModal';
import { CustomerBookingsModal } from './components/CustomerBookingsModal';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_CENTER_DATA } from './data/centerInitialData';
import { CenterStoreData, BookingRecord } from './types/centerTypes';
import { CarModel, LifestyleProduct } from './data/porscheData';

export default function App() {
  // Center Store Data (editable via Admin Panel with Cloudinary & device uploads)
  const [centerData, setCenterData] = useState<CenterStoreData>(() => {
    try {
      const saved = localStorage.getItem('porsche_center_store_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_CENTER_DATA;
  });

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('porsche_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved Garage builds state with localStorage
  const [garageBuilds, setGarageBuilds] = useState<SavedBuild[]>(() => {
    try {
      const saved = localStorage.getItem('porsche_garage');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Region / Language
  const [currentRegion, setCurrentRegion] = useState('US');

  // Modals & Panels State
  const [adminOpen, setAdminOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingServiceId, setSelectedBookingServiceId] = useState<string | undefined>();
  const [selectedBookingVehicleName, setSelectedBookingVehicleName] = useState<string | undefined>();
  const [customerBookingsOpen, setCustomerBookingsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveModel, setTestDriveModel] = useState('Porsche 911 GT3 RS');
  const [specsModalCar, setSpecsModalCar] = useState<CarModel | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<LifestyleProduct | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('porsche_center_store_v2', JSON.stringify(centerData));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [centerData]);

  useEffect(() => {
    try {
      localStorage.setItem('porsche_cart', JSON.stringify(cartItems));
    } catch {
      // storage quota fallback
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('porsche_garage', JSON.stringify(garageBuilds));
    } catch {
      // storage quota fallback
    }
  }, [garageBuilds]);

  // Admin Data Save & Reset
  const handleSaveAdminData = (newData: CenterStoreData) => {
    setCenterData(newData);
  };

  const handleResetDefaults = () => {
    setCenterData(INITIAL_CENTER_DATA);
    localStorage.removeItem('porsche_center_store_v2');
  };

  // Booking Handlers
  const handleOpenBookingModal = (serviceId?: string, vehicleName?: string) => {
    setSelectedBookingServiceId(serviceId);
    setSelectedBookingVehicleName(vehicleName);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (newBooking: BookingRecord) => {
    setCenterData((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings],
    }));
  };

  const handleCancelBooking = (bookingId: string) => {
    setCenterData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
      ),
    }));
  };

  // Cart Handlers
  const handleAddToCart = (product: LifestyleProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Garage Handlers
  const handleSaveToGarage = (build: SavedBuild) => {
    setGarageBuilds((prev) => [build, ...prev.filter((b) => b.id !== build.id)]);
  };

  const handleRemoveBuild = (id: string) => {
    setGarageBuilds((prev) => prev.filter((b) => b.id !== id));
  };

  const handleLoadBuild = (_build: SavedBuild) => {
    const configSection = document.getElementById('configurator');
    if (configSection) {
      configSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Test Drive Handler
  const handleOpenTestDrive = (modelName: string) => {
    setTestDriveModel(modelName);
    setTestDriveOpen(true);
  };

  const handleConfigureModel = (_car: CarModel) => {
    const configSection = document.getElementById('configurator');
    if (configSection) {
      configSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f7] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* 1. Sticky Navigation Bar with Smooth Pills & Admin Trigger */}
      <Navbar
        centerName={centerData.centerInfo.name}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        garageCount={garageBuilds.length}
        onOpenGarage={() => setGarageOpen(true)}
        bookingsCount={centerData.bookings.length}
        onOpenBookings={() => setCustomerBookingsOpen(true)}
        onOpenBookingModal={() => handleOpenBookingModal()}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenRegion={() => setRegionOpen(true)}
        currentRegion={currentRegion}
      />

      <main className="flex-1">
        {/* 2. Hero Slider (Connected to Admin Slides & Device/Cloudinary Uploads) */}
        <HeroSlider
          slides={centerData.heroSlides}
          onOpenBookingModal={handleOpenBookingModal}
          onExploreFleet={() => {
            const modelsEl = document.getElementById('models');
            if (modelsEl) modelsEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Center Facility & Handling Circuit Overview */}
        <CenterFacilitySection
          info={centerData.centerInfo}
          gallery={centerData.gallery}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />

        {/* 4. Dedicated Center Bookings & Workshop Services Section */}
        <BookingSection
          services={centerData.services}
          fleet={centerData.fleet}
          onOpenBookingModal={handleOpenBookingModal}
          onOpenMyBookings={() => setCustomerBookingsOpen(true)}
        />

        {/* 5. Model Selector Grid (Smooth 3D-feel Cards) */}
        <ModelSelector
          onConfigureModel={handleConfigureModel}
          onOpenSpecsModal={(car) => setSpecsModalCar(car)}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 6. Interactive Car Configurator with 3+ Color Real-Time Switching */}
        <CarConfigurator
          onSaveToGarage={handleSaveToGarage}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 7. Luxury Lifestyle Shop & Boutique */}
        <LifestyleShop
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 8. Acoustic Sound Engine Simulator */}
        <HeritageSoundSection />

        {/* 9. Experience Centers Destinations */}
        <ExperienceCenters
          onBookExperience={(centerName) => {
            handleOpenBookingModal(undefined, `Track Session - ${centerName}`);
          }}
        />
      </main>

      {/* Global Minimalist Footer */}
      <Footer />

      {/* Admin Panel (Change text & upload photos from device/Cloudinary with live preview) */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={centerData}
        onSaveData={handleSaveAdminData}
        onResetDefaults={handleResetDefaults}
      />

      {/* 4-Step Interactive Booking Modal with Circuit Pass Generation */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        services={centerData.services}
        fleet={centerData.fleet}
        selectedServiceId={selectedBookingServiceId}
        selectedVehicleName={selectedBookingVehicleName}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Customer Active Reservations & Passes Tracker */}
      <CustomerBookingsModal
        isOpen={customerBookingsOpen}
        onClose={() => setCustomerBookingsOpen(false)}
        bookings={centerData.bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Slide-out Garage Drawer */}
      <GarageDrawer
        isOpen={garageOpen}
        onClose={() => setGarageOpen(false)}
        builds={garageBuilds}
        onRemoveBuild={handleRemoveBuild}
        onLoadBuild={handleLoadBuild}
        onOpenTestDrive={handleOpenTestDrive}
      />

      {/* Technical Specs Modal */}
      <SpecsModal
        car={specsModalCar}
        onClose={() => setSpecsModalCar(null)}
        onConfigure={(car) => {
          setSpecsModalCar(null);
          handleConfigureModel(car);
        }}
        onOpenTestDrive={handleOpenTestDrive}
      />

      {/* VIP Test Drive Modal */}
      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        selectedModelName={testDriveModel}
      />

      {/* Product Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCar={(car) => setSpecsModalCar(car)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Global Region & Currency Switcher Modal */}
      <RegionModal
        isOpen={regionOpen}
        onClose={() => setRegionOpen(false)}
        currentRegion={currentRegion}
        onSelectRegion={(reg) => setCurrentRegion(reg)}
      />
    </div>
  );
}
