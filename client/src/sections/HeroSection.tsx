// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';
import { StarsBackground } from '@/components/ui/stars-background';

const HeroSection = () => {
  return (
    <section className="w-full bg-transparent overflow-hidden pt-0 -mt-1">
      {/* Using the StarsBackground component for an epic starry night sky with shooting stars */}
      <StarsBackground intensity="strong">
        {/* Edge-to-edge image container with z-index to keep it above the stars */}
        <div className="w-full flex justify-center items-center overflow-hidden py-0 my-0">
          {/* Overlay for soft edge shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at center, transparent 40%, black 100%)",
            opacity: 0.65,
            zIndex: 9 // Below the image (10) but above other elements
          }}></div>
          
          {/* The image stretched horizontally to screen edges */}
          <img 
            src={heroImage} 
            alt="Praetorian Protection Products" 
            className="w-screen h-auto object-cover my-0 scale-110 md:scale-115 relative"
            style={{ 
              maxWidth: "none", 
              width: "110vw", // Wider stretch to reach past edges
              marginLeft: "-5vw", // Adjustment for centering
              marginTop: "-120px", // Force push up by half an inch
              marginBottom: "0", // Remove bottom margin
              filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))",
              zIndex: 100 // Move to the front
            }}
          />
        </div>
      </StarsBackground>
    </section>
  );
};

export default HeroSection;
