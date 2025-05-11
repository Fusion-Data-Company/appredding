import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";

const IntroSection = () => {
  return (
    <section 
      className="py-24 md:py-28 lg:py-32 relative"
      style={{ 
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "auto" // Let content define height for better proportions
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-[1440px]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.35)] py-14 px-10 md:px-16 mx-auto max-w-5xl mb-16">
            <GradientHeading level={1} className="text-4xl md:text-6xl mb-8" variant="mixed">
              Advanced Protection Technology
            </GradientHeading>
            <p className="dark:text-gray-300 text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto">
              Our cutting-edge solutions provide unmatched durability and performance in the most extreme conditions.
            </p>
          </div>
          <p className="dark:text-[#e0e0e0] text-gray-700 text-xl md:text-2xl mt-10 mb-16 max-w-4xl mx-auto font-medium drop-shadow-lg">
            Industry-leading solutions that protect against fire, water, and environmental damage. Trusted by professionals worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 mt-24">
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-10 transform transition-all hover:scale-105 hover:translate-y-[-10px] dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.3)] h-full min-h-[280px] flex flex-col justify-between">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="fire">Advanced Protection</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">Our specialized coatings create an impenetrable barrier against extreme elements, ensuring lasting protection.</p>
            </div>
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-10 transform transition-all hover:scale-105 hover:translate-y-[-10px] dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.3)] h-full min-h-[280px] flex flex-col justify-between">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="blue">Industry Expertise</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">With decades of experience, our solutions are tailored to meet the specific needs of multiple industries.</p>
            </div>
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-10 transform transition-all hover:scale-105 hover:translate-y-[-10px] dark:shadow-[0_0_80px_rgba(255,255,255,0.5)] shadow-[0_0_40px_rgba(0,0,0,0.3)] h-full min-h-[280px] flex flex-col justify-between">
              <GradientHeading level={3} className="text-2xl md:text-3xl mb-6" variant="mixed">Superior Materials</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">We use only premium-grade materials engineered to deliver exceptional performance in harsh conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;