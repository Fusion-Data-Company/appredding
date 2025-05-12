import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";

const IntroSection = () => {
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
        <div className="max-w-5xl mx-auto text-center">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.35)] py-14 px-10 md:px-16 mx-auto max-w-5xl mb-16">
            <GradientHeading level={1} className="text-4xl md:text-6xl mb-8" variant="mixed">
              NASA-Derived Ceramic Coating Technology
            </GradientHeading>
            <p className="dark:text-gray-300 text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto">
              Revolutionary triple-component system with perfect Class A fire protection and superior thermal insulation using vacuum-filled ceramic microsphere technology.
            </p>
          </div>
          <p className="dark:text-[#e0e0e0] text-gray-700 text-xl md:text-2xl mt-10 mb-16 max-w-4xl mx-auto font-medium drop-shadow-lg">
            Perfect 0/100 scores in ASTM E84 fire testing with documented 87% energy savings. Used by US Air Force, NASA, Factory Mutual, UL, and American Bureau of Shipping for critical applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-10 transform transition-all hover:scale-105 hover:translate-y-[-10px] dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.3)] h-full min-h-[280px] flex flex-col justify-between">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="fire">Class A Fire Protection</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">Perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development. Withstands temperatures up to 2,732°F with a 2,177°F temperature differential.</p>
            </div>
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-10 transform transition-all hover:scale-105 hover:translate-y-[-10px] dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.3)] h-full min-h-[280px] flex flex-col justify-between">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="blue">Ceramic Microsphere Technology</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">Vacuum-filled ceramic microspheres physically block heat transfer through all three heat transmission mechanisms — conduction, convection, and radiation — a feat unmatched by conventional insulation.</p>
            </div>
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-10 transform transition-all hover:scale-105 hover:translate-y-[-10px] dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.3)] h-full min-h-[280px] flex flex-col justify-between">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="mixed">Extreme Energy Efficiency</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">Documented energy savings from 20-87% in real-world applications, with 89% solar reflection and 89% thermal emittance. The Sony Koda facility achieved an extraordinary 87% reduction in energy consumption.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;