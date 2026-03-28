import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, BookOpen, Settings, Wrench,
  CreditCard, Compass, ShieldCheck, AlertTriangle, Star
} from 'lucide-react';

import { carsData, resourceCategoriesData, getResourceByCar } from '../data/mockData';

const ResourceCarDetail = () => {
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [resources, setResources] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    if (carsData && carsData[slug]) {
      const foundCar = carsData[slug];
      setCar(foundCar);
      setResources(getResourceByCar(slug, foundCar.name, foundCar.year));
    }

    setTimeout(() => setIsLoading(false), 400);
  }, [slug]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-red"></div></div>;
  if (!car || !resources) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-bold text-xl">Data Panduan Mobil Tidak Ditemukan.</div>;

  const renderIcon = (iconName, className) => {
    const IconMap = {
      BookOpen, Settings, Wrench, CreditCard, Compass, ShieldCheck, AlertTriangle
    };
    const TargetIcon = IconMap[iconName] || BookOpen;
    return <TargetIcon className={className} />;
  };

  const getCategoryTitle = (categoryId) => {
    const category = resourceCategoriesData.find(c => c.id === categoryId);
    return category ? category.title : 'Panduan';
  };

  const ArticleCard = ({ title, categoryId, isHighlight = false, articleSlug, carSlug }) => {
    const categoryName = getCategoryTitle(categoryId);

    const targetUrl = articleSlug ? `/resources/${carSlug}/${articleSlug}` : "#";

    return (
      <Link to={targetUrl} className="flex flex-col group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all">
        <div className={`${isHighlight ? 'h-48' : 'h-36'} bg-gray-100 relative overflow-hidden`}>
          <img
            src={`https://placehold.co/600x400/f8fafc/94a3b8?text=${categoryName.replace(/\s+/g, '+')}`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm uppercase text-gray-700">
            {categoryName}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1 justify-between">
          <h4 className={`font-extrabold text-brand-black mb-4 line-clamp-2 group-hover:text-brand-red transition-colors ${isHighlight ? 'text-lg' : 'text-sm'}`}>
            {title}
          </h4>
          <div className="text-xs font-bold text-gray-400 flex items-center uppercase tracking-wider">
            Baca Panduan <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-24">

      <div className="bg-white border-b border-gray-200 pt-24 pb-12 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/resources" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-brand-black transition mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Pusat Bantuan
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 bg-gray-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center p-4 flex-shrink-0 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-contain scale-110"
                onError={(e) => { e.target.onerror=null; e.target.src='https://placehold.co/200x200/f8fafc/94a3b8?text=Mobil'; }}
              />
            </div>
            <div>
              <span className="inline-block bg-red-50 text-brand-red text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-widest mb-3 border border-red-100">
                Pusat Panduan Resmi
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-4 tracking-tight">
                Bantuan & FAQ <br className="hidden md:block"/> {car.name}
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl">
                Temukan segala informasi yang Anda butuhkan untuk memaksimalkan pengalaman berkendara bersama {car.name} Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-extrabold text-brand-black flex items-center">
            <Star className="w-6 h-6 mr-3 text-amber-400 fill-amber-400" /> Highlights Panduan {car.name}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.highlights.map(item => (
            <ArticleCard
              key={item.id}
              title={item.title}
              categoryId={item.categoryId}
              isHighlight={true}
              articleSlug={item.slug}
              carSlug={slug}
            />
          ))}
        </div>
      </section>

      <div className="px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto space-y-20 pb-10">
        {resourceCategoriesData.map((category) => {

          const categoryArticles = resources.articles.filter(
            article => article.categoryId === category.id
          );

          return (
            <section key={category.id} className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200 shadow-sm">

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 mr-4">
                    {renderIcon(category.iconName, "w-6 h-6 text-brand-red")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-brand-black">{category.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">Topik seputar {category.title.toLowerCase()}</p>
                  </div>
                </div>
                <Link to="#" className="inline-flex items-center text-sm font-bold text-brand-red bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                  Lihat Semua ({Math.floor(Math.random() * 10) + 8}) <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    categoryId={article.categoryId}
                    articleSlug={article.slug}
                    carSlug={slug}
                  />
                ))}
              </div>

              {categoryArticles.length === 0 && (
                <div className="text-center py-10 text-gray-400 font-medium">
                  Belum ada artikel untuk topik ini.
                </div>
              )}

            </section>
          );
        })}
      </div>

    </div>
  );
};

export default ResourceCarDetail;