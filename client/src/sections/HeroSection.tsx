import { Button } from "@/components/ui/button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-black h-[70vh] flex flex-col items-center justify-center" 
      style={{
        backgroundImage: "url('/assets/fire-water-hands-hd.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="z-10 flex flex-col items-center space-y-6 mt-32">
        <div className="space-x-4">
          <a 
            href="#applications" 
            className="bg-[#0070f3] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-block shadow-lg"
          >
            Explore Applications
          </a>
          <a 
            href="#contact" 
            className="bg-transparent border border-[#f5f5f5] text-[#f5f5f5] hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors inline-block shadow-lg"
          >
            Contact Us
          </a>
        </div>
        
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <span>Element-proof protection for your </span>
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
              className="text-primary-500 inline"
            />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
