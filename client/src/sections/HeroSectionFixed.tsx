import React from 'react';
import heroImage from '@/assets_dir/images/optimized/praetorian-hero-final.webp';
import { StarsBackground } from '@/components/ui/stars-background';

const HeroSectionFixed = () => {
  return (
    <section className="w-full mt-0 mb-0 pt-0 pb-0">
      <StarsBackground intensity="strong">
        <div className="w-full flex justify-center">
          {/* Simple image display with natural dimensions */}
          <img 
            src={heroImage}
            alt="Praetorian Protection Products"
            className="w-full max-w-[1600px]"
            style={{ 
              height: 'auto',
              marginTop: '0',
              marginBottom: '0'
            }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "radial-gradient(circle at center, transparent 40%, black 100%)",
              opacity: 0.65,
              zIndex: 2
            }}
          />
        </div>
      </StarsBackground>
    </section>
  );
};

export default HeroSectionFixed;