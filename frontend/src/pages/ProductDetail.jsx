import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Download, CheckCircle, ShieldCheck, Settings, Calculator, Star, ChevronDown, Image as ImageIcon, Share2, Car } from 'lucide-react';
import PenawaranModal from '../components/PenawaranModal';

// FIX: Import carsData dari mockData
import { carsData } from '../data/mockData';

const ProductDetail = () => {
  const { slug } = useParams();
  
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [activeTab, setActiveTab] = useState('harga');
  const [openFaq, setOpenFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(5); 
  const [asuransi, setAsuransi] = useState('Allrisk');
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setImageError(false);
    
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // FIX: Panggil data dari carsData
        const data = carsData[slug]; 
        
        if (data) {
          setCar(data);
          setSelectedVariant(data.variants[0]);
        } else {
          setError("Produk Tidak Ditemukan. Periksa kembali URL Anda.");
        }
      } catch (err) {
        setError("Gagal memuat data dari server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const tdp = selectedVariant ? (selectedVariant.price * (dpPercent / 100)) + ((selectedVariant.price - (selectedVariant.price * (dpPercent / 100)) + ((selectedVariant.price - (selectedVariant.price * (dpPercent / 100))) * 0.048 * tenor)) / (tenor * 12)) : 0;
  const angsuranPerBulan = selectedVariant ? ((selectedVariant.price - (selectedVariant.price * (dpPercent / 100))) + ((selectedVariant.price - (selectedVariant.price * (dpPercent / 100))) * 0.048 * tenor)) / (tenor * 12) : 0;

  const formatRp = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);

  const handleScrollToCalculator = (variant) => {
    setSelectedVariant(variant); 
    const calculatorSection = document.getElementById('kalkulator-kredit');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

    const handleShare = async () => {
        const shareData = {
        title: `${car?.name} - Mitsubishi Utama`,
        text: `Lihat penawaran dan spesifikasi lengkap ${car?.name} di Mitsubishi Utama!`,
        url: window.location.href
        };

        if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('Berhasil membagikan link');
        } catch (err) {
            console.error('Batal membagikan:', err);
        }
        } else {
        // Fallback: Jika browser/OS tidak support, kembali ke copy link biasa
        navigator.clipboard.writeText(window.location.href);
        alert('Link halaman berhasil disalin! Silakan paste di WhatsApp atau Sosmed Anda.');
        }
    };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div></div>;
  }

  if (error || !car) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
      <h2 className="text-2xl font-bold mb-4 text-brand-black">{error}</h2>
      <Link to="/" className="text-brand-red hover:underline">Kembali ke Beranda</Link>
    </div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-brand-black pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200 pt-8 pb-16 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center text-xs text-gray-500 mb-8">
            <Link to="/" className="hover:text-brand-red">Home</Link> <ChevronRight className="w-3 h-3 mx-2" />
            <Link to="/price-list" className="hover:text-brand-red">Harga Mobil</Link> <ChevronRight className="w-3 h-3 mx-2" />
            <span className="font-semibold text-gray-800">{car.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center border border-gray-100 relative group min-h-[350px] lg:min-h-[450px]">
          <span className="absolute top-6 left-6 bg-white border border-gray-200 text-xs font-bold px-3 py-1 rounded-full text-gray-600 shadow-sm uppercase tracking-wider z-10">{car.category}</span>

          {/* LOGIKA MODERN FALLBACK */}
          {imageError ? (
            <div className="w-full max-w-lg flex flex-col items-center justify-center text-gray-400 opacity-60">
              <Car className="w-24 h-24 mb-4 text-gray-300" strokeWidth={1.5} />
              <span className="text-sm font-bold tracking-widest uppercase">Visual Belum Tersedia</span>
            </div>
          ) : (
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full max-w-lg object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 relative z-0" 
              onError={() => setImageError(true)} 
            />
          )}
        </div>

            <div>
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Model Year 2026</p>
              
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">{car.name}</h1>
                <button onClick={handleShare} className="p-2 bg-gray-50 border border-gray-200 rounded-full text-gray-500 hover:text-brand-black transition" title="Share Halaman Ini">
                  <Share2 className="w-5 h-5"/>
                </button>
              </div>

              <p className="text-gray-500 mb-8 leading-relaxed">{car.tagline}</p>
              
              <div className="mb-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Harga OTR Jakarta Mulai</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-4xl font-extrabold text-brand-black">{car.priceString}</h2>
                </div>
                <div className="inline-block mt-2 bg-red-50 border border-red-100 text-brand-red text-xs font-bold px-2 py-1 rounded">
                  🔥 Tersedia Promo DP Ringan
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setIsModalOpen(true)} className="bg-brand-black text-white px-8 py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md w-full sm:w-auto">
                  Minta Penawaran
                </button>
                <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-50 transition w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" /> Download Brosur
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KOMITMEN DEALER */}
      <section className="py-16 px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto border-y border-gray-100 mt-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-brand-black">Komitmen <span className="text-brand-red">Mitsubishi Utama</span></h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Kami menjamin pengalaman pembelian mobil terbaik di Jakarta dengan transparansi total dan benefit maksimal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-6 h-6" /></div>
            <h3 className="font-bold text-lg mb-2">Jaminan Harga Terbaik</h3>
            <p className="text-sm text-gray-500">Punya penawaran dari dealer lain? Kami berani memberikan penawaran yang lebih baik.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-6 h-6" /></div>
            <h3 className="font-bold text-lg mb-2">Transparansi Total</h3>
            <p className="text-sm text-gray-500">Harga OTR final. Tidak ada biaya tersembunyi. Promo dan diskon dijelaskan di awal.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4"><Star className="w-6 h-6" /></div>
            <h3 className="font-bold text-lg mb-2">Ekstra Benefit Maksimal</h3>
            <p className="text-sm text-gray-500">Approval Kredit Cepat, tenor panjang, DP fleksibel, dan layanan trade-in terbaik.</p>
          </div>
        </div>
      </section>

      {/* 3. TIGA TABS */}
      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto mb-20 mt-10">
        <div className="border-b border-gray-200 flex space-x-8 mb-8 overflow-x-auto">
          <button onClick={() => setActiveTab('harga')} className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'harga' ? 'text-brand-black border-b-2 border-brand-black' : 'text-gray-400 hover:text-gray-700'}`}>Harga & Varian</button>
          <button onClick={() => setActiveTab('spek')} className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'spek' ? 'text-brand-black border-b-2 border-brand-black' : 'text-gray-400 hover:text-gray-700'}`}>Spesifikasi Teknis</button>
          <button onClick={() => setActiveTab('garansi')} className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'garansi' ? 'text-brand-black border-b-2 border-brand-black' : 'text-gray-400 hover:text-gray-700'}`}>Garansi & Layanan</button>
        </div>

        {activeTab === 'harga' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {car.variants.map((v, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-black transition duration-300">
                <div>
                  <h3 className="font-bold text-xl mb-1">{v.name}</h3>
                  <p className="text-3xl font-extrabold text-brand-black mb-6">{v.priceStr}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Highlights:</p>
                  <ul className="space-y-2 mb-8">
                    {v.highlights.map((hl, j) => (<li key={j} className="flex items-start text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" /> {hl}</li>))}
                  </ul>
                </div>
                <div>
                  <Link to={`/detail/${car.slug}/variant/${v.slug}`} className="w-full block text-center bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-bold mb-3 hover:bg-gray-50 transition">Lihat Detail Lengkap</Link>
                  <button onClick={() => handleScrollToCalculator(v)} className="w-full bg-brand-black text-white py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition">Hitung Kredit {v.name}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'spek' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-extrabold mb-6 flex items-center"><Settings className="mr-3 text-brand-red" /> Data Spesifikasi Utama</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Tipe Mesin</span><span className="font-bold text-right">{car.specs.engine}</span></div>
              <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Kapasitas (CC)</span><span className="font-bold text-right">{car.specs.cc}</span></div>
              <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Tenaga Maksimum</span><span className="font-bold text-right">{car.specs.power}</span></div>
              <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Torsi Maksimum</span><span className="font-bold text-right">{car.specs.torque}</span></div>
              <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Transmisi</span><span className="font-bold text-right">{car.specs.transmission}</span></div>
              <div className="flex justify-between py-3 border-b border-gray-100"><span className="text-gray-500">Dimensi PxLxT</span><span className="font-bold text-right">{car.specs.dimension}</span></div>
            </div>
            <button className="mt-8 flex items-center text-brand-red font-bold hover:underline"><Download className="w-4 h-4 mr-2" /> Download Full Spesifikasi (PDF)</button>
          </div>
        )}

        {activeTab === 'garansi' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
             <h3 className="text-2xl font-extrabold mb-6 flex items-center"><ShieldCheck className="mr-3 text-brand-red" /> Layanan Purna Jual & Garansi</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-3">Garansi Kendaraan</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> Garansi Mesin 3 Tahun atau 100.000 KM.</li>
                    <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> Garansi Aki/Battery 1 Tahun atau 20.000 KM.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">SMART Package (Servis)</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" /> Gratis Biaya Jasa Servis Rutin hingga 50.000 KM.</li>
                    <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" /> Gratis Suku Cadang hingga 50.000 KM.</li>
                    <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-brand-red mr-3 flex-shrink-0" /> Layanan Darurat 24 Jam.</li>
                  </ul>
                </div>
             </div>
          </div>
        )}
      </section>

      {/* 4. SMART CREDIT SIMULATOR */}
      <section id="kalkulator-kredit" className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto mb-20 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10">
          <div className="flex items-center mb-8 border-b border-gray-100 pb-6">
            <div className="w-12 h-12 bg-gray-100 text-brand-black rounded-xl flex items-center justify-center mr-4"><Calculator className="w-6 h-6" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black">Smart Credit Simulator</h2>
              <p className="text-gray-500 text-sm">Hitung estimasi cicilan <span className="font-bold text-brand-black">{selectedVariant?.name}</span> secara instan.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-bold text-gray-800">Down Payment (DP)</label>
                  <span className="text-2xl font-extrabold text-brand-black">{dpPercent}%</span>
                </div>
                <input type="range" min="20" max="80" step="5" value={dpPercent} onChange={(e) => setDpPercent(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-black" />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium"><span>20% (Min)</span><span>80% (Max)</span></div>
              </div>

              <div>
                <label className="font-bold text-gray-800 block mb-4">Tenor (Jangka Waktu)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(t => (
                    <button key={t} onClick={() => setTenor(t)} className={`py-2.5 rounded-lg text-sm font-bold transition ${tenor === t ? 'bg-brand-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t} Thn</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-800 block mb-4">Tipe Asuransi</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAsuransi('Allrisk')} className={`py-3 rounded-lg text-sm font-bold border-2 flex justify-between px-4 transition ${asuransi === 'Allrisk' ? 'border-brand-black text-brand-black' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    Allrisk <span className={`w-3 h-3 rounded-full mt-1 ${asuransi === 'Allrisk' ? 'bg-brand-black' : 'bg-gray-200'}`}></span>
                  </button>
                  <button onClick={() => setAsuransi('Kombinasi')} className={`py-3 rounded-lg text-sm font-bold border-2 flex justify-between px-4 transition ${asuransi === 'Kombinasi' ? 'border-brand-black text-brand-black' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    Kombinasi <span className={`w-3 h-3 rounded-full mt-1 ${asuransi === 'Kombinasi' ? 'bg-brand-black' : 'bg-gray-200'}`}></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Total DP Pertama (TDP)</p>
                <h3 className="text-3xl font-extrabold text-brand-black">{formatRp(tdp)}</h3>
              </div>
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">Angsuran per Bulan</p>
                <h3 className="text-3xl font-extrabold text-brand-black">{formatRp(angsuranPerBulan)}</h3>
                <p className="text-xs text-gray-400 mt-1">Selama {tenor * 12} bulan</p>
              </div>

              <div className="space-y-2 mb-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-xs"><span className="text-gray-500">Harga OTR</span><span className="font-bold">{selectedVariant ? formatRp(selectedVariant.price) : '0'}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">DP Murni ({dpPercent}%)</span><span className="font-bold">{formatRp(selectedVariant ? selectedVariant.price * (dpPercent / 100) : 0)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">Pokok Hutang</span><span className="font-bold">{formatRp(selectedVariant ? selectedVariant.price - (selectedVariant.price * (dpPercent / 100)) : 0)}</span></div>
              </div>

              <button className="w-full bg-brand-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
                Kirim Hitungan Ini
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3 mt-4">*Estimasi ini tidak mengikat dan dapat berubah mengikuti kebijakan leasing terbaru.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALERI FOTO */}
      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto mb-20">
        <h2 className="text-3xl font-extrabold text-brand-black text-center mb-2 flex items-center justify-center"><ImageIcon className="mr-3 w-8 h-8 text-gray-400" /> Galeri {car.name}</h2>
        <p className="text-center text-gray-500 mb-8">Lihat {car.name} dari berbagai sudut eksterior dan interior.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {car.gallery.map((img, idx) => (
            <div key={idx} className={`rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 relative group cursor-pointer ${idx === 0 ? 'col-span-2 row-span-2 md:h-96' : 'h-48'}`}>
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/600x400/f8fafc/94a3b8?text=Foto'; }} />
              {idx === car.gallery.length - 1 && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-bold">+12</span>
                  <span className="text-sm font-medium">Lihat Semua</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. PROMO & ULASAN */}
      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto mb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col justify-center">
          <h3 className="text-xl font-extrabold text-brand-black mb-3">Promo {car.name} Bulan Ini</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-sm text-gray-700">🏷️ DP Ringan mulai 15%</li>
            <li className="flex items-center text-sm text-gray-700">📉 Bunga Rendah / Tenor Panjang</li>
            <li className="flex items-center text-sm text-gray-700">⚡ Instant Approval & Proses Mudah</li>
          </ul>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 shadow-md w-full">Chat Sales Sekarang</button>
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8">
          <h3 className="text-2xl font-extrabold text-brand-black mb-6 flex items-center">💬 Ulasan Pelanggan</h3>
          <div className="flex items-center space-x-6 mb-8 border-b border-gray-100 pb-8">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-brand-black mb-1">{car.rating}</div>
              <div className="flex text-amber-400 justify-center mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-gray-400">dari {car.reviewsCount} ulasan</p>
            </div>
            <div className="flex-1 space-y-1">
               <div className="flex items-center text-xs text-gray-500"><span className="w-3">5</span> <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2"><div className="w-full h-full bg-amber-400 rounded-full"></div></div> <span>{car.reviewsCount}</span></div>
               <div className="flex items-center text-xs text-gray-500"><span className="w-3">4</span> <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2"></div> <span>0</span></div>
               <div className="flex items-center text-xs text-gray-500"><span className="w-3">3</span> <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2"></div> <span>0</span></div>
            </div>
          </div>
          <div className="space-y-6">
            {car.reviews.length > 0 ? car.reviews.map((rev, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-brand-black text-white rounded-full flex items-center justify-center font-bold text-xs mr-3">{rev.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-sm text-brand-black">{rev.name}</p>
                    <div className="flex text-amber-400"><span className="text-xs text-gray-400 mr-2">{rev.date}</span>{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rev.text}</p>
              </div>
            )) : (
              <p className="text-sm text-gray-500">Belum ada ulasan untuk kendaraan ini.</p>
            )}
          </div>
        </div>
      </section>

      {/* 7. FAQ SPESIFIK PRODUK */}
      <section className="px-6 md:px-12 xl:px-20 max-w-[1024px] mx-auto mb-20">
        <h2 className="text-2xl font-extrabold text-brand-black mb-8 text-center">Pertanyaan Umum tentang {car.name}</h2>
        <div className="space-y-3">
          {car.faqs.length > 0 ? car.faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center p-5 font-bold text-left text-brand-black hover:bg-gray-50 transition">
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (<div className="p-5 pt-0 text-sm text-gray-600 border-t border-gray-100 bg-gray-50/50">{faq.a}</div>)}
            </div>
          )) : (
            <p className="text-sm text-gray-500 text-center">Belum ada FAQ untuk kendaraan ini.</p>
          )}
        </div>
      </section>

      <PenawaranModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedModel={car.name}
        selectedVarian="Belum Menentukan (Konsultasi via WA)"
      />

    </div>
  );
};

export default ProductDetail;