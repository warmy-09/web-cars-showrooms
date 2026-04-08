const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // Masih dipertahankan untuk test koneksi endpoint di bawah

const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'API & Database berjalan lancar!', data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
 res.send("API is running. Try /api/test");
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "public", "index.html"));
});