import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { generatePraetorianClasses } from '@/styles/praetorianEngine';

// Create a class variance authority configuration for the button
const buttonVariants = cva(
  // Base styles applied to all buttons
  'relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-70',
  {
    variants: {
      variant: {
        // Fire-themed variant - orange/red gradient with glow
        fire: 'bg-gradient-to-r from-fire-700 via-fire-500 to-fire-600 text-white rounded-lg border border-fire-600/30 shadow-lg shadow-fire-500/30 hover:shadow-fire-500/50 hover:scale-[1.02] focus:ring-fire-500/50',
        
        // Water-themed variant - cyan/blue gradient with glow
        water: 'bg-gradient-to-r from-water-700 via-water-500 to-water-600 text-white rounded-lg border border-water-600/30 shadow-lg shadow-water-500/30 hover:shadow-water-500/50 hover:scale-[1.02] focus:ring-water-500/50',
        
        // Metal-themed variant - dark gradient with subtle lighting
        metal: 'bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-lg border border-gray-700 shadow-md hover:shadow-gray-500/20 hover:bg-gradient-to-b hover:from-gray-700 hover:to-gray-800 focus:ring-gray-400/30',
        
        // Ghost variant - transparent with border
        ghost: 'bg-transparent hover:bg-gray-800/50 text-gray-300 hover:text-white rounded-lg border border-gray-700 hover:border-gray-600',
        
        // Subtle variant - very minimal styling
        subtle: 'bg-gray-900/50 hover:bg-gray-800/80 text-gray-300 hover:text-white rounded-lg border border-transparent',
        
        // White variant with dark text
        white: 'bg-white hover:bg-gray-100 text-gray-900 rounded-lg border border-gray-200 hover:border-gray-300',
        
        // Destructive red variant
        destructive: 'bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg border border-red-800 shadow-lg shadow-red-700/20 hover:shadow-red-700/40 hover:scale-[1.02] focus:ring-red-700/50',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-md',
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 px-6 py-2',
        xl: 'h-12 px-8 py-2.5 text-base',
        icon: 'h-9 w-9 p-0',
      },
      glowEffect: {
        none: '',
        pulse: 'animate-glow-pulse',
        flow: 'animate-border-flow',
      },
      roundness: {
        square: 'rounded-none',
        default: 'rounded-lg',
        pill: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'fire',
      size: 'md',
      glowEffect: 'none',
      roundness: 'default',
      fullWidth: false,
    },
  }
);

// Define button props interface
export interface PraetorianButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  customClasses?: string;
}

// Create the PraetorianButton component
const PraetorianButton = React.forwardRef<HTMLButtonElement, PraetorianButtonProps>(
  (
    {
      className,
      variant,
      size,
      glowEffect,
      roundness,
      fullWidth,
      leftIcon,
      rightIcon,
      isLoading,
      customClasses,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            glowEffect,
            roundness,
            fullWidth,
            className,
          }),
          customClasses
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-inherit">
            <svg
              className="h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        
        <span className={cn('flex items-center gap-2', isLoading ? 'invisible' : '')}>
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </span>
        
        {/* Optional animated glow effect for premium buttons */}
        {variant === 'fire' && (
          <span className="absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-r from-fire-600 to-fire-500 opacity-0 blur-xl transition-opacity group-hover:opacity-70"></span>
        )}
        {variant === 'water' && (
          <span className="absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-r from-water-600 to-water-500 opacity-0 blur-xl transition-opacity group-hover:opacity-70"></span>
        )}
      </button>
    );
  }
);

PraetorianButton.displayName = 'PraetorianButton';

export { PraetorianButton, buttonVariants };