import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  // Different gradient variants based on index/feature type
  const variants = ["fire", "blue", "mixed"];
  const variant = variants[index % variants.length] as "fire" | "blue" | "mixed";
  
  // Custom gradients based on variant type
  const borderGradient = 
    variant === "fire" ? "from-orange-500/50 via-transparent to-red-500/50" :
    variant === "blue" ? "from-blue-500/50 via-transparent to-cyan-400/50" :
    "from-orange-500/50 via-transparent to-blue-400/50";
  
  const iconGradient = 
    variant === "fire" ? "from-amber-600 via-orange-500 to-red-600" :
    variant === "blue" ? "from-blue-600 via-cyan-500 to-blue-700" :
    "from-amber-600 via-orange-500 to-blue-600";
  
  const iconShadow = 
    variant === "fire" ? "rgba(251,113,36,0.6)" :
    variant === "blue" ? "rgba(59,130,246,0.6)" :
    "rgba(251,113,36,0.4), rgba(59,130,246,0.4)";

  return (
    <div className="relative group h-full transform transition-all hover:-translate-y-2 hover:scale-105 flex flex-col justify-between">
      {/* Premium enterprise-level card styling */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 md:p-10 text-center border-0 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10">
        {/* Premium gradient border effect */}
        <div className={`absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r ${borderGradient} opacity-70`}></div>
        
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        
        {/* Subtle ambient glow that activates on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
             style={{ 
               background: variant === "fire" ? "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, transparent 70%)" :
                          variant === "blue" ? "radial-gradient(circle at center, rgba(59,130,246,0.4) 0%, transparent 70%)" :
                          "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)"
             }}>
        </div>
      
        {/* Icon with enhanced styling */}
        <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-8 group-hover:scale-110 transition-transform duration-500">
          {/* Icon background with gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${iconGradient} rounded-full shadow-[0_0_20px_${iconShadow}]`}></div>
          
          {/* Icon inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full"></div>
          
          {/* Icon */}
          <i className={`${icon} text-white text-4xl relative z-10`}></i>
          
          {/* Animated concentric ring for enterprise effect */}
          <div className="absolute inset-0 rounded-full border border-white/20 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-700"></div>
        </div>
      
        {/* Title with enhanced styling */}
        <div className="relative">
          <GradientHeading level={3} className="text-xl md:text-2xl mb-5 relative z-10" variant={variant}>{title}</GradientHeading>
        </div>
        
        {/* Description with enhanced styling */}
        <p className="text-gray-300 text-base md:text-lg relative z-10">{description}</p>
      </div>
      
      {/* Subtle bottom reflection */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-sm"></div>
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
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-8 px-6 md:py-10 md:px-12 mx-auto max-w-4xl mb-8 inline-block shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            {/* Premium gradient border effect */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
            
            {/* Inner highlight */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Subtle ambient glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 blur-[100px] rounded-full"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">NASA-Derived Ceramic Technology</GradientHeading>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Praetorian SmartCoat represents a fundamental shift in temperature control and fire protection, utilizing space-age ceramic microsphere technology that creates a comprehensive thermal barrier addressing all three heat transfer mechanisms simultaneously.
              </p>
            </div>
          </div>
        </div>
        
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
