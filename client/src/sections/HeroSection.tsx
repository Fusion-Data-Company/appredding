// Import directly from assets - using the final image
import heroImage from '../assets_dir/images/praetorian-hero-final.png';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-visible pt-0 mt-0 mb-0 relative" style={{ zIndex: 20 }}>
      {/* Ultra-realistic HD hero image stretched edge-to-edge */}
      <div className="w-full flex justify-center items-center overflow-visible py-0 my-0" style={{ height: "864px" }}>
        {/* Removed vignette overlay */}
        
        {/* Removed black bar */}
        
        {/* The hero image with enhanced styling for ultra-realistic appearance */}
        <div className="relative w-full overflow-visible" style={{ height: "864px" }}>
          <div className="absolute inset-0" style={{ 
            overflow: 'hidden',
            width: '100%', // Using full width of the container
            height: '100%',
            left: '0',
            right: '0',
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
                objectFit: "fill", // Stretches to fill the container
                objectPosition: "center",
                width: "100%", // Full width
                height: "100%", // Full height
                maxWidth: "none", // Allow stretching beyond viewport if needed
                minWidth: "100%", // Ensure minimum width is container width
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                filter: "contrast(1.05) saturate(1.1)" // Enhance colors slightly for ultra-realistic look
              }}
            />
          </div>
        </div>
        
        {/* Gradient overlay removed */}
      </div>
    </section>
  );
};

export default HeroSection;
