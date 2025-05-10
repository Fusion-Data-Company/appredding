// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-main.jpg';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orangeGlowRef = useRef<HTMLDivElement>(null);
  const blueGlowRef = useRef<HTMLDivElement>(null);
  
  // Handle interactive movement
  useEffect(() => {
    const container = containerRef.current;
    const orangeGlow = orangeGlowRef.current;
    const blueGlow = blueGlowRef.current;
    
    if (!container || !orangeGlow || !blueGlow) return;
    
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Move the orange glow based on pointer position
      orangeGlow.style.transform = `translate(${(x - 0.5) * 50}%, ${(y - 0.5) * 30}%)`;
      
      // Move the blue glow in the opposite direction
      blueGlow.style.transform = `translate(${(0.5 - x) * 50}%, ${(0.5 - y) * 30}%)`;
    };
    
    container.addEventListener('pointermove', handlePointerMove);
    
    // Freeze animation after 3.3 seconds
    const timer = setTimeout(() => {
      console.log('Freezing animation');
      container.removeEventListener('pointermove', handlePointerMove);
    }, 3300);
    
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <section className="w-full bg-black overflow-hidden">
      {/* Main container with fire-water glow effect */}
      <div 
        ref={containerRef}
        className="relative w-full py-12 isolate"
      >
        {/* Fire (orange) glow - increased opacity and size*/}
        <div 
          ref={orangeGlowRef}
          className="absolute w-[250%] aspect-square rounded-[40%] bg-gradient-radial from-orange-500/90 via-orange-500/60 to-transparent -top-[80%] -right-[80%] mix-blend-soft-light animate-pulse-slow"
          style={{ opacity: 0.9, filter: "blur(15px)" }}
        />
        
        {/* Water (blue) glow - increased opacity and size */}
        <div 
          ref={blueGlowRef}
          className="absolute w-[250%] aspect-square rounded-[40%] bg-gradient-radial from-cyan-500/90 via-cyan-500/60 to-transparent -bottom-[80%] -left-[80%] mix-blend-soft-light animate-pulse-slow"
          style={{ opacity: 0.9, animationDelay: "1000ms", filter: "blur(15px)" }}
        />
        
        {/* Additional glow effects */}
        <div className="absolute w-[100%] aspect-square rounded-full bg-gradient-radial from-white/20 via-white/5 to-transparent top-[10%] right-[15%] mix-blend-overlay animate-float-slow"></div>
        <div className="absolute w-[80%] aspect-square rounded-full bg-gradient-radial from-white/20 via-white/5 to-transparent bottom-[15%] left-[10%] mix-blend-overlay animate-float-slow" style={{ animationDelay: "2000ms" }}></div>
        
        {/* Dark backdrop overlay with diamond plate texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black">
          {/* Diamond plate texture background */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2256%22%20height%3D%22100%22%3E%3Cpath%20d%3D%22M28%2066L0%2050L0%2016L28%200L56%2016L56%2050L28%2066L28%20100%22%20fill%3D%22none%22%20stroke%3D%22%23555%22%20stroke-opacity%3D%220.25%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M28%200L28%2066L0%2050L0%2016L28%200Z%22%20fill%3D%22%23555%22%20fill-opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')]">
          </div>
        </div>
        
        {/* Image container with z-index to stay above the backdrop */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            {/* Intense dual-tone edge glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/80 via-transparent to-orange-600/80 blur-md"></div>
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/30 via-transparent to-orange-500/30 blur-xl"></div>
            
            {/* Metal frame with enhanced diagonal gradient */}
            <div className="p-3 bg-gradient-to-br from-slate-600 via-slate-800 to-slate-900 rounded-lg border border-slate-600/30 shadow-2xl">
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-white/10 rounded-lg pointer-events-none"></div>
              
              {/* The image with inner shadow for depth */}
              <img 
                src={heroImage} 
                alt="Praetorian SmartCoat with Guards" 
                className="w-full h-auto rounded-md shadow-inner border border-slate-700/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
