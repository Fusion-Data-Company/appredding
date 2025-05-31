import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import solarPanelImage from "@assets/Untitled design.png";
import logoImage from "@assets/Untitled design (2).png";

interface ElasticHueSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const ElasticHueSlider: React.FC<ElasticHueSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 360,
  step = 1,
  label = 'Hue'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newValue = min + (max - min) * percentage;
    const steppedValue = Math.round(newValue / step) * step;
    
    setLocalValue(steppedValue);
    onChange(steppedValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderChange(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleSliderChange(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const thumbPosition = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-xs mx-auto space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}: {localValue}°</label>
      <div
        ref={sliderRef}
        className="relative h-6 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-full cursor-pointer shadow-lg"
        onMouseDown={handleMouseDown}
      >
        <motion.div
          className="absolute top-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-800 cursor-grab active:cursor-grabbing"
          style={{
            left: `${thumbPosition}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: isDragging ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        />
      </div>
    </div>
  );
};

interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => (
  <motion.div
    className={`absolute ${position} bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-3 min-w-[150px]`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-sm font-medium text-white">{name}</div>
    <div className="text-xs text-gray-300">{value}</div>
  </motion.div>
);

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({ 
  hue = 45, 
  xOffset = 0, 
  speed = 1, 
  intensity = 1,
  size = 1 
}) => {
  const [paths, setPaths] = useState<string[]>([]);

  const generateLightningPath = () => {
    const segments = 8 + Math.random() * 4;
    const startX = 400 + xOffset;
    const startY = 50;
    const endX = 200 + xOffset + (Math.random() - 0.5) * 200;
    const endY = 600;
    
    let path = `M ${startX} ${startY}`;
    
    for (let i = 1; i < segments; i++) {
      const progress = i / segments;
      const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 100 * (1 - progress);
      const y = startY + (endY - startY) * progress;
      path += ` L ${x} ${y}`;
    }
    
    path += ` L ${endX} ${endY}`;
    return path;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3 * intensity) {
        const newPath = generateLightningPath();
        setPaths(prev => [...prev, newPath]);
        
        setTimeout(() => {
          setPaths(prev => prev.slice(1));
        }, 200 / speed);
      }
    }, 100 / speed);

    return () => clearInterval(interval);
  }, [speed, intensity, xOffset]);

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <filter id={`glow-${hue}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path}
          stroke={`hsl(${hue}, 100%, 70%)`}
          strokeWidth="2"
          fill="none"
          filter={`url(#glow-${hue})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </svg>
  );
};

export const HeroSection: React.FC = () => {
  const [lightningHue, setLightningHue] = useState(45);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-screen">
        
        {/* Right half logo */}
        <img 
          src={logoImage}
          alt="Advance Power Redding Logo"
          style={{ 
            position: 'absolute',
            margin: 0, 
            padding: 0,
            top: '50%',
            right: '-15vw',
            transform: 'translateY(-50%)',
            width: '48vw',
            height: 'auto',
            zIndex: 99999
          }}
        />

      </div>

      {/* Solar Panel - Bottom left corner */}
      <motion.div 
        className="absolute left-0 z-[99999] pointer-events-none"
        style={{ 
          zIndex: 99999,
          margin: 0,
          padding: 0,
          bottom: '-400px'
        }}
      >
        <motion.img 
          src={solarPanelImage}
          alt="Solar Panel"
          className="w-[1600px] h-[1600px] object-contain"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          key="solar-panel-bottom"
          style={{ 
            zIndex: 99999,
            margin: 0,
            padding: 0,
            display: 'block'
          }}
        />
      </motion.div>

      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-blue-500/20 to-purple-600/10 blur-3xl"></div>
        <div className="absolute top-0 w-[100%] left-1/2 transform -translate-x-1/2 h-full">
          <Lightning
            hue={lightningHue}
            xOffset={-72}
            speed={1.6}
            intensity={0.6}
            size={2}
          />
        </div>
      </motion.div>
    </div>
  );
};