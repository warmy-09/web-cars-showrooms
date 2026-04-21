# ⚡ Quick Reference - Daily Development Commands

## 🚀 Start Development (First time)

```bash
# Run setup script (automatic setup all)
.\setup-local-dev.ps1          # Windows
bash setup-local-dev.sh         # Linux/Mac

# Then start in 2 terminals:
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# Open: http://localhost:5173
```

---

## 🔧 Daily Development

### Backend

```bash
cd backend

npm run dev          # Start with auto-reload (nodemon)
npm run start        # Run production mode
npm install          # Install/update dependencies
```

**API Base:** `http://localhost:5000`

Test endpoints:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/test
curl http://localhost:5000/api/cars
```

### Frontend

```bash
cd frontend

npm run dev          # Start dev server (port 5173, HMR enabled)
npm run build        # Build production bundle
npm run lint         # Run ESLint
npm install          # Install/update dependencies
```

**Dev Preview:** `http://localhost:5173`  
**Proxy API:** `/api` → `http://localhost:5000/api` (automatic)

---

## 🐳 Docker Commands

```bash
# Start MySQL
docker-compose up -d

# Stop MySQL
docker-compose down

# View logs
docker-compose logs -f mysql-db

# Restart
docker-compose restart

# Check status
docker ps | grep dealer_mysql
```

---

## 🔄 Git Workflow

```bash
# Check status
git status

# Pull latest
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Commit changes
git add .
git commit -m "feat: description of changes"

# Push
git push origin feature/your-feature-name

# Create Pull Request (via GitHub/GitLab)
```

---

## 📤 Deploy to Hostinger

```bash
# 1. Build frontend
cd frontend && npm run build

# 2. Copy dist to backend
Copy-Item "frontend/dist/*" -Destination "backend/dist" -Recurse -Force

# 3. Switch to production .env
Copy-Item "backend/.env.production" -Destination "backend/.env" -Force

# 4. Commit
git add backend/dist
git commit -m "Deploy: rebuild frontend bundle"
git push origin main

# 5. Deploy (via Hostinger hPanel or SSH)
# [Instructions from Hostinger]
```

---

## 🐛 Debugging

### Backend Logs

```bash
# Current running backend logs
npm run dev

# Check specific issues
curl http://localhost:5000/api/health
curl http://localhost:5000/api/test
```

### Frontend Logs

```bash
# Browser console (F12 → Console tab)
# Watch HMR updates in terminal

# Check API calls
# Browser DevTools → Network tab
# Filter by "api" or "cars"
```

### Database

```bash
# SSH to Hostinger MySQL (if needed)
mysql -h 127.0.0.1 -u u649635179_zakzak -p

# Query example
SELECT * FROM cars LIMIT 5;
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend port already in use | `netstat -ano \| find "5000"` then kill PID |
| Frontend port 5173 taken | Change port in vite.config.js |
| MySQL connection error | `docker-compose logs mysql-db` |
| API CORS error | Check vite.config.js proxy settings |
| `.env` changes not loaded | Restart backend (Ctrl+C, then npm run dev) |
| Build errors after git pull | `npm install` di backend dan frontend |

---

## 📝 File Locations

```
project-web/
├── backend/
│   ├── .env              ← Production credentials (ignored in Git)
│   ├── .env.local        ← Local dev credentials
│   ├── .env.production   ← Production credentials (reference)
│   ├── .env.example      ← Template (safe to commit)
│   ├── server.js         ← API entry point
│   ├── dist/             ← Frontend build (copied from frontend/dist)
│   └── package.json
│
├── frontend/
│   ├── .env.local        ← Local dev env
│   ├── .env.production   ← Production env
│   ├── .env.example      ← Template
│   ├── src/              ← React source
│   ├── dist/             ← Build output
│   ├── vite.config.js    ← Vite config (includes proxy)
│   └── package.json
│
├── DEVELOPMENT-SETUP.md  ← Detailed setup guide
├── DEPLOYMENT-GUIDE.md   ← Production deployment steps
└── setup-local-dev.ps1   ← Auto-setup script
```

---

## ✅ Checklist before Commit

```
☐ npm run dev works backend
☐ npm run dev works frontend  
☐ No console errors (F12)
☐ API calls working (Network tab)
☐ Feature tested locally
☐ git status shows only intended changes
☐ .env files NOT listed in git add
☐ Have I updated DEVELOPMENT-SETUP.md if steps changed?
```

---

🎯 **Pro Tips:**

1. **Auto-reload:** Backend uses nodemon, Frontend uses HMR (hot)
2. **Proxy:** Frontend requests to `/api` auto-forward to backend:5000
3. **Environment:** `.env.local` priority over `.env` for local dev
4. **Production:** Credentials safe in `.env.production` (never committed)
5. **Database:** MySQL container runs in background (docker-compose)

For more details, read: **DEVELOPMENT-SETUP.md** or **DEPLOYMENT-GUIDE.md**
