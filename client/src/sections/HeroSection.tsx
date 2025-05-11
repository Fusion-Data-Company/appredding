// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-hero-new.png';

const HeroSection = () => {
  return (
    <section className="w-full bg-black overflow-visible pt-0 mt-0 relative" style={{ marginBottom: "-30px", zIndex: 20 }}>
      {/* Ultra-realistic HD hero image stretched edge-to-edge */}
      <div className="w-full flex justify-center items-center overflow-visible py-0 my-0" style={{ minHeight: "600px" }}>
        {/* Ultra-subtle vignette overlay for depth */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{
          background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}></div>
        
        {/* Black bar to cover any potential gaps */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-black z-20"></div>
        
        {/* The hero image with enhanced styling for ultra-realistic appearance */}
        <div className="relative w-full overflow-visible flex justify-center items-center" style={{ minHeight: "600px" }}>
          <img 
            src={heroImage} 
            alt="Praetorian SmartCoat Products" 
            className="absolute h-auto"
            style={{ 
              objectFit: "cover",
              objectPosition: "center center",
              width: "100vw", 
              maxWidth: "none",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "-30px",
              filter: "contrast(1.05) saturate(1.1)", // Enhance colors slightly for ultra-realistic look
              boxShadow: "0 5px 20px rgba(0,0,0,0.5)", // Subtle shadow for depth
              zIndex: 5,
            }}
          />
        </div>
        
        {/* Subtle gradient overlay at the bottom for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
      </div>
    </section>
  );
};

export default HeroSection;
