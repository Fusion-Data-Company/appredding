"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Zap, Sun, Battery } from "lucide-react";

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
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((wave, index) => {
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const normalizedX = x / canvas.width;
          const y =
            canvas.height / 2 +
            Math.sin(normalizedX * wave.frequency * Math.PI * 2 + time * wave.speed + wave.offset) *
              wave.amplitude *
              canvas.height *
              0.3;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const hue = 30 + index * 5;
        const saturation = 100;
        const lightness = 50 + index * 2;
        const alpha = 0.15 + (index / waveData.length) * 0.3;

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.lineWidth = 2 + index * 0.3;
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
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

  return <canvas ref={canvasRef} className={`fixed inset-0 ${className}`} />;
};

// ============================================================================
// SPARKLES COMPONENT
// ============================================================================

interface SparklesProps {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
}

const Sparkles: React.FC<SparklesProps> = ({
  className = "",
  particleColor = "#FFA500",
  particleDensity = 50,
}) => {
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

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random(),
        fadeSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity += particle.fadeSpeed;

        if (particle.opacity <= 0 || particle.opacity >= 1) {
          particle.fadeSpeed *= -1;
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, particle.opacity));
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, particleDensity]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

const HybridSolarWaveHero: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const color = useMotionValue("#FF6B00");

  useEffect(() => {
    animate(color, ["#FF6B00", "#FFD700", "#FF8C00", "#FFA500", "#FF6B00"], {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [color]);

  const backgroundGradient = useMotionTemplate`radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`;
  const borderGlow = useMotionTemplate`0 0 20px ${color}40`;

  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden bg-black -mb-20">
      {/* Background Layers */}
      <SolarWaveBackground />
      <Sparkles particleColor="#FFA500" particleDensity={60} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: backgroundGradient,
        }}
      />


      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(70vh-5rem)] items-start pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="badge-elite-metallic badge-solar">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Battery className="w-4 h-4 text-orange-400" />
                </motion.div>
                <span>Next-Gen Energy Solutions</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight"
            >
              <span className="font-extrabold bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Hybrid Solar
              </span>
              <br />
              <span className="font-extrabold text-white">
                Advance Power Redding
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Revolutionary hybrid solar systems with seamless grid-tie to off-grid transition. Sol-Ark inverters provide &lt;10ms transfer time for uninterrupted power during PSPS events and grid outages.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Sun, title: "<10ms", value: "Transfer Time" },
                { icon: Zap, title: "UL 1741-SA", value: "Certified" },
                { icon: Battery, title: "25+", value: "Years Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center transition-all hover:bg-white/10 hover:border-orange-500/30"
                >
                  <stat.icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.title}</div>
                  <div className="text-sm text-white/60">{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default HybridSolarWaveHero;
