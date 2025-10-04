import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { shadows } from '@/utils/theme';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverLift?: boolean;
  glowColor?: string;
}

/**
 * Enhanced Card - Apple-inspired card with sophisticated interactions
 * Features: Lift on hover, glow effects, smooth transforms
 */
export function EnhancedCard({ 
  children, 
  className = '',
  hoverScale = 1.02,
  hoverLift = true,
  glowColor = 'rgba(59, 130, 246, 0.4)'
}: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: hoverScale,
        y: hoverLift ? -8 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      style={{
        boxShadow: isHovered 
          ? `0 20px 40px -10px ${glowColor}, ${shadows.xl}`
          : shadows.lg,
      }}
    >
      {children}
      
      {/* Subtle gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        }}
      />
    </motion.div>
  );
}

/**
 * Interactive Card with tilt effect
 * More dramatic interaction for feature cards
 */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = '', maxTilt = 10 }: TiltCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`${className} gpu-accelerate`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

