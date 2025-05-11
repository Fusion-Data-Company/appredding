import React from 'react';
import { cn } from '@/lib/utils';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'blue' | 'fire' | 'mixed';
}

export const GradientHeading = ({
  children,
  className,
  level = 2,
  variant = 'mixed',
}: GradientHeadingProps) => {
  const gradientClass = 
    variant === 'blue' 
      ? 'gradient-text-blue' 
      : variant === 'fire' 
        ? 'gradient-text-fire' 
        : 'gradient-heading-mixed';
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={cn("font-heading font-bold text-center mx-auto", gradientClass, className)}>
      {children}
    </Tag>
  );
};