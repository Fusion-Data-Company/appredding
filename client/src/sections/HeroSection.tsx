// Import directly from assets
import heroImage from '../assets_dir/images/praetorian-guards.png';
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
      {/* Background container with glow effects - no padding for full width */}
      <div 
        ref={containerRef}
        className="relative w-full py-0 isolate"
      >
        {/* Fire (orange) glow - background only */}
        <div 
          ref={orangeGlowRef}
          className="absolute w-[250%] aspect-square rounded-[40%] bg-gradient-radial from-orange-500/50 via-orange-500/30 to-transparent -top-[80%] -right-[80%] mix-blend-soft-light animate-pulse-slow"
          style={{ opacity: 0.7, filter: "blur(20px)" }}
        />
        
        {/* Water (blue) glow - background only */}
        <div 
          ref={blueGlowRef}
          className="absolute w-[250%] aspect-square rounded-[40%] bg-gradient-radial from-cyan-500/50 via-cyan-500/30 to-transparent -bottom-[80%] -left-[80%] mix-blend-soft-light animate-pulse-slow"
          style={{ opacity: 0.7, animationDelay: "1000ms", filter: "blur(20px)" }}
        />
        
        {/* Dark backdrop overlay */}
        <div className="absolute inset-0 bg-black">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2256%22%20height%3D%22100%22%3E%3Cpath%20d%3D%22M28%2066L0%2050L0%2016L28%200L56%2016L56%2050L28%2066L28%20100%22%20fill%3D%22none%22%20stroke%3D%22%23555%22%20stroke-opacity%3D%220.25%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M28%200L28%2066L0%2050L0%2016L28%200Z%22%20fill%3D%22%23555%22%20fill-opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')]">
          </div>
        </div>
        
        {/* Full viewport width container - no constraints */}
        <div className="relative z-20 w-screen overflow-visible py-0 flex justify-center items-center" style={{ height: '40vh' }}>
          {/* The image stretched extra wide */}
          <img 
            src={heroImage} 
            alt="Praetorian Guards with Stone Tablet" 
            className="w-screen object-cover object-center"
            style={{ 
              filter: "drop-shadow(0 0 8px rgba(0,0,0,0.5))",
              height: '40vh',
              transform: 'scaleX(6.0) scaleY(1.2)', // Extreme horizontal stretching
              transformOrigin: 'center center'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
