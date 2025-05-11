import React from 'react';
import { GradientHeading } from "@/components/ui/gradient-heading";

const ProductPerformanceSection = () => {
  return (
    <section 
      className="py-32 relative"
      style={{ 
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh" // Ensure minimum height to avoid compression
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-[1440px]">
        <div className="text-center mb-20">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-600/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] py-10 px-8 md:px-12 mx-auto max-w-4xl mb-10 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Product Performance Data</GradientHeading>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our protective coatings are rigorously tested and proven to deliver exceptional performance across a range of metrics.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 mb-32">
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-gray-600/40 rounded-lg p-10 text-center hover-lift shadow-[0_0_40px_rgba(255,255,255,0.25)] transform transition-transform hover:scale-105">
            <div className="text-7xl font-bold text-primary-400 mb-5 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">98.7%</div>
            <GradientHeading level={3} className="text-xl mb-4" variant="mixed">UV Resistance</GradientHeading>
            <p className="text-gray-300">Retention of original properties after 5,000 hours of accelerated UV exposure testing</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-gray-600/40 rounded-lg p-10 text-center hover-lift shadow-[0_0_40px_rgba(255,255,255,0.25)] transform transition-transform hover:scale-105">
            <div className="text-7xl font-bold text-primary-400 mb-5 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">15+</div>
            <GradientHeading level={3} className="text-xl mb-4" variant="fire">Years Durability</GradientHeading>
            <p className="text-gray-300">Average lifespan of our premium protective coating systems in real-world applications</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-gray-600/40 rounded-lg p-10 text-center hover-lift shadow-[0_0_40px_rgba(255,255,255,0.25)] transform transition-transform hover:scale-105">
            <div className="text-7xl font-bold text-primary-400 mb-5 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">30%</div>
            <GradientHeading level={3} className="text-xl mb-4" variant="blue">Energy Savings</GradientHeading>
            <p className="text-gray-300">Reduction in cooling costs with our thermal reflective coating technology</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-gray-600/40 rounded-lg p-10 text-center hover-lift shadow-[0_0_40px_rgba(255,255,255,0.25)] transform transition-transform hover:scale-105">
            <div className="text-7xl font-bold text-primary-400 mb-5 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">9.2/10</div>
            <GradientHeading level={3} className="text-xl mb-4" variant="fire">Customer Satisfaction</GradientHeading>
            <p className="text-gray-300">Average rating from our post-installation customer satisfaction surveys</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 rounded-xl p-12 md:p-16 border-4 border-gray-600/40 shadow-[0_0_40px_rgba(255,255,255,0.25)]">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <GradientHeading level={3} className="text-2xl mb-6" variant="mixed">Industry-Leading Product Testing</GradientHeading>
              <p className="mb-6">
                Our comprehensive testing program ensures that every Praetorian product exceeds industry standards and delivers consistent results in even the most challenging environments.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-2 mt-1 shadow-[0_0_5px_rgba(255,255,255,0.15)]">
                    <i className="fas fa-flask text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Chemical Resistance Testing</h4>
                    <p className="text-sm text-gray-300">Our coatings are tested against over 100 different chemicals and compounds to ensure durability in any environment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-2 mt-1 shadow-[0_0_5px_rgba(255,255,255,0.15)]">
                    <i className="fas fa-temperature-high text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Extreme Temperature Cycles</h4>
                    <p className="text-sm text-gray-300">Products undergo rapid temperature cycling from -40°F to 180°F to simulate decades of seasonal changes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-2 mt-1 shadow-[0_0_5px_rgba(255,255,255,0.15)]">
                    <i className="fas fa-water text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Immersion and Humidity Testing</h4>
                    <p className="text-sm text-gray-300">Continuous exposure to water, salt spray, and high humidity conditions validates long-term performance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <GradientHeading level={3} className="text-2xl mb-6" variant="fire">Product Comparison Chart</GradientHeading>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600/40">
                      <th className="text-left py-4 px-2">Performance Metric</th>
                      <th className="text-center py-4 px-2">Industry Standard</th>
                      <th className="text-center py-4 px-2">Praetorian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-4 px-2">Abrasion Resistance</td>
                      <td className="text-center py-4 px-2">Good</td>
                      <td className="text-center py-4 px-2 text-primary-400 font-semibold">Excellent</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-4 px-2">Salt Spray Resistance</td>
                      <td className="text-center py-4 px-2">1,000 hours</td>
                      <td className="text-center py-4 px-2 text-primary-400 font-semibold">3,500+ hours</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-4 px-2">Impact Resistance</td>
                      <td className="text-center py-4 px-2">160 in-lb</td>
                      <td className="text-center py-4 px-2 text-primary-400 font-semibold">200+ in-lb</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-4 px-2">VOC Content</td>
                      <td className="text-center py-4 px-2">100-250 g/L</td>
                      <td className="text-center py-4 px-2 text-primary-400 font-semibold">&lt;50 g/L</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-2">Application Temperature Range</td>
                      <td className="text-center py-4 px-2">50-90°F</td>
                      <td className="text-center py-4 px-2 text-primary-400 font-semibold">35-110°F</td>
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