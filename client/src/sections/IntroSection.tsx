import React from "react";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const IntroSection = () => {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white space-y-1 leading-tight">
            <div>Element-proof protection for your</div>
            <AnimatedTextCycle 
              words={[
                "home & living spaces",
                "pool & entertainment areas", 
                "boats & watercraft",
                "industrial equipment",
                "critical infrastructure",
                "construction projects",
                "commercial buildings",
                "pipes & metal fixtures",
                "outdoor structures",
                "vulnerable surfaces"
              ]}
              interval={3000}
              className="text-primary-500 block"
            />
            <div>with superior defense technology</div>
          </h1>
          <p className="text-[#d0d0d0] text-lg md:text-xl mt-6 mb-8">
            Industry-leading solutions that protect against fire, water, and environmental damage. Trusted by professionals worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Protection</h3>
              <p className="text-gray-300">Our specialized coatings create an impenetrable barrier against extreme elements, ensuring lasting protection.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-3">Industry Expertise</h3>
              <p className="text-gray-300">With decades of experience, our solutions are tailored to meet the specific needs of multiple industries.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-white mb-3">Superior Materials</h3>
              <p className="text-gray-300">We use only premium-grade materials engineered to deliver exceptional performance in harsh conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;