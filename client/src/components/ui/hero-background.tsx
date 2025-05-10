import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeroBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  src,
  alt = 'Hero background',
  className,
  priority = true
}) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 z-10">
          <div className="w-14 h-14 border-t-4 border-orange-500 border-solid rounded-full animate-spin mb-3"></div>
          <p className="text-white/80 text-sm">Loading image...</p>
        </div>
      )}
      
      <img 
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export default HeroBackground;