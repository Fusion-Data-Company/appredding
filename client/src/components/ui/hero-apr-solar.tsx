import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sun, DollarSign } from 'lucide-react';
import { Link } from 'wouter';
import { SOLAR_HERO_IMAGE } from "@/assets_dir/imageExports";
import { useFormModal } from "@/contexts/FormModalContext";

interface HeroAPRSolarProps {
  className?: string;
}

export const HeroAPRSolar: React.FC<HeroAPRSolarProps> = ({ className = "" }) => {
  const { openSolarForm } = useFormModal();
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 ${className}`}>
      {/* Subtle Enterprise Background */}
      <div className="absolute inset-0">
        {/* Very Subtle Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/30"></div>
        
        {/* Minimal Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        
        {/* Subtle Solar Energy Highlights */}
        <div className="absolute top-32 right-32 w-48 h-48 bg-gradient-to-br from-yellow-200/10 to-orange-200/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-br from-orange-200/8 to-amber-200/6 rounded-full blur-2xl"></div>
      </div>
      
      {/* Sophisticated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 via-orange-500/10 via-transparent to-red-500/12"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="enterprise-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(251, 191, 36, 0.08)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#enterprise-grid)" />
        </svg>
      </div>
      
      {/* Premium Animated Particles System */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Energy Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-yellow-400/25 via-orange-500/20 to-amber-600/15 rounded-full blur-xl animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-orange-500/25 via-red-500/20 to-yellow-600/15 rounded-full blur-2xl animate-pulse delay-1000 shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-yellow-500/12 via-orange-500/8 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Secondary Accent Orbs */}
        <div className="absolute top-60 right-60 w-32 h-32 bg-gradient-to-br from-orange-400/20 via-yellow-500/15 to-red-500/12 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-60 left-60 w-48 h-48 bg-gradient-to-br from-yellow-300/18 via-orange-400/15 to-amber-500/12 rounded-full blur-2xl animate-pulse delay-300"></div>
        
        {/* Floating Solar Panel Elements */}
        <div className="absolute top-16 right-16 w-24 h-16 bg-gradient-to-br from-blue-600/20 to-blue-800/25 rounded-lg transform rotate-12 shadow-lg">
          <div className="solar-panel-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="solar-panel-cell" />
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-16 left-16 w-32 h-20 bg-gradient-to-br from-blue-700/25 to-blue-900/30 rounded-lg transform -rotate-6 shadow-lg">
          <div className="solar-panel-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="solar-panel-cell" />
            ))}
          </div>
        </div>
        
        <div className="absolute top-1/3 left-8 w-20 h-12 bg-gradient-to-br from-blue-600/30 to-blue-800/35 rounded-lg transform rotate-45 shadow-lg">
          <div className="solar-panel-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="solar-panel-cell" />
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-1/3 right-8 w-28 h-18 bg-gradient-to-br from-blue-700/25 to-blue-900/30 rounded-lg transform -rotate-12 shadow-lg">
          <div className="solar-panel-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="solar-panel-cell" />
            ))}
          </div>
        </div>
        
        <div className="absolute top-1/2 right-1/4 w-16 h-10 bg-gradient-to-br from-blue-600/35 to-blue-800/40 rounded-lg transform rotate-30 shadow-lg">
          <div className="solar-panel-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="solar-panel-cell" />
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-1/2 left-1/4 w-24 h-14 bg-gradient-to-br from-blue-700/30 to-blue-900/35 rounded-lg transform -rotate-15 shadow-lg">
          <div className="solar-panel-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="solar-panel-cell" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="text-[#ff6b35]">Advance Power</span> of Redding
            <br />
            <span className="text-gray-700">Solar Solutions</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Transform your home with premium solar technology. 20+ years of trusted service in Northern California.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={openSolarForm}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
                <div className="solar-panel-grid">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="solar-panel-cell"
                      style={{
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
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
                
                <span className="relative z-10 text-white">Get Free Solar Quote</span>
                <div className="shine-effect"></div>
              </motion.button>
            
            <Link href="/residential-solar">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gray-900/90 backdrop-blur-sm border-2 border-orange-400 text-white font-bold rounded-xl text-lg hover:bg-gray-800 hover:border-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="text-white">Call (530) 226-0701</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Company Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {/* Years Experience Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 border border-yellow-400/30">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-3 leading-none">20+</div>
              <div className="text-xl text-gray-200 font-medium">Years Experience</div>
              <div className="text-sm text-gray-400 mt-2">Serving Northern California since 2004</div>
            </div>
          </motion.div>
          
          {/* Solar Installations Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-orange-400/30">
                <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="text-4xl md:text-5xl font-black text-orange-400 mb-3 leading-none">1000+</div>
              <div className="text-xl text-gray-200 font-medium">Solar Installations</div>
              <div className="text-sm text-gray-400 mt-2">Residential & commercial projects</div>
            </div>
          </motion.div>
          
          {/* Support & Service Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 border border-red-400/30">
                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="text-4xl md:text-5xl font-black text-red-400 mb-3 leading-none">24/7</div>
              <div className="text-xl text-gray-200 font-medium">Support & Service</div>
              <div className="text-sm text-gray-400 mt-2">Emergency repairs & maintenance</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};