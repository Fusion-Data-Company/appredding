/**
 * Performance Indicator Component
 * Shows real-time performance status to users
 */

import { useEffect, useState } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { cn } from '@/lib/utils';
import { Activity, Wifi, WifiOff } from 'lucide-react';

interface PerformanceIndicatorProps {
  showDetails?: boolean;
  className?: string;
}

export function PerformanceIndicator({ 
  showDetails = false, 
  className 
}: PerformanceIndicatorProps) {
  const { metrics, isGoodPerformance } = usePerformance('PerformanceIndicator');
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'slow'>('online');

  useEffect(() => {
    const updateConnectionStatus = () => {
      if (!navigator.onLine) {
        setConnectionStatus('offline');
      } else if ((navigator as any).connection?.effectiveType === '2g') {
        setConnectionStatus('slow');
      } else {
        setConnectionStatus('online');
      }
    };

    updateConnectionStatus();
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    return () => {
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  }, []);

  const getPerformanceColor = () => {
    if (connectionStatus === 'offline') return 'text-red-500';
    if (connectionStatus === 'slow') return 'text-yellow-500';
    
    const goodMetrics = Object.values(isGoodPerformance).filter(Boolean).length;
    const totalMetrics = Object.values(isGoodPerformance).length;
    
    if (goodMetrics === totalMetrics) return 'text-green-500';
    if (goodMetrics > totalMetrics / 2) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (connectionStatus === 'offline') return <WifiOff className="h-4 w-4" />;
    if (connectionStatus === 'slow') return <Wifi className="h-4 w-4 animate-pulse" />;
    return <Activity className="h-4 w-4" />;
  };

  if (!showDetails) {
    return (
      <div className={cn(
        "fixed bottom-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm border",
        getPerformanceColor(),
        className
      )}>
        {getStatusIcon()}
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 p-4 rounded-lg bg-background/90 backdrop-blur-sm border shadow-lg min-w-[200px]",
      className
    )}>
      <div className="flex items-center gap-2 mb-2">
        <span className={getPerformanceColor()}>
          {getStatusIcon()}
        </span>
        <span className="text-sm font-medium">Performance</span>
      </div>
      
      <div className="space-y-1 text-xs">
        {connectionStatus === 'offline' && (
          <div className="text-red-500">Offline</div>
        )}
        
        {connectionStatus === 'slow' && (
          <div className="text-yellow-500">Slow connection</div>
        )}
        
        {metrics.largestContentfulPaint && (
          <div className={isGoodPerformance.lcp ? 'text-green-500' : 'text-red-500'}>
            LCP: {Math.round(metrics.largestContentfulPaint)}ms
          </div>
        )}
        
        {metrics.firstInputDelay && (
          <div className={isGoodPerformance.fid ? 'text-green-500' : 'text-red-500'}>
            FID: {Math.round(metrics.firstInputDelay)}ms
          </div>
        )}
        
        {metrics.cumulativeLayoutShift && (
          <div className={isGoodPerformance.cls ? 'text-green-500' : 'text-red-500'}>
            CLS: {metrics.cumulativeLayoutShift.toFixed(3)}
          </div>
        )}
        
        {metrics.pageLoadTime && (
          <div className={isGoodPerformance.pageLoad ? 'text-green-500' : 'text-red-500'}>
            Load: {Math.round(metrics.pageLoadTime)}ms
          </div>
        )}
      </div>
    </div>
  );
}