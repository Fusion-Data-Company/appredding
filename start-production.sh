#!/bin/bash

# Production startup script
export NODE_ENV=production

echo "🏗️ Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful, starting production server..."
    npx vite preview --host 0.0.0.0 --port 5000
else
    echo "❌ Build failed, check errors above"
    exit 1
fi