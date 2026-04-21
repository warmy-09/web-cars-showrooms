# 🔧 Setup Local Development - PowerShell Script
# Run dari root project: .\setup-local-dev.ps1

Write-Host "🚀 Setting up Local Development Environment..." -ForegroundColor Green
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Blue
$checks = @{
    "Node.js" = { node --version }
    "npm" = { npm --version }
    "Docker" = { docker --version }
    "Docker Compose" = { docker-compose --version }
}

$allGood = $true
foreach ($check in $checks.GetEnumerator()) {
    try {
        $version = & $check.Value 2>&1
        Write-Host "✅ $($check.Name): $version" -ForegroundColor Green
    } catch {
        Write-Host "❌ $($check.Name): NOT INSTALLED" -ForegroundColor Red
        $allGood = $false
    }
}

if (-not $allGood) {
    Write-Host ""
    Write-Host "❌ Please install missing prerequisites first!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Starting MySQL Docker container..." -ForegroundColor Blue
docker-compose up -d
Start-Sleep -Seconds 3

# Check MySQL running
$mysqlRunning = docker ps | Select-String "dealer_mysql"
if ($mysqlRunning) {
    Write-Host "✅ MySQL container started successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to start MySQL container" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📝 Checking .env files..." -ForegroundColor Blue

# Backend .env.local
if (Test-Path "backend\.env.local") {
    Write-Host "✅ backend\.env.local exists" -ForegroundColor Green
} else {
    Write-Host "❌ backend\.env.local missing!" -ForegroundColor Red
}

# Frontend .env.local
if (Test-Path "frontend\.env.local") {
    Write-Host "✅ frontend\.env.local exists" -ForegroundColor Green
} else {
    Write-Host "❌ frontend\.env.local missing!" -ForegroundColor Red
}

Write-Host ""
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Blue
Push-Location backend
npm install
Pop-Location
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Blue
Push-Location frontend
npm install
Pop-Location
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Local development setup complete!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 - Backend (port 5000):" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Frontend (port 5173):" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open browser: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 For more info, read: DEVELOPMENT-SETUP.md" -ForegroundColor Yellow
