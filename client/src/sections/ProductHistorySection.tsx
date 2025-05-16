import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientText } from "@/components/ui/gradient-text";
import { PremiumButton } from "@/components/ui/premium-button";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

const ProductHistorySection = () => {
  return (
    <section 
      className="py-32 md:py-48 relative" 
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
        {/* Premium Enterprise Styled Grid with equal height columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
          {/* Left column - NASA Technology Content - matching right column */}
          <div className="group relative transform hover:scale-[1.01] transition-all duration-700 flex">
            {/* Multiple layered background effects - Mixed theme with subtle glow - exactly like right column */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Premium Card Container with enhanced styling - exactly matching right column */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-6 px-8 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 flex flex-col w-full">
              {/* Subtle dots pattern matching right column */}
              <div className="absolute inset-0 opacity-30 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjI1KSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
              </div>
              
              {/* Ambient glow effects matching right column */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
              
              {/* Corner accent lines matching right column */}
              <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1px] border-l-[1px] border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-4 h-4 border-t-[1px] border-r-[1px] border-blue-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1px] border-l-[1px] border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1px] border-r-[1px] border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              
              {/* NASA Badge with premium styling */}
              <div className="absolute -top-3 -left-3 z-[100]">
                <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-950/95 via-primary-950/95 to-blue-950/95 border border-orange-500/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  {/* Premium gradient border effect */}
                  <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
                  
                  {/* NASA logo with glow effect */}
                  <div className="mr-2 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 to-blue-500/40 blur-[8px] opacity-70"></div>
                    <div className="relative z-10 w-8 h-8 text-orange-300 flex items-center justify-center">
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
              
              {/* Premium header styled to match the right column card */}
              <div className="p-8 border-b border-gray-600/40 relative">
                {/* Section heading with premium styling */}
                <div className="flex items-center">
                  <div className="relative mr-4 group/icon">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Icon background with matching styling */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/30 via-gray-600/30 to-gray-600/30 opacity-80"></div>
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black"></div>
                      
                      {/* Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      
                      {/* Corner accents for icon */}
                      <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
                        <div className="absolute top-1 left-1 w-2 h-2 border-t-[1px] border-l-[1px] border-gray-500/40 rounded-tl"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none">
                        <div className="absolute top-1 right-1 w-2 h-2 border-t-[1px] border-r-[1px] border-gray-500/40 rounded-tr"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none">
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-[1px] border-l-[1px] border-gray-500/40 rounded-bl"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-[1px] border-r-[1px] border-gray-500/40 rounded-br"></div>
                      </div>
                    </div>
                    
                    {/* Animated ripple effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-gray-500/30 scale-100 animate-ping-slow opacity-0 group-hover/icon:opacity-100"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 scale-100 animate-ping-slow-delayed opacity-0 group-hover/icon:opacity-100"></div>
                  </div>
                  
                  <div>
                    {/* Main heading with white text to match right column */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] relative z-20">
                      Space Technology Heritage
                    </h3>
                    
                    {/* Subtitle text matching right column */}
                    <p className="text-gray-200 text-lg mt-2 font-medium relative z-20">
                      NASA-derived ceramic insulation technology
                    </p>
                  </div>
                </div>
                
                {/* Animated underline matching right column */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-gray-500/40 to-gray-600/40 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-60"></div>
              </div>
              
              {/* Content area with padding */}
              <div className="p-8 flex-grow flex flex-col">
                {/* Product description with premium styling */}
                <p className="text-gray-200 text-lg leading-relaxed relative z-10 mb-8">
                  <span className="font-medium text-white">Praetorian SmartCoat's</span> foundation is built upon 
                  <span className="text-blue-200 font-medium"> NASA space shuttle thermal protection technology</span>, 
                  utilizing 80-160 micron vacuum-filled ceramic microspheres in a specialized elastomeric matrix with 
                  <span className="text-orange-200 font-medium"> 156% flexibility</span>. 
                  Each microsphere contains a vacuum void that creates a physical heat traversal impossibility 
                  (<span className="text-blue-200 font-medium">0.00543 W/cm²/K conductivity</span>) 
                  in our triple-component system, addressing radiation, conduction, and convection simultaneously 
                  while providing <span className="text-orange-200 font-medium">Class A fire protection</span>.
                </p>
                
                {/* Enhanced feature list with premium styling */}
                <ul className="space-y-6 mb-8 flex-grow">
                  {[
                    "Developed from NASA space shuttle ceramic technology utilizing millions of vacuum-filled ceramic microspheres with thermal conductivity of just 0.00543 W/cm²/K",
                    "Original applications from 1989 still performing perfectly with only 1% reflectivity degradation when inspected in 2019, outperforming competing products that lose 10-20% reflectivity in just 3 years",
                    "US Air Force tests in Arizona demonstrated metal buildings maintaining 85°F interior temperature while ambient temperatures reached 111-113°F, with coatings demonstrating solar reflectivity of 89% and thermal emissivity of 89%, effectively blocking 95% of solar radiation",
                    "Multi-certified with Class A fire ratings (0/100 flame spread, 0/100 smoke development), Cool Roof Rating Council verification (89% reflection, 89% emittance), and American Bureau of Shipping (ABS) approval"
                  ].map((item, index) => (
                    <li key={index} className="group/item relative transform transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]">
                      {/* Premium backdrop for the entire item */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.2)] opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 -z-10"></div>
                      
                      {/* Premium animated glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 via-transparent to-orange-600/5 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 -z-10"></div>
                      
                      {/* Premium check icon with enhanced styling */}
                      <div className="absolute left-0 top-0 flex items-center justify-center">
                        <div className="relative w-10 h-10">
                          {/* Icon glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-orange-600/20 blur-[5px] opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Icon background with advanced gradient and animation */}
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                            index % 2 === 0 
                              ? "from-blue-600/30 to-orange-600/20 group-hover/item:from-blue-600/40 group-hover/item:to-orange-600/30" 
                              : "from-orange-600/30 to-blue-600/20 group-hover/item:from-orange-600/40 group-hover/item:to-blue-600/30"
                          } transition-all duration-500 group-hover/item:shadow-[0_0_15px_rgba(59,130,246,0.3)]`}></div>
                          
                          {/* Icon with improved styling and animation */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`w-5 h-5 ${
                                index % 2 === 0 
                                  ? "text-blue-300 group-hover/item:text-blue-200" 
                                  : "text-orange-300 group-hover/item:text-orange-200"
                              } transition-colors duration-500 transform group-hover/item:scale-110`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          
                          {/* Enhanced animated concentric rings */}
                          <div className={`absolute inset-0 rounded-full border-2 ${
                            index % 2 === 0 
                              ? "border-blue-500/30" 
                              : "border-orange-500/30"
                          } scale-0 group-hover/item:scale-[1.2] opacity-0 group-hover/item:opacity-100 transition-all duration-700`}></div>
                          <div className={`absolute -inset-1 rounded-full border ${
                            index % 2 === 0 
                              ? "border-blue-500/20" 
                              : "border-orange-500/20"
                          } scale-0 group-hover/item:scale-[1.4] opacity-0 group-hover/item:opacity-70 transition-all duration-1000 delay-100`}></div>
                        </div>
                      </div>
                      
                      {/* Feature text with premium enterprise-level styling */}
                      <div className="pl-16 relative">
                        {/* Subtle left border accent */}
                        <div className={`absolute left-10 top-0 bottom-0 w-[2px] ${
                          index % 2 === 0 
                            ? "bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-blue-500/30" 
                            : "bg-gradient-to-b from-orange-500/30 via-orange-500/10 to-orange-500/30"
                        } opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 rounded-full`}></div>
                        
                        {/* Enhanced text with premium styling */}
                        <p className="text-gray-200 text-lg leading-relaxed group-hover/item:text-white transition-colors duration-500 backdrop-blur-sm py-2">
                          {item}
                        </p>
                        
                        {/* Bottom shimmer effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {/* Enhanced premium button */}
                <div className="relative mt-auto">
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
            </div>
          </div>
          
          {/* Right column - Premium Timeline Card */}
          <div className="group relative transform hover:scale-[1.01] transition-all duration-700 flex">
            {/* Multiple layered background effects - Mixed theme with subtle glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Premium Card Container with enhanced styling - original styling */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-6 px-8 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500 flex flex-col w-full">
              {/* Subtle dots and squares pattern background for visible gray texture */}
              <div className="absolute inset-0 opacity-30 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjI1KSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
              </div>
              
              {/* Ambient glow effects - positioned away from text */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
              
              {/* Corner accent lines - with mixed theme */}
              <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-[1px] border-l-[1px] border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-4 h-4 border-t-[1px] border-r-[1px] border-blue-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1px] border-l-[1px] border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-orange-500/50 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1px] border-r-[1px] border-blue-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500/50 rounded-full blur-[1px]"></div>
              </div>
              
              {/* Corner accent lines with gray theme */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-500/40 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-500/40 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-500/40 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500/30 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Enhanced header section - adjusted to mixed orange/blue theme */}
              <div className="p-8 border-b border-gray-600/40 relative">
                {/* Premium heading with enhanced styling - adjusted to mixed theme */}
                <div className="flex items-center">
                  <div className="relative mr-4 group/icon">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Icon background with gray styling */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/30 via-gray-600/30 to-gray-600/30 opacity-80"></div>
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black"></div>
                      
                      {/* Icon with gray color */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      
                      {/* Corner accents for icon - all gray */}
                      <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none">
                        <div className="absolute top-1 left-1 w-2 h-2 border-t-[1px] border-l-[1px] border-gray-500/40 rounded-tl"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none">
                        <div className="absolute top-1 right-1 w-2 h-2 border-t-[1px] border-r-[1px] border-gray-500/40 rounded-tr"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none">
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-[1px] border-l-[1px] border-gray-500/40 rounded-bl"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none">
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-[1px] border-r-[1px] border-gray-500/40 rounded-br"></div>
                      </div>
                    </div>
                    
                    {/* Animated ripple effect - gray only */}
                    <div className="absolute inset-0 rounded-full border-2 border-gray-500/30 scale-100 animate-ping-slow opacity-0 group-hover/icon:opacity-100"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 scale-100 animate-ping-slow-delayed opacity-0 group-hover/icon:opacity-100"></div>
                  </div>
                  
                  <div>
                    {/* Main heading with pure white text to match feature cards */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] relative z-20">
                      Product Innovation Timeline
                    </h3>
                    
                    {/* Multiple text shadows for depth */}
                    <div className="absolute top-8 left-20 text-3xl font-bold tracking-tight opacity-10 blur-[3px] text-gray-700/30 -z-10 transform scale-105">
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
                
                {/* Animated underline with gray theme */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-gray-500/40 to-gray-600/40 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-60"></div>
              </div>
              
              {/* Main content area with flex properties */}
              <div className="p-8 flex-grow flex flex-col">
                {/* Premium Heading with gray theme */}
                <div className="relative mb-8 pb-3 z-20">
                  {/* Background blur text */}
                  <div className="absolute inset-0 flex justify-start items-center text-4xl font-bold tracking-tight text-gray-700/10 blur-[5px] scale-110 opacity-50">
                    Innovation Timeline
                  </div>
                  
                  {/* Main text with white color */}
                  <div className="font-bold tracking-tight relative z-20">
                    <h3 className="text-3xl font-bold relative z-20 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                      Product Innovation Timeline
                    </h3>
                  </div>
                  
                  {/* Reduced text shadow */}
                  <div className="absolute inset-0 flex justify-start items-center text-4xl font-bold tracking-tight opacity-10 blur-[3px] text-gray-700/30 -z-10 transform scale-105">
                    Innovation Timeline
                  </div>
                  
                  {/* Animated underline with gray theme */}
                  <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-gray-500/40 to-gray-600/40 group-hover:w-2/3 transition-all duration-700 rounded-full opacity-60"></div>
                </div>
                
                {/* Completely rebuilt timeline card */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.3)] transform transition-all duration-500 hover:scale-[1.01] flex-grow">
                  {/* Simple border */}
                  <div className="border border-gray-700/50 rounded-xl h-full">
                    <div className="p-6 overflow-y-auto" style={{ maxHeight: "500px" }}>
                      {/* Timeline items */}
                      <div className="space-y-8">
                        {/* 2025 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-blue-400 text-sm font-bold mr-2">2025</span>
                              <div className="h-px bg-blue-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">SON-SHIELD Brand Update</h4>
                            <p className="text-gray-200 text-lg">SON-SHIELD Coating received a comprehensive branding upgrade for direct public presentation, making advanced industrial coating technology accessible to consumers with improved communication, marketing materials, and direct consumer sales channels.</p>
                          </div>
                        </div>

                        {/* 2023 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-orange-500/30 hover:border-orange-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-orange-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-orange-400 text-sm font-bold mr-2">2023</span>
                              <div className="h-px bg-orange-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">Praetorian SmartCoat Pro+</h4>
                            <p className="text-gray-200 text-lg">Next-generation high-solids formula with improved VOC compliance, enhanced corrosion resistance, and expanded temperature range performance (-70°F to +475°F) for extreme environment applications.</p>
                          </div>
                        </div>

                        {/* 2020 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-blue-400 text-sm font-bold mr-2">2020</span>
                              <div className="h-px bg-blue-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">First Industrial Carbon-Neutral Coating</h4>
                            <p className="text-gray-200 text-lg">Industry-first carbon-neutral manufacturing process implemented, with advanced carbon capture technology and renewable energy integration at production facilities.</p>
                          </div>
                        </div>

                        {/* 2015 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-orange-500/30 hover:border-orange-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-orange-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-orange-400 text-sm font-bold mr-2">2015</span>
                              <div className="h-px bg-orange-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">Original Praetorian Formula</h4>
                            <p className="text-gray-200 text-lg">First commercial release of our NASA-derived ceramic insulation technology, featuring 80-160 micron ceramic microspheres with vacuum voids and providing best-in-class thermal and UV protection with 156% flexibility.</p>
                          </div>
                        </div>

                        {/* 2009 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-blue-400 text-sm font-bold mr-2">2009</span>
                              <div className="h-px bg-blue-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">Marine Grade Certification</h4>
                            <p className="text-gray-200 text-lg">Achieved American Bureau of Shipping (ABS) certification for marine applications after extensive salt spray and corrosion testing, opening new markets for maritime and offshore infrastructure protection.</p>
                          </div>
                        </div>

                        {/* 2003 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-orange-500/30 hover:border-orange-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-orange-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-orange-400 text-sm font-bold mr-2">2003</span>
                              <div className="h-px bg-orange-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">Cool Roof Rating Council Approval</h4>
                            <p className="text-gray-200 text-lg">Achieved CRRC certification with industry-leading solar reflectivity (89%) and thermal emittance (89%) values, offering quantified energy savings for commercial structures and meeting emerging green building standards.</p>
                          </div>
                        </div>

                        {/* 1998 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-blue-400 text-sm font-bold mr-2">1998</span>
                              <div className="h-px bg-blue-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">Class A Fire Rating</h4>
                            <p className="text-gray-200 text-lg">Achieved UL Class A fire rating (0/100 flame spread, 0/100 smoke development) certification, providing critical fire safety performance for industrial facilities and commercial buildings without sacrificing thermal properties.</p>
                          </div>
                        </div>

                        {/* 1994 */}
                        <div className="relative pl-8 pb-8 border-l-2 border-orange-500/30 hover:border-orange-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-orange-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-orange-400 text-sm font-bold mr-2">1994</span>
                              <div className="h-px bg-orange-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">U.S. Air Force Testing</h4>
                            <p className="text-gray-200 text-lg">Selected for Arizona field tests where metal buildings coated with our technology maintained 85°F interior temperature despite 111-113°F ambient conditions, demonstrating exceptional real-world thermal performance.</p>
                          </div>
                        </div>

                        {/* 1989 */}
                        <div className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
                          <div className="absolute -left-3 top-0">
                            <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-blue-400 text-sm font-bold mr-2">1989</span>
                              <div className="h-px bg-blue-500/30 flex-grow"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] mb-2">NASA Technology Transfer</h4>
                            <p className="text-gray-200 text-lg">Original commercial adaptation of space shuttle ceramic insulation technology, creating the foundation for all future Praetorian products with the first ceramic microsphere coating system for industrial applications.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced premium button */}
                <div className="relative mt-8 flex justify-center">
                  {/* Premium button using PremiumButton component */}
                  <PremiumButton 
                    variant="fire" 
                    size="xl" 
                    onClick={() => window.location.href="#contact"}
                    className="px-10 py-5 text-xl font-medium"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Request Product Specs
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </PremiumButton>
                  
                  {/* Subtle reflection */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;