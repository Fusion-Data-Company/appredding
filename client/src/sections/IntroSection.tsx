import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";

const IntroSection = () => {
  return (
    <section 
      className="py-28 relative"
      style={{ 
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "90vh" // Ensure minimum height to avoid compression
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.25)] py-10 px-8 md:px-12 mx-auto max-w-4xl mb-12">
            <GradientHeading level={1} className="text-4xl md:text-5xl mb-6" variant="mixed">
              Advanced Protection Technology
            </GradientHeading>
            <p className="dark:text-gray-300 text-gray-700 text-lg md:text-xl">
              Our cutting-edge solutions provide unmatched durability and performance in the most extreme conditions.
            </p>
          </div>
          <p className="dark:text-[#d0d0d0] text-gray-700 text-lg md:text-xl mt-6 mb-8">
            Industry-leading solutions that protect against fire, water, and environmental damage. Trusted by professionals worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 dark:shadow-[0_0_60px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.25)]">
              <GradientHeading level={3} className="text-xl mb-3" variant="fire">Advanced Protection</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700">Our specialized coatings create an impenetrable barrier against extreme elements, ensuring lasting protection.</p>
            </div>
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 dark:shadow-[0_0_60px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.25)]">
              <GradientHeading level={3} className="text-xl mb-3" variant="blue">Industry Expertise</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700">With decades of experience, our solutions are tailored to meet the specific needs of multiple industries.</p>
            </div>
            <div className="dark:bg-gray-800/70 bg-gray-100/90 backdrop-blur-xl border-4 dark:border-white border-gray-300 rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 dark:shadow-[0_0_60px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.25)]">
              <GradientHeading level={3} className="text-xl mb-3" variant="mixed">Superior Materials</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700">We use only premium-grade materials engineered to deliver exceptional performance in harsh conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;