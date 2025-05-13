import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fire' | 'blue' | 'mixed' | 'combined' | 'vertical';
  as?: keyof JSX.IntrinsicElements;
}

export const GradientText = ({
  children,
  className,
  variant = 'fire',
  as: Component = 'span',
}: GradientTextProps) => {
  const gradientClass = 
    variant === 'blue' ? 'gradient-text-blue' :
    variant === 'mixed' ? 'gradient-heading-mixed' :
    variant === 'combined' ? 'gradient-text-combined' : 
    variant === 'vertical' ? 'gradient-text-vertical' :
    'gradient-text-fire';

  return (
    <Component 
      className={cn(
        gradientClass, 
        "font-bold inline-block",
        className
      )}
    >
      {children}
    </Component>
  );
};