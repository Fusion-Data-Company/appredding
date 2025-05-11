// Import directly from assets - using the final image
import heroImage from '../assets_dir/images/praetorian-hero-final.png';

import { GradientButton } from "@/components/ui/gradient-button";

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-visible pt-0 mt-0 mb-0 relative" style={{ zIndex: 20 }}>
      {/* Ultra-realistic HD hero image stretched edge-to-edge */}
      <div className="w-full flex justify-center items-center overflow-visible py-0 my-0" style={{ height: "auto" }}>
        {/* Removed vignette overlay */}
        
        {/* Removed black bar */}
        
        {/* The hero image with enhanced styling for ultra-realistic appearance */}
        <div className="relative w-full overflow-visible" style={{ height: "auto" }}>
          <div className="relative w-full" style={{ 
            overflow: 'visible',
            width: '100%', // Using full width of the container
            padding: 0,
            margin: 0,
            zIndex: 5
          }}>
            <img 
              src={heroImage} 
              alt="Praetorian SmartCoat Products" 
              className="w-full h-full"
              style={{ 
                display: "block",
                objectFit: "contain", // Maintain aspect ratio
                objectPosition: "top",
                width: "100%", // Full width
                height: "auto", // Auto height to maintain aspect ratio
                maxWidth: "none", // Allow stretching beyond viewport if needed
                minWidth: "100%", // Ensure minimum width is container width
                position: "relative", // Changed to relative
                filter: "contrast(1.05) saturate(1.1)" // Enhance colors slightly for ultra-realistic look
              }}
            />
          </div>
        </div>
        
        {/* Gradient overlay removed */}
      </div>
      
      {/* Buttons positioned over the hero image, next to the buckets */}
      <div className="absolute w-full" style={{ 
        zIndex: 999999, 
        pointerEvents: "none",
        top: "67%", /* Position aligned with the buckets */
        left: 0,
        right: 0
      }}>
        <div className="container mx-auto px-4 relative">
          <a 
            href="#applications" 
            className="inline-block"
            style={{ 
              position: "absolute",
              left: "15%", /* Left bucket position */
              pointerEvents: "auto"
            }} 
          >
            <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
              Explore Applications
            </GradientButton>
          </a>
          <a 
            href="#contact" 
            className="inline-block"
            style={{ 
              position: "absolute",
              right: "15%", /* Right bucket position */
              pointerEvents: "auto"
            }} 
          >
            <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
              Contact Us
            </GradientButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
