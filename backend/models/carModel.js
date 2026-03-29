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

module.exports = {
  getAllCars,
  getAllCarVariants
};