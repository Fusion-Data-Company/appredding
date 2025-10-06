import React from 'react';
import { cn } from '@/lib/utils';

export interface AmbientGlowProps {
  color?: 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  children?: React.ReactNode;
}

/**
 * AmbientGlow component creates a background glow effect that sits behind other elements
 * without affecting their appearance. The glow is completely separate from the content.
 */
export function AmbientGlow({
  color = 'blue',
  size = 'md',
  intensity = 'medium',
  className,
  children,
}: AmbientGlowProps) {
  // Define color variations
  const colorVariants = {
    blue: 'bg-blue-600',
    green: 'bg-orange-600',
    purple: 'bg-purple-600',
  };

  // Define size variations
  const sizeVariants = {
    sm: '-inset-2',
    md: '-inset-4',
    lg: '-inset-6',
    xl: '-inset-8',
  };

  // Define intensity variations (opacity and blur)
  const intensityVariants = {
    low: {
      opacity: 'opacity-20',
      blur: 'blur-md',
    },
    medium: {
      opacity: 'opacity-30',
      blur: 'blur-xl',
    },
    high: {
      opacity: 'opacity-40',
      blur: 'blur-2xl',
    },
  };

  return (
    <div className="relative">
      {/* The ambient glow effect that sits behind the content */}
      <div
        className={cn(
          "absolute rounded-full z-0 transition-opacity duration-500 animate-pulse-slow",
          colorVariants[color] + '/20',
          sizeVariants[size],
          intensityVariants[intensity].opacity,
          intensityVariants[intensity].blur,
          className
        )}
      />
      
      {/* The content that sits on top of the glow */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}