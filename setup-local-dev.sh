#!/bin/bash
# 🔧 Setup Local Development - Bash Script
# Run dari root project: bash setup-local-dev.sh

echo "🚀 Setting up Local Development Environment..."
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."
for cmd in node npm docker docker-compose; do
    if command -v $cmd &> /dev/null; then
        version=$($cmd --version)
        echo "✅ $cmd: $version"
    else
        echo "❌ $cmd: NOT INSTALLED"
        exit 1
    fi
done

echo ""
echo "📦 Starting MySQL Docker container..."
docker-compose up -d
sleep 3

# Check MySQL running
if docker ps | grep -q "dealer_mysql"; then
    echo "✅ MySQL container started successfully"
else
    echo "❌ Failed to start MySQL container"
    exit 1
fi

echo ""
echo "📝 Checking .env files..."
[ -f "backend/.env.local" ] && echo "✅ backend/.env.local exists" || echo "❌ backend/.env.local missing!"
[ -f "frontend/.env.local" ] && echo "✅ frontend/.env.local exists" || echo "❌ frontend/.env.local missing!"

echo ""
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..
echo "✅ Backend dependencies installed"

echo ""
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..
echo "✅ Frontend dependencies installed"

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Local development setup complete!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "🚀 Next steps:"
echo ""
echo "Terminal 1 - Backend (port 5000):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend (port 5173):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open browser: http://localhost:5173"
echo ""
echo "📖 For more info, read: DEVELOPMENT-SETUP.md"
