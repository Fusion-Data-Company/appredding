import React from 'react';
import { motion } from 'framer-motion';
import solarPanelImage from "@assets/Untitled design.png";

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
        <div className="flex justify-center items-center">
          
          {/* Solar Panel - Center */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <img 
                src={solarPanelImage}
                alt="Solar Panel"
                className="w-96 h-96 object-contain mx-auto"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Solar Panels</h3>
            <p className="text-gray-300 leading-relaxed max-w-md">
              High-efficiency solar panels that convert sunlight into clean, renewable energy for your home or business.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default ProductShowcaseSection;