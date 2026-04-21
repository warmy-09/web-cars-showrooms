import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../config/api';
import {
  carsData,
  faqTopicsData,
  importantGuidesData,
  resourceCategoriesData,
  getResourceByCar
} from '../data/mockData';

const fallbackCars = Object.values(carsData || {});

const normalizeCar = (car) => ({
  ...car,
  image: car.image_url || car.image || '/card.png',
  priceString: car.price_string || car.priceString || 'Hubungi Sales'
});

const normalizeCategory = (category) => ({
  id: category.id,
  title: category.title,
  iconName: category.iconName || category.icon_name,
  description: category.description || category.desc || ''
});

const normalizeResourceArticle = (item) => ({
  id: item.id,
  categoryId: item.categoryId || item.category_id,
  isHighlight: Boolean(item.isHighlight ?? item.is_highlight),
  title: item.title,
  slug: item.slug,
  snippet: item.snippet || '',
  content: item.content || ''
});

const fetchCars = async () => {
  try {
    const response = await fetch(apiUrl('/cars'));
    if (!response.ok) throw new Error(`Failed to fetch cars: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];

    if (rows.length === 0) return fallbackCars.map(normalizeCar);
    return rows.map(normalizeCar);
  } catch (error) {
    console.error('Error fetching cars for resources:', error);
    return fallbackCars.map(normalizeCar);
  }
};

const fetchFaqTopics = async () => {
  try {
    const response = await fetch(apiUrl('/resources/faq-topics'));
    if (!response.ok) throw new Error(`Failed to fetch FAQ topics: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];
    if (rows.length === 0) return faqTopicsData;

    return rows.map((item) => ({
      id: item.id,
      title: item.title,
      iconName: item.iconName,
      desc: item.desc || ''
    }));
  } catch (error) {
    console.error('Error fetching FAQ topics:', error);
    return faqTopicsData;
  }
};

const fetchImportantGuides = async () => {
  try {
    const response = await fetch(apiUrl('/resources/important-guides'));
    if (!response.ok) throw new Error(`Failed to fetch important guides: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];
    if (rows.length === 0) return importantGuidesData;

    return rows.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      image: item.image,
      slug: item.slug
    }));
  } catch (error) {
    console.error('Error fetching important guides:', error);
    return importantGuidesData;
  }
};

const fetchResourceCategories = async () => {
  try {
    const response = await fetch(apiUrl('/resources/categories'));
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];
    if (rows.length === 0) return resourceCategoriesData;

    return rows.map(normalizeCategory);
  } catch (error) {
    console.error('Error fetching resource categories:', error);
    return resourceCategoriesData;
  }
};

const fetchResourceByCar = async (carSlug, carName, carYear) => {
  try {
    const response = await fetch(apiUrl(`/resources/cars/${carSlug}`));
    if (!response.ok) throw new Error(`Failed to fetch resources by car: ${response.status}`);

    const payload = await response.json();
    const data = payload?.data;
    const highlights = Array.isArray(data?.highlights) ? data.highlights.map(normalizeResourceArticle) : [];
    const articles = Array.isArray(data?.articles) ? data.articles.map(normalizeResourceArticle) : [];

    if (highlights.length === 0 && articles.length === 0) {
      return getResourceByCar(carSlug, carName, carYear);
    }

    return { highlights, articles };
  } catch (error) {
    console.error('Error fetching resources by car:', error);
    return getResourceByCar(carSlug, carName, carYear);
  }
};

const fetchResourceArticleDetail = async (carSlug, articleSlug) => {
  try {
    const response = await fetch(apiUrl(`/resources/cars/${carSlug}/${articleSlug}`));
    if (!response.ok) throw new Error(`Failed to fetch resource article detail: ${response.status}`);

    const payload = await response.json();
    if (!payload?.data) return null;

    return normalizeResourceArticle(payload.data);
  } catch (error) {
    console.error('Error fetching resource article detail:', error);
    return null;
  }
};

export const useResourcesCars = () =>
  useQuery({
    queryKey: ['resources-cars'],
    queryFn: fetchCars
  });

export const useFaqTopics = () =>
  useQuery({
    queryKey: ['faq-topics'],
    queryFn: fetchFaqTopics
  });

export const useImportantGuides = () =>
  useQuery({
    queryKey: ['important-guides'],
    queryFn: fetchImportantGuides
  });

export const useResourceCategories = () =>
  useQuery({
    queryKey: ['resource-categories'],
    queryFn: fetchResourceCategories
  });

export const useResourceByCar = (carSlug, carName, carYear) =>
  useQuery({
    queryKey: ['resource-by-car', carSlug, carName, carYear],
    queryFn: () => fetchResourceByCar(carSlug, carName, carYear),
    enabled: !!carSlug
  });

export const useResourceArticleDetail = (carSlug, articleSlug) =>
  useQuery({
    queryKey: ['resource-article-detail', carSlug, articleSlug],
    queryFn: () => fetchResourceArticleDetail(carSlug, articleSlug),
    enabled: !!carSlug && !!articleSlug
  });
