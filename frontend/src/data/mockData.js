// src/data/mockData.js

// 1. DATA UNTUK HERO SLIDER
export const heroSlidesData = [
  { id: 1, slug: 'new-pajero-sport', tabName: 'PAJERO SPORT', tag: 'DEALER RESMI JAKARTA', subhead: 'EMPOWER YOUR JOURNEY', title: 'Pajero Sport', price: 'Rp 625.700.000', desc: 'Premium SUV Flagship. Kini dengan fitur keselamatan canggih dan performa mesin diesel tangguh.', image: '/pajero_card.jpg' },
  { id: 2, slug: 'xpander-cross', tabName: 'XPANDER CROSS', tag: 'BEST SELLER MPV', subhead: 'BE THE LIFE ADVENTURE', title: 'Xpander Cross', price: 'Rp 325.200.000', desc: 'Kombinasi kenyamanan MPV dan ketangguhan SUV untuk petualangan keluarga Anda.', image: '/card.png' },
  { id: 3, slug: 'canter', tabName: 'CANTER (TRUK)', tag: 'KENDARAAN NIAGA', subhead: 'ANDALAN BISNIS', title: 'Truk Canter', price: 'Mulai Rp 400 Jutaan', desc: 'Truk nomor 1 di Indonesia. Tangguh, irit, dan mudah perawatannya untuk segala bisnis.', image: '/card.png' }
];

