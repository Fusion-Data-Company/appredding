/**
 * Advanced Image Preloading System
 * Optimizes critical image loading for faster page rendering
 */

import { imageOptimizer } from './image-optimization';

// Critical images that should be loaded immediately
const CRITICAL_IMAGES: string[] = [
  // Add your critical image paths here
];

// Preload critical images on app initialization
export async function preloadCriticalImages(): Promise<void> {
  try {
    await imageOptimizer.preloadCriticalImages(CRITICAL_IMAGES);
  } catch (error) {
    
  }
}

// Preload images based on route
export async function preloadRouteImages(route: string): Promise<void> {
  const routeImages: Record<string, string[]> = {
    '/': [
      // Home page images
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
    await imageOptimizer.preloadCriticalImages(imagesToPreload);
  }
}

// Preload images in viewport order
export async function preloadImagesByPriority(images: Array<{url: string, priority: 'high' | 'medium' | 'low'}>): Promise<void> {
  await imageOptimizer.preloadByViewport(images);
}