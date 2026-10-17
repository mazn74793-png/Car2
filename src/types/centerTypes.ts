export interface CenterInfo {
  name: string;
  subName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
  trackLength: string;
  announcementNotice: string;
}

export interface CenterHeroSlide {
  id: string;
  model: string;
  subtitle: string;
  headline: string;
  specs: {
    acceleration: string;
    power: string;
    topSpeed: string;
    powertrain: string;
  };
  priceFrom: string;
  image: string;
  tag: string;
}

export interface CenterServicePackage {
  id: string;
  title: string;
  category: 'Track Drive' | 'Service & Maintenance' | 'VIP Consultation';
  duration: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface CenterFleetCar {
  id: string;
  name: string;
  category: 'Gasoline' | 'Hybrid' | 'All-Electric';
  series: string;
  horsepower: number;
  zeroToSixty: string;
  topSpeed: number;
  dailyBookingPrice: number;
  image: string;
  availableForTrack: boolean;
  availableForTestDrive: boolean;
  status: 'Available' | 'Reserved' | 'In Maintenance';
}

export interface BookingRecord {
  id: string;
  referenceCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceTitle: string;
  vehicleName: string;
  bookingDate: string;
  timeSlot: string;
  totalPrice: number;
  vipInstructor: boolean;
  notes: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface CenterGalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export interface CenterStoreData {
  centerInfo: CenterInfo;
  heroSlides: CenterHeroSlide[];
  services: CenterServicePackage[];
  fleet: CenterFleetCar[];
  gallery: CenterGalleryItem[];
  cloudinaryConfig: CloudinaryConfig;
  bookings: BookingRecord[];
}
