import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";
import { logPerformanceMetrics, addPreconnect, preloadCriticalImages, identifyPerformanceIssues } from "./utils/performance-monitor";

// Performance optimization for animations and responsive design
// This ensures smoother animations by using requestAnimationFrame
if (typeof window !== 'undefined') {
  // Add a class to indicate JS is loaded, which can be used for animation triggers
  document.documentElement.classList.add('js-loaded');
  
  // Add viewport-specific optimizations
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const isDesktop = window.innerWidth >= 1024;
  
  // Add device-specific classes for CSS targeting
  if (isMobile) document.documentElement.classList.add('is-mobile');
  if (isTablet) document.documentElement.classList.add('is-tablet');
  if (isDesktop) document.documentElement.classList.add('is-desktop');
  
  // Apply performance optimizations based on device type
  if (isMobile) {
    // Mobile optimizations - reduce animations and effects
    document.documentElement.classList.add('reduce-motion');
    document.documentElement.classList.add('optimize-performance');
  }
  
  // Set up a helper for smooth animations
  window.requestAnimationFrame(() => {
    document.documentElement.dataset.animationsLoaded = 'true';
  });
  
  // Track largest contentful paint for performance monitoring
  const heroImage = document.querySelector('.hero-image') as HTMLImageElement;
  if (heroImage) {
    heroImage.addEventListener('load', () => {
      console.log("Hero image path:", heroImage.src);
      // Measure Largest Contentful Paint
      const loadTime = performance.now();
      console.log("Largest Contentful Paint:", Math.round(loadTime));
    });
  }
  
  // Preload critical images
  const preloadCriticalImages = () => {
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
        console.warn(`⚠️ Failed to preload image: ${imageSrc}`);
      };
      
      document.head.appendChild(link);
    });
    
    // Log if all critical images were preloaded successfully
    window.addEventListener('load', () => {
      if (preloadedCount < totalImages) {
        console.warn(`⚠️ Some critical images failed to preload`, {});
      }
    });
  };
  
  // Attempt preloading
  preloadCriticalImages();
  
  // Reduce animation jank by optimizing for 60fps
  document.addEventListener('DOMContentLoaded', () => {
    // Use passive event listeners for better scroll performance
    window.addEventListener('scroll', () => {}, { passive: true });
    
    // Only animate visible elements
    if ('IntersectionObserver' in window) {
      const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            animateOnScrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Target elements with animation classes
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScrollObserver.observe(element);
      });
    }
    
    // Track video loading performance
    document.querySelectorAll('video').forEach(video => {
      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
      
      video.addEventListener('error', (e) => {
        console.error('Video load error:', e);
      });
    });
  });
}

// Force dark theme for consistent styling
if (typeof window !== 'undefined') {
  // Add dark class to html element
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider 
    attribute="class" 
    defaultTheme="dark" 
    enableSystem={false}
    disableTransitionOnChange 
    forcedTheme="dark" // Force dark theme, no switching allowed
  >
    <App />
  </ThemeProvider>
);
