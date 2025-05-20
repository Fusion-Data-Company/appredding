import React, { useState } from 'react';
import { Calculator, BarChart3, ChevronDown, ChevronUp, DollarSign, Zap, Calendar, PieChart, PercentCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Component for the mini ROI calculator in the Construction page
const ConstructionROICalculator = () => {
  const [squareFootage, setSquareFootage] = useState<number>(10000);
  const [energyCostPerSqFt, setEnergyCostPerSqFt] = useState<number>(2.15);
  const [showResults, setShowResults] = useState(false);
  
  // Calculate results
  const annualEnergySavings = squareFootage * energyCostPerSqFt * 0.32; // 32% savings rate
  const firstYearROI = annualEnergySavings - (squareFootage * 3.85); // Cost of application
  const fiveYearROI = annualEnergySavings * 5 - (squareFootage * 3.85);
  const tenYearROI = annualEnergySavings * 10 - (squareFootage * 3.85);
  const paybackPeriod = (squareFootage * 3.85) / annualEnergySavings;
  
  const calculateROI = () => {
    setShowResults(true);
  };
  
  return (
    <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border border-amber-600/30 shadow-lg">
      <div className="p-6">
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-amber-500/20 to-blue-500/20 rounded-lg blur-md opacity-70"></div>
          <h3 className="relative text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-amber-300 to-blue-300 p-2 text-center">
            Construction Project ROI Calculator
          </h3>
        </div>
        
        {/* Calculator Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Square Footage</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Calculator size={16} />
                </span>
                <input
                  type="number"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-gray-100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Annual Energy Cost ($/sq ft)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <DollarSign size={16} />
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={energyCostPerSqFt}
                  onChange={(e) => setEnergyCostPerSqFt(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 bg-gray-800/70 border border-gray-700 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-gray-100"
                />
              </div>
            </div>
          </div>
          
          {/* Advanced parameters (always shown) */}
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                  <Zap size={14} className="mr-1 text-amber-500" />
                  Energy Savings Rate
                </label>
                <div className="bg-gray-800/40 border border-gray-700 rounded-md p-2 flex items-center justify-between">
                  <span className="text-gray-400">Default</span>
                  <span className="text-amber-400 font-semibold">32% (Validated)</span>
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                  <Calendar size={14} className="mr-1 text-amber-500" />
                  Building Lifespan Extension
                </label>
                <div className="bg-gray-800/40 border border-gray-700 rounded-md p-2 flex items-center justify-between">
                  <span className="text-gray-400">Default</span>
                  <span className="text-amber-400 font-semibold">45%</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                  <PercentCircle size={14} className="mr-1 text-amber-500" />
                  Insurance Premium Reduction
                </label>
                <div className="bg-gray-800/40 border border-gray-700 rounded-md p-2 flex items-center justify-between">
                  <span className="text-gray-400">Default</span>
                  <span className="text-amber-400 font-semibold">18%</span>
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                  <PieChart size={14} className="mr-1 text-amber-500" />
                  Application Cost ($/sq ft)
                </label>
                <div className="bg-gray-800/40 border border-gray-700 rounded-md p-2 flex items-center justify-between">
                  <span className="text-gray-400">Default</span>
                  <span className="text-amber-400 font-semibold">$3.85</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calculate ROI Button */}
          <div className="flex justify-center pt-2">
            <div className="relative inline-block group/roi-button">
              {/* Glow effects */}
              <div className="absolute -inset-3 bg-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover/roi-button:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-amber-600/30 to-blue-600/20 rounded-xl blur-xl opacity-70 group-hover/roi-button:opacity-90 transition-opacity duration-500"></div>
              
              <button 
                onClick={calculateROI}
                className="relative px-8 py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 group z-10 overflow-hidden"
              >
                {/* Enhanced translucent background with realistic glass effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 rounded-xl -z-[1] backdrop-blur-md border border-amber-500/50"></div>
                
                {/* Premium glass overlay with subtle transparency */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-700/10 rounded-xl opacity-100 group-hover:opacity-0 transition-opacity duration-300 -z-[1]"></div>
                
                {/* Animated hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-amber-600/40 rounded-xl -z-[1] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span className="relative inline-block overflow-hidden group-hover:text-white transition-colors duration-300">
                    <span className="relative inline-block group-hover:translate-y-full transition-transform duration-300">
                      Calculate Your ROI
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="relative">
                        Calculate Your ROI
                        <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-5 bg-gradient-to-br from-blue-900/30 to-amber-900/30 rounded-xl border border-blue-700/30"
          >
            <h4 className="text-lg font-semibold text-blue-300 mb-4">Project ROI Analysis</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                <div className="text-sm text-gray-400">Annual Energy Savings</div>
                <div className="text-xl font-bold text-green-400">${annualEnergySavings.toLocaleString('en-US', {maximumFractionDigits: 2})}</div>
              </div>
              
              <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                <div className="text-sm text-gray-400">Payback Period</div>
                <div className="text-xl font-bold text-amber-400">{paybackPeriod.toFixed(1)} Years</div>
              </div>
              
              <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                <div className="text-sm text-gray-400">5-Year ROI</div>
                <div className="text-xl font-bold text-green-400">${fiveYearROI.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
              </div>
              
              <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/50">
                <div className="text-sm text-gray-400">10-Year ROI</div>
                <div className="text-xl font-bold text-green-400">${tenYearROI.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              <p>*Results are estimated based on industry averages and validated customer data. Contact us for a detailed analysis specific to your project.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConstructionROICalculator;