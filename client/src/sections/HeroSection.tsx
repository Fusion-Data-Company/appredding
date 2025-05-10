const HeroSection = () => {
  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      backgroundColor: 'black', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <img 
        src="/praetorian-hero-main.jpg" 
        alt="Praetorian Guards" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          margin: 0, 
          padding: 0,
          border: 'none',
          display: 'block'
        }} 
      />
    </div>
  );
};

export default HeroSection;
