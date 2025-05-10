// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-final.png';
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
            background: "radial-gradient(circle at center, transparent 30%, black 100%)",
            opacity: 0.7,
            zIndex: 1
          }}></div>
          
          {/* The image stretched horizontally to screen edges */}
          <img 
            src={heroImage} 
            alt="Praetorian Protection Products" 
            className="w-screen h-auto object-contain my-4 md:my-6 scale-110 md:scale-125 relative"
            style={{ 
              maxWidth: "none", 
              width: "100vw",
              marginTop: "48px", // Half inch (48px) downward position adjustment
              filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))",
              zIndex: 0
            }}
          />
        </div>
      </BeamsBackground>
    </section>
  );
};

export default HeroSection;
