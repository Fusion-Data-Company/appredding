import { useState, useEffect } from 'react';

/**
 * Track cursor position for advanced interactions
 * Apple-inspired cursor-aware effects
 */
export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;

    const updatePosition = (e: MouseEvent) => {
      // Use RAF for smooth updates
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return position;
}

/**
 * Track cursor position relative to an element
 * For element-specific cursor effects
 */
export function useRelativeCursorPosition(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0, isInside: false });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frameId: number;

    const updatePosition = (e: MouseEvent) => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

        setPosition({ x, y, isInside });
      });
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [ref]);

  return position;
}

/**
 * Calculate cursor distance from element center
 * For proximity-based effects
 */
export function useCursorDistance(ref: React.RefObject<HTMLElement>) {
  const [distance, setDistance] = useState(Infinity);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frameId: number;

    const updateDistance = (e: MouseEvent) => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        setDistance(dist);
      });
    };

    window.addEventListener('mousemove', updateDistance, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateDistance);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [ref]);

  return distance;
}
