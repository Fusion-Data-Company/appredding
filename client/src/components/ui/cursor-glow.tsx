import { motion } from 'framer-motion';
import { useCursorPosition } from '@/hooks/useCursorPosition';

/**
 * Cursor Glow - Subtle gradient that follows cursor
 * Apple-inspired ambient lighting effect
 */
export function CursorGlow() {
  const { x, y } = useCursorPosition();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.06), transparent 40%)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}

/**
 * Section Spotlight - Highlights sections as cursor moves
 */
export function SectionSpotlight() {
  const { x, y } = useCursorPosition();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.03), transparent 60%)`,
        mixBlendMode: 'soft-light',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
  );
}
