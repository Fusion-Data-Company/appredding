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
          "bg-black text-white border-2 border-black shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        gold: 
          "bg-black text-white border-2 border-black shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        fire: 
          "bg-black text-white border-2 border-black shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transform transition-all duration-500 hover:scale-[1.02]",
        outline: 
          "bg-black text-white border-2 border-black shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        ghost: 
          "bg-black text-white border-2 border-black shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
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
          className={cn(premiumButtonVariants({ variant, size, className }), "shadow-2xl shadow-orange-500/40 drop-shadow-[0_0_45px_rgba(59,130,246,0.3)]")}
          ref={ref}
          {...props}
        >
          {/* Metallic shine effect */}
          <ShineEffect />
          
          {/* Glow effect on hover - same for all variants */}
          {glowEffect && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/0 via-blue-500/0 to-orange-500/0 group-hover:from-orange-500/0 group-hover:via-blue-500/10 group-hover:to-orange-500/0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Inner border for fire variant */}
          {isFire && (
            <div className="absolute inset-0 rounded-[10px] border border-blue-500/30 pointer-events-none"></div>
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
              {/* Base shimmer effect on the black background - always active but subtle */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 -translate-x-full animate-shimmer-slow transform rounded-lg"></div>
              
              {/* Additional hover shimmer effect on black surface */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 rounded-lg"></div>
              
              {/* Extra shimmer effect with different timing */}
              <div className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-10 -translate-x-full animate-shimmer-medium transform rounded-lg"></div>
              
              {/* Extremely prominent blue/orange glow matching cards - button size only, in front of card but behind button */}
              <div className="absolute -inset-[5px] rounded-3xl opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: 'linear-gradient(to right, rgba(249,115,22,0.3), rgba(59,130,246,0.5), rgba(249,115,22,0.3))',
                    boxShadow: '0 0 15px 8px rgba(59,130,246,0.4), 0 0 12px 5px rgba(249,115,22,0.3)',
                    animation: 'pulse 3s ease-in-out infinite',
                    zIndex: -1
                  }}>
              </div>
              
              {/* Corner accent points - premium touch matching cards exactly */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              
              {/* Button-size ambient blur glow - matching card glow across the site */}
              <div className="absolute -inset-[15px] rounded-3xl opacity-100 transition-opacity duration-1000 animate-pulse-slow" 
                   style={{ 
                     background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(249,115,22,0.2) 70%)',
                     filter: 'blur(12px)',
                     zIndex: -1
                   }}>
              </div>
                
              {/* Balanced ambient glow effect - equal on all sides, matching card glow */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[100%] h-10 bg-gradient-to-t from-orange-500/40 to-transparent blur-2xl opacity-70 transition-opacity duration-500 rounded-full">
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[100%] h-10 bg-gradient-to-b from-blue-500/40 to-transparent blur-2xl opacity-70 transition-opacity duration-500 rounded-full">
              </div>
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-[100%] w-10 bg-gradient-to-l from-orange-500/40 to-transparent blur-2xl opacity-70 transition-opacity duration-500 rounded-full">
              </div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 h-[100%] w-10 bg-gradient-to-r from-blue-500/40 to-transparent blur-2xl opacity-70 transition-opacity duration-500 rounded-full">
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