import React, { useState, useEffect } from 'react';
// FIX: Menambahkan useLocation ke dalam import
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import Home from './pages/Home';
import PriceList from './pages/PriceList';
import ProductDetail from './pages/ProductDetail';
import VariantDetail from './pages/VariantDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Footer from './components/Footer';

// FIX: Memisahkan komponen tata letak agar bisa menggunakan useLocation (karena useLocation harus berada di dalam Router)
const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Mendeteksi halaman saat ini
  const location = useLocation();
  const isHome = location.pathname === '/'; // Bernilai true jika sedang di halaman utama

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* LOGIKA NAVBAR CERDAS (NATIVE SEAMLESS EFFECT):
        1. Jika di-scroll -> Navbar melayang dengan efek kaca (backdrop-blur)
        2. Jika di paling atas & di Home -> Navbar Transparan (menyatu dengan background mobil)
        3. Jika di paling atas & di halaman lain -> Navbar Hitam Solid (agar teks terbaca)
      */}
      <nav 
        className={`fixed w-full top-0 z-[100] transition-all duration-300 text-white px-6 md:px-12 xl:px-20 ${
          isScrolled 
            ? 'bg-brand-black/95 backdrop-blur-md shadow-lg py-3' 
            : isHome
              ? 'bg-transparent shadow-none py-6' 
              : 'bg-brand-black shadow-none py-6 border-b border-white/5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-3 z-50">
            <img src="/logo_dealer.png" alt="Mitsubishi Utama Logo" className="h-8 w-auto" onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/100x40/f8fafc/94a3b8?text=LOGO'; }} />
            <div className="font-dealer-name text-2xl tracking-wide flex items-baseline">
              <span className="text-brand-red font-bold uppercase">Mitsubishi</span>
              <span className="text-white font-medium uppercase ml-1">Utama</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-brand-red transition text-sm font-semibold">Home</Link>
            <Link to="/price-list" className="hover:text-brand-red transition text-sm font-semibold">Daftar Harga</Link>
            <Link to="/news" className="hover:text-brand-red transition text-sm font-semibold">Berita & Promo</Link>
            <Link to="/resources" className="hover:text-brand-red transition text-sm font-semibold">Bantuan & FAQ</Link>
          </div>

          <button 
            className="md:hidden text-white hover:text-brand-red transition z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Dropdown Mobile */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-brand-black border-t border-white/10 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
          <div className="flex flex-col space-y-4 p-6 shadow-xl">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-brand-red transition font-semibold border-b border-white/5 pb-2">Home</Link>
            <Link to="/price-list" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-brand-red transition font-semibold border-b border-white/5 pb-2">Daftar Harga</Link>
            <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-brand-red transition font-semibold border-b border-white/5 pb-2">Berita & Promo</Link>
            <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-brand-red transition font-semibold pb-2">Bantuan & FAQ</Link>
          </div>
        </div>
      </nav>

      {/* LOGIKA MAIN CERDAS:
        Jika di Home, hilangkan jarak atas (pt-0) agar background mobil nabrak ke ujung atas layar.
        Jika di halaman lain, berikan jarak (pt-20) agar konten putihnya tidak ketimpa Navbar.
      */}
      <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price-list" element={<PriceList />} />
          <Route path="/detail/:slug" element={<ProductDetail />} />
          <Route path="/detail/:slug/variant/:variantSlug" element={<VariantDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/resources" element={<div className="p-10 text-center text-gray-500 min-h-[50vh] flex items-center justify-center">Halaman Resources & FAQ (Dalam Pengembangan)</div>} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
};

// Komponen Utama App membungkus AppLayout dengan Router
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;