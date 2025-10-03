/**
 * Image Helper Utilities for Advance Power Redding
 * Functions to optimize image loading, accessibility, and performance
 */

import { getAccessibleAltText } from './seo-helper';

/**
 * Type definition for image sources with support for responsive images
 */
export interface ImageSource {
  src: string;
  srcSet?: string;
  sizes?: string;
  type?: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Create image sources with proper accessibility attributes for industry pages
 */
export const createIndustryImageSource = (
  src: string,
  industry: string,
  context: string = '',
  isAboveTheFold: boolean = false
): ImageSource => {
  // Generate webp version if original is not webp
  const isWebp = src.toLowerCase().endsWith('.webp');
  const webpSrc = isWebp ? src : src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Generate accessible alt text
  const alt = getAccessibleAltText(industry, context);
  
  // Determine loading strategy based on position
  const loading = isAboveTheFold ? 'eager' : 'lazy';
  const fetchPriority = isAboveTheFold ? 'high' : 'auto';
  
  return {
    src,
    alt,
    loading,
    decoding: 'async',
    fetchPriority
  };
};

/**
 * Optimizes an image URL to support modern formats and CDN delivery
 */
export const optimizeImageUrl = (imageUrl: string): string => {
  // Check if image is already using a CDN
  if (imageUrl.includes('cdn.') || imageUrl.includes('assets.')) {
    return imageUrl;
  }
  
  // For locally hosted images, ensure proper path
  if (imageUrl.startsWith('/')) {
    // Local image - add proper path
    return imageUrl;
  }
  
  // For relative paths in development, add proper prefix
  if (!imageUrl.startsWith('http')) {
    return `/${imageUrl.replace(/^\.\//, '')}`;
  }
  
  return imageUrl;
};

/**
 * Preload critical images to improve LCP (Largest Contentful Paint)
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  // Only preload a limited number of critical images
  const criticalImages = imagePaths.slice(0, 3);
  
  criticalImages.forEach(imagePath => {
    if (!imagePath || typeof imagePath !== 'string') {
      
      return;
    }
    
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = optimizeImageUrl(imagePath);
      link.as = 'image';
      link.setAttribute('fetchpriority', 'high');
      link.setAttribute('crossorigin', 'anonymous');
      document.head.appendChild(link);
      
      // Also create an Image object to handle load error properly
      const img = new Image();
      img.src = optimizeImageUrl(imagePath);
      img.onerror = () => {
        console.error(`Failed to preload image: ${imagePath}`);
      };
    } catch (error) {
      console.error('Error preloading image:', error);
    }
  });
};

/**
 * Check if image exists to prevent broken image references
 */
export const checkImageExists = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    
    return false;
  }
};