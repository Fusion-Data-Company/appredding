import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  return (
    <div className="relative group h-full transform transition-all duration-700 hover:scale-[1.02] hover:z-10">
      {/* Vibrant orange/red outer glow - matching screenshot exactly */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/60 via-red-600/60 to-orange-600/60 rounded-xl blur-md opacity-90 group-hover:opacity-100 group-hover:blur-lg transition-all duration-1000"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/90 via-red-500/90 to-orange-500/90 rounded-xl blur-sm opacity-100 transition-all duration-300"></div>
      
      {/* Premium Card Container - matching screenshot exactly */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-8 md:p-8 text-center border border-orange-500/50 overflow-hidden hover:shadow-[0_0_35px_rgba(249,115,22,0.5)] transition-shadow duration-500 h-full z-10">
        {/* Subtle dots and squares pattern background in orange */}
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjM5LDY4LDY4LDAuNCkiIGQ9Ik0wIDBoMnYySDN6bTIgMmgydjJIMnoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Removed ambient glow effects as requested */}
        
        {/* Corner accent lines - matching screenshot exactly with orange/red theme */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/80 rounded-tl-lg"></div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/70 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-600/80 rounded-tr-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-orange-600/70 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/80 rounded-bl-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/70 rounded-full blur-[2px]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-600/80 rounded-br-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-600/70 rounded-full blur-[2px]"></div>
        </div>
        
        {/* Content with improved z-indices to ensure it appears above effects */}
        <div className="relative z-20">
          {/* Icon styling matching screenshot exactly */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 group-hover:scale-110 transition-all duration-700 ease-out">
            {/* Icon glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 to-red-500/40 blur-[10px] opacity-70 animate-pulse-slow"></div>
            
            {/* Icon background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"></div>
            
            {/* Icon with orange theme */}
            <i className={`${icon} text-orange-200 text-3xl relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]`}></i>
            
            {/* Icon border with orange glow */}
            <div className="absolute inset-0 rounded-full border border-orange-500/80 scale-110"></div>
          </div>
          
          {/* Title styling matching screenshot exactly */}
          <div className="relative mb-4">
            {/* Title glow effect */}
            <div className="absolute inset-0 flex justify-center items-center blur-[2px] text-orange-900/10 scale-105">
              {title}
            </div>
            
            {/* Premium text styling - orange only */}
            <h3 className="text-white font-bold text-2xl md:text-2xl relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {title}
            </h3>
            
            {/* Orange underline with animation */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-orange-500/80 to-red-500/80 group-hover:w-3/4 transition-all duration-700 rounded-full opacity-90 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
          </div>
          
          {/* Description text styling - matching screenshot exactly */}
          <p className="text-gray-300 text-sm md:text-base relative z-20 group-hover:text-gray-200 transition-colors duration-700 min-h-[80px]">
            {description}
          </p>
          
          {/* Hide Learn More for cleaner match to screenshot */}
        </div>
        
        {/* Bottom border glow - matching screenshot exactly */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-orange-600/50 via-red-600/50 to-orange-600/50 opacity-70 group-hover:opacity-100 transition-all duration-700"></div>
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
          {/* Header card styled to match feature cards exactly */}
          <div className="relative group/nasa transform transition-all duration-700 hover:scale-[1.02] hover:z-10 mx-auto max-w-4xl mb-8 inline-block">
            {/* Orange/red vibrant outer glow - matching feature cards */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/60 via-red-600/60 to-orange-600/60 rounded-xl blur-md opacity-90 group-hover/nasa:opacity-100 group-hover/nasa:blur-lg transition-all duration-1000"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/90 via-red-500/90 to-orange-500/90 rounded-xl blur-sm opacity-100 transition-all duration-300"></div>
            
            {/* Premium Card Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-10 px-8 md:py-12 md:px-16 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              {/* Subtle dots pattern background */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Removed ambient glow effects as requested */}
              
              {/* Corner accent lines - matching feature cards exactly */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/80 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/70 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-orange-600/80 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-orange-600/70 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-orange-500/80 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/70 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-orange-600/80 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-600/70 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Premium badge with orange/red styling to match feature cards */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex z-50">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black border border-orange-500/50 shadow-lg relative hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-500 hover:scale-105">
                  {/* Badge icon with glow effect */}
                  <div className="mr-2 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 to-red-500/40 blur-[6px] opacity-70"></div>
                    <svg className="h-5 w-5 text-orange-400 relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22a9.5 9.5 0 0 0 3.09-18.49A4.5 4.5 0 1 0 12 8.5a4.5 4.5 0 1 0-3.09-9.01A9.5 9.5 0 0 0 12 22z"></path>
                    </svg>
                  </div>
                  
                  {/* Badge text with matching orange styling */}
                  <span className="text-orange-400 text-sm font-medium tracking-wide">
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