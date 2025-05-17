import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { GradientHeading } from "@/components/ui/gradient-heading";
import { motion } from "framer-motion";
import { CheckCircle, Droplets, CircleDollarSign, AreaChart, BarChart3, BarChart2, ChevronRight } from "lucide-react";

interface CoatingProduct {
  name: string;
  coverage: number; // Coverage in sq ft per gallon
  price: number; // Price per gallon
}

interface CalculationResult {
  surfaceArea: number;
  gallonsNeeded: number;
  totalCost: number;
  productName: string;
  coatCount: number;
}

export default function Pools() {
  // State for calculator
  const [poolSurfaceArea, setPoolSurfaceArea] = useState<number>(500);
  const [selectedProduct, setSelectedProduct] = useState<string>("premium");
  const [coatCount, setCoatCount] = useState<number>(2);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  // Product data
  const products: Record<string, CoatingProduct> = {
    standard: {
      name: "Praetorian Standard",
      coverage: 250,
      price: 75.99
    },
    premium: {
      name: "Praetorian Premium",
      coverage: 200,
      price: 99.99
    },
    ultra: {
      name: "Praetorian Ultra Shield",
      coverage: 175,
      price: 129.99
    }
  };

  // Calculate results based on inputs
  const calculateResults = () => {
    if (poolSurfaceArea <= 0) {
      alert("Please enter a valid surface area");
      return;
    }

    const product = products[selectedProduct];
    const gallonsNeeded = (poolSurfaceArea / product.coverage) * coatCount;
    const totalCost = gallonsNeeded * product.price;

    setCalculationResult({
      surfaceArea: poolSurfaceArea,
      gallonsNeeded,
      totalCost,
      productName: product.name,
      coatCount
    });
  };

  return (
    <MainLayout fullWidth={true}>
      <div className="relative">
        {/* Structured data for SEO - JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Praetorian SmartCoat Pool Ceramic Coating",
            "description": "Military-grade ceramic pool coating that reduces maintenance costs by 42%, extends surface life to 20+ years, and lowers energy costs by 28.7%.",
            "brand": {
              "@type": "Brand",
              "name": "Praetorian SmartCoat"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "75.99",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })
        }} />
        
        {/* Premium gradient background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-black"></div>
          
          {/* Premium ambient glows */}
          <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-blue-600/10 rounded-full filter blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-cyan-600/10 rounded-full filter blur-[150px] animate-pulse-slow-delayed"></div>
          
          {/* Premium grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMzgsMTk4LDI0MSwwLjIpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
        </div>
        
        {/* Hero section with semantic HTML5 - SEO optimized */}
        <section className="py-10 md:py-24 relative z-10" aria-labelledby="pool-coating-hero-title">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto text-center mb-14 md:mb-20 relative">
              {/* Advanced enterprise-grade backdrop with layered effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-950/95 to-black/95 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-orange-600/10 to-blue-600/20 rounded-2xl blur-xl opacity-70"></div>
              
              {/* Premium corner accents - enterprise elite style */}
              <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg"></div>
                <div className="absolute top-1 left-1 w-14 h-14 border-t border-l border-blue-500/40 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-500/60 rounded-tr-lg"></div>
                <div className="absolute top-1 right-1 w-14 h-14 border-t border-r border-blue-500/40 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-500/60 rounded-bl-lg"></div>
                <div className="absolute bottom-1 left-1 w-14 h-14 border-b border-l border-blue-500/40 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 z-10 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/60 rounded-br-lg"></div>
                <div className="absolute bottom-1 right-1 w-14 h-14 border-b border-r border-blue-500/40 rounded-br-lg"></div>
              </div>
              
              <div className="relative p-8 md:p-10 backdrop-blur-sm">
                {/* Ultra-premium enterprise header with layered effects */}
                <div className="relative mb-8">
                  {/* Advanced layered glow effects */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-cyan-600/20 to-blue-500/30 rounded-full blur-xl opacity-80"></div>
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-blue-600/10 rounded-full blur-2xl opacity-70 animate-pulse-slow"></div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    id="pool-coating-hero-title"
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.6)]"
                  >
                    Elite Ceramic Pool Coating System
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl text-cyan-100 mb-6"
                  >
                    Advanced Military-Grade Technology Now Available for Commercial & Residential Pools
                  </motion.p>
                  
                  {/* Premium feature stats with enterprise-elite styling */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-cyan-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">42%</span>
                      <span className="text-cyan-200 text-xs">Lower maintenance cost</span>
                    </div>
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-blue-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">20+ yrs</span>
                      <span className="text-cyan-200 text-xs">Extended surface life</span>
                    </div>
                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-cyan-600/30 rounded-lg p-3 text-center">
                      <span className="text-green-400 font-bold text-xl md:text-2xl block">28.7%</span>
                      <span className="text-cyan-200 text-xs">Energy cost reduction</span>
                    </div>
                  </div>
                  
                  {/* Sophisticated divider accents */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>
                
                {/* Enhanced subtitle with advanced typography */}
                <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-medium max-w-4xl mx-auto">
                  Transform your pool with our premium ceramic coating for a <span className="text-blue-300 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">42%</span> maintenance reduction and <span className="text-blue-300 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">28.7%</span> energy savings – <span className="text-orange-300 italic">previously only available to luxury resorts</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator section */}
        <section id="calculator" className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black p-8 rounded-xl border border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.2)] mb-12">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500/40 rounded-br-lg"></div>
              </div>
              
              <div className="relative">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.8),0_2px_10px_rgba(59,130,246,0.3)]">
                    Premium Pool Coating ROI Calculator
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Calculate your exact savings with our enterprise-grade ceramic coating technology
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Calculator inputs */}
                  <div className="col-span-1 md:col-span-1">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="poolSurfaceArea" className="block text-white font-medium mb-2">Pool Surface Area (sq ft)</label>
                        <input
                          type="number"
                          id="poolSurfaceArea"
                          value={poolSurfaceArea}
                          onChange={(e) => setPoolSurfaceArea(Number(e.target.value))}
                          className="w-full bg-gray-800 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="productSelect" className="block text-white font-medium mb-2">Coating Product</label>
                        <select
                          id="productSelect"
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="w-full bg-gray-800 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        >
                          <option value="standard">Praetorian Standard</option>
                          <option value="premium">Praetorian Premium</option>
                          <option value="ultra">Praetorian Ultra Shield</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="coatCount" className="block text-white font-medium mb-2">Number of Coats</label>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setCoatCount(Math.max(1, coatCount - 1))}
                            className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="coatCount"
                            value={coatCount}
                            onChange={(e) => setCoatCount(Number(e.target.value))}
                            className="w-full bg-gray-800 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-center"
                            min="1"
                            max="3"
                          />
                          <button
                            type="button"
                            onClick={() => setCoatCount(Math.min(3, coatCount + 1))}
                            className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          onClick={calculateResults}
                          className="relative w-full py-3 bg-gray-950 text-white rounded-lg overflow-hidden group"
                        >
                          {/* Ambient glow positioned behind button */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                          
                          {/* Button face with proper z-index layering */}
                          <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black py-3 rounded-lg border border-blue-500/20
                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_1px_10px_rgba(59,130,246,0.35)]">
                            Calculate ROI
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Calculator results */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-blue-500/30 p-6 h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-xl blur-sm opacity-30"></div>
                      
                      {calculationResult ? (
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Custom ROI Analysis</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
                              <p className="text-gray-400 text-sm mb-1">Surface Area</p>
                              <p className="text-2xl font-bold text-white">{calculationResult.surfaceArea} sq ft</p>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
                              <p className="text-gray-400 text-sm mb-1">Product</p>
                              <p className="text-2xl font-bold text-white">{calculationResult.productName}</p>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
                              <p className="text-gray-400 text-sm mb-1">Estimated Gallons Needed</p>
                              <p className="text-2xl font-bold text-white">{calculationResult.gallonsNeeded.toFixed(1)} gallons</p>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/20">
                              <p className="text-gray-400 text-sm mb-1">Number of Coats</p>
                              <p className="text-2xl font-bold text-white">{calculationResult.coatCount}</p>
                            </div>
                          </div>
                          
                          <div className="mb-8">
                            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-5 border border-blue-400/30">
                              <div className="flex justify-between items-baseline mb-2">
                                <p className="text-gray-300">Estimated Material Cost:</p>
                                <p className="text-2xl font-bold text-white">${calculationResult.totalCost.toFixed(2)}</p>
                              </div>
                              <div className="flex justify-between items-baseline mb-2">
                                <p className="text-gray-300">10-Year Maintenance Savings:</p>
                                <p className="text-2xl font-bold text-green-400">${(calculationResult.totalCost * 3.71).toFixed(2)}</p>
                              </div>
                              <div className="flex justify-between items-baseline">
                                <p className="text-gray-300">Total 10-Year ROI:</p>
                                <p className="text-3xl font-bold text-green-400">371%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                          <h3 className="text-2xl font-bold text-white mb-4">Premium ROI Calculator</h3>
                          <p className="text-gray-300 mb-6 max-w-lg">
                            Enter your pool dimensions and coating preferences to receive a detailed ROI analysis showing your potential savings over 10 years.
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <div className="bg-gray-800/50 rounded-lg px-4 py-3 border border-blue-500/20 text-center">
                              <p className="text-xl font-bold text-white">371%</p>
                              <p className="text-blue-300 text-sm">Average ROI</p>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg px-4 py-3 border border-blue-500/20 text-center">
                              <p className="text-xl font-bold text-white">42%</p>
                              <p className="text-blue-300 text-sm">Maintenance Reduction</p>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg px-4 py-3 border border-blue-500/20 text-center">
                              <p className="text-xl font-bold text-white">20+ yrs</p>
                              <p className="text-blue-300 text-sm">Extended Lifespan</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}