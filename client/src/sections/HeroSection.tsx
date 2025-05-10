const HeroSection = () => {
  return (
    <div className="w-full bg-black py-10 md:py-20">
      <div className="container mx-auto px-4 flex justify-center">
        <img 
          src="/images/praetorian-hero.jpg" 
          alt="Praetorian SmartCoat with Guards" 
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default HeroSection;
