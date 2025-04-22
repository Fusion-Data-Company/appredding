import { Button } from "@/components/ui/button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-gradient-to-r from-gray-900 to-black h-[600px] flex items-center text-center" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto animate-fadeIn">
          <div className="text-3xl md:text-4xl font-bold mb-4 text-center space-y-0 leading-tight">
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
          <p className="text-[#a0a0a0] text-lg md:text-xl mb-8">
            Industry-leading solutions that protect against fire, water, and environmental damage. Trusted by professionals worldwide.
          </p>
          <div className="space-x-4">
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
