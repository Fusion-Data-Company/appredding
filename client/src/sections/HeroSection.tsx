// Import directly - the most reliable way to handle images in Vite/React
import heroImage from '../assets_dir/images/praetorian-main.jpg';

const HeroSection = () => {
  return (
    <section className="w-full bg-black py-4">
      <div className="container mx-auto">
        <img 
          src={heroImage} 
          alt="Praetorian SmartCoat with Guards" 
          className="w-full h-auto mx-auto shadow-lg"
          style={{maxWidth: '1200px'}}
        />
      </div>
    </section>
  );
};

export default HeroSection;
