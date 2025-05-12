/**
 * Utility for preloading images to ensure they're in the browser cache
 * before they're needed, which improves perceived performance.
 */

// Cache to track which images have been requested for preloading
const preloadCache = new Set<string>();

/**
 * Preload a single image
 * @param src Image URL to preload
 * @returns Promise that resolves when image is loaded or rejects on error
 */
export function preloadImage(src: string): Promise<void> {
  // Skip if already in preload cache
  if (preloadCache.has(src)) {
    return Promise.resolve();
  }
  
  // Mark as requested
  preloadCache.add(src);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve();
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to preload image: ${src}`));
    };
    
    // Set source to start loading
    img.src = src;
    
    // If image is already cached, onload won't fire, so we need to handle that
    if (img.complete) {
      resolve();
    }
  });
}

/**
 * Preload multiple images
 * @param sources Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(src => preloadImage(src)));
}

/**
 * Preload critical images for the application
 * Call this early in the application lifecycle
 */
export function preloadCriticalImages(): void {
  // Import hero image
  import('../assets_dir/imageExports').then(module => {
    const heroImage = module.PRAETORIAN_HERO_IMAGE;
    console.log("Hero image path:", heroImage);
  }).catch(err => console.error("Failed to import hero image:", err));
  
  const criticalImages = [
    '/praetorian-hero-main.jpg', // Hero image
    '/images/praetorian-og-image-v2-20250512.jpg', // Open Graph image
    '/images/optimized/diamond-plate-orange-blue.jpg',
    '/images/optimized/diamond-plate-fire-red.jpg'
  ];
  
  // Don't wait for completion - fire and forget
  preloadImages(criticalImages)
    .then(() => {
      console.log("✅ All critical images preloaded successfully");
    })
    .catch(error => {
      console.warn("⚠️ Some critical images failed to preload", error);
    });
  
  // Set a timeout to avoid blocking the UI indefinitely
  setTimeout(() => {
    if (preloadCache.size < criticalImages.length) {
      console.warn("Some images taking too long to load, showing content anyway");
    }
  }, 2000);
}

export default {
  preloadImage,
  preloadImages,
  preloadCriticalImages
};