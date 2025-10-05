import { type Request, type Response, type NextFunction } from 'express';

/**
 * Performance Monitoring Middleware
 * Tracks response times and provides performance insights
 */
export function performanceMonitoringMiddleware(req: Request, res: Response, next: NextFunction) {
  const isProduction = process.env.NODE_ENV === 'production';
  const startTime = Date.now();

  // Track response time using finish event (for logging only)
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    // Log slow requests in production (>1000ms)
    if (isProduction && duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
    }
  });

  next();
}

/**
 * Error Handling Middleware
 * Graceful error handling with proper logging
 */
export function errorHandlingMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error details (only in development or for serious errors in production)
  if (!isProduction || statusCode >= 500) {
    console.error('Error:', {
      method: req.method,
      path: req.path,
      status: statusCode,
      message: message,
      stack: err.stack
    });
  }

  // Send appropriate response
  if (isProduction && statusCode >= 500) {
    // Don't leak error details in production
    res.status(statusCode).json({
      success: false,
      error: 'An unexpected error occurred'
    });
  } else {
    // Include details in development or for client errors
    res.status(statusCode).json({
      success: false,
      error: message,
      ...(isProduction ? {} : { stack: err.stack })
    });
  }
}

/**
 * Production Logging Middleware
 * Logs only errors and important events in production
 */
export function productionLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    return next();
  }

  // Only log errors and important events in production
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      console.error(`${req.method} ${req.path} ${res.statusCode}`);
    }
  });

  next();
}
