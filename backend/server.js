// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); 

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint Test Database
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'API & Database berjalan lancar!', data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =================================================================
// ENDPOINT BARU: Mengambil semua daftar mobil
// =================================================================

app.get('/api/cars', async (req, res) => {
  try {
    // 1. Ambil data utama dari tabel cars
    const [cars] = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
    
    // 2. Ambil semua data varian dari tabel car_variants
    const [variants] = await db.query('SELECT * FROM car_variants');
    
    // 3. Gabungkan varian ke dalam array mobil yang tepat (mencocokkan car_id)
    const carsWithVariants = cars.map(car => ({
      ...car,
      variants: variants.filter(v => v.car_id === car.id)
    }));

    // Kirim data yang sudah utuh ke Frontend
    res.json({ success: true, count: carsWithVariants.length, data: carsWithVariants });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});