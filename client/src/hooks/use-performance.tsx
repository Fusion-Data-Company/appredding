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
  const renderStartTime = useRef<number>(Date.now());
  const renderCount = useRef<number>(0);

  // Track component performance
  useEffect(() => {
    if (componentName) {
      const renderEndTime = Date.now();
      const renderTime = renderEndTime - renderStartTime.current;
      renderCount.current += 1;

      setComponentMetrics({
        name: componentName,
        renderTime,
        rerenderCount: renderCount.current
      });

      // Log slow renders
      if (renderTime > 100) {
        reportError(`Slow render detected: ${componentName} took ${renderTime}ms`, 'js_error');
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
              pageLoadTime: navigation.loadEventEnd - navigation.navigationStart,
              timeToInteractive: navigation.domInteractive - navigation.navigationStart
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

        // Get LCP
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            setMetrics(prev => ({
              ...prev,
              largestContentfulPaint: lastEntry.startTime
            }));
          });

          try {
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          } catch (e) {
            // LCP not supported
          }

          // Get FID
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              setMetrics(prev => ({
                ...prev,
                firstInputDelay: entry.processingStart - entry.startTime
              }));
            });
          });

          try {
            fidObserver.observe({ type: 'first-input', buffered: true });
          } catch (e) {
            // FID not supported
          }

          // Get CLS
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            setMetrics(prev => ({
              ...prev,
              cumulativeLayoutShift: clsValue
            }));
          });

          try {
            clsObserver.observe({ type: 'layout-shift', buffered: true });
          } catch (e) {
            // CLS not supported
          }

          // Cleanup observers
          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
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

  // Send performance data to backend
  useEffect(() => {
    const sendMetrics = async () => {
      if (Object.keys(metrics).length > 0) {
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

    // Send metrics after a delay
    const timer = setTimeout(sendMetrics, 5000);
    return () => clearTimeout(timer);
  }, [metrics, componentMetrics]);

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