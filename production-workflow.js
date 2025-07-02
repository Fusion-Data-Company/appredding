#!/usr/bin/env node

/**
 * PRODUCTION DEPLOYMENT WORKFLOW FOR REPLIT
 * Optimized for Replit's deployment environment
 */

import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DIST_PATH = path.join(__dirname, 'dist');

// Check if dist directory exists
if (!fs.existsSync(DIST_PATH)) {
  console.error('❌ ERROR: dist directory not found!');
  console.error('   Run "npm run build" first');
  process.exit(1);
}

// Create Express app
const app = express();

// Enable aggressive compression
app.use(compression({ 
  level: 9,
  threshold: 0,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Security headers
app.use((req, res, next) => {
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HSTS for production
  if (IS_PRODUCTION) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "media-src 'self' blob:",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  res.setHeader('Content-Security-Policy', csp);
  next();
});

// Serve static files with optimal caching
const oneYear = 365 * 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;

app.use(express.static(DIST_PATH, {
  maxAge: oneYear,
  etag: true,
  lastModified: true,
  index: false,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // HTML files should not be cached
    if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    // JavaScript and CSS files with hash
    else if (ext === '.js' || ext === '.css') {
      // If filename contains hash, cache forever
      if (filePath.includes('.') && /\.[a-f0-9]{8}\./.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
    // Images and fonts
    else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
    // Everything else
    else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes (if any)
app.use('/api', (req, res, next) => {
  // Add API-specific headers
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'), {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 PRODUCTION SERVER STARTED');
  console.log(`   Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://0.0.0.0:${PORT}`);
  console.log('');
  console.log('📊 Server Configuration:');
  console.log(`   ✓ Compression: Level 9`);
  console.log(`   ✓ Security headers: Enabled`);
  console.log(`   ✓ Static caching: Optimized`);
  console.log(`   ✓ SPA routing: Configured`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});