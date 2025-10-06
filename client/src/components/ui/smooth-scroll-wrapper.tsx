import { useEffect, useRef } from 'react';
// @ts-ignore - lenis types may not be available
import Lenis from 'lenis';
import { useLocation } from 'wouter';

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
  disableOnRoutes?: string[];
  enabled?: boolean;
}

export function SmoothScrollWrapper({ children, disableOnRoutes = [], enabled = true }: SmoothScrollWrapperProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [location] = useLocation();

  const shouldDisable = !enabled || (location ? disableOnRoutes.some(route => location.startsWith(route)) : false);

  useEffect(() => {
    if (shouldDisable) {
      // Ensure any previous instance is destroyed when disabled via route
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Initialize Lenis with optimized settings for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId: number;
    // Animation frame loop for smooth scrolling
    const raf = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldDisable]);

  return <>{children}</>;
}

