import React from 'react';
import { motion } from 'framer-motion';
import solarPanelImage from "@assets/68.png";
import batteryImage from "@assets/67.png";
import inverterImage from "@assets/15K-new-1-e1719430674378-628x1024.webp";

const ProductShowcaseSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-black py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Solar Panel - Left */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <img 
                src={solarPanelImage}
                alt="Solar Panel"
                className="w-80 h-80 object-contain mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Solar Panels</h3>
            <p className="text-gray-300 leading-relaxed">
              High-efficiency solar panels that convert sunlight into clean, renewable energy for your home or business.
            </p>
          </motion.div>

          {/* Battery - Middle */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <img 
                src={batteryImage}
                alt="Battery Storage"
                className="w-80 h-80 object-contain mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Battery Storage</h3>
            <p className="text-gray-300 leading-relaxed">
              Advanced battery systems that store your solar energy for use when you need it most, day or night.
            </p>
          </motion.div>

          {/* Inverter - Right */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <img 
                src={inverterImage}
                alt="Sol-Ark Inverter"
                className="w-80 h-80 object-contain mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Inverters</h3>
            <p className="text-gray-300 leading-relaxed">
              Intelligent inverters that convert DC power to AC and optimize your entire solar energy system.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default ProductShowcaseSection;