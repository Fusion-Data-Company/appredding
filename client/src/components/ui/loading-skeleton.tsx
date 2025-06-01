/**
 * Optimized Loading Skeleton Component
 * Lightweight alternative to heavy loading components
 */

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  lines = 3, 
  showAvatar = false 
}: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-4 bg-gray-300 rounded",
              i === lines - 1 ? "w-2/3" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <LoadingSkeleton lines={4} showAvatar={i % 2 === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}