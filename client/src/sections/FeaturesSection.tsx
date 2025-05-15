import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  // Use fire theme to match "Specialized Applications" styling
  const variant = "fire" as "fire" | "blue" | "mixed";
  
  // Enhanced premium styling variables specifically for fire/orange theme (like Specialized Applications)
  const theme = {
    // Fire-themed border gradient
    borderGradient: "from-orange-500/70 via-amber-500/40 to-red-500/70",
    // Enhanced icon gradient with orange/red transitions (fire theme)
    iconGradient: "from-orange-500 to-red-600",
    // Enhanced glow and shadow effects (fire theme)
    iconShadow: "0 0 30px rgba(249, 115, 22, 0.7)",
    // Enhanced ambient glow background (fire theme)
    ambientGlow: "radial-gradient(circle at center, rgba(251,113,36,0.3) 0%, rgba(245,158,11,0.2) 30%, rgba(220,38,38,0.2) 70%, transparent 80%)",
    // Enhanced corner accent colors (fire theme)
    cornerAccent: "from-orange-500/40 to-red-500/40",
    // Enhanced pulse color with gradient (fire theme)
    pulseColor: "rgba(249,115,22,0.8)",
    // Enhanced text shimmer gradient (fire theme)
    textShimmer: "rgba(249, 115, 22, 0.2)"
  };

  return (
    <div className="relative group h-full transform transition-all duration-700 hover:-translate-y-2 hover:scale-[1.03] hover:z-10 flex flex-col justify-between">
      {/* Multiple layered background effects - Fire theme (like Specialized Applications) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-red-600/30 to-orange-600/40 rounded-xl blur-xl opacity-50 group-hover:opacity-70 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/70 via-amber-500/60 to-red-500/70 rounded-xl blur-md opacity-80 group-hover:opacity-90 transition-all duration-500"></div>
      
      {/* Advanced enterprise-level card styling with enhanced 3D effects */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 md:p-10 text-center border border-orange-500/30 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] h-full z-10">
        {/* Subtle dots and squares pattern in burnt orange (like Specialized Applications) */}
        <div className="absolute inset-0 opacity-15 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        </div>
        
        {/* Ambient glow effects - positioned away from text (fire theme) */}
        <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[80px] animate-pulse-slow-delayed"></div>
        <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-red-500/15 rounded-full filter blur-[80px] animate-pulse-slow"></div>
        
        {/* Premium dual-layer gradient border effect for enhanced depth (fire theme) */}
        <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${theme.borderGradient} opacity-80`}></div>
        <div className={`absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none`}></div>
        
        {/* Corner accent elements in four corners - fire theme styling (like Specialized Applications) */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/70 rounded-tr-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70 rounded-br-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
        </div>
        
        {/* Horizontal animated line - top (like in Specialized Applications) */}
        <div className="absolute top-[16%] left-0 w-full h-[1px] overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent -translate-x-full animate-shimmer-slow"></div>
        </div>
        
        {/* Horizontal animated line - bottom (like in Specialized Applications) */}
        <div className="absolute bottom-[16%] left-0 w-full h-[1px] overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent -translate-x-full animate-shimmer-slow-delayed"></div>
        </div>
      
        {/* Enhanced enterprise icon with fire theme styling */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-8 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          {/* Outer glow ring with pulsing animation */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
               style={{ 
                 boxShadow: theme.iconShadow,
                 animation: "pulse 2s infinite ease-in-out" 
               }}>
          </div>
          
          {/* Icon background with enhanced gradient */}
          <div className={`absolute inset-1 bg-gradient-to-r ${theme.iconGradient} rounded-full`}></div>
          
          {/* Icon inner highlight with enhanced reflective effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent rounded-full"></div>
          
          {/* Icon with premium styling */}
          <i className={`${icon} text-white text-4xl md:text-5xl relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-700`}></i>
          
          {/* Multiple animated concentric rings for premium enterprise effect */}
          <div className="absolute inset-0 rounded-full border border-white/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.3] transition-all duration-700 delay-100"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/10 scale-[1.3] opacity-0 group-hover:opacity-60 group-hover:scale-[1.5] transition-all duration-700 delay-200"></div>
          
          {/* Pulsing dot indicators around icon for premium effect */}
          {[...Array(6)].map((_, i) => (
            <div key={i} 
                 className="absolute w-2 h-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-80 transition-opacity duration-700"
                 style={{ 
                   transform: `rotate(${i * 60}deg) translateY(-48px)`,
                   animation: `pulse 2s infinite ease-in-out ${i * 0.2}s`,
                   background: `linear-gradient(to right, white, ${theme.pulseColor})`
                 }}>
            </div>
          ))}
        </div>
      
        {/* Enhanced title with fire/orange styling (like Specialized Applications) */}
        <div className="relative mb-6 group-hover:transform group-hover:scale-105 transition-transform duration-700">
          <div className="shimmer-fire-text font-bold text-2xl md:text-2xl relative z-10">
            {/* Background glow for letter definition */}
            <div className="absolute inset-0 flex justify-center items-center text-2xl md:text-2xl font-bold tracking-tight text-orange-900/10 blur-[2px] scale-110">
              {title}
            </div>
            
            {/* Main text with premium gradient - matching Specialized Applications */}
            <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
              drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
              [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
              {title}
            </span>
            
            {/* Top glossy reflection */}
            <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
          </div>
          
          {/* Multiple text shadows for depth */}
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
            {title}
          </div>
          
          {/* Animated underline that expands on hover */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent rounded-full group-hover:w-2/3 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"></div>
        </div>
        
        {/* Enhanced description with premium animations */}
        <div className="relative overflow-hidden">
          <p className="text-gray-300 text-base md:text-lg relative z-10 transform group-hover:text-gray-200 transition-colors duration-700">
            {description}
          </p>
          
          {/* Text shimmer animation on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"
               style={{
                 background: `linear-gradient(90deg, transparent, ${theme.textShimmer}, transparent)`,
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 2s infinite'
               }}>
          </div>
        </div>
        
        {/* Premium Learn More link that reveals on hover - with orange/red gradient */}
        <div className={`mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100`}>
          <span className={`cursor-pointer text-transparent bg-clip-text bg-gradient-to-r ${theme.iconGradient} text-sm font-medium inline-flex items-center group/link relative`}>
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-transparent via-current to-transparent group-hover/link:w-full transition-all duration-300"></span>
          </span>
        </div>
      </div>
      
      {/* Enhanced bottom reflection */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
      
      {/* Dynamic floating animation based on index - using regular style element */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-${index} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${(index % 3) + 5}px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .group:hover {
          animation: float-${index} ${4 + index % 2}s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-fire-extinguisher",
      title: "Class A Fire Protection",
      description: "Perfect 0/100 scores in flame spread and smoke development tests, providing advanced thermal protection under ASTM E84 testing protocols."
    },
    {
      icon: "fas fa-sun",
      title: "Thermal Reflection",
      description: "89% solar reflection and 89% thermal emittance verified by Cool Roof Rating Council, blocking 95% of solar radiation with only 1% degradation after 3 years."
    },
    {
      icon: "fas fa-bolt",
      title: "Energy Efficiency",
      description: "Documented energy savings from 20-87% across various applications, with payback periods typically ranging from 1-3 years based on real-world installations."
    },
    {
      icon: "fas fa-shield-alt",
      title: "Triple-Component System",
      description: "NASA-derived ceramic microsphere technology creates multiple thermal breaks through vacuum-filled spheres that physically block heat transfer through all three mechanisms."
    },
    {
      icon: "fas fa-water",
      title: "Weather Resistant",
      description: "Water-based acrylic elastomeric polymer maintains flexibility from sub-freezing to over 200°F, creating a permanent watertight seal with 156% elongation capability."
    },
    {
      icon: "fas fa-clock",
      title: "Long-Term Durability",
      description: "Exceptional 20-30+ year service life with minimal maintenance requirements. Original installations from 1989 showed no performance loss when inspected 30 years later."
    }
  ];

  return (
    <section 
      className="py-32 relative" 
      id="features"
      style={{ 
        backgroundImage: `url(${PRAETORIAN_HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        minHeight: "100vh",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-16 md:mb-20">
          {/* Advanced premium enterprise heading container with enhanced mixed orange/blue theme */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-10 px-8 md:py-12 md:px-16 mx-auto max-w-4xl mb-8 inline-block shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-orange-500/30 group/nasa transform transition-all duration-500 hover:scale-[1.01]">
            {/* Multiple layered background effects - Mixed theme */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover/nasa:opacity-100 group-hover/nasa:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover/nasa:opacity-100 transition-all duration-500"></div>
            
            {/* Subtle dots and squares pattern background in mixed colors */}
            <div className="absolute inset-0 opacity-25 z-0">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
            </div>
            
            {/* Ambient glow effects - positioned away from text */}
            <div className="absolute -top-40 -right-20 w-80 h-80 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
            
            {/* Premium gradient border effect - Mixed variant */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Additional corner accent lines - with mixed theme - enhanced */}
            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
            </div>
            
            {/* Enhanced premium badge with mixed orange/blue styling */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex z-50">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group/badge transform transition-all duration-500 hover:scale-105">
                {/* Multiple layered background effects for badge - Mixed theme */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-full blur-md opacity-90 group-hover/badge:opacity-100 transition-all duration-500"></div>
                
                {/* Premium gradient border effect - Mixed variant */}
                <div className="absolute inset-0 border border-orange-500/30 rounded-full"></div>
                
                {/* Inner highlight for 3D effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                
                {/* Subtle ambient glow that activates on hover */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover/badge:opacity-30 transition-opacity duration-700 ease-in-out" 
                  style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}
                ></div>
                
                {/* Badge icon with enhanced mixed orange/blue glow effect */}
                <div className="mr-2 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/60 to-blue-500/60 blur-[6px] opacity-70 group-hover/badge:opacity-90 transition-all duration-300"></div>
                  <svg className="h-5 w-5 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#mixed-gradient-nasa)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a9.5 9.5 0 0 0 3.09-18.49A4.5 4.5 0 1 0 12 8.5a4.5 4.5 0 1 0-3.09-9.01A9.5 9.5 0 0 0 12 22z"></path>
                  </svg>
                  
                  {/* Gradient definition for icon */}
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="mixed-gradient-nasa" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Badge text with enhanced mixed orange/blue shimmer effect */}
                <span className="shimmer-mixed-text text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 text-sm font-bold relative group-hover/badge:from-orange-300 group-hover/badge:via-amber-200 group-hover/badge:to-blue-300 transition-all duration-300">
                  <span className="relative z-10 tracking-wide font-bold">NASA TECHNOLOGY</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/badge:opacity-100 transition-opacity duration-700"
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 2s infinite'
                     }}>
                  </span>
                </span>
                
                {/* Bottom reflection with mixed orange/blue gradient */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-orange-500/40 rounded-full"></div>
              </div>
            </div>
            
            {/* Content with enhanced animations */}
            <div className="relative z-10 mt-2">
              {/* Advanced premium heading with multiple decorative elements */}
              <div className="relative inline-block mb-5">
                {/* Decorative dots */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <div className="w-1 h-1 rounded-full bg-gradient-to-r from-orange-400 to-amber-500"></div>
                </div>
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                  <div className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                </div>
                
                {/* Advanced premium gradient heading */}
                <GradientHeading level={2} className="text-3xl md:text-4xl lg:text-5xl relative" variant="mixed">
                  NASA-Derived Ceramic Technology
                </GradientHeading>
                
                {/* Animated decorative line below heading */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full mt-2 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
              </div>
              
              {/* Enhanced description with premium styling */}
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Praetorian SmartCoat represents a fundamental shift in temperature control and fire protection, utilizing space-age ceramic microsphere technology that creates a comprehensive thermal barrier addressing all three heat transfer mechanisms simultaneously.
              </p>
              
              {/* Premium decorative accent line */}
              <div className="w-24 h-1 mx-auto mt-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/50 to-blue-500/50 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/50 to-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add keyframes for new animations - using regular style element */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
