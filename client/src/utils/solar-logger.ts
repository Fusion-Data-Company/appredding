// Structured logging for solar website
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  category: 'hero' | 'funnel' | 'commerce' | 'benefits' | 'contact' | 'system' | 'performance';
  timestamp: string;
  url: string;
  userAgent: string;
  properties?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class SolarLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private createLogEntry(
    level: LogLevel,
    message: string,
    category: LogEntry['category'],
    properties?: Record<string, any>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      category,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      properties,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined
    };
  }

  private log(entry: LogEntry) {
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output with styling
    const style = this.getConsoleStyle(entry.level);
    console.log(
      `%c[Solar ${entry.level.toUpperCase()}] %c${entry.message}`,
      style,
      'color: inherit',
      entry.properties || ''
    );

    // Store in localStorage for debugging
    this.storeLogs();
  }

  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      [LogLevel.ERROR]: 'color: #ff4444; font-weight: bold;',
      [LogLevel.WARN]: 'color: #ffaa00; font-weight: bold;',
      [LogLevel.INFO]: 'color: #4444ff; font-weight: bold;',
      [LogLevel.DEBUG]: 'color: #888888; font-weight: bold;'
    };
    return styles[level];
  }

  private storeLogs() {
    try {
      localStorage.setItem('solar-logs', JSON.stringify(this.logs.slice(-100)));
    } catch (error) {
      console.error('Failed to store logs:', error);
    }
  }

  error(message: string, category: LogEntry['category'], properties?: Record<string, any>, error?: Error) {
    this.log(this.createLogEntry(LogLevel.ERROR, message, category, properties, error));
  }

  warn(message: string, category: LogEntry['category'], properties?: Record<string, any>) {
    this.log(this.createLogEntry(LogLevel.WARN, message, category, properties));
  }

  info(message: string, category: LogEntry['category'], properties?: Record<string, any>) {
    this.log(this.createLogEntry(LogLevel.INFO, message, category, properties));
  }

  debug(message: string, category: LogEntry['category'], properties?: Record<string, any>) {
    if (import.meta.env.DEV) {
      this.log(this.createLogEntry(LogLevel.DEBUG, message, category, properties));
    }
  }

  // Specific logging methods for solar components
  heroLoaded(duration: number) {
    this.info('Hero section loaded', 'hero', { duration });
  }

  funnelStageChanged(stage: string, fromStage?: string) {
    this.info('Funnel stage changed', 'funnel', { stage, fromStage });
  }

  commerceCalculation(type: 'shipping' | 'roi', result: any) {
    this.info('Commerce calculation completed', 'commerce', { type, result });
  }

  benefitsViewed(benefit: string) {
    this.debug('Benefits section viewed', 'benefits', { benefit });
  }

  contactFormSubmitted(formType: string, success: boolean, error?: string) {
    if (success) {
      this.info('Contact form submitted successfully', 'contact', { formType });
    } else {
      this.error('Contact form submission failed', 'contact', { formType, error });
    }
  }

  performanceIssue(metric: string, value: number, threshold: number) {
    this.warn('Performance issue detected', 'performance', { metric, value, threshold });
  }

  systemError(error: Error, context: string) {
    this.error('System error occurred', 'system', { context }, error);
  }

  // Get logs for debugging
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('solar-logs');
  }

  // Export logs as JSON
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const solarLogger = new SolarLogger();

