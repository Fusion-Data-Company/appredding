import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid3X3, Sun, Calculator, Ruler, Maximize2, BarChart3 } from "lucide-react";

interface PanelEstimatorInputs {
  roofArea: string;
  roofShape: string;
  obstacles: string;
  panelType: string;
  efficiency: string;
}

interface PanelSpecs {
  name: string;
  width: number;
  height: number;
  wattage: number;
  efficiency: number;
  area: number;
}

export const SolarPanelFitEstimator: React.FC = () => {
  const [inputs, setInputs] = useState<PanelEstimatorInputs>({
    roofArea: "",
    roofShape: "rectangular",
    obstacles: "low",
    panelType: "standard",
    efficiency: "standard"
  });
  
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Actual panel specifications based on industry standards
  const panelSpecs: Record<string, PanelSpecs> = {
    standard: {
      name: "Standard 330W Panel",
      width: 39.1,
      height: 77.6,
      wattage: 330,
      efficiency: 20.3,
      area: 21.07 // sq ft
    },
    premium: {
      name: "Premium 400W Panel",
      width: 40.9,
      height: 78.7,
      wattage: 400,
      efficiency: 22.8,
      area: 22.3 // sq ft
    },
    compact: {
      name: "Compact 300W Panel",
      width: 35.4,
      height: 61.3,
      wattage: 300,
      efficiency: 19.5,
      area: 15.1 // sq ft
    }
  };

  const calculatePanelFit = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const roofArea = parseFloat(inputs.roofArea) || 0;
      const selectedPanel = panelSpecs[inputs.panelType];
      
      // Calculate usable area based on obstacles and roof shape
      let usabilityFactor = 0.85; // Base usability
      
      switch (inputs.obstacles) {
        case "none": usabilityFactor = 0.95; break;
        case "low": usabilityFactor = 0.85; break;
        case "medium": usabilityFactor = 0.75; break;
        case "high": usabilityFactor = 0.65; break;
      }
      
      switch (inputs.roofShape) {
        case "rectangular": usabilityFactor *= 1.0; break;
        case "square": usabilityFactor *= 0.95; break;
        case "irregular": usabilityFactor *= 0.8; break;
        case "hip": usabilityFactor *= 0.85; break;
      }
      
      const usableArea = roofArea * usabilityFactor;
      const panelsPerRow = Math.floor(Math.sqrt(usableArea / selectedPanel.area));
      const totalPanels = Math.floor(usableArea / selectedPanel.area);
      const actualUsedArea = totalPanels * selectedPanel.area;
      const systemSize = (totalPanels * selectedPanel.wattage) / 1000; // kW
      const annualProduction = systemSize * 1400; // kWh/year (California average)
      const annualSavings = annualProduction * 0.18; // $0.18/kWh average
      
      setResults({
        totalPanels,
        panelsPerRow,
        systemSize: systemSize.toFixed(1),
        actualUsedArea: actualUsedArea.toFixed(0),
        unusedArea: (roofArea - actualUsedArea).toFixed(0),
        usabilityPercentage: ((actualUsedArea / roofArea) * 100).toFixed(1),
        annualProduction: annualProduction.toFixed(0),
        annualSavings: annualSavings.toFixed(0),
        panelSpec: selectedPanel
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl border-2 border-blue-200"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-blue-300/30 to-indigo-300/30 rounded-3xl blur-xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 text-white shadow-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Grid3X3 className="w-8 h-8" />
          </motion.div>
          
          <h3 className="text-3xl font-black text-gray-800 mb-2 drop-shadow-md">
            Solar Panel Fit Estimator
          </h3>
          <p className="text-gray-600 font-medium">
            Calculate how many panels will fit on your roof
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Available Roof Area (sq ft)</label>
            <input
              type="number"
              value={inputs.roofArea}
              onChange={(e) => setInputs({...inputs, roofArea: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium"
              placeholder="Enter square footage"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Roof Shape</label>
            <select
              value={inputs.roofShape}
              onChange={(e) => setInputs({...inputs, roofShape: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium"
            >
              <option value="rectangular">Rectangular</option>
              <option value="square">Square</option>
              <option value="hip">Hip Roof</option>
              <option value="irregular">Irregular Shape</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Obstacles Level</label>
            <select
              value={inputs.obstacles}
              onChange={(e) => setInputs({...inputs, obstacles: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium"
            >
              <option value="none">None (Clear roof)</option>
              <option value="low">Low (Few vents/chimneys)</option>
              <option value="medium">Medium (Multiple obstacles)</option>
              <option value="high">High (Many obstacles)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Panel Type</label>
            <select
              value={inputs.panelType}
              onChange={(e) => setInputs({...inputs, panelType: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium"
            >
              <option value="standard">Standard 330W (39" x 78")</option>
              <option value="premium">Premium 400W (41" x 79")</option>
              <option value="compact">Compact 300W (35" x 61")</option>
            </select>
          </div>
        </div>

        <motion.button
          onClick={calculatePanelFit}
          disabled={!inputs.roofArea || isCalculating}
          className="elite-solar-button w-full px-8 py-4 text-white font-bold rounded-xl text-lg disabled:opacity-50"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCalculating ? (
            <div className="flex items-center justify-center">
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-2">Calculating Fit...</span>
            </div>
          ) : (
            <span className="relative z-10">Calculate Panel Fit</span>
          )}
        </motion.button>

        {results && (
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Panel Layout Visualization */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Panel Layout</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600">{results.totalPanels}</div>
                  <div className="text-sm text-gray-600">Total Panels</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600">{results.systemSize} kW</div>
                  <div className="text-sm text-gray-600">System Size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-600">{results.usabilityPercentage}%</div>
                  <div className="text-sm text-gray-600">Roof Utilization</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600">${results.annualSavings}</div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
              </div>
            </div>

            {/* Detailed Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Grid3X3 className="w-6 h-6" />,
                  label: "Panel Dimensions",
                  value: `${results.panelSpec.width}" x ${results.panelSpec.height}"`,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <Ruler className="w-6 h-6" />,
                  label: "Used Area",
                  value: `${results.actualUsedArea} sq ft`,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Maximize2 className="w-6 h-6" />,
                  label: "Unused Area",
                  value: `${results.unusedArea} sq ft`,
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: <Sun className="w-6 h-6" />,
                  label: "Panel Wattage",
                  value: `${results.panelSpec.wattage}W each`,
                  color: "from-yellow-500 to-amber-500"
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  label: "Annual Production",
                  value: `${results.annualProduction} kWh`,
                  color: "from-purple-500 to-violet-500"
                },
                {
                  icon: <Calculator className="w-6 h-6" />,
                  label: "Panel Efficiency",
                  value: `${results.panelSpec.efficiency}%`,
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
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};