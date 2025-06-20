const express = require('express');
const path = require('path');

// Force production environment
process.env.NODE_ENV = 'production';

const app = express();
const port = 5000;

console.log('🚀 STARTING PRODUCTION SERVER');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'dist/public'), {
  maxAge: '1y',
  etag: false
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mode: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Production server running on port ${port}`);
  console.log(`📂 Serving from: ${path.join(__dirname, 'dist/public')}`);
});

// Handle process signals
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});