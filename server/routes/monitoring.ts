/**
 * Monitoring and Error Logging Routes
 * Handles client-side error reporting and performance metrics
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

// Schema for error reports
const ErrorReportSchema = z.object({
  errors: z.array(z.object({
    type: z.enum(['promise_rejection', 'js_error', 'network_error', 'api_error']),
    message: z.string(),
    stack: z.string().optional(),
    timestamp: z.number(),
    userAgent: z.string(),
    url: z.string(),
    userId: z.string().optional()
  }))
});

// Schema for performance metrics
const PerformanceMetricsSchema = z.object({
  metrics: z.object({
    pageLoadTime: z.number().optional(),
    firstContentfulPaint: z.number().optional(),
    largestContentfulPaint: z.number().optional(),
    firstInputDelay: z.number().optional(),
    cumulativeLayoutShift: z.number().optional(),
    timeToInteractive: z.number().optional()
  }),
  componentMetrics: z.object({
    name: z.string(),
    renderTime: z.number(),
    rerenderCount: z.number()
  }).optional(),
  timestamp: z.number(),
  url: z.string(),
  userAgent: z.string()
});

// Error logging endpoint
router.post('/api/errors', async (req: Request, res: Response) => {
  try {
    const { errors } = ErrorReportSchema.parse(req.body);

    // Log errors to console for now (in production, you'd want to use a proper logging service)
    errors.forEach(error => {
      console.error(`[CLIENT ERROR] ${error.type}: ${error.message}`, {
        stack: error.stack,
        timestamp: new Date(error.timestamp).toISOString(),
        userAgent: error.userAgent,
        url: error.url,
        userId: error.userId
      });
    });

    // In production, you might want to:
    // 1. Store errors in database
    // 2. Send alerts for critical errors
    // 3. Aggregate error metrics
    // 4. Send to external monitoring service (e.g., Sentry, LogRocket)

    res.status(200).json({ 
      success: true, 
      message: 'Errors logged successfully',
      count: errors.length 
    });

  } catch (error) {
    console.error('Failed to process error reports:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Invalid error report format' 
    });
  }
});

// Performance metrics endpoint
router.post('/api/performance', async (req: Request, res: Response) => {
  try {
    // Handle empty or null body gracefully
    const body = req.body || {};
    
    // Validate that we have the minimum required data
    if (!body.metrics || typeof body.metrics !== 'object') {
      res.status(200).json({ 
        success: true, 
        message: 'Performance metrics skipped - insufficient data' 
      });
      return;
    }
    
    const performanceData = PerformanceMetricsSchema.parse(body);

    // Log performance metrics (removed console.log for production)

    // Check for performance issues
    const { metrics } = performanceData;
    const issues = [];

    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 2500) {
      issues.push(`Slow LCP: ${metrics.largestContentfulPaint}ms`);
    }

    if (metrics.firstInputDelay && metrics.firstInputDelay > 100) {
      issues.push(`High FID: ${metrics.firstInputDelay}ms`);
    }

    if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.1) {
      issues.push(`High CLS: ${metrics.cumulativeLayoutShift}`);
    }

    if (metrics.pageLoadTime && metrics.pageLoadTime > 3000) {
      issues.push(`Slow page load: ${metrics.pageLoadTime}ms`);
    }

    if (issues.length > 0) {
      console.warn(`[PERFORMANCE ISSUES] ${performanceData.url}:`, issues);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Performance metrics logged',
      issues: issues.length > 0 ? issues : undefined
    });

  } catch (error) {
    console.error('Failed to process performance metrics:', error);
    // Return success even if parsing fails to avoid client errors
    res.status(200).json({ 
      success: true, 
      message: 'Performance metrics received' 
    });
  }
});

// Health check endpoint
router.get('/api/health', (req: Request, res: Response) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  };

  res.status(200).json(health);
});

// System status endpoint
router.get('/api/status', (req: Request, res: Response) => {
  const status = {
    server: 'running',
    database: 'connected', // You could add actual DB health check
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    pid: process.pid
  };

  res.status(200).json(status);
});

export default router;