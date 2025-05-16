// Import directly from assets
import heroImagePlaceholder from '../assets_dir/images/optimized/new-praetorian-hero.png';
import heroImageFull from '../assets_dir/images/optimized/new-praetorian-hero.png';
import { GradientButton } from "@/components/ui/gradient-button";
import { PremiumButton } from "@/components/ui/premium-button";
import { PremiumCartButton } from "@/utils/premium-buttons";
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fullImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = heroImageFull;
    img.onload = () => {
      setImageLoaded(true);
    };

    // Use Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    const section = document.getElementById('hero-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="hero-section" className="w-full bg-black overflow-hidden pt-0 mt-0 pb-0 relative" style={{ zIndex: 20, marginBottom: "-1px" }}>
      {/* Hero image container with responsive height */}
      <div className="relative w-screen" style={{ marginLeft: "calc(50% - 50vw)", marginTop: "0" /* Removed margin to eliminate blue gap */ }}>
        {/* Hero image with natural proportions */}
        <div className="w-full relative" style={{ 
          backgroundColor: "#000000",
          paddingTop: "36%" /* Adjusted aspect ratio for proper display */
        }}>
          {/* Placeholder image (loads quickly) */}
          <img 
            src={heroImagePlaceholder} 
            alt="Praetorian SmartCoat Products"
            className="w-full h-full absolute top-0 left-0 transition-opacity duration-500"
            style={{ 
              display: "block",
              objectFit: "contain",
              objectPosition: "center center",
              width: "100%",
              filter: "contrast(1.05) saturate(1.1)",
              transformOrigin: "center",
              transform: "scale(1.0)", /* No stretching */
              opacity: imageLoaded ? 0 : 1
            }}
          />
          
          {/* Full quality image (loads progressively) */}
          <img 
            ref={fullImageRef}
            src={heroImageFull} 
            alt="Praetorian SmartCoat Products" 
            className="w-full h-full absolute left-0 transition-opacity duration-700"
            style={{ 
              display: "block",
              objectFit: "contain",
              objectPosition: "center center",
              width: "100%", 
              filter: "contrast(1.05) saturate(1.1)",
              transformOrigin: "center",
              transform: "scale(1.0)", /* No stretching */
              opacity: imageLoaded ? 1 : 0,
              top: 0
            }}
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Cart button positioned in between the two buttons */}
          <div className="absolute bottom-12 left-0 w-full flex justify-center items-center z-30 pointer-events-none">
            {/* Orange/Blue glow effect to match cards across the site */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-blue-500/30 to-orange-500/20 rounded-full filter blur-[20px] opacity-90"></div>
            <div className="absolute -inset-8 bg-orange-500/10 rounded-2xl blur-[30px] z-0"></div>
            <div className="pointer-events-auto relative">
              <PremiumCartButton 
                className="transform hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  // Navigate to the products page or handle cart functionality
                  const productsSection = document.getElementById('products-section');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Praetorian NOW!
              </PremiumCartButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;