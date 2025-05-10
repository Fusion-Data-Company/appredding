const HeroSection = () => {
  return (
    <div className="w-full overflow-hidden bg-black" style={{maxHeight: '70vh'}}>
      <img 
        src="/praetorian-hero-main.jpg" 
        alt="Praetorian Guards with Tablet" 
        className="w-full object-cover"
      />
    </div>
  );
};

export default HeroSection;
