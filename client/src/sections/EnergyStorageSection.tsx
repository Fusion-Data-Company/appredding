import { motion } from "framer-motion";
import { Battery, Zap, Shield, Clock, TrendingUp, Home } from "lucide-react";

const EnergyStorageSection = () => {
  const benefits = [
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Energy Independence",
      description: "Store excess solar power during the day to use at night or during outages."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Backup Power",
      description: "Keep your essential systems running during power outages with reliable battery backup."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Cost Savings",
      description: "Reduce peak-time electricity costs by using stored solar energy during expensive hours."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Solar Power",
      description: "Access your solar energy anytime, even when the sun isn't shining."
    }
  ];

  const batteryFeatures = [
    "Lithium Iron Phosphate (LiFePO4) technology",
    "10-15 year warranty",
    "Smart energy management system",
    "Seamless grid integration",
    "Remote monitoring capabilities",
    "Scalable modular design"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Energy <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Storage Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced lithium battery systems that store your solar energy for use when you need it most. 
            Achieve true energy independence with our cutting-edge storage technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Why Choose Battery Storage?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mb-4">
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">
                    {benefit.title}
                  </h4>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mr-4">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Premium Lithium Batteries</h3>
                <p className="text-gray-300">Advanced energy storage technology</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {batteryFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="bg-black/40 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-4">System Capacity Options</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">10-20 kWh</div>
                  <div className="text-gray-300 text-sm">Residential</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400">50+ kWh</div>
                  <div className="text-gray-300 text-sm">Commercial</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-12 text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Home className="w-12 h-12 text-white mr-4" />
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white">Complete Solar + Storage Solutions</h3>
              <p className="text-white/90">Hybrid systems for maximum energy independence</p>
            </div>
          </div>

          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Combine solar panels with battery storage for the ultimate energy solution. 
            Generate, store, and use clean energy on your terms while protecting against power outages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Zap className="w-8 h-8 text-white mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Solar Generation</h4>
              <p className="text-white/80 text-sm">High-efficiency panels capture maximum sunlight</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Battery className="w-8 h-8 text-white mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Energy Storage</h4>
              <p className="text-white/80 text-sm">Store excess power for later use</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Shield className="w-8 h-8 text-white mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Backup Protection</h4>
              <p className="text-white/80 text-sm">Automatic backup during outages</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-orange-500 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Design My Storage System
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-orange-500 transition-all duration-300"
            >
              Get Storage Quote
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyStorageSection;