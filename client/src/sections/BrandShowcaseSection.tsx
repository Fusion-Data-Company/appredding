import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
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
            <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
              Explore Applications
            </GradientButton>
          </a>
          
          <a href="#contact" className="inline-block">
            <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80">
              Contact Us
            </GradientButton>
          </a>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl py-10 px-10 mx-auto max-w-4xl mb-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] group">
              {/* Premium dual-layer gradient border effect */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/60 via-red-500/30 to-amber-500/60 opacity-80"></div>
              <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
              
              {/* Animated corner accents - premium effect */}
              <div className="absolute top-0 left-0 w-20 h-20 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-red-600/30 rounded-tl-xl blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/40 to-red-600/30 rounded-tr-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-amber-500/40 rounded-bl-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tl from-red-600/30 to-amber-500/40 rounded-br-xl blur-[2px]"></div>
              </div>
              
              {/* Subtle top glow effect */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-orange-500/0 via-amber-500/20 to-orange-500/0 blur-[100px] rounded-full"></div>
              
              {/* Premium heading with enhanced styling */}
              <div className="relative mb-6 pb-4">
                <GradientHeading level={2} className="text-3xl md:text-4xl lg:text-5xl" variant="mixed">
                  Elite Protection Technology
                </GradientHeading>
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full opacity-70"></div>
              </div>
              
              <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto relative z-10">
                Praetorian SmartCoat delivers premium ceramic-based protection systems developed from advanced aerospace technology
              </p>
              
              {/* Bottom reflection effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image side with premium enhancements */}
            <div className="order-2 md:order-1">
              <div className="relative group transform hover:scale-[1.01] transition-all duration-700">
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10">
                  {/* Premium dual-layer gradient border effect - mixed fire/blue theme */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/70 via-transparent to-blue-500/70 opacity-80"></div>
                  <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                  
                  {/* Corner accent decorations */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-red-600/30 rounded-tr-xl blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-cyan-500/40 rounded-bl-xl blur-[2px]"></div>
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
              <div className="relative group transform hover:scale-[1.01] transition-all duration-700">
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10 space-y-8">
                  {/* Premium dual-layer gradient border effect */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-blue-500/60 via-transparent to-purple-500/60 opacity-80"></div>
                  <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                  
                  {/* Corner accent decorations */}
                  <div className="absolute top-0 left-0 w-20 h-20 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-600/30 rounded-tl-xl blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/30 to-blue-500/40 rounded-br-xl blur-[2px]"></div>
                  </div>
                  
                  {/* Feature item 1 */}
                  <div className="group/item relative transform transition-all duration-500 hover:translate-x-1 hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-blue-900/10 hover:via-transparent hover:to-purple-900/10">
                    <h3 className="text-2xl font-semibold mb-3 pb-2 relative">
                      <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
                        Enterprise-Grade Protection
                      </span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full group-hover/item:w-32 transition-all duration-500"></div>
                    </h3>
                    <p className="text-gray-300">
                      Praetorian SmartCoat's premium protective coating systems offer unmatched performance for industrial, commercial, and residential applications.
                    </p>
                  </div>
                  
                  {/* Feature item 2 */}
                  <div className="group/item relative transform transition-all duration-500 hover:translate-x-1 hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-blue-900/10 hover:via-transparent hover:to-purple-900/10">
                    <h3 className="text-2xl font-semibold mb-3 pb-2 relative">
                      <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
                        Advanced Ceramic Technology
                      </span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full group-hover/item:w-32 transition-all duration-500"></div>
                    </h3>
                    <p className="text-gray-300">
                      Utilizing ceramic microsphere technology developed from aerospace research, our coatings create an impenetrable protective barrier with exceptional durability.
                    </p>
                  </div>
                  
                  {/* Feature item 3 */}
                  <div className="group/item relative transform transition-all duration-500 hover:translate-x-1 hover:z-10 rounded-xl p-4 hover:bg-gradient-to-r hover:from-blue-900/10 hover:via-transparent hover:to-purple-900/10">
                    <h3 className="text-2xl font-semibold mb-3 pb-2 relative">
                      <span className="bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
                        Scientifically Verified Results
                      </span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full group-hover/item:w-32 transition-all duration-500"></div>
                    </h3>
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