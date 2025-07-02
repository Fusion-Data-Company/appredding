#!/bin/bash
echo "🧪 Testing production build..."

if [ ! -f "dist/index.js" ]; then
    echo "❌ Server build not found"
    exit 1
fi

if [ ! -f "dist/public/index.html" ]; then
    echo "❌ Client build not found"
    exit 1
fi

echo "✅ Production files verified"
echo "🚀 Start with: NODE_ENV=production node dist/index.js"
echo "📊 Expected LCP: <500ms (emergency build)"
