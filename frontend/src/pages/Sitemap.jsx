import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, BookOpen, CreditCard, UserCheck, Briefcase, MapPin,
  HelpCircle, Settings, FileText, Gift, Wrench
} from 'lucide-react';


const Sitemap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sitemapData = [
    {
      category: 'Unit Kendaraan Mitsubishi',
      icon: Car,
      links: [
        { name: 'Daftar Harga Mobil', url: '/price-list' },
        { name: 'Semua Produk Unit', url: '/products' },
        { name: 'New Pajero Sport', url: '/detail/new-pajero-sport' },
        { name: 'New Xpander', url: '/detail/new-xpander' },
        { name: 'Xpander Cross', url: '/detail/xpander-cross' },
        { name: 'XFORCE', url: '/detail/xforce' },
        { name: 'L300', url: '/detail/l300' },
        { name: 'Truk Canter', url: '/detail/canter' },
      ]
    },
    {
      category: 'Layanan Purna Jual & Servis',
      icon: Wrench,
      links: [
        { name: 'Pusat Layanan Purna Jual', url: '/resources' },
        { name: 'Booking Servis Berkala', url: '#' },
        { name: 'Mitsubishi SMART Package', url: '#' },
        { name: 'Suku Cadang Resmi (Spare Parts)', url: '#' },
        { name: 'Layanan Darurat 24 Jam', url: '#' },
      ]
    },
    {
      category: 'Promo & Simulasi Kredit',
      icon: Gift,
      links: [
        { name: 'Daftar Promo Terbaru', url: '/news' },
        { name: 'Simulasi Kredit Mobil', url: '#' },
        { name: 'Paket Pembiayaan Khusus', url: '#' },
        { name: 'Hubungi Sales', url: '/contact' },
      ]
    },
    {
      category: 'Berita & Acara',
      icon: FileText,
      links: [
        { name: 'Semua Berita Mitsubishi', url: '/news' },
        { name: 'Acara & Pameran Dealer', url: '/news' },
        { name: 'Tips & Trik Berkendara', url: '/news' },
      ]
    },
    {
      category: 'Dealer Mitsubishi Utama',
      icon: Briefcase,
      links: [
        { name: 'Tentang Kami', url: '/about' },
        { name: 'Visi & Misi', url: '/about' },
        { name: 'Peta Lokasi Showroom', url: '/#peta-lokasi' },
        { name: 'Kontak Dealer', url: '/contact' },
      ]
    },
    {
      category: 'Bantuan & Kebijakan',
      icon: HelpCircle,
      links: [
        { name: 'Resources / Pusat Panduan', url: '/resources' },
        { name: 'Hubungi Kami', url: '/contact' },
        { name: 'Syarat & Ketentuan Website', url: '#' },
        { name: 'Kebijakan Privasi', url: '#' },
      ]
    },
  ];

  const SitemapCategory = ({ category, links, icon: Icon }) => (
    <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200 group">
      <div className="flex items-center mb-6 pb-5 border-b border-gray-100">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 mr-4 group-hover:bg-brand-black transition-colors shadow-sm">
          <Icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-extrabold text-brand-black tracking-tight">{category}</h3>
      </div>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.url}
              className="text-gray-600 hover:text-brand-red font-medium transition-colors text-base"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-24 pt-28">

      <div className="bg-white border-b border-gray-100 pb-16 pt-10 px-6 md:px-12 xl:px-20 mb-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block bg-red-50 text-brand-red text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-red-100 shadow-inner">
            Daftar Tautan Website
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tighter mb-4">
            Site Map / Peta Situs
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Halaman ini menampilkan struktur lengkap website dealer Mitsubishi Utama, memudahkan Anda menemukan informasi dengan cepat.
          </p>
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sitemapData.map((data, index) => (
            <SitemapCategory key={index} {...data} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Sitemap;