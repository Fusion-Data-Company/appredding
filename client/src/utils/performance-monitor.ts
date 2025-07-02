import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

// Function to report vital metrics for performance monitoring
export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry); // Cumulative Layout Shift
    onFID(onPerfEntry); // First Input Delay
    onLCP(onPerfEntry); // Largest Contentful Paint
    onFCP(onPerfEntry); // First Contentful Paint
    onTTFB(onPerfEntry); // Time to First Byte
  }
}

// Log performance metrics to console in development mode
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV !== 'production') {
    reportWebVitals((metric) => {
    });
  }
}

// Identify performance issues
export function identifyPerformanceIssues() {
  reportWebVitals((metric) => {
    // LCP should be < 2.5s for good user experience
    if (metric.name === 'LCP' && metric.value > 2500) {
      
    }
    
    // CLS should be < 0.1 for good stability
    if (metric.name === 'CLS' && metric.value > 0.1) {
      
    }
    
    // FID should be < 100ms for good responsiveness
    if (metric.name === 'FID' && metric.value > 100) {
      
    }
  });
}

// Add preconnect for performance
export function addPreconnect() {
  const links = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
  
  links.forEach(linkData => {
    const link = document.createElement('link');
    link.rel = linkData.rel;
    link.href = linkData.href;
    if (linkData.crossOrigin) {
      link.crossOrigin = linkData.crossOrigin;
    }
    document.head.appendChild(link);
  });
}

// Preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    '/src/assets_dir/images/optimized/praetorian-background-new.png',
    '/src/assets_dir/logos/praetorian-logo-shield.png'
  ];
  
  let preloadedCount = 0;
  const totalImages = criticalImages.length;
  
  criticalImages.forEach(imageSrc => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = imageSrc;
    link.as = 'image';
    
    link.onload = () => {
      preloadedCount++;
    };
    
    link.onerror = () => {
      
    };
    
    document.head.appendChild(link);
  });
  
  // Log if all critical images were preloaded successfully
  window.addEventListener('load', () => {
    if (preloadedCount < totalImages) {
      
    }
  });
}