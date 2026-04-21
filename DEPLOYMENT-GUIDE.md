# 📤 Deployment Checklist - Push to Hostinger

## Pre-Deployment Verification

Pastikan sudah commit semua changes yang ingin di-deploy:

```bash
git status
git add .
git commit -m "Your meaningful commit message"
```

---

## ✅ Step-by-Step Deployment

### 1️⃣ Build Frontend untuk Production

```bash
cd frontend

# Build dengan .env.production settings
npm run build

# Output: frontend/dist/ dengan bundle production-ready
# Verify: frontend/dist/index.html harus ada
```

### 2️⃣ Copy Frontend Build ke Backend

```bash
# Dari root project folder

# Windows:
Remove-Item "backend/dist" -Recurse -Force
Copy-Item "frontend/dist/*" -Destination "backend/dist" -Recurse

# Linux/Mac:
rm -rf backend/dist
cp -r frontend/dist backend/dist
```

**Verify:** 
- `backend/dist/index.html` harus ada
- `backend/dist/assets/` folder ada
- Timestamp files harus baru (sama dengan build time)

### 3️⃣ Switch Backend ke Production Credentials

```bash
# Windows:
Copy-Item "backend/.env.production" -Destination "backend/.env" -Force

# Linux/Mac:
cp backend/.env.production backend/.env
```

**WARNING:** 
- Jangan modify credentials di .env.production
- Jangan accidentally commit .env ke Git
- .gitignore sudah protect, tapi double-check

### 4️⃣ Commit Changes

```bash
git add backend/dist backend/.env.example
git commit -m "Deploy: rebuild frontend bundle for Hostinger"
git push origin main
```

**IMPORTANT:**
- `.env` file tidak akan di-commit (protected by .gitignore)
- Hanya `.env.example` akan di-commit sebagai template
- Production credentials tetap aman

### 5️⃣ SSH ke Hostinger & Deploy

Dari hPanel atau terminal Hostinger:

```bash
# SSH ke aplikasi Node.js di Hostinger
ssh [hostinger-user]@[hostinger-host]

# Navigate ke app directory
cd /home/[user]/public_html atau path_sesuai_hPanel

# Pull latest code
git pull origin main

# Install dependencies (jika ada changes)
npm install

# Restart aplikasi Node.js
# (Dari hPanel atau pakai CLI Hostinger)
```

---

## ✅ Post-Deployment Verification

Setelah deploy, verify di production:

```bash
# 1. Check API health
curl https://your-domain.com/api/health

# 2. Check database connection
curl https://your-domain.com/api/test

# 3. Check data loading
curl https://your-domain.com/api/cars

# 4. Test frontend
# Open browser: https://your-domain.com
# Test routes: /price-list, /detail/xpander
# Verify images load
# Verify API calls work
```

---

## ⚠️ Common Issues & Solutions

### Issue: 404 pada route frontend

**Cause:** React SPA fallback tidak jalan  
**Solution:**
- Verify `backend/dist/index.html` ada
- Restart Node.js app di hPanel
- Check backend/server.js fallback route

### Issue: API calls 404

**Cause:** Distancer `/api` tidak diresolve ke backend  
**Solution:**
- Verify `VITE_API_BASE_URL` kosong di `.env.production` (pakai default `/api`)
- Check frontend/src/config/api.js logic
- Hard refresh browser (Ctrl+Shift+R)

### Issue: Database connection error

**Cause:** Production credentials tidak tepat  
**Solution:**
- Verify `backend/.env` memiliki Hostinger credentials
- Check DB user permission di hPanel
- Restart Node.js app
- Cek hPanel MySQL logs

### Issue: Static files (images, CSS) tidak load

**Cause:** `backend/dist` tidak di-copy dengan benar  
**Solution:**
- Re-copy `frontend/dist` ke `backend/dist`
- Verify files ada: `backend/dist/assets/`, images, etc
- Restart Node.js app
- Hard refresh browser

---

## 🔄 Local Development after Deployment

Setelah deploy, jangan lupa switch balik ke local credentials:

```bash
# Jangan perlu action - sudah automatic!
# Backend akan auto-load .env.local saat npm run dev

cd backend
npm run dev

# Output akan keliatan:
# Loading environment from: ./backend/.env.local
# ✅ Berhasil terhubung ke database MySQL mitsubishi_dealer
```

---

## 🛟 Emergency Rollback

Jika ada problem di production:

```bash
# Revert ke commit sebelumnya
git revert [commit-hash]
git push origin main

# Atau hard reset (HATI-HATI!)
git reset --hard [previous-commit]
git push --force origin main

# Rebuild dan re-deploy
npm run build
[copy dist, switch .env, commit, push]
```

---

## 📋 Deployment Workflow Summary

```
┌─────────────────────────────────────────┐
│ 1. npm run build (di frontend)          │
│    Output: frontend/dist/               │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 2. Copy frontend/dist → backend/dist    │
│    Verify backend/dist punya files      │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 3. cp backend/.env.production → .env    │
│    Verify DB credentials siap           │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 4. git add, commit, push                │
│    .env protected by .gitignore         │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 5. SSH Hostinger, git pull, restart     │
│    Node.js app auto-load .env           │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│ 6. Test: API, Frontend, Images          │
│    Profit! 🎉                           │
└─────────────────────────────────────────┘
```

---

## 💾 Backup & Safety

Sebelum deploy production:

1. Backup database di Hostinger
2. Note production .env credentials secure
3. Keep .env.production file safe locally (tidak di-commit)
4. Test semua di local dulu sebelum push

Selamat deploy! 🚀
