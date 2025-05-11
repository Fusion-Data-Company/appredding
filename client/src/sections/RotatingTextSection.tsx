import { GradientHeading } from "@/components/ui/gradient-heading";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { GradientButton } from "@/components/ui/gradient-button";

const RotatingTextSection = () => {
  return (
    <section 
      className="py-20 relative"
      style={{ 
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: "384px" // Move down by 4 inches
      }}
    >
      {/* Semi-transparent overlay for better readability - top moved down half inch (48px) */}
      <div className="absolute inset-0 top-[48px] bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Buttons - positioned at the top of this section */}
        <div className="flex justify-center gap-20 mb-12">
            <a 
              href="#applications" 
              className="inline-block"
              style={{ 
                position: "absolute",
                left: "-96px", /* 1 inch to the left of the left edge */
                top: "-216px", /* 2.25 inches up from its container (1.5 + 0.75) */
                zIndex: 20
              }} 
            >
              <GradientButton size="lg" className="font-semibold tracking-wider">
                Explore Applications
              </GradientButton>
            </a>
            <a 
              href="#contact" 
              className="inline-block ml-20"
            >
              <GradientButton size="lg" className="font-semibold tracking-wider">
                Contact Us
              </GradientButton>
            </a>
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