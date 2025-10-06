import React from "react";
import { motion } from "framer-motion";
import { Sun, Zap, Battery, Shield } from "lucide-react";

export const UltraRealisticHeader: React.FC = () => {
  return (
    <motion.header 
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Ultra-Realistic Sunlight Simulation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-200/30 via-orange-200/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-radial from-amber-300/25 via-yellow-300/15 to-transparent rounded-full blur-2xl"
          animate={{ 
            rotate: 360,
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Premium Solar Panel Texture Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ultra-solar-grid" width="60" height="40" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="26" height="16" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="32" y="2" width="26" height="16" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="2" y="22" width="26" height="16" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="32" y="22" width="26" height="16" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" rx="2"/>
              <line x1="15" y1="2" x2="15" y2="18" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.3"/>
              <line x1="45" y1="2" x2="45" y2="18" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ultra-solar-grid)" />
        </svg>
      </div>

      {/* Elite Navigation Enhancement */}
      <div className="relative z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Premium Logo Section */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sun className="w-7 h-7 text-white drop-shadow-lg" />
                </motion.div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl blur-md opacity-30 -z-10"></div>
              </div>
              <div className="text-2xl font-black text-gray-800 tracking-tight">
                <span className="bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">Solar</span>
                <span className="text-gray-700">Pro</span>
              </div>
            </motion.div>

            {/* Elite Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { label: "Services", icon: <Zap className="w-4 h-4" /> },
                { label: "Products", icon: <Battery className="w-4 h-4" /> },
                { label: "Solutions", icon: <Shield className="w-4 h-4" /> },
                { label: "Contact", icon: <Sun className="w-4 h-4" /> }
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={`#${item.label.toLowerCase()}`}
                  className="relative group flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Premium hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Elite engraved effect */}
                  <div className="absolute inset-0 bg-white/50 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 shadow-inner"></div>
                  
                  <div className="relative z-10 flex items-center space-x-2">
                    <motion.div
                      className="text-orange-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Elite underline effect */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </motion.a>
              ))}
            </div>

            {/* Premium CTA Button */}
            <motion.button
              className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white font-bold rounded-xl shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: "0 0 30px rgba(251, 191, 36, 0.6), 0 8px 25px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
              }}
            >
              {/* Solar grid background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-3 gap-0.5 h-full w-full">
                  {[...Array(9)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-white/40 rounded-sm"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Animated sun rays */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-3 bg-white/30"
                      style={{
                        transformOrigin: "bottom center",
                        transform: `rotate(${i * 60}deg) translateY(-12px)`
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <span className="relative z-10">Get Quote</span>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Elite Ambient Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent"
            style={{
              width: "2px",
              height: "100%",
              left: `${20 + i * 15}%`,
              transform: "rotate(15deg)"
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.header>
  );
};