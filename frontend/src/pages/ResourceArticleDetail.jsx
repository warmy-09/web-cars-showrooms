import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  useResourcesCars,
  useResourceCategories,
  useResourceByCar,
  useResourceArticleDetail
} from '../hooks/useResourcesData';

const ResourceArticleDetail = () => {
  const { slug, articleSlug } = useParams();

  const { data: cars = [], isLoading: isLoadingCars } = useResourcesCars();
  const { data: resourceCategoriesData = [], isLoading: isLoadingCategories } = useResourceCategories();
  const car = useMemo(
    () => (Array.isArray(cars) ? cars.find((item) => item.slug === slug) || null : null),
    [cars, slug]
  );
  const { data: resources, isLoading: isLoadingResources } = useResourceByCar(slug, car?.name, car?.year);
  const { data: article, isLoading: isLoadingArticle } = useResourceArticleDetail(slug, articleSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, articleSlug]);

  const categoryName = useMemo(() => {
    if (!article || !Array.isArray(resourceCategoriesData)) return 'Panduan';
    const category = resourceCategoriesData.find((item) => item.id === article.categoryId);
    return category ? category.title : 'Panduan';
  }, [article, resourceCategoriesData]);

  const relatedArticles = useMemo(() => {
    if (!article || !resources) return [];
    return (resources.articles || [])
      .filter((item) => item.categoryId === article.categoryId && item.slug !== articleSlug)
      .slice(0, 4);
  }, [article, resources, articleSlug]);

  const isLoading = isLoadingCars || isLoadingCategories || isLoadingResources || isLoadingArticle;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-red"></div></div>;
  if (!car || !article) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-bold text-xl">Artikel Panduan Tidak Ditemukan.</div>;

  return (
    <div className="bg-white min-h-screen font-sans pb-24 pt-28">

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">

        <div className="flex items-center text-sm font-medium text-gray-400 mb-10 overflow-x-auto whitespace-nowrap hide-scrollbar pb-2">
          <Link to="/resources" className="hover:text-brand-black transition-colors">Resources</Link>
          <span className="mx-3">/</span>
          <Link to={`/resources/${slug}`} className="hover:text-brand-black transition-colors uppercase">{car.name}</Link>
          <span className="mx-3">/</span>
          <span className="text-gray-800 font-bold">{categoryName}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">

          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>

            {article.snippet && (
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10">
                {article.snippet}
              </p>
            )}

            <div
              className="text-gray-700 leading-loose text-base md:text-lg
              [&>h3]:text-2xl [&>h3]:font-extrabold [&>h3]:text-brand-black [&>h3]:mt-12 [&>h3]:mb-5
              [&>p]:mb-7
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-4 [&>ol>li]:pl-2 [&>ol>li>strong]:text-brand-black
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-4 [&>ul>li]:pl-2
              [&>em]:text-gray-500 [&>em]:italic"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Konten panduan sedang dalam proses pembaruan oleh tim ahli kami.</p>' }}
            />
          </div>

          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-8">

            <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl shadow-sm text-center">
              <h3 className="text-xl font-extrabold text-brand-black mb-3">
                Tertarik dengan {car.name}?
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Lihat harga terbaru, promo bulan ini, dan simulasi kredit untuk Mitsubishi {car.name}.
              </p>
              <Link to={`/detail/${slug}`} className="block w-full bg-brand-black hover:bg-brand-red text-white py-4 rounded-xl font-bold transition-colors">
                Lihat Harga & Promo
              </Link>
            </div>

            {relatedArticles.length > 0 && (
              <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                <h4 className="font-extrabold text-lg text-brand-black mb-6">Baca Juga</h4>
                <div className="flex flex-col space-y-5">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/resources/${slug}/${rel.slug}`}
                      className="group flex flex-col border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                    >
                      <h5 className="text-sm font-bold text-gray-700 group-hover:text-brand-red transition-colors line-clamp-2 leading-relaxed">
                        {rel.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ResourceArticleDetail;