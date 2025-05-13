// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-final.png';
import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = heroImage;
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
    <section id="hero-section" className="w-full bg-black overflow-hidden pt-0 mt-0 mb-0 relative" style={{ zIndex: 20 }}>
      {/* Hero image container with responsive height */}
      <div className="relative w-screen" style={{ marginLeft: "calc(50% - 50vw)" }}>
        {/* Hero image with natural proportions */}
        <div className="w-full relative" style={{ 
          backgroundColor: "#000000",
          paddingTop: "46.875%" /* Maintain aspect ratio */
        }}>
          {/* The actual image */}
          <img 
            src={heroImage} 
            alt="Praetorian SmartCoat Products" 
            className={`w-full h-auto absolute top-0 left-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              display: "block",
              objectFit: "contain",
              objectPosition: "top",
              width: "100%",
              filter: "contrast(1.05) saturate(1.1)",
              transformOrigin: "center",
              transform: "scaleX(1.025)" /* Stretch by 2.5% horizontally */
            }}
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Buttons positioned directly over the image, below the guards */}
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
      </div>
    </section>
  );
};

export default HeroSection;