import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Car, Settings, CreditCard, Shield, FileText,
  Phone, MessageCircle, Mail, ChevronRight, BookOpen, Wrench, HelpCircle
} from 'lucide-react';

import { carsData, newsPromoData, faqTopicsData, importantGuidesData } from '../data/mockData';

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const carsList = carsData ? Object.values(carsData) : [];

  const recentArticles = newsPromoData
    ? newsPromoData.filter(item => item.type === 'BERITA').slice(0, 3)
    : [];

  const renderIcon = (iconName) => {
    const IconMap = {
      CreditCard: CreditCard,
      FileText: FileText,
      Wrench: Wrench,
      Shield: Shield,
      Settings: Settings,
      HelpCircle: HelpCircle,
      Car: Car,
      BookOpen: BookOpen
    };

    const TargetIcon = IconMap[iconName] || HelpCircle;
    return <TargetIcon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors" />;
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-20">

      <section className="bg-brand-black pt-28 pb-32 px-6 md:px-12 xl:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Halo, ada yang bisa kami bantu?
          </h1>
          <p className="text-gray-300 text-lg mb-10">
            Temukan panduan, FAQ, dan informasi penting seputar layanan dealer Mitsubishi Utama.
          </p>

          <div className="relative max-w-2xl mx-auto shadow-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Cari topik, pertanyaan, atau fitur mobil..."
              className="w-full pl-14 pr-32 py-5 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-brand-red/30 text-lg shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold transition-colors">
              Cari
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 -mt-16 relative z-20 mb-20">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-xl font-extrabold text-white md:text-brand-white mb-6 drop-shadow-md md:drop-shadow-none px-2">
            Pilih Mobil Anda
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-6 hide-scrollbar">
            {carsList.map((car) => (
              <Link key={car.id} to={`/resources/${car.slug}`} className="bg-white rounded-2xl p-4 min-w-[160px] md:min-w-[200px] border border-gray-100 shadow-lg hover:border-brand-black hover:shadow-xl transition-all group flex flex-col items-center flex-shrink-0">
                <div className="h-20 flex items-center justify-center mb-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/150x100/f8fafc/94a3b8?text=Mobil'; }}
                  />
                </div>
                <h3 className="font-bold text-sm text-brand-black text-center">{car.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto mb-20">
        <h2 className="text-3xl font-extrabold text-brand-black mb-10 text-center">Jelajahi Berdasarkan Topik</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqTopicsData.map((topic) => (
            <Link key={topic.id} to="#" className="bg-gray-50 border border-gray-100 p-6 rounded-3xl hover:bg-white hover:border-brand-black hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-200 mb-5 group-hover:bg-brand-black transition-colors shadow-sm">
                {renderIcon(topic.iconName)}
              </div>
              <h3 className="font-extrabold text-lg text-brand-black mb-2">{topic.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-brand-black mb-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-brand-red" /> Panduan Penting Dealer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantGuidesData.map((guide) => (
                <Link key={guide.id} to="#" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all group flex flex-col">
                  <div className="h-40 bg-gray-100 overflow-hidden relative">
                    <span className="absolute top-3 left-3 bg-white text-[10px] font-extrabold px-3 py-1 rounded shadow-sm uppercase text-gray-600 z-10">
                      {guide.category}
                    </span>
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/400x200/f8fafc/94a3b8?text=Panduan'; }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="font-extrabold text-brand-black leading-snug mb-4 group-hover:text-brand-red transition-colors">
                      {guide.title}
                    </h3>
                    <div className="text-xs font-bold text-gray-400 flex items-center uppercase tracking-wider">
                      Baca Panduan <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-extrabold text-brand-black mb-8">Artikel Terbaru</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col space-y-6">
                {recentArticles.length > 0 ? recentArticles.map((article) => (
                  <Link key={article.id} to={`/news/${article.slug}`} className="group border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <p className="text-xs text-gray-400 font-medium mb-1.5">{article.date}</p>
                    <h4 className="font-bold text-gray-800 text-sm leading-relaxed group-hover:text-brand-red transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                )) : (
                  <p className="text-sm text-gray-500">Belum ada artikel terbaru.</p>
                )}
              </div>
              <Link to="/news" className="block text-center mt-6 pt-5 border-t border-gray-100 text-sm font-bold text-brand-black hover:text-brand-red transition-colors">
                Lihat Semua Artikel
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-[2.5rem] p-10 md:p-16 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-50 -translate-y-1/2 translate-x-1/4 blur-3xl"></div>

          <h2 className="text-3xl font-extrabold text-brand-black mb-4 relative z-10">Masih Butuh Bantuan?</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto relative z-10">
            Tim dukungan pelanggan kami siap membantu Anda menjawab pertanyaan lebih detail seputar kendaraan dan layanan kami.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10">
            <a href="https://wa.me/6281212345678" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-md group">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" /> Hubungi WhatsApp
            </a>
            <a href="tel:+6281212345678" className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-brand-black px-8 py-4 rounded-xl font-bold transition-colors shadow-sm">
              <Phone className="w-5 h-5 mr-2 text-gray-500" /> Telepon Kami
            </a>
            <a href="mailto:cs@mitsubishiutama.com" className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-brand-black px-8 py-4 rounded-xl font-bold transition-colors shadow-sm">
              <Mail className="w-5 h-5 mr-2 text-gray-500" /> Kirim Email
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Resources;