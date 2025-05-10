import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { generatePraetorianClasses } from '@/styles/praetorianEngine';

// Create a class variance authority configuration for the card
const cardVariants = cva(
  // Base styles applied to all cards
  'relative overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        // Default premium dark card with subtle gradient
        premium: 'bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-gray-800/70 rounded-xl shadow-xl backdrop-blur-sm',
        
        // Fire-themed card with orange accents and glow
        fire: 'bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-fire-900/50 rounded-xl shadow-xl shadow-fire-500/10 backdrop-blur-sm',
        
        // Water-themed card with cyan accents and glow
        water: 'bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-water-900/50 rounded-xl shadow-xl shadow-water-500/10 backdrop-blur-sm',
        
        // Metal-style card with beveled edges and subtle lighting effects
        metal: 'bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 border border-gray-700 rounded-xl shadow-metal backdrop-blur-sm',
        
        // Glass-style card with high transparency
        glass: 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-glass',
        
        // Outline card with minimal styling
        outline: 'bg-transparent border border-gray-800 rounded-xl',
      },
      hover: {
        // Different hover effects
        none: '',
        lift: 'hover:translate-y-[-4px] hover:shadow-lg',
        scale: 'hover:scale-[1.02]',
        glow: 'hover:shadow-lg',
        border: 'hover:border-gray-700',
      },
      animation: {
        none: '',
        fadeIn: 'animate-fadeIn',
        float: 'animate-float',
      },
      roundness: {
        none: 'rounded-none',
        sm: 'rounded-md',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-3xl',
      },
    },
    defaultVariants: {
      variant: 'premium',
      hover: 'lift',
      animation: 'none',
      roundness: 'md',
    },
  }
);

// Define card props interface
export interface PraetorianCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  withShimmer?: boolean;
  withInnerGlow?: boolean;
  glowColor?: 'cyan' | 'orange' | 'white';
  customClasses?: string;
}

// Create the PraetorianCard component
const PraetorianCard = React.forwardRef<HTMLDivElement, PraetorianCardProps>(
  (
    {
      className,
      variant,
      hover,
      animation,
      roundness,
      withShimmer,
      withInnerGlow,
      glowColor = 'cyan',
      customClasses,
      children,
      ...props
    },
    ref
  ) => {
    // Set up the glow color class based on the glowColor prop
    const glowColorClass = glowColor === 'orange' 
      ? 'from-orange-500/20 via-orange-500/5 to-transparent' 
      : glowColor === 'white'
      ? 'from-white/20 via-white/5 to-transparent'
      : 'from-cyan-500/20 via-cyan-500/5 to-transparent';
    
    return (
      <div
        className={cn(
          cardVariants({
            variant,
            hover,
            animation,
            roundness,
          }),
          className,
          customClasses
        )}
        ref={ref}
        {...props}
      >
        {/* Optional inner lighting effect */}
        {withInnerGlow && (
          <div className={`absolute inset-0 rounded-[inherit] bg-gradient-radial ${glowColorClass} opacity-60 pointer-events-none`}></div>
        )}
        
        {/* Optional shimmer effect */}
        {withShimmer && (
          <div 
            className="absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none"
          ></div>
        )}
        
        {/* Card content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Variant-specific effects */}
        {variant === 'fire' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fire-900 via-fire-600 to-fire-900"></div>
        )}
        {variant === 'water' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-water-900 via-water-600 to-water-900"></div>
        )}
      </div>
    );
  }
);

PraetorianCard.displayName = 'PraetorianCard';

export { PraetorianCard, cardVariants };