import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, X } from 'lucide-react';
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
      {/* Floating Action Button - Always visible */}
      <motion.button
        className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
      >
        <Shield className="h-6 w-6" />
      </motion.button>
      
      {/* Mini Banner - Shows after delay */}
      <AnimatePresence>
        {showMiniBanner && (
          <motion.div
            className="fixed bottom-20 right-6 z-30 bg-gradient-to-r from-blue-900/90 to-primary-900/90 backdrop-blur-sm text-white rounded-lg shadow-xl border border-blue-500/30 p-4 pr-10 max-w-xs"
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onClick={openModal}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={dismissBanner}
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-bold text-blue-300 mb-2 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Praetorian Executive Briefing
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Discover how our NASA-derived ceramic coating can protect your most valuable assets.
            </p>
            <div className="flex items-center text-blue-300 text-sm font-semibold">
              View Presentation <ChevronRight className="h-4 w-4 ml-1" />
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