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
          className={`inline-block uppercase font-bold tracking-wide ${className}`}
          style={{ 
            fontSize: "180%", // Much larger text
            background: "linear-gradient(to bottom, #e0e0e0 0%, #b0b0b0 20%, #707070 40%, #505050 60%, #999 80%, #d8d8d8 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: '0.5px rgba(255,255,255,0.1)',
            textShadow: "0px 2px 3px rgba(0,0,0,0.3)",
            filter: "drop-shadow(0 0 1px #ffffff70) brightness(1.2) contrast(1.1)",
            position: 'relative',
            zIndex: 5,
            letterSpacing: "0.05em",
            fontWeight: 700,
            padding: "0.1em 0",
            display: "inline-block",
            transform: "scale(1.05)"
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}