// backend/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// ⚠️ PENTING: Route yang lebih spesifik HARUS didaftarkan SEBELUM route yang generic
// Karena :slug akan match semua string, jadi /:slug/reviews harus SEBELUM /:slug

router.get('/', carController.getCars);
// Lebih spesifik dulu (dengan path tambahan)
router.get('/:slug/reviews', carController.getCarReviews);
router.get('/:slug/faqs', carController.getCarFaqs);
// Paling generic di akhir
router.get('/:slug', carController.getCarBySlug);

module.exports = router;