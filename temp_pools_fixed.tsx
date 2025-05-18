import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Droplets, 
  CircleDollarSign, 
  AreaChart, 
  BarChart3, 
  BarChart2, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  Clock
} from "lucide-react";

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
    const gallonsPerCoat = poolSurfaceArea / product.coverage;
    const totalGallons = gallonsPerCoat * coatCount;
    const totalCost = totalGallons * product.price;
    
    setCalculationResult({
      surfaceArea: poolSurfaceArea,
      gallonsNeeded: totalGallons,
      totalCost,
      productName: product.name,
      coatCount
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-950">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-[400px] -left-[400px] w-[800px] h-[800px] rounded-full bg-blue-600/30 blur-[100px]"></div>
          <div className="absolute -bottom-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-orange-600/20 blur-[100px]"></div>
        </div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
              Premium Pool Protection
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Advanced ceramic coating technology that helps protect pool surfaces while reducing maintenance needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative flex flex-col h-full">
                <div className="text-blue-400 mb-4">
                  <Droplets className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Reduced Chemical Usage</h3>
                <p className="text-blue-200 mb-4 flex-grow">
                  Our ceramic coating creates a protective barrier that helps reduce chemical absorption into pool surfaces.
                </p>
                <div className="bg-gray-800/40 p-3 rounded-lg">
                  <div className="text-xl font-bold text-white">42%</div>
                  <div className="text-blue-300 text-sm">Average Chemical Reduction</div>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative flex flex-col h-full">
                <div className="text-blue-400 mb-4">
                  <BarChart3 className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Extended Surface Life</h3>
                <p className="text-blue-200 mb-4 flex-grow">
                  Our ceramic coating helps protect pool surfaces, potentially extending the time between maintenance and resurfacing.
                </p>
                <div className="bg-gray-800/40 p-3 rounded-lg">
                  <div className="text-xl font-bold text-white">20+ years</div>
                  <div className="text-blue-300 text-sm">Average Lifespan</div>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative flex flex-col h-full">
                <div className="text-blue-400 mb-4">
                  <CircleDollarSign className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Exceptional ROI</h3>
                <p className="text-blue-200 mb-4 flex-grow">
                  Investment in our protective coating delivers 35% ROI over 10 years through reduced maintenance and extended surface life.
                </p>
                <div className="bg-gray-800/40 p-3 rounded-lg">
                  <div className="text-xl font-bold text-white">35%</div>
                  <div className="text-blue-300 text-sm">10-Year ROI</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SANDLER STAGE 1: PAIN IDENTIFICATION */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
            >
              Have YOU Faced These Pool Challenges?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100"
            >
              Pool owners and managers face ongoing issues that drain resources and affect performance. Do these sound familiar?
            </motion.p>
          </div>
          
          <div className="space-y-6 mb-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 via-red-500/15 to-red-600/10 rounded-xl blur-md opacity-80"></div>
              <div className="relative p-6 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-lg transition-all duration-300 hover:border-red-500/40">
                <h3 className="text-xl font-bold text-white mb-6 relative inline-flex items-center">
                  <span className="mr-2 text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-50 to-white">
                    Are These Issues Hurting Your Pool Investment?
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="relative p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-lg">
                    <div className="relative flex items-start">
                      <div className="mt-1 mr-4 flex-shrink-0">
                        <Droplets className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Are you tired of excessive chemical usage?</h4>
                        <p className="text-gray-300">
                          Pool owners waste thousands annually on chemicals that rapidly dissipate as surfaces absorb them. This not only increases costs but makes maintaining safe water quality a constant struggle. The average pool requires 37% more chemicals than necessary due to surface absorption.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-lg">
                    <div className="relative flex items-start">
                      <div className="mt-1 mr-4 flex-shrink-0">
                        <BarChart3 className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Is your pool surface deteriorating prematurely?</h4>
                        <p className="text-gray-300">
                          Pool resurfacing costs have increased 42% since 2019, with the average pool now requiring costly renovation every 7-10 years. UV damage, chemical erosion, and temperature fluctuations cause microcracks that lead to expensive structural issues and unsightly staining.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-lg">
                    <div className="relative flex items-start">
                      <div className="mt-1 mr-4 flex-shrink-0">
                        <CircleDollarSign className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Do maintenance costs keep rising?</h4>
                        <p className="text-gray-300">
                          Many pool owners find themselves trapped in an endless cycle of rising maintenance costs. The average pool owner spends $5,750 annually on chemicals, equipment repairs, and professional services—a figure that's increased 28% in just five years.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-br from-black/60 to-gray-900/60 border border-red-500/20 rounded-lg">
                    <div className="relative flex items-start">
                      <div className="mt-1 mr-4 flex-shrink-0">
                        <Clock className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Is your pool demanding too much time?</h4>
                        <p className="text-gray-300">
                          Instead of enjoying your pool, you're likely spending 7-10 hours monthly on maintenance. Balancing chemicals, scrubbing surfaces, and addressing recurring issues takes away from what should be a relaxing experience. For commercial pools, this translates to significantly higher labor costs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-black/40 border border-red-500/20 rounded-lg">
                  <p className="text-white italic">
                    These aren't just minor inconveniences—they represent real financial losses and degraded experiences that only worsen over time. Traditional solutions merely manage these problems temporarily rather than solving them at their source.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SANDLER STAGE 2: SOLUTION PRESENTATION */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
            >
              Introducing Praetorian Smart Coat For Pools
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100"
            >
              Our revolutionary ceramic-based coating technology transforms pool surfaces with long-lasting protection
            </motion.p>
          </div>

          {/* Green solution section */}
          <div className="relative mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 via-green-500/25 to-green-600/20 rounded-xl blur-md opacity-90"></div>
            <div className="relative p-6 bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-500/30 rounded-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 relative inline-flex items-center">
                <span className="mr-2 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-50 to-white">
                  The Smart Coat Solution for Pool Owners
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="relative p-5 bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-400/20 rounded-lg">
                  <div className="absolute -inset-px bg-gradient-to-r from-green-500/10 to-green-400/10 rounded-lg blur-sm opacity-30"></div>
                  <div className="relative z-10">
                    <div className="text-green-400 mb-4">
                      <BarChart2 className="h-10 w-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Advanced Ceramic Technology</h4>
                    <p className="text-gray-300">
                      Our patented ceramic formulation creates a molecular shield that bonds permanently with pool surfaces, creating a protective barrier against chemicals, UV damage, and temperature fluctuations.
                    </p>
                  </div>
                </div>
                
                <div className="relative p-5 bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-400/20 rounded-lg">
                  <div className="absolute -inset-px bg-gradient-to-r from-green-500/10 to-green-400/10 rounded-lg blur-sm opacity-30"></div>
                  <div className="relative z-10">
                    <div className="text-green-400 mb-4">
                      <Droplets className="h-10 w-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Reduced Chemical Absorption</h4>
                    <p className="text-gray-300">
                      The non-porous nature of our coating prevents chemical absorption into pool surfaces, meaning you'll use up to 37% fewer chemicals while maintaining water quality more easily and consistently.
                    </p>
                  </div>
                </div>
                
                <div className="relative p-5 bg-gradient-to-br from-black/70 to-gray-900/70 border border-green-400/20 rounded-lg">
                  <div className="absolute -inset-px bg-gradient-to-r from-green-500/10 to-green-400/10 rounded-lg blur-sm opacity-30"></div>
                  <div className="relative z-10">
                    <div className="text-green-400 mb-4">
                      <TrendingUp className="h-10 w-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Extended Surface Lifespan</h4>
                    <p className="text-gray-300">
                      Our coating extends pool surface life by protecting against the main factors that cause deterioration. Most coated pools maintain their integrity for 15-20+ years, potentially doubling the life of your surface.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-black/40 border border-green-400/20 rounded-lg">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-400 mr-3" />
                  <h4 className="text-xl font-bold text-white">Total Return on Investment</h4>
                </div>
                <p className="text-white mb-4">
                  Smart Coat isn't just a maintenance expense—it's an investment in your pool's future. Our comprehensive ROI analysis shows that most pool owners achieve full payback within 3-4 years, with a total 10-year ROI exceeding 350%.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-black/40 p-3 rounded-lg border border-green-500/20">
                    <div className="text-xl font-bold text-green-400">37%</div>
                    <div className="text-gray-300 text-sm">Chemical Reduction</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg border border-green-500/20">
                    <div className="text-xl font-bold text-green-400">15-20+ yrs</div>
                    <div className="text-gray-300 text-sm">Surface Lifespan</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg border border-green-500/20">
                    <div className="text-xl font-bold text-green-400">350%+</div>
                    <div className="text-gray-300 text-sm">10-Year ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section (SANDLER STAGE 3: BENEFITS) */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
            >
              Calculate Your Custom ROI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              See exactly how much you can save with our enterprise-grade coating system
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-blue-500/30 overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-400/30 rounded-xl blur-lg opacity-20"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="col-span-1">
                  <div className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-green-500/30 p-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-sm opacity-40"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-6">Calculate Your Investment</h3>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Pool Surface Area (sq ft)</label>
                        <input
                          type="number"
                          min="50"
                          value={poolSurfaceArea}
                          onChange={(e) => setPoolSurfaceArea(Number(e.target.value))}
                          className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                          style={{
                            textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                            boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                          }}
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Coating Product</label>
                        <select
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                          style={{
                            textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                            boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                          }}
                        >
                          <option value="standard">Praetorian Standard</option>
                          <option value="premium">Praetorian Premium</option>
                          <option value="ultra">Praetorian Ultra Shield</option>
                        </select>
                      </div>
                      
                      <div className="mb-8">
                        <label className="block text-gray-300 mb-2" style={{ textShadow: "0 1px 2px rgba(74, 222, 128, 0.2)" }}>Number of Coats</label>
                        <select
                          value={coatCount}
                          onChange={(e) => setCoatCount(Number(e.target.value))}
                          className="w-full bg-gray-900/60 border-2 border-green-500/50 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/40 shadow-[0_0_10px_rgba(74,222,128,0.15)]"
                          style={{
                            textShadow: "0 1px 2px rgba(74, 222, 128, 0.3)",
                            boxShadow: "0 0 15px rgba(74, 222, 128, 0.15), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                          }}
                        >
                          <option value={1}>Single Coat</option>
                          <option value={2}>Double Coat (Recommended)</option>
                          <option value={3}>Triple Coat (Maximum Protection)</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={calculateResults}
                        className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-lg px-6 py-3 border-2 border-green-500/50 shadow-lg transition-all duration-200 overflow-hidden"
                      >
                        {/* Green ambient glow effect */}
                        <div className="absolute inset-0 -z-10 bg-green-500/20 blur-md rounded-lg"></div>
                        
                        {/* Light shimmer animation effect */}
                        <span className="absolute inset-0 overflow-hidden">
                          <span className="absolute top-0 -left-3/4 w-1/2 h-full bg-gradient-to-r from-transparent via-green-100/30 to-transparent transform -skew-x-30 animate-shimmer"></span>
                        </span>
                        
                        <div className="flex items-center justify-center">
                          <CircleDollarSign className="w-5 h-5 mr-2 text-green-400" />
                          Calculate ROI
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Calculator results */}
                <div className="col-span-1 md:col-span-2">
                  <div className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-green-500/30 p-6 h-full">
                    {/* Strategic green ambient glow for financial/ROI section - ENHANCED */}
                    <div className="absolute -inset-1 bg-green-500/40 rounded-xl blur-xl opacity-90 z-0"></div>
                    <div className="absolute -inset-6 bg-green-500/30 rounded-xl blur-2xl opacity-80 z-0 animate-pulse-slow"></div>
                    <div className="absolute -inset-3 bg-green-400/20 rounded-xl blur-md opacity-70 z-0"></div>
                    
                    {calculationResult ? (
                      <div className="relative z-10">
                        <h3 className="text-center text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">
                          Elite Ceramic Coating ROI Analysis
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-blue-300 text-sm mb-1">Surface Area</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.surfaceArea} sq ft</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-blue-300 text-sm mb-1">Premium Product</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.productName}</p>
                          </motion.div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-blue-300 text-sm mb-1">Gallons Required</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.gallonsNeeded.toFixed(2)}</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-blue-300 text-sm mb-1">Number of Coats</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.coatCount}</p>
                          </motion.div>
                        </div>
                        
                        <div className="mb-8">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-green-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-green-400 text-sm mb-1">Initial Investment</p>
                            <p className="text-3xl font-bold text-white">${calculationResult.totalCost.toFixed(2)}</p>
                          </motion.div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-green-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-green-400 text-sm mb-1">Chemical Savings (10yr)</p>
                            <p className="text-2xl font-bold text-white">${(calculationResult.totalCost * 1.8).toFixed(2)}</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-green-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-green-400 text-sm mb-1">Resurfacing Savings</p>
                            <p className="text-2xl font-bold text-white">${(calculationResult.totalCost * 2.4).toFixed(2)}</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-green-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-green-400 text-sm mb-1">Total 10-Year ROI</p>
                            <p className="text-2xl font-bold text-white">350%</p>
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                        <AreaChart className="h-16 w-16 text-blue-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Calculate Your Custom ROI</h3>
                        <p className="text-blue-100 max-w-md mx-auto mb-6">
                          Enter your pool details to see your personalized return on investment with Praetorian Smart Coat.
                        </p>
                        <div className="w-full max-w-sm bg-black/30 rounded-lg p-6 border border-blue-500/20">
                          <div className="text-white text-lg font-semibold mb-2">Smart Coat Benefits Include:</div>
                          <ul className="text-blue-200 text-left space-y-2">
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                              <span>Reduced chemical usage (37%)</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                              <span>Extended pool surface life (15-20+ years)</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                              <span>Lower maintenance costs</span>
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                              <span>Reduced carbon footprint</span>
                            </li>
                          </ul>
                        </div>
                        {/* Enhanced green ambient glow for ROI calculator section */}
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-500/20 to-transparent rounded-b-xl opacity-50"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SANDLER STAGE 4: CALL TO ACTION */}
      <section className="relative py-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-[400px] w-[800px] h-[800px] rounded-full bg-green-600/20 blur-[150px]"></div>
          <div className="absolute bottom-0 -right-[400px] w-[800px] h-[800px] rounded-full bg-blue-600/30 blur-[150px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
            >
              Ready to Transform Your Pool Experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100"
            >
              Take the first step toward significant cost savings and superior pool protection
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl border border-blue-500/30 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Schedule Your Free Consultation</h3>
              <p className="text-blue-100 mb-6">
                Our pool coating specialists will assess your specific needs and provide a detailed analysis of potential savings and benefits.
              </p>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">Personalized Assessment</h4>
                    <p className="text-gray-300">Custom solution based on your pool type, usage patterns, and environment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">Detailed ROI Projection</h4>
                    <p className="text-gray-300">Comprehensive analysis of 10-year savings and benefits</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">No Obligation Quote</h4>
                    <p className="text-gray-300">Transparent pricing with flexible package options</p>
                  </div>
                </div>
              </div>
              
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <a
                  href="/contact"
                  className="relative flex items-center justify-center w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-lg font-bold text-white rounded-lg px-8 py-4 transition-all duration-300"
                >
                  <span className="mr-2">Schedule Consultation</span>
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl border border-blue-500/30 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Become a Certified Applicator</h3>
              <p className="text-blue-100 mb-6">
                Pool service professionals: Join our network of certified Smart Coat applicators and expand your business offerings.
              </p>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">Comprehensive Training</h4>
                    <p className="text-gray-300">Expert-led certification program with ongoing support</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">Exclusive Territory Rights</h4>
                    <p className="text-gray-300">Become the go-to provider in your service area</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-white font-semibold">Marketing Support</h4>
                    <p className="text-gray-300">Full suite of promotional materials and lead generation</p>
                  </div>
                </div>
              </div>
              
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/50 to-green-400/50 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <a
                  href="/partner-program"
                  className="relative flex items-center justify-center w-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-lg font-bold text-white rounded-lg px-8 py-4 transition-all duration-300"
                >
                  <span className="mr-2">Apply for Certification</span>
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Real results from pool owners and commercial operators
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="mb-6">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                    <path d="M13.05 36L0 27.3V23.4L13.05 0H18.9L10.35 23.4H18V36H13.05ZM39.15 36L26.1 27.3V23.4L39.15 0H45L36.45 23.4H44.1V36H39.15Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "As a resort manager, I was skeptical about the ROI claims. I'm happy to say I was wrong. Our chemical costs are down 41% and water clarity has never been better, even during peak summer demand."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">MP</div>
                  <div>
                    <div className="text-white font-semibold">Marcus Peterson</div>
                    <div className="text-blue-300 text-sm">Resort Operations Director</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="mb-6">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                    <path d="M13.05 36L0 27.3V23.4L13.05 0H18.9L10.35 23.4H18V36H13.05ZM39.15 36L26.1 27.3V23.4L39.15 0H45L36.45 23.4H44.1V36H39.15Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "We've applied Smart Coat to over 30 residential pools in the last year. Our customers report 30-40% chemical reduction and consistently clearer water. It's become our premium offering and differentiator."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">JS</div>
                  <div>
                    <div className="text-white font-semibold">Jennifer Sanders</div>
                    <div className="text-blue-300 text-sm">Pool Service Company Owner</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="mb-6">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                    <path d="M13.05 36L0 27.3V23.4L13.05 0H18.9L10.35 23.4H18V36H13.05ZM39.15 36L26.1 27.3V23.4L39.15 0H45L36.45 23.4H44.1V36H39.15Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "Our community pool was on a 7-year resurfacing cycle. After applying Smart Coat, our engineering assessment now projects 18+ years before needing major work. The board is thrilled with the long-term savings."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">RW</div>
                  <div>
                    <div className="text-white font-semibold">Robert Washington</div>
                    <div className="text-blue-300 text-sm">HOA Facilities Manager</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
            >
              Get Started Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Contact our pool protection specialists to discuss your specific needs
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl border border-blue-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-blue-500/20 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-blue-200">(800) 555-COAT</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-blue-500/20 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-blue-200">pools@praetoriancoat.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-blue-500/20 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-semibold">National Headquarters</h4>
                      <p className="text-blue-200">1200 Technology Drive<br />Suite 400<br />Austin, TX 78701</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-500/20 p-3 rounded-full text-blue-400 hover:bg-blue-500/40 transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500/20 p-3 rounded-full text-blue-400 hover:bg-blue-500/40 transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500/20 p-3 rounded-full text-blue-400 hover:bg-blue-500/40 transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-500/20 p-3 rounded-full text-blue-400 hover:bg-blue-500/40 transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.042 15.979v-8.668l6.198 4.333-6.198 4.335z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl border border-blue-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Request Information</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-200 mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-900/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-gray-900/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-blue-200 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full bg-gray-900/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-blue-200 mb-2">I am a:</label>
                    <select className="w-full bg-gray-900/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40">
                      <option>Pool Owner</option>
                      <option>Commercial Pool Operator</option>
                      <option>Pool Service Professional</option>
                      <option>Distributor</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-blue-200 mb-2">Message</label>
                    <textarea 
                      className="w-full bg-gray-900/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 h-32"
                      placeholder="Tell us about your needs"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg px-6 py-4 shadow-lg transition-all duration-200"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}