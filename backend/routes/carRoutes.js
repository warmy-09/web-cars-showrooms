// backend/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Karena file ini nanti akan dipanggil dengan prefix '/api/cars' di server.js,
// maka '/' di sini berarti '/api/cars/'
router.get('/', carController.getCars);

module.exports = router;