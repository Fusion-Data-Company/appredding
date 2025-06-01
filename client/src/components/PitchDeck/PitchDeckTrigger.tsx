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
          className="button-primary relative overflow-hidden text-white font-bold py-4 px-6 rounded-2xl shadow-2xl transform transition-all duration-300"
        >
          <div className="solar-panel-grid">
            <div>
              {[...Array(9)].map((_, i) => (
                <div key={i} className="solar-panel-cell"></div>
              ))}
            </div>
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
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <Sun className="h-5 w-5 text-white drop-shadow-lg" />
            <span className="text-sm font-bold tracking-wide drop-shadow-lg">
              Why Go Solar?
            </span>
          </div>
          
          <div className="shine-effect"></div>
        </button>
      </motion.div>
      

      
      {/* The Modal */}
      <PitchDeckModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PitchDeckTrigger;