export interface HeroSlide {
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

export interface CarModel {
  id: string;
  name: string;
  series: '718' | '911' | 'Taycan' | 'Panamera' | 'Macan' | 'Cayenne';
  category: 'Gasoline' | 'Hybrid' | 'All-Electric';
  tagline: string;
  startingPrice: number;
  specs: {
    zeroToSixty: string;
    horsepower: number;
    topSpeedMph: number;
    consumptionOrRange: string;
  };
  features: string[];
  image: string;
  badge?: string;
}

export interface ConfigColor {
  id: string;
  name: string;
  hex: string;
  finish: 'Solid' | 'Metallic' | 'Special' | 'Paint to Sample';
  price: number;
  filterStyle: {
    filter: string;
    overlayBg: string;
    blendMode: string;
  };
}

export interface ConfigWheel {
  id: string;
  name: string;
  size: string;
  price: number;
  description: string;
}

export interface ConfigInterior {
  id: string;
  name: string;
  colorHex: string;
  material: string;
  price: number;
}

export interface LifestyleProduct {
  id: string;
  name: string;
  category: 'Timepieces' | 'Luggage' | 'Audio' | 'Apparel' | 'Accessories';
  price: number;
  tag: string;
  description: string;
  details: string[];
  image: string;
  inStock: boolean;
  rating: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: '911-gt3-rs',
    model: '911 GT3 RS',
    subtitle: 'Motorsport Heritage',
    headline: 'Athleticism at the Limit.',
    specs: {
      acceleration: '3.0 s',
      power: '518 hp',
      topSpeed: '184 mph',
      powertrain: '4.0-liter naturally aspirated boxer',
    },
    priceFrom: '$241,300',
    image: '/src/assets/images/hero_flagship_gt3rs_1792255768458.jpg',
    tag: 'Road Legal Race Car',
  },
  {
    id: 'taycan-turbo-gt',
    model: 'Taycan Turbo GT',
    subtitle: 'Electric Pinnacle',
    headline: 'Electrified Track Supremacy.',
    specs: {
      acceleration: '2.1 s',
      power: '1,019 hp',
      topSpeed: '190 mph',
      powertrain: 'Permanent Magnet Synchronous Dual-Motor',
    },
    priceFrom: '$230,000',
    image: '/src/assets/images/hero_taycan_ev_1792255769211.jpg',
    tag: 'Nürburgring Lap Record',
  },
  {
    id: '911-carrera-gts',
    model: '911 Carrera GTS',
    subtitle: 'T-Hybrid Technology',
    headline: 'Iconic Silhouette. Next Era.',
    specs: {
      acceleration: '2.9 s',
      power: '532 hp',
      topSpeed: '194 mph',
      powertrain: '3.6-liter boxer engine with eTurbo',
    },
    priceFrom: '$164,900',
    image: '/src/assets/images/car_config_studio_1792255768943.jpg',
    tag: 'Performance Hybrid',
  },
];

