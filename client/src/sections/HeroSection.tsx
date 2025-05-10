// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-guards.png';
import { BeamsBackground } from '@/components/ui/beams-background';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-hidden">
      {/* Using the BeamsBackground component for the animated background */}
      <BeamsBackground intensity="strong">
        {/* Edge-to-edge image container with z-index to keep it above the beams */}
        <div className="w-full flex justify-center items-center overflow-hidden">
          {/* The image stretched horizontally to screen edges */}
          <img 
            src={heroImage} 
            alt="Praetorian Guards with Stone Tablet" 
            className="w-screen h-auto object-cover"
            style={{ 
              maxWidth: "none", 
              width: "100vw",
              filter: "drop-shadow(0 0 8px rgba(0,0,0,0.5))"
            }}
          />
        </div>
      </BeamsBackground>
    </section>
  );
};

export default HeroSection;
