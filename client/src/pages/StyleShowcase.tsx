import React from 'react';
import { PraetorianShowcase } from '@/components/praetorian-showcase';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';
import { Lamp } from '@/components/ui/lamp';

const StyleShowcase = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <Lamp variant="hero" blobs="complex" freeze={true}>
            <div className="text-center">
              <PraetorianGradientText 
                variant="dual" 
                size="6xl" 
                glow="lg" 
                as="h1"
                className="mb-4"
              >
                Praetorian SmartCoat
              </PraetorianGradientText>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                Premium UI System for our tactical-industrial design language
              </p>
            </div>
          </Lamp>
        </div>
      </div>
      
      <PraetorianShowcase />
    </div>
  );
};

export default StyleShowcase;