import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PremiumButton } from "@/components/ui/premium-button";
import praetorianBrandImage from '../assets_dir/images/optimized/praetorian-brand-showcase.webp';
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

const BrandShowcaseSection = () => {
  return (
    <section 
      id="brand-showcase" 
      className="py-16 relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/60" style={{ zIndex: 1 }}></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        {/* Buttons positioned where the old hero image was */}
        <div className="w-full flex justify-center gap-8 pb-10">
          <a href="#applications" className="inline-block">
            <PremiumButton variant="fire" size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
              Explore Applications
            </PremiumButton>
          </a>
          
          <a href="#contact" className="inline-block">
            <PremiumButton variant="fire" size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
              Contact Us
            </PremiumButton>
          </a>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl py-10 px-10 mx-auto max-w-4xl mb-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)] group transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
              {/* Premium gradient border effect - Mixed variant (matching the third card) */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Subtle ambient glow that activates on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                  style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
              </div>
              
              {/* Subtle top glow effect */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-orange-500/0 via-amber-500/20 to-orange-500/0 blur-[100px] rounded-full"></div>
              
              {/* Premium heading with enhanced styling */}
              {/* Premium card header styling matching Specialized Applications */}
              <div className="relative h-20 flex items-center justify-center">
                {/* Background blur text */}
                <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                  Elite Protection Technology
                </div>
                
                {/* Main text with premium gradient */}
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                  drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                  [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                  transform -translate-y-[0.25in] text-3xl md:text-4xl lg:text-5xl font-bold">
                  Elite Protection Technology
                </span>
                
                {/* Top glossy reflection */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                
                {/* Multiple text shadows for depth - reduced blur effects */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                  Elite Protection Technology
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                  Elite Protection Technology
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
              </div>
              
              <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto relative z-10">
                Praetorian SmartCoat delivers premium ceramic-based protection systems developed from advanced aerospace technology
              </p>
              
              {/* Bottom reflection effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image side with premium enhancements */}
            <div className="order-2 md:order-1">
              <div className="relative group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:z-10">
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-2 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10">
                  {/* Premium gradient border effect - Mixed variant (matching the third card) */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                  
                  {/* Subtle ambient glow that activates on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                      style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
                  </div>
                  
                  {/* Image container with enhanced styling */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src={praetorianBrandImage} 
                      alt="Praetorian SmartCoat Products" 
                      className="w-full h-auto"
                      style={{
                        display: "block",
                        filter: "contrast(1.05) saturate(1.1)"
                      }}
                    />
                    
                    {/* Premium glassmorphism overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Subtle highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                </div>
                
                {/* Bottom reflection effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            </div>
            
            {/* Text side with premium enhancements */}
            <div className="order-1 md:order-2">
              <div className="relative group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-1 hover:z-10">
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)] z-10 space-y-8">
                  {/* Premium dual-layer gradient border effect - Mixed variant (matching the third card) */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/50 via-transparent to-blue-400/50 opacity-70"></div>
                  <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                  
                  {/* Subtle ambient glow that activates on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out" 
                      style={{ background: "radial-gradient(circle at center, rgba(251,113,36,0.3), rgba(59,130,246,0.3), transparent 70%)" }}>
                  </div>
                  
                  {/* Feature item 1 - Fire theme */}
                  <div className="group/item relative transform transition-all duration-500 hover:translate-x-1 hover:z-10 rounded-xl p-4">
                    {/* Enhanced heading with subtle effects */}
                    <div className="relative mb-3 pb-2">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-300 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        Enterprise-Grade Protection
                      </h3>
                      
                      {/* Animated underline that extends on hover */}
                      <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover/item:w-1/2 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.6)]"></div>
                    </div>
                    <p className="text-gray-300">
                      Praetorian SmartCoat's premium protective coating systems offer unmatched performance for industrial, commercial, and residential applications.
                    </p>
                  </div>
                  
                  {/* Feature item 2 - Blue theme */}
                  <div className="group/item relative transform transition-all duration-500 hover:translate-x-1 hover:z-10 rounded-xl p-4">
                    {/* Enhanced heading with subtle effects */}
                    <div className="relative mb-3 pb-2">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        Advanced Ceramic Technology
                      </h3>
                      
                      {/* Animated underline that extends on hover */}
                      <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/item:w-1/2 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(59,130,246,0.6)]"></div>
                    </div>
                    <p className="text-gray-300">
                      Utilizing ceramic microsphere technology developed from aerospace research, our coatings create an impenetrable protective barrier with exceptional durability.
                    </p>
                  </div>
                  
                  {/* Feature item 3 - Mixed theme */}
                  <div className="group/item relative transform transition-all duration-500 hover:translate-x-1 hover:z-10 rounded-xl p-4">
                    {/* Enhanced heading with subtle effects */}
                    <div className="relative mb-3 pb-2">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-300 via-orange-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        Scientifically Verified Results
                      </h3>
                      
                      {/* Animated underline with dual-colored gradient */}
                      <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover/item:w-1/2 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                    </div>
                    <p className="text-gray-300">
                      Our products have been rigorously tested and certified to meet the highest standards of performance in fire resistance, thermal protection, and longevity.
                    </p>
                  </div>
                </div>
                
                {/* Bottom reflection effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcaseSection;