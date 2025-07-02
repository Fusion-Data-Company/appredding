#!/usr/bin/env node

/**
 * ULTRA EMERGENCY PRODUCTION BUILD
 * Copies essential files directly without building
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚨 ULTRA EMERGENCY PRODUCTION DEPLOYMENT\n');

// Create dist directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath, { recursive: true });

// Step 1: Copy index.html and modify for production
console.log('📄 Creating production index.html...');
let indexHtml = fs.readFileSync('client/index.html', 'utf8');

// Remove Vite dev scripts
indexHtml = indexHtml.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/, '');
indexHtml = indexHtml.replace(/<script type="module" src="\/@vite\/client"><\/script>/, '');

// Add production scripts
const productionScripts = `
    <script>
      // Production error handler
      window.addEventListener('error', function(e) {
        console.error('Runtime error:', e.error);
      });
      
      // Service worker registration
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').catch(() => {});
        });
      }
    </script>
    <script>
      // Basic app initialization
      document.addEventListener('DOMContentLoaded', function() {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0a;color:#fff;font-family:system-ui"><div style="text-align:center"><h1 style="font-size:3rem;margin-bottom:1rem">🚀 Production Mode</h1><p style="font-size:1.5rem;opacity:0.8">Site is being prepared for deployment</p><p style="margin-top:2rem;opacity:0.6">Please run the full build process</p></div></div>';
      });
    </script>
  </body>`;

indexHtml = indexHtml.replace('</body>', productionScripts);
fs.writeFileSync(path.join(distPath, 'index.html'), indexHtml);

// Step 2: Copy static assets
console.log('📁 Copying static assets...');
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
  copyRecursiveSync(publicPath, distPath);
}

// Step 3: Create service worker
console.log('⚙️  Creating service worker...');
const swContent = `
// Production Service Worker
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
`;
fs.writeFileSync(path.join(distPath, 'sw.js'), swContent);

// Step 4: Create production server
console.log('🚀 Creating production server...');
const serverContent = `
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', deployment: 'emergency' });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 EMERGENCY PRODUCTION SERVER RUNNING');
  console.log('   Port: ' + PORT);
  console.log('   Mode: EMERGENCY DEPLOYMENT');
  console.log('');
  console.log('⚠️  This is a minimal deployment for urgent production needs');
  console.log('   Run the full build process when possible');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
`;
fs.writeFileSync('production-server-final.js', serverContent);

// Helper function
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('\n✅ EMERGENCY DEPLOYMENT READY!');
console.log('\nTo deploy:');
console.log('1. Test locally: node production-server-final.js');
console.log('2. Deploy via Replit Deploy button');
console.log('\n⚠️  This is a minimal emergency deployment');
console.log('   Fix TypeScript errors and run full build when possible');