import { Button } from "@/components/ui/button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-gradient-to-r from-gray-900 to-black h-[600px] flex items-center text-center" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto animate-fadeIn">
          <div className="text-4xl md:text-5xl font-bold mb-6 flex flex-col items-center">
            <div className="mb-2">Element-proof protection for your</div>
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
              className="text-primary-500 my-2"
            />
            <div className="mt-2">with advanced dual defense technology</div>
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
