import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useRelativeCursorPosition } from '@/hooks/useCursorPosition';

interface DynamicShadowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Dynamic Shadow - Shadow follows cursor position
 * Creates realistic depth and lighting
 */
export function DynamicShadow({
  children,
  className = '',
  intensity = 20,
}: DynamicShadowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, isInside } = useRelativeCursorPosition(ref);

  // Calculate shadow offset based on cursor position
  const getShadowOffset = () => {
    if (!ref.current || !isInside) return { x: 0, y: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Invert shadow direction (opposite of cursor)
    const offsetX = ((centerX - x) / centerX) * intensity;
    const offsetY = ((centerY - y) / centerY) * intensity;

    return { x: offsetX, y: offsetY };
  };

  const offset = getShadowOffset();

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        boxShadow: isInside
          ? `${offset.x}px ${offset.y}px ${intensity * 2}px rgba(0, 0, 0, 0.2), ${offset.x * 0.5}px ${offset.y * 0.5}px ${intensity}px rgba(0, 0, 0, 0.1)`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Glow Shadow - Adds colored glow that responds to cursor
 */
export function GlowShadow({
  children,
  className = '',
  color = 'rgba(59, 130, 246, 0.4)',
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isInside } = useRelativeCursorPosition(ref);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        boxShadow: isInside
          ? `0 0 40px ${color}, 0 0 80px ${color.replace('0.4', '0.2')}`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
}
