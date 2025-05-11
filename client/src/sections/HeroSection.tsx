import React from 'react';
import heroImage from '@/assets_dir/images/praetorian-main.jpg';
import { StarsBackground } from '@/components/ui/stars-background';
import { GradientButton } from "@/components/ui/gradient-button";

const HeroSection = () => {
  return (
    <section className="w-full mt-0 mb-0 pt-0 pb-0 relative">
      <StarsBackground intensity="strong">
        <div className="w-full flex justify-center">
          {/* Simple image display with natural dimensions */}
          <img 
            src={heroImage}
            alt="Praetorian Protection Products"
            className="w-full max-w-[1600px]"
            style={{ 
              height: 'auto',
              marginTop: '0',
              marginBottom: '0'
            }}
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "radial-gradient(circle at center, transparent 40%, black 100%)",
              opacity: 0.65,
              zIndex: 2
            }}
          />
          
          {/* Buttons positioned responsively over the image */}
          <div className="absolute bottom-[15%] sm:bottom-[20%] md:bottom-[22%] w-full z-30">
            <div className="w-full px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
              <a href="#applications">
                <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80 w-full md:w-auto">
                  Explore Applications
                </GradientButton>
              </a>
              
              <a href="#contact">
                <GradientButton size="lg" className="font-semibold tracking-wider shadow-2xl shadow-black/80 w-full md:w-auto">
                  Contact Us
                </GradientButton>
              </a>
            </div>
          </div>
        </div>
      </StarsBackground>
    </section>
  );
};

export default HeroSection;