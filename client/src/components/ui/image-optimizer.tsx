/**
 * Optimized Image Component with Lazy Loading and Performance Monitoring
 */

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  placeholder,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    const loadTime = performance.now() - loadStartTime.current;
    setIsLoaded(true);
    
    // Log slow image loads for optimization
    if (loadTime > 1000) {
      console.warn(`Slow image load: ${src} took ${Math.round(loadTime)}ms`);
    }
    
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handleLoadStart = () => {
    loadStartTime.current = performance.now();
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder/Loading state */}
      {!isLoaded && !hasError && (
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse",
          "bg-[length:200%_100%] animate-shimmer"
        )}>
          {placeholder && (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              {placeholder}
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className={cn(
          "absolute inset-0 bg-gray-100 flex items-center justify-center",
          "text-gray-400 text-sm"
        )}>
          Failed to load image
        </div>
      )}

      {/* Actual image */}
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          onLoadStart={handleLoadStart}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}

// Preload critical images utility
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(srcs: string[]): Promise<void> {
  try {
    await Promise.all(srcs.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
}