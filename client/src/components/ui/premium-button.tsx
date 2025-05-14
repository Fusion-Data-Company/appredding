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
        fire: 
          "bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white border border-orange-400/30 shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transform transition-all duration-500 hover:scale-[1.02]",
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
    const isFire = variant === 'fire';
    
    return (
      <div className={isFire ? "relative group" : ""}>
        {/* Fire variant's outer gradient effects */}
        {isFire && (
          <>
            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-600/40 via-red-600/40 to-amber-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-amber-500/80 to-red-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-amber-600/10 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-1000"></div>
          </>
        )}

        <button
          className={cn(premiumButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {/* Metallic shine effect */}
          <ShineEffect />
          
          {/* Glow effect on hover */}
          {glowEffect && !isFire && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/0 via-amber-300/0 to-amber-300/0 group-hover:from-amber-300/0 group-hover:via-amber-300/20 group-hover:to-amber-300/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Inner border for fire variant */}
          {isFire && (
            <div className="absolute inset-px rounded-[10px] border border-orange-400/30 pointer-events-none"></div>
          )}

          {/* Button Content */}
          <span className="relative z-10 flex items-center gap-2">
            {/* Icon with specialized glow for fire variant */}
            {icon && iconPosition === 'left' && (
              <div className={isFire ? "relative" : ""}>
                {isFire && <div className="absolute inset-0 bg-orange-500/30 blur-md rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>}
                <div className={isFire ? "relative z-10 animate-subtle-bounce" : ""}>{icon}</div>
              </div>
            )}
            
            {/* Text with subtle text shadow for fire variant */}
            <span className={isFire ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : ""}>
              {children}
            </span>
            
            {icon && iconPosition === 'right' && (
              <div className={isFire ? "relative" : ""}>
                {isFire && <div className="absolute inset-0 bg-orange-500/30 blur-md rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>}
                <div className={isFire ? "relative z-10 animate-subtle-bounce" : ""}>{icon}</div>
              </div>
            )}
          </span>
          
          {/* Enhanced Shimmer effect animation for fire variant - always active */}
          {isFire && (
            <>
              {/* Ambient inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Base shimmer effect - always active */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 -translate-x-full animate-shimmer-slow transform"></div>
              
              {/* Additional hover shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000"></div>
              
              {/* Edge highlight on hover */}
              <div className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ 
                    background: 'linear-gradient(to right, rgba(255,111,0,0.1), rgba(255,111,0,0) 10%, rgba(255,111,0,0) 90%, rgba(255,111,0,0.1))',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,147,47,0.4), inset 0 -1px 0 0 rgba(255,147,47,0.4)'
                  }}>
              </div>
            </>
          )}
        </button>
        
        {/* Bottom reflection and additional effects for fire variant */}
        {isFire && (
          <>
            {/* Primary bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
            
            {/* Secondary wider reflection - visible on hover */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5/6 h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Subtle colored drop shadow - visible on hover */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] bg-orange-600/10 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </>
        )}
      </div>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };