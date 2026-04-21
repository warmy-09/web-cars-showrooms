const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/news', contentController.getNews);
router.get('/news/:slug', contentController.getNewsDetail);

router.get('/resources/faq-topics', contentController.getFaqTopics);
router.get('/resources/important-guides', contentController.getImportantGuides);
router.get('/resources/categories', contentController.getResourceCategories);
router.get('/resources/cars/:carSlug', contentController.getResourceByCarSlug);
router.get('/resources/cars/:carSlug/:articleSlug', contentController.getResourceArticleDetail);

router.get('/hero-slides', contentController.getHeroSlides);

module.exports = router;
