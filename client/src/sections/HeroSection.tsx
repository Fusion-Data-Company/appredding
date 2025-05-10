// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-final.png';
import { BeamsBackground } from '@/components/ui/beams-background';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-hidden">
      {/* Using the BeamsBackground component for the animated background with increased brightness */}
      <BeamsBackground intensity="strong">
        {/* Edge-to-edge image container with z-index to keep it above the beams */}
        <div className="w-full flex justify-center items-center overflow-hidden" style={{ isolation: "isolate" }}>
          {/* Overlay for soft edge shading */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at center, transparent 40%, black 100%)",
            opacity: 0.65,
            zIndex: 1 // Lowered z-index to keep well below the image
          }}></div>
          
          {/* The image stretched horizontally to screen edges */}
          <img 
            src={heroImage} 
            alt="Praetorian Protection Products" 
            className="w-screen h-auto object-cover my-4 md:my-6 scale-95 md:scale-100 relative"
            style={{ 
              maxWidth: "none", 
              width: "110vw",
              marginLeft: "-5vw", // Stretch to 110% for maximum edge coverage
              marginTop: "12px", // Move DOWN half inch (48px) instead of up
              marginBottom: "-48px", // Negative margin to create overlap with section below
              filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))",
              zIndex: 9999, // Maximum z-index to ensure it stays in front of absolutely everything
              position: "relative" // Ensure z-index works properly
            }}
          />
        </div>
      </BeamsBackground>
    </section>
  );
};

export default HeroSection;
