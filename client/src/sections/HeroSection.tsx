import { Button } from "@/components/ui/button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-gradient-to-r from-gray-900 to-black h-[700px] flex items-end pb-20 text-center" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('/assets/fire-water-hands-hd.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 25%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto animate-fadeIn pt-10">
          <div className="text-3xl md:text-4xl font-bold mb-4 text-center space-y-0 leading-tight backdrop-blur-sm bg-black/20 p-4 rounded-lg">
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
              className="text-primary-500 block my-1"
            />
            <div>with superior defense technology</div>
          </div>
          <p className="text-[#d0d0d0] text-lg md:text-xl mb-8 backdrop-blur-sm bg-black/20 p-3 rounded-lg">
            Industry-leading solutions that protect against fire, water, and environmental damage. Trusted by professionals worldwide.
          </p>
          <div className="space-x-4 backdrop-blur-sm bg-black/10 p-4 rounded-lg inline-block">
            <a 
              href="#applications" 
              className="bg-[#0070f3] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Explore Applications
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border border-[#f5f5f5] text-[#f5f5f5] hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
