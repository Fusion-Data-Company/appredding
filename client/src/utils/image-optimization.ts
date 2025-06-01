/**
 * Advanced Image Optimization Utilities
 * High-performance image loading and caching system
 */

interface ImageCache {
  [key: string]: HTMLImageElement;
}

class ImageOptimizer {
  private cache: ImageCache = {};
  private loading: Set<string> = new Set();
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries = 3;

  // Preload critical images with priority
  async preloadCriticalImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.loadImageWithRetry(url, true));
    await Promise.allSettled(promises);
  }

  // Load image with retry logic and caching
  async loadImageWithRetry(url: string, isPriority = false): Promise<HTMLImageElement> {
    // Return cached image if available
    if (this.cache[url]) {
      return this.cache[url];
    }

    // Avoid duplicate loading
    if (this.loading.has(url)) {
      return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
          if (this.cache[url]) {
            clearInterval(checkInterval);
            resolve(this.cache[url]);
          } else if (!this.loading.has(url)) {
            clearInterval(checkInterval);
            reject(new Error('Image loading failed'));
          }
        }, 100);
      });
    }

    this.loading.add(url);

    try {
      const img = await this.loadImage(url, isPriority);
      this.cache[url] = img;
      this.loading.delete(url);
      return img;
    } catch (error) {
      this.loading.delete(url);
      
      const attempts = this.retryAttempts.get(url) || 0;
      if (attempts < this.maxRetries) {
        this.retryAttempts.set(url, attempts + 1);
        console.warn(`Retrying image load (${attempts + 1}/${this.maxRetries}): ${url}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempts + 1)));
        return this.loadImageWithRetry(url, isPriority);
      }
      
      throw error;
    }
  }

  // Core image loading with optimization
  private loadImage(url: string, isPriority = false): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Set loading priority
      if (isPriority) {
        img.fetchPriority = 'high';
        img.loading = 'eager';
      } else {
        img.fetchPriority = 'low';
        img.loading = 'lazy';
      }

      // Performance optimizations
      img.decoding = 'async';
      img.crossOrigin = 'anonymous';

      const timeout = setTimeout(() => {
        reject(new Error(`Image load timeout: ${url}`));
      }, 10000); // 10 second timeout

      img.onload = () => {
        clearTimeout(timeout);
        resolve(img);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });
  }

  // Generate responsive image URLs
  generateResponsiveUrls(baseUrl: string, sizes: number[] = [400, 800, 1200, 1600]): string[] {
    if (!baseUrl) return [];
    
    // If it's a local asset, return as-is
    if (baseUrl.startsWith('/') || baseUrl.includes('assets')) {
      return [baseUrl];
    }

    // For external images, generate different sizes
    return sizes.map(size => `${baseUrl}?w=${size}&q=80&auto=format`);
  }

  // Preload images in viewport priority order
  async preloadByViewport(images: { url: string; priority: 'high' | 'medium' | 'low' }[]): Promise<void> {
    const high = images.filter(img => img.priority === 'high');
    const medium = images.filter(img => img.priority === 'medium');
    const low = images.filter(img => img.priority === 'low');

    // Load high priority first
    await Promise.allSettled(high.map(img => this.loadImageWithRetry(img.url, true)));
    
    // Then medium priority with delay
    setTimeout(() => {
      Promise.allSettled(medium.map(img => this.loadImageWithRetry(img.url)));
    }, 500);

    // Finally low priority
    setTimeout(() => {
      Promise.allSettled(low.map(img => this.loadImageWithRetry(img.url)));
    }, 1500);
  }

  // Clear cache to free memory
  clearCache(): void {
    this.cache = {};
    this.loading.clear();
    this.retryAttempts.clear();
  }

  // Get cache statistics
  getCacheStats(): { cached: number; loading: number; failed: number } {
    return {
      cached: Object.keys(this.cache).length,
      loading: this.loading.size,
      failed: this.retryAttempts.size
    };
  }
}

// Singleton instance
export const imageOptimizer = new ImageOptimizer();

// WebP support detection
export function supportsWebP(): Promise<boolean> {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => resolve(webP.height === 2);
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Generate optimized image srcset
export function generateSrcSet(baseUrl: string, sizes: number[] = [400, 800, 1200]): string {
  if (!baseUrl) return '';
  
  const urls = imageOptimizer.generateResponsiveUrls(baseUrl, sizes);
  return urls.map((url, index) => `${url} ${sizes[index]}w`).join(', ');
}

// Image format optimization
export async function getOptimalImageFormat(url: string): Promise<string> {
  const supportsModernFormats = await supportsWebP();
  
  if (supportsModernFormats && !url.includes('.svg')) {
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return url;
}

// Lazy loading intersection observer
export function createImageLazyLoader(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Progressive image loading
export class ProgressiveImageLoader {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async loadProgressive(
    lowQualityUrl: string,
    highQualityUrl: string,
    onProgress?: (progress: number) => void
  ): Promise<HTMLImageElement> {
    // Load low quality first for instant display
    const lowQualityImg = await imageOptimizer.loadImageWithRetry(lowQualityUrl, true);
    onProgress?.(50);

    // Then load high quality in background
    const highQualityImg = await imageOptimizer.loadImageWithRetry(highQualityUrl);
    onProgress?.(100);

    return highQualityImg;
  }
}