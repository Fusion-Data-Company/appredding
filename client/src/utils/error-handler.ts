/**
 * Global Error Handler for Solar Energy Platform
 * Addresses unhandled promise rejections and provides better error tracking
 */

export interface ErrorReport {
  type: 'promise_rejection' | 'js_error' | 'network_error' | 'api_error';
  message: string;
  stack?: string;
  timestamp: number;
  userAgent: string;
  url: string;
  userId?: string;
}

class ErrorHandler {
  private errorQueue: ErrorReport[] = [];
  private maxQueueSize = 50;
  private flushInterval = 5000; // 5 seconds
  private errorCounts: Map<string, { count: number; lastReported: number }> = new Map();
  private rateLimitWindow = 10000; // 10 seconds
  private maxErrorsPerWindow = 5;

  // Development-only error patterns to filter out  
  private devErrorPatterns = [
    /Script error/i, // Generic cross-origin script errors (any variation)
    /vscode/i,
    /extension/i,
    /stagewise/i,
    /toolbar/i,
    /ResizeObserver loop/i,
    /Non-Error promise rejection captured with value/i,
    /__vite/i,
    /Failed to fetch dynamically imported module/i, // Vite HMR errors
    /discoverVSCodeWindows/i, // VSCode integration errors
    /An uncaught exception/i, // Generic uncaught exceptions without details
  ];

  constructor() {
    this.initializeErrorHandlers();
    this.startPeriodicFlush();
  }

  private initializeErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {

      this.reportError({
        type: 'promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });

      // Prevent the default browser behavior
      event.preventDefault();
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError({
        type: 'js_error',
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Handle network errors for fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        if (!response.ok) {
          const url = args[0]?.toString() || 'unknown';
          
          // Don't report expected 401 errors on auth endpoints
          const isExpected401 = response.status === 401 && url.includes('/api/user');
          
          if (!isExpected401) {
            this.reportError({
              type: 'network_error',
              message: `HTTP ${response.status}: ${response.statusText}`,
              timestamp: Date.now(),
              userAgent: navigator.userAgent,
              url
            });
          }
        }
        
        return response;
      } catch (error) {
        this.reportError({
          type: 'network_error',
          message: error instanceof Error ? error.message : 'Network request failed',
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: args[0]?.toString() || 'unknown'
        });
        throw error;
      }
    };
  }

  private shouldFilterError(message: string): boolean {
    // Filter out development-only errors
    if (import.meta.env.DEV) {
      return this.devErrorPatterns.some(pattern => pattern.test(message));
    }
    return false;
  }

  private getErrorKey(errorReport: ErrorReport): string {
    // Create a unique key for deduplication
    return `${errorReport.type}:${errorReport.message}`;
  }

  private shouldReportError(errorKey: string): boolean {
    const now = Date.now();
    const errorRecord = this.errorCounts.get(errorKey);

    if (!errorRecord) {
      this.errorCounts.set(errorKey, { count: 1, lastReported: now });
      return true;
    }

    // Reset counter if outside the rate limit window
    if (now - errorRecord.lastReported > this.rateLimitWindow) {
      this.errorCounts.set(errorKey, { count: 1, lastReported: now });
      return true;
    }

    // Increment count
    errorRecord.count++;

    // Check if we've exceeded the rate limit
    if (errorRecord.count > this.maxErrorsPerWindow) {
      return false;
    }

    return true;
  }

  private reportError(errorReport: ErrorReport) {
    // Filter out development noise
    if (this.shouldFilterError(errorReport.message)) {
      return;
    }

    // Check rate limiting and deduplication
    const errorKey = this.getErrorKey(errorReport);
    if (!this.shouldReportError(errorKey)) {
      return;
    }

    // Add to queue
    this.errorQueue.push(errorReport);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log to console for development
    if (import.meta.env.DEV) {
      console.error('[Error Handler]', errorReport.type, errorReport.message);
    }
  }

  private async flushErrors() {
    if (this.errorQueue.length === 0) return;

    const errorsToFlush = [...this.errorQueue];
    this.errorQueue = [];

    try {
      // Send errors to backend for logging
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors: errorsToFlush }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (import.meta.env.DEV) {
      }
    } catch (error) {
      // If we can't send errors, add them back to queue
      this.errorQueue.unshift(...errorsToFlush);
      if (import.meta.env.DEV) {
        
      }
    }
  }

  private startPeriodicFlush() {
    setInterval(() => {
      this.flushErrors();
    }, this.flushInterval);
  }

  // Public method to manually report errors
  public reportManualError(message: string, type: ErrorReport['type'] = 'js_error') {
    this.reportError({
      type,
      message,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }

  // Get error statistics
  public getErrorStats() {
    const stats = {
      total: this.errorQueue.length,
      byType: {} as Record<string, number>
    };

    this.errorQueue.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
    });

    return stats;
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();

// Export for manual error reporting
export const reportError = (message: string, type?: ErrorReport['type']) => {
  errorHandler.reportManualError(message, type);
};