import { motion } from "framer-motion";
import { Battery, Shield, Zap, Clock, Home, TrendingUp } from "lucide-react";

const EnergyStorageSection = () => {
  const storageFeatures = [
    {
      icon: <Battery className="w-10 h-10" />,
      title: "Tesla Powerwall",
      description: "Industry-leading battery storage with 13.5 kWh capacity and 10-year warranty.",
      specs: ["13.5 kWh capacity", "10-year warranty", "App monitoring"]
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Backup Protection",
      description: "Automatic backup power during outages, keeping your essential systems running.",
      specs: ["Instant switching", "Whole-home backup", "Emergency ready"]
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Smart Integration",
      description: "Intelligent energy management that optimizes your solar and storage systems.",
      specs: ["AI optimization", "Peak shaving", "Load balancing"]
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "24/7 Monitoring",
      description: "Real-time system monitoring and performance analytics via mobile app.",
      specs: ["Live tracking", "Performance alerts", "Remote diagnostics"]
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Energy Independence",
      description: "Reduce reliance on the grid and protect against rising electricity costs.",
      specs: ["Grid independence", "Rate protection", "Sustainable power"]
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Increased Value",
      description: "Battery storage systems can increase your home's value and marketability.",
      specs: ["Property value boost", "Future-proof tech", "Green certification"]
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Enterprise Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enterprise Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="storage-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1"/>
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
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-12 leading-tight">
            Energy{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Storage Solutions
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-blue-500/20 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-200 max-w-5xl mx-auto font-light leading-relaxed mb-8">
            Advanced battery storage systems that provide backup power, energy independence, 
            and maximum savings from your solar investment.
          </p>

          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl font-black text-green-400 mb-2">24/7</div>
              <div className="text-gray-300 text-lg">Backup Power</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">15+</div>
              <div className="text-gray-300 text-lg">Years Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">90%</div>
              <div className="text-gray-300 text-lg">Efficiency Rating</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-yellow-400 mb-2">$0</div>
              <div className="text-gray-300 text-lg">Down Payment</div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {storageFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              {/* Premium Card Background */}
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 group-hover:border-green-500/50 transition-all duration-500 overflow-hidden">
                
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Premium Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl mb-8 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Enhanced Typography */}
                  <h3 className="text-3xl font-black text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Premium Specs List */}
                  <ul className="space-y-3">
                    {feature.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="flex items-center text-gray-400 text-lg">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
              
              <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Take control of your energy future with advanced battery storage. Never worry about 
                power outages again while maximizing your solar investment savings.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-black rounded-xl text-xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
                >
                  Get Battery Quote
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 border-2 border-gray-400 text-gray-200 font-black rounded-xl text-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Schedule Consultation
                </motion.button>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-400 text-lg">
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