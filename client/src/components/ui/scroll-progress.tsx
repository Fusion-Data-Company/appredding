import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Indicator - Apple-inspired smooth progress bar
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

