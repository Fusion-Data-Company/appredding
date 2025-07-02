#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 PRODUCTION BUILD INITIATED\n');

// Step 1: Set environment to production
process.env.NODE_ENV = 'production';

// Step 2: Clean previous builds
console.log('🧹 Cleaning previous builds...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Step 3: Run TypeScript check
console.log('📝 Checking TypeScript...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript check passed\n');
} catch (error) {
  console.error('❌ TypeScript errors found. Fix them before production build.');
  process.exit(1);
}

// Step 4: Build the application
console.log('🔨 Building production bundle...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Step 5: Analyze bundle size
console.log('📊 Analyzing bundle size...');
const distPath = path.join(process.cwd(), 'dist');
let totalSize = 0;

function getDirectorySize(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
}

if (fs.existsSync(distPath)) {
  getDirectorySize(distPath);
  const sizeInMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`   Total bundle size: ${sizeInMB} MB`);
  
  if (totalSize > 500 * 1024) { // 500KB limit
    console.warn(`⚠️  WARNING: Bundle size exceeds 500KB target!`);
  } else {
    console.log(`✅ Bundle size within target`);
  }
}

// Step 6: Create production server
console.log('\n📦 Creating production server...');
const productionServer = `
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");
  next();
});

// Serve static files with proper caching
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`🚀 Production server running on port \${PORT}\`);
  console.log(\`   Visit: http://localhost:\${PORT}\`);
});
`;

fs.writeFileSync('production-server.js', productionServer);
console.log('✅ Production server created\n');

// Step 7: Final report
console.log('🎉 PRODUCTION BUILD COMPLETE!');
console.log('\nTo start the production server:');
console.log('   node production-server.js');
console.log('\nOr use the npm script:');
console.log('   npm run start:production');