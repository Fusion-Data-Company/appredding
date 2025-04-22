import { GradientButton } from "@/components/ui/gradient-button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { GradientHeading } from "@/components/ui/gradient-heading";

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
      className="relative bg-black h-[65vh] flex flex-col items-center justify-center" 
      style={{
        backgroundImage: "url('/assets/fire-water-hands-hd.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="z-10 absolute top-12 left-0 right-0 text-center">
        <GradientHeading level={1} className="text-4xl md:text-5xl lg:text-6xl mb-2" variant="mixed">
          Element-proof protection for your
        </GradientHeading>
        <div className="min-h-16 flex items-center justify-center">
          <span className="text-3xl md:text-4xl lg:text-5xl">
            <AnimatedTextCycle words={rotatingWords} className="text-white" />
          </span>
        </div>
        <GradientHeading level={2} className="text-2xl md:text-3xl lg:text-4xl mt-2" variant="mixed">
          with superior defense technology.
        </GradientHeading>
      </div>
      
      <div className="z-10 mt-auto mb-10">
        <div className="space-x-4">
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
    </section>
  );
};

export default HeroSection;
