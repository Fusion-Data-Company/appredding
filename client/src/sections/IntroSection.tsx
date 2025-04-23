import React from "react";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { GradientHeading } from "@/components/ui/gradient-heading";

const IntroSection = () => {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8">
            <div className="flex flex-col">
              <GradientHeading level={1} className="text-3xl md:text-4xl mb-4" variant="mixed">
                Element-proof protection for your
              </GradientHeading>
              <div className="text-3xl md:text-4xl py-3">
                <AnimatedTextCycle 
                  words={[
                    "home & living spaces",
                    "pool & pool deck", 
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
                  className="metallic-text"
                />
              </div>
              <div className="mt-6">
                <GradientHeading level={2} className="text-3xl md:text-4xl" variant="mixed">
                  with superior defense technology.
                </GradientHeading>
              </div>
            </div>
          </div>
          <p className="text-[#d0d0d0] text-lg md:text-xl mt-6 mb-8">
            Industry-leading solutions that protect against fire, water, and environmental damage. Trusted by professionals worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={3} className="text-xl mb-3" variant="fire">Advanced Protection</GradientHeading>
              <p className="text-gray-300">Our specialized coatings create an impenetrable barrier against extreme elements, ensuring lasting protection.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={3} className="text-xl mb-3" variant="blue">Industry Expertise</GradientHeading>
              <p className="text-gray-300">With decades of experience, our solutions are tailored to meet the specific needs of multiple industries.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={3} className="text-xl mb-3" variant="mixed">Superior Materials</GradientHeading>
              <p className="text-gray-300">We use only premium-grade materials engineered to deliver exceptional performance in harsh conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;