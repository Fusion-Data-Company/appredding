/**
 * Performance Optimization Utilities
 * Tools for improving page load speed and runtime performance
 */

// Debounce utility for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle utility for scroll/resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading intersection observer
export function createLazyLoader(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

// Resource hints for preloading
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
}

// Critical CSS inlining helper
export function inlineCriticalCSS(css: string): void {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  
  document.head.insertBefore(style, document.head.firstChild);
}

// Performance measurement utilities
export function measureTaskTime<T>(
  task: () => T,
  label: string,
  threshold = 16 // 16ms for 60fps
): T {
  const start = performance.now();
  const result = task();
  const end = performance.now();
  const duration = end - start;

  if (duration > threshold) {
    console.warn(`Slow task "${label}": ${duration.toFixed(2)}ms`);
  }

  return result;
}

// Bundle chunk preloading
export function preloadChunk(chunkName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('link');
    script.rel = 'modulepreload';
    script.href = `/src/chunks/${chunkName}.js`;
    script.onload = () => resolve();
    script.onerror = reject;
    
    document.head.appendChild(script);
  });
}

// Memory usage monitoring
export function getMemoryUsage(): {
  used: number;
  total: number;
  percentage: number;
} | null {
  if (!('memory' in performance)) return null;

  const memory = (performance as any).memory;
  return {
    used: memory.usedJSHeapSize,
    total: memory.totalJSHeapSize,
    percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
  };
}

// Frame rate monitoring
export function createFPSMonitor(callback: (fps: number) => void): () => void {
  let frames = 0;
  let lastTime = performance.now();
  let animationId: number;

  function tick() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      callback(fps);
      
      frames = 0;
      lastTime = currentTime;
    }
    
    animationId = requestAnimationFrame(tick);
  }

  animationId = requestAnimationFrame(tick);

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

// Critical resource prioritization
export function prioritizeCriticalResources(): void {
  // Preload critical fonts
  preloadResource('/fonts/inter.woff2', 'font', 'font/woff2');
  
  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://cdn.jsdelivr.net'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });
}

// Service Worker registration for caching
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully');
    return registration;
  } catch (error) {
    console.warn('Service Worker registration failed:', error);
    return null;
  }
}