// frontend/src/pages/PriceList.jsx
import React, { useState, useEffect } from 'react';
import { Filter, ChevronRight, Download } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import PenawaranModal from '../components/PenawaranModal';
import { Link } from 'react-router-dom';
import { carsData as mockCarsData } from '../data/mockData';
import { apiUrl } from '../config/api';

const formatToIdr = (value) => {
  if (value === null || value === undefined || value === '') return null;

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return null;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(numericValue);
};

const normalizeCarsData = (cars = []) => {
  return cars.map(car => {
    let carSpecs = car.specs || {};
    if (typeof carSpecs === 'string') {
      try { carSpecs = JSON.parse(carSpecs); } catch { carSpecs = {}; }
    }

    const mappedVariants = (car.variants || []).map(variant => ({
      ...variant,
      transmission: variant.transmission || carSpecs.transmission || '-',
      promoPrice:
        variant.price_string ||
        formatToIdr(variant.price) ||
        'Hubungi Sales',
      originalPrice: null
    }));

    return {
      ...car,
      image: car.image_url || car.image,
      priceString: car.price_string || car.priceString,
      variants: mappedVariants
    };
  });
};

const fallbackToMockData = () => {
  const localCars = Object.values(mockCarsData || {});
  return {
    cars: normalizeCarsData(localCars),
    message: 'Tidak bisa mengambil data dari server, menampilkan data cadangan lokal.'
  };
};

const fetchCars = async () => {
  try {
    const response = await fetch(apiUrl('/cars'));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();

    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      return {
        cars: normalizeCarsData(result.data),
        message: ''
      };
    }

    return fallbackToMockData();
  } catch (error) {
    console.error('Error fetching data:', error);
    return fallbackToMockData();
  }
};

const PriceList = () => {
  const categories = [
    'All', 'Passenger Cars', 'Light Commercial', 'Commercial Vehicles', 'Electric Vehicle'
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState({ model: '', varian: '' });

  const { data, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars
  });

  const carsData = data?.cars || [];
  const fetchError = data?.message || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-red"></div>
      </div>
    );
  }

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
          {fetchError && (
            <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
              {fetchError}
            </p>
          )}
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
          {filteredCars.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
              Data mobil belum tersedia.
            </div>
          )}
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

                      <Link to={`/detail/${car.slug}`} className="hidden md:flex items-center text-sm font-semibold text-brand-black hover:text-brand-red transition">
                        Detail Spesifikasi <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                    <h2 className="text-3xl font-extrabold text-brand-black mb-3">{car.name}</h2>
                    <p className="text-gray-500 text-sm mb-6 max-w-lg leading-relaxed">{car.tagline}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/detail/${car.slug}`} className="flex items-center text-sm font-bold uppercase tracking-wider text-white bg-brand-red px-5 py-2.5 rounded hover:bg-red-700 transition shadow-sm">
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
                  {(car.variants || []).map((variant, index) => (
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