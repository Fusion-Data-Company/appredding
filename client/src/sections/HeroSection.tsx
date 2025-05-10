// Import directly - the most reliable way to handle images in Vite/React
import heroImage from '../assets_dir/images/praetorian-main.jpg';
import { Lamp } from '@/components/ui/lamp';

const HeroSection = () => {
  return (
    <section className="w-full bg-black py-0 relative">
      {/* Full width container with no padding */}
      <div className="w-full px-0 mx-0 relative">
        {/* The lamp component that provides the fire-water glow effect */}
        <Lamp 
          className="!h-auto py-12 rounded-none !m-0" 
          variant="fullWidth" 
          shape="square" 
          border="none" 
          blobs="complex"
          initialGlowScale={2.2}
          pulseEffect={true}
          freeze={true}
          interactive={true}
        >
          {/* Image container - acts as foreground content */}
          <div className="w-full flex flex-col justify-center items-center z-20">
            {/* Added metal texture overlay to enhance premium feel */}
            <div className="relative max-w-5xl w-full">
              {/* Outer glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/30 via-transparent to-orange-600/30 blur-xl opacity-70"></div>
              
              {/* Metal frame effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800/60 via-slate-900/20 to-slate-800/60 backdrop-blur-sm rounded-lg"></div>
              
              {/* The actual image with a slightly transparent white background to make it pop */}
              <img 
                src={heroImage} 
                alt="Praetorian SmartCoat with Guards" 
                className="relative w-full h-auto mx-auto shadow-2xl rounded-lg border border-slate-700"
              />
            </div>
          </div>
        </Lamp>
      </div>
    </section>
  );
};

export default HeroSection;
