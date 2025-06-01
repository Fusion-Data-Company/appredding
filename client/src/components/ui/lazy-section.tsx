/**
 * Lazy Loading Section Component
 * Improves page performance by loading sections only when needed
 */

import { useState, useRef, useEffect, ReactNode } from 'react';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { createLazyLoader } from '@/utils/performance-optimizer';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  minHeight?: string;
}

export function LazySection({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
  minHeight = '200px'
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = createLazyLoader(
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a small delay to ensure smooth scrolling
          setTimeout(() => setIsLoaded(true), 50);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div 
      ref={sectionRef} 
      className={className}
      style={{ minHeight: isLoaded ? 'auto' : minHeight }}
    >
      {isLoaded ? (
        children
      ) : isVisible ? (
        fallback || <LoadingSkeleton className="w-full h-48" />
      ) : (
        <div style={{ height: minHeight }} className="bg-transparent" />
      )}
    </div>
  );
}