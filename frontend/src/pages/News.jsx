import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Import data dari mockData
import { newsPromoData } from '../data/mockData';

const News = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter Data berdasarkan Tab yang diklik
  const filteredData = newsPromoData.filter(item => {
    if (activeFilter === 'Semua') return true;
    return item.type === activeFilter;
  });

  // Pisahkan Artikel Utama (Featured) dari yang lain (hanya jika di tab 'Semua')
  const featuredArticle = activeFilter === 'Semua' ? filteredData.find(item => item.isFeatured) : null;
  
  // Sisa artikel yang bukan featured (atau semua jika sedang difilter)
  const gridArticles = activeFilter === 'Semua' 
    ? filteredData.filter(item => !item.isFeatured) 
    : filteredData;

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* 1. HEADER & FILTER SECTION */}
      <section className="pt-12 pb-10 px-6 md:px-12 xl:px-20 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="text-brand-red font-bold tracking-widest text-[10px] md:text-xs uppercase">Mitsubishi Newsroom</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-black mt-2 mb-4">Berita & Update</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Dapatkan informasi terkini mengenai peluncuran produk, promo dealer eksklusif, dan tips perawatan kendaraan Anda.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center space-x-3 mt-8">
            {['Semua', 'BERITA', 'PROMO'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition duration-300 ${
                  activeFilter === filter 
                    ? 'bg-brand-black text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {filter === 'Semua' ? 'Semua Kategori' : filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <section className="py-12 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1440px] mx-auto">
          
          {/* FEATURED ARTICLE (Hanya Muncul di Tab 'Semua') */}
          {featuredArticle && (
            <Link to={`/news/${featuredArticle.slug}`} className="block relative rounded-[2rem] overflow-hidden h-[450px] md:h-[500px] mb-12 group cursor-pointer shadow-sm border border-gray-100">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/1200x600/e2e8f0/64748b?text=Visual+Berita'; }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
                    {featuredArticle.type}
                  </span>
                  <span className="flex items-center text-white/80 text-xs font-medium">
                    <Calendar className="w-3 h-3 mr-1.5" /> {featuredArticle.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight group-hover:text-gray-200 transition">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-2 md:line-clamp-none pr-4">
                  {featuredArticle.snippet}
                </p>
                <div className="inline-flex items-center text-sm font-bold text-white group-hover:text-brand-red transition">
                  Baca Selengkapnya <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )}

          {/* GRID ARTICLES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group">
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg z-10 shadow-sm ${item.type === 'PROMO' ? 'bg-red-50 text-brand-red border border-red-100' : 'bg-white text-brand-black border border-gray-200'}`}>
                    {item.type}
                  </span>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/600x400/f8fafc/94a3b8?text=Visual'; }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-400 gap-4 mb-3">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5"/>{item.date}</span>
                    <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1.5"/>{item.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-brand-black mb-3 leading-snug group-hover:text-brand-red transition duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed">
                    {item.snippet}
                  </p>
                  
                  {/* Bottom Bar: Tags & Read More */}
                  <div className="mt-auto flex justify-between items-center pt-5 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-400">#{item.tags[0]}</span>
                    <Link to={`/news/${item.slug}`} className="text-sm font-extrabold text-brand-black group-hover:text-brand-red flex items-center transition">
                      Baca Selengkapnya <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {gridArticles.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Belum ada informasi untuk kategori ini.
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default News;