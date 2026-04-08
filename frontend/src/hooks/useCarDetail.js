import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../config/api';

const formatToIdr = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return 'Hubungi Sales';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const normalizeReview = (review) => ({
  ...review,
  name: review.reviewer_name || review.name || 'Pengguna',
  date: review.review_date || review.date || '-',
  text: review.review_text || review.text || '',
  rating: Number(review.rating || 5),
});

const normalizeFaq = (faq) => ({
  ...faq,
  q: faq.question || faq.q || '',
  a: faq.answer || faq.a || '',
});

const normalizeVariant = (variant) => ({
  ...variant,
  price: Number(variant.price || 0),
  priceStr: variant.price_string || variant.priceStr || formatToIdr(variant.price),
  highlights: Array.isArray(variant.highlights) ? variant.highlights : [],
});

const normalizeCar = (car, reviews, faqs) => {
  if (!car) return null;

  return {
    ...car,
    image: car.image_url || car.image || '',
    priceString: car.price_string || car.priceString || 'Hubungi Sales',
    reviewsCount: car.reviews_count || car.reviewsCount || reviews.length,
    gallery: Array.isArray(car.gallery) ? car.gallery : [],
    specs: car.specs || {},
    variants: Array.isArray(car.variants) ? car.variants.map(normalizeVariant) : [],
    reviews,
    faqs,
  };
};

const fetchCarDetail = async (slug) => {
  const response = await fetch(apiUrl(`/cars/${slug}`));
  if (!response.ok) throw new Error(`Failed to fetch car: ${response.status}`);
  const data = await response.json();
  return data.data;
};

const fetchReviews = async (slug) => {
  const response = await fetch(apiUrl(`/cars/${slug}/reviews`));
  if (!response.ok) throw new Error(`Failed to fetch reviews: ${response.status}`);
  const data = await response.json();
  return data.data || [];
};

const fetchFaqs = async (slug) => {
  const response = await fetch(apiUrl(`/cars/${slug}/faqs`));
  if (!response.ok) throw new Error(`Failed to fetch FAQs: ${response.status}`);
  const data = await response.json();
  return data.data || [];
};

export const useCarDetail = (slug) => {
  const { data: car, isLoading: isLoadingCar, error: carError } = useQuery({
    queryKey: ['car', slug],
    queryFn: () => fetchCarDetail(slug),
    enabled: !!slug,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', slug],
    queryFn: () => fetchReviews(slug),
    enabled: !!slug,
  });

  const { data: faqs = [] } = useQuery({
    queryKey: ['faqs', slug],
    queryFn: () => fetchFaqs(slug),
    enabled: !!slug,
  });

  const normalizedReviews = reviews.map(normalizeReview);
  const normalizedFaqs = faqs.map(normalizeFaq);
  const carWithMergedData = normalizeCar(car, normalizedReviews, normalizedFaqs);

  return {
    car: carWithMergedData,
    isLoading: isLoadingCar,
    error: carError
  };
};
