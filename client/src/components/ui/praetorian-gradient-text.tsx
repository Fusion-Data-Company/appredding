import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { generatePraetorianClasses } from '@/styles/praetorianEngine';

// Create a class variance authority configuration for gradient text
const gradientTextVariants = cva(
  // Base styles applied to all gradient text
  'bg-clip-text text-transparent bg-gradient-to-r font-bold',
  {
    variants: {
      variant: {
        // Fire gradient (orange, red)
        fire: 'from-fire-300 via-fire-500 to-fire-700',
        
        // Water gradient (cyan, blue)
        water: 'from-water-300 via-water-500 to-water-700',
        
        // Dual gradient with both fire and water colors
        dual: 'from-fire-500 via-white to-water-500',
        
        // Metallic silver gradient
        metal: 'from-gray-300 via-gray-100 to-gray-400',
        
        // Purple theme gradient
        purple: 'from-purple-400 via-purple-600 to-indigo-700',
        
        // Rainbow gradient
        rainbow: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
      },
      glow: {
        none: '',
        sm: 'drop-shadow(0 0 2px currentColor)',
        md: 'drop-shadow(0 0 4px currentColor)',
        lg: 'drop-shadow(0 0 8px currentColor)',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        shimmer: 'animate-shimmer bg-[length:200%_100%]',
      },
      capitalize: {
        true: 'uppercase',
        false: 'normal-case',
      },
    },
    defaultVariants: {
      variant: 'fire',
      size: 'xl',
      weight: 'bold',
      glow: 'none',
      animation: 'none',
      capitalize: false,
    },
  }
);

// Define gradient text props interface
export interface PraetorianGradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {
  as?: React.ElementType;
  customClasses?: string;
}

// Create the PraetorianGradientText component
const PraetorianGradientText = React.forwardRef<HTMLSpanElement, PraetorianGradientTextProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      glow,
      animation,
      capitalize,
      as: Component = 'span',
      customClasses,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={cn(
          gradientTextVariants({
            variant,
            size,
            weight,
            glow,
            animation,
            capitalize,
          }),
          className,
          customClasses
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

PraetorianGradientText.displayName = 'PraetorianGradientText';

export { PraetorianGradientText, gradientTextVariants };