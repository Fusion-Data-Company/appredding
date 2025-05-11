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
  frostGlassOpacity = 0.7, // Default frost glass opacity (0-1)
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Tiled stone texture background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${stoneTexturePath})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px auto', // Stretch texture slightly
          opacity: 0.5, // 50% opacity for the texture
        }}
      />
      
      {/* Frosted glass overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: `rgba(20, 20, 30, ${frostGlassOpacity})`,
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