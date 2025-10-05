import { useTransform, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Advanced Parallax Hook - Apple-inspired depth through motion
 * Creates smooth parallax effects based on scroll position
 */
export function useParallax(offset: number = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return { ref, y, style: { position: 'relative' } };
}

/**
 * Multi-layer Parallax - Different speeds for depth
 */
export function useMultiLayerParallax() {
  const { scrollY } = useScroll();

  // Different layers move at different speeds for depth
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);
  const midgroundY = useTransform(scrollY, [0, 1000], [0, 100]);
  const foregroundY = useTransform(scrollY, [0, 1000], [0, 50]);

  return { backgroundY, midgroundY, foregroundY };
}

/**
 * Scale on Scroll - Elements scale as they scroll into view
 */
export function useScrollScale(start: number = 0.8, end: number = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [start, end, start]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { ref, scale, opacity };
}

/**
 * Rotate on Scroll - Subtle rotation for dynamic effect
 */
export function useScrollRotate(maxRotation: number = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-maxRotation, 0, maxRotation]
  );

  return { ref, rotate };
}

/**
 * Fade on Scroll - Smooth entrance/exit
 */
export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.1']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return { ref, opacity, y };
}

/**
 * Perspective Scroll - 3D depth effect
 */
export function useScrollPerspective() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return { ref, rotateX, scale };
}

