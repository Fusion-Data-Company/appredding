/**
 * Lazy Loading Section Component
 * Optimizes page load by deferring non-critical sections
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  priority?: boolean;
}

export function LazySection({
  children,
  className,
  threshold = 0.1,
  rootMargin = '100px 0px',
  fallback,
  priority = false
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(priority);
  const [hasLoaded, setHasLoaded] = useState(priority);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add small delay to ensure smooth rendering
          setTimeout(() => setHasLoaded(true), 50);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [priority, threshold, rootMargin]);

  return (
    <div 
      ref={sectionRef}
      className={cn(
        "transition-opacity duration-500",
        hasLoaded ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {isVisible ? children : (
        fallback || (
          <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
        )
      )}
    </div>
  );
}

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: React.ComponentType<P>,
  options: Partial<LazySectionProps> = {}
) {
  return function LazyLoadedComponent(props: P) {
    return (
      <LazySection {...options}>
        <Component {...props} />
      </LazySection>
    );
  };
}