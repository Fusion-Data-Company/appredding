/**
 * Ultra-Fast Hero Image Component
 * Optimized specifically for above-the-fold hero images
 */

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { imageOptimizer, ProgressiveImageLoader } from '@/utils/image-optimization';

interface FastHeroImageProps {
  src: string;
  lowQualitySrc?: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
  onLoad?: () => void;
}

export function FastHeroImage({
  src,
  lowQualitySrc,
  alt,
  className,
  overlayClassName,
  onLoad
}: FastHeroImageProps) {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const progressiveLoader = useRef(new ProgressiveImageLoader());

  useEffect(() => {
    if (!src) return;

    const loadImage = async () => {
      try {
        if (lowQualitySrc) {
          // Progressive loading: low quality first, then high quality
          await progressiveLoader.current.loadProgressive(
            lowQualitySrc,
            src,
            (progress) => {
              setLoadProgress(progress);
              if (progress === 50) {
                setCurrentSrc(lowQualitySrc);
              } else if (progress === 100) {
                setCurrentSrc(src);
                setIsLoaded(true);
                onLoad?.();
              }
            }
          );
        } else {
          // Direct loading with progress simulation
          setLoadProgress(10);
          const img = await imageOptimizer.loadImageWithRetry(src, true);
          setCurrentSrc(src);
          setLoadProgress(100);
          setIsLoaded(true);
          onLoad?.();
        }
      } catch (error) {
        console.warn('Hero image failed to load:', error);
        setLoadProgress(100);
      }
    };

    loadImage();
  }, [src, lowQualitySrc, onLoad]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-gray-100",
        className
      )}
    >
      {/* Loading progress bar */}
      {loadProgress < 100 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-20">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}

      {/* Hero image */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-70 scale-105",
            lowQualitySrc && !isLoaded ? "filter blur-sm" : ""
          )}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      )}

      {/* Overlay */}
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}

      {/* Fallback gradient while loading */}
      {!currentSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900" />
      )}
    </div>
  );
}

// Hook for preloading hero images
export function useHeroImagePreloader(imageSources: string[]) {
  useEffect(() => {
    const preloadHeroImages = async () => {
      try {
        await imageOptimizer.preloadCriticalImages(imageSources);
      } catch (error) {
        console.warn('Failed to preload some hero images:', error);
      }
    };

    if (imageSources.length > 0) {
      preloadHeroImages();
    }
  }, [imageSources]);
}