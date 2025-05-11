import React from 'react';
import { cn } from '@/lib/utils';
import stoneTexturePath from '@/assets_dir/images/textures/stone-texture.png';

interface StoneTextureBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  frostGlassOpacity?: number;
}

export const StoneTextureBackground: React.FC<StoneTextureBackgroundProps> = ({
  className,
  children,
  frostGlassOpacity = 0.5, // Default frost glass opacity (0-1)
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Tiled stone texture background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${stoneTexturePath})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px auto', // Stretch texture slightly
          opacity: 0.35, // Reduced opacity for subtlety
          transform: 'scale(1.05)', // Slight scale to avoid hard edges
        }}
      />
      
      {/* Frosted glass overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: `rgba(20, 20, 30, ${frostGlassOpacity})`,
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StoneTextureBackground;