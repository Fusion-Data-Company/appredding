import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
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
              Elite ceramic coating technology that extends pool surface life by 300% while reducing maintenance costs and chemical usage.
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
                  Our ceramic coating creates a molecular barrier that reduces chemical absorption, cutting pool maintenance costs by up to 42%.
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
                  Praetorian ceramic coating extends pool surface lifespan by 300%, delaying costly resurfacing for decades.
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
                  Investment in our protective coating delivers 371% ROI over 10 years through reduced maintenance and extended surface life.
                </p>
                <div className="bg-gray-800/40 p-3 rounded-lg">
                  <div className="text-xl font-bold text-white">371%</div>
                  <div className="text-blue-300 text-sm">10-Year ROI</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
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
              Premium ROI Calculator
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Calculate your investment and long-term savings with our enterprise-grade coating system
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
                            <p className="text-blue-300 text-sm mb-1">Material Required</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.gallonsNeeded.toFixed(2)} gallons</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-gradient-to-br from-black/70 to-gray-900/70 p-5 rounded-lg border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          >
                            <p className="text-blue-300 text-sm mb-1">Coats Required</p>
                            <p className="text-2xl font-bold text-white">{calculationResult.coatCount}</p>
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mb-8"
                        >
                          <div className="relative bg-gradient-to-br from-blue-900/40 via-blue-950/40 to-blue-900/40 p-6 rounded-lg border border-blue-400/30 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                            {/* Premium ambient glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20 rounded-lg blur-md"></div>
                            
                            <div className="relative">
                              <h4 className="text-center text-xl text-white mb-6 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Premium Investment Analysis</h4>
                              
                              <div className="space-y-5">
                                <div className="flex justify-between items-baseline border-b border-blue-500/20 pb-3">
                                  <p className="text-blue-100 font-medium">Material Investment:</p>
                                  <p className="text-2xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                    ${calculationResult.totalCost.toFixed(2)}
                                  </p>
                                </div>
                                
                                <div className="flex justify-between items-baseline border-b border-blue-500/20 pb-3">
                                  <p className="text-blue-100 font-medium">10-Year Maintenance Savings:</p>
                                  <p className="text-2xl font-bold text-green-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                    ${(calculationResult.totalCost * 3.71).toFixed(2)}
                                  </p>
                                </div>
                                
                                <div className="flex justify-between items-baseline pt-2">
                                  <p className="text-blue-100 font-medium">Total 10-Year ROI:</p>
                                  <div className="flex items-center gap-2">
                                    <CircleDollarSign className="text-green-400 h-6 w-6" />
                                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                      371%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                        {/* Enhanced green ambient glow for ROI calculator section */}
                        <div className="absolute -inset-4 bg-green-500/30 rounded-xl blur-3xl opacity-70 z-0"></div>
                        <div className="absolute -inset-8 bg-green-500/20 rounded-xl blur-2xl opacity-60 z-0 animate-pulse-slow"></div>
                        
                        <div className="relative z-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full p-3 mb-6 
                          border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_10px_rgba(74,222,128,0.4)]">
                          <CircleDollarSign className="h-12 w-12 text-green-100" />
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            Premium ROI Calculator
                          </span>
                        </h3>
                        
                        <p className="text-lg text-blue-100 mb-8 max-w-lg relative z-10">
                          Enter your pool dimensions and coating preferences to receive a detailed investment analysis showing your potential savings over 10 years.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 relative z-10">
                          <div className="bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                            <div className="flex items-center justify-center mb-2">
                              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                                border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                                <TrendingUp className="w-4 h-4 text-green-100" />
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-green-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">371%</p>
                            <p className="text-blue-300 text-sm">Average ROI</p>
                          </div>
                          <div className="bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                            <div className="flex items-center justify-center mb-2">
                              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                                border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                                <DollarSign className="w-4 h-4 text-green-100" />
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-green-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">42%</p>
                            <p className="text-blue-300 text-sm">Maintenance Reduction</p>
                          </div>
                          <div className="bg-gray-900/60 p-5 rounded-lg border-2 border-green-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                            <div className="flex items-center justify-center mb-2">
                              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-1 
                                border border-green-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_4px_rgba(74,222,128,0.4)]">
                                <Clock className="w-4 h-4 text-green-100" />
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-green-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">20+ yrs</p>
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

      {/* Features section */}
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
              Enterprise-Grade Technology
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100"
            >
              Previously available only to government agencies, our ceramic coating technology now protects commercial and residential pools worldwide
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="text-blue-400 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold text-white">Ceramic Technology</h3>
                </div>
                <p className="text-blue-200 mb-4">
                  Our proprietary ceramic formulation creates a molecular barrier that prevents chemical penetration and UV damage while enhancing durability.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Temperature resistant to 500°F</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Molecularly bonds to concrete & fiberglass</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Ultra-low thermal conductivity</span>
                  </li>
                </ul>
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
                <div className="text-blue-400 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold text-white">Chemical Resistance</h3>
                </div>
                <p className="text-blue-200 mb-4">
                  Our nano-ceramic barrier prevents chemical absorption into pool surfaces, reducing the amount of chemicals needed to maintain proper water balance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Reduces chlorine consumption by 42%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Prevents pH fluctuations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Resists algae formation</span>
                  </li>
                </ul>
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
                <div className="text-blue-400 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold text-white">UV Protection</h3>
                </div>
                <p className="text-blue-200 mb-4">
                  Our ceramic formula includes advanced UV inhibitors that protect pool surfaces from sun damage, preventing fading, cracking and deterioration.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Blocks 99.9% of UV radiation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Prevents surface chalking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Maintains surface color for 20+ years</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="text-blue-400 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold text-white">Extended Lifespan</h3>
                </div>
                <p className="text-blue-200 mb-4">
                  Our ceramic coating creates a permanent bond with pool surfaces, extending their useful life by up to 300% and delaying expensive resurfacing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Prevents surface degradation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Inhibits concrete spalling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Eliminates the need for acid washing</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="text-blue-400 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold text-white">Energy Efficiency</h3>
                </div>
                <p className="text-blue-200 mb-4">
                  Our ceramic coating's thermal properties help maintain stable water temperatures, reducing heating costs for indoor and outdoor pools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Reduces heat loss by up to 28%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Lowers energy consumption</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Improves solar heating efficiency</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl p-6 border border-blue-400/30"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="text-blue-400 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold text-white">Professional Application</h3>
                </div>
                <p className="text-blue-200 mb-4">
                  Our network of certified pool contractors ensures perfect application of our ceramic coating technology for optimal performance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Certified installer network</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">20-year manufacturer warranty</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 text-green-400"><CheckCircle className="h-4 w-4" /></div>
                    <span className="text-blue-100">Detailed documentation package</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -bottom-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-blue-600/30 blur-[100px]"></div>
          <div className="absolute -top-[400px] -left-[400px] w-[800px] h-[800px] rounded-full bg-orange-600/20 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 rounded-xl border border-blue-500/30 p-8 md:p-12 overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-xl blur-lg opacity-30"></div>
              
              <div className="relative text-center max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
                >
                  Start Protecting Your Investment Today
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl text-blue-100 mb-10"
                >
                  Schedule a consultation with our pool coating experts to receive a customized quote and ROI analysis for your specific pool project.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <a 
                    href="#contact" 
                    className="relative bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-8 py-4 shadow-lg transition-all duration-200 w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-md rounded-lg"></div>
                    Request Free Consultation
                  </a>
                  <a 
                    href="tel:9168096619" 
                    className="relative bg-transparent hover:bg-gray-800/50 text-white font-semibold rounded-lg px-8 py-4 border border-blue-500/30 transition-all duration-200 w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 -z-10 bg-blue-500/5 blur-sm rounded-lg"></div>
                    Call (916) 809-6619
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Client Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100"
            >
              See how our ceramic coating technology has transformed commercial and residential pools across the country
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-blue-500/30 p-6"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "After applying Praetorian's ceramic coating to our resort's four pools, we've seen a 47% reduction in chemical usage and virtually eliminated the need for acid washing. The ROI has been exceptional."
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-white font-semibold">Michael T.</p>
                    <p className="text-blue-300 text-sm">Resort Facilities Director</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-blue-500/30 p-6"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "We manage 12 community pools, and the ceramic coating has been a game-changer for our maintenance costs. The water chemistry remains stable longer, and our resurfacing schedule has been extended by 15+ years."
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-white font-semibold">Rebecca J.</p>
                    <p className="text-blue-300 text-sm">HOA Manager</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-blue-500/30 p-6"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">
                  "As a pool contractor, I've added Praetorian's ceramic coating as a premium service option for my clients. The results are stunning - better water clarity, longer surface life, and significant chemical savings."
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-white font-semibold">David K.</p>
                    <p className="text-blue-300 text-sm">Pool Installation Contractor</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 rounded-xl border border-blue-500/30 overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-400/30 rounded-xl blur-lg opacity-20"></div>
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
                  >
                    Ready to Transform Your Pool?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-blue-100 mb-8"
                  >
                    Contact us today for a free consultation and custom ROI analysis
                  </motion.p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-600/20 p-3 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Headquarters</h3>
                        <p className="text-blue-200">Redding, California</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-600/20 p-3 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Phone</h3>
                        <p className="text-blue-200">(916) 809-6619</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-600/20 p-3 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Email</h3>
                        <p className="text-blue-200">rob@praetoriansmartcoat.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="relative bg-gradient-to-br from-black/70 to-gray-900/70 rounded-xl border border-blue-500/30 p-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-400/10 rounded-xl blur opacity-30"></div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-6">Request Information</h3>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-blue-100 mb-2">First Name*</label>
                            <input
                              type="text"
                              className="w-full bg-gray-900 border border-blue-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-blue-100 mb-2">Last Name*</label>
                            <input
                              type="text"
                              className="w-full bg-gray-900 border border-blue-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-blue-100 mb-2">Email*</label>
                            <input
                              type="email"
                              className="w-full bg-gray-900 border border-blue-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-blue-100 mb-2">Phone*</label>
                            <input
                              type="tel"
                              className="w-full bg-gray-900 border border-blue-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-blue-100 mb-2">Pool Type</label>
                          <select
                            className="w-full bg-gray-900 border border-blue-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          >
                            <option value="">Select Pool Type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="municipal">Municipal</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-blue-100 mb-2">Message</label>
                          <textarea
                            rows={4}
                            className="w-full bg-gray-900 border border-blue-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Tell us about your project..."
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="relative w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-6 py-3 shadow-lg transition-all duration-200"
                        >
                          <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-md rounded-lg"></div>
                          Submit Request
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}