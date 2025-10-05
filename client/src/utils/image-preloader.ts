/**
 * Advanced Image Preloading System
 * Optimizes critical image loading for faster page rendering with unsplash optimization
 */

import { imageOptimizer, preloadCriticalUnsplashImages, getOptimizedUnsplashUrl } from './image-optimization';

// Critical images that should be loaded immediately
const CRITICAL_IMAGES: string[] = [
  // Add your critical image paths here
];

// Critical unsplash images used in hero sections - ONLY truly above-the-fold images
const CRITICAL_UNSPLASH_IMAGES: string[] = [
  // First image from SolarRepairHero carousel (immediately visible above the fold)
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=600&fit=crop&q=80",
];

// Preload critical images on app initialization
export async function preloadCriticalImages(): Promise<void> {
  try {
    // Preload local critical images
    await imageOptimizer.preloadCriticalImages(CRITICAL_IMAGES);
    
    // Preload critical unsplash images with optimization
    preloadCriticalUnsplashImages(CRITICAL_UNSPLASH_IMAGES);
  } catch (error) {
    console.warn('Failed to preload some critical images:', error);
  }
}

// Preload images based on route
export async function preloadRouteImages(route: string): Promise<void> {
  const routeImages: Record<string, string[]> = {
    '/': [
      // Home page images - preload hero images
    ],
    '/services/repairs': [
      // Solar repair page - critical carousel images
      ...CRITICAL_UNSPLASH_IMAGES
    ],
    '/solar': [
      // Solar page images
    ],
    '/crm': [
      // CRM page images
    ]
  };

  const imagesToPreload = routeImages[route] || [];
  if (imagesToPreload.length > 0) {
    const unsplashImages = imagesToPreload.filter(url => url.includes('unsplash.com'));
    const localImages = imagesToPreload.filter(url => !url.includes('unsplash.com'));
    
    // Preload local images
    if (localImages.length > 0) {
      await imageOptimizer.preloadCriticalImages(localImages);
    }
    
    // Preload unsplash images with optimization
    if (unsplashImages.length > 0) {
      preloadCriticalUnsplashImages(unsplashImages);
    }
  }
}

// Preload images in viewport order
export async function preloadImagesByPriority(images: Array<{url: string, priority: 'high' | 'medium' | 'low'}>): Promise<void> {
  await imageOptimizer.preloadByViewport(images);
}

// Helper to get optimized unsplash URL
export { getOptimizedUnsplashUrl } from './image-optimization';