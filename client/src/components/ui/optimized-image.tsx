import React, { useState, useEffect, useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BaseOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  fallbackSrc?: string;
  onError?: () => void;
}

type OptimizedImageProps = BaseOptimizedImageProps & 
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof BaseOptimizedImageProps> &
  Partial<HTMLMotionProps<'img'>>;

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
  quality = 80,
  fallbackSrc,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const generateSrcSet = (url: string): string => {
    if (!url || url.startsWith('/') || url.includes('assets')) {
      return '';
    }

    if (url.includes('unsplash.com')) {
      const widths = [400, 800, 1200, 1600];
      return widths
        .map((w) => {
          try {
            const urlObj = new URL(url);
            urlObj.searchParams.set('w', w.toString());
            urlObj.searchParams.set('q', quality.toString());
            urlObj.searchParams.set('auto', 'format');
            return `${urlObj.toString()} ${w}w`;
          } catch {
            return `${url} ${w}w`;
          }
        })
        .join(', ');
    }

    return '';
  };

  const getOptimizedSrc = (url: string, targetWidth?: number): string => {
    if (!url || url.startsWith('/') || url.includes('assets')) {
      return url;
    }

    if (url.includes('unsplash.com')) {
      try {
        const urlObj = new URL(url);
        if (targetWidth) urlObj.searchParams.set('w', targetWidth.toString());
        urlObj.searchParams.set('q', quality.toString());
        urlObj.searchParams.set('auto', 'format');
        urlObj.searchParams.set('fm', 'webp');
        return urlObj.toString();
      } catch (error) {
        console.error('Error optimizing image URL:', error);
        return url;
      }
    }

    return url;
  };

  const handleError = () => {
    console.error(`Failed to load image: ${currentSrc}`);
    setHasError(true);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    
    onError?.();
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const srcSet = generateSrcSet(currentSrc);
  const optimizedSrc = getOptimizedSrc(currentSrc, width);

  // Separate motion props from regular HTML props
  const motionProps = {} as any;
  const imgProps = {} as any;
  
  Object.keys(props).forEach((key) => {
    if (
      key.startsWith('while') ||
      key.startsWith('animate') ||
      key === 'initial' ||
      key === 'exit' ||
      key === 'variants' ||
      key === 'transition' ||
      key === 'drag' ||
      key === 'layout' ||
      key === 'layoutId'
    ) {
      motionProps[key] = (props as any)[key];
    } else {
      imgProps[key] = (props as any)[key];
    }
  });

  const hasMotionProps = Object.keys(motionProps).length > 0;

  const imageElement = hasMotionProps ? (
    <motion.img
      ref={imgRef as any}
      src={isInView ? optimizedSrc : undefined}
      srcSet={isInView && srcSet ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...motionProps}
      {...imgProps}
    />
  ) : (
    <img
      ref={imgRef}
      src={isInView ? optimizedSrc : undefined}
      srcSet={isInView && srcSet ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...imgProps}
    />
  );

  if (hasError && !fallbackSrc) {
    return (
      <div
        className={cn('flex items-center justify-center bg-muted/20', className)}
        style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
      >
        <div className="text-xs text-muted-foreground">Image unavailable</div>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && !hasError && (
        <div
          className={cn('absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20 animate-pulse', className)}
          style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
          aria-hidden="true"
        />
      )}
      {imageElement}
    </>
  );
}
