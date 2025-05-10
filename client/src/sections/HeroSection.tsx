const HeroSection = () => {
  return (
    <div className="w-full bg-black py-10 md:py-20">
      <div className="max-w-5xl mx-auto px-4 flex justify-center">
        <img 
          src="/praetorian-hero-main.jpg" 
          alt="Praetorian SmartCoat with Guards" 
          width={1200}
          height={400}
          className="max-w-full h-auto border-0"
        />
      </div>
    </div>
  );
};

export default HeroSection;
