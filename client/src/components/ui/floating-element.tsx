import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  delay?: number;
  className?: string;
}

/**
 * Floating Element - Subtle float animation for depth
 * Apple-inspired subtle motion
 */
export function FloatingElement({
  children,
  duration = 3,
  yOffset = 10,
  delay = 0,
  className = ''
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Pulse Element - Subtle scale pulse
 */
export function PulseElement({
  children,
  duration = 2,
  scale = 1.05,
  className = ''
}: {
  children: ReactNode;
  duration?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rotate Element - Continuous subtle rotation
 */
export function RotateElement({
  children,
  duration = 20,
  className = ''
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Glow Pulse - Pulsing glow effect
 */
export function GlowPulse({
  children,
  color = 'rgba(59, 130, 246, 0.5)',
  duration = 2,
  className = ''
}: {
  children: ReactNode;
  color?: string;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 20px ${color}`,
          `0 0 40px ${color}`,
          `0 0 20px ${color}`,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

