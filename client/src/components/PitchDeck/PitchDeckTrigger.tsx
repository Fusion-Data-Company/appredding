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
      

      
      {/* The Modal */}
      <PitchDeckModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PitchDeckTrigger;