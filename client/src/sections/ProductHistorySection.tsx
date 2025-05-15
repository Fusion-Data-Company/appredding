import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientText } from "@/components/ui/gradient-text";
import { PremiumButton } from "@/components/ui/premium-button";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

const ProductHistorySection = () => {
  return (
    <section 
      className="py-32 md:py-40 relative" 
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Enhanced overlay with better gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/75" style={{ zIndex: 1 }}></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 filter blur-[150px] animate-pulse-slow" style={{ zIndex: 1 }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 filter blur-[150px] animate-pulse-slow-delayed" style={{ zIndex: 1 }}></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        {/* Premium Enterprise Styled Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left column - NASA Technology Content */}
          <div className="relative group">
            {/* NASA Badge with premium styling */}
            <div className="absolute -top-12 -left-6 z-50">
              <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-gray-900/95 border border-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                {/* Premium gradient border effect - Mixed variant */}
                <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
                
                {/* NASA logo with glow effect */}
                <div className="mr-2 relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-[8px] opacity-70"></div>
                  <div className="relative z-10 w-8 h-8 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 92" fill="currentColor" className="h-full w-full">
                      <path d="M50.8 28.2c-8.9 0-16.1 7.2-16.1 16.1 0 8.9 7.2 16.1 16.1 16.1 8.9 0 16.1-7.2 16.1-16.1 0-8.9-7.3-16.1-16.1-16.1zm0 26.9c-6 0-10.9-4.9-10.9-10.9 0-6 4.9-10.9 10.9-10.9 6 0 10.9 4.9 10.9 10.9 0 6-4.9 10.9-10.9 10.9z" />
                      <path d="M96.5 48.8s-.1-.1-.1-.2c-.1-.2-.1-.4-.2-.6 0-.1-.1-.2-.1-.3-.1-.2-.1-.3-.2-.5 0-.1-.1-.2-.1-.3-.1-.2-.2-.3-.3-.5-.1-.1-.1-.2-.2-.3-.1-.1-.2-.3-.3-.4-.1-.1-.1-.2-.2-.3-.1-.1-.2-.2-.3-.4-.1-.1-.2-.2-.3-.3-.1-.1-.2-.2-.3-.3-.1-.1-.2-.2-.3-.3-.1-.1-.2-.2-.4-.3-.1-.1-.2-.2-.4-.3-.1-.1-.2-.2-.4-.2-.1-.1-.3-.2-.4-.3-.1-.1-.3-.1-.4-.2-.1-.1-.3-.1-.4-.2-.1-.1-.3-.1-.4-.2-.1 0-.3-.1-.4-.1-.2-.1-.3-.1-.5-.1-.1 0-.3-.1-.4-.1-.2 0-.3-.1-.5-.1-.1 0-.3 0-.4-.1-.2 0-.3 0-.5-.1-.2 0-.4 0-.6 0-.1 0-.2 0-.4-.1-.3 0-.5.1-.8.1-.1 0-.3 0-.4.1-.2 0-.4.1-.6.1-.1 0-.3.1-.4.1-.2.1-.4.1-.5.2-.1.1-.3.1-.4.2-.2.1-.3.1-.5.2-.1.1-.3.1-.4.2-.2.1-.3.2-.5.2-.1.1-.2.1-.4.2-.2.1-.3.2-.5.3-.1.1-.2.1-.3.2-.2.1-.3.2-.5.4-.1.1-.2.1-.3.2-.2.1-.3.3-.5.4-.1.1-.2.1-.2.2-.2.2-.4.4-.5.5 0 0-.1.1-.1.1L54.4 80.8c-.6.6-1.4.9-2.2.9s-1.6-.3-2.2-.9L6.1 48c0 0-.1-.1-.1-.1-.2-.2-.3-.4-.5-.5-.1-.1-.2-.2-.2-.2-.2-.1-.3-.3-.5-.4-.1-.1-.2-.1-.3-.2-.2-.1-.3-.3-.5-.4-.1-.1-.2-.1-.3-.2-.1-.1-.3-.2-.4-.3-.1-.1-.2-.1-.4-.2-.2-.1-.3-.2-.5-.2-.1-.1-.3-.1-.4-.2-.2-.1-.3-.1-.5-.2-.1-.1-.3-.1-.4-.2-.2-.1-.4-.1-.5-.2-.1 0-.3-.1-.4-.1-.2 0-.4-.1-.6-.1-.1 0-.3 0-.4-.1-.3 0-.5 0-.8-.1-.1 0-.2 0-.4 0-.2 0-.4 0-.6 0-.2 0-.3 0-.5.1-.1 0-.3 0-.4.1-.2 0-.3.1-.5.1-.1 0-.3.1-.4.1-.2 0-.3.1-.5.1-.1 0-.3.1-.4.1-.1.1-.3.1-.4.2-.1.1-.3.1-.4.2-.1.1-.3.2-.4.2-.1.1-.3.2-.4.3-.1.1-.2.2-.4.2-.1.1-.2.2-.4.3-.1.1-.2.2-.4.3-.1.1-.2.2-.3.3-.1.1-.2.2-.3.3-.1.1-.2.2-.3.3-.1.1-.2.2-.3.4-.1.1-.1.2-.2.3-.1.1-.2.3-.3.4-.1.1-.1.2-.2.3-.1.2-.2.3-.3.5 0 .1-.1.2-.1.3s-.1.3-.2.5c0 .1-.1.2-.1.3-.1.2-.1.4-.2.6 0 .1-.1.1-.1.2-.1.4-.1.8-.1 1.2 0 5 4.1 9.1 9.1 9.1 2.5 0 4.7-1 6.4-2.6l39.8-33.1c2.7-2.3 6.8-2.3 9.5 0l39.8 33.1c1.7 1.6 3.9 2.6 6.4 2.6 5 0 9.1-4.1 9.1-9.1-.1-.5-.1-.9-.2-1.3z" />
                    </svg>
                  </div>
                </div>
                
                {/* Badge text with shimmer effect */}
                <span className="text-blue-300 text-sm font-medium relative">
                  <span className="relative z-10">Space Technology</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 2s infinite'
                     }}>
                  </span>
                </span>
              </div>
            </div>
            
            {/* Premium card header styling matching Specialized Applications */}
            <div className="relative h-28 flex items-center justify-center mb-10">
              {/* Background blur text */}
              <div className="absolute inset-0 flex justify-center items-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                Space Technology Heritage
              </div>
              
              {/* Main text with premium gradient */}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                transform -translate-y-[0.25in] text-5xl md:text-6xl lg:text-7xl font-bold">
                Space Technology Heritage
              </span>
              
              {/* Top glossy reflection */}
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
              
              {/* Multiple text shadows for depth - reduced blur effects */}
              <div className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                Space Technology Heritage
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                Space Technology Heritage
              </div>
              
              {/* Decorative accent line */}
              <div className="absolute left-[8%] bottom-[-0.5in] transform group w-14 h-2.5 rounded-full overflow-hidden z-50 transition-all duration-700 hover:w-72">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 blur-md opacity-70"></div>
                
                {/* Pulsing dots */}
                <div className="absolute h-full w-4 bg-white/80 right-4 rounded-full blur-[1px] animate-pulse-slow"></div>
                <div className="absolute h-full w-3 bg-white/80 right-24 rounded-full blur-[1px] animate-pulse-slow-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              </div>
              
              {/* Subtle decoration elements */}
              <div className="absolute -top-6 -left-10 w-20 h-20 rounded-full bg-orange-500/5 filter blur-[20px]"></div>
              <div className="absolute -bottom-6 -right-10 w-20 h-20 rounded-full bg-blue-500/5 filter blur-[20px]"></div>
            </div>
            
            {/* Enhanced description with premium styling */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 opacity-20">
                <div className="absolute inset-0 border-t border-l border-orange-500/30 rounded-tl-lg"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 opacity-20">
                <div className="absolute inset-0 border-b border-r border-orange-500/30 rounded-br-lg"></div>
              </div>
              
              <p className="text-gray-100 text-xl leading-relaxed relative z-10 mb-10">
                Praetorian SmartCoat's foundation is built upon NASA space shuttle thermal protection technology, utilizing 80-160 micron vacuum-filled ceramic microspheres in a specialized elastomeric matrix with 156% flexibility. Each microsphere contains a vacuum void that creates a physical heat traversal impossibility (0.00543 W/cm²/K conductivity) in our triple-component system, addressing radiation, conduction, and convection simultaneously while providing Class A fire protection.
              </p>
            </div>
            
            {/* Enhanced feature list with premium styling */}
            <ul className="space-y-6 mb-12">
              {[
                "Developed from NASA space shuttle ceramic technology utilizing millions of vacuum-filled ceramic microspheres with thermal conductivity of just 0.00543 W/cm²/K",
                "Original applications from 1989 still performing perfectly with only 1% reflectivity degradation when inspected in 2019, outperforming competing products that lose 10-20% reflectivity in just 3 years",
                "US Air Force tests in Arizona demonstrated metal buildings maintaining 85°F interior temperature while ambient temperatures reached 111-113°F, with coatings demonstrating solar reflectivity of 89% and thermal emissivity of 89%, effectively blocking 95% of solar radiation",
                "Multi-certified with Class A fire ratings (0/100 flame spread, 0/100 smoke development), Cool Roof Rating Council verification (89% reflection, 89% emittance), and American Bureau of Shipping (ABS) approval"
              ].map((item, index) => (
                <li key={index} className="group/item relative transform transition-all duration-500 hover:-translate-y-1">
                  {/* Premium check icon with enhanced styling */}
                  <div className="absolute left-0 top-0 flex items-center justify-center">
                    <div className="relative w-9 h-9">
                      {/* Icon background with theme-specific gradient */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                        index % 2 === 0 
                          ? "from-orange-600/20 to-red-600/20 group-hover/item:from-orange-600/30 group-hover/item:to-red-600/30" 
                          : "from-blue-600/20 to-cyan-600/20 group-hover/item:from-blue-600/30 group-hover/item:to-cyan-600/30"
                      } transition-colors duration-500`}></div>
                      
                      {/* Icon with enhanced styling */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className={`fas fa-check text-lg ${
                          index % 2 === 0 
                            ? "text-orange-400 group-hover/item:text-orange-300" 
                            : "text-blue-400 group-hover/item:text-blue-300"
                        } transition-colors duration-500`}></i>
                      </div>
                      
                      {/* Animated concentric ring */}
                      <div className={`absolute inset-0 rounded-full border ${
                        index % 2 === 0 
                          ? "border-orange-500/30" 
                          : "border-blue-500/30"
                      } scale-0 group-hover/item:scale-[1.5] opacity-0 group-hover/item:opacity-100 transition-all duration-700`}></div>
                    </div>
                  </div>
                  
                  {/* Feature text with enhanced styling */}
                  <div className="pl-14">
                    <p className="text-gray-200 text-lg leading-relaxed group-hover/item:text-white transition-colors duration-500">
                      {item}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Enhanced premium button */}
            <div className="relative">
              {/* Enhanced premium button using PremiumButton component */}
              <PremiumButton 
                variant="fire" 
                size="xl" 
                onClick={() => window.location.href="#contact"}
                className="px-10 py-5 text-xl font-medium"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Learn About Our Story
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </PremiumButton>
              
              {/* Subtle reflection */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
            </div>
          </div>
          
          {/* Right column - Premium Timeline Card */}
          <div className="group relative transform hover:scale-[1.01] transition-all duration-700">
            {/* Premium Card Container with enhanced styling - adjusted to fire theme */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10">
              {/* Multiple layered background effects - Mixed theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Premium dual-layer gradient border effect - changed to match mixed orange/blue theme */}
              <div className="absolute inset-0 p-0.5 rounded-xl border border-orange-500/30 overflow-hidden"></div>
              <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
              
              {/* Subtle dots and squares pattern background in mixed colors */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effects - positioned away from text */}
              <div className="absolute -top-40 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[120px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-40 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
              
              {/* Additional corner accent lines - with mixed theme */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Timeline Innovation badge with mixed orange/blue styling */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50">
                <div className="group/badge px-3 py-1.5 rounded-full border-2 border-gradient-to-r from-orange-400 to-blue-500 bg-gradient-to-r from-gray-900/90 to-gray-950/90 text-white inline-flex items-center shadow-[0_0_15px_rgba(251,113,36,0.5),_0_0_15px_rgba(59,130,246,0.5)] backdrop-blur-sm relative z-50 hover:scale-105 transition-transform duration-300">
                  {/* Badge background glow effects */}
                  <div className="absolute inset-0 rounded-full border border-orange-500/50"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600/20 via-transparent to-blue-600/20 opacity-50 group-hover/badge:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Icon with mixed theme glow */}
                  <div className="relative mr-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-blue-500/40 blur-sm rounded-full animate-pulse-slow"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  {/* Text with shimmer effect */}
                  <span className="text-sm font-bold relative overflow-hidden group-hover/badge:scale-105 transition-transform duration-300">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Innovation Timeline</span>
                    
                    {/* Shimmer animation on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/badge:opacity-100 pointer-events-none transition-opacity duration-700 z-10"
                         style={{
                           background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 2s infinite'
                         }}>
                    </div>
                  </span>
                </div>
              </div>
              
              {/* Enhanced header section - adjusted to mixed orange/blue theme */}
              <div className="p-8 border-b border-gray-600/40 relative">
                {/* Premium heading with enhanced styling - adjusted to mixed theme */}
                <div className="flex items-center">
                  <div className="relative mr-4 group/icon">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Multiple layered effects for icon background */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 opacity-70 animate-pulse-slow"></div>
                      <div className="absolute inset-1 rounded-full bg-gradient-to-r from-orange-500/50 via-blue-500/50 to-orange-500/50 animate-pulse-slow-delayed"></div>
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black"></div>
                      
                      {/* Animated glow effect */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover/icon:opacity-30 transition-opacity duration-700"
                           style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)" }}>
                      </div>
                      
                      {/* Icon with mixed gradient */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="url(#mixed-gradient)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      
                      {/* Gradient definition for icon */}
                      <svg width="0" height="0">
                        <defs>
                          <linearGradient id="mixed-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Corner accents for icon */}
                      <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
                        <div className="absolute top-1 left-1 w-2 h-2 border-t-[1px] border-l-[1px] border-orange-500/70 rounded-tl"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none">
                        <div className="absolute top-1 right-1 w-2 h-2 border-t-[1px] border-r-[1px] border-blue-500/70 rounded-tr"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none">
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-[1px] border-l-[1px] border-orange-500/70 rounded-bl"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-[1px] border-r-[1px] border-blue-500/70 rounded-br"></div>
                      </div>
                    </div>
                    
                    {/* Animated ripple effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 scale-100 animate-ping-slow opacity-0 group-hover/icon:opacity-100"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 scale-100 animate-ping-slow-delayed opacity-0 group-hover/icon:opacity-100"></div>
                  </div>
                  
                  <div>
                    {/* Main heading with mixed orange/blue gradient */}
                    <h3 className="shimmer-mixed-text text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] relative z-20">
                      Product Innovation Timeline
                    </h3>
                    
                    {/* Multiple text shadows for depth */}
                    <div className="absolute top-8 left-20 text-3xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                      Product Innovation Timeline
                    </div>
                    
                    <p className="text-gray-200 text-lg mt-2 font-medium relative z-20">
                      Explore our history of protective coating innovations
                      
                      {/* Text shimmer animation on hover */}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 z-10"
                           style={{
                             background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 2s infinite'
                           }}>
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Animated underline with mixed-themed gradient */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
              </div>
              
              {/* Product Innovation Timeline - Styled to match mixed orange/blue theme */}
              <div className="p-8">
                {/* Enhanced Premium Heading with animated underline - mixed orange/blue theme */}
                <div className="relative mb-8 pb-3 z-20">
                  {/* Animated glow behind heading with mixed colors */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow-delayed"></div>
                  
                  {/* Background blur text */}
                  <div className="absolute inset-0 flex justify-start items-center text-4xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 opacity-50">
                    Innovation Timeline
                  </div>
                  
                  {/* Main text with premium gradient - matching mixed style */}
                  <div className="shimmer-mixed-text font-bold tracking-tight relative z-20">
                    <GradientHeading level={3} className="text-3xl font-bold relative z-20 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" variant="mixed">
                      Product Innovation Timeline
                    </GradientHeading>
                  </div>
                  
                  {/* Multiple text shadows for depth - reduced blur effects */}
                  <div className="absolute inset-0 flex justify-start items-center text-4xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                    Innovation Timeline
                  </div>
                  
                  {/* Animated underline with mixed-themed gradient */}
                  <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                </div>
                
                {/* Enhanced Premium Table Container with mixed orange/blue styling */}
                <div className="relative group/table bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.3)] z-10 transform transition-all duration-500 hover:scale-[1.01]">
                  {/* Multiple layered background effects for table - Mixed theme */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/30 via-blue-600/30 to-orange-600/30 rounded-xl blur-md opacity-70 group-hover/table:opacity-100 transition-all duration-500"></div>
                  
                  {/* Premium subtle border effect - mixed theme */}
                  <div className="absolute inset-0 p-0.5 rounded-xl border border-orange-500/30 overflow-hidden"></div>
                  
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
                  
                  {/* Subtle dots and squares pattern background in mixed colors */}
                  <div className="absolute inset-0 opacity-15 z-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjMpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                  </div>
                  
                  {/* Corner accent lines - with mixed theme - smaller for table */}
                  <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-[1px] border-l-[1px] border-orange-500/70 rounded-tl-lg"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-[1px] border-r-[1px] border-blue-500/70 rounded-tr-lg"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[1px] border-l-[1px] border-orange-500/70 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1px] border-r-[1px] border-blue-500/70 rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500/50 rounded-full blur-[1px]"></div>
                  </div>
                  
                  {/* Enhanced Table */}
                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-lg">
                      <thead>
                        <tr className="border-b border-orange-500/20">
                          {/* Year column header with mixed gradient styling */}
                          <th className="text-left py-6 px-6 text-xl relative z-20">
                            {/* Premium mixed orange/blue gradient */}
                            <span className="relative z-20 font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                              Year
                            </span>
                            
                            {/* Animated glow under header text */}
                            <div className="absolute bottom-[6px] left-6 right-6 h-1 w-12 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-60 group-hover/table:w-1/4 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                          </th>
                          
                          {/* Innovation column header with mixed gradient styling */}
                          <th className="text-left py-6 px-6 text-xl relative z-20">
                            <span className="relative z-20 font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                              Innovation
                            </span>
                            
                            {/* Animated glow under header text */}
                            <div className="absolute bottom-[6px] left-6 right-6 h-1 w-20 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 rounded-full opacity-60 group-hover/table:w-1/3 transition-all duration-1000 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                          </th>
                          
                          {/* Impact column header with subtle styling */}
                          <th className="text-left py-6 px-6 text-xl relative z-20">
                            <span className="relative z-20 font-bold text-gray-200">
                              Impact
                            </span>
                            
                            {/* Animated glow under header text */}
                            <div className="absolute bottom-[6px] left-6 right-6 h-1 w-12 bg-gradient-to-r from-gray-400/40 to-gray-500/40 rounded-full opacity-40 group-hover/table:w-16 transition-all duration-1000"></div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            year: "1989",
                            title: "NASA Technology Adaptation",
                            description: "First successful adaptation of NASA's 80-160 micron vacuum-filled ceramic microspheres (0.00543 W/cm²/K conductivity) for commercial fire protection applications"
                          },
                          {
                            year: "1995",
                            title: "Class A Fire Rating",
                            description: "Achieved perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development with certified triple-component system"
                          },
                          {
                            year: "2000s",
                            title: "Energy Efficiency Breakthrough",
                            description: "Independent facility documented 87% energy consumption reduction after Praetorian SmartCoat application, validating extreme efficiency claims"
                          },
                          {
                            year: "2019",
                            title: "Long-Term Performance Validation",
                            description: "30-year inspection of original 1989 installations showed no deterioration and continued performance, confirming exceptional durability claims"
                          }
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-gray-600/30 group/row hover:bg-gradient-to-r hover:from-orange-950/10 hover:via-gray-900/10 hover:to-blue-950/10 transition-all duration-500">
                            {/* Year column with mixed gradient styling */}
                            <td className="py-5 px-6 w-[120px] font-semibold text-xl relative z-10">
                              <div className="relative group/cell transform transition-all duration-300 hover:scale-105">
                                {/* Main text with mixed gradient */}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-blue-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10">
                                  {item.year}
                                </span>
                                
                                {/* Hover glow effect */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/5 to-blue-500/5 rounded-lg blur-md opacity-0 group-hover/cell:opacity-100 transition-opacity duration-300 -z-10"></div>
                              </div>
                            </td>
                            
                            {/* Innovation column with hover effects */}
                            <td className="py-5 px-6 font-medium text-gray-100 group-hover/row:text-gray-200 transition-colors duration-300 relative">
                              <div className="relative transform transition-all duration-300 group-hover/row:translate-x-1">
                                {/* Blue vertical accent on hover */}
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 rounded-full opacity-0 group-hover/row:opacity-100 group-hover/row:h-4/5 transition-all duration-500"></div>
                                
                                {item.title}
                              </div>
                            </td>
                            
                            {/* Impact column with enhanced styling */}
                            <td className="py-5 px-6 text-gray-300 group-hover/row:text-gray-200 transition-colors duration-300 relative">
                              <div className="relative overflow-hidden">
                                {/* Text content */}
                                {item.description}
                                
                                {/* Orange vertical accent on hover */}
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full opacity-0 group-hover/row:opacity-100 group-hover/row:h-4/5 transition-all duration-500"></div>
                                
                                {/* Shimmer animation on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover/row:opacity-100 pointer-events-none transition-opacity duration-700 z-10 -translate-x-full group-hover/row:translate-x-full transition-transform duration-1500 ease-in-out"
                                   style={{
                                     background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                                     backgroundSize: '200% 100%'
                                   }}>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Enhanced bottom reflection with mixed orange/blue theme */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Enhanced bottom effects with mixed orange/blue theme */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-orange-500/20 via-blue-500/30 to-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            {/* Floating particles - only appear on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
              {/* Orange particle */}
              <div className="absolute w-2 h-2 rounded-full bg-orange-500/30 blur-sm top-1/4 left-[10%] animate-float-slow"></div>
              {/* Blue particle */}
              <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/30 blur-sm bottom-1/4 right-[15%] animate-float-slow-delayed"></div>
              {/* Mixed particle */}
              <div className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-sm top-1/2 right-[30%] animate-float-slower"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced keyframes for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.4; transform: scale(1.1); }
          animation-delay: 1s;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes ping-slow-delayed {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.2); opacity: 0; }
          animation-delay: 0.5s;
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
          50% { transform: translateY(-15px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-5px) translateX(-10px); opacity: 0.6; }
          100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        }
        
        @keyframes float-slow-delayed {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-8px) translateX(7px); opacity: 0.6; }
          50% { transform: translateY(-12px) translateX(-3px); opacity: 0.3; }
          75% { transform: translateY(-4px) translateX(-8px); opacity: 0.6; }
          100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          animation-delay: 0.7s;
        }
        
        @keyframes float-slower {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          33% { transform: translateY(-15px) translateX(10px); opacity: 0.5; }
          66% { transform: translateY(-7px) translateX(-12px); opacity: 0.3; }
          100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          animation-duration: 8s;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-slow-delayed {
          animation: ping-slow-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-slow-delayed {
          animation: float-slow-delayed 5s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 6s ease-in-out infinite;
        }
        
        .shimmer-mixed-text {
          background-size: 200% auto;
          animation: shimmer 5s linear infinite;
        }
      `}} />
    </section>
  );
};

export default ProductHistorySection;