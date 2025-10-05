"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Sun, Battery, ArrowRight, Menu, X } from 'lucide-react';

// ============================================================================
// ANIMATED WAVE BACKGROUND COMPONENT
// ============================================================================

const SolarWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      resize();
    };

    resize();
    window.addEventListener('resize', handleResize, { passive: true });

    const drawWave = (
      offset: number,
      amplitude: number,
      frequency: number,
      color: string,
      opacity: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin((x * frequency + offset) * 0.01) * amplitude +
          Math.sin((x * frequency * 0.5 + offset * 1.5) * 0.01) * (amplitude * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `${color}00`);
      gradient.addColorStop(0.5, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${color}${Math.floor(opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMobile) {
        drawWave(time * 0.5, 80, 1, '#FFA500', 0.15);
        drawWave(time * 0.9, 100, 0.8, '#FF6B35', 0.1);
        drawWave(time * 1.3, 90, 0.9, '#00D9FF', 0.06);
      } else {
        drawWave(time * 0.5, 80, 1, '#FFA500', 0.15);
        drawWave(time * 0.7, 60, 1.5, '#FFD700', 0.12);
        drawWave(time * 0.9, 100, 0.8, '#FF6B35', 0.1);
        drawWave(time * 1.1, 70, 1.2, '#4ECDC4', 0.08);
        drawWave(time * 1.3, 90, 0.9, '#00D9FF', 0.06);
      }

      time += 0.5;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0a, #1a1a1a)' }}
    />
  );
};

// ============================================================================
// FLOATING ENERGY PARTICLES COMPONENT
// ============================================================================

const EnergyParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sun className="w-8 h-8 text-orange-500" />
              <Zap className="w-4 h-4 text-yellow-400 absolute -bottom-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              SolarWave
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2">
            <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all">
              Solutions
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all">
              Technology
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all">
              About
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all">
              Contact
            </a>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-2"
          >
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white/90 hover:text-white font-medium">Solutions</a>
              <a href="#" className="text-white/90 hover:text-white font-medium">Technology</a>
              <a href="#" className="text-white/90 hover:text-white font-medium">About</a>
              <a href="#" className="text-white/90 hover:text-white font-medium">Contact</a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// ============================================================================
// MAIN COMMERCIAL SOLAR HERO COMPONENT
// ============================================================================

interface CommercialSolarWaveHeroProps {
  tagline?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const CommercialSolarWaveHero: React.FC<CommercialSolarWaveHeroProps> = ({
  tagline = "Next-Gen Energy Solutions",
  title = "Commercial Solar Installation",
  subtitle = "Transform your business with enterprise-grade solar solutions. Our advanced commercial systems deliver maximum ROI, reduce operational costs, and establish your company as a sustainability leader.",
  stats = [
    { value: "99.9%", label: "Energy Efficiency" },
    { value: "50K+", label: "Installations" },
    { value: "24/7", label: "Monitoring" }
  ]
}) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated Background */}
      <SolarWaveBackground />
      <EnergyParticles />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* Navigation */}
      <Navigation />

      {/* Hero Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-[2] flex min-h-screen items-center justify-center px-6"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-xl border border-orange-500/20 rounded-full px-6 py-3 mb-8"
          >
            <Battery className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-200">{tagline}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span 
              className="drop-shadow-2xl font-extrabold"
              style={{
                background: 'linear-gradient(to right, #fb923c, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Commercial Solar Installation
            </span>
            <br />
            <span 
              className="font-extrabold tracking-wide"
              style={{
                background: 'linear-gradient(to right, #ffffff, #dbeafe, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Advance Power Redding
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default CommercialSolarWaveHero;
