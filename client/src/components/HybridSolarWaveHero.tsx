"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Zap, Sun, Battery, ArrowRight, Menu, X, AlertTriangle, TrendingDown, Shield, Activity, TrendingUp, Calculator, Cpu, Database, BookOpen, Wrench, Settings, Gauge, Timer, Calendar, Phone, AlertOctagon } from "lucide-react";

// ============================================================================
// SOLAR WAVE BACKGROUND COMPONENT
// ============================================================================

interface SolarWaveBackgroundProps {
  className?: string;
}

const SolarWaveBackground: React.FC<SolarWaveBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const waveData = Array.from({ length: 12 }).map(() => ({
      amplitude: Math.random() * 0.3 + 0.2,
      frequency: Math.random() * 3 + 2,
      speed: Math.random() * 0.02 + 0.01,
      offset: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((wave, index) => {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 2) {
          const normalizedX = x / canvas.width;
          const y =
            canvas.height / 2 +
            Math.sin(normalizedX * wave.frequency * Math.PI + time * wave.speed + wave.offset) *
              wave.amplitude *
              canvas.height *
              0.3;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const hue = 30 + index * 10;
        const saturation = 100;
        const lightness = 50 + index * 2;
        const alpha = 0.3 + (index / waveData.length) * 0.4;

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.lineWidth = 2 + index * 0.3;
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        ctx.shadowBlur = 15;
        ctx.stroke();
      });

      time += 0.5;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} />;
};

// ============================================================================
// ENERGY PARTICLES COMPONENT
// ============================================================================

const EnergyParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 100;

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: Math.random() * 100 + 50,
        hue: Math.random() * 60 + 30,
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        if (
          particle.life > particle.maxLife ||
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particles[index] = createParticle();
          return;
        }

        const alpha = 1 - particle.life / particle.maxLife;
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${alpha * 0.6})`;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, ${alpha})`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              SolarWave
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 p-1">
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Solutions
            </a>
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Technology
            </a>
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              About
            </a>
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              className="hidden sm:flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-orange-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4" />
              <span>Get Started</span>
            </motion.button>

            <button
              className="md:hidden p-2 rounded-md text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="flex flex-col space-y-2 p-6">
            <a href="#" className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              Solutions
            </a>
            <a href="#" className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              Technology
            </a>
            <a href="#" className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              About
            </a>
            <a href="#" className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// ============================================================================
// MAIN HYBRID SOLAR HERO COMPONENT
// ============================================================================

interface HybridSolarWaveHeroProps {
  tagline?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const HybridSolarWaveHero: React.FC<HybridSolarWaveHeroProps> = ({
  tagline = "Advanced Hybrid Solar & Energy Systems",
  title = "Hybrid Solar",
  subtitle = "Revolutionary hybrid solar systems with seamless grid-tie to off-grid transition. Sol-Ark inverters provide <10ms transfer time for uninterrupted power during PSPS events and grid outages.",
  stats = [
    { value: "<10ms", label: "Transfer Time" },
    { value: "UL 1741-SA", label: "Certified" },
    { value: "25+", label: "Years Experience" },
  ]
}) => {
  const { scrollY } = { scrollY: { get: () => 0 } };
  const opacity = useMotionValue(1);
  const scale = useMotionValue(1);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated Backgrounds */}
      <SolarWaveBackground />
      <EnergyParticles />

      {/* Navigation */}
      <Navigation />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

      {/* Hero Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-[2] flex min-h-screen items-center justify-center px-6"
      >
        <div className="mx-auto max-w-6xl text-center">
          {/* Icon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center space-x-2 rounded-full bg-white/5 backdrop-blur-xl border border-orange-500/30 px-5 py-2.5 text-sm text-white/90"
          >
            <Battery className="w-4 h-4 text-orange-400" />
            <span>{tagline}</span>
          </motion.div>

          {/* Icon Group */}
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Sun className="w-12 h-12 text-orange-400 animate-pulse" />
            <Zap className="w-16 h-16 text-amber-500" />
            <Battery className="w-12 h-12 text-yellow-400 animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 max-w-5xl text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-white">Hybrid </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Solar</span>
            <br />
            <span className="text-white">Advance Power </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Redding</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 text-lg leading-8 text-white/80 sm:text-xl lg:text-2xl max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative"
              >
                {/* Multi-layer glass morphism effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-yellow-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/30 to-yellow-400/30 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Main card */}
                <div className="relative backdrop-blur-xl bg-white/5 border border-orange-500/30 rounded-2xl p-8 text-center group-hover:border-orange-400/50 transition-all duration-300">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent mb-2 group-hover:from-orange-300 group-hover:via-amber-400 group-hover:to-yellow-300 transition-all duration-300">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HybridSolarWaveHero;
