import { GradientHeading } from "@/components/ui/gradient-heading";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { GradientButton } from "@/components/ui/gradient-button";

const RotatingTextSection = () => {
  return (
    <section 
      id="rotating-text-section"
      className="py-12 relative flex items-center justify-center"
      style={{ 
        backgroundImage: "url('/images/optimized/diamond-plate-orange-blue.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 999, // Moved to extreme front to cover everything
        minHeight: "70vh", // Ensure consistent height
        marginTop: "-5px", // Pull up to cover gap
        position: "relative", // Ensure proper z-index application
        paddingTop: "20px", // Add padding to move content down a quarter inch
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto relative z-10 flex justify-center items-center" style={{ height: "100%" }}>
        {/* Element positioned at absolute center of its container */}
        <div className="w-full flex justify-center items-center text-center">
          <div 
            className="dark:bg-gray-800/50 bg-gray-100/90 backdrop-blur-2xl rounded-xl border-4 dark:border-white border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.25)] shadow-[0_0_30px_rgba(0,0,0,0.15)]"
            style={{ 
              width: "calc(48rem + 960px)", /* 3xl (48rem) + 10 inches (960px) wider */
              padding: "calc(3rem + 48px) 3.5rem", /* Increased top/bottom padding for better spacing */
              maxWidth: "95vw", /* Prevent overflow but allow more width */
              transform: "translateY(0)" /* Position at absolute center */
            }}>
            <div className="flex flex-col">
              <GradientHeading level={1} className="text-3xl md:text-4xl mb-8" variant="mixed">
                Element-proof protection for your
              </GradientHeading>
              <div className="text-3xl md:text-4xl py-10">
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
              <div className="mt-10">
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