import React, { useState } from 'react';
import { PraetorianButton } from './ui/praetorian-button';
import { PraetorianCard } from './ui/praetorian-card';
import { PraetorianGradientText } from './ui/praetorian-gradient-text';
import { Flame, Droplets, Layers, Zap, ArrowRight, Check, RefreshCw } from 'lucide-react';

export const PraetorianShowcase = () => {
  const [activeTab, setActiveTab] = useState<'buttons' | 'cards' | 'text'>('buttons');
  
  return (
    <div className="w-full flex flex-col gap-8 p-8 bg-black/60 backdrop-blur-sm min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-3">
          <PraetorianGradientText variant="dual" size="5xl" glow="md">
            Praetorian UI System
          </PraetorianGradientText>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Premium tactical-industrial UI components with fire-water theming
        </p>
      </header>
      
      {/* Tab navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-900/80 p-1 rounded-lg border border-gray-800 flex">
          <button
            onClick={() => setActiveTab('buttons')}
            className={`px-5 py-2 rounded-md transition-all ${
              activeTab === 'buttons'
                ? 'bg-gradient-to-r from-fire-600 to-fire-700 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Buttons
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-5 py-2 rounded-md transition-all ${
              activeTab === 'cards'
                ? 'bg-gradient-to-r from-water-600 to-water-700 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-5 py-2 rounded-md transition-all ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-fire-600 via-white to-water-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Text
          </button>
        </div>
      </div>
      
      {/* Button Showcase */}
      {activeTab === 'buttons' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PraetorianCard variant="premium" className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Fire Theme</h3>
            <div className="flex flex-col gap-4">
              <PraetorianButton variant="fire" leftIcon={<Flame size={16} />}>
                Fire Button
              </PraetorianButton>
              
              <PraetorianButton 
                variant="fire" 
                size="lg" 
                glowEffect="pulse"
                rightIcon={<ArrowRight size={16} />}
              >
                Fire Action
              </PraetorianButton>
              
              <PraetorianButton 
                variant="fire" 
                size="sm" 
                roundness="pill"
              >
                Fire Pill
              </PraetorianButton>
              
              <PraetorianButton 
                variant="fire" 
                isLoading
              >
                Loading...
              </PraetorianButton>
            </div>
          </PraetorianCard>
          
          <PraetorianCard variant="premium" className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Water Theme</h3>
            <div className="flex flex-col gap-4">
              <PraetorianButton variant="water" leftIcon={<Droplets size={16} />}>
                Water Button
              </PraetorianButton>
              
              <PraetorianButton 
                variant="water" 
                size="lg" 
                glowEffect="pulse"
                rightIcon={<ArrowRight size={16} />}
              >
                Water Action
              </PraetorianButton>
              
              <PraetorianButton 
                variant="water" 
                size="sm" 
                roundness="pill"
              >
                Water Pill
              </PraetorianButton>
              
              <PraetorianButton 
                variant="water" 
                isLoading
              >
                Loading...
              </PraetorianButton>
            </div>
          </PraetorianCard>
          
          <PraetorianCard variant="premium" className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Metal Theme</h3>
            <div className="flex flex-col gap-4">
              <PraetorianButton variant="metal" leftIcon={<Layers size={16} />}>
                Metal Button
              </PraetorianButton>
              
              <PraetorianButton 
                variant="ghost" 
                size="lg" 
                rightIcon={<Check size={16} />}
              >
                Ghost Button
              </PraetorianButton>
              
              <PraetorianButton 
                variant="subtle" 
                size="sm"
                leftIcon={<RefreshCw size={14} />}
              >
                Subtle Action
              </PraetorianButton>
              
              <PraetorianButton 
                variant="destructive" 
                fullWidth={true}
              >
                Destructive Action
              </PraetorianButton>
            </div>
          </PraetorianCard>
        </section>
      )}
      
      {/* Card Showcase */}
      {activeTab === 'cards' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PraetorianCard variant="fire" withInnerGlow glowColor="orange" className="p-6 hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Fire Card</h3>
            <p className="text-gray-300 mb-4">Premium fire-themed card with inner glow effect and hover scaling.</p>
            <PraetorianButton variant="fire" size="sm">
              Fire Action
            </PraetorianButton>
          </PraetorianCard>
          
          <PraetorianCard variant="water" withInnerGlow glowColor="cyan" className="p-6 hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Water Card</h3>
            <p className="text-gray-300 mb-4">Premium water-themed card with inner glow effect and hover scaling.</p>
            <PraetorianButton variant="water" size="sm">
              Water Action
            </PraetorianButton>
          </PraetorianCard>
          
          <PraetorianCard variant="metal" withShimmer animation="fadeIn" className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white">Metal Card</h3>
            <p className="text-gray-300 mb-4">Industrial metal-themed card with shimmer effect and fade-in animation.</p>
            <PraetorianButton variant="metal" size="sm">
              Metal Action
            </PraetorianButton>
          </PraetorianCard>
          
          <PraetorianCard variant="glass" hover="lift" animation="float" className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white">Glass Card</h3>
            <p className="text-gray-300 mb-4">Transparent glass-style card with hover lift effect and floating animation.</p>
            <PraetorianButton variant="ghost" size="sm">
              Glass Action
            </PraetorianButton>
          </PraetorianCard>
          
          <PraetorianCard variant="premium" withShimmer className="p-6 overflow-hidden" roundness="lg">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-radial from-fire-500/20 via-transparent to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-radial from-water-500/20 via-transparent to-transparent rounded-full blur-xl"></div>
            <h3 className="text-xl font-bold mb-2 text-white">Premium Card</h3>
            <p className="text-gray-300 mb-4">Luxury premium card with radial glow effects and shimmer animation.</p>
            <div className="flex gap-2">
              <PraetorianButton variant="fire" size="sm">
                Fire
              </PraetorianButton>
              <PraetorianButton variant="water" size="sm">
                Water
              </PraetorianButton>
            </div>
          </PraetorianCard>
          
          <PraetorianCard variant="outline" hover="border" className="p-6 border-dashed">
            <h3 className="text-xl font-bold mb-2 text-white">Outline Card</h3>
            <p className="text-gray-300 mb-4">Minimal outline card with dashed border style and hover effect.</p>
            <PraetorianButton variant="subtle" size="sm">
              Subtle Action
            </PraetorianButton>
          </PraetorianCard>
        </section>
      )}
      
      {/* Text Showcase */}
      {activeTab === 'text' && (
        <section className="space-y-12">
          <PraetorianCard variant="premium" className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Gradient Text Variants</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Fire Gradient</h4>
                <PraetorianGradientText variant="fire" size="4xl">
                  Fire Themed Text
                </PraetorianGradientText>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Water Gradient</h4>
                <PraetorianGradientText variant="water" size="4xl">
                  Water Themed Text
                </PraetorianGradientText>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Dual Gradient</h4>
                <PraetorianGradientText variant="dual" size="4xl" glow="md">
                  Fire-Water Dual Text
                </PraetorianGradientText>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Metallic Gradient</h4>
                <PraetorianGradientText variant="metal" size="4xl">
                  Metallic Themed Text
                </PraetorianGradientText>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Purple Gradient</h4>
                <PraetorianGradientText variant="purple" size="4xl">
                  Purple Themed Text
                </PraetorianGradientText>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Rainbow Gradient</h4>
                <PraetorianGradientText variant="rainbow" size="4xl">
                  Rainbow Themed Text
                </PraetorianGradientText>
              </div>
            </div>
          </PraetorianCard>
          
          <PraetorianCard variant="premium" className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Text Effects & Animations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Glow Effects</h4>
                <div className="space-y-4">
                  <PraetorianGradientText variant="fire" size="2xl" glow="sm">
                    Small Glow Effect
                  </PraetorianGradientText>
                  <PraetorianGradientText variant="fire" size="2xl" glow="md">
                    Medium Glow Effect
                  </PraetorianGradientText>
                  <PraetorianGradientText variant="fire" size="2xl" glow="lg">
                    Large Glow Effect
                  </PraetorianGradientText>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Animations</h4>
                <div className="space-y-4">
                  <PraetorianGradientText variant="water" size="2xl" animation="pulse">
                    Pulse Animation
                  </PraetorianGradientText>
                  <PraetorianGradientText variant="water" size="2xl" animation="shimmer">
                    Shimmer Animation
                  </PraetorianGradientText>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Typography</h4>
                <div className="space-y-4">
                  <PraetorianGradientText variant="dual" size="xl" weight="normal">
                    Normal Weight Text
                  </PraetorianGradientText>
                  <PraetorianGradientText variant="dual" size="xl" weight="medium">
                    Medium Weight Text
                  </PraetorianGradientText>
                  <PraetorianGradientText variant="dual" size="xl" weight="bold">
                    Bold Weight Text
                  </PraetorianGradientText>
                  <PraetorianGradientText variant="dual" size="xl" weight="extrabold">
                    Extra Bold Weight Text
                  </PraetorianGradientText>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm uppercase text-gray-500 mb-2">Special Effects</h4>
                <div className="space-y-4">
                  <PraetorianGradientText variant="dual" size="2xl" capitalize={true} glow="md">
                    Uppercase Text
                  </PraetorianGradientText>
                  <div className="flex space-x-2 items-center">
                    <Zap className="text-fire-500" size={24} />
                    <PraetorianGradientText variant="fire" size="xl">
                      With Icon
                    </PraetorianGradientText>
                  </div>
                </div>
              </div>
            </div>
          </PraetorianCard>
        </section>
      )}
    </div>
  );
};