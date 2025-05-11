// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-visible pt-0 mt-0 relative" style={{ marginBottom: "-30px", zIndex: 20 }}>
      {/* Ultra-realistic HD hero image stretched edge-to-edge */}
      <div className="w-full flex justify-center items-center overflow-visible py-0 my-0" style={{ minHeight: "650px" }}>
        {/* Removed vignette overlay */}
        
        {/* Removed black bar */}
        
        {/* The hero image with enhanced styling for ultra-realistic appearance */}
        <div className="relative w-full h-full overflow-visible">
          <div className="absolute inset-0" style={{ 
            overflow: 'visible',
            width: '122%',
            height: '100%',
            left: '-12%',
            zIndex: 5
          }}>
            <img 
              src={heroImage} 
              alt="Praetorian SmartCoat Products" 
              className="absolute inset-0"
              style={{ 
                display: "block",
                objectFit: "cover",
                objectPosition: "center 0%", // Aligned to show top portion
                width: "100%", 
                height: "auto",
                marginTop: "-336px", // Move image up by 3.5 inches (moving back up by half an inch)
                marginBottom: "-30px",
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
