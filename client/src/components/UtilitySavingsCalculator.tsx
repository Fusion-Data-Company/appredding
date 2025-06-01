import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Sun, DollarSign, Zap, TrendingUp, Battery } from "lucide-react";

interface CalculatorInputs {
  monthlyBill: string;
  homeSize: string;
  roofType: string;
  sunExposure: string;
  utilityRate: string;
}

export const UtilitySavingsCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyBill: "",
    homeSize: "",
    roofType: "asphalt",
    sunExposure: "full",
    utilityRate: "0.18"
  });
  
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSavings = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const monthlyBill = parseFloat(inputs.monthlyBill) || 0;
      const homeSize = parseFloat(inputs.homeSize) || 0;
      const utilityRate = parseFloat(inputs.utilityRate) || 0.18;
      
      // Professional calculation based on industry standards
      const annualUsage = (monthlyBill / utilityRate) * 12;
      const systemSize = Math.min(annualUsage / 1200, homeSize * 0.75);
      const systemCost = systemSize * 2800;
      const annualSavings = annualUsage * utilityRate * 0.85;
      const paybackPeriod = systemCost / annualSavings;
      const twentyYearSavings = (annualSavings * 20) - systemCost;
      const federalTaxCredit = systemCost * 0.30;
      
      setResults({
        systemSize: systemSize.toFixed(1),
        systemCost: systemCost.toFixed(0),
        annualSavings: annualSavings.toFixed(0),
        monthlyAvgSavings: (annualSavings / 12).toFixed(0),
        paybackPeriod: paybackPeriod.toFixed(1),
        twentyYearSavings: twentyYearSavings.toFixed(0),
        federalTaxCredit: federalTaxCredit.toFixed(0),
        firstYearSavings: (annualSavings + federalTaxCredit).toFixed(0)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-3xl p-8 shadow-2xl border-2 border-orange-200"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-orange-300/30 to-amber-300/30 rounded-3xl blur-xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 text-white shadow-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Calculator className="w-8 h-8" />
          </motion.div>
          
          <h3 className="text-3xl font-black text-gray-800 mb-2 drop-shadow-md">
            Utility Savings Calculator
          </h3>
          <p className="text-gray-600 font-medium">
            Get precise estimates for your solar energy savings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Monthly Electric Bill ($)</label>
            <input
              type="number"
              value={inputs.monthlyBill}
              onChange={(e) => setInputs({...inputs, monthlyBill: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-medium"
              placeholder="Enter amount"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Home Size (sq ft)</label>
            <input
              type="number"
              value={inputs.homeSize}
              onChange={(e) => setInputs({...inputs, homeSize: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-medium"
              placeholder="Square footage"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Roof Type</label>
            <select
              value={inputs.roofType}
              onChange={(e) => setInputs({...inputs, roofType: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-medium"
            >
              <option value="asphalt">Asphalt Shingles</option>
              <option value="tile">Tile</option>
              <option value="metal">Metal</option>
              <option value="flat">Flat</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Sun Exposure</label>
            <select
              value={inputs.sunExposure}
              onChange={(e) => setInputs({...inputs, sunExposure: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-medium"
            >
              <option value="full">Full Sun (6+ hours)</option>
              <option value="partial">Partial Sun (4-6 hours)</option>
              <option value="limited">Limited Sun (2-4 hours)</option>
            </select>
          </div>
        </div>

        <motion.button
          onClick={calculateSavings}
          disabled={!inputs.monthlyBill || !inputs.homeSize || isCalculating}
          className="button-primary w-full px-8 py-4 font-bold rounded-xl text-lg disabled:opacity-50"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="solar-panel-grid">
            <div>
              {[...Array(9)].map((_, i) => (
                <div key={i} className="solar-panel-cell"></div>
              ))}
            </div>
          </div>
          
          <div className="solar-rays">
            <div className="solar-ray-animation">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="solar-ray"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-16px)`
                  }}
                />
              ))}
            </div>
          </div>
          
          {isCalculating ? (
            <div className="flex items-center justify-center relative z-10">
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-2">Calculating...</span>
            </div>
          ) : (
            <span className="relative z-10">Calculate My Savings</span>
          )}
          <div className="shine-effect"></div>
        </motion.button>

        {results && (
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                icon: <DollarSign className="w-6 h-6" />,
                label: "Annual Savings",
                value: `$${results.annualSavings}`,
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                label: "System Size",
                value: `${results.systemSize} kW`,
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                label: "Payback Period",
                value: `${results.paybackPeriod} years`,
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: <Battery className="w-6 h-6" />,
                label: "20-Year Savings",
                value: `$${results.twentyYearSavings}`,
                color: "from-orange-500 to-red-500"
              },
              {
                icon: <Sun className="w-6 h-6" />,
                label: "Federal Tax Credit",
                value: `$${results.federalTaxCredit}`,
                color: "from-yellow-500 to-amber-500"
              },
              {
                icon: <Calculator className="w-6 h-6" />,
                label: "First Year Total",
                value: `$${results.firstYearSavings}`,
                color: "from-indigo-500 to-blue-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl mb-4 text-white shadow-lg`}>
                  {item.icon}
                </div>
                <h4 className="text-sm font-semibold text-gray-600 mb-1">{item.label}</h4>
                <p className="text-2xl font-black text-gray-800">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};