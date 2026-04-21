const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Priority: .env.local (local dev) → .env (production)
const envLocalPath = path.resolve(__dirname, '.env.local');
const envPath = fs.existsSync(envLocalPath) ? envLocalPath : path.resolve(__dirname, '.env');
require('dotenv').config({ path: envPath });
console.log(`[env] Loading from: ${envPath}`);

const db = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const contentRoutes = require('./routes/contentRoutes');

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
app.use('/api', contentRoutes);

const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const hasFrontendBuild = fs.existsSync(indexPath);

if (hasFrontendBuild) {
  app.use(express.static(distPath));

  // SPA fallback: semua route non-API/non-images diarahkan ke React index.html
  app.get(/^\/(?!api\/|images\/).*/, (req, res) => {
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