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
          className="text-white font-bold py-4 px-8 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          style={{
            background: 'rgba(26, 35, 50, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex items-center gap-3">
            <Sun className="h-6 w-6 text-[#ff6b35]" />
            <span className="text-lg font-bold tracking-wide">
              Why Go Solar?
            </span>
          </div>
        </button>
      </motion.div>

      {/* The Modal */}
      <PitchDeckModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PitchDeckTrigger;