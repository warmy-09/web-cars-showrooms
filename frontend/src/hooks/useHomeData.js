import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../config/api';
import { heroSlidesData, carsData, newsPromoData } from '../data/mockData';

const normalizeSlide = (slide) => ({
  id: slide.id,
  slug: slide.slug,
  tabName: slide.tabName || slide.tab_name || '',
  tag: slide.tag || '',
  subhead: slide.subhead || '',
  title: slide.title || '',
  price: slide.price || slide.price_string || '-',
  desc: slide.desc || slide.description || '',
  image: slide.image || slide.image_url || '/card.png'
});

const buildQuickSpecs = (car) => {
  if (Array.isArray(car.quickSpecs) && car.quickSpecs.length > 0) return car.quickSpecs;

  const specs = car.specs || {};
  const quickSpecs = [];

  if (specs.transmission) {
    quickSpecs.push({ label: 'Transmisi', value: specs.transmission });
  }
  if (specs.power) {
    quickSpecs.push({ label: 'Tenaga', value: specs.power });
  }
  if (specs.torque) {
    quickSpecs.push({ label: 'Torsi', value: specs.torque });
  }

  return quickSpecs;
};

const normalizeCar = (car) => ({
  ...car,
  image: car.image || car.image_url || '/card.png',
  priceString: car.priceString || car.price_string || 'Hubungi Sales',
  quickSpecs: buildQuickSpecs(car)
});

const normalizeNews = (item) => ({
  id: item.id,
  slug: item.slug,
  type: item.type,
  title: item.title,
  date: item.date || item.publish_date || '-',
  image: item.image || item.image_url || '/card.png'
});

const fetchHeroSlides = async () => {
  try {
    const response = await fetch(apiUrl('/hero-slides'));
    if (!response.ok) throw new Error(`Failed to fetch hero slides: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];

    if (rows.length === 0) return heroSlidesData.map(normalizeSlide);
    return rows.map(normalizeSlide);
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return heroSlidesData.map(normalizeSlide);
  }
};

const fetchPopularCars = async () => {
  try {
    const response = await fetch(apiUrl('/cars'));
    if (!response.ok) throw new Error(`Failed to fetch cars: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];

    if (rows.length === 0) {
      return Object.values(carsData || {}).slice(0, 6).map(normalizeCar);
    }

    return rows.slice(0, 6).map(normalizeCar);
  } catch (error) {
    console.error('Error fetching popular cars:', error);
    return Object.values(carsData || {}).slice(0, 6).map(normalizeCar);
  }
};

const fetchHomeNews = async () => {
  try {
    const response = await fetch(apiUrl('/news?limit=3'));
    if (!response.ok) throw new Error(`Failed to fetch home news: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];

    if (rows.length === 0) {
      return newsPromoData.slice(0, 3).map(normalizeNews);
    }

    return rows.map(normalizeNews);
  } catch (error) {
    console.error('Error fetching home news:', error);
    return newsPromoData.slice(0, 3).map(normalizeNews);
  }
};

export const useHomeHeroSlides = () =>
  useQuery({
    queryKey: ['home-hero-slides'],
    queryFn: fetchHeroSlides
  });

export const useHomePopularCars = () =>
  useQuery({
    queryKey: ['home-popular-cars'],
    queryFn: fetchPopularCars
  });

export const useHomeNews = () =>
  useQuery({
    queryKey: ['home-news'],
    queryFn: fetchHomeNews
  });
