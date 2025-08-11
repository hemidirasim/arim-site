#!/bin/bash

# ARIM Website Deployment Script
echo "🚀 ARIM Website Deployment başlayır..."

# Environment variables
export NODE_ENV=production
export DATABASE_URL="postgresql://arimgh_1:aiYjFDtNxRrVdXN2@j2he.your-database.de:5432/arimgh_db1"
export NEXTAUTH_SECRET="arim-production-secret-key-2025"
export NEXTAUTH_URL="https://your-domain.com"

# Install dependencies
echo "📦 Dependencies yüklənir..."
npm ci --only=production

# Generate Prisma client
echo "🗄️ Prisma client yaradılır..."
npx prisma generate

# Build the application
echo "🔨 Application build edilir..."
npm run build

# Start the application
echo "🌟 Application başladılır..."
npm start
