import { GradientHeading } from "@/components/ui/gradient-heading";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { GradientButton } from "@/components/ui/gradient-button";

const RotatingTextSection = () => {
  return (
    <section className="dark:bg-gradient-to-b dark:from-black dark:to-gray-900 bg-gradient-to-b from-[#f5f2e8] to-[#f8f5ee] py-20">
      <div className="container mx-auto px-4">
        {/* Buttons - positioned at the top of this section */}
        <div className="flex justify-center mb-12">
          <div className="space-x-50">
            <a 
              href="#applications" 
              className="inline-block"
            >
              <GradientButton>
                Explore Applications
              </GradientButton>
            </a>
            <a 
              href="#contact" 
              className="inline-block"
            >
              <GradientButton variant="variant">
                Contact Us
              </GradientButton>
            </a>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center pt-8">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-2xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_60px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.25)] py-8 px-6 md:px-10 mx-auto max-w-3xl">
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
        </div>
      </div>
    </section>
  );
};

export default RotatingTextSection;