import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const HeroSection = () => {
  const rotatingWords = [
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
  ];
  
  return (
    <section 
      className="relative bg-black h-[65vh] flex flex-col items-center justify-end pb-20" 
      style={{
        backgroundImage: "url('/assets/fire-water-hands-hd.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="z-10 w-full text-center">
        <GradientHeading level={1} className="text-4xl lg:text-5xl" variant="mixed">
          Element-proof protection for your
        </GradientHeading>
        
        <div className="min-h-10 flex items-center justify-center mb-6 mt-4">
          <AnimatedTextCycle words={rotatingWords} className="text-3xl lg:text-4xl" />
        </div>
        
        <GradientHeading level={2} className="text-2xl lg:text-3xl mb-8" variant="mixed">
          with superior defense technology.
        </GradientHeading>
        
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#applications" className="inline-block">
            <GradientButton>
              Explore Applications
            </GradientButton>
          </a>
          <a href="#contact" className="inline-block">
            <GradientButton variant="variant">
              Contact Us
            </GradientButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
