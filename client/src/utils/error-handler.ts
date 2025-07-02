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

  constructor() {
    this.initializeErrorHandlers();
    this.startPeriodicFlush();
  }

  private initializeErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      
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
          this.reportError({
            type: 'network_error',
            message: `HTTP ${response.status}: ${response.statusText}`,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: args[0]?.toString() || 'unknown'
          });
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

  private reportError(errorReport: ErrorReport) {
    // Add to queue
    this.errorQueue.push(errorReport);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log to console for development
    if (import.meta.env.DEV) {
      console.error('Error captured:', errorReport);
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
        console.warn('Failed to flush errors to backend:', error);
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