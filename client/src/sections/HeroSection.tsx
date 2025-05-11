// Import from optimized public assets
import { GradientButton } from "@/components/ui/gradient-button";
import ResponsiveImage from '@/components/ResponsiveImage';

// Use optimized images from public directory
const heroImage = '/images/optimized/praetorian-main.jpg';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-hidden pt-0 mt-0 mb-0 relative" style={{ zIndex: 20 }}>
      {/* Hero image container with responsive height */}
      <div className="relative w-full flex justify-center items-center" style={{ width: "100%" }}>
        {/* Hero image with natural proportions - responsive and optimized */}
        {/* Using our ResponsiveImage component for optimized loading */}
        <ResponsiveImage 
          src={heroImage} 
          alt="Praetorian SmartCoat Products" 
          className="w-full h-auto"
          priority={true}
          width={1600}
          height={800}
          style={{ 
            objectFit: "contain",
            objectPosition: "top",
            width: "100%",
            maxHeight: "90vh",
            filter: "contrast(1.05) saturate(1.1)",
            transformOrigin: "center",
            transform: "scaleX(1.025)" /* Stretch by 2.5% horizontally */
          }}
        />
        
        {/* Buttons positioned responsively over the image */}
        <div className="absolute w-full md:w-auto" style={{ 
          bottom: { 
            xs: "15%", 
            sm: "20%", 
            md: "calc(27% - 336px)" 
          }[window.innerWidth < 640 ? 'xs' : window.innerWidth < 768 ? 'sm' : 'md'],
          left: 0,
          right: 0,
          zIndex: 999
        }}>
          <div className="w-full relative px-4 flex flex-col md:flex-row md:justify-center gap-4 md:gap-12">
            {/* Mobile-friendly button placement (centered on small screens, absolute on larger) */}
            <div className="text-center md:inline-block md:absolute md:left-[10%] md:transform md:-translate-x-1/2">
              <a href="#applications">
                <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80 w-full md:w-auto">
                  Explore Applications
                </GradientButton>
              </a>
            </div>
            
            <div className="text-center md:inline-block md:absolute md:right-[10%] md:transform md:translate-x-1/2">
              <a href="#contact">
                <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80 w-full md:w-auto">
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