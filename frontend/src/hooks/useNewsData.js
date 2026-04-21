import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '../config/api';
import { newsPromoData } from '../data/mockData';

const fallbackNews = Array.isArray(newsPromoData) ? newsPromoData : [];

const normalizeNewsItem = (item) => ({
  id: item.id,
  slug: item.slug,
  type: item.type,
  isFeatured: Boolean(item.isFeatured),
  title: item.title,
  date: item.date || item.publish_date || '-',
  author: item.author || 'Admin',
  image: item.image || item.image_url || '/card.png',
  snippet: item.snippet || '',
  content: item.content || '',
  tags: Array.isArray(item.tags) ? item.tags : []
});

const fetchNewsList = async () => {
  try {
    const response = await fetch(apiUrl('/news'));
    if (!response.ok) throw new Error(`Failed to fetch news: ${response.status}`);

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : [];

    if (rows.length === 0) {
      return fallbackNews.map(normalizeNewsItem);
    }

    return rows.map(normalizeNewsItem);
  } catch (error) {
    console.error('Error fetching news list:', error);
    return fallbackNews.map(normalizeNewsItem);
  }
};

const fetchNewsDetail = async (slug) => {
  try {
    const response = await fetch(apiUrl(`/news/${slug}`));
    if (!response.ok) throw new Error(`Failed to fetch detail: ${response.status}`);

    const payload = await response.json();
    if (payload?.data) return normalizeNewsItem(payload.data);

    return fallbackNews.find((item) => item.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return fallbackNews.find((item) => item.slug === slug) || null;
  }
};

export const useNewsList = () =>
  useQuery({
    queryKey: ['news-list'],
    queryFn: fetchNewsList
  });

export const useNewsDetail = (slug) =>
  useQuery({
    queryKey: ['news-detail', slug],
    queryFn: () => fetchNewsDetail(slug),
    enabled: !!slug
  });
