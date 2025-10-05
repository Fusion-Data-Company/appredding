import { type Request, type Response, type NextFunction } from 'express';

/**
 * Security Headers Middleware
 * Adds comprehensive security headers to all responses in production
 */
export function securityHeadersMiddleware(req: Request, res: Response, next: NextFunction) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Content Security Policy - Restricts sources of content
    // Production CSP is strict and does not allow unsafe-inline or unsafe-eval for XSS protection
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' https://js.stripe.com https://maps.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: blob: https: http:",
        "connect-src 'self' https://api.stripe.com https://*.googleapis.com",
        "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
      ].join('; ')
    );

    // Prevent clickjacking attacks
    res.setHeader('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Enable XSS protection (legacy browsers)
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // HTTP Strict Transport Security - Force HTTPS
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );

    // Referrer Policy - Control referrer information
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy - Restrict browser features
    res.setHeader(
      'Permissions-Policy',
      [
        'geolocation=(self)',
        'microphone=()',
        'camera=()',
        'payment=(self)',
        'usb=()',
        'magnetometer=()',
        'gyroscope=()',
        'accelerometer=()'
      ].join(', ')
    );

    // Remove server identification
    res.removeHeader('X-Powered-By');
  } else {
    // Development mode - more permissive for HMR and dev tools
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: https: http:; connect-src 'self' ws: wss: https: http:;"
    );
    res.removeHeader('X-Powered-By');
  }

  next();
}
