const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-8 text-center hover:transform hover:-translate-y-1 transition-transform">
      <div className="text-5xl text-[#0070f3] mb-6">
        <i className={icon}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
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
    <section className="py-20 bg-[#121212]" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Superior Protection Features</h2>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Our specially formulated coatings are designed to withstand extreme conditions while providing long-lasting protection for your assets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
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
