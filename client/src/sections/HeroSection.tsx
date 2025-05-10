// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';
import { BeamsBackground } from '@/components/ui/beams-background';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-hidden">
      {/* Using the BeamsBackground component for the animated background with increased brightness */}
      <BeamsBackground intensity="strong">
        {/* Edge-to-edge image container with z-index to keep it above the beams */}
        <div className="w-full flex justify-center items-center overflow-hidden">
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
            className="w-screen h-auto object-cover my-4 md:my-6 scale-95 md:scale-100 relative"
            style={{ 
              maxWidth: "none", 
              width: "110vw",
              marginLeft: "-5vw", // Stretch to 110% for maximum edge coverage
              marginTop: "-36px", // Moved up additional quarter inch (12px) to prevent bottom overlap
              marginBottom: "8px", // Add space at bottom to prevent overlap
              filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))",
              zIndex: 10 // Bring to front
            }}
          />
        </div>
      </BeamsBackground>
    </section>
  );
};

export default HeroSection;
