import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  // ==================== ELECTRONICS ====================
  {
    id: 'elec-laptop-01',
    title: 'NexusCore 15 Gaming & ML Laptop (15.6" 144Hz FHD, Intel i7-13620H, RTX 4050 6GB, 16GB DDR5, 512GB Gen4 SSD, Win 11)',
    brand: 'NexusTech',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 58990,
    originalPrice: 79990,
    discountPercentage: 26,
    rating: 4.6,
    reviewCount: 382,
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    isDealOfTheDay: true,
    isTrending: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed specifically for software engineers, machine learning students, and high-performance gamers. Features dedicated NVIDIA GeForce RTX 4050 graphics with Tensor Cores, a blazing fast 13th Gen Intel Core i7 processor, dual-channel 16GB DDR5 RAM upgradable to 64GB, and dual NVMe M.2 slots.',
    features: [
      'NVIDIA GeForce RTX 4050 6GB GDDR6 dedicated GPU for ML tensor computation & AAA gaming',
      '13th Gen Intel Core i7-13620H (10 Cores, 16 Threads, up to 4.9 GHz Turbo)',
      '15.6" Full HD (1920x1080) 144Hz IPS display with 100% sRGB color accuracy',
      '16GB DDR5 4800MHz Dual-Channel RAM (Expandable up to 64GB)',
      '512GB PCIe Gen4 NVMe M.2 SSD with second M.2 expansion slot',
      'Dual-fan Whirlwind cryogenic cooling system with liquid metal thermal compound',
      'Full-size 4-Zone RGB keyboard with anti-ghosting and 1.5mm key travel',
      'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4, HDMI 2.1, RJ-45 Gigabit Ethernet'
    ],
    specifications: [
      { name: 'Processor', value: 'Intel Core i7-13620H (10 Cores, up to 4.9 GHz)', highlight: true },
      { name: 'Graphics', value: 'NVIDIA GeForce RTX 4050 (6GB GDDR6, 95W TGP)', highlight: true },
      { name: 'RAM', value: '16GB DDR5 4800MHz (Upgradable to 64GB)', highlight: true },
      { name: 'Storage', value: '512GB M.2 NVMe PCIe 4.0 SSD', highlight: true },
      { name: 'Display', value: '15.6-inch FHD (1920x1080) 144Hz IPS 300 nits' },
      { name: 'Battery', value: '70Wh Li-Polymer (up to 7.5 hours battery life)' },
      { name: 'Weight', value: '2.1 kg' },
      { name: 'Operating System', value: 'Windows 11 Home 64-bit' },
      { name: 'Warranty', value: '1 Year Onsite Manufacturer Warranty + 1 Year Accidental Damage' }
    ],
    variants: [
      { id: 'v1', name: '16GB RAM + 512GB SSD', label: '16GB / 512GB SSD', inStock: true },
      { id: 'v2', name: '16GB RAM + 1TB SSD', label: '16GB / 1TB SSD', priceModifier: 4000, inStock: true },
      { id: 'v3', name: '32GB RAM + 1TB SSD', label: '32GB / 1TB SSD', priceModifier: 8500, inStock: true }
    ],
    frequentlyBoughtTogetherIds: ['elec-headphone-01', 'elec-acc-01'],
    tags: ['laptop', 'gaming', 'programming', 'machine learning', 'coding', 'rtx 4050', 'intel i7', 'under 60000', 'electronics'],
    dealEndTime: new Date(Date.now() + 18 * 3600 * 1000).toISOString()
  },
  {
    id: 'elec-laptop-02',
    title: 'AuraAir 14 Pro Thin & Light Ultrabook (14" 2.8K OLED 90Hz, AMD Ryzen 7 7840U, 16GB LPDDR5, 512GB SSD, 1.2kg)',
    brand: 'Aura',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 49990,
    originalPrice: 65990,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 219,
    inStock: true,
    stockCount: 9,
    isTrending: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An aerospace-grade aluminum ultrabook built for productivity, web development, and content creation on the move. Features a stunning 2.8K 90Hz OLED display with true blacks and 100% DCI-P3 color gamut.',
    features: [
      '2.8K (2880 x 1800) OLED display with 400 nits brightness and HDR 500 True Black',
      'AMD Ryzen 7 7840U 8-Core processor with Radeon 780M graphics',
      'Ultra-light 1.25kg all-metal chassis with 14.9mm slim profile',
      '18 hours all-day battery life with 65W GaN fast charger',
      'Fingerprint reader integrated into power button & backlit precision keyboard'
    ],
    specifications: [
      { name: 'Processor', value: 'AMD Ryzen 7 7840U (8 Cores, 16 Threads, up to 5.1 GHz)', highlight: true },
      { name: 'RAM', value: '16GB LPDDR5X 6400MHz', highlight: true },
      { name: 'Storage', value: '512GB PCIe 4.0 NVMe SSD', highlight: true },
      { name: 'Display', value: '14-inch 2.8K OLED (2880x1800) 90Hz 100% DCI-P3' },
      { name: 'Battery', value: '65Wh (up to 18 hours)' },
      { name: 'Weight', value: '1.25 kg' },
      { name: 'Warranty', value: '1 Year Comprehensive Onsite Warranty' }
    ],
    tags: ['laptop', 'ultrabook', 'programming', 'lightweight', 'oled', 'under 50000', 'student', 'electronics'],
    frequentlyBoughtTogetherIds: ['elec-headphone-01']
  },
  {
    id: 'elec-laptop-03',
    title: 'Zenith Titan Studio AI Workstation (16" Mini-LED 165Hz, Intel Core Ultra 9, RTX 4080 12GB, 32GB DDR5, 1TB SSD)',
    brand: 'Zenith',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 154990,
    originalPrice: 189990,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 94,
    inStock: true,
    stockCount: 5,
    isBestSeller: false,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The pinnacle of mobile computing power. Engineered for deep learning researchers, 3D artists, and hardcore simulation developers.',
    features: [
      'Intel Core Ultra 9 185H with dedicated AI NPU acceleration',
      'NVIDIA GeForce RTX 4080 12GB GDDR6 with 175W Max TGP',
      '16-inch 3.2K (3200x2000) 165Hz Mini-LED display with 1200 nits peak HDR',
      'Vapor chamber cooling with dual high-pressure liquid crystal polymer fans'
    ],
    specifications: [
      { name: 'Processor', value: 'Intel Core Ultra 9 185H (16 Cores, 22 Threads)' },
      { name: 'Graphics', value: 'NVIDIA RTX 4080 12GB GDDR6 (175W)' },
      { name: 'RAM', value: '32GB DDR5 5600MHz' },
      { name: 'Storage', value: '1TB M.2 Gen4 SSD' },
      { name: 'Display', value: '16" 3.2K Mini-LED 165Hz 1200 nits' }
    ],
    tags: ['laptop', 'workstation', 'gaming', 'machine learning', 'ai', 'rtx 4080', 'electronics']
  },
  {
    id: 'elec-headphone-01',
    title: 'SoundPulse Ultra ANC Wireless Headphones (Hybrid 45dB Active Noise Cancelling, LDAC Hi-Res, 60h Battery, Multi-point)',
    brand: 'SoundPulse',
    category: 'Electronics',
    subcategory: 'Audio & Headphones',
    price: 8999,
    originalPrice: 14999,
    discountPercentage: 40,
    rating: 4.7,
    reviewCount: 1420,
    inStock: true,
    stockCount: 45,
    isBestSeller: true,
    isDealOfTheDay: true,
    isTrending: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immerse yourself in concert-hall acoustic clarity with industry-leading 45dB hybrid active noise cancellation. Custom 40mm silk diaphragm drivers deliver punchy bass and crystalline treble.',
    features: [
      'Custom 40mm biocellulose drivers certified for Hi-Res Audio and LDAC codec',
      '6-microphone array with AI ENC for crystal clear call quality',
      'Up to 60 hours playback with ANC off, 40 hours with ANC on',
      'Fast charge: 10 minutes gives 5 hours of music playback',
      'Seamless multi-point connection between laptop and smartphone'
    ],
    specifications: [
      { name: 'Driver Size', value: '40mm Titanium Composite', highlight: true },
      { name: 'Noise Cancellation', value: 'Hybrid ANC up to -45dB', highlight: true },
      { name: 'Battery Life', value: '60 Hours (ANC Off) / 40 Hours (ANC On)', highlight: true },
      { name: 'Bluetooth', value: 'v5.3 with LDAC, AAC, SBC' },
      { name: 'Charging', value: 'USB Type-C Fast Charging' },
      { name: 'Weight', value: '254 g' }
    ],
    variants: [
      { id: 'c1', name: 'Midnight Onyx Black', label: 'Onyx Black', inStock: true },
      { id: 'c2', name: 'Alabaster Silver', label: 'Silver Mist', inStock: true },
      { id: 'c3', name: 'Navy Cobalt', label: 'Cobalt Blue', inStock: true }
    ],
    tags: ['headphones', 'anc', 'noise cancelling', 'bluetooth', 'audio', 'soundpulse', 'under 10000', 'wireless', 'electronics'],
    dealEndTime: new Date(Date.now() + 12 * 3600 * 1000).toISOString()
  },
  {
    id: 'elec-phone-01',
    title: 'Vortex Stellar 12 Pro 5G (6.7" 120Hz LTPO AMOLED, Snapdragon 8s Gen 3, 50MP Sony IMX890 OIS, 5000mAh 100W Fast Charge)',
    brand: 'Vortex',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 28999,
    originalPrice: 36999,
    discountPercentage: 21,
    rating: 4.5,
    reviewCount: 890,
    inStock: true,
    stockCount: 22,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Flagship tier smartphone experience at an accessible price. Powered by Qualcomm Snapdragon 8s Gen 3 with 50MP Sony flagship sensor with Optical Image Stabilization.',
    features: [
      '6.7-inch 1.5K 120Hz Curved LTPO AMOLED with 2600 nits peak brightness',
      'Snapdragon 8s Gen 3 flagship 4nm processor',
      '50MP OIS Sony IMX890 Main + 50MP 2x Telephoto Portrait Camera',
      '5000mAh battery with 100W SuperVOOC flash charger (0-100% in 25 mins)',
      'IP68 Dust and Water Resistance'
    ],
    specifications: [
      { name: 'Display', value: '6.7" 1.5K 120Hz LTPO AMOLED', highlight: true },
      { name: 'Processor', value: 'Qualcomm Snapdragon 8s Gen 3', highlight: true },
      { name: 'Camera', value: '50MP OIS + 50MP Telephoto + 8MP Ultra-wide', highlight: true },
      { name: 'Battery', value: '5000 mAh with 100W SuperCharge' },
      { name: 'RAM / ROM', value: '12GB LPDDR5X + 256GB UFS 4.0' }
    ],
    tags: ['smartphone', 'mobile', '5g', 'snapdragon', 'camera phone', 'under 30000', 'vortex', 'electronics']
  },
  {
    id: 'elec-watch-01',
    title: 'Zenith Horizon 3 Smartwatch (1.43" AMOLED Display, Stainless Steel Case, Dual-Band GPS, Bluetooth Calling, 12-Day Battery)',
    brand: 'Zenith',
    category: 'Electronics',
    subcategory: 'Smartwatches',
    price: 4499,
    originalPrice: 7999,
    discountPercentage: 43,
    rating: 4.6,
    reviewCount: 654,
    inStock: true,
    stockCount: 38,
    isDealOfTheDay: true,
    isTrending: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterpiece on your wrist. 1.43" high-resolution AMOLED screen encased in surgical 316L stainless steel with sapphire coating. Built-in GPS tracks outdoor runs with pinpoint accuracy.',
    features: [
      '1.43" Always-On AMOLED Display with 1000 nits outdoor visibility',
      'Built-in Dual-Frequency GPS and GLONASS for precise mapping',
      '24/7 Heart Rate, Continuous SpO2, HRV Stress and Sleep Tracking',
      'Clear Bluetooth calling with noise-canceling dual mics',
      '5 ATM Water Resistance up to 50 meters'
    ],
    specifications: [
      { name: 'Display', value: '1.43" AMOLED (466x466 pixels), 326 PPI' },
      { name: 'Battery', value: 'Up to 12 Days Typical Usage (450mAh)' },
      { name: 'Sensors', value: 'Optical HR, SpO2, Barometer, Compass, 6-Axis IMU' },
      { name: 'Water Resistance', value: '5 ATM (50m)' }
    ],
    tags: ['smartwatch', 'fitness watch', 'amoled', 'gps', 'under 5000', 'zenith', 'electronics'],
    dealEndTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'elec-acc-01',
    title: 'ErgoMech Neo Wireless Mechanical Keyboard (Gateron Brown Switches, RGB Backlit, Hot-Swappable, Tri-Mode 2.4G/BT/Type-C)',
    brand: 'ErgoMech',
    category: 'Electronics',
    subcategory: 'Accessories',
    price: 3899,
    originalPrice: 5999,
    discountPercentage: 35,
    rating: 4.8,
    reviewCount: 412,
    inStock: true,
    stockCount: 29,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The ultimate coding and typing companion. Features tactile Gateron Brown hot-swappable switches, sound-dampening silicone foam, and multi-device connection.',
    features: [
      'Hot-swappable PCB supports 3-pin and 5-pin switches',
      'PBT double-shot keycaps with south-facing RGB LEDs',
      '4000mAh battery lasts up to 200 hours without backlight'
    ],
    specifications: [
      { name: 'Switch Type', value: 'Gateron Brown Tactile' },
      { name: 'Layout', value: '75% Compact (84 Keys)' },
      { name: 'Battery', value: '4000mAh rechargeable Li-ion' }
    ],
    tags: ['keyboard', 'mechanical keyboard', 'programming', 'rgb', 'gaming', 'under 5000', 'electronics']
  },
  {
    id: 'elec-display-01',
    title: 'Lumina 27" 4K UHD IPS Creator Monitor (100% sRGB, HDR400, USB-C 90W Power Delivery, Height Adjustable Stand)',
    brand: 'Lumina',
    category: 'Electronics',
    subcategory: 'Monitors & Displays',
    price: 24999,
    originalPrice: 34999,
    discountPercentage: 28,
    rating: 4.7,
    reviewCount: 310,
    inStock: true,
    stockCount: 11,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Crisp 3840x2160 resolution tailored for software engineers, video editors, and designers. Single-cable USB-C connectivity powers your laptop while carrying 4K display and USB data.',
    features: [
      '27-inch 4K UHD (3840 x 2160) IPS panel with Delta E < 2 color accuracy',
      'USB-C 90W Power Delivery charges laptops effortlessly',
      'Ergonomic pivot, swivel, tilt, and height-adjustable stand'
    ],
    specifications: [
      { name: 'Panel', value: '27-inch IPS 4K UHD' },
      { name: 'Color Space', value: '100% sRGB, 95% DCI-P3' },
      { name: 'Ports', value: '1x USB-C (90W PD), 2x HDMI 2.0, 1x DP 1.4, 3x USB 3.0' }
    ],
    tags: ['monitor', '4k', 'display', 'coding', 'programming', 'under 25000', 'electronics']
  },

  // ==================== FASHION ====================
  {
    id: 'fash-jacket-01',
    title: 'Aura Atelier Italian Wool Tailored Blazer (Structured Fit, 100% Merino Wool Blend, Navy Blue)',
    brand: 'Aura Atelier',
    category: 'Fashion',
    subcategory: "Men's Clothing",
    price: 4499,
    originalPrice: 7999,
    discountPercentage: 43,
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Impeccably tailored from a premium breathable Merino wool blend. Designed with subtle shoulder padding, horn-effect buttons, and interior ticket pockets for modern business professionals.',
    features: [
      'Premium Italian weave 70% Merino Wool, 30% Silk-Touch Poly',
      'Double back vent for effortless movement and sitting comfort',
      'Breathable viscose lining with contrast piping'
    ],
    specifications: [
      { name: 'Material', value: '70% Wool, 30% Polyamide' },
      { name: 'Fit', value: 'Modern Slim Structured' },
      { name: 'Care', value: 'Dry Clean Only' }
    ],
    variants: [
      { id: 'sz-38', name: 'Size 38 (Medium)', label: '38 Regular', inStock: true },
      { id: 'sz-40', name: 'Size 40 (Large)', label: '40 Regular', inStock: true },
      { id: 'sz-42', name: 'Size 42 (XL)', label: '42 Regular', inStock: true }
    ],
    tags: ['blazer', 'formal', 'menswear', 'suit', 'fashion', 'under 5000']
  },
  {
    id: 'fash-shoe-01',
    title: 'Veloce Carbon Pro Running Sneakers (Breathable FlyKnit Upper, Dual-Density Zoom Foam, Anti-Slip Rubber)',
    brand: 'Veloce',
    category: 'Fashion',
    subcategory: 'Footwear',
    price: 2999,
    originalPrice: 4999,
    discountPercentage: 40,
    rating: 4.7,
    reviewCount: 520,
    inStock: true,
    stockCount: 30,
    isTrending: true,
    isDealOfTheDay: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Engineered for maximum energy return and street style. Seamless 3D knit upper wraps your foot like a glove while carbon plate stabilization prevents heel fatigue.',
    features: [
      'Full-length embedded carbon torsion plate for explosive propulsion',
      'Ultra-lightweight 210g per shoe',
      'Ortholite memory foam antibacterial insole'
    ],
    specifications: [
      { name: 'Sole', value: 'Dual-Density Nitro EVA + High-Traction Carbon Rubber' },
      { name: 'Upper', value: 'Breathable 3D Jacquard Knit' },
      { name: 'Weight', value: '210g (Size 8)' }
    ],
    variants: [
      { id: 'uk-7', name: 'UK 7', label: 'UK 7', inStock: true },
      { id: 'uk-8', name: 'UK 8', label: 'UK 8', inStock: true },
      { id: 'uk-9', name: 'UK 9', label: 'UK 9', inStock: true },
      { id: 'uk-10', name: 'UK 10', label: 'UK 10', inStock: true }
    ],
    tags: ['shoes', 'sneakers', 'running', 'fitness', 'footwear', 'under 3000', 'fashion'],
    dealEndTime: new Date(Date.now() + 15 * 3600 * 1000).toISOString()
  },
  {
    id: 'fash-tee-01',
    title: 'AeroTech 240 GSM Heavyweight Supima Cotton Oversized T-Shirt (Drop Shoulder, Bio-Washed, Off-White)',
    brand: 'AeroTech',
    category: 'Fashion',
    subcategory: "Men's Clothing",
    price: 899,
    originalPrice: 1499,
    discountPercentage: 40,
    rating: 4.5,
    reviewCount: 340,
    inStock: true,
    stockCount: 50,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Crafted from 100% American Supima long-staple cotton. 240 GSM heavy drape gives it a boxy streetwear aesthetic that does not shrink after machine wash.',
    features: ['100% Long-Staple Supima Cotton', 'Anti-pilling bio-silicon enzyme wash', 'Seamless rib collar that does not bacon'],
    specifications: [
      { name: 'GSM', value: '240 GSM Heavyweight' },
      { name: 'Fit', value: 'Relaxed Drop Shoulder' }
    ],
    tags: ['tshirt', 'cotton', 'oversized', 'streetwear', 'under 1000', 'fashion']
  },
  {
    id: 'fash-bag-01',
    title: 'TimberCraft Voyager Top-Grain Leather Weekend Duffle & Laptop Bag (Water-Resistant Canvas, Antique Brass Hardware)',
    brand: 'TimberCraft',
    category: 'Fashion',
    subcategory: 'Bags & Backpacks',
    price: 3499,
    originalPrice: 5999,
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 195,
    inStock: true,
    stockCount: 12,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The quintessential traveler bag. Combines top-grain crazy horse leather accents with heavy-duty 16oz waxed cotton canvas. Includes dedicated 16-inch padded laptop sleeve.',
    features: ['Dedicated padded 16-inch laptop compartment', 'Shoe compartment with ventilation eyelets', 'YKK metal zippers'],
    specifications: [
      { name: 'Capacity', value: '38 Liters' },
      { name: 'Dimensions', value: '52 x 28 x 26 cm' }
    ],
    tags: ['bag', 'duffle', 'leather', 'travel', 'fashion', 'under 5000']
  },

  // ==================== HOME & KITCHEN ====================
  {
    id: 'home-coffee-01',
    title: 'OmniBrew Barista Touch 15-Bar Espresso & Cappuccino Machine (PID Temperature Control, Commercial Steam Wand, 1.8L Tank)',
    brand: 'OmniBrew',
    category: 'Home & Kitchen',
    subcategory: 'Coffee Makers',
    price: 17999,
    originalPrice: 24999,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 410,
    inStock: true,
    stockCount: 8,
    isBestSeller: true,
    isDealOfTheDay: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Brew cafe-grade espresso, velvety flat whites, and rich lattes at home. Built with an authentic Italian 15-bar Ulka pump, ThermoBlock rapid heating, and PID thermal precision.',
    features: [
      'Italian 15-Bar Ulka pressure pump for golden crema extraction',
      'ThermoBlock instant heating heats up in under 35 seconds',
      'Professional 360-degree stainless steel micro-foam steam wand',
      'Removable 1.8-liter transparent BPA-free water reservoir'
    ],
    specifications: [
      { name: 'Pressure', value: '15 Bar Italian Pump', highlight: true },
      { name: 'Heating System', value: 'Fast ThermoBlock with PID Precision', highlight: true },
      { name: 'Water Tank', value: '1.8L Detachable Tank' },
      { name: 'Power', value: '1350 Watts' }
    ],
    tags: ['coffee', 'espresso', 'kitchen', 'home', 'omnibrew', 'under 20000', 'barista'],
    dealEndTime: new Date(Date.now() + 20 * 3600 * 1000).toISOString()
  },
  {
    id: 'home-lamp-01',
    title: 'Lumina Arc Nordic Ambient Smart Floor Lamp (16M RGB + Tunable White 2200K-6500K, Aluminum Body, WiFi/Alexa/App)',
    brand: 'Lumina',
    category: 'Home & Kitchen',
    subcategory: 'Lighting & Lamps',
    price: 3499,
    originalPrice: 5999,
    discountPercentage: 41,
    rating: 4.7,
    reviewCount: 320,
    inStock: true,
    stockCount: 25,
    isTrending: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Elevate your living room or workspace aesthetic with minimalist Scandinavian corner lighting. Casts 16 million colors and soft warm whites with music sync.',
    features: ['16 Million Colors + 300 Dynamic Lighting Modes', 'Music Sync via built-in high sensitivity microphone', 'Sturdy 4kg anti-tip weighted iron base'],
    specifications: [
      { name: 'Height', value: '142 cm' },
      { name: 'Connectivity', value: 'WiFi 2.4GHz + Bluetooth 5.0' },
      { name: 'Power', value: '20W Energy Saving LED' }
    ],
    tags: ['lamp', 'lighting', 'smart home', 'rgb', 'home decor', 'under 5000']
  },
  {
    id: 'home-air-01',
    title: 'AuraPure H14 True HEPA Smart Air Purifier (Cleans 500 sq ft in 12 mins, Real-time PM2.5 AQI Display, Whisper Quiet 22dB)',
    brand: 'Aura',
    category: 'Home & Kitchen',
    subcategory: 'Air Purifiers',
    price: 8499,
    originalPrice: 12999,
    discountPercentage: 34,
    rating: 4.8,
    reviewCount: 490,
    inStock: true,
    stockCount: 16,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Breathe pure, allergen-free air. Medical-grade H14 True HEPA filter captures 99.99% of airborne particles down to 0.1 microns, including dust, smoke, pet dander, and viruses.',
    features: ['Medical Grade H14 True HEPA + Activated Carbon layer', 'Digital LED display with color-coded 4-stage AQI indicator', 'CADR 380 m3/h covers large rooms effortlessly'],
    specifications: [
      { name: 'Filter Grade', value: 'H14 True HEPA (99.99% efficiency)' },
      { name: 'Coverage', value: 'Up to 500 sq. ft.' },
      { name: 'Noise Level', value: '22dB Sleep Mode' }
    ],
    tags: ['air purifier', 'health', 'hepa', 'home', 'appliances', 'under 10000']
  },

  // ==================== BEAUTY & PERSONAL CARE ====================
  {
    id: 'beauty-serum-01',
    title: 'DermaGlow Triple Hyaluronic Acid + 15% Vitamin C Brightening Serum (30ml, Ferulic Acid, Dermatologist Tested)',
    brand: 'DermaGlow',
    category: 'Beauty & Personal Care',
    subcategory: 'Skincare Serums',
    price: 799,
    originalPrice: 1299,
    discountPercentage: 38,
    rating: 4.7,
    reviewCount: 890,
    inStock: true,
    stockCount: 60,
    isBestSeller: true,
    isDealOfTheDay: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608248597359-56338b724f72?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clinically proven brightening formula. Packed with 15% pure ethyl ascorbic acid and multi-molecular weight hyaluronic acid that penetrates deep skin layers to fade dark spots and boost collagen.',
    features: ['15% Stable Vitamin C + Ferulic Acid + Vitamin E', 'Fragrance-free, paraben-free, non-comedogenic', 'Noticeable glow and reduced hyperpigmentation in 14 days'],
    specifications: [
      { name: 'Volume', value: '30 ml' },
      { name: 'Skin Type', value: 'All Skin Types (including sensitive)' }
    ],
    tags: ['skincare', 'serum', 'vitamin c', 'beauty', 'glow', 'under 1000']
  },
  {
    id: 'beauty-perfume-01',
    title: 'Aura Santal & Black Pepper Extrait de Parfum 100ml (Long-Lasting 18h Sillage, Australian Sandalwood, Cardamom & Cedar)',
    brand: 'Aura Fragrance',
    category: 'Beauty & Personal Care',
    subcategory: 'Perfumes & Fragrances',
    price: 2499,
    originalPrice: 3999,
    discountPercentage: 37,
    rating: 4.8,
    reviewCount: 420,
    inStock: true,
    stockCount: 20,
    isTrending: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An evocative woody-spicy fragrance with incredible longevity and warmth. Opens with crisp crushed cardamom and black pepper, melting into creamy Australian sandalwood, leather, and smoke.',
    features: ['30% Extrait de Parfum concentration for 16-18h wear', 'Magnetic cap heavy glass bottle', 'Unisex signature scent profile'],
    specifications: [
      { name: 'Top Notes', value: 'Cardamom, Violet Leaves, Black Pepper' },
      { name: 'Heart Notes', value: 'Iris, Papyrus, Amber' },
      { name: 'Base Notes', value: 'Cedarwood, Australian Sandalwood' }
    ],
    tags: ['perfume', 'fragrance', 'sandalwood', 'luxury', 'beauty', 'under 3000']
  },

  // ==================== BOOKS ====================
  {
    id: 'book-ddia-01',
    title: 'Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems (Martin Kleppmann)',
    brand: "O'Reilly Media",
    category: 'Books',
    subcategory: 'Technology & Coding',
    price: 1199,
    originalPrice: 1799,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 2300,
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The definitive handbook for software architects and senior engineers building modern distributed systems, data pipelines, replication, consensus, and event-driven architectures.',
    features: ['In-depth analysis of storage engines, distributed transactions, consensus protocols', 'Essential reading for staff engineers and architects', 'Over 600 pages of deep engineering insight'],
    specifications: [
      { name: 'Author', value: 'Martin Kleppmann' },
      { name: 'Publisher', value: "O'Reilly Media" },
      { name: 'Pages', value: '616 pages' },
      { name: 'Format', value: 'Paperback' }
    ],
    tags: ['books', 'programming', 'architecture', 'software engineering', 'distributed systems', 'under 2000']
  },
  {
    id: 'book-habits-01',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones (James Clear, Hardcover Edition)',
    brand: 'Penguin Random House',
    category: 'Books',
    subcategory: 'Self Improvement',
    price: 499,
    originalPrice: 799,
    discountPercentage: 37,
    rating: 4.9,
    reviewCount: 9800,
    inStock: true,
    stockCount: 150,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Over 15 million copies sold globally. James Clear reveals how tiny, 1% incremental changes accumulate into life-altering personal and professional results.',
    features: ['Practical framework based on biology, psychology, and neuroscience', 'Includes actionable habit scorecards and implementation intentions'],
    specifications: [
      { name: 'Author', value: 'James Clear' },
      { name: 'Pages', value: '320 pages' },
      { name: 'Language', value: 'English' }
    ],
    tags: ['books', 'productivity', 'habits', 'self help', 'bestseller', 'under 1000']
  },

  // ==================== SPORTS & FITNESS ====================
  {
    id: 'sport-bike-01',
    title: 'AeroFit SpinMaster Pro Studio Indoor Cycling Bike (Magnetic Resistance, Silent Belt Drive, 15kg Flywheel, Bluetooth App Sync)',
    brand: 'AeroFit',
    category: 'Sports & Fitness',
    subcategory: 'Cardio Equipment',
    price: 18499,
    originalPrice: 27999,
    discountPercentage: 33,
    rating: 4.7,
    reviewCount: 180,
    inStock: true,
    stockCount: 6,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Bring the studio spin class to your home. Whisper-quiet neodymium magnetic resistance pairs with Bluetooth to sync cadence and watts with Zwift and Kinomap.',
    features: ['15kg precision balanced stainless flywheel', 'Micro-adjustable magnetic brake with emergency stop', 'Heavy-gauge steel frame supports up to 135kg rider'],
    specifications: [
      { name: 'Flywheel Weight', value: '15 kg Chrome Plated' },
      { name: 'Max User Weight', value: '135 kg' },
      { name: 'Resistance', value: 'Frictionless Magnetic (0-100 levels)' }
    ],
    tags: ['fitness', 'gym', 'cycling', 'cardio', 'exercise bike', 'under 25000', 'sports']
  },
  {
    id: 'sport-mat-01',
    title: 'ZenCore 8mm Eco-Friendly TPE Dual-Texture Anti-Tear Yoga Mat (Laser Alignment Lines, Carry Strap & Bag included)',
    brand: 'ZenCore',
    category: 'Sports & Fitness',
    subcategory: 'Yoga Mats',
    price: 1099,
    originalPrice: 1999,
    discountPercentage: 45,
    rating: 4.8,
    reviewCount: 740,
    inStock: true,
    stockCount: 75,
    isDealOfTheDay: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Unrivaled joint cushioning and non-slip traction even during sweaty Hot Yoga sessions. Features laser-etched posture alignment system.',
    features: ['8mm high-density TPE prevents knee and elbow pressure', 'Non-toxic, PVC-free, odorless material', 'Dual textured non-skid surface'],
    specifications: [
      { name: 'Thickness', value: '8 mm' },
      { name: 'Dimensions', value: '183 cm x 61 cm' }
    ],
    tags: ['yoga', 'fitness', 'exercise', 'mat', 'under 2000', 'sports']
  },

  // ==================== TOYS & GAMES ====================
  {
    id: 'toy-robot-01',
    title: 'RoboGenesis AI STEM Programmable Smart Robotics Kit (Python & Scratch Coding, Ultrasonic & Vision Sensor, Ages 8-16)',
    brand: 'RoboGenesis',
    category: 'Toys & Games',
    subcategory: 'Robotics & STEM',
    price: 3699,
    originalPrice: 5499,
    discountPercentage: 32,
    rating: 4.9,
    reviewCount: 280,
    inStock: true,
    stockCount: 15,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Inspire the next generation of roboticists. Kids build their own obstacle-navigating rover and program it using visual Scratch blocks or real Python code.',
    features: ['Modular plug-and-play electronic modules - no soldering required', 'Line tracking, obstacle avoidance, and color detection sensors', 'Step-by-step interactive 3D assembly app'],
    specifications: [
      { name: 'Recommended Age', value: '8 - 16 Years' },
      { name: 'Coding Languages', value: 'Scratch 3.0 & Python' }
    ],
    tags: ['stem', 'robotics', 'coding for kids', 'toys', 'educational', 'under 5000']
  },
  {
    id: 'toy-board-01',
    title: 'Galactic Horizon Deep Space Colonization Board Game (1-5 Players, 90 mins, Custom Miniatures & Resource Trackers)',
    brand: 'Tabletop Legends',
    category: 'Toys & Games',
    subcategory: 'Board Games',
    price: 2499,
    originalPrice: 3499,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 190,
    inStock: true,
    stockCount: 19,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A deeply strategic sci-fi board game with high replayability. Lead rival corporate factions terraforming new exoplanets through engine building and tech trees.',
    features: ['High quality detailed plastic ship miniatures', 'Solo campaign mode included'],
    specifications: [
      { name: 'Players', value: '1 to 5 Players' },
      { name: 'Playtime', value: '60 to 90 Minutes' }
    ],
    tags: ['board games', 'strategy', 'family game', 'toys', 'under 3000']
  },

  // ==================== GROCERY & DAILY ESSENTIALS ====================
  {
    id: 'groc-coffee-01',
    title: 'Blue Peak Single-Estate Arabica Whole Bean Artisan Coffee 500g (Medium Dark Roast, Notes of Dark Chocolate & Hazelnut)',
    brand: 'Blue Peak Roasters',
    category: 'Grocery & Daily Essentials',
    subcategory: 'Artisan Coffee & Tea',
    price: 699,
    originalPrice: 999,
    discountPercentage: 30,
    rating: 4.8,
    reviewCount: 920,
    inStock: true,
    stockCount: 80,
    isBestSeller: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '100% shade-grown high-altitude Arabica beans from the Western Ghats. Freshly roasted in micro-batches with notes of caramelized cocoa, hazelnut, and toasted brioche.',
    features: ['Nitrogen flushed degassing valve bag for peak freshness', 'Zero artificial flavors or preservatives'],
    specifications: [
      { name: 'Weight', value: '500 g' },
      { name: 'Roast Level', value: 'Medium-Dark Roast' },
      { name: 'Origin', value: 'Coorg High Estates (1400m altitude)' }
    ],
    tags: ['coffee', 'arabica', 'beans', 'gourmet', 'grocery', 'under 1000']
  },
  {
    id: 'groc-nuts-01',
    title: 'Himalayan Harvest Royal Mamra Almonds & Jumbo Walnuts Combo Pack 1kg (Vacuum Packed, High Omega-3, Cold Pressed Oil Rich)',
    brand: 'Himalayan Harvest',
    category: 'Grocery & Daily Essentials',
    subcategory: 'Nuts & Superfoods',
    price: 1399,
    originalPrice: 2199,
    discountPercentage: 36,
    rating: 4.7,
    reviewCount: 460,
    inStock: true,
    stockCount: 45,
    isDealOfTheDay: true,
    primeDelivery: true,
    thumbnail: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Pure nutrient power. Authentic hand-picked Mamra almonds and Kashmiri snow-white walnut halves packed with natural Omega-3 fatty acids and vitamin E.',
    features: ['100% natural, unpolished and chemical-free', 'Zipper pouch preserves crunchiness'],
    specifications: [
      { name: 'Net Weight', value: '1 kg (500g Almonds + 500g Walnuts)' }
    ],
    tags: ['nuts', 'dry fruits', 'almonds', 'walnuts', 'healthy', 'grocery', 'under 2000']
  }
];

