"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Zap, Sun, Battery, Sparkles } from "lucide-react";
import { AwardBadge } from '@/components/ui/award-badge';

// ============================================================================
// SOLAR WAVE BACKGROUND COMPONENT
// ============================================================================

interface SolarWaveBackgroundProps {
  className?: string;
}

const SolarWaveBackground: React.FC<SolarWaveBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const waveDataRef = useRef<Array<{
    amplitude: number;
    frequency: number;
    speed: number;
    offset: number;
  }>>([]);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      resizeCanvas();
    };

    resizeCanvas();
    window.addEventListener("resize", handleResize, { passive: true });

    const waveCount = isMobile ? 6 : 12;
    waveDataRef.current = Array.from({ length: waveCount }).map(() => ({
      amplitude: Math.random() * 0.3 + 0.2,
      frequency: Math.random() * 3 + 2,
      speed: Math.random() * 0.02 + 0.01,
      offset: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveDataRef.current.forEach((wave, index) => {
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
        const alpha = 0.3 + (index / waveDataRef.current.length) * 0.4;

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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className={`fixed inset-0 ${className}`} />;
};

// ============================================================================
// ELECTRIC PARTICLES COMPONENT
// ============================================================================

const ElectricParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    hue: number;
  }>>([]);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      resizeCanvas();
    };

    resizeCanvas();
    window.addEventListener("resize", handleResize, { passive: true });

    const maxParticles = isMobile ? 40 : 100;
    particlesRef.current = [];

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
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
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
          particlesRef.current[index] = createParticle();
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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

// ============================================================================
// SHIMMER TEXT COMPONENT
// ============================================================================

interface ShimmerTextProps {
  children: string;
  className?: string;
}

const ShimmerText: React.FC<ShimmerTextProps> = ({ children, className = "" }) => {
  return (
    <motion.span
      className={`relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255, 200, 100, 0.8) 50%, transparent 60%, transparent 100%), linear-gradient(to right, #fbbf24, #f59e0b)",
      }}
    >
      {children}
    </motion.span>
  );
};

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

interface SolarWaveHeroProps {
  tagline?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const SolarWaveHero: React.FC<SolarWaveHeroProps> = ({
  tagline = "Powering the Future with Clean Energy",
  title = "Residential Solar Installation",
  subtitle = "Professional solar installations for Northern California homes. Our founder brings decades of expertise in renewable energy systems, helping Redding families achieve energy independence with premium solar solutions.",
  stats = [
    { value: "99.9%", label: "Efficiency Rate" },
    { value: "50K+", label: "Installations" },
    { value: "24/7", label: "Support" }
  ]
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const color = useMotionValue("#f59e0b");

  useEffect(() => {
    animate(color, ["#f59e0b", "#fbbf24", "#fb923c", "#f59e0b"], {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [color]);

  const backgroundGradient = useMotionTemplate`radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)`;
  const borderGlow = useMotionTemplate`0 0 20px ${color}40`;

  return (
    <div className="hero-section relative min-h-screen w-full overflow-hidden bg-black">
      {/* Award Badge */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <AwardBadge type="customer-service-excellence" data-testid="award-badge-residential-solar" />
      </div>

      {/* Animated Backgrounds */}
      <SolarWaveBackground />
      <ElectricParticles />

      {/* Gradient Overlays */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: backgroundGradient }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-[2] flex min-h-screen items-start pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="badge-elite-metallic badge-solar"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sun className="w-4 h-4 text-amber-400" />
              </motion.div>
              <span>{tagline}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-amber-300 to-orange-400 bg-clip-text text-transparent preserve-text-color">
                {title}
              </span>
              <br />
              <span className="font-extrabold tracking-wide text-white">
                Advance Power Redding
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10 text-lg leading-8 text-white/80 sm:text-xl lg:text-2xl max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarWaveHero;
