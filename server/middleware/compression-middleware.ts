import compression from 'compression';
import express from 'express';

/**
 * Configure compression middleware for better performance
 * This reduces the size of the response body and improves load time
 * Supports both gzip and brotli compression
 */
export function setupCompressionMiddleware(app: express.Application) {
  const isProduction = process.env.NODE_ENV === 'production';

  // Configure compression with production-optimized settings
  app.use(compression({
    // Compression level: higher in production for better compression
    // Lower in development for faster rebuilds
    level: isProduction ? 6 : 4,
    
    // Only compress responses larger than 1KB
    threshold: 1024,
    
    // Memory level (1-9): higher values use more memory but compress better
    memLevel: isProduction ? 8 : 6,
    
    // Don't compress responses with these content types
    filter: (req, res) => {
      // Respect x-no-compression header
      if (req.headers['x-no-compression']) {
        return false;
      }
      
      // Skip compression for already compressed formats
      const contentType = res.getHeader('Content-Type') as string;
      if (contentType) {
        // Images, videos, and pre-compressed files
        if (
          contentType.includes('image/') || 
          contentType.includes('video/') ||
          contentType.includes('audio/') ||
          contentType.includes('application/zip') ||
          contentType.includes('application/x-zip') ||
          contentType.includes('application/x-gzip') ||
          contentType.includes('application/octet-stream')
        ) {
          return false;
        }
      }
      
      // Compress text-based content: HTML, CSS, JS, JSON, XML, etc.
      return compression.filter(req, res);
    }
  }));
}