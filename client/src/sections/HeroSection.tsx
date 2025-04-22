import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-black h-screen flex items-center justify-center" 
      style={{
        backgroundImage: "url('/assets/fire-water-hands-hd.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="relative mt-8 z-10">
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
      </div>
    </section>
  );
};

export default HeroSection;
