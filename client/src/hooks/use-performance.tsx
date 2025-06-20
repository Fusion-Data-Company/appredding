/**
 * Performance Monitoring Hook
 * Tracks page performance, component render times, and user interactions
 */

import { useEffect, useRef, useState } from 'react';
import { reportError } from '@/utils/error-handler';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

interface ComponentMetrics {
  name: string;
  renderTime: number;
  rerenderCount: number;
}

export function usePerformance(componentName?: string) {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [componentMetrics, setComponentMetrics] = useState<ComponentMetrics | null>(null);
  const renderStartTime = useRef<number>(performance.now());
  const renderCount = useRef<number>(0);

  // Track component performance (heavily optimized)
  useEffect(() => {
    if (componentName && import.meta.env.DEV) {
      const renderEndTime = performance.now();
      const renderTime = renderEndTime - renderStartTime.current;
      renderCount.current += 1;

      // Only track if render time is significant to reduce overhead
      if (renderTime > 50) {
        setComponentMetrics({
          name: componentName,
          renderTime,
          rerenderCount: renderCount.current
        });

        // Only log extremely slow renders
        if (renderTime > 500) {
          reportError(`Very slow render detected: ${componentName} took ${Math.round(renderTime)}ms`, 'js_error');
        }
      }
    }
  }, [componentName]);

  // Collect web vitals
  useEffect(() => {
    const collectMetrics = () => {
      try {
        // Get navigation timing
        if (performance.getEntriesByType) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            setMetrics(prev => ({
              ...prev,
              pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
              timeToInteractive: navigation.domInteractive - navigation.fetchStart
            }));
          }
        }

        // Get paint timing
        if (performance.getEntriesByType) {
          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({
                ...prev,
                firstContentfulPaint: entry.startTime
              }));
            }
          });
        }

        // Get performance metrics with single observer for efficiency
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
          let lcpValue = 0;
          let fidValue = 0;
          let clsValue = 0;
          let observersActive = 0;
          
          // Single LCP observer
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            lcpValue = lastEntry.startTime;
            setMetrics(prev => ({
              ...prev,
              largestContentfulPaint: lcpValue
            }));
            
            // Disconnect after first meaningful LCP to reduce overhead
            if (lcpValue > 0) {
              lcpObserver.disconnect();
              observersActive--;
            }
          });

          try {
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            observersActive++;
          } catch (e) {
            // LCP not supported
          }

          // Single FID observer  
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              fidValue = entry.processingStart ? entry.processingStart - entry.startTime : entry.duration;
              setMetrics(prev => ({
                ...prev,
                firstInputDelay: fidValue
              }));
            });
            
            // Disconnect after first input to reduce overhead
            fidObserver.disconnect();
            observersActive--;
          });

          try {
            fidObserver.observe({ type: 'first-input', buffered: true });
            observersActive++;
          } catch (e) {
            // FID not supported
          }

          // Throttled CLS observer
          let clsTimeout: NodeJS.Timeout;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            
            // Debounce CLS updates to reduce overhead
            clearTimeout(clsTimeout);
            clsTimeout = setTimeout(() => {
              setMetrics(prev => ({
                ...prev,
                cumulativeLayoutShift: clsValue
              }));
            }, 1000);
          });

          try {
            clsObserver.observe({ type: 'layout-shift', buffered: true });
            observersActive++;
          } catch (e) {
            // CLS not supported
          }

          // Auto-cleanup after reasonable time to prevent memory leaks
          const cleanupTimer = setTimeout(() => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
            clearTimeout(clsTimeout);
          }, 30000); // 30 seconds max observation

          // Cleanup observers
          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
            clearTimeout(clsTimeout);
            clearTimeout(cleanupTimer);
          };
        }
      } catch (error) {
        reportError('Failed to collect performance metrics', 'js_error');
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
      return () => window.removeEventListener('load', collectMetrics);
    }
  }, []);

  // Send performance data to backend with debouncing
  useEffect(() => {
    const sendMetrics = async () => {
      // Only send if we have meaningful metrics and avoid excessive calls
      if (Object.keys(metrics).length > 2 && metrics.largestContentfulPaint) {
        try {
          await fetch('/api/performance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              metrics,
              componentMetrics,
              timestamp: Date.now(),
              url: window.location.href,
              userAgent: navigator.userAgent
            }),
          });
        } catch (error) {
          // Silently fail for performance reporting
        }
      }
    };

    // Send metrics after a longer delay and only once per page load
    const timer = setTimeout(sendMetrics, 10000);
    return () => clearTimeout(timer);
  }, [metrics.largestContentfulPaint]); // Only trigger when LCP is available

  return {
    metrics,
    componentMetrics,
    isGoodPerformance: {
      lcp: (metrics.largestContentfulPaint || 0) < 2500,
      fid: (metrics.firstInputDelay || 0) < 100,
      cls: (metrics.cumulativeLayoutShift || 0) < 0.1,
      pageLoad: (metrics.pageLoadTime || 0) < 3000
    }
  };
}

// Hook for measuring specific operations
export function useOperationTimer() {
  const startTimer = useRef<number>(0);

  const start = (operationName?: string) => {
    startTimer.current = performance.now();
    if (operationName && import.meta.env.DEV) {
      console.time(operationName);
    }
  };

  const end = (operationName?: string) => {
    const duration = performance.now() - startTimer.current;
    
    if (operationName) {
      if (import.meta.env.DEV) {
        console.timeEnd(operationName);
      }
      
      // Log slow operations
      if (duration > 1000) {
        reportError(`Slow operation: ${operationName} took ${duration}ms`, 'js_error');
      }
    }
    
    return duration;
  };

  return { start, end };
}