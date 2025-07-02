/**
 * PHASE 0.9 POST-OPTIMIZATION DIAGNOSTIC SUITE
 * Comprehensive runtime profiling and bottleneck detection
 */

interface DiagnosticResults {
  pageLoadEvents: {
    ttfb: number;
    domContentLoaded: number;
    lcp: number;
    fid: number;
    firstPaint: number;
  };
  networkRequests: Array<{
    url: string;
    responseTime: number;
    status: number;
    size: number;
    type: string;
  }>;
  reactLoopCheck: boolean;
  memoryUsage: number;
  buildMode: string;
  buildTime: number;
  keySuspects: string[];
}

export class Phase09Diagnostics {
  private results: Partial<DiagnosticResults> = {};
  private startTime = performance.now();
  private networkRequests: any[] = [];

  constructor() {
    this.initializeNetworkMonitoring();
    this.setupPerformanceMarks();
  }

  private initializeNetworkMonitoring() {
    // Override fetch to monitor network requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = typeof args[0] === 'string' ? args[0] : args[0].url;
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        this.networkRequests.push({
          url,
          responseTime,
          status: response.status,
          size: parseInt(response.headers.get('content-length') || '0'),
          type: 'fetch',
          timestamp: endTime
        });
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        this.networkRequests.push({
          url,
          responseTime: endTime - startTime,
          status: 0,
          size: 0,
          type: 'fetch-error',
          timestamp: endTime
        });
        throw error;
      }
    };

    // Monitor XHR requests
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url) {
      this._startTime = performance.now();
      this._url = url;
      return originalXHROpen.apply(this, arguments as any);
    };
    
    XMLHttpRequest.prototype.send = function() {
      const xhr = this;
      const originalOnLoad = this.onload;
      
      this.onload = function() {
        const endTime = performance.now();
        const responseTime = endTime - (xhr._startTime || 0);
        
        Phase09Diagnostics.getInstance().networkRequests.push({
          url: xhr._url,
          responseTime,
          status: xhr.status,
          size: xhr.responseText?.length || 0,
          type: 'xhr',
          timestamp: endTime
        });
        
        if (originalOnLoad) originalOnLoad.apply(this, arguments as any);
      };
      
      return originalXHRSend.apply(this, arguments as any);
    };
  }

  private setupPerformanceMarks() {
    performance.mark('diagnostic-start');
    
    // Mark key events
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        performance.mark('dom-content-loaded');
      });
    } else {
      performance.mark('dom-content-loaded');
    }
  }

  private static instance: Phase09Diagnostics;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Phase09Diagnostics();
    }
    return this.instance;
  }

  async runFullDiagnostics(): Promise<DiagnosticResults> {
    
    // 1. Runtime Profiling
    await this.capturePageLoadEvents();
    
    // 2. Network Snapshot
    this.captureNetworkRequests();
    
    // 3. React Loop Check
    this.checkForReactLoops();
    
    // 4. Memory Profiling
    this.captureMemoryUsage();
    
    // 5. Build Mode Detection
    this.detectBuildMode();
    
    // 6. Analyze Key Suspects
    this.identifyKeySuspects();
    
    this.printResults();
    return this.results as DiagnosticResults;
  }

  private async capturePageLoadEvents() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    // Get Web Vitals if available
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    
    // Get LCP from observer
    let lcpValue = 0;
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcpValue = lastEntry.startTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        
      }
    }

    this.results.pageLoadEvents = {
      ttfb: navigation.responseStart - navigation.requestStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      lcp: lcpValue || (performance.now() - navigation.navigationStart),
      fid: 0, // Will be captured on first interaction
      firstPaint: firstPaint?.startTime || 0
    };
  }

  private captureNetworkRequests() {
    // Get all resource timing entries
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const networkRequests = resourceEntries.map(entry => ({
      url: entry.name,
      responseTime: entry.responseEnd - entry.requestStart,
      status: 200, // Resource timing doesn't provide status
      size: entry.transferSize || 0,
      type: entry.initiatorType
    }));

    // Add monitored fetch/xhr requests
    networkRequests.push(...this.networkRequests);

    this.results.networkRequests = networkRequests
      .filter(req => req.responseTime > 0)
      .sort((a, b) => b.responseTime - a.responseTime);
  }

  private checkForReactLoops() {
    // Simple React loop detection by monitoring render frequency
    let renderCount = 0;
    const startTime = Date.now();
    
    // Hook into React DevTools if available
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const originalOnCommit = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot;
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function(...args) {
        renderCount++;
        if (originalOnCommit) originalOnCommit.apply(this, args);
      };
    }

    // Check after 1 second
    setTimeout(() => {
      const renderRate = renderCount / ((Date.now() - startTime) / 1000);
      this.results.reactLoopCheck = renderRate < 10; // Less than 10 renders per second
      
      if (renderRate > 10) {
        } renders/sec`);
      }
    }, 1000);
  }

  private captureMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.results.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    } else {
      this.results.memoryUsage = 0;
    }
  }

  private detectBuildMode() {
    this.results.buildMode = import.meta.env.DEV ? 'Development' : 'Production';
    this.results.buildTime = performance.now() - this.startTime;
  }

  private identifyKeySuspects() {
    const suspects: string[] = [];
    
    // Check for slow network requests
    const slowRequests = this.results.networkRequests?.filter(req => req.responseTime > 500) || [];
    if (slowRequests.length > 0) {
      suspects.push(`${slowRequests.length} slow network requests (>500ms)`);
      slowRequests.forEach(req => {
        suspects.push(`  - ${req.url}: ${req.responseTime.toFixed(0)}ms`);
      });
    }

    // Check for high memory usage
    if (this.results.memoryUsage && this.results.memoryUsage > 50) {
      suspects.push(`High memory usage: ${this.results.memoryUsage.toFixed(1)}MB`);
    }

    // Check for slow LCP
    if (this.results.pageLoadEvents?.lcp && this.results.pageLoadEvents.lcp > 2500) {
      suspects.push(`Slow LCP: ${this.results.pageLoadEvents.lcp.toFixed(0)}ms (target: <2500ms)`);
    }

    // Check for development mode
    if (this.results.buildMode === 'Development') {
      suspects.push('Running in development mode (significant overhead)');
    }

    this.results.keySuspects = suspects;
  }

  private printResults() {
    const r = this.results;

    r.networkRequests?.slice(0, 10).forEach(req => {
      const sizeKB = (req.size / 1024).toFixed(1);
      const status = req.status || 'UNKNOWN';
    });

    if (r.keySuspects?.length) {
    } else {
    }
    
  }
}

// Auto-initialize when module loads
export const diagnostics = Phase09Diagnostics.getInstance();

// Auto-run diagnostics after page load
if (document.readyState === 'complete') {
  setTimeout(() => diagnostics.runFullDiagnostics(), 1000);
} else {
  window.addEventListener('load', () => {
    setTimeout(() => diagnostics.runFullDiagnostics(), 1000);
  });
}