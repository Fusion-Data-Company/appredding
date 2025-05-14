import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  // Advanced premium enterprise theme variants
  const variants = ["fire", "blue", "mixed"];
  const variant = variants[index % variants.length] as "fire" | "blue" | "mixed";
  
  // Theme-specific variables for enhanced premium styling
  const themeConfig = {
    fire: {
      // Premium border gradient with multiple color stops for fire theme
      borderGradient: "from-orange-500/60 via-red-600/30 to-red-500/60",
      // Enhanced icon gradient with more color transitions
      iconGradient: "from-amber-400 via-orange-500 to-red-600",
      // Glow and shadow effects
      iconShadow: "0 0 30px rgba(251,113,36,0.7), 0 0 15px rgba(220,38,38,0.5)",
      // Ambient glow background
      ambientGlow: "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, rgba(220,38,38,0.2) 40%, transparent 70%)",
      // Corner accent color
      cornerAccent: "from-orange-500/40 to-red-600/40",
      // Icon pulse color
      pulseColor: "rgba(251,113,36,0.8)",
      // Text shimmer gradient
      textShimmer: "from-amber-300 via-orange-400 to-amber-300"
    },
    blue: {
      // Premium border gradient with multiple color stops for blue theme
      borderGradient: "from-blue-500/60 via-cyan-500/30 to-blue-600/60",
      // Enhanced icon gradient with more color transitions
      iconGradient: "from-cyan-400 via-blue-500 to-blue-700",
      // Glow and shadow effects
      iconShadow: "0 0 30px rgba(59,130,246,0.7), 0 0 15px rgba(14,165,233,0.5)",
      // Ambient glow background
      ambientGlow: "radial-gradient(circle at center, rgba(59,130,246,0.4) 0%, rgba(14,165,233,0.2) 40%, transparent 70%)",
      // Corner accent color
      cornerAccent: "from-blue-500/40 to-cyan-600/40",
      // Icon pulse color
      pulseColor: "rgba(59,130,246,0.8)",
      // Text shimmer gradient
      textShimmer: "from-blue-300 via-cyan-400 to-blue-300"
    },
    mixed: {
      // Premium border gradient with multiple color stops for mixed theme
      borderGradient: "from-orange-500/60 via-purple-500/30 to-blue-500/60",
      // Enhanced icon gradient with more color transitions
      iconGradient: "from-amber-500 via-purple-500 to-blue-600",
      // Glow and shadow effects
      iconShadow: "0 0 30px rgba(251,113,36,0.5), 0 0 30px rgba(59,130,246,0.5)",
      // Ambient glow background
      ambientGlow: "radial-gradient(circle at center, rgba(251,113,36,0.3) 0%, rgba(139,92,246,0.2) 30%, rgba(59,130,246,0.3) 60%, transparent 75%)",
      // Corner accent color
      cornerAccent: "from-orange-500/40 to-blue-500/40",
      // Icon pulse color
      pulseColor: "rgba(139,92,246,0.8)",
      // Text shimmer gradient
      textShimmer: "from-amber-300 via-purple-400 to-blue-300"
    }
  };
  
  // Get current theme configuration
  const theme = themeConfig[variant];

  return (
    <div className="relative group h-full transform transition-all duration-700 hover:-translate-y-2 hover:scale-[1.03] flex flex-col justify-between">
      {/* Advanced enterprise-level card styling with enhanced 3D effects */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 md:p-10 text-center border-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] h-full z-10">
        {/* Premium dual-layer gradient border effect for enhanced depth */}
        <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${theme.borderGradient} opacity-80`}></div>
        <div className={`absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none`}></div>
        
        {/* Corner accent decorations for premium enterprise feel */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl opacity-10">
          <div className={`absolute inset-0 bg-gradient-to-bl ${theme.cornerAccent} rounded-tr-xl blur-[2px]`}></div>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr opacity-10">
          <div className={`absolute inset-0 bg-gradient-to-tr ${theme.cornerAccent} rounded-bl-xl blur-[2px]`}></div>
        </div>
        
        {/* Advanced ambient glow effect with interactive animation */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-all duration-1000 ease-in-out" 
             style={{ background: theme.ambientGlow }}>
        </div>
        
        {/* Premium animated hover effect for depth */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
        {/* Enhanced enterprise icon with dynamic animations */}
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
      
        {/* Enhanced title with premium styling and animations */}
        <div className="relative mb-6 group-hover:transform group-hover:scale-105 transition-transform duration-700">
          <GradientHeading level={3} className="text-xl md:text-2xl mb-2 relative z-10" variant={variant}>
            {title}
          </GradientHeading>
          
          {/* Animated underline that expands on hover */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full group-hover:w-2/3 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"></div>
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
        
        {/* Premium Learn More link that reveals on hover */}
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
      
      {/* Enhanced bottom reflection with dynamic opacity */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
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
          {/* Advanced premium enterprise heading container with enhanced effects */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl py-10 px-8 md:py-12 md:px-16 mx-auto max-w-4xl mb-8 inline-block shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
            {/* Premium gradient border effect - Mixed variant (matching the third card) */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Subtle ambient glow that activates on hover */}
            <div className="absolute inset-0 rounded-xl opacity-40 transition-opacity duration-700 ease-in-out" 
                style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
            </div>
            
            {/* Advanced ambient glow with interactive animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-blue-500/5 blur-[100px] rounded-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-blue-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
            
            {/* Premium decorative elements */}
            <div className="absolute top-6 left-6 w-8 h-8 opacity-30">
              <div className="absolute inset-0 border-t-2 border-l-2 border-orange-500/40 rounded-tl-lg"></div>
            </div>
            <div className="absolute bottom-6 right-6 w-8 h-8 opacity-30">
              <div className="absolute inset-0 border-b-2 border-r-2 border-blue-500/40 rounded-br-lg"></div>
            </div>
            
            {/* Enhanced premium badge with 3D effect */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-gray-900/95 to-gray-950/95 border border-gray-800 shadow-[0_5px_15px_rgba(0,0,0,0.3)] relative group">
                {/* Premium gradient border effect - Mixed variant */}
                <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
                
                {/* Badge icon with glow effect */}
                <div className="mr-2 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/60 to-orange-600/60 blur-[6px] opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <svg className="h-4 w-4 text-amber-300 relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a9.5 9.5 0 0 0 3.09-18.49A4.5 4.5 0 1 0 12 8.5a4.5 4.5 0 1 0-3.09-9.01A9.5 9.5 0 0 0 12 22z"></path>
                  </svg>
                </div>
                
                {/* Badge text with shimmer effect */}
                <span className="text-amber-300 text-sm font-medium relative">
                  <span className="relative z-10">NASA Technology</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 2s infinite'
                     }}>
                  </span>
                </span>
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
