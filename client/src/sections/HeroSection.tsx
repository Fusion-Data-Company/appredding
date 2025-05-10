const HeroSection = () => {
  return (
    <section className="relative w-full bg-black">
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <img 
          src="/images/praetorian-hero.jpg"
          alt="Praetorian SmartCoat - Fire and water protected by armored guards"
          className="max-w-full h-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
