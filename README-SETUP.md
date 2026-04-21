# 🏗️ Project Documentation Index

Panduan lengkap untuk development dan deployment project Mitsubishi Dealer.

---

## 📚 Documentation Files

### 🎯 **START HERE** 
→ [QUICK-REFERENCE.md](QUICK-REFERENCE.md)  
Daily commands, quick troubleshoot, file locations. **Read ini dulu!**

### 🛠️ **Setup & Development**
→ [DEVELOPMENT-SETUP.md](DEVELOPMENT-SETUP.md)  
Complete local setup guide dengan MySQL Docker, Backend & Frontend, troubleshooting detail.

**Includes:**
- Prerequisites check
- Docker MySQL setup
- Backend (port 5000) setup
- Frontend (port 5173) setup
- Development workflow

### 📤 **Production Deployment**
→ [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)  
Step-by-step deploy ke Hostinger, production checklist, rollback guide.

**Includes:**
- Pre-deployment verification
- Build & copy process
- Production credentials setup
- Post-deployment verification
- Emergency rollback

---

## 🚀 Quick Start (3 menit)

```bash
# 1. Auto-setup (Windows)
.\setup-local-dev.ps1

# Or Linux/Mac
bash setup-local-dev.sh

# 2. Start backends in 2 terminals
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# 3. Open browser
http://localhost:5173
```

---

## 📁 Project Structure

```
web-cars-showrooms/
├── 📄 QUICK-REFERENCE.md         ← Daily commands
├── 📄 DEVELOPMENT-SETUP.md       ← Setup guide
├── 📄 DEPLOYMENT-GUIDE.md        ← Deploy guide
├── 🔧 setup-local-dev.ps1         ← Auto-setup Windows
├── 🔧 setup-local-dev.sh          ← Auto-setup Linux/Mac
│
├── 📂 backend/
│   ├── .env.local               ← Local dev credentials ✨
│   ├── .env.production          ← Production credentials (safe)
│   ├── .env.example             ← Template
│   ├── server.js                ← API entry point
│   ├── config/db.js             ← Database config (auto .env.local priority)
│   ├── routes/                  ← API routes
│   ├── controllers/             ← Business logic
│   ├── models/                  ← Data queries
│   ├── dist/                    ← Frontend build (copied from frontend/dist)
│   └── package.json
│
├── 📂 frontend/
│   ├── .env.local               ← Local: VITE_API_BASE_URL=http://localhost:5000/api
│   ├── .env.production          ← Production: (empty, uses default /api)
│   ├── .env.example             ← Template
│   ├── vite.config.js           ← Vite config (includes proxy to backend:5000)
│   ├── src/
│   │   ├── config/api.js        ← API URL helper (uses env or /api)
│   │   ├── hooks/useCarDetail.js ← API calls via helper
│   │   ├── pages/PriceList.jsx  ← API calls via helper
│   │   └── ...
│   ├── dist/                    ← Build output
│   └── package.json
│
└── 📂 docker-compose.yml        ← MySQL container definition
```

---

## 🔐 Environment Files Explanation

### Local Development
- **backend/.env.local** → MySQL lokal, port 5000
- **frontend/.env.local** → API pointing ke `http://localhost:5000/api`
- **Auto-loaded:** Backend prioritas .env.local, frontend Vite reads .env.local

### Production (Hostinger)
- **backend/.env.production** → MySQL Hostinger credentials (never commit)
- **frontend/.env.production** → Empty (uses default `/api`)
- **Deployment:** Copy .env.production → .env di backend saat deploy

⚠️ **Security:**
- `.env` files ignored by .gitignore (protected)
- `.env.example` safe to commit (template only)
- Never commit actual credentials!

---

## 🔄 Typical Workflow

### Day-to-Day Development
```
1. Run setup-local-dev.ps1 (first time only)
2. Terminal 1: cd backend && npm run dev
3. Terminal 2: cd frontend && npm run dev
4. Edit code (auto-reload works)
5. Test in browser: http://localhost:5173
6. Commit & push (credentials protected)
```

