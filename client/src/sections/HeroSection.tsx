// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-visible pt-0 mt-0 relative" style={{ marginBottom: "0", zIndex: 20 }}>
      {/* Ultra-realistic HD hero image stretched edge-to-edge */}
      <div className="w-full flex justify-center items-center overflow-visible py-0 my-0" style={{ maxHeight: "500px" }}>
        {/* Removed vignette overlay */}
        
        {/* Removed black bar */}
        
        {/* The hero image with enhanced styling for ultra-realistic appearance */}
        <div className="relative w-full overflow-visible" style={{ height: "500px" }}>
          <div className="absolute inset-0" style={{ 
            overflow: 'hidden',
            width: '122%',
            height: '100%',
            left: '-12%',
            zIndex: 5
          }}>
            <img 
              src={heroImage} 
              alt="Praetorian SmartCoat Products" 
              className="absolute"
              style={{ 
                display: "block",
                objectFit: "cover",
                objectPosition: "center 30%", // Show more of the top-middle portion
                width: "100%", 
                height: "500px", // Fixed height to prevent overlapping
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
