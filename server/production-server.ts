import express from "express";
import path from "path";
import compression from "compression";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Force production environment
process.env.NODE_ENV = 'production';

const app = express();
const port = Number(process.env.PORT) || 5000;


// High-performance middleware
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Optimal static file serving
const distPath = path.resolve(__dirname, '../dist/public');
app.use(express.static(distPath, {
  maxAge: '1y',
  etag: false,
  immutable: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'production',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// SPA fallback with optimized HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
});

// Graceful shutdown
process.on('SIGTERM', () => {
  process.exit(0);
});

process.on('SIGINT', () => {
  process.exit(0);
});