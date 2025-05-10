const HeroSection = () => {
  return (
    <section className="relative flex flex-col bg-black">
      {/* Hero background image */}
      <div className="w-full relative" style={{ height: "calc(100vh - 80px)", minHeight: "600px", maxHeight: "1000px" }}>
        <img 
          src="/images/praetorian-hero-new.png"
          alt="Praetorian SmartCoat - Fire and water protected by armored guards"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Buttons removed as requested */}
    </section>
  );
};

export default HeroSection;
