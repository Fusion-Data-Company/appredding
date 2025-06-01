/**
 * Performance Monitor Component
 * Displays real-time performance metrics for development
 */

import { useState, useEffect } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { cn } from '@/lib/utils';

interface PerformanceMonitorProps {
  className?: string;
  minimal?: boolean;
}

export function PerformanceMonitor({ className, minimal = false }: PerformanceMonitorProps) {
  const { metrics, isGoodPerformance } = usePerformance();
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show in development
  if (import.meta.env.PROD) return null;

  const getPerformanceColor = (value: number, goodThreshold: number, poorThreshold: number) => {
    if (value <= goodThreshold) return 'text-green-500';
    if (value <= poorThreshold) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (minimal) {
    return (
      <div className={cn(
        "fixed bottom-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded",
        className
      )}>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isGoodPerformance.overall ? "bg-green-500" : "bg-red-500"
          )} />
          {metrics.largestContentfulPaint && (
            <span className={getPerformanceColor(metrics.largestContentfulPaint, 2500, 4000)}>
              LCP: {Math.round(metrics.largestContentfulPaint)}ms
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 bg-black/90 text-white text-xs rounded-lg border border-gray-700",
      "transition-all duration-300",
      isExpanded ? "w-80 p-4" : "w-20 h-8 p-2",
      className
    )}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full"
      >
        <div className={cn(
          "w-2 h-2 rounded-full flex-shrink-0",
          isGoodPerformance.overall ? "bg-green-500" : "bg-red-500"
        )} />
        {!isExpanded && <span>Perf</span>}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          <div className="font-semibold border-b border-gray-600 pb-1">
            Performance Metrics
          </div>
          
          {metrics.largestContentfulPaint && (
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={getPerformanceColor(metrics.largestContentfulPaint, 2500, 4000)}>
                {Math.round(metrics.largestContentfulPaint)}ms
              </span>
            </div>
          )}

          {metrics.firstContentfulPaint && (
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={getPerformanceColor(metrics.firstContentfulPaint, 1800, 3000)}>
                {Math.round(metrics.firstContentfulPaint)}ms
              </span>
            </div>
          )}

          {metrics.firstInputDelay && (
            <div className="flex justify-between">
              <span>FID:</span>
              <span className={getPerformanceColor(metrics.firstInputDelay, 100, 300)}>
                {Math.round(metrics.firstInputDelay)}ms
              </span>
            </div>
          )}

          {metrics.cumulativeLayoutShift && (
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className={getPerformanceColor(metrics.cumulativeLayoutShift * 1000, 100, 250)}>
                {metrics.cumulativeLayoutShift.toFixed(3)}
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-gray-600 text-gray-400">
            <div className="text-xs">
              Overall: {isGoodPerformance.overall ? '✓ Good' : '✗ Needs Work'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}