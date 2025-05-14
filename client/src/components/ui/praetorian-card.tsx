import React, { HTMLAttributes } from "react";
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "relative transition-all duration-300",
  {
    variants: {
      variant: {
        fire: "bg-gradient-to-br from-black via-gray-900 to-fire-950 border border-fire-900/40 shadow-md text-white",
        water: "bg-gradient-to-br from-black via-gray-900 to-water-950 border border-water-900/40 shadow-md text-white",
        metal: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 border border-gray-700/40 shadow-md text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700/40 via-gray-900 to-black",
        glass: "bg-black/40 backdrop-blur-md border border-white/10 shadow-xl text-white",
        premium: "bg-gray-800/60 backdrop-blur-xl border-0 shadow-lg text-white premium-gradient-border",
        outline: "bg-black/60 border border-gray-700/50 text-white",
      },
      roundness: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-[28px]",
      },
      withShimmer: {
        true: "overflow-hidden",
        false: "",
      },
      withInnerGlow: {
        true: "relative",
        false: "",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        scale: "hover:scale-[1.02]",
        border: "hover:border-white/40",
        glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
      },
      animation: {
        none: "",
        float: "animate-float",
        pulse: "animate-pulse",
        shimmer: "after:shimmer",
        fadeIn: "animate-fade-in",
      },
    },
    defaultVariants: {
      variant: "fire",
      roundness: "md",
      withShimmer: false,
      withInnerGlow: false,
      hover: "none",
      animation: "none",
    },
  }
);

export interface PraetorianCardProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    glowColor?: 'orange' | 'cyan' | 'white' | 'purple';
    customClasses?: string;
    children: React.ReactNode;
}

export const PraetorianCard = ({
  variant,
  roundness,
  withShimmer,
  withInnerGlow,
  hover,
  animation,
  glowColor = 'white',
  customClasses,
  children,
  ...props
}: PraetorianCardProps) => {
  // Map glow colors
  const glowColorMap = {
    orange: "from-orange-500/30",
    cyan: "from-cyan-500/30",
    purple: "from-purple-500/30",
    white: "from-white/20"
  };
  
  const selectedGlowColor = glowColorMap[glowColor];
  
  return (
    <div
      className={cn(
        cardVariants({ variant, roundness, withShimmer, withInnerGlow, hover, animation }),
        customClasses
      )}
      {...props}
    >
      {/* Add an inner glow effect */}
      {withInnerGlow && (
        <div className={`absolute inset-0 ${roundness !== 'none' ? cardVariants({ roundness }) : ''} bg-gradient-radial ${selectedGlowColor} via-transparent to-transparent opacity-60 pointer-events-none`}></div>
      )}
      
      {/* Shimmer effect */}
      {withShimmer && (
        <div className="absolute inset-0 w-full overflow-hidden">
          <div className="absolute -inset-[100%] animate-[metalShimmer_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-45"></div>
        </div>
      )}
      
      {/* Content - with relative position to go above effects */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* We're now using the premium-gradient-border class which handles the border effect */}
    </div>
  );
};