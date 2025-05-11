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
        minHeight: "100vh" 
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-4 border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.3)] py-16 px-16 mx-auto max-w-5xl mb-10 inline-block transform hover:scale-[1.01] transition-transform duration-500">
            <GradientHeading level={2} className="text-4xl md:text-5xl lg:text-6xl mb-8" variant="mixed">Product Performance Data</GradientHeading>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Our protective coatings are rigorously tested and proven to deliver exceptional performance across a range of metrics.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-32">
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-8xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">98.7%</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="mixed">UV Resistance</GradientHeading>
            <p className="text-gray-300 text-lg">Retention of original properties after 5,000 hours of accelerated UV exposure testing</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-8xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">15+</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="fire">Years Durability</GradientHeading>
            <p className="text-gray-300 text-lg">Average lifespan of our premium protective coating systems in real-world applications</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-8xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">30%</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="blue">Energy Savings</GradientHeading>
            <p className="text-gray-300 text-lg">Reduction in cooling costs with our thermal reflective coating technology</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-8xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">9.2/10</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="fire">Customer Satisfaction</GradientHeading>
            <p className="text-gray-300 text-lg">Average rating from our post-installation customer satisfaction surveys</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 rounded-xl p-14 md:p-20 border-4 border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.3)] transform hover:scale-[1.01] transition-transform duration-500">
          <div className="text-center mb-14">
            <GradientHeading level={2} className="text-3xl md:text-4xl lg:text-5xl mb-6" variant="mixed">Industry-Leading Product Testing</GradientHeading>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our comprehensive testing program ensures that every Praetorian product exceeds industry standards and delivers consistent results in even the most challenging environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-4 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    <i className="fas fa-flask text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl mb-2">Chemical Resistance Testing</h4>
                    <p className="text-lg text-gray-300">Our coatings are tested against over 100 different chemicals and compounds to ensure durability in any environment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-4 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    <i className="fas fa-temperature-high text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl mb-2">Extreme Temperature Cycles</h4>
                    <p className="text-lg text-gray-300">Products undergo rapid temperature cycling from -40°F to 180°F to simulate decades of seasonal changes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-4 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    <i className="fas fa-water text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl mb-2">Immersion and Humidity Testing</h4>
                    <p className="text-lg text-gray-300">Continuous exposure to water, salt spray, and high humidity conditions validates long-term performance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <GradientHeading level={3} className="text-3xl mb-8" variant="fire">Product Comparison Chart</GradientHeading>
              <div className="overflow-x-auto">
                <table className="w-full text-lg">
                  <thead>
                    <tr className="border-b-2 border-gray-600/40">
                      <th className="text-left py-5 px-4 text-xl">Performance Metric</th>
                      <th className="text-center py-5 px-4 text-xl">Industry Standard</th>
                      <th className="text-center py-5 px-4 text-xl">Praetorian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">Abrasion Resistance</td>
                      <td className="text-center py-5 px-4">Good</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">Excellent</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">Salt Spray Resistance</td>
                      <td className="text-center py-5 px-4">1,000 hours</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">3,500+ hours</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">Impact Resistance</td>
                      <td className="text-center py-5 px-4">160 in-lb</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">200+ in-lb</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">VOC Content</td>
                      <td className="text-center py-5 px-4">100-250 g/L</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">&lt;50 g/L</td>
                    </tr>
                    <tr>
                      <td className="py-5 px-4">Application Temperature Range</td>
                      <td className="text-center py-5 px-4">50-90°F</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">35-110°F</td>
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