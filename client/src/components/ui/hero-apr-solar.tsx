import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sun, DollarSign } from 'lucide-react';
import { Link } from 'wouter';

interface HeroAPRSolarProps {
  className?: string;
}

export const HeroAPRSolar: React.FC<HeroAPRSolarProps> = ({ className = "" }) => {
  return (
    <section className={`apr-hero-solar-2024 relative w-full min-h-screen overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332] via-[#2a3442] to-[#ff6b35]/20" />
      
      {/* Solar panel pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,0.03) 35px,
            rgba(255,255,255,0.03) 70px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,0.03) 35px,
            rgba(255,255,255,0.03) 70px
          )`
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-160px)]">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SLASH YOUR ENERGY BILLS BY{' '}
              <span className="text-[#ff6b35]">70%</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join 500+ Redding Homeowners Who've Gone Solar
            </motion.p>
            
            <motion.ul
              className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <li className="flex items-center text-white text-lg">
                <Check className="w-6 h-6 text-[#ff6b35] mr-3 flex-shrink-0" />
                20+ Years Local Experience
              </li>
              <li className="flex items-center text-white text-lg">
                <Check className="w-6 h-6 text-[#ff6b35] mr-3 flex-shrink-0" />
                25-Year Panel Warranty
              </li>
              <li className="flex items-center text-white text-lg">
                <Check className="w-6 h-6 text-[#ff6b35] mr-3 flex-shrink-0" />
                $0 Down Financing Available
              </li>
            </motion.ul>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/contact" className="group">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#ff6b35] text-white font-bold text-lg rounded-md hover:bg-[#e55a2b] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center">
                  Get Free Solar Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link href="/solar-tools" className="group">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold text-lg rounded-md border-2 border-white hover:bg-white hover:text-[#1a2332] transition-all duration-300 flex items-center justify-center">
                  Calculate Your Savings
                  <DollarSign className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Solar panel image with overlay */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"
                alt="Solar panels on California home"
                className="w-full h-auto"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              
              {/* Gradient overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Savings ticker */}
              <motion.div
                className="absolute bottom-6 right-6 bg-white p-6 rounded-lg shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm text-gray-600 mb-1">Redding Residents Saved</p>
                <p className="text-3xl font-bold text-[#ff6b35]">$2.4M</p>
                <p className="text-sm text-gray-600">This Year</p>
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-[#ff6b35]/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
        
        {/* Bottom trust indicators */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Sun className="w-10 h-10 text-[#ff6b35] mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-gray-300">Installations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">20+</p>
              <p className="text-gray-300">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">25</p>
              <p className="text-gray-300">Year Warranty</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">4.9★</p>
              <p className="text-gray-300">Customer Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};