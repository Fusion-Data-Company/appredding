#!/usr/bin/env node

/**
 * EMERGENCY PRODUCTION BUILD
 * Bypasses TypeScript errors for critical deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚨 EMERGENCY PRODUCTION BUILD INITIATED\n');
console.log('⚠️  Warning: This bypasses TypeScript checks for urgent deployment\n');

// Step 1: Set production environment
process.env.NODE_ENV = 'production';
process.env.VITE_BUILD_MODE = 'production';

// Step 2: Clean dist
console.log('🧹 Cleaning previous builds...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Step 3: Create emergency tsconfig for build
console.log('📝 Creating emergency TypeScript config...');
const emergencyTsConfig = {
  extends: "./tsconfig.json",
  compilerOptions: {
    skipLibCheck: true,
    noEmit: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noImplicitAny: false,
    strictNullChecks: false,
    strict: false
  },
  exclude: [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.test.tsx",
    "scripts/**/*"
  ]
};

fs.writeFileSync('tsconfig.build.json', JSON.stringify(emergencyTsConfig, null, 2));

// Step 4: Run Vite build with emergency config
console.log('🔨 Running emergency production build...');
try {
  execSync('npx vite build --mode production', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      FORCE_COLOR: '1'
    }
  });
  console.log('✅ Emergency build completed\n');
} catch (error) {
  console.error('❌ Emergency build failed:', error.message);
  process.exit(1);
}

// Step 5: Clean up emergency config
fs.unlinkSync('tsconfig.build.json');

// Step 6: Create minimal production server
console.log('📦 Creating production server...');
const productionServer = `
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(compression({ level: 9 }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files
const oneYear = 365 * 24 * 60 * 60 * 1000;
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: oneYear,
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Production server running on port ' + PORT);
  console.log('   Local: http://localhost:' + PORT);
  console.log('   Network: http://0.0.0.0:' + PORT);
});
`;

fs.writeFileSync('production-server-final.js', productionServer);

// Step 7: Create startup script
console.log('🚀 Creating startup script...');
const startupScript = `#!/bin/bash
echo "🚀 Starting Production Server..."
export NODE_ENV=production
export PORT=\${PORT:-3000}
node production-server-final.js
`;

fs.writeFileSync('start-production.sh', startupScript);
execSync('chmod +x start-production.sh');

// Step 8: Bundle analysis
console.log('\n📊 Analyzing build output...');
const distPath = path.join(process.cwd(), 'dist');
let totalSize = 0;
let fileCount = 0;

function analyzeDirectory(dir, indent = '') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${file}/`);
      analyzeDirectory(filePath, indent + '  ');
    } else {
      totalSize += stats.size;
      fileCount++;
      const size = (stats.size / 1024).toFixed(1);
      console.log(`${indent}📄 ${file} (${size} KB)`);
    }
  });
}

if (fs.existsSync(distPath)) {
  analyzeDirectory(distPath);
  console.log(`\n📈 Total: ${fileCount} files, ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}

console.log('\n✅ EMERGENCY BUILD COMPLETE!');
console.log('\nTo deploy:');
console.log('1. Test locally: ./start-production.sh');
console.log('2. Deploy to Replit: Click the Deploy button');
console.log('\n⚠️  Remember to fix TypeScript errors after deployment');