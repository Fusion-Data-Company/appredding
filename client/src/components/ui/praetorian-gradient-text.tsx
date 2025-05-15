import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const gradientTextVariants = cva(
  "text-white inline-block drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",
  {
    variants: {
      variant: {
        fire: "",
        water: "",
        dual: "",
        metal: "",
        amber: "",
        rainbow: "",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
        "6xl": "text-6xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      capitalize: {
        true: "uppercase",
        false: "",
      },
      glow: {
        none: "",
        sm: "text-shadow-sm",
        md: "text-shadow-md",
        lg: "text-shadow-lg",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        shimmer: "animate-shimmer-text",
      },
    },
    defaultVariants: {
      variant: "dual",
      size: "xl",
      weight: "bold",
      capitalize: false,
      glow: "none",
      animation: "none",
    },
  }
);

export interface PraetorianGradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {
  as?: React.ElementType;
  customClasses?: string;
}

export const PraetorianGradientText = ({
  variant,
  size,
  weight,
  capitalize,
  glow,
  animation,
  as: Component = "span",
  customClasses,
  children,
  ...props
}: PraetorianGradientTextProps) => {
  // Generate shadow colors based on variant
  const shadowColorMap = {
    fire: "var(--fire-glow-color, rgba(255, 106, 0, 0.7))",
    water: "var(--water-glow-color, rgba(0, 238, 255, 0.7))",
    dual: "var(--dual-glow-color, rgba(255, 255, 255, 0.7))",
    metal: "var(--metal-glow-color, rgba(200, 200, 200, 0.5))",
    amber: "var(--amber-glow-color, rgba(245, 158, 11, 0.7))",
    rainbow: "var(--rainbow-glow-color, rgba(255, 255, 255, 0.7))",
  };
  
  // Apply text shadow based on glow intensity
  const glowStyles = glow !== 'none' && variant ? {
    '--fire-glow-color': 'rgba(255, 106, 0, 0.7)',
    '--water-glow-color': 'rgba(0, 238, 255, 0.7)', 
    '--dual-glow-color': 'rgba(255, 255, 255, 0.7)',
    '--metal-glow-color': 'rgba(200, 200, 200, 0.5)',
    '--amber-glow-color': 'rgba(245, 158, 11, 0.7)',
    '--rainbow-glow-color': 'rgba(255, 255, 255, 0.7)',
    textShadow: glow === 'sm' 
      ? `0 0 5px ${shadowColorMap[variant!]}`
      : glow === 'md'
      ? `0 0 10px ${shadowColorMap[variant!]}, 0 0 5px ${shadowColorMap[variant!]}`
      : `0 0 15px ${shadowColorMap[variant!]}, 0 0 10px ${shadowColorMap[variant!]}, 0 0 5px ${shadowColorMap[variant!]}`
  } as React.CSSProperties : {};

  // Apply animation styles
  const animationStyles = animation === 'shimmer' ? {
    backgroundSize: '200% auto',
    animation: 'shimmer-text 3s linear infinite',
  } as React.CSSProperties : {};
  
  return (
    <Component
      className={cn(
        gradientTextVariants({ 
          variant, 
          size, 
          weight, 
          capitalize, 
          glow, 
          animation 
        }),
        customClasses
      )}
      style={{
        ...glowStyles,
        ...animationStyles,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};