import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        fire: "bg-black text-white hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] border-2 border-orange-500 disabled:opacity-50 disabled:hover:shadow-none",
        water: "bg-black text-white hover:shadow-[0_0_15px_rgba(0,238,255,0.5)] border-2 border-blue-500 disabled:opacity-50 disabled:hover:shadow-none",
        metal: "bg-black text-white hover:shadow-[0_0_15px_rgba(100,100,100,0.5)] border-2 border-gray-500 disabled:opacity-50 disabled:hover:shadow-none",
        ghost: "bg-black text-white border-2 border-orange-500/80 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(255,106,0,0.4)]",
        subtle: "bg-black text-white border-2 border-orange-500/80 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(255,106,0,0.4)]",
        destructive: "bg-black text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] border-2 border-red-500 disabled:opacity-50 disabled:hover:shadow-none",
        premium: "bg-black text-white font-bold hover:shadow-[0_0_15px_rgba(255,106,0,0.6)] border-2 border-orange-500",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 py-2 text-sm rounded-md",
        lg: "h-12 px-6 py-3 text-base rounded-lg",
        xl: "h-14 px-8 py-4 text-lg rounded-lg",
      },
      roundness: {
        default: "",
        pill: "rounded-full",
        square: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      glowEffect: {
        none: "",
        pulse: "animate-pulse",
        ring: "hover:ring-2 hover:ring-opacity-50",
      },
    },
    defaultVariants: {
      variant: "fire",
      size: "md",
      roundness: "default",
      fullWidth: false,
      glowEffect: "none",
    },
  }
);

export interface PraetorianButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
  withShine?: boolean;
  customClasses?: string;
  href?: string;
}

export const PraetorianButton = ({
  variant,
  size,
  roundness,
  fullWidth,
  glowEffect,
  leftIcon,
  rightIcon,
  isLoading,
  children,
  withShine = false,
  customClasses,
  href,
  ...props
}: PraetorianButtonProps) => {
  const buttonClassNames = cn(
    buttonVariants({ variant, size, roundness, fullWidth, glowEffect }),
    withShine && "overflow-hidden",
    customClasses
  );
  
  // If href is provided, render an anchor tag instead of a button
  if (href) {
    return (
      <a
        href={href}
        className={buttonClassNames}
        {...props as any}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        ) : null}

        <span className="relative z-10">{children}</span>

        {!isLoading && rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}

        {withShine && (
          <div className="absolute inset-0 overflow-hidden rounded-md">
            <div className="absolute -inset-[400%] animate-[shine_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        )}
        
        {/* Sophisticated reflection effects with multiple non-synchronized animations */}
        <div className="absolute inset-0 overflow-hidden rounded-md opacity-0 group-hover:opacity-100">
          {/* Primary diagonal shine */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
            style={{ 
              clipPath: 'polygon(0 0, 40% 0, 30% 100%, 0 100%)',
              animation: 'reflectLeft 2.7s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          ></div>
          
          {/* Secondary vertical shine */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-transparent" 
            style={{ 
              clipPath: 'polygon(70% 0, 85% 0, 85% 100%, 60% 100%)',
              animation: 'reflectTop 3.5s cubic-bezier(0.4, 0, 0.2, 1) 0.7s infinite',
            }}
          ></div>
          
          {/* Tertiary horizontal sweep */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
            style={{ 
              clipPath: 'polygon(0 40%, 100% 35%, 100% 65%, 0 60%)',
              animation: 'slideRight 3.9s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite',
            }}
          ></div>
        </div>
        
        {/* Border glow animation for fire variant */}
        {variant === "fire" && (
          <div className="absolute inset-0 rounded-md border border-orange-500/60 opacity-0 group-hover:opacity-100" 
            style={{ 
              animation: 'borderPulse 2s ease-in-out infinite',
            }}
          ></div>
        )}

        {variant === "premium" && (
          <>
            {/* Enhanced orange-red glow effect for premium buttons */}
            <div className="absolute -inset-px rounded-md bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 opacity-30 blur-sm"
                 style={{ 
                   animation: 'borderPulse 2s ease-in-out infinite',
                   boxShadow: '0 0 5px 1px rgba(255, 106, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                 }}>
            </div>
            
            {/* Ambient glow that fades in on hover */}
            <div className="absolute -inset-[2px] rounded-md bg-orange-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                 style={{ 
                   boxShadow: '0 0 8px 2px rgba(251, 113, 36, 0.4), 0 0 2px 0 rgba(255, 255, 255, 0.2)' 
                 }}>
            </div>
            
            {/* Corner accent points */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px]"></div>
          </>
        )}
      </a>
    );
  }
  
  // Otherwise, render a button
  return (
    <button
      className={buttonClassNames}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : leftIcon ? (
        <span className="mr-2 flex items-center">{leftIcon}</span>
      ) : null}

      <span className="relative z-10">{children}</span>

      {!isLoading && rightIcon && (
        <span className="ml-2 flex items-center">{rightIcon}</span>
      )}

      {withShine && (
        <div className="absolute inset-0 overflow-hidden rounded-md">
          <div className="absolute -inset-[400%] animate-[shine_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      )}
      
      {/* Sophisticated reflection effects with multiple non-synchronized animations */}
      <div className="absolute inset-0 overflow-hidden rounded-md opacity-0 group-hover:opacity-100">
        {/* Primary diagonal shine */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
          style={{ 
            clipPath: 'polygon(0 0, 40% 0, 30% 100%, 0 100%)',
            animation: 'reflectLeft 2.7s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        ></div>
        
        {/* Secondary vertical shine */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-transparent" 
          style={{ 
            clipPath: 'polygon(70% 0, 85% 0, 85% 100%, 60% 100%)',
            animation: 'reflectTop 3.5s cubic-bezier(0.4, 0, 0.2, 1) 0.7s infinite',
          }}
        ></div>
        
        {/* Tertiary horizontal sweep */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
          style={{ 
            clipPath: 'polygon(0 40%, 100% 35%, 100% 65%, 0 60%)',
            animation: 'slideRight 3.9s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite',
          }}
        ></div>
      </div>
      
      {/* Border glow animation for fire variant */}
      {variant === "fire" && (
        <div className="absolute inset-0 rounded-md border border-orange-500/60 opacity-0 group-hover:opacity-100" 
          style={{ 
            animation: 'borderPulse 2s ease-in-out infinite',
          }}
        ></div>
      )}

      {/* Highlight edge effect for premium buttons */}
      {variant === "premium" && (
        <>
          {/* Enhanced orange-red glow effect for premium buttons */}
          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 opacity-30 blur-sm"></div>
          
          {/* Ambient glow that fades in on hover */}
          <div className="absolute -inset-[3px] rounded-lg bg-orange-500/10 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-700" 
               style={{ 
                 boxShadow: '0 0 15px 2px rgba(251, 113, 36, 0.5), 0 0 8px 0 rgba(251, 113, 36, 0.8)' 
               }}>
          </div>
          
          {/* Corner accent points */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500/70 rounded-full blur-[1px]"></div>
        </>
      )}
    </button>
  );
};