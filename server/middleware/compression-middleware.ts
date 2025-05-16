import compression from 'compression';
import express from 'express';

/**
 * Configure compression middleware for better performance
 * This reduces the size of the response body and improves load time
 */
export function setupCompressionMiddleware(app: express.Application) {
  // Configure compression with enterprise-level settings
  app.use(compression({
    // Compression level (1-9, where 9 is maximum compression)
    level: 6,
    
    // Only compress responses larger than 1KB
    threshold: 1024,
    
    // Don't compress responses with these content types
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        // Don't compress responses with this request header
        return false;
      }
      
      // Skip compression for already compressed formats
      const contentType = res.getHeader('Content-Type') as string;
      if (contentType) {
        if (
          contentType.includes('image/') || 
          contentType.includes('video/') ||
          contentType.includes('audio/') ||
          contentType.includes('application/zip') ||
          contentType.includes('application/x-zip') ||
          contentType.includes('application/x-gzip')
        ) {
          return false;
        }
      }
      
      // Use compression for all other response types
      return true;
    }
  }));
  
  // Additional headers for performance
  app.use((req, res, next) => {
    // Add cache control headers for static assets
    if (
      req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|webp|svg|woff|woff2|ttf|eot)(\?.*)?$/i)
    ) {
      // Cache static assets for 1 day
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    
    // Set appropriate CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    next();
  });
}