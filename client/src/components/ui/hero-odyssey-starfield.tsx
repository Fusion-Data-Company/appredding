import React from 'react';
import { motion } from 'framer-motion';
import { StarsBackground } from '@/components/ui/stars-background';

interface HeroOdysseyProps {
  className?: string;
}

export const HeroOdyssey: React.FC<HeroOdysseyProps> = ({ className = "" }) => {
  return (
    <StarsBackground intensity="strong" className={`w-full h-screen ${className}`}>
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solar
            </span>
            <br />
            <span className="text-white">Odyssey</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Embark on a journey through renewable energy innovation with our cutting-edge solar solutions.
          </motion.p>
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>

        {/* Floating solar panel decorative elements */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 border-2 border-blue-400/30 rounded-lg"
          animate={{ 
            rotate: [0, 45, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-32 w-20 h-20 border-2 border-purple-400/30 rounded-lg"
          animate={{ 
            rotate: [0, -45, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-40 w-12 h-12 border-2 border-blue-300/20 rounded-lg"
          animate={{ 
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </StarsBackground>
  );
};