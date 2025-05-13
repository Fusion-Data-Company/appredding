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
    <div className={cn("relative overflow-hidden", className)} style={{ marginTop: "-5px" }}>
      {/* Tiled stone texture background */}
      <div 
        className="absolute z-0"
        style={{
          top: "-5px", // Extend upward to cover the blue gap
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${stoneTexturePath})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px auto', // Stretch texture slightly
          opacity: 0.35, // Reduced opacity for subtlety
          transform: 'scale(1.05)', // Slight scale to avoid hard edges
        }}
      />
      
      {/* Light grey to dark grey gradient overlay */}
      <div 
        className="absolute z-50"
        style={{
          top: "-10px", // Move up a quarter inch and bring to front (changed from 15px to -10px)
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(180, 180, 190, 0.35), rgba(40, 40, 50, 0.35))', // 50% more see-through (0.7 -> 0.35)
          backdropFilter: 'blur(5px)', // Increased blur effect
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4)',
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