import React from 'react';
import { motion } from 'framer-motion';
import { StarsBackground } from './stars-background';

interface HeroOdysseyProps {
  className?: string;
}

export const HeroOdyssey: React.FC<HeroOdysseyProps> = ({ className = "" }) => {

  return (
    <StarsBackground className={`w-full h-screen ${className}`} intensity="strong">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Solar
            </span>
            <br />
            <span className="text-white">Odyssey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Embark on a journey through renewable energy innovation with our cutting-edge solar solutions.
          </p>
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('product-showcase');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Floating solar panel decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="10" width="30" height="30" fill="#4a90e2" />
          <rect x="45" y="10" width="30" height="30" fill="#4a90e2" />
          <rect x="10" y="45" width="30" height="30" fill="#4a90e2" />
          <rect x="45" y="45" width="30" height="30" fill="#4a90e2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="10" width="30" height="30" fill="#4a90e2" />
          <rect x="45" y="10" width="30" height="30" fill="#4a90e2" />
          <rect x="10" y="45" width="30" height="30" fill="#4a90e2" />
          <rect x="45" y="45" width="30" height="30" fill="#4a90e2" />
        </svg>
      </motion.div>
    </StarsBackground>
  );
};