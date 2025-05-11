import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
}

/**
 * ResponsiveImage component that implements best practices for responsive images
 * - Automatically generates WebP and AVIF sources
 * - Supports lazy loading
 * - Provides proper width and height attributes to prevent layout shifts
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  style
}: ResponsiveImageProps) {
  // Get file extension and path without extension
  const srcPath = src.substring(0, src.lastIndexOf('.')) || src;
  const srcExt = src.split('.').pop() || '';

  // Determine if the image is in the optimized directory
  const isOptimized = src.includes('/optimized/');
  const optimizedPath = isOptimized ? srcPath : srcPath.replace('/images/', '/images/optimized/');

  // Set loading based on priority
  const loadingAttr = priority ? 'eager' : loading;

  return (
    <picture>
      {/* AVIF format for browsers that support it */}
      <source
        srcSet={`${optimizedPath}.avif`}
        type="image/avif"
      />
      {/* WebP format for browsers that support it */}
      <source
        srcSet={`${optimizedPath}.webp`}
        type="image/webp"
      />
      {/* Original format as fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttr}
        className={className}
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          ...style
        }}
      />
    </picture>
  );
}

export default ResponsiveImage;