// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-final.png';
import { GradientButton } from "@/components/ui/gradient-button";

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-hidden pt-0 mt-0 mb-0 relative" style={{ zIndex: 20 }}>
      {/* Hero image container with responsive height */}
      <div className="relative w-screen" style={{ marginLeft: "calc(50% - 50vw)" }}>
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
            filter: "contrast(1.05) saturate(1.1)",
            transformOrigin: "center",
            transform: "scaleX(1.025)" /* Stretch by 2.5% horizontally */
          }}
        />
        
        {/* Buttons positioned directly over the image, below the guards (moved down 3 inches) */}
        <div className="absolute w-full" style={{ 
          bottom: "calc(27% - 336px)", /* Moved down 3.5 inches (original + 48px) */
          left: 0,
          right: 0,
          zIndex: 999999
        }}>
          <div className="w-full relative px-4">
            {/* Left button positioned under left guard's feet */}
            <a 
              href="#applications" 
              className="inline-block absolute"
              style={{ 
                left: "10%", /* Positioned exactly under left guard's feet */
                transform: "translateX(-50%)",
              }}
            >
              <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
                Explore Applications
              </GradientButton>
            </a>
            
            {/* Right button positioned under right guard's feet */}
            <a 
              href="#contact" 
              className="inline-block absolute"
              style={{ 
                right: "10%", /* Positioned exactly under right guard's feet */
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