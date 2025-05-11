// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';
import { StarsBackground } from '@/components/ui/stars-background';

const HeroSection = () => {
  return (
    <section className="w-full bg-transparent overflow-hidden pt-0 -mt-28">
      {/* Using the StarsBackground component for an epic starry night sky with shooting stars */}
      <StarsBackground intensity="strong">
        {/* Edge-to-edge image container with z-index to keep it above the stars but below navigation */}
        <div className="w-full flex justify-center items-center overflow-hidden py-0 my-0 relative z-20">
          {/* Overlay for soft edge shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at center, transparent 40%, black 100%)",
            opacity: 0.65,
            zIndex: 21 // Below the image but above stars, below navigation
          }}></div>
          
          {/* Black bar to cover the navy line */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-black z-[22]"></div>
          
          {/* The image stretched horizontally to screen edges */}
          <img 
            src={heroImage} 
            alt="Praetorian Protection Products" 
            className="w-screen h-auto object-cover my-0 scale-100 md:scale-105 relative"
            style={{ 
              maxWidth: "none", 
              width: "105vw", // Slightly wider to reach past edges
              marginLeft: "-2.5vw", // Adjustment for centering
              marginTop: "-10px", // Force push up by a third of an inch
              marginBottom: "0", // Remove bottom margin
              filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))",
              zIndex: 32 // Move to the front
            }}
          />
        </div>
      </StarsBackground>
    </section>
  );
};

export default HeroSection;
