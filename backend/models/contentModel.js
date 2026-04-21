const db = require('../config/db');

const parseTags = (rawTags) => {
  if (!rawTags) return [];
  return String(rawTags)
    .split('||')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const mapNewsRow = (row) => ({
  id: row.id,
  slug: row.slug,
  type: row.type,
  isFeatured: Boolean(row.is_featured),
  title: row.title,
  date: row.publish_date,
  author: row.author,
  image: row.image_url,
  snippet: row.snippet,
  content: row.content,
  tags: parseTags(row.tags)
});

const getNewsList = async ({ type, limit }) => {
  let query = `
    SELECT
      n.*,
      GROUP_CONCAT(t.tag_name ORDER BY t.id SEPARATOR '||') AS tags
    FROM news_promos n
    LEFT JOIN news_promo_tags t ON t.news_promo_id = n.id
  `;

  const where = [];
  const params = [];

  if (type) {
    where.push('n.type = ?');
    params.push(type);
  }

  if (where.length > 0) {
    query += ` WHERE ${where.join(' AND ')}`;
  }

  query += ' GROUP BY n.id ORDER BY n.is_featured DESC, n.created_at DESC';

  if (Number.isInteger(limit) && limit > 0) {
    query += ' LIMIT ?';
    params.push(limit);
  }

  const [rows] = await db.query(query, params);
  return rows.map(mapNewsRow);
};

const getNewsBySlug = async (slug) => {
  const query = `
    SELECT
      n.*,
      GROUP_CONCAT(t.tag_name ORDER BY t.id SEPARATOR '||') AS tags
    FROM news_promos n
    LEFT JOIN news_promo_tags t ON t.news_promo_id = n.id
    WHERE n.slug = ?
    GROUP BY n.id
    LIMIT 1
  `;

  const [rows] = await db.query(query, [slug]);
  if (rows.length === 0) return null;

  return mapNewsRow(rows[0]);
};

const getFaqTopics = async () => {
  const [rows] = await db.query('SELECT * FROM faq_topics ORDER BY id ASC');
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    iconName: row.icon_name,
    desc: row.description || ''
  }));
};

const getImportantGuides = async () => {
  const [rows] = await db.query('SELECT * FROM important_guides ORDER BY id ASC');
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image_url,
    slug: row.slug
  }));
};

const getResourceCategories = async () => {
  const [rows] = await db.query('SELECT * FROM resource_categories ORDER BY id ASC');
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    iconName: row.icon_name,
    description: row.description || ''
  }));
};

const getResourceArticlesByCarSlug = async (carSlug) => {
  const query = `
    SELECT *
    FROM car_resource_articles
    WHERE car_slug = ?
    ORDER BY is_highlight DESC, id ASC
  `;

  const [rows] = await db.query(query, [carSlug]);

  const mapped = rows.map((row) => ({
    id: row.id,
    carSlug: row.car_slug,
    categoryId: row.category_id,
    isHighlight: Boolean(row.is_highlight),
    title: row.title,
    slug: row.slug,
    snippet: row.snippet || '',
    content: row.content || ''
  }));

  return {
    highlights: mapped.filter((item) => item.isHighlight),
    articles: mapped.filter((item) => !item.isHighlight)
  };
};

const getResourceArticleDetail = async (carSlug, articleSlug) => {
  const query = `
    SELECT *
    FROM car_resource_articles
    WHERE car_slug = ? AND slug = ?
    LIMIT 1
  `;

  const [rows] = await db.query(query, [carSlug, articleSlug]);
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    carSlug: row.car_slug,
    categoryId: row.category_id,
    isHighlight: Boolean(row.is_highlight),
    title: row.title,
    slug: row.slug,
    snippet: row.snippet || '',
    content: row.content || ''
  };
};

const getHeroSlides = async () => {
  const query = `
    SELECT *
    FROM hero_slides
    ORDER BY display_order ASC, id ASC
  `;

  const [rows] = await db.query(query);
  return rows.map((row) => ({
    id: row.id,
    slug: row.car_slug,
    tabName: row.tab_name,
    tag: row.tag,
    subhead: row.subhead,
    title: row.title,
    price: row.price_string,
    desc: row.description,
    image: row.image_url
  }));
};

module.exports = {
  getNewsList,
  getNewsBySlug,
  getFaqTopics,
  getImportantGuides,
  getResourceCategories,
  getResourceArticlesByCarSlug,
  getResourceArticleDetail,
  getHeroSlides
};
