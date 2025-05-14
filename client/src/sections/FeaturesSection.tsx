import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  // Different gradient variants based on index/feature type
  const variants = ["fire", "blue", "mixed"];
  const variant = variants[index % variants.length] as "fire" | "blue" | "mixed";
  
  return (
    <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md rounded-lg p-8 md:p-10 text-center transform transition-all hover:-translate-y-2 hover:scale-105 border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)] h-full flex flex-col justify-between">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 bg-gradient-to-r from-amber-700 to-orange-600 rounded-full shadow-[0_0_15px_rgba(251,113,36,0.6)]">
        <i className={`${icon} text-white text-4xl`}></i>
      </div>
      <GradientHeading level={3} className="text-xl md:text-2xl mb-4" variant={variant}>{title}</GradientHeading>
      <p className="text-gray-300 text-base md:text-lg">{description}</p>
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
        backgroundPosition: "center",
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
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)] py-8 px-6 md:py-10 md:px-12 mx-auto max-w-4xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">NASA-Derived Ceramic Technology</GradientHeading>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Praetorian SmartCoat represents a fundamental shift in temperature control and fire protection, utilizing space-age ceramic microsphere technology that creates a comprehensive thermal barrier addressing all three heat transfer mechanisms simultaneously.
            </p>
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
