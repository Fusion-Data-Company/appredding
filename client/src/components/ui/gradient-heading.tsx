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
  // Shadow class based on original variant for consistent styling
  const shadowClass = 
    variant === 'blue' 
      ? 'drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]' 
      : variant === 'fire' 
        ? 'drop-shadow-[0_2px_4px_rgba(249,115,22,0.5)]' 
        : 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]';
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={cn(
      "font-sans font-bold text-center mx-auto text-lg md:text-xl lg:text-2xl text-white", 
      shadowClass, 
      className
    )}>
      {children}
    </Tag>
  );
};