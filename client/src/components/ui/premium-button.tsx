import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VariantProps, cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

const premiumButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 hover:from-amber-800 hover:via-amber-700 hover:to-amber-800 text-white border border-amber-500/20 shadow-lg hover:shadow-xl hover:shadow-amber-500/20",
        gold: 
          "bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 hover:from-amber-500 hover:via-amber-400 hover:to-amber-600 text-amber-950 border border-amber-300 shadow-lg hover:shadow-xl hover:shadow-amber-400/20",
        outline: 
          "bg-gradient-to-br from-white via-amber-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-md hover:shadow-lg",
        ghost: 
          "bg-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-none"
      },
      size: {
        sm: "h-9 px-3 py-2 text-xs rounded-lg",
        md: "h-10 px-4 py-2 text-sm rounded-lg",
        lg: "h-12 px-6 py-3 text-base rounded-xl",
        xl: "h-14 px-8 py-4 text-lg rounded-xl"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Create a shine effect animation for the button
const ShineEffect = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10"
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: '100%', opacity: [0, 0.5, 0] }}
    transition={{ 
      repeat: Infinity, 
      repeatType: 'loop', 
      duration: 2,
      repeatDelay: 1
    }}
  />
);

export interface PremiumButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glowEffect?: boolean;
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, icon, iconPosition = 'left', glowEffect = true, children, ...props }, ref) => {
    return (
      <button
        className={cn(premiumButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Metallic shine effect */}
        <ShineEffect />
        
        {/* Glow effect on hover */}
        {glowEffect && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/0 via-amber-300/0 to-amber-300/0 group-hover:from-amber-300/0 group-hover:via-amber-300/20 group-hover:to-amber-300/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };