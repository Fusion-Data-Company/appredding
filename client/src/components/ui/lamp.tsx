import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const lampVariants = cva(
  "relative w-full max-w-md mx-auto overflow-hidden isolate",
  {
    variants: {
      variant: {
        default: "h-[400px]",
        small: "h-[300px]",
        large: "h-[500px]",
        hero: "h-[600px]",
      },
      shape: {
        rounded: "rounded-xl",
        circle: "rounded-full",
        square: "rounded-none",
        pill: "rounded-[28px]",
      },
      border: {
        none: "",
        thin: "border border-gray-800",
        medium: "border-2 border-gray-800",
        glow: "border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
      border: "thin",
    },
  }
);

export interface LampProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lampVariants> {
  blobs?: "minimal" | "standard" | "complex";
  initialGlowScale?: number;
  pulseEffect?: boolean;
  freeze?: boolean;
  freezeTime?: number;
  interactive?: boolean;
}

export function Lamp({
  className,
  variant,
  shape,
  border,
  blobs = "standard",
  initialGlowScale = 1.0,
  pulseEffect = true,
  freeze = false,
  freezeTime = 3300, // Default to 3.3 seconds
  interactive = false,
  children,
  ...props
}: LampProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const freezeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isFreezingRef = useRef<boolean>(freeze);
  const isFrozenRef = useRef<boolean>(false);
  
  // Handle interactive pointer movements
  useEffect(() => {
    if (!interactive || isFrozenRef.current) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    function handlePointerMove(event: PointerEvent) {
      if (isFrozenRef.current || !container) return;
      
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      
      const orangeGlow = container.querySelector('.orange-glow') as HTMLElement | null;
      const blueGlow = container.querySelector('.blue-glow') as HTMLElement | null;
      
      if (orangeGlow && blueGlow) {
        // Move the orange glow based on pointer position
        orangeGlow.style.transform = `translate(${(x - 0.5) * 50}%, ${(y - 0.5) * 30}%)`;
        
        // Move the blue glow in the opposite direction
        blueGlow.style.transform = `translate(${(0.5 - x) * 50}%, ${(0.5 - y) * 30}%)`;
      }
    }
    
    container.addEventListener('pointermove', handlePointerMove);
    
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, [interactive]);
  
  // Freeze effect after specified time
  useEffect(() => {
    if (!isFreezingRef.current || isFrozenRef.current) return;
    
    freezeTimerRef.current = setTimeout(() => {
      console.log('Freezing lamp animation');
      isFrozenRef.current = true;
      
      // Apply frozen styles
      const container = containerRef.current;
      if (container) {
        const orangeGlow = container.querySelector('.orange-glow') as HTMLElement;
        const blueGlow = container.querySelector('.blue-glow') as HTMLElement;
        
        if (orangeGlow) {
          orangeGlow.style.animation = 'none';
          orangeGlow.style.opacity = '0.9';
        }
        
        if (blueGlow) {
          blueGlow.style.animation = 'none';
          blueGlow.style.opacity = '0.9';
        }
      }
    }, freezeTime);
    
    return () => {
      if (freezeTimerRef.current) {
        clearTimeout(freezeTimerRef.current);
      }
    };
  }, [freezeTime]);

  return (
    <div 
      ref={containerRef}
      className={cn(lampVariants({ variant, shape, border }), className)}
      {...props}
    >
      {/* Fire glow */}
      <div 
        className={cn(
          "orange-glow absolute w-[200%] aspect-square rounded-[40%] bg-gradient-radial from-orange-500/80 via-orange-500/50 to-transparent -top-[50%] -right-[50%] mix-blend-soft-light",
          pulseEffect && !isFrozenRef.current && "animate-pulse-slow"
        )}
        style={{ 
          transform: `scale(${initialGlowScale})`,
          opacity: 0.8,
        }}
      />
      
      {/* Water glow */}
      <div 
        className={cn(
          "blue-glow absolute w-[200%] aspect-square rounded-[40%] bg-gradient-radial from-cyan-500/80 via-cyan-500/50 to-transparent -bottom-[50%] -left-[50%] mix-blend-soft-light",
          pulseEffect && !isFrozenRef.current && "animate-pulse-slow"
        )}
        style={{ 
          transform: `scale(${initialGlowScale})`,
          opacity: 0.8,
          animationDelay: "1000ms"
        }}
      />
      
      {/* Additional complex blobs for more organic look */}
      {blobs === "complex" && (
        <>
          <div 
            className="absolute w-[50%] aspect-square rounded-full bg-gradient-radial from-orange-600/30 via-orange-600/20 to-transparent top-[10%] right-[20%] mix-blend-soft-light animate-float-slow"
            style={{ animationDelay: "700ms" }}
          />
          <div 
            className="absolute w-[40%] aspect-square rounded-full bg-gradient-radial from-cyan-600/30 via-cyan-600/20 to-transparent bottom-[15%] left-[15%] mix-blend-soft-light animate-float-slow"
            style={{ animationDelay: "1400ms" }}
          />
        </>
      )}
      
      {/* Standard additional blobs */}
      {(blobs === "standard" || blobs === "complex") && (
        <>
          <div className="absolute w-[80%] aspect-square rounded-[60%] bg-gradient-radial from-orange-500/10 via-orange-500/5 to-transparent top-[25%] right-[25%] mix-blend-soft-light" />
          <div className="absolute w-[80%] aspect-square rounded-[60%] bg-gradient-radial from-cyan-500/10 via-cyan-500/5 to-transparent bottom-[25%] left-[25%] mix-blend-soft-light" />
        </>
      )}
      
      {/* Glass-like background with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/30 to-black/60 backdrop-blur-md" />
      
      {/* Content layer */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}