export const CAR_MODELS: CarModel[] = [
  {
    id: '911-gt3-rs-card',
    name: '911 GT3 RS',
    series: '911',
    category: 'Gasoline',
    tagline: 'High-downforce aerodynamics designed for uncompromising circuit performance.',
    startingPrice: 241300,
    specs: {
      zeroToSixty: '3.0 s',
      horsepower: 518,
      topSpeedMph: 184,
      consumptionOrRange: '16 mpg combined',
    },
    features: ['Active Drag Reduction System (DRS)', 'Double-wishbone front axle', 'Carbon fiber doors & aero'],
    image: '/src/assets/images/hero_flagship_gt3rs_1792255768458.jpg',
    badge: 'Flagship GT',
  },
  {
    id: 'taycan-turbo-gt-card',
    name: 'Taycan Turbo GT',
    series: 'Taycan',
    category: 'All-Electric',
    tagline: 'The most powerful series-production Porsche of all time.',
    startingPrice: 230000,
    specs: {
      zeroToSixty: '2.1 s',
      horsepower: 1019,
      topSpeedMph: 190,
      consumptionOrRange: '345 mi EPA Est.',
    },
    features: ['Attack Mode +160 hp surge', 'Porsche Active Ride suspension', 'Carbon ceramic brakes'],
    image: '/src/assets/images/hero_taycan_ev_1792255769211.jpg',
    badge: 'Fastest EV',
  },
  {
    id: '911-carrera-gts-card',
    name: '911 Carrera GTS',
    series: '911',
    category: 'Hybrid',
    tagline: 'Precision engineered T-Hybrid system delivering instant electric spooling.',
    startingPrice: 164900,
    specs: {
      zeroToSixty: '2.9 s',
      horsepower: 532,
      topSpeedMph: 194,
      consumptionOrRange: '23 mpg combined',
    },
    features: ['Electric exhaust turbocharger', 'Rear-axle steering standard', 'Sport Exhaust system'],
    image: '/src/assets/images/car_config_studio_1792255768943.jpg',
    badge: 'T-Hybrid',
  },
  {
    id: '718-cayman-gt4-rs',
    name: '718 Cayman GT4 RS',
    series: '718',
    category: 'Gasoline',
    tagline: 'Mid-engine precision with heart-stopping 9,000 RPM acoustic air intakes.',
    startingPrice: 160700,
    specs: {
      zeroToSixty: '3.2 s',
      horsepower: 493,
      topSpeedMph: 196,
      consumptionOrRange: '17 mpg combined',
    },
    features: ['Process air intakes behind windows', 'Fixed swan-neck rear wing', 'Titanium roll cage option'],
    image: '/src/assets/images/hero_flagship_gt3rs_1792255768458.jpg',
    badge: 'Mid-Engine King',
  },
  {
    id: 'panamera-turbo-e-hybrid',
    name: 'Panamera Turbo E-Hybrid',
    series: 'Panamera',
    category: 'Hybrid',
    tagline: 'Luxury sedan comfort combined with supercar acceleration dynamics.',
    startingPrice: 191000,
    specs: {
      zeroToSixty: '3.0 s',
      horsepower: 670,
      topSpeedMph: 196,
      consumptionOrRange: '56 MPGe combined',
    },
    features: ['4.0L Twin-Turbo V8 + Electric Motor', 'Active Ride suspension', 'Curved digital cockpit'],
    image: '/src/assets/images/hero_taycan_ev_1792255769211.jpg',
    badge: 'Executive Tourer',
  },
  {
    id: 'macan-turbo-electric',
    name: 'Macan Turbo Electric',
    series: 'Macan',
    category: 'All-Electric',
    tagline: 'Progressive electric SUV architecture with unmistakable sports car proportions.',
    startingPrice: 105300,
    specs: {
      zeroToSixty: '3.1 s',
      horsepower: 630,
      topSpeedMph: 161,
      consumptionOrRange: '310 mi EPA Est.',
    },
    features: ['100 kWh battery with 270 kW DC charging', 'Augmented reality HUD', 'Porsche Torque Vectoring Plus'],
    image: '/src/assets/images/car_config_studio_1792255768943.jpg',
    badge: 'All-New EV',
  },
];

export const CONFIG_COLORS: ConfigColor[] = [
  {
    id: 'crayon-white',
    name: 'Crayon / Chalk White',
    hex: '#D9D7CE',
    finish: 'Special',
    price: 3270,
    filterStyle: {
      filter: 'brightness(1.08) contrast(1.05) saturate(0.85)',
      overlayBg: 'rgba(217, 215, 206, 0.22)',
      blendMode: 'color-burn',
    },
  },
  {
    id: 'metallic-black',
    name: 'Jet Black Metallic',
    hex: '#0D0E11',
    finish: 'Metallic',
    price: 840,
    filterStyle: {
      filter: 'brightness(0.68) contrast(1.3) saturate(0.4)',
      overlayBg: 'rgba(10, 10, 15, 0.55)',
      blendMode: 'multiply',
    },
  },
  {
    id: 'monteverde-green',
    name: 'Monteverde Green Metallic',
    hex: '#173628',
    finish: 'Special',
    price: 3270,
    filterStyle: {
      filter: 'brightness(0.85) contrast(1.15) hue-rotate(85deg) saturate(1.4)',
      overlayBg: 'rgba(23, 54, 40, 0.38)',
      blendMode: 'multiply',
    },
  },
  {
    id: 'carmine-red',
    name: 'Carmine Red',
    hex: '#A1121C',
    finish: 'Special',
    price: 3270,
    filterStyle: {
      filter: 'brightness(0.9) contrast(1.2) hue-rotate(330deg) saturate(1.8)',
      overlayBg: 'rgba(161, 18, 28, 0.36)',
      blendMode: 'color-burn',
    },
  },
  {
    id: 'gentian-blue',
    name: 'Gentian Blue Metallic',
    hex: '#142E54',
    finish: 'Metallic',
    price: 840,
    filterStyle: {
      filter: 'brightness(0.86) contrast(1.15) hue-rotate(185deg) saturate(1.6)',
      overlayBg: 'rgba(20, 46, 84, 0.38)',
      blendMode: 'multiply',
    },
  },
  {
    id: 'gt-silver',
    name: 'GT Silver Metallic',
    hex: '#989DA1',
    finish: 'Metallic',
    price: 840,
    filterStyle: {
      filter: 'brightness(1.0) contrast(1.12) saturate(0.3)',
      overlayBg: 'rgba(152, 157, 161, 0.25)',
      blendMode: 'overlay',
    },
  },
];

