/**
 * Responsive utilities for the application
 * These functions help ensure proper formatting across all devices
 */

/**
 * Determines if we're on a mobile device based on screen size
 * @returns boolean indicating if we're on a small mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
}

/**
 * Determines if we're on a tablet device based on screen size
 * @returns boolean indicating if we're on a tablet device
 */
export function isTabletDevice(): boolean {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }
  return false;
}

/**
 * Determines if we're on a desktop device based on screen size
 * @returns boolean indicating if we're on a desktop device
 */
export function isDesktopDevice(): boolean {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 1024;
  }
  return false;
}

/**
 * Optimizes image loading based on screen size
 * @param {string} smallImage - URL for small screens
 * @param {string} mediumImage - URL for medium screens
 * @param {string} largeImage - URL for large screens
 * @returns The appropriate image URL for the current screen size
 */
export function getResponsiveImageUrl(
  smallImage: string,
  mediumImage: string,
  largeImage: string
): string {
  if (isMobileDevice()) {
    return smallImage;
  } else if (isTabletDevice()) {
    return mediumImage;
  }
  return largeImage;
}

/**
 * Creates a set of responsive CSS classes
 * @param {string} prefix - Class prefix to use
 * @param {string} property - CSS property to adjust
 * @param {Record<string, string>} values - Values for different screen sizes
 * @returns CSS classes as a string
 */
export function createResponsiveClasses(
  prefix: string,
  property: string,
  values: Record<string, string>
): string {
  const classNames = [];
  
  if (values.mobile) {
    classNames.push(`${prefix}-mobile:${property}-${values.mobile}`);
  }
  
  if (values.tablet) {
    classNames.push(`${prefix}-tablet:${property}-${values.tablet}`);
  }
  
  if (values.desktop) {
    classNames.push(`${prefix}-desktop:${property}-${values.desktop}`);
  }
  
  return classNames.join(' ');
}

/**
 * Adds a window resize listener to adjust elements for responsiveness
 * @param {() => void} callback - Function to execute on resize
 * @returns Cleanup function to remove the listener
 */
export function addResponsiveResizeListener(callback: () => void): () => void {
  if (typeof window !== 'undefined') {
    // Use a debounced version of the callback to prevent too many executions
    let timeout: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }
  
  return () => {};
}

// Detect and handle device orientation changes for responsive design
export function addOrientationChangeListener(callback: () => void): () => void {
  if (typeof window !== 'undefined') {
    window.addEventListener('orientationchange', callback);
    return () => window.removeEventListener('orientationchange', callback);
  }
  
  return () => {};
}

// Get the current viewport height, adjusted for mobile browsers
export function getAdjustedViewportHeight(): string {
  if (typeof window !== 'undefined') {
    return `${window.innerHeight}px`;
  }
  return '100vh';
}

// Enterprise feature: Generate optimized CSS for current viewport
export function generateOptimizedCSS(): void {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.id = 'responsive-optimized-styles';
    
    // Replace any existing optimized styles
    const existingStyle = document.getElementById('responsive-optimized-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Generate viewport-specific styles
    let dynamicCSS = '';
    
    if (isMobileDevice()) {
      // Mobile-specific optimizations
      dynamicCSS += `
        .premium-button { padding: 0.5rem 1rem !important; font-size: 0.9rem !important; }
        .hero-text { font-size: 1.8rem !important; }
        .section-padding { padding: 2rem 1rem !important; }
      `;
    } else if (isTabletDevice()) {
      // Tablet-specific optimizations
      dynamicCSS += `
        .premium-button { padding: 0.75rem 1.5rem !important; font-size: 1rem !important; }
        .hero-text { font-size: 2.2rem !important; }
        .section-padding { padding: 3rem 2rem !important; }
      `;
    } else {
      // Desktop-specific optimizations
      dynamicCSS += `
        .premium-button { padding: 1rem 2rem !important; font-size: 1.1rem !important; }
        .hero-text { font-size: 2.5rem !important; }
        .section-padding { padding: 4rem 3rem !important; }
      `;
    }
    
    styleElement.textContent = dynamicCSS;
    document.head.appendChild(styleElement);
  }
}