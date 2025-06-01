/**
 * Critical CSS Component
 * Inlines critical styles for faster rendering
 */

import { useEffect } from 'react';

const criticalStyles = `
/* Critical path styles for immediate rendering */
.hero-gradient {
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
}

.performance-optimized {
  will-change: transform;
  transform: translateZ(0);
}

.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Optimize font loading */
.font-optimized {
  font-display: swap;
}

/* Reduce layout shift */
.aspect-ratio-placeholder {
  aspect-ratio: 16 / 9;
}

/* GPU acceleration for animations */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Optimize scroll performance */
.scroll-optimized {
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0,0,0);
}
`;

export function CriticalCSS() {
  useEffect(() => {
    // Inject critical CSS immediately
    const style = document.createElement('style');
    style.textContent = criticalStyles;
    style.setAttribute('data-critical', 'true');
    
    // Insert at the beginning of head for highest priority
    document.head.insertBefore(style, document.head.firstChild);

    return () => {
      // Clean up on unmount
      const criticalStyles = document.querySelector('style[data-critical="true"]');
      if (criticalStyles) {
        criticalStyles.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}