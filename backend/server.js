// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // Masih dipertahankan untuk test koneksi endpoint di bawah

// Import Routes
const carRoutes = require('./routes/carRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint Test Database (Health Check)
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'API & Database berjalan lancar!', data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =================================================================
// DAFTAR ROUTES UTAMA
// =================================================================
app.use('/api/cars', carRoutes);

// Jika nanti ada tabel users, Anda tinggal tambahkan:
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});