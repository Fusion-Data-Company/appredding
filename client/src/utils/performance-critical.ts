/**
 * Critical Performance Optimizations
 * Immediate performance improvements for first page load
 */

// Critical resource preloading
export function initializeCriticalResources(): void {
  // Preconnect to critical domains
  const criticalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical fonts
  const criticalFonts = [
    '/fonts/inter-var.woff2',
    '/fonts/cinzel-var.woff2'
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Optimize CSS delivery
export function optimizeCSSDelivery(): void {
  // Inline critical CSS for hero section
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .hero-gradient {
      background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
    }
    
    .hero-text {
      font-display: swap;
      text-rendering: optimizeLegibility;
    }
    
    .gpu-layer {
      transform: translateZ(0);
      will-change: transform;
      backface-visibility: hidden;
    }
    
    /* Prevent layout shift */
    .hero-container {
      min-height: 100vh;
      contain: layout style paint;
    }
    
    /* Optimize animations */
    .motion-safe {
      transform: translate3d(0, 0, 0);
    }
    
    @media (prefers-reduced-motion: reduce) {
      .motion-safe {
        animation: none;
        transition: none;
      }
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.firstChild);
}

// Defer non-critical JavaScript
export function deferNonCriticalJS(): void {
  // Defer analytics and tracking scripts
  const nonCriticalScripts = document.querySelectorAll('script[data-defer="true"]');
  
  nonCriticalScripts.forEach(script => {
    if (script instanceof HTMLScriptElement) {
      script.defer = true;
    }
  });
}

// Optimize image loading priorities
export function setImageLoadingPriorities(): void {
  // Set high priority for hero images
  const heroImages = document.querySelectorAll('.hero-section img, [data-hero-image]');
  heroImages.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.fetchPriority = 'high';
      img.loading = 'eager';
      img.decoding = 'sync';
    }
  });

  // Set low priority for below-the-fold images
  const lazyImages = document.querySelectorAll('img:not(.hero-section img):not([data-hero-image])');
  lazyImages.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.fetchPriority = 'low';
      img.loading = 'lazy';
      img.decoding = 'async';
    }
  });
}

// Memory optimization
export function optimizeMemoryUsage(): void {
  // Clean up unused event listeners
  const cleanupEvents = () => {
    // Force garbage collection if available (dev only)
    if (import.meta.env.DEV && 'gc' in window) {
      try {
        (window as any).gc();
      } catch (error) {
        // Ignore GC errors
      }
    }
  };

  // Clean up every 60 seconds in development (reduced frequency)
  if (import.meta.env.DEV) {
    setTimeout(() => {
      setInterval(cleanupEvents, 60000);
    }, 5000); // Delay initial setup
  }
}

// Service Worker registration for caching
export async function registerCacheService(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    // Simple cache strategy for images and assets
    const registration = await navigator.serviceWorker.register('/cache-worker.js', {
      scope: '/'
    });

    console.log('Cache service registered successfully');
    
    // Update cache when new version is available
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New cache version available');
          }
        });
      }
    });
  } catch (error) {
    console.warn('Cache service registration failed:', error);
  }
}

// Initialize critical optimizations with reduced overhead
export function initializeCriticalPerformance(): void {
  try {
    // Run only essential optimizations immediately
    initializeCriticalResources();
    
    // Defer non-critical optimizations to reduce initial load impact
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          optimizeCSSDelivery();
          setImageLoadingPriorities();
        }, 500); // Increased delay
      });
    } else {
      setTimeout(() => {
        optimizeCSSDelivery();
        setImageLoadingPriorities();
      }, 500);
    }
    
    // Run heavy optimizations much later
    window.addEventListener('load', () => {
      setTimeout(() => {
        deferNonCriticalJS();
        optimizeMemoryUsage();
        registerCacheService();
      }, 3000); // Much longer delay to not impact LCP
    });
  } catch (error) {
    console.warn('Critical performance initialization failed:', error);
  }
}

// Performance budget monitoring
export function monitorPerformanceBudget(): void {
  if (!('performance' in window) || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as any;
        // Monitor large resource loads with safe property access
        if (entry.name.includes('.js') && resourceEntry.transferSize && resourceEntry.transferSize > 100 * 1024) {
          console.warn(`Large JS bundle detected: ${entry.name} (${Math.round(resourceEntry.transferSize / 1024)}KB)`);
        }
        
        if (entry.name.includes('.css') && resourceEntry.transferSize && resourceEntry.transferSize > 50 * 1024) {
          console.warn(`Large CSS file detected: ${entry.name} (${Math.round(resourceEntry.transferSize / 1024)}KB)`);
        }
        
        if ((entry.name.includes('.jpg') || entry.name.includes('.png') || entry.name.includes('.webp')) && 
            resourceEntry.transferSize && resourceEntry.transferSize > 200 * 1024) {
          console.warn(`Large image detected: ${entry.name} (${Math.round(resourceEntry.transferSize / 1024)}KB)`);
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Performance monitoring setup failed:', error);
  }
}