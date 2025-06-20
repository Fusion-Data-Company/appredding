// Emergency production server bypass
const express = require('express');
const path = require('path');

process.env.NODE_ENV = 'production';

const app = express();
const port = 5000;

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist/public')));

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 PRODUCTION SERVER ACTIVE on port ${port}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`No HMR, no dev tools, optimized bundle only`);
});