import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  return (
    <div className="relative group h-full transform transition-all duration-700 hover:scale-[1.02] hover:z-10">
      {/* Gray border effect without glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 rounded-xl opacity-90"></div>
      
      {/* Premium Card Container with gray gradient */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 md:p-8 text-center border border-gray-600/30 overflow-hidden h-full z-10">
        {/* Subtle dots and squares pattern background in gray */}
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjI5LDIyOSwyMjksMC4yKSIgZD0iTTAgMGgydjJIM3ptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Removed ambient glow effects as requested */}
        
        {/* Corner accent lines with gray theme */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-500/40 rounded-tl-lg"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-500/40 rounded-tr-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-500/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-500/40 rounded-br-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
        </div>
        
        {/* Content with improved z-indices to ensure it appears above effects */}
        <div className="relative z-20">
          {/* Icon styling with gray theme */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 group-hover:scale-110 transition-all duration-700 ease-out">
            {/* Icon background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"></div>
            
            {/* Icon with white color */}
            <i className={`${icon} text-gray-200 text-3xl relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]`}></i>
            
            {/* Icon border with gray */}
            <div className="absolute inset-0 rounded-full border border-gray-500/40 scale-110"></div>
          </div>
          
          {/* Title styling with gray theme */}
          <div className="relative mb-4">
            {/* Title shadow */}
            <div className="absolute inset-0 flex justify-center items-center blur-[2px] text-gray-700/10 scale-105">
              {title}
            </div>
            
            {/* White text */}
            <h3 className="text-white font-bold text-2xl md:text-2xl relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {title}
            </h3>
            
            {/* Gray underline */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-gray-500/40 to-gray-600/40 group-hover:w-3/4 transition-all duration-700 rounded-full opacity-60"></div>
          </div>
          
          {/* Description text styling - matching screenshot exactly */}
          <p className="text-gray-300 text-sm md:text-base relative z-20 group-hover:text-gray-200 transition-colors duration-700 min-h-[80px]">
            {description}
          </p>
          
          {/* Hide Learn More for cleaner match to screenshot */}
        </div>
        
        {/* Bottom border with gray gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gray-600/30 via-gray-500/30 to-gray-600/30 opacity-50 group-hover:opacity-70 transition-all duration-700"></div>
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
          {/* Header card with gray theme */}
          <div className="relative group/nasa transform transition-all duration-700 hover:scale-[1.02] hover:z-10 mx-auto max-w-4xl mb-8 inline-block">
            {/* Gray border without glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 rounded-xl opacity-90"></div>
            
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-10 px-8 md:py-12 md:px-16 border border-gray-600/30 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10">
              {/* Subtle dots pattern background in gray */}
              <div className="absolute inset-0 opacity-20 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjI5LDIyOSwyMjksMC4yKSIgZD0iTTAgMGgydjJIM3ptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
              </div>
              
              {/* Removed ambient glow effects as requested */}
              
              {/* Corner accent lines with gray theme */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gray-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gray-500/40 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gray-500/40 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gray-500/40 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Premium badge with gray styling */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex z-50">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black border border-gray-500/40 shadow-lg relative transition-all duration-500 hover:scale-105">
                  {/* Badge icon */}
                  <div className="mr-2 relative">
                    <svg className="h-5 w-5 text-gray-300 relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22a9.5 9.5 0 0 0 3.09-18.49A4.5 4.5 0 1 0 12 8.5a4.5 4.5 0 1 0-3.09-9.01A9.5 9.5 0 0 0 12 22z"></path>
                    </svg>
                  </div>
                  
                  {/* Badge text with gray styling */}
                  <span className="text-gray-300 text-sm font-medium tracking-wide">
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