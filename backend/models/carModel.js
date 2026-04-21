// backend/models/carModel.js
const db = require('../config/db');

// Fungsi untuk mengambil semua data mobil
const getAllCars = async () => {
  const [rows] = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
  return rows;
};

// Fungsi untuk mengambil semua data varian
const getAllCarVariants = async () => {
  const query = `
    SELECT
      v.*,
      COALESCE(
        MAX(
          CASE
            WHEN LOWER(s.spec_label) IN ('transmisi', 'transmission') THEN s.spec_value
            ELSE NULL
          END
        ),
        '-'
      ) AS transmission
    FROM car_variants v
    LEFT JOIN car_specs s ON s.variant_id = v.id
    GROUP BY v.id
    ORDER BY v.price ASC, v.id ASC
  `;
  const [rows] = await db.query(query);
  return rows;
};

// Fungsi untuk mengambil detail mobil berdasarkan slug
const getCarBySlug = async (slug) => {
  const [cars] = await db.query('SELECT * FROM cars WHERE slug = ?', [slug]);
  return cars.length > 0 ? cars[0] : null;
};

// Fungsi untuk mengambil varian mobil berdasarkan car_id
const getVariantsByCarId = async (carId) => {
  const query = `
    SELECT
      v.*,
      COALESCE(
        MAX(
          CASE
            WHEN LOWER(s.spec_label) IN ('transmisi', 'transmission') THEN s.spec_value
            ELSE NULL
          END
        ),
        '-'
      ) AS transmission
    FROM car_variants v
    LEFT JOIN car_specs s ON s.variant_id = v.id
    WHERE v.car_id = ?
    GROUP BY v.id
    ORDER BY v.price ASC, v.id ASC
  `;
  const [rows] = await db.query(query, [carId]);
  return rows;
};

// Mengambil spesifikasi relasional (per varian) berdasarkan car_id
const getSpecsByCarId = async (carId) => {
  const query = `
    SELECT s.spec_category, s.spec_label, s.spec_value
    FROM car_specs s
    INNER JOIN car_variants v ON v.id = s.variant_id
    WHERE v.car_id = ?
    ORDER BY s.id ASC
  `;

  const [rows] = await db.query(query, [carId]);
  return rows;
};

// Mengambil galeri mobil berdasarkan car_id
const getGalleryByCarId = async (carId) => {
  const query = `
    SELECT image_url
    FROM car_galleries
    WHERE car_id = ?
    ORDER BY display_order ASC, id ASC
  `;

  const [rows] = await db.query(query, [carId]);
  return rows;
};

// Mengambil warna mobil berdasarkan car_id
const getColorsByCarId = async (carId) => {
  const query = `
    SELECT
      color_name AS name,
      hex_code AS hex,
      image_url
    FROM car_colors
    WHERE car_id = ?
    ORDER BY id ASC
  `;

  const [rows] = await db.query(query, [carId]);
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
  getSpecsByCarId,
  getGalleryByCarId,
  getColorsByCarId,
  getReviewsBySlug,
  getFaqsBySlug
};