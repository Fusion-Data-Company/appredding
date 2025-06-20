// Emergency production workflow
const { execSync } = require('child_process');
const express = require('express');
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';

console.log('🚀 EMERGENCY PRODUCTION MODE ACTIVATED');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Quick build without framer-motion heavy processing
try {
  console.log('⚡ Fast building production bundle...');
  execSync('npx vite build --mode production --minify esbuild', { 
    stdio: 'inherit',
    timeout: 120000 // 2 minutes max
  });
  
  console.log('✅ Build complete, starting production server...');
  
  // Start production preview server
  execSync('npx vite preview --host 0.0.0.0 --port 5000', { 
    stdio: 'inherit' 
  });
  
} catch (error) {
  console.error('❌ Production build failed:', error.message);
  
  // Fallback: Start with minimal build
  console.log('🔄 Starting simplified production server...');
  
  const app = express();
  app.use(express.static('dist/public'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/public/index.html'));
  });
  
  app.listen(5000, '0.0.0.0', () => {
    console.log('📡 Emergency production server running on port 5000');
  });
}