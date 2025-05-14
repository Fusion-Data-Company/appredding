import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const IntroSection = () => {
  return (
    <section 
      className="py-32 relative"
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-b from-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-xl border-0 py-14 px-10 md:px-16 mx-auto max-w-5xl mb-16 shadow-[0_10px_50px_rgba(255,100,50,0.25)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.4)] relative premium-gradient-border">
            <GradientHeading level={1} className="text-4xl md:text-6xl mb-8" variant="mixed">
              NASA-Derived Ceramic Coating Technology
            </GradientHeading>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto">
              Revolutionary triple-component system with perfect Class A fire protection and superior thermal insulation using vacuum-filled ceramic microsphere technology.
            </p>
          </div>
          <p className="text-[#e0e0e0] text-xl md:text-2xl mt-10 mb-16 max-w-4xl mx-auto font-medium drop-shadow-lg bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border-0 premium-gradient-border shadow-[0_10px_50px_rgba(251,191,36,0.15)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.3)]">
            Perfect 0/100 scores in ASTM E84 fire testing with documented 87% energy savings. Used by US Air Force, NASA, Factory Mutual, UL, and American Bureau of Shipping for critical applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
            <div className="bg-gray-800/70 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_10px_50px_rgba(251,191,36,0.2)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.3)] p-10 transform transition-all hover:scale-105 hover:-translate-y-2 h-full min-h-[280px] flex flex-col justify-between overflow-hidden">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="fire">Class A Fire Protection</GradientHeading>
              <p className="text-gray-300 text-lg md:text-xl">Perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development. Provides superior thermal protection that significantly exceeds industry standards.</p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)] p-10 transform transition-all hover:scale-105 hover:-translate-y-2 h-full min-h-[280px] flex flex-col justify-between overflow-hidden">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="blue">Ceramic Microsphere Technology</GradientHeading>
              <p className="text-gray-300 text-lg md:text-xl">Vacuum-filled ceramic microspheres physically block heat transfer through all three heat transmission mechanisms — conduction, convection, and radiation — a feat unmatched by conventional insulation.</p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)] p-10 transform transition-all hover:scale-105 hover:-translate-y-2 h-full min-h-[280px] flex flex-col justify-between overflow-hidden">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="mixed">Extreme Energy Efficiency</GradientHeading>
              <p className="text-gray-300 text-lg md:text-xl">Documented energy savings from 20-87% in real-world applications, with 89% solar reflection and 89% thermal emittance. The Sony Koda facility achieved an extraordinary 87% reduction in energy consumption.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;