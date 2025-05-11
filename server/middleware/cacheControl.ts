import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to add cache-control headers based on file type
 * - Static assets (images, fonts, etc.): Cache for 1 year
 * - CSS and JS files: Cache for 1 week
 * - HTML files: No cache
 */
export function cacheControlMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;
  
  // Static assets that rarely change - max cache
  if (path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff2|woff|ttf|eot)$/i)) {
    res.set('Cache-Control', 'max-age=31536000, public'); // 1 year
  }
  // JS and CSS files - shorter cache
  else if (path.match(/\.(js|css|map)$/i)) {
    res.set('Cache-Control', 'max-age=604800, public'); // 1 week
  }
  // HTML files - no cache
  else if (path.match(/\.html$/i)) {
    res.set('Cache-Control', 'no-cache, must-revalidate');
  }
  // API endpoints - no cache
  else if (path.startsWith('/api/')) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  
  next();
}