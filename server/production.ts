import express from "express";
import path from "path";
import compression from "compression";

// Set production environment
process.env.NODE_ENV = 'production';

const app = express();
const port = Number(process.env.PORT) || 5000;

// Basic middleware for production
app.use(compression());
app.use(express.json());

// Serve static files from production build
const distPath = path.resolve(process.cwd(), 'dist/public');
app.use(express.static(distPath));

// Basic API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mode: 'production' });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
});