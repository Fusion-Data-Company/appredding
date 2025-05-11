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
        marginTop: "550px", // Adjusted to let hero image overlap just enough
        zIndex: 1 // Ensure it's behind the hero but visible
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
                top: "-168px", /* 1.75 inches up from its container (2.25 - 0.5) */
                zIndex: 9999 /* Absolute front */
              }} 
            >
              <GradientButton size="lg" className="font-semibold tracking-wider">
                Explore Applications
              </GradientButton>
            </a>
            <a 
              href="#contact" 
              className="inline-block"
              style={{ 
                position: "absolute",
                right: "-96px", /* Mirror position of Explore Applications button */
                top: "-168px", /* Same height as other button */
                zIndex: 9999 /* Absolute front */
              }} 
            >
              <GradientButton size="lg" className="font-semibold tracking-wider">
                Contact Us
              </GradientButton>
            </a>
        </div>
        
        <div className="w-full mx-auto text-center pt-8" style={{ maxWidth: "90vw" }}>
          <div 
            className="dark:bg-gray-800/50 bg-gray-100/90 backdrop-blur-2xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.25)] shadow-[0_0_30px_rgba(0,0,0,0.15)] mx-auto"
            style={{ 
              width: "calc(48rem + 384px)", /* 3xl (48rem) + 4 inches (384px) wider */
              padding: "calc(2rem + 192px) 2.5rem", /* 2rem top padding + 2 inches (192px) taller */
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