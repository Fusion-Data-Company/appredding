// Import directly from assets - using the final image
import heroImage from '../assets_dir/images/praetorian-hero-final.png';
import { GradientButton } from "@/components/ui/gradient-button";

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-visible pt-0 mt-0 mb-0 relative" style={{ zIndex: 20 }}>
      {/* Hero image container with responsive height */}
      <div className="relative w-full">
        {/* Hero image with natural proportions */}
        <img 
          src={heroImage} 
          alt="Praetorian SmartCoat Products" 
          className="w-full h-auto"
          style={{ 
            display: "block",
            objectFit: "contain",
            objectPosition: "top",
            width: "100%",
            filter: "contrast(1.05) saturate(1.1)"
          }}
        />
        
        {/* Buttons positioned directly over the image, below the guards (moved down 3 inches) */}
        <div className="absolute w-full" style={{ 
          bottom: "calc(27% - 336px)", /* Moved down 3.5 inches (original + 48px) */
          left: 0,
          right: 0,
          zIndex: 999999
        }}>
          <div className="container mx-auto px-4 relative">
            {/* Left button centered under left guard */}
            <a 
              href="#applications" 
              className="inline-block absolute"
              style={{ 
                left: "5%", /* Moved to 5% from left edge */
                transform: "translateX(-50%)",
              }}
            >
              <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
                Explore Applications
              </GradientButton>
            </a>
            
            {/* Right button centered under right guard */}
            <a 
              href="#contact" 
              className="inline-block absolute"
              style={{ 
                right: "5%", /* Moved to 5% from right edge */
                transform: "translateX(50%)",
              }}
            >
              <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
                Contact Us
              </GradientButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;