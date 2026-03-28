import React, { useState } from 'react';
import { Filter, ChevronRight, Download } from 'lucide-react';
import PenawaranModal from '../components/PenawaranModal';
import { Link } from 'react-router-dom';

const PriceList = () => {
  const categories = [
    'All', 'Passenger Cars', 'Light Commercial Vehicles', 'Commercial Vehicles', 'Electric Vehicle'
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState({ model: '', varian: '' });

  const carsData = [
    {
      id: 1,
      category: 'Passenger Cars',
      name: 'Destinator',
      tagline: 'SUV Premium 7 Penumpang yang siap mengantar Anda ke setiap tujuan.',
      image: '/destinator_card.png',
      variants: [{ name: 'Destinator 2.4L AT', transmission: 'Automatic', promoPrice: 'Rp 422.000.000' }]
    },
    {
      id: 2,
      category: 'Passenger Cars',
      name: 'New Destinator',
      tagline: 'Generasi terbaru dengan fitur keselamatan dan kenyamanan ekstra.',
      image: '/destinator_card.png',
      variants: [{ name: 'New Destinator Ultimate AT', transmission: 'Automatic', originalPrice: 'Rp 470.000.000', promoPrice: 'Rp 455.000.000' }]
    },
    {
      id: 3,
      category: 'Passenger Cars',
      name: 'New XFORCE',
      tagline: 'Compact SUV dengan desain futuristik dan mode berkendara canggih.',
      image: '/xforce_card.png',
      variants: [
        { name: 'Exceed CVT', transmission: 'Automatic', promoPrice: 'Rp 382.500.000' },
        { name: 'Ultimate CVT', transmission: 'Automatic', promoPrice: 'Rp 419.100.000' }
      ]
    },
    {
      id: 4,
      category: 'Passenger Cars',
      name: 'New Pajero Sport',
      tagline: 'Legendary SUV Flagship. Lebih gagah, lebih mewah, dan lebih bertenaga.',
      image: '/pajero_card.jpg',
      variants: [
        { name: 'Exceed MT 4x2', transmission: 'Manual', promoPrice: 'Rp 567.100.000' },
        { name: 'Dakar AT 4x2', transmission: 'Automatic', originalPrice: 'Rp 640.700.000', promoPrice: 'Rp 625.700.000' },
        { name: 'Dakar Ultimate AT 4x4', transmission: 'Automatic', promoPrice: 'Rp 750.600.000' }
      ]
    },
    {
      id: 5,
      category: 'Passenger Cars',
      name: 'New Xpander',
      tagline: 'MPV Keluarga terfavorit dengan kenyamanan kabin terbaik di kelasnya.',
      image: '/xpander_card.jpg',
      variants: [
        { name: 'GLS MT', transmission: 'Manual', promoPrice: 'Rp 263.200.000' },
        { name: 'Ultimate CVT', transmission: 'Automatic', promoPrice: 'Rp 324.500.000' }
      ]
    },
    {
      id: 6,
      category: 'Passenger Cars',
      name: 'New Xpander Cross',
      tagline: 'Perpaduan kenyamanan MPV dan ketangguhan SUV untuk petualangan Anda.',
      image: '/xpander_cross_card.png',
      variants: [
        { name: 'MT', transmission: 'Manual', promoPrice: 'Rp 321.750.000' },
        { name: 'Premium CVT', transmission: 'Automatic', originalPrice: 'Rp 352.600.000', promoPrice: 'Rp 342.600.000' }
      ]
    },
    {
      id: 7,
      category: 'Passenger Cars',
      name: 'XFORCE',
      tagline: 'Infinite excitement. SUV dinamis untuk menaklukkan jalanan urban.',
      image: '/xforce_card.png',
      variants: [{ name: 'Ultimate CVT', transmission: 'Automatic', promoPrice: 'Rp 412.000.000' }]
    },
    {
      id: 8,
      category: 'Light Commercial Vehicles',
      name: 'L300',
      tagline: 'Jagoan bisnis andalan Indonesia. Mesin baru Euro 4 lebih bertenaga & irit.',
      image: '/card.png',
      variants: [
        { name: 'Pick Up Flat Deck', transmission: 'Manual', promoPrice: 'Rp 232.000.000' },
        { name: 'Cab Chasiss', transmission: 'Manual', promoPrice: 'Rp 227.000.000' }
      ]
    },
    {
      id: 9,
      category: 'Light Commercial Vehicles',
      name: 'All New Triton',
      tagline: 'Pick-up double cabin tangguh untuk medan berat dan operasional tambang.',
      image: '/card.png',
      variants: [
        { name: 'HDX MT Double Cab 4WD', transmission: 'Manual', promoPrice: 'Rp 415.000.000' },
        { name: 'Ultimate AT Double Cab 4WD', transmission: 'Automatic', promoPrice: 'Rp 525.000.000' }
      ]
    },
    {
      id: 10,
      category: 'Commercial Vehicles',
      name: 'Canter',
      tagline: 'Truk ringan nomor 1 di Indonesia, andalan di segala sektor usaha.',
      image: '/canter_card.jpg',
      variants: [
        { name: 'FE 71 (4 Ban)', transmission: 'Manual', promoPrice: 'Rp 400.000.000' },
        { name: 'FE 74 HD (6 Ban)', transmission: 'Manual', promoPrice: 'Rp 450.000.000' },
        { name: 'FE SHDX (6 Ban)', transmission: 'Manual', promoPrice: 'Rp 475.000.000' }
      ]
    },
    {
      id: 11,
      category: 'Commercial Vehicles',
      name: 'Fuso',
      tagline: 'Truk medium heavy-duty untuk kapasitas muatan maksimal dan logistik jarak jauh.',
      image: '/card.png',
      variants: [
        { name: 'Fighter X FM 65', transmission: 'Manual', promoPrice: 'Rp 950.000.000' },
        { name: 'Fighter X FN 62', transmission: 'Manual', promoPrice: 'Rp 1.150.000.000' }
      ]
    },
    {
      id: 12,
      category: 'Commercial Vehicles',
      name: 'Tractor Head',
      tagline: 'Solusi penarik kontainer berat dengan durabilitas mesin yang teruji.',
      image: '/card.png',
      variants: [{ name: 'Fighter X FN 62 F HD', transmission: 'Manual', promoPrice: 'Rp 1.250.000.000' }]
    },
    {
      id: 13,
      category: 'Electric Vehicle',
      name: 'L100 EV',
      tagline: 'Kendaraan niaga 100% elektrik pertama dari Mitsubishi untuk bisnis ramah lingkungan.',
      image: '/card.png',
      variants: [{ name: 'L100 EV Blind Van', transmission: 'Automatic', promoPrice: 'Rp 320.000.000' }]
    }
  ];

  const filteredCars = activeCategory === 'All' ? carsData : carsData.filter(car => car.category === activeCategory);

  const handleOpenModal = (carName, variantName) => {
    setSelectedCar({ model: carName, varian: variantName });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 md:px-12 xl:px-20 relative">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brand-black mb-4 tracking-tight">Daftar Harga OTR Mitsubishi Utama</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Informasi harga On The Road (OTR) terbaru Jakarta. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm ${activeCategory === category ? 'bg-brand-black text-white scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-100'}`}
            >
              {category === 'All' && <Filter className="w-4 h-4 mr-2" />} {category}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-100 bg-white">
                <div className="w-full md:w-1/3 flex justify-center bg-gray-50 rounded-xl p-4">
                    <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-auto object-contain max-h-48 drop-shadow-lg"
                    onError={(e) => {
                        const fallbackUrl = 'https://placehold.co/400x300/f8fafc/94a3b8?text=Gambar+Belum+Tersedia';

                        if (e.target.src !== fallbackUrl) {
                        e.target.src = fallbackUrl;
                        }
                    }}
                    />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-brand-red bg-red-50 px-3 py-1 rounded text-center border border-red-100 tracking-widest uppercase">{car.category}</span>

                      <Link to={`/detail/${car.id}`} className="hidden md:flex items-center text-sm font-semibold text-brand-black hover:text-brand-red transition">
                        Detail Spesifikasi <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                    <h2 className="text-3xl font-extrabold text-brand-black mb-3">{car.name}</h2>
                    <p className="text-gray-500 text-sm mb-6 max-w-lg leading-relaxed">{car.tagline}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/detail/${car.id}`} className="flex items-center text-sm font-bold uppercase tracking-wider text-white bg-brand-red px-5 py-2.5 rounded hover:bg-red-700 transition shadow-sm">
                      Lihat Detail
                    </Link>
                    <button className="flex items-center text-sm font-bold uppercase tracking-wider text-gray-700 bg-white border border-gray-300 px-5 py-2.5 rounded hover:bg-gray-50 transition shadow-sm">
                      <Download className="w-4 h-4 mr-2" /> E-Brosur
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider pb-4 border-b border-gray-100">
                  <div className="col-span-5">Varian</div><div className="col-span-2">Transmisi</div><div className="col-span-3">Harga OTR</div><div className="col-span-2 text-right">Action</div>
                </div>
                <div className="flex flex-col">
                  {car.variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-b border-gray-100 last:border-0 items-center">
                      <div className="col-span-1 md:col-span-5"><p className="font-bold text-brand-black text-lg md:text-base">{variant.name}</p></div>
                      <div className="col-span-1 md:col-span-2 text-gray-600 text-sm font-medium">{variant.transmission}</div>
                      <div className="col-span-1 md:col-span-3">
                        {variant.originalPrice && <p className="text-xs text-gray-400 line-through mb-0.5">{variant.originalPrice}</p>}
                        <p className="font-extrabold text-brand-black text-lg">{variant.promoPrice}</p>
                      </div>
                      <div className="col-span-1 md:col-span-2 mt-3 md:mt-0 flex md:justify-end">
                        <button
                          onClick={() => handleOpenModal(car.name, variant.name)}
                          className="w-full md:w-auto bg-brand-black text-white border border-brand-black px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-sm"
                        >
                          Penawaran
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PenawaranModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedModel={selectedCar.model}
        selectedVarian={selectedCar.varian}
      />

    </div>
  );
};

export default PriceList;