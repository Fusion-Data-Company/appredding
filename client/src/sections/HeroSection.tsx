// Import from imageExports for consistent image handling
import { PRAETORIAN_HERO_IMAGE } from '../assets_dir/imageExports';
import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useState, useRef } from "react";
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fullImageRef = useRef<HTMLImageElement>(null);

  // Use IntersectionObserver hook for better performance
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    // Mark when hero image is loaded in console for monitoring
    console.log("Hero image path:", PRAETORIAN_HERO_IMAGE);
    
    // Set image loaded state when visible in viewport
    if (inView) {
      setImageLoaded(true);
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section 
      id="hero-section" 
      ref={sectionRef}
      className="w-full bg-black overflow-hidden pt-0 mt-0 mb-0 pb-0 relative" 
      style={{ zIndex: 20 }}
    >
      {/* Hero image container with responsive height */}
      <div className="relative w-screen" style={{ marginLeft: "calc(50% - 50vw)", marginTop: "0" /* Removed margin to eliminate blue gap */ }}>
        {/* Hero image with natural proportions */}
        <div className="w-full relative" style={{ 
          backgroundColor: "#000000",
          paddingTop: "36%" /* Adjusted aspect ratio for proper display */
        }}>
          {/* Single optimized hero image with native lazy loading */}
          <img 
            ref={fullImageRef}
            src={PRAETORIAN_HERO_IMAGE} 
            alt="Praetorian SmartCoat Products" 
            className={`w-full h-full absolute left-0 top-0 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              display: "block",
              objectFit: "contain",
              objectPosition: "center center",
              width: "100%", 
              filter: "contrast(1.05) saturate(1.1)",
              transformOrigin: "center",
              transform: "scale(1.0)" /* No stretching */
            }}
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;