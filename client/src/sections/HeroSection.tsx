// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';
import { StarsBackground } from '@/components/ui/stars-background';

const HeroSection = () => {
  return (
    <section className="w-full bg-transparent overflow-visible pt-0 mt-0">
      {/* Using the StarsBackground component for an epic starry night sky with shooting stars */}
      <StarsBackground intensity="strong">
        {/* Edge-to-edge image container with z-index to keep it BELOW EVERYTHING */}
        <div className="w-full h-auto flex justify-center items-center overflow-visible py-0 my-0 relative z-[1]">
          {/* Overlay for soft edge shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at center, transparent 40%, black 100%)",
            opacity: 0.65,
            zIndex: 2 // Below the image and WELL below navigation
          }}></div>
          
          {/* Black bar to cover the navy line */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-black z-[3]"></div>
          
          {/* The image stretched horizontally to screen edges */}
          <img 
            src={heroImage} 
            alt="Praetorian Protection Products" 
            className="relative"
            style={{ 
              width: "100%", // Full width
              height: "auto", // Natural height based on original image dimensions
              objectFit: "contain", // Show entire image
              marginLeft: "0", // No offset needed
              marginTop: "0", // No top margin
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
