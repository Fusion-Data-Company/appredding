import React, { useState, useEffect } from 'react';
import { ImageSource, optimizeImageUrl } from '@/lib/image-helper';
import { getAccessibleAltText } from '@/lib/seo-helper';

interface AccessibleImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  industry?: string;
  context?: string;
  lazyLoad?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * AccessibleImage Component
 * 
 * Renders images with proper accessibility attributes and optimization:
 * - Proper alt text following Praetorian guidelines
 * - Lazy loading for images below the fold
 * - Priority loading for critical above-the-fold images
 * - Error handling for broken image sources
 */
const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  industry,
  context = '',
  lazyLoad = true,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Generate proper alt text if industry is provided
  const finalAlt = industry ? getAccessibleAltText(industry, context) : alt;
  
  // Determine loading strategy based on position and priority
  const loading = !lazyLoad || priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';
  
  // Optimize image URL
  const optimizedSrc = optimizeImageUrl(src);
  
  // Handle image load events
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error events
  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };
  
  return (
    <>
      <img
        src={optimizedSrc}
        alt={finalAlt}
        width={width}
        height={height}
        loading={loading}
        // Use data attribute for fetch priority since the HTML attribute may not be fully supported
        data-fetchpriority={fetchPriority}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
      
      {hasError && (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Image not available</span>
        </div>
      )}
    </>
  );
};

export default AccessibleImage;