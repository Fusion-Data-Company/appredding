/**
 * Enhanced Loading Component with Performance Monitoring
 * Provides better user feedback and tracks loading performance
 */

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOperationTimer } from '@/hooks/use-performance';
import LoadingLines from '@/components/ui/loading-lines';

interface EnhancedLoadingProps {
  message?: string;
  timeout?: number;
  onTimeout?: () => void;
  showProgress?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  operationName?: string;
}

export function EnhancedLoading({
  message = "Loading...",
  timeout = 10000, // 10 seconds default timeout
  onTimeout,
  showProgress = false,
  className,
  size = 'md',
  operationName
}: EnhancedLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const { start, end } = useOperationTimer();

  useEffect(() => {
    if (operationName) {
      start(operationName);
    }

    return () => {
      if (operationName) {
        end(operationName);
      }
    };
  }, [operationName, start, end]);

  useEffect(() => {
    if (!showProgress && !timeout) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (showProgress) {
        const progressPercent = Math.min((elapsed / timeout) * 100, 100);
        setProgress(progressPercent);
      }

      if (elapsed >= timeout) {
        setTimeoutReached(true);
        if (onTimeout) {
          onTimeout();
        }
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timeout, onTimeout, showProgress]);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (timeoutReached) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-6 text-center",
        className
      )}>
        <div className="text-yellow-500 mb-2">⚠️</div>
        <p className="text-sm text-muted-foreground">
          Loading is taking longer than expected...
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-blue-500 hover:text-blue-400 underline"
        >
          Refresh page
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-6",
      className
    )}>
      <Loader2 className={cn(
        "animate-spin text-primary",
        sizeClasses[size]
      )} />
      
      {message && (
        <p className="mt-2 text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}

      {showProgress && (
        <div className="mt-3 w-32 bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {operationName && (
        <p className="mt-1 text-xs text-muted-foreground/60">
          {operationName}
        </p>
      )}
    </div>
  );
}

// Suspense fallback component with LoadingLines - DO NOT MODIFY LOADINGLINES STYLING
export function SuspenseFallback({
  message = "Loading page...",
  operationName
}: {
  message?: string;
  operationName?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingLines />
    </div>
  );
}