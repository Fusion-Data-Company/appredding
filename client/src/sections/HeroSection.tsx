import HeroBackground from "@/components/ui/hero-background";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col bg-black">
      {/* Hero background image */}
      <div className="w-full" style={{ height: "calc(100vh - 80px)", minHeight: "600px", maxHeight: "1000px" }}>
        <HeroBackground 
          src="/images/praetorian-hero.png"
          alt="Praetorian SmartCoat - Fire and water protected by armored guards"
          priority={true}
          className="h-full"
        />
      </div>

      {/* Buttons removed as requested */}
    </section>
  );
};

export default HeroSection;
