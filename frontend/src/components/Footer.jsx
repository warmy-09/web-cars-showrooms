import React from 'react';
import { MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-gray-400 py-16 px-6 md:px-12 xl:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          
          <div className="lg:col-span-1">
            <div className="font-dealer-name text-2xl tracking-wide flex items-baseline mb-4">
              <span className="text-brand-red font-bold uppercase">Mitsubishi</span>
              <span className="text-white font-medium uppercase ml-1">Utama</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">Dealer resmi Mitsubishi Motors melayani penjualan kendaraan penumpang dan niaga dengan layanan prima.</p>
            
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0" />
                <span>Jl. Raya Jakarta No. 123, Jakarta Selatan, 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-red" />
                <span>info@mitsubishiutama.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-5 tracking-tight">Tautan Cepat</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/price-list" className="hover:text-white transition">Price List</Link></li>
              <li><Link to="/resources" className="hover:text-white transition">Persyaratan Kredit</Link></li>
              <li><Link to="/resources" className="hover:text-white transition">FAQ Lengkap</Link></li>
              <li><Link to="/news" className="hover:text-white transition">Berita Dealer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-5 tracking-tight">Produk Utama</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/detail/4" className="hover:text-white transition">Pajero Sport</Link></li>
              <li><Link to="/detail/6" className="hover:text-white transition">Xpander Cross</Link></li>
              <li><Link to="/detail/5" className="hover:text-white transition">Xpander</Link></li>
              <li><Link to="/detail/8" className="hover:text-white transition">Colt L300</Link></li>
              <li><Link to="/detail/10" className="hover:text-white transition">Canter Truck</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-5 tracking-tight">Jam Operasional</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Senin - Jumat: 08.00 - 17.00</p>
              <p>Sabtu: 08.00 - 14.00</p>
              <p>Minggu: Tutup (Hanya Layanan Sales)</p>
              <a href="https://wa.me/6281212345678" className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-brand-red">Hubungi Sales 24/7</a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Mitsubishi Utama by Srikandi. All rights reserved. Website by Srikandi Cikokol.
        </div>
      </div>
    </footer>
  );
};

export default Footer;