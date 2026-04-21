import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, ShieldCheck, MapPin, Phone, Clock, Calendar, Quote, Car } from 'lucide-react';
import {
  useHomeHeroSlides,
  useHomePopularCars,
  useHomeNews
} from '../hooks/useHomeData';

const CarCard = ({ car }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 group relative transform hover:-translate-y-1">
      <div className="h-56 bg-[#F6F7F9] p-6 relative flex items-center justify-center border-b border-gray-100 overflow-hidden">
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className="bg-white border border-gray-200 text-[9px] font-extrabold px-2.5 py-1 rounded text-gray-500 uppercase tracking-widest shadow-sm w-max">{car.category}</span>
          <span className="bg-brand-black text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-widest shadow-sm w-max">{car.type}</span>
        </div>
        <span className="absolute top-4 right-4 bg-gray-200/60 text-gray-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md z-10 tracking-widest">{car.year}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"><div className="w-40 h-40 bg-white rounded-full blur-2xl"></div></div>

        {imageError ? (
          <div className="w-full max-w-lg flex flex-col items-center justify-center text-gray-300 opacity-60 relative z-0">
            <Car className="w-24 h-24 mb-3 text-gray-200" strokeWidth={1} />
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Visual Belum Tersedia</span>
          </div>
        ) : (
          <img src={car.image} alt={car.name} className="w-full h-full object-contain relative z-0 group-hover:scale-105 transition-transform duration-700 ease-out" onError={() => setImageError(true)} />
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col bg-white">
        <h3 className="text-2xl font-extrabold text-brand-black mb-1 tracking-tight uppercase line-clamp-1" title={car.name}>{car.name}</h3>
        <p className="text-xs text-gray-500 mb-5 pb-5 border-b border-gray-100">Mulai Dari <span className="font-extrabold text-lg text-brand-red ml-1">{car.priceString}</span></p>

        <div className="space-y-2.5 mb-6 flex-grow">
          {car.quickSpecs && car.quickSpecs.slice(0, 3).map((spec, idx) => (
            <div key={idx} className="flex items-center text-xs text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2.5 flex-shrink-0" strokeWidth={2.5} />
              <span className="font-semibold text-gray-800 mr-1">{spec.label}:</span> <span className="truncate">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
          <Link to={`/detail/${car.slug}`} className="w-full text-center bg-white border-2 border-gray-200 text-brand-black py-2.5 rounded-xl text-sm font-extrabold hover:border-brand-black transition duration-300">Lihat Detail</Link>
          <button className="w-full bg-brand-black text-white py-2.5 rounded-xl text-sm font-extrabold hover:bg-brand-red transition duration-300 flex items-center justify-center group/btn">Brosur <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: heroSlides = [], isLoading: isLoadingHero } = useHomeHeroSlides();
  const { data: popularCars = [], isLoading: isLoadingCars } = useHomePopularCars();
  const { data: promos = [], isLoading: isLoadingPromos } = useHomeNews();

  const testimonials = [
    { id: 1, name: 'Bapak Sudirman', role: 'Pengusaha Logistik', text: 'Pelayanan sales sangat cepat dan transparan. Pengiriman unit truk Canter on-time sesuai janji, bisnis saya jadi lancar.', rating: 5 },
    { id: 2, name: 'Ibu Khalisa', role: 'Ibu Rumah Tangga', text: 'Proses kredit Xpander dibantu sampai tuntas, padahal sempat ada kendala data. Terima kasih Mitsubishi Utama!', rating: 5 },
    { id: 3, name: 'Dimas Ramadhan', role: 'Karyawan Swasta', text: 'Trade-in mobil lama dihargai sangat tinggi. Test drive Pajero Sport juga langsung diantar ke rumah. Top service!', rating: 5 }
  ];

  useEffect(() => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev >= heroSlides.length ? 0 : prev));

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const isLoading = isLoadingHero || isLoadingCars || isLoadingPromos;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      <section className="relative min-h-[750px] md:h-[650px] w-full overflow-hidden flex flex-col justify-between bg-slate-950 [background:radial-gradient(circle_at_75%_50%,_#475569_0%,_#0f172a_45%,_#020617_100%)]">
        <div className="relative flex-1 max-w-[1440px] mx-auto w-full flex items-center">
          {heroSlides.length > 0 ? (
            heroSlides.map((slide, index) => (
              <div key={slide.id || index} className={`absolute inset-0 px-6 md:px-12 xl:px-20 py-24 md:py-0 flex flex-col md:flex-row items-center transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left pb-10 md:pb-0">
                  <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-white/70 mb-4 shadow-sm"><span className="text-brand-red mr-1">●</span> {slide.tag}</span>
                  <h3 className="text-sm font-bold tracking-widest text-white/80 mb-2 uppercase">{slide.subhead}</h3>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tight leading-tight md:leading-none">{slide.title}</h1>
                  <p className="text-xl font-bold text-white mb-6">Mulai Harga <span className="text-brand-red">{slide.price}</span></p>
                  <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">{slide.desc}</p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link to={`/detail/${slide.slug}`} className="flex items-center bg-brand-red text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition shadow-lg text-sm uppercase tracking-wider">
                      Dapatkan Penawaran <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link to={`/detail/${slide.slug}`} className="bg-white/10 text-white px-6 py-3 rounded-md font-medium hover:bg-white/20 transition text-sm uppercase tracking-wider">Lihat Unit</Link>
                  </div>
                </div>

                <div className="w-full md:w-1/2 z-10 flex flex-1 items-center justify-center h-auto md:h-full relative mt-10 md:mt-0 pb-16 md:pb-0">
                  <img src={slide.image} alt={slide.title} className="w-2/3 sm:w-1/2 md:w-full h-auto object-contain scale-100 lg:scale-110 drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]" onError={(e) => { const fallbackUrl = 'https://placehold.co/600x400/1e293b/94a3b8?text=Gambar+Belum+Tersedia'; if (e.target.src !== fallbackUrl) e.target.src = fallbackUrl; }} />
                </div>
              </div>
            ))
          ) : (
             <div className="text-white z-10 mx-auto">Memuat Slider...</div>
          )}
        </div>

        <div className="relative z-20 max-w-[1440px] mx-auto w-full px-6 md:px-12 xl:px-20 pb-10 md:pb-6 flex space-x-8 border-b border-white/10 overflow-x-auto">
          {heroSlides.map((slide, index) => (
            <button key={slide.id || index} onClick={() => setCurrentSlide(index)} className={`pb-4 text-sm font-bold tracking-widest uppercase flex-shrink-0 transition-all duration-300 ${currentSlide === index ? 'text-white border-b-2 border-white' : 'text-white/60 hover:text-white'}`}>{slide.tabName}</button>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 xl:px-20 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-red font-bold tracking-widest text-sm uppercase">Keunggulan Kami</span>
            <h2 className="text-3xl font-extrabold text-brand-black mt-2">Mengapa Memilih <span className="text-brand-red">Mitsubishi Utama?</span></h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Sebagai dealer resmi terpercaya, kami memberikan garansi pelayanan bintang lima dari awal pembelian hingga perawatan berkala kendaraan Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center"><div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">Jaminan Harga & Promo Terbaik</h3><p className="text-sm text-gray-500">Punya penawaran dari dealer lain? Konsultasikan dengan kami. Kami siap memberikan penawaran harga OTR dan diskon yang lebih menguntungkan.</p></div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center"><div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">Proses Kredit Super Cepat</h3><p className="text-sm text-gray-500">Kami bekerja sama dengan leasing terkemuka. Cukup siapkan data di rumah, tim sales kami yang akan mengurus persetujuan Anda hingga tuntas.</p></div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center"><div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4"><Star className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">Layanan Trade-In Fleksibel</h3><p className="text-sm text-gray-500">Bawa pulang mobil Mitsubishi baru Anda dengan menukarkan mobil lama segala merk. Kami berikan harga taksiran tertinggi di pasaran.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 xl:px-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-brand-red font-bold tracking-widest text-sm uppercase">Katalog Pilihan</span>
              <h2 className="text-3xl font-extrabold text-brand-black mt-2">Unit Terpopuler Kami</h2>
              <p className="text-gray-500 mt-2">Temukan kendaraan penumpang dan niaga terbaik dari Mitsubishi.</p>
            </div>
            <Link to="/price-list" className="hidden md:inline-flex items-center font-bold text-brand-red hover:text-red-700 transition">
              Lihat Semua Model <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCars.length > 0 ? (
              popularCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400">Memuat data kendaraan...</div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 xl:px-20 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-brand-red font-bold tracking-widest text-sm uppercase">Info Terbaru</span>
              <h2 className="text-3xl font-extrabold text-brand-black mt-2">Berita & Promo Dealer</h2>
            </div>
            <Link to="/news" className="hidden md:inline-flex items-center font-bold text-brand-red hover:text-red-700 transition">
              Lihat Semua Info <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promos.map((promo) => (
              <Link to="/news" key={promo.id} className="group flex flex-col">
                <div className="h-56 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" onError={(e) => { const fallbackUrl = 'https://placehold.co/600x400/e2e8f0/64748b?text=Promo'; if (e.target.src !== fallbackUrl) e.target.src = fallbackUrl; }} />
                </div>
                <div className="flex items-center text-xs text-gray-500 font-bold mb-2">
                  <span className={`px-2 py-1 rounded mr-3 ${promo.type === 'PROMO' ? 'bg-red-50 text-brand-red' : 'bg-blue-50 text-blue-600'}`}>{promo.type}</span>
                  <Calendar className="w-3 h-3 mr-1" /> {promo.date}
                </div>
                <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-red transition leading-snug">{promo.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 xl:px-20 bg-brand-black text-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold tracking-widest text-sm uppercase">Testimoni</span>
            <h2 className="text-3xl font-extrabold mt-2">Apa Kata Pelanggan Kami?</h2>
            <p className="text-gray-400 mt-2">Kepuasan Anda adalah prioritas utama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi) => (
              <div key={testi.id} className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10" />
                <div className="flex text-amber-400 mb-4">
                  {[...Array(testi.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{testi.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-brand-red text-white font-bold rounded-full flex items-center justify-center mr-3">{testi.name.charAt(0)}</div>
                  <div><h4 className="font-bold text-white text-sm">{testi.name}</h4><span className="text-xs text-gray-400">{testi.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 xl:px-20 bg-white border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-brand-black mb-6">Kunjungi Showroom Kami</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">Datang dan rasakan langsung pengalaman berkendara terbaik bersama Mitsubishi. Tim sales profesional kami siap membantu Anda memilih kendaraan yang paling sesuai dengan kebutuhan Anda.</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center mr-4 flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-brand-black mb-1">Alamat Dealer</h4><p className="text-sm text-gray-600">Jl. MH. Thamrin No.88, RT.005/RW.001, Cikokol, Kec. Tangerang, Kota Tangerang, Banten 15117</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 text-brand-black rounded-full flex items-center justify-center mr-4 flex-shrink-0"><Clock className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-brand-black mb-1">Jam Operasional</h4><p className="text-sm text-gray-600">Senin - Jumat: 08.00 - 17.00 WIB</p><p className="text-sm text-gray-600">Sabtu: 08.00 - 14.00 WIB</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-50 text-brand-black rounded-full flex items-center justify-center mr-4 flex-shrink-0"><Phone className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-brand-black mb-1">Hubungi Kami</h4><p className="text-sm text-gray-600">+62 812-1234-5678 (WhatsApp & Telepon)</p></div>
                </div>
              </div>

              <div className="mt-10">
                <a href="https://wa.me/6281212345678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-brand-black text-white px-8 py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md">
                  Jadwalkan Test Drive <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3855174902556!2d106.62969799999999!3d-6.2127799999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f952c04aa851%3A0xac94f8c0b96bcb10!2sPT%20Srikandi%20Diamond%20Motors%20-%20Cikokol!5e0!3m2!1sen!2sid!4v1774669852773!5m2!1sen!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Peta Lokasi Mitsubishi Utama"></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;