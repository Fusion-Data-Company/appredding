/**
 * Bundle Optimization Utilities
 * Code splitting and dynamic import helpers
 */

// Dynamic import wrapper with error handling
export async function dynamicImport<T>(
  importFn: () => Promise<T>,
  fallback?: T,
  errorMessage?: string
): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    console.warn(errorMessage || 'Dynamic import failed:', error);
    if (fallback) {
      return fallback;
    }
    throw error;
  }
}

// Preload component for faster navigation
export function preloadComponent(importFn: () => Promise<any>): void {
  // Only preload in browser environment
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        importFn().catch(() => {
          // Silent fail - preloading is optional
        });
      });
    } else {
      setTimeout(() => {
        importFn().catch(() => {
          // Silent fail - preloading is optional
        });
      }, 100);
    }
  }
}

// Component factory for lazy loading with fallbacks
export function createLazyComponent<T = any>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
  errorComponent?: React.ComponentType<{ error: Error }>
) {
  return {
    Component: React.lazy(() => 
      dynamicImport(importFn, undefined, 'Failed to load component')
    ),
    preload: () => preloadComponent(importFn),
    fallback,
    errorComponent
  };
}

// Module chunking strategy
export const moduleChunks = {
  // Critical - loaded immediately
  critical: [
    () => import('@/components/ui/hero-odyssey'),
    () => import('@/components/layout/MainLayout'),
  ],
  
  // High priority - loaded after critical
  high: [
    () => import('@/sections/ProductShowcaseSection'),
    () => import('@/sections/SolarSalesFunnelSection'),
  ],
  
  // Medium priority - loaded on interaction
  medium: [
    () => import('@/sections/InteractiveToolsSection'),
    () => import('@/sections/SolarServicesSection'),
  ],
  
  // Low priority - loaded when visible
  low: [
    () => import('@/sections/AboutAdvancePowerSection'),
    () => import('@/sections/SolarTestimonialsSection'),
  ]
};

// Preload modules by priority
export async function preloadModulesByPriority(
  priority: keyof typeof moduleChunks = 'high'
): Promise<void> {
  const modules = moduleChunks[priority];
  
  for (const moduleImport of modules) {
    preloadComponent(moduleImport);
  }
}

// Resource hints for external dependencies
export function addResourceHints(): void {
  if (typeof document === 'undefined') return;

  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.assign(link, hint);
    document.head.appendChild(link);
  });
}

// Optimize third-party scripts loading
export function loadThirdPartyScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    priority?: 'high' | 'low';
    onLoad?: () => void;
    onError?: () => void;
  } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? false;
    
    if (options.priority === 'low') {
      script.loading = 'lazy' as any;
    }

    script.onload = () => {
      options.onLoad?.();
      resolve();
    };

    script.onerror = () => {
      options.onError?.();
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

// Monitor bundle size in development
export function monitorBundleSize(): void {
  if (import.meta.env.DEV && 'performance' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('chunk') && entry.transferSize) {
          const sizeKB = Math.round(entry.transferSize / 1024);
          if (sizeKB > 250) {
            console.warn(`Large chunk detected: ${entry.name} (${sizeKB}KB)`);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }
}