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
          "bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white border-2 border-blue-400/80 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-300/90 transition-all duration-500 hover:scale-[1.01]",
        gold: 
          "bg-gradient-to-br from-amber-950 via-black to-amber-950 text-white border-2 border-amber-400/80 shadow-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:border-amber-300/90 transition-all duration-500 hover:scale-[1.01]",
        fire: 
          "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white border-2 border-blue-400/80 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transform transition-all duration-500 hover:scale-[1.02] hover:border-blue-300/90",
        outline: 
          "bg-black text-white border-2 border-blue-400/80 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        ghost: 
          "bg-black text-white border-2 border-blue-400/80 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
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

// ShineEffect component for metallic buttons
const ShineEffect = () => (
  <>
    {/* Initial gradient light reflection from top edge */}
    <div 
      className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100"
    ></div>
    
    {/* Diagonal shine 1 - subtle constant reflection surface */}
    <div 
      className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-white/10 transform skew-x-12 opacity-30"
    ></div>
    
    {/* Diagonal shine 2 - enhanced edge highlight */}
    <div 
      className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-r from-transparent to-white/20 transform skew-x-12 opacity-20"
    ></div>
    
    {/* Moving light reflection */}
    <motion.div
      className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
      animate={{
        x: ['-100%', '300%'],
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 1.5,
        ease: "easeInOut",
        repeatDelay: 3
      }}
    />
    
    {/* Secondary light reflection at different angle */}
    <motion.div
      className="absolute top-0 left-0 w-[10%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
      animate={{
        x: ['-100%', '500%'],
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 2,
        ease: "easeInOut",
        repeatDelay: 1,
        delay: 0.3
      }}
    />
    
    {/* Bottom edge reflection */}
    <div 
      className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-100"
    ></div>
    
    {/* Button face light scan effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
      style={{
        clipPath: 'polygon(0 40%, 100% 35%, 100% 65%, 0 60%)',
      }}
    />
    
    {/* Corner accent points - improved contrast */}
    <div className="absolute top-0 left-0 w-2 h-2 bg-white/80 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/80 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

        <button
          className={cn(
            premiumButtonVariants({ variant, size, className }), 
            "shadow-2xl shadow-gray-900/40 drop-shadow-[0_0_45px_rgba(0,0,0,0.3)]",
            "backdrop-filter backdrop-blur-[1px]",
            "relative z-10" // Ensure button is above ambient glow
          )}
          ref={ref}
          {...props}
        >
          {/* Metallic shine effect */}
          <ShineEffect />
          
          {/* Inner border and glass effects for fire variant */}
          {isFire && (
            <>
              <div className="absolute inset-0 rounded-[10px] border border-gray-400/60 pointer-events-none"></div>
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
                {isFire && <div className="absolute inset-0 bg-gray-400/40 blur-md rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>}
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
                {isFire && <div className="absolute inset-0 bg-gray-400/40 blur-md rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>}
                <div className={isFire ? "relative z-10 animate-subtle-bounce" : ""}>{icon}</div>
              </div>
            )}
          </span>
          
          {/* Enhanced Shimmer effect animation for fire variant - always active */}
          {isFire && (
            <>
              {/* Elite Enterprise Shimmer - dynamic multi-layer effect (pulled behind the button) */}
              <div className="absolute -inset-8 z-[-1]">
                {/* Purple glow background effect */}
                <div className="absolute inset-0 bg-purple-600/10 rounded-full blur-xl"></div>
                <div className="absolute inset-0 bg-purple-500/5 rounded-xl blur-2xl"></div>
              </div>
              
              {/* Button shine effects */}
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg z-[1]">
                {/* Primary diagonal shimmer with blue tint */}
                <div className="absolute inset-0 w-[120%] h-[200%] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-70 -translate-x-full animate-shimmer-slow transform skew-x-[-20deg]"></div>
                
                {/* Secondary diagonal shimmer with white highlight */}
                <div className="absolute inset-0 w-[70%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 -translate-x-full animate-shimmer-medium transform skew-x-[-20deg]" style={{ animationDelay: '0.3s' }}></div>
                
                {/* Tertiary thinner shimmer with blue highlight */}
                <div className="absolute inset-0 w-[40%] h-[200%] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent opacity-80 -translate-x-full animate-shimmer-fast transform skew-x-[-20deg]" style={{ animationDelay: '0.7s' }}></div>
                
                {/* Crystal edge highlight - top edge */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                
                {/* Crystal edge highlight - bottom edge */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
              
              {/* Additional hover shimmer effect - more pronounced on hover */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 rounded-lg"></div>
              
              {/* Corner accent points - premium touch with enhanced visibility */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-blue-200/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-blue-200/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-200/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-200/90 rounded-full blur-[1px] opacity-100 transition-opacity duration-300"></div>
            </>
          )}
        </button>
        
        {/* Bottom reflection and additional effects for fire variant */}
        {isFire && (
          <>
            {/* Secondary wider reflection - visible on hover */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5/6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Subtle colored drop shadow - visible on hover */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] bg-blue-600/10 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </>
        )}
      </div>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };