// backend/models/carModel.js
const db = require('../config/db');

// Fungsi untuk mengambil semua data mobil
const getAllCars = async () => {
  const [rows] = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
  return rows;
};

// Fungsi untuk mengambil semua data varian
const getAllCarVariants = async () => {
  const [rows] = await db.query('SELECT * FROM car_variants');
  return rows;
};

// Fungsi untuk mengambil detail mobil berdasarkan slug
const getCarBySlug = async (slug) => {
  const [cars] = await db.query('SELECT * FROM cars WHERE slug = ?', [slug]);
  return cars.length > 0 ? cars[0] : null;
};

// Fungsi untuk mengambil varian mobil berdasarkan car_id
const getVariantsByCarId = async (carId) => {
  const [rows] = await db.query('SELECT * FROM car_variants WHERE car_id = ?', [carId]);
  return rows;
};

// Fungsi untuk mengambil reviews berdasarkan slug
const getReviewsBySlug = async (slug) => {
  const query = `
    SELECT r.* FROM car_reviews r 
    JOIN cars c ON r.car_id = c.id 
    WHERE c.slug = ?
    ORDER BY r.created_at DESC
  `;
  const [rows] = await db.query(query, [slug]);
  return rows;
};

// Fungsi untuk mengambil FAQs berdasarkan slug
const getFaqsBySlug = async (slug) => {
  const query = `
    SELECT f.* FROM car_faqs f 
    JOIN cars c ON f.car_id = c.id 
    WHERE c.slug = ?
  `;
  const [rows] = await db.query(query, [slug]);
  return rows;
};

module.exports = {
  getAllCars,
  getAllCarVariants,
  getCarBySlug,
  getVariantsByCarId,
  getReviewsBySlug,
  getFaqsBySlug
};