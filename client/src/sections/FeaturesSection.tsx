const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Industry-Leading Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our protective coatings provide exceptional durability and protection for a wide range of applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-primary-600 text-4xl mb-4">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Superior Protection</h3>
            <p className="text-gray-600">
              Our coatings provide exceptional resistance against corrosion, UV damage, and harsh chemicals.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-primary-600 text-4xl mb-4">
              <i className="fas fa-leaf"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Eco-Friendly</h3>
            <p className="text-gray-600">
              Environmentally conscious formulations with low VOCs and sustainable manufacturing processes.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-primary-600 text-4xl mb-4">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Long-Lasting</h3>
            <p className="text-gray-600">
              Extended service life means fewer reapplications and lower lifetime maintenance costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;