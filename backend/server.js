const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');
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

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

app.use('/api/cars', carRoutes);

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const hasFrontendBuild = fs.existsSync(indexPath);

if (hasFrontendBuild) {
  app.use(express.static(distPath));

  // SPA fallback: semua route non-API diarahkan ke React index.html
  app.get(/^\/(?!api\/).*/, (req, res) => {
    return res.sendFile(indexPath);
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running. Frontend build belum ditemukan di folder backend/dist.');
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});