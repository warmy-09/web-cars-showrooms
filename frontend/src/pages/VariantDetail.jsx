import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, ShieldCheck, Calculator, Star, Share2, Car } from 'lucide-react';

import { carsData } from '../data/mockData';

const VariantDetail = () => {
  const { slug, variantSlug } = useParams();

  const [car, setCar] = useState(null);
  const [variant, setVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [selectedColor, setSelectedColor] = useState('Quartz White Pearl');
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(5);
  const [asuransi, setAsuransi] = useState('Allrisk');

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setImageError(false);

    const carData = carsData[slug];
    if (carData) {
      const variantData = carData.variants.find(v => v.slug === variantSlug);
      if (variantData) {
        setCar(carData);
        setVariant(variantData);
      }
    }

    setTimeout(() => { setIsLoading(false); }, 500);
  }, [slug, variantSlug]);

  const bungaPerTahun = 0.048;
  const variantPrice = variant ? variant.price : 0;
  const dpNominal = variantPrice * (dpPercent / 100);
  const pokokHutang = variantPrice - dpNominal;
  const totalBunga = pokokHutang * bungaPerTahun * tenor;
  const totalHutang = pokokHutang + totalBunga;
  const angsuranPerBulan = totalHutang / (tenor * 12);
  const tdp = dpNominal + angsuranPerBulan;

  const formatRp = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);

  const handleShare = async () => {
    const shareData = {
      title: `${car?.name} ${variant?.name} - Mitsubishi Utama`,
      text: `Cek simulasi kredit dan spesifikasi untuk ${car?.name} varian ${variant?.name} di sini!`,
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
      navigator.clipboard.writeText(window.location.href);
      alert('Link Varian berhasil disalin! Silakan paste di WhatsApp atau Sosmed Anda.');
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-red"></div></div>;
  if (!car || !variant) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500"><h2 className="text-2xl font-bold mb-4 text-brand-black">Varian Kendaraan Tidak Ditemukan.</h2><Link to="/" className="text-brand-red hover:underline">Kembali ke Beranda</Link></div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-brand-black pb-20">

      <div className="bg-white px-6 md:px-12 xl:px-20 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto py-4">
          <Link to={`/detail/${car.slug}`} className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-red transition">
            <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke {car.name}
          </Link>
        </div>
      </div>

      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative flex items-center justify-center min-h-[400px]">
          <span className="absolute top-6 left-6 bg-gray-100 text-xs font-bold px-3 py-1.5 rounded-full text-gray-600 tracking-widest flex items-center z-10">
            <span className="w-2 h-2 rounded-full bg-brand-red mr-2"></span> 360° STUDIO
          </span>

          {imageError ? (
            <div className="w-full max-w-lg flex flex-col items-center justify-center text-gray-300">
              <Car className="w-32 h-32 mb-4 text-gray-200" strokeWidth={1} />
              <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Visual Varian Belum Tersedia</span>
            </div>
          ) : (
            <img
              src={car.image}
              alt={variant.name}
              className="w-full max-w-lg object-contain drop-shadow-2xl relative z-0"
              onError={() => setImageError(true)}
            />
          )}
        </div>

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div>
                <h4 className="font-extrabold text-lg mb-4">Pilihan Warna</h4>
                <div className="flex space-x-3">
                  {car.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name ? 'border-brand-black scale-110 shadow-md ring-2 ring-gray-200 ring-offset-2' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></button>
                  ))}
                </div>
                <p className="text-xs text-green-600 mt-3 flex items-center font-medium"><CheckCircle className="w-3 h-3 mr-1" /> Tampilan sesuai warna asli</p>
              </div>
              <div className="text-right">
                <span className="bg-gray-100 text-brand-black font-bold px-4 py-2 rounded-lg text-sm">{selectedColor}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {car.quickSpecs.map((qs, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <span className="text-xs text-gray-400 font-semibold mb-1">{qs.label}</span>
                  <span className="font-extrabold text-brand-black text-lg">{qs.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <div className="flex-1 overflow-y-auto pr-4 pb-4 max-h-[600px] lg:max-h-[650px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">

              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-extrabold text-brand-black leading-tight">
                    {car.name} <br/> <span className="text-brand-red">{variant.name}</span>
                  </h1>
                  <button onClick={handleShare} className="p-2 bg-gray-50 border border-gray-200 rounded-full text-gray-500 hover:text-brand-black transition" title="Share Varian Ini">
                    <Share2 className="w-5 h-5"/>
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                  </div>
                  <span className="font-bold">{car.rating}</span>
                  <span>• {car.reviewsCount} rating</span>
                </div>

                <div className="bg-red-50 text-brand-red text-xs font-bold px-2 py-1 rounded inline-block mb-2">PROMO DP RINGAN</div>
                <h2 className="text-5xl font-extrabold text-brand-black mb-2">{variant.priceStr}</h2>
                <p className="text-sm text-gray-400">Harga On The Road (OTR) Jakarta</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-extrabold text-brand-black mb-4 flex items-center">🚘 Eksterior</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {variant.highlightDetails.eksterior.map((hl, i) => (<div key={i} className="flex items-start text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" /> {hl}</div>))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-extrabold text-brand-black mb-4 flex items-center">🛋️ Interior</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {variant.highlightDetails.interior.map((hl, i) => (<div key={i} className="flex items-start text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" /> {hl}</div>))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold mb-6 border-b border-gray-200 pb-4">Spesifikasi Teknis</h3>
                <div className="mb-8">
                  <h4 className="font-bold text-gray-500 mb-4 bg-gray-100 px-3 py-1 rounded inline-block text-sm">Mesin & Performa</h4>
                  <div className="space-y-3">
                    {car.fullSpecs.mesin.map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500">{spec.label}</span><span className="font-bold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-500 mb-4 bg-gray-100 px-3 py-1 rounded inline-block text-sm">Dimensi</h4>
                  <div className="space-y-3">
                    {car.fullSpecs.dimensi.map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500">{spec.label}</span><span className="font-bold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 bg-white">
              <button
                onClick={() => document.getElementById('kalkulator-kredit-varian').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-md"
              >
                Dapatkan Penawaran Terbaik
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3">*Harga dapat berubah sewaktu-waktu. Hubungi kami untuk simulasi kredit yang akurat.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 xl:px-20 bg-white border-y border-gray-200 mt-10">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-brand-black mb-3">Komitmen <span className="text-brand-red">Mitsubishi Utama</span></h2>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto">Kami menjamin pengalaman pembelian mobil Mitsubishi terbaik di Jakarta dengan transparansi total dan benefit maksimal.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center"><div className="w-12 h-12 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">Jaminan Harga Terbaik</h3><p className="text-sm text-gray-500">Punya penawaran dari dealer lain? Kami berani memberikan penawaran yang lebih baik.</p></div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center"><div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">Transparansi Total</h3><p className="text-sm text-gray-500">Harga OTR final. Tidak ada biaya tersembunyi. Promo dan diskon dijelaskan di awal.</p></div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center"><div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4"><Star className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2">Ekstra Benefit Maksimal</h3><p className="text-sm text-gray-500">Approval Kredit Cepat, tenor panjang, DP fleksibel, dan layanan trade-in terbaik.</p></div>
          </div>
        </div>
      </section>

      <section id="kalkulator-kredit-varian" className="px-6 md:px-12 xl:px-20 py-20 max-w-[1440px] mx-auto scroll-mt-10">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10">
          <div className="flex items-center mb-8 border-b border-gray-100 pb-6">
            <div className="w-12 h-12 bg-gray-100 text-brand-black rounded-xl flex items-center justify-center mr-4"><Calculator className="w-6 h-6" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black">Smart Credit Simulator</h2>
              <p className="text-gray-500 text-sm">Hitung estimasi cicilan {car.name} {variant.name}.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4"><label className="font-bold text-gray-800">Down Payment (DP)</label><span className="text-2xl font-extrabold text-brand-black">{dpPercent}%</span></div>
                <input type="range" min="20" max="80" step="5" value={dpPercent} onChange={(e) => setDpPercent(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-black" />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium"><span>20% (Min)</span><span>80% (Max)</span></div>
              </div>

              <div>
                <label className="font-bold text-gray-800 block mb-4">Tenor (Jangka Waktu)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(t => (<button key={t} onClick={() => setTenor(t)} className={`py-2.5 rounded-lg text-sm font-bold transition ${tenor === t ? 'bg-brand-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t} Thn</button>))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-800 block mb-4">Tipe Asuransi</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setAsuransi('Allrisk')} className={`py-3 rounded-lg text-sm font-bold border-2 flex justify-between px-4 transition ${asuransi === 'Allrisk' ? 'border-brand-black text-brand-black' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>Allrisk <span className={`w-3 h-3 rounded-full mt-1 ${asuransi === 'Allrisk' ? 'bg-brand-black' : 'bg-gray-200'}`}></span></button>
                  <button onClick={() => setAsuransi('Kombinasi')} className={`py-3 rounded-lg text-sm font-bold border-2 flex justify-between px-4 transition ${asuransi === 'Kombinasi' ? 'border-brand-black text-brand-black' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>Kombinasi <span className={`w-3 h-3 rounded-full mt-1 ${asuransi === 'Kombinasi' ? 'bg-brand-black' : 'bg-gray-200'}`}></span></button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
              <div className="mb-6"><p className="text-sm text-gray-500 mb-1">Total DP Pertama (TDP)</p><h3 className="text-3xl font-extrabold text-brand-black">{formatRp(tdp)}</h3></div>
              <div className="mb-8"><p className="text-sm text-gray-500 mb-1">Angsuran per Bulan</p><h3 className="text-3xl font-extrabold text-brand-black">{formatRp(angsuranPerBulan)}</h3><p className="text-xs text-gray-400 mt-1">Selama {tenor * 12} bulan</p></div>

              <div className="space-y-2 mb-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-xs"><span className="text-gray-500">Harga OTR</span><span className="font-bold">{variant.priceStr}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">DP Murni ({dpPercent}%)</span><span className="font-bold">{formatRp(dpNominal)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">Pokok Hutang</span><span className="font-bold">{formatRp(pokokHutang)}</span></div>
              </div>

              <button className="w-full bg-brand-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">Kirim Hitungan Ini</button>
              <p className="text-[10px] text-gray-400 text-center mt-3 mt-4">*Estimasi ini tidak mengikat dan dapat berubah mengikuti kebijakan leasing terbaru.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default VariantDetail;