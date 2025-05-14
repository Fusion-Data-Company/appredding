import React from 'react';
import { GradientHeading } from "@/components/ui/gradient-heading";
import backgroundImg from "../assets_dir/images/praetorian-hero-final.png";

const ProductPerformanceSection = () => {
  return (
    <section 
      className="py-32 relative"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/60" style={{ zIndex: 1 }}></div>
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
            <div className="text-6xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">99%</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="mixed">Reflectivity Retention</GradientHeading>
            <p className="text-gray-300 text-lg">Only 1% reflectivity loss after 3 years compared to 10-20% for competing products, providing long-lasting thermal performance</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-6xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">30+</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="fire">Years Durability</GradientHeading>
            <p className="text-gray-300 text-lg">Original 1989 applications showed no deterioration or performance loss when inspected 30 years later in 2019</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-6xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">87%</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="blue">Maximum Energy Savings</GradientHeading>
            <p className="text-gray-300 text-lg">Sony Koda facility energy consumption reduced from 3,767 KW to just 519 KW with 1.06 year payback period</p>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-4 border-white/40 rounded-lg p-12 text-center hover-lift shadow-[0_0_60px_rgba(255,255,255,0.3)] transform transition-transform hover:scale-105 min-h-[350px] flex flex-col justify-center">
            <div className="text-6xl font-bold text-primary-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">0/100</div>
            <GradientHeading level={3} className="text-2xl md:text-3xl mb-4" variant="fire">Perfect Fire Rating</GradientHeading>
            <p className="text-gray-300 text-lg">Perfect scores in ASTM E84 testing for both Flame Spread Index and Smoke Development Index - the highest possible Class A classification</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 rounded-xl p-14 md:p-20 border-4 border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.3)] transform hover:scale-[1.01] transition-transform duration-500">
          <div className="text-center mb-14">
            <GradientHeading level={2} className="text-3xl md:text-4xl lg:text-5xl mb-6" variant="mixed">NASA-Grade Testing Protocols</GradientHeading>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Our triple-component system utilizes vacuum-filled ceramic microspheres in a water-based acrylic elastomeric polymer with 156% elongation capability. This advanced ceramic technology provides exceptional thermal insulation properties and fire resistance across a wide range of applications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-4 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    <i className="fas fa-fire text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl mb-2">ASTM E84 Fire Testing</h4>
                    <p className="text-lg text-gray-300">Perfect Class A ratings with 0/100 scores for both Flame Spread Index and Smoke Development Index, verified by NASA, UL, and Factory Mutual. Competing ceramic coatings only achieve Class B-C ratings (25-75/100).</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-4 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    <i className="fas fa-temperature-high text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl mb-2">Extreme Heat Differential Tests</h4>
                    <p className="text-lg text-gray-300">Advanced ceramic microspheres create physical impossibility for heat traversal through vacuum spaces. 5-6 coats (30 mils) on 1/4 inch steel withstand 1550°F (843°C) for 25+ minutes, significantly outperforming conventional systems.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-4 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    <i className="fas fa-sun text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl mb-2">Solar Reflectance Testing</h4>
                    <p className="text-lg text-gray-300">Titanium Dioxide reflective technology verified by Cool Roof Rating Council with 89% reflection and 89% thermal emittance. Blocks 95% of solar radiation with only 1% degradation over 3 years compared to 10-20% degradation in competing products.</p>
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
                      <td className="py-5 px-4">Fire Rating (ASTM E84)</td>
                      <td className="text-center py-5 px-4">Class B-C (25-75/100)</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">Class A (0/100)</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">Solar Reflection</td>
                      <td className="text-center py-5 px-4">70-80%</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">89%</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">Thermal Emittance</td>
                      <td className="text-center py-5 px-4">70-80%</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">89%</td>
                    </tr>
                    <tr className="border-b border-gray-600/40">
                      <td className="py-5 px-4">Elastomeric Elongation</td>
                      <td className="text-center py-5 px-4">100%</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">156%</td>
                    </tr>
                    <tr>
                      <td className="py-5 px-4">Heat Resistance</td>
                      <td className="text-center py-5 px-4">500-900°F</td>
                      <td className="text-center py-5 px-4 text-primary-400 font-semibold text-xl">Advanced</td>
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