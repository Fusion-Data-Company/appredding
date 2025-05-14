import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        fire: "bg-gradient-to-r from-fire-500 via-fire-600 to-fire-700 text-white hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] border border-fire-700/50 disabled:from-fire-400 disabled:to-fire-500 disabled:hover:shadow-none",
        water: "bg-gradient-to-r from-water-500 via-water-600 to-water-700 text-white hover:shadow-[0_0_15px_rgba(0,238,255,0.5)] border border-water-700/50 disabled:from-water-400 disabled:to-water-500 disabled:hover:shadow-none",
        metal: "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-white hover:shadow-[0_0_15px_rgba(100,100,100,0.5)] border border-gray-600/50 disabled:from-gray-500 disabled:to-gray-600 disabled:hover:shadow-none",
        ghost: "bg-transparent border border-gray-600 hover:border-white/80 text-white hover:bg-white/10",
        subtle: "bg-gray-800/40 hover:bg-gray-800/60 text-gray-200 hover:text-white border border-gray-700/50",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-700/50",
        premium: "bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold hover:shadow-[0_0_15px_rgba(251,191,36,0.6)] border border-amber-400",
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

        {variant === "premium" && (
          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 opacity-30 blur-sm"></div>
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

      {/* Highlight edge effect for premium buttons */}
      {variant === "premium" && (
        <div className="absolute -inset-px rounded-md bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 opacity-30 blur-sm"></div>
      )}
    </button>
  );
};