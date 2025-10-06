import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Grid3X3, Wrench, TrendingUp, Sparkles, Zap, Battery, Sun } from "lucide-react";
import { UtilitySavingsCalculator } from "@/components/UtilitySavingsCalculator";
import { SolarPanelFitEstimator } from "@/components/SolarPanelFitEstimator";
import { useFormModal } from "@/contexts/FormModalContext";

export const InteractiveToolsSection: React.FC = () => {
  const { openSolarForm } = useFormModal();
  const [activeTab, setActiveTab] = useState("calculator");
  const [ultraMode, setUltraMode] = useState(0);

  useEffect(() => {
    const modeTimer = setInterval(() => {
      setUltraMode(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(modeTimer);
  }, []);

  const getUltraModeClass = () => {
    const modes = [
      "from-orange-50 via-amber-50 to-yellow-50",
      "from-orange-100 via-amber-100 to-yellow-100", 
      "from-orange-75 via-amber-75 to-yellow-75",
      "from-orange-125 via-amber-125 to-yellow-125"
    ];
    return modes[ultraMode];
  };

  return (
    <section className={`relative py-40 bg-gradient-to-br ${getUltraModeClass()} overflow-hidden transition-all duration-2000`}>
      {/* Ultra-Realistic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 via-blue-200/15 to-cyan-200/20"></div>
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-300/15 to-blue-300/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-300/15 to-cyan-300/10 rounded-full blur-3xl"
          animate={{ 
            rotate: 360,
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Premium Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h20v20h-20z" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
              <path d="M70 10h20v20h-20z" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
              <path d="M10 70h20v20h-20z" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
              <path d="M70 70h20v20h-20z" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
              <path d="M30 20h40" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2"/>
              <path d="M20 30v40" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2"/>
              <circle cx="50" cy="50" r="3" fill="rgba(59, 130, 246, 0.4)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elite Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-indigo-800 via-blue-700 to-cyan-800 bg-clip-text text-transparent">Interactive</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-700 bg-clip-text text-transparent drop-shadow-lg">
                Solar Tools
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-300/40 to-cyan-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl max-w-5xl mx-auto font-bold leading-relaxed drop-shadow-sm"
             style={{ color: '#000000 !important' }}>
            Professional tools to estimate your solar savings and system requirements with precision and accuracy.
          </p>
        </motion.div>

        {/* Elite Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { 
                id: "calculator", 
                label: "Savings Calculator", 
                icon: <Calculator className="w-5 h-5" />,
                description: "Calculate your potential energy savings"
              },
              { 
                id: "estimator", 
                label: "Panel Fit Estimator", 
                icon: <Grid3X3 className="w-5 h-5" />,
                description: "Estimate how many panels fit on your roof"
              }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "button-primary text-white shadow-2xl"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg border-2 border-gray-200 hover:border-orange-300"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Premium background effects for active tab */}
                {activeTab === tab.id && (
                  <>
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
                    
                    <div className="shine-effect"></div>
                  </>
                )}
                
                <motion.div
                  className={activeTab === tab.id ? "text-white" : "text-indigo-500"}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {tab.icon}
                </motion.div>
                
                <div className="text-left">
                  <div className="font-bold">{tab.label}</div>
                  <div className={`text-sm font-normal ${activeTab === tab.id ? "text-indigo-100" : "text-gray-500"}`}>
                    {tab.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Elite Tool Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {activeTab === "calculator" && <UtilitySavingsCalculator />}
          {activeTab === "estimator" && <SolarPanelFitEstimator />}
        </motion.div>

        {/* Professional Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 border-2 border-indigo-400 shadow-2xl overflow-hidden">
            {/* Elite glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 blur-xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready for Professional Installation?
              </h3>
              <p className="text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
                Use these calculations to get started, then connect with our certified solar professionals 
                for a comprehensive site assessment and custom system design.
              </p>
              
              <motion.button
                onClick={openSolarForm}
                className="button-primary px-12 py-4 text-xl font-bold rounded-2xl"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
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
                
                <span className="relative z-10 flex items-center gap-3">
                  <Wrench className="w-6 h-6" />
                  Schedule Professional Assessment
                </span>
                
                <div className="shine-effect"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};