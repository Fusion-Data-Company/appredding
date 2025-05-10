import React from 'react';
import { PraetorianShowcase } from '@/components/praetorian-showcase';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';

const StyleShowcase = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="py-12 px-4 text-center">
        <PraetorianGradientText 
          variant="dual" 
          size="6xl" 
          glow="md" 
          as="h1"
          className="mb-4"
        >
          Praetorian SmartCoat
        </PraetorianGradientText>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto">
          Premium UI System for our tactical-industrial design language
        </p>
      </div>
      
      <PraetorianShowcase />
    </div>
  );
};

export default StyleShowcase;