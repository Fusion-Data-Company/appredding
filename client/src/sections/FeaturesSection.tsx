import { GradientHeading } from "@/components/ui/gradient-heading";

const FeatureCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  // Different gradient variants based on index/feature type
  const variants = ["fire", "blue", "mixed"];
  const variant = variants[index % variants.length] as "fire" | "blue" | "mixed";
  
  return (
    <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 backdrop-blur-md rounded-lg p-8 md:p-10 text-center transform transition-all hover:-translate-y-2 hover:scale-105 dark:border-4 dark:border-gray-600/40 border-4 border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.25)] shadow-[0_0_30px_rgba(0,0,0,0.3)] h-full flex flex-col justify-between">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        <i className={`${icon} dark:text-white text-gray-700 text-4xl`}></i>
      </div>
      <GradientHeading level={3} className="text-xl md:text-2xl mb-4" variant={variant}>{title}</GradientHeading>
      <p className="dark:text-[#a0a0a0] text-gray-700 text-base md:text-lg">{description}</p>
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
      className="py-32 relative" 
      id="features"
      style={{
        backgroundImage: 'url("/images/fire-water-hq.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: "100vh"
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl dark:border-4 dark:border-gray-600/40 border-4 border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.25)] shadow-[0_0_30px_rgba(0,0,0,0.3)] py-8 px-6 md:py-10 md:px-12 mx-auto max-w-4xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Superior Protection Features</GradientHeading>
            <p className="dark:text-[#a0a0a0] text-gray-700 max-w-2xl mx-auto">
              Our specially formulated coatings are designed to withstand extreme conditions while providing long-lasting protection for your assets.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
