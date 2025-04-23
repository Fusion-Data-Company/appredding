import { GradientHeading } from "@/components/ui/gradient-heading";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  // Different gradient variants based on index/feature type
  const variants = ["fire", "blue", "mixed"];
  const variant = variants[index % variants.length] as "fire" | "blue" | "mixed";
  
  return (
    <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 rounded-lg p-8 text-center hover:transform hover:-translate-y-1 transition-transform border border-gray-600/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.15)]">
        <i className={`${icon} text-white text-3xl`}></i>
      </div>
      <GradientHeading level={3} className="text-xl mb-3" variant={variant}>{title}</GradientHeading>
      <p className="text-[#a0a0a0]">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-fire-extinguisher",
      title: "Fire Resistant",
      description: "Withstands extreme temperatures up to 2000°F, protecting structures during wildfires and industrial fires."
    },
    {
      icon: "fas fa-water",
      title: "Water Repellent",
      description: "Creates a hydrophobic barrier that prevents water penetration and protects against moisture damage."
    },
    {
      icon: "fas fa-sun",
      title: "UV Resistant",
      description: "Maintains integrity and color under intense sun exposure, preventing degradation from UV radiation."
    }
  ];

  return (
    <section 
      className="py-20 relative" 
      id="features"
      style={{
        backgroundImage: 'url("/images/fire-water-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-600/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Superior Protection Features</GradientHeading>
            <p className="text-[#a0a0a0] max-w-2xl mx-auto">
              Our specially formulated coatings are designed to withstand extreme conditions while providing long-lasting protection for your assets.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
