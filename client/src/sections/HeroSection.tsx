import { GradientButton } from "@/components/ui/gradient-button";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-black h-[65vh] flex flex-col items-center justify-end pb-10" 
      style={{
        backgroundImage: "url('/assets/fire-water-hands-hd.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="z-10 mt-4">
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
