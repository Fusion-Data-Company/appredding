import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

const IntroSection = () => {
  return (
    <section 
      className="py-32 relative"
      style={{ 
        backgroundImage: `url(${PRAETORIAN_HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        minHeight: "100vh",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-b from-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-xl border-0 py-14 px-10 md:px-16 mx-auto max-w-5xl mb-16 shadow-[0_10px_50px_rgba(255,100,50,0.25)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.4)] relative premium-gradient-border">
            <GradientHeading level={1} className="text-4xl md:text-6xl mb-8" variant="mixed">
              NASA-Derived Ceramic Coating Technology
            </GradientHeading>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto">
              Revolutionary triple-component system with perfect Class A fire protection and superior thermal insulation using vacuum-filled ceramic microsphere technology.
            </p>
          </div>
          <div className="relative mt-10 mb-16 max-w-4xl mx-auto">
            {/* Premium Enterprise-level paragraph styling */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
              {/* Premium gradient border effect - Mixed variant */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow */}
              <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-blue-500/5 blur-[100px] rounded-full"></div>
              
              {/* Content */}
              <p className="relative z-10 text-gray-200 text-xl md:text-2xl font-medium">
                Perfect 0/100 scores in ASTM E84 fire testing with documented 87% energy savings. Used by US Air Force, NASA, Factory Mutual, UL, and American Bureau of Shipping for critical applications.
              </p>
            </div>
            
            {/* Subtle bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-sm"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
            {/* Card 1: Class A Fire Protection - Premium Enterprise Styling */}
            <div className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10 h-full min-h-[280px]">
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col justify-between">
                {/* Premium gradient border effect - Fire variant */}
                <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-red-500/50 opacity-70"></div>
                
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                
                {/* Subtle ambient glow that activates on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                    style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.4) 0%, transparent 70%)" }}>
                </div>
                
                {/* Card content with z-index to appear above effects */}
                <div className="relative z-10">
                  {/* Enhanced heading with subtle effects */}
                  <div className="relative mb-6 pb-2">
                    <GradientHeading level={3} className="text-2xl md:text-3xl relative z-10" variant="fire">
                      Class A Fire Protection
                    </GradientHeading>
                    
                    {/* Animated underline that extends on hover */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
                  </div>
                  
                  {/* Enhanced content text */}
                  <p className="text-gray-300 text-lg md:text-xl relative z-10">
                    Perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development. Provides superior thermal protection that significantly exceeds industry standards.
                  </p>
                </div>
              </div>
              
              {/* Subtle bottom reflection */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
            </div>
            
            {/* Card 2: Ceramic Microsphere Technology - Premium Enterprise Styling */}
            <div className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10 h-full min-h-[280px]">
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col justify-between">
                {/* Premium gradient border effect - Blue variant */}
                <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-blue-500/50 via-transparent to-cyan-400/50 opacity-70"></div>
                
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                
                {/* Subtle ambient glow that activates on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                    style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.4) 0%, transparent 70%)" }}>
                </div>
                
                {/* Card content with z-index to appear above effects */}
                <div className="relative z-10">
                  {/* Enhanced heading with subtle effects */}
                  <div className="relative mb-6 pb-2">
                    <GradientHeading level={3} className="text-2xl md:text-3xl relative z-10" variant="blue">
                      Ceramic Microsphere Technology
                    </GradientHeading>
                    
                    {/* Animated underline that extends on hover */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(59,130,246,0.6)]"></div>
                  </div>
                  
                  {/* Enhanced content text */}
                  <p className="text-gray-300 text-lg md:text-xl relative z-10">
                    Vacuum-filled ceramic microspheres physically block heat transfer through all three heat transmission mechanisms — conduction, convection, and radiation — a feat unmatched by conventional insulation.
                  </p>
                </div>
              </div>
              
              {/* Subtle bottom reflection */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-full blur-sm"></div>
            </div>
            
            {/* Card 3: Extreme Energy Efficiency - Premium Enterprise Styling */}
            <div className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10 h-full min-h-[280px]">
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.5)] h-full z-10 flex flex-col justify-between">
                {/* Premium gradient border effect - Mixed variant */}
                <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
                
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                
                {/* Subtle ambient glow that activates on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                    style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
                </div>
                
                {/* Card content with z-index to appear above effects */}
                <div className="relative z-10">
                  {/* Enhanced heading with subtle effects */}
                  <div className="relative mb-6 pb-2">
                    <GradientHeading level={3} className="text-2xl md:text-3xl relative z-10" variant="mixed">
                      Extreme Energy Efficiency
                    </GradientHeading>
                    
                    {/* Animated underline that extends on hover with dual-colored gradient */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                  </div>
                  
                  {/* Enhanced content text */}
                  <p className="text-gray-300 text-lg md:text-xl relative z-10">
                    Documented energy savings from 20-87% in real-world applications, with 89% solar reflection and 89% thermal emittance. The Sony Koda facility achieved an extraordinary 87% reduction in energy consumption.
                  </p>
                </div>
              </div>
              
              {/* Subtle bottom reflection with dual-color gradient */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;