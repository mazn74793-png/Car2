/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
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
import { CarModel, LifestyleProduct, LIFESTYLE_PRODUCTS, CAR_MODELS } from './data/porscheData';

export default function App() {
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

  // Modal states
  const [cartOpen, setCartOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveModel, setTestDriveModel] = useState('Porsche 911 GT3 RS');
  const [specsModalCar, setSpecsModalCar] = useState<CarModel | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<LifestyleProduct | null>(null);

  // Sync to local storage
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

  const handleLoadBuild = (build: SavedBuild) => {
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

  // Configurator transition
  const handleConfigureModel = (car: CarModel) => {
    const configSection = document.getElementById('configurator');
    if (configSection) {
      configSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f7] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        garageCount={garageBuilds.length}
        onOpenGarage={() => setGarageOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenRegion={() => setRegionOpen(true)}
        currentRegion={currentRegion}
      />

      <main className="flex-1">
        {/* 2. Hero Slider with Flagship Models & Acoustic Rev */}
        <HeroSlider
          onSelectModel={(modelName) => {
            const car = CAR_MODELS.find((c) => c.name.includes(modelName));
            if (car) setSpecsModalCar(car);
          }}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 3. Model Selector Grid (All, Gasoline, Hybrid, All-Electric) */}
        <ModelSelector
          onConfigureModel={handleConfigureModel}
          onOpenSpecsModal={(car) => setSpecsModalCar(car)}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 4. Interactive Car Configurator with 3+ Color Switching, Wheels, Interior, Calipers */}
        <CarConfigurator
          onSaveToGarage={handleSaveToGarage}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 5. Luxury Lifestyle Shop (Watches, Bags, Soundbar, Apparel) */}
        <LifestyleShop
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 6. Heritage & Acoustic Engine Simulator (Flat-6 boxer tachometer) */}
        <HeritageSoundSection />

        {/* 7. Porsche Experience Centers & Circuits */}
        <ExperienceCenters
          onBookExperience={(centerName) => {
            setTestDriveModel(`Track Masterclass - ${centerName}`);
            setTestDriveOpen(true);
          }}
        />
      </main>

      {/* 8. Global Minimalist Footer */}
      <Footer />

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

      {/* VIP Test Drive & Track Session Modal */}
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
