import React from 'react';
import { StarsBackground } from '@/components/ui/stars-background';
import { Sun, Zap, Battery, ShieldCheck } from 'lucide-react';

const HeroSectionFixed = () => {
  return (
    <section className="w-full mt-0 mb-0 pt-0 pb-0">
      <StarsBackground intensity="strong">
        <div className="w-full flex justify-center items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
              Advance Power Redding
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8">
              Premium Solar Energy Solutions
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Powering Northern California with cutting-edge solar technology and exceptional service
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Sun className="h-8 w-8 text-amber-500" />
                </div>
                <span className="text-white font-medium">Solar Panels</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <Battery className="h-8 w-8 text-blue-500" />
                </div>
                <span className="text-white font-medium">Energy Storage</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-8 w-8 text-orange-500" />
                </div>
                <span className="text-white font-medium">Inverters</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <ShieldCheck className="h-8 w-8 text-purple-500" />
                </div>
                <span className="text-white font-medium">Installation</span>
              </div>
            </div>
          </div>
        </div>
      </StarsBackground>
    </section>
  );
};

export default HeroSectionFixed;