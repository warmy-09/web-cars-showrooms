# 🚀 Local Development Setup Guide

## Tujuan
Setup environment lokal yang terpisah dari production Hostinger, memudahkan editing, debugging, dan testing tanpa mengganggu live website.

---

## 📋 Prerequisites

Pastikan Anda sudah install:
- Node.js v18+ (check: `node --version`)
- npm v9+ (check: `npm --version`)
- Docker + Docker Compose (untuk MySQL lokal)

---

## 🛠️ Setup Lokal Step by Step

### 1️⃣ **Start MySQL Database Lokal**

```bash
# Dari root project folder
docker-compose up -d

# Verify MySQL running
docker ps | grep dealer_mysql

# Cek logs jika ada issue
docker-compose logs mysql-db
```

**Database lokal details:**
- Host: `127.0.0.1`
- Port: `3306`
- Root User: `root`
- Root Password: `rahasia_super_kuat`
- Database: `mitsubishi_dealer`

---

### 2️⃣ **Setup Backend (port 5000 lokal)**

```bash
cd backend

# Install dependencies
npm install

# Backend .env.local sudah ada dengan credentials lokal
# Verify: Backend akan prioritas load .env.local daripada .env

# Run development mode (dengan auto-reload)
npm run dev

# Expected output:
# ✅ Server berjalan pada port 5000
# ✅ Berhasil terhubung ke database MySQL mitsubishi_dealer
```

**Backend running di:** `http://localhost:5000`

Test endpoints:
- `http://localhost:5000/api/health` — API status
- `http://localhost:5000/api/test` — Database connection test
- `http://localhost:5000/api/cars` — Get all cars

---

### 3️⃣ **Setup Frontend (Vite dev server)**

Buka terminal baru:

```bash
cd frontend

# Install dependencies
npm install

# Frontend .env.local sudah ada dengan API pointing ke backend lokal
# Verify: VITE_API_BASE_URL=http://localhost:5000/api

# Run development server
npm run dev

# Expected output:
# VITE v8.0.3 ready in XXX ms
# ➜ Local: http://localhost:5173
```

**Frontend running di:** `http://localhost:5173`

Frontend Vite sudah configured dengan proxy `/api` ke `http://localhost:5000`, jadi API calls bekerja seamless.

---

## 🔄 Development Workflow

### Local Development (Edit & Test)

```
┌─ Terminal 1: Backend ──────┐
│ cd backend                 │
│ npm run dev                │
│ (port 5000)                │
└────────────────────────────┘

┌─ Terminal 2: Frontend ─────┐
│ cd frontend                │
│ npm run dev                │
│ (port 5173)                │
└────────────────────────────┘

Open browser: http://localhost:5173
```

**Perubahan otomatis:**
- Backend: Auto-reload via nodemon (edit file `.js`)
- Frontend: Hot-reload via Vite (edit file `.jsx`, `.css`)

---

### Jika Perlu Test Endpoint Manually

```bash
# Test API connection
curl http://localhost:5000/api/health

# Get all cars
curl http://localhost:5000/api/cars

# Get single car
curl http://localhost:5000/api/cars/xpander
```

---

## 🚀 Deploy ke Hostinger (Production)

### Pre-deployment Checklist

```bash
# 1. Ensure di backend folder, pakai production credentials
# Edit backend/.env dengan credentials dari .env.production
# (Jangan modify .env.local, tetap gunakan untuk local dev)

# 2. Pastikan menggunakan .env production:
cp backend/.env.production backend/.env

# 3. Build frontend untuk production
cd frontend
npm run build

# Output: frontend/dist/ dengan bundle production-ready

# 4. Copy dist ke backend
# Hapus isi backend/dist lama
# Copy semua file dari frontend/dist ke backend/dist

# 5. Commit changes
git add .
git commit -m "Deploy to Hostinger: [your changes]"
git push origin main

# 6. SSH ke Hostinger dan deploy
# (instruksi dari hPanel)
```

---

## 🔧 Troubleshooting

### Backend API tidak bisa hit dari Frontend (CORS Error)

**Lokal Dev:**
- Pastikan Vite proxy sudah configured (ada di `vite.config.js`)
- Frontend port: 5173, Backend port: 5000
- Proxy rules: `/api` → `http://localhost:5000/api`

**Production (Hostinger):**
- Frontend dilayani dari backend (same domain)
- API calls pakai relative path `/api`

### Database Connection Error

```
❌ Gagal terhubung ke database: ...
```

Check:
1. Docker MySQL running: `docker ps`
2. Database credentials di `.env.local` benar
3. Port 3306 tidak blocked

```bash
# Troubleshoot:
docker-compose down
docker-compose up -d
```

### Port sudah terpakai

```
❌ Error: listen EADDRINUSE :::5000

# Kill process di port 5000
# Windows:
netstat -ano | find "5000"
taskkill /PID [PID] /F

# Linux/Mac:
lsof -i :5000
kill -9 [PID]
```

---

## 📁 Environment Files Explanation

### Local Development

```
backend/.env.local (⭐ untuk local dev)
├─ DB_HOST=127.0.0.1 (MySQL lokal)
├─ DB_USER=root
├─ DB_PASSWORD=rahasia_super_kuat
└─ DB_NAME=mitsubishi_dealer

frontend/.env.local (⭐ untuk local dev)
└─ VITE_API_BASE_URL=http://localhost:5000/api
```

### Production (Hostinger)

```
backend/.env.production (🔐 credentials Hostinger)
├─ DB_HOST=127.0.0.1
├─ DB_USER=u649635179_zakzak
├─ DB_PASSWORD=[rahasia]
└─ DB_NAME=u649635179_db_dealer

frontend/.env.production
└─ (kosong, default /api akan dipakai)
```

### ⚠️ JANGAN LUPA

- **JANGAN commit** `.env`, `.env.local`, atau `.env.production` ke Git
- Gunakan `.env.example` sebagai template
- `backend/.env` auto-loaded, jangan di-modify manual (pakai .env.local atau .env.production)

---

## 🎯 Quick Commands Reference

```bash
# Backend
npm run dev      # Development dengan auto-reload
npm run start    # Production mode

# Frontend
npm run dev      # Development server (port 5173)
npm run build    # Build production bundle

# Docker
docker-compose up -d     # Start MySQL
docker-compose down      # Stop MySQL
docker-compose logs -f   # View logs
```

---

## 📝 Notes

- Setiap kali edit backend, pastikan terminal backend menunjukkan "restarted" (nodemon)
- Setiap kali edit frontend, browser akan auto-refresh (Vite HMR)
- Untuk deploy ke Hostinger, ikuti checklist di atas (jangan lupa switch .env)

---

## 💡 Tips

1. **Development = Local, Production = Hostinger**
   - Jangan commit .env files
   - Jangan hardcode URLs, pakai env variables

2. **Git workflow yang selamat:**
   ```bash
   # Before commit, ensure:
   git status  # Check tidak ada .env files
   git add .   # (tidak akan add .env karena ada di .gitignore)
   ```

3. **Jika stuck, reset environment:**
   ```bash
   docker-compose down
   rm -rf backend/node_modules frontend/node_modules
   npm install (di backend dan frontend)
   docker-compose up -d
   ```
