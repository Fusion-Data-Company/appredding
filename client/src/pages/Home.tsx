import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/ui/hero-odyssey";
import ProductShowcaseSection from "@/sections/ProductShowcaseSection";
import SolarSalesFunnelSection from "@/sections/SolarSalesFunnelSection";
import { InteractiveToolsSection } from "@/sections/InteractiveToolsSection";
import SolarServicesSection from "@/sections/SolarServicesSection";
import AboutAdvancePowerSection from "@/sections/AboutAdvancePowerSection";
import EnergyStorageSection from "@/sections/EnergyStorageSection";
import TroubleshootingSection from "@/sections/TroubleshootingSection";
import SpecificationsSection from "@/sections/SpecificationsSection";
import FAQSection from "@/sections/FAQSection";
import SolarTestimonialsSection from "@/sections/SolarTestimonialsSection";
import ContactSection from "@/sections/ContactSection";
import PitchDeckTrigger from "@/components/PitchDeck/PitchDeckTrigger";
import { Sun, Sparkles, Zap, Battery, Shield } from "lucide-react";

const Home = () => {
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [isUltraMode, setIsUltraMode] = useState(false);

  useEffect(() => {
    // Ultra-realistic continuous upgrade system
    const upgradeTimer = setInterval(() => {
      setUpgradeLevel(prev => (prev + 1) % 5);
    }, 2500);

    const ultraModeTimer = setInterval(() => {
      setIsUltraMode(prev => !prev);
    }, 8000);

    return () => {
      clearInterval(upgradeTimer);
      clearInterval(ultraModeTimer);
    };
  }, []);

  const getUltraFilters = () => {
    const baseFilters = `brightness(${100 + upgradeLevel * 3}) contrast(${100 + upgradeLevel * 2}) saturate(${100 + upgradeLevel * 5})`;
    return isUltraMode ? `${baseFilters} hue-rotate(${upgradeLevel * 2}deg)` : baseFilters;
  };

  return (
    <div 
      className="min-h-screen transition-all duration-2000 relative overflow-hidden"
      style={{ filter: getUltraFilters() }}
    >
      {/* Ultra-Realistic Solar Energy Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dynamic Sun Movement */}
        <motion.div
          className="absolute w-40 h-40 opacity-10"
          style={{
            top: `${20 + Math.sin(upgradeLevel * 0.5) * 10}%`,
            right: `${15 + Math.cos(upgradeLevel * 0.3) * 5}%`,
          }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="w-full h-full text-orange-400" />
        </motion.div>

        {/* Energy Flow Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, #f97316, #eab308, #fb923c)`,
            }}
            animate={{
              y: [-30, -60, -30],
              x: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 2, 1],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Ultra-realistic Solar Panel Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ultra-solar-grid" width="120" height="80" patternUnits="userSpaceOnUse">
                <rect x="3" y="3" width="54" height="34" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1" rx="3"/>
                <rect x="63" y="3" width="54" height="34" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1" rx="3"/>
                <rect x="3" y="43" width="54" height="34" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1" rx="3"/>
                <rect x="63" y="43" width="54" height="34" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="1" rx="3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ultra-solar-grid)" />
          </svg>
        </div>
      </div>

      {/* Elite Upgrade Status Indicator */}
      <motion.div
        className="fixed top-6 left-6 z-50 flex items-center space-x-3 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-2xl border-2 border-orange-200"
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-orange-500" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-sm font-black text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ULTRA ELITE MODE
          </span>
          <span className="text-xs font-semibold text-orange-600">
            Level {upgradeLevel + 1} • {isUltraMode ? 'MAXIMUM' : 'ENHANCED'}
          </span>
        </div>
        <motion.div
          className="flex space-x-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {[Battery, Shield, Zap].map((Icon, index) => (
            <Icon key={index} className="w-4 h-4 text-orange-400" />
          ))}
        </motion.div>
      </motion.div>

      <MainLayout fullWidth>
        <motion.div 
          className="flex-1 flex flex-col relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, staggerChildren: 0.1 }}
        >
          <motion.div whileInView={{ scale: [0.98, 1.02, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <HeroSection />
          </motion.div>
          
          <motion.div whileInView={{ x: [-20, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <ProductShowcaseSection />
          </motion.div>
          
          <motion.div whileInView={{ y: [30, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <SolarSalesFunnelSection />
          </motion.div>
          
          <motion.div whileInView={{ scale: [0.95, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <InteractiveToolsSection />
          </motion.div>
          
          <motion.div whileInView={{ x: [20, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <SolarServicesSection />
          </motion.div>
          
          <motion.div whileInView={{ y: [-20, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <EnergyStorageSection />
          </motion.div>
          
          <motion.div whileInView={{ scale: [1.05, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <SpecificationsSection />
          </motion.div>
          
          <motion.div whileInView={{ x: [-15, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <TroubleshootingSection />
          </motion.div>
          
          <motion.div whileInView={{ y: [25, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <FAQSection />
          </motion.div>
          
          <motion.div whileInView={{ scale: [0.98, 1.01, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <AboutAdvancePowerSection />
          </motion.div>
          
          <motion.div whileInView={{ x: [30, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <SolarTestimonialsSection />
          </motion.div>
          
          <motion.div whileInView={{ y: [40, 0] }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <ContactSection />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <PitchDeckTrigger />
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default Home;
