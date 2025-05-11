import { GradientHeading } from "@/components/ui/gradient-heading";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { GradientButton } from "@/components/ui/gradient-button";

const RotatingTextSection = () => {
  return (
    <section 
      className="py-20 relative mt-0"
      style={{ 
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 10, // Higher than hero's content but lower than buttons
        marginTop: "0" // No margin to show full image
      }}
    >
      {/* Semi-transparent overlay for better readability - top moved down half inch (48px) */}
      <div className="absolute inset-0 top-[48px] bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Buttons moved to HeroSection */}
        <div className="flex justify-center gap-20 mb-12">
            {/* Buttons removed from here and moved to HeroSection */}
        </div>
        
        <div className="w-full mx-auto text-center pt-8" style={{ maxWidth: "90vw" }}>
          <div 
            className="dark:bg-gray-800/50 bg-gray-100/90 backdrop-blur-2xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.25)] shadow-[0_0_30px_rgba(0,0,0,0.15)] mx-auto"
            style={{ 
              width: "calc(48rem + 384px)", /* 3xl (48rem) + 4 inches (384px) wider */
              padding: "calc(2rem + 96px) 2.5rem", /* Reduced by 1 inch (96px) on top and bottom */
              margin: "0 auto", /* Keep centered */
              maxWidth: "90vw" /* Prevent overflow on small screens */
            }}>
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