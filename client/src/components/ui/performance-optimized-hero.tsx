/**
 * Performance-Optimized Hero Section
 * Focuses on fast loading and smooth animations
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/image-optimizer';
import { cn } from '@/lib/utils';

interface PerformanceOptimizedHeroProps {
  className?: string;
}

export function PerformanceOptimizedHero({ className }: PerformanceOptimizedHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={heroRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center",
        "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900",
        "overflow-hidden",
        className
      )}
    >
      {/* Background Elements - Simplified for Performance */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Optimized Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg) translateZ(0)',
          willChange: 'transform'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Solar
          </span>
          <br />
          Energy Solutions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Transform your energy future with cutting-edge solar technology 
          and industry-leading performance monitoring
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Get Free Analysis
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
          >
            View Solutions
          </Button>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "99.9%", label: "System Uptime" },
            { value: "30%", label: "Energy Savings" },
            { value: "24/7", label: "Monitoring" },
            { value: "10yr", label: "Warranty" }
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-300">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements - GPU Accelerated */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}