export const CONFIG_WHEELS: ConfigWheel[] = [
  {
    id: 'wheel-carrera-s',
    name: '20/21-inch Carrera S Wheels',
    size: '20" Front / 21" Rear',
    price: 0,
    description: 'Classic five-spoke lightweight alloy with satin silver finish.',
  },
  {
    id: 'wheel-exclusive-design',
    name: '20/21-inch Exclusive Design Titanium',
    size: '20" Front / 21" Rear',
    price: 3980,
    description: 'Forged cross-spoke styling with polished face and anthracite pockets.',
  },
  {
    id: 'wheel-gt3-forged',
    name: '20/21-inch GT Lightweight Monobloc',
    size: '20" Front / 21" Rear',
    price: 5420,
    description: 'Central lock forged magnesium alloy wheels engineered for minimum unsprung mass.',
  },
];

export const CONFIG_INTERIORS: ConfigInterior[] = [
  {
    id: 'int-black-racetex',
    name: 'Race-Tex Interior in Black',
    colorHex: '#18181A',
    material: 'Breathable Race-Tex with GT Silver Stitching',
    price: 0,
  },
  {
    id: 'int-bordeaux-red',
    name: 'Club Leather in Bordeaux Red',
    colorHex: '#6B1D2F',
    material: 'Natural milled Nappa leather with embossed Porsche crests',
    price: 4530,
  },
  {
    id: 'int-mojave-beige',
    name: 'Two-Tone Black and Mojave Beige',
    colorHex: '#C5B59C',
    material: 'Supple Semi-Aniline Leather upholstery with acoustic insulation',
    price: 3830,
  },
];

export const LIFESTYLE_PRODUCTS: LifestyleProduct[] = [
  {
    id: 'pd-chrono-gt3rs',
    name: 'Chronograph 1 – 911 GT3 RS Edition',
    category: 'Timepieces',
    price: 9650,
    tag: 'COSC Certified',
    description: 'Engineered in Solothurn, Switzerland. Titanium casing with matte black dial, carmine red seconds hand, and automatic winding rotor styled after the GT3 RS wheel.',
    details: [
      'Werk 01.200 caliber with flyback function',
      'Titanium case with black titanium carbide coating',
      'Quick-release interchangeable black leather and rubber strap',
      'Power reserve: 48 hours',
    ],
    image: '/src/assets/images/lifestyle_watch_chronograph_1792255772195.jpg',
    inStock: true,
    rating: 4.9,
  },
  {
    id: 'pd-heritage-weekender',
    name: 'Heritage Leather Weekender Duffel',
    category: 'Luggage',
    price: 1250,
    tag: 'Handcrafted',
    description: 'Crafted from original vehicle interior perforated leather. Designed to fit precisely into the front luggage compartment of all 911 sports cars.',
    details: [
      '100% fine Italian bovine leather with protective treatment',
      'Brushed palladium metal hardware and double two-way zippers',
      'Dedicated compartments for footwear and digital devices',
      'Dimensions: 55 x 30 x 28 cm (Cabin approved)',
    ],
    image: '/src/assets/images/lifestyle_leather_duffle_1792255770345.jpg',
    inStock: true,
    rating: 4.8,
  },
  {
    id: 'pd-soundbar-pro',
    name: '911 Soundbar 2.0 Pro Original Exhaust',
    category: 'Audio',
    price: 3800,
    tag: 'Original Parts',
    description: 'High-end home entertainment speaker system incorporating the actual rear exhaust silencer and tailpipes of a 911 GT3 for natural acoustic resonance.',
    details: [
      '300-watt 2.1.2 virtual surround sound system',
      'Dolby Atmos, DTS-HD, and Apple AirPlay 2 streaming',
      'High-gloss black vehicle paint exhaust finish',
      'HDMI 4K passthrough with eARC support',
    ],
    image: '/src/assets/images/lifestyle_watch_chronograph_1792255772195.jpg',
    inStock: true,
    rating: 5.0,
  },
  {
    id: 'pd-motorsport-jacket',
    name: 'Porsche Motorsport Carbon Rain Jacket',
    category: 'Apparel',
    price: 390,
    tag: 'Weatherproof',
    description: 'Ultra-lightweight technical performance shell developed alongside the Porsche Penske Motorsport endurance racing team for all weather conditions.',
    details: [
      '3-layer waterproof membrane (20,000mm hydrostatic head)',
      'Waterproof seam-sealed taped seams and YKK AquaGuard zippers',
      'Laser-cut ventilation eyelets in underarm zones',
      'Reflective Porsche script on rear collar and chest',
    ],
    image: '/src/assets/images/lifestyle_leather_duffle_1792255770345.jpg',
    inStock: true,
    rating: 4.7,
  },
];