export const SAMPLE_REVIEWS: Record<string, any[]> = {
  'elec-laptop-01': [
    {
      id: 'rev-01',
      author: 'Rohit Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      title: 'Flawless for machine learning and heavy coding under 60k!',
      comment: 'I am a final-year CS student doing deep learning and PyTorch projects. The RTX 4050 with CUDA support handles model training smoothly. Compilation times on the 13th gen i7 are rapid. Thermals stay under 75C with the dual fan cooling. Best purchase of the year!',
      date: '2 days ago',
      verifiedPurchase: true,
      helpfulCount: 48
    },
    {
      id: 'rev-02',
      author: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      rating: 4,
      title: 'Solid build quality, fantastic 144Hz screen',
      comment: 'Key travel is super comfortable for long hours of programming. Display colors are vibrant. Battery gives around 5-6 hours on moderate coding workload, which is normal for a powerful laptop. Charger is compact 135W GaN.',
      date: '1 week ago',
      verifiedPurchase: true,
      helpfulCount: 22
    }
  ],
  'elec-headphone-01': [
    {
      id: 'rev-03',
      author: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      title: 'ANC rivals headphones 3x this price point!',
      comment: 'Takes out air conditioner hum, traffic, and coffee shop chatter completely. Battery lasts almost 2 full work weeks on a single charge. Bluetooth multi-point switching between my MacBook and phone is instantaneous.',
      date: '3 days ago',
      verifiedPurchase: true,
      helpfulCount: 35
    }
  ]
};
