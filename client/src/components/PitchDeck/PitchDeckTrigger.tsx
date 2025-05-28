import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ChevronRight, X } from 'lucide-react';
import PitchDeckModal from './PitchDeckModal';

interface PitchDeckTriggerProps {
  delay?: number;
  autoShow?: boolean;
}

const PitchDeckTrigger: React.FC<PitchDeckTriggerProps> = ({
  delay = 3000,
  autoShow = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMiniBanner, setShowMiniBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    if (autoShow && !dismissed) {
      const timer = setTimeout(() => {
        setShowMiniBanner(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [autoShow, delay, dismissed]);
  
  const openModal = () => {
    setIsModalOpen(true);
    setShowMiniBanner(false);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const dismissBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMiniBanner(false);
    setDismissed(true);
  };
  
  return (
    <>
      {/* Solar-Themed Floating Action Button */}
      <motion.div
        className="fixed bottom-24 left-6 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={openModal}
          className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl transform transition-all duration-300"
          style={{
            boxShadow: "0 0 30px rgba(255, 193, 7, 0.6), 0 8px 20px rgba(255, 87, 34, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
          }}
        >
          {/* Solar panel grid background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-3 gap-0.5 h-full w-full">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white/30 rounded-sm"></div>
              ))}
            </div>
          </div>
          
          {/* Animated sun rays */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-4 bg-white/40"
                  style={{
                    transformOrigin: "bottom center",
                    transform: `rotate(${i * 45}deg) translateY(-16px)`
                  }}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <Sun className="h-5 w-5 text-white drop-shadow-lg" />
            <span className="text-sm font-bold tracking-wide drop-shadow-lg">
              Why Go Solar?
            </span>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>
      </motion.div>
      
      {/* Mini Banner - Shows after delay */}
      <AnimatePresence>
        {showMiniBanner && (
          <motion.div
            className="fixed bottom-36 right-6 z-40 bg-gradient-to-r from-blue-900/90 to-primary-900/90 backdrop-blur-sm text-white rounded-lg shadow-xl border border-blue-500/30 p-4 pr-10 max-w-xs"
            style={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3), 0 4px 10px rgba(0,0,0,0.3)"
            }}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onClick={openModal}
          >
            <button
              className="absolute top-2 right-2 bg-blue-900/50 rounded-full p-1 text-gray-400 hover:text-white hover:bg-blue-800/50 transition-all duration-200"
              onClick={dismissBanner}
              style={{
                boxShadow: "0 0 5px rgba(59, 130, 246, 0.2) inset"
              }}
            >
              <X className="h-4 w-4" style={{
                filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))"
              }} />
            </button>
            <h3 className="font-bold text-orange-300 mb-2 flex items-center">
              <div className="bg-gradient-to-br from-orange-800/70 to-orange-900/50 p-1.5 rounded-full mr-2 shadow-inner" style={{
                boxShadow: "0 0 10px rgba(249, 115, 22, 0.2) inset",
                transform: "scale(1.1)"
              }}>
                <Sun className="h-5 w-5 text-orange-300" style={{
                  filter: "drop-shadow(0 0 2px rgba(249, 115, 22, 0.6))"
                }} />
              </div>
              Why Go Solar?
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Discover how solar energy can save you money and reduce your environmental impact.
            </p>
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md" style={{
                boxShadow: "0 0 10px rgba(249, 115, 22, 0.3)"
              }}>
                View Presentation <ChevronRight className="h-4 w-4 ml-1 inline" style={{
                  filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))"
                }} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* The Modal */}
      <PitchDeckModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PitchDeckTrigger;