// 2. DATA MASTER KENDARAAN (DENGAN TAHUN/YEAR)
export const carsData = {
  "new-pajero-sport": {
    id: 4, slug: 'new-pajero-sport', category: 'Passenger Cars', type: 'SUV', year: 2026, 
    name: 'New Pajero Sport', tagline: 'Legendary SUV Flagship. Lebih gagah, lebih mewah, dan bertenaga.',
    basePrice: 625700000, priceString: 'Rp 625.700.000', image: '/pajero_card.jpg', rating: 5, reviewsCount: 12,
    colors: [{ name: 'Quartz White Pearl', hex: '#f0f4f5' }, { name: 'Graphite Gray', hex: '#4b4e54' }, { name: 'Jet Black Mica', hex: '#111111' }],
    quickSpecs: [{ label: 'Penggerak', value: '2WD / 4WD' }, { label: 'Kapasitas', value: '7 Seater Leather' }, { label: 'Ukuran Velg', value: '18 inch' }, { label: 'Ukuran Ban', value: '265/60 R18' }],
    specs: { engine: '2.4L MIVEC Turbocharged', cc: '2,442 cc', power: '181 PS', torque: '430 Nm', transmission: '8-Speed AT / 5-Speed MT', dimension: '4,825 x 1,815 x 1,835 mm' },
    fullSpecs: { mesin: [{ label: 'Tipe Mesin', value: '2.4L MIVEC (4N15)' }, { label: 'Kapasitas', value: '2,442 cc' }, { label: 'Tenaga', value: '181 PS' }, { label: 'Torsi', value: '430 Nm' }], dimensi: [{ label: 'Panjang', value: '4,825 mm' }, { label: 'Lebar', value: '1,815 mm' }, { label: 'Tinggi', value: '1,835 mm' }, { label: 'Wheelbase', value: '2,800 mm' }] },
    variants: [
      { slug: 'exceed-mt-4x2', name: 'Exceed MT 4x2', priceStr: 'Rp 567.100.000', price: 567100000, highlights: ['2.4L Diesel Engine', 'Manual Transmission 5-Speed', '18" Alloy Wheel'], highlightDetails: { eksterior: ['Halogen Headlamps', '18" Alloy Wheels'], interior: ['Fabric Seats', 'Standard Audio'] } },
      { slug: 'dakar-at-4x2', name: 'Dakar AT 4x2', priceStr: 'Rp 625.700.000', price: 625700000, highlights: ['8-Speed Automatic', 'Advanced Safety Features', 'Sunroof', 'Leather Seats'], highlightDetails: { eksterior: ['LED Projector Headlamps', 'Hidden Type DRL', '18" Alloy Wheels Two-Tone', 'Power Tailgate with Kick Sensor'], interior: ['8" Color LCD Meter', 'Premium Leather Seats', 'Sunroof', 'Advanced Safety Features (FCM, BSW)'] } },
      { slug: 'dakar-ultimate-at-4x4', name: 'Dakar Ultimate AT 4x4', priceStr: 'Rp 750.600.000', price: 750600000, highlights: ['Super Select 4WD-II', 'Power Tailgate with Kick Sensor', 'Premium Ent. System'], highlightDetails: { eksterior: ['LED Projector Headlamps', 'Power Tailgate with Kick Sensor', 'Super Select 4WD-II'], interior: ['Premium Entertainment System', 'Leather Seats', 'Sunroof'] } }
    ],
    gallery: ['/pajero_card.jpg', '/card.png', '/card.png', '/card.png'],
    reviews: [
      { name: 'Willy Arsal', date: '14 Januari 2026', text: 'Sangat nyaman untuk perjalanan jauh bersama keluarga.', rating: 5 }
    ],
    faqs: [
      { q: 'Berapa harga New Pajero Sport?', a: 'Harga mulai dari Rp 567.100.000 OTR Jakarta.' }
    ]
  },
  "xpander-cross": {
    id: 6, slug: 'xpander-cross', category: 'Passenger Cars', type: 'MPV Crossover', year: 2026, 
    name: 'Xpander Cross', tagline: 'Kombinasi MPV dan SUV untuk petualangan tanpa batas.',
    basePrice: 325200000, priceString: 'Rp 325.200.000', image: '/card.png', rating: 4.9, reviewsCount: 28,
    colors: [{ name: 'Quartz White Pearl', hex: '#f0f4f5' }, { name: 'Blade Silver', hex: '#a6a6a6' }],
    quickSpecs: [{ label: 'Penggerak', value: '2WD' }, { label: 'Kapasitas', value: '7 Seater' }, { label: 'Ground Clearance', value: '220 mm' }, { label: 'Transmisi', value: 'CVT / MT' }],
    specs: { engine: '1.5L MIVEC DOHC', cc: '1,499 cc', power: '105 PS', torque: '141 Nm', transmission: 'CVT / 5-Speed MT', dimension: '4,595 x 1,790 x 1,750 mm' },
    fullSpecs: { mesin: [{ label: 'Tipe Mesin', value: '1.5L MIVEC' }, { label: 'Tenaga', value: '105 PS' }], dimensi: [{ label: 'Panjang', value: '4,595 mm' }, { label: 'Ground Clearance', value: '220 mm' }] },
    variants: [
      { slug: 'mt', name: 'MT', priceStr: 'Rp 325.200.000', price: 325200000, highlights: ['1.5L MIVEC Engine', 'Manual Transmission', '17" Alloy Wheel'], highlightDetails: { eksterior: ['LED Headlamps'], interior: ['Fabric Seats'] } },
      { slug: 'premium-cvt', name: 'Premium CVT', priceStr: 'Rp 351.100.000', price: 351100000, highlights: ['CVT Transmission', 'Leather Seats', 'Active Yaw Control (AYC)'], highlightDetails: { eksterior: ['LED Headlamps', 'Roof Rail'], interior: ['Synthetic Leather Seats', '8" LCD Meter'] } }
    ],
    gallery: ['/card.png', '/card.png'], 
    reviews: [{ name: 'Andi Pratama', date: '20 Februari 2026', text: 'Ground clearance tinggi bikin aman lewati jalanan.', rating: 5 }], 
    faqs: []
  },
  "new-xpander": {
    id: 5, slug: 'new-xpander', category: 'Passenger Cars', type: 'MPV', year: 2026, 
    name: 'New Xpander', tagline: 'Kenyamanan MPV sejati untuk keluarga modern.',
    basePrice: 267700000, priceString: 'Rp 267.700.000', image: '/card.png', rating: 4.8, reviewsCount: 45,
    colors: [{ name: 'White Pearl', hex: '#f0f4f5' }],
    quickSpecs: [{ label: 'Penggerak', value: '2WD' }, { label: 'Kapasitas', value: '7 Seater' }, { label: 'Suspensi', value: 'Tuned for Comfort' }, { label: 'Transmisi', value: 'CVT / MT' }],
    specs: { engine: '1.5L MIVEC DOHC', cc: '1,499 cc', power: '105 PS', torque: '141 Nm', transmission: 'CVT / 5-Speed MT', dimension: '4,595 x 1,750 x 1,750 mm' },
    fullSpecs: { mesin: [{ label: 'Tipe Mesin', value: '1.5L MIVEC' }], dimensi: [{ label: 'Panjang', value: '4,595 mm' }] },
    variants: [{ slug: 'ultimate-cvt', name: 'Ultimate CVT', priceStr: 'Rp 321.300.000', price: 321300000, highlights: ['CVT Transmission', 'Cruise Control', 'Electric Parking Brake'], highlightDetails: { eksterior: ['LED Headlamps'], interior: ['Soft Touch Material'] } }],
    gallery: ['/card.png'], 
    reviews: [], faqs: []
  },
  "xforce": {
    id: 7, slug: 'xforce', category: 'Passenger Cars', type: 'Compact SUV', year: 2026, 
    name: 'New XFORCE', tagline: 'Infinite Excitement. SUV Compact dengan desain futuristik.',
    basePrice: 382500000, priceString: 'Rp 382.500.000', image: '/card.png', rating: 5, reviewsCount: 18,
    colors: [{ name: 'Energetic Yellow', hex: '#d4af37' }],
    quickSpecs: [{ label: 'Penggerak', value: '2WD' }, { label: 'Kapasitas', value: '5 Seater' }, { label: 'Audio', value: 'Yamaha Premium' }, { label: 'Drive Mode', value: '4 Modes' }],
    specs: { engine: '1.5L MIVEC DOHC', cc: '1,499 cc', power: '105 PS', torque: '141 Nm', transmission: 'CVT', dimension: '4,390 x 1,810 x 1,660 mm' },
    fullSpecs: { mesin: [{ label: 'Tipe Mesin', value: '1.5L MIVEC' }], dimensi: [{ label: 'Panjang', value: '4,390 mm' }] },
    variants: [{ slug: 'ultimate-cvt', name: 'Ultimate CVT', priceStr: 'Rp 419.100.000', price: 419100000, highlights: ['Dynamic Sound Yamaha Premium', '12.3" SDA', 'Auto Tailgate'], highlightDetails: { eksterior: ['18" Alloy Wheels'], interior: ['Ambient Lighting'] } }],
    gallery: ['/card.png'], reviews: [], faqs: []
  },
  "all-new-triton": {
    id: 9, slug: 'all-new-triton', category: 'Light Commercial', type: 'Double Cabin', year: 2025, 
    name: 'All New Triton', tagline: 'Tangguh di segala medan, siap untuk bisnis keras.',
    basePrice: 300000000, priceString: 'Hubungi Sales', image: '/card.png', rating: 4.9, reviewsCount: 15,
    colors: [{ name: 'Solid White', hex: '#ffffff' }],
    quickSpecs: [{ label: 'Penggerak', value: '4x4 / 4x2' }, { label: 'Kapasitas', value: '5 Seater' }, { label: 'Deck', value: 'Tahan Banting' }, { label: 'Mesin', value: 'Diesel Turbo' }],
    specs: { engine: '2.4L Clean Diesel', cc: '2,442 cc', power: '181 PS', torque: '430 Nm', transmission: 'AT / MT', dimension: '5,305 x 1,815 x 1,795 mm' },
    fullSpecs: { mesin: [{ label: 'Tipe Mesin', value: '2.4L Diesel' }], dimensi: [{ label: 'Panjang', value: '5,305 mm' }] },
    variants: [{ slug: 'ultimate-at-double-cab-4wd', name: 'Ultimate AT 4WD', priceStr: 'Rp 520.000.000', price: 520000000, highlights: ['Super Select 4WD-II', 'Leather Seats', 'Bedliner'], highlightDetails: { eksterior: ['18" Alloy Wheels'], interior: ['Leather Seats'] } }],
    gallery: ['/card.png'], reviews: [], faqs: []
  },
  "canter": {
    id: 10, slug: 'canter', category: 'Commercial Vehicles', type: 'Truck', year: 2026, 
    name: 'Truk Canter', tagline: 'Andalan bisnis logistik Indonesia.',
    basePrice: 400000000, priceString: 'Mulai Rp 400 Jt', image: '/card.png', rating: 5, reviewsCount: 82,
    colors: [{ name: 'Yellow', hex: '#fcd34d' }],
    quickSpecs: [{ label: 'Roda', value: '4 Ban / 6 Ban' }, { label: 'GVW', value: '5.2 - 8.5 Ton' }, { label: 'Mesin', value: 'Euro 4' }, { label: 'Kabin', value: 'Jungkit' }],
    specs: { engine: '4V21-2AT1 / 4V21-2AT4', cc: '3,907 cc', power: '108 - 136 PS', torque: '300 - 420 Nm', transmission: 'Manual', dimension: 'Bervariasi' },
    fullSpecs: { mesin: [{ label: 'Tipe Mesin', value: 'Common Rail Euro 4' }], dimensi: [{ label: 'Panjang', value: 'Bervariasi' }] },
    variants: [{ slug: 'fe-74-hd', name: 'FE 74 HD (6 Ban)', priceStr: 'Rp 450.000.000', price: 450000000, highlights: ['Mesin Euro 4', 'Gardan Heavy Duty', 'Kabin Lebar'], highlightDetails: { eksterior: ['Kabin Kuning'], interior: ['Standard'] } }],
    gallery: ['/card.png'], reviews: [], faqs: []
  }
};

