import React from 'react';

const ProductPerformanceSection = () => {
  return (
    <section className="py-20 bg-primary-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Performance Data</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our protective coatings are rigorously tested and proven to deliver exceptional performance across a range of metrics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-primary-800 premium-border rounded-lg p-6 text-center hover-lift">
            <div className="text-5xl font-bold text-primary-400 mb-3">98.7%</div>
            <h3 className="text-xl font-semibold mb-2">UV Resistance</h3>
            <p className="text-gray-300">Retention of original properties after 5,000 hours of accelerated UV exposure testing</p>
          </div>
          
          <div className="bg-primary-800 premium-border rounded-lg p-6 text-center hover-lift">
            <div className="text-5xl font-bold text-primary-400 mb-3">15+</div>
            <h3 className="text-xl font-semibold mb-2">Years Durability</h3>
            <p className="text-gray-300">Average lifespan of our premium protective coating systems in real-world applications</p>
          </div>
          
          <div className="bg-primary-800 premium-border rounded-lg p-6 text-center hover-lift">
            <div className="text-5xl font-bold text-primary-400 mb-3">30%</div>
            <h3 className="text-xl font-semibold mb-2">Energy Savings</h3>
            <p className="text-gray-300">Reduction in cooling costs with our thermal reflective coating technology</p>
          </div>
          
          <div className="bg-primary-800 premium-border rounded-lg p-6 text-center hover-lift">
            <div className="text-5xl font-bold text-primary-400 mb-3">9.2/10</div>
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-300">Average rating from our post-installation customer satisfaction surveys</p>
          </div>
        </div>
        
        <div className="bg-primary-900 rounded-xl p-8 premium-border glass-effect">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Industry-Leading Product Testing</h3>
              <p className="mb-6">
                Our comprehensive testing program ensures that every Praetorian product exceeds industry standards and delivers consistent results in even the most challenging environments.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-800 rounded-full p-2 mt-1">
                    <i className="fas fa-flask text-primary-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Chemical Resistance Testing</h4>
                    <p className="text-sm text-gray-300">Our coatings are tested against over 100 different chemicals and compounds to ensure durability in any environment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary-800 rounded-full p-2 mt-1">
                    <i className="fas fa-temperature-high text-primary-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Extreme Temperature Cycles</h4>
                    <p className="text-sm text-gray-300">Products undergo rapid temperature cycling from -40°F to 180°F to simulate decades of seasonal changes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary-800 rounded-full p-2 mt-1">
                    <i className="fas fa-water text-primary-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Immersion and Humidity Testing</h4>
                    <p className="text-sm text-gray-300">Continuous exposure to water, salt spray, and high humidity conditions validates long-term performance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Product Comparison Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-700">
                      <th className="text-left py-3">Performance Metric</th>
                      <th className="text-center py-3">Industry Standard</th>
                      <th className="text-center py-3">Praetorian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-primary-700">
                      <td className="py-3">Abrasion Resistance</td>
                      <td className="text-center">Good</td>
                      <td className="text-center text-primary-400 font-semibold">Excellent</td>
                    </tr>
                    <tr className="border-b border-primary-700">
                      <td className="py-3">Salt Spray Resistance</td>
                      <td className="text-center">1,000 hours</td>
                      <td className="text-center text-primary-400 font-semibold">3,500+ hours</td>
                    </tr>
                    <tr className="border-b border-primary-700">
                      <td className="py-3">Impact Resistance</td>
                      <td className="text-center">160 in-lb</td>
                      <td className="text-center text-primary-400 font-semibold">200+ in-lb</td>
                    </tr>
                    <tr className="border-b border-primary-700">
                      <td className="py-3">VOC Content</td>
                      <td className="text-center">100-250 g/L</td>
                      <td className="text-center text-primary-400 font-semibold">&lt;50 g/L</td>
                    </tr>
                    <tr>
                      <td className="py-3">Application Temperature Range</td>
                      <td className="text-center">50-90°F</td>
                      <td className="text-center text-primary-400 font-semibold">35-110°F</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPerformanceSection;