import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Share2, Link2, Tag } from 'lucide-react';

// lucide-react v1 removed brand icons; using inline SVGs instead
const FacebookIcon = () => (
  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.885v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638 5.903-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
import { newsPromoData, carsData } from '../data/mockData';

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const relatedProduct = (carsData && typeof carsData === 'object') ? Object.values(carsData)[0] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    if (newsPromoData && Array.isArray(newsPromoData)) {
      const foundArticle = newsPromoData.find(item => item.slug === slug);
      if (foundArticle) {
        setArticle(foundArticle);
      }
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link artikel berhasil disalin!');
  };

  const handleShareWA = () => {
    const text = encodeURIComponent(`Baca artikel menarik ini: ${article?.title} ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-red"></div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
        <h2 className="text-2xl font-bold mb-4 text-brand-black">Artikel Tidak Ditemukan.</h2>
        <Link to="/news" className="text-brand-red hover:underline font-bold">Kembali ke Newsroom</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-24">
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 flex justify-between items-center mb-8">
        <Link to="/news" className="inline-flex items-center text-xs font-bold tracking-widest text-gray-400 hover:text-brand-black uppercase transition">
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
        </Link>
        <span className="bg-gray-100 text-gray-500 text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider">
          {article.type || 'BERITA'}
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center text-xs text-gray-500 space-x-6">
            <span className="flex items-center"><User className="w-3.5 h-3.5 mr-2"/> {article.author || 'Admin'}</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2"/> {article.date}</span>
          </div>
        </div>

        <div className="w-full h-[300px] md:h-[500px] bg-gray-100 rounded-2xl overflow-hidden mb-16 shadow-sm border border-gray-100">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/1200x600/f8fafc/94a3b8?text=Visual+Berita'; }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="w-full lg:w-2/3">
            
            {article.snippet && (
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-10 pb-10 border-b border-gray-100">
                {article.snippet}
              </p>
            )}

            {/* FIX OXC PARSER ERROR: ClassName disatukan dalam satu baris penuh agar Vite tidak kebingungan mem-parsing baris baru */}
            <div 
              className="text-gray-700 leading-relaxed text-base md:text-lg font-medium [&>h3]:text-2xl [&>h3]:font-extrabold [&>h3]:text-brand-black [&>h3]:mt-12 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-3 [&>ul>li]:pl-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-3 [&>ol>li]:pl-2 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-200 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-gray-500"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {article.tags && article.tags.length > 0 && (
              <div className="mt-16 flex items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center">
                  <Tag className="w-4 h-4 mr-1" /> Tags:
                </span>
                {article.tags.map((tag, idx) => (
                  <Link to="/news" key={idx} className="text-brand-red hover:underline text-sm font-semibold">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-12">
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-extrabold text-sm uppercase tracking-widest text-brand-black">Bagikan Berita</h4>
                <Share2 className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                <button onClick={handleShareWA} className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-3 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm">
                  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp
                </button>
                <button className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm">
                  <FacebookIcon /> Facebook
                </button>
                <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm">
                  <TwitterXIcon /> X (Twitter)
                </button>
                <button className="w-full bg-[#0A66C2] hover:bg-[#095BB3] text-white py-3 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm">
                  <LinkedinIcon /> LinkedIn
                </button>
                <button onClick={handleCopyLink} className="w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center font-bold text-sm transition shadow-sm">
                  <Link2 className="w-4 h-4 mr-2" /> Salin Link
                </button>
              </div>
            </div>

            {relatedProduct && (
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-widest text-brand-black mb-4">Produk Terkait</h4>
                <Link to={`/detail/${relatedProduct.slug}`} className="block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group">
                  <div className="bg-gray-100 p-4 h-32 flex items-center justify-center relative">
                    <span className="absolute top-2 left-2 bg-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase">PROMO</span>
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h5 className="font-extrabold text-brand-black mb-1">{relatedProduct.name}</h5>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">{relatedProduct.tagline}</p>
                    <span className="text-xs font-bold text-brand-red flex items-center group-hover:underline">
                      Lihat Produk <ChevronLeft className="w-3 h-3 ml-1 rotate-180" />
                    </span>
                  </div>
                </Link>
              </div>
            )}
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsDetail;