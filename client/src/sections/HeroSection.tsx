// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-buckets-hero-v2.png';
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
            alt="Praetorian Protection Products" 
            className="w-screen h-auto object-contain my-4 md:my-6 scale-110 md:scale-125"
            style={{ 
              maxWidth: "none", 
              width: "100vw",
              filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))"
            }}
          />
        </div>
      </BeamsBackground>
    </section>
  );
};

export default HeroSection;
