import { type Request, type Response, type NextFunction } from 'express';

/**
 * Intelligent Caching Strategy Middleware
 * Implements cache-control headers based on resource type
 */
export function cachingMiddleware(req: Request, res: Response, next: NextFunction) {
  const isProduction = process.env.NODE_ENV === 'production';
  const path = req.path;

  // API routes - no caching for dynamic data
  if (path.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return next();
  }

  // Static assets with versioned filenames (hashed) - aggressive caching
  if (path.match(/\.(js|css|woff|woff2|ttf|eot|otf)$/i) && path.includes('-')) {
    // Immutable assets can be cached for a year
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return next();
  }

  // Images and media files - long-term caching
  if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|mp4|webm|pdf)$/i)) {
    if (isProduction) {
      // Cache for 30 days in production
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    } else {
      // Shorter cache in development for easier updates
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
    return next();
  }

  // Font files - long-term caching
  if (path.match(/\.(woff|woff2|ttf|eot|otf)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    return next();
  }

  // HTML files - no cache but allow revalidation
  if (path.endsWith('.html') || path === '/' || !path.includes('.')) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    return next();
  }

  // JavaScript and CSS without hash - moderate caching
  if (path.match(/\.(js|css)$/i)) {
    if (isProduction) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }
    return next();
  }

  // Default - no cache
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  next();
}

/**
 * ETag support for validation-based caching
 */
export function etagMiddleware(req: Request, res: Response, next: NextFunction) {
  // Enable ETags for all responses
  // Express automatically generates weak ETags for responses
  // This allows browsers to use If-None-Match for validation
  
  // Check if client sent If-None-Match header
  const clientETag = req.headers['if-none-match'];
  if (clientETag) {
    // Store for later comparison
    res.locals.clientETag = clientETag;
  }

  next();
}
