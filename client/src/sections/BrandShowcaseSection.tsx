import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
import praetorianBrandImage from '../assets_dir/images/optimized/praetorian-brand-showcase.webp';
import backgroundImg from "../assets_dir/images/praetorian-hero-final.png";

const BrandShowcaseSection = () => {
  return (
    <section 
      id="brand-showcase" 
      className="py-16 relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          <div className="text-center mb-10">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-4 border-gray-600/40 shadow-[0_0_40px_rgba(255,255,255,0.25)] py-8 px-10 mx-auto max-w-4xl mb-8 inline-block">
              <GradientHeading level={2} className="text-3xl md:text-4xl lg:text-5xl" variant="mixed">
                Elite Protection Technology
              </GradientHeading>
              <p className="mt-4 text-lg text-gray-300">
                Praetorian SmartCoat delivers premium ceramic-based protection systems developed from advanced aerospace technology
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <div className="order-2 md:order-1">
              <div className="relative rounded-xl overflow-hidden border-4 border-gray-600/40 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <img 
                  src={praetorianBrandImage} 
                  alt="Praetorian SmartCoat Products" 
                  className="w-full h-auto"
                  style={{
                    display: "block",
                    filter: "contrast(1.05) saturate(1.1)"
                  }}
                />
              </div>
            </div>
            
            {/* Text side */}
            <div className="order-1 md:order-2">
              <div className="space-y-6 bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-600/40">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
                    Enterprise-Grade Protection
                  </h3>
                  <p className="text-gray-200">
                    Praetorian SmartCoat's premium protective coating systems offer unmatched performance for industrial, commercial, and residential applications.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
                    Advanced Ceramic Technology
                  </h3>
                  <p className="text-gray-200">
                    Utilizing ceramic microsphere technology developed from aerospace research, our coatings create an impenetrable protective barrier with exceptional durability.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent">
                    Scientifically Verified Results
                  </h3>
                  <p className="text-gray-200">
                    Our products have been rigorously tested and certified to meet the highest standards of performance in fire resistance, thermal protection, and longevity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcaseSection;