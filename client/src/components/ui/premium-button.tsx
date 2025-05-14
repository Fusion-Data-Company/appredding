import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VariantProps, cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

const premiumButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group",
  {
    variants: {
      variant: {
        default: 
          "bg-black text-white border-2 border-orange-500 shadow-lg hover:shadow-[0_0_15px_rgba(255,106,0,0.5)]",
        gold: 
          "bg-black text-white border-2 border-orange-500 shadow-lg hover:shadow-[0_0_15px_rgba(255,106,0,0.5)]",
        fire: 
          "bg-black text-white border-2 border-orange-500 shadow-lg hover:shadow-[0_0_20px_rgba(255,106,0,0.6)] transform transition-all duration-500 hover:scale-[1.02]",
        outline: 
          "bg-black text-white border-2 border-orange-500/80 shadow-lg hover:shadow-[0_0_15px_rgba(255,106,0,0.5)]",
        ghost: 
          "bg-black text-white border-2 border-orange-500/80 shadow-lg hover:shadow-[0_0_15px_rgba(255,106,0,0.4)]"
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

// Create sophisticated premium shine effects with multiple non-synchronized animations
const ShineEffect = () => (
  <>
    {/* Primary diagonal shine effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '100%', opacity: [0, 0.5, 0] }}
      transition={{ 
        repeat: Infinity, 
        repeatType: 'loop', 
        duration: 2.7,
        ease: [0.4, 0, 0.2, 1],
        repeatDelay: 1.9
      }}
      style={{
        clipPath: 'polygon(0 0, 40% 0, 30% 100%, 0 100%)',
      }}
    />
    
    {/* Secondary vertical shine effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-0 group-hover:opacity-15"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '-100%', opacity: [0, 0.4, 0] }}
      transition={{ 
        repeat: Infinity, 
        repeatType: 'loop', 
        duration: 3.5,
        ease: [0.4, 0, 0.2, 1],
        repeatDelay: 0.7
      }}
      style={{
        clipPath: 'polygon(70% 0, 85% 0, 85% 100%, 60% 100%)',
      }}
    />
    
    {/* Tertiary horizontal sweep */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-10"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '100%', opacity: [0, 0.3, 0] }}
      transition={{ 
        repeat: Infinity, 
        repeatType: 'loop', 
        duration: 3.9,
        ease: [0.4, 0, 0.2, 1],
        repeatDelay: 1.2
      }}
      style={{
        clipPath: 'polygon(0 40%, 100% 35%, 100% 65%, 0 60%)',
      }}
    />
    
    {/* Border glow pulse effect */}
    <motion.div
      className="absolute inset-0 border-[1px] border-orange-500/60 rounded-lg opacity-0 group-hover:opacity-100"
      animate={{ 
        boxShadow: ['0 0 0px rgba(249, 115, 22, 0)', '0 0 8px rgba(249, 115, 22, 0.6)', '0 0 0px rgba(249, 115, 22, 0)']
      }}
      transition={{ 
        repeat: Infinity, 
        repeatType: 'loop', 
        duration: 2,
        ease: "easeInOut",
        repeatDelay: 0.5
      }}
    />
    
    {/* Corner accent points */}
    <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </>
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
            {/* Removed outer gradient effects */}
          </>
        )}

        <button
          className={cn(premiumButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {/* Metallic shine effect */}
          <ShineEffect />
          
          {/* Glow effect on hover - same for all variants */}
          {glowEffect && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/0 group-hover:via-orange-500/10 group-hover:to-orange-500/0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Inner border for fire variant */}
          {isFire && (
            <div className="absolute inset-0 rounded-[10px] border border-orange-500/30 pointer-events-none"></div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 to-red-600/20 opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
              
              {/* Base shimmer effect - always active but subtle */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 -translate-x-full animate-shimmer-slow transform"></div>
              
              {/* Additional hover shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000"></div>
              
              {/* Enhanced orange-red glow effect */}
              <div className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ 
                    background: 'linear-gradient(to right, rgba(255,111,0,0.1), rgba(255,111,0,0) 10%, rgba(255,111,0,0) 90%, rgba(255,111,0,0.1))',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,147,47,0.5), inset 0 -1px 0 0 rgba(255,147,47,0.5), 0 0 15px 2px rgba(255,79,0,0.5)'
                  }}>
              </div>
              
              {/* Corner accent points - premium touch */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ambient glow that fades in on hover */}
              <div className="absolute -inset-[3px] rounded-lg bg-orange-500/10 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-700" 
                   style={{ 
                     boxShadow: '0 0 15px 2px rgba(251, 113, 36, 0.5), 0 0 8px 0 rgba(251, 113, 36, 0.8)' 
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