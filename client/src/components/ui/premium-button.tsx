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
          "bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white border-2 border-blue-500/40 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.01]",
        gold: 
          "bg-gradient-to-br from-amber-950 via-black to-amber-950 text-white border-2 border-amber-500/40 shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:border-amber-400/50 transition-all duration-500 hover:scale-[1.01]",
        fire: 
          "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white border-2 border-blue-500/40 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transform transition-all duration-500 hover:scale-[1.02] hover:border-blue-400/50",
        outline: 
          "bg-black text-white border-2 border-blue-500/40 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        ghost: 
          "bg-black text-white border-2 border-blue-500/30 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
      },
      size: {
        sm: "h-12 px-5 py-3 text-base rounded-lg",
        md: "h-14 px-7 py-4 text-lg rounded-lg",
        lg: "h-16 px-10 py-5 text-xl rounded-xl",
        xl: "h-20 px-12 py-6 text-2xl rounded-xl",
        xxl: "h-24 px-16 py-8 text-3xl rounded-xl",
        xxxl: "h-32 px-20 py-10 text-4xl font-bold rounded-xl"
      } as const,
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
          className={cn(
            premiumButtonVariants({ variant, size, className }), 
            "shadow-2xl shadow-orange-500/40 drop-shadow-[0_0_45px_rgba(59,130,246,0.3)]",
            "backdrop-filter backdrop-blur-[1px]"
          )}
          ref={ref}
          {...props}
        >
          {/* Metallic shine effect */}
          <ShineEffect />
          
          {/* Hover glow effect removed as requested */}
          
          {/* Inner border and glass effects for fire variant */}
          {isFire && (
            <>
              <div className="absolute inset-0 rounded-[10px] border border-blue-500/40 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none opacity-30"></div>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 rounded-full"></div>
              <div className="absolute inset-0 rounded-[10px] backdrop-blur-[0.5px] opacity-50 pointer-events-none"></div>
            </>
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
            
            {/* Text with subtle text shadow for fire variant and gradient effect on hover */}
            <span className={cn(
              "transition-all duration-500 tracking-wide",
              isFire ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "",
              "group-hover:text-gradient font-medium"
            )}>
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
                    background: 'linear-gradient(to right, rgba(249,115,22,0.3), rgba(59,130,246,0.6), rgba(249,115,22,0.3))',
                    boxShadow: '0 0 25px 12px rgba(59,130,246,0.5), 0 0 15px 10px rgba(249,115,22,0.4), 0 0 40px 20px rgba(59,130,246,0.3)',
                    animation: 'pulse 3s ease-in-out infinite',
                    zIndex: -1
                  }}>
              </div>
              
              {/* Additional animated gradient border for premium effect */}
              <div className="absolute -inset-[2px] rounded-3xl opacity-90 transition-opacity duration-500 overflow-hidden"
                  style={{ 
                    zIndex: -1
                  }}>
                <div className="absolute inset-0 rounded-3xl animate-spin-very-slow"
                     style={{
                       background: 'conic-gradient(from 0deg, transparent, rgba(59,130,246,0.8), rgba(249,115,22,0.6), transparent)'
                     }}>
                </div>
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