import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Fade animation only (no vertical movement)
  const variants = {
    enter: { 
      opacity: 0,
      scale: 0.98,
    },
    center: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      }
    }
  };

  return (
    <div className="flex justify-center items-center overflow-hidden text-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`inline-block uppercase gradient-text-vertical text-[140%] font-semibold tracking-wide ${className}`}
          style={{ 
            WebkitTextStroke: '0.1px rgba(0,0,0,0.05)',
            filter: 'none',
            position: 'relative',
            zIndex: 5
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}