### Deploy to Hostinger
```
1. npm run build (frontend)
2. Copy frontend/dist → backend/dist
3. Copy .env.production → backend/.env
4. git add, commit, push
5. SSH Hostinger, git pull, restart
6. Test in browser: https://your-domain.com
```

---

## ⚡ Essential Commands

```bash
# Setup (first time)
.\setup-local-dev.ps1              # Windows
bash setup-local-dev.sh            # Linux/Mac

# Backend
cd backend && npm run dev          # Development with auto-reload

# Frontend
cd frontend && npm run dev         # Dev server (port 5173, HMR)
npm run build                      # Build production bundle

# Docker
docker-compose up -d               # Start MySQL
docker-compose down                # Stop MySQL

# Git
git pull origin main               # Get latest
git add . && git commit -m "..."   # Commit
git push origin main               # Push
```

---

## 🆘 Need Help?

| Topic | Where |
|-------|-------|
| First-time setup | → DEVELOPMENT-SETUP.md |
| Daily commands | → QUICK-REFERENCE.md |
| Deploy to Hostinger | → DEPLOYMENT-GUIDE.md |
| API not loading | → DEVELOPMENT-SETUP.md #Troubleshooting |
| Git workflow | → QUICK-REFERENCE.md |
| Database issues | → DEVELOPMENT-SETUP.md #Database |

---

## ✅ Pre-Deployment Checklist

Before pushing to Hostinger:

```
☐ Local testing done (npm run dev both)
☐ No console errors (F12)
☐ All features tested
☐ frontend/dist rebuilt (npm run build)
☐ frontend/dist copied to backend/dist
☐ .env.production is correct
☐ git status shows no .env files
☐ git push successful
☐ SSH to Hostinger: git pull
☐ Node.js app restarted in hPanel
☐ Test live: https://your-domain.com
☐ API endpoints working
☐ Images & styles loading
```

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────┐
│   Browser (localhost:5173 dev)      │
└────────┬────────────────────────────┘
         │ 
         │ Vite HMR for live reload
         │ Proxy: /api → backend:5000
         │
┌────────┴────────────────────────────┐
│   Frontend (React + Vite)           │
│   - src/config/api.js (helper)      │
│   - Env: .env.local or .env.prod    │
│   - Build: npm run build            │
└────────┬────────────────────────────┘
         │ 
         │ /api calls to backend
         │
┌────────┴────────────────────────────┐
│   Backend (Express.js on :5000)     │
│   - server.js (entry point)         │
│   - routes/ controllers/ models/    │
│   - Serves frontend/dist if exists  │
│   - Env: .env.local or .env.prod   │
└────────┬────────────────────────────┘
         │
         │ SQL queries
         │
┌────────┴────────────────────────────┐
│   MySQL Database                    │
│   - Docker container (local)        │
│   - Hostinger DB (production)       │
└─────────────────────────────────────┘
```

---

## 📋 Environment Priority

**Local Development:**
```
backend/.env.local (if exists) → backend/.env
frontend/.env.local (if exists) → vite.config.js default
```

**Production (Hostinger):**
```
backend/.env (.env.production copied here)
frontend/.env.production or default
```

---

## 🔗 Important Files

**Backend Configuration:**
- `backend/config/db.js` — Auto-detect .env.local vs .env
- `backend/server.js` — Express setup + SPA fallback + API routes
- `backend/package.json` — Dependencies + scripts

**Frontend Configuration:**
- `frontend/src/config/api.js` — Centralized API URL helper
- `frontend/vite.config.js` — Vite config + dev proxy
- `frontend/.env.local` — Local dev API URL

---

**Last Updated:** April 2026  
**Status:** ✅ Production Ready + Local Dev Setup Complete

For detailed instructions, read the specific guide files above! 👆
