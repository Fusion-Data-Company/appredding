import { useState, useEffect } from 'react';

/**
 * Track scroll progress for sophisticated scroll-linked animations
 * Apple-inspired smooth scroll tracking
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(currentScrollY / maxScroll, 1);

      // Determine scroll direction
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      setScrollProgress(progress);
      setScrollY(currentScrollY);
      setScrollDirection(direction);

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, scrollY, scrollDirection };
}

/**
 * Track element visibility and scroll position relative to viewport
 * For advanced parallax and scroll-linked effects
 */
export function useElementScroll(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let ticking = false;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is in view
      const isInView = rect.top < windowHeight && rect.bottom > 0;
      setInView(isInView);

      if (isInView) {
        // Calculate progress through viewport (0 to 1)
        // 0 = just entering, 1 = fully passed
        const elementHeight = rect.height;
        const totalDistance = windowHeight + elementHeight;
        const distanceTraveled = windowHeight - rect.top;
        const elementProgress = Math.max(0, Math.min(1, distanceTraveled / totalDistance));
        
        setProgress(elementProgress);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return { inView, progress };
}

