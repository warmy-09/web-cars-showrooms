// backend/config/db.js
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

// Priority: .env.local (development) → .env (production)
const envPath = fs.existsSync(path.resolve(__dirname, '../.env.local'))
  ? path.resolve(__dirname, '../.env.local')
  : path.resolve(__dirname, '../.env');

require('dotenv').config({ path: envPath });
console.log(`Loading environment from: ${envPath}`);

// Membuat koneksi pooling ke MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD, // Pastikan sama dengan di docker-compose / .env
  database: process.env.DB_NAME || 'mitsubishi_dealer',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi saat aplikasi berjalan
pool.getConnection()
  .then(conn => {
    console.log('✅ Berhasil terhubung ke database MySQL mitsubishi_dealer');
    conn.release(); // Lepaskan kembali koneksi ke pool
  })
  .catch(err => {
    console.error('❌ Gagal terhubung ke database:', err.message);
  });

module.exports = pool;