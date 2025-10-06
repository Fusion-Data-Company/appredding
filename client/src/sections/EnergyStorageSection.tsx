import { motion } from "framer-motion";
import { Battery, Shield, Zap, Clock, Home, TrendingUp } from "lucide-react";

const EnergyStorageSection = () => {
  const storageFeatures = [
    {
      icon: <Battery className="w-10 h-10" />,
      title: "API 5.12kWh Modules",
      description: "Modular LiFePO4 system with 5.12kWh capacity per module, up to 6 units parallel for 30.7kWh total.",
      specs: ["100Ah LiFePO4 cells", "Built-in BMS protection", "CAN/RS485 communication", "LED SOC indicator"]
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "API 14.34kWh Stacks",
      description: "High-capacity stackable modules with 280Ah cells, up to 4 stacks in parallel for 229kWh maximum.",
      specs: ["280Ah per module", "Master BMS control", "Real-time cell monitoring", "Internet-independent display"]
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Active Cell Balancing",
      description: "Advanced BMS with active balancing ensures optimal performance and maximum cycle life of 6000+ cycles.",
      specs: ["Active balancing technology", "6000+ cycle life", "Cell-level monitoring", "SOC/SOH tracking"]
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "UL Safety Certified",
      description: "UL 1973 and UL 9540 compliant battery systems with non-flammable, thermal-stable LiFePO4 chemistry.",
      specs: ["UL 1973/9540 certified", "Non-flammable chemistry", "Thermal stability", "Indoor installation safe"]
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Sol-Ark Integration",
      description: "Seamless integration with Sol-Ark 12K/15K inverters via CAN bus or RS485 for closed-loop operation.",
      specs: ["Closed-loop BMS communication", "48V nominal compatibility", "Auto charge/discharge control", "Grid-tie capability"]
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Modular Expansion",
      description: "Field-expandable design allows easy capacity upgrades without replacing existing equipment.",
      specs: ["Modular stacking design", "Field-replaceable modules", "Scalable capacity", "Future expansion ready"]
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 overflow-hidden">
      {/* Solar Battery Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-orange-200/15 to-red-200/20"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-300/15 to-red-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Solar Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="storage-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#storage-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">API</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                LiFePO4 Stackable
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-amber-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl max-w-5xl mx-auto font-bold leading-relaxed mb-8 drop-shadow-sm"
             style={{ color: '#000000 !important' }}>
            Modular LiFePO4 battery systems with built-in BMS, active cell balancing, 
            and seamless Sol-Ark inverter integration for maximum safety and performance.
          </p>

          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl font-black text-green-600 mb-2 drop-shadow-lg">229kWh</div>
              <div className="text-gray-700 text-lg font-bold">Maximum Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-red-500 mb-2 drop-shadow-lg">6000+</div>
              <div className="text-gray-700 text-lg font-bold">Cycle Life</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-amber-600 mb-2 drop-shadow-lg">UL</div>
              <div className="text-gray-700 text-lg font-bold">Safety Certified</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-yellow-600 mb-2 drop-shadow-lg">48V</div>
              <div className="text-gray-700 text-lg font-bold">Sol-Ark Compatible</div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Features Grid - Fixed Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {storageFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative h-full flex"
            >
              {/* Premium Card Background - Full Height */}
              <div className="relative bg-gradient-to-br from-white via-amber-50 to-orange-50 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-200 group-hover:border-orange-400 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden w-full flex flex-col">
                
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/30 via-red-500/30 to-amber-500/30 opacity-20 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Card Content - Flexbox for consistent spacing */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Premium Icon */}
                  <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-orange-300">
                    {feature.icon}
                  </div>

                  {/* Enhanced Typography */}
                  <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-300 drop-shadow-md">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium flex-grow">
                    {feature.description}
                  </p>

                  {/* Premium Specs List - Always at bottom */}
                  <ul className="space-y-2 mt-auto">
                    {feature.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="flex items-center text-gray-700 text-base font-medium">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300 shadow-md flex-shrink-0"></div>
                        <span className="leading-tight">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Green Financial Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 border-2 border-green-400 shadow-2xl overflow-hidden">
            {/* Green glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 blur-xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">🔋💰</div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                Battery Storage = Maximum Savings
              </h3>
              <p className="text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
                Store your solar energy and use it when electricity rates are highest. 
                Battery storage can increase your solar savings by 30-50% while providing backup power security.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">30-50%</div>
                  <div className="text-green-200">More Solar Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-green-200">Backup Power</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">$0</div>
                  <div className="text-green-200">Down Payment</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-16 border border-gray-700/50 overflow-hidden">
            
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-5xl md:text-6xl font-black text-white mb-8">
                Power Your Independence
              </h3>
              
              <p className="text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
                Take control of your energy future with advanced battery storage. Never worry about 
                power outages again while maximizing your solar investment savings.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-primary px-12 py-6 font-black rounded-xl text-xl"
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
                  
                  <span className="relative z-10">Get Battery Quote</span>
                  <div className="shine-effect"></div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 border-2 border-orange-400 text-white font-black rounded-xl text-xl hover:bg-green-500 hover:border-orange-500 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Schedule Consultation</span>
                  <div className="shine-effect"></div>
                </motion.button>
              </div>

              <div className="mt-12 text-center">
                <p className="text-white text-lg">
                  💡 Financing Available | 📱 Smart App Control | ⚡ Professional Installation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyStorageSection;