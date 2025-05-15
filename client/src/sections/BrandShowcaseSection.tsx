import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PremiumButton } from "@/components/ui/premium-button";
import PremiumBadge from "@/components/ui/premium-badge";
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
            {/* Multiple layered background effects */}
            <div className="relative group mx-auto max-w-4xl mb-8 inline-block transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Main card container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-12 px-12 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                {/* Subtle dots and squares pattern background in burnt orange */}
                <div className="absolute inset-0 opacity-25 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                </div>
                
                {/* Ambient glow effect - positioned away from text */}
                <div className="absolute -top-60 -right-40 w-80 h-80 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
                
                {/* Corner accent with gradient - top-right corner only */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-10">
                  <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
                </div>
                
                {/* Additional corner accent lines */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Shimmer heading */}
                <div className="relative z-10 mb-8 px-6 py-2 overflow-hidden">
                  {/* Animated glow behind text */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                  
                  {/* Heading with enhanced enterprise styling and shadows */}
                  <div className="shimmer-fire-text font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight relative z-10">
                    {/* Background glow for letter definition */}
                    <div className="absolute inset-0 flex justify-center items-center text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                      Elite Protection Technology
                    </div>
                    
                    {/* Main text with premium gradient - improved z-index to bring yellow text in front */}
                    <span className="relative z-20 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-blue-500
                      drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                      [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]">
                      Elite Protection Technology
                    </span>
                    
                    {/* Top glossy reflection */}
                    <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                  </div>
                  
                  {/* Multiple text shadows for depth - reduced blur effects */}
                  <div className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                    Elite Protection Technology
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                    Elite Protection Technology
                  </div>
                  
                  {/* Positioned cool glowing decorative accent line under the title */}
                  <div className="absolute left-[8%] bottom-[-0.5in] transform group w-14 h-2.5 rounded-full overflow-hidden z-50 transition-all duration-700 hover:w-72">
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 blur-md opacity-70"></div>
                    
                    {/* Pulsing dots */}
                    <div className="absolute h-full w-4 bg-white/80 right-4 rounded-full blur-[1px] animate-pulse-slow"></div>
                    <div className="absolute h-full w-3 bg-white/80 right-24 rounded-full blur-[1px] animate-pulse-slow-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  </div>
                </div>
                
                {/* Enhanced description */}
                <p className="text-gray-200 text-xl max-w-3xl mx-auto relative z-20">
                  {/* Left accent - animated pulse */}
                  <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                  
                  Praetorian SmartCoat delivers premium ceramic-based protection systems developed from advanced aerospace technology
                  
                  {/* Right accent - animated pulse with delay */}
                  <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
                </p>
              </div>
              
              {/* Subtle bottom reflection */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full blur-sm"></div>
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
                {/* Basic card with minimal styling - completely rebuilt */}
                <div className="relative bg-black rounded-xl p-8 z-10 space-y-8 min-h-[calc(896px + 48px)]">
                  
                  {/* Simple orange border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-orange-500/50"></div>
                  
                  {/* Subtle ambient glow */}
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/10 rounded-full filter blur-[100px] opacity-70"></div>
                  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/15 rounded-full filter blur-[100px] opacity-70"></div>
                  
                  {/* Premium badge */}
                  <div className="relative w-full -mt-4">
                    <PremiumBadge>
                      ENTERPRISE GRADE
                    </PremiumBadge>
                  </div>
                  
                  {/* Feature item 1 */}
                  <div className="relative p-4 mt-8">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">
                        Enterprise-Grade Protection
                      </h3>
                      <div className="w-24 h-0.5 bg-orange-500 mx-auto mt-3"></div>
                    </div>
                    <p className="text-gray-300 text-center">
                      Praetorian SmartCoat's premium protective coating systems offer unmatched performance for industrial, commercial, and residential applications.
                    </p>
                  </div>
                  
                  {/* Feature item 2 */}
                  <div className="relative p-4 mt-4">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">
                        Advanced Ceramic Technology
                      </h3>
                      <div className="w-24 h-0.5 bg-orange-500 mx-auto mt-3"></div>
                    </div>
                    <p className="text-gray-300 text-center">
                      Utilizing ceramic microsphere technology developed from aerospace research, our coatings create an impenetrable protective barrier with exceptional durability.
                    </p>
                  </div>
                  
                  {/* Feature item 3 */}
                  <div className="relative p-4 mt-4">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">
                        Scientifically Verified Results
                      </h3>
                      <div className="w-24 h-0.5 bg-orange-500 mx-auto mt-3"></div>
                    </div>
                    <p className="text-gray-300 text-center">
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