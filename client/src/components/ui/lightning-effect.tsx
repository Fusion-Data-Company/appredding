import React from 'react';
import { motion } from 'framer-motion';

interface LightningEffectProps {
  hue?: number;
}

export const LightningEffect: React.FC<LightningEffectProps> = ({ hue = 230 }) => {
  // Generate multiple lightning bolts
  const bolts = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 2 + Math.random() * 2,
    path: `M${50 + i * 10},0 L${55 + i * 10 + Math.random() * 20},${30 + Math.random() * 20} L${50 + i * 10 + Math.random() * 30},${60 + Math.random() * 20} L${60 + i * 10 + Math.random() * 20},100`
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, 
            hsla(${hue}, 80%, 30%, 0.3) 0%, 
            hsla(${hue}, 70%, 20%, 0.5) 40%, 
            hsla(${hue}, 60%, 10%, 0.8) 100%)`,
        }}
      />

      {/* Lightning SVG effects */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: `hue-rotate(${hue - 230}deg)` }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {bolts.map(bolt => (
          <motion.path
            key={bolt.id}
            d={bolt.path}
            fill="none"
            stroke="rgba(150, 200, 255, 0.8)"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              pathLength: [0, 1, 1, 0],
              stroke: ["rgba(150, 200, 255, 0.8)", "rgba(255, 255, 255, 1)", "rgba(150, 200, 255, 0.8)", "rgba(150, 200, 255, 0)"]
            }}
            transition={{
              duration: bolt.duration,
              delay: bolt.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Particle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsla(${hue}, 80%, 50%, 0.2) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};