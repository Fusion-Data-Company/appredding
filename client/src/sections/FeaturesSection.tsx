import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  return (
    <div className="relative group h-full transform transition-all duration-700 hover:scale-[1.02] hover:z-10">
      {/* Multiple layered background effects - EXACTLY matching TechnicalSpecsTable.tsx */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-300"></div>
      
      {/* Premium Card Container - EXACT MATCH to TechnicalSpecsTable.tsx */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 md:p-8 text-center border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 h-full z-10">
        {/* Subtle dots and squares pattern background in mixed colors */}
        <div className="absolute inset-0 opacity-25 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        </div>
        
        {/* Ambient glow effects - positioned away from text */}
        <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
        <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        
        {/* Additional corner accent lines - with mixed theme - EXACT MATCH */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
        </div>
        
        {/* Content with improved z-indices to ensure it appears above effects */}
        <div className="relative z-20">
          {/* Enhanced premium icon with animated glow effect */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group-hover:scale-110 transition-all duration-700 ease-out">
            {/* Icon glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-blue-500/30 blur-[10px] opacity-70 animate-pulse-slow"></div>
            
            {/* Icon background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"></div>
            
            {/* Icon */}
            <i className={`${icon} text-orange-100 text-4xl relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]`}></i>
            
            {/* Icon border with shimmer */}
            <div className="absolute inset-0 rounded-full border border-orange-500/60 scale-110"></div>
          </div>
          
          {/* Enhanced title with mixed theme styling */}
          <div className="relative mb-4">
            {/* Background glow for title */}
            <div className="absolute inset-0 flex justify-center items-center blur-[2px] text-orange-900/10 scale-105">
              {title}
            </div>
            
            {/* Premium text styling */}
            <h3 className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-300 to-blue-400 font-bold text-xl md:text-xl relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {title}
            </h3>
            
            {/* Animated underline with mixed-themed gradient */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-full transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
          </div>
          
          {/* Enhanced description */}
          <p className="text-gray-300 text-sm md:text-base relative z-20 group-hover:text-gray-200 transition-colors duration-700">
            {description}
          </p>
          
          {/* Premium Learn More link that reveals on hover */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 relative z-20">
            <span className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400 text-sm font-medium inline-flex items-center group/link relative">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-orange-500 to-blue-500 group-hover/link:w-full transition-all duration-300"></span>
            </span>
          </div>
        </div>
        
        {/* Bottom shimmer line */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full opacity-70 group-hover:opacity-100 group-hover:w-3/4 transition-all duration-1000"></div>
      </div>
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
        backgroundPosition: "center center",
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
          {/* Premium header card with exact styling from TechnicalSpecsTable.tsx */}
          <div className="relative group/nasa transform transition-all duration-700 hover:scale-[1.02] hover:z-10 mx-auto max-w-4xl mb-8 inline-block">
            {/* Multiple layered background effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover/nasa:opacity-100 group-hover/nasa:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover/nasa:opacity-100 transition-all duration-300"></div>
            
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-10 px-8 md:py-12 md:px-16 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              {/* Subtle dots pattern background */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effects */}
              <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
              
              {/* Corner accents with mixed theme */}
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
              
              {/* Premium badge with mixed orange/blue styling */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex z-50">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black border border-orange-500/30 shadow-lg relative hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-500 hover:scale-105">
                  {/* Badge icon with glow effect */}
                  <div className="mr-2 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-blue-500/30 blur-[6px] opacity-70"></div>
                    <svg className="h-5 w-5 text-transparent relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#mixed-gradient-nasa-badge)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22a9.5 9.5 0 0 0 3.09-18.49A4.5 4.5 0 1 0 12 8.5a4.5 4.5 0 1 0-3.09-9.01A9.5 9.5 0 0 0 12 22z"></path>
                    </svg>
                    
                    {/* Gradient definition for icon */}
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="mixed-gradient-nasa-badge" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  {/* Badge text with gradient */}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 text-sm font-medium tracking-wide">
                    NASA TECHNOLOGY
                  </span>
                </div>
              </div>
              
              {/* Content with enhanced animations */}
              <div className="relative z-10 mt-2">
                {/* Advanced premium heading with decorative elements */}
                <div className="relative inline-block mb-5">
                  {/* Decorative dots */}
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-blue-500"></div>
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
        </div>
        
        {/* Add keyframes for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          
          @keyframes pulse-slow-delayed {
            0%, 100% { opacity: 0.3; transform: scale(1.0); }
            50% { opacity: 0.6; transform: scale(1.2); }
          }
        `}} />
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;