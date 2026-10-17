export type Language = 'ar' | 'en';
export type ThemeMode = 'light' | 'dark';

export interface CenterServiceItem {
  id: string;
  category: 'maintenance' | 'diagnostics' | 'performance' | 'body_care';
  title: {
    ar: string;
    en: string;
  };
  subtitle: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  duration: {
    ar: string;
    en: string;
  };
  priceEstimate: {
    ar: string;
    en: string;
  };
  features: {
    ar: string[];
    en: string[];
  };
  image: string;
  badge?: {
    ar: string;
    en: string;
  };
}

export interface CenterVehicleModel {
  id: string;
  name: string;
  category: string;
  image: string;
  specs: {
    power: string;
    engine: string;
    trackSpeed: string;
  };
}

export interface ServiceBookingRecord {
  id: string;
  referenceCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePlateOrVin?: string;
  serviceId: string;
  serviceTitle: string;
  bookingDate: string;
  timeSlot: string;
  notes?: string;
  loanerCarRequested: boolean;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export const CENTER_SERVICES: CenterServiceItem[] = [
  {
    id: 'srv-periodic',
    category: 'maintenance',
    title: {
      ar: 'الصيانة الدورية المعتمدة وفحص المحرك',
      en: 'Factory Scheduled Maintenance & Oil Service',
    },
    subtitle: {
      ar: 'تغيير زيوت Mobil 1 الأصلية وفلاتر OEM وفحص 111 نقطة',
      en: 'Original Mobil 1 ESP oils, OEM filters & 111-point inspection',
    },
    description: {
      ar: 'صيانة كاملة وشاملة وفقاً لجداول مصنع بورش في شتوتغارت. تشمل تغيير زيت المحرك المعتمد، فلاتر الهواء وحبوب اللقاح، وفحص إلكتروني شامل عبر جهاز PIWIS 4 Tester.',
      en: 'Comprehensive factory-scheduled maintenance following Porsche AG guidelines. Includes genuine Mobil 1 lubricant, OEM filters, and complete PIWIS 4 diagnostic scanning.',
    },
    duration: {
      ar: '120 دقيقة',
      en: '120 Minutes',
    },
    priceEstimate: {
      ar: 'يبدأ من 1,450 ريال / درهم ($385)',
      en: 'Starting from $385',
    },
    features: {
      ar: [
        'زيوت محرك Mobil 1 ESP X3 المعتمدة حصرياً من بورش',
        'فحص إلكتروني شامل لجميع كمبيوترات السيارة عبر PIWIS',
        'تقرير رقمي معتمد بسلامة 111 نقطة في السيارة',
        'غسيل مجاني احترافي مع حماية سريعة للطلاء',
      ],
      en: [
        'Factory-approved Mobil 1 ESP X3 engine oil exclusively',
        'Complete electronic health scan via official PIWIS tester',
        'Certified digital 111-point vehicle health certificate',
        'Complimentary luxury hand wash and paint sealant',
      ],
    },
    image: '/src/assets/images/car_config_studio_1792255768943.jpg',
    badge: {
      ar: 'الأكثر طلباً',
      en: 'Most Popular',
    },
  },
  {
    id: 'srv-brakes-chassis',
    category: 'maintenance',
    title: {
      ar: 'نظام الفرامل والشاسيه وأقراص السيراميك (PCCB)',
      en: 'Braking Systems & Ceramic Composite Care (PCCB)',
    },
    subtitle: {
      ar: 'فحص بالليزر لسمك الأقراص واستبدال سائل الفرامل عالي الحرارة',
      en: 'Laser disk thickness scan & high-temp racing fluid flush',
    },
    description: {
      ar: 'خدمة متخصصة لفحمات وأقراص فرامل بورش الفولاذية والسيراميكية المركبة PCCB، مع ضبط ومعايرة نظام التوجيه على المحور الخلفي وضغط نظام التعليق الهوائي PASM.',
      en: 'Dedicated service for steel and Porsche Ceramic Composite Brakes (PCCB), with rear-axle steering calibration and PASM air suspension alignment.',
    },
    duration: {
      ar: '90 دقيقة',
      en: '90 Minutes',
    },
    priceEstimate: {
      ar: 'يبدأ من 1,800 ريال / درهم ($480)',
      en: 'Starting from $480',
    },
    features: {
      ar: [
        'فحص ليزري دقيق لطبقة السيليكون في أقراص PCCB',
        'سائل فرامل ريسنج ذو نقطة غليان فائقة 325° مئوية',
        'معايرة نظام الفرامل المانعة للانغلاق PSM و ABS',
        'فحمات فرامل أصلية من المصنع مع ضمان الأداء',
      ],
      en: [
        'Micron laser scan of PCCB ceramic friction layers',
        'High-temperature 325°C racing brake fluid flush',
        'PSM & ABS electronic modulation recalibration',
        'Factory genuine brake pads with full warranty',
      ],
    },
    image: '/src/assets/images/hero_flagship_gt3rs_1792255768458.jpg',
    badge: {
      ar: 'خدمة متقدمة',
      en: 'High Precision',
    },
  },
  {
    id: 'srv-track-prep',
    category: 'performance',
    title: {
      ar: 'تجهيز سيارات الحلبة وفحص ما قبل السباق',
      en: 'Track Day Prep & Circuit Pre-Inspection',
    },
    subtitle: {
      ar: 'موازنة أوزان الشاسيه وضبط زوايا العجلات وتبريد المحرك',
      en: 'Corner weighting, camber alignment & cooling optimization',
    },
    description: {
      ar: 'تجهيز طرازات GT (911 GT3 RS / GT4 RS) لضغط الحلبات. يشمل ضبط زوايا الكامبر والتو، تفريغ هواء الإطارات للنيتروجين، واختبار أجهزة التبريد وديناميكية الجناح الخلفي DRS.',
      en: 'Track preparation for GT models (911 GT3 RS, GT4 RS). Includes custom camber and toe setup, nitrogen tire filling, and DRS aerodynamic verification.',
    },
    duration: {
      ar: '180 دقيقة',
      en: '180 Minutes',
    },
    priceEstimate: {
      ar: 'يبدأ من 2,400 ريال / درهم ($640)',
      en: 'Starting from $640',
    },
    features: {
      ar: [
        'موازنة أوزان الشاسيه في المنعطفات Corner Balancing',
        'فحص ومعايرة أجنحة الهواء الهيدروليكية النشطة DRS',
        'معايرة ضغط وتماسك إطارات Michelin Cup 2 R',
        'تنزيل سجل التيليمتري وفحص درجات حرارة المحرك',
      ],
      en: [
        'Corner-weight chassis balancing on computerized scales',
        'DRS hydraulic wing and front aero flap testing',
        'Michelin Cup 2 R tire pressure & thermal setup',
        'ECU telemetry download and track temperature audit',
      ],
    },
    image: '/src/assets/images/hero_flagship_gt3rs_1792255768458.jpg',
    badge: {
      ar: 'خاص بطرازات GT',
      en: 'Motorsport Grade',
    },
  },
  {
    id: 'srv-high-voltage',
    category: 'diagnostics',
    title: {
      ar: 'صيانة تايكان وبطاريات الجهد العالي 800V',
      en: 'Taycan High-Voltage 800V & EV Diagnostics',
    },
    subtitle: {
      ar: 'فحص صحة خلايا البطارية وتحديث برمجيات المحركات الكهربائية',
      en: 'Cell health degradation analysis & pulse inverter firmware',
    },
    description: {
      ar: 'صيانة متقدمة لطرازات تايكان وماكان الكهربائية. فحص نظام العزل الكهربائي، دوائر التبريد المائي للبطارية، وبرمجة ناقل الحركة ذي السرعتين.',
      en: 'State-of-the-art diagnostic care for Taycan & Macan EV. High-voltage isolation check, thermal battery glycol fluid management, and 2-speed transmission update.',
    },
    duration: {
      ar: '120 دقيقة',
      en: '120 Minutes',
    },
    priceEstimate: {
      ar: 'يبدأ من 1,500 ريال / درهم ($400)',
      en: 'Starting from $400',
    },
    features: {
      ar: [
        'فحص كفاءة شحن 800V بقدرة 320 كيلوواط DC',
        'قياس وموازنة الجهد بين خلايا البطارية High Voltage Balance',
        'فحص مانع التسرب لسائل التبريد الكهربائي عالي الكفاءة',
        'تحديث برامج التحكم في الانطلاق Launch Control',
      ],
      en: [
        '800V architecture DC fast-charging stress test',
        'High-voltage individual battery cell balance audit',
        'Dielectric coolant circuit integrity and pump testing',
        'Firmware upgrade for dual-motor Launch Control',
      ],
    },
    image: '/src/assets/images/hero_taycan_ev_1792255769211.jpg',
    badge: {
      ar: 'سيارات كهربائية',
      en: 'E-Performance',
    },
  },
  {
    id: 'srv-detailing',
    category: 'body_care',
    title: {
      ar: 'العناية بالهيكل والطلاء وحماية السيراميك والنانو',
      en: 'Paint Protection & Ceramic Coating Studio',
    },
    subtitle: {
      ar: 'تصحيح الطلاء بعدسات ميكروسكوبية وحماية أفلام PPF معتمدة',
      en: 'Microscopic multi-stage paint correction & self-healing PPF',
    },
    description: {
      ar: 'استوديو العناية الفائقة بهياكل بورش المصنوعة من الألومنيوم والكربون. تصحيح الطلاء متعدد المراحل لإزالة الخدوش الدقيقة ووضع دروع حماية نانو سيراميك 9H تدوم لسنوات.',
      en: 'Dedicated detailing atelier for Porsche aluminum and carbon fiber bodies. Multi-stage machine polish to eliminate swirl marks followed by 9H nano ceramic sealants.',
    },
    duration: {
      ar: 'يوم كامل (24 ساعة)',
      en: 'Full Day (24h)',
    },
    priceEstimate: {
      ar: 'يبدأ من 2,800 ريال / درهم ($750)',
      en: 'Starting from $750',
    },
    features: {
      ar: [
        'إزالة الخدوش الدقيقة بنسبة 98% واستعادة عمق الطلاء',
        'طبقة نانو سيراميك 9H مقاومة للحرارة والمواد الكيميائية',
        'معالجة وحماية جلود المقصورة الطبيعية وحمايتها من التشقق',
        'ضمان رسمي لمدة 3 سنوات على حماية الطلاء',
      ],
      en: [
        '98% swirl mark elimination with gloss depth restoration',
        '9H chemical and UV-resistant ceramic glass shield',
        'Conditioning of Club Nappa leather against dehydration',
        'Official 3-year warranty certificate on paint shield',
      ],
    },
    image: '/src/assets/images/lifestyle_leather_duffle_1792255770345.jpg',
    badge: {
      ar: 'عناية فائقة',
      en: 'Atelier Detailing',
    },
  },
  {
    id: 'srv-concierge-loaner',
    category: 'maintenance',
    title: {
      ar: 'خدمة الباب للباب مع سيارة بديلة فارهة (Porsche Loaner)',
      en: 'Door-to-Door Concierge & Luxury Loaner Vehicle',
    },
    subtitle: {
      ar: 'استلام سيارتك من منزلك وتوفير سيارة كايين أو ماكان طوال فترة الصيانة',
      en: 'Flatbed transport from your home + complimentary Macan/Cayenne',
    },
    description: {
      ar: 'راحة تامة بدون الحاجة لمغادرة منزلك أو مكتبك. نقوم بنقل سيارتك عبر شاحنة نقل هيدروليكية مغلقة ومؤمنة بالكامل، مع تسليمك مفتاح سيارة بورش بديلة فوراً.',
      en: 'Effortless luxury care without leaving your residence. Fully enclosed hydraulic transport for your Porsche, with immediate delivery of an executive loaner vehicle.',
    },
    duration: {
      ar: 'طوال فترة الصيانة',
      en: 'Throughout Service',
    },
    priceEstimate: {
      ar: 'مجاناً مع الصيانات الكبرى / أو 350 ريال ($95)',
      en: 'Complimentary with Major Service',
    },
    features: {
      ar: [
        'شاحنة نقل مغلقة مخصصة لحماية أسفل الهيكل الرياضي',
        'تأمين شامل أثناء النقل ومتابعة حية عبر الـ GPS',
        'سيارة بديلة حديثة موديل العام (Macan / Cayenne)',
        'تسليم السيارة بعد إتمام الصيانة مغسولة ومعقمة بالكامل',
      ],
      en: [
        'Enclosed hydraulic flatbed safe for low ground clearance',
        'Full transit insurance with live GPS tracking status',
        'Current-year executive Porsche loaner (Macan / Cayenne)',
        'Return delivery fully detailed and sanitized',
      ],
    },
    image: '/src/assets/images/hero_taycan_ev_1792255769211.jpg',
    badge: {
      ar: 'خدمة VIP',
      en: 'VIP Concierge',
    },
  },
];

export const PORSCHE_MODELS_LIST = [
  '911 Carrera / Turbo / GT3 (992 / 991)',
  'Cayenne / Cayenne Coupe (E3)',
  'Panamera / Panamera E-Hybrid (G3 / G2)',
  'Macan / Macan Electric',
  'Taycan / Taycan Cross Turismo',
  '718 Cayman / Boxster / GT4',
  'Porsche Classic (993 / 964 / 356 / 928)',
];
