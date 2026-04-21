const contentModel = require('../models/contentModel');

const getNews = async (req, res) => {
  try {
    const type = req.query.type ? String(req.query.type).trim().toUpperCase() : null;
    const limit = req.query.limit ? Number(req.query.limit) : null;

    const data = await contentModel.getNewsList({ type, limit });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNewsDetail = async (req, res) => {
  try {
    const slug = String(req.params.slug || '').trim();
    const data = await contentModel.getNewsBySlug(slug);

    if (!data) {
      return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan' });
    }

    return res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching news detail:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFaqTopics = async (_req, res) => {
  try {
    const data = await contentModel.getFaqTopics();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching FAQ topics:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getImportantGuides = async (_req, res) => {
  try {
    const data = await contentModel.getImportantGuides();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching important guides:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getResourceCategories = async (_req, res) => {
  try {
    const data = await contentModel.getResourceCategories();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching resource categories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getResourceByCarSlug = async (req, res) => {
  try {
    const carSlug = String(req.params.carSlug || '').trim();
    const data = await contentModel.getResourceArticlesByCarSlug(carSlug);

    res.json({
      success: true,
      data,
      count: data.highlights.length + data.articles.length
    });
  } catch (error) {
    console.error('Error fetching resources by car slug:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getResourceArticleDetail = async (req, res) => {
  try {
    const carSlug = String(req.params.carSlug || '').trim();
    const articleSlug = String(req.params.articleSlug || '').trim();

    const data = await contentModel.getResourceArticleDetail(carSlug, articleSlug);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Artikel panduan tidak ditemukan' });
    }

    return res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching resource article detail:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHeroSlides = async (_req, res) => {
  try {
    const data = await contentModel.getHeroSlides();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getNews,
  getNewsDetail,
  getFaqTopics,
  getImportantGuides,
  getResourceCategories,
  getResourceByCarSlug,
  getResourceArticleDetail,
  getHeroSlides
};