// 3. DATA BERITA & PROMO
export const newsPromoData = [
  {
    id: 1, slug: 'tips-mudik-lebaran-2026', type: 'BERITA', isFeatured: true,
    title: 'Tips Mudik Lebaran Pakai Mobil Mitsubishi: Panduan Lengkap dari Persiapan hingga Tiba dengan Selamat',
    date: '17 Maret 2026', author: 'Willy Arsal', image: '/card.png', 
    snippet: 'Panduan lengkap mudik Lebaran pakai mobil Mitsubishi: dari checklist persiapan, tips berkendara aman, hingga perawatan pasca-mudik.',
    tags: ['Mudik2026', 'TipsMitsubishi'],
    content: `<p>Mudik lebaran sudah di depan mata. Agar perjalanan menuju kampung halaman aman dan nyaman, persiapan kendaraan adalah hal yang mutlak.</p><h3>1. Checklist Sebelum Berangkat</h3><p>Periksa kondisi mesin, tekanan ban, aki, sistem rem, dan level oli secara menyeluruh. Pastikan wiper dan lampu berfungsi optimal.</p><h3>2. Optimalkan Fitur Kendaraan</h3><p>Gunakan fitur Cruise Control jika Anda melewati tol panjang. Jangan lupa manfaatkan sistem hiburan untuk mengusir kebosanan selama macet.</p>`
  },
  {
    id: 2, slug: 'promo-dp-ringan-pajero', type: 'PROMO', isFeatured: false,
    title: 'Promo Berkah Ramadhan: DP Ringan Pajero Sport Mulai 15%',
    date: '10 Maret 2026', author: 'Tim Sales', image: '/pajero_card.jpg',
    snippet: 'Sambut hari raya dengan mobil baru! Dapatkan Pajero Sport dengan Down Payment (DP) super ringan mulai dari 15%.',
    tags: ['PromoRamadhan', 'PajeroSport'],
    content: `<p>Bawa pulang Mitsubishi Pajero Sport impian Anda bulan ini dengan penawaran spesial!</p><h3>Syarat dan Ketentuan:</h3><ul><li>Berlaku untuk pemesanan varian Dakar dan Exceed selama periode 1 - 31 Maret 2026.</li><li>DP 15% berlaku khusus untuk pengajuan kredit melalui leasing rekanan resmi kami.</li><li>Bebas biaya admin untuk tenor 1 tahun.</li></ul>`
  },
  {
    id: 3, slug: 'mitsubishi-raih-penghargaan', type: 'BERITA', isFeatured: false,
    title: 'Mitsubishi Utama Raih Penghargaan "Dealer of The Year 2025"',
    date: '28 Februari 2026', author: 'Redaksi', image: '/card.png',
    snippet: 'Berkat dedikasi dalam memberikan pelayanan Sales dan After-Sales terbaik, Mitsubishi Utama dinobatkan sebagai dealer terbaik.',
    tags: ['Penghargaan', 'DealerTerbaik'],
    content: `<p>Kami sangat bangga mengumumkan bahwa Mitsubishi Utama berhasil meraih predikat "Dealer of The Year 2025".</p><p>Penghargaan ini tidak lepas dari kepercayaan pelanggan setia kami dan dedikasi tim dalam memberikan layanan transparan.</p>`
  },
  {
    id: 4, slug: 'promo-bunga-nol-persen-xpander', type: 'PROMO', isFeatured: false,
    title: 'Program IIMS Diperpanjang: Bunga 0% Spesial Pembelian Xpander',
    date: '25 Februari 2026', author: 'Tim Sales', image: '/card.png',
    snippet: 'Ketinggalan promo pameran? Tenang, kami perpanjang promo Bunga 0% khusus untuk unit Xpander dan Xpander Cross bulan ini.',
    tags: ['PromoBunga', 'Xpander'],
    content: `<p>Jangan lewatkan kesempatan emas memiliki kendaraan keluarga terbaik.</p><h3>Syarat dan Ketentuan Promo Bunga 0%:</h3><ul><li>Hanya berlaku untuk tenor cicilan maksimal 1 tahun (12 bulan).</li><li>Wajib menggunakan asuransi All-Risk selama masa tenor.</li></ul>`
  }
];