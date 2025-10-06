import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { errorHandler } from '@/utils/error-handler';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'onLoad'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fallbackText?: string;
  priority?: boolean;
  onLoadComplete?: () => void;
  onErrorOccurred?: (error: Error) => void;
}

/**
 * SafeImage Component
 * 
 * A robust image component with comprehensive error handling:
 * - Automatic retry on load failure
 * - Fallback image support
 * - Loading states with skeleton
 * - Error logging
 * - Lazy loading for non-critical images
 * - Accessible alt text
 * 
 * @example
 * <SafeImage 
 *   src="/hero-image.jpg" 
 *   alt="Solar panel installation" 
 *   fallbackSrc="/placeholder.jpg"
 *   priority={true}
 * />
 */
export function SafeImage({
  src,
  alt,
  fallbackSrc = '',
  fallbackText,
  priority = false,
  className,
  onLoadComplete,
  onErrorOccurred,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    const error = new Error(`Failed to load image: ${currentSrc}`);
    
    // Try fallback if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      console.warn(`Image load failed, using fallback: ${currentSrc}`);
      setCurrentSrc(fallbackSrc);
      setRetryCount(0);
      return;
    }

    // Retry loading original image
    if (retryCount < MAX_RETRIES) {
      console.warn(`Retrying image load (${retryCount + 1}/${MAX_RETRIES}): ${currentSrc}`);
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force reload by adding cache-busting query param
        setCurrentSrc(src + (src.includes('?') ? '&' : '?') + `retry=${retryCount + 1}`);
      }, 1000 * (retryCount + 1)); // Exponential backoff
      return;
    }

    // All retries failed
    setIsLoading(false);
    setHasError(true);
    errorHandler.reportManualError(`Image failed to load after ${MAX_RETRIES} retries: ${src}`, 'js_error');
    onErrorOccurred?.(error);
  };

  // Render error state
  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted/20 text-muted-foreground',
          'border border-muted rounded-lg p-4',
          className
        )}
        role="img"
        aria-label={alt}
        data-testid="image-error-fallback"
      >
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto mb-2 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs">{fallbackText || 'Image unavailable'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20 animate-pulse',
            className
          )}
          aria-hidden="true"
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        data-testid="safe-image"
        {...props}
      />
    </>
  );
}
