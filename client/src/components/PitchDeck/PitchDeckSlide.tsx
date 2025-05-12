import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PitchDeckSlideProps {
  title: string;
  children: React.ReactNode;
  current: boolean;
  index: number;
  totalSlides: number;
  bgColor?: string;
  titleColor?: string;
  icon?: React.ReactNode;
}

export const PitchDeckSlide: React.FC<PitchDeckSlideProps> = ({
  title,
  children,
  current,
  index,
  totalSlides,
  bgColor = "bg-gradient-to-br from-blue-900/90 to-primary-950/95",
  titleColor = "bg-gradient-to-r from-blue-300 via-white to-blue-300",
  icon
}) => {
  // Animation variants
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <motion.div
      className={cn(
        "absolute inset-0 flex flex-col p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-[0_0_50px_rgba(29,78,216,0.15)]",
        bgColor,
        current ? "z-10" : "z-0"
      )}
      style={{
        boxShadow: "0 0 40px rgba(29, 78, 216, 0.2) inset, 0 0 30px rgba(29, 78, 216, 0.15)",
        borderImage: "linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.5), rgba(59, 130, 246, 0.3)) 1",
        borderWidth: "1px",
        borderStyle: "solid"
      }}
      initial="hidden"
      animate={current ? "visible" : "hidden"}
      exit="exit"
      variants={slideVariants}
      custom={index}
    >
      {/* Progress indicator */}
      <div className="absolute top-2 left-0 right-0 flex justify-center">
        <div className="flex space-x-1">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-blue-400" : "w-2 bg-blue-700/50"
              )}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          {icon && (
            <div className="bg-gradient-to-br from-blue-900/70 to-blue-800/50 p-4 rounded-full border border-blue-400/50 flex-shrink-0 shadow-[0_0_25px_rgba(59,130,246,0.5)]" style={{
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 10px rgba(59, 130, 246, 0.3) inset",
              transform: "scale(1.1)" 
            }}>
              <div className="text-blue-300 animate-pulse-subtle" style={{
                filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
              }}>
                {icon}
              </div>
            </div>
          )}
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]",
            titleColor
          )}>
            {title}
          </h2>
        </div>
        
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-white to-blue-400 rounded-full mx-auto shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {children}
      </div>

      <div className="text-xs text-gray-400 text-right mt-4">
        Slide {index + 1} of {totalSlides}
      </div>
    </motion.div>
  );
};

export default PitchDeckSlide;