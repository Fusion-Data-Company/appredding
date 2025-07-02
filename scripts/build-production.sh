#!/bin/bash
echo "Building production bundle with optimizations..."

# Set production environment
export NODE_ENV=production

# Build client with optimizations
echo "Building client..."
vite build --mode production

# Build server with optimizations  
echo "Building server..."
esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --minify \
  --tree-shaking

echo "✅ Production build complete"
echo "📂 Client build: dist/public/"
echo "📂 Server build: dist/index.js"
